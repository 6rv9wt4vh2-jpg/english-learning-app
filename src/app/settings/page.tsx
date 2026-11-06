"use client";

import Link from "next/link";
import { PageHero } from "@/components/ui";
import { useState } from "react";
import { useProgress } from "@/lib/hooks";

export default function SettingsPage() {
  const { progress, ready, onSetGoal, onReset } = useProgress();
  const [goal, setGoal] = useState<number | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!ready) return <div className="text-slate-500">Загрузка…</div>;

  const currentGoal = goal ?? progress.dailyGoal;

  return (
    <div className="space-y-8 max-w-lg">
      <PageHero title="Settings" subtitle="Настройки · без аккаунта, всё локально" emoji="⚙️" gradient="from-slate-500 to-indigo-600" />

      <section className="card p-5 space-y-4">
        <h2 className="font-semibold">Дневная цель</h2>
        <p className="text-sm text-slate-500">
          Сколько карточек хотите повторять в день (5–100).
        </p>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={5}
            max={100}
            step={5}
            value={currentGoal}
            onChange={(e) => {
              setGoal(Number(e.target.value));
              setSaved(false);
            }}
            className="flex-1"
          />
          <span className="w-10 text-center font-semibold">{currentGoal}</span>
        </div>
        <button
          type="button"
          onClick={() => {
            onSetGoal(currentGoal);
            setSaved(true);
          }}
          className="rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 text-sm font-medium"
        >
          Сохранить
        </button>
        {saved && <p className="text-sm text-emerald-600">Сохранено ✓</p>}
      </section>

      <section className="card p-5 space-y-3">
        <h2 className="font-semibold">О приложении</h2>
        <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 list-disc pl-5">
          <li>Next.js App Router + TypeScript + Tailwind</li>
          <li>Произношение: Web Speech API (speechSynthesis)</li>
          <li>Progress: localStorage (this browser only)</li>
          <li>App login is Basic Auth; progress stays local</li>
        </ul>
        <Link href="/progress" className="text-sm text-sky-600 dark:text-sky-400 inline-block">
          Смотреть прогресс →
        </Link>
      </section>

      <section className="card p-5 space-y-3 border-rose-200 dark:border-rose-900">
        <h2 className="font-semibold text-rose-700 dark:text-rose-300">Сброс прогресса</h2>
        <p className="text-sm text-slate-500">
          Deletes streak, SRS, card Easy/Hard/Good, lesson completion, speaking scores and level filters on this device.
        </p>
        {!confirmReset ? (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="rounded-xl border border-rose-300 text-rose-700 dark:text-rose-300 px-4 py-2 text-sm font-medium hover:bg-rose-50 dark:hover:bg-rose-950/40"
          >
            Сбросить всё…
          </button>
        ) : (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                onReset();
                setConfirmReset(false);
                setGoal(null);
                setSaved(false);
              }}
              className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 text-sm font-medium"
            >
              Да, удалить прогресс
            </button>
            <button
              type="button"
              onClick={() => setConfirmReset(false)}
              className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm"
            >
              Отмена
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
