import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Section, SectionHeading, Eyebrow, accentSoftBg, accentText } from "@/components/layout/primitives";
import { GhostButton, GradientButton } from "@/components/layout/buttons";
import { ServiceIcon } from "@/components/sections/ServicesGrid";
import { PackageComparison } from "@/components/sections/PackageComparison";
import { services } from "@/lib/site-data";
import { serviceDetails } from "@/lib/marketplace-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/marketplace/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    const detail = serviceDetails[params.slug];
    if (!service || !detail) throw notFound();
    return { service, detail };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Service not found | Salunnn" }, { name: "robots", content: "noindex" }],
      };
    }
    const { service, detail } = loaderData;
    const title = `${service.title} for Salons — Packages | Salunnn`;
    return {
      meta: [
        { title },
        { name: "description", content: detail.intro.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: detail.tagline },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ServiceNotFound,
  component: ServiceDetailPage,
});

function ServiceNotFound() {
  return (
    <Section>
      <h1 className="font-display text-3xl font-extrabold text-foreground">Service not found</h1>
      <p className="mt-3 text-muted-foreground">
        That service isn't in the marketplace. Browse everything we offer instead.
      </p>
      <div className="mt-8">
        <GhostButton to="/marketplace" size="sm">
          Back to marketplace
        </GhostButton>
      </div>
    </Section>
  );
}

function ServiceDetailPage() {
  const { service, detail } = Route.useLoaderData();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/70 px-5 py-16 md:px-10 md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-28 size-[380px] rounded-full bg-gradient-hero opacity-[0.08] blur-3xl"
        />
        <div className="relative mx-auto w-full max-w-6xl">
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Marketplace
          </Link>

          <span
            className={cn(
              "mt-8 flex size-12 items-center justify-center rounded-md",
              accentSoftBg[service.accent],
            )}
          >
            <ServiceIcon name={service.icon} className={cn("size-6", accentText[service.accent])} />
          </span>

          <Eyebrow className={cn("mt-6", accentText[service.accent])}>{service.title}</Eyebrow>
          <h1 className="mt-4 max-w-3xl font-display text-[34px] font-extrabold leading-[1.08] tracking-tight text-foreground md:text-[56px]">
            {detail.tagline}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
            {detail.intro}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <GradientButton to="/contact" size="sm">
              Book consultation
              <ArrowRight className="ml-2 size-4" />
            </GradientButton>
            <a
              href="#packages"
              className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-card px-5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/30 hover:text-primary"
            >
              Compare packages
            </a>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <SectionHeading eyebrow="Why it matters" title="The problem this solves" />
          <p className="text-base leading-8 text-muted-foreground md:text-lg">{detail.why}</p>
        </div>
      </Section>

      {/* Benefits */}
      <Section className="bg-card">
        <SectionHeading
          eyebrow="Outcomes"
          title="What you get out of it"
          description="Concrete results, not activity reports."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {detail.benefits.map((b) => (
            <article key={b.title} className="rounded-lg border border-border/70 bg-background p-5">
              <div className="flex items-start gap-3">
                <Check className={cn("mt-0.5 size-5 shrink-0", accentText[service.accent])} />
                <div>
                  <h3 className="font-display text-base font-bold text-foreground">{b.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{b.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section>
        <SectionHeading eyebrow="How it works" title="A clear four-step delivery" />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {detail.process.map((step, i) => (
            <li
              key={step.title}
              className="relative rounded-lg border border-border/70 bg-card p-5 shadow-soft"
            >
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-md text-sm font-bold numeric",
                  accentSoftBg[service.accent],
                  accentText[service.accent],
                )}
              >
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-foreground">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Packages */}
      <PackageComparison
        id="packages"
        serviceTitle={service.title}
        accent={service.accent}
        table={detail.packages}
      />

      {/* FAQ */}
      <Section>
        <SectionHeading eyebrow="FAQ" title={`${service.title} questions`} />
        <dl className="mt-10 grid gap-4 md:grid-cols-2">
          {detail.faqs.map((item) => (
            <div key={item.q} className="rounded-lg border border-border/70 bg-card p-5 shadow-soft">
              <dt className="font-display text-base font-bold text-foreground">{item.q}</dt>
              <dd className="mt-2 text-sm leading-6 text-muted-foreground">{item.a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Booking */}
      <Section className="pt-0">
        <div className="overflow-hidden rounded-2xl bg-gradient-hero p-8 shadow-float md:p-14">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/80">
              Step 4 — Book consultation
            </p>
            <h2 className="mt-4 font-display text-[30px] font-extrabold leading-[1.12] text-primary-foreground md:text-[44px]">
              Not sure which package fits your salon?
            </h2>
            <p className="mt-4 text-base leading-7 text-primary-foreground/85 md:text-lg">
              Take a free 30-minute call. We'll look at your current setup and recommend the package
              that pays back fastest — no obligation.
            </p>
            <div className="mt-8">
              <GradientButton
                to="/contact"
                className="bg-none bg-card text-foreground hover:brightness-100 hover:opacity-90"
              >
                Book consultation
                <ArrowRight className="ml-2 size-4" />
              </GradientButton>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
