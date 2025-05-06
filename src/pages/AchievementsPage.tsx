
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import BadgeCard from '@/components/achievements/BadgeCard';
import DataDragon from '@/components/mascot/DataDragon';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for badges and achievements
const badges = [
  {
    id: 1,
    name: "First Login",
    description: "Successfully logged into CATalyst Learn",
    icon: "🚀",
    earned: true,
    category: "general"
  },
  {
    id: 2,
    name: "Journey Begun",
    description: "Started your first module",
    icon: "🏆",
    earned: true,
    category: "general"
  },
  {
    id: 3,
    name: "System Explorer",
    description: "Complete the Introduction to Computers lesson",
    icon: "💻",
    earned: true,
    category: "module1"
  },
  {
    id: 4,
    name: "Hardware Hero",
    description: "Identify all hardware components correctly",
    icon: "🔧",
    earned: false,
    progress: 2,
    maxProgress: 5,
    category: "module1"
  },
  {
    id: 5,
    name: "File Master",
    description: "Complete all file management exercises perfectly",
    icon: "📁",
    earned: false,
    category: "module1"
  },
  {
    id: 6,
    name: "Digital Citizen",
    description: "Complete the digital citizenship module",
    icon: "🌐",
    earned: false,
    category: "module2"
  },
  {
    id: 7,
    name: "Safety First",
    description: "Ace the online safety quiz",
    icon: "🔒",
    earned: false,
    category: "module2"
  },
  {
    id: 8,
    name: "Perfect Attendance",
    description: "Log in 5 days in a row",
    icon: "📅",
    earned: false,
    progress: 2,
    maxProgress: 5,
    category: "general"
  }
];

export default function AchievementsPage() {
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
    return null;
  }

  const earnedBadges = badges.filter(badge => badge.earned);
  const progress = Math.round((earnedBadges.length / badges.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        username={userData.username} 
        points={userData.points}
        onLogout={handleLogout}
      />
      
      <main className="container py-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Your Achievements</h1>
            <p className="text-muted-foreground">Track your progress and earn badges as you learn</p>
          </div>
          <DataDragon message="Collect badges by completing lessons and challenges!" />
        </div>
        
        <div className="bg-gradient-to-r from-tech-primary/20 to-tech-blue/20 p-6 rounded-lg mb-6">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold">Badge Collection</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>{earnedBadges.length} of {badges.length} badges earned</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="bg-white/90 p-4 rounded-full shadow-lg">
                <div className="text-4xl font-bold text-center text-tech-primary">
                  {earnedBadges.length}
                </div>
                <div className="text-xs text-center text-muted-foreground mt-1">Badges</div>
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Badges</TabsTrigger>
            <TabsTrigger value="earned">Earned</TabsTrigger>
            <TabsTrigger value="module1">System Superstars</TabsTrigger>
            <TabsTrigger value="module2">Digital Citizenship</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {badges.map((badge) => (
                <BadgeCard
                  key={badge.id}
                  id={badge.id}
                  name={badge.name}
                  description={badge.description}
                  icon={<span className="text-2xl">{badge.icon}</span>}
                  earned={badge.earned}
                  progress={badge.progress}
                  maxProgress={badge.maxProgress}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="earned">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {badges.filter(badge => badge.earned).map((badge) => (
                <BadgeCard
                  key={badge.id}
                  id={badge.id}
                  name={badge.name}
                  description={badge.description}
                  icon={<span className="text-2xl">{badge.icon}</span>}
                  earned={badge.earned}
                  progress={badge.progress}
                  maxProgress={badge.maxProgress}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="module1">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {badges.filter(badge => badge.category === "module1").map((badge) => (
                <BadgeCard
                  key={badge.id}
                  id={badge.id}
                  name={badge.name}
                  description={badge.description}
                  icon={<span className="text-2xl">{badge.icon}</span>}
                  earned={badge.earned}
                  progress={badge.progress}
                  maxProgress={badge.maxProgress}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="module2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {badges.filter(badge => badge.category === "module2").map((badge) => (
                <BadgeCard
                  key={badge.id}
                  id={badge.id}
                  name={badge.name}
                  description={badge.description}
                  icon={<span className="text-2xl">{badge.icon}</span>}
                  earned={badge.earned}
                  progress={badge.progress}
                  maxProgress={badge.maxProgress}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="general">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {badges.filter(badge => badge.category === "general").map((badge) => (
                <BadgeCard
                  key={badge.id}
                  id={badge.id}
                  name={badge.name}
                  description={badge.description}
                  icon={<span className="text-2xl">{badge.icon}</span>}
                  earned={badge.earned}
                  progress={badge.progress}
                  maxProgress={badge.maxProgress}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
