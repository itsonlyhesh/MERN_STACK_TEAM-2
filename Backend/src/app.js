const express = require('express');
const cors = require('cors');
const path = require('path');
const itemRoutes = require('./routes/itemRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/items', itemRoutes);

const frontendPath = path.join(__dirname, '../../Frontend');
app.use(express.static(frontendPath));
app.use(
  "/images",
  express.static(path.join(__dirname, "../../images"))
);
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
