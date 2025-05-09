
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizQuestionProps {
  question: string;
  options: string[];
  questionIndex: number;
  selectedAnswer?: number;
  onSelectAnswer: (answerIndex: number) => void;
  isSubmitted?: boolean;
  correctAnswer?: number;
}

export default function QuizQuestion({
  question,
  options,
  questionIndex,
  selectedAnswer,
  onSelectAnswer,
  isSubmitted,
  correctAnswer
}: QuizQuestionProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">
        {questionIndex + 1}. {question}
      </h3>
      
      <RadioGroup
        value={selectedAnswer?.toString()}
        onValueChange={(value) => !isSubmitted && onSelectAnswer(parseInt(value))}
        className="space-y-3"
      >
        {options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = correctAnswer !== undefined && correctAnswer === index;
          const isIncorrect = isSubmitted && isSelected && !isCorrect;
          
          return (
            <div 
              key={index} 
              className={`flex items-center space-x-2 rounded-md border p-3 ${
                isSubmitted
                  ? isCorrect
                    ? 'border-green-500 bg-green-50'
                    : isIncorrect
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200'
                  : isSelected 
                    ? 'border-tech-primary' 
                    : 'border-gray-200'
              }`}
            >
              <RadioGroupItem 
                value={index.toString()} 
                id={`q${questionIndex}-option-${index}`} 
                disabled={isSubmitted}
                className={isCorrect ? 'text-green-500' : isIncorrect ? 'text-red-500' : ''}
              />
              <Label 
                htmlFor={`q${questionIndex}-option-${index}`}
                className="flex-grow"
              >
                {option}
              </Label>
              
              {isSubmitted && (
                <>
                  {isCorrect && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  {isIncorrect && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </>
              )}
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}
