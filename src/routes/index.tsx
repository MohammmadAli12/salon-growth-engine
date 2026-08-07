import { createFileRoute } from "@tanstack/react-router";
import { SalunnnHome } from "@/components/sections/SalunnnHome";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Salon Genie — Grow Your Salon with AI & Marketing" },
      {
        name: "description",
        content:
          "AI-powered salon growth platform: websites, Google SEO, local SEO, Instagram and Google Ads, WhatsApp API and automation for salon owners.",
      },
      { property: "og:title", content: "Salon Genie — Grow Your Salon with AI & Marketing" },
      {
        property: "og:description",
        content:
          "AI-powered salon growth platform: websites, SEO, ads, WhatsApp API and automation for salon owners.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Salon Genie",
          description: "AI-powered salon growth platform.",
          url: "/",
          areaServed: "IN",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <SalunnnHome />;
}
