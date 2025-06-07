
import React from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WatermarkedBeforeAfterSlider from './WatermarkedBeforeAfterSlider';

interface UploadedImage {
  file: File;
  preview: string;
  processed?: string;
  watermarkRemoved?: boolean;
}

interface PhotoPreviewProps {
  uploadedImage: UploadedImage;
  isProcessing: boolean;
  onRemoveWatermark: () => void;
  onDownloadHD: () => void;
}

const PhotoPreview: React.FC<PhotoPreviewProps> = ({ 
  uploadedImage, 
  isProcessing, 
  onRemoveWatermark,
  onDownloadHD 
}) => {
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
              <p className="text-gray-600">Restoring your memory...</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>
      ) : uploadedImage.processed ? (
        <div className="max-w-md mx-auto space-y-4">
          <WatermarkedBeforeAfterSlider
            beforeImage={uploadedImage.preview}
            afterImage={uploadedImage.processed}
            showWatermark={!uploadedImage.watermarkRemoved}
            alt="Photo restoration"
            className="w-full"
          />
          
          {/* Action Button */}
          <div className="text-center">
            {uploadedImage.watermarkRemoved ? (
              <Button 
                onClick={onDownloadHD}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Download HD
              </Button>
            ) : (
              <Button 
                onClick={onRemoveWatermark}
                className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Remove Watermark & Download
              </Button>
            )}
          </div>
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
