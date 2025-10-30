const BASE_URL = 'https://openlibrary.org';

export const searchBooks = async (query, searchType = 'title', page = 1) => {
  const limit = 20;
  const offset = (page - 1) * limit;
  
  let searchParam;
  switch (searchType) {
    case 'author':
      searchParam = `author=${encodeURIComponent(query)}`;
      break;
    case 'subject':
      searchParam = `subject=${encodeURIComponent(query)}`;
      break;
    case 'isbn':
      searchParam = `isbn=${encodeURIComponent(query)}`;
      break;
    default:
      searchParam = `title=${encodeURIComponent(query)}`;
  }

  const url = `${BASE_URL}/search.json?${searchParam}&limit=${limit}&offset=${offset}&fields=key,title,author_name,first_publish_year,isbn,subject,cover_i,publisher,language,number_of_pages_median,ratings_average,ratings_count,author_key`;

  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  return data;
};

export const getBookDetails = async (workKey) => {
  const url = `${BASE_URL}/works/${workKey}.json`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

export const getAuthorDetails = async (authorKey) => {
  const url = `${BASE_URL}/authors/${authorKey}.json`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

export const getCoverImageUrl = (coverImageId, size = 'M') => {
  if (!coverImageId) return null;
  return `https://covers.openlibrary.org/b/id/${coverImageId}-${size}.jpg`;
};

export const formatAuthors = (authors) => {
  if (!authors || !Array.isArray(authors)) return 'Unknown Author';
  return authors.slice(0, 3).join(', ') + (authors.length > 3 ? ' et al.' : '');
};

export const formatSubjects = (subjects) => {
  if (!subjects || !Array.isArray(subjects)) return [];
  return subjects.slice(0, 5);
};

export const formatPublishYear = (year) => {
  return year ? `Published ${year}` : 'Publication year unknown';
};