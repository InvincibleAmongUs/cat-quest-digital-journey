
import React from 'react';
import { TextBlock as TextBlockType } from '@/components/lessons/ContentBlockRenderer';

interface TextBlockProps {
  block: TextBlockType;
}

export default function TextBlock({ block }: TextBlockProps) {
  return <p className="my-4">{block.content}</p>;
}
