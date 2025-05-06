
import React, { useState } from 'react';
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
import { Home, BookOpen, Award, User, LogOut, Menu, Settings } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { useAuth } from '@/contexts/AuthContext';

interface AppHeaderProps {
  username: string;
  points: number;
  onLogout?: () => void;
}

export default function AppHeader({ username, points }: AppHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container py-2">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="text-tech-primary font-bold text-xl flex items-center">
              <span className="hidden sm:inline">CATalyst Learn</span>
              <span className="sm:hidden">CATalyst</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/modules">
                <BookOpen className="mr-2 h-4 w-4" />
                Modules
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/achievements">
                <Award className="mr-2 h-4 w-4" />
                Achievements
              </Link>
            </Button>
            {user?.role === 'admin' && (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin">
                  <Settings className="mr-2 h-4 w-4" />
                  Admin
                </Link>
              </Button>
            )}
          </nav>
          
          {/* User Profile and Points */}
          <div className="flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center bg-tech-primary/5 px-3 py-1 rounded-full mr-2">
                    <span className="text-sm font-medium text-tech-primary">{points}</span>
                    <Award className="ml-1 w-4 h-4 text-tech-primary" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your learning points</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-8 flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">{username}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                {user?.role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="flex items-center cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="flex items-center cursor-pointer text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-2 pt-4">
            <Separator className="mb-4" />
            <nav className="flex flex-col space-y-2">
              <Button variant="ghost" size="sm" asChild className="justify-start">
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="justify-start">
                <Link to="/modules" onClick={() => setMobileMenuOpen(false)}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Modules
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="justify-start">
                <Link to="/achievements" onClick={() => setMobileMenuOpen(false)}>
                  <Award className="mr-2 h-4 w-4" />
                  Achievements
                </Link>
              </Button>
              {user?.role === 'admin' && (
                <Button variant="ghost" size="sm" asChild className="justify-start">
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                    <Settings className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </Link>
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
