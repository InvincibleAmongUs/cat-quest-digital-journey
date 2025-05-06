
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import AppHeader from '@/components/layout/AppHeader';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle, Lock, Book } from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'available' | 'locked';
  hasInteractive: boolean;
}

export default function ModuleDetail() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [moduleData, setModuleData] = useState<any>(null);
  
  // Mock module data for the demo
  const mockModules = {
    "1": {
      id: 1,
      title: "System Superstars",
      description: "Master computer systems, components and basic operations",
      progress: 0,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      objectives: [
        "Understand the basic components of a computer system",
        "Identify different types of hardware and their functions",
        "Explain the relationship between hardware and software",
        "Describe the information processing cycle"
      ],
      lessons: [
        {
          id: 1,
          title: "What is Hardware?",
          description: "Learn the basic concepts of computer hardware and software.",
          status: 'available',
          hasInteractive: true
        },
        {
          id: 2,
          title: "Input Devices",
          description: "Explore the various devices used to input data into a computer.",
          status: 'locked',
          hasInteractive: true
        },
        {
          id: 3,
          title: "Ports and Connectors",
          description: "Discover the different ports and connectors on a computer.",
          status: 'locked',
          hasInteractive: true
        },
        {
          id: 4,
          title: "Storage Devices",
          description: "Learn about the various ways computers store data.",
          status: 'locked',
          hasInteractive: false
        },
        {
          id: 5,
          title: "Processing Components",
          description: "Understand how computers process information.",
          status: 'locked',
          hasInteractive: false
        }
      ]
    }
  };
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // In a real app, we would fetch module data from an API
    // For the demo, we're using mock data
    const moduleInfo = mockModules[moduleId as keyof typeof mockModules];
    
    if (!moduleInfo) {
      toast({
        title: "Module Not Found",
        description: "The module you're looking for doesn't exist.",
        variant: "destructive",
      });
      navigate('/modules');
      return;
    }
    
    // Update lesson status based on user's completed lessons
    const updatedLessons = moduleInfo.lessons.map((lesson: Lesson, index: number) => {
      if (user.completedLessons.includes(lesson.id)) {
        return { ...lesson, status: 'completed' as const };
      }
      
      // First lesson is always available
      if (index === 0) {
        return { ...lesson, status: 'available' as const };
      }
      
      // A lesson is available if the previous lesson is completed
      const previousLesson = moduleInfo.lessons[index - 1];
      if (previousLesson && user.completedLessons.includes(previousLesson.id)) {
        return { ...lesson, status: 'available' as const };
      }
      
      return lesson;
    });
    
    // Calculate module progress
    const completedCount = updatedLessons.filter(
      (lesson: Lesson) => lesson.status === 'completed'
    ).length;
    
    const progress = moduleInfo.lessons.length > 0
      ? Math.round((completedCount / moduleInfo.lessons.length) * 100)
      : 0;
    
    setModuleData({
      ...moduleInfo,
      lessons: updatedLessons,
      progress
    });
  }, [moduleId, navigate, toast, user]);
  
  if (!user || !moduleData) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        username={user.username} 
        points={user.points}
      />
      
      {/* Module Header */}
      <div 
        className="bg-cover bg-center h-48 relative"
        style={{ backgroundImage: `url(${moduleData.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
          <div className="container py-6">
            <h1 className="text-3xl font-bold text-white">{moduleData.title}</h1>
            <p className="text-white/80">{moduleData.description}</p>
          </div>
        </div>
      </div>
      
      <div className="container py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Module Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span className="font-medium">{moduleData.progress}%</span>
                  </div>
                  <Progress value={moduleData.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Learning Objectives</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {moduleData.objectives.map((objective: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-tech-primary mr-2">•</span>
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Badges Available</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-tech-blue">System Explorer</Badge>
                  <Badge className="bg-tech-blue">Hardware Basics</Badge>
                  <Badge className="bg-tech-blue">Component Master</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/achievements">View All Badges</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Lessons */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">Module Lessons</h2>
            <p className="text-muted-foreground">
              Complete these lessons in order to master the concepts of computer hardware and systems.
            </p>
            
            <div className="space-y-4">
              {moduleData.lessons.map((lesson: Lesson, index: number) => (
                <Card 
                  key={lesson.id}
                  className={`border-l-4 ${
                    lesson.status === 'completed' 
                      ? 'border-l-green-500' 
                      : lesson.status === 'available' 
                        ? 'border-l-tech-primary' 
                        : 'border-l-muted'
                  }`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-semibold">
                            {index + 1}
                          </div>
                          {lesson.title}
                          {lesson.hasInteractive && (
                            <Badge variant="outline" className="ml-2">Interactive</Badge>
                          )}
                        </CardTitle>
                      </div>
                      {lesson.status === 'completed' && (
                        <Badge className="bg-green-500">
                          <CheckCircle className="h-3 w-3 mr-1" /> Completed
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{lesson.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    {lesson.status === 'locked' ? (
                      <Button variant="outline" disabled className="w-full">
                        <Lock className="h-4 w-4 mr-2" /> Locked
                      </Button>
                    ) : (
                      <Button asChild className="w-full">
                        <Link to={`/modules/${moduleId}/lessons/${lesson.id}`}>
                          <Book className="h-4 w-4 mr-2" />
                          {lesson.status === 'completed' ? 'Review Lesson' : 'Start Lesson'}
                        </Link>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-between pt-4">
              <Button variant="outline" asChild>
                <Link to="/modules">Back to Modules</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
