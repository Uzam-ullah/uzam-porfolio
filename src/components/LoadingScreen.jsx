import React from 'react';
const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex space-x-2">
        {/* You can change 'bg-blue-500' to any color from Tailwind */}
        <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
        <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default LoadingScreen;