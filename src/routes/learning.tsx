import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/learning")({
  head: () => ({
    meta: [
      { title: "Salon Marketing Courses & Guides | Salunnn Learning" },
      {
        name: "description",
        content:
          "Courses, marketing guides, AI tutorials, business tips and certificates that teach salon owners how to grow.",
      },
      { property: "og:title", content: "Salon Marketing Courses & Guides | Salunnn Learning" },
      {
        property: "og:description",
        content: "Learn salon marketing, SEO, branding, hiring and AI — at your own pace.",
      },
      { property: "og:url", content: "/learning" },
    ],
    links: [{ rel: "canonical", href: "/learning" }],
  }),
  component: Learning,
});

function Learning() {
  return (
    <PageShell
      eyebrow="Learning"
      title="Learn how salons actually grow"
      description="Courses, marketing guides, AI tutorials, blogs, business tips and certificates."
    />
  );
}
