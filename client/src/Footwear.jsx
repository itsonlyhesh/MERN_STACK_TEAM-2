import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import noImage from "./assets/no-image.svg";

// Preload local assets dynamically so we never have broken image links
const localImages = import.meta.glob("./assets/*", { eager: true, as: "url" });

// Formats numbers into beautiful strings (e.g., ₹1,499)
const formatPrice = (price) => 
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

// --- High-Quality Banner Data ---
const heroSlides = [
  {
    id: 1,
    title: "Step Into Greatness.",
    subtitle: "Discover premium footwear designed for ultimate comfort and unmatched style.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop", 
    cta: "Explore Collection"
  },
  {
    id: 2,
    title: "Run The Streets.",
    subtitle: "Engineered for performance. Experience lightweight cushioning with every step.",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2000&auto=format&fit=crop", 
    cta: "Shop Running"
  },
  {
    id: 3,
    title: "Everyday Classics.",
    subtitle: "Timeless silhouettes that never go out of style. Find your everyday pair.",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop", 
    cta: "Shop Classics"
  }
];

export default function Footwear() {
  // -- App State --
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // -- User Input & UI State --
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");
  const [toastMessage, setToastMessage] = useState("");
  
  // -- Carousel State --
  const [currentSlide, setCurrentSlide] = useState(0);

  // -- E-commerce State --
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // -- Auto-playing Carousel Logic --
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(slideInterval);
  }, []);

  // -- Data Fetching --
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // Simulate a slight network delay for a smoother skeleton loading experience
        await new Promise(resolve => setTimeout(resolve, 800)); 
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Oops! Failed to fetch products:", err);
        setError("We're having trouble loading the store right now. Please try again in a moment.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // -- Helper Functions --
  const resolveImage = (img) => {
    if (!img || typeof img !== "string") return noImage;
    if (img.startsWith("local:")) {
      const name = img.slice(6);
      return localImages[`./assets/${name}`] || localImages[`./assets/${encodeURIComponent(name)}`] || noImage;
    }
    const basenameMatch = img.match(/([^\\/]+\.[a-zA-Z0-9]{2,6})$/);
    if (basenameMatch) {
      return localImages[`./assets/${basenameMatch[1]}`] || noImage;
    }
    return img;
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // -- Derived Data (Memoized) --
  const brands = useMemo(() => ["All", ...new Set(products.map((p) => p.brand))], [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.trim().toLowerCase());
      const matchesBrand = brand === "All" || product.brand === brand;
      return matchesSearch && matchesBrand;
    });
  }, [products, search, brand]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  // -- User Actions --
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id);
      if (existing) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    showToast(`Added ${product.name} to cart 🛒`);
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => item._id === id ? { ...item, quantity: item.quantity + delta } : item)
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleWishlist = (product) => {
    const id = product._id || product.name;
    setWishlist((prev) => {
      if (prev.includes(id)) {
        showToast(`Removed from wishlist`);
        return prev.filter((item) => item !== id);
      } else {
        showToast(`Saved to wishlist ❤️`);
        return [...prev, id];
      }
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    showToast("🎉 Order Placed Successfully! Preparing your shoes...");
    setCart([]);
  };

  return (
    <div className="app-wrapper">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          {toastMessage}
        </div>
      )}

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo" onClick={() => window.scrollTo(0, 0)}>
          👟 Shoe Square
        </div>
        <div className="nav-actions">
          {wishlist.length > 0 && (
            <div className="wishlist-badge">❤️ {wishlist.length}</div>
          )}
          <div className="cart-icon" onClick={() => document.querySelector(".cart-section").scrollIntoView({ behavior: "smooth" })}>
            🛒 Cart <span>{cart.length}</span>
          </div>
        </div>
      </nav>

      {/* Dynamic Auto-Playing Hero Slider */}
      <section className="hero-slider">
        {heroSlides.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-overlay"></div>
            <div className="slide-content">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <button
                className="btn btn-primary btn-large"
                onClick={() => document.querySelector(".products-grid").scrollIntoView({ behavior: "smooth" })}
              >
                {slide.cta}
              </button>
            </div>
          </div>
        ))}
        {/* Slider Dots */}
        <div className="slider-dots">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <main className="container">
        {/* Controls / Filter Bar */}
        <div className="controls-bar">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search for your perfect pair..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select value={brand} onChange={(e) => setBrand(e.target.value)}>
            {brands.map((b) => (
              <option key={b} value={b}>{b === "All" ? "All Brands" : b}</option>
            ))}
          </select>
        </div>

        {/* Dynamic Products Grid */}
        <div className="products-section">
          {isLoading ? (
            <div className="products-grid">
              {[...Array(8)].map((_, i) => (
                <div className="product-card skeleton" key={i}>
                  <div className="skeleton-img"></div>
                  <div className="skeleton-text title"></div>
                  <div className="skeleton-text short"></div>
                  <div className="skeleton-button"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="empty-state error-state">
              <h3>⚠️ Connection Issue</h3>
              <p>{error}</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-state">
              <h3>No shoes found</h3>
              <p>Try adjusting your search or clearing your filters.</p>
              <button className="btn btn-secondary" onClick={() => { setSearch(""); setBrand("All"); }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => {
                const productId = product._id || product.name;
                const isWishlisted = wishlist.includes(productId);
                const isOutOfStock = product.stock <= 0;

                return (
                  <div className="product-card fade-in" key={productId}>
                    <button 
                      className="wishlist-btn" 
                      onClick={() => toggleWishlist(product)}
                    >
                      {isWishlisted ? "❤️" : "🤍"}
                    </button>

                    <div className="product-image" onClick={() => setSelectedProduct(product)}>
                      <img
                        src={resolveImage(product.image)}
                        alt={product.name}
                        loading="lazy"
                        onError={(e) => { e.target.onerror = null; e.target.src = noImage; }}
                      />
                    </div>

                    <div className="product-meta">
                      <p className="brand-label">{product.brand}</p>
                      <h3>{product.name}</h3>
                      
                      <div className="price-row">
                        <span className="price">{formatPrice(product.price)}</span>
                        {product.discount > 0 && (
                          <span className="badge discount-badge">{product.discount}% OFF</span>
                        )}
                      </div>

                      <p className={`stock-status ${isOutOfStock ? "out-of-stock" : "in-stock"}`}>
                        <span className="status-dot"></span>
                        {isOutOfStock ? "Out of Stock" : "In Stock"}
                      </p>
                    </div>

                    <div className="card-actions">
                      <button 
                        className="btn btn-primary" 
                        onClick={() => addToCart(product)}
                        disabled={isOutOfStock}
                      >
                        {isOutOfStock ? "Sold Out" : "Add to Cart"}
                      </button>
                      <button className="btn btn-secondary" onClick={() => setSelectedProduct(product)}>
                        Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Shopping Cart Section */}
        <section className="cart-section fade-in">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <div className="empty-cart-state">
              <span className="cart-emoji">🛍️</span>
              <p>Your cart is feeling a little empty.</p>
              <button className="btn btn-primary" onClick={() => window.scrollTo(0, 0)}>Start Shopping</button>
            </div>
          ) : (
            <div className="cart-container">
              <div className="cart-items">
                {cart.map((item) => (
                  <div className="cart-item" key={item._id}>
                    <img src={resolveImage(item.image)} alt={item.name} />
                    <div className="cart-details">
                      <h4>{item.name}</h4>
                      <p className="cart-brand">{item.brand}</p>
                      <p className="cart-price">{formatPrice(item.price)}</p>
                      
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item._id, -1)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, 1)}>+</button>
                      </div>
                    </div>
                    <button className="btn-remove" onClick={() => updateQuantity(item._id, -item.quantity)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <hr />
                <div className="summary-row total-row">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <button className="btn btn-primary btn-block checkout-btn" onClick={handleCheckout}>
                  Secure Checkout
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <h3>👟 Shoe Square</h3>
          <p>Elevating your journey, one step at a time.</p>
          <p className="copyright">© {new Date().getFullYear()} Shoe Square. Crafted with passion.</p>
        </div>
      </footer>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="modal-card fade-in-up" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedProduct(null)}>✕</button>
            
            <div className="modal-grid">
              <div className="modal-image-wrapper">
                <img src={resolveImage(selectedProduct.image)} alt={selectedProduct.name} />
              </div>
              
              <div className="modal-info">
                <span className="brand-label">{selectedProduct.brand}</span>
                <h2>{selectedProduct.name}</h2>
                <h3 className="modal-price">{formatPrice(selectedProduct.price)}</h3>
                <div className="divider"></div>
                <p className="modal-desc">{selectedProduct.description || "Experience premium comfort and durable design with our latest footwear collection, crafted to support your every move."}</p>
                
                {selectedProduct.sizes && (
                  <div className="size-selector">
                    <h4>Available Sizes</h4>
                    <div className="size-chips">
                      {selectedProduct.sizes.map(size => (
                        <span key={size} className="size-chip">{size}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                <button 
                  className="btn btn-primary btn-block mt-auto"
                  onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                  disabled={selectedProduct.stock <= 0}
                >
                  {selectedProduct.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}