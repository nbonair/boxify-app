import { Product } from '../models/db.js';

export const createProduct = async (payload, transaction = null) => await Product.create(payload, { transaction });

export const updateProduct = async (payload, transaction) => await Product.update(payload, { transaction });