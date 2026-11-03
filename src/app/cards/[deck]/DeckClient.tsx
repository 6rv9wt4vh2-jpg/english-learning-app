"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SpeakButton from "@/components/SpeakButton";
import { useProgress } from "@/lib/hooks";
import { GROUP_SIZE, groupCount, readPos, writePos, type DeckCard, type DeckMeta } from "@/lib/decks";
import type { SRSGrade } from "@/lib/types";

const GRADES: [SRSGrade, string, string][] = [
  ["again", "Again", "bg-gradient-to-b from-rose-500 to-red-600"],
  ["hard", "Hard", "bg-gradient-to-b from-orange-400 to-orange-600"],
  ["good", "Good", "bg-gradient-to-b from-emerald-400 to-green-600"],
  ["easy", "Easy", "bg-gradient-to-b from-sky-400 to-blue-600"],
];

export default function DeckClient({ meta, cards }: { meta: DeckMeta; cards: DeckCard[] }) {
  const { ready, onReview } = useProgress();
  const total = groupCount(cards.length);
  const [group, setGroup] = useState<number | null>(null);
  const [positions, setPositions] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setPositions(Array.from({ length: total }, (_, i) => readPos(meta.slug, i + 1)));
  }, [meta.slug, total, group]);

  const groupCards = group ? cards.slice((group - 1) * GROUP_SIZE, group * GROUP_SIZE) : [];

  const open = (g: number) => {
    const size = Math.min(GROUP_SIZE, cards.length - (g - 1) * GROUP_SIZE);
    const p = readPos(meta.slug, g);
    setIndex(p >= size ? size : p);
    setFlipped(false);
    setGroup(g);
  };

  const restart = () => {
    if (!group) return;
    writePos(meta.slug, group, 0);
    setIndex(0);
    setFlipped(false);
  };

  const grade = (g: SRSGrade) => {
    if (!group) return;
    const c = groupCards[index];
    onReview(c.id, g);
    const next = index + 1;
    writePos(meta.slug, group, next);
    setFlipped(false);
    setTimeout(() => setIndex(next), 150);
  };

  if (!ready) return <div className="text-slate-500">Загрузка…</div>;

  const header = (
    <div className={`rounded-3xl p-5 text-white shadow-lg bg-gradient-to-br ${meta.gradient}`}>
      <Link href="/cards" className="text-sm opacity-90 hover:underline">← Все уровни</Link>
      <h1 className="mt-1 text-3xl font-extrabold">{meta.emoji} {meta.title}</h1>
      <p className="text-sm opacity-90">{meta.subtitle} · {meta.source} · {cards.length} карточек</p>
    </div>
  );

  if (!group) {
    return (
      <div className="space-y-5 max-w-2xl mx-auto">
        {header}
        <p className="text-sm text-slate-500">Выберите группу. Прогресс сохраняется: вы продолжите с той карточки, где остановились.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Array.from({ length: total }, (_, i) => {
            const g = i + 1;
            const items = cards.slice(i * GROUP_SIZE, g * GROUP_SIZE);
            const pos = Math.min(positions[i] ?? 0, items.length);
            const done = pos >= items.length;
            return (
              <button key={g} type="button" onClick={() => open(g)}
                className={`text-left rounded-2xl p-3 border-2 transition hover:-translate-y-0.5 hover:shadow-md ${done ? `bg-gradient-to-br ${meta.gradient} text-white border-transparent` : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"}`}>
                <div className="flex justify-between font-bold">
                  <span>Группа {g}</span>
                  <span>{done ? "✅" : `${pos}/${items.length}`}</span>
                </div>
                <div className={`text-xs truncate ${done ? "opacity-90" : "text-slate-500"}`}>{items[0].en} – {items[items.length - 1].en}</div>
                <div className="mt-2 h-1.5 rounded-full bg-black/10 overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${done ? "from-white to-white" : meta.gradient}`} style={{ width: `${(pos / items.length) * 100}%` }} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const current = groupCards[index];

  return (
    <div className="space-y-5 max-w-lg mx-auto">
      {header}
      <div className="flex justify-between items-center text-sm">
        <button type="button" onClick={() => setGroup(null)} className="text-slate-500 hover:underline">← Группы</button>
        <span className="font-semibold">Группа {group} · {Math.min(index + 1, groupCards.length)}/{groupCards.length}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${meta.gradient} transition-all`} style={{ width: `${(index / groupCards.length) * 100}%` }} />
      </div>

      {!current ? (
        <div className={`rounded-3xl p-8 text-center text-white shadow-lg bg-gradient-to-br ${meta.gradient} space-y-4`}>
          <div className="text-5xl">🎉</div>
          <p className="text-xl font-bold">Группа {group} пройдена!</p>
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" onClick={restart} className="rounded-xl bg-white/20 hover:bg-white/30 px-4 py-2 font-medium">Пройти заново</button>
            {group < total && <button type="button" onClick={() => open(group + 1)} className="rounded-xl bg-white text-slate-900 px-4 py-2 font-medium">Следующая группа →</button>}
          </div>
        </div>
      ) : (
        <>
          <div className="[perspective:1200px]">
            <button type="button" onClick={() => setFlipped((f) => !f)}
              className={`relative w-full min-h-[280px] transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>
              <div className={`absolute inset-0 rounded-3xl p-7 text-left text-white shadow-xl bg-gradient-to-br ${meta.gradient} [backface-visibility:hidden] flex flex-col justify-center gap-3`}>
                <p className="text-xs uppercase tracking-widest opacity-80">English · {current.pos}</p>
                <p className="text-4xl font-extrabold break-words">{current.en}</p>
                <p className="text-lg italic opacity-95">&ldquo;{current.example}&rdquo;</p>
                <p className="text-xs opacity-75">Нажмите, чтобы перевернуть</p>
              </div>
              <div className="absolute inset-0 rounded-3xl p-7 text-left shadow-xl bg-white dark:bg-slate-900 border-4 border-transparent [background-clip:padding-box] [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center gap-3">
                <div className={`absolute inset-x-0 top-0 h-2 rounded-t-3xl bg-gradient-to-r ${meta.gradient}`} />
                <p className="text-xs uppercase tracking-widest text-slate-500">Перевод</p>
                <p className={`text-3xl font-extrabold bg-gradient-to-r ${meta.gradient} bg-clip-text text-transparent`}>{current.ru}</p>
                <p className="text-lg text-slate-700 dark:text-slate-200">{current.exampleRu}</p>
                <p className="text-sm italic text-slate-500">{current.en} — &ldquo;{current.example}&rdquo;</p>
              </div>
            </button>
          </div>
          <div className="flex justify-center gap-2">
            <SpeakButton text={current.en} />
            <SpeakButton text={current.example} />
          </div>
          {flipped ? (
            <div className="grid grid-cols-4 gap-2">
              {GRADES.map(([g, label, cls]) => (
                <button key={g} type="button" onClick={() => grade(g)} className={`rounded-2xl py-3 text-white font-bold shadow-md active:scale-95 transition ${cls}`}>{label}</button>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-slate-500">Сначала переверните карточку</p>
          )}
        </>
      )}
    </div>
  );
}
