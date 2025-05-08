
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

// Define types for our auth context
export interface UserData {
  id?: string;
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
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserData: (data: Partial<UserData>) => void;
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
  const navigate = useNavigate();

  // Load user data from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        // Ensure the role property exists
        if (!userData.role) {
          userData.role = 'student';
        }
        setUser(userData);
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Login function - to be replaced with an API call in the future
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Check for admin credentials
      if (email === 'admin' && password === 'admin') {
        const adminUser: UserData = {
          username: 'Administrator',
          email: 'admin@catalyst.edu',
          points: 1000,
          isAuthenticated: true,
          completedLessons: [],
          completedModules: [],
          quizScores: {},
          badges: ["admin_badge"],
          role: 'admin'
        };
        
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        
        toast({
          title: "Admin Access Granted",
          description: "Welcome to the admin dashboard.",
        });
        
        return true;
      }
      
      // In a real implementation, this would validate against a backend
      // For now, we'll simulate a successful login by finding the user in localStorage
      // or creating a new one if the email doesn't exist
      
      // Check if user exists in our "database"
      const allUsers = localStorage.getItem('all_users');
      const users = allUsers ? JSON.parse(allUsers) : [];
      const existingUser = users.find((u: any) => u.email === email);
      
      if (existingUser) {
        // In a real app, we would verify the password here
        // For demo purposes, we're just checking if the email exists
        if (existingUser.password !== password) {
          toast({
            title: "Login Failed",
            description: "Incorrect password. Please try again.",
            variant: "destructive",
          });
          return false;
        }
        
        const userData: UserData = {
          username: existingUser.username,
          email: existingUser.email,
          points: existingUser.points || 50,
          isAuthenticated: true,
          completedLessons: existingUser.completedLessons || [],
          completedModules: existingUser.completedModules || [],
          quizScores: existingUser.quizScores || {},
          badges: existingUser.badges || ["first_login"],
          role: 'student'
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
        
        return true;
      } else {
        toast({
          title: "Login Failed",
          description: "User not found. Please register first.",
          variant: "destructive",
        });
        return false;
      }
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

  // Register function - to be replaced with an API call in the future
  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      // In a real implementation, this would create a user in the backend
      // For now, we'll simulate storing in localStorage
      
      // Check if user already exists
      const allUsers = localStorage.getItem('all_users');
      const users = allUsers ? JSON.parse(allUsers) : [];
      
      if (users.some((u: any) => u.email === email)) {
        toast({
          title: "Registration Failed",
          description: "A user with this email already exists.",
          variant: "destructive",
        });
        return false;
      }
      
      // Create new user
      const newUser = {
        username,
        email,
        password, // In a real app, this would be hashed
        points: 50,
        isAuthenticated: true,
        completedLessons: [],
        completedModules: [],
        quizScores: {},
        badges: ["first_login"],
        role: 'student' as const
      };
      
      // Save to our "database"
      users.push(newUser);
      localStorage.setItem('all_users', JSON.stringify(users));
      
      // Set as current user
      const userData: UserData = { ...newUser };
      delete (userData as any).password; // Don't keep password in memory
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created.",
      });
      
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
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
    
    toast({
      title: "Logged Out",
      description: "You've been successfully logged out.",
    });
  };

  // Update user data
  const updateUserData = (data: Partial<UserData>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
