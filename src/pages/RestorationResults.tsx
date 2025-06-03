
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Crown, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RestorationResults = () => {
  const [restorations] = useState([
    {
      id: 1,
      originalImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop&auto=format&sepia=100&brightness=0.7",
      restoredImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop&auto=format",
      hasWatermark: true,
      uploadDate: "2024-12-15",
      filename: "family_portrait_1920s.jpg"
    },
    {
      id: 2,
      originalImage: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=300&fit=crop&auto=format&sepia=100&brightness=0.5",
      restoredImage: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=300&fit=crop&auto=format",
      hasWatermark: false,
      uploadDate: "2024-12-10",
      filename: "wedding_1955.jpg"
    }
  ]);

  const [remainingRestorations] = useState(0); // 0 means no free restorations left
  const { toast } = useToast();

  const handleDownload = (restoration: any) => {
    if (restoration.hasWatermark) {
      toast({
        title: "Watermarked version",
        description: "This is a watermarked preview. Unlock the full quality version by upgrading.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Download started",
        description: "Your high-quality restored photo is being downloaded."
      });
    }
  };

  const handleUnlockWatermark = (restorationId: number) => {
    toast({
      title: "Upgrade required",
      description: "Redirecting to payment to unlock watermark-free version..."
    });
    // This would redirect to payment flow
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your Restoration Results
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              View and download your restored photos. Upgrade to unlock watermark-free, print-quality versions.
            </p>
            
            {/* Restoration Credits */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2">
                <Crown className="h-5 w-5 text-amber-600" />
                <span className="font-medium text-amber-800">
                  {remainingRestorations > 0 
                    ? `${remainingRestorations} restoration${remainingRestorations > 1 ? 's' : ''} remaining`
                    : 'All free restorations used'
                  }
                </span>
              </div>
              {remainingRestorations === 0 && (
                <p className="text-sm text-amber-700 mt-2">
                  Upgrade to continue restoring photos without watermarks
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Restoration Results Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {restorations.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">No restorations yet</h3>
                <p className="text-gray-600 mb-6">
                  Upload your first photo to see your restoration results here.
                </p>
                <Button 
                  className="bg-amber-700 hover:bg-amber-800"
                  onClick={() => window.location.href = '/#upload'}
                >
                  Start Your First Restoration
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restorations.map((restoration) => (
                <Card key={restoration.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold text-gray-900 flex items-center justify-between">
                      <span className="truncate">{restoration.filename}</span>
                      {restoration.hasWatermark ? (
                        <div className="flex items-center gap-1 text-orange-600">
                          <EyeOff size={16} />
                          <span className="text-xs">Watermarked</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-green-600">
                          <Eye size={16} />
                          <span className="text-xs">Full Quality</span>
                        </div>
                      )}
                    </CardTitle>
                    <p className="text-sm text-gray-500">Restored on {restoration.uploadDate}</p>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {/* Before/After Images */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="relative">
                        <img 
                          src={restoration.originalImage} 
                          alt="Original"
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <div className="absolute top-1 left-1 bg-red-500 text-white px-1 py-0.5 rounded text-xs">
                          Before
                        </div>
                      </div>
                      <div className="relative">
                        <img 
                          src={restoration.restoredImage} 
                          alt="Restored"
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <div className="absolute top-1 left-1 bg-green-500 text-white px-1 py-0.5 rounded text-xs">
                          After
                        </div>
                        {restoration.hasWatermark && (
                          <div className="absolute inset-0 bg-black bg-opacity-20 rounded-md flex items-center justify-center">
                            <div className="bg-white bg-opacity-90 px-2 py-1 rounded text-xs font-medium text-gray-800 transform -rotate-12">
                              PREVIEW
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2">
                      <Button
                        onClick={() => handleDownload(restoration)}
                        variant={restoration.hasWatermark ? "outline" : "default"}
                        className={restoration.hasWatermark ? "" : "bg-green-600 hover:bg-green-700"}
                        size="sm"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        {restoration.hasWatermark ? "Download Preview" : "Download Full Quality"}
                      </Button>
                      
                      {restoration.hasWatermark && (
                        <Button
                          onClick={() => handleUnlockWatermark(restoration.id)}
                          className="bg-amber-700 hover:bg-amber-800"
                          size="sm"
                        >
                          <Crown className="mr-2 h-4 w-4" />
                          Unlock Full Quality
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {/* Upgrade Section */}
          {remainingRestorations === 0 && restorations.length > 0 && (
            <div className="mt-12 text-center">
              <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
                <Crown className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready for More Restorations?</h3>
                <p className="text-gray-600 mb-6">
                  You've used your free restoration. Upgrade to continue restoring photos with full-quality, 
                  watermark-free results that are perfect for printing and sharing.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-amber-700 hover:bg-amber-800" size="lg">
                    View Pricing Plans
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => window.location.href = '/#upload'}
                  >
                    Try Another Photo
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RestorationResults;
