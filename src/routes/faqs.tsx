import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "Salunnn FAQs — Salon Marketing Questions Answered" },
      {
        name: "description",
        content:
          "Answers about Salunnn packages, timelines, deliverables, payments and how salon marketing campaigns are run.",
      },
      { property: "og:title", content: "Salunnn FAQs — Salon Marketing Questions Answered" },
      {
        property: "og:description",
        content: "Packages, timelines, deliverables and payments explained.",
      },
      { property: "og:url", content: "/faqs" },
    ],
    links: [{ rel: "canonical", href: "/faqs" }],
  }),
  component: Faqs,
});

function Faqs() {
  return (
    <PageShell
      eyebrow="FAQs"
      title="Questions salon owners ask us"
      description="Timelines, deliverables, pricing, reporting and what happens after you book."
    />
  );
}
