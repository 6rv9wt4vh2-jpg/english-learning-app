"use client";

import { allUnits } from "@/data/course";
import { deckCards } from "@/data/decks";
import { listeningByLevel } from "@/data/listening";
import { speakingTasks } from "@/data/speaking";
import { GROUP_SIZE, groupStats, readStatus, type StatusMap } from "@/lib/decks";
import { LEVEL_CARD, type LevelSlug } from "@/lib/levels";
import { readJSON } from "@/lib/persist";

export type SkillCounts = { done: number; total: number };

export type LevelProgress = {
  slug: LevelSlug;
  words: SkillCounts;
  grammar: SkillCounts;
  reading: SkillCounts;
  writing: SkillCounts;
  speaking: SkillCounts;
  listening: SkillCounts;
};

function unitDone(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem("unitdone") || "[]"));
  } catch {
    return new Set();
  }
}

function speakDoneIds(): Set<string> {
  const scores = readJSON<Record<string, { words?: number; checkedAt?: string }>>("speakdone:v2", {});
  const set = new Set<string>();
  for (const t of speakingTasks) {
    const sc = scores[t.id];
    if (!sc) continue;
    if (sc.checkedAt || (sc.words ?? 0) >= Math.max(1, Math.floor(t.targetWords * 0.8))) set.add(t.id);
  }
  return set;
}

export function getLevelProgress(slug: LevelSlug): LevelProgress {
  const meta = LEVEL_CARD[slug];
  const cefr = meta.cefr;
  const done = typeof window === "undefined" ? new Set<string>() : unitDone();
  const speak = typeof window === "undefined" ? new Set<string>() : speakDoneIds();

  const cards = deckCards[meta.deckSlug] || [];
  const st: StatusMap = typeof window === "undefined" ? {} : readStatus(meta.deckSlug);
  const words = groupStats(cards, st);

  const byType = (type: "grammar" | "reading" | "writing") => {
    const list = allUnits.filter((u) => u.level === cefr && u.type === type);
    // For B2 Plus card: grammar/reading/writing still share CEFR B2 — count same B2 units once per B2 card.
    // B2 Core and B2 Plus both show B2 lesson progress (shared curriculum).
    return { done: list.filter((u) => done.has(u.id)).length, total: list.length };
  };

  const speakList = speakingTasks.filter((t) => t.level === cefr);
  const listenList = listeningByLevel[cefr] || [];

  return {
    slug,
    words: { done: words.easy, total: words.total },
    grammar: byType("grammar"),
    reading: byType("reading"),
    writing: byType("writing"),
    speaking: { done: speakList.filter((t) => speak.has(t.id)).length, total: speakList.length },
    listening: { done: listenList.filter((l) => done.has(l.id)).length, total: listenList.length },
  };
}

export function levelOverallPct(p: LevelProgress) {
  const skills = [p.words, p.grammar, p.reading, p.writing, p.speaking, p.listening];
  const done = skills.reduce((s, x) => s + x.done, 0);
  const total = skills.reduce((s, x) => s + x.total, 0);
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

export { GROUP_SIZE };
