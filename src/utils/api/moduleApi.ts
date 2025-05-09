
import { Module } from '@/types';
import { term1Lessons } from '@/knowledgebase/lessons';

/**
 * Fetches a module by ID
 */
export async function getModule(moduleId: string): Promise<Module> {
  // For Module 1, return detailed information with lessons
  if (moduleId === "1") {
    // Map our term1Lessons to the format expected by the Module type
    const moduleLessons = term1Lessons.map(lesson => ({
      id: String(lesson.id),
      moduleId: String(lesson.moduleId),
      title: lesson.title,
      description: lesson.description,
      content: lesson.description, // Add the required content property
      quizId: lesson.hasQuiz ? `quiz-${moduleId}-${lesson.id}` : null,
      nextLessonId: lesson.id < term1Lessons.length ? String(lesson.id + 1) : null,
      prevLessonId: lesson.id > 1 ? String(lesson.id - 1) : null
    }));
    
    return {
      id: moduleId,
      title: "Introduction to Computing Concepts",
      description: "Learn about computing fundamentals, data vs. information, and the value of ICT",
      lessons: moduleLessons
    };
  }
  
  // Mock implementation for other modules
  return {
    id: moduleId,
    title: "Sample Module",
    description: "This is a sample module",
    lessons: []
  };
}
