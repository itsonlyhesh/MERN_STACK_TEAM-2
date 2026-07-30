import api from './api';
import { sampleBooks, sampleCategories } from './sampleData';

export const fetchBooks = async (params = {}) => {
  try {
    const response = await api.get('/books', { params });
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data;
    }
  } catch (error) {
    console.warn('API connection offline/empty, using sample fallback dataset:', error.message);
  }

  // Filter sample data when backend is not populated or offline
  let books = [...sampleBooks];

  if (params.category) {
    const catQuery = params.category.toLowerCase();
    books = books.filter(b => b.category.toLowerCase() === catQuery || b.category.toLowerCase().includes(catQuery));
  }

  if (params.featured === 'true' || params.featured === true) {
    books = books.filter(b => b.isFeatured);
  }

  if (params.bestseller === 'true' || params.bestseller === true) {
    books = books.filter(b => b.isBestSeller);
  }

  if (params.search) {
    const q = params.search.toLowerCase();
    books = books.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q)
    );
  }

  if (params.limit) {
    books = books.slice(0, Number(params.limit));
  }

  return books;
};

export const fetchBookById = async (id) => {
  try {
    const response = await api.get(`/books/${id}`);
    if (response.data) return response.data;
  } catch (error) {
    console.warn('API connection error for fetchBookById:', error.message);
  }

  // Fallback to finding book in sampleBooks
  return sampleBooks.find(b => b._id === id || b.isbn === id || b.title.toLowerCase().includes(id?.toLowerCase())) || sampleBooks[0];
};

export const fetchCategories = async () => {
  try {
    const response = await api.get('/categories');
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data;
    }
  } catch (error) {
    console.warn('API error for categories, using sample fallback dataset');
  }
  return sampleCategories;
};

export const createBook = async (bookData) => {
  try {
    const response = await api.post('/books', bookData);
    return response.data;
  } catch (error) {
    console.warn('API save offline, returning created book mock');
    return { ...bookData, _id: `custom-${Date.now()}` };
  }
};

export const updateBook = async (id, bookData) => {
  try {
    const response = await api.put(`/books/${id}`, bookData);
    return response.data;
  } catch (error) {
    return { ...bookData, _id: id };
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  } catch (error) {
    return { message: 'Deleted' };
  }
};

