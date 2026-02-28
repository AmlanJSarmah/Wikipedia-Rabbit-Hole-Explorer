import { Request, Response, NextFunction } from 'express';
import { pageTitleSchema } from '../schemas/wikipedia.schema.js';
import { AppError } from '../utils/error.js';
import {
  stripWikipediaLayout,
  absolutizeUrls,
  purifyConfig,
  DOMPurify,
} from '../utils/page.utils.js';

export async function fetchWikipediaPage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const params = pageTitleSchema.parse(req.params);
    const pageTitle = params.title;
    const encodedPageTitle = encodeURIComponent(pageTitle.trim());

    // Fetch Wikipedia page
    const wikiPediaResponse = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/html/${encodedPageTitle}`,
      {
        headers: {
          'User-Agent':
            'WikipediaRabbitHoleExplorer/0.1 (https://github.com/AmlanJSarmah/Wikipedia-Rabbit-Hole-Explorer; amlan.j.sarmah@gmail.com)',
          Accept: 'text/html; charset=utf-8',
        },
      }
    );
    if (!wikiPediaResponse.ok && wikiPediaResponse.status === 404)
      throw new AppError(wikiPediaResponse.status, 'Wikipedia Page Not Found');
    if (!wikiPediaResponse.ok)
      throw new AppError(wikiPediaResponse.status, 'Wikipedia Retrieve Error');
    let wikiPediaPageRaw = await wikiPediaResponse.text();

    // Sanitize Raw HTML to prevent Cross Site Scripting
    let cleaned = stripWikipediaLayout(wikiPediaPageRaw);
    let sanitized = DOMPurify.sanitize(cleaned, purifyConfig);
    sanitized = absolutizeUrls(sanitized);
    const wikiPediaPage = `<div class="wiki-content">${sanitized}</div>`;

    res.status(200).send({ message: 'page loaded', page: wikiPediaPage });
  } catch (err) {
    next(err);
  }
}
