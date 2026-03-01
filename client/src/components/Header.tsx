import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Dispatch, SetStateAction, SubmitEvent } from 'react';

type HeaderProps = {
  query: string;
  isLoading: boolean;
  setQuery: Dispatch<SetStateAction<string>>;
  handleSubmit: (event: SubmitEvent<HTMLFormElement>) => Promise<void>;
};

function Header({ query, isLoading, setQuery, handleSubmit }: HeaderProps) {
  return (
    <>
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
        className="flex w-full flex-col gap-3 sm:flex-row items-center"
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="Search for a page..."
          value={query}
          onChange={event => setQuery(event.target.value)}
          disabled={isLoading}
        />
        <Button className="px-6" disabled={isLoading} type="submit">
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </form>
    </>
  );
}

export default Header;
