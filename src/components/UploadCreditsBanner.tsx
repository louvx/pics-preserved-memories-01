
import React from "react";

interface UploadCreditsBannerProps {
  user: any;
  isFreeUser: boolean;
  remainingRestorations: number;
}

const UploadCreditsBanner: React.FC<UploadCreditsBannerProps> = ({
  user,
  isFreeUser,
  remainingRestorations,
}) => {
  if (user && remainingRestorations > 0 && isFreeUser) {
    return (
      <div className="text-center mb-8">
        <div className="bg-blue-50 border-blue-200 border rounded-lg p-4 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">
            🎉 Welcome! You have {remainingRestorations} free restoration credit
            {remainingRestorations > 1 ? "s" : ""}
          </h2>
          <p className="text-blue-700">
            Upload your photo below to get a watermarked preview. Purchase credits to download without watermark.
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default UploadCreditsBanner;

