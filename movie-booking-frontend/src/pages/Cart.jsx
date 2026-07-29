import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Trash2, Film, ShoppingBag, ArrowRight } from 'lucide-react';
import './Pages.css';

const Cart = () => {
  const {
    selectedShow,
    selectedSeats,
    selectedSnacks,
    toggleSeatSelection,
    updateSnackQuantity,
    getCartTotal
  } = useContext(CartContext);

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const seatsTotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  const snacksTotal = selectedSnacks.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (!selectedShow || selectedSeats.length === 0) {
    return (
      <div className="page-container">
        <div className="no-data-card animate-fade-in" style={{ padding: '80px 40px' }}>
          <ShoppingBag size={48} style={{ color: 'var(--text-muted)', marginBottom: '20px' }} />
          <h2>Your Cart is Empty</h2>
          <p style={{ margin: '10px 0 30px' }}>You haven't selected any seats yet.</p>
          <Link to="/movies" className="btn-primary">
            Browse Movies
          </Link>
        </div>
      </div>
    );
  }

  const showDate = new Date(selectedShow.dateTime);

  return (
    <div className="page-container">
      <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>Your Shopping Cart</h2>

      <div className="cart-layout">
        <div className="cart-items-section animate-fade-in">
          {/* Movie Ticket Segment */}
          <div className="cart-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '10px' }}>
              <Film style={{ color: 'var(--accent-gold)' }} />
              <span>Movie Tickets</span>
            </h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
              <div>
                <h4>{selectedShow.movieId.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
                  {selectedShow.screenName} &bull;{' '}
                  {showDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({showDate.toLocaleDateString([], { month: 'short', day: 'numeric' })})
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="cart-item-price">₹{seatsTotal}</span>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {selectedSeats.length} Seat(s) Selected
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
              {selectedSeats.map((seat) => (
                <div key={seat._id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{seat.seatNumber}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--accent-teal)' }}>₹{seat.price}</span>
                  <button onClick={() => toggleSeatSelection(seat)} className="btn-remove-item" title="Remove Seat">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Concessions Concourse Segment */}
          {selectedSnacks.length > 0 && (
            <div className="cart-card">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '10px' }}>
                <ShoppingBag style={{ color: 'var(--accent-gold)' }} />
                <span>Food & Beverages</span>
              </h3>

              {selectedSnacks.map((item) => (
                <div key={item._id} className="cart-item-row">
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p>₹{item.price} each</p>
                  </div>
                  
                  <div className="cart-item-actions">
                    <div className="snack-counter">
                      <button onClick={() => updateSnackQuantity(item._id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateSnackQuantity(item._id, item.quantity + 1)}>+</button>
                    </div>
                    <span className="cart-item-price">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout Sidebar Summary */}
        <div className="booking-summary-sidebar">
          <h3>Order Total</h3>
          <div className="summary-divider"></div>

          <div className="summary-row">
            <span style={{ color: 'var(--text-muted)' }}>Ticket Subtotal</span>
            <span>₹{seatsTotal}</span>
          </div>

          <div className="summary-row">
            <span style={{ color: 'var(--text-muted)' }}>Snacks Subtotal</span>
            <span>₹{snacksTotal}</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row">
            <span style={{ fontWeight: 700 }}>Total Checkout Value</span>
            <span className="summary-total">₹{getCartTotal()}</span>
          </div>

          <button onClick={handleCheckout} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
            <span>Checkout</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
