
import { Lesson } from '@/types';
import { term1Lessons } from '@/knowledgebase/lessons';

/**
 * Fetches a lesson by module and lesson ID
 */
export async function getLesson(moduleId: string, lessonId: string): Promise<Lesson> {
  // Use our term1Lessons for Module 1 lessons
  if (moduleId === "1") {
    const lesson = term1Lessons.find(l => l.id === Number(lessonId));
    
    if (lesson) {
      // Map from our internal lesson format to the expected Lesson type
      return {
        id: lessonId,
        title: lesson.title,
        content: lesson.description,
        quizId: lesson.hasQuiz ? `quiz-${moduleId}-${lessonId}` : null,
        nextLessonId: lesson.id < term1Lessons.length ? String(lesson.id + 1) : null,
        prevLessonId: lesson.id > 1 ? String(lesson.id - 1) : null
      };
    }
  }
  
  // Fallback to mock implementation for any other modules
  return {
    id: lessonId,
    title: "Sample Lesson",
    content: "# Sample Lesson Content\n\nThis is a placeholder for lesson content.",
    quizId: "quiz1",
    nextLessonId: null,
    prevLessonId: null
  };
}
