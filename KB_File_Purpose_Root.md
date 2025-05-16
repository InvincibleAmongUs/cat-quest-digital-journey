
```markdown
# KB_File_Purpose_Root.md - Explanation of Root Files

This file provides an explanation for each significant file located in the root directory of the project.

### .env.example
*   **Purpose:** Provides a template for the required environment variables for the project. Users should copy this to `.env` and fill in their actual credentials.
*   **Why it exists:** To guide developers on setting up their local environment without committing sensitive keys.
*   **Key Interactions:** Read by developers to create their `.env` file. The `.env` file itself is read by Vite at build/dev time to inject variables into `import.meta.env`.

### eslint.config.js
*   **Purpose:** Configuration file for ESLint, a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.
*   **Why it exists:** To enforce code style, best practices, and catch potential errors during development.
*   **Key Interactions:** Used by ESLint when run via CLI or integrated into an IDE. May import plugins (e.g., for React, TypeScript) and extend configurations (e.g., `eslint-config-prettier`).

### index.html
*   **Purpose:** The main HTML entry point for the single-page application (SPA).
*   **Why it exists:** It's the first file loaded by the browser. It contains the root DOM element where the React application will be mounted and links to necessary JavaScript and CSS files.
*   **Key Interactions:** Mounts the React app via `<script type="module" src="/src/main.tsx"></script>`. Contains meta tags for SEO and PWA (to be added).

### Lessons.md
*   **Purpose:** A Markdown document likely intended for developers or content creators to outline the structure and content of educational lessons within the application.
*   **Why it exists:** To plan and document lesson content before or during implementation in the structured format (e.g., `lessonX.ts` files).
*   **Key Interactions:** Serves as a reference for creating `LessonData` objects in `src/knowledgebase/lessons/`.

### README.md
*   **Purpose:** The primary documentation file for the project. It typically provides an overview, setup instructions, tech stack details, and other essential information for anyone interacting with the project.
*   **Why it exists:** Standard practice for all software projects to offer a starting point for understanding and using the codebase.
*   **Key Interactions:** Read by developers, contributors, and potentially users. Links to other documentation (like this KB).

### Repo.md
*   **Purpose:** A meta-document about the repository itself, possibly for development notes, high-level todos, or architectural decisions. It seems distinct from README.md, perhaps more internal-facing.
*   **Why it exists:** To keep track of ongoing development efforts, project status, and strategic thinking related to the codebase.
*   **Key Interactions:** Used by the development team as a reference. Will link to this Knowledge Base.

### Temptsconfig.json
*   **Purpose:** Unknown based on current information. The name suggests it might be a temporary or mistakenly named `tsconfig.json` variant.
*   **Why it exists:** Its role is unclear without its content or more context.
*   **Key Interactions:** Unknown.

### t1sconfig.json
*   **Purpose:** The primary TypeScript configuration file that is editable in this project environment. It defines compiler options for the TypeScript project, including strictness, module resolution, and path aliases.
*   **Why it exists:** To control how TypeScript code is transpiled to JavaScript and to enforce type safety. It references `tsconfig.app.json` and `tsconfig.node.json`.
*   **Key Interactions:** Used by the TypeScript compiler (tsc) and by Vite during development and build processes. Affects all `.ts` and `.tsx` files.

### tailwind.config.ts
*   **Purpose:** Configuration file for Tailwind CSS. It defines theme customizations (colors, spacing, fonts), plugins (like DaisyUI, tailwindcss-animate), and content paths for CSS purging.
*   **Why itexists:** To customize Tailwind's default behavior and optimize the final CSS bundle.
*   **Key Interactions:** Read by Tailwind CSS during the build process to generate utility classes. Impacts the styling of all components using Tailwind classes.

### tsconfig.app.json & tsconfig.node.json
*   **Purpose:** These are likely specialized TypeScript configurations referenced by `t1sconfig.json` (or a main `tsconfig.json`). `tsconfig.app.json` would typically configure TypeScript for the frontend application code (e.g., targeting browser environments, JSX settings). `tsconfig.node.json` would be for any Node.js specific scripts or server-side TypeScript code if present (e.g., configuration for Vite itself or build scripts).
*   **Why it exists:** To allow different TypeScript compiler settings for different parts of the project (e.g., frontend app vs. build tools/environment).
*   **Key Interactions:** Referenced by the main `t1sconfig.json`. The settings within these files influence how specific parts of the TypeScript codebase are compiled.

### vite.config.ts
*   **Purpose:** Configuration file for Vite, the build tool and development server used for this React project.
*   **Why it exists:** To define how the project is built, served during development, and to configure plugins (like `@vitejs/plugin-react-swc`, `vite-plugin-pwa`).
*   **Key Interactions:** Used by Vite CLI. Defines server options, plugins, build optimizations, and path aliases (`@/`).
```
