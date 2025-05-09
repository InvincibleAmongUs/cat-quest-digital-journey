
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle, XCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InlineQuizProps {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export default function InlineQuiz({ 
  question, 
  options, 
  correctAnswer,
  explanation 
}: InlineQuizProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = () => {
    if (selectedOption === null) {
      toast({
        title: "Select an option",
        description: "Please select an answer before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitted(true);
    
    if (selectedOption === correctAnswer) {
      toast({
        title: "Correct!",
        description: "Good job! You got the answer right.",
      });
    } else {
      toast({
        title: "Not quite right",
        description: "Don't worry, review the explanation and try again.",
        variant: "destructive",
      });
    }
  };
  
  const resetQuiz = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
  };
  
  return (
    <Card className="my-6 border-l-4 border-l-blue-500">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-start">
          <HelpCircle className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
          <span>Knowledge Check: {question}</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <RadioGroup value={String(selectedOption)} onValueChange={(value) => setSelectedOption(parseInt(value, 10))}>
          {options.map((option, index) => {
            let icon = null;
            let extraClasses = '';
            
            if (isSubmitted) {
              if (index === correctAnswer) {
                icon = <CheckCircle className="h-5 w-5 text-green-500" />;
                extraClasses = 'text-green-700 font-medium';
              } else if (index === selectedOption) {
                icon = <XCircle className="h-5 w-5 text-red-500" />;
                extraClasses = 'text-red-700';
              }
            }
            
            return (
              <div key={index} className={`flex items-center space-x-2 p-2 rounded-md ${
                isSubmitted && index === correctAnswer ? 'bg-green-50 dark:bg-green-900/20' : 
                isSubmitted && index === selectedOption ? 'bg-red-50 dark:bg-red-900/20' : ''
              }`}>
                <RadioGroupItem 
                  value={String(index)} 
                  id={`option-${index}`}
                  disabled={isSubmitted}
                />
                <label 
                  htmlFor={`option-${index}`} 
                  className={`text-sm w-full cursor-pointer ${extraClasses}`}
                >
                  {option}
                </label>
                {icon && <div>{icon}</div>}
              </div>
            );
          })}
        </RadioGroup>
        
        {isSubmitted && explanation && (
          <div className="mt-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex w-full justify-between items-center p-2 text-left"
              onClick={() => setShowExplanation(!showExplanation)}
            >
              <span className="font-medium">Explanation</span>
              {showExplanation ? 
                <ChevronUp className="h-4 w-4" /> : 
                <ChevronDown className="h-4 w-4" />
              }
            </Button>
            
            {showExplanation && (
              <div className="mt-2 p-3 bg-muted rounded-md text-sm">
                {explanation}
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-end space-x-2 border-t px-6 py-4">
        {isSubmitted ? (
          <Button variant="outline" onClick={resetQuiz}>
            Try Again
          </Button>
        ) : (
          <Button onClick={handleSubmit}>
            Submit Answer
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
