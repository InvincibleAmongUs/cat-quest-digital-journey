
```markdown
# KB_04_Backend_Supabase.md - Backend (Supabase) Details

This document outlines how Supabase is currently utilized in the "Cat Quest Digital Journey" application, based on the provided codebase information.

## Supabase Services Currently Utilized

*   **Authentication (Supabase Auth):**
    *   User registration (sign-up) and login (sign-in) with email and password are implemented via `AuthForm.tsx` and `AuthContext.tsx`.
    *   Session management (tracking logged-in users) is handled.
    *   A `handle_new_user` database trigger exists to populate a `profiles` table upon new user creation in `auth.users`. This trigger also assigns an 'admin' role based on a specific email address.
    *   `AuthContext` listens to `onAuthStateChange` to keep UI in sync.

*   **Database (Supabase Postgres):**
    *   The application interacts with a PostgreSQL database.
    *   Tables identified (from `<supabase-tables>` context):
        *   `user_progress`: Tracks user's completed lessons, modules, quiz scores, and badges.
        *   `modules`: Stores information about learning modules (term, order, title, description).
        *   `quiz_questions`: Contains questions, options, and correct answers for quizzes, linked to lessons.
        *   `lessons`: Defines individual lessons within modules (order, title, description).
        *   `badges`: Stores details about available badges (id, name, description, image).
        *   `terms`: Defines learning terms (order, title, description).
        *   `games`: Stores information about available games (id, title, description, content).
        *   `content_blocks`: Stores individual content pieces for lessons (lesson_id, type, content, order).
        *   `profiles`: Stores additional user information like points, username, email, and role, linked to `auth.users.id`.
    *   Database functions:
        *   `handle_new_user()`: Trigger function to create a profile on new user signup.
        *   `update_updated_at()`: Trigger function to automatically update `updated_at` timestamps on row updates (though not explicitly shown linked to a trigger for a specific table in the provided RLS/trigger info, it's a common pattern).

*   **Edge Functions (Supabase Functions):**
    *   The `supabase/functions/` directory indicates usage of serverless functions.
    *   Identified functions from directory structure and prompt:
        *   `check-badges`: Likely for awarding badges based on user progress.
        *   `deepseek-proxy`: Proxies requests to the Deepseek AI API, presumably to protect API keys.
        *   `fetch-dynamic-content`: For fetching or generating dynamic lesson content.
        *   `populate-initial-data`: For seeding the database with initial data.
    *   These functions are written in TypeScript and run on Deno.
    *   They use a shared `cors.ts` for CORS header management.

*   **Storage (Supabase Storage):**
    *   While no specific storage buckets were listed as created in the `<supabase-configuration>` context, Supabase Storage is a core Supabase feature.
    *   Image paths in lesson data (e.g., `src: "/src/utils/images/ch1_figure_1_3_information_processing_cycle.png"`) suggest that images are currently served from the application's static assets. If Supabase Storage were used for these, paths would typically point to the Supabase Storage URL.
    *   It's a likely candidate for storing user-generated content or larger media files in the future.

## Database Schema Summary

(Based on tables listed in `<supabase-tables>` context from the prompt)

*   **`profiles`**:
    *   `id` (uuid, PK, FK to `auth.users.id`)
    *   `points` (integer, default 0)
    *   `username` (text)
    *   `email` (text)
    *   `role` (text, default 'student') - 'admin' role is assigned by `handle_new_user` trigger for a specific email.
*   **`terms`**:
    *   `id` (integer, PK, auto-increment)
    *   `order_index` (integer)
    *   `title` (text)
    *   `description` (text)
    *   `summary` (text, nullable)
    *   `image_url` (text, nullable)
    *   `icon` (text, nullable)
*   **`modules`**:
    *   `id` (integer, PK, auto-increment)
    *   `term` (integer, likely FK to `terms.id`)
    *   `order_index` (integer)
    *   `title` (text)
    *   `description` (text)
    *   `long_description` (text, nullable)
    *   `image_url` (text, nullable)
    *   `is_locked` (boolean, default true)
*   **`lessons`**:
    *   `id` (integer, PK, auto-increment)
    *   `module_id` (integer, FK to `modules.id`)
    *   `order_index` (integer)
    *   `title` (text)
    *   `description` (text)
    *   `duration` (text, nullable)
    *   `is_challenge` (boolean, default false)
*   **`content_blocks`**:
    *   `id` (integer, PK, auto-increment)
    *   `lesson_id` (integer, FK to `lessons.id`)
    *   `type` (text, e.g., 'text', 'image', 'heading')
    *   `content` (jsonb, stores block-specific data)
    *   `order_index` (integer)
*   **`quiz_questions`**:
    *   `id` (integer, PK, auto-increment)
    *   `lesson_id` (integer, FK to `lessons.id`)
    *   `question` (text)
    *   `options` (array of text)
    *   `correct_answer` (integer, index of correct option)
    *   `order_index` (integer)
*   **`user_progress`**:
    *   `id` (uuid, PK)
    *   `user_id` (uuid, FK to `auth.users.id` or `profiles.id`)
    *   `completed_lessons` (array of integer, lesson IDs)
    *   `completed_modules` (array of integer, module IDs)
    *   `quiz_scores` (jsonb, e.g., `{"lessonId_quizId": score}`)
    *   `badges` (array of text, badge IDs, default `{'first_login'}`)
    *   `created_at`, `updated_at` (timestamptz)
*   **`badges`**:
    *   `id` (text, PK, e.g., 'first_login', 'module_master_1')
    *   `name` (text)
    *   `description` (text)
    *   `image_url` (text, nullable)
    *   `category` (text, default 'general')
*   **`games`**:
    *   `id` (text, PK)
    *   `title` (text)
    *   `description` (text)
    *   `icon` (text, nullable)
    *   `color` (text, nullable)
    *   `content` (jsonb, game-specific configuration/data)

**Relationships (Inferred):**
*   `terms` -> `modules` (one-to-many)
*   `modules` -> `lessons` (one-to-many)
*   `lessons` -> `content_blocks` (one-to-many)
*   `lessons` -> `quiz_questions` (one-to-many)
*   `profiles` (users) -> `user_progress` (one-to-one, based on `user_id`)

## Authentication Setup Overview

*   **Provider:** Email/Password.
*   **Client-Side Logic:**
    *   `AuthForm.tsx` handles UI for login and registration.
    *   `AuthContext.tsx` manages authentication state (user, session, loading status) and provides `login`, `register`, `logout` functions that interact with `supabase.auth`.
    *   `ProtectedRoute.tsx` and `AdminRoute.tsx` restrict access to routes based on authentication status and user role (admin role from `profiles` table).
*   **Supabase Backend:**
    *   `auth.users` table (managed by Supabase) stores core user credentials.
    *   `handle_new_user` trigger on `auth.users` (AFTER INSERT) populates the public `profiles` table with additional user details (username, email, initial points, role).
    *   The admin role is specifically assigned if the new user's email is `24529974@mylife.unisa.ac.za`.

## Row Level Security (RLS) Implementation

*   The provided `<supabase-tables>` context did not list specific RLS policies for most tables.
*   However, standard best practice with Supabase is to **enable RLS by default** for all tables containing user-specific or sensitive data and then create policies to allow specific access (SELECT, INSERT, UPDATE, DELETE).
*   **Example (Expected for `user_progress`):**
    *   `CREATE POLICY "Users can view their own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id);`
    *   `CREATE POLICY "Users can insert their own progress" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);`
    *   (Similar policies for UPDATE and DELETE).
*   **It is crucial to review and implement RLS policies for all relevant tables (e.g., `user_progress`, `profiles` for updates by self) to ensure data security and privacy.** The prompt Part 2.A.4 explicitly requests a review/implementation of Supabase RLS.

## Supabase Storage Usage

*   As of the information provided, no specific storage buckets are listed under `<storage-buckets>`.
*   The application currently seems to serve images from `src/utils/images/` or external URLs.
*   Supabase Storage could be used in the future for:
    *   User profile pictures.
    *   Larger lesson assets (videos, downloadable files).
    *   Content images if they need to be managed dynamically outside the codebase.

## Edge Functions Overview

*   **`check-badges`**:
    *   **Purpose:** Award badges based on user achievements.
    *   **Invocation:** Likely HTTP POST request from the frontend after specific actions (e.g., lesson completion).
    *   **Interaction:** Reads `user_progress`, checks criteria, updates `user_progress.badges`.
*   **`deepseek-proxy`**:
    *   **Purpose:** Securely proxy requests to the Deepseek AI API.
    *   **Invocation:** HTTP POST from frontend (`DeepseekService.ts`).
    *   **Interaction:** Takes prompt from request, adds API key from environment (`Deno.env.get("DEEPSEEK_API_KEY")`), calls Deepseek API, returns response.
*   **`fetch-dynamic-content`**:
    *   **Purpose:** Provide dynamic lesson content.
    *   **Invocation:** HTTP GET/POST from frontend when dynamic content is needed.
    *   **Interaction:** Could query Supabase DB or other sources for content.
*   **`populate-initial-data`**:
    *   **Purpose:** Seed database with initial/default data.
    *   **Invocation:** Likely manual trigger or part of a deployment/setup script.
    *   **Interaction:** Performs INSERT operations into various database tables (`terms`, `modules`, `lessons`, `quiz_questions`, `badges`, `games`).
```
