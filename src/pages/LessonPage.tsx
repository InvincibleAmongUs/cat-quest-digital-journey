import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import LessonContent from '@/components/lessons/LessonContent';
import QuizSection from '@/components/quiz/QuizSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight, Book, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { awardPoints, checkForNewBadges, getUserProgress, saveUserProgress, availableBadges } from '@/utils/gamification';

// Mock lesson data for the first lesson of Module 1
const lessonData = {
  id: 1,
  moduleId: 1,
  title: "Introduction to Computers",
  hasQuiz: true,
  content: (
    <div className="space-y-6">
      <p>Welcome to your first lesson in Computer Applications Technology! Today, we'll be exploring the fundamentals of computer systems and understanding what makes them work.</p>
      
      <h2 className="text-2xl font-bold mt-6">What is a Computer?</h2>
      <p>A computer is an electronic device that processes data according to instructions stored in its memory. It accepts input, processes it, and provides output in a useful format.</p>
      
      <div className="my-6">
        <img 
          src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80" 
          alt="A computer setup"
          className="rounded-lg w-full"
        />
        <p className="text-sm text-center text-muted-foreground mt-2">A modern computer workstation</p>
      </div>
      
      <h2 className="text-2xl font-bold mt-6">Information Processing Cycle</h2>
      <p>The information processing cycle consists of four main steps:</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
        <Card className="p-4 text-center">
          <div className="text-tech-primary text-2xl mb-2">1</div>
          <h3 className="font-bold">Input</h3>
          <p className="text-sm">Data entry via keyboard, mouse, scanner, etc.</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-tech-primary text-2xl mb-2">2</div>
          <h3 className="font-bold">Processing</h3>
          <p className="text-sm">Manipulation of data by the CPU</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-tech-primary text-2xl mb-2">3</div>
          <h3 className="font-bold">Output</h3>
          <p className="text-sm">Results displayed via monitor, printer, etc.</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-tech-primary text-2xl mb-2">4</div>
          <h3 className="font-bold">Storage</h3>
          <p className="text-sm">Saving data for future use</p>
        </Card>
      </div>
      
      <h2 className="text-2xl font-bold mt-6">Types of Computers</h2>
      <p>There are several types of computers, classified by size, power, and purpose:</p>
      
      <ul className="list-disc pl-6 space-y-2 mt-4">
        <li>
          <strong>Desktop Computers:</strong> Stationary computers designed for use on a desk or table.
        </li>
        <li>
          <strong>Laptop Computers:</strong> Portable computers with a screen, keyboard, and trackpad in a single unit.
        </li>
        <li>
          <strong>Tablets:</strong> Mobile computers with touchscreens and without physical keyboards.
        </li>
        <li>
          <strong>Smartphones:</strong> Mobile phones with computing capabilities and internet connectivity.
        </li>
        <li>
          <strong>Servers:</strong> Powerful computers that provide resources to other computers on a network.
        </li>
        <li>
          <strong>Supercomputers:</strong> Extremely powerful computers used for complex calculations and simulations.
        </li>
      </ul>
      
      <h2 className="text-2xl font-bold mt-6">The Difference Between Data and Information</h2>
      <p>Understanding the distinction between data and information is crucial in computer systems:</p>
      
      <div className="grid md:grid-cols-2 gap-6 my-6">
        <Card className="p-6">
          <h3 className="font-bold text-xl mb-2">Data</h3>
          <p>Raw facts and figures that don't have any specific meaning on their own. Data can be numbers, text, images, audio, or video.</p>
          <p className="mt-2"><strong>Example:</strong> 28, 10, 2023</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-bold text-xl mb-2">Information</h3>
          <p>Data that has been processed, organized, and presented in a way that makes it meaningful and useful for specific purposes.</p>
          <p className="mt-2"><strong>Example:</strong> Your birthday is October 28, 2023</p>
        </Card>
      </div>
      
      <h2 className="text-2xl font-bold mt-6">ICT in Daily Life</h2>
      <p>Information and Communication Technology (ICT) plays an important role in our daily lives:</p>
      
      <ul className="list-disc pl-6 space-y-2 mt-4">
        <li>Communication (email, messaging, video calls)</li>
        <li>Education (online learning, research)</li>
        <li>Entertainment (streaming, gaming)</li>
        <li>Business (office productivity, e-commerce)</li>
        <li>Healthcare (electronic records, telemedicine)</li>
        <li>Transportation (GPS navigation, traffic updates)</li>
      </ul>
    </div>
  ),
  quizQuestions: [
    {
      question: "What does CPU stand for?",
      options: ["Central Processing Unit", "Computer Personal Unit", "Central Personal Utility"],
      correctAnswer: 0
    },
    {
      question: "Which of these is NOT a type of computer?",
      options: ["Desktop", "Laptop", "Dataphone"],
      correctAnswer: 2
    },
    {
      question: "What is the main purpose of computer storage?",
      options: ["To process data", "To save data for future use", "To display output"],
      correctAnswer: 1
    }
  ]
};

export default function LessonPage() {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const [showQuiz, setShowQuiz] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();
  
  // Access user data from localStorage
  const userDataString = localStorage.getItem('user');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  
  // If no user data is found, redirect to login
  useEffect(() => {
    if (!userData) {
      navigate('/login');
    }
  }, [userData, navigate]);
  
  if (!userData) {
    return null;
  }

  // In a real app, we would fetch the lesson data based on moduleId and lessonId
  const lesson = lessonData;

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
    saveUserProgress({
      quizScores: { [lesson.id]: score }
    });
    
    // Award points based on score
    let pointsAwarded = awardPoints('quiz_complete');
    if (score === 100) {
      pointsAwarded += awardPoints('perfect_score');
    }
    
    // Complete the lesson
    completeLesson();
  };
  
  const completeLesson = () => {
    setIsCompleted(true);
    
    // Mark lesson as completed
    const pointsAwarded = awardPoints('lesson_complete');
    
    // Update user progress
    saveUserProgress({
      completedLessons: [lesson.id],
      points: pointsAwarded
    });
    
    // Check for new badges
    const userProgress = getUserProgress();
    const newBadges = checkForNewBadges(userProgress);
    
    if (newBadges.length > 0) {
      // Save the new badges
      saveUserProgress({
        badges: newBadges
      });
      
      // Show badge notification
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
    }
    
    // Update points display in the UI
    const updatedUserData = {
      ...userData,
      points: userData.points + pointsAwarded
    };
    localStorage.setItem('user', JSON.stringify(updatedUserData));
  };

  const handleNextLesson = () => {
    // In a real app, we would navigate to the next lesson
    // For this demo, we'll just go back to the module page
    navigate(`/modules/${moduleId}`);
  };

  const handlePreviousLesson = () => {
    // In a real app, we would navigate to the previous lesson
    // For this demo, we'll just go back to the module page
    navigate(`/modules/${moduleId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        username={userData.username} 
        points={userData.points}
        onLogout={handleLogout}
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
              hasNextLesson={true}
              hasPreviousLesson={false}
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
