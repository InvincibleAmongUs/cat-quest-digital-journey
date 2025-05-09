
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Folder, File } from 'lucide-react';

export interface FolderItemType {
  name: string;
  type: 'folder' | 'file';
  path: string;
  children?: FolderItemType[];
}

interface FolderItemProps {
  item: FolderItemType;
  onNavigate: (item: FolderItemType) => void;
}

export default function FolderItem({ item, onNavigate }: FolderItemProps) {
  return (
    <Card key={item.path} className="cursor-pointer hover:bg-muted transition-colors">
      <CardContent 
        className="flex items-center space-x-2 p-3" 
        onClick={() => onNavigate(item)}
      >
        {item.type === 'folder' ? 
          <Folder className="h-5 w-5 text-yellow-500" /> : 
          <File className="h-5 w-5 text-blue-500" />
        }
        <span>{item.name}</span>
      </CardContent>
    </Card>
  );
}
