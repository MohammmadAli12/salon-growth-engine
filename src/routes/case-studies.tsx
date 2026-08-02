import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { CaseStudyList } from "@/components/sections/CaseStudyList";
import { CtaBand } from "@/components/sections/CtaBand";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Salon Case Studies — Real Growth Results | Salunnn" },
      {
        name: "description",
        content:
          "See how salons grew bookings, revenue and repeat clients with Salunnn websites, local SEO, ads and WhatsApp automation.",
      },
      { property: "og:title", content: "Salon Case Studies — Real Growth Results | Salunnn" },
      {
        property: "og:description",
        content: "Bookings, cost per lead and retention numbers from real salon engagements.",
      },
      { property: "og:url", content: "/case-studies" },
    ],
    links: [{ rel: "canonical", href: "/case-studies" }],
  }),
  component: CaseStudies,
});

function CaseStudies() {
  return (
    <>
      <PageHeader
        eyebrow="Case studies"
        title="Growth we can show you the numbers for"
        description="Each engagement below is reported against bookings, cost per lead and repeat visits — the only metrics that pay salon bills."
      />
      <CaseStudyList heading={false} />
      <CtaBand />
    </>
  );
}
