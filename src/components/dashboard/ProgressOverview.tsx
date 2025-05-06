
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Award } from 'lucide-react';

interface ProgressOverviewProps {
  totalProgress: number;
  earnedBadges: number;
  totalPoints: number;
}

export default function ProgressOverview({ totalProgress, earnedBadges, totalPoints }: ProgressOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Your Learning Journey</CardTitle>
        <CardDescription>Track your progress through the CAT curriculum</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span className="font-medium">{totalProgress}%</span>
          </div>
          <Progress value={totalProgress} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center p-4 bg-secondary rounded-lg">
            <div className="rounded-full bg-tech-primary/20 p-2 mb-2">
              <Award className="h-6 w-6 text-tech-primary" />
            </div>
            <span className="text-2xl font-bold">{earnedBadges}</span>
            <span className="text-xs text-muted-foreground">Badges Earned</span>
          </div>
          
          <div className="flex flex-col items-center justify-center p-4 bg-secondary rounded-lg">
            <div className="rounded-full bg-tech-blue/20 p-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-tech-blue">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <span className="text-2xl font-bold">{totalPoints}</span>
            <span className="text-xs text-muted-foreground">Total Points</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
