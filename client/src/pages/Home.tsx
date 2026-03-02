import type { SubmitEvent, MouseEvent } from 'react';
import { useState } from 'react';
import Header from '@/components/Header';
import WikipediaViewer from '@/components/WikipediaViewer';
import ErrorNotification from '@/components/ErrorNotification.tsx';

function HomePage() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [html, setHtml] = useState('');

  async function fetchPageByTitle(title: string) {
    const normalizedTitle = title.trim();
    if (!normalizedTitle) return;

    setIsLoading(true);
    setError(null);
    const endpoint = `http://localhost:8080/wikipedia/page/${encodeURIComponent(
      normalizedTitle
    )}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    if (!response.ok) {
      setError(data.message);
    }
    setHtml(typeof data.page === 'string' ? data.page : '');
    setIsLoading(false);
  }

  function extractWikipediaTitle(anchor: HTMLAnchorElement): string | null {
    const href = anchor.getAttribute('href')?.trim() ?? '';
    if (!href) return null;

    const parseFromPath = (path: string) => {
      const wikiIndex = path.indexOf('/wiki/');
      if (wikiIndex === -1) return null;
      const slug = path
        .slice(wikiIndex + '/wiki/'.length)
        .split('#')[0]
        .split('?')[0];
      if (!slug) return null;
      return decodeURIComponent(slug).replace(/_/g, ' ');
    };

    if (href.startsWith('http')) {
      try {
        const url = new URL(href);
        return parseFromPath(url.pathname);
      } catch {
        return null;
      }
    }

    if (href.startsWith('/wiki/')) {
      return parseFromPath(href);
    }

    return anchor.textContent?.trim() || null;
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    await fetchPageByTitle(query);
  }

  async function handleWikiClick(event: MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    const anchor = target.closest('a');
    if (!anchor) return;

    const title = extractWikipediaTitle(anchor);
    if (!title) return;

    event.preventDefault();
    setQuery(title);
    await fetchPageByTitle(title);
  }

  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="mx-auto flex w-[90%] flex-col gap-8 pb-16 pt-12 lg:w-[70%] items-center">
        <Header
          query={query}
          isLoading={isLoading}
          setQuery={setQuery}
          handleSubmit={handleSubmit}
        ></Header>
        {error ? <ErrorNotification message={error} /> : null}
      </div>
      <WikipediaViewer
        html={html}
        handleWikiClick={handleWikiClick}
      ></WikipediaViewer>
    </div>
  );
}

export default HomePage;
