import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { AccentName } from "@/lib/site-data";

export const accentText: Record<AccentName, string> = {
  indigo: "text-indigo",
  violet: "text-violet",
  magenta: "text-magenta",
  coral: "text-coral",
  amber: "text-amber",
  lime: "text-lime",
  teal: "text-teal",
  sky: "text-sky",
};

export const accentSoftBg: Record<AccentName, string> = {
  indigo: "bg-indigo/10",
  violet: "bg-violet/10",
  magenta: "bg-magenta/10",
  coral: "bg-coral/10",
  amber: "bg-amber/10",
  lime: "bg-lime/10",
  teal: "bg-teal/10",
  sky: "bg-sky/10",
};

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string | undefined;
  id?: string | undefined;
}) {
  return (
    <section id={id} className={cn("px-5 py-section md:px-10 lg:py-section-lg", className)}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string | undefined }) {
  return (
    <p
      className={cn(
        "text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string | undefined;
  title: ReactNode;
  description?: ReactNode | undefined;
  align?: "left" | "center" | undefined;
  className?: string | undefined;
}) {
  return (
    <header
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-[30px] font-bold leading-[1.12] text-foreground md:text-[44px]">
        {title}
      </h2>
      {description ? (
        <p className={cn("max-w-2xl text-base leading-7 text-muted-foreground md:text-lg")}>
          {description}
        </p>
      ) : null}
    </header>
  );
}

export function SurfaceCard({
  children,
  className,
  interactive = true,
}: {
  children: ReactNode;
  className?: string | undefined;
  interactive?: boolean | undefined;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border/70 bg-card p-5 shadow-soft",
        interactive &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-card",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Pill({
  children,
  accent = "indigo",
  className,
}: {
  children: ReactNode;
  accent?: AccentName | undefined;
  className?: string | undefined;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-semibold",
        accentSoftBg[accent],
        accentText[accent],
        className,
      )}
    >
      {children}
    </span>
  );
}
