
```markdown
# KB_Code_Dump_Root.md - Complete Source Code (Root Directory)

This file contains the source code for files located in the root directory of the project.

### .env.example
```text
# Supabase
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Deepseek AI (Optional, for AI features)
# VITE_DEEPSEEK_API_KEY=your_deepseek_api_key_here

# Other environment variables
# VITE_EXAMPLE_VAR=example_value
```

### eslint.config.js
```javascript
// Note: Content for eslint.config.js was not provided in the prompt.
// This is a placeholder. If content is available, it should be included here.
// Example structure:
// export default [
//   {
//     files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
//     languageOptions: {
//       parser: "@typescript-eslint/parser",
//       globals: {
//         browser: true,
//         es2021: true,
//         node: true,
//       },
//     },
//     plugins: {
//       react: "eslint-plugin-react",
//       "@typescript-eslint": "@typescript-eslint/eslint-plugin",
//     },
//     rules: {
//       // Add ESLint rules here
//     },
//   },
// ];
```

### index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- SEO Meta Tags and PWA Manifest link will be added here (Part 1.C.1, 1.C.3) -->
    <title>Cat Quest Digital Journey</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### Lessons.md
```markdown
# Lessons Overview

This document outlines the structure and content for lessons within the "Cat Quest Digital Journey" application.

## Module 1: Introduction to CAT

### Lesson 1: Introduction to Computers
-   **Objective:** Understand basic computer concepts, data vs. information, and ICT in daily life.
-   **Content Blocks:**
    -   What is a Computer? (Text, Image)
    -   Information Processing Cycle (Text, Image: ch1_figure_1_3_information_processing_cycle.png)
    -   Types of Computers (Text, Image: ch1_figure_1_6_computer_types_collage.png)
    -   Data vs. Information (Text)
    -   ICT in Daily Life (Text)
-   **Quiz:** Yes (10 questions)

### Lesson 2: Computer Management & File Organisation
-   **Objective:** Learn about computer interfaces, file organization, and basic operations.
-   **Content Blocks:**
    -   Computer Interfaces (Text, Image: ch2_figure_2_4_os_interface_example.jpg)
    -   Desktop Components (Text, Image: ch2_figure_2_7_desktop_components.png)
    -   Managing Files and Folders (Text)
    -   Basic File Operations (Text, Image: ch3_table_3_1_rename_files.png, ch3_table_3_2_copy_paste_files.png)
    -   File Paths (Text)
    -   Input Devices (Text, Image: ch2_figure_2_3_qwerty_keyboard.jpg, ch2_figure_2_1_mouse_parts.png)
-   **Quiz:** Yes (10 questions)

### Lesson 3: Hardware Components - The Building Blocks
-   **Objective:** Learn about essential hardware components.
-   **Content Blocks:**
    -   What is Hardware? (Text, Image: ch1_figure_1_5_computer_hardware_desktop.png)
    -   CPU (Text)
    -   Memory (RAM) (Text, Image: ch6_table_6_9_ram_rom.png)
    -   Storage Devices (Text, Image: ch5_table_5_6_common_storage_devices.png)
    -   Storage Capacity (Text, Image: ch5_table_5_5_measuring_capacity.png)
    -   Input Devices (Text, Image: ch5_table_5_2_keyboard_types.png, ch5_table_5_3_mice_types.png)
    -   Output Devices (Text, Image: ch5_table_5_4_printer_comparison.png)
    -   Ports and Connectors (Text, Image: ch5_table_5_1_ports_connectors.png)
-   **Quiz:** Yes (10 questions)

### Lesson 4: Software Essentials
-   **Objective:** Learn about different types of software and their applications.
-   **Content Blocks:**
    -   What is Software? (Text)
    -   System Software (Text, Image: ch7_table_7_2_system_software_examples.png)
    -   Operating Systems (Text)
    -   Application Software (Text, Image: ch7_table_7_1_app_software_examples.png)
    -   Productivity Software (Text)
    -   Web Browsers (Text)
    -   Software Licensing (Text)
    -   User Interface Components (Text, Image: ch7_table_7_4_navigational_components.png, ch7_table_7_5_informational_components.png)
-   **Quiz:** Yes (10 questions)

### Lesson 5: Networking Basics (*Content to be detailed from src/knowledgebase/lessons/lesson5.ts*)
-   **Objective:** Understand basic networking concepts.
-   **Quiz:** Yes

*(Further modules and lessons will be detailed here as they are developed.)*
```

### README.md
```markdown
# Cat Quest Digital Journey

Welcome to Cat Quest Digital Journey, an interactive learning platform designed to teach Computer Applications Technology (CAT) concepts in an engaging way.

## Project Overview

This application aims to provide learners with a structured path through various CAT topics, incorporating lessons, quizzes, and potentially games to reinforce learning. It is built using modern web technologies to offer a responsive and user-friendly experience.

## Features (Current & Planned)

*   **Modular Learning:** Content organized into terms, modules, and lessons.
*   **Interactive Lessons:** Lessons include text, images, and diagrams.
*   **Quizzes:** Each lesson can have an associated quiz to test understanding.
*   **User Authentication:** Secure login and registration for learners.
*   **Progress Tracking:** (Planned) Track completed lessons, modules, and quiz scores.
*   **Achievements/Badges:** (Planned) Award badges for milestones.
*   **Knowledge Base:** A searchable repository of CAT information.
*   **Admin Dashboard:** (Planned) For managing content, users, and site settings.
*   **AI Tools:** (Planned) Features like AI concept explainer, content summarizer, and quiz generator.
*   **Games:** Interactive games to make learning fun (e.g., Hardware Hunt, File Path Race).

## Tech Stack

*   **Frontend:** React, Vite, TypeScript
*   **Styling:** Tailwind CSS, shadcn/ui
*   **Routing:** React Router DOM
*   **State Management:** React Context, Custom Hooks (Potentially SWR/React Query for data fetching)
*   **Backend & Database:** Supabase (Auth, Postgres Database, Storage, Edge Functions)
*   **Linting/Formatting:** ESLint, Prettier
*   **Testing:** (To be set up - Jest, React Testing Library)

## Getting Started

### Prerequisites

*   Node.js (v18+ recommended) or Bun
*   A Supabase project (for backend functionality)

### Environment Variables

Create a `.env` file in the root of the project and populate it with the following variables (see `.env.example`):

\`\`\`
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
# Optional for AI features
# VITE_DEEPSEEK_API_KEY=your_deepseek_api_key
\`\`\`

### Installation

1.  Clone the repository:
    \`git clone <repository_url>\`
2.  Navigate to the project directory:
    \`cd cat-quest-digital-journey\`
3.  Install dependencies:
    \`npm install\`
    (or \`bun install\`)

### Running the Development Server

\`npm run dev\`
(or \`bun run dev\`)

This will start the Vite development server, typically at \`http://localhost:8080\`.

### Building for Production

\`npm run build\`
(or \`bun run build\`)

This will create a \`dist\` folder with the optimized production build.

## Project Structure

(A brief overview of the main directories, more detail in KB_00_Repository_Tree.md and KB_02_Codebase_Architecture.md)

*   \`public/\`: Static assets.
*   \`src/\`: Main application source code.
    *   \`components/\`: Reusable UI components.
    *   \`contexts/\`: React Context providers.
    *   \`data/\`: Static data, mock data.
    *   \`hooks/\`: Custom React hooks.
    *   \`integrations/\`: Supabase client setup.
    *   \`knowledgebase/\`: Raw lesson content and definitions.
    *   \`lib/\`: Utility functions.
    *   \`pages/\`: Top-level page components.
    *   \`services/\`: API interaction services.
    *   \`styles/\`: Global styles (though Tailwind is primary).
    *   \`types/\`: TypeScript type definitions.
*   \`supabase/\`: Supabase project configuration (migrations, functions).

## Contributing

(Details on contributing guidelines, code style, and pull request process to be added).

## License

(License information to be added, e.g., MIT).
```

### Repo.md
```markdown
# Cat Quest Digital Journey - Repository Meta Document

**For a comprehensive and detailed knowledge base of this project, please see the [Project Knowledge Base Index](./KB_Index.md).**

---

This document serves as a high-level overview and meta-information store for the "Cat Quest Digital Journey" project repository. It may include development notes, to-dos, architectural decisions, or links to other important resources.

## Current Project Status

*   **Phase:** Initial Development / Feature Expansion
*   **Key Focus Areas:**
    *   Implementing core lesson and quiz functionality.
    *   Setting up user authentication with Supabase.
    *   Building out the knowledge base system.
    *   Integrating AI tools for content assistance.
    *   Developing interactive educational games.

## Core Technologies in Use

*   **Frontend:** React (with Vite), TypeScript, Tailwind CSS, shadcn/ui
*   **Backend:** Supabase (Auth, Database, Storage, Edge Functions)
*   **Version Control:** Git

## Key Architectural Decisions & Patterns

*   **Component-Based UI:** Leveraging React for a modular frontend.
*   **Utility-First CSS:** Using Tailwind CSS for styling.
*   **Serverless Backend:** Utilizing Supabase for backend services.
*   **Static Typing:** Employing TypeScript for improved code quality and maintainability.
*   **Single Page Application (SPA):** Using React Router for client-side navigation.

## Development Roadmap & TODOs (High-Level)

*   [ ] **User Progress & Achievements:**
    *   [ ] Implement robust tracking of completed lessons and modules.
    *   [ ] Design and implement a badge/achievement system.
    *   [ ] Store user progress in Supabase.
*   [ ] **Admin Panel Enhancements:**
    *   [ ] Full CRUD operations for terms, modules, lessons, and quiz questions.
    *   [ ] User management capabilities.
    *   [ ] Analytics and reporting.
*   [ ] **Knowledge Base Improvements:**
    *   [ ] Implement Algolia DocSearch or similar for powerful search.
    *   [ ] Refine dynamic content loading and display.
*   [ ] **AI Tool Integration:**
    *   [ ] Complete AI Concept Explainer.
    *   [ ] Implement AI Content Summarizer.
    *   [ ] Finalize AI Quiz Generator.
*   [ ] **Game Development:**
    *   [ ] Add more educational games.
    *   [ ] Integrate game scores with user progress.
*   [ ] **PWA Implementation:**
    *   [ ] Configure service worker and manifest for offline capabilities.
*   [ ] **Testing:**
    *   [ ] Set up Jest and React Testing Library.
    *   [ ] Write unit and integration tests for critical components and functions.
*   [ ] **CI/CD:**
    *   [ ] Implement GitHub Actions for automated builds, linting, and testing.
*   [ ] **Accessibility (a11y):**
    *   [ ] Conduct a thorough accessibility audit.
    *   [ ] Ensure compliance with WCAG guidelines.
*   [ ] **Performance Optimization:**
    *   [ ] Optimize bundle size with code splitting and dynamic imports.
    *   [ ] Lazy load images and other assets.
    *   [ ] Review and optimize data fetching strategies.

## Notes & Links

*   **Supabase Project:** [Link to your Supabase Dashboard]
*   **Design Files (Figma, etc.):** [Link to design files if applicable]
*   **CAT Curriculum Reference:**
    *   [Official Curriculum Document 1](https://www.education.gov.za/LinkClick.aspx?fileticket=8nKeyrKUjQc%3d&tabid=3137&portalid=0&mid=10537)
    *   [Official Curriculum Document 2](https://www.education.gov.za/LinkClick.aspx?fileticket=DRS5puLLMmM%3d&tabid=3137&portalid=0&mid=10537)

*(This document should be updated regularly as the project evolves.)*
```

### Temptsconfig.json
```json
// Content for Temptsconfig.json was not provided.
// Assuming this might be a typo for tsconfig.json or a temporary file.
// If it has specific content and purpose, it should be included here.
// For now, this will be a placeholder.
{
  "comment": "Content for Temptsconfig.json (if it's a distinct, used file) goes here."
}
```

### t1sconfig.json
```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "strict": true,
    "noImplicitAny": true,
    "noUnusedParameters": true,
    "skipLibCheck": true,
    "allowJs": true,
    "noUnusedLocals": true,
    "strictNullChecks": true
  }
}
```

### tailwind.config.ts
```typescript
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
    "./index.html", // Added for purging
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				tech: {
					primary: '#9B87F5',
					light: '#D6BCFA',
					dark: '#1A1F2C',
					blue: '#1EAEDB',
					gray: '#F1F0FB',
					neutral: '#8E9196'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
      spacing: { // Added based on Part 1.B.3
        '128': '32rem',
        '144': '36rem',
      },
      fontFamily: { // Added based on Part 1.B.3
        sans: ['Inter', 'sans-serif'], // Example
      },
      fontSize: { // Added based on Part 1.B.3
        '7xl': '5rem',
      },
      breakpoints: { // Added based on Part 1.B.3
        '3xl': '1600px',
      },
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'float': 'float 3s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate"), require("daisyui")], // Added daisyui
} satisfies Config;
```

### vite.config.ts
```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
// import { VitePWA } from 'vite-plugin-pwa'; // Added for PWA (Part 2.B.2)

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    // VitePWA({ // Configuration for PWA Plugin (Part 2.B.2)
    //   registerType: 'autoUpdate',
    //   includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
    //   manifest: {
    //     name: 'Cat Quest Digital Journey',
    //     short_name: 'CatQuest',
    //     description: 'Interactive learning platform for CAT.',
    //     theme_color: '#ffffff',
    //     icons: [
    //       {
    //         src: 'pwa-192x192.png',
    //         sizes: '192x192',
    //         type: 'image/png',
    //       },
    //       {
    //         src: 'pwa-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //       },
    //       {
    //         src: 'pwa-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //         purpose: 'any maskable',
    //       }
    //     ]
    //   }
    // })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
```
