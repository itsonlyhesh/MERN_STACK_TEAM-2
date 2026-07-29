const express = require('express');
const {
  createShow,
  getShows,
  updateShow,
  deleteShow
} = require('../controllers/showController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getShows)
  .post(protect, admin, createShow);

router.route('/:id')
  .put(protect, admin, updateShow)
  .delete(protect, admin, deleteShow);

module.exports = router;
