import Cart from '../models/Cart.js';

export const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.book');
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [], totalAmount: 0 });
    }
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { bookId, quantity = 1, price } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [], totalAmount: 0 });
    }

    const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += Number(quantity);
    } else {
      cart.items.push({ book: bookId, quantity: Number(quantity), price: Number(price) });
    }

    cart.totalAmount = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    await cart.save();
    
    const populated = await Cart.findById(cart._id).populate('items.book');
    res.json(populated);
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const { bookId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find(i => i.book.toString() === bookId);
    if (item) {
      item.quantity = Math.max(1, Number(quantity));
    }

    cart.totalAmount = cart.items.reduce((acc, i) => acc + i.price * i.quantity, 0);
    await cart.save();

    const populated = await Cart.findById(cart._id).populate('items.book');
    res.json(populated);
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.items = cart.items.filter(i => i.book.toString() !== bookId);
      cart.totalAmount = cart.items.reduce((acc, i) => acc + i.price * i.quantity, 0);
      await cart.save();
      const populated = await Cart.findById(cart._id).populate('items.book');
      return res.json(populated);
    }
    res.status(404).json({ message: 'Cart not found' });
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = [];
      cart.totalAmount = 0;
      await cart.save();
    }
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    next(error);
  }
};
