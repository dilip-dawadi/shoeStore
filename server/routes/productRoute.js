import express from "express";
import { getproductPage, createproductPage, deleteProduct, updateproductPage, getProductBySearch, getProductById, createCommentProduct, deleteCommentProduct } from "../controller/productController.js";
import { auth, checkAdmin } from "../middleware/auth.js";

const router = express.Router();
router.get("/", getproductPage);
router.get("/search", getProductBySearch);
router.post("/", checkAdmin, createproductPage);
router.patch("/:id", checkAdmin, updateproductPage);
router.delete('/deleteProduct/:id', deleteProduct)
router.patch("/comment/:id", auth, createCommentProduct);
router.delete("/comment/:id/:cmtuserId", auth, deleteCommentProduct);
router.get('/:id', getProductById)
export default router;