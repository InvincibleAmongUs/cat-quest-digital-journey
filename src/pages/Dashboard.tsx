
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AppHeader from '@/components/layout/AppHeader';
import ProgressOverview from '@/components/dashboard/ProgressOverview';
import CurrentModule from '@/components/dashboard/CurrentModule';
import ModuleList from '@/components/dashboard/ModuleList';
import DataDragon from '@/components/mascot/DataDragon';
import { BadgeCheck } from 'lucide-react';

// Mock data
const currentModule = {
  id: 1,
  title: "System Superstars",
  description: "Master computer systems, components and basic operations",
  progress: 35,
  nextLessonId: 2,
  nextLessonTitle: "Understanding Hardware Components",
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
  
  // Access user data from localStorage
  const userDataString = localStorage.getItem('user');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  
  // If no user data is found, redirect to login
  React.useEffect(() => {
    if (!userData) {
      navigate('/login');
    }
  }, [userData, navigate]);
  
  if (!userData) {
    return null; // Or a loading spinner
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        username={userData.username} 
        points={userData.points}
        onLogout={handleLogout}
      />
      
      <main className="container py-6 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Welcome back, {userData.username}!</h1>
          <DataDragon message="Ready to continue your tech adventure today?" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <ProgressOverview 
            totalProgress={25} 
            earnedBadges={2} 
            totalPoints={userData.points} 
          />
          <CurrentModule module={currentModule} />
        </div>
        
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Learning Modules</h2>
            <Button variant="outline" onClick={() => navigate('/modules')}>
              View All Modules
            </Button>
          </div>
          <ModuleList modules={recentModules} />
        </div>
        
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Achievements</h2>
            <Button variant="outline" onClick={() => navigate('/achievements')}>
              View All Achievements
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 border rounded-lg flex flex-col items-center text-center space-y-3 bg-gradient-to-b from-tech-primary/10 to-tech-primary/5 border-tech-primary">
              <div className="badge-icon">
                <BadgeCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold">First Login</h3>
            </div>
            <div className="p-6 border rounded-lg flex flex-col items-center text-center space-y-3 bg-gradient-to-b from-tech-primary/10 to-tech-primary/5 border-tech-primary">
              <div className="badge-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                </svg>
              </div>
              <h3 className="font-bold">Journey Begun</h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
