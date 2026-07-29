const Show = require('../models/Show');
const Seat = require('../models/Seat');

// @desc    Create a new show & auto-generate seats
// @route   POST /api/shows
// @access  Private/Admin
const createShow = async (req, res) => {
  try {
    const { movieId, screenName, dateTime, basePrice, language } = req.body;

    const show = new Show({
      movieId,
      screenName,
      dateTime,
      basePrice,
      language: language || 'English'
    });

    const createdShow = await show.save();

    // Auto-generate 40 seats: Rows A, B, C (Standard), Row D (Premium)
    const seats = [];
    const rows = ['A', 'B', 'C', 'D'];

    for (const row of rows) {
      for (let num = 1; num <= 10; num++) {
        const seatNumber = `${row}${num}`;
        const isPremium = row === 'D';
        seats.push({
          showId: createdShow._id,
          seatNumber,
          category: isPremium ? 'Premium' : 'Standard',
          price: isPremium ? basePrice + 100 : basePrice,
          status: 'Available'
        });
      }
    }

    await Seat.insertMany(seats);

    res.status(201).json(createdShow);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all shows (optionally filter by movie)
// @route   GET /api/shows
// @access  Public
const getShows = async (req, res) => {
  try {
    const { movieId } = req.query;
    let query = {};

    if (movieId) {
      query.movieId = movieId;
    }

    const shows = await Show.find(query).populate('movieId');
    res.json(shows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a show
// @route   PUT /api/shows/:id
// @access  Private/Admin
const updateShow = async (req, res) => {
  try {
    const { movieId, screenName, dateTime, basePrice, language } = req.body;
    const show = await Show.findById(req.params.id);

    if (show) {
      show.movieId = movieId || show.movieId;
      show.screenName = screenName || show.screenName;
      show.dateTime = dateTime || show.dateTime;
      show.language = language || show.language;

      if (basePrice && basePrice !== show.basePrice) {
        show.basePrice = basePrice;
        // Update available seat prices
        const seats = await Seat.find({ showId: show._id });
        for (const seat of seats) {
          if (seat.status === 'Available') {
            const isPremium = seat.category === 'Premium';
            seat.price = isPremium ? basePrice + 100 : basePrice;
            await seat.save();
          }
        }
      }

      const updatedShow = await show.save();
      res.json(updatedShow);
    } else {
      res.status(404).json({ message: 'Show not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a show
// @route   DELETE /api/shows/:id
// @access  Private/Admin
const deleteShow = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id);

    if (show) {
      await Show.deleteOne({ _id: req.params.id });
      await Seat.deleteMany({ showId: req.params.id });
      res.json({ message: 'Show and associated seats removed' });
    } else {
      res.status(404).json({ message: 'Show not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createShow,
  getShows,
  updateShow,
  deleteShow
};
