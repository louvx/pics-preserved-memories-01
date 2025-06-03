
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import PhotoUpload from '@/components/PhotoUpload';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Login = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Login successful",
      description: "Welcome back! You can now upload photos for restoration."
    });
    
    // In a real app, this would handle authentication
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName || !registerEmail || !registerPassword || !confirmPassword) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    if (registerPassword !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Account created",
      description: "Welcome! You can now upload photos for restoration."
    });
    
    // In a real app, this would handle registration
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get Started with Photo Restoration
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sign in to your account or create a new one to start restoring your precious memories.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Login/Register Section */}
            <div className="space-y-6">
              <Card className="w-full bg-white shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Welcome Back
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Sign in to your account or create a new one
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Sign In</TabsTrigger>
                      <TabsTrigger value="register">Create Account</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="login" className="space-y-4">
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="login-email">Email</Label>
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="Enter your email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="login-password">Password</Label>
                          <Input
                            id="login-password"
                            type="password"
                            placeholder="Enter your password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800">
                          Sign In
                        </Button>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="register" className="space-y-4">
                      <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="register-name">Full Name</Label>
                          <Input
                            id="register-name"
                            type="text"
                            placeholder="Enter your full name"
                            value={registerName}
                            onChange={(e) => setRegisterName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="register-email">Email</Label>
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="Enter your email"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="register-password">Password</Label>
                          <Input
                            id="register-password"
                            type="password"
                            placeholder="Create a password"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm Password</Label>
                          <Input
                            id="confirm-password"
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800">
                          Create Account
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                
                <CardFooter className="text-center text-sm text-gray-600">
                  <p>
                    By continuing, you agree to our Terms of Service and Privacy Policy
                  </p>
                </CardFooter>
              </Card>
            </div>

            {/* Upload Section */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Upload Your Photo
                  </h3>
                  <p className="text-gray-600">
                    Start restoring your precious memories today
                  </p>
                </div>
                <PhotoUpload />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
