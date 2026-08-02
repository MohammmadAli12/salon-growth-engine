import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, accentSoftBg, accentText } from "@/components/layout/primitives";
import { ServiceIcon } from "@/components/sections/ServicesGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { services } from "@/lib/site-data";
import { serviceCategories, serviceDetails } from "@/lib/marketplace-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/marketplace/")({
  head: () => ({
    meta: [
      { title: "Salon Marketing Marketplace — Browse Services | Salunnn" },
      {
        name: "description",
        content:
          "Browse salon growth services: websites, Google Profile, local SEO, Google Ads, Instagram Ads, WhatsApp automation, AI front desk and branding.",
      },
      { property: "og:title", content: "Salon Marketing Marketplace — Browse Services | Salunnn" },
      {
        property: "og:description",
        content: "A product catalog for salon growth. Pick a service, then compare packages.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/marketplace" },
    ],
    links: [{ rel: "canonical", href: "/marketplace" }],
  }),
  component: MarketplaceIndex,
});

function MarketplaceIndex() {
  return (
    <>
      <PageHeader
        eyebrow="Marketplace"
        title="Browse services built for salons"
        description="Start with the outcome you need. Open a service to see how it works, what you get and how the packages compare."
      />

      {serviceCategories.map((category) => {
        const items = services.filter((s) => serviceDetails[s.slug]?.category === category.id);
        if (items.length === 0) return null;

        return (
          <Section key={category.id} className="py-10 md:py-12">
            <header className="flex flex-col gap-1.5 md:flex-row md:items-baseline md:justify-between">
              <h2 className="font-display text-xl font-bold text-foreground md:text-2xl">
                {category.label}
              </h2>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </header>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((service) => (
                <article
                  key={service.slug}
                  className="group flex flex-col rounded-lg border border-border/70 bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-card"
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
                  <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.blurb}</p>

                  <ul className="mt-4 flex-1 space-y-2">
                    {service.deliverables.slice(0, 5).map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"
                      >
                        <Check
                          className={cn("mt-1 size-3.5 shrink-0", accentText[service.accent])}
                        />
                        {d}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/marketplace/$slug"
                    params={{ slug: service.slug }}
                    className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-background text-sm font-semibold text-foreground transition-all duration-300 group-hover:border-primary/40 group-hover:text-primary"
                  >
                    View packages
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </article>
              ))}
            </div>
          </Section>
        );
      })}

      <CtaBand />
    </>
  );
}
