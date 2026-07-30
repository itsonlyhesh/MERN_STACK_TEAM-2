import express from "express";

import {

    getCategories,
    addCategory,
    updateCategory,
    deleteCategory

} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getCategories);

router.post("/", addCategory);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

export default router;