import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Clock, Calendar, Star, Film, Monitor, Play } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import './Pages.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState('');
  const { selectShow } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const movieRes = await axios.get(`http://localhost:5000/api/movies/${id}`);
        setMovie(movieRes.data);

        const showsRes = await axios.get(`http://localhost:5000/api/shows?movieId=${id}`);
        setShows(showsRes.data);
      } catch (error) {
        console.error('Error loading movie details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  // Helper to extract YouTube video ID and construct an embed URL
  const getEmbedUrl = (url) => {
    if (!url) return '';
    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : '';
  };

  const handleSelectShow = (show) => {
    selectShow(show);
    navigate('/seats');
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="loading-spinner"></div>
        <p>Loading movie specifications...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="page-container">
        <div className="no-data-card">
          <h3>Movie Not Found</h3>
          <p>The movie details might have been removed or updated.</p>
        </div>
      </div>
    );
  }

  const embedLink = getEmbedUrl(movie.trailerUrl);

  return (
    <div className="page-container">
      <div className="movie-details-layout animate-fade-in" style={{ marginBottom: '40px' }}>
        <div>
          <img src={movie.posterUrl} alt={movie.title} className="details-poster" />
        </div>

        <div className="details-info">
          <div className="details-title-row">
            <h1>{movie.title}</h1>
            <span className="tag tag-gold">{movie.rating} Rating</span>
          </div>

          <div className="details-tags">
            {movie.genre.map((g, i) => (
              <span key={i} className="tag">{g}</span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} />
              {movie.duration} Minutes
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={16} />
              Released: {new Date(movie.releaseDate).toLocaleDateString()}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Monitor size={16} />
              Language: {movie.language}
            </span>
          </div>

          <p className="details-description">{movie.description}</p>

          {movie.cast && movie.cast.length > 0 && (
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '10px', color: 'var(--text-main)' }}>Cast & Crew</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {movie.cast.map((actor, idx) => (
                  <span key={idx} className="tag" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}>
                    {actor}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {embedLink && (
        <div className="trailer-accordion animate-fade-in" style={{ marginBottom: '40px' }}>
          <button
            onClick={() => setShowTrailer(!showTrailer)}
            className="btn-secondary"
            style={{
              width: '100%',
              justifyContent: 'space-between',
              padding: '16px 24px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              fontSize: '1.02rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Play size={18} style={{ color: 'var(--accent-gold)' }} />
              Watch Official Trailer
            </span>
            <span style={{ transition: 'transform 0.3s', transform: showTrailer ? 'rotate(180deg)' : 'rotate(0deg)', fontSize: '0.8rem' }}>
              ▼
            </span>
          </button>

          {showTrailer && (
            <div className="trailer-iframe-wrapper animate-fade-in" style={{ marginTop: '20px' }}>
              <iframe
                src={embedLink}
                title={`${movie.title} Official Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      )}

      <div className="showtimes-section animate-fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <Film style={{ color: 'var(--accent-gold)' }} />
            <span>Available Showtimes</span>
          </h2>

          {/* Language Selection Filter for Multi-Language Movies */}
          {(() => {
            const uniqueLanguages = [...new Set(shows.map((s) => s.language).filter(Boolean))];
            if (uniqueLanguages.length > 1) {
              return (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-muted)' }}>Screening Language:</span>
                  <div className="input-wrapper" style={{ width: '180px' }}>
                    <SlidersHorizontal size={14} className="input-icon" />
                    <select
                      value={selectedLanguageFilter}
                      onChange={(e) => setSelectedLanguageFilter(e.target.value)}
                      style={{ padding: '8px 12px 8px 36px', fontSize: '0.85rem' }}
                    >
                      <option value="">All Languages</option>
                      {uniqueLanguages.map((lang, idx) => (
                        <option key={idx} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            }
            return null;
          })()}
        </div>

        {(() => {
          const filteredShows = selectedLanguageFilter
            ? shows.filter((show) => show.language === selectedLanguageFilter)
            : shows;

          if (filteredShows.length === 0) {
            return <p style={{ marginTop: '20px', color: 'var(--text-muted)' }}>No screenings scheduled for the selected language.</p>;
          }

          return (
            <div className="showtimes-grid" style={{ marginTop: '20px' }}>
              {filteredShows.map((show) => {
                const showDate = new Date(show.dateTime);
                return (
                  <div key={show._id} onClick={() => handleSelectShow(show)} className="showtime-card">
                    <div className="showtime-time">
                      {showDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="showtime-screen">
                      {show.screenName} &bull; {showDate.toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="showtime-price" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>{show.language}</span>
                      <span>₹{show.basePrice} Base</span>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default MovieDetails;
