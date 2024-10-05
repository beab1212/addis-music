import express from 'express';
import { AuthController } from '../controllers/index.js';

const router = express.Router()

router.post('/signin', AuthController.singin);
router.post('/signup', AuthController.singup);
// router.post('/verify');

export default router;
