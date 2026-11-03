"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
function getSR(): any {
  if (typeof window === "undefined") return null;
  return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null;
}

export function useRecognition() {
  const [supported, setSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [error, setError] = useState("");
  const rec = useRef<any>(null);
  const finalRef = useRef("");

  useEffect(() => { setSupported(!!getSR()); }, []);

  const start = useCallback((continuous: boolean) => {
    const SR = getSR();
    if (!SR) { setSupported(false); return; }
    setError(""); setInterim(""); finalRef.current = ""; setTranscript("");
    const r = new SR();
    r.lang = "en-US"; r.interimResults = true; r.continuous = continuous; r.maxAlternatives = 1;
    r.onresult = (e: any) => {
      let fin = "", mid = "";
      for (let i = 0; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) fin += t + " "; else mid += t;
      }
      finalRef.current = fin.trim();
      setTranscript(finalRef.current);
      setInterim(mid);
    };
    r.onerror = (e: any) => {
      setError(e.error === "not-allowed" ? "Microphone access was blocked. Allow the microphone in browser settings. / Доступ к микрофону запрещён." :
        e.error === "no-speech" ? "No speech detected — try again. / Речь не распознана, попробуйте ещё раз." : `Speech recognition error: ${e.error}`);
    };
    r.onend = () => { setListening(false); setInterim(""); };
    rec.current = r;
    r.start();
    setListening(true);
  }, []);

  const stop = useCallback(() => { rec.current?.stop(); }, []);
  useEffect(() => () => rec.current?.abort?.(), []);

  return { supported, listening, transcript, interim, error, start, stop, setTranscript };
}

const norm = (s: string) => s.toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9' ]+/g, " ").split(/\s+/).filter(Boolean);
const NUM: Record<string, string> = { "1": "one", "2": "two", "3": "three", "4": "four", "5": "five", "6": "six", "7": "seven", "8": "eight", "9": "nine", "10": "ten" };
const canon = (w: string) => NUM[w] ?? w.replace(/'/g, "");

/** Align target vs spoken words (LCS). Returns per-target-word status, extra spoken words and score %. */
export function compareSpeech(target: string, spoken: string) {
  const t = target.split(/\s+/).filter(Boolean);
  const tn = t.map((w) => canon(norm(w).join("")));
  const s = norm(spoken).map(canon);
  const n = tn.length, m = s.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--)
    dp[i][j] = tn[i] === s[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const ok = new Array(n).fill(false);
  const extra: string[] = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (tn[i] === s[j]) { ok[i] = true; i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else { extra.push(s[j]); j++; }
  }
  while (j < m) extra.push(s[j++]);
  const words = t.map((w, k) => ({ w, ok: ok[k] || !tn[k] }));
  const hit = words.filter((x) => x.ok).length;
  const score = n ? Math.round((hit / n) * 100 - Math.min(20, extra.length * 5)) : 0;
  return { words, extra, score: Math.max(0, score) };
}
