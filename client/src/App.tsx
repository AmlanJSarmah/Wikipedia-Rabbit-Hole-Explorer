import type { FormEvent } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

function App() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [html, setHtml] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const endpoint = `http://localhost:8080/wikipedia/page:${encodeURIComponent(
        query.trim()
      )}`;
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      setHtml(typeof data.page === 'string' ? data.page : '');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Request failed.';
      setError(message);
      setHtml('');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="mx-auto flex w-[90%] flex-col gap-8 pb-16 pt-12 lg:w-[70%]">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Wikipedia Rabbit Hole Explorer
          </p>
          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
            Search a topic and explore the page content
          </h1>
          <p className="text-base text-muted-foreground">
            Enter a search term to fetch HTML from your local server and preview
            it below.
          </p>
        </header>

        <form
          className="flex w-full flex-col gap-3 sm:flex-row"
          onSubmit={handleSubmit}
        >
          <input
            aria-label="Search query"
            className="h-11 flex-1 rounded-lg border border-input bg-background px-4 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Search for a page..."
            value={query}
            onChange={event => setQuery(event.target.value)}
          />
          <Button className="h-11 px-6" disabled={isLoading} type="submit">
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </form>

        {error ? (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        <section className="w-full">
          <div className="mx-auto w-[80%] rounded-2xl border border-border bg-card p-6 shadow-sm lg:w-[60%]">
            {html ? (
              <div
                className="space-y-4 text-sm leading-7 text-foreground"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>No results yet.</p>
                <p>Search for a topic to load HTML content here.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
