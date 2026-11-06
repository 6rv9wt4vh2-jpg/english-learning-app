"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import StatCard from "@/components/StatCard";
import { Chip, FilterRow, Loading, PageHero } from "@/components/ui";
import { useAuth } from "@/components/AuthProvider";
import { LEVELS, LEVEL_META, TYPE_META, allUnits, type Level } from "@/data/course";
import { deckCards } from "@/data/decks";
import { listeningByLevel } from "@/data/listening";
import { speakingTasks } from "@/data/speaking";
import { DECKS, readStatus } from "@/lib/decks";
import { useProgress } from "@/lib/hooks";
import { cefrFromMyLevel } from "@/lib/levelFilter";
import { getAccuracy, persistStatus } from "@/lib/storage";
import { useUnitProgress } from "@/lib/units";
import { readJSON } from "@/lib/persist";

type SpeakScore = Record<string, { words?: number; checkedAt?: string }>;

export default function ProgressPage() {
  const { progress, ready, storageOk, storageStatus } = useProgress();
  const units = useUnitProgress();
  const { myLevel, ready: authReady } = useAuth();
  const defaultLevel = useMemo(() => cefrFromMyLevel(myLevel), [myLevel]);
  const [level, setLevel] = useState<Level | null>(null);
  const active = level ?? defaultLevel;
  const ordered: Level[] = [defaultLevel, ...LEVELS.filter((l) => l !== defaultLevel)];

  if (!ready || !units.ready || !authReady) return <Loading />;

  // Prefer exact deck slug match for A1/A2/B1/C1; for B2 show both core and plus separately
  const deckRows = (active === "B2" ? DECKS.filter((d) => d.slug === "b2" || d.slug === "b2plus") : DECKS.filter((d) => d.slug === active.toLowerCase())).map((d) => {
    const st = typeof window === "undefined" ? {} : readStatus(d.slug);
    const easy = Object.values(st).filter((v) => v === "easy").length;
    return { ...d, easy, total: deckCards[d.slug].length };
  });

  const scores = typeof window === "undefined" ? {} : readJSON<SpeakScore>("speakdone:v2", {});
  const speakList = speakingTasks.filter((t) => t.level === active);
  const speakDone = speakList.filter((t) => {
    const sc = scores[t.id];
    return sc && ((sc.words ?? 0) >= t.targetWords * 0.8 || !!sc.checkedAt);
  }).length;
  const listenList = listeningByLevel[active];
  const listenDone = listenList.filter((l) => units.done.includes(l.id)).length;

  const byType = (type: "grammar" | "reading" | "writing") => {
    const list = allUnits.filter((u) => u.level === active && u.type === type);
    return { done: list.filter((u) => units.done.includes(u.id)).length, total: list.length };
  };
  const g = byType("grammar");
  const r = byType("reading");
  const w = byType("writing");
  const wordsEasy = deckRows.reduce((s, d) => s + d.easy, 0);
  const wordsTotal = deckRows.reduce((s, d) => s + d.total, 0);

  return (
    <div className="space-y-8">
      <PageHero title="Progress" subtitle={`Account progress · ${active}`} emoji="📊" gradient="from-lime-400 to-green-600">
        <p className="mt-2 text-sm font-semibold">Showing one level at a time</p>
      </PageHero>

      {!storageOk && (
        <div className="rounded-2xl bg-rose-50 dark:bg-rose-950/40 p-4 text-sm text-rose-700 dark:text-rose-200">
          ⚠️ Storage is {storageStatus === "quota" ? "full" : "unavailable"}. Progress may not save.
        </div>
      )}

      <div className="card p-4">
        <FilterRow label="Level">
          {ordered.map((l) => (
            <Chip key={l} active={active === l} onClick={() => setLevel(l)} color={`bg-gradient-to-r ${LEVEL_META[l].gradient}`}>
              {LEVEL_META[l].emoji} {l}
              {l === defaultLevel ? " · My" : ""}
            </Chip>
          ))}
        </FilterRow>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Streak" value={`${progress.streak} d`} emoji="🔥" />
        <StatCard label={`${active} words`} value={wordsEasy} emoji="✨" hint={`of ${wordsTotal}`} />
        <StatCard label="Accuracy" value={`${getAccuracy(progress)}%`} emoji="🎯" />
        <StatCard label="Today" value={progress.reviewsToday || 0} emoji="📅" hint={`goal ${progress.dailyGoal || 20}`} />
      </div>

      <section className="card p-5 space-y-3">
        <h2 className="font-bold text-lg">{active} · skills</h2>
        {(
          [
            ["🃏 Words", wordsEasy, wordsTotal, `/cards/${active === "B2" ? "b2" : active.toLowerCase()}`],
            [`${TYPE_META.grammar.emoji} Grammar`, g.done, g.total, `/grammar?level=${active}`],
            [`${TYPE_META.reading.emoji} Reading`, r.done, r.total, `/reading?level=${active}`],
            [`${TYPE_META.writing.emoji} Writing`, w.done, w.total, `/writing?level=${active}`],
            ["🎙️ Speaking", speakDone, speakList.length, `/speaking?level=${active}`],
            ["🎧 Listening", listenDone, listenList.length, `/listening?level=${active}`],
          ] as const
        ).map(([label, done, total, href]) => (
          <div key={label} className="space-y-1">
            <div className="flex justify-between text-sm">
              <Link href={href} className="font-semibold hover:text-sky-600">
                {label}
              </Link>
              <span className="text-slate-500">
                {done}/{total}
              </span>
            </div>
            <ProgressBar value={done} max={total || 1} />
          </div>
        ))}
      </section>

      <section className="card p-5 space-y-3">
        <h2 className="font-bold text-lg">{active} · card decks</h2>
        {deckRows.map((d) => (
          <div key={d.slug} className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <Link href={`/cards/${d.slug}`} className="hover:text-sky-600 font-semibold">
                {d.emoji} {d.title}
              </Link>
              <span className="text-slate-500">
                {d.easy}/{d.total} Easy
              </span>
            </div>
            <ProgressBar value={d.easy} max={d.total || 1} />
          </div>
        ))}
      </section>

      <p className="text-xs text-slate-500">Storage: {persistStatus()} · last practice: {progress.lastPracticeDate || "not yet"}</p>
    </div>
  );
}
