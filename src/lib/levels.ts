import type { Level } from "@/data/course";

/** Home / account levels — B2 Core and B2 Plus are separate cards. */
export type LevelSlug = "a1" | "a2" | "b1" | "b2" | "b2plus" | "c1";

export const LEVEL_SLUGS: LevelSlug[] = ["a1", "a2", "b1", "b2", "b2plus", "c1"];

export const LEVEL_CARD: Record<
  LevelSlug,
  { title: string; cefr: Level; emoji: string; gradient: string; deckSlug: string; subtitle: string }
> = {
  a1: { title: "A1", cefr: "A1", emoji: "🌱", gradient: "from-emerald-400 to-teal-500", deckSlug: "a1", subtitle: "Beginner" },
  a2: { title: "A2", cefr: "A2", emoji: "🌿", gradient: "from-lime-400 to-green-600", deckSlug: "a2", subtitle: "Elementary" },
  b1: { title: "B1", cefr: "B1", emoji: "🔥", gradient: "from-amber-400 to-orange-500", deckSlug: "b1", subtitle: "Intermediate" },
  b2: { title: "B2 Core", cefr: "B2", emoji: "🚀", gradient: "from-sky-400 to-indigo-500", deckSlug: "b2", subtitle: "Upper-intermediate" },
  b2plus: { title: "B2 Plus", cefr: "B2", emoji: "💎", gradient: "from-violet-400 to-purple-600", deckSlug: "b2plus", subtitle: "Upper-intermediate+" },
  c1: { title: "C1", cefr: "C1", emoji: "👑", gradient: "from-pink-500 to-rose-600", deckSlug: "c1", subtitle: "Advanced" },
};

export function isLevelSlug(v: string): v is LevelSlug {
  return (LEVEL_SLUGS as string[]).includes(v);
}
