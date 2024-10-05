import express from 'express';
import authHandler from '../middleware/authHandler.js';
import { AuthController } from '../controllers/index.js';

const router = express.Router()

router.post('/signin', AuthController.singin);
router.post('/signup', AuthController.singup);
router.post('/signout', authHandler, AuthController.signout);

export default router;
