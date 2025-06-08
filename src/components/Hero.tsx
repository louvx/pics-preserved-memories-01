
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import SignupModal from './SignupModal';
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from '@/components/ui/image-comparison';

const Hero = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample before/after image pairs - these can be dynamically changed
  const imagePairs = [
    {
      before: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80",
      after: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
      alt: "Photo restoration example 1"
    },
    {
      before: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      after: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80",
      alt: "Photo restoration example 2"
    },
    {
      before: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      after: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80",
      alt: "Photo restoration example 3"
    }
  ];

  const handleGetStarted = () => {
    setIsSignupModalOpen(true);
  };

  const handleSignupSuccess = () => {
    setIsSignupModalOpen(false);
    // Redirect to login/dashboard will be handled by auth state change
  };

  // Function to cycle through images (can be called programmatically)
  const nextImagePair = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imagePairs.length);
  };

  const currentPair = imagePairs[currentImageIndex];

  return (
    <>
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-20 mx-[8px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              {/* Small Tag/Badge */}
              <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-amber-200 rounded-full px-4 py-2 mb-8">
                <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  New
                </span>
                <span className="text-gray-700 text-sm font-medium">
                  Cutting-Edge AI Model
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-bold text-gray-900 mb-6 leading-tight text-4xl md:text-6xl lg:text-7xl">
                Bring Your Precious
                <br />
                <span className="text-gray-800">Memories Back to Life</span>
              </h1>

              {/* Sub-headline */}
              <p className="md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto lg:mx-0 leading-relaxed text-base">
                Our advanced AI doesn't just fix old photos—it restores their soul. Repair extreme damage, reveal forgotten details, and see your history in vibrant color, all in a matter of seconds.
              </p>

              {/* Call-to-Action Button */}
              <div className="mb-8">
                <Button 
                  size="lg" 
                  onClick={handleGetStarted} 
                  className="bg-amber-700 hover:bg-amber-800 text-white py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 px-[52px]"
                >
                  Restore My Photo For Free
                </Button>
              </div>

              {/* Supporting Trust Snippets */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-green-600" />
                  <span>Free 3 Credits</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-green-600" />
                  <span>No Credit Card</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-green-600" />
                  <span>Instant Result</span>
                </div>
              </div>
            </div>

            {/* Right Column - Before/After Slider */}
            <div className="relative">
              <ImageComparison 
                className="aspect-[4/3] w-full rounded-lg shadow-xl border border-amber-200"
                enableHover
                springOptions={{
                  bounce: 0.2,
                  duration: 0.6
                }}
              >
                <ImageComparisonImage
                  src={currentPair.before}
                  alt={`${currentPair.alt} - before`}
                  position="left"
                />
                <ImageComparisonImage
                  src={currentPair.after}
                  alt={`${currentPair.alt} - after`}
                  position="right"
                />
                <ImageComparisonSlider className="bg-white/80 backdrop-blur-sm w-1 shadow-lg">
                  <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg border-2 border-amber-300" />
                </ImageComparisonSlider>
              </ImageComparison>

              {/* Labels */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  Before
                </span>
              </div>
              
              <div className="absolute top-4 right-4 z-10">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  After
                </span>
              </div>

              {/* Instructions */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                  Drag to compare
                </span>
              </div>

              {/* Optional: Image switcher dots */}
              <div className="flex justify-center mt-4 gap-2">
                {imagePairs.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'bg-amber-600 w-6' 
                        : 'bg-amber-300 hover:bg-amber-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SignupModal 
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSuccess={handleSignupSuccess}
      />
    </>
  );
};

export default Hero;
