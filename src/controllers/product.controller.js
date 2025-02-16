import { createProduct } from "../services/product.service.js";
import { successResponse } from "../utils/resBuilder.js"

export class ProductController {
    static createProduct = async (req, res, next) => {
        const userId = req.user.id;
        const payload = req.body;
        const result = await createProduct(userId, payload);
        res.status(200).json(successResponse(200,'Created successfully',{},result));
    }
}
