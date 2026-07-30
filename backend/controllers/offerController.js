import Offer from "../models/Offer.js";

// Get Offers
export const getOffers = async (req, res) => {

    try {

        const offers = await Offer.find();

        res.status(200).json(offers);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Add Offer
export const addOffer = async (req, res) => {

    try {

        const offer = await Offer.create(req.body);

        res.status(201).json(offer);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};