
import React from 'react';

interface UploadedImage {
  file: File;
  preview: string;
  processed?: string;
}

interface UpgradePromptProps {
  uploadedImage: UploadedImage | null;
  user: any;
  remainingRestorations: number;
}

const UpgradePrompt: React.FC<UpgradePromptProps> = ({ 
  uploadedImage, 
  user, 
  remainingRestorations 
}) => {
  if (uploadedImage?.processed) {
    return (
      <div className="mt-6 p-4 bg-blue-50 rounded-lg text-center">
        <p className="text-blue-800 font-medium">
          Love the results? Choose a service package below for full-quality restoration!
        </p>
      </div>
    );
  }

  if (user && remainingRestorations <= 0 && !uploadedImage?.processed) {
    return (
      <div className="mt-6 p-4 bg-amber-50 rounded-lg text-center">
        <p className="text-amber-800 font-medium">
          You've used all your free restorations. Please upgrade to continue.
        </p>
      </div>
    );
  }

  return null;
};

export default UpgradePrompt;
