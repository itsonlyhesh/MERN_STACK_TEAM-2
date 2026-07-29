import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Calendar, ShoppingBag, Eye } from 'lucide-react';
import './Pages.css';
import { MOVIE_API_URL, MOVIE_BASE_PATH } from '../config';

const History = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(`${MOVIE_BASE_PATH}/auth`, { state: { from: `${MOVIE_BASE_PATH}/my-bookings` } });
      return;
    }

    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          `${MOVIE_API_URL}/bookings/my-bookings`,
          {
            headers: { Authorization: `Bearer ${user.token}` }
          }
        );
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="loading-spinner"></div>
        <p>Loading booking credentials history...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Your Booking History</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
        Retrieve your ticket barcodes and review details of past concessions purchases.
      </p>

      {bookings.length === 0 ? (
        <div className="no-data-card animate-fade-in" style={{ padding: '80px 40px' }}>
          <ShoppingBag size={48} style={{ color: 'var(--text-muted)', marginBottom: '20px' }} />
          <h3>No Bookings Found</h3>
          <p style={{ margin: '10px 0 30px' }}>You haven't booked any movies with us yet.</p>
          <Link to={`${MOVIE_BASE_PATH}/movies`} className="btn-primary">
            Explore Movies Now
          </Link>
        </div>
      ) : (
        <div className="history-list animate-fade-in">
          {bookings.map((booking) => {
            const showDate = new Date(booking.showId?.dateTime || Date.now());
            const statusClass = `history-status-badge status-${booking.bookingStatus}`;

            return (
              <div key={booking._id} className="history-card">
                <div className="history-details-col">
                  <span className={statusClass}>
                    {booking.bookingStatus}
                  </span>

                  <h3 style={{ fontSize: '1.4rem', marginTop: '8px' }}>
                    {booking.showId?.movieId?.title || 'Movie Details Unavailable'}
                  </h3>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} />
                    <span>
                      {showDate.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })} at{' '}
                      {showDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{' '}
                      &bull; {booking.showId?.screenName || 'Unknown Screen'}
                    </span>
                  </p>

                  <div className="history-ticket-row">
                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
                        Seats Selected
                      </span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>
                        {booking.seats?.map((s) => s.seatNumber).join(', ') || 'None'}
                      </span>
                    </div>

                    {booking.snacks?.length > 0 && (
                      <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '20px' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
                          Snacks Added
                        </span>
                        <span style={{ fontSize: '0.95rem' }}>
                          {booking.snacks.map((s) => `${s.snackId?.name || 'Snack'} x${s.quantity}`).join(', ')}
                        </span>
                      </div>
                    )}

                    <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '20px' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
                        Grand Total
                      </span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--accent-gold)' }}>
                        ₹{booking.totalAmount}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  {booking.qrCodeUrl && booking.bookingStatus === 'Confirmed' && (
                    <div className="history-qr-thumbnail" title="Scan at Counter">
                      <img src={booking.qrCodeUrl} alt="Ticket QR code" />
                    </div>
                  )}

                  <Link
                    to={`${MOVIE_BASE_PATH}/booking-success`}
                    state={{ bookingId: booking._id }}
                    className="btn-secondary"
                    style={{ display: 'flex', alignItems: 'center', padding: '10px 14px', gap: '6px', fontSize: '0.85rem' }}
                  >
                    <Eye size={16} />
                    <span>View Ticket</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History;
