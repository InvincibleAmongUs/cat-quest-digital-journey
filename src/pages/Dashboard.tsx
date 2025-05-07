
import React, { useState, useEffect } from 'react';
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
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CurrentModuleData {
  id: number;
  title: string;
  description: string;
  progress: number;
  nextLessonId: number;
  nextLessonTitle: string;
  image: string;
}

interface ModuleData {
  id: number;
  title: string;
  description: string;
  image: string;
  progress: number;
  isLocked: boolean;
  badgeCount: number;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [currentModule, setCurrentModule] = useState<CurrentModuleData | null>(null);
  const [recentModules, setRecentModules] = useState<ModuleData[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch all modules
        const { data: modulesData, error: modulesError } = await supabase
          .from('modules')
          .select('*')
          .order('order_index', { ascending: true });
        
        if (modulesError) {
          console.error('Error fetching modules:', modulesError);
          toast({
            title: "Error",
            description: "Failed to load modules data. Please try again.",
            variant: "destructive",
          });
          return;
        }
        
        // Find the first uncompleted module as the "current" module
        let currentModuleData = modulesData[0]; // Default to first module
        
        for (const module of modulesData) {
          const isCompleted = user.completedModules.includes(module.id);
          if (!isCompleted) {
            currentModuleData = module;
            break;
          }
        }
        
        // Fetch lessons for the current module to determine progress and next lesson
        const { data: lessonsData, error: lessonsError } = await supabase
          .from('lessons')
          .select('*')
          .eq('module_id', currentModuleData.id)
          .order('order_index', { ascending: true });
        
        if (lessonsError) {
          console.error('Error fetching lessons:', lessonsError);
        }
        
        // Calculate progress for the current module
        let completedLessons = 0;
        let nextLessonId = null;
        let nextLessonTitle = "";
        
        if (lessonsData && lessonsData.length > 0) {
          for (const lesson of lessonsData) {
            if (user.completedLessons.includes(lesson.id)) {
              completedLessons++;
            } else if (nextLessonId === null) {
              nextLessonId = lesson.id;
              nextLessonTitle = lesson.title;
            }
          }
          
          // If all lessons are completed, just point to the first one
          if (nextLessonId === null && lessonsData.length > 0) {
            nextLessonId = lessonsData[0].id;
            nextLessonTitle = lessonsData[0].title;
          }
        }
        
        const progress = lessonsData && lessonsData.length > 0
          ? Math.round((completedLessons / lessonsData.length) * 100)
          : 0;
        
        setCurrentModule({
          id: currentModuleData.id,
          title: currentModuleData.title,
          description: currentModuleData.description,
          progress,
          nextLessonId: nextLessonId || 1,
          nextLessonTitle: nextLessonTitle || "Start Module",
          image: currentModuleData.image_url || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
        });
        
        // Transform all modules for the recent modules list
        const transformedModules = modulesData.slice(0, 3).map(module => {
          // Count badges related to this module (simplified approach)
          const badgeCount = module.id === 1 ? 3 : module.id === 2 ? 4 : 3;
          
          return {
            id: module.id,
            title: module.title,
            description: module.description,
            image: module.image_url || `https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80`,
            progress: 0, // This would need a more complex calculation in a production app
            isLocked: module.is_locked,
            badgeCount
          };
        });
        
        setRecentModules(transformedModules);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [user, toast]);

  // If no user data is found, redirect to login
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  if (!user) {
    return null;
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tech-primary"></div>
      </div>
    );
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
            totalProgress={25} 
            earnedBadges={user.badges.length} 
            totalPoints={user.points} 
          />
          {currentModule && <CurrentModule module={currentModule} />}
        </div>
        
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Learning Modules</h2>
            <Button variant="outline" onClick={() => navigate('/modules')}>
              View All Modules
            </Button>
          </div>
          {recentModules.length > 0 && <ModuleList modules={recentModules} />}
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
                    <BadgeCheck className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold">{badge.name}</h3>
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
