
```markdown
# KB_06_Build_Deployment_Workflow.md

This document outlines the build process, deployment considerations, and development workflows for the "Cat Quest Digital Journey" application.

## Environment Variables

Based on `src/main.tsx` validation and typical Supabase/Vite projects (referencing `.env.example`):

*   **`VITE_SUPABASE_URL`** (Required)
    *   **Purpose:** The URL of your Supabase project.
    *   **Used by:** Supabase client (`src/integrations/supabase/client.ts`) to connect to the Supabase backend.
*   **`VITE_SUPABASE_ANON_KEY`** (Required)
    *   **Purpose:** The public anonymous key for your Supabase project.
    *   **Used by:** Supabase client for authenticating requests from the frontend. This key is safe to expose in client-side code.
*   **`VITE_DEEPSEEK_API_KEY`** (Optional, but required if Deepseek features are used)
    *   **Purpose:** API key for Deepseek AI.
    *   **Note:** This variable is intended for client-side access if the Deepseek API were called directly from the frontend. However, the current architecture uses a `deepseek-proxy` Edge Function. The actual Deepseek API key should be stored as a **Supabase Secret** (e.g., `DEEPSEEK_API_KEY`) and accessed within the Edge Function using `Deno.env.get("DEEPSEEK_API_KEY")`. The Vite variable might be unused or for a different purpose if proxy is sole method.
*   **Other Potential Variables (based on `Deno.env.get` in Supabase functions):**
    *   `SUPABASE_SERVICE_ROLE_KEY`: Used within Edge Functions for operations requiring admin privileges. This is a Supabase Secret, not a Vite env var.

**Validation:**
*   Basic validation for `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` is implemented in `src/main.tsx` (as per Part 1.D.4).

## Build Process

*   **Tool:** Vite
*   **Configuration:** `vite.config.ts`
*   **Key Scripts (`package.json`):**
    *   `dev`: (e.g., `vite`) Starts the Vite development server with HMR (Hot Module Replacement). Typically runs on `http://localhost:8080`.
    *   `build`: (e.g., `vite build`) Compiles and bundles the application for production. Outputs to the `dist/` directory. This includes:
        *   TypeScript compilation.
        *   JSX transformation.
        *   CSS processing (Tailwind CSS, PostCSS).
        *   Asset optimization (minification, code splitting).
        *   PWA manifest and service worker generation (via `vite-plugin-pwa`).
    *   `preview`: (e.g., `vite preview`) Serves the production build locally to test it before deployment.
    *   `lint`: (e.g., `eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0`) Runs ESLint to check for code quality and style issues.
    *   `format`: (e.g., `prettier --write .`) Formats the codebase using Prettier.
    *   `check-format`: (e.g., `prettier --check .`) Checks if the codebase is formatted according to Prettier rules (used in CI).
    *   `type-check`: (e.g., `tsc --noEmit` or via `vite-plugin-checker` if used) Performs TypeScript type checking across the project.
    *   `test`: (e.g., `jest` or `vitest`) Runs unit/integration tests.
    *   `optimize-svgs`: (e.g., `svgo -f public/svg -o public/svg`) Optimizes SVG files (as per Part 2.B.3).

## Testing Setup

*   **Frameworks (Requested for Setup - Part 1.A.5):**
    *   Jest or Vitest (Vitest is often preferred for Vite projects due to better integration).
    *   React Testing Library: For testing React components from a user's perspective.
*   **Configuration:**
    *   Jest: `jest.config.js` (or similar).
    *   Vitest: Configuration can be within `vite.config.ts` or a separate `vitest.config.ts`.
    *   Setup file for common testing utilities (e.g., `src/setupTests.ts`).
*   **Test Files:** Typically colocated with components (e.g., `Button.test.tsx`) or in a `__tests__` directory.
*   **Scripts:** `npm test` or `bun test` would execute the tests.

## Linting & Formatting

*   **ESLint:**
    *   **Configuration:** `eslint.config.js` (or `.eslintrc.js/.json`).
    *   **Plugins:** `@typescript-eslint/eslint-plugin`, `eslint-plugin-react`, `eslint-plugin-react-hooks` (Part 1.A.4 - for rules-of-hooks and exhaustive-deps), `eslint-plugin-jsx-a11y` (for accessibility).
    *   **Purpose:** Enforces coding standards, identifies potential bugs, and ensures consistency.
*   **Prettier:**
    *   **Configuration:** `.prettierrc.json` (or `.js`/`.yaml`) (Part 1.E.2).
    *   **Integration:** `eslint-config-prettier` to disable ESLint rules that conflict with Prettier.
    *   **Purpose:** Automatic code formatting for consistent style across the codebase.
*   **Scripts:**
    *   `lint`: Runs ESLint.
    *   `format`: Runs Prettier to format files.
    *   `check-format`: Runs Prettier in check mode (used in CI).

## CI/CD Pipeline (GitHub Actions)

*   **Configuration File:** `.github/workflows/ci.yml` (Requested for Setup - Part 1.E.1).
*   **Triggers:** On pushes and pull requests to `main`/`master` (and other relevant branches).
*   **Jobs/Steps (Typical):**
    1.  **Checkout Code:** `actions/checkout@vX`.
    2.  **Set up Node.js/Bun:** `actions/setup-node@vX` or `oven-sh/setup-bun@vX`.
    3.  **Install Dependencies:** `npm ci` or `bun install --frozen-lockfile`.
    4.  **Run Linters:** `npm run lint` or `bun run lint`.
    5.  **Check Formatting:** `npm run check-format` or `bun run check-format`.
    6.  **Run TypeScript Type-Checking:** `npm run type-check` or `bun run type-check`.
    7.  **Run Tests:** `npm test` or `bun test`.
    8.  **Run Production Build:** `npm run build` or `bun run build` (to ensure the app builds successfully).
*   **Deployment (Optional in CI, can be a separate workflow):**
    *   Could deploy the `dist/` folder to a static hosting provider (e.g., Vercel, Netlify, GitHub Pages, Supabase Hosting).
    *   Supabase Edge Functions are typically deployed using the Supabase CLI (`supabase functions deploy <function_name>`), which can also be integrated into a GitHub Actions workflow.

## Deployment Considerations

*   **Static Hosting:** The frontend built by Vite (`dist/` folder) is a set of static files (HTML, CSS, JS, images) and can be deployed to any static web hosting service.
*   **Supabase Backend:** The Supabase project (database, auth, functions, storage) is hosted on Supabase's cloud infrastructure.
*   **Environment Variables for Deployment:**
    *   Frontend: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` must be configured in the build environment of the hosting provider.
    *   Supabase Edge Functions: Secrets like `DEEPSEEK_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY` must be set in the Supabase project settings under Edge Functions secrets.
*   **PWA:** If `vite-plugin-pwa` is configured, the generated service worker will enable PWA features like offline caching.
```
