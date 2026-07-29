const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const movieAuthRoutes = require("./modules/movie/routes/authRoutes");
const movieBookingRoutes = require("./modules/movie/routes/bookingRoutes");
const movieRoutes = require("./modules/movie/routes/movieRoutes");
const moviePaymentRoutes = require("./modules/movie/routes/paymentRoutes");
const movieSeatRoutes = require("./modules/movie/routes/seatRoutes");
const movieShowRoutes = require("./modules/movie/routes/showRoutes");
const movieSnackRoutes = require("./modules/movie/routes/snackRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error(`MongoDB connection failed: ${error.message}`));

app.use("/api/auth", movieAuthRoutes);
app.use("/api/bookings", movieBookingRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/payments", moviePaymentRoutes);
app.use("/api/seats", movieSeatRoutes);
app.use("/api/shows", movieShowRoutes);
app.use("/api/snacks", movieSnackRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Nexa Mall API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    project: "Nexa Mall",
    status: "Server is healthy",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Nexa Mall server running on http://localhost:${PORT}`);
});
