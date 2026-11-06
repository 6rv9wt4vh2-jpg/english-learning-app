"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LEVELS, type Level } from "@/data/course";

const STORAGE_PREFIX = "levelFilter:";

export function isLevel(v: string | null | undefined): v is Level {
  return !!v && (LEVELS as readonly string[]).includes(v);
}

/** Section list URL, optionally filtered to a level. */
export function levelListHref(sectionPath: string, level: Level | "all") {
  if (!level || level === "all") return sectionPath;
  return `${sectionPath}?level=${level}`;
}

/**
 * Level filter synced to ?level= in the URL (router.replace) and localStorage.
 * Browser back/forward restores the level via popstate.
 */
export function useLevelFilter(sectionKey: string) {
  const router = useRouter();
  const pathname = usePathname();
  const [level, setLevelState] = useState<Level | "all">("all");
  const [ready, setReady] = useState(false);

  const applyFromUrl = useCallback(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("level");
    if (isLevel(fromUrl)) {
      setLevelState(fromUrl);
      try {
        localStorage.setItem(STORAGE_PREFIX + sectionKey, fromUrl);
      } catch {
        /* ignore */
      }
      return "url" as const;
    }
    if (fromUrl === "all") {
      setLevelState("all");
      try {
        localStorage.setItem(STORAGE_PREFIX + sectionKey, "all");
      } catch {
        /* ignore */
      }
      return "url" as const;
    }
    return "missing" as const;
  }, [sectionKey]);

  useEffect(() => {
    const status = applyFromUrl();
    if (status === "missing") {
      try {
        const stored = localStorage.getItem(STORAGE_PREFIX + sectionKey);
        if (isLevel(stored)) {
          setLevelState(stored);
          router.replace(`${pathname}?level=${stored}`, { scroll: false });
        } else {
          setLevelState("all");
        }
      } catch {
        setLevelState("all");
      }
    }
    setReady(true);
    const onPop = () => {
      applyFromUrl();
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [applyFromUrl, pathname, router, sectionKey]);

  const setLevel = useCallback(
    (l: Level | "all") => {
      setLevelState(l);
      try {
        localStorage.setItem(STORAGE_PREFIX + sectionKey, l);
      } catch {
        /* ignore */
      }
      const href = l === "all" ? pathname : `${pathname}?level=${l}`;
      router.replace(href, { scroll: false });
    },
    [pathname, router, sectionKey],
  );

  return { level, setLevel, ready };
}
