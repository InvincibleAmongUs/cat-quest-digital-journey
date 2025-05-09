
import { Lesson, Module, Quiz } from '@/types';
import { moduleLessons, moduleOneLessons } from '@/data/moduleOneData';

export async function getLesson(moduleId: string, lessonId: string): Promise<Lesson> {
  // Use our module data for Module 1 lessons
  const lesson = moduleLessons.find(
    l => l.moduleId === moduleId && l.id === lessonId
  );
  
  if (lesson) {
    return lesson;
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
    return {
      id: moduleId,
      title: "Introduction to Computing Concepts",
      description: "Learn about computing fundamentals, data vs. information, and the value of ICT",
      lessons: moduleLessons.filter(lesson => lesson.moduleId === moduleId)
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
    const lessonId = quizId.replace('quiz-', '');
    const lessonData = moduleOneLessons[lessonId];
    
    if (lessonData) {
      return {
        id: quizId,
        title: `Quiz: ${lessonData.title}`,
        questions: lessonData.quizQuestions.map((q, index) => ({
          id: `${quizId}-q${index}`,
          text: q.question,
          options: q.options,
          correctOptionIndex: q.correctOptionIndex
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
