export interface DeckCard {
  id: string;
  en: string;
  pos: string;
  ru: string;
  example: string;
  exampleRu: string;
}

export const GROUP_SIZE = 20;

export interface DeckMeta {
  slug: string;
  title: string;
  subtitle: string;
  source: string;
  emoji: string;
  gradient: string; // tailwind gradient classes
  ring: string;
}

export const DECKS: DeckMeta[] = [
  { slug: "a1", title: "A1", subtitle: "Начальный", source: "Oxford 3000", emoji: "🌱", gradient: "from-emerald-400 to-teal-500", ring: "ring-emerald-400" },
  { slug: "a2", title: "A2", subtitle: "Элементарный", source: "Oxford 3000", emoji: "🌿", gradient: "from-lime-400 to-green-600", ring: "ring-lime-400" },
  { slug: "b1", title: "B1", subtitle: "Средний", source: "Oxford 3000", emoji: "🔥", gradient: "from-amber-400 to-orange-500", ring: "ring-amber-400" },
  { slug: "b2", title: "B2 Core", subtitle: "Выше среднего", source: "Oxford 3000", emoji: "🚀", gradient: "from-sky-400 to-indigo-500", ring: "ring-sky-400" },
  { slug: "b2plus", title: "B2 Plus", subtitle: "Выше среднего, доп. слова", source: "Oxford 5000", emoji: "💎", gradient: "from-violet-400 to-purple-600", ring: "ring-violet-400" },
  { slug: "c1", title: "C1", subtitle: "Продвинутый", source: "Oxford 5000", emoji: "👑", gradient: "from-pink-500 to-rose-600", ring: "ring-pink-400" },
];

export function groupCount(n: number) {
  return Math.ceil(n / GROUP_SIZE);
}

export const posKey = (deck: string, group: number) => `deckpos:${deck}:${group}`;

export function readPos(deck: string, group: number): number {
  if (typeof window === "undefined") return 0;
  const v = Number(localStorage.getItem(posKey(deck, group)));
  return Number.isFinite(v) ? v : 0;
}

export function writePos(deck: string, group: number, pos: number) {
  localStorage.setItem(posKey(deck, group), String(pos));
}
