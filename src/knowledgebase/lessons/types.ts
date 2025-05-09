
import { AnyContentBlock } from '@/components/lessons/ContentBlockRenderer';

export interface LessonData {
  id: number;
  moduleId: number;
  title: string;
  description: string;
  blocks: AnyContentBlock[];
  quizQuestions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
  hasQuiz: boolean;
}
