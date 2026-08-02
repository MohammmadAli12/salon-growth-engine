import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/primitives";
import { CtaBand } from "@/components/sections/CtaBand";
import { newsroom } from "@/lib/site-data";

export const Route = createFileRoute("/newsroom")({
  head: () => ({
    meta: [
      { title: "Newsroom — Product & Company Updates | Salunnn" },
      {
        name: "description",
        content:
          "Product releases, company milestones and marketplace updates from the Salunnn salon growth platform.",
      },
      { property: "og:title", content: "Newsroom — Product & Company Updates | Salunnn" },
      {
        property: "og:description",
        content: "What's new in the Salunnn platform, product and marketplace.",
      },
      { property: "og:url", content: "/newsroom" },
    ],
    links: [{ rel: "canonical", href: "/newsroom" }],
  }),
  component: Newsroom,
});

function Newsroom() {
  return (
    <>
      <PageHeader
        eyebrow="Newsroom"
        title="What we shipped and what we learned"
        description="Product releases, marketplace changes and notes from working with salons across five cities."
      />
      <Section>
        <ul className="grid gap-4">
          {newsroom.map((item) => (
            <li
              key={item.title}
              className="rounded-lg border border-border/70 bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-sm bg-indigo/10 px-2.5 py-1 text-[11px] font-semibold text-indigo">
                  {item.tag}
                </span>
                <time className="text-xs text-muted-foreground numeric">{item.date}</time>
              </div>
              <h2 className="mt-3 font-display text-xl font-bold leading-snug text-foreground">
                {item.title}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand />
    </>
  );
}
