
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Download, Calendar, Image, ArrowLeft } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

interface Restoration {
  id: string;
  original_filename: string;
  processed_filename: string;
  restored_image_url: string;
  s3_url: string;
  status: string;
  created_at: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [restorations, setRestorations] = useState<Restoration[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get current user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        fetchRestorations(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchRestorations(session.user.id);
      } else {
        setUser(null);
        setRestorations([]);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchRestorations = async (userId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('photo_restorations')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching restorations:', error);
        toast({
          title: "Error",
          description: "Failed to load restoration history",
          variant: "destructive"
        });
        return;
      }

      setRestorations(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to load restoration history",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadRestoration = async (restoration: Restoration) => {
    if (!restoration.s3_url) {
      // Fallback to restored image URL
      if (restoration.restored_image_url) {
        const link = document.createElement('a');
        link.href = restoration.restored_image_url;
        link.download = restoration.processed_filename || 'restored-image.png';
        link.click();
        return;
      }
      
      toast({
        title: "Error",
        description: "Download URL not available",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch(restoration.s3_url);
      if (!response.ok) {
        throw new Error('Failed to download image');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = restoration.processed_filename || 'restored-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Download started",
        description: "Your restored photo is being downloaded"
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download failed",
        description: "Failed to download the image. Please try again.",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
            <p className="text-gray-600 mb-8">Please login to view your restoration history</p>
            <Link to="/login">
              <Button className="bg-amber-700 hover:bg-amber-800 text-white">
                Login
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link to="/" className="mr-4">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">My Restoration History</h1>
          <p className="text-gray-600 mt-2">View and download your restored photos</p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your restorations...</p>
            </div>
          </div>
        ) : restorations.length === 0 ? (
          <div className="text-center py-20">
            <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No restorations yet</h3>
            <p className="text-gray-600 mb-6">Start restoring your photos to see them here</p>
            <Link to="/">
              <Button className="bg-amber-700 hover:bg-amber-800 text-white">
                Restore Your First Photo
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restorations.map((restoration) => (
              <div key={restoration.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Image Preview */}
                <div className="aspect-video bg-gray-100">
                  {restoration.restored_image_url ? (
                    <img
                      src={restoration.restored_image_url}
                      alt={restoration.original_filename}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Image className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 truncate">
                    {restoration.original_filename || 'Untitled'}
                  </h3>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(restoration.created_at)}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      restoration.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : restoration.status === 'processing'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {restoration.status}
                    </span>

                    {restoration.status === 'completed' && (restoration.s3_url || restoration.restored_image_url) && (
                      <Button
                        size="sm"
                        onClick={() => downloadRestoration(restoration)}
                        className="bg-amber-700 hover:bg-amber-800 text-white"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
