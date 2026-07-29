const express = require('express');
const { getSeatsByShow } = require('../controllers/seatController');

const router = express.Router();

router.get('/show/:showId', getSeatsByShow);

module.exports = router;
