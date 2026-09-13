import { DEFAULT_PROGRESS, type AppProgress, type SRSGrade, type WordProgress } from "./types";
import { applyGrade, createWordProgress, gradeToScore } from "./srs";

const STORAGE_KEY = "english-app-progress-v1";

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export function loadProgress(): AppProgress {
  if (typeof window === "undefined") return { ...DEFAULT_PROGRESS, words: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS, words: {} };
    const parsed = JSON.parse(raw) as AppProgress;
    return normalizeProgress(parsed);
  } catch {
    return { ...DEFAULT_PROGRESS, words: {} };
  }
}

function normalizeProgress(p: AppProgress): AppProgress {
  const today = todayStr();
  let reviewsToday = p.reviewsToday ?? 0;
  let reviewsTodayDate = p.reviewsTodayDate ?? null;
  if (reviewsTodayDate !== today) {
    reviewsToday = 0;
    reviewsTodayDate = today;
  }
  return {
    ...DEFAULT_PROGRESS,
    ...p,
    words: p.words ?? {},
    completedLessons: p.completedLessons ?? [],
    dailyGoal: p.dailyGoal || 20,
    reviewsToday,
    reviewsTodayDate,
  };
}

export function saveProgress(progress: AppProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function resetProgress(): AppProgress {
  const fresh = { ...DEFAULT_PROGRESS, words: {}, completedLessons: [] };
  saveProgress(fresh);
  return fresh;
}

export function bumpStreak(progress: AppProgress): AppProgress {
  const today = todayStr();
  if (progress.lastPracticeDate === today) return progress;

  let streak = 1;
  if (progress.lastPracticeDate === yesterdayStr()) {
    streak = (progress.streak || 0) + 1;
  }

  return {
    ...progress,
    streak,
    lastPracticeDate: today,
  };
}

export function recordReview(
  progress: AppProgress,
  wordId: string,
  grade: SRSGrade
): AppProgress {
  const existing = progress.words[wordId] ?? createWordProgress(wordId);
  const updated: WordProgress = applyGrade(existing, grade);
  const correct = gradeToScore(grade);
  const today = todayStr();

  let reviewsToday = progress.reviewsToday ?? 0;
  if (progress.reviewsTodayDate !== today) reviewsToday = 0;
  reviewsToday += 1;

  let next: AppProgress = {
    ...progress,
    words: { ...progress.words, [wordId]: updated },
    totalReviews: (progress.totalReviews || 0) + 1,
    correctReviews: (progress.correctReviews || 0) + (correct ? 1 : 0),
    reviewsToday,
    reviewsTodayDate: today,
  };

  next = bumpStreak(next);
  saveProgress(next);
  return next;
}

export function markLessonComplete(progress: AppProgress, lessonId: string): AppProgress {
  if (progress.completedLessons.includes(lessonId)) return progress;
  const next = bumpStreak({
    ...progress,
    completedLessons: [...progress.completedLessons, lessonId],
  });
  saveProgress(next);
  return next;
}

export function setDailyGoal(progress: AppProgress, goal: number): AppProgress {
  const next = { ...progress, dailyGoal: Math.max(5, Math.min(100, goal)) };
  saveProgress(next);
  return next;
}

export function countLearnedWords(progress: AppProgress): number {
  return Object.values(progress.words).filter((w) => w.repetitions >= 2 || w.correctCount >= 2).length;
}

export function getAccuracy(progress: AppProgress): number {
  if (!progress.totalReviews) return 0;
  return Math.round((progress.correctReviews / progress.totalReviews) * 100);
}
