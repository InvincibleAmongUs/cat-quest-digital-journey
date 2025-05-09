import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Book } from 'lucide-react';
import AppHeader from '@/components/layout/AppHeader';
import { useAuth } from '@/contexts/AuthContext';
import { Lesson, Module } from '@/types';
import QuizModal from '@/components/QuizModal';
import { useToast } from '@/hooks/use-toast';
import { saveUserProgress } from '@/utils/gamification';
import LessonContentDisplay from '@/components/lessons/LessonContentDisplay';

// Define the params interface properly to satisfy the Record<string, string> constraint
interface LessonParams {
  [key: string]: string | undefined;
  moduleId?: string;
  lessonId?: string;
}

export default function LessonPage() {
  const { moduleId, lessonId } = useParams<LessonParams>();
  const navigate = useNavigate();
  const { user, updateUserData } = useAuth();
  const { toast } = useToast();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [module, setModule] = useState<Module | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [hasQuiz, setHasQuiz] = useState(false);

  useEffect(() => {
    if (!moduleId || !lessonId) {
      console.error("ModuleId or lessonId is missing");
      navigate('/modules');
      return;
    }

    const fetchLesson = async () => {
      setIsLoading(true);
      try {
        const lessonData = await getLesson(moduleId, lessonId);
        setLesson(lessonData);
        setHasQuiz(lessonData.quizId != null);
      } catch (error) {
        console.error("Failed to load lesson:", error);
        toast({
          title: "Error",
          description: "Failed to load lesson. Please try again.",
          variant: "destructive",
        });
        navigate(`/modules/${moduleId}`);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchModule = async () => {
      try {
        const moduleData = await getModule(moduleId);
        setModule(moduleData);
      } catch (error) {
        console.error("Failed to load module:", error);
        toast({
          title: "Error",
          description: "Failed to load module. Please try again.",
          variant: "destructive",
        });
        navigate('/modules');
      }
    };

    fetchLesson();
    fetchModule();
  }, [moduleId, lessonId, navigate, toast]);

  const navigateToLesson = (moduleId: string, lessonId: string) => {
    navigate(`/modules/${moduleId}/lessons/${lessonId}`);
  };

  const handleStartQuiz = () => {
    setIsQuizModalOpen(true);
  };

  const handleCloseQuizModal = async (pointsAwarded: number) => {
    setIsQuizModalOpen(false);

    if (user) {
      try {
        const updatedUserData = await saveUserProgress(user, {
          points: pointsAwarded
        });
        
        if (updatedUserData) {
          await updateUserData({
            points: user.points + pointsAwarded
          });
          
          toast({
            title: `Quiz Complete!`,
            description: `You earned ${pointsAwarded} points!`,
          });
        }
      } catch (error) {
        console.error('Error updating progress:', error);
        toast({
          title: "Error",
          description: "Failed to save your progress. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-xl font-semibold mb-4">Lesson Not Found</h2>
          <p className="text-muted-foreground mb-6">Sorry, we couldn't find the lesson you're looking for.</p>
          <Button onClick={() => navigate('/modules')}>
            Go to Modules
          </Button>
        </div>
      </div>
    );
  }

  const nextLessonId = lesson.nextLessonId;
  const prevLessonId = lesson.prevLessonId;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        username={user?.username || 'Guest'} 
        points={user?.points || 0}
      />

      <main className="container py-8">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate(`/modules/${moduleId}`)}
            className="mb-4 flex items-center"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Module
          </Button>

          <LessonContentDisplay
            lessonId={lessonId || ''}
            moduleId={moduleId || ''}
            onStartQuiz={handleStartQuiz}
            onNext={() => nextLessonId && navigateToLesson(moduleId!, nextLessonId)}
            onPrevious={() => prevLessonId && navigateToLesson(moduleId!, prevLessonId)}
            hasNext={!!nextLessonId}
            hasPrevious={!!prevLessonId}
            markdownContent={lesson.content}
          />
        </div>
      </main>

      <QuizModal
        isOpen={isQuizModalOpen}
        onClose={handleCloseQuizModal}
        quizId={lesson.quizId}
      />
    </div>
  );
}
