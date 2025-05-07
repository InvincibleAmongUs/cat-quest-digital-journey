
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Computer, Layers, Globe, Database, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AppHeader from '@/components/layout/AppHeader';

export default function TermSelectionPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const terms = [
    {
      id: 1,
      title: "TERM 1",
      icon: Computer,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
      description: "Foundational Concepts & Hardware Essentials",
      summary: "Introduction to computers, computer management, hardware components, software essentials, and social implications.",
      locked: false
    },
    {
      id: 2,
      title: "TERM 2",
      icon: Layers,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
      description: "Software & Networks",
      summary: "Advanced software concepts, networking principles, operating systems, and digital solutions.",
      locked: true
    },
    {
      id: 3,
      title: "TERM 3",
      icon: Globe,
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80",
      description: "Internet & Communications",
      summary: "Internet technologies, digital communication tools, web concepts, and online safety.",
      locked: true
    },
    {
      id: 4,
      title: "TERM 4",
      icon: Database,
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
      description: "Information Management & Consolidation",
      summary: "Information processing, data analysis, document creation, and year-end review.",
      locked: true
    }
  ];

  const handleTermSelect = (termId: number) => {
    if (termId === 1) {
      navigate('/modules/1');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        username={user.username} 
        points={user.points}
      />
      
      <main className="container py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Welcome to CATalyst Learn</h1>
          <p className="text-muted-foreground mb-8">Select a term to begin your learning journey</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {terms.map((term) => (
              <TooltipProvider key={term.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card 
                      className={`overflow-hidden cursor-pointer transition-all border-2 hover:shadow-lg ${
                        term.locked 
                          ? 'opacity-60 grayscale border-gray-300' 
                          : 'border-tech-primary hover:border-tech-primary/80'
                      }`}
                      onClick={() => !term.locked && handleTermSelect(term.id)}
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img 
                          src={term.image} 
                          alt={`Term ${term.id}: ${term.description}`}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 flex items-end p-4">
                          <h2 className="text-2xl font-bold text-white flex items-center">
                            {term.title}
                            {term.locked && <Lock className="ml-2 h-4 w-4" />}
                          </h2>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="font-medium">{term.description}</p>
                          </div>
                          <term.icon className="h-6 w-6 text-tech-primary" />
                        </div>
                        
                        {term.locked ? (
                          <Badge variant="outline" className="bg-gray-100">
                            <Lock className="mr-1 h-3 w-3" /> Locked
                          </Badge>
                        ) : (
                          <Button className="w-full">
                            Start Learning
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs p-4">
                    <p>{term.summary}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
