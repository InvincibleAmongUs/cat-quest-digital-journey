
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  
  try {
    const supabaseAdmin = createClient(
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY
    );
    
    const supabaseClient = createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY,
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const url = new URL(req.url);
    const resourceType = url.searchParams.get('type') || 'chapter';
    const resourceId = url.searchParams.get('id') || '1';

    let responseData;
    
    if (resourceType === 'chapter') {
      const chapterId = resourceId;
      
      // Fetch text content from storage
      const { data: fileData, error: fileError } = await supabaseAdmin.storage
        .from('testtxt')
        .download(`Chapter-${chapterId}.txt`);
      
      if (fileError) {
        throw fileError;
      }
      
      // Convert blob to text
      const content = await fileData.text();
      
      // Extract image references from the content
      // In a production app, we would have more sophisticated parsing logic here
      const imageRefs = content.match(/\[Image: ([a-zA-Z0-9_.-]+)\]/g) || [];
      
      // Create URLs for each image reference
      const images = [];
      for (const imageRef of imageRefs) {
        const filename = imageRef.match(/\[Image: ([a-zA-Z0-9_.-]+)\]/)?.[1];
        if (filename) {
          const { data: { publicUrl } } = supabaseClient.storage
            .from('testimage')
            .getPublicUrl(filename);
          
          images.push({
            reference: filename,
            url: publicUrl,
          });
        }
      }
      
      responseData = {
        id: chapterId,
        content,
        images,
      };
    } else if (resourceType === 'imagelist') {
      // Fetch the image list file
      const { data: fileData, error: fileError } = await supabaseAdmin.storage
        .from('testtxt')
        .download('Chapter Images and tables List.txt');
      
      if (fileError) {
        throw fileError;
      }
      
      // Convert blob to text
      const content = await fileData.text();
      
      responseData = {
        content
      };
    } else {
      throw new Error('Invalid resource type');
    }
    
    return new Response(
      JSON.stringify(responseData),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});
