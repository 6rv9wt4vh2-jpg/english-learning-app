export type Level = "A1" | "A2" | "B1" | "B2" | "C1";
export type UnitType = "grammar" | "reading" | "writing";

export interface Exercise { q: string; answer: string; options?: string[]; }
export interface Question { q: string; options: string[]; correct: number; }

interface Base { id: string; level: Level; type: UnitType; title: string; titleRu: string; }
export interface GrammarUnit extends Base { type: "grammar"; explainRu: string; examples: [string, string][]; exercises: Exercise[]; }
export interface ReadingUnit extends Base { type: "reading"; text: string; textRu: string; glossary: [string, string][]; questions: Question[]; }
export interface WritingUnit extends Base { type: "writing"; promptEn: string; promptRu: string; minWords: number; model: string; checklist: string[]; phrases: [string, string][]; }
export type Unit = GrammarUnit | ReadingUnit | WritingUnit;

const pairs = (s: string): [string, string][] =>
  s.split(";").map((p) => p.trim()).filter(Boolean).map((p) => { const i = p.indexOf("="); return [p.slice(0, i).trim(), p.slice(i + 1).trim()]; });

/** exercise tuple: [question with ___, answer, options?] — options => multiple choice, else type the gap */
export type ExT = [string, string, string[]?];

export const mk = (level: Level) => ({
  g: (id: string, title: string, titleRu: string, explainRu: string, examples: string, exercises: ExT[]): GrammarUnit => ({
    id: `${level.toLowerCase()}-g-${id}`, level, type: "grammar", title, titleRu, explainRu,
    examples: examples.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => l.split("|") as [string, string]),
    exercises: exercises.map(([q, answer, options]) => ({ q, answer, options })),
  }),
  r: (id: string, title: string, titleRu: string, text: string, textRu: string, glossary: string, questions: [string, string[], number][]): ReadingUnit => ({
    id: `${level.toLowerCase()}-r-${id}`, level, type: "reading", title, titleRu, text: text.trim(), textRu: textRu.trim(),
    glossary: pairs(glossary), questions: questions.map(([q, options, correct]) => ({ q, options, correct })),
  }),
  w: (id: string, title: string, titleRu: string, promptEn: string, promptRu: string, minWords: number, model: string, checklist: string[], phrases: string): WritingUnit => ({
    id: `${level.toLowerCase()}-w-${id}`, level, type: "writing", title, titleRu, promptEn, promptRu, minWords, model: model.trim(), checklist, phrases: pairs(phrases),
  }),
});
