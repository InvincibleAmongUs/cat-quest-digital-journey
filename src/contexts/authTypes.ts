
import { Session } from '@supabase/supabase-js';

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

export interface AuthContextType {
  user: UserData | null;
  session: Session | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUserData: (data: Partial<UserData>) => Promise<UserData | null>;
  refreshUserData: () => Promise<void>;
}
