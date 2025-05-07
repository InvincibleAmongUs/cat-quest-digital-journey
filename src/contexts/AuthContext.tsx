import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

// Define types for our auth context
export interface UserData {
  id: string;
  username: string;
  email: string;
  points: number;
  isAuthenticated: boolean;
  completedLessons: number[];
  completedModules: number[];
  quizScores: Record<number, number>;
  badges: string[];
  role: 'student' | 'admin';
}

interface AuthContextType {
  user: UserData | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUserData: (data: Partial<UserData>) => Promise<UserData | null>;
  refreshUserData: () => Promise<void>;
}

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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function to map Supabase user and profile data to our UserData format
  const mapUserData = async (
    session: Session | null
  ): Promise<UserData | null> => {
    if (!session?.user) return null;

    const supabaseUser = session.user;

    try {
      // Get profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        return null;
      }

      // Get user progress data
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', supabaseUser.id)
        .maybeSingle();

      if (progressError && progressError.code !== 'PGRST116') {
        console.error('Error fetching user progress:', progressError);
      }

      // If no progress record exists yet, create one
      let userProgress = progressData;
      
      if (!userProgress) {
        const { data: newProgress, error: insertError } = await supabase
          .from('user_progress')
          .insert({
            user_id: supabaseUser.id,
            completed_lessons: [],
            completed_modules: [],
            quiz_scores: {},
            badges: ['first_login']
          })
          .select()
          .single();

        if (insertError) {
          console.error('Error creating user progress:', insertError);
        } else {
          userProgress = newProgress;
        }
      }

      return {
        id: supabaseUser.id,
        username: profileData.username,
        email: profileData.email,
        points: profileData.points || 0,
        isAuthenticated: true,
        completedLessons: userProgress?.completed_lessons || [],
        completedModules: userProgress?.completed_modules || [],
        quizScores: userProgress?.quiz_scores as Record<number, number> || {},
        badges: userProgress?.badges || ['first_login'],
        role: profileData.role as 'student' | 'admin'
      };
    } catch (error) {
      console.error('Error mapping user data:', error);
      return null;
    }
  };

  // Fetch user data on session changes
  const refreshUserData = async (): Promise<void> => {
    if (!session?.user) return;
    const userData = await mapUserData(session);
    if (userData) {
      setUser(userData);
    }
  };

  // Initialize authentication state
  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        
        // Only update user data if there's an actual change in the session state
        if (
          (session && !user) || 
          (session && user && session.user.id !== user.id) ||
          (!session && user)
        ) {
          const userData = await mapUserData(session);
          setUser(userData);
        }
        
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      const userData = await mapUserData(session);
      setUser(userData);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      const userData = await mapUserData(data.session);
      if (userData) {
        setUser(userData);
        setSession(data.session);
        
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Register function
  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (error) {
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Registration Successful",
        description: "Your account has been created.",
      });

      // If email confirmation is enabled in Supabase, the user won't be automatically logged in
      if (data.session) {
        const userData = await mapUserData(data.session);
        if (userData) {
          setUser(userData);
          setSession(data.session);
        }
      } else {
        toast({
          title: "Email Verification Required",
          description: "Please check your email to verify your account.",
        });
      }

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      navigate('/login');
      
      toast({
        title: "Logged Out",
        description: "You've been successfully logged out.",
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Update user data
  const updateUserData = async (data: Partial<UserData>): Promise<UserData | null> => {
    if (!user) return null;

    try {
      // Update profile if profile-related fields are changed
      if (data.username || data.points !== undefined) {
        const profileUpdates: any = {};
        if (data.username) profileUpdates.username = data.username;
        if (data.points !== undefined) profileUpdates.points = data.points;

        const { error: profileError } = await supabase
          .from('profiles')
          .update(profileUpdates)
          .eq('id', user.id);

        if (profileError) {
          console.error('Error updating profile:', profileError);
          toast({
            title: "Update Failed",
            description: "Failed to update profile information.",
            variant: "destructive",
          });
          return null;
        }
      }

      // Update user progress if progress-related fields are changed
      if (
        data.completedLessons || 
        data.completedModules || 
        data.quizScores || 
        data.badges
      ) {
        const progressUpdates: any = {};
        if (data.completedLessons) progressUpdates.completed_lessons = data.completedLessons;
        if (data.completedModules) progressUpdates.completed_modules = data.completedModules;
        if (data.quizScores) progressUpdates.quiz_scores = data.quizScores;
        if (data.badges) progressUpdates.badges = data.badges;

        const { error: progressError } = await supabase
          .from('user_progress')
          .update(progressUpdates)
          .eq('user_id', user.id);

        if (progressError) {
          console.error('Error updating user progress:', progressError);
          toast({
            title: "Update Failed",
            description: "Failed to update progress information.",
            variant: "destructive",
          });
          return null;
        }
      }

      // Refresh user data to get the latest state
      await refreshUserData();
      return user;
    } catch (error) {
      console.error('Error updating user data:', error);
      toast({
        title: "Update Failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading,
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