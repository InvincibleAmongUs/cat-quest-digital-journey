
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import AppHeader from '@/components/layout/AppHeader';
import HardwareHunt from '@/components/games/HardwareHunt';
import { useAuth } from '@/contexts/AuthContext';

export default function HardwareHuntPage() {
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

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        username={user.username} 
        points={user.points}
      />
      
      <main className="container py-8">
        <div className="max-w-5xl mx-auto">
          <Button 
            variant="outline" 
            size="sm" 
            className="mb-6"
            onClick={() => navigate('/games')}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Games
          </Button>
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Hardware Scavenger Hunt</h1>
              <p className="text-muted-foreground">Build a computer by correctly placing hardware components</p>
            </div>
          </div>
          
          <HardwareHunt />
        </div>
      </main>
    </div>
  );
}
