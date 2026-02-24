import { Router } from 'express';
import { fetchWikipedia } from '../controllers/wikipedia.fetcher.js';

const router = Router();

router.get('/page', fetchWikipedia);

export default router;
