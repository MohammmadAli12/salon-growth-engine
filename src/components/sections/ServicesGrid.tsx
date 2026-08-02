import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Section, SectionHeading, accentSoftBg, accentText } from "@/components/layout/primitives";
import { services } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type IconMap = Record<string, React.ComponentType<{ className?: string | undefined }>>;

export function ServiceIcon({ name, className }: { name: string; className?: string | undefined }) {
  const Icon = (Icons as unknown as IconMap)[name] ?? Icons.Sparkles;
  return <Icon className={className} />;
}

export function ServicesGrid({
  heading = true,
  compact = false,
}: {
  heading?: boolean;
  compact?: boolean;
}) {
  return (
    <Section className={compact ? "py-10 md:py-12" : undefined}>
      {heading ? (
        <SectionHeading
          eyebrow="Marketplace"
          title="Complete marketing & growth solutions"
          description="Buy exactly what your salon needs, or bundle it into a managed plan. Every service ships with a fixed scope, timeline and reporting."
        />
      ) : null}

      <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", heading && "mt-10")}>
        {services.map((service, index) => (
          <Link
            key={service.slug}
            to="/marketplace/$slug"
            params={{ slug: service.slug }}
            className={cn(
              "group flex flex-col rounded-lg border border-border/70 bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-card",
              index === 0 && "lg:col-span-2",
            )}
          >
            <span
              className={cn(
                "flex size-11 items-center justify-center rounded-md",
                accentSoftBg[service.accent],
              )}
            >
              <ServiceIcon
                name={service.icon}
                className={cn("size-5", accentText[service.accent])}
              />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold text-foreground">{service.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{service.blurb}</p>
            <span className="mt-4 flex items-center justify-between text-sm font-semibold text-foreground">
              View packages
              <ArrowRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
            </span>
          </Link>

        ))}
      </div>
    </Section>
  );
}
