"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { Loading } from "@/components/ui";
import { isLevelSlug, LEVEL_CARD, type LevelSlug } from "@/lib/levels";
import { getLevelProgress, levelOverallPct, type LevelProgress } from "@/lib/levelProgress";

const LINKS: { key: keyof Omit<LevelProgress, "slug">; label: string; emoji: string; href: (s: LevelSlug) => string }[] = [
  { key: "words", label: "Words / Cards", emoji: "🃏", href: (s) => `/cards/${LEVEL_CARD[s].deckSlug}` },
  { key: "grammar", label: "Grammar", emoji: "📐", href: (s) => `/grammar?level=${LEVEL_CARD[s].cefr}` },
  { key: "reading", label: "Reading", emoji: "📖", href: (s) => `/reading?level=${LEVEL_CARD[s].cefr}` },
  { key: "writing", label: "Writing", emoji: "✍️", href: (s) => `/writing?level=${LEVEL_CARD[s].cefr}` },
  { key: "speaking", label: "Speaking", emoji: "🎙️", href: (s) => `/speaking?level=${LEVEL_CARD[s].cefr}` },
  { key: "listening", label: "Listening", emoji: "🎧", href: (s) => `/listening?level=${LEVEL_CARD[s].cefr}` },
];

export default function LevelPage() {
  const params = useParams();
  const slugParam = String(params.slug || "");
  const { ready, myLevel, setMyLevel } = useAuth();
  const [p, setP] = useState<LevelProgress | null>(null);

  const slug = isLevelSlug(slugParam) ? slugParam : null;

  useEffect(() => {
    if (!ready || !slug) return;
    setP(getLevelProgress(slug));
  }, [ready, slug]);

  if (!ready) return <Loading />;
  if (!slug) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Level not found</h1>
        <Link href="/" className="text-sky-600 font-semibold">← Home</Link>
      </div>
    );
  }

  const meta = LEVEL_CARD[slug];
  const overall = p ? levelOverallPct(p) : { done: 0, total: 0, pct: 0 };

  return (
    <div className="space-y-6">
      <Link href="/" className="text-sm font-semibold text-sky-600">← All levels</Link>
      <header className={`relative overflow-hidden rounded-3xl p-6 text-white shadow-xl bg-gradient-to-br ${meta.gradient}`}>
        <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/15" />
        <div className="relative text-5xl">{meta.emoji}</div>
        <h1 className="relative text-3xl font-extrabold mt-2">{meta.title}</h1>
        <p className="relative opacity-90">{meta.subtitle}</p>
        <p className="relative mt-3 text-sm font-bold">
          {overall.done}/{overall.total} · {overall.pct}%
        </p>
        <div className="relative mt-2 h-2.5 rounded-full bg-black/20 overflow-hidden">
          <div className="h-full rounded-full bg-white" style={{ width: `${overall.pct}%` }} />
        </div>
        <div className="relative mt-4 flex flex-wrap gap-2">
          {myLevel === slug ? (
            <span className="rounded-full bg-white text-slate-900 px-3 py-1 text-xs font-bold">My level</span>
          ) : (
            <button type="button" className="rounded-full bg-white/25 px-3 py-1 text-xs font-bold hover:bg-white/40" onClick={() => setMyLevel(slug)}>
              Set as my level
            </button>
          )}
        </div>
      </header>

      <div className="grid sm:grid-cols-2 gap-3">
        {LINKS.map((l) => {
          const c = p?.[l.key] ?? { done: 0, total: 0 };
          const pct = c.total ? Math.round((c.done / c.total) * 100) : 0;
          return (
            <Link key={l.key} href={l.href(slug)} className={`rounded-3xl p-4 text-white shadow-lg bg-gradient-to-br ${meta.gradient} hover:scale-[1.02] transition space-y-2`}>
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-lg">{l.emoji} {l.label}</span>
                <span className="text-sm font-bold">{pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-black/20 overflow-hidden">
                <div className="h-full rounded-full bg-white" style={{ width: `${pct}%` }} />
              </div>
              <p className="text-xs font-semibold opacity-90">
                {c.done}/{c.total} completed
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
