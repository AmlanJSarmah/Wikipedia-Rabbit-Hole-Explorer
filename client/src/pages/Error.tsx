import { IconAlertTriangle } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="mx-auto flex w-[90%] flex-col items-center justify-center gap-4 py-16 text-center lg:w-[70%]">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
          <IconAlertTriangle className="h-7 w-7 text-destructive" />
        </div>
        <h1 className="text-3xl font-semibold">Error 404: Page not found</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          The page you are looking for does not exist.
        </p>
        <Button asChild className="mt-2">
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}

export default ErrorPage;
