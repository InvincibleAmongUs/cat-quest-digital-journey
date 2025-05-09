
import React from 'react';
import { TableBlock as TableBlockType } from '@/components/lessons/ContentBlockRenderer';
import KnowledgeImage from '@/components/knowledgebase/KnowledgeImage';

interface TableBlockProps {
  block: TableBlockType;
}

export default function TableBlock({ block }: TableBlockProps) {
  const { chapterId, reference, caption } = block.content;
  
  return (
    <KnowledgeImage
      chapterId={chapterId}
      type="table"
      reference={reference}
      caption={caption}
    />
  );
}
