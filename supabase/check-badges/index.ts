import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.32.0';

// Define badge criteria functions
const badgeCriteria = {
  "first_login": () => true,
  "first_lesson": (userData: any) => userData.completed_lessons.length > 0,
  "first_quiz": (userData: any) => Object.keys(userData.quiz_scores).length > 0,
  "perfect_quiz": (userData: any) => {
    const scores = Object.values(userData.quiz_scores);
    return scores.some((score: any) => score === 100);
  },
  "system_explorer": (userData: any) => userData.completed_lessons.includes(1),
  "module_master": (userData: any) => userData.completed_modules.length > 0,
  "admin_badge": (userData: any) => userData.role === 'admin'
};

// Define the available badges
const availableBadges = [
  "first_login",
  "first_lesson", 
  "first_quiz",
  "perfect_quiz",
  "system_explorer",
  "module_master",
  "admin_badge"
];

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId } = await req.json();
    
    if (!userId) {
      return new Response(JSON.stringify({ error: 'userId is required' }), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      });
    }

    // Create a Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError) {
      return new Response(JSON.stringify({ error: 'Failed to fetch user profile' }), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      });
    }

    // Get user progress
    const { data: progress, error: progressError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (progressError && progressError.code !== 'PGRST116') {
      return new Response(JSON.stringify({ error: 'Failed to fetch user progress' }), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      });
    }

    // If no progress record yet, no badges to check
    if (!progress) {
      return new Response(JSON.stringify({ newBadges: [] }), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Combine data for badge checking
    const userData = {
      ...progress,
      role: profile.role
    };

    // Check for new badges
    const newBadges: string[] = [];
    
    availableBadges.forEach(badgeId => {
      const hasBadge = progress.badges.includes(badgeId);
      const criteriaFn = (badgeCriteria as any)[badgeId];
      
      if (!hasBadge && criteriaFn && criteriaFn(userData)) {
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
      }
    }

    return new Response(JSON.stringify({ newBadges }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error checking badges:', error);
    
    return new Response(JSON.stringify({ error: 'Internal server error' }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500 
    });
  }
});