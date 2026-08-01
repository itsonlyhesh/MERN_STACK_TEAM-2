require('dotenv').config();

const connectDB      = require('../src/config/db');
const Item           = require('../src/models/Item');
const Venue          = require('../src/models/Venue');
const Booking        = require('../src/models/Booking');
const defaultItems   = require('../src/data/defaultItems');
const defaultVenues  = require('../src/data/defaultVenues');

const seedDatabase = async () => {
  try {
    await connectDB();

    // ── Seed Items ──────────────────────────────────────────────────────────
    const itemCount = await Item.countDocuments();
    if (itemCount > 0) {
      console.log(`Seed skipped: ${itemCount} items already exist`);
    } else {
      await Item.insertMany(defaultItems);
      console.log(`✓ Seeded ${defaultItems.length} items`);
    }

    // ── Seed Venues ─────────────────────────────────────────────────────────
    await Booking.deleteMany({});
    await Venue.deleteMany({});
    await Venue.insertMany(defaultVenues);
    console.log(`✓ Reset and seeded ${defaultVenues.length} VR/AR venues`);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error(`Seed failed: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
