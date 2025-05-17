
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { UserData, AuthContextType } from './authTypes';
import { mapUserData } from '@/lib/auth/userDataMapper';
import { 
  loginWithCredentials, 
  registerWithCredentials, 
  signOut,
  updateUserProfileData,
  updateUserProgressData
} from '@/lib/auth/authService';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(true);
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, currentSession) => {
        setSession(currentSession);
        const userData = await mapUserData(supabase, currentSession);
        setUser(userData);
        // Delay setting isLoading to false to ensure dependent components pick up new user state
        setTimeout(() => setIsLoading(false), 0);
      }
    );

    supabase.auth.getSession().then(async ({ data: { session: initialSession } }) => {
      setSession(initialSession);
      const initialUserData = await mapUserData(supabase, initialSession);
      setUser(initialUserData);
      setIsLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { session: newSession, error } = await loginWithCredentials(supabase, toast, email, password);
      if (error || !newSession) {
        setIsLoading(false);
        return false;
      }
      const userData = await mapUserData(supabase, newSession);
      setUser(userData);
      setSession(newSession);
      toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
      });
      setIsLoading(false);
      return true;
    } catch (err) { // Catch any unexpected errors from service
      console.error('Login process error:', err);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred during login.",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { session: newSession, error } = await registerWithCredentials(supabase, toast, username, email, password);
      if (error) {
        setIsLoading(false);
        return false;
      }
      // User might not be logged in immediately if email verification is on
      if (newSession) {
        const userData = await mapUserData(supabase, newSession);
        setUser(userData);
        setSession(newSession);
      }
      setIsLoading(false);
      return true;
    } catch (err) {
      console.error('Registration process error:', err);
       toast({
        title: "Registration Failed",
        description: "An unexpected error occurred during registration.",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    setIsLoading(true);
    const { error } = await signOut(supabase, toast);
    if (!error) {
      setUser(null);
      setSession(null);
      navigate('/login');
    }
    setIsLoading(false);
  };
  
  const refreshUserData = async (): Promise<void> => {
    if (!session?.user) return;
    setIsLoading(true);
    const userData = await mapUserData(supabase, session);
    setUser(userData);
    setIsLoading(false);
  };

  const updateUserData = async (data: Partial<UserData>): Promise<UserData | null> => {
    if (!user) return null;
    setIsLoading(true);
    let hasError = false;

    const profileUpdates: Partial<Pick<UserData, 'username' | 'points'>> = {};
    if (data.username !== undefined) profileUpdates.username = data.username;
    if (data.points !== undefined) profileUpdates.points = data.points;

    if (Object.keys(profileUpdates).length > 0) {
      const { error } = await updateUserProfileData(supabase, toast, user.id, profileUpdates);
      if (error) hasError = true;
    }

    const progressUpdates: Partial<Pick<UserData, 'completedLessons' | 'completedModules' | 'quizScores' | 'badges'>> = {};
    if (data.completedLessons) progressUpdates.completedLessons = data.completedLessons;
    if (data.completedModules) progressUpdates.completedModules = data.completedModules;
    if (data.quizScores) progressUpdates.quizScores = data.quizScores;
    if (data.badges) progressUpdates.badges = data.badges;
    
    if (Object.keys(progressUpdates).length > 0) {
      const { error } = await updateUserProgressData(supabase, toast, user.id, progressUpdates);
      if (error) hasError = true;
    }

    if (hasError) {
      toast({
        title: "Update Partially Failed",
        description: "Some user data might not have been updated.",
        variant: "warning",
      });
    } else {
       toast({
        title: "User Data Updated",
        description: "Your information has been successfully updated.",
      });
    }
    
    await refreshUserData(); // This will also set isLoading to false
    return user; // Return the optimistic user state before refresh, or await refresh and return latest
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      isLoading,
      login, 
      register, 
      logout, 
      updateUserData, 
      refreshUserData 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
