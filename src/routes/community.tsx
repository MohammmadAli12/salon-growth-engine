import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Salon Owners Community — Discussions & Events | Salunnn" },
      {
        name: "description",
        content:
          "Join 1000+ salon owners. Discussions, groups, events, expert advice and networking built for the beauty industry.",
      },
      { property: "og:title", content: "Salon Owners Community — Discussions & Events | Salunnn" },
      {
        property: "og:description",
        content: "Share, learn and grow together with salon owners across India.",
      },
      { property: "og:url", content: "/community" },
    ],
    links: [{ rel: "canonical", href: "/community" }],
  }),
  component: Community,
});

function Community() {
  return (
    <PageShell
      eyebrow="Community"
      title="Join 1000+ salon owners"
      description="Discussions, groups, events and webinars, expert advice and networking."
    />
  );
}
