const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

// @desc    Process mock payment & confirm booking
// @route   POST /api/payments/process
// @access  Private
const processPayment = async (req, res) => {
  try {
    const { bookingId, paymentMethod, transactionId } = req.body;

    // Find booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.bookingStatus === 'Confirmed') {
      return res.status(400).json({ message: 'Booking is already confirmed' });
    }

    // Determine status (mock failures for specific mock transaction IDs)
    const isFailed = transactionId && transactionId.startsWith('fail');
    const paymentStatus = isFailed ? 'Failed' : 'Completed';

    // Create payment entry
    const payment = new Payment({
      bookingId,
      amount: booking.totalAmount,
      paymentMethod,
      transactionId: transactionId || `txn_${Date.now()}`,
      paymentStatus
    });

    const processedPayment = await payment.save();

    // If successful, update booking status
    if (paymentStatus === 'Completed') {
      booking.bookingStatus = 'Confirmed';
      await booking.save();
    } else {
      booking.bookingStatus = 'Cancelled';
      await booking.save();
      // Release locked seats
      const Seat = require('../models/Seat');
      await Seat.updateMany(
        { bookingId },
        { $set: { status: 'Available', bookingId: null } }
      );
    }

    res.status(201).json({
      payment: processedPayment,
      booking
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  processPayment
};
