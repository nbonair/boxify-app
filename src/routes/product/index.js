import express from 'express';
import { ProductController } from '../../controllers/product.controller.js';

const router = express.Router();

router.post('/product',ProductController.createProduct);

export default router;