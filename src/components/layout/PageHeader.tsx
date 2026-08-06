import type { ReactNode } from "react";
import { Eyebrow } from "./primitives";

/**
 * Standard inner-page header: eyebrow, H1, intro paragraph.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string | undefined;
  children?: ReactNode | undefined;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/70 bg-gradient-hero-soft px-5 py-16 md:px-10 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 size-[360px] rounded-full bg-gradient-hero opacity-[0.08] blur-3xl"
      />
      <div className="relative mx-auto w-full max-w-6xl">
        <Eyebrow className="text-primary">{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-[34px] leading-[1.1] tracking-tight text-foreground md:text-[56px]">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
