
import React from "react";

interface UploadSectionHeaderProps {
  user: any;
}

const UploadSectionHeader: React.FC<UploadSectionHeaderProps> = ({ user }) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
      {user ? 'Upload Your Photo to Get Started' : 'Get Your Free Preview Instantly'}
    </h2>
    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
      {user
        ? 'Drag & drop your photo here or click to browse. Watch our AI work its magic!'
        : "Upload any photo and watch our AI work its magic. You'll get a free, watermarked preview in seconds. No credit card required, no strings attached."
      }
    </p>
  </div>
);

export default UploadSectionHeader;
