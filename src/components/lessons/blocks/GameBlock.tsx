
import React from 'react';
import { GameBlock as GameBlockType } from '@/components/lessons/ContentBlockRenderer';

interface GameBlockProps {
  block: GameBlockType;
}

export default function GameBlock({ block }: GameBlockProps) {
  const { gameType, gameId } = block.content;
  
  return (
    <div className="my-6 p-4 border rounded-md bg-muted">
      <p className="font-medium">Interactive Game: {gameType}</p>
      <p className="text-sm text-muted-foreground">This interactive game will be loaded separately.</p>
    </div>
  );
}
