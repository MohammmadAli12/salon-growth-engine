import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Salon Case Studies — Real Revenue Growth | Salunnn" },
      {
        name: "description",
        content:
          "See how salons grew revenue with Salunnn: Xing Salon went from ₹2.4L to ₹8L per month through websites, SEO and paid ads.",
      },
      { property: "og:title", content: "Salon Case Studies — Real Revenue Growth | Salunnn" },
      {
        property: "og:description",
        content: "Documented salon growth stories, marketing process and client reviews.",
      },
      { property: "og:url", content: "/case-studies" },
    ],
    links: [{ rel: "canonical", href: "/case-studies" }],
  }),
  component: CaseStudies,
});

function CaseStudies() {
  return (
    <PageShell
      eyebrow="Case studies"
      title="Proof, not promises"
      description="Success stories, client results, our marketing process, before vs after numbers and revenue growth."
    />
  );
}
