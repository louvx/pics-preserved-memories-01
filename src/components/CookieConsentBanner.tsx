
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const COOKIE_KEY = "cookie_consent_given";

const CookieConsentBanner: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const cookieDecision = localStorage.getItem(COOKIE_KEY);
    if (!cookieDecision) {
      setShow(true);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    localStorage.setItem(COOKIE_KEY, accepted ? "accepted" : "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 w-full z-50 flex justify-center pointer-events-none"
    )}>
      <div className="pointer-events-auto max-w-xl w-full bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 rounded-t-lg shadow-lg px-6 py-4 flex flex-col md:flex-row items-center gap-4 md:gap-6 font-sans text-base animate-fade-in">
        <div className="flex-1 text-gray-800 dark:text-gray-200">
          <span className="block font-semibold mb-1 text-lg">We use cookies</span>
          <span>
            We use cookies to improve your experience and analyze site traffic. By clicking <b>‘Accept All’</b>, you agree to our use of cookies.{" "}
            <a href="/privacy-policy" className="text-accent underline ml-1 font-medium hover:opacity-75 transition">Learn more</a>.
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="default"
            className="font-bold px-6 py-2"
            aria-label="Accept All Cookies"
            onClick={() => handleConsent(true)}
          >
            Accept All
          </Button>
          <Button
            variant="ghost"
            className="px-5 py-2 border-none text-accent underline hover:bg-transparent"
            aria-label="Decline Cookies"
            onClick={() => handleConsent(false)}
          >
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
