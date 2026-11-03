"use client";

import Link from "next/link";
import { useMemo } from "react";
import ProgressBar from "@/components/ProgressBar";
import StatCard from "@/components/StatCard";
import { lessons } from "@/data/lessons";
import { words } from "@/data/words";
import { b2Cards } from "@/data/b2";
import { useProgress } from "@/lib/hooks";
import { countLearnedWords, getAccuracy } from "@/lib/storage";
import { isDue } from "@/lib/srs";

export default function HomePage() {
  const { progress, ready } = useProgress();

  const dueCount = useMemo(() => {
    return words.filter((w) => isDue(progress.words[w.id])).length;
  }, [progress.words]);

  const nextLesson = useMemo(() => {
    return lessons.find((l) => !progress.completedLessons.includes(l.id)) ?? lessons[0];
  }, [progress.completedLessons]);

  const learned = countLearnedWords(progress);
  const accuracy = getAccuracy(progress);
  const goal = progress.dailyGoal || 20;
  const today = progress.reviewsToday || 0;

  if (!ready) {
    return <div className="text-slate-500">Загрузка…</div>;
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm font-medium text-sky-600 dark:text-sky-400">Добро пожаловать</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Учим английский спокойно
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl">
          Словарь, интервальные повторения, уроки грамматики и аудирование — всё офлайн в браузере,
          прогресс хранится на этом устройстве.
        </p>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Серия дней" value={progress.streak} emoji="🔥" hint="занимайтесь каждый день" />
        <StatCard label="Выучено слов" value={learned} emoji="✨" hint={`из ${words.length + b2Cards.length}`} />
        <StatCard label="Точность" value={`${accuracy}%`} emoji="🎯" />
        <StatCard label="К повторению" value={dueCount} emoji="🧠" />
      </div>

      <section className="card p-5 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-semibold text-lg">Цель на сегодня</h2>
          <span className="text-sm text-slate-500">{today} / {goal} повторений</span>
        </div>
        <ProgressBar value={today} max={goal} />
        <div className="flex flex-wrap gap-3 pt-1">
          <Link
            href="/practice"
            className="inline-flex items-center justify-center rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 text-sm font-medium transition shadow-sm"
          >
            Практиковать карточки
          </Link>
          <Link
            href="/listening"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-2.5 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            Аудирование
          </Link>
        </div>
      </section>

      <section className="card p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Урок дня</p>
            <h2 className="text-xl font-semibold mt-1">{nextLesson.titleRu}</h2>
            <p className="text-sm text-slate-500 mt-1">{nextLesson.title} · {nextLesson.level}</p>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">{nextLesson.descriptionRu}</p>
          </div>
          <span className="shrink-0 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200 text-xs font-medium px-2.5 py-1">
            {progress.completedLessons.includes(nextLesson.id) ? "Пройден" : "Новый"}
          </span>
        </div>
        <Link
          href={`/lessons/${nextLesson.id}`}
          className="inline-flex rounded-xl bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 text-sm font-medium transition"
        >
          Открыть урок →
        </Link>
      </section>

      <section className="grid sm:grid-cols-2 gap-3">
        <Link href="/vocabulary" className="card p-4 hover:border-sky-300 dark:hover:border-sky-700 transition">
          <div className="text-2xl mb-2">📚</div>
          <h3 className="font-semibold">Словарь</h3>
          <p className="text-sm text-slate-500 mt-1">{words.length} слов с примерами и озвучкой</p>
        </Link>
        <Link href="/lessons" className="card p-4 hover:border-sky-300 dark:hover:border-sky-700 transition">
          <div className="text-2xl mb-2">📖</div>
          <h3 className="font-semibold">Все уроки</h3>
          <p className="text-sm text-slate-500 mt-1">
            {progress.completedLessons.length}/{lessons.length} пройдено
          </p>
        </Link>
      </section>
    </div>
  );
}
