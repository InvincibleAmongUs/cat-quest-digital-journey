
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Award, Check, X } from 'lucide-react';
import { awardPoints, saveUserProgress } from '@/utils/gamification';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface DataItem {
  id: string;
  text: string;
  type: 'data' | 'information';
  sorted: boolean;
  correctlySorted: boolean;
}

export default function DataDetective() {
  const [time, setTime] = useState(60); // 1 minute in seconds
  const [isActive, setIsActive] = useState(false);
  const [items, setItems] = useState<DataItem[]>([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);
  const { user, updateUserData } = useAuth();
  const { toast } = useToast();
  
  const allItems: DataItem[] = [
    { id: '1', text: '25, 80, 75, 92', type: 'data', sorted: false, correctlySorted: false },
    { id: '2', text: 'Jane, Mike, Tom, Sarah', type: 'data', sorted: false, correctlySorted: false },
    { id: '3', text: '5605, David, Bisho', type: 'data', sorted: false, correctlySorted: false },
    { id: '4', text: '10/15/2023', type: 'data', sorted: false, correctlySorted: false },
    { id: '5', text: 'Red, Blue, Green, Yellow', type: 'data', sorted: false, correctlySorted: false },
    { id: '6', text: 'The average test score is 83%', type: 'information', sorted: false, correctlySorted: false },
    { id: '7', text: 'David\'s contact details', type: 'information', sorted: false, correctlySorted: false },
    { id: '8', text: 'Class attendance report for October', type: 'information', sorted: false, correctlySorted: false },
    { id: '9', text: 'Primary colors chart', type: 'information', sorted: false, correctlySorted: false },
    { id: '10', text: 'Student ID: 5605, Name: David, Location: Bisho', type: 'information', sorted: false, correctlySorted: false }
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
    // Shuffle items for a new game
    const shuffled = [...allItems]
      .map(item => ({ ...item, sorted: false, correctlySorted: false }))
      .sort(() => Math.random() - 0.5);
    
    setItems(shuffled);
    setIsActive(true);
    setGameComplete(false);
    setTime(60);
    setScore(0);
  };

  const handleSort = (itemId: string, category: 'data' | 'information') => {
    if (!isActive) return;

    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        const isCorrect = item.type === category;
        return { 
          ...item, 
          sorted: true,
          correctlySorted: isCorrect
        };
      }
      return item;
    });
    
    setItems(updatedItems);
    
    const sortedItem = items.find(item => item.id === itemId);
    if (sortedItem) {
      const isCorrect = sortedItem.type === category;
      
      if (isCorrect) {
        setScore(prev => prev + 10);
        toast({
          title: "Correct!",
          description: `That is ${category}!`,
        });
      } else {
        toast({
          title: "Incorrect!",
          description: `That is not ${category}!`,
          variant: "destructive"
        });
      }
    }
    
    // Check if all items have been sorted
    if (updatedItems.every(item => item.sorted)) {
      handleGameEnd();
    }
  };

  const handleGameEnd = () => {
    setIsActive(false);
    setGameComplete(true);
    
    // Calculate final score based on correct sortings
    const correctSortings = items.filter(item => item.correctlySorted).length;
    const finalScore = correctSortings * 10 + Math.min(time, 30); // Points for correct + time bonus (max 30)
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

  const getUnsortedItems = () => items.filter(item => !item.sorted);
  const getDataItems = () => items.filter(item => item.sorted && item.type === 'data');
  const getInformationItems = () => items.filter(item => item.sorted && item.type === 'information');

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
            <p className="text-2xl font-bold mb-4">Final Score: {score}</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-2">Data Items</h3>
                <ul className="space-y-2">
                  {items.filter(item => item.type === 'data').map(item => (
                    <li key={item.id} className="flex items-center">
                      {item.correctlySorted ? (
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mr-2" />
                      )}
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">Information Items</h3>
                <ul className="space-y-2">
                  {items.filter(item => item.type === 'information').map(item => (
                    <li key={item.id} className="flex items-center">
                      {item.correctlySorted ? (
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mr-2" />
                      )}
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleStart} className="w-full">Play Again</Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid gap-6">
          {isActive && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Unsorted items */}
              <Card>
                <CardHeader>
                  <CardTitle>Items to Sort</CardTitle>
                </CardHeader>
                <CardContent className="min-h-[200px]">
                  <div className="flex flex-wrap gap-2">
                    {getUnsortedItems().map(item => (
                      <div
                        key={item.id}
                        className="p-2 border rounded-md bg-white hover:bg-gray-50 cursor-grab select-none"
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('itemId', item.id);
                        }}
                      >
                        {item.text}
                      </div>
                    ))}
                    
                    {getUnsortedItems().length === 0 && (
                      <p className="text-sm text-muted-foreground">All items sorted!</p>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-rows-2 gap-6">
                {/* Data dropzone */}
                <Card 
                  className="border-dashed border-2 border-blue-300"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const itemId = e.dataTransfer.getData('itemId');
                    handleSort(itemId, 'data');
                  }}
                >
                  <CardHeader className="pb-0">
                    <CardTitle className="text-blue-500">Data</CardTitle>
                    <p className="text-sm text-muted-foreground">Raw facts and figures without context</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {getDataItems().map(item => (
                        <div 
                          key={item.id}
                          className={`p-2 border rounded-md ${
                            item.correctlySorted ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                          }`}
                        >
                          {item.text}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Information dropzone */}
                <Card 
                  className="border-dashed border-2 border-green-300"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const itemId = e.dataTransfer.getData('itemId');
                    handleSort(itemId, 'information');
                  }}
                >
                  <CardHeader className="pb-0">
                    <CardTitle className="text-green-500">Information</CardTitle>
                    <p className="text-sm text-muted-foreground">Processed data with context and meaning</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {getInformationItems().map(item => (
                        <div 
                          key={item.id}
                          className={`p-2 border rounded-md ${
                            item.correctlySorted ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                          }`}
                        >
                          {item.text}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      )}
      
      {!isActive && !gameComplete && (
        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-2">How to Play</h3>
            <p className="mb-3">Drag and drop items into the correct category:</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-blue-500">Data</h4>
                <p className="text-sm mb-2">Raw facts and figures without context or interpretation.</p>
                <p className="text-sm text-muted-foreground">Examples: Numbers, names, dates, colors</p>
              </div>
              <div>
                <h4 className="font-medium text-green-500">Information</h4>
                <p className="text-sm mb-2">Processed data that has meaning and context.</p>
                <p className="text-sm text-muted-foreground">Examples: Reports, summaries, analyses, structured details</p>
              </div>
            </div>
            <p className="mt-3">You have 60 seconds to sort all items. The faster you sort correctly, the more points you earn!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
