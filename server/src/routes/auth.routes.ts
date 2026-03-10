import { Router } from 'express';
import {
  handleUserSignUp,
  handleUserLogin,
} from '../controllers/auth.controller.js';

const router = Router();

router.post('/signup', handleUserSignUp);
router.post('/login', handleUserLogin);

export default router;
