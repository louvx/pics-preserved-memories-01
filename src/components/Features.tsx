
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      title: "Extreme Damage & Tear Repair",
      description: "Intelligently reconstructs photos from creases, folds, and even tears."
    },
    {
      title: "AI-Powered Colorization",
      description: "Brings black & white photos to life with stunningly natural colors."
    },
    {
      title: "AI Face Enhancement",
      description: "Recovers and sharpens facial details with breathtaking clarity."
    },
    {
      title: "Noise & Speckle Removal",
      description: "Cleans away age-related noise and spots for a crisp, clean finish."
    },
    {
      title: "Advanced Color & Light Correction",
      description: "Balances faded colors and poor lighting to restore the photo's original vibrancy."
    },
    {
      title: "Up to 4K Resolution Downloads",
      description: "Get stunning, high-resolution results perfect for printing and sharing."
    }
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            All-Inclusive Power in Every Restoration
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Your memories deserve the best. That's why every single photo you restore with us gets our full suite of advanced AI features. No compromises, no holding back.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-none bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:bg-white">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
