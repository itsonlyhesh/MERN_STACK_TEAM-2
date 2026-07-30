import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Mall Management Backend Running..."
    });

});

app.use("/api/categories", categoryRoutes);

app.use("/api/products", productRoutes);

app.use("/api/offers", offerRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server Running on Port ${PORT}`);

});