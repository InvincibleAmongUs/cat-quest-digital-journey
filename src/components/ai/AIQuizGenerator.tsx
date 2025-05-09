
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DeepseekService } from '@/services/DeepseekService';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function AIQuizGenerator() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentAnswers, setCurrentAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleGenerateQuiz = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter a topic to generate questions about",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setQuestions([]);
    setCurrentAnswers({});
    setShowResults(false);
    
    try {
      const generatedQuestions = await DeepseekService.generateQuiz(topic);
      setQuestions(generatedQuestions);
      
      toast({
        title: "Quiz generated",
        description: `Successfully created ${generatedQuestions.length} questions about ${topic}`,
      });
    } catch (error) {
      console.error('Error generating quiz:', error);
      toast({
        title: "Error generating quiz",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setCurrentAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
    
    // Calculate score
    const totalQuestions = questions.length;
    const correctAnswers = questions.reduce((count, question, index) => {
      return currentAnswers[index] === question.correctAnswer ? count + 1 : count;
    }, 0);
    
    const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    toast({
      title: `Quiz Score: ${scorePercentage}%`,
      description: `You got ${correctAnswers} out of ${totalQuestions} questions correct!`,
      variant: scorePercentage >= 70 ? "default" : "destructive",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Quiz Generator</CardTitle>
        <CardDescription>
          Generate custom quiz questions on any Computer Applications Technology topic
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input 
            placeholder="Enter a topic (e.g., 'Computer Hardware', 'Operating Systems')" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={loading}
            className="flex-1"
          />
          <Button 
            onClick={handleGenerateQuiz} 
            disabled={loading || !topic.trim()}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating
              </>
            ) : 'Generate Quiz'}
          </Button>
        </div>

        {questions.length > 0 && (
          <div className="space-y-6 pt-4">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="space-y-2">
                <h3 className="font-medium text-lg">
                  {qIndex + 1}. {q.question}
                </h3>
                
                <RadioGroup
                  value={currentAnswers[qIndex]?.toString()}
                  onValueChange={(value) => handleAnswerSelect(qIndex, parseInt(value))}
                  disabled={showResults}
                >
                  {q.options.map((option, oIndex) => {
                    const isSelected = currentAnswers[qIndex] === oIndex;
                    const isCorrect = q.correctAnswer === oIndex;
                    const isWrong = showResults && isSelected && !isCorrect;
                    
                    return (
                      <div
                        key={oIndex}
                        className={`flex items-center space-x-2 p-2 rounded-md border ${
                          showResults && isCorrect
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : isWrong
                              ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                              : isSelected
                                ? 'border-primary'
                                : 'border-muted'
                        }`}
                      >
                        <RadioGroupItem value={oIndex.toString()} id={`q${qIndex}-o${oIndex}`} />
                        <Label htmlFor={`q${qIndex}-o${oIndex}`} className="flex-grow">
                          {option}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
                
                {showResults && (
                  <div className="mt-2 p-3 bg-muted rounded-md text-sm">
                    <p className="font-medium">Explanation:</p> 
                    <p>{q.explanation}</p>
                  </div>
                )}
                
                <Separator className="my-4" />
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {questions.length > 0 && !showResults && (
        <CardFooter>
          <Button 
            onClick={handleSubmitQuiz} 
            disabled={Object.keys(currentAnswers).length !== questions.length}
          >
            Submit Answers
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
