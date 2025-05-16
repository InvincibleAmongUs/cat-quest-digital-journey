
```markdown
# KB_Code_Dump_Src_Contexts.md - Source Code (src/contexts/)

This file contains the source code for files within the `src/contexts/` directory.

### src/contexts/AuthContext.tsx
```typescript
// Content for src/contexts/AuthContext.tsx was not provided in the prompt.
// This is a placeholder. It should contain the implementation of AuthContext.
// Example structure:
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client'; // Ensure this path is correct
import type { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  login: (email_param: string, password_param: string) => Promise<boolean>; // Made params unique
  register: (username_param: string, email_param: string, password_param: string) => Promise<boolean>; // Made params unique
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session_param) => {
      setSession(session_param);
      setUser(session_param?.user ?? null);
      setIsLoading(false);
      
      if (session_param?.user) {
        // Fetch profile to check role
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session_param.user.id)
          .single();
        if (error) {
          console.error("Error fetching profile for role:", error);
          setIsAdmin(false);
        } else {
          setIsAdmin(profile?.role === 'admin');
        }
      } else {
        setIsAdmin(false);
      }
    });

    // Initial session check
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      setIsLoading(false);
       if (initialSession?.user) {
        supabase.from('profiles').select('role').eq('id', initialSession.user.id).single().then(({data: profile, error}) => {
            if (!error && profile) setIsAdmin(profile.role === 'admin');
        });
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const login = async (email_param: string, password_param: string) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email_param, password: password_param });
    setIsLoading(false);
    if (error) {
      // console.error("Login error:", error.message);
      throw error; // Re-throw for AuthForm to handle with toast
    }
    return true;
  };

  const register = async (username_param: string, email_param: string, password_param: string) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({ 
      email: email_param, 
      password: password_param,
      options: {
        data: {
          username: username_param, // This goes into metadata, handled by `handle_new_user` trigger
        }
      }
    });
    setIsLoading(false);
    if (error) {
      // console.error("Registration error:", error.message);
      throw error; // Re-throw for AuthForm to handle with toast
    }
    return true;
  };

  const logout = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, login, register, logout, isAdmin }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```
