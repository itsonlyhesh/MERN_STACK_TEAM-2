import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero-section animate-fade-in">
      <div className="hero-content">
        <span className="hero-tag">🔥 Up to 30% Off New Releases</span>
        <h1 className="hero-title">
          Discover Extraordinary Stories & <span>Expert Knowledge</span>
        </h1>
        <p className="hero-subtitle">
          Welcome to Book Haven. Explore thousands of bestselling titles across programming, novels, academic research, children's classics, and personal growth.
        </p>
        <div className="hero-actions">
          <Link to="/categories" className="btn btn-accent btn-lg">
            Explore Categories 📚
          </Link>
          <Link to="/featured" className="btn btn-outline btn-lg" style={{ color: '#FFF', borderColor: '#FFF' }}>
            Featured Books ⭐
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
