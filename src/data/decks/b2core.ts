import type { DeckCard } from "@/lib/decks";
import { b2Cards } from "@/data/b2";

// Oxford 3000 B2: 728 cards (original B2 deck, ids kept for saved progress)
export const cards: DeckCard[] = b2Cards.map(({ id, en, pos, ru, example, exampleRu }) => ({ id, en, pos, ru, example, exampleRu }));
