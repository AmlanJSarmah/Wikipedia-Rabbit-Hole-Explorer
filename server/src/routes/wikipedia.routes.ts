import { Router } from 'express';
import { fetchWikipediaPage } from '../controllers/wikipedia.controller.js';

const router = Router();

router.get('/page:title', fetchWikipediaPage);

export default router;
