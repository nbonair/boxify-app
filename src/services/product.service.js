import { Product } from "../models/db.js";

export const createProduct = async (payload, transaction = null) => await Product.create(payload, {transaction});