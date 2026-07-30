import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../services/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    const localCart = localStorage.getItem('cartItems');
    return localCart ? JSON.parse(localCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (user) {
      // Sync with DB cart if available
      api.get('/cart')
        .then((res) => {
          if (res.data && res.data.items && res.data.items.length > 0) {
            const formatted = res.data.items.map(item => ({
              book: item.book,
              quantity: item.quantity,
              price: item.price
            }));
            setCartItems(formatted);
          }
        })
        .catch(() => {});
    }
  }, [user]);

  const addToCart = (book, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.book._id === book._id || item.book.title === book.title);
      if (existing) {
        return prev.map(item =>
          (item.book._id === book._id || item.book.title === book.title)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { book, quantity, price: book.price }];
    });

    if (user) {
      api.post('/cart/add', { bookId: book._id, quantity, price: book.price }).catch(() => {});
    }
  };

  const updateQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        (item.book._id === bookId || item.book.title === bookId)
          ? { ...item, quantity }
          : item
      )
    );
    if (user) {
      api.put('/cart/update', { bookId, quantity }).catch(() => {});
    }
  };

  const removeFromCart = (bookId) => {
    setCartItems(prev => prev.filter(item => item.book._id !== bookId && item.book.title !== bookId));
    if (user) {
      api.delete(`/cart/remove/${bookId}`).catch(() => {});
    }
  };

  const clearCart = () => {
    setCartItems([]);
    if (user) {
      api.delete('/cart/clear').catch(() => {});
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal > 50 || subtotal === 0 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + shippingFee + tax;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
        shippingFee,
        tax,
        grandTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
