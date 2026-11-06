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
  if (typeof window === "undefined") return;
  try { localStorage.setItem(posKey(deck, group), String(pos)); } catch { /* ignore */ }
}

/* ---------- Study status: only "easy" counts as learned ---------- */
export type CardStatus = "hard" | "good" | "easy";
export type StatusMap = Record<string, CardStatus>;
export const MAX_CARRY = 30;

const statKey = (deck: string) => `deckstat:${deck}`;
const sessKey = (deck: string, g: number) => `decksess:${deck}:${g}`;

export function readStatus(deck: string): StatusMap {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(statKey(deck)) || "{}"); } catch { return {}; }
}
export function writeStatus(deck: string, m: StatusMap, force = false) {
  if (typeof window === "undefined") return;
  try {
    if (!force && Object.keys(m).length === 0) {
      const existing = localStorage.getItem(statKey(deck));
      if (existing && existing !== "{}" && existing !== "") return; // refuse empty overwrite
    }
    localStorage.setItem(statKey(deck), JSON.stringify(m));
  } catch { /* quota / private mode */ }
}
export function countEasyAll(slugs: string[]): number {
  return slugs.reduce((n, s) => n + Object.values(readStatus(s)).filter((v) => v === "easy").length, 0);
}

export interface Session { ids: string[]; pos: number; }
export function readSession(deck: string, g: number): Session | null {
  try { const v = JSON.parse(localStorage.getItem(sessKey(deck, g)) || "null"); return v && Array.isArray(v.ids) ? v : null; } catch { return null; }
}
export function writeSession(deck: string, g: number, s: Session) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(sessKey(deck, g), JSON.stringify(s));
    writePos(deck, g, s.pos);
  } catch { /* ignore */ }
}

/** Merge one card grade into disk status (always read-fresh — avoids stale React state). */
export function gradeCard(deck: string, id: string, grade: CardStatus): StatusMap {
  const st = { ...readStatus(deck), [id]: grade };
  writeStatus(deck, st);
  return st;
}

/** Hard/Good words from earlier groups that are still not Easy — they are carried into group g. */
export function carriedInto(cards: DeckCard[], g: number, st: StatusMap): DeckCard[] {
  return cards.slice(0, (g - 1) * GROUP_SIZE).filter((c) => st[c.id] === "hard" || st[c.id] === "good").slice(0, MAX_CARRY);
}

export function groupStats(items: DeckCard[], st: StatusMap) {
  let easy = 0, hard = 0, good = 0;
  for (const c of items) { const s = st[c.id]; if (s === "easy") easy++; else if (s === "hard") hard++; else if (s === "good") good++; }
  return { easy, hard, good, fresh: items.length - easy - hard - good, total: items.length, complete: easy === items.length };
}

/** First group to continue: in-progress session, else first not-all-Easy, else last group. */
export function continueGroup(deck: string, cards: DeckCard[]): number {
  const total = groupCount(cards.length);
  const st = readStatus(deck);
  for (let g = 1; g <= total; g++) {
    const sess = readSession(deck, g);
    if (sess && sess.pos > 0 && sess.pos < sess.ids.length) return g;
  }
  for (let g = 1; g <= total; g++) {
    const items = cards.slice((g - 1) * GROUP_SIZE, g * GROUP_SIZE);
    if (!groupStats(items, st).complete) return g;
  }
  return Math.max(1, total);
}

export function deckProgress(deck: string, cards: DeckCard[]) {
  const st = readStatus(deck);
  const s = groupStats(cards, st);
  return { ...s, continueAt: continueGroup(deck, cards) };
}
