import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { ArrowRight, ShoppingCart, Info } from 'lucide-react';
import './Pages.css';

const Snacks = () => {
  const {
    selectedShow,
    selectedSeats,
    selectedSnacks,
    addSnackToCart,
    updateSnackQuantity,
    getCartTotal
  } = useContext(CartContext);

  const [snacks, setSnacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedShow || selectedSeats.length === 0) {
      navigate('/movies');
      return;
    }

    const fetchSnacks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/snacks');
        setSnacks(response.data);
      } catch (error) {
        console.error('Error fetching concessions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSnacks();
  }, [selectedShow, selectedSeats, navigate]);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="loading-spinner"></div>
        <p>Loading gourmet concessions menu...</p>
      </div>
    );
  }

  const handleNext = () => {
    navigate('/cart');
  };

  return (
    <div className="page-container">
      <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Order Concessions</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
        Add delicious movie snacks to make your viewing complete. Order now to collect at the counter!
      </p>

      <div className="seat-selection-layout">
        <div>
          {snacks.length === 0 ? (
            <div className="no-data-card">
              <h3>No Snacks Available</h3>
              <p>Concessions counter is closed right now. Please proceed to cart.</p>
            </div>
          ) : (
            <div className="snacks-grid animate-fade-in">
              {snacks.map((snack) => {
                const cartItem = selectedSnacks.find((item) => item._id === snack._id);
                const quantityInCart = cartItem ? cartItem.quantity : 0;

                return (
                  <div key={snack._id} className={`snack-card ${!snack.isAvailable ? 'snack-unavailable' : ''}`}>
                    <div className="snack-img-wrapper">
                      <img
                        src={snack.imageUrl || 'https://images.example.com/placeholder-snack.jpg'}
                        alt={snack.name}
                        className="snack-img"
                      />
                    </div>
                    <div className="snack-info">
                      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{snack.name}</span>
                        {!snack.isAvailable && (
                          <span className="snack-unavailable-badge">Sold Out</span>
                        )}
                      </h3>
                      <p className="snack-desc">{snack.description}</p>
                      
                      <div className="snack-action-row">
                        <span className="snack-price">₹{snack.price}</span>
                        
                        {snack.isAvailable && (
                          quantityInCart > 0 ? (
                            <div className="snack-counter">
                              <button onClick={() => updateSnackQuantity(snack._id, quantityInCart - 1)}>-</button>
                              <span>{quantityInCart}</span>
                              <button onClick={() => updateSnackQuantity(snack._id, quantityInCart + 1)}>+</button>
                            </div>
                          ) : (
                            <button onClick={() => addSnackToCart(snack)} className="btn-add-snack">
                              Add to Order
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar Summary */}
        <div className="booking-summary-sidebar">
          <h3>Order Summary</h3>
          <div className="summary-divider"></div>

          <div className="summary-row">
            <span style={{ color: 'var(--text-muted)' }}>Seats ({selectedSeats.length})</span>
            <span>₹{selectedSeats.reduce((sum, s) => sum + s.price, 0)}</span>
          </div>

          {selectedSnacks.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px dashed var(--border-color)', paddingTop: '10px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>Snacks Ordered</span>
              {selectedSnacks.map((item) => (
                <div key={item._id} className="summary-row" style={{ fontSize: '0.85rem' }}>
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          )}

          <div className="summary-divider"></div>

          <div className="summary-row">
            <span style={{ fontWeight: 700 }}>Grand Total</span>
            <span className="summary-total">₹{getCartTotal()}</span>
          </div>

          <button onClick={handleNext} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
            <span>Go to Cart</span>
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Snacks;
