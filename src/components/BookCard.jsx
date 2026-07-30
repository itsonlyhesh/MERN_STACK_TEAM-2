import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const BookCard = ({ book }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!book) return null;

  const bookId = book._id || book.isbn || book.title.toLowerCase().replace(/\s+/g, '-');
  const isWishlisted = isInWishlist(bookId);

  return (
    <div className="book-card animate-fade-in">
      <div className="book-cover-wrap">
        <img
          src={book.coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop'}
          alt={book.title}
          className="book-cover"
          loading="lazy"
        />

        {/* Badges */}
        <div className="book-badge-container">
          {book.isTodayOffer && <span className="badge badge-offer">Today's Deal</span>}
          {book.isBestSeller && <span className="badge badge-bestseller">Best Seller</span>}
          {book.isFeatured && !book.isBestSeller && <span className="badge badge-featured">Featured</span>}
        </div>

        {/* Wishlist Button */}
        <button
          className={`wishlist-btn-corner ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(book);
          }}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          {isWishlisted ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="book-info">
        <span className="book-category-tag">{book.category || 'General'}</span>

        <h3 className="book-title">
          <Link to={`/book/${bookId}`}>{book.title}</Link>
        </h3>

        <p className="book-author">By {book.author || 'Unknown Author'}</p>

        <div className="book-rating">
          <span>★</span>
          <span>{book.rating || 4.5}</span>
          <span className="book-rating-count">({book.numReviews || 12})</span>
        </div>

        <div className="book-footer">
          <div className="book-price-box">
            <span className="book-price">${Number(book.price).toFixed(2)}</span>
            {book.originalPrice && book.originalPrice > book.price && (
              <span className="book-original-price">${Number(book.originalPrice).toFixed(2)}</span>
            )}
          </div>

          <button
            className="btn btn-primary btn-sm"
            onClick={(e) => {
              e.preventDefault();
              addToCart(book, 1);
            }}
          >
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
