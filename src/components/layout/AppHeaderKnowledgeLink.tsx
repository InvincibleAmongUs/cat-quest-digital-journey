
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Book } from 'lucide-react';

export default function AppHeaderKnowledgeLink() {
  return (
    <Button variant="outline" asChild size="sm" className="ml-2">
      <Link to="/knowledge-base">
        <Book className="mr-1 h-4 w-4" />
        Knowledge Base
      </Link>
    </Button>
  );
}
