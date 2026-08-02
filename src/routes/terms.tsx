import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Salunnn" },
      {
        name: "description",
        content:
          "The terms that govern use of Salunnn services, marketplace bookings, deliverables and payments.",
      },
      { property: "og:title", content: "Terms & Conditions | Salunnn" },
      { property: "og:description", content: "Service terms, bookings, deliverables and payments." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms & Conditions"
      description="Scope of services, bookings, deliverables, payments and responsibilities."
    />
  );
}
