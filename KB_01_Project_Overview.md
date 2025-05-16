
```markdown
# KB_01_Project_Overview.md

## Project Name
Cat Quest Digital Journey (Inferred from prompts and `README.md`)

## Primary Purpose
An interactive e-learning platform designed to teach Computer Applications Technology (CAT) concepts to learners, likely students. It aims to provide structured educational content, quizzes, and potentially games in an engaging digital format.

## High-Level Description
The application provides a modular learning experience where users can navigate through different terms and modules covering various CAT topics. Each lesson within a module presents information through text, images, and other media, and is often accompanied by a quiz to assess understanding. The platform includes user authentication, allowing for personalized experiences and (planned) progress tracking. It also aims to incorporate AI tools for enhanced learning and content assistance.

## Current Version
The `package.json` version was not explicitly provided in the prompt, but common starting points are `0.0.0`, `0.1.0`, or `1.0.0`. If `package.json` content is available, this should be updated. (Assuming `0.1.0` as a placeholder based on active development).

## Key Technologies Used
Based on observed files and configurations:

*   **Frontend Framework/Library:** React (`react`, `react-dom`)
*   **Build Tool/Development Server:** Vite (`vite`, `@vitejs/plugin-react-swc`)
*   **Programming Language:** TypeScript (`typescript`)
*   **Styling:**
    *   Tailwind CSS (`tailwindcss`)
    *   shadcn/ui (inferred from `components/ui/` structure and typical usage with Tailwind)
    *   DaisyUI (`daisyui` - requested to be added)
    *   `tailwindcss-animate`
*   **Routing:** React Router DOM (`react-router-dom`)
*   **State Management:**
    *   React Local State (`useState`)
    *   React Context API (`AuthContext.tsx`)
    *   Custom Hooks (various in `src/hooks/`)
    *   Tanstack Query / React Query (`@tanstack/react-query`) for server state management.
    *   SWR (requested to be added for data fetching).
*   **Backend-as-a-Service (BaaS):** Supabase (`@supabase/supabase-js`)
    *   Authentication
    *   PostgreSQL Database
    *   Storage (inferred general capability)
    *   Edge Functions (Deno runtime)
*   **UI Component Primitives/Libraries:**
    *   Lucide Icons (`lucide-react`)
    *   Radix UI (underlying primitives for shadcn/ui components like `@radix-ui/react-dialog`, etc.)
*   **Form Handling:**
    *   React Hook Form (`react-hook-form`) - inferred from dependencies like `@hookform/resolvers`.
*   **Linting/Formatting:**
    *   ESLint (`eslint.config.js` mentioned)
    *   Prettier (requested to be set up)
*   **Testing:**
    *   Jest & React Testing Library (requested to be set up)
*   **Utility Libraries:**
    *   `clsx`, `tailwind-merge` (commonly used with shadcn/ui via `lib/utils.ts`)
    *   `date-fns` (date utility)
    *   `recharts` (charting library)
    *   `react-markdown`, `remark-gfm`, `rehype-raw` (Markdown rendering)
*   **PWA:**
    *   `vite-plugin-pwa` (requested to be added)
*   **AI Integration (Planned/Partially Implemented):**
    *   Deepseek API (via `DeepseekService.ts` and `deepseek-proxy` Edge Function)

*(Versions should be sourced from `package.json` or `bun.lockb` / `package-lock.json` if available for accuracy).*

## License Information
Not specified in the provided `README.md` or `package.json` content. Standard practice would be to include a `LICENSE` file (e.g., MIT, Apache 2.0) or specify it in `package.json`. (Placeholder: To be determined).
```
