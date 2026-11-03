"use client";

import { useState } from "react";
import { applyCorrections, checkText, type LTMatch } from "@/lib/grammar";

const kindColor = (m: LTMatch) =>
  m.rule.issueType === "misspelling" ? "decoration-rose-500 bg-rose-100 dark:bg-rose-900/40"
  : m.rule.category.id === "GRAMMAR" ? "decoration-amber-500 bg-amber-100 dark:bg-amber-900/40"
  : "decoration-sky-500 bg-sky-100 dark:bg-sky-900/40";

export default function GrammarCheck({ text, label = "Check my English / Проверить ошибки" }: { text: string; label?: string }) {
  const [state, setState] = useState<{ text: string; matches: LTMatch[] } | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  const run = async () => {
    if (!text.trim()) return;
    setLoading(true); setError(""); setOpen(null);
    const r = await checkText(text);
    setLoading(false);
    if (r.ok) setState({ text, matches: r.matches }); else setError(r.error);
  };

  const parts: React.ReactNode[] = [];
  if (state) {
    let pos = 0;
    state.matches.forEach((m, i) => {
      if (m.offset < pos) return;
      parts.push(state.text.slice(pos, m.offset));
      parts.push(
        <button key={i} type="button" onClick={() => setOpen(open === i ? null : i)}
          className={`underline decoration-wavy decoration-2 underline-offset-4 rounded px-0.5 ${kindColor(m)} ${open === i ? "ring-2 ring-fuchsia-400" : ""}`}>
          {state.text.slice(m.offset, m.offset + m.length)}
        </button>);
      pos = m.offset + m.length;
    });
    parts.push(state.text.slice(pos));
  }

  return (
    <div className="space-y-3">
      <button type="button" className="btn-pink" onClick={run} disabled={loading || !text.trim()}>
        {loading ? "Checking… / Проверяем…" : `🔍 ${label}`}
      </button>
      {error && <p className="rounded-2xl bg-rose-50 dark:bg-rose-950/40 p-3 text-sm text-rose-700 dark:text-rose-300">⚠️ {error}</p>}
      {state && (
        <div className="card p-4 space-y-4 pop-in">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-sm font-bold text-white bg-gradient-to-r ${state.matches.length ? "from-rose-500 to-pink-600" : "from-emerald-400 to-teal-600"}`}>
              {state.matches.length ? `${state.matches.length} mistake${state.matches.length > 1 ? "s" : ""} / ошибок: ${state.matches.length}` : "✅ No mistakes found / Ошибок не найдено"}
            </span>
            <span className="text-xs text-slate-400">LanguageTool</span>
          </div>
          {state.matches.length > 0 && (
            <>
              <div>
                <p className="text-xs font-bold uppercase text-slate-400 mb-1">Your text (tap a mistake) / Ваш текст</p>
                <p className="leading-8 whitespace-pre-wrap">{parts}</p>
              </div>
              <ol className="space-y-2">
                {state.matches.map((m, i) => (
                  <li key={i} className={`rounded-2xl border p-3 text-sm ${open === i ? "border-fuchsia-400" : "border-slate-200 dark:border-slate-800"}`}>
                    <span className="font-bold">{i + 1}. «{state.text.slice(m.offset, m.offset + m.length)}»</span>
                    {m.replacements.length > 0 && <> → <span className="font-bold text-emerald-600">{m.replacements.slice(0, 3).map((r) => r.value || "(remove)").join(" / ")}</span></>}
                    <div className="text-slate-600 dark:text-slate-300">{m.message}</div>
                    <div className="text-xs text-slate-400">{m.rule.category.name}</div>
                  </li>
                ))}
              </ol>
              <div>
                <p className="text-xs font-bold uppercase text-slate-400 mb-1">Corrected version / Исправленный вариант</p>
                <p className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 p-3 whitespace-pre-wrap">{applyCorrections(state.text, state.matches)}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
