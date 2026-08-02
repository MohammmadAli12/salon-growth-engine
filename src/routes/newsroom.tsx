import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/newsroom")({
  head: () => ({
    meta: [
      { title: "Salon Marketing News & Platform Updates | Salunnn Newsroom" },
      {
        name: "description",
        content:
          "Marketing news, Google and Instagram algorithm updates, AI news, industry insights and Salunnn product updates.",
      },
      {
        property: "og:title",
        content: "Salon Marketing News & Platform Updates | Salunnn Newsroom",
      },
      {
        property: "og:description",
        content: "What changed this week in Google, Instagram, AI and salon marketing.",
      },
      { property: "og:url", content: "/newsroom" },
    ],
    links: [{ rel: "canonical", href: "/newsroom" }],
  }),
  component: Newsroom,
});

function Newsroom() {
  return (
    <PageShell
      eyebrow="Newsroom"
      title="What changed, and what it means for your salon"
      description="Marketing news, Google updates, Instagram updates, AI news and industry insights."
    />
  );
}
