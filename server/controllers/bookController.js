import Book from '../models/Book.js';
import { sampleBooks } from '../utils/seedData.js';

// @desc    Fetch all books with search, filter, and pagination
// @route   GET /api/books
// @access  Public
export const getBooks = async (req, res, next) => {
  try {
    const { category, search, featured, offer, bestseller, limit } = req.query;

    let query = {};

    if (category) {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (offer === 'true') {
      query.isTodayOffer = true;
    }

    if (bestseller === 'true') {
      query.isBestSeller = true;
    }

    let books = await Book.find(query).sort({ createdAt: -1 });

    // Fallback if DB is empty or offline
    if ((!books || books.length === 0) && !search && !category) {
      let filtered = [...sampleBooks];
      if (category) filtered = filtered.filter(b => b.category.toLowerCase() === category.toLowerCase());
      if (featured === 'true') filtered = filtered.filter(b => b.isFeatured);
      if (offer === 'true') filtered = filtered.filter(b => b.isTodayOffer);
      if (bestseller === 'true') filtered = filtered.filter(b => b.isBestSeller);
      books = filtered;
    }

    if (limit) {
      books = books.slice(0, parseInt(limit, 10));
    }

    res.json(books);
  } catch (error) {
    // Fallback to sample seed data if DB connection error
    let filtered = [...sampleBooks];
    const { category, search, featured, offer, bestseller } = req.query;
    if (category) filtered = filtered.filter(b => b.category.toLowerCase() === category.toLowerCase());
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
    }
    if (featured === 'true') filtered = filtered.filter(b => b.isFeatured);
    if (offer === 'true') filtered = filtered.filter(b => b.isTodayOffer);
    if (bestseller === 'true') filtered = filtered.filter(b => b.isBestSeller);
    res.json(filtered);
  }
};

// @desc    Fetch single book by ID
// @route   GET /api/books/:id
// @access  Public
export const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      return res.json(book);
    }
    
    // Check fallback sample data
    const sample = sampleBooks.find(b => b.isbn === req.params.id || b.title.toLowerCase().replace(/\s+/g, '-') === req.params.id);
    if (sample) return res.json(sample);

    res.status(404).json({ message: 'Book not found' });
  } catch (error) {
    const sample = sampleBooks.find(b => b.isbn === req.params.id || b._id === req.params.id);
    if (sample) return res.json(sample);
    res.status(404).json({ message: 'Book not found' });
  }
};

// @desc    Create a new book
// @route   POST /api/books
// @access  Private/Admin
export const createBook = async (req, res, next) => {
  try {
    const {
      title,
      author,
      price,
      originalPrice,
      discountPercent,
      category,
      description,
      stock,
      coverImage,
      publisher,
      isbn,
      language,
      isFeatured,
      isBestSeller,
      isTodayOffer
    } = req.body;

    const book = new Book({
      title,
      author,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : Number(price) * 1.2,
      discountPercent: discountPercent ? Number(discountPercent) : 0,
      category,
      description,
      stock: Number(stock) || 10,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop',
      publisher: publisher || 'Book Haven Publishing',
      isbn: isbn || `978-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      language: language || 'English',
      isFeatured: Boolean(isFeatured),
      isBestSeller: Boolean(isBestSeller),
      isTodayOffer: Boolean(isTodayOffer)
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
export const updateBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      book.title = req.body.title || book.title;
      book.author = req.body.author || book.author;
      book.price = req.body.price !== undefined ? Number(req.body.price) : book.price;
      book.category = req.body.category || book.category;
      book.description = req.body.description || book.description;
      book.stock = req.body.stock !== undefined ? Number(req.body.stock) : book.stock;
      book.coverImage = req.body.coverImage || book.coverImage;
      book.isFeatured = req.body.isFeatured !== undefined ? req.body.isFeatured : book.isFeatured;
      book.isBestSeller = req.body.isBestSeller !== undefined ? req.body.isBestSeller : book.isBestSeller;
      book.isTodayOffer = req.body.isTodayOffer !== undefined ? req.body.isTodayOffer : book.isTodayOffer;

      const updatedBook = await book.save();
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      await book.deleteOne();
      res.json({ message: 'Book removed successfully' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    next(error);
  }
};
