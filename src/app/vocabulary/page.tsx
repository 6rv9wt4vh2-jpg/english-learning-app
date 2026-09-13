"use client";

import { useMemo, useState } from "react";
import SpeakButton from "@/components/SpeakButton";
import { lessons } from "@/data/lessons";
import { words } from "@/data/words";
import { useProgress } from "@/lib/hooks";

export default function VocabularyPage() {
  const { progress, ready } = useProgress();
  const [query, setQuery] = useState("");
  const [lessonFilter, setLessonFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return words.filter((w) => {
      if (lessonFilter !== "all" && w.lessonId !== lessonFilter) return false;
      if (levelFilter !== "all" && w.level !== levelFilter) return false;
      if (!q) return true;
      return (
        w.en.toLowerCase().includes(q) ||
        w.ru.toLowerCase().includes(q) ||
        w.example.toLowerCase().includes(q)
      );
    });
  }, [query, lessonFilter, levelFilter]);

  if (!ready) return <div className="text-slate-500">Загрузка…</div>;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Словарь</h1>
        <p className="text-slate-500 mt-1">Английский · русский · пример · произношение</p>
      </header>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск: hello, спасибо…"
          className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-400"
        />
        <select
          value={lessonFilter}
          onChange={(e) => setLessonFilter(e.target.value)}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm"
        >
          <option value="all">Все уроки</option>
          {lessons.map((l) => (
            <option key={l.id} value={l.id}>
              {l.titleRu}
            </option>
          ))}
        </select>
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm"
        >
          <option value="all">Все уровни</option>
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="B1">B1</option>
        </select>
      </div>

      <p className="text-sm text-slate-500">Найдено: {filtered.length}</p>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((w) => {
          const wp = progress.words[w.id];
          const known = wp && (wp.repetitions >= 2 || wp.correctCount >= 2);
          return (
            <article key={w.id} className="card p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{w.en}</h2>
                  <p className="text-sky-700 dark:text-sky-300">{w.ru}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] uppercase tracking-wide rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-slate-600 dark:text-slate-300">
                    {w.level}
                  </span>
                  {known && (
                    <span className="text-[10px] rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5">
                      выучено
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 italic">&ldquo;{w.example}&rdquo;</p>
              <p className="text-xs text-slate-500">{w.exampleRu}</p>
              <SpeakButton text={w.en} />
            </article>
          );
        })}
      </div>
    </div>
  );
}
