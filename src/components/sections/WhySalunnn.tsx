import { CheckCircle2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/layout/primitives";
import { processSteps } from "@/lib/site-data";

export function WhySalunnn() {
  return (
    <Section className="bg-card">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="Why Salunnn"
          title="One partner for the whole growth engine"
          description="Most salons juggle a web developer, an ads freelancer and a content person who never talk to each other. We run it as one system, measured on bookings."
        />

        <ol className="relative space-y-8 border-l border-border pl-7">
          {processSteps.map((step, i) => (
            <li key={step.title} className="relative">
              <span className="absolute -left-[38px] flex size-8 items-center justify-center rounded-full bg-gradient-button font-semibold text-primary-foreground numeric text-sm">
                {i + 1}
              </span>
              <h3 className="font-display text-lg font-bold text-foreground">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>

      <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          "Salon-only specialisation",
          "Fixed scope, no lock-in",
          "You own every account",
          "Reporting tied to bookings",
        ].map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 rounded-lg border border-border/70 bg-background p-4"
          >
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal" />
            <span className="text-sm font-medium text-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
