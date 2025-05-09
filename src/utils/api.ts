
import { Lesson, Module, Quiz } from '@/types';
import { moduleOneLessons } from '@/data/moduleOneData';
import { term1Lessons } from '@/knowledgebase/lessons';

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

export async function getModule(moduleId: string): Promise<Module> {
  // For Module 1, return detailed information with lessons
  if (moduleId === "1") {
    // Map our term1Lessons to the format expected by the Module type
    const moduleLessons = term1Lessons.map(lesson => ({
      id: String(lesson.id),
      moduleId: String(lesson.moduleId),
      title: lesson.title,
      description: lesson.description,
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

export async function getQuiz(quizId: string): Promise<Quiz> {
  // For Module 1 quizzes, extract the lesson ID from the quiz ID format "quiz-1-X"
  if (quizId.startsWith('quiz-1-')) {
    const lessonId = quizId.split('-')[2];
    const lessonData = moduleOneLessons[lessonId];
    
    if (lessonData) {
      return {
        id: quizId,
        title: `Quiz: ${lessonData.title}`,
        questions: lessonData.quizQuestions.map((q, index) => ({
          id: `${quizId}-q${index}`,
          text: q.question,
          options: q.options,
          correctOptionIndex: q.correctAnswer
        }))
      };
    }
  }
  
  // Default mock implementation
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
