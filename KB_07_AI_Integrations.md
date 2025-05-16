
```markdown
# KB_07_AI_Integrations.md

This document details the AI integrations present or planned in the "Cat Quest Digital Journey" application.

## Deepseek API Integration

*   **Purpose:** To leverage Deepseek AI for features such as concept explanation, content summarization, or quiz question generation.
*   **Architecture:**
    *   **Backend Proxy (Supabase Edge Function):**
        *   **File:** `supabase/functions/deepseek-proxy/index.ts`
        *   **Functionality:** Acts as a secure intermediary between the frontend and the Deepseek API.
        *   Receives requests (e.g., a prompt or content to process) from the frontend.
        *   Retrieves the `DEEPSEEK_API_KEY` from Supabase environment secrets (`Deno.env.get("DEEPSEEK_API_KEY")`). This is crucial for keeping the API key secure and not exposing it on the client-side.
        *   Forwards the request along with the API key to the actual Deepseek API endpoint.
        *   Returns the response from Deepseek API back to the frontend.
        *   Handles CORS to allow requests from the frontend application.
    *   **Frontend Service:**
        *   **File:** `src/services/DeepseekService.ts` (or similar)
        *   **Functionality:** Provides methods for frontend components to easily make requests to the `deepseek-proxy` Edge Function.
        *   Abstracts the HTTP call details (e.g., using `fetch` to POST to the Edge Function's URL).
    *   **Frontend Components:**
        *   Components like `AIConceptExplainer.tsx`, `AIContentSummarizer.tsx`, `AIQuizGenerator.tsx` (from `src/components/ai/`) would use the `DeepseekService` to send prompts/content and display the AI-generated results.

*   **Data Flow (Example for Concept Explanation):**
    1.  User inputs a concept they want explained in `AIConceptExplainer.tsx`.
    2.  `AIConceptExplainer.tsx` calls a method in `DeepseekService.ts` with the concept/prompt.
    3.  `DeepseekService.ts` makes an HTTP POST request to the `/deepseek-proxy` Edge Function URL, sending the prompt in the request body.
    4.  The `deepseek-proxy` Edge Function receives the request.
    5.  It retrieves the `DEEPSEEK_API_KEY`.
    6.  It makes a POST request to the Deepseek API (e.g., `https://api.deepseek.com/v1/chat/completions`) with the prompt and API key.
    7.  Deepseek API processes the prompt and returns a response (e.g., an explanation).
    8.  The Edge Function receives the Deepseek response and forwards it back to `DeepseekService.ts`.
    9.  `DeepseekService.ts` returns the AI-generated explanation to `AIConceptExplainer.tsx`.
    10. `AIConceptExplainer.tsx` displays the explanation to the user.

*   **Prompt Structures (Inferred/Example):**
    *   For chat completions (if using a chat model from Deepseek):
        ```json
        {
          "model": "deepseek-coder", // Or other suitable Deepseek model
          "messages": [
            {"role": "system", "content": "You are a helpful AI assistant for explaining Computer Applications Technology concepts clearly and concisely for students."},
            {"role": "user", "content": "Explain the concept of 'CPU cache'"}
          ]
        }
        ```
    *   The exact prompt structure will depend on the specific Deepseek model and API endpoint being used.

## Other AI/External API Integrations

*   **Algolia DocSearch (Planned - Part 2.B.4):**
    *   **Purpose:** To provide powerful, instant search functionality across the educational content (knowledge base, lessons).
    *   **Integration Type:** Third-party hosted service. Algolia crawls the publicly accessible content and builds a search index.
    *   **Frontend Implementation:** Embed Algolia's DocSearch widget/component (typically JavaScript) into the application (e.g., in `AppHeader.tsx` or on knowledge base pages).
    *   **Configuration:** Requires applying for Algolia DocSearch (free for open-source/public documentation), configuring the crawler, and then integrating the provided UI components.
    *   **API Keys:** Algolia will provide an API Key and Index Name, which are typically public and used in the frontend search component.

*   **No other specific AI or major external API integrations are evident from the provided file list and descriptions.** The application primarily revolves around its own content and the Supabase backend. Future integrations could include:
    *   Text-to-speech services (e.g., ElevenLabs, browser's SpeechSynthesis API).
    *   Plagiarism detection services.
    *   More advanced analytics services.
```
