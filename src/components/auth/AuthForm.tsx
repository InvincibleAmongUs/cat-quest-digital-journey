import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login, register, user } = useAuth();
  const navigate = useNavigate();
  
  // Monitor authentication state and redirect when authenticated
  useEffect(() => {
    if (user?.isAuthenticated) {
      console.log("User authenticated in AuthForm, redirecting to dashboard");
      navigate('/');
    }
  }, [user, navigate]);
  
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    console.log("Login attempt with:", email);
    
    // Demo credentials check
    if ((email === "demo" && password === "demo") || 
        (email === "admin" && password === "admin")) {
      // Create a demo user
      const demoUser = {
        id: "demo-user-1",
        username: email === "demo" ? "DemoStudent" : "AdminUser",
        email: email,
        isAuthenticated: true,
        role: email === "admin" ? "admin" : "student",
        points: 20,
        completedLessons: [1],
        completedModules: [],
        quizScores: {},
        badges: ["first_login"],
      };
      
      // Store the user in localStorage
      localStorage.setItem("user", JSON.stringify(demoUser));
      
      toast({
        title: "Demo Login Successful",
        description: `Welcome to CATalyst Learn, ${demoUser.username}!`,
      });
      
      setIsLoading(false);
      
      // Force navigation after the user is stored in localStorage
      console.log("Demo login successful, navigating to dashboard");
      setTimeout(() => navigate('/'), 100);
      return;
    }
    
    const success = await login(email, password);
    setIsLoading(false);
    
    if (success) {
      console.log("Regular login successful, navigating to dashboard");
      setTimeout(() => navigate('/'), 100);
    }
  };
  
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    const success = await register(username, email, password);
    setIsLoading(false);
    
    if (success) {
      navigate('/');
    }
  };

  // Modified handleDemoLogin to ensure navigation works
  const handleDemoLogin = () => {
    setIsLoading(true);
    
    // Create a demo user
    const demoUser = {
      id: "demo-user-1",
      username: "DemoStudent",
      email: "demo@example.com",
      isAuthenticated: true,
      role: "student",
      points: 20,
      completedLessons: [1],
      completedModules: [],
      quizScores: {},
      badges: ["first_login"],
    };
    
    // Store the user in localStorage
    localStorage.setItem("user", JSON.stringify(demoUser));
    
    toast({
      title: "Demo Login Successful",
      description: "Welcome to CATalyst Learn, DemoStudent!",
    });
    
    setIsLoading(false);
    
    // Force navigation after the user is stored in localStorage
    console.log("Quick demo login successful, navigating to dashboard");
    setTimeout(() => navigate('/'), 100);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Welcome Explorer</CardTitle>
        <CardDescription>Begin your journey into the digital world</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Input
                    id="email"
                    name="email" 
                    placeholder="Email or username"
                    type="text"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Input
                    id="password"
                    name="password"
                    placeholder="Your password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    disabled={isLoading}
                    required
                  />
                </div>
                <Button disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Log in"}
                </Button>
                <Button type="button" variant="outline" onClick={handleDemoLogin} disabled={isLoading}>
                  Quick Demo Login
                </Button>
                <div className="text-xs text-center text-muted-foreground">
                  <p>Demo access: Username: demo, Password: demo</p>
                  <p>Admin access: Username: admin, Password: admin</p>
                </div>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Input
                    id="username"
                    name="username"
                    placeholder="Username"
                    type="text"
                    autoCapitalize="none"
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Input
                    id="email"
                    name="email"
                    placeholder="name@school.edu"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Input
                    id="password"
                    name="password"
                    placeholder="Choose a password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="new-password"
                    disabled={isLoading}
                    required
                  />
                </div>
                <Button disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="text-sm text-muted-foreground text-center">
          By continuing, you agree to our terms of service and privacy policy.
        </div>
      </CardFooter>
    </Card>
  );
}
