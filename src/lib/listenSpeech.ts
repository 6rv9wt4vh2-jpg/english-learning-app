"use client";
import type { ListenLine } from "@/data/listening";

export const ttsSupported = () => typeof window !== "undefined" && "speechSynthesis" in window;

function voices() {
  const all = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith("en"));
  const us = all.filter((v) => /en[-_]US/i.test(v.lang));
  const gb = all.filter((v) => /en[-_]GB/i.test(v.lang));
  return { all, us, gb };
}

/** A = en-US voice, B = en-GB (or a different voice / pitch), N = en-GB narrator or default */
export function lineUtterance(line: ListenLine, rate: number): SpeechSynthesisUtterance {
  const u = new SpeechSynthesisUtterance(line.en);
  u.rate = rate;
  const { all, us, gb } = voices();
  let v: SpeechSynthesisVoice | undefined;
  if (line.s === "A") { v = us[0] ?? all[0]; u.pitch = 1.0; }
  else if (line.s === "B") {
    v = gb[0] ?? us[1] ?? all[1] ?? all[0];
    const a = us[0] ?? all[0];
    u.pitch = v && a && v.name === a.name ? 0.7 : 1.0; // same voice -> lower pitch to differ
  } else { v = gb[0] ?? us[0] ?? all[0]; }
  if (v) { u.voice = v; u.lang = v.lang; } else u.lang = line.s === "B" ? "en-GB" : "en-US";
  return u;
}

export function stopAll() { if (ttsSupported()) window.speechSynthesis.cancel(); }

/** Speak lines from index `from` to `to` (inclusive). onLine(i) fires when line i starts; onEnd when finished. */
export function speakLines(lines: ListenLine[], from: number, to: number, rate: number, onLine: (i: number) => void, onEnd: () => void) {
  if (!ttsSupported()) return;
  window.speechSynthesis.cancel();
  for (let i = from; i <= to; i++) {
    const u = lineUtterance(lines[i], rate);
    u.onstart = () => onLine(i);
    if (i === to) { u.onend = onEnd; u.onerror = onEnd; }
    window.speechSynthesis.speak(u);
  }
}

const norm = (w: string) => w.toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9']/g, "");
export type DiffTok = { w: string; t: "ok" | "wrong" | "missing" | "extra" };
/** Word-by-word compare via LCS. Returns tokens of the expected text (ok/missing) merged with extra typed words. */
export function diffWords(expected: string, typed: string): { tokens: DiffTok[]; correct: number; total: number } {
  const e = expected.split(/\s+/).filter(Boolean), t = typed.split(/\s+/).filter(Boolean);
  const E = e.map(norm), T = t.map(norm);
  const dp = Array.from({ length: E.length + 1 }, () => new Array(T.length + 1).fill(0));
  for (let i = E.length - 1; i >= 0; i--) for (let j = T.length - 1; j >= 0; j--)
    dp[i][j] = E[i] === T[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const out: DiffTok[] = []; let i = 0, j = 0;
  while (i < E.length || j < T.length) {
    if (i < E.length && j < T.length && E[i] === T[j]) { out.push({ w: e[i], t: "ok" }); i++; j++; }
    else if (i < E.length && j < T.length && dp[i + 1][j] === dp[i][j + 1] && dp[i + 1][j + 1] === dp[i][j]) { out.push({ w: `${t[j]}→${e[i]}`, t: "wrong" }); i++; j++; }
    else if (j < T.length && (i >= E.length || dp[i][j + 1] >= dp[i + 1][j])) { out.push({ w: t[j], t: "extra" }); j++; }
    else { out.push({ w: e[i], t: "missing" }); i++; }
  }
  const correct = out.filter((x) => x.t === "ok").length;
  return { tokens: out, correct, total: E.length };
}
