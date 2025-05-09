
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { FolderItemType } from './FolderItem';

interface FilePathNavigatorProps {
  pathTaken: string[];
  onGoBack: () => void;
}

export default function FilePathNavigator({ pathTaken, onGoBack }: FilePathNavigatorProps) {
  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onGoBack} 
        disabled={pathTaken.length === 0}
      >
        <ChevronRight className="h-4 w-4 rotate-180" />
        Back
      </Button>
      <div>
        Current Path: /
        {pathTaken.map((folder, index) => (
          <React.Fragment key={index}>
            <span className="mx-1">{folder}</span>
            {index < pathTaken.length - 1 && <ChevronRight className="h-4 w-4 inline mx-1" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
