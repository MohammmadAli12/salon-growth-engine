import { createFileRoute } from "@tanstack/react-router";
import { CaseStudiesShowcase } from "@/components/sections/CaseStudiesShowcase";


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
  return <CaseStudiesShowcase />;
}

}
