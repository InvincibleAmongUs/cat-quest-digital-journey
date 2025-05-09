
export interface Lesson {
  id: string;
  title: string;
  content: string;
  quizId?: string | null;
  nextLessonId?: string | null;
  prevLessonId?: string | null;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  points: number;
  completedLessons?: string[];
  isAuthenticated?: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
}

export interface DataItem {
  id: string;
  name: string;
  type: 'data' | 'information';
}

export interface ContentBlock {
  type: 'text' | 'heading' | 'image' | 'quiz' | 'game' | 'figure' | 'table';
  content: any;
}
