
```markdown
# KB_02_Codebase_Architecture.md

## Conceptual Architectural Overview

The "Cat Quest Digital Journey" application follows a modern web application architecture, primarily a **Single Page Application (SPA)** with a **Backend-as-a-Service (BaaS)** model.

*   **Frontend (Client-Side):**
    *   Built with **React** and **TypeScript**, using **Vite** as the build tool and development server.
    *   Handles all UI rendering, user interactions, and client-side routing (`react-router-dom`).
    *   Manages application state through React's built-in mechanisms (local state, Context API) and server state with **Tanstack Query**. SWR is also planned for enhanced data fetching.
    *   Styling is achieved primarily with **Tailwind CSS**, complemented by pre-built components from **shadcn/ui** and potentially **DaisyUI**.
    *   Interacts with the backend (Supabase) for data, authentication, and custom logic.

*   **Backend (Supabase):**
    *   **Authentication:** Supabase Auth handles user registration, login, and session management.
    *   **Database:** A PostgreSQL database provided by Supabase stores application data (e.g., user profiles, progress, lesson content, quiz questions). Schema details are in `KB_04_Backend_Supabase.md`.
    *   **Storage:** (Assumed capability) Supabase Storage can be used for storing user-uploaded files or larger static assets like videos if needed.
    *   **Edge Functions:** Serverless functions (written in TypeScript/Deno) deployed on Supabase infrastructure handle custom backend logic. Examples include:
        *   Proxying requests to external APIs (e.g., `deepseek-proxy` for Deepseek AI).
        *   Performing actions requiring elevated privileges or complex computations (e.g., `check-badges`, `populate-initial-data`).
        *   Fetching or processing dynamic content (`fetch-dynamic-content`).

*   **External Services:**
    *   **Deepseek AI:** Integrated via an Edge Function proxy for AI-powered features.

**Interaction Flow (Typical):**
1.  User accesses the application in their browser.
2.  Vite serves the `index.html` and the initial JavaScript bundle.
3.  React takes over, mounts the `App` component.
4.  `AppRoutes` determines the current page based on the URL.
5.  Page components render, potentially fetching data from Supabase (directly or via Tanstack Query/SWR calls that use `src/services/` or Supabase client).
6.  User interactions trigger state changes, navigation, or further API calls.
7.  Authentication is handled by `AuthContext` interacting with Supabase Auth.
8.  Edge Functions are invoked for specific backend tasks not covered by direct Supabase client calls.

## Module/Component Relationship Map (High-Level)

*   **`main.tsx`**: Entry point, renders `App.tsx`.
*   **`App.tsx`**: Root component.
    *   Sets up global providers (`QueryClientProvider`, `TooltipProvider`, `BrowserRouter`, `AuthProvider`, `HelmetProvider`, `ErrorBoundary`).
    *   Renders `AppRoutes`.
*   **`routes.tsx` (`AppRoutes`)**: Defines application paths.
    *   Maps paths to Page components (from `src/pages/`).
    *   Uses `ProtectedRoute` and `AdminRoute` (from `src/components/auth/`) for access control.
        *   `ProtectedRoute`/`AdminRoute` use `AuthContext`.
*   **Page Components (`src/pages/`)**:
    *   Compose UI using components from `src/components/`.
    *   Fetch data using custom hooks, Tanstack Query/SWR, or services from `src/services/`.
    *   Example: `LessonPage.tsx` uses `LessonContentDisplay.tsx`, fetches lesson data.
*   **Service Modules (`src/services/`)**:
    *   Encapsulate API calls (e.g., `ContentService.ts`, `DeepseekService.ts`).
    *   Use Supabase client (from `src/integrations/supabase/client.ts`).
*   **Contexts (`src/contexts/`)**:
    *   `AuthContext.tsx`: Provides authentication state and functions, used by many components and protected routes.
*   **UI Components (`src/components/`)**:
    *   **`ui/`**: Generic, reusable (shadcn/ui based).
    *   Feature-specific components (e.g., `lessons/`, `quiz/`, `knowledgebase/`) use `ui/` components and domain-specific logic.
    *   `ContentBlockRenderer.tsx`: Dynamically renders different lesson block types.
*   **Data Definitions (`src/knowledgebase/lessons/` and `src/data/`)**:
    *   Provide structured content for lessons and modules.
*   **Supabase Edge Functions (`supabase/functions/`)**:
    *   Called by frontend services or triggered by Supabase events.
    *   Interact with Supabase DB/Auth or external APIs.

## Explanation of Key Directories

*   **`.github/workflows/`**: Contains GitHub Actions workflow configurations (e.g., `ci.yml` for Continuous Integration).
*   **`public/`**: Stores static assets (favicon, manifest.json, images, etc.) that are served directly by the web server and copied to the build output as-is.
*   **`src/`**: The heart of the application, containing all client-side source code.
    *   **`components/`**: Reusable React UI components, organized by feature or type. `ui/` often holds shadcn/ui components.
    *   **`contexts/`**: React Context API implementations for global state management (e.g., `AuthContext`).
    *   **`data/`**: Static data sources used by the application (e.g., `moduleOneData.ts`).
    *   **`hooks/`**: Custom React hooks for reusable stateful logic and side effects.
    *   **`images/`**: Although listed under `src/`, image assets are typically better placed in `public/` for direct serving or `src/assets/` if they are to be processed by Vite. The presence here might indicate direct imports handled by Vite. (Note: `src/utils/images/` also exists, suggesting a mix or a specific organizational choice).
    *   **`integrations/`**: Modules for setting up and configuring third-party service integrations, like the Supabase client.
    *   **`knowledgebase/`**: Contains raw content files (e.g., `.txt`) for the static knowledge base and TypeScript definitions for structured lesson content (`lessons/`).
    *   **`lib/`**: General utility functions, often including `cn` for Tailwind class merging from shadcn/ui.
    *   **`pages/`**: Top-level React components representing distinct application pages or views, mapped by the router.
    *   **`services/`**: Modules that abstract API calls and data fetching/mutation logic.
    *   **`types/`**: Shared TypeScript type definitions and interfaces.
    *   **`utils/`**: General utility functions and modules not fitting into hooks or services (e.g., parsers, specific logic for knowledge base).
*   **`supabase/`**: Configuration and code related to the Supabase backend.
    *   **`functions/`**: Source code for Supabase Edge Functions (serverless backend logic).
    *   `config.toml`: Configuration for the Supabase CLI and local development.
    *   (Typically also includes `migrations/` for database schema changes, though not explicitly detailed in provided file list contents).
```
