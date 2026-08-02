import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { LegalBody } from "@/components/layout/LegalBody";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Salunnn" },
      {
        name: "description",
        content:
          "The terms governing Salunnn marketing services, marketplace purchases, the Salunnn app, billing and account ownership.",
      },
      { property: "og:title", content: "Terms of Service | Salunnn" },
      { property: "og:description", content: "Service scope, billing, ownership and termination." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

const sections = [
  {
    t: "Services and scope",
    b: "Each engagement is defined by a written scope covering deliverables, timeline and reporting. Work outside that scope is quoted separately before it starts.",
  },
  {
    t: "Fees and media spend",
    b: "Management fees are invoiced monthly in advance and are separate from advertising spend, which is billed to you directly by the ad platforms.",
  },
  {
    t: "Client responsibilities",
    b: "You provide timely access to accounts, brand assets and approvals. Delays in these may shift agreed timelines.",
  },
  {
    t: "Ownership",
    b: "You own your domain, website, ad accounts, creative assets and data. We retain no rights over them after an engagement ends.",
  },
  {
    t: "Term and termination",
    b: "The first 90 days are committed; after that either party may end the engagement with 30 days' written notice. We hand over all access at exit.",
  },
  {
    t: "Limitation of liability",
    b: "We guarantee delivery of agreed scope and reporting. We do not guarantee specific revenue outcomes, and our liability is limited to fees paid in the preceding three months.",
  },
];

function Terms() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of service"
        description="Last updated 2 August 2026. These terms apply to all Salunnn services and marketplace purchases."
      />
      <LegalBody sections={sections} />
    </>
  );
}
