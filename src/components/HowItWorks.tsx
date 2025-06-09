
import React from 'react';
import { Timeline } from '@/components/ui/timeline';
import { Upload, Sparkles, Download } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      title: "Step 1",
      content: (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <Upload className="w-6 h-6 text-amber-700" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Securely Upload Your Photo</h3>
          </div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            Simply drag & drop or select your old photo file. We guarantee all uploads are 100% private and secure.
          </p>
          <div className="max-w-md mx-auto">
            <img
              src="https://images.unsplash.com/photo-1551818255-e6e10975cd17?w=500&h=300&fit=crop"
              alt="Upload interface"
              className="rounded-lg object-cover h-48 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Step 2",
      content: (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-blue-700" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Witness the AI Magic</h3>
          </div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-6">
            Instantly, our advanced AI will analyze, repair, and enhance your photo. You'll immediately see a stunning, watermarked preview of the incredible result.
          </p>
          <div className="mb-8 space-y-2">
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✨ AI damage detection and repair
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✨ Color restoration and enhancement
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✨ Detail recovery and sharpening
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✨ Instant preview generation
            </div>
          </div>
          <div className="max-w-md mx-auto">
            <img
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop"
              alt="AI processing magic"
              className="rounded-lg object-cover h-48 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Step 3",
      content: (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Download className="w-6 h-6 text-green-700" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Download & Cherish Your Memory</h3>
          </div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            Love what you see? Choose a credit pack to remove the watermark and download your memory in beautiful high resolution. It's now ready to be printed, shared, and cherished forever.
          </p>
          <div className="max-w-md mx-auto">
            <img
              src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&h=300&fit=crop"
              alt="High resolution family memories"
              className="rounded-lg object-cover h-48 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="bg-white py-20">
      <Timeline data={steps} />
    </section>
  );
};

export default HowItWorks;
