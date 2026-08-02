import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/salunnn")({
  head: () => ({
    meta: [
      { title: "The Salunnn App — AI Assistant, CRM & Booking for Salons" },
      {
        name: "description",
        content:
          "One app for salon owners: AI assistant, booking and CRM, automation, growth tracking and smart reports. Join the beta.",
      },
      { property: "og:title", content: "The Salunnn App — AI Assistant, CRM & Booking for Salons" },
      {
        property: "og:description",
        content: "All-in-one salon platform with AI automation and growth tracking.",
      },
      { property: "og:url", content: "/salunnn" },
    ],
    links: [{ rel: "canonical", href: "/salunnn" }],
  }),
  component: SalunnnPlatform,
});

function SalunnnPlatform() {
  return (
    <PageShell
      eyebrow="The platform"
      title="Everything a salon needs, in one app"
      description="AI assistant, booking and CRM, automation, analytics, growth tracking and smart reports. Roadmap and beta access."
    />
  );
}
