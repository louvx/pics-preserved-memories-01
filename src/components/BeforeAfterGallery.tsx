import React, { useState } from 'react';
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
  return <section id="gallery" className="bg-gradient-to-br from-orange-50 to-amber-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Restoration in Action</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">See damaged photos become treasured memories!</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Display */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Before</h3>
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img src={examples[activeImage].before} alt="Before restoration" className="w-full h-64 object-cover" />
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                    Damaged
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">After</h3>
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img src={examples[activeImage].after} alt="After restoration" className="w-full h-64 object-cover" />
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-sm">
                    Restored
                  </div>
                </div>
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
              {examples.map((example, index) => <button key={index} onClick={() => setActiveImage(index)} className={`relative overflow-hidden rounded-lg ${activeImage === index ? 'ring-4 ring-blue-500' : 'hover:ring-2 hover:ring-blue-300'} transition-all`}>
                  <img src={example.after} alt={example.title} className="w-full h-20 object-cover" />
                </button>)}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Why We're Different:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Advanced AI technology for precise repairs
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Expert human oversight for quality assurance
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  High-resolution outputs for printing
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Satisfaction guarantee on all restorations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default BeforeAfterGallery;