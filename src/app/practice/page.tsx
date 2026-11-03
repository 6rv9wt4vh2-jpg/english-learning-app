"use client";

import { PageHero } from "@/components/ui";
import { useCallback, useEffect, useMemo, useState } from "react";
import SpeakButton from "@/components/SpeakButton";
import { words } from "@/data/words";
import { useProgress } from "@/lib/hooks";
import { isDue } from "@/lib/srs";
import type { SRSGrade, Word } from "@/lib/types";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function PracticePage() {
  const { progress, ready, onReview } = useProgress();
  const [queue, setQueue] = useState<Word[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionDone, setSessionDone] = useState(0);
  const [started, setStarted] = useState(false);

  const dueWords = useMemo(() => {
    const due = words.filter((w) => isDue(progress.words[w.id]));
    // Prefer never-seen first, then due
    return due.sort((a, b) => {
      const pa = progress.words[a.id];
      const pb = progress.words[b.id];
      if (!pa && pb) return -1;
      if (pa && !pb) return 1;
      return (pa?.nextReview ?? 0) - (pb?.nextReview ?? 0);
    });
  }, [progress.words]);

  const startSession = useCallback(() => {
    const list = shuffle(dueWords).slice(0, 20);
    setQueue(list.length ? list : shuffle(words).slice(0, 15));
    setIndex(0);
    setFlipped(false);
    setSessionDone(0);
    setStarted(true);
  }, [dueWords]);

  useEffect(() => {
    if (ready && !started) startSession();
  }, [ready, started, startSession]);

  const current = queue[index];

  const grade = (g: SRSGrade) => {
    if (!current) return;
    onReview(current.id, g);
    setSessionDone((n) => n + 1);
    setFlipped(false);
    if (index + 1 >= queue.length) {
      setQueue([]);
    } else {
      setIndex((i) => i + 1);
    }
  };

  if (!ready) return <div className="text-slate-500">Загрузка…</div>;

  if (!current) {
    return (
      <div className="space-y-6 text-center py-10">
        <div className="text-5xl">🎉</div>
        <h1 className="text-2xl font-bold">Session complete! / Сессия завершена</h1>
        <p className="text-slate-500">Повторено карточек: {sessionDone}</p>
        <p className="text-sm text-slate-500">К повторению сейчас: {dueWords.length}</p>
        <button
          type="button"
          onClick={startSession}
          className="rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-6 py-2.5 text-sm font-medium"
        >
          Ещё сессия
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <PageHero title="Practice" subtitle="Тренировка SRS · Again / Hard / Good / Easy" emoji="🧠" gradient="from-pink-500 to-rose-600">
        <p className="mt-2 text-sm font-semibold">{index + 1}/{queue.length}</p>
      </PageHero>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="card w-full min-h-[260px] p-8 text-left transition hover:border-sky-300 dark:hover:border-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        {!flipped ? (
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Английский</p>
            <p className="text-3xl font-semibold">{current.en}</p>
            <p className="text-sm text-slate-500">Нажмите, чтобы увидеть перевод</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Перевод</p>
            <p className="text-2xl font-semibold text-sky-700 dark:text-sky-300">{current.ru}</p>
            <p className="text-base italic text-slate-700 dark:text-slate-300">&ldquo;{current.example}&rdquo;</p>
            <p className="text-sm text-slate-500">{current.exampleRu}</p>
          </div>
        )}
      </button>

      <div className="flex justify-center">
        <SpeakButton text={current.en} />
      </div>

      {flipped ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => grade("again")}
            className="rounded-xl bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200 py-3 text-sm font-medium hover:opacity-90"
          >
            Again
          </button>
          <button
            type="button"
            onClick={() => grade("hard")}
            className="rounded-xl bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200 py-3 text-sm font-medium hover:opacity-90"
          >
            Hard
          </button>
          <button
            type="button"
            onClick={() => grade("good")}
            className="rounded-xl bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200 py-3 text-sm font-medium hover:opacity-90"
          >
            Good
          </button>
          <button
            type="button"
            onClick={() => grade("easy")}
            className="rounded-xl bg-sky-100 text-sky-900 dark:bg-sky-900/40 dark:text-sky-200 py-3 text-sm font-medium hover:opacity-90"
          >
            Easy
          </button>
        </div>
      ) : (
        <p className="text-center text-sm text-slate-500">Сначала переверните карточку</p>
      )}
    </div>
  );
}
