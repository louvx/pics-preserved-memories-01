
import React, { useState, useRef, useCallback } from 'react';

interface WatermarkedBeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  showWatermark?: boolean;
  alt?: string;
  className?: string;
}

const WatermarkedBeforeAfterSlider: React.FC<WatermarkedBeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  showWatermark = true,
  alt = "Before and after restoration",
  className = ""
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, [isDragging]);

  React.useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('mousemove', handleGlobalMouseMove);
    }

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg shadow-md cursor-pointer select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* After image (background) */}
      <div className="relative">
        <img 
          src={afterImage}
          alt={`${alt} - after`}
          className="w-full h-64 object-cover"
          draggable={false}
        />
        
        {/* Watermark overlay on after image */}
        {showWatermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div 
              className="text-white text-2xl font-bold opacity-30 transform rotate-45"
              style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                userSelect: 'none'
              }}
            >
              Restore.pics
            </div>
          </div>
        )}
      </div>
      
      {/* Before image (clipped overlay) */}
      <img 
        src={beforeImage}
        alt={`${alt} - before`}
        className="absolute inset-0 w-full h-64 object-cover"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
        draggable={false}
      />
      
      {/* Slider line */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg cursor-ew-resize z-10"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
      >
        {/* Slider handle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute top-2 left-2">
        <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
          Before
        </span>
      </div>
      
      <div className="absolute top-2 right-2">
        <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
          After
        </span>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
        <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
          Drag to compare
        </span>
      </div>
    </div>
  );
};

export default WatermarkedBeforeAfterSlider;
