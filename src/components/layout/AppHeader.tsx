
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { Home, Book, Award, User, Menu, Bell } from 'lucide-react';

interface AppHeaderProps {
  username: string;
  points: number;
  onLogout: () => void;
}

export default function AppHeader({ username, points, onLogout }: AppHeaderProps) {
  const isMobile = useIsMobile();
  const initials = username.substring(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-tech-primary p-1 rounded-md">
              <Book className="h-6 w-6 text-white" />
            </div>
            {!isMobile && (
              <span className="text-xl font-bold">CATalyst Learn</span>
            )}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="hidden sm:flex items-center gap-1 py-1.5">
            <Award className="h-4 w-4 text-tech-primary" />
            <span>{points} Points</span>
          </Badge>
          
          {!isMobile && (
            <nav className="flex items-center space-x-4 lg:space-x-6">
              <Button asChild variant="ghost">
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/modules">
                  <Book className="h-4 w-4 mr-2" />
                  Modules
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/achievements">
                  <Award className="h-4 w-4 mr-2" />
                  Achievements
                </Link>
              </Button>
            </nav>
          )}

          <Button variant="outline" size="icon" className="rounded-full">
            <Bell className="h-4 w-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="" alt={username} />
                  <AvatarFallback className="bg-tech-primary text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{username}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {points} Points
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {isMobile && (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/" className="cursor-pointer">
                      <Home className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/modules" className="cursor-pointer">
                      <Book className="mr-2 h-4 w-4" />
                      <span>Modules</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/achievements" className="cursor-pointer">
                      <Award className="mr-2 h-4 w-4" />
                      <span>Achievements</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
