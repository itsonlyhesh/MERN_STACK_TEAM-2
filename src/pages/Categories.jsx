import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import { fetchBooks, fetchCategories } from '../services/bookService';

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await fetchCategories();
      setCategories(cats);
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      const data = await fetchBooks({
        category: selectedCategory,
        search: searchTerm
      });
      setBooks(data);
      setLoading(false);
    };

    loadBooks();
  }, [selectedCategory, searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSearchParams({ search: term, category: selectedCategory });
  };

  const handleCategoryFilter = (cat) => {
    setSelectedCategory(cat);
    setSearchParams({ category: cat, search: searchTerm });
  };

  return (
    <div className="categories-page">
      <div className="section-header">
        <h1 className="section-title">Book Categories</h1>
        <p className="section-subtitle">Discover books across all 10 curated literary genres</p>
      </div>

      {/* Category Pills Bar */}
      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
        <button
          className={`btn btn-sm ${selectedCategory === '' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => handleCategoryFilter('')}
        >
          All Genres
        </button>
        {categories.map((c) => (
          <button
            key={c.slug || c.name}
            className={`btn btn-sm ${selectedCategory.toLowerCase() === c.name.toLowerCase() ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleCategoryFilter(c.name)}
          >
            {c.icon || '📚'} {c.name}
          </button>
        ))}
      </div>

      {/* Live Search & Filter Bar */}
      <SearchBar
        onSearch={handleSearch}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryFilter}
        categories={categories}
      />

      {/* Book Results */}
      {loading ? (
        <Loader text="Filtering bookstore catalog..." />
      ) : books.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: '#FFF', borderRadius: '12px', marginTop: '1.5rem' }}>
          <h3>No books found matching your criteria</h3>
          <p style={{ color: '#64748B', marginTop: '0.5rem' }}>Try searching for a different title or select "All Genres".</p>
          <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => { setSelectedCategory(''); setSearchTerm(''); }}>
            Reset Filters
          </button>
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

export default Categories;
