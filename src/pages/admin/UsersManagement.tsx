
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { UserData } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';

export default function UsersManagement() {
  const [users, setUsers] = useState<(UserData & { password?: string })[]>([]);
  const [selectedUser, setSelectedUser] = useState<(UserData & { password?: string }) | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'admin'>('student');
  
  const { toast } = useToast();
  
  // Load users from localStorage on component mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('all_users');
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers);
        setUsers(parsedUsers);
      } catch (error) {
        console.error('Failed to parse users data:', error);
      }
    }
  }, []);
  
  const handleSelectUser = (user: (UserData & { password?: string })) => {
    setSelectedUser(user);
    setUsername(user.username);
    setEmail(user.email);
    setPassword(''); // Don't show the current password
    setRole(user.role || 'student');
  };
  
  const handleCreateUser = () => {
    if (!username || !email || !password) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if email already exists
    if (users.some(user => user.email === email)) {
      toast({
        title: "Email Already Exists",
        description: "A user with this email already exists.",
        variant: "destructive",
      });
      return;
    }
    
    const newUser = {
      username,
      email,
      password,
      points: 50,
      isAuthenticated: true,
      completedLessons: [],
      completedModules: [],
      quizScores: {},
      badges: ["first_login"],
      role
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('all_users', JSON.stringify(updatedUsers));
    
    resetForm();
    
    toast({
      title: "User Created",
      description: `User "${username}" has been created successfully.`,
    });
  };
  
  const handleUpdateUser = () => {
    if (!selectedUser || !username || !email) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if email already exists and it's not the current user's email
    if (email !== selectedUser.email && users.some(user => user.email === email)) {
      toast({
        title: "Email Already Exists",
        description: "A user with this email already exists.",
        variant: "destructive",
      });
      return;
    }
    
    const updatedUsers = users.map(user => {
      if (user.email === selectedUser.email) {
        return {
          ...user,
          username,
          email,
          password: password || user.password,
          role
        };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    localStorage.setItem('all_users', JSON.stringify(updatedUsers));
    
    resetForm();
    
    toast({
      title: "User Updated",
      description: `User "${username}" has been updated successfully.`,
    });
  };
  
  const handleDeleteUser = () => {
    if (!selectedUser) return;
    
    const updatedUsers = users.filter(user => user.email !== selectedUser.email);
    setUsers(updatedUsers);
    localStorage.setItem('all_users', JSON.stringify(updatedUsers));
    
    resetForm();
    
    toast({
      title: "User Deleted",
      description: `User "${selectedUser.username}" has been deleted.`,
    });
  };
  
  const resetForm = () => {
    setSelectedUser(null);
    setUsername('');
    setEmail('');
    setPassword('');
    setRole('student');
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">User List</h2>
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {users.length > 0 ? (
              users.map((user, index) => (
                <Card 
                  key={index}
                  className={`cursor-pointer ${selectedUser?.email === user.email ? 'border-tech-primary' : ''}`}
                  onClick={() => handleSelectUser(user)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      {user.username}
                      {user.role === 'admin' && (
                        <Badge className="ml-2 bg-tech-primary">Admin</Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                    <div className="mt-1 text-sm">Points: {user.points || 0}</div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No users found.
              </div>
            )}
          </div>
          
          <Button 
            className="mt-4 w-full"
            variant="outline"
            onClick={resetForm}
          >
            Create New User
          </Button>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {selectedUser ? 'Edit User' : 'Create New User'}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Username <span className="text-red-500">*</span>
              </label>
              <Input 
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <Input 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                type="email"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password {!selectedUser && <span className="text-red-500">*</span>}
              </label>
              <Input 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={selectedUser ? "Enter to change password" : "Enter password"}
                type="password"
                required={!selectedUser}
              />
              {selectedUser && (
                <p className="text-xs text-muted-foreground mt-1">
                  Leave blank to keep the current password
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-3">
                Role <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={role === 'student'}
                    onChange={() => setRole('student')}
                    className="mr-2"
                  />
                  Student
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={role === 'admin'}
                    onChange={() => setRole('admin')}
                    className="mr-2"
                  />
                  Admin
                </label>
              </div>
            </div>
            
            <div className="flex gap-2 pt-4">
              {selectedUser ? (
                <>
                  <Button onClick={handleUpdateUser} className="flex-1">
                    Update User
                  </Button>
                  <Button 
                    onClick={handleDeleteUser} 
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </>
              ) : (
                <Button onClick={handleCreateUser} className="flex-1">
                  Create User
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
