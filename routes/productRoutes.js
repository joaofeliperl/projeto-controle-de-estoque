import express from "express";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { loginRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", loginRequired, getProducts);
router.post("/", loginRequired, addProduct);
router.put("/:codigo", loginRequired, updateProduct);
router.delete("/:codigo", loginRequired, deleteProduct);

export default router;
