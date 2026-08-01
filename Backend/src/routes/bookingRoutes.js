const express = require('express');
const { createBooking, getBookingsByVenue } = require('../controllers/bookingController');

const router = express.Router();

router.post('/', createBooking);
router.get('/venue/:venueId', getBookingsByVenue);

module.exports = router;
