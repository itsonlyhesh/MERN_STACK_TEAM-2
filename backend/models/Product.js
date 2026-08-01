import mongoose from "mongoose";

const productSchema = new mongoose.Schema(

    {

        name: {

            type: String,

            required: true

        },

        category: {

            type: String,

            required: true

        },

        image: {

            type: String,

            required: true

        },

        price: {

            type: Number,

            required: true

        },

        rating: {

            type: Number,

            default: 5

        },

        featured: {

            type: Boolean,

            default: false

        },

        trending: {

            type: Boolean,

            default: false

        },

        newArrival: {

            type: Boolean,

            default: false

        },

        description: {

            type: String,

            default: "A comfortable, stylish addition to your wardrobe."

        },

        brand: {

            type: String,

            default: "Fashion Hub"

        },

        availableSizes: {

            type: [String],

            default: []

        },

        availableColors: {

            type: [String],

            default: []

        },

        stock: {

            type: Number,

            default: 0

        },

        discount: {

            type: Number,

            default: 0

        },

        originalPrice: {

            type: Number,

            default: 0

        }

    },

    {

        timestamps: true

    }

);

export default mongoose.model("Product", productSchema);
