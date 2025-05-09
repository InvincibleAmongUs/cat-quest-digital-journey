
import { AnyContentBlock } from '@/components/lessons/ContentBlockRenderer';
import { term1Lessons } from '@/knowledgebase/lessons';

export interface LessonData {
  id: string;
  title: string;
  blocks: AnyContentBlock[];
  quizQuestions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

// Map our lessons to the format expected by the rest of the app
const lessonIdMap: Record<string, number> = {
  '1': 0,  // First lesson in the array is index 0
  '2': 1,
  '3': 2,
  '4': 3,
  '5': 4
};

export const moduleOneLessons: Record<string, LessonData> = {
  '1': {
    id: '1',
    title: term1Lessons[lessonIdMap['1']].title,
    blocks: term1Lessons[lessonIdMap['1']].blocks,
    quizQuestions: term1Lessons[lessonIdMap['1']].quizQuestions
  },
  '2': {
    id: '2',
    title: term1Lessons[lessonIdMap['2']].title,
    blocks: term1Lessons[lessonIdMap['2']].blocks,
    quizQuestions: term1Lessons[lessonIdMap['2']].quizQuestions
  },
  '3': {
    id: '3',
    title: term1Lessons[lessonIdMap['3']].title,
    blocks: term1Lessons[lessonIdMap['3']].blocks,
    quizQuestions: term1Lessons[lessonIdMap['3']].quizQuestions
  },
  '4': {
    id: '4',
    title: term1Lessons[lessonIdMap['4']].title,
    blocks: term1Lessons[lessonIdMap['4']].blocks,
    quizQuestions: term1Lessons[lessonIdMap['4']].quizQuestions
  },
  '5': {
    id: '5',
    title: term1Lessons[lessonIdMap['5']].title,
    blocks: term1Lessons[lessonIdMap['5']].blocks,
    quizQuestions: term1Lessons[lessonIdMap['5']].quizQuestions
  }
};
