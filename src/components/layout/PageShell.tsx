import type { ReactNode } from "react";

interface PageShellProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

/**
 * Temporary page frame used by routes that have not been designed yet.
 * Sections are built one at a time; this keeps navigation working meanwhile.
 */
export function PageShell({ eyebrow, title, description, children }: PageShellProps) {
  return (
    <main className="min-h-screen bg-background px-5 py-24 md:px-10">
      <div className="mx-auto max-w-5xl">
        {eyebrow ? (
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-4xl font-extrabold leading-[1.08] text-foreground md:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
        ) : null}
        {children}
      </div>
    </main>
  );
}
