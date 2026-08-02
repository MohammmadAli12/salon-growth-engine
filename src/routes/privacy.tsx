import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Salunnn" },
      {
        name: "description",
        content:
          "How Salunnn collects, uses, stores and protects the data of salon owners and website visitors.",
      },
      { property: "og:title", content: "Privacy Policy | Salunnn" },
      { property: "og:description", content: "Our data collection and protection practices." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      description="What we collect, why we collect it and how it is protected."
    />
  );
}
