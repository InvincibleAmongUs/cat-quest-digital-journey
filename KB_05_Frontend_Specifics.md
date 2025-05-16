
```markdown
# KB_05_Frontend_Specifics.md

This document details various aspects of the frontend implementation of the "Cat Quest Digital Journey" application.

## Routing Configuration

*   **File:** `src/routes.tsx`
*   **Library:** `react-router-dom` (v6)
*   **Key Features:**
    *   Defines all application paths using `<Routes>` and `<Route>` components.
    *   **Public Routes:** `/`, `/login`.
    *   **Protected Routes:** Most application features (`/dashboard`, `/modules/*`, `/lessons/*`, `/achievements`, `/profile`, `/knowledge-base/*`, `/games/*`, `/terms`, `/ai-tools`) are wrapped with `ProtectedRoute`.
    *   **Admin Routes:** Admin-specific pages (`/admin/*`) are wrapped with `AdminRoute`.
    *   **Dynamic Segments:** Used for module IDs, lesson IDs, chapter IDs, term IDs (e.g., `/modules/:moduleId`, `/knowledge-base/:chapterId`).
    *   **Not Found:** A `*` path routes to `NotFound.tsx`.
    *   **Lazy Loading:** `React.lazy()` and `<Suspense>` are used for some page components (e.g., `LessonPage.tsx`) to enable code-splitting and improve initial load times (as per Part 2.A.3 request). A `RouteFallback` component is shown during loading.
    *   **Error Boundary:** The entire `AppRoutes` component is wrapped in an `ErrorBoundary` for route-level error handling.

## State Management Strategy

The application employs a mix of state management techniques:

*   **Component Local State (`useState`, `useReducer`):** Used for managing state that is specific to individual components (e.g., form input values in `AuthForm.tsx`, quiz answers in `QuizModal.tsx` and `LessonContent.tsx`, loading states in `ChapterViewer.tsx`).
*   **React Context API:**
    *   `AuthContext.tsx`: Manages global authentication state (user, session, loading status, isAdmin) and provides authentication functions (`login`, `register`, `logout`). This context is used extensively for access control and displaying user-specific information.
    *   (Part 2.A.1 requested refactoring for prop-drilling, potentially leading to more context usage, e.g., `LessonContext`, `ModuleContext`).
*   **Custom Hooks:**
    *   `useAuth()`: Consumes `AuthContext`.
    *   `useToast()`: Likely interacts with the `Toaster` component for displaying notifications.
    *   `use-mobile()`: A hook to detect if the application is being viewed on a mobile device (implementation details not shown).
    *   (Data fetching logic, previously in components, is intended to be moved to custom hooks using SWR/Tanstack Query as per Part 2.A.2).
*   **Server State Management (Data Fetching & Caching):**
    *   **Tanstack Query (`@tanstack/react-query`):** Initialized in `App.tsx` with `QueryClientProvider`. Used for fetching, caching, synchronizing, and updating server state. Specific usage patterns (e.g., `useQuery` calls) would be in page components or custom data-fetching hooks.
    *   **SWR:** Requested to be integrated (Part 2.A.2) as an alternative or complement to Tanstack Query for data fetching, providing features like automatic caching and revalidation.

## Custom Hooks Overview (`src/hooks/`)

*   **`useAuth()` (from `src/contexts/AuthContext.tsx`):**
    *   **Purpose:** Provides easy access to authentication state (user, session, isLoading, isAdmin) and methods (`login`, `register`, `logout`).
    *   **Key Interactions:** Consumes `AuthContext`. Used by components needing auth info or functions.
*   **`useToast()` (from `src/components/ui/use-toast.ts` or `src/hooks/use-toast.ts`):**
    *   **Purpose:** A hook to trigger toast notifications.
    *   **Key Interactions:** Likely calls a function that adds a toast to a global toast state managed by the `Toaster` component. Used in `AuthForm.tsx`, `LessonContent.tsx`.
*   **`use-mobile.tsx`:**
    *   **Purpose:** Detects if the current viewport matches mobile screen sizes.
    *   **Key Interactions:** Typically uses `window.matchMedia` and `useEffect` to listen for screen size changes. Returns a boolean. (Implementation details not fully visible).
*   **Data Fetching Hooks (Planned/To be refactored):**
    *   Hooks like `useFetchChapter`, `useLessonData`, `useModuleContext` were mentioned as candidates for creation/refactoring to centralize data fetching logic (Part 1.A.2, Part 2.A.1, Part 2.A.2), likely using Tanstack Query or SWR.

## Contexts Overview (`src/contexts/`)

*   **`AuthContext.tsx` (`AuthProvider`, `useAuth`):**
    *   **Purpose:** Manages and provides global authentication state (user, session, loading status, isAdmin role) and authentication methods (`login`, `register`, `logout`).
    *   **State Managed:** `user`, `session`, `isLoading`, `isAdmin`.
    *   **Key Interactions:** Wraps the main application in `App.tsx`. Interacts with `supabase.auth` for all authentication operations. User role (`isAdmin`) is determined by fetching from the `profiles` table.

## Services/API Interaction (`src/services/`)

*   **`ContentService.ts`:**
    *   **Purpose:** Likely handles fetching educational content, such as lesson data, module information, or knowledge base articles, from the Supabase backend.
    *   **Key Interactions:** Makes calls to Supabase (e.g., `supabase.from('lessons').select()`).
*   **`DeepseekService.ts`:**
    *   **Purpose:** Interacts with the Deepseek AI API, presumably by calling the `deepseek-proxy` Supabase Edge Function.
    *   **Key Interactions:** Sends prompts to the proxy function and receives AI-generated responses. Used by AI-related components.
*   **`utils/api/` (subdirectory with `lessonApi.ts`, `moduleApi.ts`, `quizApi.ts`):**
    *   **Purpose:** These files seem to further organize API interaction logic, likely focused on specific data types (lessons, modules, quizzes). They would use the Supabase client.
    *   **Key Interactions:** Export functions to fetch or manipulate data related to their domain.

## UI Component Library Overview

*   **`src/components/ui/`:** This directory hosts a collection of reusable, low-level UI components, largely based on **shadcn/ui**. These components are built using Tailwind CSS and often Radix UI primitives.
    *   Examples: `Button.tsx`, `Card.tsx`, `Input.tsx`, `Dialog.tsx`, `Sheet.tsx`, `NavigationMenu.tsx`, `Toaster.tsx`, `Sonner.tsx` (for different style of toasts), etc.
    *   **Role:** Provide a consistent and accessible set of building blocks for the application's interface. They are highly customizable via props and Tailwind classes.
*   **Feature-Specific Components (`src/components/[feature]/`):**
    *   Higher-level components built by composing `ui/` components and adding feature-specific logic.
    *   Examples: `AuthForm.tsx`, `LessonContentDisplay.tsx`, `ChapterViewer.tsx`, `QuizModal.tsx`.

## Styling Approach

*   **Primary Tool:** Tailwind CSS. Utility classes are used extensively for styling directly in the JSX of components.
*   **Configuration:** `tailwind.config.ts`
    *   **Dark Mode:** Implemented using the `class` strategy (`darkMode: ["class"]`). Dark mode styles are applied using `dark:` variants. A theme toggle mechanism (e.g., button in `AppHeader.tsx`) would typically manage adding/removing the `dark` class from the `<html>` element and persisting the preference in `localStorage`.
    *   **Theme Extensions:** The `theme.extend` block is used to add custom colors (e.g., `tech` palette), spacing, font families, font sizes, border radius, and breakpoints (as per Part 1.B.3).
    *   **Plugins:**
        *   `tailwindcss-animate`: For CSS animations.
        *   `daisyui`: Added (Part 2.B.5) to provide additional pre-styled components and theming capabilities, complementing shadcn/ui.
*   **Global Styles:** `src/index.css` defines Tailwind base layers, custom CSS properties for theming (light/dark variables for colors, radius), and any global base styles. `src/App.css` might contain minimal additional global styles.
*   **Component-Scoped Styles:** While Tailwind is primary, some components might have very specific CSS if needed, though this is less common with utility-first approaches.
*   **Accessibility Focus:** Use of `focus-visible:` variants is encouraged for better keyboard navigation focus indicators (Part 1.B.5).

## Asset Management

*   **Static Images:**
    *   Stored in `src/utils/images/` (e.g., `ch1_figure_1_3_information_processing_cycle.png`) and referenced in lesson data. These are likely processed by Vite during the build.
    *   Also in `public/` (e.g., `placeholder.svg`) for assets that should be copied as-is to the build output.
    *   **Optimization:** SVGs are planned to be optimized using SVGO (Part 1.C.4 / Part 2.B.3).
    *   **Lazy Loading:** `loading="lazy"` attribute is to be consistently applied to `<img>` tags (Part 1.C.2), likely handled within `ImageBlock.tsx` or `ImagePlaceholder.tsx`.
*   **Favicons:**
    *   A basic `public/favicon.ico` exists. A full set of favicons and an `apple-touch-icon.png` are planned (Part 1.C.3).
*   **PWA Assets:**
    *   `public/manifest.json` and associated PWA icons are to be generated/managed by `vite-plugin-pwa` (Part 1.C.3 / Part 2.B.2).
*   **Fonts:**
    *   Custom fonts (e.g., 'Inter' mentioned in `tailwind.config.ts` example) would typically be linked in `index.html` (e.g., from Google Fonts) or self-hosted in `public/fonts/` and defined with `@font-face` in `index.css`.
```
