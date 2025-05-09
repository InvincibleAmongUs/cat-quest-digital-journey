
import React from 'react';
import { FigureBlock as FigureBlockType } from '@/components/lessons/ContentBlockRenderer';
import KnowledgeImage from '@/components/knowledgebase/KnowledgeImage';

interface FigureBlockProps {
  block: FigureBlockType;
}

export default function FigureBlock({ block }: FigureBlockProps) {
  const { chapterId, reference, caption } = block.content;
  
  return (
    <KnowledgeImage
      chapterId={chapterId}
      type="figure"
      reference={reference}
      caption={caption}
    />
  );
}
