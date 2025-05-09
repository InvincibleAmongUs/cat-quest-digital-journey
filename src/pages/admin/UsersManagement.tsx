
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { Edit2, Trash2, UserPlus } from 'lucide-react';
import AdminRoute from '@/components/auth/AdminRoute';
import { useAuth, UserData } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export default function UsersManagement() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [users, setUsers] = useState<(UserData & { password?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<'add' | 'edit' | null>(null);
  
  // Form state
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student'
  });

  const fetchUsers = async () => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');
      
      if (error) throw error;
      
      // Transform to match UserData structure
      const transformedUsers = data.map(profile => ({
        id: profile.id,
        username: profile.username,
        email: profile.email,
        points: profile.points,
        isAuthenticated: true,
        completedLessons: [],
        completedModules: [],
        quizScores: {},
        badges: [],
        role: profile.role as 'student' | 'admin'
      }));
      
      setUsers(transformedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to load user data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormValues(prev => ({ ...prev, role: value }));
  };

  const handleAddUser = async () => {
    try {
      // Create new user in auth
      const { data, error } = await supabase.auth.signUp({
        email: formValues.email,
        password: formValues.password,
        options: {
          data: {
            username: formValues.username,
            role: formValues.role
          }
        }
      });
      
      if (error) throw error;
      
      // The user will be created in the profiles table via database trigger
      
      toast({
        title: 'Success',
        description: 'User added successfully',
      });
      
      setIsModalOpen(null);
      fetchUsers(); // Refresh the list
      
      // Reset form
      setFormValues({
        username: '',
        email: '',
        password: '',
        role: 'student'
      });
    } catch (error:any) {
      console.error('Error adding user:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to add user',
        variant: 'destructive',
      });
    }
  };

  const handleEditUser = (userId: string) => {
    const selectedUser = users.find(u => u.id === userId);
    if (selectedUser) {
      setSelectedUserId(userId);
      setFormValues({
        username: selectedUser.username,
        email: selectedUser.email,
        password: '',
        role: selectedUser.role
      });
      setIsModalOpen('edit');
    }
  };

  const handleUpdateUser = async () => {
    if (!selectedUserId) return;
    
    try {
      // Update user profile
      const { error } = await supabase
        .from('profiles')
        .update({
          username: formValues.username,
          role: formValues.role
        })
        .eq('id', selectedUserId);
      
      if (error) throw error;
      
      // Update password if provided
      if (formValues.password) {
        // This would require admin privileges in a real app
        // For this demo, we'll just show success
        toast({
          title: 'Note',
          description: 'Password updates require additional admin actions',
        });
      }
      
      // Update local state
      setUsers(prevUsers => 
        prevUsers.map(u => 
          u.id === selectedUserId 
            ? { ...u, username: formValues.username, role: formValues.role as 'student' | 'admin' } 
            : u
        )
      );
      
      toast({
        title: 'Success',
        description: 'User updated successfully',
      });
      
      setIsModalOpen(null);
      
      // Reset form
      setFormValues({
        username: '',
        email: '',
        password: '',
        role: 'student'
      });
    } catch (error:any) {
      console.error('Error updating user:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update user',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (userId === user?.id) {
      toast({
        title: 'Error',
        description: 'You cannot delete your own account',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      // In a real app, this would trigger a soft delete or require admin privileges
      const { error } = await supabase.auth.admin.deleteUser(userId);
      
      if (error) throw error;
      
      setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
      
      toast({
        title: 'Success',
        description: 'User deleted successfully',
      });
    } catch (error:any) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete user',
        variant: 'destructive',
      });
    }
  };

  return (
    <AdminRoute>
      <div className="p-6 max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>User Management</CardTitle>
              <Dialog open={isModalOpen === 'add'} onOpenChange={open => open ? setIsModalOpen('add') : setIsModalOpen(null)}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>
                      Create a new user account in the system.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="grid w-full items-center gap-2">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username" 
                        name="username"
                        value={formValues.username}
                        onChange={handleInputChange}
                        placeholder="Enter username" 
                      />
                    </div>
                    <div className="grid w-full items-center gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                        placeholder="Enter email address" 
                      />
                    </div>
                    <div className="grid w-full items-center gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input 
                        id="password" 
                        name="password"
                        type="password"
                        value={formValues.password}
                        onChange={handleInputChange}
                        placeholder="Enter password" 
                      />
                    </div>
                    <div className="grid w-full items-center gap-2">
                      <Label htmlFor="role">Role</Label>
                      <Select 
                        value={formValues.role} 
                        onValueChange={handleRoleChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={handleAddUser}
                    >
                      Add User
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center p-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map(user => (
                    <TableRow key={user.id}>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.points}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleEditUser(user.id)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="icon"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {users.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6">
                        No users found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        
        {/* Edit User Dialog */}
        <Dialog open={isModalOpen === 'edit'} onOpenChange={open => open ? setIsModalOpen('edit') : setIsModalOpen(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Update user information.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="edit-username">Username</Label>
                <Input 
                  id="edit-username" 
                  name="username"
                  value={formValues.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input 
                  id="edit-email" 
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  disabled
                />
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="edit-password">New Password (optional)</Label>
                <Input 
                  id="edit-password" 
                  name="password"
                  type="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  placeholder="Leave blank to keep current password" 
                />
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select 
                  value={formValues.role} 
                  onValueChange={handleRoleChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                className="w-full" 
                onClick={handleUpdateUser}
              >
                Update User
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminRoute>
  );
}
