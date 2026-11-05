"use client";

import { PageHero } from "@/components/ui";
import { useCallback, useEffect, useMemo, useState } from "react";
import { words } from "@/data/words";
import { useProgress } from "@/lib/hooks";
import { speakEnglish, stopSpeaking } from "@/lib/speech";
import type { Word } from "@/lib/types";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildOptions(correct: Word, pool: Word[]): string[] {
  const distractors = shuffle(pool.filter((w) => w.id !== correct.id)).slice(0, 3);
  return shuffle([correct.ru, ...distractors.map((d) => d.ru)]);
}

export default function ListeningPage() {
  const { progress, ready, onReview } = useProgress();
  const [current, setCurrent] = useState<Word | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [round, setRound] = useState(0);

  const nextQuestion = useCallback(() => {
    stopSpeaking();
    const w = words[Math.floor(Math.random() * words.length)];
    setCurrent(w);
    setOptions(buildOptions(w, words));
    setSelected(null);
    setRound((r) => r + 1);
    // slight delay so UI updates before speech
    setTimeout(() => speakEnglish(w.en), 200);
  }, []);

  useEffect(() => {
    if (ready) nextQuestion();
    return () => stopSpeaking();
  }, [ready, nextQuestion]);

  const accuracy = useMemo(() => {
    if (!score.total) return 0;
    return Math.round((score.correct / score.total) * 100);
  }, [score]);

  const choose = (opt: string) => {
    if (!current || selected) return;
    setSelected(opt);
    const ok = opt === current.ru;
    setScore((s) => ({ correct: s.correct + (ok ? 1 : 0), total: s.total + 1 }));
    onReview(current.id, ok ? "good" : "again");
  };

  if (!ready || !current) return <div className="text-slate-500">Загрузка…</div>;

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <PageHero title="Word listening" subtitle="Аудирование · слушайте слово и выберите правильный перевод" emoji="🎧" gradient="from-cyan-400 to-blue-600" />

      <div className="flex gap-3 text-sm text-slate-500">
        <span>Раунд {round}</span>
        <span>·</span>
        <span>
          Верно {score.correct}/{score.total} ({accuracy}%)
        </span>
        <span>·</span>
        <span>Серия {progress.streak}🔥</span>
      </div>

      <div className="card p-8 text-center space-y-4">
        <p className="text-sm text-slate-500">Прослушайте английское слово</p>
        <button
          type="button"
          onClick={() => speakEnglish(current.en)}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sky-600 hover:bg-sky-700 text-white text-3xl shadow-lg transition"
          aria-label="Прослушать"
        >
          🔊
        </button>
        <p className="text-xs text-slate-500">Нажмите ещё раз, чтобы повторить</p>
        {selected && (
          <p className="text-lg font-medium pt-2">
            Это было: <span className="text-sky-700 dark:text-sky-300">{current.en}</span>
          </p>
        )}
      </div>

      <div className="grid gap-2">
        {options.map((opt) => {
          let style = "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800";
          if (selected) {
            if (opt === current.ru) style = "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30";
            else if (opt === selected) style = "border-rose-400 bg-rose-50 dark:bg-rose-900/30";
          }
          return (
            <button
              key={opt}
              type="button"
              disabled={!!selected}
              onClick={() => choose(opt)}
              className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${style}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {selected && (
        <button
          type="button"
          onClick={nextQuestion}
          className="w-full rounded-xl bg-sky-600 hover:bg-sky-700 text-white py-3 text-sm font-medium"
        >
          Следующее слово →
        </button>
      )}
    </div>
  );
}
