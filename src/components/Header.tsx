import React, { useState } from 'react';
import { Menu, X, User, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
            <a 
              href="#services" 
              className="text-gray-700 hover:text-amber-700 transition-colors font-medium"
            >
              Pricing
            </a>
            <Link 
              to="/blog" 
              className="text-gray-700 hover:text-amber-700 transition-colors font-medium"
            >
              Case Studies
            </Link>
            <a 
              href="#faq" 
              className="text-gray-700 hover:text-amber-700 transition-colors font-medium"
            >
              FAQ
            </a>
          </nav>

          {/* Right side - User Account & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* User Account Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center space-x-1 text-gray-700 hover:text-amber-700 hover:bg-amber-50"
                >
                  <User size={20} />
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200">
                {!isLoggedIn ? (
                  <>
                    <DropdownMenuItem className="cursor-pointer hover:bg-amber-50">
                      <Link to="/login" className="w-full">
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-amber-50">
                      <Link to="/login" className="w-full">
                        Register
                      </Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem className="cursor-pointer hover:bg-amber-50">
                      <Link to="/results" className="w-full">
                        My Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-amber-50">
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer hover:bg-amber-50">
                      Account Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="cursor-pointer hover:bg-red-50 text-red-600"
                      onClick={() => setIsLoggedIn(false)}
                    >
                      Logout
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Primary CTA Button */}
            <Button 
              className="bg-amber-700 hover:bg-amber-800 text-white font-medium px-6 py-2 shadow-sm"
              onClick={() => document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Restore Your Photos
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile User Icon */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-700 hover:text-amber-700 hover:bg-amber-50"
                >
                  <User size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200">
                {!isLoggedIn ? (
                  <>
                    <DropdownMenuItem className="cursor-pointer hover:bg-amber-50">
                      <Link to="/login" className="w-full">
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-amber-50">
                      <Link to="/login" className="w-full">
                        Register
                      </Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem className="cursor-pointer hover:bg-amber-50">
                      <Link to="/results" className="w-full">
                        My Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-amber-50">
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer hover:bg-amber-50">
                      Account Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="cursor-pointer hover:bg-red-50 text-red-600"
                      onClick={() => setIsLoggedIn(false)}
                    >
                      Logout
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

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
        {isMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-100 mt-4 pt-4">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#how-it-works" 
                className="text-gray-700 hover:text-amber-700 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="#services" 
                className="text-gray-700 hover:text-amber-700 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <Link 
                to="/blog" 
                className="text-gray-700 hover:text-amber-700 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Case Studies
              </Link>
              <a 
                href="#faq" 
                className="text-gray-700 hover:text-amber-700 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </a>
              <div className="pt-4 border-t border-gray-100">
                <Button 
                  className="w-full bg-amber-700 hover:bg-amber-800 text-white font-medium"
                  onClick={() => {
                    setIsMenuOpen(false);
                    document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Restore Your Photos
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
