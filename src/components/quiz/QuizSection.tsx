import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle } from 'lucide-react';
import QuizQuestion from './QuizQuestion';

interface QuizSectionProps {
  questions: {
    id: number;
    lesson_id: number;
    question: string;
    options: string[];
    correct_answer: number;
    order_index: number;
  }[];
  onQuizComplete: (score: number) => void;
  lessonId: number;
}

export default function QuizSection({ 
  questions, 
  onQuizComplete, 
  lessonId 
}: QuizSectionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  if (questions.length === 0) {
    return (
      <Alert className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Quiz Available</AlertTitle>
        <AlertDescription>
          This lesson does not have any quiz questions.
        </AlertDescription>
      </Alert>
    );
  }

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (isSubmitted) return;

    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleSubmitQuiz = () => {
    // Calculate score
    let correctAnswers = 0;
    
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct_answer) {
        correctAnswers++;
      }
    });

    const calculatedScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(calculatedScore);
    setIsSubmitted(true);
    
    onQuizComplete(calculatedScore);
  };

  const isComplete = Object.keys(selectedAnswers).length === questions.length;

  return (
    <div className="space-y-6">
      <Card className="border-tech-primary">
        <CardContent className="p-6">
          {questions.map((q, index) => (
            <div key={q.id} className="mb-6 p-4 border rounded-lg bg-background">
              <QuizQuestion
                question={q.question}
                options={q.options}
                questionIndex={index}
                selectedAnswer={selectedAnswers[index]}
                onSelectAnswer={(answerIndex) => handleAnswerSelect(index, answerIndex)}
                isSubmitted={isSubmitted}
                correctAnswer={isSubmitted ? q.correct_answer : undefined}
              />
            </div>
          ))}
          
          {isSubmitted && score !== null && (
            <Alert 
              className={`mt-4 ${
                score >= 80 ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'
              }`}
            >
              {score >= 80 ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-amber-600" />
              )}
              
              <AlertTitle className={score >= 80 ? 'text-green-800' : 'text-amber-800'}>
                {score >= 80 ? 'Congratulations!' : 'Almost there!'}
              </AlertTitle>
              
              <AlertDescription className={score >= 80 ? 'text-green-700' : 'text-amber-700'}>
                {score >= 80 
                  ? `You scored ${score}%! You've completed this lesson successfully.` 
                  : `You scored ${score}%. You need to score at least 80% to complete this lesson. Try again!`}
              </AlertDescription>
            </Alert>
          )}
          
          {!isSubmitted && (
            <div className="mt-6 flex justify-end">
              <Button 
                onClick={handleSubmitQuiz}
                disabled={!isComplete}
              >
                Submit Answers
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}