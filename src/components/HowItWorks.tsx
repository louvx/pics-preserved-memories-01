
import React from 'react';
import { Upload, Sparkles, Download } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Upload className="w-8 h-8 text-white" />,
      title: "Securely Upload Your Photo",
      description: "Simply drag & drop or select your old photo file. We guarantee all uploads are 100% private and secure."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-white" />,
      title: "Witness the AI Magic",
      description: "Instantly, our advanced AI will analyze, repair, and enhance your photo. You'll immediately see a stunning, watermarked preview of the incredible result."
    },
    {
      icon: <Download className="w-8 h-8 text-white" />,
      title: "Download & Cherish Your Memory",
      description: "Love what you see? Choose a credit pack to remove the watermark and download your memory in beautiful high resolution. It's now ready to be printed, shared, and cherished forever."
    }
  ];

  return (
    <section id="how-it-works" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How it works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Photo restoration differs from photo enhancement, which involves the use of advanced AI technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              {/* Icon */}
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-red-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  {step.icon}
                </div>
                {/* Connecting line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 border-t-2 border-dotted border-gray-300 transform translate-x-10" />
                )}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

