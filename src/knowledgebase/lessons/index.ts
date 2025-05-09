
import { LessonData } from './types';
import { lesson1 } from './lesson1';
import { lesson2 } from './lesson2';
import { lesson3 } from './lesson3';
import { lesson4 } from './lesson4';
import { lesson5 } from './lesson5';

// Export all term 1 lessons as an array
export const term1Lessons: LessonData[] = [
  lesson1,
  lesson2,
  lesson3,
  lesson4,
  lesson5
];

// Export individual lessons for direct access
export {
  lesson1,
  lesson2,
  lesson3,
  lesson4,
  lesson5
};
