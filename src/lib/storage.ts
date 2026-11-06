import { DEFAULT_PROGRESS, type AppProgress, type SRSGrade, type WordProgress } from "./types";
import { applyGrade, createWordProgress, gradeToScore } from "./srs";
import { canPersist, createStore, persistStatus, readJSON, removeKey, writeJSON } from "./persist";

export const PROGRESS_KEY = "english-app-progress-v1";
const LEGACY_KEYS = ["english-app-progress", "english-app-progress-v0"];

function emptyProgress(): AppProgress {
  return { ...DEFAULT_PROGRESS, words: {}, completedLessons: [] };
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}
function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export function normalizeProgress(p: AppProgress): AppProgress {
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
    completedLessons: Array.isArray(p.completedLessons) ? p.completedLessons : [],
    studyDays: Array.isArray(p.studyDays) ? p.studyDays : [],
    dailyGoal: p.dailyGoal || 20,
    reviewsToday,
    reviewsTodayDate,
  };
}

function loadFromDisk(): AppProgress {
  if (typeof window === "undefined") return emptyProgress();
  const v1 = readJSON<AppProgress | null>(PROGRESS_KEY, null);
  if (v1) return normalizeProgress(v1);
  for (const k of LEGACY_KEYS) {
    const legacy = readJSON<AppProgress | null>(k, null);
    if (legacy) {
      const n = normalizeProgress(legacy);
      writeJSON(PROGRESS_KEY, n, { force: true });
      return n;
    }
  }
  return emptyProgress();
}

const isEmpty = (p: AppProgress) =>
  Object.keys(p.words || {}).length === 0 &&
  (p.completedLessons || []).length === 0 &&
  (p.totalReviews || 0) === 0;

export const progressStore = createStore<AppProgress>(PROGRESS_KEY, loadFromDisk, isEmpty, normalizeProgress);

export function loadProgress(): AppProgress {
  return normalizeProgress(progressStore.get());
}

export function saveProgress(progress: AppProgress): void {
  progressStore.set(normalizeProgress(progress));
}

export function resetProgress(): AppProgress {
  const fresh = emptyProgress();
  progressStore.set(fresh, true);
  return fresh;
}

export function bumpStreak(progress: AppProgress): AppProgress {
  const today = todayStr();
  const days = Array.isArray(progress.studyDays) ? [...progress.studyDays] : [];
  if (!days.includes(today)) {
    days.push(today);
    // keep at most ~2 years of days
    if (days.length > 800) days.splice(0, days.length - 800);
  }
  if (progress.lastPracticeDate === today) {
    return { ...progress, studyDays: days, lastPracticeDate: today };
  }
  let streak = 1;
  if (progress.lastPracticeDate === yesterdayStr()) streak = (progress.streak || 0) + 1;
  return { ...progress, streak, lastPracticeDate: today, studyDays: days };
}

/** Record a study day (lessons/speaking/listening) without counting a card review. */
export function touchStudyDay(progress: AppProgress): AppProgress {
  return bumpStreak(progress);
}

/** Pure: does not write. */
export function applyReview(progress: AppProgress, wordId: string, grade: SRSGrade): AppProgress {
  const existing = progress.words[wordId] ?? createWordProgress(wordId);
  const updated: WordProgress = applyGrade(existing, grade);
  const correct = gradeToScore(grade);
  const today = todayStr();
  let reviewsToday = progress.reviewsToday ?? 0;
  if (progress.reviewsTodayDate !== today) reviewsToday = 0;
  reviewsToday += 1;
  return bumpStreak({
    ...progress,
    words: { ...progress.words, [wordId]: updated },
    totalReviews: (progress.totalReviews || 0) + 1,
    correctReviews: (progress.correctReviews || 0) + (correct ? 1 : 0),
    reviewsToday,
    reviewsTodayDate: today,
  });
}

export function recordReview(progress: AppProgress, wordId: string, grade: SRSGrade): AppProgress {
  const next = applyReview(progress, wordId, grade);
  saveProgress(next);
  return next;
}

export function applyLessonComplete(progress: AppProgress, lessonId: string): AppProgress {
  if (progress.completedLessons.includes(lessonId)) return progress;
  return bumpStreak({ ...progress, completedLessons: [...progress.completedLessons, lessonId] });
}

export function markLessonComplete(progress: AppProgress, lessonId: string): AppProgress {
  const next = applyLessonComplete(progress, lessonId);
  if (next !== progress) saveProgress(next);
  return next;
}

export function applyDailyGoal(progress: AppProgress, goal: number): AppProgress {
  return { ...progress, dailyGoal: Math.max(5, Math.min(100, goal)) };
}

export function setDailyGoal(progress: AppProgress, goal: number): AppProgress {
  const next = applyDailyGoal(progress, goal);
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

export function resetAllLocalData() {
  const prefixes = ["deckstat:", "decksess:", "deckpos:", "levelFilter:", "writing:"];
  const exact = [PROGRESS_KEY, ...LEGACY_KEYS, "unitdone", "speakdone", "speakdone:v2"];
  if (typeof window === "undefined") return;
  try {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k) keys.push(k);
    }
    for (const k of keys) {
      if (exact.includes(k) || prefixes.some((p) => k.startsWith(p))) removeKey(k);
    }
  } catch {
    /* ignore */
  }
  progressStore.set(emptyProgress(), true);
}

export { persistStatus, canPersist };
