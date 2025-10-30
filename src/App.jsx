import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import BookResults from './components/BookResults';
import BookModal from './components/BookModal';
import LoadingSpinner from './components/LoadingSpinner';
import { searchBooks } from './utils/api';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const handleSearch = async (query, type = 'title', page = 1) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    setSearchQuery(query);
    setSearchType(type);
    setCurrentPage(page);

    try {
      const response = await searchBooks(query, type, page);
      setBooks(response.docs || []);
      setTotalResults(response.numFound || 0);
    } catch (err) {
      setError('Failed to search books. Please try again.');
      setBooks([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (searchQuery) {
      handleSearch(searchQuery, searchType, newPage);
    }
  };

  const openBookModal = (book) => {
    setSelectedBook(book);
  };

  const closeBookModal = () => {
    setSelectedBook(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <SearchSection 
          onSearch={handleSearch}
          loading={loading}
        />
        
        {error && (
          <div className="mb-8 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg animate-fade-in">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}
        
        {loading && <LoadingSpinner />}
        
        {!loading && books.length > 0 && (
          <BookResults 
            books={books}
            totalResults={totalResults}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onBookClick={openBookModal}
          />
        )}
        
        {!loading && !error && books.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
              <p className="text-gray-600">Try adjusting your search terms or search type.</p>
            </div>
          </div>
        )}
      </main>
      
      {selectedBook && (
        <BookModal 
          book={selectedBook} 
          onClose={closeBookModal} 
        />
      )}
    </div>
  );
}

export default App;