"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import GrammarCheck from "@/components/GrammarCheck";
import SpeakButton from "@/components/SpeakButton";
import { PageHero } from "@/components/ui";
import { LEVEL_META, TYPE_META, unitsByLevel, type Exercise, type GrammarUnit, type Question, type ReadingUnit, type Unit, type WritingUnit } from "@/data/course";
import { draftKey, useUnitProgress } from "@/lib/units";

const norm = (s: string) => s.trim().toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, " ").replace(/[.!?]$/, "");
const isRight = (ex: Exercise, a: string) => ex.answer.split("/").some((v) => norm(v) === norm(a));

function Section({ title, ru, emoji, children }: { title: string; ru?: string; emoji: string; children: React.ReactNode }) {
  return (
    <section className="card pop-in p-5 space-y-3">
      <h2 className="text-lg font-bold flex items-center gap-2"><span>{emoji}</span>{title}{ru && <span className="text-sm font-medium text-slate-400">/ {ru}</span>}</h2>
      {children}
    </section>
  );
}

function ResultBox({ score, total, onRetry }: { score: number; total: number; onRetry: () => void }) {
  const pass = score >= Math.ceil(total * 0.6);
  return (
    <div className={`pop-in rounded-3xl p-4 text-white shadow-lg bg-gradient-to-r ${pass ? "from-emerald-400 to-teal-600" : "from-orange-400 to-rose-500"}`}>
      <div className="text-xl font-extrabold">{pass ? "🎉 Great job!" : "💪 Try again"} {score}/{total}</div>
      <div className="text-sm opacity-90">{pass ? "Lesson completed / Урок пройден ✓" : "Нужно минимум 60% правильных ответов"}</div>
      <button type="button" onClick={onRetry} className="mt-3 rounded-xl bg-white/25 px-4 py-1.5 text-sm font-semibold hover:bg-white/35">Retry / Ещё раз</button>
    </div>
  );
}

function Exercises({ items, onPass }: { items: Exercise[]; onPass: () => void }) {
  const [ans, setAns] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const score = items.filter((ex, i) => isRight(ex, ans[i] || "")).length;
  const check = () => { setChecked(true); if (score >= Math.ceil(items.length * 0.6)) onPass(); };
  return (
    <div className="space-y-4">
      {items.map((ex, i) => {
        const right = checked && isRight(ex, ans[i] || "");
        const wrong = checked && !right;
        return (
          <div key={i} className={`rounded-2xl p-4 border-2 transition ${right ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30" : wrong ? "border-rose-400 bg-rose-50 dark:bg-rose-950/30" : "border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40"}`}>
            <div className="font-semibold">{i + 1}. {ex.q}</div>
            {ex.options ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {ex.options.map((o) => (
                  <button key={o} type="button" disabled={checked} onClick={() => setAns((a) => ({ ...a, [i]: o }))}
                    className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition border-2 ${ans[i] === o ? "bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white border-transparent shadow-md" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-fuchsia-400"}`}>{o}</button>
                ))}
              </div>
            ) : (
              <input className="input mt-2 max-w-xs" disabled={checked} placeholder="Type the answer…" value={ans[i] || ""} onChange={(e) => setAns((a) => ({ ...a, [i]: e.target.value }))} />
            )}
            {wrong && <div className="mt-2 text-sm text-rose-600 dark:text-rose-300">✗ Correct: <b>{ex.answer.split("/")[0]}</b></div>}
            {right && <div className="mt-2 text-sm text-emerald-600 dark:text-emerald-300">✓ Correct!</div>}
          </div>
        );
      })}
      {!checked
        ? <button type="button" className="btn-primary" disabled={items.some((_, i) => !(ans[i] || "").trim())} onClick={check}>Check answers / Проверить</button>
        : <ResultBox score={score} total={items.length} onRetry={() => { setAns({}); setChecked(false); }} />}
    </div>
  );
}

function Questions({ items, onPass }: { items: Question[]; onPass: () => void }) {
  return <Exercises items={items.map((q) => ({ q: q.q, options: q.options, answer: q.options[q.correct] }))} onPass={onPass} />;
}

function Grammar({ u, onPass }: { u: GrammarUnit; onPass: () => void }) {
  return (
    <>
      <Section title="Rule" ru="Правило" emoji="📐">
        {u.explainRu.split("\n").map((p, i) => <p key={i} className="leading-relaxed text-slate-700 dark:text-slate-300">{p}</p>)}
      </Section>
      <Section title="Examples" ru="Примеры" emoji="💬">
        <ul className="space-y-2">
          {u.examples.map(([en, ru]) => (
            <li key={en} className="rounded-2xl bg-gradient-to-r from-fuchsia-50 to-sky-50 dark:from-fuchsia-950/30 dark:to-sky-950/30 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
              <div><div className="font-semibold">{en}</div><div className="text-sm text-slate-500">{ru}</div></div>
              <SpeakButton text={en} label="Pronounce phrase" />
            </li>
          ))}
        </ul>
      </Section>
      <Section title="Exercise" ru="Упражнение" emoji="🎯"><Exercises items={u.exercises} onPass={onPass} /></Section>
    </>
  );
}

function TapText({ text, glossary }: { text: string; glossary: [string, string][] }) {
  const [open, setOpen] = useState<string | null>(null);
  const parts = useMemo(() => {
    const terms = [...glossary].map(([e]) => e).sort((a, b) => b.length - a.length)
      .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/…/g, ""));
    const re = new RegExp(`\\b(${terms.join("|")})`, "gi");
    return text.split(re);
  }, [text, glossary]);
  const lookup = (w: string) => glossary.find(([e]) => e.replace(/…/g, "").toLowerCase() === w.toLowerCase())?.[1];
  return (
    <div className="leading-8 text-[17px] whitespace-pre-line">
      {parts.map((p, i) => {
        const ru = i % 2 === 1 ? lookup(p) : undefined;
        if (!ru) return <span key={i}>{p}</span>;
        const k = `${i}`;
        return (
          <span key={i} className="relative">
            <button type="button" onClick={() => setOpen(open === k ? null : k)}
              className="rounded-md bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/50 dark:to-blue-900/50 px-1 font-semibold text-blue-800 dark:text-cyan-200 underline decoration-dotted underline-offset-4">{p}</button>
            {open === k && <span className="pop-in absolute left-0 top-full z-10 mt-1 whitespace-nowrap rounded-xl bg-slate-900 px-3 py-1.5 text-sm text-white shadow-xl">{ru}</span>}
          </span>
        );
      })}
    </div>
  );
}

function Reading({ u, onPass }: { u: ReadingUnit; onPass: () => void }) {
  const [showRu, setShowRu] = useState(false);
  return (
    <>
      <Section title="Text" ru="Текст" emoji="📖">
        <p className="text-xs text-slate-500">💡 Tap highlighted words to translate / Нажмите на выделенное слово для перевода</p>
        <TapText text={u.text} glossary={u.glossary} />
        <div className="flex flex-wrap gap-2 pt-2">
          <SpeakButton text={u.text} label="Pronounce text" />
          <button type="button" className="btn-ghost" onClick={() => setShowRu((s) => !s)}>{showRu ? "Hide translation" : "Show RU translation"} 🇷🇺</button>
        </div>
        {showRu && <div className="pop-in rounded-2xl bg-amber-50 dark:bg-amber-950/30 p-4 text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">{u.textRu}</div>}
      </Section>
      <Section title="Glossary" ru="Словарик" emoji="🗂️">
        <div className="grid sm:grid-cols-2 gap-2">
          {u.glossary.map(([en, ru]) => (
            <div key={en} className="flex items-center justify-between gap-2 rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 px-3 py-2">
              <div><div className="font-semibold">{en}</div><div className="text-sm text-slate-500">{ru}</div></div>
              <SpeakButton text={en.replace(/…/g, "")} label="🔊" className="px-2.5" />
            </div>
          ))}
        </div>
      </Section>
      <Section title="Comprehension" ru="Вопросы к тексту" emoji="❓"><Questions items={u.questions} onPass={onPass} /></Section>
    </>
  );
}

function Writing({ u, onPass, done }: { u: WritingUnit; onPass: () => void; done: boolean }) {
  const [text, setText] = useState("");
  const [checks, setChecks] = useState<boolean[]>([]);
  const [showModel, setShowModel] = useState(false);
  const [saved, setSaved] = useState(false);
  useEffect(() => { setText(localStorage.getItem(draftKey(u.id)) || ""); }, [u.id]);
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const usedPhrases = u.phrases.filter(([en]) => text.toLowerCase().includes(en.replace(/[…,.!?]/g, "").trim().toLowerCase())).length;
  const onChange = (v: string) => { setText(v); localStorage.setItem(draftKey(u.id), v); setSaved(true); };
  return (
    <>
      <Section title="Task" ru="Задание" emoji="📝">
        <p className="font-semibold text-lg">{u.promptEn}</p>
        <p className="text-slate-500">{u.promptRu}</p>
        <p className="text-sm">🎯 Minimum: <b>{u.minWords} words</b></p>
      </Section>
      <Section title="Useful phrases" ru="Полезные фразы" emoji="🧰">
        <div className="flex flex-wrap gap-2">
          {u.phrases.map(([en, ru]) => (
            <div key={en} className="rounded-2xl bg-amber-50 dark:bg-amber-950/30 px-3 py-2 text-sm"><b>{en}</b> <span className="text-slate-500">— {ru}</span></div>
          ))}
        </div>
      </Section>
      <Section title="Your text" ru="Ваш текст" emoji="✍️">
        <textarea className="input min-h-56 leading-relaxed" value={text} onChange={(e) => onChange(e.target.value)} placeholder="Start writing here… / Пишите здесь…" />
        <div className="flex flex-wrap gap-2 text-sm">
          <span className={`rounded-full px-3 py-1 font-semibold text-white ${words >= u.minWords ? "bg-emerald-500" : "bg-orange-400"}`}>{words}/{u.minWords} words</span>
          <span className="rounded-full px-3 py-1 font-semibold text-white bg-sky-500">Phrases used: {usedPhrases}/{u.phrases.length}</span>
          {saved && <span className="rounded-full px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500">💾 Saved on this device</span>}
        </div>
        <GrammarCheck text={text} label="Check my writing / Проверить ошибки" />
      </Section>
      <Section title="Self-check" ru="Самопроверка" emoji="✅">
        <ul className="space-y-2">
          {u.checklist.map((c, i) => (
            <li key={c}>
              <label className="flex items-center gap-3 cursor-pointer rounded-2xl px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800">
                <input type="checkbox" className="h-5 w-5 accent-emerald-500" checked={!!checks[i]} onChange={(e) => setChecks((a) => { const n = [...a]; n[i] = e.target.checked; return n; })} />
                <span>{c}</span>
              </label>
            </li>
          ))}
        </ul>
        <button type="button" className="btn-success" disabled={done || words < u.minWords || u.checklist.some((_, i) => !checks[i])} onClick={onPass}>
          {done ? "Completed ✓ / Выполнено" : "Mark as done / Отметить выполненным"}
        </button>
      </Section>
      <Section title="Model answer" ru="Образец" emoji="🌟">
        {showModel
          ? <div className="pop-in space-y-3"><p className="whitespace-pre-line leading-relaxed">{u.model}</p><SpeakButton text={u.model} label="Pronounce text" /></div>
          : <button type="button" className="btn-warm" onClick={() => setShowModel(true)}>Show model answer / Показать образец</button>}
      </Section>
    </>
  );
}

export default function UnitClient({ unit }: { unit: Unit }) {
  const { isDone, mark } = useUnitProgress();
  const lm = LEVEL_META[unit.level];
  const tm = TYPE_META[unit.type];
  const list = unitsByLevel[unit.level];
  const idx = list.findIndex((u) => u.id === unit.id);
  const next = list[idx + 1];
  const done = isDone(unit.id);
  const pass = () => mark(unit.id);
  return (
    <div className="space-y-6">
      <Link href="/lessons" className="text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-400">← All lessons / Все уроки</Link>
      <PageHero title={unit.title} subtitle={unit.titleRu} emoji={tm.emoji} gradient={`${tm.gradient}`}>
        <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
          <span className={`rounded-full px-3 py-1 bg-gradient-to-r ${lm.gradient} shadow`}>{lm.emoji} {unit.level}</span>
          <span className="rounded-full px-3 py-1 bg-white/25">{tm.label} · {tm.ru}</span>
          {done && <span className="rounded-full px-3 py-1 bg-emerald-500 shadow">✓ Done</span>}
        </div>
      </PageHero>
      {unit.type === "grammar" && <Grammar u={unit} onPass={pass} />}
      {unit.type === "reading" && <Reading u={unit} onPass={pass} />}
      {unit.type === "writing" && <Writing u={unit} onPass={pass} done={done} />}
      {next && (
        <Link href={`/lessons/${next.id}`} className={`block rounded-3xl p-5 text-white shadow-lg bg-gradient-to-r ${lm.gradient} hover:scale-[1.01] transition`}>
          <div className="text-xs font-bold uppercase opacity-90">Next lesson / Следующий урок →</div>
          <div className="text-lg font-bold">{TYPE_META[next.type].emoji} {next.title}</div>
        </Link>
      )}
    </div>
  );
}
