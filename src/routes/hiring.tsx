import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { HiringPreview } from "@/components/sections/HiringPreview";
import { Section, SectionHeading } from "@/components/layout/primitives";
import { CtaBand } from "@/components/sections/CtaBand";

export const Route = createFileRoute("/hiring")({
  head: () => ({
    meta: [
      { title: "Salon Jobs & Hiring — Stylists, Therapists, Managers | Salon Genie" },
      {
        name: "description",
        content:
          "Salon job openings across India and hiring support for salon owners: role scoping, pay benchmarks and candidate screening.",
      },
      {
        property: "og:title",
        content: "Salon Jobs & Hiring — Stylists, Therapists, Managers | Salon Genie",
      },
      {
        property: "og:description",
        content: "Open roles at salons on Salon Genie, plus hiring support for owners.",
      },
      { property: "og:url", content: "/hiring" },
    ],
    links: [{ rel: "canonical", href: "/hiring" }],
  }),
  component: Hiring,
});

function Hiring() {
  return (
    <>
      <PageHeader
        eyebrow="Hiring"
        title="Staffing is a growth problem too"
        description="A great campaign is wasted if there's no chair free. We help salons write roles, benchmark pay and screen candidates who actually show up."
      />
      <HiringPreview heading={false} />
      <Section className="bg-card">
        <SectionHeading
          eyebrow="For owners"
          title="Hiring support, not a job board dump"
          description="We publish your role to the Salon Genie network, screen applicants against your service mix, and hand over a shortlist with trial-day notes."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { t: "Role & pay scoping", b: "Benchmarks by city, service mix and experience band." },
            { t: "Screening calls", b: "We speak to every applicant before you see them." },
            { t: "Trial-day structure", b: "A scorecard so trials compare fairly across candidates." },
          ].map((item) => (
            <article key={item.t} className="rounded-lg border border-border/70 bg-background p-5">
              <h3 className="font-display text-base font-bold text-foreground">{item.t}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.b}</p>
            </article>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
