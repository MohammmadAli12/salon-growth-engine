// Plain-language marketplace catalog. Every title describes the RESULT,
// never the technology. No jargon (no "SEO", "CRM", "API", "Meta Ads").

export type SimpleTier = {
  id: string;
  label: string;
  price: number;
  priceNote: string;
  period: string;
  features: string[];
  popular?: boolean;
};

export type SimpleService = {
  id: string;
  icon: string; // lucide icon name
  navLabel: string;
  heroTitle: string;
  heroText: string;
  benefits: string[];
  tiers: SimpleTier[];
};

export const SIMPLE_SERVICES: SimpleService[] = [
  {
    id: "more-customers",
    icon: "TrendingUp",
    navLabel: "Get More Customers",
    heroTitle: "Get More Customers Every Month",
    heroText:
      "We do everything for you — website, Google, ads and messages — so new people keep walking into your salon.",
    benefits: [
      "New customers every month",
      "We handle everything for you",
      "Simple monthly report on WhatsApp",
      "No technical work for you",
    ],
    tiers: [
      {
        id: "grow-basic",
        label: "Starter Growth",
        price: 9000,
        priceNote: "₹9,000",
        period: "/month",
        features: [
          "Salon page on Google",
          "8 social media posts",
          "1 small ad campaign",
          "Monthly call with our team",
        ],
      },
      {
        id: "grow-standard",
        label: "Full Growth",
        price: 18000,
        priceNote: "₹18,000",
        period: "/month",
        popular: true,
        features: [
          "Everything in Starter Growth",
          "Google Advertisement",
          "Facebook & Instagram Ads",
          "Automatic WhatsApp messages",
          "16 social media posts",
        ],
      },
      {
        id: "grow-premium",
        label: "Complete Care",
        price: 30000,
        priceNote: "₹30,000",
        period: "/month",
        features: [
          "Everything in Full Growth",
          "Own website with bookings",
          "Photo shoot support",
          "Customer record system",
          "Priority support on WhatsApp",
        ],
      },
    ],
  },
  {
    id: "website",
    icon: "Globe",
    navLabel: "Get a Website",
    heroTitle: "Get Your Own Booking Website",
    heroText: "Get more customers with your own salon website that works on every phone.",
    benefits: [
      "Accept appointments",
      "Show services",
      "Price list",
      "Photo gallery",
      "Call button",
    ],
    tiers: [
      {
        id: "web-basic",
        label: "Basic",
        price: 5000,
        priceNote: "₹5,000",
        period: "one time",
        features: ["1 page website", "Photo gallery", "Call button", "Google map", "Ready in 3 days"],
      },
      {
        id: "web-standard",
        label: "Standard",
        price: 8000,
        priceNote: "₹8,000",
        period: "one time",
        popular: true,
        features: [
          "Online booking system",
          "WhatsApp button",
          "Photo gallery",
          "Google map",
          "Ready in 5 days",
        ],
      },
      {
        id: "web-premium",
        label: "Premium",
        price: 12000,
        priceNote: "₹12,000",
        period: "one time",
        features: [
          "Unlimited pages",
          "Online payments",
          "Online booking",
          "Priority support",
          "Ready in 7 days",
        ],
      },
    ],
  },
  {
    id: "bookings",
    icon: "CalendarCheck",
    navLabel: "Take Online Bookings",
    heroTitle: "Let Customers Book Without Calling",
    heroText:
      "Customers pick a time on their phone. You see every appointment in one simple list.",
    benefits: [
      "No missed appointments",
      "Reminders sent automatically",
      "Works on WhatsApp and Instagram",
      "See your full day in one screen",
    ],
    tiers: [
      {
        id: "book-basic",
        label: "Simple Bookings",
        price: 3000,
        priceNote: "₹3,000",
        period: "one time",
        features: ["Booking page setup", "Your services & prices", "Time slots you choose"],
      },
      {
        id: "book-standard",
        label: "Bookings + Reminders",
        price: 4000,
        priceNote: "₹4,000",
        period: "/month",
        popular: true,
        features: [
          "Everything in Simple Bookings",
          "Appointment reminder messages",
          "Staff wise booking",
          "Monthly booking report",
        ],
      },
      {
        id: "book-premium",
        label: "Bookings + Payments",
        price: 7000,
        priceNote: "₹7,000",
        period: "/month",
        features: [
          "Everything in Bookings + Reminders",
          "Advance payment collection",
          "No-show protection",
          "Priority support",
        ],
      },
    ],
  },
  {
    id: "calls",
    icon: "PhoneCall",
    navLabel: "Get More Calls",
    heroTitle: "Get More Calls From Nearby People",
    heroText:
      "We show your salon to people close to you who are looking for a salon right now.",
    benefits: [
      "Calls from people near your salon",
      "You only pay for real interest",
      "We write and design the ads",
      "Simple weekly update",
    ],
    tiers: [
      {
        id: "calls-google",
        label: "Google Advertisement",
        price: 10000,
        priceNote: "₹10,000",
        period: "per campaign",
        features: [
          "Shown when people search for salons",
          "Call button in the ad",
          "20 days running",
          "Weekly report",
        ],
      },
      {
        id: "calls-social",
        label: "Facebook & Instagram Ads",
        price: 8000,
        priceNote: "₹8,000",
        period: "per campaign",
        popular: true,
        features: [
          "Ads on Facebook & Instagram",
          "Photo and video ads made for you",
          "People near your salon only",
          "Weekly report",
        ],
      },
      {
        id: "calls-lead",
        label: "Call & Enquiry Campaign",
        price: 15000,
        priceNote: "₹15,000",
        period: "/month",
        features: [
          "Google + Facebook + Instagram",
          "Enquiry form campaign",
          "All enquiries sent to your WhatsApp",
          "Daily monitoring",
        ],
      },
    ],
  },
  {
    id: "whatsapp",
    icon: "MessageCircle",
    navLabel: "WhatsApp Messages",
    heroTitle: "Automatic WhatsApp Messages",
    heroText:
      "Your salon replies on its own and reminds customers to come back — even when you are busy.",
    benefits: [
      "Automatic replies",
      "Festival messages",
      "Appointment reminders",
      "Offer messages to old customers",
    ],
    tiers: [
      {
        id: "wa-basic",
        label: "Auto Reply Setup",
        price: 5000,
        priceNote: "₹5,000",
        period: "one time",
        features: [
          "WhatsApp business setup",
          "Automatic reply messages",
          "Price list auto-send",
          "Welcome message",
        ],
      },
      {
        id: "wa-standard",
        label: "Monthly Messages",
        price: 5000,
        priceNote: "₹5,000",
        period: "/month",
        popular: true,
        features: [
          "1000 messages every month",
          "Festival & offer messages",
          "Appointment reminders",
          "Delivery report",
        ],
      },
      {
        id: "wa-premium",
        label: "Big Salon Plan",
        price: 10000,
        priceNote: "₹10,000",
        period: "/month",
        features: [
          "Messages to 5000 customers",
          "Fully automatic follow-ups",
          "Birthday & anniversary wishes",
          "Simple results dashboard",
        ],
      },
    ],
  },
  {
    id: "google",
    icon: "MapPin",
    navLabel: "Show My Salon on Google",
    heroTitle: "Show Your Salon on Google",
    heroText:
      'When someone searches "salon near me", your salon appears with photos, timings and a call button.',
    benefits: [
      "Put my salon on Google Maps",
      "Photos and timings added",
      "Direction and call buttons",
      "Get more Google customers",
    ],
    tiers: [
      {
        id: "gmb-setup",
        label: "Google Maps Setup",
        price: 3000,
        priceNote: "₹3,000",
        period: "one time",
        features: ["Salon added on Google Maps", "Photos & timings", "Verification done for you"],
      },
      {
        id: "gmb-monthly",
        label: "Monthly Google Ranking",
        price: 5000,
        priceNote: "₹5,000",
        period: "/month",
        popular: true,
        features: [
          "Review management",
          "New photos every month",
          "Better ranking on Maps",
          "Monthly report",
        ],
      },
      {
        id: "gmb-premium",
        label: "Top of Google Plan",
        price: 8000,
        priceNote: "₹8,000",
        period: "/month",
        features: [
          "Everything in Monthly Ranking",
          "Salon listed on 100+ places online",
          "Offer posts on Google",
          "Priority support",
        ],
      },
    ],
  },
  {
    id: "instagram",
    icon: "Instagram",
    navLabel: "Instagram Promotion",
    heroTitle: "Look Great on Instagram",
    heroText:
      "We design your posts and reels so people trust your salon before they even walk in.",
    benefits: [
      "Beautiful posts made for you",
      "Reels from your salon photos",
      "Posted on time every week",
      "More followers and enquiries",
    ],
    tiers: [
      {
        id: "ig-basic",
        label: "Basic Posting",
        price: 4000,
        priceNote: "₹4,000",
        period: "/month",
        features: ["8 posts a month", "Captions written for you", "Simple monthly plan"],
      },
      {
        id: "ig-standard",
        label: "Posts + Reels",
        price: 7000,
        priceNote: "₹7,000",
        period: "/month",
        popular: true,
        features: ["16 posts a month", "4 reels a month", "Story posts", "Reply to comments"],
      },
      {
        id: "ig-premium",
        label: "Full Instagram Care",
        price: 12000,
        priceNote: "₹12,000",
        period: "/month",
        features: [
          "Daily posting",
          "8 reels a month",
          "Facebook & Instagram Ads setup",
          "Monthly growth report",
        ],
      },
    ],
  },
  {
    id: "branding",
    icon: "Palette",
    navLabel: "Logo & Branding",
    heroTitle: "A Logo Your Salon Deserves",
    heroText: "A clean logo, board design and signage look that makes your salon feel premium.",
    benefits: [
      "New logo design",
      "Visiting card & price list",
      "Shop board design",
      "Colours that suit your salon",
    ],
    tiers: [
      {
        id: "brand-basic",
        label: "Logo Only",
        price: 3000,
        priceNote: "₹3,000",
        period: "one time",
        features: ["2 logo options", "Final files for print", "Ready in 3 days"],
      },
      {
        id: "brand-standard",
        label: "Logo + Print Kit",
        price: 6000,
        priceNote: "₹6,000",
        period: "one time",
        popular: true,
        features: ["3 logo options", "Visiting card design", "Price list design", "Shop board design"],
      },
      {
        id: "brand-premium",
        label: "Complete Look",
        price: 10000,
        priceNote: "₹10,000",
        period: "one time",
        features: [
          "Everything in Print Kit",
          "Uniform & bill book design",
          "Instagram design style",
          "Full brand guide",
        ],
      },
    ],
  },
  {
    id: "reviews",
    icon: "Star",
    navLabel: "Customer Reviews",
    heroTitle: "Get More 5-Star Reviews",
    heroText:
      "Happy customers leave reviews on their own, and we reply to every review politely for you.",
    benefits: [
      "More 5-star reviews",
      "Bad reviews handled properly",
      "Review link and QR code",
      "More trust from new customers",
    ],
    tiers: [
      {
        id: "rev-basic",
        label: "Review Setup",
        price: 2000,
        priceNote: "₹2,000",
        period: "one time",
        features: ["Review link & QR code", "Counter display design", "Staff guide"],
      },
      {
        id: "rev-standard",
        label: "Monthly Review Care",
        price: 3500,
        priceNote: "₹3,500",
        period: "/month",
        popular: true,
        features: [
          "Review requests sent to customers",
          "Replies to every review",
          "Bad review handling",
          "Monthly report",
        ],
      },
    ],
  },
  {
    id: "records",
    icon: "Users",
    navLabel: "Customer Records",
    heroTitle: "Customer Record System",
    heroText:
      "Keep every customer's name, number, service and last visit in one simple place — no notebooks.",
    benefits: [
      "All customer details in one place",
      "See who has not visited in 2 months",
      "Send offers to old customers",
      "Works on your phone",
    ],
    tiers: [
      {
        id: "crm-basic",
        label: "Setup",
        price: 4000,
        priceNote: "₹4,000",
        period: "one time",
        features: ["System setup for your salon", "Old records added", "Staff training call"],
      },
      {
        id: "crm-standard",
        label: "Monthly Plan",
        price: 2500,
        priceNote: "₹2,500",
        period: "/month",
        popular: true,
        features: [
          "Unlimited customers",
          "Visit history & reminders",
          "Offer messages to old customers",
          "Support on WhatsApp",
        ],
      },
    ],
  },
];
