
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SignupModal from './SignupModal';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

const Hero = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Find the photo upload section and scroll smoothly
  const handleGetStarted = () => {
    const uploadSection = document.getElementById('upload');
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-20 mx-[8px]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Small Tag/Badge */}
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-amber-200 rounded-full px-4 py-2 mb-8">
              <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                New
              </span>
              <span className="text-gray-700 text-sm font-medium">
                Cutting-Edge AI Model
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-bold text-gray-900 mb-6 leading-tight text-4xl md:text-7xl">
              Bring Your Precious
              <br />
              <span className="text-gray-800">Memories Back to Life</span>
            </h1>

            {/* Sub-headline */}
            <p className="md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed text-base">
              Our advanced AI doesn't just fix old photos—it restores their soul. Repair extreme damage, reveal forgotten details, and see your history in vibrant color, all in a matter of seconds.
            </p>

            {/* Call-to-Action Button */}
            <div className="mb-8">
              <Button 
                size="lg" 
                onClick={handleGetStarted} 
                className="bg-amber-700 hover:bg-amber-800 text-white py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 px-[52px]"
              >
                Restore My Photo For Free
              </Button>
            </div>

            {/* Supporting Trust Snippets */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-green-600" />
                <span>Free Credit</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-green-600" />
                <span>No Credit Card</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-green-600" />
                <span>Instant Result</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* No signup modal shown from here! Signup modal shown on upload/restore in PhotoUpload section */}
    </>
  );
};

export default Hero;
