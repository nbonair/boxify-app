import express from 'express';
import boxRouter from './box/index.js';
import productRouter from './product/index.js'
import { linkOauthUser } from '../middlewares/auth/linkOauthUser.js';
import { authenticateJwt } from '../middlewares/auth/authenticateOauth.js';


const router = express.Router();
router.use(authenticateJwt);
router.use(linkOauthUser);
router.use('/box', boxRouter);
router.use('/product', productRouter);
export default router;