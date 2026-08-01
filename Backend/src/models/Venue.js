const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: [true, 'Slot label is required'],
      trim: true
    },
    startTime: {
      type: String,
      required: [true, 'Start time is required']
    },
    endTime: {
      type: String,
      required: [true, 'End time is required']
    },
    duration: {
      type: Number,
      required: [true, 'Duration (minutes) is required'],
      min: [15, 'Duration must be at least 15 minutes']
    },
    pricePerHead: {
      type: Number,
      required: [true, 'Price per head is required'],
      min: [0, 'Price cannot be negative']
    },
    maxCapacity: {
      type: Number,
      required: [true, 'Max capacity is required'],
      min: [1, 'Capacity must be at least 1']
    }
  },
  { _id: true }
);

const venueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Venue name is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    type: {
      type: String,
      required: [true, 'Venue type is required'],
      enum: ['VR', 'AR', 'VR+AR']
    },
    image: {
      type: String,
      required: [true, 'Venue image is required']
    },
    rating: {
      type: Number,
      default: 4.0,
      min: [0, 'Rating cannot be below 0'],
      max: [5, 'Rating cannot exceed 5']
    },
    amenities: {
      type: [String],
      default: []
    },
    timeSlots: {
      type: [timeSlotSchema],
      validate: {
        validator: (slots) => slots.length > 0,
        message: 'A venue must have at least one time slot'
      }
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Venue', venueSchema);
