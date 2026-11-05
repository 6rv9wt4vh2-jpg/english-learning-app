import type { Level } from "../course/types";
import type { ListenKind, ListenLesson } from "./types";
import { lessons as a1 } from "./a1";
import { lessons as a2 } from "./a2";
import { lessons as b1 } from "./b1";
import { lessons as b2 } from "./b2";
import { lessons as c1 } from "./c1";
export * from "./types";
export const listeningByLevel: Record<Level, ListenLesson[]> = { A1: a1, A2: a2, B1: b1, B2: b2, C1: c1 };
export const allListening: ListenLesson[] = [...a1, ...a2, ...b1, ...b2, ...c1];
export const getListening = (id: string) => allListening.find((l) => l.id === id);
export const KIND_META: Record<ListenKind, { label: string; ru: string; emoji: string; gradient: string }> = {
  dialogue: { label: "Dialogue", ru: "Диалог", emoji: "💬", gradient: "from-cyan-400 to-blue-600" },
  monologue: { label: "Monologue", ru: "Монолог / объявление", emoji: "📢", gradient: "from-indigo-400 to-violet-600" },
  dictation: { label: "Dictation", ru: "Диктант", emoji: "📝", gradient: "from-teal-400 to-emerald-600" },
};
