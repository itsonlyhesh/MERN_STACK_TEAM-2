const mongoose = require('mongoose');

const SnackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a snack name'],
    trim: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  imageUrl: {
    type: String
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Snack', SnackSchema);
