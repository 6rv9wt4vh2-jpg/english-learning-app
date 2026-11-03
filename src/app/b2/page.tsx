"use client";

import { useCallback, useMemo, useState } from "react";
import SpeakButton from "@/components/SpeakButton";
import ProgressBar from "@/components/ProgressBar";
import { b2Cards, b2BatchCount, B2_BATCH_SIZE } from "@/data/b2";
import { useProgress } from "@/lib/hooks";
import { isDue } from "@/lib/srs";
import type { B2Card, SRSGrade } from "@/lib/types";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SESSION = 20;

export default function B2Page() {
  const { progress, ready, onReview } = useProgress();
  const [batch, setBatch] = useState<number>(0); // 0 = все
  const [queue, setQueue] = useState<B2Card[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(0);

  const pool = useMemo(() => (batch ? b2Cards.filter((c) => c.batch === batch) : b2Cards), [batch]);
  const learned = useMemo(
    () => b2Cards.filter((c) => { const p = progress.words[c.id]; return p && (p.repetitions >= 2 || p.correctCount >= 2); }).length,
    [progress.words]
  );
  const due = useMemo(() => {
    const seenDue = pool.filter((c) => progress.words[c.id] && isDue(progress.words[c.id]));
    const fresh = pool.filter((c) => !progress.words[c.id]);
    return [...shuffle(seenDue), ...fresh];
  }, [pool, progress.words]);

  const start = useCallback(() => {
    const list = due.slice(0, SESSION);
    setQueue(list.length ? list : shuffle(pool).slice(0, SESSION));
    setIndex(0);
    setFlipped(false);
    setDone(0);
  }, [due, pool]);

  const current = queue[index];

  const grade = (g: SRSGrade) => {
    if (!current) return;
    onReview(current.id, g);
    setDone((n) => n + 1);
    setFlipped(false);
    if (index + 1 >= queue.length) setQueue([]);
    else setIndex((i) => i + 1);
  };

  if (!ready) return <div className="text-slate-500">Загрузка…</div>;

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <header>
        <h1 className="text-2xl font-bold">Карточки B2</h1>
        <p className="text-sm text-slate-500">
          {b2Cards.length} слов уровня B2 (Oxford 3000). Спереди — слово и фраза, сзади — перевод.
        </p>
      </header>

      <ProgressBar value={learned} max={b2Cards.length} label="Выучено B2" />

      {!current ? (
        <div className="card p-6 space-y-4">
          {done > 0 && <p className="text-center">🎉 Сессия завершена: {done} карточек</p>}
          <label className="block text-sm font-medium">
            Набор
            <select
              value={batch}
              onChange={(e) => setBatch(Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2"
            >
              <option value={0}>Все слова ({b2Cards.length})</option>
              {Array.from({ length: b2BatchCount }, (_, i) => {
                const items = b2Cards.filter((c) => c.batch === i + 1);
                return (
                  <option key={i} value={i + 1}>
                    Набор {i + 1}: {items[0].en} – {items[items.length - 1].en} ({items.length})
                  </option>
                );
              })}
            </select>
          </label>
          <p className="text-sm text-slate-500">
            К повторению в наборе: {due.length} (по {B2_BATCH_SIZE} слов в наборе, {SESSION} карточек за сессию)
          </p>
          <button
            type="button"
            onClick={start}
            className="w-full rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-6 py-2.5 text-sm font-medium"
          >
            Начать
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between text-sm text-slate-500">
            <span>Набор {current.batch}</span>
            <span>{index + 1}/{queue.length}</span>
          </div>
          <button
            type="button"
            onClick={() => setFlipped((f) => !f)}
            className="card w-full min-h-[260px] p-8 text-left transition hover:border-sky-300 dark:hover:border-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            {!flipped ? (
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Английский · {current.pos}</p>
                <p className="text-3xl font-semibold">{current.en}</p>
                <p className="text-lg italic text-slate-700 dark:text-slate-300">&ldquo;{current.example}&rdquo;</p>
                <p className="text-sm text-slate-500">Нажмите, чтобы увидеть перевод</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-wide text-slate-500">Перевод</p>
                <p className="text-2xl font-semibold text-sky-700 dark:text-sky-300">{current.ru}</p>
                <p className="text-lg text-slate-700 dark:text-slate-300">{current.exampleRu}</p>
                <p className="text-sm italic text-slate-500">{current.en} — &ldquo;{current.example}&rdquo;</p>
              </div>
            )}
          </button>
          <div className="flex justify-center gap-2">
            <SpeakButton text={current.en} />
            <SpeakButton text={current.example} />
          </div>
          {flipped ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {([
                ["again", "Снова", "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200"],
                ["hard", "Трудно", "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200"],
                ["good", "Хорошо", "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200"],
                ["easy", "Легко", "bg-sky-100 text-sky-900 dark:bg-sky-900/40 dark:text-sky-200"],
              ] as const).map(([g, label, cls]) => (
                <button key={g} type="button" onClick={() => grade(g)} className={`rounded-xl py-3 text-sm font-medium hover:opacity-90 ${cls}`}>
                  {label}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-slate-500">Сначала переверните карточку</p>
          )}
        </>
      )}
    </div>
  );
}
