
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Lock, CheckCircle, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string | null;
  isCompleted: boolean;
  isLocked: boolean;
}

interface Module {
  id: number;
  title: string;
  description: string;
  longDescription: string | null;
  imageUrl: string | null;
}

export default function ModuleDetail() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [module, setModule] = useState<Module | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchModuleData = async () => {
      if (!moduleId || !user) return;
      
      try {
        setLoading(true);
        
        // Fetch module details
        const { data: moduleData, error: moduleError } = await supabase
          .from('modules')
          .select('*')
          .eq('id', moduleId)
          .single();
        
        if (moduleError) {
          console.error('Error fetching module:', moduleError);
          toast({
            title: "Error",
            description: "Failed to load module details. Please try again.",
            variant: "destructive",
          });
          return;
        }
        
        setModule({
          id: moduleData.id,
          title: moduleData.title,
          description: moduleData.description,
          longDescription: moduleData.long_description,
          imageUrl: moduleData.image_url
        });
        
        // Fetch lessons for this module
        const { data: lessonsData, error: lessonsError } = await supabase
          .from('lessons')
          .select('*')
          .eq('module_id', moduleId)
          .order('order_index', { ascending: true });
        
        if (lessonsError) {
          console.error('Error fetching lessons:', lessonsError);
          toast({
            title: "Error",
            description: "Failed to load lessons. Please try again.",
            variant: "destructive",
          });
          return;
        }
        
        // Transform lesson data and check completion status
        const transformedLessons = lessonsData.map((lesson, index) => {
          const isCompleted = user.completedLessons.includes(lesson.id);
          
          // A lesson is locked if it's not the first lesson and the previous lesson is not completed
          let isLocked = false;
          if (index > 0) {
            const prevLessonId = lessonsData[index - 1].id;
            isLocked = !user.completedLessons.includes(prevLessonId);
          }
          
          return {
            id: lesson.id,
            title: lesson.title,
            description: lesson.description,
            duration: lesson.duration,
            isCompleted,
            isLocked
          };
        });
        
        setLessons(transformedLessons);
      } catch (err) {
        console.error('Failed to fetch module data:', err);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchModuleData();
  }, [moduleId, user, toast]);

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

  if (!module) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader username={user.username} points={user.points} />
        <div className="container py-8 text-center">
          <h1 className="text-3xl font-bold mb-6">Module Not Found</h1>
          <p className="mb-6">Sorry, we couldn't find the module you're looking for.</p>
          <Button onClick={() => navigate('/modules')}>
            Back to Modules
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        username={user.username} 
        points={user.points}
      />
      
      <div 
        className="w-full h-48 bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${module.imageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200'})` 
        }}
      >
        <div className="container h-full flex flex-col justify-end py-6">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-white mb-4 w-fit"
            onClick={() => navigate('/modules')}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Modules
          </Button>
          
          <h1 className="text-3xl font-bold text-white mb-2">{module.title}</h1>
          <p className="text-white/80">{module.description}</p>
        </div>
      </div>
      
      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          {module.longDescription && (
            <div className="mb-8 p-6 bg-muted rounded-lg">
              <h2 className="text-xl font-bold mb-3">About This Module</h2>
              <p>{module.longDescription}</p>
            </div>
          )}
          
          <h2 className="text-2xl font-bold mb-4">Lessons</h2>
          
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <Card 
                key={lesson.id}
                className={`border-l-4 ${
                  lesson.isCompleted 
                    ? 'border-l-green-500' 
                    : lesson.isLocked 
                    ? 'border-l-gray-300 opacity-70' 
                    : 'border-l-tech-primary'
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{lesson.title}</CardTitle>
                    {lesson.isCompleted && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" /> Completed
                      </Badge>
                    )}
                    {lesson.isLocked && (
                      <Badge variant="outline" className="flex items-center">
                        <Lock className="h-3 w-3 mr-1" /> Locked
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
                
                <CardFooter className="pt-2">
                  <div className="flex justify-between items-center w-full">
                    {lesson.duration && (
                      <span className="text-sm text-muted-foreground">Duration: {lesson.duration}</span>
                    )}
                    
                    <Button 
                      variant={lesson.isCompleted ? "outline" : "default"}
                      size="sm"
                      onClick={() => navigate(`/modules/${moduleId}/lessons/${lesson.id}`)}
                      disabled={lesson.isLocked}
                    >
                      {lesson.isCompleted ? 'Review' : 'Start'} Lesson
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
            
            {lessons.length === 0 && (
              <div className="p-8 text-center border rounded-lg bg-muted">
                <p className="text-muted-foreground">
                  No lessons available for this module yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
