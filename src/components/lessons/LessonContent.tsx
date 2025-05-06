
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LessonContentProps {
  lesson: {
    id: number;
    title: string;
    content: React.ReactNode;
    hasQuiz: boolean;
  };
  onComplete: () => void;
  onNextLesson: () => void;
  onPreviousLesson: () => void;
  hasNextLesson: boolean;
  hasPreviousLesson: boolean;
}

export default function LessonContent({ 
  lesson, 
  onComplete, 
  onNextLesson, 
  onPreviousLesson,
  hasNextLesson,
  hasPreviousLesson 
}: LessonContentProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const { toast } = useToast();

  const handleComplete = () => {
    if (lesson.hasQuiz && !quizStarted) {
      setQuizStarted(true);
      return;
    }
    
    setIsCompleted(true);
    onComplete();
    
    toast({
      title: "Lesson completed!",
      description: "You've earned 10 points and are making great progress!",
    });
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const quizQuestions = [
    {
      question: "What does CPU stand for?",
      options: ["Central Processing Unit", "Computer Personal Unit", "Central Personal Utility"],
      correctAnswer: 0
    },
    {
      question: "Which of these is NOT a type of computer?",
      options: ["Desktop", "Laptop", "Dataphone"],
      correctAnswer: 2
    }
  ];

  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h1 className="text-3xl font-bold">{lesson.title}</h1>
        
        {/* Main content area */}
        <div className="mt-6">
          {lesson.content}
        </div>
        
        {/* Quiz section (conditionally rendered) */}
        {lesson.hasQuiz && quizStarted && (
          <Card className="my-6 border-tech-primary">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Quick Quiz</h3>
              
              <div className="space-y-4">
                {quizQuestions.map((q, qIndex) => (
                  <div key={qIndex} className="space-y-2">
                    <p className="font-medium">{qIndex + 1}. {q.question}</p>
                    <div className="grid grid-cols-1 gap-2">
                      {q.options.map((option, aIndex) => (
                        <Button 
                          key={aIndex}
                          variant={selectedAnswers[qIndex] === aIndex ? "default" : "outline"} 
                          className="justify-start"
                          onClick={() => handleAnswerSelect(qIndex, aIndex)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-between pt-6 border-t">
        <Button 
          variant="outline"
          onClick={onPreviousLesson}
          disabled={!hasPreviousLesson}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous Lesson
        </Button>
        
        <div className="flex gap-2">
          {!isCompleted ? (
            <Button 
              onClick={handleComplete}
              disabled={lesson.hasQuiz && quizStarted && Object.keys(selectedAnswers).length !== quizQuestions.length}
            >
              {lesson.hasQuiz && !quizStarted ? 'Take Quiz' : 'Complete Lesson'}
              {!lesson.hasQuiz && <Check className="ml-2 h-4 w-4" />}
            </Button>
          ) : (
            <Button onClick={onNextLesson} disabled={!hasNextLesson}>
              Next Lesson
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
