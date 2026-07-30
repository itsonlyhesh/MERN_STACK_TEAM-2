import Category from "../models/Category.js";

// Get All Categories
export const getCategories = async (req, res) => {

    try {

        const categories = await Category.find();

        res.status(200).json(categories);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Add Category
export const addCategory = async (req, res) => {

    try {

        const category = await Category.create(req.body);

        res.status(201).json(category);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Update Category
export const updateCategory = async (req, res) => {

    try {

        const category = await Category.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }

        );

        res.status(200).json(category);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Delete Category
export const deleteCategory = async (req, res) => {

    try {

        await Category.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Category Deleted Successfully"
        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};