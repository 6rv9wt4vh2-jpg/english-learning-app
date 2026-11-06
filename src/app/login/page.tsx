"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { hydrateFromServer, type AuthUser } from "@/lib/accountSync";

export default function LoginPage() {
  const params = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await r.json();
      if (!r.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }
      await hydrateFromServer(data.progress, data.user as AuthUser);
      const next = params.get("next") || "/";
      window.location.href = next.startsWith("/") ? next : "/";
    } catch {
      setError("Network error");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6 py-10">
      <header className="rounded-3xl p-6 text-white shadow-xl bg-gradient-to-br from-sky-400 via-indigo-500 to-fuchsia-500">
        <p className="text-sm font-semibold opacity-90">English RU</p>
        <h1 className="text-3xl font-extrabold">Sign in</h1>
        <p className="text-sm opacity-90 mt-1">Pupils and teacher — each account keeps its own progress</p>
      </header>
      <form onSubmit={onSubmit} className="card p-5 space-y-4">
        <label className="block space-y-1">
          <span className="text-xs font-bold uppercase text-slate-500">Username</span>
          <input className="input" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label className="block space-y-1">
          <span className="text-xs font-bold uppercase text-slate-500">Password</span>
          <input className="input" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {error && <p className="text-sm text-rose-600">⚠️ {error}</p>}
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
