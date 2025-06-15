
import React from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhotoUpload from "@/components/PhotoUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Crown } from "lucide-react";
import { useUserCredits } from "@/hooks/useUserCredits";

interface Restoration {
  id: number;
  originalImage: string;
  restoredImage: string;
  hasWatermark: boolean;
  uploadDate: string;
  filename: string;
}

interface AccountDashboardProps {
  user: any;
  remainingRestorations: number;
  restorations: Restoration[];
  handleSignOut: () => void;
  handleDownload: (restoration: Restoration) => void;
  handleUnlockWatermark: (restorationId: number) => void;
}

const AccountDashboard: React.FC<AccountDashboardProps> = ({
  user,
  remainingRestorations,
  restorations,
  handleSignOut,
  handleDownload,
  handleUnlockWatermark,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <Header />

      {/* Account Dashboard */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                My Account
              </h1>
              <Button onClick={handleSignOut} variant="outline">
                Sign Out
              </Button>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Manage your restorations and upload new photos
            </p>

            {/* Restoration Credits */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2">
                <Crown className="h-5 w-5 text-amber-600" />
                <span className="font-medium text-amber-800">
                  {remainingRestorations > 0
                    ? `${remainingRestorations} restoration${remainingRestorations > 1 ? "s" : ""} remaining`
                    : "All free restorations used"}
                </span>
              </div>
              {remainingRestorations === 0 && (
                <p className="text-sm text-amber-700 mt-2">
                  Upgrade to continue restoring photos without watermarks
                </p>
              )}
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <PhotoUpload />
          </div>

          <Tabs defaultValue="results" className="w-full">
            <TabsList className="grid w-full grid-cols-1 max-w-md mx-auto">
              <TabsTrigger value="results">My Restorations</TabsTrigger>
            </TabsList>

            <TabsContent value="results" className="mt-8">
              {restorations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {restorations.map((restoration) => (
                    <Card key={restoration.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                      <div className="relative">
                        <img
                          src={restoration.restoredImage}
                          alt={`Restored ${restoration.filename}`}
                          className="w-full h-64 object-cover"
                        />
                        {restoration.hasWatermark && (
                          <div className="absolute top-0 left-0 w-full h-full bg-white/70 flex items-center justify-center">
                            <span className="text-2xl font-bold text-gray-800">Watermark</span>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          {restoration.filename}
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          Uploaded on {restoration.uploadDate}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center p-4">
                        <Button onClick={() => handleDownload(restoration)} variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        {restoration.hasWatermark && (
                          <Button onClick={() => handleUnlockWatermark(restoration.id)} variant="secondary">
                            Unlock HD
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 text-lg">No restorations yet. Upload a photo to get started!</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AccountDashboard;
