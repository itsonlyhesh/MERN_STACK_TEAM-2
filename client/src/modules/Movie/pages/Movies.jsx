import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, SlidersHorizontal, Clock, Film } from 'lucide-react';
import './Pages.css';
import { MOVIE_API_URL, MOVIE_BASE_PATH } from '../config';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [language, setLanguage] = useState('');
  const [loading, setLoading] = useState(true);

  // Available genres and languages for filter bars
  const genres = ['Action', 'Sci-Fi', 'Thriller', 'Drama', 'Adventure', 'Crime', 'Family', 'Horror', 'Romance'];
  const languages = ['English', 'Telugu', 'Tamil', 'Hindi'];

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let queryParams = [];
        if (search) queryParams.push(`search=${search}`);
        if (genre) queryParams.push(`genre=${genre}`);
        if (language) queryParams.push(`language=${language}`);

        const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
        const response = await axios.get(`${MOVIE_API_URL}/movies${queryString}`);
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    // Add debouncer for search input
    const delayDebounceFn = setTimeout(() => {
      fetchMovies();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, genre, language]);

  return (
    <div className="page-container">
      <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>Movie Catalog</h2>

      <div className="search-filter-container glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        <div className="search-box">
          <div className="input-wrapper">
            <Search size={18} className="input-icon" />
            <input
              type="text"
              placeholder="Search movies by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-box">
          <div className="input-wrapper">
            <SlidersHorizontal size={18} className="input-icon" />
            <select value={genre} onChange={(e) => setGenre(e.target.value)}>
              <option value="">All Genres</option>
              {genres.map((g, i) => (
                <option key={i} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="filter-box">
          <div className="input-wrapper">
            <SlidersHorizontal size={18} className="input-icon" />
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="">All Languages</option>
              {languages.map((l, i) => (
                <option key={i} value={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
          <p>Filtering movies...</p>
        </div>
      ) : movies.length === 0 ? (
        <div className="no-data-card">
          <Film size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
          <h3>No Movies Found</h3>
          <p>Try modifying your search keywords or filter settings.</p>
        </div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <div key={movie._id} className="movie-card animate-fade-in">
              <Link to={`${MOVIE_BASE_PATH}/movie/${movie._id}`}>
                <div className="movie-poster-wrapper">
                  <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
                  <span className="movie-rating-badge">{movie.rating}</span>
                </div>
              </Link>
              <div className="movie-card-info">
                <h3>{movie.title}</h3>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  {movie.genre.map((g, i) => (
                    <span key={i} className="tag">{g}</span>
                  ))}
                </div>
                <div className="movie-card-meta">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} />
                    {movie.duration}m
                  </span>
                  <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>
                    {movie.language}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;
