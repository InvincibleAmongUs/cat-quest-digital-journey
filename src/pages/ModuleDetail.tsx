import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BadgeCheck, ArrowRight, ChevronRight, Book, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data for module details
const moduleData = {
  id: 1,
  title: "System Superstars",
  description: "Master computer systems, components and basic operations",
  longDescription: "In this module, you'll learn about the essential components of computer systems, how they work together, and basic operations you need to master. From understanding hardware components to managing files and software, this module covers the fundamentals of computer technology.",
  image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  progress: 35,
  lessons: [
    {
      id: 1,
      title: "Introduction to Computers",
      description: "Learn about the information processing cycle and types of computers",
      completed: true,
      duration: "15 mins"
    },
    {
      id: 2,
      title: "Understanding Hardware Components",
      description: "Explore the physical parts that make up a computer system",
      completed: false,
      duration: "20 mins"
    },
    {
      id: 3,
      title: "Computer Management Basics",
      description: "Master file operations and desktop organization",
      completed: false,
      duration: "15 mins"
    },
    {
      id: 4,
      title: "Software Essentials",
      description: "Learn about system and application software",
      completed: false,
      duration: "20 mins"
    },
    {
      id: 5,
      title: "Challenge Zone: Set Up Your Digital Workspace",
      description: "Apply your knowledge in a practical challenge",
      completed: false,
      duration: "30 mins",
      isChallenge: true
    }
  ],
  badges: [
    {
      id: 1,
      name: "System Explorer",
      description: "Complete the Introduction to Computers lesson",
      earned: true
    },
    {
      id: 2,
      name: "Hardware Hero",
      description: "Identify all hardware components correctly",
      earned: false
    },
    {
      id: 3,
      name: "File Master",
      description: "Complete all file management exercises perfectly",
      earned: false
    }
  ]
};

export default function ModuleDetail() {
  const { moduleId } = useParams();
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

  // In a real app, we would fetch the module data based on moduleId
  const module = moduleData;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        username={userData.username} 
        points={userData.points}
        onLogout={handleLogout}
      />
      
      <div className="relative">
        <div className="h-64 md:h-80 overflow-hidden">
          <img 
            src={module.image} 
            alt={module.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{module.title}</h1>
            <p className="md:text-lg opacity-90">{module.description}</p>
          </div>
        </div>
      </div>
      
      <main className="container py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="prose max-w-none">
              <h2>Module Overview</h2>
              <p>{module.longDescription}</p>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Lessons</h2>
                <div className="flex items-center text-sm">
                  <span className="font-medium">{module.progress}% Complete</span>
                </div>
              </div>
              
              <Progress value={module.progress} className="mb-6 h-2" />
              
              <div className="space-y-4">
                {module.lessons.map((lesson, index) => (
                  <Card key={lesson.id} className={`border-l-4 ${lesson.completed ? 'border-l-tech-primary' : lesson.isChallenge ? 'border-l-tech-blue' : 'border-l-border'}`}>
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${lesson.completed ? 'bg-tech-primary text-white' : lesson.isChallenge ? 'bg-tech-blue text-white' : 'bg-secondary text-muted-foreground'}`}>
                          {lesson.completed ? (
                            <BadgeCheck className="h-5 w-5" />
                          ) : lesson.isChallenge ? (
                            <Award className="h-5 w-5" />
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{lesson.title}</h3>
                          <p className="text-sm text-muted-foreground">{lesson.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground hidden sm:inline">
                          {lesson.duration}
                        </span>
                        <Button 
                          size="sm" 
                          variant={lesson.completed ? "outline" : "default"}
                          onClick={() => navigate(`/modules/${module.id}/lessons/${lesson.id}`)}
                        >
                          {lesson.completed ? "Review" : "Start"}
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <Card>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">Module Progress</h3>
                  <Progress value={module.progress} className="h-2 mb-2" />
                  <div className="flex justify-between text-sm">
                    <span>{module.progress}% Complete</span>
                    <span>
                      {module.lessons.filter(l => l.completed).length}/{module.lessons.length} Lessons
                    </span>
                  </div>
                </div>
                
                <div>
                  <Button className="w-full" onClick={() => {
                    const nextLesson = module.lessons.find(l => !l.completed);
                    if (nextLesson) {
                      navigate(`/modules/${module.id}/lessons/${nextLesson.id}`);
                    }
                  }}>
                    {module.lessons.some(l => l.completed) 
                      ? "Continue Learning" 
                      : "Start Learning"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="h-5 w-5 text-tech-primary" />
                  <h3 className="font-bold text-lg">Available Badges</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
                  {module.badges.map(badge => (
                    <div 
                      key={badge.id}
                      className={`p-4 border rounded-lg flex flex-col items-center text-center space-y-2 ${badge.earned ? 'border-tech-primary bg-tech-primary/5' : 'border-gray-200'}`}
                    >
                      <div className={`p-2 rounded-full ${badge.earned ? 'bg-tech-primary text-white' : 'bg-gray-200 text-gray-400'}`}>
                        <BadgeCheck className="h-5 w-5" />
                      </div>
                      <h4 className="font-medium">{badge.name}</h4>
                      <p className="text-xs text-muted-foreground">{badge.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
