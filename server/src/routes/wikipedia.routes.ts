import { Router } from 'express';
import { fetchWikipediaPage } from '../controllers/wikipedia.controller.js';
import { isAuthenticated } from '../utils/auth.utils.js';

const router = Router();

router.get('/page/:title', isAuthenticated, fetchWikipediaPage);

export default router;
