
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TermSelectionPage from "./pages/TermSelectionPage";
import ModulesPage from "./pages/ModulesPage";
import ModuleDetail from "./pages/ModuleDetail";
import LessonPage from "./pages/LessonPage";
import AchievementsPage from "./pages/AchievementsPage";
import KnowledgeBasePage from "./pages/KnowledgeBasePage";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";
import GamesPage from "./pages/GamesPage";
import HardwareHuntPage from "./pages/games/HardwareHuntPage";
import FilePathRacePage from "./pages/games/FilePathRacePage";
import DataDetectivePage from "./pages/games/DataDetectivePage";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Index />} />
            <Route path="/terms" element={<ProtectedRoute><TermSelectionPage /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/modules" element={<ProtectedRoute><ModulesPage /></ProtectedRoute>} />
            <Route path="/modules/:moduleId" element={<ProtectedRoute><ModuleDetail /></ProtectedRoute>} />
            <Route path="/modules/:moduleId/lessons/:lessonId" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />
            <Route path="/achievements" element={<ProtectedRoute><AchievementsPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/knowledge-base" element={<ProtectedRoute><KnowledgeBasePage /></ProtectedRoute>} />
            <Route path="/knowledge-base/:termId" element={<ProtectedRoute><KnowledgeBasePage /></ProtectedRoute>} />
            <Route path="/knowledge-base/:termId/:chapterId" element={<ProtectedRoute><KnowledgeBasePage /></ProtectedRoute>} />
            <Route path="/games" element={<ProtectedRoute><GamesPage /></ProtectedRoute>} />
            <Route path="/games/hardware-hunt" element={<ProtectedRoute><HardwareHuntPage /></ProtectedRoute>} />
            <Route path="/games/file-path-race" element={<ProtectedRoute><FilePathRacePage /></ProtectedRoute>} />
            <Route path="/games/data-detective" element={<ProtectedRoute><DataDetectivePage /></ProtectedRoute>} />
            <Route path="/admin/*" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
