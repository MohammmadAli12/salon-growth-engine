import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers at Salunnn — Build the Salon Growth Platform" },
      {
        name: "description",
        content:
          "Join Salunnn. Open roles across marketing, design, engineering and client growth for an AI-powered salon platform.",
      },
      { property: "og:title", content: "Careers at Salunnn — Build the Salon Growth Platform" },
      { property: "og:description", content: "Open roles and how we work." },
      { property: "og:url", content: "/careers" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: Careers,
});

function Careers() {
  return (
    <PageShell
      eyebrow="Careers"
      title="Build Salunnn with us"
      description="Marketing, design, engineering and client growth roles."
    />
  );
}
