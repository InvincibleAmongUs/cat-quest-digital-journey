
import React from 'react';
import { HeadingBlock as HeadingBlockType } from '@/components/lessons/ContentBlockRenderer';

interface HeadingBlockProps {
  block: HeadingBlockType;
}

export default function HeadingBlock({ block }: HeadingBlockProps) {
  const { level, text } = block.content;
  
  switch (level) {
    case 1:
      return <h1 className="text-3xl font-bold my-6">{text}</h1>;
    case 2:
      return <h2 className="text-2xl font-bold my-5">{text}</h2>;
    case 3:
      return <h3 className="text-xl font-bold my-4">{text}</h3>;
    default:
      return <h2 className="text-2xl font-bold my-5">{text}</h2>;
  }
}
