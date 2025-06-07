
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HowItWorks = () => {
  const steps = [
    {
      step: "1",
      title: "Securely Upload Your Photo",
      description: "Simply drag & drop or select your old photo file. We guarantee all uploads are 100% private and secure.",
      icon: "📤"
    },
    {
      step: "2", 
      title: "Witness the AI Magic",
      description: "Instantly, our advanced AI will analyze, repair, and enhance your photo. You'll immediately see a stunning, watermarked preview of the incredible result.",
      icon: "✨"
    },
    {
      step: "3",
      title: "Download & Cherish Your Memory", 
      description: "Love what you see? Choose a credit pack to remove the watermark and download your memory in beautiful high resolution. It's now ready to be printed, shared, and cherished forever.",
      icon: "💾"
    }
  ];

  return (
    <section id="how-it-works" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            From Damaged Photo to Perfect Memory in 60 Seconds
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our process is designed to be incredibly simple, fast, and secure. No technical skills required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-4">{step.icon}</div>
                <CardTitle className="text-xl font-bold text-gray-900">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
