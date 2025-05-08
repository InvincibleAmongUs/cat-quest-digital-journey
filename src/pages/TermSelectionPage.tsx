
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Computer, Layers, Globe, Database, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AppHeader from '@/components/layout/AppHeader';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Term = Database['public']['Tables']['terms']['Row'];

export default function TermSelectionPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [terms, setTerms] = useState<Term[]>([]);
  const [termsLoading, setTermsLoading] = useState(true);

  // Fetch terms from Supabase
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const { data, error } = await supabase
          .from('terms')
          .select('*')
          .order('order_index', { ascending: true });
        
        if (error) {
          console.error('Error fetching terms:', error);
          return;
        }
        
        if (data && data.length > 0) {
          setTerms(data);
        } else {
          // Fallback to hardcoded terms if no data in database yet
          setTerms([
            {
              id: 1,
              title: "TERM 1",
              description: "Foundational Concepts & Hardware Essentials",
              summary: "Introduction to computers, computer management, hardware components, software essentials, and social implications.",
              image_url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
              icon: "Computer",
              order_index: 1
            },
            {
              id: 2,
              title: "TERM 2",
              description: "Software & Networks",
              summary: "Advanced software concepts, networking principles, operating systems, and digital solutions.",
              image_url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
              icon: "Layers",
              order_index: 2
            },
            {
              id: 3,
              title: "TERM 3",
              description: "Internet & Communications",
              summary: "Internet technologies, digital communication tools, web concepts, and online safety.",
              image_url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80",
              icon: "Globe",
              order_index: 3
            },
            {
              id: 4,
              title: "TERM 4",
              description: "Information Management & Consolidation",
              summary: "Information processing, data analysis, document creation, and year-end review.",
              image_url: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
              icon: "Database",
              order_index: 4
            }
          ]);
        }
      } finally {
        setTermsLoading(false);
      }
    };

    fetchTerms();
  }, []);

  // Get icon component based on icon name
  const getIconComponent = (iconName: string | null) => {
    switch (iconName) {
      case 'Computer':
        return Computer;
      case 'Layers':
        return Layers;
      case 'Globe':
        return Globe;
      case 'Database':
        return Database;
      default:
        return Computer;
    }
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading || termsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tech-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

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
            {terms.map((term) => {
              const locked = term.id !== 1;
              const IconComponent = getIconComponent(term.icon);
              
              return (
                <TooltipProvider key={term.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Card 
                        className={`overflow-hidden cursor-pointer transition-all border-2 hover:shadow-lg ${
                          locked 
                            ? 'opacity-60 grayscale border-gray-300' 
                            : 'border-tech-primary hover:border-tech-primary/80'
                        }`}
                        onClick={() => !locked && handleTermSelect(term.id)}
                      >
                        <div className="relative h-40 overflow-hidden">
                          <img 
                            src={term.image_url || ''} 
                            alt={`Term ${term.id}: ${term.description}`}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 flex items-end p-4">
                            <h2 className="text-2xl font-bold text-white flex items-center">
                              {term.title}
                              {locked && <Lock className="ml-2 h-4 w-4" />}
                            </h2>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <p className="font-medium">{term.description}</p>
                            </div>
                            <IconComponent className="h-6 w-6 text-tech-primary" />
                          </div>
                          
                          {locked ? (
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
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
