
import React from 'react';
import { Loader2 } from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';

interface UploadedImage {
  file: File;
  preview: string;
  processed?: string;
}

interface PhotoPreviewProps {
  uploadedImage: UploadedImage;
  isProcessing: boolean;
}

const PhotoPreview: React.FC<PhotoPreviewProps> = ({ uploadedImage, isProcessing }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-center">
        {uploadedImage.processed ? 'Restoration Complete!' : 'Photo Preview'}
      </h3>
      
      {isProcessing ? (
        <div className="w-full max-w-md mx-auto">
          <div className="w-full h-64 bg-gray-100 rounded-lg shadow-md flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-600" />
              <p className="text-gray-600">Restoring your photo...</p>
            </div>
          </div>
        </div>
      ) : uploadedImage.processed ? (
        <div className="max-w-md mx-auto">
          <BeforeAfterSlider
            beforeImage="/lovable-uploads/7117f7ec-9fc2-42f1-a143-e78135ff688e.png"
            afterImage={uploadedImage.processed}
            alt="Photo restoration"
            className="w-full"
          />
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <div className="relative">
            <img 
              src={uploadedImage.preview} 
              alt="Original photo" 
              className="w-full h-64 object-cover rounded-lg shadow-md" 
            />
            <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-sm">
              Ready for Restoration
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoPreview;
