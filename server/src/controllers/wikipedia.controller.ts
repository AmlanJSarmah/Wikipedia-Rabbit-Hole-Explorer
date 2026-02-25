import { Request, Response, NextFunction } from 'express';
import { pageTitleSchema } from '../schemas/wikipedia.schema.js';
import { AppError } from '../utils/error.js';

export async function fetchWikipediaPage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const params = pageTitleSchema.parse(req.params);
    const pageTitle = params.title.slice(1, params.title.length);
    const encodedPageTitle = encodeURIComponent(pageTitle.trim());
    const wikiPediaResponse = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/html/${encodedPageTitle}`,
      {
        headers: {
          Accept: 'text/html; charset=utf-8',
        },
      }
    );
    if (!wikiPediaResponse.ok && wikiPediaResponse.status === 404)
      throw new AppError(wikiPediaResponse.status, 'Wikipedia Page Not Found');
    if (!wikiPediaResponse.ok)
      throw new AppError(wikiPediaResponse.status, 'Wikipedia Retrieve Error');
    let wikiPediaPage = await wikiPediaResponse.text();
    res.status(200).send({ message: 'page loaded', page: wikiPediaPage });
  } catch (err) {
    next(err);
  }
}
