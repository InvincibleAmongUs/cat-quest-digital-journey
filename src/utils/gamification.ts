import { UserData } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

// Types for gamification system
export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  criteria: (userData: UserData) => boolean;
}

// Available badges in the system
export const availableBadges: Badge[] = [
  {
    id: "first_login",
    name: "First Login",
    description: "Started your digital journey",
    criteria: () => true // Always awarded
  },
  {
    id: "first_lesson",
    name: "Knowledge Seeker",
    description: "Completed your first lesson",
    criteria: (userData) => userData.completedLessons.length > 0
  },
  {
    id: "first_quiz",
    name: "Quiz Taker",
    description: "Completed your first quiz",
    criteria: (userData) => Object.keys(userData.quizScores).length > 0
  },
  {
    id: "perfect_quiz",
    name: "Perfect Score",
    description: "Aced a quiz with 100%",
    criteria: (userData) => Object.values(userData.quizScores).some(score => score === 100)
  },
  {
    id: "system_explorer",
    name: "System Explorer",
    description: "Completed the Introduction to Computers lesson",
    criteria: (userData) => userData.completedLessons.includes(1)
  },
  {
    id: "module_master",
    name: "Module Master",
    description: "Completed an entire module",
    criteria: (userData) => userData.completedModules.length > 0
  },
  {
    id: "admin_badge",
    name: "Administrator",
    description: "You have administrator privileges",
    criteria: (userData) => userData.role === 'admin'
  }
];

// Check for new badges based on user progress
export function checkForNewBadges(userData: UserData): string[] {
  const newBadges: string[] = [];
  
  availableBadges.forEach(badge => {
    if (!userData.badges.includes(badge.id) && badge.criteria(userData)) {
      newBadges.push(badge.id);
    }
  });
  
  return newBadges;
}

// Award points for various actions
export function awardPoints(action: 'lesson_complete' | 'quiz_complete' | 'perfect_score' | 'module_complete'): number {
  const pointsMap = {
    lesson_complete: 10,
    quiz_complete: 15,
    perfect_score: 25,
    module_complete: 50
  };
  
  return pointsMap[action];
}

// Save user progress to Supabase
export async function saveUserProgress(userData: UserData, updates: Partial<UserData>): Promise<UserData | null> {
  if (!userData.id) {
    console.error('Cannot save progress: User ID is missing');
    return null;
  }
  
  try {
    // Create updated user data
    const updatedUserData = {
      ...userData,
      completedLessons: [
        ...userData.completedLessons,
        ...(updates.completedLessons || [])
      ].filter((v, i, a) => a.indexOf(v) === i),
      completedModules: [
        ...userData.completedModules,
        ...(updates.completedModules || [])
      ].filter((v, i, a) => a.indexOf(v) === i),
      points: (userData.points || 0) + (updates.points || 0),
      quizScores: { ...userData.quizScores, ...(updates.quizScores || {}) },
      badges: [
        ...userData.badges,
        ...(updates.badges || [])
      ].filter((v, i, a) => a.indexOf(v) === i)
    };
    
    // Update points in profiles table
    if (updates.points) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ points: updatedUserData.points })
        .eq('id', userData.id);
      
      if (profileError) {
        console.error('Error updating user points:', profileError);
        return null;
      }
    }
    
    // Update progress in user_progress table
    const { error: progressError } = await supabase
      .from('user_progress')
      .update({
        completed_lessons: updatedUserData.completedLessons,
        completed_modules: updatedUserData.completedModules,
        quiz_scores: updatedUserData.quizScores,
        badges: updatedUserData.badges
      })
      .eq('user_id', userData.id);
    
    if (progressError) {
      console.error('Error updating user progress:', progressError);
      return null;
    }
    
    return updatedUserData;
  } catch (error) {
    console.error('Failed to save user progress:', error);
    return null;
  }
}

// Get badges information
export async function getBadgesInfo(badgeIds: string[]): Promise<Badge[]> {
  try {
    const { data, error } = await supabase
      .from('badges')
      .select('*')
      .in('id', badgeIds);
    
    if (error) {
      console.error('Error fetching badges:', error);
      return [];
    }
    
    return data as unknown as Badge[];
  } catch (error) {
    console.error('Failed to fetch badges:', error);
    return [];
  }
}

// Function to create a new edge function to check for new badges
export async function checkForNewBadgesServerSide(userId: string): Promise<string[]> {
  try {
    const { data, error } = await supabase.functions.invoke('check-badges', {
      body: { userId },
    });
    
    if (error) {
      console.error('Error invoking check-badges function:', error);
      return [];
    }
    
    return data.newBadges || [];
  } catch (error) {
    console.error('Failed to check for new badges:', error);
    return [];
  }
}