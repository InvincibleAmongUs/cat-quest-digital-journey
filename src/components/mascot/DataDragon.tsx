
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface DataDragonProps {
  message: string;
}

export default function DataDragon({ message }: DataDragonProps) {
  return (
    <div className="relative">
      <div className="flex items-end">
        <div className="w-24 h-24 relative animate-float">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
            {/* Simple dragon body */}
            <path d="M50,20 Q65,5 80,20 Q95,35 80,50 Q95,65 80,80 Q65,95 50,80 Q35,95 20,80 Q5,65 20,50 Q5,35 20,20 Q35,5 50,20" fill="#9B87F5" />
            {/* Eyes */}
            <circle cx="35" cy="40" r="5" fill="white" />
            <circle cx="65" cy="40" r="5" fill="white" />
            <circle cx="35" cy="40" r="2" fill="#1A1F2C" />
            <circle cx="65" cy="40" r="2" fill="#1A1F2C" />
            {/* Smile */}
            <path d="M40,60 Q50,70 60,60" fill="none" stroke="#1A1F2C" strokeWidth="2" strokeLinecap="round" />
            {/* Digital patterns */}
            <path d="M75,30 L85,25 L75,20" fill="none" stroke="#D6BCFA" strokeWidth="2" />
            <path d="M25,30 L15,25 L25,20" fill="none" stroke="#D6BCFA" strokeWidth="2" />
            <circle cx="50" cy="25" r="3" fill="#1EAEDB" />
          </svg>
        </div>
        <div className="relative">
          <div className="absolute w-4 h-4 bg-tech-light transform rotate-45 left-0 -translate-x-2 translate-y-2"></div>
          <Card className="ml-3 mb-4">
            <CardContent className="p-3">
              <p className="text-sm">{message}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
