
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import ModuleList from '@/components/dashboard/ModuleList';
import DataDragon from '@/components/mascot/DataDragon';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Module {
  id: number;
  title: string;
  description: string;
  image: string;
  progress: number;
  isLocked: boolean;
  badgeCount: number;
}

export default function ModulesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchModules = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch modules from Supabase
        const { data: modulesData, error } = await supabase
          .from('modules')
          .select('*')
          .order('order_index', { ascending: true });
        
        if (error) {
          console.error('Error fetching modules:', error);
          toast({
            title: "Error",
            description: "Failed to load modules. Please try again.",
            variant: "destructive",
          });
          return;
        }
        
        // Transform the data to match our component's expected format
        const transformedModules = modulesData.map(module => {
          // Calculate progress for completed modules
          const isModuleCompleted = user.completedModules.includes(module.id);
          
          // Count badges related to this module (simplified approach)
          // In a more complex implementation, we would fetch badge counts from the database
          const badgeCount = module.id === 1 ? 3 : module.id === 2 ? 4 : 3;
          
          return {
            id: module.id,
            title: module.title,
            description: module.description,
            image: module.image_url || `https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80`,
            progress: isModuleCompleted ? 100 : 0, // Simplified progress calculation
            isLocked: module.is_locked,
            badgeCount
          };
        });
        
        setModules(transformedModules);
      } catch (err) {
        console.error('Failed to fetch modules:', err);
        toast({
          title: "Error",
          description: "An unexpected error occurred while loading modules.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchModules();
  }, [user, toast]);

  // If no user data is found, redirect to login
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  if (!user) {
    return null; // Or a loading spinner
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
          <div>
            <h1 className="text-3xl font-bold">Learning Modules</h1>
            <p className="text-muted-foreground">Complete modules to unlock new content and earn badges</p>
          </div>
          <DataDragon message="Each module covers key areas of the CAT curriculum. Complete them in order to advance!" />
        </div>
        
        <ModuleList modules={modules} />
      </main>
    </div>
  );
}
