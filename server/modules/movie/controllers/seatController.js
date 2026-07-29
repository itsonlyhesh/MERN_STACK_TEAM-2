const Seat = require('../models/Seat');

// @desc    Get all seats for a specific show
// @route   GET /api/seats/show/:showId
// @access  Public
const getSeatsByShow = async (req, res) => {
  try {
    const seats = await Seat.find({ showId: req.params.showId }).sort({ seatNumber: 1 });
    res.json(seats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSeatsByShow
};
