
import React from 'react';
import { ImageBlock as ImageBlockType } from '@/components/lessons/ContentBlockRenderer';
import ImagePlaceholder from '../ImagePlaceholder';

interface ImageBlockProps {
  block: ImageBlockType;
}

export default function ImageBlock({ block }: ImageBlockProps) {
  const { src, alt, caption, isTable } = block.content;
  
  // Check if the image src is a local file path or an external URL
  if (src.startsWith('http')) {
    return (
      <figure className="my-6">
        <img 
          src={src} 
          alt={alt} 
          className="rounded-md mx-auto"
        />
        {caption && (
          <figcaption className="text-center text-sm text-muted-foreground mt-2">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  } else {
    // For local files, use the filename to determine if we should use ImagePlaceholder
    const filename = src.split('/').pop();
    return (
      <div className="my-6">
        <ImagePlaceholder 
          filename={filename || src}
          alt={alt} 
        />
        {caption && (
          <p className="text-center text-sm text-muted-foreground mt-2">
            {isTable ? 'Table: ' : 'Figure: '}{caption}
          </p>
        )}
      </div>
    );
  }
}
