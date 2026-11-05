import type { Level } from "../course/types";
export type { Level };
export type ListenKind = "dialogue" | "monologue" | "dictation";
export interface ListenLine { s: "A" | "B" | "N"; en: string; ru: string; }
export interface ListenQ { q: string; options: string[]; correct: number; }
export interface ListenGap { line: number; word: string; }
export interface ListenLesson {
  id: string; level: Level; kind: ListenKind; title: string; titleRu: string; rate: number;
  speakers?: { A: string; B?: string }; lines: ListenLine[]; questions: ListenQ[]; gaps: ListenGap[];
}
export const RATE: Record<Level, number> = { A1: 0.8, A2: 0.85, B1: 0.9, B2: 0.95, C1: 1.0 };

/** lines: "A: English | Русский" per line (A/B speakers, N narrator). gaps: words to blank (first line containing the word). */
export const mkL = (level: Level) => (
  id: string, kind: ListenKind, title: string, titleRu: string, script: string,
  questions: [string, string[], number][], gapWords: string[], speakers?: { A: string; B?: string },
): ListenLesson => {
  const lines: ListenLine[] = script.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => {
    const m = l.match(/^([ABN]):\s*(.*)$/);
    const s = (m ? m[1] : "N") as ListenLine["s"];
    const [en, ru] = (m ? m[2] : l).split("|").map((x) => x.trim());
    return { s, en, ru: ru ?? "" };
  });
  const gaps = gapWords.map((w) => {
    const re = new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`);
    const line = lines.findIndex((l) => re.test(l.en));
    if (line < 0) throw new Error(`gap ${w} not found in ${id}`);
    return { line, word: w };
  });
  return { id: `${level.toLowerCase()}-l-${id}`, level, kind, title, titleRu, rate: RATE[level], speakers, lines,
    questions: questions.map(([q, options, correct]) => ({ q, options, correct })), gaps };
};
