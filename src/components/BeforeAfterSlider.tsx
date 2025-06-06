
import React, { useState } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  alt?: string;
  className?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  alt = "Before and after restoration",
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative overflow-hidden rounded-lg shadow-md cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Before image (background) */}
      <img 
        src={beforeImage}
        alt={`${alt} - before`}
        className="w-full h-64 object-cover"
      />
      
      {/* After image (overlay) */}
      <img 
        src={afterImage}
        alt={`${alt} - after`}
        className={`absolute inset-0 w-full h-64 object-cover transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* Labels */}
      <div className="absolute top-2 left-2">
        <span className={`px-2 py-1 rounded text-xs font-medium transition-all duration-300 ${
          isHovered 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {isHovered ? 'After' : 'Before'}
        </span>
      </div>
      
      {/* Hover instruction */}
      <div className="absolute bottom-2 right-2">
        <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
          Hover to see result
        </span>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
