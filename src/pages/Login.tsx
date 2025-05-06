
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { useNavigate } from 'react-router-dom';
import { availableBadges, saveUserProgress } from '@/utils/gamification';
import { toast } from '@/hooks/use-toast';

export default function Login() {
  const navigate = useNavigate();

  const handleAuthenticated = (userData: { username: string; email: string }) => {
    // Check if this is a new user
    const existingUser = localStorage.getItem('user');
    const isNewUser = !existingUser;
    
    // In a real app, we would store tokens in a more secure way
    // This is just for demo purposes
    const initialUserData = {
      username: userData.username,
      email: userData.email,
      points: 50,
      isAuthenticated: true,
      completedLessons: [],
      completedModules: [],
      quizScores: {},
      badges: isNewUser ? ["first_login"] : [] // Award first login badge to new users
    };
    
    localStorage.setItem('user', JSON.stringify(initialUserData));
    
    // Show welcome toast for new users
    if (isNewUser) {
      toast({
        title: "Welcome to CATalyst Learn! 🚀",
        description: "You've earned your first badge: First Login",
      });
    }
    
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-tech-gray to-white">
      <div className="w-full max-w-lg text-center mb-8">
        <h1 className="text-4xl font-bold text-tech-dark mb-2">CATalyst Learn</h1>
        <p className="text-tech-neutral text-lg">Your Digital Quest for Computer Applications Technology</p>
      </div>
      
      <AuthForm onAuthenticated={handleAuthenticated} />
      
      <div className="mt-12 text-center space-y-2">
        <p className="text-tech-blue font-medium">Grade 10 CAT Adventure</p>
        <p className="text-sm text-tech-neutral">Explore, Learn, Achieve</p>
      </div>
    </div>
  );
}
