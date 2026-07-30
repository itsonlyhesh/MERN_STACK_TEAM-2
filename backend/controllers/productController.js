import Product from "../models/Product.js";

// Get All Products
export const getProducts = async (req, res) => {

    try {

        const products = await Product.find();

        res.status(200).json(products);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Featured Products
export const getFeaturedProducts = async (req, res) => {

    try {

        const products = await Product.find({ featured: true });

        res.status(200).json(products);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Trending Products
export const getTrendingProducts = async (req, res) => {

    try {

        const products = await Product.find({ trending: true });

        res.status(200).json(products);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// New Arrivals
export const getNewArrivals = async (req, res) => {

    try {

        const products = await Product.find({ newArrival: true });

        res.status(200).json(products);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Add Product
export const addProduct = async (req, res) => {

    try {

        const product = await Product.create(req.body);

        res.status(201).json(product);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Update Product
export const updateProduct = async (req, res) => {

    try {

        const product = await Product.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }

        );

        res.status(200).json(product);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Delete Product
export const deleteProduct = async (req, res) => {

    try {

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Product Deleted Successfully"
        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};