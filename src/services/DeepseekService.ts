
import { supabase } from '@/integrations/supabase/client';

/**
 * Interface for DeepSeek request payload
 */
export interface DeepseekRequestPayload {
  prompt: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

/**
 * Interface for DeepSeek response 
 */
export interface DeepseekResponse {
  id?: string;
  choices?: Array<{
    message: { 
      content: string;
      role: string;
    };
    finish_reason?: string;
  }>;
  error?: string;
}

/**
 * Service for interacting with the DeepSeek AI API
 */
export class DeepseekService {
  /**
   * Calls the DeepSeek API via our Supabase Edge Function proxy
   * @param payload The request payload containing prompt and optional parameters
   * @returns The DeepSeek API response
   */
  static async generateContent(payload: DeepseekRequestPayload): Promise<DeepseekResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('deepseek-proxy', {
        body: payload
      });

      if (error) {
        console.error('Error calling DeepSeek proxy:', error);
        return { error: error.message || 'Failed to call DeepSeek API' };
      }

      return data;
    } catch (error) {
      console.error('Exception calling DeepSeek proxy:', error);
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Generate quiz questions based on a topic
   * @param topic The topic to generate questions about
   * @param count Number of questions to generate
   * @returns An array of quiz questions with options
   */
  static async generateQuiz(topic: string, count: number = 5): Promise<any> {
    const prompt = `Generate ${count} multiple-choice questions about "${topic}" for Computer Applications Technology students. 
    Format the response as JSON with the following structure:
    [
      {
        "question": "Question text",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": 0, // Index of the correct answer (0-based)
        "explanation": "Brief explanation of the correct answer"
      }
    ]`;

    const response = await this.generateContent({ 
      prompt,
      temperature: 0.3 // Lower temperature for more predictable formatting
    });

    if (response.error || !response.choices || response.choices.length === 0) {
      throw new Error(response.error || 'No content generated');
    }

    try {
      // Extract the JSON content from the response
      const content = response.choices[0].message.content;
      const jsonMatch = content.match(/\[\s*\{.*\}\s*\]/s);
      
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        // If no JSON structure found, try to parse the whole content
        return JSON.parse(content);
      }
    } catch (error) {
      console.error('Failed to parse quiz content:', error);
      throw new Error('Generated content was not in the expected format');
    }
  }

  /**
   * Generate explanation for a concept
   * @param concept The concept to explain
   * @returns An explanation of the concept
   */
  static async explainConcept(concept: string): Promise<string> {
    const prompt = `Explain the concept of "${concept}" in the context of Computer Applications Technology. 
    Provide a clear, concise explanation suitable for Grade 10 students.`;

    const response = await this.generateContent({ prompt });

    if (response.error || !response.choices || response.choices.length === 0) {
      throw new Error(response.error || 'No content generated');
    }

    return response.choices[0].message.content;
  }

  /**
   * Generate summaries of content
   * @param content The content to summarize
   * @param bulletPoints Whether to format as bullet points
   * @returns A summary of the content
   */
  static async summarizeContent(content: string, bulletPoints: boolean = true): Promise<string> {
    const format = bulletPoints ? 'as 3-5 concise bullet points' : 'in 2-3 paragraphs';
    const prompt = `Summarize the following content ${format}:\n\n${content}`;

    const response = await this.generateContent({ prompt });

    if (response.error || !response.choices || response.choices.length === 0) {
      throw new Error(response.error || 'No content generated');
    }

    return response.choices[0].message.content;
  }
}
