import { createFileRoute } from "@tanstack/react-router";
import { CommunityPortal } from "@/components/sections/CommunityPortal";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Salon Genie Owners Club — Salon Owner Community" },
      {
        name: "description",
        content:
          "Ask questions, share wins and learn what's working from 300+ salon owners: discussions, live chat rooms, meetups and playbooks.",
      },
      { property: "og:title", content: "Salon Genie Owners Club — Salon Owner Community" },
      {
        property: "og:description",
        content: "Discussions, live chat rooms, meetups and playbooks for salon owners.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/community" },
    ],
    links: [{ rel: "canonical", href: "/community" }],
  }),
  component: Community,
});

function Community() {
  return <CommunityPortal />;
}

