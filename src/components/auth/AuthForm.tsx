
import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Removed useNavigate
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { login, register, isLoading } = useAuth();
  // const navigate = useNavigate(); // Removed useNavigate

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    try {
      await login(email, password);
      // Navigation is now handled by Login.tsx based on AuthContext state
      // if (success) {
      //   navigate('/terms'); // Removed navigation
      // }
    } catch (error) {
      // The login function in AuthContext now typically handles its own toasts
      // for Supabase errors. This catch is for unexpected errors in the process.
      console.error('Login error in AuthForm:', error);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred during login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    try {
      await register(username, email, password);
      // Navigation is now handled by Login.tsx based on AuthContext state
      // if (success) {
      //  navigate('/terms'); // Removed navigation
      // }
    } catch (error) {
      // The register function in AuthContext now typically handles its own toasts
      // for Supabase errors. This catch is for unexpected errors in the process.
      console.error('Registration error in AuthForm:', error);
      toast({
        title: "Registration Failed",
        description: "An unexpected error occurred during registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                    id="email-login" // Ensure unique IDs if elements are ever simultaneously in DOM
                    name="email" 
                    placeholder="Email"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isSubmitting || isLoading}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Input
                    id="password-login" // Ensure unique IDs
                    name="password"
                    placeholder="Your password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    disabled={isSubmitting || isLoading}
                    required
                  />
                </div>
                <Button type="submit" disabled={isSubmitting || isLoading}>
                  {isSubmitting ? "Logging in..." : "Log in"}
                </Button>
                <div className="text-xs text-center text-muted-foreground">
                  <p>Demo admin access: Email: 24529974@mylife.unisa.ac.za</p>
                </div>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Input
                    id="username-register" // Ensure unique IDs
                    name="username"
                    placeholder="Username"
                    type="text"
                    autoCapitalize="none"
                    disabled={isSubmitting || isLoading}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Input
                    id="email-register" // Ensure unique IDs
                    name="email"
                    placeholder="name@school.edu"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isSubmitting || isLoading}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Input
                    id="password-register" // Ensure unique IDs
                    name="password"
                    placeholder="Choose a password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="new-password"
                    disabled={isSubmitting || isLoading}
                    required
                  />
                </div>
                <Button type="submit" disabled={isSubmitting || isLoading}>
                  {isSubmitting ? "Creating account..." : "Create account"}
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

