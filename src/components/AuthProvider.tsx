"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { LevelSlug } from "@/lib/levels";
import {
  type AuthUser,
  hydrateFromServer,
  installSaveHooks,
  pushProgress,
  readMyLevel,
  writeMyLevel,
} from "@/lib/accountSync";

type Ctx = {
  user: AuthUser | null;
  ready: boolean;
  myLevel: LevelSlug;
  setMyLevel: (l: LevelSlug) => void;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthCtx = createContext<Ctx>({
  user: null,
  ready: false,
  myLevel: "a1",
  setMyLevel: () => {},
  logout: async () => {},
  refresh: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);
  const [myLevel, setMyLevelState] = useState<LevelSlug>("a1");

  const refresh = useCallback(async () => {
    try {
      const r = await fetch("/api/auth/me", { cache: "no-store" });
      if (!r.ok) {
        setUser(null);
        setReady(true);
        return;
      }
      const data = await r.json();
      const u = data.user as AuthUser;
      setUser(u);
      await hydrateFromServer(data.progress, u);
      setMyLevelState(readMyLevel() || u.myLevel);
    } catch {
      setUser(null);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (!user) return;
    return installSaveHooks(() => readMyLevel());
  }, [user]);

  const setMyLevel = useCallback(
    (l: LevelSlug) => {
      writeMyLevel(l);
      setMyLevelState(l);
      void pushProgress(l);
      // update user record via progress PUT
      setUser((u) => (u ? { ...u, myLevel: l } : u));
    },
    [],
  );

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.href = "/login";
  }, []);

  const value = useMemo(
    () => ({ user, ready, myLevel, setMyLevel, logout, refresh }),
    [user, ready, myLevel, setMyLevel, logout, refresh],
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}
