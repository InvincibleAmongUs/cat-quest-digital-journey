
import React from 'react';
import FolderItem, { FolderItemType } from './FolderItem';

interface FolderGridProps {
  folders: FolderItemType[];
  onNavigate: (folder: FolderItemType) => void;
}

export default function FolderGrid({ folders, onNavigate }: FolderGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {folders.map(item => (
        <FolderItem 
          key={item.path}
          item={item}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}
