
import React from 'react';
import { User, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface UserDropdownProps {
  user: SupabaseUser | null;
  onSignOut: () => Promise<void>;
  isMobile?: boolean;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user, onSignOut, isMobile = false }) => {
  const triggerButton = (
    <Button 
      variant="ghost" 
      size="sm"
      className={`flex items-center ${isMobile ? 'text-gray-700 hover:text-amber-700 hover:bg-amber-50' : 'space-x-1 text-gray-700 hover:text-amber-700 hover:bg-amber-50'}`}
    >
      <User size={20} />
      {!isMobile && <ChevronDown size={16} />}
    </Button>
  );

  const menuContent = (
    <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200">
      {!user ? (
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
            <Link to="/login" className="w-full">
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
            onClick={onSignOut}
          >
            Logout
          </DropdownMenuItem>
        </>
      )}
    </DropdownMenuContent>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {triggerButton}
      </DropdownMenuTrigger>
      {menuContent}
    </DropdownMenu>
  );
};

export default UserDropdown;
