import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from '../models/Book.js';
import Category from '../models/Category.js';
import User from '../models/User.js';
import { sampleBooks, sampleCategories } from './seedData.js';

dotenv.config();

export const seedDatabase = async () => {
  try {
    const bookCount = await Book.countDocuments();
    if (bookCount === 0) {
      console.log('Seeding initial books and categories into MongoDB...');
      
      await Category.deleteMany({});
      await Book.deleteMany({});
      
      await Category.insertMany(sampleCategories);
      await Book.insertMany(sampleBooks);

      // Create Default Admin User
      const adminExists = await User.findOne({ email: 'admin@bookhaven.com' });
      if (!adminExists) {
        await User.create({
          name: 'Admin User',
          email: 'admin@bookhaven.com',
          password: 'adminpassword123',
          role: 'admin'
        });
        console.log('Admin account created: admin@bookhaven.com / adminpassword123');
      }

      console.log('Database seeding completed successfully!');
    }
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
  }
};

// Standalone execution script
if (process.argv[2] === '--run') {
  mongoose
    .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bookshop')
    .then(async () => {
      await seedDatabase();
      process.exit();
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
