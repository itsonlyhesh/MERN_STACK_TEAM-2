import { useWishlist } from '../context/WishlistContext';
import BookCard from '../components/BookCard';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlistItems, wishlistCount } = useWishlist();

  return (
    <div className="wishlist-page">
      <div className="section-header">
        <h1 className="section-title">My Saved Wishlist</h1>
        <p className="section-subtitle">You have {wishlistCount} book{wishlistCount === 1 ? '' : 's'} bookmarked for later</p>
      </div>

      {wishlistCount === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#FFF', borderRadius: '16px' }}>
          <span style={{ fontSize: '3.5rem' }}>🤍</span>
          <h3 style={{ marginTop: '1rem' }}>Your wishlist is currently empty</h3>
          <p style={{ color: '#64748B', marginTop: '0.5rem' }}>Explore our catalog and click the heart icon on any book to save it here.</p>
          <Link to="/categories" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            Discover Books 📚
          </Link>
        </div>
      ) : (
        <div className="books-grid">
          {wishlistItems.map((book) => (
            <BookCard key={book._id || book.title} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
