
import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { LayoutDashboard, BookOpen, PenTool, HelpCircle, Users, Settings, LogOut } from 'lucide-react';
import ModuleEditor from './ModuleEditor';
import LessonEditor from './LessonEditor';
import QuizEditor from './QuizEditor';
import UsersManagement from './UsersManagement';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-sm py-4 flex flex-col">
        <div className="px-4 mb-6">
          <h1 className="text-xl font-bold text-tech-primary">CATalyst Admin</h1>
          <p className="text-xs text-muted-foreground">Content Management System</p>
        </div>
        
        <nav className="flex-1">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-xs font-semibold text-muted-foreground tracking-wider uppercase">
              Content
            </h2>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/admin">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/admin/modules">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Modules
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/admin/lessons">
                  <PenTool className="mr-2 h-4 w-4" />
                  Lessons
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/admin/quizzes">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Quizzes
                </Link>
              </Button>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-xs font-semibold text-muted-foreground tracking-wider uppercase">
              Administration
            </h2>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/admin/users">
                  <Users className="mr-2 h-4 w-4" />
                  Users
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/admin/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </Button>
            </div>
          </div>
        </nav>
        
        <div className="px-3 py-4 mt-auto">
          <div className="flex items-center px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-tech-primary flex items-center justify-center text-white font-bold">
              A
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium">{user?.username}</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-start" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
          <Button variant="ghost" className="w-full justify-start mt-2" onClick={() => navigate('/')}>
            Back to App
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="/modules" element={<ModuleEditor />} />
            <Route path="/lessons" element={<LessonEditor />} />
            <Route path="/quizzes" element={<QuizEditor />} />
            <Route path="/users" element={<UsersManagement />} />
            <Route path="*" element={<AdminHome />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function AdminHome() {
  const navigate = useNavigate();
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/admin/modules')}>
          <CardHeader>
            <CardTitle>Modules</CardTitle>
            <CardDescription>Manage learning modules and their content</CardDescription>
          </CardHeader>
          <CardContent>
            <BookOpen className="h-8 w-8 text-tech-primary" />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Manage Modules</Button>
          </CardFooter>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/admin/lessons')}>
          <CardHeader>
            <CardTitle>Lessons</CardTitle>
            <CardDescription>Create and edit lesson content</CardDescription>
          </CardHeader>
          <CardContent>
            <PenTool className="h-8 w-8 text-tech-primary" />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Manage Lessons</Button>
          </CardFooter>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/admin/quizzes')}>
          <CardHeader>
            <CardTitle>Quizzes</CardTitle>
            <CardDescription>Create and manage quiz questions and answers</CardDescription>
          </CardHeader>
          <CardContent>
            <HelpCircle className="h-8 w-8 text-tech-primary" />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Manage Quizzes</Button>
          </CardFooter>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/admin/users')}>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage user accounts and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Users className="h-8 w-8 text-tech-primary" />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Manage Users</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
