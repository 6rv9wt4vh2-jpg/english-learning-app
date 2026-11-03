"use client";

import { useMemo, useState } from "react";
import SpeakButton from "@/components/SpeakButton";
import { Chip, FilterRow, Loading, PageHero } from "@/components/ui";
import { deckCards } from "@/data/decks";
import { DECKS } from "@/lib/decks";
import { useProgress } from "@/lib/hooks";

const POS: [string, string, RegExp][] = [
  ["noun", "Noun", /^n\./], ["verb", "Verb", /^(v\.|modal)/], ["adj", "Adjective", /^adj/], ["adv", "Adverb", /^adv/],
  ["prep", "Preposition", /^prep/], ["pron", "Pronoun/Det.", /^(pron|det)/], ["other", "Other", /^(conj|exclam|number|indefinite|definite|infinitive)/],
];
const posKey = (p: string) => POS.find(([, , re]) => re.test(p))?.[0] ?? "other";
const all = DECKS.flatMap((d) => deckCards[d.slug].map((c) => ({ ...c, deck: d.slug })));
const PAGE = 60;

export default function WordsPage() {
  const { progress, ready } = useProgress();
  const [q, setQ] = useState("");
  const [level, setLevel] = useState("all");
  const [pos, setPos] = useState("all");
  const [status, setStatus] = useState<"all" | "new" | "learned">("all");
  const [limit, setLimit] = useState(PAGE);

  const isLearned = (id: string) => { const w = progress.words[id]; return !!w && (w.repetitions >= 2 || w.correctCount >= 2); };
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return all.filter((c) =>
      (level === "all" || c.deck === level) &&
      (pos === "all" || posKey(c.pos) === pos) &&
      (status === "all" || (status === "learned") === isLearned(c.id)) &&
      (!s || c.en.toLowerCase().includes(s) || c.ru.toLowerCase().includes(s)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, level, pos, status, progress.words]);

  if (!ready) return <Loading />;
  const reset = () => setLimit(PAGE);

  return (
    <div className="space-y-6">
      <PageHero title="Words" subtitle={`Словарь · ${all.length} words · A1–C1 (Oxford 3000/5000)`} emoji="📚" gradient="from-emerald-400 to-teal-600" />
      <div className="card p-4 space-y-3">
        <input type="search" className="input" value={q} onChange={(e) => { setQ(e.target.value); reset(); }} placeholder="🔍 Search / Поиск: hello, спасибо…" />
        <FilterRow label="Level / Уровень">
          <Chip active={level === "all"} onClick={() => { setLevel("all"); reset(); }}>All</Chip>
          {DECKS.map((d) => <Chip key={d.slug} active={level === d.slug} onClick={() => { setLevel(d.slug); reset(); }} color={`bg-gradient-to-r ${d.gradient}`}>{d.emoji} {d.title}</Chip>)}
        </FilterRow>
        <FilterRow label="Part of speech / Часть речи">
          <Chip active={pos === "all"} onClick={() => { setPos("all"); reset(); }}>All</Chip>
          {POS.map(([k, label]) => <Chip key={k} active={pos === k} onClick={() => { setPos(k); reset(); }} color="bg-gradient-to-r from-fuchsia-500 to-purple-600">{label}</Chip>)}
        </FilterRow>
        <FilterRow label="Status / Статус">
          <Chip active={status === "all"} onClick={() => { setStatus("all"); reset(); }}>All</Chip>
          <Chip active={status === "new"} onClick={() => { setStatus("new"); reset(); }} color="bg-gradient-to-r from-amber-400 to-orange-500">🆕 New</Chip>
          <Chip active={status === "learned"} onClick={() => { setStatus("learned"); reset(); }} color="bg-gradient-to-r from-emerald-400 to-teal-600">✅ Learned</Chip>
        </FilterRow>
        <p className="text-sm text-slate-500">Found / Найдено: <b>{filtered.length}</b></p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.slice(0, limit).map((w) => {
          const d = DECKS.find((x) => x.slug === w.deck)!;
          return (
            <article key={w.id} className="card p-4 space-y-2 overflow-hidden relative">
              <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${d.gradient}`} />
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold">{w.en} <span className="text-xs font-medium text-slate-400">{w.pos}</span></h2>
                  <p className="font-medium text-teal-700 dark:text-teal-300">{w.ru}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold text-white bg-gradient-to-r ${d.gradient}`}>{d.title}</span>
                  {isLearned(w.id) && <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white bg-emerald-500">✓ learned</span>}
                </div>
              </div>
              <p className="text-sm italic text-slate-600 dark:text-slate-400">“{w.example}”</p>
              <p className="text-xs text-slate-500">{w.exampleRu}</p>
              <div className="flex flex-wrap gap-2">
                <SpeakButton text={w.en} />
                <SpeakButton text={w.example} label="Pronounce phrase" />
              </div>
            </article>
          );
        })}
      </div>
      {limit < filtered.length && (
        <div className="text-center"><button type="button" className="btn-success" onClick={() => setLimit((l) => l + PAGE)}>Show more / Показать ещё ({filtered.length - limit})</button></div>
      )}
    </div>
  );
}
