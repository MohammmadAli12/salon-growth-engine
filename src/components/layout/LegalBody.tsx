import { Section } from "./primitives";

export function LegalBody({ sections }: { sections: { t: string; b: string }[] }) {
  return (
    <Section>
      <div className="mx-auto grid max-w-3xl gap-8">
        {sections.map((s, i) => (
          <article key={s.t}>
            <h2 className="font-display text-xl font-bold text-foreground">
              <span className="mr-2 text-muted-foreground numeric">{i + 1}.</span>
              {s.t}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{s.b}</p>
          </article>
        ))}
        <p className="rounded-lg border border-border/70 bg-card p-5 text-sm leading-6 text-muted-foreground">
          Questions about this document? Write to hello@salongenie.com and we'll respond within one
          working day.
        </p>
      </div>
    </Section>
  );
}
