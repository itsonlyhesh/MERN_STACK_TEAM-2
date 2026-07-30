import Wishlist from '../models/Wishlist.js';

export const getWishlist = async (req, res, next) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate('books');
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, books: [] });
    }
    res.json(wishlist);
  } catch (error) {
    next(error);
  }
};

export const toggleWishlist = async (req, res, next) => {
  try {
    const { bookId } = req.body;
    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, books: [] });
    }

    const exists = wishlist.books.some(id => id.toString() === bookId);

    if (exists) {
      wishlist.books = wishlist.books.filter(id => id.toString() !== bookId);
    } else {
      wishlist.books.push(bookId);
    }

    await wishlist.save();
    const populated = await Wishlist.findById(wishlist._id).populate('books');
    res.json(populated);
  } catch (error) {
    next(error);
  }
};
