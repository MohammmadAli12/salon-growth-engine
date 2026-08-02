import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Salunnn — Book a Free Salon Growth Consultation" },
      {
        name: "description",
        content:
          "Talk to the Salunnn team. Book a free consultation and get a custom growth plan for your salon.",
      },
      { property: "og:title", content: "Contact Salunnn — Book a Free Salon Growth Consultation" },
      {
        property: "og:description",
        content: "Free consultation, custom growth plan, no obligation.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Book a free consultation"
      description="Tell us about your salon and we'll build the growth plan before you pay anything."
    />
  );
}
