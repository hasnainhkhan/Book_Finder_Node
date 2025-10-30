import React, { useState } from 'react';
import { getCoverImageUrl, formatAuthors, formatPublishYear } from '../utils/api';

const BookCard = ({ book, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const coverUrl = getCoverImageUrl(book.cover_i, 'M');
  const authors = formatAuthors(book.author_name);
  const publishYear = formatPublishYear(book.first_publish_year);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const renderPlaceholderCover = () => (
    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex flex-col items-center justify-center text-gray-500">
      <svg className="w-12 h-12 mb-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
        <path d="M7 15h2v2H7zm0-4h2v2H7zm0-4h2v2H7zm4 8h6v-2h-6v2zm0-4h6v-2h-6v2zm0-4h6V9h-6v2z"/>
      </svg>
      <span className="text-xs font-medium">No Cover</span>
    </div>
  );

  return (
    <div
      onClick={onClick}
      className="card cursor-pointer transform hover:scale-105 overflow-hidden animate-slide-up group"
    >
      {/* Book Cover */}
      <div className="relative aspect-[3/4] bg-gray-200 overflow-hidden">
        {coverUrl && !imageError ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 skeleton" />
            )}
            <img
              src={coverUrl}
              alt={`Cover of ${book.title}`}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
          </>
        ) : (
          renderPlaceholderCover()
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white rounded-full p-2 shadow-lg">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Rating Badge */}
        {book.ratings_average && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
            <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{book.ratings_average.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Book Information */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
          {book.title || 'Untitled'}
        </h3>
        
        <p className="text-sm text-gray-600 mb-2">
          by {authors}
        </p>

        <p className="text-xs text-gray-500 mb-3">
          {publishYear}
        </p>

        {/* Additional Info */}
        <div className="flex flex-wrap gap-2 mb-3">
          {book.language && book.language.length > 0 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {book.language[0].toUpperCase()}
            </span>
          )}
          
          {book.number_of_pages_median && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {book.number_of_pages_median} pages
            </span>
          )}
        </div>

        {/* Subjects Preview */}
        {book.subject && book.subject.length > 0 && (
          <div className="border-t border-gray-100 pt-3">
            <div className="flex flex-wrap gap-1">
              {book.subject.slice(0, 2).map((subject, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full truncate max-w-20"
                  title={subject}
                >
                  {subject}
                </span>
              ))}
              {book.subject.length > 2 && (
                <span className="inline-block px-2 py-1 text-xs text-gray-500 bg-gray-50 rounded-full">
                  +{book.subject.length - 2}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;