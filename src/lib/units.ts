"use client";
import { useCallback, useEffect, useState } from "react";

const KEY = "unitdone";
export function readDone(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
export function useUnitProgress() {
  const [done, setDone] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => { setDone(readDone()); setReady(true); }, []);
  const mark = useCallback((id: string) => {
    const cur = readDone();
    if (!cur.includes(id)) { cur.push(id); localStorage.setItem(KEY, JSON.stringify(cur)); }
    setDone([...cur]);
  }, []);
  return { done, ready, mark, isDone: (id: string) => done.includes(id) };
}
export const draftKey = (id: string) => `writing:${id}`;
