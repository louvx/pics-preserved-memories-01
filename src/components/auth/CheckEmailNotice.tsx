
import React from "react";
import { Button } from "@/components/ui/button";

interface CheckEmailNoticeProps {
  resendEmail: string;
  resendLoading: boolean;
  onResend: () => void;
  onBack: () => void;
}

const CheckEmailNotice: React.FC<CheckEmailNoticeProps> = ({
  resendEmail,
  resendLoading,
  onResend,
  onBack,
}) => (
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
        onClick={onResend}
      >
        {resendLoading ? "Sending..." : "Resend Verification Email"}
      </Button>
    </div>
    <Button
      variant="outline"
      className="w-full"
      onClick={onBack}
    >
      Back to Login
    </Button>
  </div>
);

export default CheckEmailNotice;
