import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../services/api';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState(() => {
    const stored = localStorage.getItem('wishlistItems');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    if (user) {
      api.get('/wishlist')
        .then((res) => {
          if (res.data && res.data.books) {
            setWishlistItems(res.data.books);
          }
        })
        .catch(() => {});
    }
  }, [user]);

  const toggleWishlist = (book) => {
    setWishlistItems(prev => {
      const exists = prev.some(item => item._id === book._id || item.title === book.title);
      if (exists) {
        return prev.filter(item => item._id !== book._id && item.title !== book.title);
      } else {
        return [...prev, book];
      }
    });

    if (user && book._id) {
      api.post('/wishlist/toggle', { bookId: book._id }).catch(() => {});
    }
  };

  const isInWishlist = (bookId) => {
    return wishlistItems.some(item => item._id === bookId || item.title === bookId || item.isbn === bookId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlistItems.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
