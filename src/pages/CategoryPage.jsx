import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';
import { fetchBooks } from '../services/bookService';

const categoryDescriptions = {
  programming: 'Master software engineering, clean code, web frameworks, and algorithms with leading developer guides.',
  novels: 'Explore critically acclaimed fiction, timeless literary sagas, and gripping best-selling novels.',
  academic: 'University reference books, scientific papers, and essential educational textbooks for students.',
  children: 'Fairy tales, early learning readers, and bedtime storybooks designed for young curious minds.',
  fantasy: 'High fantasy, mythical dragons, heroic sagas, and magical realm adventures.',
  biography: 'Inspiring life memoirs and historical biographies of global pioneers and visionaries.',
  history: 'Fascinating accounts of ancient world civilizations, human evolution, and historic events.',
  science: 'Astrophysics, quantum mechanics, nature, and groundbreaking scientific discoveries.',
  'self-help': 'Practical guides for mindset mastery, personal growth, productivity, and life transformation.',
  mystery: 'Suspenseful detective thrillers, crime novels, and psychological murder mysteries.'
};

const CategoryPage = ({ defaultCategory }) => {
  const { slug } = useParams();
  const location = useLocation();

  // Determine category name from path or default prop
  const currentSlug = slug || defaultCategory || location.pathname.replace('/', '');
  const formattedCategoryName = currentSlug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategoryBooks = async () => {
      setLoading(true);
      const data = await fetchBooks({ category: formattedCategoryName });
      setBooks(data);
      setLoading(false);
    };

    loadCategoryBooks();
  }, [currentSlug, formattedCategoryName]);

  return (
    <div className="category-detail-page">
      <div className="section-header">
        <h1 className="section-title">{formattedCategoryName} Books</h1>
        <p className="section-subtitle">
          {categoryDescriptions[currentSlug.toLowerCase()] || `Browse our handpicked collection of ${formattedCategoryName} titles.`}
        </p>
      </div>

      {loading ? (
        <Loader text={`Loading ${formattedCategoryName} books...`} />
      ) : books.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: '#FFF', borderRadius: '12px' }}>
          <h3>No books found in {formattedCategoryName} right now.</h3>
          <p style={{ color: '#64748B', marginTop: '0.5rem' }}>Check back soon for new arrivals!</p>
        </div>
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

export default CategoryPage;
