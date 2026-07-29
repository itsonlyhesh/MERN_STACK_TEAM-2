const mongoose = require('mongoose');

const ShowSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  screenName: {
    type: String,
    required: [true, 'Please add a screen name']
  },
  dateTime: {
    type: Date,
    required: [true, 'Please add a show date and time']
  },
  basePrice: {
    type: Number,
    required: [true, 'Please add a base price']
  },
  language: {
    type: String,
    required: [true, 'Please add a screening language'],
    default: 'English'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Show', ShowSchema);
