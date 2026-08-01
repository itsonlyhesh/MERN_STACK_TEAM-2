const Venue   = require('../models/Venue');
const Booking = require('../models/Booking');

const isValidBookingDate = (value) => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

const getBookedPeople = async (venueId, slotId, slotDate) => {
  const [result] = await Booking.aggregate([
    {
      $match: {
        venue: venueId,
        slotId,
        slotDate,
        status: 'confirmed'
      }
    },
    { $group: { _id: null, total: { $sum: '$numberOfPeople' } } }
  ]);

  return result?.total || 0;
};

// POST /bookings — create a new booking
const createBooking = async (req, res, next) => {
  try {
    const {
      venueId,
      slotId,
      slotDate,
      customerName,
      customerEmail,
      customerPhone,
      numberOfPeople
    } = req.body;

    if (!isValidBookingDate(slotDate)) {
      res.status(400);
      throw new Error('Please provide a valid booking date');
    }

    const today = new Date().toISOString().slice(0, 10);
    if (slotDate < today) {
      res.status(400);
      throw new Error('Bookings cannot be made for a past date');
    }

    const people = Number(numberOfPeople);
    if (!Number.isInteger(people) || people < 1) {
      res.status(400);
      throw new Error('Number of people must be a whole number of at least 1');
    }

    if (![customerName, customerEmail, customerPhone].every(
      (value) => typeof value === 'string' && value.trim()
    )) {
      res.status(400);
      throw new Error('Name, email, and phone are required');
    }

    // Validate venue exists
    const venue = await Venue.findById(venueId);
    if (!venue || !venue.isActive) {
      res.status(404);
      throw new Error('Venue not found');
    }

    // Validate the requested slot belongs to this venue
    const slot = venue.timeSlots.id(slotId);
    if (!slot) {
      res.status(400);
      throw new Error('Invalid time slot for this venue');
    }

    // Validate capacity
    if (people > slot.maxCapacity) {
      res.status(400);
      throw new Error(
        `This slot allows a maximum of ${slot.maxCapacity} people`
      );
    }

    const bookedPeople = await getBookedPeople(venue._id, slot._id, slotDate);
    const availableCapacity = Math.max(0, slot.maxCapacity - bookedPeople);
    if (people > availableCapacity) {
      res.status(409);
      throw new Error(`Only ${availableCapacity} place${availableCapacity === 1 ? '' : 's'} remain for this slot`);
    }

    const totalPrice = slot.pricePerHead * people;

    const booking = await Booking.create({
      venue:         venue._id,
      venueName:     venue.name,
      slotId:        slot._id,
      slotLabel:     slot.label,
      slotStartTime: slot.startTime,
      slotEndTime:   slot.endTime,
      pricePerHead:  slot.pricePerHead,
      slotDate,
      customerName,
      customerEmail,
      customerPhone,
      numberOfPeople: people,
      totalPrice
    });

    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

// GET /venues/:venueId/availability?date=YYYY-MM-DD
const getVenueAvailability = async (req, res, next) => {
  try {
    const { date } = req.query;
    if (!isValidBookingDate(date)) {
      res.status(400);
      throw new Error('Please provide a valid date as YYYY-MM-DD');
    }

    const venue = await Venue.findById(req.params.venueId);
    if (!venue || !venue.isActive) {
      res.status(404);
      throw new Error('Venue not found');
    }

    const bookings = await Booking.aggregate([
      {
        $match: {
          venue: venue._id,
          slotDate: date,
          status: 'confirmed'
        }
      },
      { $group: { _id: '$slotId', bookedPeople: { $sum: '$numberOfPeople' } } }
    ]);
    const bookedBySlot = new Map(bookings.map((booking) => [String(booking._id), booking.bookedPeople]));

    res.json({
      venueId: venue._id,
      date,
      slots: venue.timeSlots.map((slot) => {
        const bookedPeople = bookedBySlot.get(String(slot._id)) || 0;
        return {
          ...slot.toObject(),
          bookedPeople,
          availableCapacity: Math.max(0, slot.maxCapacity - bookedPeople)
        };
      })
    });
  } catch (error) {
    next(error);
  }
};

// GET /bookings/venue/:venueId — fetch all bookings for a venue
const getBookingsByVenue = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ venue: req.params.venueId }).sort({
      createdAt: -1
    });
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

module.exports = { createBooking, getBookingsByVenue, getVenueAvailability };
