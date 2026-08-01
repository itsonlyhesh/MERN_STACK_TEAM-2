const express = require('express');
const { getVenues, getVenueById } = require('../controllers/venueController');
const { getVenueAvailability } = require('../controllers/bookingController');

const router = express.Router();

router.get('/', getVenues);
router.get('/:venueId/availability', getVenueAvailability);
router.get('/:id', getVenueById);

module.exports = router;
