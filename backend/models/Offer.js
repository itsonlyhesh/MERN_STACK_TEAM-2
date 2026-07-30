import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(

    {

        title: {

            type: String,

            required: true

        },

        discount: {

            type: String,

            required: true

        },

        startingPrice: {

            type: Number,

            required: true

        },

        bannerImage: {

            type: String

        }

    },

    {

        timestamps: true

    }

);

export default mongoose.model("Offer", offerSchema);