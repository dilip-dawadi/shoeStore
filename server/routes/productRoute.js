import express from "express";
import { getproductPage, createproductPage, getProductById } from "../controller/productController.js";
import { checkAdmin } from "../middleware/auth.js";

const router = express.Router();
router.get("/", getproductPage);
router.post("/", checkAdmin, createproductPage);
router.get('/:id', getProductById)
export default router;