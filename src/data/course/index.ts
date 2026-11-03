import type { Level, Unit, UnitType } from "./types";
import { units as a1 } from "./a1";
import { units as a2 } from "./a2";
import { units as b1 } from "./b1";
import { units as b2 } from "./b2";
import { units as c1 } from "./c1";

export * from "./types";
export const LEVELS: Level[] = ["A1", "A2", "B1", "B2", "C1"];
export const unitsByLevel: Record<Level, Unit[]> = { A1: a1, A2: a2, B1: b1, B2: b2, C1: c1 };
export const allUnits: Unit[] = [...a1, ...a2, ...b1, ...b2, ...c1];
export const getUnit = (id: string) => allUnits.find((u) => u.id === id);
export const TYPE_META: Record<UnitType, { label: string; ru: string; emoji: string; gradient: string }> = {
  grammar: { label: "Grammar", ru: "Грамматика", emoji: "🧩", gradient: "from-fuchsia-500 to-purple-600" },
  reading: { label: "Reading", ru: "Чтение", emoji: "📖", gradient: "from-cyan-400 to-blue-600" },
  writing: { label: "Writing", ru: "Письмо", emoji: "✍️", gradient: "from-amber-400 to-orange-600" },
};
export const LEVEL_META: Record<Level, { gradient: string; emoji: string; ru: string; chip: string }> = {
  A1: { gradient: "from-emerald-400 to-teal-500", emoji: "🌱", ru: "Начальный", chip: "bg-emerald-500" },
  A2: { gradient: "from-lime-400 to-green-600", emoji: "🌿", ru: "Элементарный", chip: "bg-lime-500" },
  B1: { gradient: "from-amber-400 to-orange-500", emoji: "🔥", ru: "Средний", chip: "bg-amber-500" },
  B2: { gradient: "from-sky-400 to-indigo-500", emoji: "🚀", ru: "Выше среднего", chip: "bg-sky-500" },
  C1: { gradient: "from-pink-500 to-rose-600", emoji: "👑", ru: "Продвинутый", chip: "bg-pink-500" },
};
