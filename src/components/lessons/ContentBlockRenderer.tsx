
import React from 'react';
import ImagePlaceholder from './ImagePlaceholder';

// Define the types of content blocks we support
export interface ContentBlock {
  type: 'text' | 'heading' | 'image' | 'quiz' | 'game';
  content: any;
}

export interface TextBlock extends ContentBlock {
  type: 'text';
  content: string;
}

export interface HeadingBlock extends ContentBlock {
  type: 'heading';
  content: {
    text: string;
    level: 1 | 2 | 3;
  };
}

export interface ImageBlock extends ContentBlock {
  type: 'image';
  content: {
    src: string;
    alt: string;
    caption?: string;
  };
}

export interface QuizBlock extends ContentBlock {
  type: 'quiz';
  content: {
    questions: {
      question: string;
      options: string[];
      correctAnswer: number;
    }[];
  };
}

export interface GameBlock extends ContentBlock {
  type: 'game';
  content: {
    gameType: string;
    gameId: string;
  };
}

export type AnyContentBlock = TextBlock | HeadingBlock | ImageBlock | QuizBlock | GameBlock;

interface ContentBlockRendererProps {
  block: AnyContentBlock;
}

export default function ContentBlockRenderer({ block }: ContentBlockRendererProps) {
  switch (block.type) {
    case 'text':
      return <p className="my-4">{block.content}</p>;
      
    case 'heading':
      switch (block.content.level) {
        case 1:
          return <h1 className="text-3xl font-bold my-6">{block.content.text}</h1>;
        case 2:
          return <h2 className="text-2xl font-bold my-5">{block.content.text}</h2>;
        case 3:
          return <h3 className="text-xl font-bold my-4">{block.content.text}</h3>;
        default:
          return <h2 className="text-2xl font-bold my-5">{block.content.text}</h2>;
      }
      
    case 'image':
      // Check if the image src is a local file path or an external URL
      if (block.content.src.startsWith('http')) {
        return (
          <figure className="my-6">
            <img 
              src={block.content.src} 
              alt={block.content.alt} 
              className="rounded-md mx-auto"
            />
            {block.content.caption && (
              <figcaption className="text-center text-sm text-muted-foreground mt-2">
                {block.content.caption}
              </figcaption>
            )}
          </figure>
        );
      } else {
        // For local files, use the filename to determine if we should use ImagePlaceholder
        const filename = block.content.src.split('/').pop();
        return (
          <ImagePlaceholder 
            filename={filename || block.content.src}
            alt={block.content.alt} 
          />
        );
      }
      
    case 'quiz':
      // The quiz will be handled by the parent component
      return null;
      
    case 'game':
      // Games will be separately implemented and linked
      return (
        <div className="my-6 p-4 border rounded-md bg-muted">
          <p className="font-medium">Interactive Game: {block.content.gameType}</p>
          <p className="text-sm text-muted-foreground">This interactive game will be loaded separately.</p>
        </div>
      );
      
    default:
      return <p className="text-red-500">Unsupported content block type: {(block as any).type}</p>;
  }
}
