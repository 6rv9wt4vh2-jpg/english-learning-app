"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
function getSR(): any {
  if (typeof window === "undefined") return null;
  return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null;
}

/**
 * Continuous English speech recognition.
 * Chrome stops after silence — we auto-restart until the user presses Stop,
 * and we accumulate every final transcript into one extended answer.
 */
export function useContinuousRecognition() {
  const [supported, setSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [error, setError] = useState("");
  const rec = useRef<any>(null);
  const finalRef = useRef("");
  const wantListen = useRef(false);
  const restartTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSupported(!!getSR());
    return () => {
      wantListen.current = false;
      if (restartTimer.current) clearTimeout(restartTimer.current);
      try {
        rec.current?.abort?.();
      } catch {
        /* ignore */
      }
    };
  }, []);

  const attachHandlers = useCallback((r: any) => {
    r.onresult = (e: any) => {
      let fin = "";
      let mid = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript as string;
        if (e.results[i].isFinal) fin += `${t} `;
        else mid += t;
      }
      if (fin) {
        const piece = fin.trim();
        finalRef.current = finalRef.current ? `${finalRef.current} ${piece}` : piece;
        setTranscript(finalRef.current);
      }
      setInterim(mid);
    };
    r.onerror = (e: any) => {
      if (e.error === "aborted" || e.error === "no-speech") return;
      if (e.error === "not-allowed") {
        setError("Microphone access was blocked. Allow the mic in browser settings.");
        wantListen.current = false;
        setListening(false);
        return;
      }
      setError(`Speech recognition error: ${e.error}`);
    };
    r.onend = () => {
      setInterim("");
      if (!wantListen.current) {
        setListening(false);
        return;
      }
      // Chrome ends after a pause — restart while the user still wants to speak
      restartTimer.current = setTimeout(() => {
        if (!wantListen.current) return;
        try {
          r.start();
          setListening(true);
        } catch {
          try {
            const SR = getSR();
            if (!SR) return;
            const next = new SR();
            next.lang = "en-US";
            next.interimResults = true;
            next.continuous = true;
            next.maxAlternatives = 1;
            attachHandlers(next);
            rec.current = next;
            next.start();
            setListening(true);
          } catch {
            setListening(false);
            wantListen.current = false;
          }
        }
      }, 250);
    };
  }, []);

  const start = useCallback(() => {
    const SR = getSR();
    if (!SR) {
      setSupported(false);
      return;
    }
    setError("");
    setInterim("");
    // keep existing transcript so user can continue after Stop
    wantListen.current = true;
    try {
      rec.current?.abort?.();
    } catch {
      /* ignore */
    }
    const r = new SR();
    r.lang = "en-US";
    r.interimResults = true;
    r.continuous = true;
    r.maxAlternatives = 1;
    attachHandlers(r);
    rec.current = r;
    try {
      r.start();
      setListening(true);
    } catch {
      setError("Could not start the microphone. Try Chrome or Edge.");
      wantListen.current = false;
      setListening(false);
    }
  }, [attachHandlers]);

  const stop = useCallback(() => {
    wantListen.current = false;
    if (restartTimer.current) clearTimeout(restartTimer.current);
    try {
      rec.current?.stop?.();
    } catch {
      /* ignore */
    }
    setListening(false);
    setInterim("");
  }, []);

  const reset = useCallback(() => {
    stop();
    finalRef.current = "";
    setTranscript("");
    setInterim("");
    setError("");
  }, [stop]);

  return {
    supported,
    listening,
    transcript,
    interim,
    error,
    start,
    stop,
    reset,
    setTranscript: (v: string) => {
      finalRef.current = v;
      setTranscript(v);
    },
  };
}

/** @deprecated kept for any leftover imports — prefer useContinuousRecognition */
export function useRecognition() {
  const c = useContinuousRecognition();
  return {
    ...c,
    start: (_continuous?: boolean) => { void _continuous; return c.start(); },
  };
}

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9' ]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);
const NUM: Record<string, string> = {
  "1": "one", "2": "two", "3": "three", "4": "four", "5": "five",
  "6": "six", "7": "seven", "8": "eight", "9": "nine", "10": "ten",
};
const canon = (w: string) => NUM[w] ?? w.replace(/'/g, "");

export function compareSpeech(target: string, spoken: string) {
  const t = target.split(/\s+/).filter(Boolean);
  const tn = t.map((w) => canon(norm(w).join("")));
  const s = norm(spoken).map(canon);
  const n = tn.length,
    m = s.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      dp[i][j] = tn[i] === s[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const ok = new Array(n).fill(false);
  const extra: string[] = [];
  let i = 0,
    j = 0;
  while (i < n && j < m) {
    if (tn[i] === s[j]) {
      ok[i] = true;
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else {
      extra.push(s[j]);
      j++;
    }
  }
  while (j < m) extra.push(s[j++]);
  const words = t.map((w, k) => ({ w, ok: ok[k] || !tn[k] }));
  const hit = words.filter((x) => x.ok).length;
  const score = n ? Math.round((hit / n) * 100 - Math.min(20, extra.length * 5)) : 0;
  return { words, extra, score: Math.max(0, score) };
}

export function hintCoverage(text: string, hints: string[]): { used: string[]; missing: string[]; ratio: number } {
  const lower = text.toLowerCase();
  const used: string[] = [];
  const missing: string[] = [];
  for (const h of hints) {
    const core = h.replace(/…/g, "").replace(/\.\.\./g, "").trim().toLowerCase();
    const token = core.split(/[^a-z']+/).filter((w) => w.length > 2)[0];
    if (token && lower.includes(token)) used.push(h);
    else missing.push(h);
  }
  return { used, missing, ratio: hints.length ? used.length / hints.length : 1 };
}
