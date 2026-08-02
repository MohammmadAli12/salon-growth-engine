import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/layout/primitives";

const openings = [
  { role: "Performance Marketer", team: "Growth", city: "Bengaluru / Remote" },
  { role: "Frontend Engineer", team: "Product", city: "Remote (India)" },
  { role: "Content & Creative Lead", team: "Brand", city: "Bengaluru" },
  { role: "Client Success Manager", team: "Accounts", city: "Pune" },
];

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers at Salunnn — Build the Salon Growth Platform" },
      {
        name: "description",
        content:
          "Open roles at Salunnn across growth, product, brand and client success. Remote-friendly, India-based team.",
      },
      { property: "og:title", content: "Careers at Salunnn — Build the Salon Growth Platform" },
      {
        property: "og:description",
        content: "Join the team building the growth engine for salons.",
      },
      { property: "og:url", content: "/careers" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: Careers,
});

function Careers() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Work on a business you can see change"
        description="Small team, real clients, fast feedback loops. Every hire owns outcomes, not tickets."
      />
      <Section>
        <SectionHeading eyebrow="Open roles" title="Currently hiring" />
        <ul className="mt-10 grid gap-3">
          {openings.map((job) => (
            <li
              key={job.role}
              className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border/70 bg-card p-5 shadow-soft"
            >
              <div>
                <h3 className="font-display text-base font-bold text-foreground">{job.role}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {job.team} · {job.city}
                </p>
              </div>
              <a
                href="mailto:careers@salunnn.com"
                className="text-sm font-semibold text-primary transition-opacity hover:opacity-80"
              >
                Apply via email
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted-foreground">
          Nothing fits? Write to careers@salunnn.com with what you'd want to own.
        </p>
      </Section>
    </>
  );
}
