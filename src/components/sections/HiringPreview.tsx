import { Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, MapPin } from "lucide-react";
import { Section, SectionHeading } from "@/components/layout/primitives";
import { jobs } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function HiringPreview({ heading = true }: { heading?: boolean | undefined }) {
  return (
    <Section>
      {heading ? (
        <SectionHeading
          eyebrow="Hiring"
          title="Find stylists, therapists and managers"
          description="Salons on Salunnn post openings to a pool of professionals who already work in the industry."
        />
      ) : null}

      <ul className={cn("grid gap-3 sm:grid-cols-2", heading && "mt-10")}>
        {jobs.map((job) => (
          <li
            key={`${job.role}-${job.salon}`}
            className="flex items-start justify-between gap-4 rounded-lg border border-border/70 bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
          >
            <div>
              <h3 className="font-display text-base font-bold text-foreground">{job.role}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{job.salon}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3.5" />
                  {job.city}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Briefcase className="size-3.5" />
                  {job.type}
                </span>
              </div>
            </div>
            <span className="whitespace-nowrap rounded-sm bg-muted px-2.5 py-1 text-[11px] font-semibold text-foreground numeric">
              {job.pay}
            </span>
          </li>
        ))}
      </ul>

      {heading ? (
        <Link
          to="/hiring"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
        >
          See all openings
          <ArrowRight className="size-4" />
        </Link>
      ) : null}
    </Section>
  );
}
