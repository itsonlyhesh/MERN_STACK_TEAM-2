const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  genre: {
    type: [String],
    required: [true, 'Please add at least one genre']
  },
  language: {
    type: String,
    required: [true, 'Please add a language']
  },
  duration: {
    type: Number,
    required: [true, 'Please add movie duration in minutes']
  },
  posterUrl: {
    type: String,
    required: [true, 'Please add a poster URL']
  },
  trailerUrl: {
    type: String
  },
  releaseDate: {
    type: Date,
    required: [true, 'Please add a release date']
  },
  rating: {
    type: String,
    required: [true, 'Please add a rating (e.g. UA, A, U)']
  },
  cast: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', MovieSchema);
