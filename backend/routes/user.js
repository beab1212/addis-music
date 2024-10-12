import express from 'express';
import authHandler from '../middleware/authHandler.js';
import { UserController } from '../controllers/index.js';

const router = express.Router();

router.get('/me', authHandler,  UserController.me);
router.post('/me', authHandler,  UserController.updateProfile);

export default router
