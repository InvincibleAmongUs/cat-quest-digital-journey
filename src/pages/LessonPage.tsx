
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import LessonContent from '@/components/lessons/LessonContent';
import QuizSection from '@/components/quiz/QuizSection';
import DragDropGame from '@/components/lessons/DragDropGame';
import HotspotActivity from '@/components/lessons/HotspotActivity';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight, Book, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { awardPoints, checkForNewBadges, saveUserProgress, availableBadges } from '@/utils/gamification';
import { useAuth } from '@/contexts/AuthContext';

// Lesson data for Module 1 - Progressively more specific
const lessonData = {
  1: {
    id: 1,
    moduleId: 1,
    title: "What is Hardware?",
    hasQuiz: true,
    content: (
      <div className="space-y-6">
        <p>In this lesson, we'll learn about the fundamental concepts of hardware and software in computer systems.</p>
        
        <h2 className="text-2xl font-bold mt-6">Hardware vs Software</h2>
        <div className="my-6">
          <img 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" 
            alt="Illustration of computer hardware components"
            className="rounded-lg w-full"
          />
          <p className="text-sm text-center text-muted-foreground mt-2">Various computer hardware components</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <Card className="p-6">
            <h3 className="font-bold text-xl mb-2">Hardware</h3>
            <p className="text-base">Hardware refers to the physical components of a computer system. These are the parts that you can touch, see or feel.</p>
            <p className="mt-2">Examples include: the monitor, keyboard, mouse, system unit, printer, scanner, etc.</p>
          </Card>
          <Card className="p-6">
            <h3 className="font-bold text-xl mb-2">Software</h3>
            <p className="text-base">Software refers to instructions that tell the hardware what to do. Software is a set of programs that cannot be physically touched.</p>
            <p className="mt-2">Examples include: operating systems, applications, games, etc.</p>
          </Card>
        </div>
        
        <h2 className="text-2xl font-bold mt-6">Hardware Categories</h2>
        <p>Hardware can be grouped into four main categories:</p>
        
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>
            <strong>Input devices:</strong> Allow data or instructions to be entered into the computer (e.g., keyboard, mouse)
          </li>
          <li>
            <strong>Output devices:</strong> Display or present processed data (e.g., monitor, printer)
          </li>
          <li>
            <strong>Processing devices:</strong> Perform calculations and execute instructions (e.g., CPU)
          </li>
          <li>
            <strong>Storage devices:</strong> Store data and software (e.g., hard drive, SSD)
          </li>
        </ul>
      </div>
    ),
    quizQuestions: [
      {
        question: "Which term refers to the physical parts of a computer?",
        options: ["Software", "Hardware", "Firmware"],
        correctAnswer: 1
      },
      {
        question: "Which of the following is NOT an example of hardware?",
        options: ["Keyboard", "Word processor", "Monitor"],
        correctAnswer: 1
      },
      {
        question: "What is the main difference between hardware and software?",
        options: [
          "Hardware is cheaper than software", 
          "Hardware can be physically touched while software cannot", 
          "Software is more important than hardware"
        ],
        correctAnswer: 1
      }
    ]
  },
  2: {
    id: 2,
    moduleId: 1,
    title: "Input Devices",
    hasQuiz: false,
    hasDragDrop: true,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Input Devices</h2>
        <p>Input devices allow users to enter data or instructions into a computer system. These devices convert human-understandable information into a form that the computer can process.</p>
        
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <Card className="p-6">
            <div className="flex justify-center mb-4">
              <img 
                src="https://images.unsplash.com/photo-1563191911-e65f8655ebf9?auto=format&fit=crop&w=600&q=80" 
                alt="Computer keyboard"
                className="rounded-lg h-40 object-cover"
              />
            </div>
            <h3 className="font-bold text-xl mb-2">Keyboard</h3>
            <p>The keyboard is one of the main input devices. It allows the user to input letters, numbers, and symbols into a computer. Most keyboards have a standard QWERTY layout.</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex justify-center mb-4">
              <img 
                src="https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80" 
                alt="Computer mouse"
                className="rounded-lg h-40 object-cover"
              />
            </div>
            <h3 className="font-bold text-xl mb-2">Mouse</h3>
            <p>The mouse is a pointing device that allows users to interact with elements on the screen. It typically has buttons and a scroll wheel for additional functionality.</p>
          </Card>
        </div>
        
        <h2 className="text-2xl font-bold mt-6">Output Devices</h2>
        <p>Output devices present processed data from a computer in a human-understandable form. These devices convert the computer's processing results into text, images, sounds, or other formats.</p>
        
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <Card className="p-6">
            <div className="flex justify-center mb-4">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80" 
                alt="Computer monitor"
                className="rounded-lg h-40 object-cover"
              />
            </div>
            <h3 className="font-bold text-xl mb-2">Monitor</h3>
            <p>The monitor displays visual output from a computer. Modern monitors use LCD, LED or OLED technology to create the display.</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex justify-center mb-4">
              <img 
                src="https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80" 
                alt="Printer"
                className="rounded-lg h-40 object-cover"
              />
            </div>
            <h3 className="font-bold text-xl mb-2">Printer</h3>
            <p>A printer creates physical copies of digital documents or images. Common types include inkjet, laser, and 3D printers.</p>
          </Card>
        </div>
        
        <h3 className="text-xl font-bold mt-8">Activity: Categorizing Devices</h3>
        <p>In the activity below, you'll practice identifying which devices are input devices and which are output devices.</p>
      </div>
    )
  },
  3: {
    id: 3,
    moduleId: 1,
    title: "Ports and Connectors",
    hasQuiz: false,
    hasHotspots: true,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Ports and Connectors</h2>
        <p>Computers use various ports and connectors to communicate with peripheral devices. These physical interfaces allow data transfer and power supply between the computer and external devices.</p>
        
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <Card className="p-6">
            <div className="flex justify-center mb-4">
              <img 
                src="https://images.unsplash.com/photo-1646404327711-80ee44150fa9?auto=format&fit=crop&w=600&q=80" 
                alt="USB ports on a computer"
                className="rounded-lg h-40 object-cover"
              />
            </div>
            <h3 className="font-bold text-xl mb-2">USB (Universal Serial Bus)</h3>
            <p>USB ports connect a wide variety of devices to computers, including keyboards, mice, printers, flash drives, and many others. Modern computers typically have USB Type-A, USB Type-C, or both.</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex justify-center mb-4">
              <img 
                src="https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=600&q=80" 
                alt="HDMI port and cable"
                className="rounded-lg h-40 object-cover"
              />
            </div>
            <h3 className="font-bold text-xl mb-2">HDMI (High-Definition Multimedia Interface)</h3>
            <p>HDMI ports are used to connect computers to displays like monitors and TVs. They carry both high-quality audio and video signals in a single cable.</p>
          </Card>
        </div>
        
        <h3 className="text-xl font-bold mt-8">Activity: Exploring Ports and Connectors</h3>
        <p>In the interactive activity below, you'll learn more about common ports and connectors found on computers.</p>
      </div>
    )
  }
};

export default function LessonPage() {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const [showQuiz, setShowQuiz] = useState(false);
  const [showDragDrop, setShowDragDrop] = useState(false);
  const [showHotspots, setShowHotspots] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();
  const { user, updateUserData } = useAuth();

  // If no user data is found, redirect to login
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  // Check if this lesson is already completed
  useEffect(() => {
    if (user && lessonId && user.completedLessons.includes(Number(lessonId))) {
      setIsCompleted(true);
    }
  }, [user, lessonId]);
  
  if (!user) {
    return null;
  }

  // Get the lesson data based on lessonId
  const lesson = lessonData[Number(lessonId) as keyof typeof lessonData];
  
  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6 max-w-md">
          <h2 className="text-2xl font-bold mb-4">Lesson Not Found</h2>
          <p className="mb-4">The lesson you're looking for doesn't exist or is still being developed.</p>
          <Button asChild>
            <Link to={`/modules/${moduleId}`}>Return to Module</Link>
          </Button>
        </Card>
      </div>
    );
  }

  const handleComplete = () => {
    if (lesson.hasQuiz && !showQuiz) {
      setShowQuiz(true);
      return;
    }
    
    if (lesson.hasDragDrop && !showDragDrop) {
      setShowDragDrop(true);
      return;
    }
    
    if (lesson.hasHotspots && !showHotspots) {
      setShowHotspots(true);
      return;
    }
    
    // Complete the lesson if no interactive elements or all are completed
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
    
    // Complete the lesson
    completeLesson(pointsAwarded, quizScores);
  };
  
  const handleDragDropComplete = () => {
    // Award points for completing the drag-drop activity
    const pointsAwarded = 15;
    completeLesson(pointsAwarded);
  };
  
  const handleHotspotComplete = () => {
    // Award points for completing the hotspot activity
    const pointsAwarded = 15;
    completeLesson(pointsAwarded);
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
    let newBadges: string[] = [];
    
    // Add "Hardware Basics Badge" if lesson 3 is completed
    if (lesson.id === 3 && !user.badges.includes("hardware_basics")) {
      newBadges = ["hardware_basics"];
    } else {
      // Check for other badges
      newBadges = checkForNewBadges(updatedUserData);
    }
    
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
    const nextLessonId = lesson.id + 1;
    if (lessonData[nextLessonId as keyof typeof lessonData]) {
      navigate(`/modules/${moduleId}/lessons/${nextLessonId}`);
    } else {
      navigate(`/modules/${moduleId}`);
    }
  };

  const handlePreviousLesson = () => {
    const prevLessonId = lesson.id - 1;
    if (lessonData[prevLessonId as keyof typeof lessonData]) {
      navigate(`/modules/${moduleId}/lessons/${prevLessonId}`);
    } else {
      navigate(`/modules/${moduleId}`);
    }
  };

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
          ) : showDragDrop ? (
            <>
              <h1 className="text-3xl font-bold mb-4">{lesson.title} - Activity</h1>
              <DragDropGame onComplete={handleDragDropComplete} />
            </>
          ) : showHotspots ? (
            <>
              <h1 className="text-3xl font-bold mb-4">{lesson.title} - Interactive</h1>
              <HotspotActivity onComplete={handleHotspotComplete} />
            </>
          ) : (
            <LessonContent 
              lesson={lesson}
              onComplete={handleComplete}
              onNextLesson={handleNextLesson}
              onPreviousLesson={handlePreviousLesson}
              hasNextLesson={Boolean(lessonData[(lesson.id + 1) as keyof typeof lessonData])}
              hasPreviousLesson={Boolean(lessonData[(lesson.id - 1) as keyof typeof lessonData])}
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
