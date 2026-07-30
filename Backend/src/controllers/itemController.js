const Item = require('../models/Item');

const getItems = async (req, res, next) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

const createItem = async (req, res, next) => {
  try {
    const { name, category, price, image, stock } = req.body;

    const item = await Item.create({
      name,
      category,
      price,
      image,
      stock
    });

    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      res.status(404);
      throw new Error('Item not found');
    }

    item.name = req.body.name ?? item.name;
    item.category = req.body.category ?? item.category;
    item.price = req.body.price ?? item.price;
    item.image = req.body.image ?? item.image;
    item.stock = req.body.stock ?? item.stock;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      res.status(404);
      throw new Error('Item not found');
    }

    await item.deleteOne();
    res.json({ message: 'Item removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getItems,
  createItem,
  updateItem,
  deleteItem
};
