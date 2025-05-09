
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export default function AppHeaderKnowledgeLink() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Knowledge Base</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px]">
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/knowledge-base"
              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            >
              <div className="text-sm font-medium leading-none">Static Knowledge Base</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                Access structured educational content from the CAT curriculum.
              </p>
            </Link>
            <Link
              to="/dynamic-knowledge-base"
              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            >
              <div className="text-sm font-medium leading-none">Dynamic Knowledge Base</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                Interactive chapters with quizzes and advanced features.
              </p>
            </Link>
          </div>
          
          <hr className="my-2" />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Term 1</h4>
              <Link
                to="/knowledge-base/1"
                className="block text-sm text-muted-foreground hover:text-foreground"
              >
                Chapter 1: Introduction to CAT
              </Link>
              <Link
                to="/knowledge-base/2"
                className="block text-sm text-muted-foreground hover:text-foreground"
              >
                Chapter 2: Using a Computer
              </Link>
              <Link
                to="/knowledge-base/3"
                className="block text-sm text-muted-foreground hover:text-foreground"
              >
                Chapter 3: File Management
              </Link>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Term 2</h4>
              <Link
                to="/knowledge-base/4"
                className="block text-sm text-muted-foreground hover:text-foreground"
              >
                Chapter 4: Introduction to Word Processing
              </Link>
              <Link
                to="/knowledge-base/5"
                className="block text-sm text-muted-foreground hover:text-foreground"
              >
                Chapter 5: Computer Hardware
              </Link>
              <Link
                to="/knowledge-base/6"
                className="block text-sm text-muted-foreground hover:text-foreground"
              >
                Chapter 6: Input & Output
              </Link>
            </div>
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
