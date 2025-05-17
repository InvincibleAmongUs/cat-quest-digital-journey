
import { SupabaseClient, Session, User } from '@supabase/supabase-js';
import { UserData } from '@/contexts/authTypes';
import { Database } from '@/integrations/supabase/types';
import { UseToastReturnType } from '@/hooks/use-toast'; // Assuming useToast returns this type

type ToastType = UseToastReturnType['toast'];

export const loginWithCredentials = async (
  supabase: SupabaseClient<Database>,
  toast: ToastType,
  email: string,
  password: string
): Promise<{ session: Session | null; user: User | null; error: Error | null }> => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    toast({
      title: "Login Failed",
      description: error.message,
      variant: "destructive",
    });
    return { session: null, user: null, error: new Error(error.message) };
  }
  return { session: data.session, user: data.user, error: null };
};

export const registerWithCredentials = async (
  supabase: SupabaseClient<Database>,
  toast: ToastType,
  username: string,
  email: string,
  password: string
): Promise<{ session: Session | null; user: User | null; error: Error | null }> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username },
    },
  });

  if (error) {
    toast({
      title: "Registration Failed",
      description: error.message,
      variant: "destructive",
    });
    return { session: null, user: null, error: new Error(error.message) };
  }
  
  toast({
    title: "Registration Successful",
    description: "Your account has been created.",
  });

  if (!data.session) {
     toast({
        title: "Email Verification Required",
        description: "Please check your email to verify your account.",
      });
  }
  return { session: data.session, user: data.user, error: null };
};

export const signOut = async (
  supabase: SupabaseClient<Database>,
  toast: ToastType
): Promise<{ error: Error | null }> => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    toast({
      title: "Error",
      description: "Failed to log out. Please try again.",
      variant: "destructive",
    });
    return { error: new Error(error.message) };
  }
  toast({
    title: "Logged Out",
    description: "You've been successfully logged out.",
  });
  return { error: null };
};

export const updateUserProfileData = async (
  supabase: SupabaseClient<Database>,
  toast: ToastType,
  userId: string,
  profileUpdates: Partial<Pick<UserData, 'username' | 'points'>>
): Promise<{ error: Error | null }> => {
  const { error } = await supabase
    .from('profiles')
    .update(profileUpdates)
    .eq('id', userId);

  if (error) {
    console.error('Error updating profile:', error);
    toast({
      title: "Update Failed",
      description: "Failed to update profile information.",
      variant: "destructive",
    });
    return { error: new Error(error.message) };
  }
  return { error: null };
};

export const updateUserProgressData = async (
  supabase: SupabaseClient<Database>,
  toast: ToastType,
  userId: string,
  progressUpdates: Partial<Pick<UserData, 'completedLessons' | 'completedModules' | 'quizScores' | 'badges'>>
): Promise<{ error: Error | null }> => {
  const updatesToApply: any = {};
  if (progressUpdates.completedLessons) updatesToApply.completed_lessons = progressUpdates.completedLessons;
  if (progressUpdates.completedModules) updatesToApply.completed_modules = progressUpdates.completedModules;
  if (progressUpdates.quizScores) updatesToApply.quiz_scores = progressUpdates.quizScores;
  if (progressUpdates.badges) updatesToApply.badges = progressUpdates.badges;

  if (Object.keys(updatesToApply).length === 0) return { error: null };

  const { error } = await supabase
    .from('user_progress')
    .update(updatesToApply)
    .eq('user_id', userId);

  if (error) {
    console.error('Error updating user progress:', error);
    toast({
      title: "Update Failed",
      description: "Failed to update progress information.",
      variant: "destructive",
    });
    return { error: new Error(error.message) };
  }
  return { error: null };
};
