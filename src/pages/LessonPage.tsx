import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Book, ClipboardCheck } from 'lucide-react';
import AppHeader from '@/components/layout/AppHeader';
import { useAuth } from '@/contexts/AuthContext';
import { getLesson, getModule } from '@/utils/api';
import { Lesson, Module } from '@/types';
import QuizModal from '@/components/QuizModal';
import { useToast } from '@/hooks/use-toast';
import { saveUserProgress } from '@/utils/gamification';

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
    return <div>Loading lesson...</div>;
  }

  if (!lesson) {
    return <div>Lesson not found.</div>;
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
          <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
          <div className="prose dark:prose-invert">
            <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} children={lesson.content} />
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            {prevLessonId ? (
              <Button 
                variant="outline"
                onClick={() => navigateToLesson(moduleId!, prevLessonId)}
                className="flex items-center"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Previous Lesson
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => navigate(`/modules/${moduleId}`)}
                className="flex items-center"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to Module
              </Button>
            )}

            <div className="space-x-2">
              <Link
                to={`/knowledge-base`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                <Book className="mr-1 h-4 w-4" />
                Knowledge Base
              </Link>

              {hasQuiz && (
                <Button onClick={handleStartQuiz}>
                  <ClipboardCheck className="mr-1 h-4 w-4" />
                  Take Quiz
                </Button>
              )}

              {nextLessonId && (
                <Button onClick={() => navigateToLesson(moduleId!, nextLessonId)}>
                  Next Lesson
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
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
