const Booking = require('../models/Booking');
const Show = require('../models/Show');
const Seat = require('../models/Seat');
const Snack = require('../models/Snack');

// @desc    Create a booking (starts as Pending, locks seats)
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  try {
    const { showId, seats, snacks } = req.body;

    // 1. Verify show exists
    const show = await Show.findById(showId);
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }

    // 2. Fetch and check seats
    const seatDocs = await Seat.find({ _id: { $in: seats }, showId });
    if (seatDocs.length !== seats.length) {
      return res.status(400).json({ message: 'One or more invalid seats selected' });
    }

    // Check if any selected seat is already Booked or Reserved
    const unavailableSeats = seatDocs.filter(seat => seat.status !== 'Available');
    if (unavailableSeats.length > 0) {
      return res.status(400).json({
        message: `Seats already taken: ${unavailableSeats.map(s => s.seatNumber).join(', ')}`
      });
    }

    // 3. Calculate Seats Cost
    let totalAmount = seatDocs.reduce((sum, seat) => sum + seat.price, 0);

    // 4. Calculate Concessions/Snacks Cost
    const snacksPayload = [];
    if (snacks && snacks.length > 0) {
      for (const item of snacks) {
        const snackDoc = await Snack.findById(item.snackId);
        if (!snackDoc || !snackDoc.isAvailable) {
          return res.status(400).json({ message: `Snack is unavailable or not found` });
        }
        totalAmount += snackDoc.price * item.quantity;
        snacksPayload.push({
          snackId: item.snackId,
          quantity: item.quantity
        });
      }
    }

    // 5. Create Booking (Pending status)
    const booking = new Booking({
      userId: req.user._id,
      showId,
      seats,
      snacks: snacksPayload,
      totalAmount,
      bookingStatus: 'Pending'
    });

    // Generate QR code URL
    booking.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BOOKING_${booking._id}`;
    
    const createdBooking = await booking.save();

    // 6. Lock/Reserve seats under this booking
    await Seat.updateMany(
      { _id: { $in: seats } },
      { $set: { status: 'Booked', bookingId: createdBooking._id } }
    );

    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate({
        path: 'showId',
        populate: { path: 'movieId' }
      })
      .populate('seats')
      .populate('snacks.snackId')
      .sort({ bookingDate: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate({
        path: 'showId',
        populate: { path: 'movieId' }
      })
      .populate('seats')
      .populate('snacks.snackId');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Verify authorized user
    if (booking.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this booking' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getBookingById
};
