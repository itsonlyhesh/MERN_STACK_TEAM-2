const express = require('express');
const cors = require('cors');
const path = require('path');
const itemRoutes    = require('./routes/itemRoutes');
const venueRoutes   = require('./routes/venueRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const frontendPath = path.join(__dirname, '../../Frontend');

app.use(cors());
app.use(express.json());

// Support both the original singular link and the commonly used plural URL.
app.get(['/booking', '/bookings'], (req, res) => {
  res.sendFile(path.join(frontendPath, 'booking.html'));
});

// ── API Routes ───────────────────────────────────────────────────────────────
app.use('/items',    itemRoutes);
app.use('/venues',   venueRoutes);
app.use('/bookings', bookingRoutes);

// ── Static Assets ────────────────────────────────────────────────────────────
app.use(express.static(frontendPath));
app.use('/images', express.static(path.join(__dirname, '../../images')));

// ── Frontend Entry Points ────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// ── Error Handling ───────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
