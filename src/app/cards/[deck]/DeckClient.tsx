"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import SpeakButton from "@/components/SpeakButton";
import { useProgress } from "@/lib/hooks";
import {
  GROUP_SIZE, carriedInto, groupCount, groupStats, readPos, readSession, readStatus, writeSession, writeStatus,
  type CardStatus, type DeckCard, type DeckMeta, type StatusMap,
} from "@/lib/decks";

const GRADES: [CardStatus, string, string][] = [
  ["hard", "Hard", "bg-gradient-to-b from-orange-500 to-orange-600"],
  ["good", "Good", "bg-gradient-to-b from-green-500 to-green-600"],
  ["easy", "Easy ✓", "bg-gradient-to-b from-blue-500 to-blue-600"],
];

function Counts({ s, light }: { s: { easy: number; fresh: number; hard: number; good: number }; light?: boolean }) {
  const base = "rounded-full px-2 py-0.5 text-[11px] font-bold";
  return (
    <div className="flex flex-wrap gap-1">
      <span className={`${base} ${light ? "bg-white/25" : "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-200"}`} title="Studied (Easy)">✓ {s.easy}</span>
      <span className={`${base} ${light ? "bg-white/25" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}`} title="Unstudied">○ {s.fresh}</span>
      <span className={`${base} ${light ? "bg-white/25" : "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-200"}`} title="Hard">H {s.hard}</span>
      <span className={`${base} ${light ? "bg-white/25" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200"}`} title="Good">G {s.good}</span>
    </div>
  );
}

export default function DeckClient({ meta, cards }: { meta: DeckMeta; cards: DeckCard[] }) {
  const { ready, onReview } = useProgress();
  const total = groupCount(cards.length);
  const byId = useMemo(() => new Map(cards.map((c) => [c.id, c])), [cards]);
  const [status, setStatus] = useState<StatusMap>({});
  const [group, setGroupState] = useState<number | null>(null);
  const [ids, setIds] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const own = useCallback((g: number) => cards.slice((g - 1) * GROUP_SIZE, g * GROUP_SIZE), [cards]);

  const load = useCallback((g: number | null) => {
    const st = readStatus(meta.slug);
    setStatus(st);
    setFlipped(false);
    setGroupState(g);
    if (!g) return;
    let s = readSession(meta.slug, g);
    if (!s) {
      const list = [...own(g), ...carriedInto(cards, g, st)].map((c) => c.id);
      s = { ids: list, pos: Math.min(readPos(meta.slug, g), list.length) }; // migrates the old resume position
      writeSession(meta.slug, g, s);
    }
    setIds(s.ids.filter((id) => byId.has(id)));
    setIndex(s.pos);
  }, [meta.slug, cards, byId, own]);

  // group lives in the URL (?g=5) so the browser back button and the breadcrumb work
  useEffect(() => {
    const fromUrl = () => { const g = Number(new URLSearchParams(window.location.search).get("g")); load(g >= 1 && g <= total ? g : null); };
    fromUrl();
    window.addEventListener("popstate", fromUrl);
    return () => window.removeEventListener("popstate", fromUrl);
  }, [load, total]);

  const go = (g: number | null) => {
    window.history.pushState(null, "", g ? `/cards/${meta.slug}?g=${g}` : `/cards/${meta.slug}`);
    load(g);
    window.scrollTo({ top: 0 });
  };

  const newSession = (g: number, onlyNotEasy: boolean) => {
    const st = readStatus(meta.slug);
    const mine = onlyNotEasy ? own(g).filter((c) => st[c.id] !== "easy") : own(g);
    const list = [...mine, ...carriedInto(cards, g, st)].map((c) => c.id);
    writeSession(meta.slug, g, { ids: list, pos: 0 });
    setIds(list); setIndex(0); setFlipped(false); setStatus(st);
  };

  const grade = (gr: CardStatus) => {
    if (!group) return;
    const id = ids[index];
    const st = { ...readStatus(meta.slug), [id]: gr };
    writeStatus(meta.slug, st);
    setStatus(st);
    onReview(id, gr); // still feeds the SRS schedule
    const next = index + 1;
    writeSession(meta.slug, group, { ids, pos: next });
    setFlipped(false);
    setTimeout(() => setIndex(next), 150);
  };

  const prev = () => {
    if (!group || index === 0) return;
    const p = index - 1;
    writeSession(meta.slug, group, { ids, pos: p });
    setFlipped(false);
    setIndex(p);
  };

  if (!ready) return <div className="text-slate-500">Loading… / Загрузка…</div>;

  const deckStats = groupStats(cards, status);
  const crumbs = (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm font-semibold">
      <Link href="/cards" className="rounded-full bg-white/25 px-3 py-1 hover:bg-white/40">🃏 Cards</Link>
      <span className="opacity-70">›</span>
      {group
        ? <button type="button" onClick={() => go(null)} className="rounded-full bg-white/25 px-3 py-1 hover:bg-white/40">{meta.emoji} {meta.title}</button>
        : <span className="rounded-full bg-white px-3 py-1 text-slate-900">{meta.emoji} {meta.title}</span>}
      {group && <><span className="opacity-70">›</span><span className="rounded-full bg-white px-3 py-1 text-slate-900">Group {group}</span></>}
    </nav>
  );

  const header = (
    <div className={`rounded-3xl p-5 text-white shadow-lg bg-gradient-to-br ${meta.gradient} space-y-3`}>
      {crumbs}
      <div>
        {group
          ? <button type="button" onClick={() => go(null)} className="text-left text-3xl font-extrabold hover:underline" title="Back to groups">{meta.emoji} {meta.title}</button>
          : <h1 className="text-3xl font-extrabold">{meta.emoji} {meta.title}</h1>}
        <p className="text-sm opacity-90">{meta.subtitle} · {meta.source} · {cards.length} cards · {deckStats.easy} learned (Easy)</p>
      </div>
    </div>
  );

  if (!group) {
    return (
      <div className="space-y-5 max-w-2xl mx-auto">
        {header}
        <div className="card p-3 text-sm text-slate-600 dark:text-slate-300 space-y-1">
          <p>✅ Only <b>Easy</b> marks a word as learned. <b>Hard</b> and <b>Good</b> words are carried into the next group until you mark them Easy.</p>
          <p className="text-slate-500">Только «Easy» = выучено. Слова с «Hard»/«Good» переносятся в следующую группу, пока вы не нажмёте «Easy».</p>
          <div className="flex flex-wrap gap-2 pt-1 text-xs"><Counts s={{ easy: 0, fresh: 0, hard: 0, good: 0 }} /> <span>= studied · unstudied · hard · good</span></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Array.from({ length: total }, (_, i) => {
            const g = i + 1;
            const items = own(g);
            const s = groupStats(items, status);
            const carry = carriedInto(cards, g, status).length;
            const sess = typeof window !== "undefined" ? readSession(meta.slug, g) : null;
            const started = !!sess && sess.pos > 0 && sess.pos < sess.ids.length;
            return (
              <button key={g} type="button" onClick={() => go(g)}
                className={`text-left rounded-2xl p-3 border-2 transition hover:-translate-y-0.5 hover:shadow-md space-y-1.5 ${s.complete ? `bg-gradient-to-br ${meta.gradient} text-white border-transparent` : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"}`}>
                <div className="flex justify-between font-bold">
                  <span>Group {g}</span>
                  <span>{s.complete ? "✅" : `${s.easy}/${s.total}`}</span>
                </div>
                <div className={`text-xs truncate ${s.complete ? "opacity-90" : "text-slate-500"}`}>{items[0].en} – {items[items.length - 1].en}</div>
                <Counts s={s} light={s.complete} />
                {(carry > 0 || started) && (
                  <div className={`text-[11px] font-semibold ${s.complete ? "" : "text-fuchsia-600 dark:text-fuchsia-300"}`}>
                    {carry > 0 && `↩ +${carry} carried`}{carry > 0 && started && " · "}{started && `▶ resume ${sess!.pos + 1}/${sess!.ids.length}`}
                  </div>
                )}
                <div className="h-1.5 rounded-full bg-black/10 overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${s.complete ? "from-white to-white" : meta.gradient}`} style={{ width: `${(s.easy / s.total) * 100}%` }} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const ownIds = new Set(own(group).map((c) => c.id));
  const sessionCards = ids.map((id) => byId.get(id)!).filter(Boolean);
  const sStats = groupStats(own(group), status);
  const current = sessionCards[index];
  const isCarried = current && !ownIds.has(current.id);
  const fromGroup = current ? Math.floor(cards.indexOf(current) / GROUP_SIZE) + 1 : 0;
  const carriedCount = sessionCards.filter((c) => !ownIds.has(c.id)).length;
  const curStatus = current ? status[current.id] : undefined;

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      {header}
      <div className="card p-3 space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="font-bold">Group {group} · card {Math.min(index + 1, sessionCards.length)}/{sessionCards.length}</span>
          {carriedCount > 0 && <span className="text-xs font-semibold text-fuchsia-600 dark:text-fuchsia-300">↩ {carriedCount} carried in</span>}
        </div>
        <Counts s={sStats} />
        <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div className={`h-full bg-gradient-to-r ${meta.gradient} transition-all`} style={{ width: `${(index / Math.max(1, sessionCards.length)) * 100}%` }} />
        </div>
      </div>

      {!current ? (
        <div className={`rounded-3xl p-8 text-center text-white shadow-lg bg-gradient-to-br ${meta.gradient} space-y-4`}>
          <div className="text-5xl">{sStats.complete ? "🎉" : "💪"}</div>
          <p className="text-xl font-bold">{sStats.complete ? `Group ${group} complete — all words Easy!` : `Session finished: ${sStats.easy}/${sStats.total} words learned`}</p>
          {!sStats.complete && <p className="text-sm opacity-90">{sStats.hard + sStats.good} Hard/Good words will be carried into the next group. / Слова Hard/Good перейдут в следующую группу.</p>}
          <div className="flex flex-wrap justify-center gap-2">
            {index > 0 && <button type="button" onClick={prev} className="rounded-xl bg-white/20 hover:bg-white/30 px-4 py-2 font-medium">Previous</button>}
            {!sStats.complete && <button type="button" onClick={() => newSession(group, true)} className="rounded-xl bg-white/20 hover:bg-white/30 px-4 py-2 font-medium">🔁 Repeat not-Easy words</button>}
            <button type="button" onClick={() => newSession(group, false)} className="rounded-xl bg-white/20 hover:bg-white/30 px-4 py-2 font-medium">Restart group</button>
            <button type="button" onClick={() => go(null)} className="rounded-xl bg-white/20 hover:bg-white/30 px-4 py-2 font-medium">All groups</button>
            {group < total && <button type="button" onClick={() => go(group + 1)} className="rounded-xl bg-white text-slate-900 px-4 py-2 font-medium">Next group →</button>}
          </div>
        </div>
      ) : (
        <>
          {(isCarried || curStatus) && (
            <div className="flex flex-wrap justify-center gap-2 text-xs font-bold">
              {isCarried && <span className="rounded-full bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/50 dark:text-fuchsia-200 px-3 py-1">↩ Carried from Group {fromGroup}</span>}
              {curStatus && <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1">Last: {curStatus}</span>}
            </div>
          )}
          <div className="[perspective:1200px]">
            <button type="button" onClick={() => setFlipped((f) => !f)}
              className={`relative w-full min-h-[280px] transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>
              <div className={`absolute inset-0 rounded-3xl p-7 text-left text-white shadow-xl bg-gradient-to-br ${meta.gradient} [backface-visibility:hidden] flex flex-col justify-center gap-3`}>
                <p className="text-xs uppercase tracking-widest opacity-80">English · {current.pos}</p>
                <p className="text-4xl font-extrabold break-words">{current.en}</p>
                <p className="text-lg italic opacity-95">&ldquo;{current.example}&rdquo;</p>
                <p className="text-xs opacity-75">Tap to flip / Нажмите, чтобы перевернуть</p>
              </div>
              <div className="absolute inset-0 rounded-3xl p-7 text-left shadow-xl bg-white dark:bg-slate-900 border-4 border-transparent [background-clip:padding-box] [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center gap-3">
                <div className={`absolute inset-x-0 top-0 h-2 rounded-t-3xl bg-gradient-to-r ${meta.gradient}`} />
                <p className="text-xs uppercase tracking-widest text-slate-500">Translation / Перевод</p>
                <p className={`text-3xl font-extrabold bg-gradient-to-r ${meta.gradient} bg-clip-text text-transparent`}>{current.ru}</p>
                <p className="text-lg text-slate-700 dark:text-slate-200">{current.exampleRu}</p>
                <p className="text-sm italic text-slate-500">{current.en} — &ldquo;{current.example}&rdquo;</p>
              </div>
            </button>
          </div>
          <div className="flex justify-center gap-2">
            <SpeakButton text={current.en} />
            <SpeakButton text={current.example} label="Pronounce phrase" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            <button type="button" onClick={prev} disabled={index === 0}
              className="rounded-2xl py-3 text-white font-bold shadow-md active:scale-95 transition disabled:cursor-not-allowed bg-gradient-to-b from-violet-500 to-violet-600">Previous</button>
            {GRADES.map(([g, label, cls]) => (
              <button key={g} type="button" onClick={() => grade(g)} disabled={!flipped}
                className={`rounded-2xl py-3 text-white font-bold shadow-md active:scale-95 transition disabled:cursor-not-allowed ${cls}`}>{label}</button>
            ))}
          </div>
          {!flipped && <p className="text-center text-sm text-slate-500">Flip the card to grade it / Сначала переверните карточку</p>}
        </>
      )}
    </div>
  );
}
