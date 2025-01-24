import express from 'express';
import boxRouter from './box/index.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { checkUserLevel } from '../middlewares/privileges/checkUserLevel.js';

const router = express.Router();
router.use(asyncHandler(checkUserLevel));
router.use('/box', boxRouter);
export default router;