import React from 'react';
import { Film, Mail, MapPin, Phone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand-section">
          <div className="footer-logo">
            <Film className="footer-logo-icon" />
            <span>Cinema <span className="gold-text">Movies</span></span>
          </div>
          <p className="footer-desc">
            Experience state-of-the-art cinema projections and premium seating at our premiere entertainment hub.
          </p>
        </div>

        <div className="footer-links-grid">
          <div className="footer-links-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/movies">Now Showing</a></li>
              <li><a href="/my-bookings">My Bookings</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Contact Us</h4>
            <ul className="footer-contact-list">
              <li>
                <MapPin size={16} className="contact-icon" />
                <span>Level 3, Entertainment Center, Mumbai, India</span>
              </li>
              <li>
                <Phone size={16} className="contact-icon" />
                <span>+91 22 6600 1122</span>
              </li>
              <li>
                <Mail size={16} className="contact-icon" />
                <span>cinema@movies.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Cinema Movies. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
