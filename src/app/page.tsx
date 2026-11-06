"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { Loading } from "@/components/ui";
import { LEVEL_CARD, LEVEL_SLUGS, type LevelSlug } from "@/lib/levels";
import { getLevelProgress, levelOverallPct, type LevelProgress } from "@/lib/levelProgress";

const SKILLS: { key: keyof Omit<LevelProgress, "slug">; label: string }[] = [
  { key: "words", label: "Words" },
  { key: "grammar", label: "Grammar" },
  { key: "reading", label: "Reading" },
  { key: "writing", label: "Writing" },
  { key: "speaking", label: "Speaking" },
  { key: "listening", label: "Listening" },
];

export default function HomePage() {
  const { user, ready, myLevel, setMyLevel } = useAuth();
  const [rows, setRows] = useState<{ slug: LevelSlug; p: LevelProgress; pct: number; done: number; total: number }[]>([]);

  useEffect(() => {
    if (!ready) return;
    const ordered = [
      myLevel,
      ...LEVEL_SLUGS.filter((s) => s !== myLevel),
    ];
    setRows(
      ordered.map((slug) => {
        const p = getLevelProgress(slug);
        const o = levelOverallPct(p);
        return { slug, p, ...o };
      }),
    );
  }, [ready, myLevel, user?.username]);

  if (!ready) return <Loading />;

  return (
    <div className="space-y-6">
      <header className="pop-in relative overflow-hidden rounded-3xl p-6 text-white shadow-xl bg-gradient-to-br from-sky-400 via-indigo-500 to-fuchsia-500">
        <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-white/15" />
        <p className="relative text-sm font-semibold opacity-90">
          {user ? `Hi, ${user.username}` : "Welcome"}
          {user?.role === "admin" ? " · teacher" : ""}
        </p>
        <h1 className="relative text-3xl font-extrabold tracking-tight">Choose a level</h1>
        <p className="relative mt-1 text-sm opacity-90">
          Each level keeps its own words & lessons progress. Your level is highlighted first.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 gap-4">
        {rows.map(({ slug, p, pct, done, total }) => {
          const meta = LEVEL_CARD[slug];
          const mine = slug === myLevel;
          return (
            <Link
              key={slug}
              href={`/level/${slug}`}
              className={`pop-in relative overflow-hidden rounded-3xl p-5 text-white shadow-xl bg-gradient-to-br ${meta.gradient} hover:scale-[1.02] transition ${
                mine ? "ring-4 ring-white/80 ring-offset-2 ring-offset-transparent" : ""
              }`}
            >
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/15" />
              <div className="relative flex items-start justify-between gap-2">
                <div>
                  <div className="text-4xl">{meta.emoji}</div>
                  <h2 className="text-2xl font-extrabold mt-1">{meta.title}</h2>
                  <p className="text-sm opacity-90">{meta.subtitle}</p>
                </div>
                {mine && (
                  <span className="rounded-full bg-white text-slate-900 px-3 py-1 text-xs font-bold shadow">My level</span>
                )}
              </div>
              <div className="relative mt-4 space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span>Progress</span>
                  <span>
                    {done}/{total} · {pct}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-black/20 overflow-hidden">
                  <div className="h-full rounded-full bg-white" style={{ width: `${pct}%` }} />
                </div>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  {SKILLS.map((s) => {
                    const c = p[s.key];
                    return (
                      <div key={s.key} className="rounded-xl bg-white/15 px-2 py-1.5 text-[11px] font-semibold">
                        <div className="opacity-90">{s.label}</div>
                        <div>
                          {c.done}/{c.total}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {!mine && (
                <button
                  type="button"
                  className="relative mt-3 rounded-full bg-white/25 px-3 py-1 text-xs font-bold hover:bg-white/40"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setMyLevel(slug);
                  }}
                >
                  Set as my level
                </button>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
