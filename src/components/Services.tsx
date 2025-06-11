import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { User } from '@supabase/supabase-js';

const Services = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handlePurchase = async (planId: string, credits: number, price: number) => {
    // If user is not logged in, redirect to login with return URL
    if (!user) {
      const returnUrl = encodeURIComponent(`/payment?plan=${planId}`);
      navigate(`/login?returnUrl=${returnUrl}`);
      return;
    }

    // If user is logged in, redirect to payment page
    navigate(`/payment?plan=${planId}`);
  };

  const services = [{
    id: "free",
    title: "FREE",
    subtitle: "Try our AI photo restoration with no commitment.",
    credits: 1,
    price: 0,
    pricePerPhoto: 0,
    features: [
      "1 Free Photo Restoration",
      "AI-Powered Enhancement",
      "Watermarked Preview",
      "High-Resolution Processing"
    ],
    popular: false,
    cta: "Sign Up Free",
    isFree: true
  }, {
    id: "starter",
    title: "STARTER",
    subtitle: "Perfect for that one special photo or trying us out.",
    credits: 1,
    price: 10,
    pricePerPhoto: 10.00,
    features: [
      "Includes All Features Listed Above",
      "High-Resolution Download",
      "No Watermark",
      "Secure Cloud Storage"
    ],
    popular: false,
    cta: "Get Started"
  }, {
    id: "creator",
    title: "CREATOR PACK",
    subtitle: "Ideal for small photo albums and social media creators.",
    credits: 10,
    price: 50,
    pricePerPhoto: 5.00,
    savings: "You Save 50%!",
    features: [
      "Includes All Features Listed Above",
      "High-Resolution Downloads",
      "No Watermark", 
      "Secure Cloud Storage"
    ],
    popular: true,
    cta: "Start Creating"
  }, {
    id: "archive",
    title: "ARCHIVE PACK",
    subtitle: "For preserving entire family archives and professional use.",
    credits: 50,
    price: 150,
    pricePerPhoto: 3.00,
    savings: "You Save 70%!",
    features: [
      "Includes All Features Listed Above",
      "High-Resolution Downloads",
      "No Watermark",
      "Secure Cloud Storage",
      "Priority Support"
    ],
    popular: false,
    cta: "Start Archiving",
    bestValue: true
  }];

  const handleFreeSignup = () => {
    // Redirect to login/signup page
    navigate('/login');
  };

  return (
    <section id="services" className="bg-gradient-to-br from-orange-50 to-amber-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Powerful Pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-2">
            Start free, then choose a credit pack that suits your needs. The more you buy, the more you save.
          </p>
          <p className="text-lg font-semibold text-blue-600">
            1 Credit = 1 Full Photo Restoration. Credits Never Expire.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className={`relative ${
                service.popular ? 'border-blue-500 border-2 shadow-lg' : 
                service.bestValue ? 'border-green-500 border-2 shadow-lg' : 
                service.isFree ? 'border-gray-300' : 'border-gray-200'
              } hover:shadow-xl transition-all duration-300`}
            >
              {service.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                  Most Popular
                </Badge>
              )}
              {service.bestValue && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600 text-white">
                  Best Value
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">{service.title}</CardTitle>
                <CardDescription className="text-gray-600">{service.subtitle}</CardDescription>
                <div className="mt-4">
                  <div className="text-lg font-semibold text-gray-700 mb-1">
                    {service.credits} Credit{service.credits > 1 ? 's' : ''}
                  </div>
                  {service.isFree ? (
                    <span className="text-4xl font-bold text-green-600">FREE</span>
                  ) : (
                    <span className="text-4xl font-bold text-blue-600">${service.price}</span>
                  )}
                  {!service.isFree && (
                    <div className="text-sm text-gray-500 mt-1">
                      (${service.pricePerPhoto.toFixed(2)} per photo)
                    </div>
                  )}
                  {service.savings && (
                    <div className="text-green-600 font-semibold mt-2">{service.savings}</div>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button 
                  className={`w-full ${
                    service.popular ? 'bg-blue-600 hover:bg-blue-700' : 
                    service.bestValue ? 'bg-green-600 hover:bg-green-700' : 
                    service.isFree ? 'bg-green-600 hover:bg-green-700' : 
                    'bg-gray-800 hover:bg-gray-900'
                  } text-white`} 
                  onClick={
                    service.isFree 
                      ? handleFreeSignup 
                      : () => handlePurchase(service.id, service.credits, service.price)
                  }
                >
                  {service.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
