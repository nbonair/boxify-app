import express from 'express';
import boxRouter from './box/index.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { checkUserLevel } from '../middlewares/privileges/checkUserLevel.js';
import { linkOauthUser } from '../middlewares/auth/linkOauthUser.js';
import { authenticateJwt } from '../middlewares/auth/authenticateOauth.js';


const router = express.Router();
router.use(authenticateJwt);
router.use(linkOauthUser);
router.use('/box', boxRouter);
export default router;