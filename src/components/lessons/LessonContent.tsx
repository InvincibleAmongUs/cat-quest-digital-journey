
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ContentBlockRenderer, { AnyContentBlock } from './ContentBlockRenderer';
import QuizQuestion from '../quiz/QuizQuestion';

interface LessonContentProps {
  lesson: {
    id: number;
    title: string;
    blocks: AnyContentBlock[];
    hasQuiz: boolean;
    quizQuestions: {
      question: string;
      options: string[];
      correctAnswer: number;
    }[];
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

  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h1 className="text-3xl font-bold">{lesson.title}</h1>
        
        {/* Main content area */}
        {!quizStarted && (
          <div className="mt-6">
            {lesson.blocks.map((block, index) => (
              <ContentBlockRenderer key={index} block={block} />
            ))}
          </div>
        )}
        
        {/* Quiz section (conditionally rendered) */}
        {lesson.hasQuiz && quizStarted && (
          <Card className="my-6 border-tech-primary">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Quick Quiz</h3>
              
              <div className="space-y-4">
                {lesson.quizQuestions.map((q, qIndex) => (
                  <QuizQuestion
                    key={qIndex}
                    question={q.question}
                    options={q.options}
                    questionIndex={qIndex}
                    selectedAnswer={selectedAnswers[qIndex]}
                    onSelectAnswer={(answerIndex) => handleAnswerSelect(qIndex, answerIndex)}
                  />
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
              disabled={lesson.hasQuiz && quizStarted && Object.keys(selectedAnswers).length !== lesson.quizQuestions.length}
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
