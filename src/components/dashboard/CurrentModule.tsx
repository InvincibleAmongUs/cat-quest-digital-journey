
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight } from 'lucide-react';

interface Module {
  id: number;
  title: string;
  description: string;
  progress: number;
  nextLessonId: number;
  nextLessonTitle: string;
  image: string;
}

interface CurrentModuleProps {
  module: Module;
}

export default function CurrentModule({ module }: CurrentModuleProps) {
  return (
    <Card className="overflow-hidden border-2 border-tech-primary">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={module.image} 
          alt={module.title} 
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <h3 className="text-xl font-bold text-white">Current Quest</h3>
        </div>
      </div>
      
      <CardHeader>
        <CardTitle className="text-2xl">{module.title}</CardTitle>
        <CardDescription>{module.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Module Progress</span>
            <span className="font-medium">{module.progress}%</span>
          </div>
          <Progress value={module.progress} className="h-2" />
        </div>
        
        <div className="p-4 bg-secondary rounded-lg">
          <p className="text-sm font-medium">Next Lesson:</p>
          <p className="text-lg font-bold">{module.nextLessonTitle}</p>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={`/modules/${module.id}/lessons/${module.nextLessonId}`}>
            Continue Learning
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
