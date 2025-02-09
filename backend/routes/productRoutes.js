import express from "express";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { loginRequired } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerConfig.js";

const router = express.Router();

router.get("/", loginRequired, getProducts);
router.post("/", loginRequired, upload, addProduct);
router.put("/:codigo", loginRequired, updateProduct);
router.delete("/:codigo", loginRequired, deleteProduct);

export default router;
