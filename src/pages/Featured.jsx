import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';
import { fetchBooks } from '../services/bookService';

const Featured = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      setLoading(true);
      const data = await fetchBooks({ featured: 'true' });
      setBooks(data);
      setLoading(false);
    };
    loadFeatured();
  }, []);

  return (
    <div className="featured-page">
      <div className="section-header">
        <h1 className="section-title">Featured Books</h1>
        <p className="section-subtitle">Our handpicked selection of top recommended masterpieces</p>
      </div>

      {loading ? (
        <Loader text="Loading featured selection..." />
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <BookCard key={book._id || book.title} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Featured;
