import { notFound } from "next/navigation";
import { DECKS } from "@/lib/decks";
import { deckCards } from "@/data/decks";
import DeckClient from "./DeckClient";

export function generateStaticParams() {
  return DECKS.filter((d) => deckCards[d.slug].length).map((d) => ({ deck: d.slug }));
}

export default async function DeckPage({ params }: { params: Promise<{ deck: string }> }) {
  const { deck } = await params;
  const meta = DECKS.find((d) => d.slug === deck);
  const cards = deckCards[deck];
  if (!meta || !cards?.length) notFound();
  return <DeckClient meta={meta} cards={cards} />;
}
