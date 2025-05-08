import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ChevronRight, Clock, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import DataDragon from '@/components/mascot/DataDragon';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function ModuleDetail() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [module, setModule] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchModuleData = async () => {
      if (!moduleId) return;
      
      try {
        setLoading(true);
        
        // Fetch module details
        const { data: moduleData, error: moduleError } = await supabase
          .from('modules')
          .select('*')
          .eq('id', Number(moduleId))
          .single();
        
        if (moduleError) {
          console.error('Error fetching module:', moduleError);
          toast({
            title: "Error",
            description: "Failed to load module data. Please try again.",
            variant: "destructive",
          });
          return;
        }
        
        setModule(moduleData);
        
        // Fetch lessons for this module
        const { data: lessonsData, error: lessonsError } = await supabase
          .from('lessons')
          .select('*')
          .eq('module_id', Number(moduleId))
          .order('order_index', { ascending: true });
        
        if (lessonsError) {
          console.error('Error fetching lessons:', lessonsError);
          toast({
            title: "Error",
            description: "Failed to load lesson data. Please try again.",
            variant: "destructive",
          });
          return;
        }
        
        setLessons(lessonsData);
      } catch (error) {
        console.error('Error in module detail:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred while loading the module.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchModuleData();
  }, [moduleId, toast]);

  // If no user data is found, redirect to login
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  if (!user) {
    return null; // Or a loading spinner
  }

  const handleLessonClick = (lessonId: number) => {
    navigate(`/modules/${moduleId}/lessons/${lessonId}`);
  };
  
  const handleBackClick = () => {
    navigate('/modules');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tech-primary"></div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Module Not Found</h2>
            <p className="text-muted-foreground">The requested module could not be found. Please check the URL or try again later.</p>
          </CardContent>
        </Card>
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
        <Button variant="ghost" onClick={handleBackClick}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Modules
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{module.title}</h1>
            <p className="text-muted-foreground">{module.description}</p>
          </div>
          <DataDragon message="Dive into each lesson to master the module's concepts!" />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Lessons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {lessons.map((lesson) => (
              <Card key={lesson.id} className="border-tech-primary">
                <CardContent className="flex items-center justify-between p-4 cursor-pointer hover:bg-secondary transition-colors" onClick={() => handleLessonClick(lesson.id)}>
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <div>
                      <h3 className="text-lg font-semibold">{lesson.title}</h3>
                      <p className="text-sm text-muted-foreground">{lesson.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{lesson.duration || '15 min'}</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
