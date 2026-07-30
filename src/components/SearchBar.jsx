import { useState } from 'react';

const SearchBar = ({ onSearch, selectedCategory, onCategoryChange, categories = [] }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form className="search-bar-form" onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', width: '100%', maxWidth: '700px', margin: '0 auto 2rem' }}>
      <input
        type="text"
        className="form-control"
        placeholder="Search books by title, author, or keyword..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ flex: 1 }}
      />
      {categories.length > 0 && (
        <select
          className="form-control"
          value={selectedCategory}
          onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
          style={{ width: '180px' }}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.slug || c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      )}
      <button type="submit" className="btn btn-primary">
        Search 🔍
      </button>
    </form>
  );
};

export default SearchBar;
