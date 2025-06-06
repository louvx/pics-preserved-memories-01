
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface UploadedImage {
  file: File;
  preview: string;
  processed?: string;
}

interface ActionButtonsProps {
  uploadedImage: UploadedImage | null;
  isProcessing: boolean;
  user: any;
  remainingRestorations: number;
  onStartRestoration: () => void;
  onDownload: () => void;
  onReset: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  uploadedImage,
  isProcessing,
  user,
  remainingRestorations,
  onStartRestoration,
  onDownload,
  onReset
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      {uploadedImage && !uploadedImage.processed && !isProcessing && (
        <Button 
          onClick={onStartRestoration} 
          size="lg" 
          className="bg-amber-600 hover:bg-blue-700"
          disabled={user && remainingRestorations <= 0}
        >
          {user && remainingRestorations <= 0 ? 'No Restorations Left' : 'Start Restoration'}
        </Button>
      )}
      
      {uploadedImage?.processed && (
        <Button 
          onClick={onDownload} 
          size="lg" 
          className="bg-green-600 hover:bg-green-700"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Restored Photo
        </Button>
      )}
      
      <Button 
        onClick={onReset} 
        variant="outline" 
        size="lg" 
        disabled={isProcessing}
      >
        Upload Another Photo
      </Button>
    </div>
  );
};

export default ActionButtons;
