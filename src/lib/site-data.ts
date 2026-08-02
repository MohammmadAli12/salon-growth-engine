/**
 * Static content for the Salunnn marketing site.
 * All copy lives here so sections stay presentational.
 */

export const primaryNav = [
  { to: "/", label: "Home" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/community", label: "Community" },
  { to: "/learning", label: "Learning" },
  { to: "/hiring", label: "Hiring" },

] as const;

export const moreNav = [
  { to: "/newsroom", label: "Newsroom" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/faqs", label: "FAQs" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
] as const;

export const stats = [
  { value: "20+", label: "Salons onboarded" },
  { value: "100%", label: "Client success rate" },
  { value: "3.4x", label: "Avg. booking lift" },
  { value: "48h", label: "Launch turnaround" },
] as const;

export type AccentName = "indigo" | "violet" | "magenta" | "coral" | "amber" | "lime" | "teal" | "sky";

export interface ServiceItem {
  slug: string;
  title: string;
  blurb: string;
  accent: AccentName;
  icon: string;
  price: string;
  deliverables: string[];
}

export const services: ServiceItem[] = [
  {
    slug: "website",
    title: "Salon Website",
    blurb: "Fast, bookable websites built to convert walk-in searches into appointments.",
    accent: "indigo",
    icon: "Globe",
    price: "From ₹24,999",
    deliverables: ["5–8 page site", "Online booking", "Speed & mobile tuned", "Analytics setup"],
  },
  {
    slug: "google-profile",
    title: "Google Profile SEO",
    blurb: "Rank in the local map pack so nearby clients find you first.",
    accent: "sky",
    icon: "MapPin",
    price: "From ₹9,999/mo",
    deliverables: ["Profile optimisation", "Weekly posts", "Review engine", "Q&A seeding"],
  },
  {
    slug: "local-seo",
    title: "Local SEO",
    blurb: "Own every \"salon near me\" search across your service area.",
    accent: "teal",
    icon: "Search",
    price: "From ₹14,999/mo",
    deliverables: ["Keyword map", "Landing pages", "Citations", "Rank reporting"],
  },
  {
    slug: "google-ads",
    title: "Google Ads",
    blurb: "High-intent search campaigns with cost-per-booking tracked end to end.",
    accent: "violet",
    icon: "Target",
    price: "From ₹12,999/mo",
    deliverables: ["Campaign build", "Call tracking", "Landing page", "Weekly optimisation"],
  },
  {
    slug: "instagram-ads",
    title: "Instagram Ads",
    blurb: "Creative-led campaigns that fill quiet weekdays and new services.",
    accent: "magenta",
    icon: "Instagram",
    price: "From ₹11,999/mo",
    deliverables: ["Creative production", "Audience testing", "Offer design", "Lead routing"],
  },
  {
    slug: "whatsapp-api",
    title: "WhatsApp API",
    blurb: "Official WhatsApp automation for reminders, offers and rebooking.",
    accent: "lime",
    icon: "MessageCircle",
    price: "From ₹7,999/mo",
    deliverables: ["Verified sender", "Reminder flows", "Broadcast templates", "Chat inbox"],
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    blurb: "An AI front desk that answers, qualifies and books while you work.",
    accent: "coral",
    icon: "Sparkles",
    price: "From ₹15,999/mo",
    deliverables: ["AI receptionist", "Follow-up sequences", "CRM sync", "Monthly tuning"],
  },
  {
    slug: "branding",
    title: "Branding & Content",
    blurb: "Photo, reel and identity systems that make your salon look premium.",
    accent: "amber",
    icon: "Palette",
    price: "From ₹19,999",
    deliverables: ["Brand kit", "Shoot direction", "Reel templates", "Content calendar"],
  },
];

export const processSteps = [
  {
    title: "Free consultation",
    body: "We audit your salon's digital presence, bookings and local search visibility.",
  },
  {
    title: "Growth blueprint",
    body: "You get a written plan: services, timeline, spend and the numbers we'll move.",
  },
  {
    title: "Build & launch",
    body: "Site, profile, ads and automation go live in a single coordinated sprint.",
  },
  {
    title: "Optimise monthly",
    body: "Weekly reporting, creative refreshes and campaign tuning against booking cost.",
  },
];

export const caseStudies = [
  {
    slug: "xing-salon",
    name: "Xing Salon",
    city: "Bengaluru",
    headline: "From 40 to 180 monthly bookings in 5 months",
    summary:
      "A premium unisex salon stuck on walk-ins. We rebuilt the site, took over the Google profile and layered WhatsApp rebooking on top.",
    accent: "indigo" as AccentName,
    metrics: [
      { value: "+350%", label: "Online bookings" },
      { value: "₹41", label: "Cost per lead" },
      { value: "4.9★", label: "Google rating" },
    ],
    services: ["Salon Website", "Google Profile SEO", "WhatsApp API"],
  },
  {
    slug: "luxe-studio",
    name: "Luxe Studio",
    city: "Pune",
    headline: "Filled weekday slots with a single Instagram offer engine",
    summary:
      "Weekends were full, Tuesdays were empty. A weekday-only offer campaign plus automated reminders rebalanced the calendar.",
    accent: "magenta" as AccentName,
    metrics: [
      { value: "+62%", label: "Weekday revenue" },
      { value: "2.1x", label: "Return clients" },
      { value: "18d", label: "Payback period" },
    ],
    services: ["Instagram Ads", "AI Automation", "Branding & Content"],
  },
  {
    slug: "the-groom-room",
    name: "The Groom Room",
    city: "Hyderabad",
    headline: "Three outlets, one local SEO system, 2.4x search traffic",
    summary:
      "Multi-location salon competing with itself in search. Dedicated area pages and clean citations lifted every outlet.",
    accent: "teal" as AccentName,
    metrics: [
      { value: "2.4x", label: "Search traffic" },
      { value: "#1", label: "Map pack rank" },
      { value: "+29%", label: "Avg. ticket" },
    ],
    services: ["Local SEO", "Google Ads", "Salon Website"],
  },
];

export const communityHighlights = [
  {
    title: "Owner circles",
    body: "Monthly small-group calls with salon owners at your revenue stage.",
    accent: "violet" as AccentName,
    icon: "Users",
  },
  {
    title: "Playbook swaps",
    body: "Offers, scripts and pricing sheets shared by members who ran them.",
    accent: "sky" as AccentName,
    icon: "BookOpen",
  },
  {
    title: "Vendor deals",
    body: "Group pricing on products, POS, furniture and photography.",
    accent: "amber" as AccentName,
    icon: "Tag",
  },
];

export const courses = [
  {
    title: "Salon Marketing Foundations",
    lessons: 18,
    level: "Beginner",
    body: "Positioning, pricing, local search and the first 100 online bookings.",
    accent: "indigo" as AccentName,
  },
  {
    title: "Instagram for Salons",
    lessons: 22,
    level: "Intermediate",
    body: "Content systems, reel hooks and paid offers that actually fill chairs.",
    accent: "magenta" as AccentName,
  },
  {
    title: "Front Desk & Retention",
    lessons: 14,
    level: "All levels",
    body: "Scripts, rebooking rituals and WhatsApp follow-ups that lift repeat visits.",
    accent: "teal" as AccentName,
  },
  {
    title: "Hiring & Team Growth",
    lessons: 11,
    level: "Advanced",
    body: "Recruit stylists, structure pay and build a bench that scales outlets.",
    accent: "lime" as AccentName,
  },
];

export const jobs = [
  {
    role: "Senior Hair Stylist",
    salon: "Xing Salon",
    city: "Bengaluru",
    type: "Full-time",
    pay: "₹35,000 – ₹55,000",
  },
  {
    role: "Beauty Therapist",
    salon: "Luxe Studio",
    city: "Pune",
    type: "Full-time",
    pay: "₹28,000 – ₹42,000",
  },
  {
    role: "Salon Manager",
    salon: "The Groom Room",
    city: "Hyderabad",
    type: "Full-time",
    pay: "₹45,000 – ₹70,000",
  },
  {
    role: "Nail Artist",
    salon: "Glow Bar",
    city: "Mumbai",
    type: "Part-time",
    pay: "₹18,000 – ₹30,000",
  },
];

export const newsroom = [
  {
    date: "12 Jul 2026",
    tag: "Product",
    title: "Salunnn AI receptionist now answers calls in Hindi and Tamil",
    body: "Multilingual voice booking rolls out to every automation plan at no extra cost.",
  },
  {
    date: "28 Jun 2026",
    tag: "Company",
    title: "20 salons, five cities: what we learned in our first year",
    body: "The playbooks that repeated across every outlet we grew, and the ones that didn't.",
  },
  {
    date: "09 Jun 2026",
    tag: "Marketplace",
    title: "Packaged pricing arrives in the Salunnn marketplace",
    body: "Every service now ships with a fixed scope, timeline and reporting cadence.",
  },
];

export const pricingPlans = [
  {
    name: "Starter",
    price: "₹14,999",
    cadence: "/month",
    body: "For single-chair and new salons finding their first online bookings.",
    features: ["Google Profile SEO", "Review engine", "Monthly report", "WhatsApp reminders"],
    featured: false,
  },
  {
    name: "Growth",
    price: "₹34,999",
    cadence: "/month",
    body: "For established salons ready to run paid acquisition properly.",
    features: [
      "Everything in Starter",
      "Google + Instagram Ads",
      "Landing pages",
      "Content calendar",
      "Bi-weekly strategy call",
    ],
    featured: true,
  },
  {
    name: "Scale",
    price: "Custom",
    cadence: "",
    body: "For multi-outlet groups and chains with a dedicated growth pod.",
    features: [
      "Everything in Growth",
      "Per-outlet local SEO",
      "AI receptionist",
      "Dedicated strategist",
      "Quarterly brand shoot",
    ],
    featured: false,
  },
];

export const faqs = [
  {
    q: "How quickly do we go live?",
    a: "Profile and automation work starts within 48 hours. A full website launch typically takes 10–14 days depending on content readiness.",
  },
  {
    q: "Do you work with single-chair salons?",
    a: "Yes. The Starter plan exists for exactly that stage — the focus is local search and reviews before any ad spend.",
  },
  {
    q: "Is ad spend included in the price?",
    a: "No. Management fees are separate from media spend so you keep full control and visibility of the budget.",
  },
  {
    q: "What happens to my website if we stop working together?",
    a: "You own the site, domain, ad accounts and data. We hand over access with no lock-in.",
  },
  {
    q: "Do you guarantee results?",
    a: "We guarantee scope and reporting, not vanity numbers. Every engagement has agreed targets reviewed monthly, and month-to-month terms after the first 90 days.",
  },
  {
    q: "Can I buy a single service instead of a plan?",
    a: "Yes — every marketplace service can be bought standalone with a fixed scope.",
  },
];
