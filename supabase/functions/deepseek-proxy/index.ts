
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// Define CORS headers for cross-origin requests
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
    const { prompt, model, maxTokens, temperature } = await req.json();
    
    // Get API key from environment variable
    const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY');
    
    if (!deepseekApiKey) {
      throw new Error('DeepSeek API key not configured');
    }

    // Make the API call to DeepSeek
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${deepseekApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'deepseek-chat',
        messages: [
          { role: 'system', content: 'You are an educational assistant for Computer Applications Technology (CAT) students.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: maxTokens || 1000,
        temperature: temperature || 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepSeek API error:', response.status, errorText);
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in deepseek-proxy function:', error);
    
    return new Response(JSON.stringify({ 
      error: error.message || 'An error occurred while processing your request' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
