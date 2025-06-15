
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import SocialLoginButtons from "@/components/SocialLoginButtons";

interface LoginFormProps {
  onEmailNotVerified?: (email: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onEmailNotVerified }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { toast } = useToast();
  const [resendLoading, setResendLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });

    if (error) {
      if (
        error.message &&
        (error.message.toLowerCase().includes("email not confirmed") ||
          error.message.toLowerCase().includes("email confirmation") ||
          error.message.toLowerCase().includes("confirm your email"))
      ) {
        toast({
          title: "Email not verified",
          description: (
            <span>
              Your account is not active yet.<br />
              Please check your email inbox (and spam folder) and verify your email address.<br />
              <span
                className="underline cursor-pointer text-amber-700"
                onClick={async () => {
                  setResendLoading(true);
                  const { error: resendErr } = await supabase.auth.resend({
                    type: "signup",
                    email: loginEmail,
                  });
                  setResendLoading(false);
                  toast({
                    title: resendErr
                      ? "Resend failed"
                      : "Verification Sent",
                    description: resendErr
                      ? resendErr.message
                      : "A new verification email has been sent. Please check your inbox.",
                    variant: resendErr ? "destructive" : "default",
                  });
                }}
              >
                {resendLoading ? "Sending..." : "Resend verification email"}
              </span>
            </span>
          ),
          variant: "destructive",
        });
        onEmailNotVerified?.(loginEmail);
        return;
      }
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default LoginForm;
