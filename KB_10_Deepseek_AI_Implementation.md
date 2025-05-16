
```markdown
# KB_10_Deepseek_AI_Implementation.md: Deepseek AI Integration

This document provides a comprehensive explanation of the Deepseek AI integration within the "Cat Quest Digital Journey" application. It covers the architecture, data flow, file relationships, and usage of AI-powered features.

## 1. Purpose of Deepseek AI Integration

The Deepseek AI integration enhances the learning experience by providing intelligent tools for students. It powers features such as:

*   **AI Concept Explainer:** Allows students to get instant, clear explanations of CAT concepts.
*   **AI Content Summarizer:** Helps students quickly grasp the main points of lengthy texts or lesson content.
*   **AI Quiz Generator:** Enables students to create custom quizzes on specific topics for self-assessment and practice.

These tools leverage the capabilities of Deepseek's language models to provide dynamic and interactive educational support.

## 2. Core Architecture

The integration is designed with a client-server architecture, ensuring that the Deepseek API key remains secure on the backend.

### 2.1. Supabase Edge Function (`deepseek-proxy`)

*   **File:** `supabase/functions/deepseek-proxy/index.ts`
*   **Role:** This Edge Function acts as a secure backend proxy between the frontend application and the Deepseek API.
*   **Key Functionality:**
    *   Receives requests from the frontend (`DeepseekService.ts`).
    *   Retrieves the `DEEPSEEK_API_KEY` from Supabase environment variables (secrets). **This key is never exposed to the client-side.**
    *   Constructs the appropriate request payload for the Deepseek API.
    *   Forwards the request to the Deepseek API endpoint (`https://api.deepseek.com/v1/chat/completions`).
    *   Receives the response from Deepseek and relays it back to the frontend.
    *   Handles CORS (Cross-Origin Resource Sharing) to allow requests from the web application.
*   **API Key Management:** The `DEEPSEEK_API_KEY` must be configured as an environment variable/secret within your Supabase project settings. The Edge Function accesses it using `Deno.env.get('DEEPSEEK_API_KEY')`.

### 2.2. Frontend Service (`DeepseekService`)

*   **File:** `src/services/DeepseekService.ts`
*   **Role:** This TypeScript class serves as an abstraction layer in the frontend, simplifying interactions with the `deepseek-proxy` Edge Function for UI components.
*   **Key Methods:**
    *   `generateContent(payload: DeepseekRequestPayload)`: A generic method to call the proxy function.
    *   `explainConcept(concept: string)`: Constructs a prompt to explain a given concept and calls `generateContent`.
    *   `summarizeContent(content: string, bulletPoints: boolean)`: Constructs a prompt to summarize content (optionally in bullet points) and calls `generateContent`.
    *   `generateQuiz(topic: string, count: number)`: Constructs a prompt to generate a specified number of multiple-choice quiz questions on a topic, calls `generateContent`, and parses the JSON response.
*   **Interaction:** It uses `supabase.functions.invoke('deepseek-proxy', { body: payload })` to send requests to the Edge Function.

### 2.3. Frontend UI Components

These React components provide the user interface for interacting with the AI features. They are located in `src/components/ai/`.

*   **`AIConceptExplainer.tsx`:**
    *   Allows users to input a concept.
    *   On submit, calls `DeepseekService.explainConcept(concept)`.
    *   Displays the returned explanation.
    *   Handles loading states and displays toasts for errors or success.
*   **`AIContentSummarizer.tsx`:**
    *   Provides a textarea for users to paste content.
    *   Includes a switch to request summary in bullet points.
    *   On submit, calls `DeepseekService.summarizeContent(content, bulletPoints)`.
    *   Displays the generated summary.
*   **`AIQuizGenerator.tsx`:**
    *   Allows users to input a topic for quiz generation.
    *   On submit, calls `DeepseekService.generateQuiz(topic)`.
    *   Renders the generated multiple-choice questions with options.
    *   Allows users to select answers, submit the quiz, and view results with explanations.

These components are brought together and made accessible to the user on the `AIToolsPage`.

*   **`src/pages/AIToolsPage.tsx`:**
    *   Uses Shadcn UI's `Tabs` component to organize the three AI tools: Quiz Generator, Concept Explainer, and Content Summarizer.
    *   Each tab (`TabsTrigger`) corresponds to a `TabsContent` area that renders the respective AI component (`AIQuizGenerator`, `AIConceptExplainer`, or `AIContentSummarizer`).

## 3. Data Flow Example: AI Concept Explainer

1.  **User Interaction:** The user types a concept (e.g., "CPU Cache") into the input field in `AIConceptExplainer.tsx` and clicks "Explain."
2.  **Frontend Component Logic (`AIConceptExplainer.tsx`):**
    *   Sets a loading state.
    *   Calls `DeepseekService.explainConcept("CPU Cache")`.
3.  **Frontend Service Logic (`DeepseekService.ts`):**
    *   The `explainConcept` method constructs a prompt like: `"Explain the concept of "CPU Cache" in the context of Computer Applications Technology..."`.
    *   It then calls `this.generateContent({ prompt })`.
    *   `generateContent` makes an asynchronous call to the Supabase Edge Function: `supabase.functions.invoke('deepseek-proxy', { body: { prompt, model: 'deepseek-chat', ... } })`.
4.  **Supabase Edge Function Logic (`deepseek-proxy/index.ts`):**
    *   Receives the request body containing the prompt.
    *   Retrieves `DEEPSEEK_API_KEY` using `Deno.env.get('DEEPSEEK_API_KEY')`.
    *   Makes a `fetch` POST request to `https://api.deepseek.com/v1/chat/completions` including the API key in the `Authorization` header and the prompt in the body.
5.  **Deepseek API:** Processes the prompt and returns a JSON response containing the explanation.
6.  **Edge Function (Return):** Receives the response from Deepseek API and returns it to the `DeepseekService`.
7.  **Frontend Service (Return):**
    *   `generateContent` receives the data from the Edge Function.
    *   It extracts the actual explanation text from `response.choices[0].message.content`.
    *   The `explainConcept` method returns this string.
8.  **Frontend Component (Display):**
    *   `AIConceptExplainer.tsx` receives the explanation string.
    *   Updates its state to display the explanation to the user.
    *   Clears the loading state.

A similar data flow applies to the AI Content Summarizer and AI Quiz Generator, with variations in prompt construction and response parsing (especially for the quiz, which expects structured JSON).

## 4. API Interaction Details

*   **Endpoint:** `https://api.deepseek.com/v1/chat/completions` (as used in `deepseek-proxy/index.ts`).
*   **Model:** Primarily uses `deepseek-chat` as a default, but this can be overridden in the payload sent to the proxy.
*   **Request Structure (to Deepseek API):**
    ```json
    {
      "model": "deepseek-chat", // or other specified model
      "messages": [
        { "role": "system", "content": "You are an educational assistant for Computer Applications Technology (CAT) students." },
        { "role": "user", "content": "User's specific prompt here" }
      ],
      "max_tokens": 1000, // Default, can be overridden
      "temperature": 0.7 // Default, can be overridden
    }
    ```
*   **Prompts:**
    *   A system message sets the context for the AI (e.g., "You are an educational assistant...").
    *   The user's specific request (e.g., the concept to explain, content to summarize, topic for quiz questions) forms the user message.
    *   For quiz generation, the prompt in `DeepseekService.generateQuiz` specifically requests JSON output with a defined structure for questions, options, correct answers, and explanations.

## 5. Error Handling

*   **Edge Function:** Catches errors during the API call to Deepseek and returns a JSON error response with a 500 status.
*   **`DeepseekService.ts`:** Checks for errors in the response from the Edge Function. If an error is present or the expected data structure is missing, it throws an `Error`.
*   **UI Components (`AIConceptExplainer.tsx`, etc.):**
    *   Use `try...catch` blocks when calling methods from `DeepseekService`.
    *   Utilize the `useToast` hook to display user-friendly error messages (e.g., "Error explaining concept," "Failed to generate quiz").
    *   Manage loading states to provide feedback to the user during API calls.

## 6. Summary of File Relationships

*   **`AIToolsPage.tsx` (Page):**
    *   Imports and renders `AIQuizGenerator`, `AIConceptExplainer`, `AIContentSummarizer`.
*   **`AIQuizGenerator.tsx`, `AIConceptExplainer.tsx`, `AIContentSummarizer.tsx` (UI Components):**
    *   Import and use `DeepseekService` to interact with the AI.
    *   Import UI elements from `@/components/ui/...` (Button, Input, Card, etc.).
    *   Use `useToast` for notifications.
*   **`DeepseekService.ts` (Frontend Service):**
    *   Imports `supabase` client from `@/integrations/supabase/client` to call the Edge Function.
    *   Defines interfaces `DeepseekRequestPayload` and `DeepseekResponse`.
*   **`deepseek-proxy/index.ts` (Supabase Edge Function):**
    *   Server-side Deno TypeScript.
    *   No direct frontend imports but is called by `DeepseekService`.
    *   Securely uses `Deno.env.get('DEEPSEEK_API_KEY')`.

This structure ensures a modular, secure, and maintainable integration of Deepseek AI capabilities into the application.
```
