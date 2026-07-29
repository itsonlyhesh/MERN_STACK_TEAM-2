import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSnacks, setSelectedSnacks] = useState([]);

  // Clear cart if show changes
  const selectShow = (show) => {
    if (selectedShow && selectedShow._id !== show._id) {
      setSelectedSeats([]);
      setSelectedSnacks([]);
    }
    setSelectedShow(show);
  };

  const toggleSeatSelection = (seat) => {
    setSelectedSeats((prevSeats) => {
      const exists = prevSeats.find((s) => s._id === seat._id);
      if (exists) {
        return prevSeats.filter((s) => s._id !== seat._id);
      } else {
        return [...prevSeats, seat];
      }
    });
  };

  const addSnackToCart = (snack) => {
    setSelectedSnacks((prevSnacks) => {
      const exists = prevSnacks.find((item) => item._id === snack._id);
      if (exists) {
        return prevSnacks.map((item) =>
          item._id === snack._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevSnacks, { ...snack, quantity: 1 }];
      }
    });
  };

  const removeSnackFromCart = (snackId) => {
    setSelectedSnacks((prevSnacks) => prevSnacks.filter((item) => item._id !== snackId));
  };

  const updateSnackQuantity = (snackId, quantity) => {
    if (quantity <= 0) {
      removeSnackFromCart(snackId);
      return;
    }
    setSelectedSnacks((prevSnacks) =>
      prevSnacks.map((item) =>
        item._id === snackId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setSelectedShow(null);
    setSelectedSeats([]);
    setSelectedSnacks([]);
  };

  const getCartTotal = () => {
    const seatsTotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    const snacksTotal = selectedSnacks.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return seatsTotal + snacksTotal;
  };

  return (
    <CartContext.Provider
      value={{
        selectedShow,
        selectedSeats,
        selectedSnacks,
        selectShow,
        toggleSeatSelection,
        addSnackToCart,
        removeSnackFromCart,
        updateSnackQuantity,
        clearCart,
        getCartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
