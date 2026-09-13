import type { SRSGrade, WordProgress } from "./types";

const DAY_MS = 24 * 60 * 60 * 1000;

export function createWordProgress(wordId: string): WordProgress {
  return {
    wordId,
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    nextReview: Date.now(),
    lastReview: 0,
    correctCount: 0,
    wrongCount: 0,
  };
}

/** Simplified SM-2 */
export function applyGrade(progress: WordProgress, grade: SRSGrade): WordProgress {
  const now = Date.now();
  let { easeFactor, interval, repetitions, correctCount, wrongCount } = progress;

  if (grade === "again") {
    repetitions = 0;
    interval = 0;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
    wrongCount += 1;
  } else {
    correctCount += 1;
    if (grade === "hard") {
      easeFactor = Math.max(1.3, easeFactor - 0.15);
      interval = repetitions === 0 ? 1 : Math.max(1, Math.round(interval * 1.2));
    } else if (grade === "good") {
      if (repetitions === 0) interval = 1;
      else if (repetitions === 1) interval = 3;
      else interval = Math.round(interval * easeFactor);
    } else {
      // easy
      easeFactor += 0.15;
      if (repetitions === 0) interval = 2;
      else if (repetitions === 1) interval = 4;
      else interval = Math.round(interval * easeFactor * 1.3);
    }
    repetitions += 1;
  }

  return {
    ...progress,
    easeFactor,
    interval,
    repetitions,
    correctCount,
    wrongCount,
    lastReview: now,
    nextReview: now + interval * DAY_MS,
  };
}

export function isDue(progress: WordProgress | undefined): boolean {
  if (!progress) return true;
  return progress.nextReview <= Date.now();
}

export function gradeToScore(grade: SRSGrade): boolean {
  return grade !== "again";
}
