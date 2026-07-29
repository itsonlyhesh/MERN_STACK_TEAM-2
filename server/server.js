const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

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