import type { DeckCard } from "@/lib/decks";
import { cards as a1 } from "./a1";
import { cards as a2 } from "./a2";
import { cards as b1 } from "./b1";
import { cards as b2 } from "./b2core";
import { cards as b2plus } from "./b2plus";
import { cards as c1 } from "./c1";

export const deckCards: Record<string, DeckCard[]> = { a1, a2, b1, b2, b2plus, c1 };
