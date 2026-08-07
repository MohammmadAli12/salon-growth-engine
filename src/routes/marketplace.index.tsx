import { createFileRoute } from "@tanstack/react-router";
import { MarketplaceCatalog } from "@/components/sections/MarketplaceCatalog";

export const Route = createFileRoute("/marketplace/")({
  head: () => ({
    meta: [
      { title: "Salon Marketing Marketplace — Browse Services | Salon Genie" },
      {
        name: "description",
        content:
          "Browse salon growth services: websites, Google Profile, local SEO, Google Ads, Instagram Ads and WhatsApp API. Pick a plan and add it to your cart.",
      },
      { property: "og:title", content: "Salon Marketing Marketplace — Browse Services | Salon Genie" },
      {
        property: "og:description",
        content: "A product catalog for salon growth. Pick a service, choose a plan, add to cart.",
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
  return <MarketplaceCatalog />;
}
