
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Clock, Award, Redo, Check, X } from 'lucide-react';
import { awardPoints, saveUserProgress } from '@/utils/gamification';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface DirectoryItem {
  name: string;
  type: 'folder' | 'file';
  children?: DirectoryItem[];
}

interface Challenge {
  path: string;
  description: string;
}

export default function FilePathRace() {
  const [time, setTime] = useState(90); // 1.5 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);
  const { user, updateUserData } = useAuth();
  const { toast } = useToast();

  // File system structure
  const fileSystem: DirectoryItem = {
    name: 'C:',
    type: 'folder',
    children: [
      {
        name: 'Users',
        type: 'folder',
        children: [
          {
            name: 'Student',
            type: 'folder',
            children: [
              {
                name: 'Documents',
                type: 'folder',
                children: [
                  {
                    name: 'School',
                    type: 'folder',
                    children: [
                      { name: 'CAT', type: 'folder', children: [
                        { name: 'Assignments', type: 'folder', children: [
                          { name: 'Term1_Task.docx', type: 'file' },
                          { name: 'Project_Guidelines.pdf', type: 'file' }
                        ]},
                        { name: 'Notes', type: 'folder', children: [
                          { name: 'Hardware_Notes.txt', type: 'file' },
                          { name: 'Software_Notes.txt', type: 'file' }
                        ]},
                        { name: 'Practice', type: 'folder', children: [
                          { name: 'Excel_Practice.xlsx', type: 'file' }
                        ]}
                      ]},
                      { name: 'Math', type: 'folder', children: [
                        { name: 'Formulas.pdf', type: 'file' }
                      ]},
                      { name: 'English', type: 'folder', children: [
                        { name: 'Essay.docx', type: 'file' }
                      ]}
                    ]
                  },
                  {
                    name: 'Personal',
                    type: 'folder',
                    children: [
                      { name: 'Photos', type: 'folder', children: [
                        { name: 'Holiday.jpg', type: 'file' }
                      ]},
                      { name: 'Music', type: 'folder', children: [
                        { name: 'Playlist.mp3', type: 'file' }
                      ]}
                    ]
                  }
                ]
              },
              {
                name: 'Downloads',
                type: 'folder',
                children: [
                  { name: 'Setup.exe', type: 'file' },
                  { name: 'Manual.pdf', type: 'file' }
                ]
              },
              {
                name: 'Desktop',
                type: 'folder',
                children: [
                  { name: 'Shortcut.lnk', type: 'file' }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'Program Files',
        type: 'folder',
        children: [
          { name: 'Office', type: 'folder', children: [
            { name: 'Word.exe', type: 'file' },
            { name: 'Excel.exe', type: 'file' }
          ]}
        ]
      }
    ]
  };

  // List of file path challenges
  const challenges: Challenge[] = [
    {
      path: 'C:/Users/Student/Documents/School/CAT/Assignments/Term1_Task.docx',
      description: 'Find your CAT assignment for Term 1'
    },
    {
      path: 'C:/Users/Student/Documents/School/Math/Formulas.pdf',
      description: 'Locate your Math formulas PDF'
    },
    {
      path: 'C:/Users/Student/Downloads/Manual.pdf',
      description: 'Find the manual you downloaded'
    },
    {
      path: 'C:/Users/Student/Documents/Personal/Photos/Holiday.jpg',
      description: 'Find your holiday photo'
    },
    {
      path: 'C:/Program Files/Office/Excel.exe',
      description: 'Find Excel in Program Files'
    }
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
    setCurrentPath(['C:']);
    setCompletedChallenges([]);
    setCurrentChallenge(0);
    setGameComplete(false);
    setTime(90);
    setScore(0);
  };

  const navigateTo = (item: DirectoryItem) => {
    if (item.type === 'folder') {
      setCurrentPath([...currentPath, item.name]);
    } else {
      // For files, check if this completes the challenge
      const fullPath = [...currentPath, item.name].join('/');
      const targetPath = challenges[currentChallenge].path;
      
      if (fullPath === targetPath) {
        // Correct path found
        const timeBonus = Math.max(0, Math.floor(time / 3)); // Time bonus
        const newScore = score + 50 + timeBonus;
        setScore(newScore);
        
        setCompletedChallenges([...completedChallenges, currentChallenge]);
        
        toast({
          title: "Path found!",
          description: `+${50 + timeBonus} points! Time bonus: ${timeBonus}`,
        });
        
        // Move to next challenge or end game
        if (currentChallenge < challenges.length - 1) {
          setCurrentChallenge(currentChallenge + 1);
          setCurrentPath(['C:']);
        } else {
          handleGameEnd();
        }
      } else {
        // Wrong file
        toast({
          title: "Not the file we're looking for!",
          description: "Try a different path",
          variant: "destructive"
        });
      }
    }
  };

  const handleBack = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
    }
  };

  const handleGameEnd = () => {
    setIsActive(false);
    setGameComplete(true);
    
    // Award points to user
    if (user) {
      const pointsAwarded = Math.floor(score / 10); // Convert game score to user points
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

  const getCurrentItems = () => {
    let current = fileSystem;
    
    // Start from index 1 since index 0 is the root
    for (let i = 1; i < currentPath.length; i++) {
      const folder = current.children?.find(item => item.name === currentPath[i]);
      if (folder && folder.type === 'folder') {
        current = folder;
      } else {
        return [];
      }
    }
    
    return current.children || [];
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
            <p className="text-2xl font-bold mb-4">Final Score: {score}</p>
            <p className="mb-2">Completed Challenges:</p>
            <ul className="space-y-2">
              {challenges.map((challenge, index) => (
                <li key={index} className="flex items-center">
                  {completedChallenges.includes(index) ? (
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <X className="h-5 w-5 text-red-500 mr-2" />
                  )}
                  <span className="font-medium">Challenge {index + 1}:</span>
                  <span className="ml-2 text-muted-foreground">{challenge.description}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button onClick={handleStart} className="w-full">Play Again</Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid gap-6">
          {isActive && (
            <Card className="border-tech-primary">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold">Challenge {currentChallenge + 1}:</h3>
                    <p>{challenges[currentChallenge].description}</p>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    {completedChallenges.length}/{challenges.length} Completed
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Target Path: <code>{challenges[currentChallenge].path}</code></p>
              </CardContent>
            </Card>
          )}
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>File Explorer</CardTitle>
                {currentPath.length > 1 && isActive && (
                  <Button variant="ghost" size="sm" onClick={handleBack}>
                    <Redo className="h-4 w-4 mr-1" />
                    Up
                  </Button>
                )}
              </div>
              {isActive && (
                <Breadcrumb className="text-sm">
                  {currentPath.map((part, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <BreadcrumbSeparator />}
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#" onClick={(e) => {
                          e.preventDefault();
                          if (index < currentPath.length - 1) {
                            setCurrentPath(currentPath.slice(0, index + 1));
                          }
                        }}>
                          {part}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    </React.Fragment>
                  ))}
                </Breadcrumb>
              )}
            </CardHeader>
            <CardContent>
              {isActive ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {getCurrentItems().map((item, index) => (
                    <div 
                      key={index}
                      className="p-3 border rounded-md text-center cursor-pointer hover:bg-muted transition-colors"
                      onClick={() => navigateTo(item)}
                    >
                      {item.type === 'folder' ? (
                        <div className="text-tech-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-1">
                            <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
                          </svg>
                        </div>
                      ) : (
                        <div className="text-orange-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-1">
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                          </svg>
                        </div>
                      )}
                      <p className="text-xs truncate">{item.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p>Press "Start Game" to begin the file path challenge!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
      
      {!isActive && !gameComplete && (
        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-2">How to Play</h3>
            <p className="mb-3">Navigate through the file system to find files matching the given paths:</p>
            <ul className="space-y-2">
              <li>• Click on folders to navigate into them</li>
              <li>• Use the breadcrumb navigation to go back to previous folders</li>
              <li>• When you find the correct file, click on it to complete the challenge</li>
              <li>• Complete all challenges before time runs out</li>
            </ul>
            <p className="mt-3">You have 90 seconds to find all the files. The faster you complete challenges, the more points you earn!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
