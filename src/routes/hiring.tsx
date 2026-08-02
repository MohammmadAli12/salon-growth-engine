import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/hiring")({
  head: () => ({
    meta: [
      { title: "Salon Hiring — Find Stylists, Beauticians & Managers | Salunnn" },
      {
        name: "description",
        content:
          "Post jobs, search a salon resume database and hire stylists, beauticians, receptionists and managers with an employer dashboard.",
      },
      {
        property: "og:title",
        content: "Salon Hiring — Find Stylists, Beauticians & Managers | Salunnn",
      },
      {
        property: "og:description",
        content: "Hiring tools built for salons: post a job, review applicants, hire faster.",
      },
      { property: "og:url", content: "/hiring" },
    ],
    links: [{ rel: "canonical", href: "/hiring" }],
  }),
  component: Hiring,
});

function Hiring() {
  return (
    <PageShell
      eyebrow="Hiring"
      title="Staff your salon with the right people"
      description="Find staff, post jobs, browse resumes and manage applicants from one dashboard."
    />
  );
}
