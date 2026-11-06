"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import AfterLessonNav from "@/components/AfterLessonNav";
import LevelBreadcrumb from "@/components/LevelBreadcrumb";
import SpeakButton from "@/components/SpeakButton";
import { PageHero } from "@/components/ui";
import { LEVEL_META } from "@/data/course";
import { getLessonById, lessons } from "@/data/lessons";
import { getWordsByLesson } from "@/data/words";
import { useProgress } from "@/lib/hooks";
import type { Level } from "@/data/course";

export default function LegacyLesson({ id }: { id: string }) {
  const lesson = getLessonById(id);
  const lessonWords = useMemo(() => (lesson ? getWordsByLesson(lesson.id) : []), [lesson]);
  const { progress, ready, onCompleteLesson } = useProgress();
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [checked, setChecked] = useState(false);

  if (!lesson) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Lesson not found</h1>
        <Link href="/lessons" className="text-sky-600">← All lessons</Link>
      </div>
    );
  }

  const level = lesson.level as Level;
  const lm = LEVEL_META[level] ?? LEVEL_META.A1;
  const siblings = lessons.filter((l) => l.level === lesson.level);
  const idx = siblings.findIndex((l) => l.id === lesson.id);
  const next = siblings[idx + 1];
  const done = ready && progress.completedLessons.includes(lesson.id);
  const allAnswered = lesson.exercises.every((_, i) => answers[i] != null);
  const score = lesson.exercises.reduce((acc, ex, i) => acc + (answers[i] === ex.correctIndex ? 1 : 0), 0);
  const nav = (
    <AfterLessonNav
      level={level}
      sectionHref="/lessons"
      nextHref={next ? `/lessons/${next.id}` : undefined}
      nextTitle={next?.title}
    />
  );

  const finish = () => {
    setChecked(true);
    if (score === lesson.exercises.length || score >= Math.ceil(lesson.exercises.length * 0.66)) {
      onCompleteLesson(lesson.id);
    }
  };

  return (
    <div className="space-y-8">
      <PageHero
        title={lesson.title}
        subtitle={lesson.titleRu}
        emoji="🌟"
        gradient="from-emerald-400 to-teal-500"
        breadcrumb={<LevelBreadcrumb sectionHref="/lessons" sectionLabel="🎓 Lessons" level={level} />}
      >
        <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
          <Link href={`/lessons?level=${level}`} className={`rounded-full px-3 py-1 bg-gradient-to-r ${lm.gradient} shadow hover:brightness-110`}>{level}</Link>
          {done && <span className="rounded-full px-3 py-1 bg-emerald-500 shadow">✓ Done</span>}
        </div>
      </PageHero>

      <p className="text-slate-600 dark:text-slate-400">{lesson.descriptionRu}</p>

      {lesson.sections.map((section, idx) => (
        <section key={idx} className="card p-5 space-y-3">
          <h2 className="font-semibold text-lg">{section.title}</h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">{section.content}</p>
          {section.examples && section.examples.length > 0 && (
            <ul className="space-y-2 mt-2">
              {section.examples.map((ex, i) => (
                <li key={i} className="rounded-xl bg-slate-50 dark:bg-slate-800/60 px-3 py-2 flex flex-wrap items-center justify-between gap-2">
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
        <h2 className="font-semibold text-lg">Lesson words</h2>
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
        <h2 className="font-semibold text-lg">Exercises</h2>
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
                  <button key={oi} type="button" disabled={checked} onClick={() => setAnswers((a) => ({ ...a, [i]: oi }))}
                    className={`w-full text-left rounded-xl border px-3 py-2.5 text-sm transition ${style}`}>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {!checked ? (
          <button type="button" disabled={!allAnswered} onClick={finish} className="btn-primary disabled:opacity-40">
            Check answers
          </button>
        ) : (
          <div className="space-y-3">
            <div className="card p-4 space-y-2">
              <p className="font-semibold">Score: {score}/{lesson.exercises.length}</p>
              <p className="text-sm text-slate-500">
                {score === lesson.exercises.length
                  ? "Excellent! Lesson marked complete."
                  : score >= Math.ceil(lesson.exercises.length * 0.66)
                    ? "Good! Lesson counted. You can retry later."
                    : "Try again — you need at least 2 out of 3."}
              </p>
              {done && <p className="text-sm text-emerald-600">In your progress ✓</p>}
            </div>
            {nav}
          </div>
        )}
      </section>

      <div className="card p-5 space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Continue</p>
        {nav}
      </div>
    </div>
  );
}
