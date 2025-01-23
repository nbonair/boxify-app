import express from 'express';
import boxRouter from './box/index.js';

const router = express.Router();

router.use('/box',boxRouter);
export default router;