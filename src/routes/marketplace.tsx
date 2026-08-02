import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";

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
    <PageShell
      eyebrow="Marketplace"
      title="Every service your salon needs"
      description="Websites, Google SEO, local SEO, Google Ads, Instagram Ads, WhatsApp API and AI automation — with clear packages and pricing."
    />
  );
}
