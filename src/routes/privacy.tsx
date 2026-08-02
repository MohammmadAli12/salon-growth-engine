import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { LegalBody } from "@/components/layout/LegalBody";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Salunnn" },
      {
        name: "description",
        content:
          "How Salunnn collects, uses, stores and protects salon and client data across its marketing services and app.",
      },
      { property: "og:title", content: "Privacy Policy | Salunnn" },
      { property: "og:description", content: "Our data collection, use and retention practices." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

const sections = [
  {
    t: "Information we collect",
    b: "Contact details you submit in consultation forms, business information about your salon, and usage data from our website and app. We do not collect payment card details directly — payments are processed by our payment partners.",
  },
  {
    t: "How we use it",
    b: "To respond to enquiries, deliver the services you buy, operate ad and analytics accounts on your behalf, and improve our platform. We never sell your data.",
  },
  {
    t: "Client data in your salon",
    b: "Where we handle your customers' data (bookings, reminders, WhatsApp messages), we act as a processor on your instructions and keep it only as long as the service requires.",
  },
  {
    t: "Third-party services",
    b: "We use Google, Meta and WhatsApp Business platforms to deliver campaigns and messaging. Their handling of data is governed by their own terms.",
  },
  {
    t: "Retention and deletion",
    b: "Enquiry records are kept for 24 months. Service data is deleted or exported to you within 30 days of an engagement ending, on request.",
  },
  {
    t: "Your rights",
    b: "You can request access, correction, export or deletion of your data at any time by writing to hello@salunnn.com.",
  },
];

function Privacy() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy policy"
        description="Last updated 2 August 2026. This policy explains what we collect and why."
      />
      <LegalBody sections={sections} />
    </>
  );
}
