
import { AnyContentBlock } from '@/components/lessons/ContentBlockRenderer';

export interface ChapterQuizQuestion {
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'scenario';
  options?: string[]; // Optional, mainly for multiple-choice
  correctAnswer: string | number; // number for MC index (0-based), 0 for False/1 for True, string for short-answer/scenario model answer
  explanation?: string; // Optional explanation for the answer
}

export interface Lesson {
  id: string; // e.g., "1.1", "2.3"
  title: string;
  focus: string;
  contentBlocks: AnyContentBlock[];
}

export interface Chapter {
  id: string; // e.g., "C1", "C2" (to avoid numeric collision with lesson IDs)
  title: string;
  learningObjectives: string[];
  lessons: Lesson[];
  chapterQuiz: {
    questions: ChapterQuizQuestion[];
  };
}

export interface TermCurriculum {
  term: number;
  grade: number;
  chapters: Chapter[];
}
