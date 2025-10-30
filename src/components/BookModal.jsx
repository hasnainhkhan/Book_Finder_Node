import React, { useEffect, useState } from 'react';
import { getCoverImageUrl, formatAuthors, formatSubjects } from '../utils/api';

const BookModal = ({ book, onClose }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Handle ESC key
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  const coverUrl = getCoverImageUrl(book.cover_i, 'L');
  const authors = formatAuthors(book.author_name);
  const subjects = formatSubjects(book.subject);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderPlaceholderCover = () => (
    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex flex-col items-center justify-center text-gray-500">
      <svg className="w-16 h-16 mb-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
        <path d="M7 15h2v2H7zm0-4h2v2H7zm0-4h2v2H7zm4 8h6v-2h-6v2zm0-4h6v-2h-6v2zm0-4h6V9h-6v2z"/>
      </svg>
      <span className="text-sm font-medium">No Cover Available</span>
    </div>
  );

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 font-display">Book Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Book Cover */}
            <div className="md:col-span-1">
              <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                {coverUrl && !imageError ? (
                  <>
                    {!imageLoaded && (
                      <div className="w-full h-full skeleton" />
                    )}
                    <img
                      src={coverUrl}
                      alt={`Cover of ${book.title}`}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => setImageLoaded(true)}
                      onError={() => setImageError(true)}
                    />
                  </>
                ) : (
                  renderPlaceholderCover()
                )}
              </div>
            </div>

            {/* Book Information */}
            <div className="md:col-span-2">
              <div className="space-y-6">
                {/* Title and Author */}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2 font-display">
                    {book.title || 'Untitled'}
                  </h1>
                  <p className="text-xl text-gray-600 mb-4">
                    by {authors}
                  </p>
                  
                  {/* Rating and Year */}
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    {book.ratings_average && (
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.round(book.ratings_average)
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {book.ratings_average.toFixed(1)} 
                          {book.ratings_count && ` (${book.ratings_count.toLocaleString()} ratings)`}
                        </span>
                      </div>
                    )}
                    
                    {book.first_publish_year && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        Published {book.first_publish_year}
                      </span>
                    )}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Publication Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Publication Info</h3>
                    <div className="space-y-2">
                      {book.publisher && book.publisher.length > 0 && (
                        <div>
                          <span className="font-medium text-gray-700">Publisher:</span>
                          <span className="ml-2 text-gray-600">{book.publisher[0]}</span>
                        </div>
                      )}
                      
                      {book.number_of_pages_median && (
                        <div>
                          <span className="font-medium text-gray-700">Pages:</span>
                          <span className="ml-2 text-gray-600">{book.number_of_pages_median}</span>
                        </div>
                      )}
                      
                      {book.language && book.language.length > 0 && (
                        <div>
                          <span className="font-medium text-gray-700">Language:</span>
                          <span className="ml-2 text-gray-600">{book.language.join(', ').toUpperCase()}</span>
                        </div>
                      )}
                      
                      {book.isbn && book.isbn.length > 0 && (
                        <div>
                          <span className="font-medium text-gray-700">ISBN:</span>
                          <span className="ml-2 text-gray-600 font-mono text-sm">{book.isbn[0]}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Info</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium text-gray-700">Book ID:</span>
                        <span className="ml-2 text-gray-600 font-mono text-sm">{book.key}</span>
                      </div>
                      
                      {book.editions && (
                        <div>
                          <span className="font-medium text-gray-700">Editions:</span>
                          <span className="ml-2 text-gray-600">{book.editions.numFound || 'Multiple'}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Subjects/Genres */}
                {subjects.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Subjects & Genres</h3>
                    <div className="flex flex-wrap gap-2">
                      {subjects.map((subject, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors duration-200"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
                  <a
                    href={`https://openlibrary.org${book.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>View on Open Library</span>
                  </a>
                  
                  {book.isbn && book.isbn.length > 0 && (
                    <a
                      href={`https://www.google.com/search?q=isbn+${book.isbn[0]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span>Find This Book</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;