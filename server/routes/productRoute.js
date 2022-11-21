import express from "express";
import { getproductPage, createproductPage, getProductById, getTopProducts, getfilterProduct, updateProductById } from "../controller/productController.js";
import { checkAdmin } from "../middleware/auth.js";

const router = express.Router();
router.get("/", getproductPage);
router.get("/top", getTopProducts);
router.get("/filter", getfilterProduct);
router.post("/", checkAdmin, createproductPage);
router.patch('/:id', updateProductById)
router.get('/:id', getProductById)
export default router;