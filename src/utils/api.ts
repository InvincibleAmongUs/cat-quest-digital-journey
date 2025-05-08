
import { Lesson, Module } from '@/types';

export async function getLesson(moduleId: string, lessonId: string): Promise<Lesson> {
  // Mock implementation - in a real app, this would fetch from an API
  return {
    id: lessonId,
    title: "Sample Lesson",
    content: "# Sample Lesson Content\n\nThis is a placeholder for lesson content.",
    quizId: "quiz1",
    nextLessonId: null,
    prevLessonId: null
  };
}

export async function getModule(moduleId: string): Promise<Module> {
  // Mock implementation - in a real app, this would fetch from an API
  return {
    id: moduleId,
    title: "Sample Module",
    description: "This is a sample module",
    lessons: []
  };
}
