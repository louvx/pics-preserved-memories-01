
import React from 'react';
import { Crown } from 'lucide-react';

interface RestorationsDisplayProps {
  remainingRestorations: number;
  isMobile?: boolean;
}

const RestorationsDisplay: React.FC<RestorationsDisplayProps> = ({ 
  remainingRestorations, 
  isMobile = false 
}) => {
  if (isMobile) {
    return (
      <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-lg px-2 py-1">
        <Crown className="h-3 w-3 text-amber-600" />
        <span className="font-medium text-amber-800 text-xs">
          {remainingRestorations}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
      <Crown className="h-4 w-4 text-amber-600" />
      <span className="font-medium text-amber-800 text-sm">
        {remainingRestorations > 0 
          ? `${remainingRestorations} Restoration${remainingRestorations > 1 ? 's' : ''} Left`
          : 'No Restorations Left'
        }
      </span>
    </div>
  );
};

export default RestorationsDisplay;
