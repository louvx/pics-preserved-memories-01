
import React, { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

interface PhotoUploadAreaProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhotoUploadArea: React.FC<PhotoUploadAreaProps> = ({ onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="text-center">
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-blue-400 transition-colors cursor-pointer" 
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Upload your photo</h3>
        <p className="text-gray-500 mb-4">
          Click to browse or drag and drop your image here
        </p>
        <p className="text-sm text-gray-400">
          Supports JPG, PNG, WEBP up to 10MB
        </p>
      </div>
      <Input 
        ref={fileInputRef} 
        type="file" 
        accept="image/*" 
        onChange={onFileUpload} 
        className="hidden" 
      />
    </div>
  );
};

export default PhotoUploadArea;
