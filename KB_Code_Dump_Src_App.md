
```markdown
# KB_Code_Dump_Src_App.md - Source Code (src/ App Level Files)

This file contains the source code for key application-level files in the `src/` directory.

### src/App.tsx
```typescript
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom"; // Removed Routes, Route import
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./routes"; // Using AppRoutes component
import { ErrorBoundary } from 'react-error-boundary'; // Added ErrorBoundary
import { HelmetProvider } from 'react-helmet-async'; // Added HelmetProvider

const queryClient = new QueryClient();

function AppFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div role="alert" className="p-4">
      <p>Something went wrong:</p>
      <pre className="text-red-500">{error.message}</pre>
      <button onClick={resetErrorBoundary} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Try again
      </button>
    </div>
  );
}

const App = () => (
  <HelmetProvider> {/* Added HelmetProvider */}
    <ErrorBoundary FallbackComponent={AppFallback}> {/* Added ErrorBoundary */}
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <AppRoutes /> {/* Using AppRoutes component */}
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </HelmetProvider>
);

export default App;
```

### src/routes.tsx
```typescript
import React, { Suspense } from 'react'; // Added Suspense
import { Route, Routes } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import ModulesPage from '@/pages/ModulesPage';
import ModuleDetail from '@/pages/ModuleDetail';
// import LessonPage from '@/pages/LessonPage'; // Example for lazy loading
import AchievementsPage from '@/pages/AchievementsPage';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import KnowledgeBasePage from '@/pages/KnowledgeBasePage';
import Index from '@/pages/Index';
import GamesPage from '@/pages/GamesPage';
import Profile from '@/pages/Profile';
import TermSelectionPage from '@/pages/TermSelectionPage';
import AdminRoute from '@/components/auth/AdminRoute';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import ModuleEditor from '@/pages/admin/ModuleEditor';
import LessonEditor from '@/pages/admin/LessonEditor';
import QuizEditor from '@/pages/admin/QuizEditor';
import UsersManagement from '@/pages/admin/UsersManagement';
import FilePathRacePage from '@/pages/games/FilePathRacePage';
import DataDetectivePage from '@/pages/games/DataDetectivePage';
import HardwareHuntPage from '@/pages/games/HardwareHuntPage';
import DynamicKnowledgeBasePage from '@/pages/DynamicKnowledgeBasePage';
import { ErrorBoundary } from 'react-error-boundary'; // Re-import for clarity if needed per route

// Lazy load pages (Example based on Part 2.A.3)
const LessonPage = React.lazy(() => import('@/pages/LessonPage'));
const BigGamePage = React.lazy(() => import('@/pages/games/FilePathRacePage')); // Assuming this is large

function RouteFallback() {
  return <div>Loading page...</div>;
}

function ErrorFallbackRoute({ error }: { error: Error }) {
  return (
    <div role="alert" className="p-4 text-center">
      <p>Oops, there was an error loading this page.</p>
      <pre className="text-red-500">{error.message}</pre>
    </div>
  );
}


export default function AppRoutes() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackRoute}>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/modules" element={<ProtectedRoute><ModulesPage /></ProtectedRoute>} />
          <Route path="/modules/:moduleId" element={<ProtectedRoute><ModuleDetail /></ProtectedRoute>} />
          <Route path="/modules/:moduleId/lessons/:lessonId" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />
          <Route path="/achievements" element={<ProtectedRoute><AchievementsPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* Knowledge Base routes */}
          <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
          <Route path="/knowledge-base/:chapterId" element={<KnowledgeBasePage />} />
          <Route path="/knowledge-base/term/:termId" element={<KnowledgeBasePage />} />
          
          {/* Dynamic Knowledge Base routes */}
          <Route path="/dynamic-knowledge-base" element={<DynamicKnowledgeBasePage />} />
          <Route path="/dynamic-knowledge-base/:chapterId" element={<DynamicKnowledgeBasePage />} />
          <Route path="/dynamic-knowledge-base/term/:termId" element={<DynamicKnowledgeBasePage />} />
          
          {/* Term selection */}
          <Route path="/terms" element={<ProtectedRoute><TermSelectionPage /></ProtectedRoute>} />

          {/* Games routes */}
          <Route path="/games" element={<ProtectedRoute><GamesPage /></ProtectedRoute>} />
          <Route path="/games/file-path-race" element={<ProtectedRoute><FilePathRacePage /></ProtectedRoute>} />
          {/* Example of lazy loaded game route */}
          {/* <Route path="/games/big-game" element={<ProtectedRoute><BigGamePage /></ProtectedRoute>} /> */}
          <Route path="/games/data-detective" element={<ProtectedRoute><DataDetectivePage /></ProtectedRoute>} />
          <Route path="/games/hardware-hunt" element={<ProtectedRoute><HardwareHuntPage /></ProtectedRoute>} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/modules" element={<AdminRoute><ModuleEditor /></AdminRoute>} />
          <Route path="/admin/lessons" element={<AdminRoute><LessonEditor /></AdminRoute>} />
          <Route path="/admin/quizzes" element={<AdminRoute><QuizEditor /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><UsersManagement /></AdminRoute>} />
          
          {/* 404 Not Found page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
```

### src/main.tsx
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Environment variable validation (Part 1.D.4)
if (!import.meta.env.VITE_SUPABASE_URL) {
  throw new Error("VITE_SUPABASE_URL is not defined. Please check your .env file.");
}
if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error("VITE_SUPABASE_ANON_KEY is not defined. Please check your .env file.");
}
// Add checks for other critical env vars like VITE_DEEPSEEK_API_KEY if it becomes non-optional

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### src/App.css
```css
/* Content for src/App.css was not provided. 
   If it exists and has styles, they should be here.
   Typically, with Tailwind, this file might be minimal or empty. */
body {
  /* Example global style if not handled by Tailwind base */
  font-family: sans-serif;
}
```

### src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;

    --radius: 0.5rem;

    /* Sidebar specific vars */
    --sidebar-background: 222.2 47.4% 11.2%; /* Example: Dark blue */
    --sidebar-foreground: 210 40% 98%;     /* Example: Light gray/white */
    --sidebar-primary: 210 40% 98%;        /* Example: For active/primary items */
    --sidebar-primary-foreground: 222.2 47.4% 11.2%;
    --sidebar-accent: 210 40% 96.1%;
    --sidebar-accent-foreground: 222.2 47.4% 11.2%;
    --sidebar-border: 214.3 31.8% 91.4%; /* Or a darker border */
    --sidebar-ring: 222.2 84% 4.9%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;

    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 210 40% 98%; /* Adjusted ring for dark mode */

    /* Dark Sidebar specific vars */
    --sidebar-background: 220 30% 10%; /* Darker than main dark bg */
    --sidebar-foreground: 210 30% 80%;
    --sidebar-primary: 210 40% 98%;
    --sidebar-primary-foreground: 220 30% 10%;
    --sidebar-accent: 217.2 32.6% 25%;
    --sidebar-accent-foreground: 210 40% 98%;
    --sidebar-border: 217.2 32.6% 17.5%;
    --sidebar-ring: 210 40% 98%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```
