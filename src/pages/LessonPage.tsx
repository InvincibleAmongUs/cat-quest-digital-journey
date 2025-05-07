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
          content_blocks: contentBlocksData || [],
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

  // If no user data is found, redirect to login
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  if (!user) {
    return null;
  }

  const handleComplete = async () => {
    if (lesson?.quiz_questions?.length && !showQuiz) {
      setShowQuiz(true);
      return;
    }
    
    // Mark lesson as completed
    await completeLesson();
  };
  
  const handleQuizComplete = async (score: number) => {
    // Save quiz score
    const quizScores = { ...user.quizScores, [Number(lessonId)]: score };
    
    // Award points based on score
    let pointsAwarded = awardPoints('quiz_complete');
    if (score === 100) {
      pointsAwarded += awardPoints('perfect_score');
    }
    
    // Only complete the lesson if score is 80% or higher
    if (score >= 80) {
      await completeLesson(pointsAwarded, quizScores);
    } else {
      // Update scores but don't complete lesson
      const updatedUserData = await saveUserProgress(user, {
        quizScores,
        points: pointsAwarded
      });
      
      if (updatedUserData) {
        await updateUserData({
          quizScores,
          points: user.points + pointsAwarded
        });
      }
      
      toast({
        title: "Quiz score below 80%",
        description: "You need to score at least 80% to complete this lesson. Try again!",
        variant: "destructive",
      });
    }
  };
  
  const completeLesson = async (additionalPoints = 0, quizScores = {}) => {
    setIsCompleted(true);
    
    // Mark lesson as completed if not already
    const completedLessons = [...user.completedLessons];
    if (!completedLessons.includes(Number(lessonId))) {
      completedLessons.push(Number(lessonId));
    }
    
    // Award points for lesson completion
    const pointsAwarded = awardPoints('lesson_complete') + additionalPoints;
    
    // Create updated user data
    const updatedUserData = await saveUserProgress(user, {
      completedLessons,
      points: pointsAwarded,
      quizScores
    });
    
    if (!updatedUserData) {
      toast({
        title: "Error Saving Progress",
        description: "Failed to save your progress. Please try again.",
        variant: "destructive",
      });
      return;
    }
    
    // Check for new badges
    const newBadges = checkForNewBadges(updatedUserData);
    
    if (newBadges.length > 0) {
      // Save the new badges
      const finalUserData = await saveUserProgress(updatedUserData, {
        badges: newBadges
      });
      
      if (finalUserData) {
        // Update user data in the context
        await updateUserData({
          ...finalUserData,
          completedLessons,
          points: user.points + pointsAwarded,
          quizScores: { ...user.quizScores, ...quizScores },
          badges: [...user.badges, ...newBadges]
        });
        
        // Show badge notifications
        for (const badgeId of newBadges) {
          // Fetch badge details from Supabase
          const { data: badgeData } = await supabase
            .from('badges')
            .select('name, description')
            .eq('id', badgeId)
            .single();
          
          if (badgeData) {
            toast({
              title: `New Badge Earned: ${badgeData.name}`,
              description: badgeData.description,
            });
          }
        }
      }
    } else {
      // Update user data in the context
      await updateUserData({
        completedLessons,
        points: user.points + pointsAwarded,
        quizScores: { ...user.quizScores, ...quizScores }
      });
    }
    
    toast({
      title: "Lesson Completed!",
      description: `You've earned ${pointsAwarded} points and are making great progress!`,
    });
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
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tech-primary mx-auto"></div>
          <p className="mt-4 text-tech-primary font-medium">Loading lesson content...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader username={user.username} points={user.points} />
        <div className="container py-8 text-center">
          <h1 className="text-3xl font-bold mb-6">Lesson Not Found</h1>
          <p className="mb-6">Sorry, we couldn't find the lesson you're looking for.</p>
          <Button onClick={() => navigate(`/modules/${moduleId}`)}>
            Return to Module
          </Button>
        </div>
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
              <BreadcrumbLink asChild>
                <Link to="/">
                  <Home className="h-3.5 w-3.5 mr-1 inline" />
                  <span>Home</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/modules">
                  <Book className="h-3.5 w-3.5 mr-1 inline" />
                  <span>Modules</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
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
                quizQuestions: lesson.quiz_questions || []
              }}
              onComplete={handleComplete}
              onNextLesson={handleNextLesson}
              onPreviousLesson={handlePreviousLesson}
              hasNextLesson={!!nextLessonId}
              hasPreviousLesson={!!prevLessonId}
            />
          )}
          
          {isCompleted && (
            <div className="mt-8 p-6 border border-tech-primary rounded-lg bg-tech-primary/5">
              <h2 className="text-xl font-bold mb-2">🎉 Lesson Completed!</h2>
              <p>Great job finishing this lesson. You've earned points and made progress in your learning journey.</p>
              <Button 
                className="mt-4" 
                onClick={handleNextLesson}
              >
                Continue to Next Lesson
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}