import { fetchBooks, fetchBookById } from '../services/bookService';

export const getBooks = async (params) => {
  return await fetchBooks(params);
};

export const getBookById = async (id) => {
  return await fetchBookById(id);
};

export default { getBooks, getBookById };
