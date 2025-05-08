
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizModalProps {
  isOpen: boolean;
  onClose: (pointsAwarded: number) => void;
  quizId?: string | null;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function QuizModal({ isOpen, onClose, quizId }: QuizModalProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (quizId) {
      // In a real app, fetch questions from an API based on quizId
      const sampleQuestions = [
        {
          question: 'What is the main purpose of a computer?',
          options: ['To process data', 'To play games', 'To browse the internet', 'To watch videos'],
          correctAnswer: 0,
        },
        {
          question: 'Which component is considered the "brain" of a computer?',
          options: ['RAM', 'Hard Drive', 'CPU', 'Motherboard'],
          correctAnswer: 2,
        },
      ];
      
      setQuestions(sampleQuestions);
    }
  }, [quizId]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const scorePercentage = Math.round((correctAnswers / questions.length) * 100);
    setScore(scorePercentage);
    
    // Calculate points based on score
    let pointsAwarded = 0;
    if (scorePercentage >= 90) {
      pointsAwarded = 10;
    } else if (scorePercentage >= 70) {
      pointsAwarded = 5;
    } else if (scorePercentage >= 50) {
      pointsAwarded = 3;
    } else {
      pointsAwarded = 1;
    }
    
    return pointsAwarded;
  };

  const handleComplete = () => {
    const pointsAwarded = calculateScore();
    onClose(pointsAwarded);
  };

  const currentQuestionItem = questions[currentQuestion];
  const hasSelectedAnswer = selectedAnswers[currentQuestion] !== undefined;

  if (!quizId || !questions.length) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => !showResults && onClose(0)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Quiz</DialogTitle>
        </DialogHeader>
        
        {!showResults ? (
          <div className="py-4">
            <div className="mb-4 text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            
            <h3 className="text-lg font-medium mb-4">
              {currentQuestionItem?.question}
            </h3>
            
            <div className="space-y-2">
              {currentQuestionItem?.options.map((option, index) => (
                <div
                  key={index}
                  className={`p-3 border rounded-md cursor-pointer ${
                    selectedAnswers[currentQuestion] === index 
                      ? 'border-primary bg-primary/10' 
                      : 'hover:bg-accent'
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-4">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold mb-2">Your Score</div>
              <div className="text-4xl font-bold text-primary">{score}%</div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-3">
              {questions.map((q, index) => {
                const isCorrect = selectedAnswers[index] === q.correctAnswer;
                
                return (
                  <div key={index} className="text-sm">
                    <div className="flex items-start gap-2">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-medium">{q.question}</p>
                        <p className="text-muted-foreground">
                          Correct answer: {q.options[q.correctAnswer]}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        <DialogFooter>
          {!showResults ? (
            <Button 
              onClick={handleNext}
              disabled={!hasSelectedAnswer}
              className="w-full sm:w-auto"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
            </Button>
          ) : (
            <Button 
              onClick={handleComplete}
              className="w-full sm:w-auto"
            >
              Complete
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
