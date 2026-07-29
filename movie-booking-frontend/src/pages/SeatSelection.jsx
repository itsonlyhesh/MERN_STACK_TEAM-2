import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { Armchair, ArrowRight, Video } from 'lucide-react';
import './Pages.css';

const SeatSelection = () => {
  const { selectedShow, selectedSeats, toggleSeatSelection } = useContext(CartContext);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedShow) {
      navigate('/movies');
      return;
    }

    const fetchSeats = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/seats/show/${selectedShow._id}`);
        setSeats(response.data);
      } catch (error) {
        console.error('Error fetching seat layout:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSeats();
  }, [selectedShow, navigate]);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="loading-spinner"></div>
        <p>Loading interactive seating map...</p>
      </div>
    );
  }

  // Helper to group seats into rows A, B, C, D
  const rows = ['A', 'B', 'C', 'D'];

  const handleNext = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat to continue');
      return;
    }
    navigate('/snacks');
  };

  const showDate = new Date(selectedShow?.dateTime);

  return (
    <div className="page-container">
      <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Select Seats</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
        {selectedShow?.movieId?.title} &bull; {selectedShow?.screenName} &bull;{' '}
        {showDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{' '}
        ({showDate.toLocaleDateString([], { month: 'short', day: 'numeric' })})
      </p>

      <div className="seat-selection-layout">
        <div className="glass-panel" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          {/* Cinema Screen Curve */}
          <div className="screen-container">
            <div className="screen-curve"></div>
            <div className="screen-label">Screen This Way</div>
          </div>

          {/* Seating Layout Grid */}
          <div className="seating-grid animate-fade-in">
            {rows.map((row) => (
              <div key={row} className="seating-row">
                <span style={{ width: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {row}
                </span>
                
                {seats
                  .filter((seat) => seat.seatNumber.startsWith(row))
                  .map((seat) => {
                    const isSelected = selectedSeats.some((s) => s._id === seat._id);
                    const isBooked = seat.status === 'Booked' || seat.status === 'Reserved';
                    
                    let seatClass = 'seat';
                    if (isBooked) {
                      seatClass += ' seat-booked';
                    } else if (isSelected) {
                      seatClass += ' seat-selected';
                    } else {
                      seatClass += ` seat-available-${seat.category}`;
                    }

                    return (
                      <button
                        key={seat._id}
                        onClick={() => !isBooked && toggleSeatSelection(seat)}
                        className={seatClass}
                        disabled={isBooked}
                        title={`Seat ${seat.seatNumber} (${seat.category}): ₹${seat.price}`}
                      >
                        {seat.seatNumber.substring(1)}
                      </button>
                    );
                  })}
              </div>
            ))}
          </div>

          {/* Seat Legend Indicators */}
          <div className="seat-legend">
            <div className="legend-item">
              <div className="legend-box seat-available-Standard"></div>
              <span>Standard (₹{selectedShow?.basePrice})</span>
            </div>
            <div className="legend-item">
              <div className="legend-box seat-available-Premium"></div>
              <span>Premium (₹{selectedShow?.basePrice + 100})</span>
            </div>
            <div className="legend-item">
              <div className="legend-box seat-selected"></div>
              <span>Selected</span>
            </div>
            <div className="legend-item">
              <div className="legend-box seat-booked"></div>
              <span>Booked</span>
            </div>
          </div>
        </div>

        {/* Dynamic Booking Summary Sidebar */}
        <div className="booking-summary-sidebar">
          <h3>Booking Summary</h3>
          <div className="summary-divider"></div>
          
          <div className="summary-row">
            <span style={{ color: 'var(--text-muted)' }}>Movie</span>
            <span style={{ fontWeight: 600 }}>{selectedShow?.movieId?.title}</span>
          </div>

          <div className="summary-row">
            <span style={{ color: 'var(--text-muted)' }}>Screen</span>
            <span>{selectedShow?.screenName}</span>
          </div>

          <div className="summary-row">
            <span style={{ color: 'var(--text-muted)' }}>Seats</span>
            <span style={{ fontWeight: 700, color: 'var(--accent-teal)' }}>
              {selectedSeats.length > 0
                ? selectedSeats.map((s) => s.seatNumber).join(', ')
                : 'None Selected'}
            </span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row">
            <span style={{ fontWeight: 700 }}>Total Price</span>
            <span className="summary-total">
              ₹{selectedSeats.reduce((sum, s) => sum + s.price, 0)}
            </span>
          </div>

          <button onClick={handleNext} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
            <span>Add Snacks</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
