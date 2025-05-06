
// Types for gamification system
export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  criteria: (userData: UserProgress) => boolean;
}

export interface UserProgress {
  completedLessons: number[];
  completedModules: number[];
  points: number;
  quizScores: Record<number, number>; // lessonId -> score
  badges: string[]; // badge IDs
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
  }
];

// Check for new badges based on user progress
export function checkForNewBadges(userData: UserProgress): string[] {
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

// Get user progress from localStorage
export function getUserProgress(): UserProgress {
  const userDataString = localStorage.getItem('user');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  
  if (!userData) {
    return {
      completedLessons: [],
      completedModules: [],
      points: 0,
      quizScores: {},
      badges: []
    };
  }
  
  // Ensure the user data has all the required fields
  return {
    completedLessons: userData.completedLessons || [],
    completedModules: userData.completedModules || [],
    points: userData.points || 0,
    quizScores: userData.quizScores || {},
    badges: userData.badges || [],
    ...userData
  };
}

// Save user progress to localStorage
export function saveUserProgress(progress: Partial<UserProgress>): void {
  const currentData = getUserProgress();
  const userDataString = localStorage.getItem('user');
  const userData = userDataString ? JSON.parse(userDataString) : {};
  
  const updatedUserData = {
    ...userData,
    completedLessons: [...currentData.completedLessons, ...(progress.completedLessons || [])].filter((v, i, a) => a.indexOf(v) === i),
    completedModules: [...currentData.completedModules, ...(progress.completedModules || [])].filter((v, i, a) => a.indexOf(v) === i),
    points: (currentData.points || 0) + (progress.points || 0),
    quizScores: { ...currentData.quizScores, ...(progress.quizScores || {}) },
    badges: [...currentData.badges, ...(progress.badges || [])].filter((v, i, a) => a.indexOf(v) === i)
  };
  
  localStorage.setItem('user', JSON.stringify(updatedUserData));
}
