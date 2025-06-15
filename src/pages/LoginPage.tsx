import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUserCredits } from "@/hooks/useUserCredits";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import AccountDashboard from "@/components/account/AccountDashboard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginLoading from "@/components/auth/LoginLoading";
import CheckEmailNotice from "@/components/auth/CheckEmailNotice";
import type { User, Session } from "@supabase/supabase-js";

const LoginPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Notice after register or not-verified account
  const [showRegisterInfo, setShowRegisterInfo] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendEmail, setResendEmail] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { remainingRestorations } = useUserCredits(user);

  // Mock restoration data as before (keeps demo structure, can be swapped for real queries)
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

  useEffect(() => {
    // Set up auth state listener before checking session
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
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  // No redirect for logged-in users because dashboard is shown inline

  // LOADING state
  if (isLoading) {
    return <LoginLoading />;
  }

  // DASHBOARD once user is signed in
  if (user) {
    const handleSignOut = async () => {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      toast({
        title: "Signed out",
        description: "You have been signed out."
      });
    };
    const handleDownload = (restoration) => {
      const link = document.createElement("a");
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
    const handleUnlockWatermark = (restorationId) => {
      toast({
        title: "Unlock HD",
        description: "Feature not implemented in demo."
      });
    };

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

  // AUTH FORMS
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
                <CheckEmailNotice
                  resendEmail={resendEmail}
                  resendLoading={resendLoading}
                  onResend={async () => {
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
                  onBack={() => setShowRegisterInfo(false)}
                />
              ) : (
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Sign In</TabsTrigger>
                    <TabsTrigger value="register">Create Account</TabsTrigger>
                  </TabsList>
                  <TabsContent value="login" className="space-y-4">
                    <LoginForm
                      onEmailNotVerified={(email) => {
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

export default LoginPage;
