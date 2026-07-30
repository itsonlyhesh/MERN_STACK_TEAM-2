import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-page">
      <div className="section-header">
        <h1 className="section-title">About Book Haven</h1>
        <p className="section-subtitle">Connecting readers with timeless literature and technical mastery since 2026</p>
      </div>

      <div style={{ background: '#FFF', padding: '2.5rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#4F46E5', marginBottom: '1rem' }}>Our Mission</h2>
        <p style={{ lineHeight: 1.8, color: '#334155', marginBottom: '1.5rem' }}>
          At Book Haven, we believe books are gateways to boundless human imagination and personal growth. Founded as a physical bookstore located in the central shopping mall, Book Haven has evolved into a modern MERN Stack e-commerce platform offering readers instant access to thousands of curated titles across programming, academic research, best-selling fiction, and children's adventures.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', margin: '2.5rem 0', textAlign: 'center' }}>
          <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '2rem', color: '#4F46E5' }}>10,000+</h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Books Distributed</p>
          </div>
          <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '2rem', color: '#7C3AED' }}>10</h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Core Categories</p>
          </div>
          <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '2rem', color: '#F59E0B' }}>99.8%</h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Customer Satisfaction</p>
          </div>
        </div>

        <h2 style={{ color: '#0F172A', marginBottom: '1rem' }}>Why Choose Book Haven?</h2>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: 1.8, color: '#334155', marginBottom: '2rem' }}>
          <li>Authentic publisher prints with high-grade binding and paper.</li>
          <li>Comprehensive range of IT and programming books for modern engineers.</li>
          <li>Ultra-fast 3-5 day delivery with 24/7 customer support.</li>
          <li>Competitive prices with daily promotional deals.</li>
        </ul>

        <div style={{ textAlign: 'center' }}>
          <Link to="/categories" className="btn btn-primary btn-lg">
            Explore Our Catalog 📚
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
