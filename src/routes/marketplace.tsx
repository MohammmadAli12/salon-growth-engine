import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Section, SectionHeading, accentSoftBg, accentText } from "@/components/layout/primitives";
import { CtaBand } from "@/components/sections/CtaBand";
import { services } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Salon Marketing Marketplace — Services & Packages | Salunnn" },
      {
        name: "description",
        content:
          "Browse salon growth services: website development, Google Profile SEO, local SEO, Google Ads, Instagram Ads, WhatsApp API and AI automation.",
      },
      {
        property: "og:title",
        content: "Salon Marketing Marketplace — Services & Packages | Salunnn",
      },
      {
        property: "og:description",
        content: "Pick a service, choose a package and book a free consultation.",
      },
      { property: "og:url", content: "/marketplace" },
    ],
    links: [{ rel: "canonical", href: "/marketplace" }],
  }),
  component: Marketplace,
});

function Marketplace() {
  return (
    <>
      <PageHeader
        eyebrow="Marketplace"
        title="Every service your salon needs"
        description="Websites, Google SEO, local SEO, Google Ads, Instagram Ads, WhatsApp API and AI automation — with clear scope, timelines and pricing."
      />
      <ServicesGrid heading={false} compact />

      <Section className="bg-card">
        <SectionHeading
          eyebrow="What's included"
          title="Fixed scope on every service"
          description="No vague retainers. Each service lists exactly what gets delivered and how it's reported."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.slug}
              className="rounded-lg border border-border/70 bg-background p-6"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-lg font-bold text-foreground">{service.title}</h3>
                <span
                  className={cn(
                    "rounded-sm px-2.5 py-1 text-[11px] font-semibold numeric",
                    accentSoftBg[service.accent],
                    accentText[service.accent],
                  )}
                >
                  {service.price}
                </span>
              </div>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className={cn("mt-0.5 size-4 shrink-0", accentText[service.accent])} />
                    {d}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
