import { Router } from 'express';
import { fetchWikipedia } from '../controllers/wikipedia.controller.js';

const router = Router();

router.get('/page:title', fetchWikipedia);

export default router;
