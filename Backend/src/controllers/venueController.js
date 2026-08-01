const Venue = require('../models/Venue');

// GET /venues — all active venues
const getVenues = async (req, res, next) => {
  try {
    const venues = await Venue.find({ isActive: true }).sort({ rating: -1 });
    res.json(venues);
  } catch (error) {
    next(error);
  }
};

// GET /venues/:id — single venue with all slot detail
const getVenueById = async (req, res, next) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue || !venue.isActive) {
      res.status(404);
      throw new Error('Venue not found');
    }
    res.json(venue);
  } catch (error) {
    next(error);
  }
};

module.exports = { getVenues, getVenueById };
