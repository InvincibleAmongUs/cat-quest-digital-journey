
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface UserProgressTrackerProps {
  progress: {
    currentChapter?: number;
    totalChapters?: number;
    chaptersCompleted?: number[];
    readingProgress?: number;
    quizzesCompleted?: number;
    totalQuizzes?: number;
    totalPoints?: number;
  };
}

export default function UserProgressTracker({
  progress: {
    currentChapter = 0,
    totalChapters = 7,
    chaptersCompleted = [],
    readingProgress = 0,
    quizzesCompleted = 0,
    totalQuizzes = 7,
    totalPoints = 0,
  }
}: UserProgressTrackerProps) {
  const { toast } = useToast();

  // Calculate overall progress percentage
  const overallProgress = Math.round((chaptersCompleted.length / totalChapters) * 100);
  
  // Calculate quiz completion percentage
  const quizProgress = Math.round((quizzesCompleted / totalQuizzes) * 100);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Your Learning Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Overall Curriculum Progress</span>
              <span>{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
          
          {currentChapter > 0 && (
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Chapter {currentChapter} Reading Progress</span>
                <span>{readingProgress}%</span>
              </div>
              <Progress value={readingProgress} className="h-2" />
            </div>
          )}
          
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Quizzes Completed</span>
              <span>{quizzesCompleted}/{totalQuizzes}</span>
            </div>
            <Progress value={quizProgress} className="h-2" />
          </div>
          
          <div className="pt-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Total Points Earned</span>
              <span className="text-lg font-semibold">{totalPoints}</span>
            </div>
          </div>
          
          {chaptersCompleted.length > 0 && (
            <div className="pt-2">
              <p className="text-sm font-medium mb-2">Completed Chapters</p>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: totalChapters }, (_, i) => i + 1).map(chapter => (
                  <div
                    key={chapter}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
                      ${chaptersCompleted.includes(chapter) 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
                      }`}
                  >
                    {chapter}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
