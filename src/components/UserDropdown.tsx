
import React from 'react';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface UserDropdownProps {
  user: SupabaseUser | null;
  onSignOut: () => Promise<void>;
  isMobile?: boolean;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user, onSignOut, isMobile = false }) => {
  return (
    <Button 
      variant="ghost" 
      size="sm"
      className={`flex items-center ${isMobile ? 'text-gray-700 hover:text-amber-700 hover:bg-amber-50' : 'text-gray-700 hover:text-amber-700 hover:bg-amber-50'}`}
      asChild
    >
      <Link to="/login">
        <User size={20} />
      </Link>
    </Button>
  );
};

export default UserDropdown;
