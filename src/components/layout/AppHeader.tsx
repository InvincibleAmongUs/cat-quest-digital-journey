import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Home, Books, Award, User, Brain } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import AppHeaderKnowledgeLink from './AppHeaderKnowledgeLink';

interface AppHeaderProps {
  username?: string;
  points?: number;
}

export default function AppHeader({ username = 'Guest', points = 0 }: AppHeaderProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' || 
        (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const getInitials = (name: string) => {
    const nameParts = name.split(' ');
    let initials = '';
    if (nameParts.length === 1) {
      initials = nameParts[0].charAt(0).toUpperCase();
    } else if (nameParts.length > 1) {
      initials = nameParts[0].charAt(0).toUpperCase() + nameParts[nameParts.length - 1].charAt(0).toUpperCase();
    }
    return initials;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/dashboard" className="flex items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-tech-primary to-tech-blue">
              CATalyst
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
            Dashboard
          </Link>
          <Link to="/modules" className="text-sm font-medium transition-colors hover:text-primary">
            Modules
          </Link>
          <AppHeaderKnowledgeLink />
          <Link to="/games" className="text-sm font-medium transition-colors hover:text-primary">
            Games
          </Link>
          <Link to="/ai-tools" className="text-sm font-medium transition-colors hover:text-primary">
            AI Tools
          </Link>
          <Link to="/achievements" className="text-sm font-medium transition-colors hover:text-primary">
            Achievements
          </Link>
        </nav>

        {/* User/Settings Section */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 mr-2">
            <span className="text-sm font-medium">{points} Points</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Toggle dark mode"
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          <div className="hidden md:block">
            <Link to="/profile">
              <Avatar className="cursor-pointer">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getInitials(username)}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
          
          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(username)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{username}</p>
                      <p className="text-sm text-muted-foreground">{points} Points</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={closeMobileMenu}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <nav className="flex flex-col space-y-4">
                  <Link to="/dashboard" className="flex items-center gap-2 py-2" onClick={closeMobileMenu}>
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link to="/modules" className="flex items-center gap-2 py-2" onClick={closeMobileMenu}>
                    <Books className="h-5 w-5" />
                    Modules
                  </Link>
                  <Link to="/knowledge-base" className="flex items-center gap-2 py-2" onClick={closeMobileMenu}>
                    <Books className="h-5 w-5" />
                    Knowledge Base
                  </Link>
                  <Link to="/games" className="flex items-center gap-2 py-2" onClick={closeMobileMenu}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Games
                  </Link>
                  <Link to="/ai-tools" className="flex items-center gap-2 py-2" onClick={closeMobileMenu}>
                    <Brain className="h-5 w-5" />
                    AI Tools
                  </Link>
                  <Link to="/achievements" className="flex items-center gap-2 py-2" onClick={closeMobileMenu}>
                    <Award className="h-5 w-5" />
                    Achievements
                  </Link>
                  <Link to="/profile" className="flex items-center gap-2 py-2" onClick={closeMobileMenu}>
                    <User className="h-5 w-5" />
                    Profile
                  </Link>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between items-center py-2">
                    <span>Dark Mode</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      aria-label="Toggle dark mode"
                      onClick={toggleDarkMode}
                    >
                      {darkMode ? (
                        <Sun className="h-5 w-5" />
                      ) : (
                        <Moon className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                  
                  <Button variant="outline" className="mt-auto" onClick={handleLogout}>
                    Sign out
                  </Button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
