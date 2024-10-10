import express from 'express';
import authHandler from '../middleware/authHandler.js';
import { ForyouAndDiscover } from '../controllers/index.js';

const router = express.Router();

router.get('/discover', authHandler, ForyouAndDiscover.discover);
router.get('/foryou', authHandler, ForyouAndDiscover.foryou)


export default router;
