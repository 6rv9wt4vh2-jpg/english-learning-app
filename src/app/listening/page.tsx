"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import { Chip, FilterRow, Loading, PageHero } from "@/components/ui";
import { useAuth } from "@/components/AuthProvider";
import { LEVELS, LEVEL_META, type Level } from "@/data/course";
import { KIND_META, allListening, listeningByLevel, type ListenKind } from "@/data/listening";
import { cefrFromMyLevel, useLevelFilter } from "@/lib/levelFilter";
import { useUnitProgress } from "@/lib/units";

const KINDS = Object.keys(KIND_META) as ListenKind[];

export default function ListeningPage() {
  const { done, ready: progressReady } = useUnitProgress();
  const { myLevel, ready: authReady } = useAuth();
  const defaultLevel = useMemo(() => cefrFromMyLevel(myLevel), [myLevel]);
  const { level, setLevel, ready: levelReady } = useLevelFilter("listening", defaultLevel);
  const [kind, setKind] = useState<ListenKind | "all">("all");
  if (!progressReady || !levelReady || !authReady) return <Loading />;

  const levelList = listeningByLevel[level];
  const levelDone = levelList.filter((x) => done.includes(x.id)).length;
  const list = allListening.filter((l) => l.level === level && (kind === "all" || l.kind === kind));
  const orderedLevels: Level[] = [defaultLevel, ...LEVELS.filter((l) => l !== defaultLevel)];

  return (
    <div className="space-y-6">
      <PageHero title="Listening" subtitle={`Listening · ${level}`} emoji="🎧" gradient="from-cyan-400 to-blue-600">
        <p className="mt-2 text-sm font-semibold">
          {level} · {levelDone}/{levelList.length} completed
        </p>
      </PageHero>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {orderedLevels.map((l) => {
          const u = listeningByLevel[l];
          const d = u.filter((x) => done.includes(x.id)).length;
          return (
            <button key={l} type="button" onClick={() => setLevel(l)} className={`card p-4 text-left ${level === l ? "ring-4 ring-cyan-300" : ""}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`rounded-full px-3 py-1 text-sm font-bold text-white bg-gradient-to-r ${LEVEL_META[l].gradient}`}>
                  {LEVEL_META[l].emoji} {l}
                  {l === defaultLevel ? " · My level" : ""}
                </span>
                <span className="text-xs text-slate-500">{d}/{u.length}</span>
              </div>
              <ProgressBar value={d} max={u.length || 1} label="Progress" />
            </button>
          );
        })}
      </div>

      <div className="card p-4 space-y-3">
        <FilterRow label="Level">
          {orderedLevels.map((l) => (
            <Chip key={l} active={level === l} onClick={() => setLevel(l)} color={`bg-gradient-to-r ${LEVEL_META[l].gradient}`}>
              {LEVEL_META[l].emoji} {l}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Type">
          <Chip active={kind === "all"} onClick={() => setKind("all")}>All types</Chip>
          {KINDS.map((k) => (
            <Chip key={k} active={kind === k} onClick={() => setKind(k)} color={`bg-gradient-to-r ${KIND_META[k].gradient}`}>
              {KIND_META[k].emoji} {KIND_META[k].label}
            </Chip>
          ))}
        </FilterRow>
        <p className="text-sm text-slate-500">
          {level}: {list.length} lessons
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {list.map((u) => {
          const km = KIND_META[u.kind];
          return (
            <Link key={u.id} href={`/listening/${u.id}`} className={`pop-in relative overflow-hidden rounded-3xl p-5 text-white shadow-lg bg-gradient-to-br ${km.gradient} hover:scale-[1.02] transition`}>
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/15" />
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                <span className={`rounded-full px-2.5 py-0.5 bg-gradient-to-r ${LEVEL_META[u.level].gradient} shadow`}>{u.level}</span>
                <span className="rounded-full px-2.5 py-0.5 bg-white/25">{km.emoji} {km.label}</span>
                {done.includes(u.id) && <span className="rounded-full px-2.5 py-0.5 bg-emerald-500 shadow">✓ Done</span>}
              </div>
              <div className="mt-3 text-lg font-bold leading-snug">{u.title}</div>
              <div className="text-sm opacity-90">{u.titleRu}</div>
            </Link>
          );
        })}
      </div>

      <Link href="/listening/words" className="card p-4 flex items-center gap-3">
        <span className="text-3xl">🔤</span>
        <div>
          <div className="font-bold">Word listening quiz</div>
          <div className="text-sm text-slate-500">Listen and choose the translation</div>
        </div>
      </Link>
    </div>
  );
}
