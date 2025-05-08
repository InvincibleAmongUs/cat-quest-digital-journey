
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, Clock, Award } from 'lucide-react';
import { awardPoints, saveUserProgress } from '@/utils/gamification';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ComponentItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  dropZone: string;
}

export default function HardwareHunt() {
  const [time, setTime] = useState(120); // 2 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [placedItems, setPlacedItems] = useState<Record<string, string>>({});
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);
  const { user, updateUserData } = useAuth();
  const { toast } = useToast();

  // Hardware components that can be dragged
  const components: ComponentItem[] = [
    { 
      id: 'cpu', 
      name: 'CPU', 
      icon: '🖥️', 
      description: 'Central Processing Unit - the brain of the computer',
      dropZone: 'motherboard'
    },
    { 
      id: 'ram', 
      name: 'RAM', 
      icon: '🧠', 
      description: 'Random Access Memory - temporary storage for active programs',
      dropZone: 'motherboard'
    },
    { 
      id: 'hdd', 
      name: 'Hard Drive', 
      icon: '💽', 
      description: 'Storage device for saving files and programs',
      dropZone: 'case'
    },
    { 
      id: 'gpu', 
      name: 'Graphics Card', 
      icon: '🎮', 
      description: 'Processes graphics for display',
      dropZone: 'motherboard'
    },
    { 
      id: 'psu', 
      name: 'Power Supply', 
      icon: '⚡', 
      description: 'Provides power to all components',
      dropZone: 'case'
    },
    { 
      id: 'keyboard', 
      name: 'Keyboard', 
      icon: '⌨️', 
      description: 'Input device for typing',
      dropZone: 'external'
    },
    { 
      id: 'mouse', 
      name: 'Mouse', 
      icon: '🖱️', 
      description: 'Input device for pointing and clicking',
      dropZone: 'external'
    },
    { 
      id: 'monitor', 
      name: 'Monitor', 
      icon: '🖥️', 
      description: 'Output device for displaying information',
      dropZone: 'external'
    }
  ];

  const dropZones = [
    { id: 'motherboard', name: 'Motherboard', description: 'The main circuit board' },
    { id: 'case', name: 'Computer Case', description: 'The enclosure that houses components' },
    { id: 'external', name: 'External Peripherals', description: 'Devices connected to the computer' }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else if (time === 0 && isActive) {
      setIsActive(false);
      handleGameEnd();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  const handleStart = () => {
    setIsActive(true);
    setPlacedItems({});
    setGameComplete(false);
    setTime(120);
    setScore(0);
  };

  const handleDragStart = (id: string) => {
    setIsDragging(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (zoneId: string) => {
    if (!isDragging) return;
    
    const component = components.find(c => c.id === isDragging);
    if (!component) return;
    
    // Check if the drop was correct
    const isCorrect = component.dropZone === zoneId;
    
    // Update placed items
    setPlacedItems(prev => ({
      ...prev,
      [component.id]: zoneId
    }));
    
    // Update score
    if (isCorrect) {
      setScore(prev => prev + 10);
      toast({
        title: "Correct placement!",
        description: `${component.name} belongs in the ${zoneId}!`,
        variant: "default"
      });
    } else {
      toast({
        title: "Try again!",
        description: `${component.name} doesn't belong in the ${zoneId}!`,
        variant: "destructive"
      });
    }
    
    setIsDragging(null);
    
    // Check if all components have been placed
    if (Object.keys(placedItems).length + 1 === components.length) {
      handleGameEnd();
    }
  };

  const handleGameEnd = () => {
    setIsActive(false);
    setGameComplete(true);
    
    // Calculate final score based on correct placements
    let correctPlacements = 0;
    Object.entries(placedItems).forEach(([itemId, zoneId]) => {
      const component = components.find(c => c.id === itemId);
      if (component && component.dropZone === zoneId) {
        correctPlacements++;
      }
    });
    
    const finalScore = correctPlacements * 10 + Math.min(time, 60); // Points for correct + time bonus (max 60)
    setScore(finalScore);
    
    // Award points to user
    if (user) {
      const pointsAwarded = Math.floor(finalScore / 5); // Convert game score to user points
      const updatedUserData = saveUserProgress(user, {
        points: pointsAwarded
      });
      updateUserData(updatedUserData);
      
      toast({
        title: "Game Complete!",
        description: `You earned ${pointsAwarded} points!`,
      });
    }
  };

  const getItemPlacement = (itemId: string) => {
    return placedItems[itemId] || null;
  };

  const renderTimer = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Badge variant={isActive ? "default" : "outline"} className="text-md py-1 px-3">
            <Clock className="mr-1 h-4 w-4" />
            {renderTimer()}
          </Badge>
          <Badge variant="outline" className="text-md py-1 px-3">
            <Award className="mr-1 h-4 w-4" />
            Score: {score}
          </Badge>
        </div>
        <Button onClick={handleStart} disabled={isActive}>
          {gameComplete ? 'Play Again' : 'Start Game'}
        </Button>
      </div>
      
      {gameComplete ? (
        <Card className="mb-6 border-tech-primary">
          <CardHeader>
            <CardTitle>Game Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mb-2">Final Score: {score}</p>
            <p>Correctly placed components:</p>
            <ul className="space-y-2 my-4">
              {components.map(component => {
                const placed = getItemPlacement(component.id);
                const isCorrect = placed === component.dropZone;
                return (
                  <li key={component.id} className="flex items-center">
                    {placed && (
                      isCorrect ? (
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mr-2" />
                      )
                    )}
                    <span className="font-medium">{component.name}</span>
                    {placed && !isCorrect && (
                      <span className="text-sm ml-2 text-muted-foreground">
                        (Placed in {placed} instead of {component.dropZone})
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </CardContent>
          <CardFooter>
            <Button onClick={handleStart} className="w-full">Play Again</Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Component sidebar */}
          <Card>
            <CardHeader>
              <CardTitle>Hardware Components</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {components.map(component => {
                const placed = getItemPlacement(component.id);
                return (
                  <div 
                    key={component.id}
                    className={`p-3 border rounded-md flex items-center cursor-grab ${
                      placed ? 'opacity-50' : 'hover:bg-muted'
                    }`}
                    draggable={!placed && isActive}
                    onDragStart={() => isActive && !placed && handleDragStart(component.id)}
                  >
                    <span className="text-2xl mr-3">{component.icon}</span>
                    <div>
                      <p className="font-medium">{component.name}</p>
                      <p className="text-xs text-muted-foreground">{component.description}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
          
          {/* Drop zones */}
          <div className="col-span-2 grid grid-cols-1 gap-4">
            {dropZones.map(zone => (
              <Card 
                key={zone.id}
                className={`h-40 ${isActive ? 'border-dashed border-2' : ''}`}
                onDragOver={handleDragOver}
                onDrop={() => isActive && handleDrop(zone.id)}
              >
                <CardHeader className="pb-2">
                  <CardTitle>{zone.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {components.filter(c => getItemPlacement(c.id) === zone.id).map(component => (
                      <Badge key={component.id} className="py-1 px-2">
                        {component.icon} {component.name}
                      </Badge>
                    ))}
                    {!isActive && components.filter(c => getItemPlacement(c.id) === zone.id).length === 0 && (
                      <p className="text-sm text-muted-foreground">Drop components here during the game</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {!isActive && !gameComplete && (
        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-2">How to Play</h3>
            <p className="mb-3">Drag each hardware component to its correct location:</p>
            <ul className="space-y-2">
              <li>• Place CPU, RAM, and GPU on the Motherboard</li>
              <li>• Place Hard Drive and Power Supply in the Computer Case</li>
              <li>• Place Keyboard, Mouse, and Monitor in External Peripherals</li>
            </ul>
            <p className="mt-3">You have 2 minutes to place all components correctly. The faster you are, the more points you earn!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
