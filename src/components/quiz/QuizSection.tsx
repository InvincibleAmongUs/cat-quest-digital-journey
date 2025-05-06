
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import QuizQuestion from './QuizQuestion';
import { useToast } from '@/hooks/use-toast';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizSectionProps {
  questions: QuizQuestion[];
  onQuizComplete: (score: number) => void;
  lessonId: number;
}

export default function QuizSection({ questions, onQuizComplete, lessonId }: QuizSectionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();
  
  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (showResults) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };
  
  const handleSubmit = () => {
    if (Object.keys(selectedAnswers).length !== questions.length) {
      toast({
        title: "Please answer all questions",
        description: "You need to answer all questions before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    setShowResults(true);
    
    // Calculate score
    let correctCount = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correctCount++;
      }
    });
    
    const score = Math.round((correctCount / questions.length) * 100);
    
    // Show feedback toast
    if (score === 100) {
      toast({
        title: "Perfect score! 🌟",
        description: "Amazing job! You've mastered this material.",
      });
    } else if (score >= 70) {
      toast({
        title: "Well done! ✅",
        description: `You scored ${score}%. Good understanding of the material!`,
      });
    } else {
      toast({
        title: "Quiz completed",
        description: `You scored ${score}%. Consider reviewing the material again.`,
      });
    }
    
    onQuizComplete(score);
  };
  
  const allQuestionsAnswered = Object.keys(selectedAnswers).length === questions.length;
  
  return (
    <Card className="my-6 border-tech-primary">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-4">Quick Quiz</h3>
        
        <div className="space-y-6">
          {questions.map((q, qIndex) => (
            <QuizQuestion
              key={qIndex}
              question={q.question}
              options={q.options}
              questionIndex={qIndex}
              selectedAnswer={selectedAnswers[qIndex]}
              onSelectAnswer={(answerIndex) => handleAnswerSelect(qIndex, answerIndex)}
              showFeedback={showResults}
              correctAnswer={showResults ? q.correctAnswer : undefined}
            />
          ))}
        </div>
        
        {!showResults ? (
          <Button 
            className="w-full mt-6" 
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered}
          >
            Submit Answers
          </Button>
        ) : (
          <Button 
            className="w-full mt-6" 
            onClick={() => onQuizComplete(0)} // Just to continue
            variant="default"
          >
            Continue to Next Section
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
