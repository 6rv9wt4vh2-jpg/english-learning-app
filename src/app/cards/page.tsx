"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Chip, FilterRow, Loading, PageHero } from "@/components/ui";
import { useAuth } from "@/components/AuthProvider";
import { deckCards } from "@/data/decks";
import { DECKS, groupCount, readStatus } from "@/lib/decks";
import { LEVEL_CARD, LEVEL_SLUGS, type LevelSlug } from "@/lib/levels";

export default function CardsIndex() {
  const { myLevel, ready } = useAuth();
  const defaultSlug = (myLevel in LEVEL_CARD ? myLevel : "a1") as LevelSlug;
  const [band, setBand] = useState<string | null>(null);
  const active = band ?? defaultSlug;
  const ordered = useMemo(() => [defaultSlug, ...LEVEL_SLUGS.filter((s) => s !== defaultSlug)], [defaultSlug]);

  if (!ready) return <Loading />;

  const list = DECKS.filter((d) => d.slug === active);

  return (
    <div className="space-y-6">
      <PageHero title="Cards" subtitle={`Flashcards · ${LEVEL_CARD[active as LevelSlug]?.title ?? active}`} emoji="🃏" gradient="from-amber-400 to-orange-600" />
      <div className="card p-4">
        <FilterRow label="Level">
          {ordered.map((s) => {
            const meta = LEVEL_CARD[s];
            return (
              <Chip key={s} active={active === s} onClick={() => setBand(s)} color={`bg-gradient-to-r ${meta.gradient}`}>
                {meta.emoji} {meta.title}
                {s === defaultSlug ? " · My" : ""}
              </Chip>
            );
          })}
        </FilterRow>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {list.map((d) => {
          const n = deckCards[d.slug].length;
          const easy = typeof window === "undefined" ? 0 : Object.values(readStatus(d.slug)).filter((v) => v === "easy").length;
          const inner = (
            <div className={`pop-in rounded-3xl p-5 text-white shadow-lg bg-gradient-to-br ${d.gradient} hover:scale-[1.02] transition`}>
              <div className="text-4xl">{d.emoji}</div>
              <div className="mt-2 text-2xl font-bold">{d.title}</div>
              <div className="text-sm opacity-90">{d.subtitle} · {d.source}</div>
              <div className="mt-3 text-sm font-medium">
                {easy}/{n} Easy · {groupCount(n)} groups
              </div>
            </div>
          );
          return (
            <Link key={d.slug} href={`/cards/${d.slug}`}>
              {inner}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
