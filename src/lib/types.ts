export interface Word {
  id: string;
  en: string;
  ru: string;
  example: string;
  exampleRu: string;
  lessonId: string;
  level: "A1" | "A2" | "B1";
  tags: string[];
}

export interface LessonSection {
  title: string;
  content: string; // HTML-ish markdown-like plain text paragraphs
  examples?: { en: string; ru: string }[];
}

export interface Lesson {
  id: string;
  title: string;
  titleRu: string;
  description: string;
  descriptionRu: string;
  level: "A1" | "A2" | "B1";
  wordIds: string[];
  sections: LessonSection[];
  exercises: {
    question: string;
    questionRu: string;
    options: string[];
    correctIndex: number;
  }[];
}

export type SRSGrade = "again" | "hard" | "good" | "easy";

export interface WordProgress {
  wordId: string;
  easeFactor: number;
  interval: number; // days
  repetitions: number;
  nextReview: number; // timestamp
  lastReview: number;
  correctCount: number;
  wrongCount: number;
}

export interface AppProgress {
  words: Record<string, WordProgress>;
  completedLessons: string[];
  streak: number;
  lastPracticeDate: string | null; // YYYY-MM-DD
  totalReviews: number;
  correctReviews: number;
  dailyGoal: number;
  reviewsToday: number;
  reviewsTodayDate: string | null;
}

export const DEFAULT_PROGRESS: AppProgress = {
  words: {},
  completedLessons: [],
  streak: 0,
  lastPracticeDate: null,
  totalReviews: 0,
  correctReviews: 0,
  dailyGoal: 20,
  reviewsToday: 0,
  reviewsTodayDate: null,
};

export interface B2Card {
  id: string;
  en: string;
  pos: string;
  ru: string;
  example: string;
  exampleRu: string;
  batch: number;
}
