
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import ModulesPage from '@/pages/ModulesPage';
import ModuleDetail from '@/pages/ModuleDetail';
import LessonPage from '@/pages/LessonPage';
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

export default function AppRoutes() {
  return (
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
  );
}
