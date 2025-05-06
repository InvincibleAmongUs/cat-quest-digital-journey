
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface AuthFormProps {
  onAuthenticated: (userData: { username: string; email: string }) => void;
}

export default function AuthForm({ onAuthenticated }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // In a real app, this would connect to a backend authentication service
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Demo login - simulate API call
    setTimeout(() => {
      setIsLoading(false);
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const username = email.split("@")[0];
      
      onAuthenticated({ username, email });
      
      toast({
        title: "Welcome back, explorer!",
        description: "Your digital journey awaits.",
      });
    }, 1000);
  };
  
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Demo registration - simulate API call
    setTimeout(() => {
      setIsLoading(false);
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const username = formData.get("username") as string;
      
      onAuthenticated({ username, email });
      
      toast({
        title: "Account created!",
        description: "Welcome to your tech adventure.",
      });
    }, 1000);
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
