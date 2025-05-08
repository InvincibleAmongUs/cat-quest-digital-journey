
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface QuizQuestionProps {
  question: string;
  options: string[];
  questionIndex: number;
  selectedAnswer: number | undefined;
  onSelectAnswer: (index: number) => void;
  showFeedback?: boolean;
  correctAnswer?: number;
}

export default function QuizQuestion({
  question,
  options,
  questionIndex,
  selectedAnswer,
  onSelectAnswer,
  showFeedback = false,
  correctAnswer
}: QuizQuestionProps) {
  return (
    <div className="space-y-2">
      <p className="font-medium">{questionIndex + 1}. {question}</p>
      <div className="grid grid-cols-1 gap-2">
        {options.map((option, aIndex) => {
          const isSelected = selectedAnswer === aIndex;
          const isCorrect = showFeedback && correctAnswer === aIndex;
          const isIncorrect = showFeedback && isSelected && correctAnswer !== aIndex;
          
          let variant: "outline" | "default" | "destructive" | "secondary" = "outline";
          
          if (isSelected) {
            variant = "default";
          }
          
          if (showFeedback) {
            if (isCorrect) {
              variant = "secondary";
            } else if (isIncorrect) {
              variant = "destructive";
            }
          }
          
          return (
            <Button 
              key={aIndex}
              variant={variant}
              className="justify-start h-auto py-3 px-4"
              onClick={() => onSelectAnswer(aIndex)}
              disabled={showFeedback}
            >
              <div className="flex w-full items-center justify-between">
                <span>{option}</span>
                {showFeedback && isCorrect && (
                  <CheckCircle2 className="h-5 w-5 text-green-500 ml-2" />
                )}
                {showFeedback && isIncorrect && (
                  <AlertCircle className="h-5 w-5 text-red-500 ml-2" />
                )}
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
