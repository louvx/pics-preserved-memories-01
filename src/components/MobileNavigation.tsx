
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface MobileNavigationProps {
  isMenuOpen: boolean;
  onMenuClose: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isMenuOpen, onMenuClose }) => {
  if (!isMenuOpen) return null;

  const handleLinkClick = () => {
    onMenuClose();
  };

  const handleRestoreClick = () => {
    onMenuClose();
    document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="lg:hidden pb-4 border-t border-gray-100 mt-4 pt-4">
      <nav className="flex flex-col space-y-4">
        <a 
          href="#how-it-works" 
          className="text-gray-700 hover:text-amber-700 transition-colors font-medium py-2"
          onClick={handleLinkClick}
        >
          How It Works
        </a>
        <Link 
          to="/pricing" 
          className="text-gray-700 hover:text-amber-700 transition-colors font-medium py-2"
          onClick={handleLinkClick}
        >
          Pricing
        </Link>
        <Link 
          to="/blog" 
          className="text-gray-700 hover:text-amber-700 transition-colors font-medium py-2"
          onClick={handleLinkClick}
        >
          Case Studies
        </Link>
        <a 
          href="#faq" 
          className="text-gray-700 hover:text-amber-700 transition-colors font-medium py-2"
          onClick={handleLinkClick}
        >
          FAQ
        </a>
        <div className="pt-4 border-t border-gray-100">
          <Button 
            className="w-full bg-amber-700 hover:bg-amber-800 text-white font-medium"
            onClick={handleRestoreClick}
          >
            Restore Your Photos
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default MobileNavigation;
