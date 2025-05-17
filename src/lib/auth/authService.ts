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
  if (progressUpdates.completedLessons !== undefined) updatesToApply.completed_lessons = progressUpdates.completedLessons;
  if (progressUpdates.completedModules !== undefined) updatesToApply.completed_modules = progressUpdates.completedModules;
  if (progressUpdates.quizScores !== undefined) updatesToApply.quiz_scores = progressUpdates.quizScores;
  if (progressUpdates.badges !== undefined) updatesToApply.badges = progressUpdates.badges;

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

export const updateUserCombinedData = async (
  supabase: SupabaseClient<Database>,
  toast: ToastType,
  userId: string,
  data: Partial<UserData>
): Promise<{ hasError: boolean }> => {
  let opHasError = false;
  let updateAttempted = false;

  const profileUpdates: Partial<Pick<UserData, 'username' | 'points'>> = {};
  if (data.username !== undefined) profileUpdates.username = data.username;
  if (data.points !== undefined) profileUpdates.points = data.points;

  if (Object.keys(profileUpdates).length > 0) {
    updateAttempted = true;
    const { error: profileError } = await updateUserProfileData(supabase, toast, userId, profileUpdates);
    if (profileError) opHasError = true;
  }

  const progressUpdates: Partial<Pick<UserData, 'completedLessons' | 'completedModules' | 'quizScores' | 'badges'>> = {};
  if (data.completedLessons !== undefined) progressUpdates.completedLessons = data.completedLessons;
  if (data.completedModules !== undefined) progressUpdates.completedModules = data.completedModules;
  if (data.quizScores !== undefined) progressUpdates.quizScores = data.quizScores;
  if (data.badges !== undefined) progressUpdates.badges = data.badges;
  
  if (Object.keys(progressUpdates).length > 0) {
    updateAttempted = true;
    const { error: progressError } = await updateUserProgressData(supabase, toast, userId, progressUpdates);
    if (progressError) opHasError = true;
  }

  if (updateAttempted && !opHasError) {
    toast({
      title: "User Data Updated",
      description: "Your information has been successfully updated.",
    });
  }

  return { hasError: opHasError };
};
