"use client";

import Link from "next/link";
import { useMemo } from "react";
import ProgressBar from "@/components/ProgressBar";
import StatCard from "@/components/StatCard";
import { PageHero } from "@/components/ui";
import { LEVELS, LEVEL_META, unitsByLevel } from "@/data/course";
import { deckCards } from "@/data/decks";
import { lessons } from "@/data/lessons";
import { words } from "@/data/words";
import { DECKS, countEasyAll, readStatus } from "@/lib/decks";
import { useProgress } from "@/lib/hooks";
import { countLearnedWords, getAccuracy, persistStatus } from "@/lib/storage";
import { isDue } from "@/lib/srs";
import { useUnitProgress } from "@/lib/units";

export default function ProgressPage() {
  const { progress, ready, storageOk, storageStatus } = useProgress();
  const cardLearned = typeof window === "undefined" ? 0 : countEasyAll(DECKS.map((d) => d.slug));
  const totalCards = DECKS.reduce((s, d) => s + deckCards[d.slug].length, 0);
  const srsLearned = countLearnedWords(progress);
  const accuracy = getAccuracy(progress);
  const due = useMemo(
    () => words.filter((w) => isDue(progress.words[w.id])).length,
    [progress.words],
  );

  const byLesson = useMemo(() => {
    return lessons.map((l) => {
      const lessonWords = words.filter((w) => w.lessonId === l.id);
      const learnedIn = lessonWords.filter((w) => {
        const p = progress.words[w.id];
        return p && (p.repetitions >= 2 || p.correctCount >= 2);
      }).length;
      return {
        id: l.id,
        title: l.titleRu,
        total: lessonWords.length,
        learned: learnedIn,
        done: progress.completedLessons.includes(l.id),
      };
    });
  }, [progress]);

  const deckRows = DECKS.map((d) => {
    const st = typeof window === "undefined" ? {} : readStatus(d.slug);
    const easy = Object.values(st).filter((v) => v === "easy").length;
    return { ...d, easy, total: deckCards[d.slug].length };
  });

  if (!ready) return <div className="text-slate-500">Loading…</div>;

  return (
    <div className="space-y-8">
      <PageHero title="Progress" subtitle="Saved in this browser (localStorage)" emoji="📊" gradient="from-lime-400 to-green-600" />

      {!storageOk && (
        <div className="rounded-2xl bg-rose-50 dark:bg-rose-950/40 p-4 text-sm text-rose-700 dark:text-rose-200">
          ⚠️ Storage is {storageStatus === "quota" ? "full" : "unavailable"} (private mode?). Progress cannot be saved.
        </div>
      )}

      <UnitLevels />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Streak" value={`${progress.streak} d`} emoji="🔥" />
        <StatCard label="Cards Easy" value={cardLearned} emoji="✨" hint={`of ${totalCards}`} />
        <StatCard label="Accuracy" value={`${accuracy}%`} emoji="🎯" hint={`${progress.correctReviews}/${progress.totalReviews}`} />
        <StatCard label="SRS due" value={due} emoji="🧠" />
      </div>

      <section className="card p-5 space-y-4">
        <h2 className="font-semibold">Today&apos;s goal</h2>
        <ProgressBar value={progress.reviewsToday || 0} max={progress.dailyGoal || 20} label="Reviews" />
        <ProgressBar value={cardLearned} max={totalCards} label="Cards marked Easy" />
        <ProgressBar value={progress.completedLessons.length} max={lessons.length} label="Starter lessons" />
      </section>

      <section className="card p-5 space-y-3">
        <h2 className="font-bold text-lg">Cards by deck</h2>
        {deckRows.map((d) => (
          <div key={d.slug} className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <Link href={`/cards/${d.slug}`} className="hover:text-sky-600 font-semibold">{d.emoji} {d.title}</Link>
              <span className="text-slate-500">{d.easy}/{d.total} Easy</span>
            </div>
            <ProgressBar value={d.easy} max={d.total} />
          </div>
        ))}
      </section>

      <section className="card p-5 space-y-3">
        <h2 className="font-semibold">Starter lessons</h2>
        {byLesson.map((l) => (
          <div key={l.id} className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <Link href={`/lessons/${l.id}`} className="hover:text-sky-600">
                {l.title} {l.done ? "✓" : ""}
              </Link>
              <span className="text-slate-500">{l.learned}/{l.total}</span>
            </div>
            <ProgressBar value={l.learned} max={l.total} />
          </div>
        ))}
      </section>

      <section className="card p-5 text-sm text-slate-600 dark:text-slate-400 space-y-1">
        <p>SRS words touched: {Object.keys(progress.words).length} · deep-learned: {srsLearned}</p>
        <p>Total reviews: {progress.totalReviews}</p>
        <p>Last practice: {progress.lastPracticeDate || "not yet"}</p>
        <p>Storage: {persistStatus()}</p>
        <Link href="/settings" className="inline-block text-sky-600 dark:text-sky-400 pt-2">Settings & reset →</Link>
      </section>
    </div>
  );
}

function UnitLevels() {
  const { done, ready } = useUnitProgress();
  if (!ready) return null;
  return (
    <section className="card p-5 space-y-3">
      <h2 className="font-bold text-lg">Lessons by level</h2>
      {LEVELS.map((l) => {
        const u = unitsByLevel[l];
        return <ProgressBar key={l} label={`${LEVEL_META[l].emoji} ${l}`} value={u.filter((x) => done.includes(x.id)).length} max={u.length} />;
      })}
    </section>
  );
}
