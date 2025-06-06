
import React, { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useUserCredits } from '@/hooks/useUserCredits';
import PhotoUploadArea from './PhotoUploadArea';
import PhotoPreview from './PhotoPreview';
import ActionButtons from './ActionButtons';
import UpgradePrompt from './UpgradePrompt';

interface UploadedImage {
  file: File;
  preview: string;
  processed?: string;
}

const PhotoUpload = () => {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [user, setUser] = useState(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { remainingRestorations, deductCredit, refetchCredits } = useUserCredits(user);

  // Get current user
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

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
    setUploadedImage({
      file,
      preview
    });
    
    toast({
      title: "Photo uploaded",
      description: "Click 'Start Restoration' to begin processing"
    });
  };

  const simulateRestoration = async () => {
    if (!uploadedImage) return;

    // Check if user is logged in
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to restore photos",
        variant: "destructive"
      });
      return;
    }

    // Check if user has remaining restorations
    if (remainingRestorations <= 0) {
      toast({
        title: "No restorations left",
        description: "You have used all your free restorations. Please upgrade to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // First, deduct the credit
      const creditDeducted = await deductCredit();
      
      if (!creditDeducted) {
        toast({
          title: "Error",
          description: "Unable to process restoration. Please try again.",
          variant: "destructive"
        });
        setIsProcessing(false);
        return;
      }

      // Save restoration record to database
      const { error: insertError } = await supabase
        .from('photo_restorations')
        .insert({
          user_id: user.id,
          filename: uploadedImage.file.name,
          status: 'processing'
        });

      if (insertError) {
        console.error('Error saving restoration:', insertError);
      }

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Use the uploaded restoration images for demo
      setUploadedImage(prev => prev ? {
        ...prev,
        processed: "/lovable-uploads/ef7b6917-efe1-4e89-a350-ef968ab28d40.png"
      } : null);

      toast({
        title: "Restoration complete!",
        description: "Your photo has been successfully restored"
      });

      // Refresh credits to show updated count
      refetchCredits();

    } catch (error) {
      console.error('Restoration error:', error);
      toast({
        title: "Error",
        description: "Failed to process restoration. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
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
    <section id="upload" className="bg-gradient-to-br from-orange-50 to-amber-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            See Your Photo Restored – In Seconds!
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload an image and instantly preview our AI's restoration power.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {!uploadedImage ? (
            <PhotoUploadArea onFileUpload={handleFileUpload} />
          ) : (
            <div>
              <PhotoPreview 
                uploadedImage={uploadedImage} 
                isProcessing={isProcessing} 
              />

              <ActionButtons
                uploadedImage={uploadedImage}
                isProcessing={isProcessing}
                user={user}
                remainingRestorations={remainingRestorations}
                onStartRestoration={simulateRestoration}
                onDownload={downloadRestored}
                onReset={resetUpload}
              />

              <UpgradePrompt
                uploadedImage={uploadedImage}
                user={user}
                remainingRestorations={remainingRestorations}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PhotoUpload;
