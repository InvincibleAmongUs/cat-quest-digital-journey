import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import LessonContent from '@/components/lessons/LessonContent';
import QuizSection from '@/components/quiz/QuizSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight, Book, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { awardPoints, checkForNewBadges, saveUserProgress } from '@/utils/gamification';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

interface QuizQuestion {
  id: number;
  lesson_id: number;
  question: string;
  options: string[];
  correct_answer: number;
  order_index: number;
}

interface ContentBlock {
  id: number;
  lesson_id: number;
  type: 'text' | 'heading' | 'image' | 'quiz' | 'game';
  content: any;
  order_index: number;
}

interface Lesson {
  id: number;
  module_id: number;
  title: string;
  description: string;
  duration: string | null;
  order_index: number;
  is_challenge: boolean;
  content_blocks?: ContentBlock[];
  quiz_questions?: QuizQuestion[];
}

export default function LessonPage() {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [moduleTitle, setModuleTitle] = useState("");
  const [nextLessonId, setNextLessonId] = useState<number | null>(null);
  const [prevLessonId, setPrevLessonId] = useState<number | null>(null);
  const { toast } = useToast();
  const { user, updateUserData } = useAuth();

  // Fetch lesson data from Supabase
  useEffect(() => {
    const fetchLessonData = async () => {
      if (!moduleId || !lessonId || !user) return;

      setLoading(true);
      try {
        // Fetch the lesson details
        const { data: lessonData, error: lessonError } = await supabase
          .from('lessons')
          .select('*')
          .eq('id', Number(lessonId))
          .single();

        if (lessonError) {
          console.error('Error fetching lesson:', lessonError);
          return;
        }

        // Fetch module title
        const { data: moduleData, error: moduleError } = await supabase
          .from('modules')
          .select('title')
          .eq('id', Number(moduleId))
          .single();

        if (moduleError) {
          console.error('Error fetching module title:', moduleError);
        } else {
          setModuleTitle(moduleData.title);
        }

        // Fetch content blocks for this lesson
        const { data: contentBlocksData, error: contentBlocksError } = await supabase
          .from('content_blocks')
          .select('*')
          .eq('lesson_id', Number(lessonId))
          .order('order_index', { ascending: true });

        if (contentBlocksError) {
          console.error('Error fetching content blocks:', contentBlocksError);
        }

        // Convert generic content block types to our specific types
        const typedContentBlocks: ContentBlock[] = contentBlocksData?.map(block => ({
          ...block,
          type: block.type as 'text' | 'heading' | 'image' | 'quiz' | 'game'
        })) || [];

        // Fetch quiz questions for this lesson
        const { data: quizQuestionsData, error: quizQuestionsError } = await supabase
          .from('quiz_questions')
          .select('*')
          .eq('lesson_id', Number(lessonId))
          .order('order_index', { ascending: true });

        if (quizQuestionsError) {
          console.error('Error fetching quiz questions:', quizQuestionsError);
        }

        // Check if lesson has already been completed by user
        if (user.completedLessons.includes(Number(lessonId))) {
          setIsCompleted(true);
        }

        // Find next and previous lessons
        const { data: allLessonsData, error: allLessonsError } = await supabase
          .from('lessons')
          .select('id, order_index')
          .eq('module_id', Number(moduleId))
          .order('order_index', { ascending: true });

        if (!allLessonsError && allLessonsData) {
          const currentIndex = allLessonsData.findIndex(l => l.id === Number(lessonId));
          
          if (currentIndex > 0) {
            setPrevLessonId(allLessonsData[currentIndex - 1].id);
          }
          
          if (currentIndex < allLessonsData.length - 1) {
            setNextLessonId(allLessonsData[currentIndex + 1].id);
          }
        }

        // Set the complete lesson data
        setLesson({
          ...lessonData,
          content_blocks: typedContentBlocks,
          quiz_questions: quizQuestionsData || []
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error Loading Lesson",
          description: "Failed to load lesson content. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLessonData();
  }, [moduleId, lessonId, user, toast]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  const handleComplete = async () => {
    if (lesson?.quiz_questions?.length && !showQuiz) {
      setShowQuiz(true);
      return;
    }
    
    // Mark lesson as completed
    await completeLesson();
  };
  
  const handleQuizComplete = async (score: number) => {
    setShowQuiz(false);
    
    // Award points based on quiz score
    let pointsAwarded = 5; // Base points for completing
    
    if (score >= 90) {
      pointsAwarded += 10;
    } else if (score >= 75) {
      pointsAwarded += 5;
    }
    
    // Update user progress
    await completeLesson(pointsAwarded);
  };
  
  const completeLesson = async (pointsAwarded: number = 5) => {
    if (!lessonId || !moduleId || !user) return;
    
    try {
      // Save user progress and award points
      const updatedUserData = await saveUserProgress(user, {
        completedLessons: [Number(lessonId)],
        points: pointsAwarded
      });
      
      if (updatedUserData) {
        // Update user data in context
        await updateUserData({
          completedLessons: [...user.completedLessons, Number(lessonId)],
          points: user.points + pointsAwarded
        });
        
        setIsCompleted(true);
        
        toast({
          title: "Lesson Complete!",
          description: `You earned ${pointsAwarded} points!`,
        });
        
        // Check for new badges
        const newBadges = await checkForNewBadges(user, {
          completedLessons: [Number(lessonId)]
        });
        
        if (newBadges.length > 0) {
          // Display badge earned notification
          toast({
            title: "Badge Earned!",
            description: `Congratulations! You've earned a new badge.`,
          });
        }
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
      toast({
        title: "Error",
        description: "Failed to save your progress. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNextLesson = () => {
    if (nextLessonId) {
      navigate(`/modules/${moduleId}/lessons/${nextLessonId}`);
    } else {
      navigate(`/modules/${moduleId}`);
    }
  };

  const handlePreviousLesson = () => {
    if (prevLessonId) {
      navigate(`/modules/${moduleId}/lessons/${prevLessonId}`);
    } else {
      navigate(`/modules/${moduleId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tech-primary"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Lesson Not Found</h2>
            <p className="text-muted-foreground">
              The requested lesson could not be found. Please check the URL or try again later.
            </p>
            <Button variant="outline" asChild>
              <Link to="/modules">
                Back to Modules
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        username={user.username} 
        points={user.points}
      />
      
      <div className="bg-muted py-4 border-b">
        <div className="container">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to="/">
                  <Home className="h-3.5 w-3.5 mr-1 inline" />
                  <span>Home</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to="/modules">
                  <Book className="h-3.5 w-3.5 mr-1 inline" />
                  <span>Modules</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to={`/modules/${moduleId}`}>
                  <span>{moduleTitle}</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>
      
      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          {showQuiz ? (
            <>
              <h1 className="text-3xl font-bold mb-4">{lesson.title} - Quiz</h1>
              <p className="mb-6 text-muted-foreground">Test your knowledge of the concepts covered in this lesson.</p>
              <QuizSection 
                questions={lesson.quiz_questions || []} 
                onQuizComplete={handleQuizComplete} 
                lessonId={Number(lessonId)}
              />
            </>
          ) : (
            <LessonContent 
              lesson={{
                id: lesson.id,
                title: lesson.title,
                blocks: lesson.content_blocks || [],
                hasQuiz: (lesson.quiz_questions || []).length > 0,
                quizQuestions: lesson.quiz_questions?.map(q => ({
                  question: q.question,
                  options: q.options,
                  correctAnswer: q.correct_answer
                })) || []
              }}
              onComplete={handleComplete}
              onNextLesson={handleNextLesson}
              onPreviousLesson={handlePreviousLesson}
              hasNextLesson={!!nextLessonId}
              hasPreviousLesson={!!prevLessonId}
            />
          )}
          
          {isCompleted && (
            <Card className="mt-8">
              <CardContent className="flex items-center space-x-4 p-4">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <div>
                  <h3 className="text-lg font-semibold">Lesson Completed</h3>
                  <p className="text-muted-foreground">You have successfully completed this lesson.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
