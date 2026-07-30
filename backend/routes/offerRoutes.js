import express from "express";

import {

    getOffers,
    addOffer

} from "../controllers/offerController.js";

const router = express.Router();

router.get("/", getOffers);

router.post("/", addOffer);

export default router;