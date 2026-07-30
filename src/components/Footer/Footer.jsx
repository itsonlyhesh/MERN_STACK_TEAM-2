import "./Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaArrowUp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="container footer-container">

        {/* Company */}

        <div className="footer-box">

          <h2>BagVerse</h2>

          <p>
            Discover premium backpacks, handbags,
            travel bags, school bags and wallets
            at the best prices in our mall store.
          </p>

          <div className="social-icons">

            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaYoutube /></a>

          </div>

        </div>

        {/* Quick Links */}

        <div className="footer-box">

          <h3>Quick Links</h3>

          <ul>

            <li><a href="#home">Home</a></li>
            <li><a href="#categories">Categories</a></li>
            <li><a href="#deals">Today's Deals</a></li>
            <li><a href="#collections">Collections</a></li>
            <li><a href="#brands">Brands</a></li>

          </ul>

        </div>

        {/* Categories */}

        <div className="footer-box">

          <h3>Categories</h3>

          <ul>

            <li>Backpacks</li>
            <li>Travel Bags</li>
            <li>School Bags</li>
            <li>Handbags</li>
            <li>Wallets</li>

          </ul>

        </div>

        {/* Contact */}

        <div className="footer-box">

          <h3>Contact</h3>

          <div className="contact-item">

            <FaMapMarkerAlt />

            <span>2nd Floor, City Mall, Hyderabad</span>

          </div>

          <div className="contact-item">

            <FaPhoneAlt />

            <span>+91 98765 43210</span>

          </div>

          <div className="contact-item">

            <FaEnvelope />

            <span>info@bagverse.com</span>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="footer-bottom">

        <p>
          © 2026 BagVerse. All Rights Reserved.
        </p>

        <a href="#home" className="scroll-top">

          <FaArrowUp />

        </a>

      </div>

    </footer>
  );
}

export default Footer;