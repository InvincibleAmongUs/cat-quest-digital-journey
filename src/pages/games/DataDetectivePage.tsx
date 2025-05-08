
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import AppHeader from '@/components/layout/AppHeader';
import DataDetective from '@/components/games/DataDetective';
import { useAuth } from '@/contexts/AuthContext';

export default function DataDetectivePage() {
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

  // Sample data items for the game
  const dataItems = [
    { id: '1', name: 'Student test scores', type: 'data' },
    { id: '2', name: 'Customer addresses', type: 'data' },
    { id: '3', name: 'Employee birth dates', type: 'data' },
    { id: '4', name: 'Flight arrival times', type: 'data' },
    { id: '5', name: 'Sales report showing top products', type: 'information' },
    { id: '6', name: 'Weather forecast for the week', type: 'information' },
    { id: '7', name: 'Summary of student performance', type: 'information' },
    { id: '8', name: 'Quarterly financial analysis', type: 'information' },
  ];

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
              <h1 className="text-3xl font-bold">Data Detective</h1>
              <p className="text-muted-foreground">Sort items into Data and Information categories</p>
            </div>
          </div>
          
          <DataDetective items={dataItems} />
        </div>
      </main>
    </div>
  );
}
