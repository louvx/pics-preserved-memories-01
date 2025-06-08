
import React, { useState } from 'react';
import { ImageComparison, ImageComparisonImage, ImageComparisonSlider } from '@/components/ui/image-comparison';

const BeforeAfterGallery = () => {
  const [activeImage, setActiveImage] = useState(0);
  const examples = [{
    before: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop&auto=format&sepia=100&brightness=0.7",
    after: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop&auto=format",
    title: "Family Portrait Restoration",
    description: "Removed scratches and restored faded colors"
  }, {
    before: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop&auto=format&sepia=100&brightness=0.6",
    after: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop&auto=format",
    title: "Vintage Photo Enhancement",
    description: "Enhanced details and corrected color balance"
  }, {
    before: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=300&fit=crop&auto=format&sepia=100&brightness=0.5",
    after: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=300&fit=crop&auto=format",
    title: "Wedding Memory Restoration",
    description: "Restored damaged areas and improved clarity"
  }];
  
  return (
    <section id="gallery" className="bg-gradient-to-br from-orange-50 to-amber-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">From Lost to Unforgettable. 
See The Difference.</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">See damaged photos become treasured memories!</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Display */}
          <div className="space-y-6">
            <ImageComparison className="aspect-[4/3] w-full rounded-lg shadow-lg">
              <ImageComparisonImage
                src={examples[activeImage].before}
                alt={`${examples[activeImage].title} - before`}
                position="left"
              />
              <ImageComparisonImage
                src={examples[activeImage].after}
                alt={`${examples[activeImage].title} - after`}
                position="right"
              />
              <ImageComparisonSlider className="bg-white shadow-lg">
                <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </ImageComparisonSlider>
            </ImageComparison>
            
            {/* Labels */}
            <div className="flex justify-between">
              <div className="text-center">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Before
                </span>
              </div>
              <div className="text-center">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  After
                </span>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="text-xl font-bold text-gray-900">{examples[activeImage].title}</h4>
              <p className="text-gray-600">{examples[activeImage].description}</p>
            </div>
          </div>

          {/* Thumbnails and Info */}
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {examples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative overflow-hidden rounded-lg ${
                    activeImage === index ? 'ring-4 ring-blue-500' : 'hover:ring-2 hover:ring-blue-300'
                  } transition-all`}
                >
                  <img src={example.after} alt={example.title} className="w-full h-20 object-cover" />
                </button>
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Why We're Different:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Instant Results, Not Week-Long Waits: Preview AI restorations immediately & get final images fast.
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Precision AI Technology: For repairs that respect the original.
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Quality Assured by Experts: Human oversight for perfect, natural-looking restorations.
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Print-Quality Images: Every time.
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Satisfaction Guaranteed.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
