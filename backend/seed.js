import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "./config/db.js";

import Category from "./models/Category.js";
import Product from "./models/Product.js";
import Offer from "./models/Offer.js";

import categories from "./data/categories.js";
import products from "./data/products.js";
import offers from "./data/offers.js";

dotenv.config();

const importData = async () => {

    try {

        await connectDB();

        console.log("Connected to MongoDB");

        // Delete Existing Data

        await Category.deleteMany();

        await Product.deleteMany();

        await Offer.deleteMany();

        console.log("Old Data Deleted");

        // Insert New Data

        await Category.insertMany(categories);

        await Product.insertMany(products);

        await Offer.insertMany(offers);

        console.log("Sample Data Inserted Successfully");

        process.exit();

    }

    catch (error) {

        console.log(error);

        process.exit(1);

    }

};

importData();