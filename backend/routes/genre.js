import express from 'express';
import path from 'path';
import config from '../config.js';
import authHandler from '../middleware/authHandler.js';
import { GenreController } from '../controllers/index.js';

const router = express.Router()

router.use('/asset', authHandler, express.static(path.join(`${config.DATA_PATH}`, 'image')));
router.get('/available', authHandler, GenreController.availableGenre);

export default router;
