const express = require('express');
const {
  createBooking,
  getMyBookings,
  getBookingById
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, createBooking);

router.route('/my-bookings')
  .get(protect, getMyBookings);

router.route('/:id')
  .get(protect, getBookingById);

module.exports = router;
