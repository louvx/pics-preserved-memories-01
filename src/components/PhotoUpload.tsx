import React, { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useUserCredits } from '@/hooks/useUserCredits';
import PhotoUploadArea from './PhotoUploadArea';
import PhotoPreview from './PhotoPreview';
import ActionButtons from './ActionButtons';
import UpgradePrompt from './UpgradePrompt';
import PricingModal from './PricingModal';
import type { User } from '@supabase/supabase-js';

interface UploadedImage {
  file: File;
  preview: string;
  processed?: string;
  watermarkRemoved?: boolean;
  aspectRatio?: number;
}

const PhotoUpload = () => {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { remainingRestorations, isFreeUser, packageType, deductCredit, refetchCredits } = useUserCredits(user);

  // Get current user
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    
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
    
    // Calculate aspect ratio from the image
    const img = new Image();
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      setUploadedImage({ file, preview, aspectRatio });
    };
    img.src = preview;
    
    toast({
      title: "Photo uploaded",
      description: user ? "Click 'Start Restoration' to begin processing" : "Sign up to restore your photo"
    });
  };

  const uploadImageToStorage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { data, error } = await supabase.storage
        .from('photo-uploads')
        .upload(filePath, file);

      if (error) {
        console.error('Upload error:', error);
        return null;
      }

      const { data: publicUrl } = supabase.storage
        .from('photo-uploads')
        .getPublicUrl(filePath);

      return publicUrl.publicUrl;
    } catch (error) {
      console.error('Storage error:', error);
      return null;
    }
  };

  const restorePhoto = async () => {
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
        description: "You have used all your restorations. Please upgrade to continue.",
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

      // Upload image to storage to get a public URL
      const imageUrl = await uploadImageToStorage(uploadedImage.file);
      if (!imageUrl) {
        toast({
          title: "Upload failed",
          description: "Failed to upload image. Please try again.",
          variant: "destructive"
        });
        setIsProcessing(false);
        return;
      }

      console.log('Uploaded image URL:', imageUrl);

      // Save restoration record to database
      try {
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
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Continue with restoration even if DB save fails
      }

      // Call Replicate API for photo restoration
      console.log('Calling restore-photo function with:', { imageUrl });
      
      const { data, error } = await supabase.functions.invoke('restore-photo', {
        body: { imageUrl }
      });

      console.log('Restoration API response:', { data, error });

      if (error) {
        console.error('Restoration error:', error);
        toast({
          title: "Restoration failed",
          description: error.message || "Failed to restore photo. Please try again.",
          variant: "destructive"
        });
        setIsProcessing(false);
        return;
      }

      // Handle the restored image response
      if (data?.output) {
        let restoredImageUrl = null;
        
        // Handle different response formats from Replicate
        if (typeof data.output === 'string') {
          restoredImageUrl = data.output;
        } else if (Array.isArray(data.output) && data.output.length > 0) {
          restoredImageUrl = data.output[0];
        } else if (data.output.url) {
          restoredImageUrl = data.output.url;
        }

        console.log('Extracted restored image URL:', restoredImageUrl);

        if (restoredImageUrl) {
          setUploadedImage(prev => prev ? {
            ...prev,
            processed: restoredImageUrl
          } : null);

          toast({
            title: "Restoration complete!",
            description: isFreeUser ? "Your photo has been restored with watermark. Purchase credits to remove it." : "Your photo has been successfully restored"
          });
        } else {
          console.error('No valid URL found in response:', data.output);
          toast({
            title: "Restoration failed",
            description: "No restored image was returned. Please try again.",
            variant: "destructive"
          });
        }
      } else {
        console.error('No output in response:', data);
        toast({
          title: "Restoration failed",
          description: "No restored image was returned. Please try again.",
          variant: "destructive"
        });
      }

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

  const handleRemoveWatermark = () => {
    if (isFreeUser) {
      setIsPricingModalOpen(true);
    } else {
      // Premium users can remove watermark directly
      setUploadedImage(prev => prev ? {
        ...prev,
        watermarkRemoved: true
      } : null);
      
      toast({
        title: "Watermark removed!",
        description: "You can now download the high-resolution version"
      });
    }
  };

  const handlePurchase = async (credits: number, price: number) => {
    // Close the modal and show the checkout process
    setIsPricingModalOpen(false);
    
    try {
      console.log('Starting purchase process', { credits, price });
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Login required",
          description: "Please login to purchase credits",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Redirecting to checkout...",
        description: "Please complete your payment to remove the watermark"
      });

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { credits, price }
      });

      if (error) {
        console.error('Checkout error:', error);
        toast({
          title: "Error",
          description: "Failed to create checkout session",
          variant: "destructive"
        });
        return;
      }

      if (data?.url) {
        console.log('Redirecting to checkout:', data.url);
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      } else {
        toast({
          title: "Error",
          description: "No checkout URL received",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Purchase error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
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
    <>
      <section id="upload" className="bg-gradient-to-br from-orange-50 to-amber-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Congratulations Message for logged-in users */}
          {user && remainingRestorations > 0 && (
            <div className="text-center mb-8">
              <div className={`${isFreeUser ? 'bg-blue-50 border-blue-200' : 'bg-green-50 border-green-200'} border rounded-lg p-4 max-w-2xl mx-auto`}>
                <h2 className={`text-2xl font-bold ${isFreeUser ? 'text-blue-800' : 'text-green-800'} mb-2`}>
                  🎉 {isFreeUser ? `Welcome! You have ${remainingRestorations} free restoration credit` : `Congratulations! You have ${remainingRestorations} restoration credit${remainingRestorations > 1 ? 's' : ''}`}
                </h2>
                <p className={`${isFreeUser ? 'text-blue-700' : 'text-green-700'}`}>
                  {isFreeUser 
                    ? 'Upload your photo below to get a watermarked preview. Purchase credits to download without watermark.'
                    : 'Upload your photo below to start restoring your precious memories'
                  }
                </p>
              </div>
            </div>
          )}

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {user ? 'Upload Your Photo to Get Started' : 'Get Your Free Preview Instantly'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {user 
                ? 'Drag & drop your photo here or click to browse. Watch our AI work its magic!'
                : 'Upload any photo and watch our AI work its magic. You\'ll get a free, watermarked preview in seconds. No credit card required, no strings attached.'
              }
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
                  isFreeUser={isFreeUser}
                  onRemoveWatermark={handleRemoveWatermark}
                  onDownloadHD={downloadRestored}
                />

                <ActionButtons 
                  uploadedImage={uploadedImage} 
                  isProcessing={isProcessing} 
                  user={user} 
                  remainingRestorations={remainingRestorations} 
                  onStartRestoration={restorePhoto} 
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

      <PricingModal 
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        onPurchase={handlePurchase}
      />
    </>
  );
};

export default PhotoUpload;
