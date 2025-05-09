
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

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
    // Create a Supabase client with admin rights
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if this function is being called by an admin
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Authentication failed', details: authError }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }
    
    // Check if user is an admin
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
      
    if (profileError || profile.role !== 'admin') {
      return new Response(
        JSON.stringify({ error: 'Admin access required' }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 }
      );
    }
    
    // Populate Terms
    const terms = [
      {
        id: 1,
        title: "TERM 1",
        description: "Foundational Concepts & Hardware Essentials",
        summary: "Introduction to computers, computer management, hardware components, software essentials, and social implications.",
        image_url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
        icon: "Computer",
        order_index: 1
      },
      {
        id: 2,
        title: "TERM 2",
        description: "Software & Networks",
        summary: "Advanced software concepts, networking principles, operating systems, and digital solutions.",
        image_url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
        icon: "Layers",
        order_index: 2
      },
      {
        id: 3,
        title: "TERM 3",
        description: "Internet & Communications",
        summary: "Internet technologies, digital communication tools, web concepts, and online safety.",
        image_url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80",
        icon: "Globe",
        order_index: 3
      },
      {
        id: 4,
        title: "TERM 4",
        description: "Information Management & Consolidation",
        summary: "Information processing, data analysis, document creation, and year-end review.",
        image_url: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
        icon: "Database",
        order_index: 4
      }
    ];
    
    const { error: termsError } = await supabase
      .from('terms')
      .upsert(terms, { onConflict: 'id' });
    
    if (termsError) {
      console.error('Error populating terms:', termsError);
    }
    
    // Populate Badges
    const badges = [
      {
        id: "first_login",
        name: "First Login",
        description: "Started your digital journey",
        category: "general"
      },
      {
        id: "first_lesson",
        name: "Knowledge Seeker",
        description: "Completed your first lesson",
        category: "achievement"
      },
      {
        id: "first_quiz",
        name: "Quiz Taker",
        description: "Completed your first quiz",
        category: "achievement"
      },
      {
        id: "perfect_quiz",
        name: "Perfect Score",
        description: "Aced a quiz with 100%",
        category: "achievement"
      },
      {
        id: "system_explorer",
        name: "System Explorer",
        description: "Completed the Introduction to Computers lesson",
        category: "achievement"
      },
      {
        id: "module_master",
        name: "Module Master",
        description: "Completed an entire module",
        category: "achievement"
      },
      {
        id: "admin_badge",
        name: "Administrator",
        description: "You have administrator privileges",
        category: "role"
      }
    ];
    
    const { error: badgesError } = await supabase
      .from('badges')
      .upsert(badges, { onConflict: 'id' });
    
    if (badgesError) {
      console.error('Error populating badges:', badgesError);
    }
    
    // Populate Modules
    const modules = [
      {
        id: 1,
        title: "System Superstars",
        description: "Master computer systems, components and basic operations",
        long_description: "In this module, you'll learn about the essential components of computer systems, how they work together, and basic operations you need to master. From understanding hardware components to managing files and software, this module covers the fundamentals of computer technology.",
        image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
        term: 1,
        order_index: 1,
        is_locked: false
      },
      {
        id: 2,
        title: "Digital Citizenship HQ",
        description: "Ethics, safety and responsible technology use",
        long_description: "Learn about digital ethics, online safety, and how to be a responsible technology user in today's connected world.",
        image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        term: 1,
        order_index: 2,
        is_locked: false
      },
      {
        id: 3,
        title: "Word Wizardry Academy",
        description: "Master word processing skills and document creation",
        long_description: "Discover the power of word processing software and learn to create professional documents with advanced formatting techniques.",
        image_url: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
        term: 2,
        order_index: 3,
        is_locked: true
      },
      {
        id: 4,
        title: "Spreadsheet Sorcery School",
        description: "Learn data handling and calculations with spreadsheets",
        long_description: "Unlock the potential of spreadsheets for organizing data, performing calculations, and visualizing information effectively.",
        image_url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
        term: 2,
        order_index: 4,
        is_locked: true
      }
    ];
    
    const { error: modulesError } = await supabase
      .from('modules')
      .upsert(modules, { onConflict: 'id' });
    
    if (modulesError) {
      console.error('Error populating modules:', modulesError);
    }
    
    // Populate Lessons (simplified example - in production, you would add much more content)
    const lessons = [
      {
        id: 1,
        module_id: 1,
        title: "Introduction to Computers",
        description: "Learn basic computer concepts and terminology.",
        duration: "30 minutes",
        order_index: 1,
        is_challenge: false
      },
      {
        id: 2,
        module_id: 1,
        title: "Computer Management & File Organisation",
        description: "Master file organization and computer management skills.",
        duration: "45 minutes",
        order_index: 2,
        is_challenge: false
      },
      {
        id: 3,
        module_id: 1,
        title: "Hardware Components - The Building Blocks",
        description: "Explore the physical components that make up a computer system.",
        duration: "1 hour",
        order_index: 3,
        is_challenge: false
      }
    ];
    
    const { error: lessonsError } = await supabase
      .from('lessons')
      .upsert(lessons, { onConflict: 'id' });
    
    if (lessonsError) {
      console.error('Error populating lessons:', lessonsError);
    }
    
    // Populate Content Blocks for the first lesson
    const contentBlocks = [
      {
        lesson_id: 1,
        type: "heading",
        content: {
          text: "Introduction to Computers",
          level: 1
        },
        order_index: 1
      },
      {
        lesson_id: 1,
        type: "text",
        content: "Computers are electronic devices that process data according to a set of instructions. They have the ability to store, retrieve, and process data.",
        order_index: 2
      },
      {
        lesson_id: 1,
        type: "heading",
        content: {
          text: "What is a Computer?",
          level: 2
        },
        order_index: 3
      },
      {
        lesson_id: 1,
        type: "text",
        content: "A computer is an electronic device that manipulates information or data. It has the ability to store, retrieve, and process data. You may already know that you can use a computer to type documents, send email, play games, and browse the Web. You can also use it to edit or create spreadsheets, presentations, and even videos.",
        order_index: 4
      },
      {
        lesson_id: 1,
        type: "image",
        content: {
          src: "/src/utils/images/ch1_figure_1_5_computer_hardware_desktop.png",
          alt: "Computer Hardware Components",
          caption: "Figure 1.5: Main components of a desktop computer"
        },
        order_index: 5
      }
    ];
    
    const { error: contentBlocksError } = await supabase
      .from('content_blocks')
      .upsert(contentBlocks);
    
    if (contentBlocksError) {
      console.error('Error populating content blocks:', contentBlocksError);
    }
    
    // Populate Quiz Questions
    const quizQuestions = [
      {
        lesson_id: 1,
        question: "What is a computer?",
        options: [
          "A mechanical calculation device",
          "An electronic device that processes data according to instructions",
          "A communication device only",
          "A gaming console"
        ],
        correct_answer: 1,
        order_index: 1
      },
      {
        lesson_id: 1,
        question: "Which of the following is NOT a main component of a computer?",
        options: [
          "CPU",
          "Monitor",
          "Refrigerator",
          "Keyboard"
        ],
        correct_answer: 2,
        order_index: 2
      },
      {
        lesson_id: 1,
        question: "What is the function of RAM in a computer?",
        options: [
          "Permanent storage",
          "Processing calculations",
          "Displaying images",
          "Temporary memory for running programs"
        ],
        correct_answer: 3,
        order_index: 3
      }
    ];
    
    const { error: quizQuestionsError } = await supabase
      .from('quiz_questions')
      .upsert(quizQuestions);
    
    if (quizQuestionsError) {
      console.error('Error populating quiz questions:', quizQuestionsError);
    }
    
    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Initial data successfully populated",
        stats: {
          terms: terms.length,
          badges: badges.length,
          modules: modules.length,
          lessons: lessons.length,
          contentBlocks: contentBlocks.length,
          quizQuestions: quizQuestions.length
        }
      }), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error in data population:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to populate data', details: String(error) }), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
