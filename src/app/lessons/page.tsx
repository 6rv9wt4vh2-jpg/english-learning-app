"use client";

import Link from "next/link";
import { lessons } from "@/data/lessons";
import { useProgress } from "@/lib/hooks";

export default function LessonsPage() {
  const { progress, ready } = useProgress();

  if (!ready) return <div className="text-slate-500">Загрузка…</div>;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Уроки</h1>
        <p className="text-slate-500 mt-1">Грамматика и лексика · A1–A2</p>
      </header>

      <div className="space-y-3">
        {lessons.map((lesson, i) => {
          const done = progress.completedLessons.includes(lesson.id);
          return (
            <Link
              key={lesson.id}
              href={`/lessons/${lesson.id}`}
              className="card p-5 flex gap-4 items-start hover:border-sky-300 dark:hover:border-sky-700 transition"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 dark:bg-sky-900/40 text-sky-800 dark:text-sky-200 font-semibold">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-semibold text-lg">{lesson.titleRu}</h2>
                  <span className="text-[10px] uppercase rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5">
                    {lesson.level}
                  </span>
                  {done && (
                    <span className="text-[10px] rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5">
                      пройден
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 mt-0.5">{lesson.title}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{lesson.descriptionRu}</p>
                <p className="text-xs text-slate-500 mt-2">{lesson.wordIds.length} слов · {lesson.exercises.length} упражнения</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
