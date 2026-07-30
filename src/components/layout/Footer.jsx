import { Link } from 'react-router-dom';
import '../../css/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Info */}
        <div className="footer-brand">
          <h3>📚 Book Haven</h3>
          <p>
            Your premier destination for physical and digital books. From high-demand tech guides to timeless novels and captivating fairy tales, Book Haven delivers knowledge right to your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/categories">All Categories</Link></li>
            <li><Link to="/featured">Featured Books</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Support</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-col">
          <h4>Top Genres</h4>
          <ul className="footer-links">
            <li><Link to="/programming">Programming</Link></li>
            <li><Link to="/novels">Novels & Fiction</Link></li>
            <li><Link to="/academic">Academic & Textbooks</Link></li>
            <li><Link to="/children">Children's Books</Link></li>
            <li><Link to="/categories">Self Help & Growth</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="footer-col">
          <h4>Store Hours & Info</h4>
          <ul className="footer-links">
            <li>📍 Shopping Mall, 2nd Floor</li>
            <li>📞 (555) 234-BOOK</li>
            <li>✉️ support@bookhaven.com</li>
            <li>⏰ Mon - Sat: 9:00 AM - 9:00 PM</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Book Haven. All rights reserved. Professional MERN Stack Application.</p>
        <p>Privacy Policy | Terms of Service</p>
      </div>
    </footer>
  );
};

export default Footer;
