
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface BadgeCardProps {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  progress?: number;
  maxProgress?: number;
}

export default function BadgeCard({ name, description, icon, earned, progress, maxProgress }: BadgeCardProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className={`transition-all ${earned ? 'border-tech-primary' : 'opacity-50'}`}>
            <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
              <div className={`p-4 rounded-full ${earned ? 'bg-tech-primary/10' : 'bg-gray-200'}`}>
                <div className={`text-3xl ${earned ? 'text-tech-primary' : 'text-gray-400'}`}>
                  {icon}
                </div>
              </div>
              <h3 className="font-bold">{name}</h3>
              {progress !== undefined && maxProgress !== undefined && (
                <div className="text-xs text-muted-foreground">
                  {progress}/{maxProgress}
                </div>
              )}
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
