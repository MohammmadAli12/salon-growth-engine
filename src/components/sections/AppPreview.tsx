import { Link } from "@tanstack/react-router";
import { ArrowRight, Smartphone } from "lucide-react";
import { Section, SectionHeading } from "@/components/layout/primitives";

const appFeatures = [
  "Bookings, staff and inventory in one dashboard",
  "AI receptionist answering calls and WhatsApp",
  "Client history, packages and loyalty tracking",
  "Daily revenue and retention reporting",
];

export function AppPreview() {
  return (
    <Section className="bg-card">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Salon Genie App"
            title="Run the whole salon from one app"
            description="The Salon Genie app connects your marketing to your calendar, so every campaign is measured against real appointments and revenue."
          />
          <ul className="mt-8 space-y-3">
            {appFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gradient-button" />
                <span className="text-sm leading-6 text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
          <Link
            to="/salunnn"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
          >
            Explore the app
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mx-auto w-full max-w-[300px] rounded-2xl border border-border/70 bg-background p-4 shadow-float">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-md bg-gradient-marketplace">
              <Smartphone className="size-4 text-primary-foreground" />
            </span>
            <p className="text-sm font-semibold text-foreground">Today</p>
          </div>
          <div className="mt-4 space-y-2.5">
            {[
              { time: "10:00", name: "Aditi S.", service: "Balayage", accent: "bg-indigo/10 text-indigo" },
              { time: "11:30", name: "Rahul M.", service: "Beard sculpt", accent: "bg-teal/10 text-teal" },
              { time: "13:00", name: "Neha P.", service: "Keratin", accent: "bg-magenta/10 text-magenta" },
              { time: "15:30", name: "Imran K.", service: "Fade cut", accent: "bg-amber/10 text-amber" },
            ].map((row) => (
              <div
                key={row.time}
                className="flex items-center justify-between rounded-md bg-card p-3 shadow-soft"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">{row.name}</p>
                  <p className="text-xs text-muted-foreground">{row.service}</p>
                </div>
                <span className={`rounded-sm px-2 py-1 text-[11px] font-semibold numeric ${row.accent}`}>
                  {row.time}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-md bg-gradient-success p-3">
            <p className="text-xs font-semibold text-primary-foreground">Revenue today</p>
            <p className="mt-0.5 font-display text-lg font-extrabold text-primary-foreground numeric">
              ₹24,800
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
