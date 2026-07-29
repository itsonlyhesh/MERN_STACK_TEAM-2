import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { AlertCircle, CreditCard, Shield, Landmark } from 'lucide-react';
import './Pages.css';
import { MOVIE_API_URL, MOVIE_BASE_PATH } from '../config';

const Checkout = () => {
  const { selectedShow, selectedSeats, selectedSnacks, getCartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // 1. Authenticate user access
  useEffect(() => {
    if (!user) {
      navigate(`${MOVIE_BASE_PATH}/auth`, { state: { from: `${MOVIE_BASE_PATH}/checkout` } });
    }
  }, [user, navigate]);

  // 2. Validate cart has contents
  useEffect(() => {
    if (user && (!selectedShow || selectedSeats.length === 0)) {
      navigate(`${MOVIE_BASE_PATH}/cart`);
    }
  }, [user, selectedShow, selectedSeats, navigate]);

  if (!user || !selectedShow || selectedSeats.length === 0) {
    return null;
  }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Step A: Create Booking (Pending)
      const bookingPayload = {
        showId: selectedShow._id,
        seats: selectedSeats.map((s) => s._id),
        snacks: selectedSnacks.map((item) => ({
          snackId: item._id,
          quantity: item.quantity
        }))
      };

      const bookingRes = await axios.post(
        `${MOVIE_API_URL}/bookings`,
        bookingPayload,
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      );

      const booking = bookingRes.data;

      // Step B: Process Mock Payment
      const paymentPayload = {
        bookingId: booking._id,
        paymentMethod,
        transactionId: `txn_${Date.now()}`
      };

      await axios.post(
        `${MOVIE_API_URL}/payments/process`,
        paymentPayload,
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      );

      // Step C: Success -> Clear Cart and redirect
      clearCart();
      navigate(`${MOVIE_BASE_PATH}/booking-success`, { state: { bookingId: booking._id } });

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Transaction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const grandTotal = getCartTotal();

  return (
    <div className="page-container">
      <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>Secure Checkout</h2>

      {error && (
        <div className="error-alert">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className="cart-layout">
        {/* Payment Methods Selection Form */}
        <form onSubmit={handlePaymentSubmit} className="cart-items-section animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="cart-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '20px' }}>
              <Shield style={{ color: 'var(--accent-gold)' }} />
              <span>Select Payment Method</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* UPI */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: paymentMethod === 'UPI' ? 'rgba(255, 170, 0, 0.05)' : 'rgba(255,255,255,0.02)', border: paymentMethod === 'UPI' ? '1px solid var(--accent-gold)' : '1px solid var(--border-color)', borderRadius: '10px', cursor: 'pointer', transition: 'var(--transition)' }}>
                <input
                  type="radio"
                  name="payment"
                  value="UPI"
                  checked={paymentMethod === 'UPI'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ accentColor: 'var(--accent-gold)' }}
                />
                <Landmark size={20} style={{ color: paymentMethod === 'UPI' ? 'var(--accent-gold)' : 'var(--text-muted)' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.95rem', margin: 0 }}>UPI Payment (GPay, PhonePe, Paytm)</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>Instant transfer using your UPI app</p>
                </div>
              </label>

              {/* Card */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: paymentMethod === 'Card' ? 'rgba(255, 170, 0, 0.05)' : 'rgba(255,255,255,0.02)', border: paymentMethod === 'Card' ? '1px solid var(--accent-gold)' : '1px solid var(--border-color)', borderRadius: '10px', cursor: 'pointer', transition: 'var(--transition)' }}>
                <input
                  type="radio"
                  name="payment"
                  value="Card"
                  checked={paymentMethod === 'Card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ accentColor: 'var(--accent-gold)' }}
                />
                <CreditCard size={20} style={{ color: paymentMethod === 'Card' ? 'var(--accent-gold)' : 'var(--text-muted)' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.95rem', margin: 0 }}>Credit / Debit Card</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>Supports Visa, Mastercard, RuPay, Amex</p>
                </div>
              </label>
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ padding: '16px', justifyContent: 'center', fontSize: '1rem' }} disabled={loading}>
            {loading ? 'Processing transaction...' : `Pay ₹${grandTotal} Now`}
          </button>
        </form>

        {/* Checkout Detail Summary */}
        <div className="booking-summary-sidebar">
          <h3>Order Review</h3>
          <div className="summary-divider"></div>

          <div className="summary-row">
            <span style={{ color: 'var(--text-muted)' }}>Movie</span>
            <span style={{ fontWeight: 600 }}>{selectedShow.movieId.title}</span>
          </div>

          <div className="summary-row">
            <span style={{ color: 'var(--text-muted)' }}>Screen</span>
            <span>{selectedShow.screenName}</span>
          </div>

          <div className="summary-row">
            <span style={{ color: 'var(--text-muted)' }}>Seats ({selectedSeats.length})</span>
            <span>{selectedSeats.map((s) => s.seatNumber).join(', ')}</span>
          </div>

          {selectedSnacks.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px dashed var(--border-color)', paddingTop: '10px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>Snacks Addons</span>
              {selectedSnacks.map((item) => (
                <div key={item._id} className="summary-row" style={{ fontSize: '0.8rem' }}>
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          )}

          <div className="summary-divider"></div>

          <div className="summary-row">
            <span style={{ fontWeight: 700 }}>Checkout Value</span>
            <span className="summary-total">₹{grandTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
