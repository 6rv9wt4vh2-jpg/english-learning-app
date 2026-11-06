"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LEVELS, type Level } from "@/data/course";
import { LEVEL_CARD, type LevelSlug } from "@/lib/levels";
import { readMyLevel } from "@/lib/accountSync";

const STORAGE_PREFIX = "levelFilter:";

export function isLevel(v: string | null | undefined): v is Level {
  return !!v && (LEVELS as readonly string[]).includes(v);
}

/** Map account My-level slug → CEFR level used by Grammar/Reading/etc. */
export function cefrFromMyLevel(slug?: string | null): Level {
  if (slug && slug in LEVEL_CARD) return LEVEL_CARD[slug as LevelSlug].cefr;
  try {
    return LEVEL_CARD[readMyLevel()].cefr;
  } catch {
    return "A1";
  }
}

/** Section list URL always scoped to one CEFR level. */
export function levelListHref(sectionPath: string, level: Level) {
  return `${sectionPath}?level=${level}`;
}

/**
 * Level filter synced to ?level= and localStorage.
 * Never uses "all" — defaults to the account My level.
 */
export function useLevelFilter(sectionKey: string, fallback?: Level) {
  const router = useRouter();
  const pathname = usePathname();
  const [level, setLevelState] = useState<Level>(fallback ?? "A1");
  const [ready, setReady] = useState(false);

  const applyFromUrl = useCallback(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("level");
    if (isLevel(fromUrl)) {
      setLevelState(fromUrl);
      try {
        localStorage.setItem(STORAGE_PREFIX + sectionKey, fromUrl);
      } catch {
        /* ignore */
      }
      return "url" as const;
    }
    return "missing" as const;
  }, [sectionKey]);

  useEffect(() => {
    const status = applyFromUrl();
    if (status === "missing") {
      let next: Level = fallback ?? cefrFromMyLevel();
      try {
        const stored = localStorage.getItem(STORAGE_PREFIX + sectionKey);
        if (isLevel(stored)) next = stored;
        else if (stored === "all") next = cefrFromMyLevel(); // migrate old "all"
      } catch {
        /* ignore */
      }
      setLevelState(next);
      router.replace(`${pathname}?level=${next}`, { scroll: false });
      try {
        localStorage.setItem(STORAGE_PREFIX + sectionKey, next);
      } catch {
        /* ignore */
      }
    }
    setReady(true);
    const onPop = () => {
      applyFromUrl();
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [applyFromUrl, pathname, router, sectionKey, fallback]);

  const setLevel = useCallback(
    (l: Level) => {
      setLevelState(l);
      try {
        localStorage.setItem(STORAGE_PREFIX + sectionKey, l);
      } catch {
        /* ignore */
      }
      router.replace(`${pathname}?level=${l}`, { scroll: false });
    },
    [pathname, router, sectionKey],
  );

  return { level, setLevel, ready };
}
