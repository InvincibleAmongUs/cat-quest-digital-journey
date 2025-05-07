
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import LessonContent from '@/components/lessons/LessonContent';
import QuizSection from '@/components/quiz/QuizSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight, Book, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { awardPoints, checkForNewBadges, saveUserProgress, availableBadges } from '@/utils/gamification';
import { useAuth } from '@/contexts/AuthContext';
import { term1Lessons } from '@/knowledgebase/term1_lesson_data';

export default function LessonPage() {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();
  const { user, updateUserData } = useAuth();

  // If no user data is found, redirect to login
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setLoading(false);
    }
  }, [user, navigate]);
  
  if (!user) {
    return null;
  }

  // Find current lesson based on lessonId
  const currentLessonIndex = term1Lessons.findIndex(lesson => lesson.id === Number(lessonId));
  const lesson = term1Lessons[currentLessonIndex];
  
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

  const handleComplete = () => {
    if (lesson.hasQuiz && !showQuiz) {
      setShowQuiz(true);
      return;
    }
    
    // In a real app, we would update the user's progress
    completeLesson();
  };
  
  const handleQuizComplete = (score: number) => {
    // Save quiz score
    const quizScores = { ...user.quizScores, [lesson.id]: score };
    
    // Award points based on score
    let pointsAwarded = awardPoints('quiz_complete');
    if (score === 100) {
      pointsAwarded += awardPoints('perfect_score');
    }
    
    // Only complete the lesson if score is 80% or higher
    if (score >= 80) {
      completeLesson(pointsAwarded, quizScores);
    } else {
      // Update scores but don't complete lesson
      const updatedUserData = saveUserProgress(user, {
        quizScores,
        points: pointsAwarded
      });
      
      updateUserData(updatedUserData);
      
      toast({
        title: "Quiz score below 80%",
        description: "You need to score at least 80% to complete this lesson. Try again!",
        variant: "destructive",
      });
    }
  };
  
  const completeLesson = (additionalPoints = 0, quizScores = {}) => {
    setIsCompleted(true);
    
    // Mark lesson as completed if not already
    const completedLessons = [...user.completedLessons];
    if (!completedLessons.includes(lesson.id)) {
      completedLessons.push(lesson.id);
    }
    
    // Award points for lesson completion
    const pointsAwarded = awardPoints('lesson_complete') + additionalPoints;
    
    // Create updated user data
    const updatedUserData = saveUserProgress(user, {
      completedLessons,
      points: pointsAwarded,
      quizScores
    });
    
    // Check for new badges
    const newBadges = checkForNewBadges(updatedUserData);
    
    if (newBadges.length > 0) {
      // Save the new badges
      const finalUserData = saveUserProgress(updatedUserData, {
        badges: newBadges
      });
      
      // Update user data in the context
      updateUserData(finalUserData);
      
      // Show badge notifications
      newBadges.forEach(badgeId => {
        const badge = availableBadges.find(b => b.id === badgeId);
        if (badge) {
          toast({
            title: `New Badge Earned: ${badge.name}`,
            description: badge.description,
            variant: "default",
          });
        }
      });
    } else {
      // Update user data in the context
      updateUserData(updatedUserData);
    }
  };

  const handleNextLesson = () => {
    const nextLesson = term1Lessons[currentLessonIndex + 1];
    if (nextLesson) {
      navigate(`/modules/${moduleId}/lessons/${nextLesson.id}`);
    } else {
      navigate(`/modules/${moduleId}`);
    }
  };

  const handlePreviousLesson = () => {
    const prevLesson = term1Lessons[currentLessonIndex - 1];
    if (prevLesson) {
      navigate(`/modules/${moduleId}/lessons/${prevLesson.id}`);
    } else {
      navigate(`/modules/${moduleId}`);
    }
  };

  const hasNextLesson = currentLessonIndex < term1Lessons.length - 1;
  const hasPreviousLesson = currentLessonIndex > 0;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        username={user.username} 
        points={user.points}
      />
      
      <div className="bg-muted py-4 border-b">
        <div className="container">
          <div className="flex items-center text-sm text-muted-foreground">
            <Button variant="ghost" size="sm" asChild className="h-7">
              <Link to="/">
                <Home className="h-3.5 w-3.5 mr-1" />
                <span>Home</span>
              </Link>
            </Button>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Button variant="ghost" size="sm" asChild className="h-7">
              <Link to="/modules">
                <Book className="h-3.5 w-3.5 mr-1" />
                <span>Modules</span>
              </Link>
            </Button>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Button variant="ghost" size="sm" asChild className="h-7">
              <Link to={`/modules/${moduleId}`}>
                <span>System Superstars</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          {showQuiz ? (
            <>
              <h1 className="text-3xl font-bold mb-4">{lesson.title} - Quiz</h1>
              <p className="mb-6 text-muted-foreground">Test your knowledge of the concepts covered in this lesson.</p>
              <QuizSection 
                questions={lesson.quizQuestions} 
                onQuizComplete={handleQuizComplete} 
                lessonId={Number(lessonId)}
              />
            </>
          ) : (
            <LessonContent 
              lesson={lesson}
              onComplete={handleComplete}
              onNextLesson={handleNextLesson}
              onPreviousLesson={handlePreviousLesson}
              hasNextLesson={hasNextLesson}
              hasPreviousLesson={hasPreviousLesson}
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
