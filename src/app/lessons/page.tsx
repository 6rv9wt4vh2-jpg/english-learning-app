"use client";

import Link from "next/link";
import { useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import { Chip, FilterRow, Loading, PageHero } from "@/components/ui";
import { LEVELS, LEVEL_META, TYPE_META, allUnits, unitsByLevel, type Level, type UnitType } from "@/data/course";
import { lessons } from "@/data/lessons";
import { useProgress } from "@/lib/hooks";
import { useUnitProgress } from "@/lib/units";

const TYPES = Object.keys(TYPE_META) as UnitType[];

export default function LessonsPage() {
  const { done, ready } = useUnitProgress();
  const { progress } = useProgress();
  const [level, setLevel] = useState<Level | "all">("all");
  const [type, setType] = useState<UnitType | "all">("all");
  if (!ready) return <Loading />;
  const list = allUnits.filter((u) => (level === "all" || u.level === level) && (type === "all" || u.type === type));
  const showStarter = type === "all" && (level === "all" || level === "A1" || level === "A2");

  return (
    <div className="space-y-6">
      <PageHero title="Lessons" subtitle="Уроки · Grammar · Reading · Writing · A1–C1" emoji="🎓" gradient="from-fuchsia-500 to-purple-600">
        <p className="mt-2 text-sm font-semibold">{done.length}/{allUnits.length} completed</p>
      </PageHero>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {LEVELS.map((l) => {
          const u = unitsByLevel[l];
          const d = u.filter((x) => done.includes(x.id)).length;
          return (
            <button key={l} type="button" onClick={() => setLevel(level === l ? "all" : l)} className={`card p-4 text-left ${level === l ? "ring-4 ring-fuchsia-300" : ""}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`rounded-full px-3 py-1 text-sm font-bold text-white bg-gradient-to-r ${LEVEL_META[l].gradient}`}>{LEVEL_META[l].emoji} {l}</span>
                <span className="text-xs text-slate-500">{LEVEL_META[l].ru}</span>
              </div>
              <ProgressBar value={d} max={u.length} label="Progress" />
            </button>
          );
        })}
      </div>

      <div className="card p-4 space-y-3">
        <FilterRow label="Level / Уровень">
          <Chip active={level === "all"} onClick={() => setLevel("all")}>All</Chip>
          {LEVELS.map((l) => <Chip key={l} active={level === l} onClick={() => setLevel(l)} color={`bg-gradient-to-r ${LEVEL_META[l].gradient}`}>{LEVEL_META[l].emoji} {l}</Chip>)}
        </FilterRow>
        <FilterRow label="Type / Тип">
          <Chip active={type === "all"} onClick={() => setType("all")}>All</Chip>
          {TYPES.map((t) => <Chip key={t} active={type === t} onClick={() => setType(t)} color={`bg-gradient-to-r ${TYPE_META[t].gradient}`}>{TYPE_META[t].emoji} {TYPE_META[t].label}</Chip>)}
        </FilterRow>
        <p className="text-sm text-slate-500">Found: {list.length}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {list.map((u) => {
          const tm = TYPE_META[u.type];
          const isDone = done.includes(u.id);
          return (
            <Link key={u.id} href={`/lessons/${u.id}`} className={`pop-in relative overflow-hidden rounded-3xl p-5 text-white shadow-lg bg-gradient-to-br ${tm.gradient} hover:scale-[1.02] transition`}>
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/15" />
              <div className="flex items-center gap-2 text-xs font-bold">
                <span className={`rounded-full px-2.5 py-0.5 bg-gradient-to-r ${LEVEL_META[u.level].gradient} shadow`}>{u.level}</span>
                <span className="rounded-full px-2.5 py-0.5 bg-white/25">{tm.emoji} {tm.label}</span>
                {isDone && <span className="rounded-full px-2.5 py-0.5 bg-emerald-500 shadow">✓ Done</span>}
              </div>
              <div className="mt-3 text-lg font-bold leading-snug">{u.title}</div>
              <div className="text-sm opacity-90">{u.titleRu}</div>
            </Link>
          );
        })}
      </div>

      {showStarter && (
        <section className="space-y-3">
          <h2 className="text-lg font-bold">🌟 Starter topics <span className="text-sm font-medium text-slate-400">/ Стартовые темы A1–A2</span></h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {lessons.map((l) => (
              <Link key={l.id} href={`/lessons/${l.id}`} className="card p-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-full px-2.5 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-400 to-teal-500">{l.level}</span>
                  {progress.completedLessons.includes(l.id) && <span className="text-xs font-bold text-emerald-600">✓ Done</span>}
                </div>
                <div className="mt-2 font-bold">{l.title}</div>
                <div className="text-sm text-slate-500">{l.titleRu}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
