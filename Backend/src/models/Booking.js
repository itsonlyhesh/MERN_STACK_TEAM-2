const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Venue',
      required: [true, 'Venue reference is required']
    },
    // Snapshot fields — stored so history stays accurate if venue changes later
    venueName:     { type: String, required: true },
    slotId:        { type: mongoose.Schema.Types.ObjectId, required: true },
    slotLabel:     { type: String, required: true },
    slotStartTime: { type: String, required: true },
    slotEndTime:   { type: String, required: true },
    pricePerHead:  { type: Number, required: true },

    // Booking details
    slotDate: {
      type: String,
      required: [true, 'Booking date is required']
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true
    },
    customerEmail: {
      type: String,
      required: [true, 'Customer email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    customerPhone: {
      type: String,
      required: [true, 'Customer phone is required'],
      trim: true
    },
    numberOfPeople: {
      type: Number,
      required: [true, 'Number of people is required'],
      min: [1, 'At least 1 person required']
    },
    totalPrice: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled'],
      default: 'confirmed'
    }
  },
  { timestamps: true }
);

// Used when calculating capacity for a particular venue slot and date.
bookingSchema.index({ venue: 1, slotId: 1, slotDate: 1, status: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
