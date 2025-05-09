
import React from 'react';
import TextBlock from './blocks/TextBlock';
import HeadingBlock from './blocks/HeadingBlock';
import ImageBlock from './blocks/ImageBlock';
import FigureBlock from './blocks/FigureBlock';
import TableBlock from './blocks/TableBlock';
import GameBlock from './blocks/GameBlock';

// Define the types of content blocks we support
export interface ContentBlock {
  type: 'text' | 'heading' | 'image' | 'quiz' | 'game' | 'figure' | 'table';
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
    isTable?: boolean;
  };
}

export interface FigureBlock extends ContentBlock {
  type: 'figure';
  content: {
    chapterId: number;
    reference: string;
    caption?: string;
  };
}

export interface TableBlock extends ContentBlock {
  type: 'table';
  content: {
    chapterId: number;
    reference: string;
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

export type AnyContentBlock = 
  | TextBlock 
  | HeadingBlock 
  | ImageBlock 
  | FigureBlock 
  | TableBlock 
  | QuizBlock 
  | GameBlock;

interface ContentBlockRendererProps {
  block: AnyContentBlock;
}

export default function ContentBlockRenderer({ block }: ContentBlockRendererProps) {
  switch (block.type) {
    case 'text':
      return <TextBlock block={block} />;
      
    case 'heading':
      return <HeadingBlock block={block} />;
      
    case 'image':
      return <ImageBlock block={block} />;
    
    case 'figure':
      return <FigureBlock block={block} />;
      
    case 'table':
      return <TableBlock block={block} />;
      
    case 'quiz':
      // The quiz will be handled by the parent component
      return null;
      
    case 'game':
      return <GameBlock block={block} />;
      
    default:
      return <p className="text-red-500">Unsupported content block type: {(block as any).type}</p>;
  }
}
