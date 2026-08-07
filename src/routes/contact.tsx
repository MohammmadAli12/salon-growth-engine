import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/primitives";
import { services } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book a Free Salon Growth Consultation | Salon Genie" },
      {
        name: "description",
        content:
          "Book a free 30-minute consultation: we audit your salon website, Google profile and booking flow and map the next 90 days.",
      },
      { property: "og:title", content: "Book a Free Salon Growth Consultation | Salon Genie" },
      {
        property: "og:description",
        content: "Tell us about your salon and we'll come back within one working day.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const inputClass =
  "h-14 w-full rounded-md border border-input bg-card px-4 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Book your free consultation"
        description="Thirty minutes, no pitch deck. We look at your salon's current setup and tell you what we'd do first."
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {sent ? (
            <div className="flex flex-col items-start gap-3 rounded-lg border border-border/70 bg-card p-8 shadow-soft">
              <CheckCircle2 className="size-8 text-teal" />
              <h2 className="font-display text-xl font-bold text-foreground">Request received</h2>
              <p className="text-sm leading-6 text-muted-foreground">
                Thanks — we'll reply within one working day to schedule your consultation. For
                anything urgent, WhatsApp us on +91 90000 00000.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-2 text-sm font-semibold text-primary hover:opacity-80"
              >
                Send another request
              </button>
            </div>
          ) : (
            <form
              className="grid gap-4 rounded-lg border border-border/70 bg-card p-6 shadow-soft md:p-8"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-foreground">Your name</span>
                  <input required name="name" className={inputClass} placeholder="Priya Sharma" />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-foreground">Salon name</span>
                  <input required name="salon" className={inputClass} placeholder="Xing Salon" />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-foreground">Phone / WhatsApp</span>
                  <input
                    required
                    name="phone"
                    type="tel"
                    className={inputClass}
                    placeholder="+91 90000 00000"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-foreground">Email</span>
                  <input
                    required
                    name="email"
                    type="email"
                    className={inputClass}
                    placeholder="you@salon.com"
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">What do you need first?</span>
                <select name="service" className={inputClass} defaultValue="">
                  <option value="" disabled>
                    Select a service
                  </option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.title}
                    </option>
                  ))}
                  <option value="not-sure">Not sure yet</option>
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">Anything else?</span>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full rounded-md border border-input bg-card p-4 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Outlets, city, current monthly bookings…"
                />
              </label>

              <button
                type="submit"
                className="h-14 w-full rounded-md bg-gradient-button text-base font-semibold text-primary-foreground shadow-soft transition-all duration-300 hover:shadow-card hover:brightness-110"
              >
                Request consultation
              </button>
              <p className="text-xs text-muted-foreground">
                We reply within one working day. No spam, ever.
              </p>
            </form>
          )}

          <aside className="grid gap-3 self-start">
            {[
              { icon: Mail, label: "Email", value: "hello@salongenie.com" },
              { icon: Phone, label: "WhatsApp", value: "+91 90000 00000" },
              { icon: MapPin, label: "Office", value: "Indiranagar, Bengaluru" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 rounded-lg border border-border/70 bg-card p-5 shadow-soft"
              >
                <span className="flex size-10 items-center justify-center rounded-md bg-indigo/10">
                  <item.icon className="size-5 text-indigo" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-semibold text-foreground">{item.value}</p>
                </div>
              </div>
            ))}
            <div className="rounded-lg bg-gradient-hero p-5 shadow-card">
              <p className="text-sm font-semibold text-primary-foreground">Consultation slots</p>
              <p className="mt-1 text-sm leading-6 text-primary-foreground/85">
                Mon–Sat, 10am–7pm IST. Salons open late? We take calls until 9pm on request.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
