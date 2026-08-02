import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/layout/primitives";
import { GhostButton, GradientButton } from "@/components/layout/buttons";
import { CtaBand } from "@/components/sections/CtaBand";
import { faqs, pricingPlans } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Salon Marketing Pricing — Plans from ₹14,999/mo | Salunnn" },
      {
        name: "description",
        content:
          "Transparent salon marketing plans: Starter, Growth and Scale. Fixed scope, monthly reporting, no lock-in after 90 days.",
      },
      { property: "og:title", content: "Salon Marketing Pricing — Plans from ₹14,999/mo | Salunnn" },
      {
        property: "og:description",
        content: "Three plans for single-chair salons through to multi-outlet groups.",
      },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: Pricing,
});

function Pricing() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Plans that scale with your chairs"
        description="Management fees are separate from ad spend, so you always know what you're paying us and what's going to the platforms."
      />

      <Section>
        <div className="grid gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={cn(
                "flex flex-col rounded-lg border bg-card p-6 shadow-soft",
                plan.featured ? "border-primary/40 shadow-card" : "border-border/70",
              )}
            >
              {plan.featured ? (
                <span className="mb-4 inline-flex w-fit rounded-sm bg-gradient-button px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">
                  Most popular
                </span>
              ) : null}
              <h2 className="font-display text-lg font-bold text-foreground">{plan.name}</h2>
              <p className="mt-3 font-display text-4xl font-extrabold text-foreground numeric">
                {plan.price}
                <span className="text-base font-medium text-muted-foreground">{plan.cadence}</span>
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{plan.body}</p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-teal" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                {plan.featured ? (
                  <GradientButton to="/contact" size="sm" className="w-full">
                    Book consultation
                  </GradientButton>
                ) : (
                  <GhostButton to="/contact" size="sm" className="w-full">
                    Talk to us
                  </GhostButton>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-card">
        <SectionHeading
          eyebrow="Questions"
          title="Pricing questions, answered"
        />
        <dl className="mt-10 grid gap-4 md:grid-cols-2">
          {faqs.slice(0, 4).map((item) => (
            <div key={item.q} className="rounded-lg border border-border/70 bg-background p-5">
              <dt className="font-display text-base font-bold text-foreground">{item.q}</dt>
              <dd className="mt-2 text-sm leading-6 text-muted-foreground">{item.a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <CtaBand />
    </>
  );
}
