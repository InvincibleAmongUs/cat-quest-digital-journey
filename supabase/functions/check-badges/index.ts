
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Define badge criteria functions
const badgeCriteria: Record<string, (userData: any) => boolean> = {
  "first_login": () => true,
  "first_lesson": (userData) => userData.completed_lessons.length > 0,
  "first_quiz": (userData) => Object.keys(userData.quiz_scores).length > 0,
  "perfect_quiz": (userData) => {
    const scores = Object.values(userData.quiz_scores);
    return scores.some((score: any) => score === 100);
  },
  "system_explorer": (userData) => userData.completed_lessons.includes(1),
  "module_master": (userData) => userData.completed_modules.length > 0,
  "admin_badge": (userData) => userData.role === 'admin'
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId } = await req.json();
    
    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'userId is required' }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Create a Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.error('Error fetching profile:', profileError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch user profile', details: profileError }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // Get user progress
    const { data: progress, error: progressError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (progressError && progressError.code !== 'PGRST116') {
      console.error('Error fetching user progress:', progressError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch user progress', details: progressError }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // If no progress record yet, create one with initial first_login badge
    if (!progress) {
      const { data: newProgress, error: insertError } = await supabase
        .from('user_progress')
        .insert({
          user_id: userId,
          completed_lessons: [],
          completed_modules: [],
          quiz_scores: {},
          badges: ['first_login']
        })
        .select()
        .single();
      
      if (insertError) {
        console.error('Error creating user progress:', insertError);
        return new Response(
          JSON.stringify({ error: 'Failed to create user progress', details: insertError }), 
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        );
      }
      
      return new Response(
        JSON.stringify({ newBadges: ['first_login'] }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Combine user data for badge checking
    const userData = {
      ...progress,
      role: profile.role
    };

    // Get available badges from the database
    const { data: badgesData, error: badgesError } = await supabase
      .from('badges')
      .select('id');

    if (badgesError) {
      console.error('Error fetching badges:', badgesError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch badges', details: badgesError }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    const availableBadgeIds = badgesData.map(badge => badge.id);
    
    // Check for new badges
    const newBadges: string[] = [];
    
    availableBadgeIds.forEach(badgeId => {
      if (progress.badges.includes(badgeId)) {
        return; // User already has this badge
      }
      
      const criteriaFn = badgeCriteria[badgeId];
      if (criteriaFn && criteriaFn(userData)) {
        newBadges.push(badgeId);
      }
    });

    // If new badges found, update user progress
    if (newBadges.length > 0) {
      const updatedBadges = [...progress.badges, ...newBadges];
      
      const { error: updateError } = await supabase
        .from('user_progress')
        .update({ badges: updatedBadges })
        .eq('user_id', userId);

      if (updateError) {
        console.error('Failed to update badges:', updateError);
        return new Response(
          JSON.stringify({ error: 'Failed to update badges', details: updateError }), 
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        );
      }
    }

    return new Response(
      JSON.stringify({ newBadges }), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error checking badges:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(error) }), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
