import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Check, Calendar, MapPin, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import './Pages.css';

const Success = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const bookingId = location.state?.bookingId;

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    if (!bookingId) {
      navigate('/');
      return;
    }

    const fetchBooking = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/bookings/${bookingId}`,
          {
            headers: { Authorization: `Bearer ${user.token}` }
          }
        );
        setBooking(response.data);
      } catch (error) {
        console.error('Error fetching booking details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId, user, navigate]);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="loading-spinner"></div>
        <p>Generating your ticket credentials...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="page-container">
        <div className="no-data-card">
          <h3>Failed to load booking details</h3>
          <p>If you made a payment, check your Bookings History tab.</p>
        </div>
      </div>
    );
  }

  const showDate = new Date(booking.showId?.dateTime || Date.now());

  return (
    <div className="page-container">
      <div className="success-receipt animate-fade-in">
        <div className="check-icon-circle">
          <Check size={36} />
        </div>

        <h2>Booking Confirmed!</h2>
        <p className="success-receipt-desc">Your payment was processed successfully. Scan your QR code at the screen entrance.</p>

        {/* Ticket QR Code */}
        {booking.qrCodeUrl && (
          <div className="qr-container">
            <img src={booking.qrCodeUrl} alt="Ticket Entry QR Code" />
          </div>
        )}

        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
          Ticket ID: {booking._id}
        </p>

        {/* Ticket Details */}
        <div className="receipt-details">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
            {booking.showId?.movieId?.title || 'Movie Details Unavailable'}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
            <Calendar size={14} className="contact-icon" />
            <span>{showDate.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
            <Clock size={14} className="contact-icon" />
            <span>{showDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
            <MapPin size={14} className="contact-icon" />
            <span>{booking.showId?.screenName || 'Unknown Screen'} &bull; Cinema</span>
          </div>

          <div style={{ borderTop: '1px dashed var(--border-color)', marginTop: '10px', paddingTop: '10px' }}>
            <div className="summary-row" style={{ fontSize: '0.9rem', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Seats</span>
              <span style={{ fontWeight: 'bold' }}>{booking.seats?.map((s) => s.seatNumber).join(', ') || 'None'}</span>
            </div>

            {booking.snacks?.length > 0 && (
              <div className="summary-row" style={{ fontSize: '0.9rem', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Concessions</span>
                <span>{booking.snacks.map((s) => `${s.snackId?.name || 'Snack'} x${s.quantity}`).join(', ')}</span>
              </div>
            )}

            <div className="summary-row" style={{ fontSize: '1.05rem', fontWeight: 'bold', borderTop: '1px solid var(--border-color)', marginTop: '10px', paddingTop: '10px', color: 'var(--accent-gold)' }}>
              <span>Total Paid</span>
              <span>₹{booking.totalAmount}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/" className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
            <ArrowLeft size={16} />
            <span>Go Home</span>
          </Link>
          <Link to="/my-bookings" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
            <span>My Bookings</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
