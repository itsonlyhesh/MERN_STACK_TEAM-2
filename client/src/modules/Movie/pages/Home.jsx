import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Play, Calendar, Clock, Film } from 'lucide-react';
import './Pages.css';
import { MOVIE_API_URL, MOVIE_BASE_PATH } from '../config';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${MOVIE_API_URL}/movies`);
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="page-container">
      <header className="hero-section animate-fade-in">
        <h1 className="gradient-text">Experience Movies Like Never Before</h1>
        <p>Premium projection, immersive sound, and gourmet concessions at our premiere entertainment destination.</p>
        <Link to={`${MOVIE_BASE_PATH}/movies`} className="btn-primary">
          <Play size={18} fill="currentColor" />
          <span>Browse Now</span>
        </Link>
      </header>

      <section className="now-showing-section">
        <h2 style={{ fontSize: '1.8rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Film style={{ color: 'var(--accent-gold)' }} />
          <span>Now Showing</span>
        </h2>

        {loading ? (
          <div className="spinner-container">
            <div className="loading-spinner"></div>
            <p>Loading catalog...</p>
          </div>
        ) : movies.length === 0 ? (
          <div className="no-data-card">
            <h3>No movies in theater right now.</h3>
            <p>Please check back later or add new releases from the admin panel.</p>
          </div>
        ) : (
          <div className="movies-grid">
            {movies.slice(0, 4).map((movie) => (
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
                    {movie.genre.slice(0, 2).map((g, i) => (
                      <span key={i} className="tag">{g}</span>
                    ))}
                  </div>
                  <div className="movie-card-meta">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={14} />
                      {movie.duration}m
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={14} />
                      {new Date(movie.releaseDate).getFullYear()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
