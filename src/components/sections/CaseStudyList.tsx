import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading, accentText } from "@/components/layout/primitives";
import { caseStudies } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function CaseStudyList({
  limit,
  heading = true,
}: {
  limit?: number | undefined;
  heading?: boolean | undefined;
}) {
  const items = typeof limit === "number" ? caseStudies.slice(0, limit) : caseStudies;

  return (
    <Section>
      {heading ? (
        <SectionHeading
          eyebrow="Case studies"
          title="Real salons, measured results"
          description="Every engagement is reported against bookings, cost per lead and repeat visits — not impressions."
        />
      ) : null}

      <div className={cn("grid gap-4 lg:grid-cols-3", heading && "mt-10")}>
        {items.map((study) => (
          <article
            key={study.slug}
            className="group flex flex-col rounded-lg border border-border/70 bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
          >
            <p className={cn("text-xs font-semibold uppercase tracking-[0.14em]", accentText[study.accent])}>
              {study.name} · {study.city}
            </p>
            <h3 className="mt-3 font-display text-xl font-bold leading-snug text-foreground">
              {study.headline}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{study.summary}</p>

            <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5">
              {study.metrics.map((m) => (
                <div key={m.label}>
                  <dd className="font-display text-lg font-extrabold text-foreground numeric">
                    {m.value}
                  </dd>
                  <dt className="mt-0.5 text-[11px] leading-4 text-muted-foreground">{m.label}</dt>
                </div>
              ))}
            </dl>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {study.services.map((s) => (
                <li
                  key={s}
                  className="rounded-sm bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                >
                  {s}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {heading ? (
        <Link
          to="/case-studies"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
        >
          See all case studies
          <ArrowRight className="size-4" />
        </Link>
      ) : null}
    </Section>
  );
}
