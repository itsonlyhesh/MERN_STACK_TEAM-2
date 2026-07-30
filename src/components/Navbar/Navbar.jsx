import "./Navbar.css";
import { useState, useEffect } from "react";
import {
  FaSearch,
  FaHeart,
  FaShoppingBag,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [wishlistCount, setWishlistCount] = useState(
  JSON.parse(localStorage.getItem("wishlist")) || []
);
useEffect(() => {

  const updateWishlist = () => {
    setWishlistCount(
      JSON.parse(localStorage.getItem("wishlist")) || []
    );
  };


  window.addEventListener(
    "wishlistUpdated",
    updateWishlist
  );


  return () => {
    window.removeEventListener(
      "wishlistUpdated",
      updateWishlist
    );
  };

}, []);
  return (
    <header className="navbar">
      <div className="container navbar-container">
        
        {/* Logo */}
        <div className="logo">
          <h2>BagVerse</h2>
        </div>

        {/* Navigation */}

        <nav className={menuOpen ? "nav-links active" : "nav-links"}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/deals">Offers</NavLink>
            <NavLink to="/brands">Brands</NavLink>
            <NavLink to="/store">Store</NavLink>
          </nav>

        {/* Icons */}

        <div className="nav-icons">
          <FaSearch style={{ cursor: "pointer" }}
                onClick={() => navigate("/products")}/>
          <div className="wishlist-nav"
            onClick={() => navigate("/wishlist")}
            >

            <FaHeart style={{cursor:"pointer"}} />

            {
              wishlistCount.length > 0 &&
             (
            <span>
            {wishlistCount.length}
            </span>
            )
            }

          </div>

          <FaShoppingBag
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/store")}
          />
        </div>

        {/* Mobile Menu */}

        <div
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

      </div>
    </header>
  );
}

export default Navbar;