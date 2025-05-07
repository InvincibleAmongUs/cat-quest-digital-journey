
import React from 'react';
import AppHeader from '@/components/layout/AppHeader';
import ProgressOverview from '@/components/dashboard/ProgressOverview';
import CurrentModule from '@/components/dashboard/CurrentModule';
import ModuleList from '@/components/dashboard/ModuleList';
import DataDragon from '@/components/mascot/DataDragon';
import { useAuth } from '@/contexts/AuthContext';
import { availableBadges } from '@/utils/gamification';

const Dashboard = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  // Filter to get only the badges the user has earned
  const earnedBadges = user.badges
    .map(badgeId => availableBadges.find(badge => badge.id === badgeId))
    .filter(badge => badge !== undefined);

  // Mock data for current module
  const currentModule = {
    id: 1,
    title: "System Superstars",
    description: "Learn about hardware, software and the fundamental components of computer systems",
    progress: 25,
    nextLessonId: 2,
    nextLessonTitle: "Input Devices",
    image: "/placeholder.svg"
  };

  // Mock data for module list
  const modules = [
    {
      id: 1,
      title: "System Superstars",
      description: "Hardware & Software basics",
      image: "/placeholder.svg",
      progress: 25,
      isLocked: false,
      badgeCount: 3
    },
    {
      id: 2,
      title: "Digital Literacy",
      description: "Understanding digital concepts",
      image: "/placeholder.svg",
      progress: 0,
      isLocked: true,
      badgeCount: 2
    },
    {
      id: 3,
      title: "File Management",
      description: "Organize your digital files",
      image: "/placeholder.svg",
      progress: 0,
      isLocked: true,
      badgeCount: 2
    }
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <AppHeader username={user.username} points={user.points} />
      
      <main className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Welcome, {user.username}!</h1>
            
            <ProgressOverview 
              totalProgress={25} 
              earnedBadges={user.badges.length} 
              totalPoints={user.points} 
            />
            
            <CurrentModule module={currentModule} />
            
            <ModuleList modules={modules} />
          </div>
          
          <div className="lg:col-span-4 space-y-6">
            <div className="border rounded-xl p-6 bg-gradient-to-b from-tech-gray/20 to-background">
              <h2 className="text-xl font-medium mb-4">Achieved Badges</h2>
              
              {earnedBadges.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {earnedBadges.map((badge, index) => (
                    badge && (
                      <div key={index} className="flex flex-col items-center text-center p-2 bg-card rounded-lg border shadow-sm">
                        <div className="w-12 h-12 rounded-full bg-tech-blue/20 flex items-center justify-center text-tech-blue mb-1">
                          🏆
                        </div>
                        <span className="text-sm font-medium">{badge.name}</span>
                      </div>
                    )
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground">Complete lessons to earn badges!</p>
                </div>
              )}
            </div>
            
            <div className="border rounded-xl p-4 bg-gradient-to-b from-tech-primary/10 to-background">
              <div className="flex items-center">
                <DataDragon message="Did you know? The first computer mouse was made of wood!" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
