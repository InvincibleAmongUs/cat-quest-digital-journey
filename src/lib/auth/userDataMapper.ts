
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
      // If profile doesn't exist (e.g., trigger delay/failure), or other error
      // We might still want to return basic user info if session.user is available
      // but for now, sticking to null if profile fetch fails critical data.
      // If `handle_new_user` trigger guarantees profile creation, this is less of a concern.
      return null;
    }

    const { data: progressData, error: progressError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', supabaseUser.id)
      .maybeSingle();

    if (progressError && progressError.code !== 'PGRST116') { // PGRST116: no rows found
      console.error('Error fetching user progress:', progressError);
      // Don't return null here, as progress might be optional or can be created.
    }

    let userProgress = progressData;
    if (!userProgress && profileData) { // Ensure profileData exists before trying to create progress
      console.log(`No user progress found for ${supabaseUser.id}, creating new entry.`);
      const { data: newProgress, error: insertError } = await supabase
        .from('user_progress')
        .insert({
          user_id: supabaseUser.id,
          completed_lessons: [],
          completed_modules: [],
          quiz_scores: {},
          badges: ['first_login'], // ensure 'first_login' badge is an array
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error creating user progress:', insertError);
        // If progress creation fails, we proceed with defaults for progress fields
      } else {
        userProgress = newProgress;
        console.log(`New user progress created for ${supabaseUser.id}:`, newProgress);
      }
    }
    
    // Determine user role safely
    const roleValue = profileData.role;
    const userRole: 'student' | 'admin' = (roleValue === 'admin' || roleValue === 'student') ? roleValue : 'student';

    return {
      id: supabaseUser.id,
      username: profileData.username || `User_${supabaseUser.id.substring(0, 6)}`, // Fallback username
      email: supabaseUser.email || profileData.email || '', // Prioritize Supabase user email, then profile, then fallback
      points: profileData.points || 0,
      isAuthenticated: true,
      completedLessons: userProgress?.completed_lessons || [],
      completedModules: userProgress?.completed_modules || [],
      quizScores: (userProgress?.quiz_scores as Record<number, number>) || {},
      badges: userProgress?.badges && Array.isArray(userProgress.badges) ? userProgress.badges : ['first_login'],
      role: userRole,
    };
  } catch (error) {
    console.error('Error mapping user data:', error);
    return null;
  }
};

