import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import * as cheerio from 'cheerio';

const DOMWindow = new JSDOM(' ').window;
export const DOMPurify = createDOMPurify(DOMWindow);

// Remove tags like <script> to prevent cross site scripting attacks
export const purifyConfig = {
  USE_PROFILES: { html: true },
  ADD_TAGS: [
    'iframe',
    'math',
    'mi',
    'mo',
    'mn',
    'ms',
    'mtext',
    'annotation',
    'semantics',
  ],
  ADD_ATTR: ['target', 'rel', 'class', 'style', 'data-mw', 'typeof', 'about'],
  ALLOWED_URI_REGEXP:
    /^(?:(?:https?|mailto|tel|data:image\/):|[^&:/?#]*(?:[/?#]|$))/,
  KEEP_CONTENT: true,
  FORBID_TAGS: [
    'script',
    'style',
    'noscript',
    'frame',
    'frameset',
    'object',
    'embed',
    'base',
    'form',
  ],
  FORBID_ATTR: ['on*', 'action', 'formaction', 'srcdoc'],
};

export function stripWikipediaLayout(html: string): string {
  const $ = cheerio.load(html, { xmlMode: true });

  // Remove major unwanted blocks
  [
    '#mw-navigation',
    '#mw-head',
    '#mw-page-base',
    '#footer',
    '.mw-indicators',
    '.mw-editsection',
    '.noprint',
    '#siteNotice',
    '.mw-jump-link',
    '#p-personal',
    '#p-views',
    '#p-cactions',
    '#p-lang',
    '.mw-portlet',
    '.vector-menu',
    '.vector-pinnable-header',
  ].forEach(sel => $(sel).remove());

  // Prefer main content area, fallback to body
  const main = $('#mw-content-text').html();
  return main ?? $('body').html() ?? '';
}

export function absolutizeUrls(html: string): string {
  const $ = cheerio.load(html);
  const base = 'https://en.wikipedia.org';

  // Internal wiki links
  $('a[href^="/wiki/"]').each((_, el) => {
    const href = $(el).attr('href');
    if (!href) return;
    if (href.startsWith('/wiki/Special:') || href.startsWith('/wiki/File:'))
      return;
    $(el).attr('href', base + href);
  });

  // Images, sources, srcset
  $('img[src^="//"], img[src^="/"], source[src^="//"], source[src^="/"]').each(
    (_, el) => {
      let src =
        $(el).attr('src') ||
        $(el).attr('srcset')?.split(',')[0]?.trim().split(' ')[0];
      if (!src) return;

      if (src.startsWith('//')) src = 'https:' + src;
      else if (src.startsWith('/')) src = base + src;

      if ($(el).attr('src')) $(el).attr('src', src);
      // simplistic srcset rewrite — improve if needed
      if ($(el).attr('srcset')) $(el).attr('srcset', src);
    }
  );

  // Drop external stylesheet/script loads (safer)
  $('link[href^="/"], script[src^="/"]').remove();

  return $.html() ?? '';
}
