
import { Session, SupabaseClient } from '@supabase/supabase-js';
import { UserData } from '@/contexts/authTypes';
import { Database } from '@/integrations/supabase/types';

export const mapUserData = async (
  supabase: SupabaseClient<Database>,
  session: Session | null
): Promise<UserData | null> => {
  if (!session?.user) return null;

  const supabaseUser = session.user;

  try {
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', supabaseUser.id)
      .single();

    if (profileError) {
      console.error('Error fetching profile:', profileError);
      // It's possible the profile isn't created yet if handle_new_user trigger is slow or failed
      // For now, we'll return null, but this could be an area for more robust handling
      return null;
    }

    const { data: progressData, error: progressError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', supabaseUser.id)
      .maybeSingle();

    if (progressError && progressError.code !== 'PGRST116') { // PGRST116: no rows found
      console.error('Error fetching user progress:', progressError);
    }

    let userProgress = progressData;
    if (!userProgress) {
      const { data: newProgress, error: insertError } = await supabase
        .from('user_progress')
        .insert({
          user_id: supabaseUser.id,
          completed_lessons: [],
          completed_modules: [],
          quiz_scores: {},
          badges: ['first_login'],
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error creating user progress:', insertError);
        // If progress creation fails, we might still want to return partial user data
      } else {
        userProgress = newProgress;
      }
    }

    return {
      id: supabaseUser.id,
      username: profileData.username,
      email: profileData.email, // Supabase user email might be more up-to-date if changed
      points: profileData.points || 0,
      isAuthenticated: true,
      completedLessons: userProgress?.completed_lessons || [],
      completedModules: userProgress?.completed_modules || [],
      quizScores: (userProgress?.quiz_scores as Record<number, number>) || {},
      badges: userProgress?.badges || ['first_login'],
      role: profileData.role as 'student' | 'admin',
    };
  } catch (error) {
    console.error('Error mapping user data:', error);
    return null;
  }
};
