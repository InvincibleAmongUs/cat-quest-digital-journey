
```markdown
# KB_File_Purpose_Supabase.md - Explanation of supabase/ Directory Files

This file provides explanations for files and directories within the `supabase/` directory, which is used for Supabase project configuration and Edge Functions.

### supabase/config.toml
*   **Purpose:** The main configuration file for the Supabase CLI and local development environment. It specifies project settings, database configurations, authentication settings for local development, and function declarations.
*   **Why it exists:** To manage the local Supabase setup, allowing developers to work with a local instance of Supabase that mirrors the cloud environment. It's also used by the Supabase CLI for deploying changes (like database migrations and Edge Functions) to the linked Supabase project.
*   **Key Interactions:** Read by the Supabase CLI (`supabase start`, `supabase db push`, `supabase functions deploy`). Defines how local services (db, studio, auth) behave and how functions are packaged and deployed.

### supabase/functions/
*   **Purpose:** This directory contains the source code for Supabase Edge Functions. Edge Functions are serverless functions that run on Deno and can be used to execute backend logic, interact with the Supabase database, and call external APIs.
*   **Why it exists:** To allow developers to write custom backend logic that can be triggered via HTTP requests or database webhooks, without managing a traditional server.
*   **Key Interactions:** Each subdirectory typically represents a single Edge Function. `index.ts` (or `index.tsx`) within these subdirectories is the entry point for the function. Functions can use the Supabase JS library to interact with the database or call other Supabase services. They are deployed to the Supabase cloud.

    *   **`_shared/cors.ts`**:
        *   **Purpose:** A utility module to provide standard CORS (Cross-Origin Resource Sharing) headers for Edge Functions.
        *   **Why it exists:** To ensure that Edge Functions can be called from the frontend application hosted on a different domain/port, by correctly handling browser security policies.
        *   **Key Interactions:** Imported by individual Edge Functions to include in their HTTP responses, especially for preflight `OPTIONS` requests.

    *   **`check-badges/index.ts`**:
        *   **Purpose:** An Edge Function designed to check a user's progress and award badges based on predefined criteria.
        *   **Why it exists:** To automate the process of granting achievements to users as they interact with the learning platform.
        *   **Key Interactions:** Likely invoked by the frontend after a user completes a lesson, module, or quiz. It would interact with the `user_progress` and `badges` tables in the Supabase database.

    *   **`deepseek-proxy/index.ts`**:
        *   **Purpose:** An Edge Function that acts as a secure proxy for requests to the Deepseek AI API.
        *   **Why it exists:** To avoid exposing the Deepseek API key on the client-side. The frontend calls this Edge Function, which then makes the request to Deepseek using the API key stored securely as a Supabase secret.
        *   **Key Interactions:** Called by `src/services/DeepseekService.ts` from the frontend. It forwards requests to the Deepseek API and returns the response. Uses `Deno.env.get("DEEPSEEK_API_KEY")`.

    *   **`fetch-dynamic-content/index.ts`**:
        *   **Purpose:** An Edge Function intended to fetch or generate dynamic content for lessons or other parts of the application.
        *   **Why it exists:** To allow content to be more flexible or personalized than static files, potentially by querying a database or an external CMS.
        *   **Key Interactions:** Could be called by components that display dynamic content. Might interact with Supabase database tables storing content pieces.

    *   **`populate-initial-data/index.ts`**:
        *   **Purpose:** An Edge Function likely used for seeding the Supabase database with initial data (e.g., terms, modules, lessons, quiz questions) when setting up a new environment or resetting data.
        *   **Why it exists:** To automate the setup of necessary data for the application to function correctly, especially during development or testing.
        *   **Key Interactions:** Would perform insert operations into various Supabase database tables. Might be triggered manually or as part of a setup script.

### supabase/check-badges/index.ts (Duplicate entry in provided list)
*   **Purpose:** This appears to be a duplicate listing. The primary location for Edge Functions is within the `supabase/functions/` directory. If this file exists at `supabase/check-badges/index.ts` (outside the `functions` subdirectory), it might be an old or misplaced file.
*   **Why it exists:** Potentially an organizational error or an artifact from a previous structure.
*   **Key Interactions:** If active and deployed, it would function similarly to `supabase/functions/check-badges/index.ts`.
```
