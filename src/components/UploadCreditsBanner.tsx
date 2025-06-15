
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
  if (user && remainingRestorations > 0) {
    return (
      <div className="text-center mb-8">
        <div className={`${isFreeUser ? 'bg-blue-50 border-blue-200' : 'bg-green-50 border-green-200'} border rounded-lg p-4 max-w-2xl mx-auto`}>
          <h2 className={`text-2xl font-bold ${isFreeUser ? 'text-blue-800' : 'text-green-800'} mb-2`}>
            🎉 {isFreeUser
              ? `Welcome! You have ${remainingRestorations} free restoration credit`
              : `Congratulations! You have ${remainingRestorations} restoration credit${remainingRestorations > 1 ? 's' : ''}`}
          </h2>
          <p className={`${isFreeUser ? 'text-blue-700' : 'text-green-700'}`}>
            {isFreeUser
              ? 'Upload your photo below to get a watermarked preview. Purchase credits to download without watermark.'
              : 'Upload your photo below to start restoring your precious memories'
            }
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default UploadCreditsBanner;
