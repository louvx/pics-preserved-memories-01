
import React from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WatermarkedBeforeAfterSlider from './WatermarkedBeforeAfterSlider';

interface UploadedImage {
  file: File;
  preview: string;
  processed?: string;
  watermarkRemoved?: boolean;
  aspectRatio?: number;
}

interface PhotoPreviewProps {
  uploadedImage: UploadedImage;
  isProcessing: boolean;
  isFreeUser: boolean;
  onRemoveWatermark: () => void;
  onDownloadHD: () => void;
}

const PhotoPreview: React.FC<PhotoPreviewProps> = ({ 
  uploadedImage, 
  isProcessing, 
  isFreeUser,
  onRemoveWatermark,
  onDownloadHD 
}) => {
  // Calculate dynamic height based on aspect ratio
  const getImageContainerStyle = () => {
    if (uploadedImage.aspectRatio) {
      const maxWidth = 448; // max-w-md (28rem = 448px)
      const height = maxWidth / uploadedImage.aspectRatio;
      return {
        width: maxWidth,
        height: Math.min(height, 400), // Cap height at 400px
        aspectRatio: uploadedImage.aspectRatio
      };
    }
    return {
      height: 256 // h-64 default
    };
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-center">
        {uploadedImage.processed ? 'Restoration Complete!' : 'Photo Preview'}
      </h3>
      
      {isProcessing ? (
        <div className="w-full max-w-md mx-auto">
          <div 
            className="w-full bg-gray-100 rounded-lg shadow-md flex items-center justify-center"
            style={getImageContainerStyle()}
          >
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-600" />
              <p className="text-gray-600">Restoring your memory...</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>
      ) : uploadedImage.processed ? (
        <div className="max-w-md mx-auto space-y-4">
          <div style={getImageContainerStyle()} className="mx-auto">
            <WatermarkedBeforeAfterSlider
              beforeImage={uploadedImage.preview}
              afterImage={uploadedImage.processed}
              showWatermark={isFreeUser && !uploadedImage.watermarkRemoved}
              alt="Photo restoration"
              className="w-full h-full"
            />
          </div>
          
          {/* Action Button */}
          <div className="text-center">
            {uploadedImage.watermarkRemoved || !isFreeUser ? (
              <Button 
                onClick={onDownloadHD}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Download HD
              </Button>
            ) : (
              <div className="space-y-3">
                <Button 
                  onClick={onRemoveWatermark}
                  className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full"
                >
                  Remove Watermark & Download
                </Button>
                <p className="text-sm text-gray-600">
                  Purchase credits to download without watermark
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <div className="relative">
            <img 
              src={uploadedImage.preview} 
              alt="Original photo" 
              className="w-full rounded-lg shadow-md object-cover" 
              style={getImageContainerStyle()}
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
