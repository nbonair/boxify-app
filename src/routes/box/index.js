import express from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { BoxController } from '../../controllers/box.controller.js';
import { checkBoxPrivileges } from '../../middlewares/privileges/checkBoxPrivileges.js';

const router = express.Router();
router.post('', asyncHandler(checkBoxPrivileges), asyncHandler(BoxController.createBox));

export default router
