"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import SpeakButton from "@/components/SpeakButton";
import { getLessonById } from "@/data/lessons";
import { getWordsByLesson } from "@/data/words";
import { useProgress } from "@/lib/hooks";

export default function LegacyLesson({ id }: { id: string }) {


  const lesson = getLessonById(id);
  const lessonWords = useMemo(() => (lesson ? getWordsByLesson(lesson.id) : []), [lesson]);
  const { progress, ready, onCompleteLesson } = useProgress();
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [checked, setChecked] = useState(false);

  if (!lesson) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Урок не найден</h1>
        <Link href="/lessons" className="text-sky-600">
          ← Ко всем урокам
        </Link>
      </div>
    );
  }

  if (!ready) return <div className="text-slate-500">Загрузка…</div>;

  const done = progress.completedLessons.includes(lesson.id);
  const allAnswered = lesson.exercises.every((_, i) => answers[i] != null);
  const score = lesson.exercises.reduce((acc, ex, i) => {
    return acc + (answers[i] === ex.correctIndex ? 1 : 0);
  }, 0);

  const finish = () => {
    setChecked(true);
    if (score === lesson.exercises.length || score >= Math.ceil(lesson.exercises.length * 0.66)) {
      onCompleteLesson(lesson.id);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <Link href="/lessons" className="text-sm text-sky-600 dark:text-sky-400">
          ← Уроки
        </Link>
        <h1 className="text-2xl font-bold mt-2">{lesson.titleRu}</h1>
        <p className="text-slate-500">
          {lesson.title} · {lesson.level}
          {done ? " · ✓ пройден" : ""}
        </p>
        <p className="mt-2 text-slate-600 dark:text-slate-400">{lesson.descriptionRu}</p>
      </div>

      {lesson.sections.map((section, idx) => (
        <section key={idx} className="card p-5 space-y-3">
          <h2 className="font-semibold text-lg">{section.title}</h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
            {section.content}
          </p>
          {section.examples && section.examples.length > 0 && (
            <ul className="space-y-2 mt-2">
              {section.examples.map((ex, i) => (
                <li
                  key={i}
                  className="rounded-xl bg-slate-50 dark:bg-slate-800/60 px-3 py-2 flex flex-wrap items-center justify-between gap-2"
                >
                  <div>
                    <div className="font-medium">{ex.en}</div>
                    <div className="text-sm text-slate-500">{ex.ru}</div>
                  </div>
                  <SpeakButton text={ex.en} label="Pronounce phrase" className="shrink-0" />
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <section className="space-y-3">
        <h2 className="font-semibold text-lg">Слова урока</h2>
        <div className="grid sm:grid-cols-2 gap-2">
          {lessonWords.map((w) => (
            <div key={w.id} className="card p-3 flex items-center justify-between gap-2">
              <div>
                <div className="font-medium">{w.en}</div>
                <div className="text-sm text-sky-700 dark:text-sky-300">{w.ru}</div>
              </div>
              <SpeakButton text={w.en} />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-lg">Упражнения</h2>
        {lesson.exercises.map((ex, i) => (
          <div key={i} className="card p-4 space-y-3">
            <p className="font-medium">{ex.question}</p>
            <p className="text-sm text-slate-500">{ex.questionRu}</p>
            <div className="space-y-2">
              {ex.options.map((opt, oi) => {
                const selected = answers[i] === oi;
                let style = "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800";
                if (checked) {
                  if (oi === ex.correctIndex) style = "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30";
                  else if (selected) style = "border-rose-400 bg-rose-50 dark:bg-rose-900/30";
                } else if (selected) {
                  style = "border-sky-400 bg-sky-50 dark:bg-sky-900/30";
                }
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={checked}
                    onClick={() => setAnswers((a) => ({ ...a, [i]: oi }))}
                    className={`w-full text-left rounded-xl border px-3 py-2.5 text-sm transition ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {!checked ? (
          <button
            type="button"
            disabled={!allAnswered}
            onClick={finish}
            className="rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white px-5 py-2.5 text-sm font-medium"
          >
            Проверить ответы
          </button>
        ) : (
          <div className="card p-4 space-y-2">
            <p className="font-semibold">
              Результат: {score}/{lesson.exercises.length}
            </p>
            <p className="text-sm text-slate-500">
              {score === lesson.exercises.length
                ? "Отлично! Урок отмечен как пройденный."
                : score >= Math.ceil(lesson.exercises.length * 0.66)
                  ? "Хорошо! Урок засчитан. Можно повторить позже."
                  : "Попробуйте ещё раз — нужно минимум 2 из 3."}
            </p>
            {done && <p className="text-sm text-emerald-600">Урок в прогрессе ✓</p>}
          </div>
        )}
      </section>
    </div>
  );
}
