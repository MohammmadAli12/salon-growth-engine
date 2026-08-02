import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { CommunityPreview } from "@/components/sections/CommunityLearning";
import { Section, SectionHeading } from "@/components/layout/primitives";
import { CtaBand } from "@/components/sections/CtaBand";

const rituals = [
  {
    title: "Weekly owner thread",
    body: "One question, answered by everyone: what moved your bookings this week?",
  },
  { title: "Monthly circle call", body: "Small groups of 8 owners at a similar revenue stage." },
  { title: "Quarterly meetup", body: "In-person sessions in Bengaluru, Pune and Hyderabad." },
  { title: "Playbook library", body: "Offers, scripts and pricing sheets contributed by members." },
];

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Salon Owner Community — Share What Works | Salunnn" },
      {
        name: "description",
        content:
          "Join a community of salon owners: owner circles, playbook swaps, vendor group pricing and quarterly meetups.",
      },
      { property: "og:title", content: "Salon Owner Community — Share What Works | Salunnn" },
      {
        property: "og:description",
        content: "Owner circles, shared playbooks and vendor deals for salon owners.",
      },
      { property: "og:url", content: "/community" },
    ],
    links: [{ rel: "canonical", href: "/community" }],
  }),
  component: Community,
});

function Community() {
  return (
    <>
      <PageHeader
        eyebrow="Community"
        title="You shouldn't have to figure this out alone"
        description="Salunnn's community is where salon owners trade the things that actually worked — pricing, offers, hiring and retention."
      />
      <CommunityPreview />
      <Section>
        <SectionHeading
          eyebrow="How it runs"
          title="Four rituals, no noise"
          description="Structured enough to be useful, small enough to stay honest."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rituals.map((r) => (
            <article key={r.title} className="rounded-lg border border-border/70 bg-card p-5 shadow-soft">
              <h3 className="font-display text-base font-bold text-foreground">{r.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{r.body}</p>
            </article>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
