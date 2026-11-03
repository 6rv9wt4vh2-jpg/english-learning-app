import Link from "next/link";
import { DECKS, groupCount } from "@/lib/decks";
import { deckCards } from "@/data/decks";

export default function CardsHome() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <header>
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-violet-500 to-sky-500 bg-clip-text text-transparent">Карточки по уровням</h1>
        <p className="text-sm text-slate-500">Слова Oxford 3000 / 5000 по уровням CEFR. Каждая колода разбита на группы по 20 карточек.</p>
      </header>
      <div className="grid sm:grid-cols-2 gap-4">
        {DECKS.map((d) => {
          const n = deckCards[d.slug].length;
          const inner = (
            <div className={`rounded-3xl p-5 text-white shadow-lg bg-gradient-to-br ${d.gradient} ${n ? "hover:scale-[1.02] transition" : "opacity-50"}`}>
              <div className="text-4xl">{d.emoji}</div>
              <div className="mt-2 text-2xl font-bold">{d.title}</div>
              <div className="text-sm opacity-90">{d.subtitle} · {d.source}</div>
              <div className="mt-3 text-sm font-medium">{n ? `${n} карточек · ${groupCount(n)} групп` : "Скоро"}</div>
            </div>
          );
          return n ? <Link key={d.slug} href={`/cards/${d.slug}`}>{inner}</Link> : <div key={d.slug}>{inner}</div>;
        })}
      </div>
    </div>
  );
}
