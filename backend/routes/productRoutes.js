import express from "express";

import {

    getProducts,
    getFeaturedProducts,
    getTrendingProducts,
    getNewArrivals,
    addProduct,
    updateProduct,
    deleteProduct

} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/featured", getFeaturedProducts);

router.get("/trending", getTrendingProducts);

router.get("/new-arrivals", getNewArrivals);

router.post("/", addProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;