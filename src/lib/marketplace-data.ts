/**
 * Marketplace catalog + per-service detail content.
 * Prices are intentionally NOT defined here — package tables are filled
 * from the owner-supplied pricing table only.
 */

import type { AccentName } from "./site-data";

export interface ServiceCategory {
  id: string;
  label: string;
  description: string;
}

export const serviceCategories: ServiceCategory[] = [
  { id: "web", label: "Web & Booking", description: "Your salon's storefront and booking engine." },
  { id: "search", label: "Search & Discovery", description: "Get found by clients nearby." },
  { id: "ads", label: "Paid Growth", description: "Buy demand when the calendar needs filling." },
  { id: "automation", label: "Automation & AI", description: "Follow up and rebook without lifting a finger." },
  { id: "brand", label: "Brand & Content", description: "Look as premium as your work." },
];

export interface PackageTable {
  /** Exactly three package columns, in owner order. */
  columns: string[];
  /** Comparison rows: label + one cell per column. */
  rows: { label: string; cells: string[] }[];
  /** Price row, taken verbatim from the owner pricing table. */
  prices?: string[] | undefined;
}

export interface ServiceDetail {
  slug: string;
  category: string;
  tagline: string;
  intro: string;
  why: string;
  benefits: { title: string; body: string }[];
  process: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  packages?: PackageTable | undefined;
}

export const serviceDetails: Record<string, ServiceDetail> = {
  website: {
    slug: "website",
    category: "web",
    tagline: "A salon website that books clients while you're at the chair",
    intro:
      "A fast, mobile-first website with online booking built in — designed so a first-time visitor can pick a service, a stylist and a slot in under a minute.",
    why: "Most salon searches happen on a phone, minutes before a decision. If your site is slow, unclear or forces a phone call, that client books elsewhere. Your website is the one asset you own outright — everything else rents attention.",
    benefits: [
      { title: "Bookings, not brochures", body: "Every page is built around one action: reserve a slot." },
      { title: "Loads in under 2 seconds", body: "Speed-tuned pages so mobile visitors never bounce." },
      { title: "Search-ready structure", body: "Service pages, schema and clean URLs Google can rank." },
      { title: "You own everything", body: "Domain, content and analytics stay in your accounts." },
    ],
    process: [
      { title: "Discovery", body: "Services, pricing, stylists and the booking flow you want." },
      { title: "Design", body: "Mobile-first layouts using your brand, reviewed before build." },
      { title: "Build & connect", body: "Pages, booking integration, WhatsApp and analytics." },
      { title: "Launch & tune", body: "Speed pass, tracking check and a walkthrough for your team." },
    ],
    faqs: [
      { q: "How long does a website take?", a: "10–14 days once content and photos are ready." },
      { q: "Can it connect to my existing booking tool?", a: "Yes — we integrate the tool you already use, or set one up." },
      { q: "Who writes the content?", a: "We draft everything from a single onboarding call; you approve it." },
    ],
    packages: {
      columns: ["One Page", "3 Page", "10 Page"],
      rows: [],
    },
  },
  "google-profile": {
    slug: "google-profile",
    category: "search",
    tagline: "Own the map pack in your neighbourhood",
    intro:
      "Full management of your Google Business Profile — the listing that decides whether nearby clients see you or the salon two streets away.",
    why: "Around half of salon discovery now ends on Google Maps, not a website. An optimised, actively posted profile with fresh reviews outranks a dormant one even when the salon is bigger.",
    benefits: [
      { title: "More map-pack calls", body: "Category, service and photo optimisation done properly." },
      { title: "A review engine", body: "Automated review requests after every visit." },
      { title: "Always-fresh listing", body: "Weekly posts, offers and Q&A seeding." },
      { title: "Clear reporting", body: "Calls, direction requests and searches, monthly." },
    ],
    process: [
      { title: "Audit & claim", body: "Verify ownership and fix category, hours and service data." },
      { title: "Optimise", body: "Photos, services, products, attributes and description." },
      { title: "Activate", body: "Review requests, weekly posts and Q&A." },
      { title: "Report", body: "Monthly performance review against calls and bookings." },
    ],
    faqs: [
      { q: "Do I keep ownership of the profile?", a: "Always. We work as a manager on your listing." },
      { q: "Can you remove bad reviews?", a: "Only policy-violating ones can be reported. We focus on out-reviewing them." },
    ],
    packages: { columns: [], rows: [] },
  },
  "local-seo": {
    slug: "local-seo",
    category: "search",
    tagline: "Rank for every \"salon near me\" search that matters",
    intro:
      "Area-by-area local SEO: keyword mapping, location landing pages, citations and technical fixes so each outlet ranks in its own catchment.",
    why: "Local search compounds. Unlike ads, rankings you build this quarter keep sending bookings next year at no extra cost per click.",
    benefits: [
      { title: "Area coverage", body: "A ranking page for every locality you serve." },
      { title: "Consistent citations", body: "Name, address and phone aligned across directories." },
      { title: "No self-competition", body: "Multi-outlet salons stop cannibalising their own rankings." },
      { title: "Rank tracking", body: "Position reports by keyword and locality." },
    ],
    process: [
      { title: "Keyword map", body: "Search demand by service and locality." },
      { title: "On-page", body: "Landing pages, internal links and schema." },
      { title: "Off-page", body: "Citations, directories and local mentions." },
      { title: "Track", body: "Monthly ranking and traffic reporting." },
    ],
    faqs: [
      { q: "How long before rankings move?", a: "Early movement in 4–6 weeks; meaningful gains by month three." },
      { q: "Does this replace Google Profile work?", a: "No — they compound. Profile wins the map, SEO wins the blue links." },
    ],
    packages: { columns: [], rows: [] },
  },
  "google-ads": {
    slug: "google-ads",
    category: "ads",
    tagline: "High-intent search campaigns, measured per booking",
    intro:
      "Search campaigns that appear the moment someone looks for your service, with call and form tracking so every rupee maps to an appointment.",
    why: "Ads are the fastest lever you have: a new service, a quiet month or a new outlet can be filled this week rather than next quarter.",
    benefits: [
      { title: "Buy intent, not reach", body: "Only people actively searching your services." },
      { title: "Cost per booking", body: "Call and form tracking wired to real appointments." },
      { title: "Waste control", body: "Negative keywords and geo-fencing from day one." },
      { title: "Weekly optimisation", body: "Bids, copy and landing pages tuned continuously." },
    ],
    process: [
      { title: "Plan", body: "Services, margins and target cost per booking." },
      { title: "Build", body: "Campaigns, keywords, ad copy and landing page." },
      { title: "Track", body: "Call tracking and conversion setup." },
      { title: "Optimise", body: "Weekly tuning, monthly strategy review." },
    ],
    faqs: [
      { q: "Is ad spend included?", a: "No. Media spend is billed by Google directly so you keep full control." },
      { q: "Who owns the ad account?", a: "You do. We manage it with granted access." },
    ],
    packages: { columns: [], rows: [] },
  },
  "instagram-ads": {
    slug: "instagram-ads",
    category: "ads",
    tagline: "Creative-led campaigns that fill quiet weekdays",
    intro:
      "Offer design, creative production and audience testing on Instagram and Facebook, routed straight into WhatsApp or your booking page.",
    why: "Instagram is where salon decisions are influenced. The salon with better creative and a sharper offer wins the same audience at a lower cost.",
    benefits: [
      { title: "Scroll-stopping creative", body: "Reels and statics produced for the offer, not recycled." },
      { title: "Weekday demand", body: "Campaigns aimed at your emptiest slots." },
      { title: "Direct-to-WhatsApp", body: "Leads land in chat where they convert fastest." },
      { title: "Tested, not guessed", body: "Audience and creative A/B tests every cycle." },
    ],
    process: [
      { title: "Offer design", body: "The hook, the service and the margin that supports it." },
      { title: "Creative", body: "Reels, statics and copy variants." },
      { title: "Launch", body: "Audiences, placements and lead routing." },
      { title: "Iterate", body: "Refresh creative before fatigue sets in." },
    ],
    faqs: [
      { q: "Do you shoot the content?", a: "Yes — or we direct your team with shot lists and templates." },
      { q: "How fast do leads arrive?", a: "Usually within 48 hours of launch." },
    ],
    packages: { columns: [], rows: [] },
  },
  "whatsapp-api": {
    slug: "whatsapp-api",
    category: "automation",
    tagline: "Official WhatsApp for reminders, offers and rebooking",
    intro:
      "A verified WhatsApp Business sender with automated reminders, broadcast offers and a shared inbox your front desk can actually work from.",
    why: "Retention is cheaper than acquisition. A reminder before the visit and a nudge six weeks after lifts repeat bookings without any ad spend.",
    benefits: [
      { title: "Fewer no-shows", body: "Automated confirmations and reminders." },
      { title: "Rebooking on autopilot", body: "Timed nudges based on last service." },
      { title: "Compliant broadcasts", body: "Approved templates on the official API." },
      { title: "One shared inbox", body: "Your whole team answers from one place." },
    ],
    process: [
      { title: "Verify", body: "Business verification and sender setup." },
      { title: "Templates", body: "Reminder, offer and rebooking messages approved." },
      { title: "Automate", body: "Flows connected to your booking data." },
      { title: "Optimise", body: "Timing and copy tuned on reply rates." },
    ],
    faqs: [
      { q: "Is this different from WhatsApp Business app?", a: "Yes — the official API allows automation, broadcasts and multiple agents." },
      { q: "Will messages get flagged?", a: "No, provided templates are approved and opt-outs are honoured. We handle both." },
    ],
    packages: { columns: [], rows: [] },
  },
  "ai-automation": {
    slug: "ai-automation",
    category: "automation",
    tagline: "An AI front desk that never misses an enquiry",
    intro:
      "An AI receptionist that answers calls and chats, qualifies the request and books it into your calendar — including after hours.",
    why: "Most missed bookings are simply missed messages. Answering every enquiry within seconds, at any hour, is the cheapest revenue in the salon.",
    benefits: [
      { title: "24/7 response", body: "Every call and chat answered instantly." },
      { title: "Qualified bookings", body: "Service, stylist and slot captured correctly." },
      { title: "Follow-up sequences", body: "Unbooked enquiries nurtured automatically." },
      { title: "CRM sync", body: "Every conversation logged against the client." },
    ],
    process: [
      { title: "Map", body: "Services, scripts and escalation rules." },
      { title: "Configure", body: "Voice, language and calendar connections." },
      { title: "Pilot", body: "Supervised go-live with transcript review." },
      { title: "Tune", body: "Monthly prompt and flow refinement." },
    ],
    faqs: [
      { q: "Which languages are supported?", a: "English, Hindi and Tamil today, with more rolling out." },
      { q: "Can it hand over to a human?", a: "Yes — any conversation can escalate to your front desk." },
    ],
  },
  branding: {
    slug: "branding",
    category: "brand",
    tagline: "Look as premium as the work you do",
    intro:
      "Identity, photography and reel systems that make your salon read premium across every surface a client sees.",
    why: "Price resistance is usually a presentation problem. Consistent, well-shot brand assets let you hold your rates instead of discounting.",
    benefits: [
      { title: "A real brand kit", body: "Logo, type, colour and usage rules." },
      { title: "Shoot-ready direction", body: "Shot lists and styling for every service." },
      { title: "Reel templates", body: "Reusable formats your team can film." },
      { title: "A content calendar", body: "What to post, when, and why." },
    ],
    process: [
      { title: "Brand audit", body: "Positioning, audience and price perception." },
      { title: "Identity", body: "Visual system and asset kit." },
      { title: "Production", body: "Photo and reel shoot with direction." },
      { title: "Handover", body: "Templates, calendar and team training." },
    ],
    faqs: [
      { q: "Do we get raw files?", a: "Yes — edited assets plus source files are yours." },
      { q: "Is the shoot on location?", a: "At your salon, so the space becomes part of the brand." },
    ],
  },
};
