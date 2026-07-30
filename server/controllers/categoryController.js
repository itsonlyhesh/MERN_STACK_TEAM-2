import Category from '../models/Category.js';
import { sampleCategories } from '../utils/seedData.js';

export const getCategories = async (req, res, next) => {
  try {
    let categories = await Category.find();
    if (!categories || categories.length === 0) {
      categories = sampleCategories;
    }
    res.json(categories);
  } catch (error) {
    res.json(sampleCategories);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name, slug, description, icon, image } = req.body;
    const category = new Category({
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      description,
      icon: icon || '📚',
      image: image || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop'
    });
    const created = await category.save();
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};
