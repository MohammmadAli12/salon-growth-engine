import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppPreview } from "@/components/sections/AppPreview";
import { Section, SectionHeading } from "@/components/layout/primitives";
import { CtaBand } from "@/components/sections/CtaBand";

const modules = [
  { t: "Calendar", b: "Multi-stylist scheduling with WhatsApp confirmations and reminders." },
  { t: "Clients", b: "Visit history, package balances, preferences and lifetime value." },
  { t: "AI front desk", b: "Answers calls and chats, qualifies, books and escalates when needed." },
  { t: "Inventory", b: "Product usage, low-stock alerts and retail margin tracking." },
  { t: "Team", b: "Attendance, commissions and per-stylist revenue reporting." },
  { t: "Insights", b: "Bookings, retention, cost per booking and campaign attribution." },
];

export const Route = createFileRoute("/salunnn")({
  head: () => ({
    meta: [
      { title: "Salon Genie App — Salon Management & AI Front Desk" },
      {
        name: "description",
        content:
          "The Salon Genie app runs bookings, clients, team, inventory and an AI front desk, connected to your marketing performance.",
      },
      { property: "og:title", content: "Salon Genie App — Salon Management & AI Front Desk" },
      {
        property: "og:description",
        content: "Bookings, clients, team, inventory and AI automation in one salon app.",
      },
      { property: "og:url", content: "/salunnn" },
    ],
    links: [{ rel: "canonical", href: "/salunnn" }],
  }),
  component: SalunnnApp,
});

function SalunnnApp() {
  return (
    <>
      <PageHeader
        eyebrow="Salon Genie App"
        title="The operating system for your salon"
        description="Marketing brings people in. The app makes sure they're booked, served, remembered and brought back."
      />
      <AppPreview />
      <Section>
        <SectionHeading
          eyebrow="Modules"
          title="Everything the front desk touches"
          description="Use the whole app or just the parts you need — it works alongside your existing POS."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => (
            <article key={m.t} className="rounded-lg border border-border/70 bg-card p-5 shadow-soft">
              <h3 className="font-display text-base font-bold text-foreground">{m.t}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{m.b}</p>
            </article>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
