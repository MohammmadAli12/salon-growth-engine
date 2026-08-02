import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WhySalunnn } from "@/components/sections/WhySalunnn";
import { CaseStudyList } from "@/components/sections/CaseStudyList";
import { AppPreview } from "@/components/sections/AppPreview";
import { CommunityPreview, LearningPreview } from "@/components/sections/CommunityLearning";
import { HiringPreview } from "@/components/sections/HiringPreview";
import { CtaBand } from "@/components/sections/CtaBand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Salunnn — Grow Your Salon with AI & Marketing" },
      {
        name: "description",
        content:
          "AI-powered salon growth platform: websites, Google SEO, local SEO, Instagram and Google Ads, WhatsApp API and automation for salon owners.",
      },
      { property: "og:title", content: "Salunnn — Grow Your Salon with AI & Marketing" },
      {
        property: "og:description",
        content:
          "AI-powered salon growth platform: websites, SEO, ads, WhatsApp API and automation for salon owners.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Salunnn",
          description: "AI-powered salon growth platform.",
          url: "/",
          areaServed: "IN",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <WhySalunnn />
      <CaseStudyList limit={3} />
      <AppPreview />
      <CommunityPreview />
      <LearningPreview />
      <HiringPreview />
      <CtaBand />
    </>
  );
}
