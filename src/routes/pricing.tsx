import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Salunnn Pricing — Salon Marketing Packages" },
      {
        name: "description",
        content:
          "Transparent packages for salon websites, SEO, Google Ads, Instagram Ads and WhatsApp automation. Starting from ₹5,000.",
      },
      { property: "og:title", content: "Salunnn Pricing — Salon Marketing Packages" },
      {
        property: "og:description",
        content: "Basic, Standard and Premium growth packages for salons.",
      },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: Pricing,
});

function Pricing() {
  return (
    <PageShell
      eyebrow="Pricing"
      title="Clear packages, no surprises"
      description="Basic, Standard and Premium tiers across every service in the marketplace."
    />
  );
}
