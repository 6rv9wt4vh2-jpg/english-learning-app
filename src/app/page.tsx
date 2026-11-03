"use client";

import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";
import StatCard from "@/components/StatCard";
import { Loading } from "@/components/ui";
import { LEVELS, LEVEL_META, TYPE_META, allUnits, unitsByLevel } from "@/data/course";
import { deckCards } from "@/data/decks";
import { DECKS, countEasyAll } from "@/lib/decks";
import { useProgress } from "@/lib/hooks";
import { getAccuracy } from "@/lib/storage";
import { useUnitProgress } from "@/lib/units";

const totalCards = DECKS.reduce((s, d) => s + deckCards[d.slug].length, 0);

function Bi({ en, ru }: { en: string; ru: string }) {
  return <>{en} <span className="font-medium opacity-60">/ {ru}</span></>;
}

const TILES = [
  { href: "/vocabulary", emoji: "📚", en: "Words", ru: "Словарь", grad: "from-emerald-400 to-teal-600" },
  { href: "/cards", emoji: "🃏", en: "Cards", ru: "Карточки", grad: "from-amber-400 to-orange-600" },
  { href: "/lessons", emoji: "🎓", en: "Lessons", ru: "Уроки", grad: "from-fuchsia-500 to-purple-600" },
  { href: "/speaking", emoji: "🎙️", en: "Speaking", ru: "Говорение", grad: "from-rose-400 to-pink-600" },
  { href: "/grammar", emoji: "📐", en: "Grammar", ru: "Грамматика", grad: "from-fuchsia-500 to-purple-600" },
  { href: "/reading", emoji: "📖", en: "Reading", ru: "Чтение", grad: "from-cyan-400 to-blue-600" },
  { href: "/writing", emoji: "✍️", en: "Writing", ru: "Письмо", grad: "from-amber-400 to-orange-600" },
  { href: "/listening", emoji: "🎧", en: "Listening", ru: "Аудирование", grad: "from-cyan-400 to-blue-600" },
  { href: "/progress", emoji: "📊", en: "Progress", ru: "Прогресс", grad: "from-lime-400 to-green-600" },
];

export default function HomePage() {
  const { progress, ready } = useProgress();
  const units = useUnitProgress();
    const nextUnit = allUnits.find((u) => !units.done.includes(u.id)) ?? allUnits[0];
  const learned = typeof window === "undefined" ? 0 : countEasyAll(DECKS.map((d) => d.slug));
  const accuracy = getAccuracy(progress);
  const goal = progress.dailyGoal || 20;
  const today = progress.reviewsToday || 0;

  if (!ready || !units.ready) return <Loading />;
  const tm = TYPE_META[nextUnit.type];

  return (
    <div className="space-y-8">
      <header className="pop-in relative overflow-hidden rounded-3xl p-6 sm:p-8 text-white shadow-xl bg-gradient-to-br from-sky-400 via-indigo-500 to-fuchsia-500">
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/15" />
        <div className="absolute right-16 -bottom-12 h-28 w-28 rounded-full bg-white/10" />
        <p className="relative text-sm font-semibold opacity-90">Welcome! · Добро пожаловать!</p>
        <h1 className="relative mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight">Learn English calmly</h1>
        <p className="relative text-lg font-semibold opacity-90">Учим английский спокойно</p>
        <p className="relative mt-3 max-w-xl text-sm opacity-90">
          Words, spaced repetition, lessons and listening — offline in your browser.
          <br /><span className="opacity-80">Слова, интервальные повторения, уроки и аудирование — всё офлайн в браузере.</span>
        </p>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard index={0} label="Streak / Серия" value={progress.streak} emoji="🔥" hint="days / дней" />
        <StatCard index={1} label="Learned / Выучено" value={learned} emoji="✨" hint={`of / из ${totalCards}`} />
        <StatCard index={2} label="Accuracy / Точность" value={`${accuracy}%`} emoji="🎯" />
        <StatCard index={3} label="Lessons / Уроки" value={`${units.done.length}/${allUnits.length}`} emoji="🎓" />
      </div>

      <section className="card p-5 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-bold text-lg"><Bi en="Today's goal" ru="Цель на сегодня" /></h2>
          <span className="text-sm text-slate-500">{today} / {goal} reviews · повторений</span>
        </div>
        <ProgressBar value={today} max={goal} />
        <div className="flex flex-wrap gap-3 pt-1">
          <Link href="/speaking" className="btn-primary">🎙️ Speaking <span className="opacity-75">/ Говорить</span></Link>
          <Link href="/cards" className="btn-warm">🃏 Learn cards <span className="opacity-75">/ Учить</span></Link>
          <Link href="/listening" className="btn-ghost">🎧 Listening <span className="opacity-60">/ Аудирование</span></Link>
        </div>
      </section>

      <Link href={`/lessons/${nextUnit.id}`} className={`block pop-in relative overflow-hidden rounded-3xl p-5 text-white shadow-lg bg-gradient-to-br ${tm.gradient} hover:scale-[1.01] transition`}>
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/15" />
        <p className="text-xs font-bold uppercase tracking-wide opacity-90">Lesson of the day · Урок дня</p>
        <h2 className="mt-1 text-xl font-extrabold">{tm.emoji} {nextUnit.title}</h2>
        <p className="text-sm opacity-90">{nextUnit.titleRu} · {nextUnit.level} · {tm.label} / {tm.ru}</p>
        <span className="mt-3 inline-block rounded-xl bg-white/25 px-4 py-2 text-sm font-semibold">Open lesson / Открыть урок →</span>
      </Link>

      <section className="space-y-3">
        <h2 className="font-bold text-lg"><Bi en="Your levels" ru="Ваши уровни" /></h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {LEVELS.map((l) => {
            const u = unitsByLevel[l];
            const d = u.filter((x) => units.done.includes(x.id)).length;
            return (
              <Link key={l} href="/lessons" className={`rounded-3xl p-4 text-white shadow-md bg-gradient-to-br ${LEVEL_META[l].gradient} hover:scale-105 transition`}>
                <div className="text-2xl">{LEVEL_META[l].emoji}</div>
                <div className="text-xl font-extrabold">{l}</div>
                <div className="text-xs opacity-90">{LEVEL_META[l].ru}</div>
                <div className="mt-2 h-1.5 rounded-full bg-white/30"><div className="h-full rounded-full bg-white" style={{ width: `${(d / u.length) * 100}%` }} /></div>
                <div className="mt-1 text-[11px] font-semibold">{d}/{u.length} lessons</div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3">
        {TILES.map((t) => (
          <Link key={t.href} href={t.href} className={`rounded-3xl p-4 text-white shadow-md bg-gradient-to-br ${t.grad} hover:scale-[1.03] transition`}>
            <div className="text-3xl">{t.emoji}</div>
            <div className="mt-1 font-bold">{t.en}</div>
            <div className="text-sm opacity-90">{t.ru}</div>
          </Link>
        ))}
      </section>
    </div>
  );
}
