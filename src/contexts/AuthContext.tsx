
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
  const [isLoading, setIsLoading] = useState(true); // Start true by default
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Listener for Supabase auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, currentSession) => {
        setIsLoading(true); // Indicate loading while processing new auth state
        try {
          console.log('[AuthContext] onAuthStateChange event:', _event, 'session:', currentSession);
          setSession(currentSession);
          const userData = await mapUserData(supabase, currentSession);
          console.log('[AuthContext] onAuthStateChange userData mapped:', userData);
          setUser(userData);

          if (_event === 'SIGNED_IN' && userData?.isAuthenticated) {
            toast({
              title: "Welcome back!",
              description: "You've successfully logged in.",
            });
          }
        } catch (error) {
          console.error("[AuthContext] Error in onAuthStateChange callback:", error);
          setUser(null); // Reset user on error
        } finally {
          setIsLoading(false); // Ensure loading is set to false
        }
      }
    );

    // Initial session check and user data hydration
    const initializeAuth = async () => {
      setIsLoading(true); // Ensure loading is true during initialization
      try {
        console.log('[AuthContext] Initializing auth, calling getSession');
        const { data: { session: initialSession }, error: getSessionError } = await supabase.auth.getSession();
        
        if (getSessionError) {
          console.error('[AuthContext] Error getting initial session:', getSessionError);
        }
        console.log('[AuthContext] Initial session from getSession():', initialSession);
        setSession(initialSession);
        const initialUserData = await mapUserData(supabase, initialSession);
        console.log('[AuthContext] Initial userData mapped from getSession():', initialUserData);
        setUser(initialUserData);
      } catch (error) {
        console.error("[AuthContext] Error in initializeAuth:", error);
        setUser(null); // Reset user on error
      } finally {
        setIsLoading(false); // Ensure loading is set to false after initialization
      }
    };

    initializeAuth();

    return () => {
      subscription?.unsubscribe();
    };
  }, []); // Empty dependency array ensures this runs once on mount

  const login = async (email: string, password: string): Promise<boolean> => {
    //isLoading state is now managed by onAuthStateChange
    try {
      const { error } = await loginWithCredentials(supabase, toast, email, password);
      if (error) {
        // loginWithCredentials service already shows a toast for login failure
        return false; // Login attempt failed
      }
      // Successful Supabase login attempt. onAuthStateChange will handle user/session state.
      return true; 
    } catch (err) { 
      console.error('Login process error in AuthContext:', err);
      // This catch block might be redundant if loginWithCredentials handles all its errors
      // and returns an error object. However, it's good for unexpected issues.
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred during login.",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    //isLoading state is now managed by onAuthStateChange
    try {
      const { error } = await registerWithCredentials(supabase, toast, username, email, password);
      if (error) {
        // registerWithCredentials service already shows toasts
        return false;
      }
      // Successful Supabase registration. If email verification is not required,
      // onAuthStateChange will handle user/session state.
      // If email verification is required, user will remain null until verified.
      return true;
    } catch (err) {
      console.error('Registration process error in AuthContext:', err);
      toast({
        title: "Registration Failed",
        description: "An unexpected error occurred during registration.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = async () => {
    setIsLoading(true); // Indicate loading for logout process
    const { error } = await signOut(supabase, toast);
    // onAuthStateChange will set user and session to null and trigger isLoading to false.
    // We still navigate here explicitly.
    if (!error) {
      navigate('/login'); // Ensure redirection after logout
    }
    // If onAuthStateChange is robust, explicitly setting user/session/isLoading here might be redundant
    // but doesn't harm. The primary driver for isLoading will be onAuthStateChange's finally block.
    // For safety, ensure isLoading becomes false if onAuthStateChange doesn't fire quickly.
    if (error) setIsLoading(false); 
  };
  
  const refreshUserData = async (): Promise<void> => {
    if (!session?.user) return;
    setIsLoading(true);
    try {
      const userData = await mapUserData(supabase, session);
      setUser(userData);
    } catch (error) {
      console.error("[AuthContext] Error in refreshUserData:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserData = async (data: Partial<UserData>): Promise<UserData | null> => {
    if (!user) return null;
    // We don't set global isLoading here, as this is a background update.
    // Individual components initiating this can show their own loading state.
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
    
    // After updates, refresh the user data to ensure consistency
    await refreshUserData(); 
    // Return the user state which should have been updated by refreshUserData
    return user; 
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

