
import { UserData } from '@/contexts/AuthContext';

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

// Save user progress
export function saveUserProgress(userData: UserData, updates: Partial<UserData>): UserData {
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
  
  // In a real application, we would send this to the backend
  // For now we update localStorage
  localStorage.setItem('user', JSON.stringify(updatedUserData));
  
  // Update user data in all_users if it exists
  const allUsers = localStorage.getItem('all_users');
  if (allUsers) {
    try {
      const users = JSON.parse(allUsers);
      const updatedUsers = users.map((user: any) => {
        if (user.email === userData.email) {
          const { password, ...userDataWithoutPassword } = user;
          return {
            ...userDataWithoutPassword,
            ...updatedUserData,
            password // Keep the password
          };
        }
        return user;
      });
      localStorage.setItem('all_users', JSON.stringify(updatedUsers));
    } catch (error) {
      console.error('Failed to update user in all_users:', error);
    }
  }
  
  return updatedUserData;
}
