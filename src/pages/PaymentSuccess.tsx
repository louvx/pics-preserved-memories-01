
import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const credits = searchParams.get('credits');

  useEffect(() => {
    if (credits) {
      toast.success(`Successfully purchased ${credits} credit${credits !== '1' ? 's' : ''}!`);
    }
  }, [credits]);

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                Payment Successful!
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <p className="text-xl text-gray-600">
                Thank you for your purchase. Your credits have been added to your account.
              </p>
              
              {credits && (
                <div className="bg-green-100 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-semibold">
                    You've received {credits} photo restoration credit{credits !== '1' ? 's' : ''}
                  </p>
                </div>
              )}
              
              <div className="space-y-4">
                <Button 
                  onClick={() => navigate('/')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Start Restoring Photos
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => navigate('/pricing')}
                  className="w-full"
                >
                  View Pricing Plans
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;
