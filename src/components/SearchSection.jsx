import React, { useState, useRef } from 'react';

const SearchSection = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef(null);

  const popularSearches = {
    title: ['Harry Potter', 'The Lord of the Rings', 'Pride and Prejudice', 'To Kill a Mockingbird', '1984'],
    author: ['J.K. Rowling', 'Stephen King', 'Agatha Christie', 'George Orwell', 'Jane Austen'],
    subject: ['Science Fiction', 'Mystery', 'Romance', 'Fantasy', 'History', 'Biography', 'Philosophy']
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), searchType);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 0) {
      const filtered = popularSearches[searchType].filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion, searchType);
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    setQuery('');
    setShowSuggestions(false);
    searchInputRef.current?.focus();
  };

  const searchTypeOptions = [
    { value: 'title', label: 'Title', icon: '📚', placeholder: 'Search by book title...' },
    { value: 'author', label: 'Author', icon: '✍️', placeholder: 'Search by author name...' },
    { value: 'subject', label: 'Subject', icon: '🏷️', placeholder: 'Search by subject or genre...' },
    { value: 'isbn', label: 'ISBN', icon: '🔢', placeholder: 'Search by ISBN...' }
  ];

  const currentSearchType = searchTypeOptions.find(option => option.value === searchType);

  return (
    <div className="mb-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
            Find Your Next Great Read
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search through millions of books by title, author, subject, or ISBN. 
            Discover detailed information, ratings, and cover images.
          </p>
        </div>

        {/* Search Type Selector */}
        <div className="mb-6">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {searchTypeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSearchTypeChange(option.value)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  searchType === option.value
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                <span>{option.icon}</span>
                <span className="hidden sm:inline">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onFocus={() => query.length > 0 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder={currentSearchType.placeholder}
              className="input-field pl-12 pr-32 text-lg h-14 w-full shadow-lg"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute inset-y-0 right-0 px-6 m-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <svg className="animate-spin h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25"></circle>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" opacity="0.75"></path>
                  </svg>
                  <span className="hidden sm:inline">Searching...</span>
                </div>
              ) : (
                <>
                  <span className="hidden sm:inline">Search</span>
                  <span className="sm:hidden">🔍</span>
                </>
              )}
            </button>
          </div>

          {/* Search Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="py-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-150"
                  >
                    <div className="flex items-center space-x-2">
                      <span>{currentSearchType.icon}</span>
                      <span>{suggestion}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </form>

        {/* Quick Search Examples */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-3">Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {popularSearches[searchType].slice(0, 5).map((example, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(example)}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors duration-150"
                disabled={loading}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;