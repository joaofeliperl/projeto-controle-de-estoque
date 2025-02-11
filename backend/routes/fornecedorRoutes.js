import express from "express";
import {
    createFornecedor
} from "../controllers/fornecedorController.js";

const router = express.Router();
router.post("/", createFornecedor);

export default router;