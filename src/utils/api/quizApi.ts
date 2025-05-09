
import { Quiz } from '@/types';
import { moduleOneLessons } from '@/data/moduleOneData';

/**
 * Fetches a quiz by ID
 */
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
