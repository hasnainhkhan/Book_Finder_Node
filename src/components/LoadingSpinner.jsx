import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      {/* Main Spinner */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-accent-300 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      
      {/* Loading Text */}
      <div className="mt-6 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Searching books...</h3>
        <p className="text-gray-600">Please wait while we find the best matches</p>
      </div>
      
      {/* Book Loading Animation */}
      <div className="mt-8 flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-6 bg-primary-400 rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

// Skeleton component for loading states
export const BookCardSkeleton = () => {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="aspect-[3/4] bg-gray-200"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="flex space-x-2">
          <div className="h-6 bg-gray-200 rounded-full w-12"></div>
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
        </div>
      </div>
    </div>
  );
};

// Loading grid for search results
export const LoadingGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <BookCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default LoadingSpinner;