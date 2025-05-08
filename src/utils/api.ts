
import { Lesson, Module, Quiz } from '@/types';

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

export async function getQuiz(quizId: string): Promise<Quiz> {
  // Mock implementation - in a real app, this would fetch from an API
  return {
    id: quizId,
    title: "Sample Quiz",
    questions: [
      {
        id: "q1",
        text: "What is the primary purpose of a computer?",
        options: [
          "To process data",
          "To play games",
          "To watch movies",
          "To make coffee"
        ],
        correctOptionIndex: 0
      },
      {
        id: "q2",
        text: "Which component is considered the 'brain' of the computer?",
        options: [
          "Hard Drive",
          "RAM",
          "CPU",
          "Monitor"
        ],
        correctOptionIndex: 2
      }
    ]
  };
}
