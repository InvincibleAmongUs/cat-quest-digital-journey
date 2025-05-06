
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useToast } from '@/components/ui/toaster';

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
              
              {/* This is a simple example quiz - in a real app, this would be dynamic */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="font-medium">1. What does CPU stand for?</p>
                  <div className="grid grid-cols-1 gap-2">
                    <Button variant="outline" className="justify-start">Central Processing Unit</Button>
                    <Button variant="outline" className="justify-start">Computer Personal Unit</Button>
                    <Button variant="outline" className="justify-start">Central Personal Utility</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium">2. Which of these is NOT a type of computer?</p>
                  <div className="grid grid-cols-1 gap-2">
                    <Button variant="outline" className="justify-start">Desktop</Button>
                    <Button variant="outline" className="justify-start">Laptop</Button>
                    <Button variant="outline" className="justify-start">Dataphone</Button>
                  </div>
                </div>
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
            <Button onClick={handleComplete}>
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
