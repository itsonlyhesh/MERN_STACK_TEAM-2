import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '5rem 1rem', background: '#FFF', borderRadius: '16px', margin: '2rem 0' }}>
      <span style={{ fontSize: '5rem' }}>🧭</span>
      <h1 style={{ fontSize: '3rem', color: '#0F172A', margin: '1rem 0 0.5rem' }}>404 - Page Not Found</h1>
      <p style={{ color: '#64748B', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
        Oops! The page you are looking for has been moved, removed, or never existed in the Book Haven store.
      </p>
      <Link to="/" className="btn btn-primary btn-lg">
        Return to Home Page 🏠
      </Link>
    </div>
  );
};

export default NotFound;
