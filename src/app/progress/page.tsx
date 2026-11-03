"use client";

import Link from "next/link";
import { PageHero } from "@/components/ui";
import { useMemo } from "react";
import ProgressBar from "@/components/ProgressBar";
import StatCard from "@/components/StatCard";
import { lessons } from "@/data/lessons";
import { words } from "@/data/words";
import { b2Cards } from "@/data/b2";
import { useProgress } from "@/lib/hooks";
import { countLearnedWords, getAccuracy } from "@/lib/storage";
import { isDue } from "@/lib/srs";
import { useUnitProgress } from "@/lib/units";
import { LEVELS, LEVEL_META, unitsByLevel } from "@/data/course";

export default function ProgressPage() {
  const { progress, ready } = useProgress();

  const learned = countLearnedWords(progress);
  const accuracy = getAccuracy(progress);
  const due = useMemo(
    () => words.filter((w) => isDue(progress.words[w.id])).length,
    [progress.words]
  );
  const reviewedOnce = Object.keys(progress.words).length;

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

  if (!ready) return <div className="text-slate-500">Загрузка…</div>;

  return (
    <div className="space-y-8">
      <PageHero title="Progress" subtitle="Прогресс · данные хранятся в localStorage этого браузера" emoji="📊" gradient="from-lime-400 to-green-600" />
      <UnitLevels />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Серия" value={`${progress.streak} дн.`} emoji="🔥" />
        <StatCard label="Слов выучено" value={learned} emoji="✨" hint={`из ${words.length + b2Cards.length}`} />
        <StatCard label="Точность" value={`${accuracy}%`} emoji="🎯" hint={`${progress.correctReviews}/${progress.totalReviews}`} />
        <StatCard label="К повторению" value={due} emoji="🧠" />
      </div>

      <section className="card p-5 space-y-4">
        <h2 className="font-semibold">Цель на сегодня</h2>
        <ProgressBar
          value={progress.reviewsToday || 0}
          max={progress.dailyGoal || 20}
          label="Повторения"
        />
        <ProgressBar value={learned} max={words.length + b2Cards.length} label="Словарь (A1–B2)" />
        <ProgressBar
          value={progress.completedLessons.length}
          max={lessons.length}
          label="Уроки"
        />
      </section>

      <section className="card p-5 space-y-3">
        <h2 className="font-semibold">По урокам</h2>
        {byLesson.map((l) => (
          <div key={l.id} className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <Link href={`/lessons/${l.id}`} className="hover:text-sky-600">
                {l.title} {l.done ? "✓" : ""}
              </Link>
              <span className="text-slate-500">
                {l.learned}/{l.total}
              </span>
            </div>
            <ProgressBar value={l.learned} max={l.total} />
          </div>
        ))}
      </section>

      <section className="card p-5 text-sm text-slate-600 dark:text-slate-400 space-y-1">
        <p>Затронуто слов: {reviewedOnce}</p>
        <p>Всего повторений: {progress.totalReviews}</p>
        <p>Последняя практика: {progress.lastPracticeDate || "ещё не было"}</p>
        <Link href="/settings" className="inline-block text-sky-600 dark:text-sky-400 pt-2">
          Настройки и сброс →
        </Link>
      </section>
    </div>
  );
}

function UnitLevels() {
  const { done, ready } = useUnitProgress();
  if (!ready) return null;
  return (
    <section className="card p-5 space-y-3">
      <h2 className="font-bold text-lg">Lessons by level <span className="text-sm font-medium text-slate-400">/ Уроки по уровням</span></h2>
      {LEVELS.map((l) => {
        const u = unitsByLevel[l];
        return <ProgressBar key={l} label={`${LEVEL_META[l].emoji} ${l}`} value={u.filter((x) => done.includes(x.id)).length} max={u.length} />;
      })}
    </section>
  );
}
