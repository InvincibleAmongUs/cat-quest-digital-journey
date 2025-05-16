
```markdown
# KB_File_Purpose_Src.md - Explanation of src/ Directory Files

This file (and its potential partitions) provides explanations for files and directories within the `src/` directory.

## Top-Level `src/` Files

### src/App.css
*   **Purpose:** A CSS file for global application styles or styles that are not easily managed by Tailwind CSS utility classes.
*   **Why it exists:** To define base styles or custom component styles that fall outside the scope of Tailwind's utility-first approach.
*   **Key Interactions:** Imported typically in `src/main.tsx` or `src/App.tsx` to apply styles globally.

### src/App.tsx
*   **Purpose:** The root component of the React application. It sets up global providers, routing, and the main application layout.
*   **Why it exists:** To serve as the entry point for the React component tree and to orchestrate high-level application concerns.
*   **Key Interactions:** Renders `AppRoutes`. Wraps the application with providers like `QueryClientProvider`, `TooltipProvider`, `BrowserRouter`, `AuthProvider`, `HelmetProvider`, and `ErrorBoundary`. Imports global styles and toasters.

### src/index.css
*   **Purpose:** The main CSS entry point, primarily used for importing Tailwind CSS base, components, and utilities, and defining custom CSS variables and base layer styles.
*   **Why it exists:** To initialize Tailwind CSS and provide a place for global CSS customizations that Tailwind relies on (like CSS custom properties for theming).
*   **Key Interactions:** Imported in `src/main.tsx`. Contains `@tailwind` directives and CSS variable definitions for light/dark themes.

### src/main.tsx
*   **Purpose:** The main entry point for the Vite application. It renders the root React component (`App.tsx`) into the DOM.
*   **Why it exists:** Standard entry file for React applications built with Vite. Initializes the React rendering process.
*   **Key Interactions:** Imports `App.tsx` and `index.css`. Performs environment variable validation. Uses `ReactDOM.createRoot()` to mount the application.

### src/routes.tsx
*   **Purpose:** Defines the application's routing structure using `react-router-dom`. It maps URL paths to specific page components.
*   **Why it exists:** To manage client-side navigation and determine which component to render for a given URL.
*   **Key Interactions:** Exports an `AppRoutes` component used by `App.tsx`. Uses `Routes` and `Route` components from `react-router-dom`. Implements `ProtectedRoute` and `AdminRoute` for route protection. Uses `React.lazy` and `Suspense` for code-splitting and lazy loading of page components.

### src/vite-env.d.ts
*   **Purpose:** TypeScript declaration file for Vite-specific environment variables. It provides type definitions for `import.meta.env`.
*   **Why it exists:** To enable TypeScript to understand the shape and types of environment variables exposed by Vite (e.g., `VITE_SUPABASE_URL`).
*   **Key Interactions:** Used by TypeScript during development and build to type-check access to `import.meta.env`.

### src/vite-raw-imports.d.ts
*   **Purpose:** TypeScript declaration file to support importing files as raw strings (e.g., `?raw` suffix in Vite).
*   **Why it exists:** To allow TypeScript to correctly type modules imported as raw text content, which might be used for loading Markdown or text files directly into components.
*   **Key Interactions:** Enables type-safe raw imports like `import myTextFile from './myText.txt?raw';`.

## Directories within `src/`

### src/components/
*   **Purpose:** Contains reusable UI components that are used across different parts of the application. This directory is further structured by feature or component type.
    *   **`accessibility/`**: Components related to accessibility features (e.g., `TextToSpeech.tsx`).
    *   **`achievements/`**: Components for displaying achievements or badges (e.g., `BadgeCard.tsx`).
    *   **`ai/`**: Components related to AI tool integrations (e.g., `AIConceptExplainer.tsx`).
    *   **`auth/`**: Components for authentication flows and route protection (e.g., `AuthForm.tsx`, `ProtectedRoute.tsx`).
    *   **`dashboard/`**: Components specific to the user dashboard (e.g., `ProgressOverview.tsx`).
    *   **`games/`**: Components for interactive educational games (e.g., `HardwareHunt.tsx`).
    *   **`knowledgebase/`**: Components for displaying knowledge base content (e.g., `ChapterViewer.tsx`).
    *   **`layout/`**: Components defining major layout structures like headers or sidebars (e.g., `AppHeader.tsx`).
    *   **`lessons/`**: Components for rendering lesson content, including various block types (e.g., `LessonContentDisplay.tsx`, `ContentBlockRenderer.tsx`).
    *   **`mascot/`**: Components related to any application mascot or assistant (e.g., `DataDragon.tsx`).
    *   **`quiz/`**: Components for displaying quizzes and questions (e.g., `QuizSection.tsx`, `QuizModal.tsx`).
    *   **`ui/`**: Generic, often low-level UI elements, many from shadcn/ui (e.g., `Button.tsx`, `Card.tsx`).
    *   **`user/`**: Components related to user profiles or user-specific information (e.g., `UserProgressTracker.tsx`).
*   **Why it exists:** To promote code reusability, maintainability, and a clear separation of concerns.

### src/contexts/
*   **Purpose:** Holds React Context providers for managing global or shared state across different parts of the component tree without prop drilling.
*   **Why it exists:** To provide a clean way to share state for concerns like authentication (`AuthContext.tsx`), theme, or other application-wide data.
*   **Key Interactions:** Contexts defined here (e.g., `AuthContext`) are used by `useContext` hooks in components that need access to the shared state. Providers wrap parts of the application in `App.tsx` or other high-level components.

### src/data/
*   **Purpose:** Stores static data, mock data, or initial data sets used by the application.
*   **Why it exists:** To centralize data that is not fetched from a backend or is used for initial seeding or examples.
*   **Key Interactions:** Files here (e.g., `moduleOneData.ts`) are imported by components or services that need this data.

### src/hooks/
*   **Purpose:** Contains custom React hooks (`useMyHook`) that encapsulate reusable stateful logic or side effects.
*   **Why it exists:** To promote logic reuse, simplify components, and manage complex state or side effects in a clean, composable way.
*   **Key Interactions:** Hooks defined here (e.g., `useAuth` from `AuthContext`, `useToast`, `use-mobile`) are imported and used within functional components. Hooks like `useSWR` would also be used here for data fetching.

### src/integrations/
*   **Purpose:** Manages integrations with external services, particularly the Supabase client setup.
*   **Why it exists:** To centralize the configuration and initialization of external SDKs or clients.
*   **Key Interactions:** `supabase/client.ts` initializes and exports the Supabase client instance, which is then imported by services or components that interact with Supabase. `supabase/types.ts` provides TypeScript definitions for the Supabase database schema (often auto-generated).

### src/knowledgebase/
*   **Purpose:** Contains the raw content and structured definitions for the educational material in the knowledge base and lessons.
    *   **`Chapter-X.txt` files:** Likely store raw text content for static knowledge base chapters.
    *   **`Chapter Images and tables List.txt`:** A manifest or list of visual assets used in the chapters.
    *   **`lessons/` subdirectory:** Contains TypeScript files (`lessonX.ts`) that define structured lesson data, including content blocks and quiz questions, using types from `lessons/types.ts`.
*   **Why it exists:** To separate educational content from presentation logic, making content management easier.
*   **Key Interactions:** `lessonX.ts` files export `LessonData` objects. `Chapter-X.txt` files are read by `utils/knowledgeBase.ts` (e.g., `loadChapterFromFile`). `lessons/index.ts` aggregates and exports lesson data.

### src/lib/
*   **Purpose:** A common directory name for general utility functions or helper libraries that don't fit neatly into other categories like `hooks` or `services`.
*   **Why it exists:** To provide a collection of miscellaneous helper functions that can be used throughout the application.
*   **Key Interactions:** `utils.ts` (from shadcn/ui) typically provides helper functions like `cn` for conditional class names.

### src/pages/
*   **Purpose:** Contains top-level components that correspond to different routes/views of the application. Each file typically represents a distinct page.
    *   **`admin/`**: Pages for the admin section.
    *   **`games/`**: Pages for different educational games.
*   **Why it exists:** To structure the application by its main views, making it easy to manage page-specific logic and layout.
*   **Key Interactions:** Components in this directory are mapped to URL paths in `src/routes.tsx`. They often fetch data (or use hooks that do) and compose various UI components from `src/components/` to build the page.

### src/services/
*   **Purpose:** Contains modules responsible for interacting with external APIs or backend services. This is where data fetching and submission logic often resides.
*   **Why it exists:** To encapsulate and centralize all API communication, making components cleaner and API logic reusable and testable.
*   **Key Interactions:** Functions in these files (e.g., `ContentService.ts`, `DeepseekService.ts`) make HTTP requests (e.g., using `fetch` or the Supabase client) to backend endpoints or third-party APIs. They are called by components, custom hooks, or page components.

### src/types/
*   **Purpose:** Contains shared TypeScript type definitions and interfaces used across the application.
*   **Why it exists:** To provide a central place for custom types, improving type safety and code clarity.
*   **Key Interactions:** Types defined here (e.g., in `index.ts`) are imported and used in components, hooks, services, and data files.

### src/utils/
*   **Purpose:** Contains utility functions and modules that provide various helper functionalities.
    *   **`api/`**: Specific utility functions related to API structuring or data transformation for API calls.
    *   **`images/`**: While this directory path exists, it primarily stores image assets. Actual utility functions related to images (if any) might be elsewhere or not present.
    *   **`knowledgeBase.ts`**: Utilities for loading and processing knowledge base chapter content from text files.
    *   **`textParser.ts`**: Utilities for parsing text content, possibly for the knowledge base or lessons.
    *   **`gamification.ts`**: Utilities related to game logic or scoring.
*   **Why it exists:** To house helper functions that don't involve React state/lifecycle (unlike hooks) and are not direct API services.
```
