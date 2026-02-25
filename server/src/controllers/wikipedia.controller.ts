import { Request, Response, NextFunction } from 'express';
import { pageTitleSchema } from '../schemas/wikipedia.schema.js';

export function fetchWikipedia(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    pageTitleSchema.parse(req.params);
    const pageTitle = req.params.title.slice(1, req.params.title.length);
    res.status(200).send({ message: 'page loaded', pageTitle: pageTitle });
  } catch (err) {
    next(err);
  }
}
