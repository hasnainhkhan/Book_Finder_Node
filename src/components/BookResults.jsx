import React, { useState } from 'react';
import BookCard from './BookCard';
import Pagination from './Pagination';

const BookResults = ({ books, totalResults, currentPage, onPageChange, onBookClick }) => {
  const [sortBy, setSortBy] = useState('relevance');
  const [filterBy, setFilterBy] = useState('all');

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'title', label: 'Title A-Z' },
    { value: 'year_desc', label: 'Newest First' },
    { value: 'year_asc', label: 'Oldest First' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Books' },
    { value: 'has_cover', label: 'With Cover Image' },
    { value: 'has_rating', label: 'With Ratings' },
    { value: 'recent', label: 'Published After 2000' }
  ];

  const getSortedBooks = () => {
    let sortedBooks = [...books];

    // Apply filters first
    if (filterBy !== 'all') {
      sortedBooks = sortedBooks.filter(book => {
        switch (filterBy) {
          case 'has_cover':
            return book.cover_i;
          case 'has_rating':
            return book.ratings_average;
          case 'recent':
            return book.first_publish_year && book.first_publish_year > 2000;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'title':
        return sortedBooks.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
      case 'year_desc':
        return sortedBooks.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
      case 'year_asc':
        return sortedBooks.sort((a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0));
      case 'rating':
        return sortedBooks.sort((a, b) => (b.ratings_average || 0) - (a.ratings_average || 0));
      default:
        return sortedBooks;
    }
  };

  const sortedBooks = getSortedBooks();
  const totalPages = Math.ceil(totalResults / 20);

  return (
    <div className="animate-fade-in">
      {/* Results Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-semibold text-gray-900">
            {totalResults.toLocaleString()} books found
          </h3>
          <p className="text-sm text-gray-600">
            Showing page {currentPage} of {totalPages}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Filter Dropdown */}
          <div className="relative">
            <label className="block text-xs font-medium text-gray-700 mb-1">Filter</label>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {filterOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none mt-6">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <label className="block text-xs font-medium text-gray-700 mb-1">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none mt-6">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {sortedBooks.map((book, index) => (
          <BookCard
            key={`${book.key}-${index}`}
            book={book}
            onClick={() => onBookClick(book)}
          />
        ))}
      </div>

      {/* No Results After Filtering */}
      {sortedBooks.length === 0 && books.length > 0 && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No books match your filters</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filter settings to see more results.</p>
            <button
              onClick={() => setFilterBy('all')}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && sortedBooks.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default BookResults;