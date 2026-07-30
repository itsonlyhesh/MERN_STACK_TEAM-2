import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, default: 0 },
    discountPercent: { type: Number, default: 0 },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true, default: 15, min: 0 },
    coverImage: { type: String, default: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop' },
    publisher: { type: String, default: 'Book Haven Publishing' },
    isbn: { type: String, default: '978-0-123456-78-9' },
    language: { type: String, default: 'English' },
    rating: { type: Number, default: 4.5 },
    numReviews: { type: Number, default: 0 },
    reviews: [reviewSchema],
    isFeatured: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    isTodayOffer: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;
