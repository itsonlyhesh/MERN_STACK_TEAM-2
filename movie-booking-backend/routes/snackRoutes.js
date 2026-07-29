const express = require('express');
const { getSnacks, createSnack, updateSnack } = require('../controllers/snackController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getSnacks)
  .post(protect, admin, createSnack);

router.route('/:id')
  .put(protect, admin, updateSnack);

module.exports = router;
