import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: '' },
    icon: { type: String, default: '📚' },
    image: { type: String, default: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&auto=format&fit=crop' },
    bookCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
