
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Download, Crown, Eye, EyeOff } from 'lucide-react';
import PhotoUpload from '@/components/PhotoUpload';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Login = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  // Mock restoration data for logged-in users
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

  const [remainingRestorations] = useState(0);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoggedIn(true);
    toast({
      title: "Login successful",
      description: "Welcome back! You can now view your restoration results."
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName || !registerEmail || !registerPassword || !confirmPassword) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    if (registerPassword !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoggedIn(true);
    toast({
      title: "Account created",
      description: "Welcome! You can now upload photos for restoration."
    });
  };

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
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        <Header />
        
        {/* Account Dashboard */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                My Account
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Manage your restorations and upload new photos
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

            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                <TabsTrigger value="upload">Upload Photos</TabsTrigger>
                <TabsTrigger value="results">My Restorations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="mt-8">
                <div className="max-w-4xl mx-auto">
                  <PhotoUpload />
                </div>
              </TabsContent>
              
              <TabsContent value="results" className="mt-8">
                {restorations.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">No restorations yet</h3>
                      <p className="text-gray-600 mb-6">
                        Upload your first photo to see your restoration results here.
                      </p>
                      <Button 
                        className="bg-amber-700 hover:bg-amber-800"
                        onClick={() => {
                          const uploadTab = document.querySelector('[value="upload"]') as HTMLElement;
                          uploadTab?.click();
                        }}
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
                          onClick={() => {
                            const uploadTab = document.querySelector('[value="upload"]') as HTMLElement;
                            uploadTab?.click();
                          }}
                        >
                          Try Another Photo
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get Started with Photo Restoration
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sign in to your account or create a new one to start restoring your precious memories.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Login/Register Section */}
            <div className="space-y-6">
              <Card className="w-full bg-white shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Welcome Back
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Sign in to your account or create a new one
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Sign In</TabsTrigger>
                      <TabsTrigger value="register">Create Account</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="login" className="space-y-4">
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="login-email">Email</Label>
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="Enter your email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="login-password">Password</Label>
                          <Input
                            id="login-password"
                            type="password"
                            placeholder="Enter your password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800">
                          Sign In
                        </Button>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="register" className="space-y-4">
                      <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="register-name">Full Name</Label>
                          <Input
                            id="register-name"
                            type="text"
                            placeholder="Enter your full name"
                            value={registerName}
                            onChange={(e) => setRegisterName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="register-email">Email</Label>
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="Enter your email"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="register-password">Password</Label>
                          <Input
                            id="register-password"
                            type="password"
                            placeholder="Create a password"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm Password</Label>
                          <Input
                            id="confirm-password"
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800">
                          Create Account
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                
                <CardFooter className="text-center text-sm text-gray-600">
                  <p>
                    By continuing, you agree to our Terms of Service and Privacy Policy
                  </p>
                </CardFooter>
              </Card>
            </div>

            {/* Upload Section */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Upload Your Photo
                  </h3>
                  <p className="text-gray-600">
                    Start restoring your precious memories today
                  </p>
                </div>
                <PhotoUpload />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
