import express from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { BoxController } from '../../controllers/box.controller.js';
import { checkBoxPrivileges } from '../../middlewares/privileges/checkBoxPrivileges.js';
import { validateSchema } from '../../middlewares/validators/validateSchema.js';
import { boxSchema } from '../../middlewares/validators/schemas/index.js';

const router = express.Router();

router.post('/', validateSchema(boxSchema.definitions.create), asyncHandler(checkBoxPrivileges), asyncHandler(BoxController.createBox));
router.get('/', asyncHandler(BoxController.getBoxesByUserId));
router.patch('/:id', validateSchema(boxSchema.definitions.update), asyncHandler(BoxController.updateBoxDimension));
router.delete('/:id', asyncHandler(BoxController.deleteBoxById));

export default router
