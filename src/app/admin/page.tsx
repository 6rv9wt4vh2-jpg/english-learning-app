"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { Loading } from "@/components/ui";
import { LEVEL_CARD, LEVEL_SLUGS, type LevelSlug } from "@/lib/levels";

type Row = {
  username: string;
  role: string;
  myLevel: LevelSlug;
  createdAt: string;
  progressUpdatedAt: string | null;
  keyCount: number;
};

export default function AdminPage() {
  const { user, ready } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [myLevel, setMyLevel] = useState<LevelSlug>("a1");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const load = async () => {
    const r = await fetch("/api/admin/users");
    if (!r.ok) return;
    const data = await r.json();
    setRows(data.users || []);
  };

  useEffect(() => {
    if (ready && user?.role === "admin") void load();
  }, [ready, user]);

  if (!ready) return <Loading />;
  if (!user || user.role !== "admin") {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Admin only</h1>
        <Link href="/" className="text-sky-600 font-semibold">← Home</Link>
      </div>
    );
  }

  const create = async (e: FormEvent) => {
    e.preventDefault();
    setMsg("");
    setErr("");
    const r = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, myLevel }),
    });
    const data = await r.json();
    if (!r.ok) {
      setErr(data.error || "Failed");
      return;
    }
    setMsg(`Created pupil «${data.username}» (${data.myLevel})`);
    setUsername("");
    setPassword("");
    await load();
  };

  const remove = async (u: string) => {
    if (!confirm(`Delete pupil ${u}?`)) return;
    await fetch(`/api/admin/users?username=${encodeURIComponent(u)}`, { method: "DELETE" });
    await load();
  };

  return (
    <div className="space-y-6">
      <header className="rounded-3xl p-6 text-white shadow-xl bg-gradient-to-br from-slate-600 to-indigo-700">
        <p className="text-sm font-semibold opacity-90">Teacher tools</p>
        <h1 className="text-3xl font-extrabold">Admin</h1>
        <p className="text-sm opacity-90">Create pupil accounts and see who has synced progress</p>
      </header>

      <form onSubmit={create} className="card p-5 space-y-3">
        <h2 className="font-bold text-lg">Add pupil</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <label className="space-y-1 text-sm">
            <span className="text-xs font-bold uppercase text-slate-500">Username</span>
            <input className="input" value={username} onChange={(e) => setUsername(e.target.value)} required pattern="[a-zA-Z0-9._-]{2,32}" />
          </label>
          <label className="space-y-1 text-sm">
            <span className="text-xs font-bold uppercase text-slate-500">Password</span>
            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={4} />
          </label>
          <label className="space-y-1 text-sm">
            <span className="text-xs font-bold uppercase text-slate-500">Starting level</span>
            <select className="input" value={myLevel} onChange={(e) => setMyLevel(e.target.value as LevelSlug)}>
              {LEVEL_SLUGS.map((s) => (
                <option key={s} value={s}>
                  {LEVEL_CARD[s].emoji} {LEVEL_CARD[s].title}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit" className="btn-primary">Create account</button>
        {msg && <p className="text-sm text-emerald-600">{msg}</p>}
        {err && <p className="text-sm text-rose-600">{err}</p>}
      </form>

      <section className="card p-5 space-y-3">
        <h2 className="font-bold text-lg">Accounts</h2>
        <div className="space-y-2">
          {rows.map((u) => (
            <div key={u.username} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="font-bold">
                  {u.username}{" "}
                  <span className="text-xs font-semibold text-slate-500">
                    {u.role} · {LEVEL_CARD[u.myLevel]?.title || u.myLevel}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  Synced keys: {u.keyCount}
                  {u.progressUpdatedAt ? ` · last save ${new Date(u.progressUpdatedAt).toLocaleString()}` : " · no server progress yet"}
                </div>
              </div>
              {u.role !== "admin" && (
                <button type="button" className="btn-ghost text-rose-600" onClick={() => remove(u.username)}>
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
