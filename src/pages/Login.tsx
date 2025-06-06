import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Download, Crown, Eye, EyeOff } from 'lucide-react';
import PhotoUpload from '@/components/PhotoUpload';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SocialLoginButtons from '@/components/SocialLoginButtons';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';
import { useUserCredits } from '@/hooks/useUserCredits';

const Login = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();
  const { remainingRestorations } = useUserCredits(user);

  // Mock restoration data for logged-in users
  const [restorations] = useState([
    {
      id: 1,
      originalImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop&auto=format&sepia=100&brightness=0.7",
      restoredImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop&auto=format",
      hasWatermark: true,
      uploadDate: "2024-12-15",
      filename: "family_portrait_1920s.jpg"
    },
    {
      id: 2,
      originalImage: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=300&fit=crop&auto=format&sepia=100&brightness=0.5",
      restoredImage: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=300&fit=crop&auto=format",
      hasWatermark: false,
      uploadDate: "2024-12-10",
      filename: "wedding_1955.jpg"
    }
  ]);

  // Set up auth state listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          toast({
            title: "Login successful",
            description: "Welcome! You can now view your restoration results."
          });
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });

    if (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
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
    
    const { error } = await supabase.auth.signUp({
      email: registerEmail,
      password: registerPassword,
      options: {
        data: {
          full_name: registerName,
        },
        emailRedirectTo: `${window.location.origin}/login`
      }
    });

    if (error) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Account created",
        description: "Please check your email to verify your account."
      });
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been successfully signed out."
      });
    }
  };

  const handleDownload = (restoration: any) => {
    if (restoration.hasWatermark) {
      toast({
        title: "Watermarked version",
        description: "This is a watermarked preview. Unlock the full quality version by upgrading.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Download started",
        description: "Your high-quality restored photo is being downloaded."
      });
    }
  };

  const handleUnlockWatermark = (restorationId: number) => {
    toast({
      title: "Upgrade required",
      description: "Redirecting to payment to unlock watermark-free version..."
    });
  };

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        <Header />
        
        {/* Account Dashboard */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                  My Account
                </h1>
                <Button onClick={handleSignOut} variant="outline">
                  Sign Out
                </Button>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Manage your restorations and upload new photos
              </p>
              
              {/* Restoration Credits */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-2">
                  <Crown className="h-5 w-5 text-amber-600" />
                  <span className="font-medium text-amber-800">
                    {remainingRestorations > 0 
                      ? `${remainingRestorations} restoration${remainingRestorations > 1 ? 's' : ''} remaining`
                      : 'All free restorations used'
                    }
                  </span>
                </div>
                {remainingRestorations === 0 && (
                  <p className="text-sm text-amber-700 mt-2">
                    Upgrade to continue restoring photos without watermarks
                  </p>
                )}
              </div>
            </div>

            {/* Photo Upload Section - Only visible for logged-in users */}
            <div className="max-w-4xl mx-auto mb-12">
              <PhotoUpload />
            </div>

            <Tabs defaultValue="results" className="w-full">
              <TabsList className="grid w-full grid-cols-1 max-w-md mx-auto">
                <TabsTrigger value="results">My Restorations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="results" className="mt-8">
                {/* ... keep existing code (restorations display logic) */}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Welcome to Photo Restoration
            </h1>
            <p className="text-xl text-gray-600">
              Sign in to your account or create a new one to start restoring your precious memories.
            </p>
          </div>

          {/* Login/Register Section */}
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
                  
                  <SocialLoginButtons />
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
                  
                  <SocialLoginButtons />
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
      </div>

      <Footer />
    </div>
  );
};

export default Login;
