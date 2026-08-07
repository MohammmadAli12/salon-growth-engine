import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/primitives";
import { faqs } from "@/lib/site-data";
import { CtaBand } from "@/components/sections/CtaBand";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — Salon Marketing Questions Answered | Salon Genie" },
      {
        name: "description",
        content:
          "Answers on launch timelines, ad spend, contracts, ownership of accounts and buying single salon marketing services.",
      },
      { property: "og:title", content: "FAQs — Salon Marketing Questions Answered | Salon Genie" },
      {
        property: "og:description",
        content: "Timelines, pricing, contracts and ownership — the questions owners ask most.",
      },
      { property: "og:url", content: "/faqs" },
    ],
    links: [{ rel: "canonical", href: "/faqs" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Faqs,
});

function Faqs() {
  return (
    <>
      <PageHeader
        eyebrow="FAQs"
        title="Everything owners ask before starting"
        description="If your question isn't here, ask it on the consultation call — we answer plainly."
      />
      <Section>
        <Accordion type="single" collapsible className="mx-auto max-w-3xl">
          {faqs.map((item, i) => (
            <AccordionItem key={item.q} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left font-display text-base font-bold text-foreground">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-6 text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
      <CtaBand />
    </>
  );
}
