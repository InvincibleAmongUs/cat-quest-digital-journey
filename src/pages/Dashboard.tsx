
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AppHeader from '@/components/layout/AppHeader';
import ProgressOverview from '@/components/dashboard/ProgressOverview';
import CurrentModule from '@/components/dashboard/CurrentModule';
import ModuleList from '@/components/dashboard/ModuleList';
import DataDragon from '@/components/mascot/DataDragon';
import { BadgeCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { availableBadges } from '@/utils/gamification';

// Mock data
const currentModule = {
  id: 1,
  title: "System Superstars",
  description: "Master computer systems, components and basic operations",
  progress: 35,
  nextLessonId: 1,
  nextLessonTitle: "What is Hardware?",
  image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
};

const recentModules = [
  {
    id: 1,
    title: "System Superstars",
    description: "Computer systems & components",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    progress: 35,
    isLocked: false,
    badgeCount: 3
  },
  {
    id: 2,
    title: "Digital Citizenship HQ",
    description: "Ethics, safety & responsible use",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    progress: 0,
    isLocked: false,
    badgeCount: 4
  },
  {
    id: 3,
    title: "Word Wizardry Academy",
    description: "Master word processing skills",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
    progress: 0,
    isLocked: true,
    badgeCount: 3
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Calculate user progress based on completed lessons
  const calculateProgress = () => {
    // For demo purposes, we'll base this on lessons 1-3 for Module 1
    if (!user) return 0;
    
    const totalLessons = 5; // Total lessons in Module 1
    const completedCount = user.completedLessons.filter(id => id >= 1 && id <= 5).length;
    return Math.round((completedCount / totalLessons) * 100);
  };
  
  // If no user data is found, redirect to login
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  if (!user) {
    return null; // Or a loading spinner
  }
  
  // Update progress for the current module
  const updatedCurrentModule = {
    ...currentModule,
    progress: calculateProgress()
  };
  
  // Update progress for the modules list
  const updatedModules = recentModules.map(module => {
    if (module.id === 1) {
      return {
        ...module,
        progress: calculateProgress()
      };
    }
    return module;
  });
  
  // Determine next lesson based on completed lessons
  let nextLessonId = 1;
  let nextLessonTitle = "What is Hardware?";
  
  if (user.completedLessons.includes(1) && user.completedLessons.includes(2) && user.completedLessons.includes(3)) {
    nextLessonId = 4;
    nextLessonTitle = "Storage Devices";
  } else if (user.completedLessons.includes(1) && user.completedLessons.includes(2)) {
    nextLessonId = 3;
    nextLessonTitle = "Ports and Connectors";
  } else if (user.completedLessons.includes(1)) {
    nextLessonId = 2;
    nextLessonTitle = "Input Devices";
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        username={user.username} 
        points={user.points}
      />
      
      <main className="container py-6 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Welcome back, {user.username}!</h1>
          <DataDragon message="Ready to continue your tech adventure today?" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <ProgressOverview 
            totalProgress={calculateProgress()} 
            earnedBadges={user.badges.length} 
            totalPoints={user.points} 
          />
          <CurrentModule 
            module={{
              ...updatedCurrentModule,
              nextLessonId,
              nextLessonTitle
            }} 
          />
        </div>
        
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Learning Modules</h2>
            <Button variant="outline" onClick={() => navigate('/modules')}>
              View All Modules
            </Button>
          </div>
          <ModuleList modules={updatedModules} />
        </div>
        
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Achievements</h2>
            <Button variant="outline" onClick={() => navigate('/achievements')}>
              View All Achievements
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {user.badges.slice(0, 4).map((badgeId, index) => {
              const badge = availableBadges.find(b => b.id === badgeId);
              if (!badge) return null;
              
              return (
                <div 
                  key={index}
                  className="p-6 border rounded-lg flex flex-col items-center text-center space-y-3 bg-gradient-to-b from-tech-primary/10 to-tech-primary/5 border-tech-primary"
                >
                  <div className="badge-icon">
                    <BadgeCheck className="h-8 w-8 text-tech-primary" />
                  </div>
                  <h3 className="font-bold">{badge.name}</h3>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                </div>
              );
            })}
            
            {user.badges.length === 0 && (
              <div className="col-span-4 p-6 border rounded-lg text-center">
                <p className="text-muted-foreground">You haven't earned any badges yet. Complete lessons and quizzes to earn your first badge!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
