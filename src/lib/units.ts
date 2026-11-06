"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { createStore, persistStatus } from "./persist";

export const UNIT_DONE_KEY = "unitdone";

const isEmpty = (v: string[]) => !v || v.length === 0;

export const unitDoneStore = createStore<string[]>(
  UNIT_DONE_KEY,
  () => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem(UNIT_DONE_KEY) || "[]");
    } catch {
      return [];
    }
  },
  isEmpty,
);

export function readDone(): string[] {
  return unitDoneStore.get();
}

export function useUnitProgress() {
  const done = useSyncExternalStore(
    unitDoneStore.subscribe,
    () => unitDoneStore.get(),
    () => [],
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    unitDoneStore.hydrate();
    setReady(true);
  }, []);

  const mark = useCallback((id: string) => {
    unitDoneStore.update((cur) => (cur.includes(id) ? cur : [...cur, id]));
  }, []);

  return {
    done,
    ready,
    mark,
    isDone: (id: string) => done.includes(id),
    storageStatus: persistStatus(),
  };
}

export const draftKey = (id: string) => `writing:${id}`;
