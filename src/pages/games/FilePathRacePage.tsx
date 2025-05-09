
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import AppHeader from '@/components/layout/AppHeader';
import FilePathRace from '@/components/games/FilePathRace';
import { useAuth } from '@/contexts/AuthContext';

export default function FilePathRacePage() {
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

  // Sample target path for the game
  const sampleTargetPath = "/Users/student/Documents/School/Grade10/CAT/Projects/Term1";

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
              <h1 className="text-3xl font-bold">File Path Race</h1>
              <p className="text-muted-foreground">Navigate the file system quickly to reach the target</p>
            </div>
          </div>
          
          <FilePathRace targetPath={sampleTargetPath} />
        </div>
      </main>
    </div>
  );
}
