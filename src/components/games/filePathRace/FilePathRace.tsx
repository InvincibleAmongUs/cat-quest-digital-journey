
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { awardPoints, saveUserProgress } from '@/utils/gamification';
import { initialFileSystem } from './initialFileSystem';
import { FolderItemType } from './FolderItem';
import FilePathNavigator from './FilePathNavigator';
import FolderGrid from './FolderGrid';

interface FilePathRaceProps {
  targetPath: string;
  onComplete?: (score: number) => void;
}

export default function FilePathRace({
  targetPath,
  onComplete
}: FilePathRaceProps) {
  const { user, updateUserData } = useAuth();
  const { toast } = useToast();
  const [currentFolder, setCurrentFolder] = useState<FolderItemType>(initialFileSystem);
  const [pathTaken, setPathTaken] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Reset the game when the targetPath changes
    setCurrentFolder(initialFileSystem);
    setPathTaken([]);
    setIsCompleted(false);
    setScore(0);
  }, [targetPath]);

  const navigateToFolder = (folder: FolderItemType) => {
    if (folder.type === 'file') return;
    setCurrentFolder(folder);
    setPathTaken([...pathTaken, folder.name]);
  };

  const handleGoBack = () => {
    if (pathTaken.length > 0) {
      const newPathTaken = [...pathTaken];
      newPathTaken.pop();
      setPathTaken(newPathTaken);

      // Navigate back to the previous folder
      let current = initialFileSystem;
      newPathTaken.forEach(folderName => {
        const nextFolder = current.children?.find(child => child.name === folderName && child.type === 'folder');
        if (nextFolder) {
          current = nextFolder;
        }
      });
      setCurrentFolder(current);
    }
  };

  const handleComplete = async () => {
    if (!user) return;
    
    setIsCompleted(true);
    
    // Calculate score based on how many steps were needed
    const maxScore = 100;
    const minScore = 60;
    
    // If perfect path, max score. Otherwise, deduct points for extra steps.
    const optimalPathLength = targetPath.split('/').filter(Boolean).length;
    const extraSteps = Math.max(0, pathTaken.length - optimalPathLength);
    const scoreDeduction = Math.min(40, extraSteps * 10);
    const finalScore = maxScore - scoreDeduction;
    
    setScore(finalScore);
    
    // Award points based on score
    let pointsAwarded = 15; // Base points for completing
    
    if (finalScore >= 90) {
      pointsAwarded += 10;
    } else if (finalScore >= 75) {
      pointsAwarded += 5;
    }
    
    // Update user progress with awarded points
    try {
      const updatedUserData = await saveUserProgress(user, {
        points: pointsAwarded
      });
      
      if (updatedUserData) {
        await updateUserData({
          points: user.points + pointsAwarded
        });
        
        // Display success message
        toast({
          title: `Game Complete!`,
          description: `You found the file and earned ${pointsAwarded} points!`,
        });
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      toast({
        title: "Error",
        description: "Failed to save your progress. Please try again.",
        variant: "destructive",
      });
    }
    
    if (onComplete) {
      onComplete(finalScore);
    }
  };

  const isTargetReached = () => {
    // Construct the current path based on pathTaken
    const currentPath = '/' + pathTaken.join('/');
    return currentPath === targetPath;
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">File Path Race</h2>
        <p>Find the file at: <Badge variant="secondary">{targetPath}</Badge></p>

        <FilePathNavigator pathTaken={pathTaken} onGoBack={handleGoBack} />
        
        <FolderGrid 
          folders={currentFolder.children || []} 
          onNavigate={navigateToFolder}
        />

        {isTargetReached() ? (
          <div className="flex items-center space-x-2 text-green-500">
            <CheckCircle className="h-6 w-6" />
            <p>You found the file!</p>
          </div>
        ) : isCompleted && (
          <div className="flex items-center space-x-2 text-red-500">
            <XCircle className="h-6 w-6" />
            <p>Incorrect path. Try again!</p>
          </div>
        )}

        {!isCompleted && (
          <Button onClick={handleComplete} disabled={!isTargetReached()}>
            Complete
          </Button>
        )}

        {isCompleted && (
          <div className="mt-4">
            <p>Score: {score}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
