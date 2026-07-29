const mongoose = require('mongoose');

const SeatSchema = new mongoose.Schema({
  showId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Show',
    required: true
  },
  seatNumber: {
    type: String,
    required: [true, 'Please add a seat number']
  },
  category: {
    type: String,
    enum: ['Standard', 'Premium'],
    default: 'Standard'
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  status: {
    type: String,
    enum: ['Available', 'Booked', 'Reserved'],
    default: 'Available'
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Seat', SeatSchema);
