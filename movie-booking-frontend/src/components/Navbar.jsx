import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, ShoppingBag, LogOut, User as UserIcon } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { selectedSeats, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const totalSeats = selectedSeats.length;

  return (
    <nav className="navbar glass-panel">
      <div className="navbar-container">
        <Link to="/" className="nav-logo">
          <Film className="logo-icon" />
          <span>Cinema <span className="gold-text">Movies</span></span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/movies" className="nav-link">Movies</Link>
          
          {user && (
            <Link to="/my-bookings" className="nav-link">My Bookings</Link>
          )}
        </div>

        <div className="nav-actions">
          {user ? (
            <>
              <Link to="/cart" className="cart-badge-container">
                <ShoppingBag size={20} className="nav-icon" />
                {totalSeats > 0 && (
                  <span className="cart-badge-count">{totalSeats}</span>
                )}
                {totalSeats > 0 && (
                  <span className="cart-badge-price">₹{getCartTotal()}</span>
                )}
              </Link>

              <div className="user-profile-menu">
                <UserIcon size={18} className="user-avatar-icon" />
                <span className="user-profile-name">{user.name}</span>
              </div>

              <button onClick={handleLogout} className="btn-logout" title="Sign Out">
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <Link to="/auth" className="btn-primary-nav">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
