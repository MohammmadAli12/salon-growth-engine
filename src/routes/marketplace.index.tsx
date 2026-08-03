import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { MarketplaceCatalog } from "@/components/sections/MarketplaceCatalog";
import { CtaBand } from "@/components/sections/CtaBand";

export const Route = createFileRoute("/marketplace/")({
  head: () => ({
    meta: [
      { title: "Salon Marketing Marketplace — Browse Services | Salunnn" },
      {
        name: "description",
        content:
          "Browse salon growth services: websites, Google Profile, local SEO, Google Ads, Instagram Ads, WhatsApp automation, AI front desk and branding.",
      },
      { property: "og:title", content: "Salon Marketing Marketplace — Browse Services | Salunnn" },
      {
        property: "og:description",
        content: "A product catalog for salon growth. Pick a service, then compare packages.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/marketplace" },
    ],
    links: [{ rel: "canonical", href: "/marketplace" }],
  }),
  component: MarketplaceIndex,
});

function MarketplaceIndex() {
  return (
    <>
      <PageHeader
        eyebrow="Marketplace"
        title="Identify the solution for your salon marketing problem"
        description="Let us manage your complete digital marketing for you — so you can focus on running your salon."
      />

      <MarketplaceCatalog />

      <CtaBand />
    </>
  );
}
