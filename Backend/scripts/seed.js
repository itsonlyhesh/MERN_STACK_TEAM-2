require('dotenv').config();

const connectDB = require('../src/config/db');
const Item = require('../src/models/Item');
const defaultItems = require('../src/data/defaultItems');


const seedDatabase = async () => {
  try {
    await connectDB();

    const existingCount = await Item.countDocuments();
    if (existingCount > 0) {
      console.log('Seed skipped: items already exist');
      process.exit(0);
    }

    await Item.insertMany(defaultItems);
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error(`Seed failed: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
