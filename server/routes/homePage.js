import express from "express";
import { getHomePage, createHomePage, deleteHome, updateHomePage } from "../controller/homePage.js";
import { auth, checkAdmin } from "../middleware/auth.js";

const router = express.Router();
router.get("/", getHomePage);
router.post("/", checkAdmin, createHomePage);
router.patch("/:id", checkAdmin, updateHomePage);
router.delete("/deleteHome/:id", checkAdmin, deleteHome);
export default router;