
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth(); // Changed from "loading" to "isLoading"
  
  // If user is already authenticated, redirect to terms selection
  useEffect(() => {
    if (!isLoading && user?.isAuthenticated) {
      navigate('/terms');
    }
  }, [user, isLoading, navigate]);

  // Show loading spinner while checking auth state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tech-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-tech-gray to-white">
      <div className="w-full max-w-lg text-center mb-8">
        <h1 className="text-4xl font-bold text-tech-dark mb-2">CATalyst Learn</h1>
        <p className="text-tech-neutral text-lg">Your Digital Quest for Computer Applications Technology</p>
      </div>
      
      <AuthForm />
      
      <div className="mt-12 text-center space-y-2">
        <p className="text-tech-blue font-medium">Grade 10 CAT Adventure</p>
        <p className="text-sm text-tech-neutral">Explore, Learn, Achieve</p>
      </div>
    </div>
  );
}
