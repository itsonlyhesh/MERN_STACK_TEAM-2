import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBookById } from '../services/bookService';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Loader from '../components/Loader';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getBook = async () => {
      setLoading(true);
      const data = await fetchBookById(id);
      setBook(data);
      setLoading(false);
    };

    getBook();
  }, [id]);

  if (loading) return <Loader text="Retrieving book details..." />;
  if (!book) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2>Book Not Found</h2>
        <p style={{ color: '#64748B', marginTop: '0.5rem' }}>The requested book could not be located in our catalog.</p>
        <button className="btn btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => navigate('/categories')}>
          Back to Bookstore
        </button>
      </div>
    );
  }

  const isWishlisted = isInWishlist(book._id || book.isbn || book.title);

  const handleBuyNow = () => {
    addToCart(book, quantity);
    navigate('/checkout');
  };

  return (
    <div className="book-details-page">
      <button className="btn btn-secondary btn-sm" onClick={() => navigate(-1)} style={{ marginBottom: '1.5rem' }}>
        ← Back
      </button>

      <div className="book-details-wrapper animate-fade-in">
        {/* Cover Image Box */}
        <div className="details-cover-box">
          <img
            src={book.coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop'}
            alt={book.title}
          />
        </div>

        {/* Book Information */}
        <div className="details-info">
          <span className="book-category-tag">{book.category}</span>
          <h1>{book.title}</h1>
          <p className="details-author">By <strong>{book.author}</strong></p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.75rem 0', color: '#F59E0B' }}>
            <span style={{ fontSize: '1.2rem' }}>★</span>
            <strong style={{ color: '#0F172A' }}>{book.rating || 4.8}</strong>
            <span style={{ color: '#64748B', fontSize: '0.9rem' }}>({book.numReviews || 24} customer reviews)</span>
          </div>

          <div className="details-price-row">
            <span style={{ fontSize: '2.25rem', fontWeight: 800, color: '#4F46E5' }}>
              ${Number(book.price).toFixed(2)}
            </span>
            {book.originalPrice && book.originalPrice > book.price && (
              <span style={{ textDecoration: 'line-through', color: '#94A3B8', fontSize: '1.25rem' }}>
                ${Number(book.originalPrice).toFixed(2)}
              </span>
            )}
            <span className="badge badge-offer" style={{ fontSize: '0.85rem' }}>
              {book.stock > 0 ? `In Stock (${book.stock} left)` : 'Out of Stock'}
            </span>
          </div>

          <p style={{ lineHeight: 1.7, color: '#334155', marginBottom: '1.5rem' }}>
            {book.description}
          </p>

          {/* Metadata Grid */}
          <div className="details-meta-grid">
            <div className="meta-item"><strong>Publisher:</strong> {book.publisher || 'Book Haven Publishing'}</div>
            <div className="meta-item"><strong>ISBN:</strong> {book.isbn || '978-0123456789'}</div>
            <div className="meta-item"><strong>Language:</strong> {book.language || 'English'}</div>
            <div className="meta-item"><strong>Category:</strong> {book.category}</div>
          </div>

          {/* Quantity Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <span style={{ fontWeight: 600 }}>Quantity:</span>
            <div className="qty-control">
              <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <input type="text" className="qty-input" value={quantity} readOnly />
              <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="details-actions">
            <button className="btn btn-primary btn-lg" onClick={() => addToCart(book, quantity)}>
              Add to Cart 🛒
            </button>
            <button className="btn btn-accent btn-lg" onClick={handleBuyNow}>
              Buy Now ⚡
            </button>
            <button
              className={`btn ${isWishlisted ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => toggleWishlist(book)}
            >
              {isWishlisted ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
