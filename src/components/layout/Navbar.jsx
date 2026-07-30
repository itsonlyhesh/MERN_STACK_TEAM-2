import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import '../../css/navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout, isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/categories?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <NavLink to="/" className="nav-brand">
          <span className="brand-icon">📚</span>
          <span>Book <span className="brand-highlight">Haven</span></span>
        </NavLink>

        {/* Search Bar */}
        <form className="nav-search" onSubmit={handleSearchSubmit}>
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by title, author, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        {/* Mobile Hamburger Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle navigation"
        >
          {isMobileOpen ? '✕' : '☰'}
        </button>

        {/* Navigation Links */}
        <nav className={`nav-links ${isMobileOpen ? 'open' : ''}`}>
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMobileOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/categories" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMobileOpen(false)}>
            Categories
          </NavLink>
          <NavLink to="/featured" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMobileOpen(false)}>
            Featured
          </NavLink>
          <NavLink to="/wishlist" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMobileOpen(false)}>
            Wishlist {wishlistCount > 0 && <span className="nav-badge">{wishlistCount}</span>}
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMobileOpen(false)}>
            Cart {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
          </NavLink>
          
          {isAdmin && (
            <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMobileOpen(false)}>
              Admin
            </NavLink>
          )}

          {user ? (
            <div className="user-nav-box" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#E2E8F0', fontSize: '0.85rem', fontWeight: 600 }}>Hi, {user.name.split(' ')[0]}</span>
              <button
                className="btn btn-outline btn-sm"
                onClick={logout}
                style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#FFF' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="btn btn-primary btn-sm" onClick={() => setIsMobileOpen(false)}>
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
