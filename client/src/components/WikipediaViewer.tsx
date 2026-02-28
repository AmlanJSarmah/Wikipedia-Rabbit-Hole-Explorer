import type { MouseEvent } from 'react';

type WikipediaViewerProps = {
  html: string;
  handleWikiClick: (e: MouseEvent<HTMLDivElement>) => Promise<void>;
};

function WikipediaViewer({ html, handleWikiClick }: WikipediaViewerProps) {
  return (
    <section className="w-full">
      <div className="mx-auto w-[90%] rounded-2xl border border-border bg-card p-6 shadow-sm  3xl:w-[60%]">
        {html ? (
          <div
            className="wiki-content space-y-4 text-sm leading-7 text-foreground"
            dangerouslySetInnerHTML={{ __html: html }}
            onClick={handleWikiClick}
          />
        ) : (
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>No results yet.</p>
            <p>Search for a topic to load HTML content here.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default WikipediaViewer;
