const express = require('express');
const {
  getItems,
  createItem,
  updateItem,
  deleteItem
} = require('../controllers/itemController');

const router = express.Router();

router.route('/').get(getItems).post(createItem);
router.route('/:id').put(updateItem).delete(deleteItem);

module.exports = router;
