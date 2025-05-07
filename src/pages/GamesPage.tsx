
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HardDrive, FileText, Database } from 'lucide-react';
import AppHeader from '@/components/layout/AppHeader';
import { useAuth } from '@/contexts/AuthContext';

export default function GamesPage() {
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

  const games = [
    {
      id: 'hardware-hunt',
      title: 'Hardware Scavenger Hunt',
      description: 'Assemble a computer by dragging and dropping the correct hardware components',
      icon: HardDrive,
      color: 'from-purple-500 to-blue-500'
    },
    {
      id: 'file-path-race',
      title: 'File Path Race',
      description: 'Navigate through folder structures to build correct file paths against the clock',
      icon: FileText,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'data-detective',
      title: 'Data Detective',
      description: 'Sort items into "Data" or "Information" categories to test your understanding',
      icon: Database,
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        username={user.username} 
        points={user.points}
      />
      
      <main className="container py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Practice Zone</h1>
          <p className="text-muted-foreground mb-8">
            Strengthen your CAT skills with these interactive mini-games. Earn points and have fun while learning!
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {games.map((game) => (
              <Card key={game.id} className="overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${game.color}`}></div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{game.title}</CardTitle>
                    <game.icon className="h-6 w-6 text-tech-primary" />
                  </div>
                  <CardDescription>{game.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => navigate(`/games/${game.id}`)}
                  >
                    Play Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
