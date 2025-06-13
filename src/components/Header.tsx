import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { useUserCredits } from '@/hooks/useUserCredits';
import UserDropdown from './UserDropdown';
import RestorationsDisplay from './RestorationsDisplay';
import MobileNavigation from './MobileNavigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const { remainingRestorations, loading } = useUserCredits(user);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleRestoreClick = () => {
    document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Restore.pics</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a 
              href="#how-it-works" 
              className="text-gray-700 hover:text-amber-700 transition-colors font-medium"
            >
              How It Works
            </a>
            <Link 
              to="/pricing" 
              className="text-gray-700 hover:text-amber-700 transition-colors font-medium"
            >
              Pricing
            </Link>
            <Link 
              to="/blog" 
              className="text-gray-700 hover:text-amber-700 transition-colors font-medium"
            >
              Case Studies
            </Link>
            <Link 
              to="/faq" 
              className="text-gray-700 hover:text-amber-700 transition-colors font-medium"
            >
              FAQ
            </Link>
            {user && (
              <Link 
                to="/dashboard" 
                className="text-gray-700 hover:text-amber-700 transition-colors font-medium"
              >
                My Restorations
              </Link>
            )}
          </nav>

          {/* Right side - Credits & User Account & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Restoration Credits - Only show when logged in */}
            {user && !loading && (
              <RestorationsDisplay remainingRestorations={remainingRestorations} />
            )}

            {/* User Account Dropdown */}
            <UserDropdown user={user} onSignOut={handleSignOut} />

            {/* Primary CTA Button */}
            <Button 
              className="bg-amber-700 hover:bg-amber-800 text-white font-medium px-6 py-2 shadow-sm"
              onClick={handleRestoreClick}
            >
              Restore Your Photos
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Credits - Only show when logged in */}
            {user && !loading && (
              <RestorationsDisplay remainingRestorations={remainingRestorations} isMobile />
            )}

            {/* Mobile User Icon */}
            <UserDropdown user={user} onSignOut={handleSignOut} isMobile />

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-amber-700 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNavigation 
          isMenuOpen={isMenuOpen} 
          onMenuClose={() => setIsMenuOpen(false)} 
        />
      </div>
    </header>
  );
};

export default Header;
