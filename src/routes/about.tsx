import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/layout/primitives";
import { CtaBand } from "@/components/sections/CtaBand";
import { stats } from "@/lib/site-data";

const values = [
  { t: "Salons only", b: "We don't take restaurants, gyms or clinics. Depth beats breadth." },
  { t: "Numbers or nothing", b: "Every report leads with bookings and cost per booking." },
  { t: "No lock-in", b: "You own the site, ad accounts and data from day one." },
  { t: "Craft matters", b: "Salons sell aesthetics. Their marketing has to look the part." },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Salunnn — The Salon Growth Team" },
      {
        name: "description",
        content:
          "Salunnn is a salon-only growth platform combining marketing, software, learning, community and hiring for salon owners.",
      },
      { property: "og:title", content: "About Salunnn — The Salon Growth Team" },
      {
        property: "og:description",
        content: "Why we build growth systems exclusively for salons.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="We build growth systems for salons only"
        description="Salunnn started after watching great salons lose clients to worse salons with better marketing. So we built the whole engine — marketing, software, learning, community and hiring — in one place."
      />
      <Section>
        <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-lg border border-border/70 bg-card p-5 shadow-soft">
              <dt className="text-sm text-muted-foreground">{s.label}</dt>
              <dd className="mt-2 font-display text-3xl font-extrabold text-foreground numeric">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </Section>
      <Section className="bg-card">
        <SectionHeading
          eyebrow="How we work"
          title="Four commitments we don't bend"
          description="They cost us some deals. They're the reason clients stay."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {values.map((v) => (
            <article key={v.t} className="rounded-lg border border-border/70 bg-background p-6">
              <h3 className="font-display text-lg font-bold text-foreground">{v.t}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{v.b}</p>
            </article>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
