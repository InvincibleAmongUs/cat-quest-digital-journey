
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ImagePlaceholder from '@/components/lessons/ImagePlaceholder';

interface KnowledgeImageProps {
  chapterId: number;
  type: 'figure' | 'table';
  reference: string;
  caption?: string;
  width?: string;
  height?: string;
}

export default function KnowledgeImage({ 
  chapterId, 
  type, 
  reference, 
  caption, 
  width = "full",
  height = "auto"
}: KnowledgeImageProps) {
  // Construct the expected filename format: ch1_figure_1_1.png or ch1_table_1_1.png
  const refParts = reference.split('.');
  const filename = `ch${chapterId}_${type}_${refParts.join('_')}.png`;
  
  // Construct alt text and caption
  const typeLabel = type === 'figure' ? 'Figure' : 'Table';
  const alt = caption || `${typeLabel} ${reference}`;
  const displayCaption = caption || `${typeLabel} ${reference}`;
  
  return (
    <div className="my-4">
      <ImagePlaceholder 
        filename={filename}
        alt={alt}
        width={width}
        height={height}
      />
      {displayCaption && (
        <p className="text-sm text-center text-muted-foreground mt-2">
          {typeLabel} {reference}: {caption || ''}
        </p>
      )}
    </div>
  );
}
