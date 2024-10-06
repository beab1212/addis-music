import express from 'express';
import { SearchController } from '../controllers/index.js';
import authHandler from '../middleware/authHandler.js';

const router = express.Router();

router.get('/suggestion', authHandler, SearchController.suggestion);
router.get('/', authHandler, SearchController.search);

export default router;
