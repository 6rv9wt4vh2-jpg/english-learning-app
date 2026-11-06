"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AfterLessonNav from "@/components/AfterLessonNav";
import LevelBreadcrumb from "@/components/LevelBreadcrumb";
import { LEVEL_META } from "@/data/course";
import { KIND_META, listeningByLevel, type ListenLesson } from "@/data/listening";
import { diffWords, speakLines, stopAll, ttsSupported } from "@/lib/listenSpeech";
import { useUnitProgress } from "@/lib/units";

const SPEEDS = [0.75, 1, 1.25];
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9']/g, "");

export default function ListeningLesson({ lesson }: { lesson: ListenLesson }) {
  const { mark, isDone } = useUnitProgress();
  const km = KIND_META[lesson.kind];
  const [speed, setSpeed] = useState(1);
  const [state, setState] = useState<"idle" | "playing" | "paused">("idle");
  const [cur, setCur] = useState(-1);
  const [supported, setSupported] = useState(true);
  const [showT, setShowT] = useState(false);
  const [showRu, setShowRu] = useState(false);
  const [mc, setMc] = useState<Record<number, number>>({});
  const [mcChecked, setMcChecked] = useState(false);
  const [gaps, setGaps] = useState<Record<number, string>>({});
  const [gapsChecked, setGapsChecked] = useState(false);
  const [dict, setDict] = useState<Record<number, string>>({});
  const [dictChecked, setDictChecked] = useState(false);
  const isDict = lesson.kind === "dictation";
  const rate = lesson.rate * speed;

  useEffect(() => {
    setSupported(ttsSupported());
    if (ttsSupported()) window.speechSynthesis.getVoices();
    return () => stopAll();
  }, []);

  const play = (from = 0, to = lesson.lines.length - 1) => {
    setState("playing");
    speakLines(lesson.lines, from, to, rate, setCur, () => { setState("idle"); setCur(-1); });
  };
  const pause = () => { window.speechSynthesis.pause(); setState("paused"); };
  const resume = () => { window.speechSynthesis.resume(); setState("playing"); };
  const stop = () => { stopAll(); setState("idle"); setCur(-1); };

  const mcScore = lesson.questions.filter((q, i) => mc[i] === q.correct).length;
  const gapScore = lesson.gaps.filter((g, i) => norm(gaps[i] || "") === norm(g.word)).length;
  const dictRes = lesson.lines.map((l, i) => diffWords(l.en, dict[i] || ""));
  const dictScore = dictRes.reduce((a, r) => a + r.correct, 0), dictTotal = dictRes.reduce((a, r) => a + r.total, 0);
  const allChecked = mcChecked && gapsChecked && (!isDict || dictChecked);
  const done = isDone(lesson.id);

  // auto-complete when all exercises checked
  useEffect(() => {
    if (allChecked && !isDone(lesson.id)) mark(lesson.id);
  }, [allChecked, lesson.id, mark, isDone]);

  const speaker = (s: string) => s === "N" ? "" : (lesson.speakers?.[s as "A" | "B"] ?? s);

  const siblings = listeningByLevel[lesson.level];
  const idx = siblings.findIndex((l) => l.id === lesson.id);
  const next = siblings[idx + 1];
  const lessonNav = (
    <AfterLessonNav
      level={lesson.level}
      sectionHref="/listening"
      nextHref={next ? `/listening/${next.id}` : undefined}
      nextTitle={next?.title}
    />
  );

  return (
    <div className="space-y-5">
      <header className={`pop-in relative overflow-hidden rounded-3xl p-6 text-white shadow-xl bg-gradient-to-br ${km.gradient}`}>
        <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/15" />
        <div className="relative mb-4">
          <LevelBreadcrumb sectionHref="/listening" sectionLabel="🎧 Listening" level={lesson.level} currentTitle={lesson.title} />
        </div>
        <div className="relative flex flex-wrap gap-2 text-xs font-bold">
          <Link href={`/listening?level=${lesson.level}`} className={`rounded-full px-2.5 py-0.5 bg-gradient-to-r ${LEVEL_META[lesson.level].gradient} shadow hover:brightness-110`}>{lesson.level}</Link>
          <span className="rounded-full px-2.5 py-0.5 bg-white/25">{km.emoji} {km.label}</span>
          {done && <span className="rounded-full px-2.5 py-0.5 bg-emerald-500 shadow">✓ Done</span>}
        </div>
        <h1 className="relative mt-3 text-2xl sm:text-3xl font-extrabold">{lesson.title}</h1>
        <p className="relative opacity-90">{lesson.titleRu}</p>
      </header>

      <section className="card pop-in p-5 space-y-4">
        <h2 className="text-lg font-bold">🎧 Listen <span className="text-sm font-medium text-slate-400">/ Слушайте</span></h2>
        {!supported && <p className="text-sm text-rose-600">Your browser does not support speech. Try Chrome, Edge or Safari. / Браузер не поддерживает озвучку.</p>}
        <div className="flex flex-wrap gap-2">
          {state === "idle" && <button type="button" className="btn-primary" onClick={() => play()}>▶ Play</button>}
          {state === "playing" && <button type="button" className="btn-warm" onClick={pause}>⏸ Pause</button>}
          {state === "paused" && <button type="button" className="btn-primary" onClick={resume}>▶ Resume</button>}
          <button type="button" className="btn-pink" onClick={() => { stop(); setTimeout(() => play(), 50); }}>↻ Replay</button>
          {state !== "idle" && <button type="button" className="btn-ghost" onClick={stop}>■ Stop</button>}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Speed / Скорость</span>
          {SPEEDS.map((s) => (
            <button key={s} type="button" onClick={() => setSpeed(s)} className={`chip ${speed === s ? "chip-active bg-gradient-to-r from-cyan-400 to-blue-600" : ""}`}>{s}x</button>
          ))}
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Sentence by sentence / По предложениям</div>
          <div className="flex flex-wrap gap-2">
            {lesson.lines.map((l, i) => (
              <button key={i} type="button" onClick={() => play(i, i)}
                className={`chip ${cur === i ? "chip-active bg-gradient-to-r from-amber-400 to-orange-500" : ""}`}>
                {l.s !== "N" ? `${speaker(l.s)} · ` : ""}{i + 1} 🔊
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-ghost" onClick={() => setShowT((s) => !s)}>{showT ? "Hide transcript" : "Show transcript"} 📜</button>
          <button type="button" className="btn-ghost" onClick={() => setShowRu((s) => !s)}>{showRu ? "Hide translation" : "Show RU translation"} 🇷🇺</button>
        </div>
        {(showT || showRu) && (
          <div className="space-y-2">
            {lesson.lines.map((l, i) => (
              <div key={i} className={`rounded-2xl p-3 ${cur === i ? "bg-amber-100 dark:bg-amber-900/30" : "bg-slate-50 dark:bg-slate-900"}`}>
                {showT && <p className="font-medium">{l.s !== "N" && <b className="text-cyan-600">{speaker(l.s)}: </b>}{l.en}</p>}
                {showRu && <p className="text-sm text-slate-500">{l.ru}</p>}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="card pop-in p-5 space-y-4">
        <h2 className="text-lg font-bold">✅ Comprehension <span className="text-sm font-medium text-slate-400">/ Понимание</span></h2>
        {lesson.questions.map((q, qi) => (
          <div key={qi} className="space-y-2">
            <p className="font-semibold">{qi + 1}. {q.q}</p>
            <div className="flex flex-wrap gap-2">
              {q.options.map((o, oi) => {
                const sel = mc[qi] === oi;
                const cls = mcChecked ? (oi === q.correct ? "chip-active bg-gradient-to-r from-emerald-400 to-teal-600" : sel ? "chip-active bg-gradient-to-r from-rose-400 to-pink-600" : "")
                  : sel ? "chip-active bg-gradient-to-r from-sky-500 to-indigo-600" : "";
                return <button key={oi} type="button" disabled={mcChecked} onClick={() => setMc({ ...mc, [qi]: oi })} className={`chip ${cls}`}>{o}</button>;
              })}
            </div>
          </div>
        ))}
        {mcChecked ? (
          <div className="space-y-3">
            <p className="font-bold">Score: {mcScore}/{lesson.questions.length} <button type="button" className="ml-2 text-sm text-cyan-600 underline" onClick={() => { setMcChecked(false); setMc({}); }}>Try again</button></p>
            {lessonNav}
          </div>
        ) : <button type="button" className="btn-primary" disabled={lesson.questions.some((_, i) => mc[i] === undefined)} onClick={() => setMcChecked(true)}>Check answers</button>}
      </section>

      <section className="card pop-in p-5 space-y-4">
        <h2 className="text-lg font-bold">🧩 Fill the gaps <span className="text-sm font-medium text-slate-400">/ Заполните пропуски на слух</span></h2>
        {lesson.gaps.map((g, gi) => {
          const line = lesson.lines[g.line];
          const re = new RegExp(`\\b${g.word}\\b`);
          const [before, after] = [line.en.slice(0, line.en.search(re)), line.en.slice(line.en.search(re) + g.word.length)];
          const ok = norm(gaps[gi] || "") === norm(g.word);
          return (
            <div key={gi} className="flex flex-wrap items-center gap-2">
              <button type="button" className="chip" onClick={() => play(g.line, g.line)} aria-label="Play sentence">🔊</button>
              <span>{before}</span>
              <input className={`input !w-36 ${gapsChecked ? (ok ? "!border-emerald-500 !bg-emerald-50" : "!border-rose-500 !bg-rose-50") : ""}`} value={gaps[gi] || ""} disabled={gapsChecked}
                onChange={(e) => setGaps({ ...gaps, [gi]: e.target.value })} autoCapitalize="off" autoCorrect="off" spellCheck={false} />
              <span>{after}</span>
              {gapsChecked && !ok && <span className="text-sm font-bold text-emerald-600">→ {g.word}</span>}
            </div>
          );
        })}
        {gapsChecked ? <p className="font-bold">Score: {gapScore}/{lesson.gaps.length} <button type="button" className="ml-2 text-sm text-cyan-600 underline" onClick={() => { setGapsChecked(false); setGaps({}); }}>Try again</button></p>
          : <button type="button" className="btn-primary" onClick={() => setGapsChecked(true)}>Check gaps / Проверить</button>}
      </section>

      {isDict && (
        <section className="card pop-in p-5 space-y-4">
          <h2 className="text-lg font-bold">📝 Dictation <span className="text-sm font-medium text-slate-400">/ Диктант: напишите, что слышите</span></h2>
          {lesson.lines.map((l, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center gap-2">
                <button type="button" className="chip" onClick={() => play(i, i)}>🔊 {i + 1}</button>
                <input className="input flex-1" value={dict[i] || ""} disabled={dictChecked} placeholder="Type what you hear…"
                  onChange={(e) => setDict({ ...dict, [i]: e.target.value })} autoCapitalize="off" autoCorrect="off" spellCheck={false} />
              </div>
              {dictChecked && (
                <p className="flex flex-wrap gap-1 text-sm">
                  {dictRes[i].tokens.map((t, k) => (
                    <span key={k} className={`rounded-lg px-1.5 py-0.5 font-semibold ${
                      t.t === "ok" ? "bg-emerald-100 text-emerald-700" : t.t === "wrong" ? "bg-amber-100 text-amber-700" : t.t === "missing" ? "bg-rose-100 text-rose-700 line-through" : "bg-slate-200 text-slate-500 line-through"}`}>{t.w}</span>
                  ))}
                  <span className="ml-2 text-slate-500">{dictRes[i].correct}/{dictRes[i].total}</span>
                </p>
              )}
            </div>
          ))}
          {dictChecked && <p className="text-xs text-slate-500">🟩 correct · 🟨 wrong word (yours→correct) · 🟥 missed · ⬜ extra</p>}
          {dictChecked ? <p className="font-bold">Score: {dictScore}/{dictTotal} words <button type="button" className="ml-2 text-sm text-cyan-600 underline" onClick={() => { setDictChecked(false); setDict({}); }}>Try again</button></p>
            : <button type="button" className="btn-primary" onClick={() => setDictChecked(true)}>Check dictation / Проверить</button>}
        </section>
      )}

      <section className="card p-5 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="btn-success" disabled={done || !allChecked} onClick={() => mark(lesson.id)}>
            {done ? "✓ Completed" : "Complete lesson"}
          </button>
          {!allChecked && !done && <span className="text-sm text-slate-500">Check every exercise first</span>}
        </div>
        {lessonNav}
      </section>
    </div>
  );
}
