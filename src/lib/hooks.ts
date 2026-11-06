"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import {
  applyDailyGoal,
  applyLessonComplete,
  applyReview,
  persistStatus,
  progressStore,
  resetAllLocalData,
  resetProgress,
} from "./storage";
import type { AppProgress, SRSGrade } from "./types";

export function useProgress() {
  const progress = useSyncExternalStore(
    progressStore.subscribe,
    () => progressStore.get(),
    progressStore.serverSnapshot,
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    progressStore.hydrate();
    setReady(true);
  }, []);

  const refresh = useCallback(() => {
    progressStore.hydrate();
  }, []);

  const onReview = useCallback((wordId: string, grade: SRSGrade) => {
    progressStore.update((prev) => applyReview(prev, wordId, grade));
  }, []);

  const onCompleteLesson = useCallback((lessonId: string) => {
    progressStore.update((prev) => applyLessonComplete(prev, lessonId));
  }, []);

  const onSetGoal = useCallback((goal: number) => {
    progressStore.update((prev) => applyDailyGoal(prev, goal));
  }, []);

  const onReset = useCallback(() => {
    resetAllLocalData();
    resetProgress();
  }, []);

  const update = useCallback((updater: (p: AppProgress) => AppProgress) => {
    progressStore.update(updater);
  }, []);

  return {
    progress,
    ready,
    storageOk: persistStatus() === "ok",
    storageStatus: persistStatus(),
    refresh,
    onReview,
    onCompleteLesson,
    onSetGoal,
    onReset,
    update,
  };
}
