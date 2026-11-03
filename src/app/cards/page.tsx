"use client";

import Link from "next/link";
import { useState } from "react";
import { Chip, FilterRow, PageHero } from "@/components/ui";
import { deckCards } from "@/data/decks";
import { DECKS, groupCount } from "@/lib/decks";

const BANDS = [["all", "All"], ["a", "A1–A2"], ["b", "B1–B2"], ["c", "C1"]] as const;

export default function CardsIndex() {
  const [band, setBand] = useState<string>("all");
  const list = DECKS.filter((d) => band === "all" || d.slug.startsWith(band));
  return (
    <div className="space-y-6">
      <PageHero title="Cards" subtitle="Карточки по уровням CEFR · Oxford 3000 / 5000 · группы по 20" emoji="🃏" gradient="from-amber-400 to-orange-600" />
      <div className="card p-4">
        <FilterRow label="Level / Уровень">
          {BANDS.map(([k, l]) => <Chip key={k} active={band === k} onClick={() => setBand(k)} color="bg-gradient-to-r from-amber-400 to-orange-600">{l}</Chip>)}
          {DECKS.map((d) => <Chip key={d.slug} active={band === d.slug} onClick={() => setBand(d.slug)} color={`bg-gradient-to-r ${d.gradient}`}>{d.emoji} {d.title}</Chip>)}
        </FilterRow>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {list.map((d) => {
          const n = deckCards[d.slug].length;
          const inner = (
            <div className={`pop-in rounded-3xl p-5 text-white shadow-lg bg-gradient-to-br ${d.gradient} ${n ? "hover:scale-[1.02] transition" : "opacity-50"}`}>
              <div className="text-4xl">{d.emoji}</div>
              <div className="mt-2 text-2xl font-bold">{d.title}</div>
              <div className="text-sm opacity-90">{d.subtitle} · {d.source}</div>
              <div className="mt-3 text-sm font-medium">{n ? `${n} cards · ${groupCount(n)} groups` : "Soon"}</div>
            </div>
          );
          return n ? <Link key={d.slug} href={`/cards/${d.slug}`}>{inner}</Link> : <div key={d.slug}>{inner}</div>;
        })}
      </div>
    </div>
  );
}
