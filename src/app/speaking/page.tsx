"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import GrammarCheck from "@/components/GrammarCheck";
import LevelBreadcrumb from "@/components/LevelBreadcrumb";
import { Chip, FilterRow, Loading, PageHero } from "@/components/ui";
import { LEVELS, LEVEL_META, type Level } from "@/data/course";
import { KIND_META, speakingTasks, type SpeakKind, type SpeakTask } from "@/data/speaking";
import { useAuth } from "@/components/AuthProvider";
import { cefrFromMyLevel, useLevelFilter } from "@/lib/levelFilter";
import { createStore } from "@/lib/persist";
import { progressStore, touchStudyDay } from "@/lib/storage";
import { hintCoverage, useContinuousRecognition } from "@/lib/recognition";

const SCORE_KEY = "speakdone:v2";
type ScoreMap = Record<string, { words: number; seconds: number; hints: number; checkedAt: string }>;
const scoreStore = createStore<ScoreMap>(
  SCORE_KEY,
  () => {
    // migrate flat speakdone percentages if present
    if (typeof window === "undefined") return {};
    try {
      const v2 = localStorage.getItem(SCORE_KEY);
      if (v2) return JSON.parse(v2);
      const legacy = localStorage.getItem("speakdone");
      if (!legacy) return {};
      const old = JSON.parse(legacy) as Record<string, number>;
      const next: ScoreMap = {};
      for (const [id, n] of Object.entries(old)) {
        next[id] = { words: 0, seconds: 0, hints: Math.round(n / 100), checkedAt: new Date().toISOString() };
      }
      return next;
    } catch {
      return {};
    }
  },
  (v) => !v || Object.keys(v).length === 0,
);

function Practice({
  task,
  onSaved,
  onClose,
  nextTask,
  onNext,
}: {
  task: SpeakTask;
  onSaved: (s: ScoreMap[string]) => void;
  onClose: () => void;
  nextTask?: SpeakTask;
  onNext?: () => void;
}) {
  const rec = useContinuousRecognition();
  const [showExample, setShowExample] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startedAt = useRef<number | null>(null);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const km = KIND_META[task.kind];
  const words = rec.transcript.trim() ? rec.transcript.trim().split(/\s+/).length : 0;
  const wpm = elapsed > 0 ? Math.round((words / elapsed) * 60) : 0;
  const coverage = useMemo(() => hintCoverage(rec.transcript, task.hints), [rec.transcript, task.hints]);
  const lengthOk = words >= task.targetWords;
  const unsupported = !rec.supported;

  useEffect(() => {
    rec.reset();
    setShowExample(false);
    setElapsed(0);
    startedAt.current = null;
    return () => {
      if (tick.current) clearInterval(tick.current);
      rec.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task.id]);

  const begin = () => {
    if (!startedAt.current) startedAt.current = Date.now();
    if (tick.current) clearInterval(tick.current);
    tick.current = setInterval(() => {
      if (startedAt.current) setElapsed(Math.round((Date.now() - startedAt.current) / 1000));
    }, 500);
    rec.start();
  };

  const end = () => {
    rec.stop();
    if (tick.current) clearInterval(tick.current);
  };

  const saveStats = () => {
    const s = {
      words,
      seconds: elapsed || Math.max(1, Math.round(words / 2)),
      hints: coverage.used.length,
      checkedAt: new Date().toISOString(),
    };
    onSaved(s);
  };

  return (
    <div className="card p-5 space-y-4 pop-in ring-4 ring-fuchsia-200 dark:ring-fuchsia-900">
      <div className={`rounded-3xl p-4 text-white shadow-lg bg-gradient-to-br ${km.gradient} space-y-3`}>
        <LevelBreadcrumb sectionHref="/speaking" sectionLabel="🎙️ Speaking" level={task.level} currentTitle={km.label} />
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full px-3 py-1 text-xs font-bold bg-white/25">
            {km.emoji} {km.label} · {task.level}
          </span>
          <button type="button" className="rounded-full bg-white/25 px-3 py-1 text-sm font-semibold hover:bg-white/40" onClick={onClose}>
            ✕ Close
          </button>
        </div>
      </div>

      <div>
        <p className="text-2xl font-extrabold leading-snug">{task.prompt}</p>
        <p className="text-slate-500">{task.promptRu}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
          <span className="rounded-full bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200 px-3 py-1">🎯 ~{task.targetWords}+ words</span>
          <span className="rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200 px-3 py-1">⏱️ {task.targetSeconds}s–{Math.round(task.targetSeconds * 1.5)}s</span>
        </div>
      </div>

      <section className="space-y-2">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Useful phrases</h3>
        <div className="flex flex-wrap gap-2">
          {task.hints.map((h) => (
            <span key={h} className="rounded-2xl bg-fuchsia-50 dark:bg-fuchsia-950/40 px-3 py-1.5 text-sm font-semibold text-fuchsia-800 dark:text-fuchsia-200">
              {h}
            </span>
          ))}
        </div>
      </section>

      {unsupported ? (
        <p className="rounded-2xl bg-amber-50 dark:bg-amber-950/40 p-3 text-sm text-amber-800 dark:text-amber-200">
          🎙️ Speech recognition is not supported here (common on iOS Firefox; on iPhone use Safari). You can still type a long answer below.
        </p>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          {!rec.listening ? (
            <button type="button" className="btn-pink" onClick={begin}>
              🎙️ {rec.transcript ? "Continue speaking" : "Start speaking"}
            </button>
          ) : (
            <button type="button" className="btn-warm animate-pulse" onClick={end}>
              ⏹ Stop
            </button>
          )}
          <button type="button" className="btn-ghost" onClick={() => rec.reset()}>
            Clear text
          </button>
          {rec.listening && <span className="text-sm text-rose-600 font-semibold">● Listening… speak freely (30s–2min)</span>}
        </div>
      )}
      {rec.error && <p className="text-sm text-rose-600">⚠️ {rec.error}</p>}

      <div>
        <div className="flex flex-wrap gap-2 text-xs font-bold mb-1">
          <span className={`rounded-full px-3 py-1 text-white ${lengthOk ? "bg-emerald-500" : "bg-orange-400"}`}>{words}/{task.targetWords} words</span>
          <span className="rounded-full px-3 py-1 bg-slate-100 dark:bg-slate-800">{elapsed}s · {wpm} wpm</span>
          <span className="rounded-full px-3 py-1 bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/40">Hints used {coverage.used.length}/{task.hints.length}</span>
        </div>
        <p className="text-xs font-bold uppercase text-slate-400 mb-1">Your answer (editable)</p>
        <textarea
          className="input min-h-40 leading-relaxed"
          value={rec.listening ? `${rec.transcript}${rec.interim ? (rec.transcript ? " " : "") + rec.interim : ""}` : rec.transcript}
          onChange={(e) => {
            if (!rec.listening) rec.setTranscript(e.target.value);
          }}
          readOnly={rec.listening}
          placeholder="Speak or type your extended answer here…"
        />
        {rec.listening && rec.interim && <p className="mt-1 text-sm text-slate-400 italic">…{rec.interim}</p>}
      </div>

      <GrammarCheck text={rec.transcript} label="Check my answer" onChecked={saveStats} />

      {words > 0 && !rec.listening && (
        <div className="rounded-2xl bg-slate-50 dark:bg-slate-900 p-4 text-sm space-y-1">
          <p className="font-bold">Feedback</p>
          <p>{lengthOk ? "✅ Length looks good for this level." : `📝 Aim for about ${task.targetWords}+ words — add more detail.`}</p>
          <p>
            {coverage.ratio >= 0.4
              ? `✅ You used useful language: ${coverage.used.slice(0, 3).join(" · ") || "ok"}`
              : `💡 Try weaving in phrases like: ${coverage.missing.slice(0, 2).join(" · ")}`}
          </p>
          {elapsed > 0 && <p>⏱️ {elapsed}s speaking · {wpm} words/min</p>}
        </div>
      )}

      <div>
        {!showExample ? (
          <button type="button" className="btn-ghost" onClick={() => setShowExample(true)}>
            Show example answer
          </button>
        ) : (
          <div className="pop-in rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 p-4 text-sm leading-relaxed">
            <p className="text-xs font-bold uppercase text-emerald-700 mb-1">Example answer</p>
            {task.example}
          </div>
        )}
      </div>

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
            Next lesson · {nextTask.prompt.slice(0, 36)}{nextTask.prompt.length > 36 ? "…" : ""}
          </button>
        )}
      </div>
    </div>
  );
}

export default function SpeakingPage() {
  const { myLevel, ready: authReady } = useAuth();
  const defaultLevel = useMemo(() => cefrFromMyLevel(myLevel), [myLevel]);
  const { level, setLevel, ready: levelReady } = useLevelFilter("speaking", defaultLevel);
  const [kind, setKind] = useState<SpeakKind | "all">("all");
  const [active, setActive] = useState<SpeakTask | null>(null);
  const [scores, setScores] = useState<ScoreMap>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setScores(scoreStore.hydrate());
    setReady(true);
  }, []);

  const save = (id: string, s: ScoreMap[string]) => {
    scoreStore.update((prev) => {
      const cur = prev[id];
      // Always record a Check; keep best word/hint counts
      const next = {
        words: Math.max(cur?.words ?? 0, s.words),
        seconds: Math.max(cur?.seconds ?? 0, s.seconds),
        hints: Math.max(cur?.hints ?? 0, s.hints),
        checkedAt: s.checkedAt,
      };
      return { ...prev, [id]: next };
    });
    setScores(scoreStore.get());
    progressStore.update((p) => touchStudyDay(p));
  };

  if (!levelReady || !ready || !authReady) return <Loading />;

  const list = speakingTasks.filter((t) => t.level === level && (kind === "all" || t.kind === kind));
  const levelTasks = speakingTasks.filter((t) => t.level === level);
  const doneCount = levelTasks.filter((t) => {
    const sc = scores[t.id];
    return sc && (sc.words >= t.targetWords * 0.8 || !!sc.checkedAt);
  }).length;
  const orderedLevels: Level[] = [defaultLevel, ...LEVELS.filter((l) => l !== defaultLevel)];
  const sameLevel = active ? speakingTasks.filter((t) => t.level === active.level) : [];
  const activeIdx = active ? sameLevel.findIndex((t) => t.id === active.id) : -1;
  const nextTask = activeIdx >= 0 ? sameLevel[activeIdx + 1] : undefined;

  return (
    <div className="space-y-6">
      <PageHero title="Speaking" subtitle={`Extended answers · ${level}`} emoji="🎙️" gradient="from-rose-400 to-pink-600">
        <p className="mt-2 text-sm font-semibold">{level} · {doneCount}/{levelTasks.length} completed</p>
      </PageHero>
      <div className="card p-4 space-y-3">
        <FilterRow label="Level">
          {orderedLevels.map((l) => (
            <Chip key={l} active={level === l} onClick={() => setLevel(l)} color={`bg-gradient-to-r ${LEVEL_META[l].gradient}`}>
              {LEVEL_META[l].emoji} {l}{l === defaultLevel ? " · My" : ""}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Task type">
          <Chip active={kind === "all"} onClick={() => setKind("all")}>All types</Chip>
          {(Object.keys(KIND_META) as SpeakKind[]).map((k) => (
            <Chip key={k} active={kind === k} onClick={() => setKind(k)} color={`bg-gradient-to-r ${KIND_META[k].gradient}`}>
              {KIND_META[k].emoji} {KIND_META[k].label}
            </Chip>
          ))}
        </FilterRow>
        <p className="text-sm text-slate-500">{level}: {list.length} tasks</p>
      </div>
      {active && (
        <Practice
          key={active.id}
          task={active}
          onSaved={(s) => save(active.id, s)}
          onClose={() => {
            setLevel(active.level);
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
          const done = sc && sc.words >= t.targetWords * 0.8;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setActive(t);
                setLevel(t.level);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`pop-in relative overflow-hidden rounded-3xl p-5 text-left text-white shadow-lg bg-gradient-to-br ${km.gradient} hover:scale-[1.02] transition`}
            >
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/15" />
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                <span className={`rounded-full px-2.5 py-0.5 bg-gradient-to-r ${LEVEL_META[t.level].gradient} shadow`}>{t.level}</span>
                <span className="rounded-full px-2.5 py-0.5 bg-white/25">{km.emoji} {km.label}</span>
                <span className="rounded-full px-2.5 py-0.5 bg-white/25">~{t.targetWords}w</span>
                {sc && (
                  <span className={`rounded-full px-2.5 py-0.5 shadow ${done ? "bg-emerald-500" : "bg-orange-500"}`}>
                    {done ? "✓ " : ""}{sc.words}w
                  </span>
                )}
              </div>
              <div className="mt-3 font-bold leading-snug">{t.prompt}</div>
              <div className="text-sm opacity-90">{t.promptRu}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
