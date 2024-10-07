import express from 'express';
import authHandler from '../middleware/authHandler.js';
import { GenreController } from '../controllers/index.js';

const router = express.Router()

router.get('/available', authHandler, GenreController.availableGenre);

export default router;
