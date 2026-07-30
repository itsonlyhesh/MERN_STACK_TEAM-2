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

        }

    },

    {

        timestamps: true

    }

);

export default mongoose.model("Product", productSchema);