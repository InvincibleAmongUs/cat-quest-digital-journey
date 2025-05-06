
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lock, ArrowRight } from 'lucide-react';

interface Module {
  id: number;
  title: string;
  description: string;
  image: string;
  progress: number;
  isLocked: boolean;
  badgeCount: number;
}

interface ModuleListProps {
  modules: Module[];
}

export default function ModuleList({ modules }: ModuleListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((module) => (
        <Card 
          key={module.id} 
          className={`overflow-hidden ${module.isLocked ? 'opacity-70' : 'card-hover'}`}
        >
          <div className="relative h-40 overflow-hidden">
            <img 
              src={module.image} 
              alt={module.title} 
              className="object-cover w-full h-full"
            />
            {module.isLocked && (
              <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center">
                <Lock className="h-12 w-12 text-white opacity-80" />
              </div>
            )}
            {!module.isLocked && module.badgeCount > 0 && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-tech-blue text-white">
                  {module.badgeCount} Badges Available
                </Badge>
              </div>
            )}
          </div>
          
          <CardHeader>
            <CardTitle>{module.title}</CardTitle>
            <CardDescription>{module.description}</CardDescription>
          </CardHeader>
          
          {!module.isLocked && (
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{module.progress}%</span>
                </div>
                <Progress value={module.progress} className="h-2" />
              </div>
            </CardContent>
          )}
          
          <CardFooter>
            {module.isLocked ? (
              <Button variant="outline" className="w-full" disabled>
                Locked
                <Lock className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button asChild className="w-full">
                <Link to={`/modules/${module.id}`}>
                  {module.progress > 0 ? 'Continue Module' : 'Start Module'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
