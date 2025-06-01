
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Download, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UploadedImage {
  file: File;
  preview: string;
  processed?: string;
}

const PhotoUpload = () => {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 10MB",
        variant: "destructive"
      });
      return;
    }

    const preview = URL.createObjectURL(file);
    setUploadedImage({ file, preview });
    toast({
      title: "Photo uploaded",
      description: "Click 'Start Restoration' to begin processing"
    });
  };

  const simulateRestoration = async () => {
    if (!uploadedImage) return;

    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // For demo purposes, use a placeholder "restored" image
    // In a real app, this would be the actual restored image from your AI service
    setUploadedImage(prev => prev ? {
      ...prev,
      processed: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop"
    } : null);
    
    setIsProcessing(false);
    toast({
      title: "Restoration complete!",
      description: "Your photo has been successfully restored"
    });
  };

  const downloadRestored = () => {
    if (!uploadedImage?.processed) return;
    
    // In a real app, this would download the actual restored image
    const link = document.createElement('a');
    link.href = uploadedImage.processed;
    link.download = `restored_${uploadedImage.file.name}`;
    link.click();
    
    toast({
      title: "Download started",
      description: "Your restored photo is being downloaded"
    });
  };

  const resetUpload = () => {
    if (uploadedImage?.preview) {
      URL.revokeObjectURL(uploadedImage.preview);
    }
    setUploadedImage(null);
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section className="py-16 bg-gray-50" id="upload">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Try Our Restoration Service
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your photo and see the magic happen. Get a preview of our AI restoration technology.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {!uploadedImage ? (
            // Upload section
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
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          ) : (
            // Preview and results section
            <div>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Original image */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-center">Original Photo</h3>
                  <div className="relative">
                    <img
                      src={uploadedImage.preview}
                      alt="Original photo"
                      className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                      Before
                    </div>
                  </div>
                </div>

                {/* Processed image */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-center">Restored Photo</h3>
                  <div className="relative">
                    {isProcessing ? (
                      <div className="w-full h-64 bg-gray-100 rounded-lg shadow-md flex items-center justify-center">
                        <div className="text-center">
                          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-600" />
                          <p className="text-gray-600">Restoring your photo...</p>
                        </div>
                      </div>
                    ) : uploadedImage.processed ? (
                      <>
                        <img
                          src={uploadedImage.processed}
                          alt="Restored photo"
                          className="w-full h-64 object-cover rounded-lg shadow-md"
                        />
                        <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-sm">
                          After
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-64 bg-gray-100 rounded-lg shadow-md flex items-center justify-center">
                        <p className="text-gray-500">Restored photo will appear here</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {!uploadedImage.processed && !isProcessing && (
                  <Button
                    onClick={simulateRestoration}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Start Restoration
                  </Button>
                )}
                
                {uploadedImage.processed && (
                  <Button
                    onClick={downloadRestored}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Restored Photo
                  </Button>
                )}
                
                <Button
                  onClick={resetUpload}
                  variant="outline"
                  size="lg"
                  disabled={isProcessing}
                >
                  Upload Another Photo
                </Button>
              </div>

              {uploadedImage.processed && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg text-center">
                  <p className="text-blue-800 font-medium">
                    Love the results? Choose a service package above for full-quality restoration!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PhotoUpload;
