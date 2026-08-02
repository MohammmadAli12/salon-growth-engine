import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Salunnn — Grow Your Salon with AI & Marketing" },
      {
        name: "description",
        content:
          "AI-powered salon growth platform: websites, Google SEO, local SEO, Instagram and Google Ads, WhatsApp API and automation for salon owners.",
      },
      { property: "og:title", content: "Salunnn — Grow Your Salon with AI & Marketing" },
      {
        property: "og:description",
        content:
          "AI-powered salon growth platform: websites, SEO, ads, WhatsApp API and automation for salon owners.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <PageShell
      eyebrow="AI powered salon growth platform"
      title="Grow Your Salon with AI & Marketing"
      description="We help salons get more clients, increase revenue, build their brand and automate their business. Home sections are being built one at a time — the Navbar is next."
    />
  );
}
