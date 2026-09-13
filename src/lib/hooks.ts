"use client";

import { useCallback, useEffect, useState } from "react";
import {
  loadProgress,
  markLessonComplete,
  recordReview,
  resetProgress,
  saveProgress,
  setDailyGoal,
} from "./storage";
import type { AppProgress, SRSGrade } from "./types";

export function useProgress() {
  const [progress, setProgress] = useState<AppProgress | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setReady(true);
  }, []);

  const refresh = useCallback(() => {
    setProgress(loadProgress());
  }, []);

  const onReview = useCallback((wordId: string, grade: SRSGrade) => {
    setProgress((prev) => {
      const base = prev ?? loadProgress();
      return recordReview(base, wordId, grade);
    });
  }, []);

  const onCompleteLesson = useCallback((lessonId: string) => {
    setProgress((prev) => {
      const base = prev ?? loadProgress();
      return markLessonComplete(base, lessonId);
    });
  }, []);

  const onSetGoal = useCallback((goal: number) => {
    setProgress((prev) => {
      const base = prev ?? loadProgress();
      return setDailyGoal(base, goal);
    });
  }, []);

  const onReset = useCallback(() => {
    const fresh = resetProgress();
    setProgress(fresh);
  }, []);

  const update = useCallback((updater: (p: AppProgress) => AppProgress) => {
    setProgress((prev) => {
      const base = prev ?? loadProgress();
      const next = updater(base);
      saveProgress(next);
      return next;
    });
  }, []);

  return {
    progress: progress ?? loadProgress(),
    ready,
    refresh,
    onReview,
    onCompleteLesson,
    onSetGoal,
    onReset,
    update,
  };
}
