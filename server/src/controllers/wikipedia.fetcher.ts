import { Request, Response, NextFunction } from 'express';

export function fetchWikipedia(req: Request, res: Response) {
  res.status(200).send({ message: 'here is your page' });
}
