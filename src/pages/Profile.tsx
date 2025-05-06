
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import DataDragon from '@/components/mascot/DataDragon';
import { BadgeCheck, Calendar, Clock, Award, Book, User } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  
  // Access user data from localStorage
  const userDataString = localStorage.getItem('user');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  
  // If no user data is found, redirect to login
  React.useEffect(() => {
    if (!userData) {
      navigate('/login');
    }
  }, [userData, navigate]);
  
  if (!userData) {
    return null;
  }

  const initials = userData.username.substring(0, 2).toUpperCase();
  
  // Mock profile data
  const profileData = {
    totalXP: userData.points,
    level: Math.floor(userData.points / 100) + 1,
    badgesEarned: 3,
    lessonsCompleted: 1,
    quizzesCompleted: 1,
    activeDays: 1,
    nextLevelXP: (Math.floor(userData.points / 100) + 1) * 100,
    levelProgress: (userData.points % 100),
    dateJoined: new Date().toLocaleDateString(),
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        username={userData.username} 
        points={userData.points}
        onLogout={handleLogout}
      />
      
      <main className="container py-6 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <DataDragon message="Track your progress and customize your learning journey!" />
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <Avatar className="h-24 w-24 border-4 border-tech-primary">
                    <AvatarImage src="" alt={userData.username} />
                    <AvatarFallback className="text-2xl bg-tech-primary text-white">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{userData.username}</h2>
                    <p className="text-muted-foreground">{userData.email}</p>
                  </div>
                  
                  <div className="bg-secondary p-4 rounded-lg w-full">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Level {profileData.level}</span>
                      <span>{profileData.levelProgress}/{profileData.nextLevelXP - profileData.levelProgress} XP</span>
                    </div>
                    <Progress value={profileData.levelProgress} max={100} className="h-2 mb-1" />
                    <div className="text-xs text-right text-muted-foreground">
                      {100 - profileData.levelProgress} XP to level {profileData.level + 1}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 w-full">
                    <div className="flex flex-col items-center p-3 bg-secondary rounded-lg">
                      <BadgeCheck className="h-5 w-5 text-tech-primary mb-1" />
                      <span className="text-lg font-bold">{profileData.badgesEarned}</span>
                      <span className="text-xs text-muted-foreground">Badges</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-secondary rounded-lg">
                      <Book className="h-5 w-5 text-tech-blue mb-1" />
                      <span className="text-lg font-bold">{profileData.lessonsCompleted}</span>
                      <span className="text-xs text-muted-foreground">Lessons</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-secondary rounded-lg">
                      <Calendar className="h-5 w-5 text-tech-primary mb-1" />
                      <span className="text-lg font-bold">{profileData.activeDays}</span>
                      <span className="text-xs text-muted-foreground">Days</span>
                    </div>
                  </div>
                  
                  <div className="w-full">
                    <Button variant="outline" className="w-full">
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Account Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Username</p>
                  <p className="text-sm text-muted-foreground">{userData.username}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{userData.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Joined</p>
                  <p className="text-sm text-muted-foreground">{profileData.dateJoined}</p>
                </div>
                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full text-destructive" onClick={handleLogout}>
                    Log out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <Tabs defaultValue="stats">
              <TabsList className="mb-4">
                <TabsTrigger value="stats">Statistics</TabsTrigger>
                <TabsTrigger value="achievements">Recent Achievements</TabsTrigger>
                <TabsTrigger value="history">Learning History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="stats">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Statistics</CardTitle>
                    <CardDescription>Track your progress in the Grade 10 CAT curriculum</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="flex flex-col items-center p-4 bg-secondary rounded-lg">
                        <div className="p-2 rounded-full bg-tech-primary/20 mb-2">
                          <BadgeCheck className="h-5 w-5 text-tech-primary" />
                        </div>
                        <span className="text-2xl font-bold">{profileData.totalXP}</span>
                        <span className="text-xs text-muted-foreground">Total Points</span>
                      </div>
                      <div className="flex flex-col items-center p-4 bg-secondary rounded-lg">
                        <div className="p-2 rounded-full bg-tech-primary/20 mb-2">
                          <Book className="h-5 w-5 text-tech-primary" />
                        </div>
                        <span className="text-2xl font-bold">{profileData.lessonsCompleted}</span>
                        <span className="text-xs text-muted-foreground">Lessons Completed</span>
                      </div>
                      <div className="flex flex-col items-center p-4 bg-secondary rounded-lg">
                        <div className="p-2 rounded-full bg-tech-primary/20 mb-2">
                          <Award className="h-5 w-5 text-tech-primary" />
                        </div>
                        <span className="text-2xl font-bold">{profileData.quizzesCompleted}</span>
                        <span className="text-xs text-muted-foreground">Quizzes Completed</span>
                      </div>
                      <div className="flex flex-col items-center p-4 bg-secondary rounded-lg">
                        <div className="p-2 rounded-full bg-tech-primary/20 mb-2">
                          <Clock className="h-5 w-5 text-tech-primary" />
                        </div>
                        <span className="text-2xl font-bold">15m</span>
                        <span className="text-xs text-muted-foreground">Learning Time</span>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">Module Progress</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>System Superstars</span>
                              <span>35%</span>
                            </div>
                            <Progress value={35} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Digital Citizenship HQ</span>
                              <span>0%</span>
                            </div>
                            <Progress value={0} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Word Wizardry Academy</span>
                              <span>0%</span>
                            </div>
                            <Progress value={0} className="h-2" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Overall CAT Curriculum Progress</h3>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Grade 10 CAT</span>
                          <span>6%</span>
                        </div>
                        <Progress value={6} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="achievements">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Achievements</CardTitle>
                    <CardDescription>Your latest badges and accomplishments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center p-4 border rounded-lg">
                        <div className="p-2 rounded-full bg-tech-primary text-white mr-4">
                          <BadgeCheck className="h-5 w-5" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium">First Login</h3>
                          <p className="text-sm text-muted-foreground">Successfully logged into CATalyst Learn</p>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          Today
                        </div>
                      </div>
                      <div className="flex items-center p-4 border rounded-lg">
                        <div className="p-2 rounded-full bg-tech-primary text-white mr-4">
                          <Award className="h-5 w-5" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium">Journey Begun</h3>
                          <p className="text-sm text-muted-foreground">Started your first module</p>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          Today
                        </div>
                      </div>
                      <div className="flex items-center p-4 border rounded-lg">
                        <div className="p-2 rounded-full bg-tech-primary text-white mr-4">
                          <Book className="h-5 w-5" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium">System Explorer</h3>
                          <p className="text-sm text-muted-foreground">Complete the Introduction to Computers lesson</p>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          Today
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning History</CardTitle>
                    <CardDescription>Keep track of your learning activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center p-4 border rounded-lg">
                        <div className="p-2 rounded-full bg-tech-blue/20 text-tech-blue mr-4">
                          <Book className="h-5 w-5" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium">Introduction to Computers</h3>
                          <p className="text-sm text-muted-foreground">System Superstars Module</p>
                        </div>
                        <div className="text-right text-sm">
                          <div className="font-medium">Completed</div>
                          <div className="text-muted-foreground">Today</div>
                        </div>
                      </div>
                      <div className="flex items-center p-4 border rounded-lg">
                        <div className="p-2 rounded-full bg-tech-blue/20 text-tech-blue mr-4">
                          <Book className="h-5 w-5" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium">System Superstars Module</h3>
                          <p className="text-sm text-muted-foreground">Started learning journey</p>
                        </div>
                        <div className="text-right text-sm">
                          <div className="font-medium">Started</div>
                          <div className="text-muted-foreground">Today</div>
                        </div>
                      </div>
                      <div className="flex items-center p-4 border rounded-lg">
                        <div className="p-2 rounded-full bg-tech-blue/20 text-tech-blue mr-4">
                          <User className="h-5 w-5" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium">Account Created</h3>
                          <p className="text-sm text-muted-foreground">Welcome to CATalyst Learn!</p>
                        </div>
                        <div className="text-right text-sm">
                          <div className="font-medium">Registered</div>
                          <div className="text-muted-foreground">Today</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
