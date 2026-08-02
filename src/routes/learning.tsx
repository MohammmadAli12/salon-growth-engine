import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { LearningPreview } from "@/components/sections/CommunityLearning";
import { Section, SectionHeading } from "@/components/layout/primitives";
import { CtaBand } from "@/components/sections/CtaBand";

export const Route = createFileRoute("/learning")({
  head: () => ({
    meta: [
      { title: "Salon Marketing Courses & Training | Salunnn Learning" },
      {
        name: "description",
        content:
          "Practical courses for salon owners and teams: marketing foundations, Instagram, front-desk retention and hiring.",
      },
      { property: "og:title", content: "Salon Marketing Courses & Training | Salunnn Learning" },
      {
        property: "og:description",
        content: "Short, practical lessons drawn from campaigns we've run for real salons.",
      },
      { property: "og:url", content: "/learning" },
    ],
    links: [{ rel: "canonical", href: "/learning" }],
  }),
  component: Learning,
});

function Learning() {
  return (
    <>
      <PageHeader
        eyebrow="Learning"
        title="Training your whole team can finish"
        description="Every lesson is under ten minutes and ends with something you can do in the salon the same day."
      />
      <LearningPreview heading={false} />
      <Section className="bg-card">
        <SectionHeading
          eyebrow="Included with every plan"
          title="Clients get the full library free"
          description="If we manage your marketing, your owners, managers and stylists get unlimited access to every course and future release."
        />
      </Section>
      <CtaBand />
    </>
  );
}
