
import { TermCurriculum, Chapter } from '@/types/curriculum';
import { chapter1 } from './chapter1';
import { chapter2 } from './chapter2';
import { chapter3 } from './chapter3';
import { chapter4 } from './chapter4';
import { chapter5 } from './chapter5';

const term1Chapters: Chapter[] = [
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
];

export const grade10Term1Curriculum: TermCurriculum = {
  grade: 10,
  term: 1,
  chapters: term1Chapters,
};

// Optionally export individual chapters if needed directly
export { chapter1, chapter2, chapter3, chapter4, chapter5 };
