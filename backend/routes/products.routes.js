import express from 'express';
import { updateProduct,deleteProduct,createProduct,getProducts } from '../controllers/products.controllers.js';
const router = express.Router();

router.get("/",getProducts);
router.post("/", createProduct);
router.delete("/:id",deleteProduct);
router.put("/:id",updateProduct);

export default router;
