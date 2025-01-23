import express from 'express';
import { asyncHandler  } from '../../utils/asyncHandler.js';
import { BoxController } from '../../controllers/box.controller.js';

const router = express.Router();
router.post('', asyncHandler(BoxController.createBox));

export default router
