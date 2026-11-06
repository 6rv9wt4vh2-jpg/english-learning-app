"use client";

import type { LevelSlug } from "@/lib/levels";
import type { ProgressBlob } from "@/lib/accountTypes";

const SYNC_PREFIXES = ["deckstat:", "decksess:", "deckpos:", "levelFilter:", "writing:", "english-app-progress", "unitdone", "speakdone"];
const SYNC_EXACT = ["unitdone", "speakdone", "speakdone:v2", "english-app-progress-v1", "english-app-progress", "english-app-progress-v0"];

export type AuthUser = { username: string; role: "admin" | "pupil"; myLevel: LevelSlug };

function shouldSyncKey(k: string) {
  return SYNC_EXACT.includes(k) || SYNC_PREFIXES.some((p) => k.startsWith(p));
}

export function collectLocalKeys(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const out: Record<string, string> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (!k || !shouldSyncKey(k)) continue;
    const v = localStorage.getItem(k);
    if (v != null) out[k] = v;
  }
  return out;
}

export function applyServerKeys(keys: Record<string, string>) {
  if (typeof window === "undefined") return;
  for (const [k, v] of Object.entries(keys)) {
    try {
      localStorage.setItem(k, v);
    } catch {
      /* ignore */
    }
  }
}

export function readMyLevel(): LevelSlug {
  try {
    const v = localStorage.getItem("myLevel");
    if (v === "a1" || v === "a2" || v === "b1" || v === "b2" || v === "b2plus" || v === "c1") return v;
  } catch {
    /* ignore */
  }
  return "a1";
}

export function writeMyLevel(level: LevelSlug) {
  try {
    localStorage.setItem("myLevel", level);
  } catch {
    /* ignore */
  }
}

let saveTimer: ReturnType<typeof setTimeout> | null = null;

export function scheduleProgressSave(myLevel: LevelSlug) {
  if (typeof window === "undefined") return;
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    void pushProgress(myLevel);
  }, 800);
}

export async function pushProgress(myLevel: LevelSlug, migratedLocal = false) {
  const keys = collectLocalKeys();
  keys.myLevel = myLevel;
  await fetch("/api/progress", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ keys, myLevel, migratedLocal }),
  });
}

export async function hydrateFromServer(progress: ProgressBlob | null, user: AuthUser) {
  const localKeys = collectLocalKeys();
  const hasLocal = Object.keys(localKeys).length > 0;
  if (progress?.keys && Object.keys(progress.keys).length > 0) {
    applyServerKeys(progress.keys);
    writeMyLevel(progress.myLevel || user.myLevel);
    return { migrated: false };
  }
  // First login with only local data → upload migration
  if (hasLocal) {
    writeMyLevel(user.myLevel);
    await pushProgress(user.myLevel, true);
    return { migrated: true };
  }
  writeMyLevel(user.myLevel);
  return { migrated: false };
}

/** Patch storage writes to also schedule server sync. */
export function installSaveHooks(getLevel: () => LevelSlug) {
  if (typeof window === "undefined") return () => {};
  const origSet = localStorage.setItem.bind(localStorage);
  localStorage.setItem = (key: string, value: string) => {
    origSet(key, value);
    if (shouldSyncKey(key) || key === "myLevel") scheduleProgressSave(getLevel());
  };
  return () => {
    localStorage.setItem = origSet;
  };
}
