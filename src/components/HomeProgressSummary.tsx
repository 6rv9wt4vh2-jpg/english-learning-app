"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { LEVELS, LEVEL_META, TYPE_META, allUnits, type Level, type UnitType } from "@/data/course";
import { deckCards } from "@/data/decks";
import { allListening, listeningByLevel } from "@/data/listening";
import { speakingTasks } from "@/data/speaking";
import { DECKS, deckProgress } from "@/lib/decks";
import { useProgress } from "@/lib/hooks";
import { readJSON } from "@/lib/persist";
import { useUnitProgress } from "@/lib/units";

type SpeakScore = Record<string, { words: number; checkedAt?: string }>;

function formatDate(iso: string | null): string {
  if (!iso) return "Not yet";
  try {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

function pct(done: number, total: number) {
  return total ? Math.round((done / total) * 100) : 0;
}

type LevelBar = { level: Level; done: number; total: number };
type SkillCard = {
  key: string;
  label: string;
  emoji: string;
  href: string;
  gradient: string;
  done: number;
  total: number;
  levels: LevelBar[];
  continueHref: string;
  continueLabel: string;
};

export default function HomeProgressSummary() {
  const { progress, ready } = useProgress();
  const units = useUnitProgress();
  const [speakScores, setSpeakScores] = useState<SpeakScore>({});
  const [deckTick, setDeckTick] = useState(0);

  useEffect(() => {
    if (!ready || !units.ready) return;
    setSpeakScores(readJSON<SpeakScore>("speakdone:v2", {}));
    setDeckTick((n) => n + 1);
  }, [ready, units.ready, units.done.length, progress.totalReviews, progress.lastPracticeDate, progress.streak, progress.studyDays?.length]);

  const skills: SkillCard[] = useMemo(() => {
    void deckTick;
    const doneSet = new Set(units.done);

    // Words / Cards — equal skill slot
    const deckRows = DECKS.map((meta) => {
      const cards = deckCards[meta.slug];
      const p = deckProgress(meta.slug, cards);
      return { meta, cards, ...p };
    });
    const easy = deckRows.reduce((s, d) => s + d.easy, 0);
    const cardTotal = deckRows.reduce((s, d) => s + d.total, 0);
    // Map decks to CEFR levels for per-level bars (b2+b2plus → B2)
    const cardLevels: LevelBar[] = LEVELS.map((level) => {
      const rows = deckRows.filter((d) =>
        level === "B2" ? d.meta.slug === "b2" || d.meta.slug === "b2plus" : d.meta.slug === level.toLowerCase(),
      );
      return {
        level,
        done: rows.reduce((s, r) => s + r.easy, 0),
        total: rows.reduce((s, r) => s + r.total, 0),
      };
    });
    const nextDeck = deckRows.find((d) => d.easy < d.total) ?? deckRows[0];
    const wordsSkill: SkillCard = {
      key: "words",
      label: "Words",
      emoji: "🃏",
      href: "/cards",
      gradient: "from-amber-400 to-orange-600",
      done: easy,
      total: cardTotal,
      levels: cardLevels,
      continueHref: nextDeck ? `/cards/${nextDeck.meta.slug}?g=${nextDeck.continueAt}` : "/cards",
      continueLabel: nextDeck ? `Continue ${nextDeck.meta.title} G${nextDeck.continueAt}` : "Open cards",
    };

    function unitSkill(type: UnitType): SkillCard {
      const tm = TYPE_META[type];
      const list = allUnits.filter((u) => u.type === type);
      const levels = LEVELS.map((level) => {
        const at = list.filter((u) => u.level === level);
        return { level, done: at.filter((u) => doneSet.has(u.id)).length, total: at.length };
      });
      const next = list.find((u) => !doneSet.has(u.id));
      return {
        key: type,
        label: tm.label,
        emoji: tm.emoji,
        href: `/${type}`,
        gradient: tm.gradient,
        done: list.filter((u) => doneSet.has(u.id)).length,
        total: list.length,
        levels,
        continueHref: next ? `/lessons/${next.id}` : `/${type}`,
        continueLabel: next ? `Continue · ${next.level}` : "All done",
      };
    }

    const speakDone = (id: string) => {
      const t = speakingTasks.find((x) => x.id === id);
      if (!t) return false;
      const sc = speakScores[id];
      // Checked at least once with some content, or met 80% target
      return !!sc && (sc.words >= Math.max(1, Math.floor(t.targetWords * 0.8)) || !!sc.checkedAt);
    };
    const speakLevels = LEVELS.map((level) => {
      const at = speakingTasks.filter((t) => t.level === level);
      return { level, done: at.filter((t) => speakDone(t.id)).length, total: at.length };
    });
    const nextSpeak = speakingTasks.find((t) => !speakDone(t.id));
    const speakingSkill: SkillCard = {
      key: "speaking",
      label: "Speaking",
      emoji: "🎙️",
      href: "/speaking",
      gradient: "from-rose-400 to-pink-600",
      done: speakingTasks.filter((t) => speakDone(t.id)).length,
      total: speakingTasks.length,
      levels: speakLevels,
      continueHref: nextSpeak ? `/speaking?level=${nextSpeak.level}` : "/speaking",
      continueLabel: nextSpeak ? `Continue · ${nextSpeak.level}` : "All done",
    };

    const listenLevels = LEVELS.map((level) => {
      const at = listeningByLevel[level];
      return { level, done: at.filter((l) => doneSet.has(l.id)).length, total: at.length };
    });
    const nextListen = allListening.find((l) => !doneSet.has(l.id));
    const listeningSkill: SkillCard = {
      key: "listening",
      label: "Listening",
      emoji: "🎧",
      href: "/listening",
      gradient: "from-cyan-400 to-blue-600",
      done: allListening.filter((l) => doneSet.has(l.id)).length,
      total: allListening.length,
      levels: listenLevels,
      continueHref: nextListen ? `/listening/${nextListen.id}` : "/listening",
      continueLabel: nextListen ? `Continue · ${nextListen.level}` : "All done",
    };

    return [
      wordsSkill,
      unitSkill("grammar"),
      unitSkill("reading"),
      unitSkill("writing"),
      speakingSkill,
      listeningSkill,
    ];
  }, [units.done, speakScores, deckTick]);

  if (!ready || !units.ready) return null;

  const overallDone = skills.reduce((s, k) => s + k.done, 0);
  const overallTotal = skills.reduce((s, k) => s + k.total, 0);
  const studyDays = progress.studyDays?.length ?? 0;

  return (
    <section className="space-y-4">
      <Link
        href="/progress"
        className="block pop-in relative overflow-hidden rounded-3xl p-5 text-white shadow-xl bg-gradient-to-br from-lime-400 via-emerald-500 to-teal-600 hover:scale-[1.01] transition"
      >
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/15" />
        <div className="relative flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider opacity-90">Your progress</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              {overallDone} / {overallTotal} · {pct(overallDone, overallTotal)}%
            </h2>
            <p className="text-sm opacity-90">All skills combined · tap for details</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <span className="rounded-full bg-white/25 px-3 py-1.5">🔥 {progress.streak} day streak</span>
            <span className="rounded-full bg-white/25 px-3 py-1.5">📅 {studyDays} study days</span>
            <span className="rounded-full bg-white/25 px-3 py-1.5">Last: {formatDate(progress.lastPracticeDate)}</span>
          </div>
        </div>
        <div className="relative mt-3 h-2.5 rounded-full bg-white/25 overflow-hidden">
          <div className="h-full rounded-full bg-white" style={{ width: `${pct(overallDone, overallTotal)}%` }} />
        </div>
      </Link>

      <div className="grid sm:grid-cols-2 gap-3">
        {skills.map((s) => {
          const p = pct(s.done, s.total);
          return (
            <div
              key={s.key}
              className={`pop-in relative overflow-hidden rounded-3xl p-4 text-white shadow-lg bg-gradient-to-br ${s.gradient} space-y-3`}
            >
              <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/15" />
              <div className="relative flex items-start justify-between gap-2">
                <div>
                  <Link href={s.href} className="text-lg font-extrabold hover:underline">
                    {s.emoji} {s.label}
                  </Link>
                  <p className="text-sm opacity-90">
                    {s.done}/{s.total} · {p}%
                  </p>
                </div>
                <Link
                  href={s.continueHref}
                  className="shrink-0 rounded-full bg-white text-slate-900 px-3 py-1.5 text-xs font-bold shadow hover:bg-white/90"
                >
                  {s.continueLabel.includes("done") ? "Review" : "Continue"}
                </Link>
              </div>
              <div className="relative h-2 rounded-full bg-black/15 overflow-hidden">
                <div className="h-full rounded-full bg-white" style={{ width: `${p}%` }} />
              </div>
              <div className="relative space-y-1.5">
                {s.levels.map((lv) => {
                  const lp = pct(lv.done, lv.total);
                  return (
                    <div key={lv.level} className="flex items-center gap-2 text-[11px] font-semibold">
                      <span className={`w-8 rounded-full px-1.5 py-0.5 text-center bg-gradient-to-r ${LEVEL_META[lv.level].gradient} shadow`}>
                        {lv.level}
                      </span>
                      <div className="flex-1 h-1.5 rounded-full bg-black/20 overflow-hidden">
                        <div className="h-full rounded-full bg-white/90" style={{ width: `${lp}%` }} />
                      </div>
                      <span className="w-12 text-right opacity-95">
                        {lv.done}/{lv.total}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="relative text-[11px] font-semibold opacity-90 truncate">{s.continueLabel}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
