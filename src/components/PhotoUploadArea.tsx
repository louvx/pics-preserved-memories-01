
import React, { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface PhotoUploadAreaProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhotoUploadArea: React.FC<PhotoUploadAreaProps> = ({ onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="text-center">
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-16 hover:border-amber-400 hover:bg-amber-50 transition-all duration-300 cursor-pointer group" 
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="mx-auto h-16 w-16 text-gray-400 group-hover:text-amber-600 transition-colors duration-300 mb-6" />
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors duration-300">
          Drag & Drop Your Photo Here
        </h3>
        <p className="text-gray-600 mb-6 text-lg">
          or click to browse and select your image
        </p>
        <Button 
          type="button"
          className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Upload Photo
        </Button>
        <p className="text-sm text-gray-500 mt-4">
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
