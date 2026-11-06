"use client";

import { useEffect, useState } from "react";
import GrammarCheck from "@/components/GrammarCheck";
import LevelBreadcrumb from "@/components/LevelBreadcrumb";
import SpeakButton from "@/components/SpeakButton";
import { Chip, FilterRow, Loading, PageHero } from "@/components/ui";
import { LEVELS, LEVEL_META } from "@/data/course";
import { KIND_META, speakingTasks, type SpeakKind, type SpeakTask } from "@/data/speaking";
import { useLevelFilter } from "@/lib/levelFilter";
import { compareSpeech, useRecognition } from "@/lib/recognition";

const KEY = "speakdone";
const readDone = (): Record<string, number> => { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; } };

function Practice({ task, onScore, onClose, nextTask, onNext }: {
  task: SpeakTask; onScore: (n: number) => void; onClose: () => void; nextTask?: SpeakTask; onNext?: () => void;
}) {
  const r = useRecognition();
  const [typed, setTyped] = useState("");
  const km = KIND_META[task.kind];
  const isRead = task.kind === "read";
  const answer = (r.transcript || typed).trim();
  const result = isRead && answer && !r.listening ? compareSpeech(task.en, answer) : null;
  const words = answer.split(/\s+/).filter(Boolean).length;
  const showNav = !!(result || (!isRead && words >= (task.minWords ?? 0) && !r.listening && answer));

  useEffect(() => { if (result) onScore(result.score); }, [result?.score]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (!isRead && words >= (task.minWords ?? 0) && !r.listening) onScore(100); }, [words, r.listening]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="card p-5 space-y-4 pop-in ring-4 ring-fuchsia-200 dark:ring-fuchsia-900">
      <div className={`rounded-3xl p-4 text-white shadow-lg bg-gradient-to-br ${km.gradient} space-y-3`}>
        <LevelBreadcrumb sectionHref="/speaking" sectionLabel="🎙️ Speaking" level={task.level} currentTitle={km.label} />
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full px-3 py-1 text-xs font-bold bg-white/25">{km.emoji} {km.label} · {task.level}</span>
          <button type="button" className="rounded-full bg-white/25 px-3 py-1 text-sm font-semibold hover:bg-white/40" onClick={onClose}>✕ Close</button>
        </div>
      </div>
      <div>
        <p className="text-2xl font-extrabold leading-snug">{task.en}</p>
        <p className="text-slate-500">{task.ru}</p>
        {task.hint && <p className="mt-2 text-sm text-fuchsia-700 dark:text-fuchsia-300">💡 {task.hint}{task.minWords ? ` · aim for ${task.minWords}+ words` : ""}</p>}
      </div>
      {isRead && <SpeakButton text={task.en} label="Listen first" />}

      {r.supported ? (
        <div className="flex flex-wrap items-center gap-3">
          {!r.listening
            ? <button type="button" className="btn-pink" onClick={() => r.start(!isRead)}>🎙️ {answer ? "Try again" : "Start speaking"}</button>
            : <button type="button" className="btn-warm animate-pulse" onClick={r.stop}>⏹ Stop</button>}
          {r.listening && <span className="text-sm text-rose-600 font-semibold">● Listening… speak in English</span>}
        </div>
      ) : (
        <p className="rounded-2xl bg-amber-50 dark:bg-amber-950/40 p-3 text-sm text-amber-800 dark:text-amber-200">
          🎙️ Speech recognition isn&apos;t supported in this browser. Use Chrome, Edge or Safari — or type your answer below.
        </p>
      )}
      {r.error && <p className="text-sm text-rose-600">⚠️ {r.error}</p>}

      <div>
        <p className="text-xs font-bold uppercase text-slate-400 mb-1">What you said</p>
        {r.supported && (r.transcript || r.interim)
          ? <p className="rounded-2xl bg-slate-50 dark:bg-slate-900 p-3">{r.transcript} <span className="text-slate-400">{r.interim}</span></p>
          : <textarea className="input min-h-20" value={typed} onChange={(e) => setTyped(e.target.value)} placeholder={r.supported ? "Your speech will appear here — or type it" : "Type your answer"} />}
        {!isRead && <p className="mt-1 text-xs text-slate-500">{words} words</p>}
      </div>

      {result && (
        <div className="space-y-2 pop-in">
          <div className={`inline-block rounded-full px-4 py-1.5 font-bold text-white bg-gradient-to-r ${result.score >= 80 ? "from-emerald-400 to-teal-600" : result.score >= 50 ? "from-amber-400 to-orange-500" : "from-rose-500 to-red-600"}`}>
            Score: {result.score}% {result.score >= 80 ? "🎉 Great!" : result.score >= 50 ? "👍 Almost" : "🔁 Try again"}
          </div>
          <p className="text-lg leading-9">
            {result.words.map((x, i) => (
              <span key={i} className={`mr-1.5 rounded px-1 ${x.ok ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200" : "bg-rose-100 text-rose-700 line-through decoration-2 dark:bg-rose-900/50 dark:text-rose-200"}`}>{x.w}</span>
            ))}
          </p>
          <p className="text-xs text-slate-500">🟩 recognised · 🟥 missed or mispronounced{result.extra.length ? ` · extra/wrong words: ${result.extra.join(", ")}` : ""}</p>
        </div>
      )}
      {!isRead && answer && !r.listening && <GrammarCheck key={answer} text={answer} label="Check grammar" />}

      {showNav && (
        <div className="flex flex-wrap gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className={`inline-flex items-center rounded-3xl px-5 py-3 text-sm font-bold text-white shadow-lg bg-gradient-to-r ${LEVEL_META[task.level].gradient}`}
          >
            Back to {task.level} list
          </button>
          {nextTask && onNext && (
            <button
              type="button"
              onClick={onNext}
              className="inline-flex items-center rounded-3xl px-5 py-3 text-sm font-bold text-white shadow-lg bg-gradient-to-r from-sky-500 to-indigo-600"
            >
              Next lesson · {nextTask.en.slice(0, 40)}{nextTask.en.length > 40 ? "…" : ""}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function SpeakingPage() {
  const { level, setLevel, ready: levelReady } = useLevelFilter("speaking");
  const [kind, setKind] = useState<SpeakKind | "all">("all");
  const [active, setActive] = useState<SpeakTask | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});
  useEffect(() => setScores(readDone()), []);

  const save = (id: string, n: number) => setScores((prev) => {
    if ((prev[id] ?? 0) >= n) return prev;
    const next = { ...prev, [id]: n };
    localStorage.setItem(KEY, JSON.stringify(next));
    return next;
  });

  if (!levelReady) return <Loading />;

  const list = speakingTasks.filter((t) => (level === "all" || t.level === level) && (kind === "all" || t.kind === kind));
  const doneCount = speakingTasks.filter((t) => (scores[t.id] ?? 0) >= 80).length;
  const sameLevel = active ? speakingTasks.filter((t) => t.level === active.level) : [];
  const activeIdx = active ? sameLevel.findIndex((t) => t.id === active.id) : -1;
  const nextTask = activeIdx >= 0 ? sameLevel[activeIdx + 1] : undefined;

  return (
    <div className="space-y-6">
      <PageHero title="Speaking" subtitle="Говорение · read aloud, answer, describe · A1–C1" emoji="🎙️" gradient="from-rose-400 to-pink-600">
        <p className="mt-2 text-sm font-semibold">{doneCount}/{speakingTasks.length} completed</p>
      </PageHero>
      <div className="card p-4 space-y-3">
        <FilterRow label="Level / Уровень">
          <Chip active={level === "all"} onClick={() => setLevel("all")}>All</Chip>
          {LEVELS.map((l) => <Chip key={l} active={level === l} onClick={() => setLevel(l)} color={`bg-gradient-to-r ${LEVEL_META[l].gradient}`}>{LEVEL_META[l].emoji} {l}</Chip>)}
        </FilterRow>
        <FilterRow label="Task / Задание">
          <Chip active={kind === "all"} onClick={() => setKind("all")}>All</Chip>
          {(Object.keys(KIND_META) as SpeakKind[]).map((k) => <Chip key={k} active={kind === k} onClick={() => setKind(k)} color={`bg-gradient-to-r ${KIND_META[k].gradient}`}>{KIND_META[k].emoji} {KIND_META[k].label}</Chip>)}
        </FilterRow>
        <p className="text-sm text-slate-500">Found: {list.length}{level !== "all" ? ` · ${level}` : ""}</p>
      </div>
      {active && (
        <Practice
          key={active.id}
          task={active}
          onScore={(n) => save(active.id, n)}
          onClose={() => {
            if (active.level) setLevel(active.level);
            setActive(null);
          }}
          nextTask={nextTask}
          onNext={() => {
            if (nextTask) {
              setActive(nextTask);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        />
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        {list.map((t) => {
          const km = KIND_META[t.kind];
          const sc = scores[t.id];
          return (
            <button key={t.id} type="button" onClick={() => { setActive(t); setLevel(t.level); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className={`pop-in relative overflow-hidden rounded-3xl p-5 text-left text-white shadow-lg bg-gradient-to-br ${km.gradient} hover:scale-[1.02] transition`}>
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/15" />
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                <span className={`rounded-full px-2.5 py-0.5 bg-gradient-to-r ${LEVEL_META[t.level].gradient} shadow`}>{t.level}</span>
                <span className="rounded-full px-2.5 py-0.5 bg-white/25">{km.emoji} {km.label}</span>
                {sc !== undefined && <span className={`rounded-full px-2.5 py-0.5 shadow ${sc >= 80 ? "bg-emerald-500" : "bg-orange-500"}`}>{sc >= 80 ? "✓ " : ""}{sc}%</span>}
              </div>
              <div className="mt-3 font-bold leading-snug">{t.en}</div>
              <div className="text-sm opacity-90">{t.ru}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
