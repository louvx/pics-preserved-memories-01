import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import AccountDashboard from "@/components/account/AccountDashboard";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { remainingRestorations } = useUserCredits(user);

  // MOVE these to the top - before any return!
  const [showRegisterInfo, setShowRegisterInfo] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendEmail, setResendEmail] = useState('');

  // Step 1: Handler for sign out (must be defined before conditional logic)
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    toast({
      title: "Signed out",
      description: "You have been signed out."
    });
  };

  // Step 2: Handler for downloading restored image (no-op for mock data)
  const handleDownload = (restoration: { id: number; originalImage: string; restoredImage: string; hasWatermark: boolean; uploadDate: string; filename: string; }) => {
    const link = document.createElement('a');
    link.href = restoration.restoredImage;
    link.download = `restored_${restoration.filename}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "Download started",
      description: "Your restored photo is being downloaded"
    });
  };

  // Step 3: Handler for unlocking watermark (no-op for mock data)
  const handleUnlockWatermark = (restorationId: number) => {
    toast({
      title: "Unlock HD",
      description: "Feature not implemented in demo."
    });
  };

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
        setIsLoading(false);
        
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
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  // Redirect logged-in users away from auth pages
  useEffect(() => {
    if (!isLoading && user) {
      // User is already logged in, stay on this page (account dashboard)
      return;
    }
  }, [user, isLoading, navigate]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // -- User state --
  if (user) {
    // Account Dashboard (moved to separate component)
    return (
      <AccountDashboard
        user={user}
        remainingRestorations={remainingRestorations}
        restorations={restorations}
        handleSignOut={handleSignOut}
        handleDownload={handleDownload}
        handleUnlockWatermark={handleUnlockWatermark}
      />
    );
  }

  // Main login/register area
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
              {showRegisterInfo ? (
                // "Check your email" screen after registration
                <div className="flex flex-col items-center space-y-6 py-8">
                  <div className="bg-amber-50 border-amber-300 border rounded-lg px-6 py-5 text-center">
                    <h2 className="text-xl font-semibold text-amber-800 mb-2">
                      Check your email to verify your account!
                    </h2>
                    <p className="text-amber-700 mb-2">
                      We sent a verification link to: <b>{resendEmail}</b>
                    </p>
                    <p className="text-amber-700 mb-2">
                      Please check your inbox (and spam/junk folders). You must verify your account before logging in.
                    </p>
                    <Button
                      disabled={resendLoading}
                      variant="outline"
                      className="mt-2"
                      onClick={async () => {
                        setResendLoading(true);
                        const { error: resendErr } = await supabase.auth.resend({
                          type: "signup",
                          email: resendEmail,
                        });
                        setResendLoading(false);
                        toast({
                          title: resendErr ? "Resend failed" : "Email sent",
                          description: resendErr
                            ? resendErr.message
                            : "A fresh verification email was sent. Please check your email.",
                          variant: resendErr ? "destructive" : "default",
                        });
                      }}
                    >
                      {resendLoading ? "Sending..." : "Resend Verification Email"}
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowRegisterInfo(false)}
                  >
                    Back to Login
                  </Button>
                </div>
              ) : (
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Sign In</TabsTrigger>
                    <TabsTrigger value="register">Create Account</TabsTrigger>
                  </TabsList>
                  <TabsContent value="login" className="space-y-4">
                    <LoginForm
                      onEmailNotVerified={(email) => {
                        // Show the check-your-email block if a login fails due to not verified
                        setShowRegisterInfo(true);
                        setResendEmail(email);
                      }}
                    />
                  </TabsContent>
                  <TabsContent value="register" className="space-y-4">
                    <RegisterForm
                      onShowCheckEmail={(email) => {
                        setShowRegisterInfo(true);
                        setResendEmail(email);
                      }}
                    />
                  </TabsContent>
                </Tabs>
              )}
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
