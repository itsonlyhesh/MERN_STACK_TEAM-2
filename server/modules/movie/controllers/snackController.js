const Snack = require('../models/Snack');

// @desc    Get all snacks
// @route   GET /api/snacks
// @access  Public
const getSnacks = async (req, res) => {
  try {
    const snacks = await Snack.find({});
    res.json(snacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a snack item
// @route   POST /api/snacks
// @access  Private/Admin
const createSnack = async (req, res) => {
  try {
    const { name, description, price, imageUrl, isAvailable } = req.body;

    const snack = new Snack({
      name,
      description,
      price,
      imageUrl,
      isAvailable: isAvailable !== undefined ? isAvailable : true
    });

    const createdSnack = await snack.save();
    res.status(201).json(createdSnack);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a snack item
// @route   PUT /api/snacks/:id
// @access  Private/Admin
const updateSnack = async (req, res) => {
  try {
    const { name, description, price, imageUrl, isAvailable } = req.body;
    const snack = await Snack.findById(req.params.id);

    if (snack) {
      snack.name = name || snack.name;
      snack.description = description || snack.description;
      snack.price = price !== undefined ? price : snack.price;
      snack.imageUrl = imageUrl || snack.imageUrl;
      snack.isAvailable = isAvailable !== undefined ? isAvailable : snack.isAvailable;

      const updatedSnack = await snack.save();
      res.json(updatedSnack);
    } else {
      res.status(404).json({ message: 'Snack not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getSnacks,
  createSnack,
  updateSnack
};
