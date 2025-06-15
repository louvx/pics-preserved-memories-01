
import React from "react";
import { Loader2 } from "lucide-react";

interface UploadProcessingOverlayProps {
  width: number;
  height: number;
}

const UploadProcessingOverlay: React.FC<UploadProcessingOverlayProps> = ({
  width,
  height,
}) => (
  <div
    className="bg-gray-100 rounded-lg shadow-md flex items-center justify-center"
    style={{ width, height: Math.min(height, 500) }}
  >
    <div className="text-center">
      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-600" />
      <p className="text-gray-600">Restoring your memory...</p>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
        <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: "60%" }}></div>
      </div>
    </div>
  </div>
);

export default UploadProcessingOverlay;
