
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import ModuleList from '@/components/dashboard/ModuleList';
import DataDragon from '@/components/mascot/DataDragon';

// Mock data for all modules
const allModules = [
  {
    id: 1,
    title: "System Superstars",
    description: "Learn about computer systems, components and basic operations",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    progress: 35,
    isLocked: false,
    badgeCount: 3
  },
  {
    id: 2,
    title: "Digital Citizenship HQ",
    description: "Ethics, safety and responsible technology use",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    progress: 0,
    isLocked: false,
    badgeCount: 4
  },
  {
    id: 3,
    title: "Word Wizardry Academy",
    description: "Master word processing skills and document creation",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
    progress: 0,
    isLocked: true,
    badgeCount: 3
  },
  {
    id: 4,
    title: "Spreadsheet Sorcery School",
    description: "Learn data handling and calculations with spreadsheets",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    progress: 0,
    isLocked: true,
    badgeCount: 5
  },
  {
    id: 5,
    title: "Presentation Pioneers Port",
    description: "Create engaging and effective presentations",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    progress: 0,
    isLocked: true,
    badgeCount: 4
  },
  {
    id: 6,
    title: "Information Investigators Guild",
    description: "Research skills and information management",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
    progress: 0,
    isLocked: true,
    badgeCount: 3
  }
];

export default function ModulesPage() {
  const navigate = useNavigate();
  
  // Access user data from localStorage
  const userDataString = localStorage.getItem('user');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  
  // If no user data is found, redirect to login
  React.useEffect(() => {
    if (!userData) {
      navigate('/login');
    }
  }, [userData, navigate]);
  
  if (!userData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        username={userData.username} 
        points={userData.points}
        onLogout={handleLogout}
      />
      
      <main className="container py-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Learning Modules</h1>
            <p className="text-muted-foreground">Complete modules to unlock new content and earn badges</p>
          </div>
          <DataDragon message="Each module covers key areas of the CAT curriculum. Complete them in order to advance!" />
        </div>
        
        <ModuleList modules={allModules} />
      </main>
    </div>
  );
}
