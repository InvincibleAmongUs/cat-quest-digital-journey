
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // If user is already authenticated, redirect to dashboard
  useEffect(() => {
    if (user?.isAuthenticated) {
      console.log("User is authenticated, redirecting to dashboard");
      navigate('/');
    }
  }, [user, navigate]);

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
