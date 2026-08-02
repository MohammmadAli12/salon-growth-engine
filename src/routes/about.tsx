import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Salunnn — The Salon Growth Team" },
      {
        name: "description",
        content:
          "Salunnn is an AI-powered salon growth platform. We combine marketing, automation and community so salon owners can focus on their craft.",
      },
      { property: "og:title", content: "About Salunnn — The Salon Growth Team" },
      {
        property: "og:description",
        content: "Why we built an end-to-end growth platform for salons.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <PageShell
      eyebrow="About us"
      title="We grow salons for a living"
      description="Data driven, result oriented, end to end. Trusted by 20+ salons with a 100% focus on growth."
    />
  );
}
