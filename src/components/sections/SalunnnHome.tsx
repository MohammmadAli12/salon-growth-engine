import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart-store";

/** Animated count-up number, triggered when scrolled into view. */
function Counter({
  target,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const run = () => {
      const started = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - started) / 1200, 1);
        setValue(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    if (!("IntersectionObserver" in window)) {
      run();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            io.disconnect();
            run();
          }
        }
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return (
    <strong ref={ref}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </strong>
  );
}

const SERVICE_CARDS = [
  {
    title: "Salon Website",
    body: "Fast, bookable websites built to convert walk-in searches into appointments.",
    accent: "#1E5940",
    chip: "#E4EFE7",
    glow: "rgba(30,89,64,.35)",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9s1.3-6.4 3.8-9Z" />
      </>
    ),
  },
  {
    title: "Google Profile SEO",
    body: "Rank in the local map pack so nearby clients find you first.",
    accent: "#2C6E6E",
    chip: "#E4F0EF",
    glow: "rgba(44,110,110,.35)",
    icon: (
      <>
        <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
        <circle cx="12" cy="9.5" r="2.3" />
      </>
    ),
  },
];

const SERVICE_CARDS_ROW2 = [
  {
    title: "Local SEO",
    body: 'Own every "salon near me" search across your service area.',
    accent: "#6B5B95",
    chip: "#EBE7F3",
    glow: "rgba(107,91,149,.35)",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </>
    ),
  },
  {
    title: "Google Ads",
    body: "High-intent search campaigns with cost-per-booking tracked end to end.",
    accent: "#C0703B",
    chip: "#F5E7DD",
    glow: "rgba(192,112,59,.35)",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    title: "Instagram Ads",
    body: "Creative-led campaigns that fill quiet weekdays and new services.",
    accent: "#B14C7C",
    chip: "#F3E4EC",
    glow: "rgba(177,76,124,.35)",
    icon: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2.5" />
        <path d="M8 7l1.4-2.3A1.8 1.8 0 0 1 10.9 4h2.2c.6 0 1.2.3 1.5.8L16 7" />
        <circle cx="12" cy="13.5" r="3.4" />
      </>
    ),
  },
];

const SERVICE_CARDS_ROW3 = [
  {
    title: "WhatsApp API",
    body: "Official WhatsApp automation for reminders, offers and rebooking.",
    accent: "#9A7B1E",
    chip: "#F3ECD8",
    glow: "rgba(154,123,30,.35)",
    icon: <path d="M4 12a8 8 0 1 1 3.2 6.4L4 19.5l1.3-3A7.9 7.9 0 0 1 4 12Z" />,
  },
  {
    title: "AI Automation",
    body: "An AI front desk that answers, qualifies and books while you work.",
    accent: "#B15A3E",
    chip: "#F5E7E0",
    glow: "rgba(177,90,62,.35)",
    icon: (
      <>
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
        <circle cx="12" cy="12" r="4.5" />
      </>
    ),
  },
  {
    title: "Branding & Content",
    body: "Photo, reel and identity systems that make your salon look premium.",
    accent: "#C08B33",
    chip: "#F6EAD1",
    glow: "rgba(192,139,51,.35)",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5a4.5 4.5 0 1 0 4.5 4.5" />
      </>
    ),
  },
];

type Card = (typeof SERVICE_CARDS)[number];

function ServiceCard({ card }: { card: Card }) {
  return (
    <Link
      to="/marketplace"
      className="svc-card"
      style={{ ["--accent" as string]: card.accent }}
    >
      <div
        className="icon-chip"
        style={{
          background: card.chip,
          color: card.accent,
          ["--glow" as string]: card.glow,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {card.icon}
        </svg>
      </div>
      <h3 className="disp">{card.title}</h3>
      <p>{card.body}</p>
      <span className="svc-link">
        View packages <span>→</span>
      </span>
    </Link>
  );
}

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function SalunnnHome() {
  const { cart } = useCart();

  return (
    <div className="home">
      {/* HERO */}
      <section className="home-hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="home-hero-badge">
                <i /> AI-powered salon growth platform
              </div>
              <h1 className="disp">
                Grow your salon
                <br />
                with <em>AI &amp; marketing</em>
              </h1>
              <p>
                More clients, higher revenue, a stronger brand and a business that runs itself.
                Websites, local search, ads, WhatsApp and automation — built and managed for salon
                owners.
              </p>
              <div className="hero-ctas">
                <Link to="/contact" className="btn-primary">
                  Book free consultation <span>→</span>
                </Link>
                <Link to="/marketplace" className="btn-ghost">
                  Explore marketplace
                </Link>
              </div>
              <div className="hero-rating">
                <span className="hero-stars">★★★★★</span> Rated 4.9 by the salon owners we work
                with
              </div>
              {cart.length > 0 ? (
                <Link to="/marketplace" className="hero-nudge">
                  🛒{" "}
                  <span>
                    {cart.length} service{cart.length > 1 ? "s" : ""} in your plan
                  </span>{" "}
                  — continue →
                </Link>
              ) : null}
            </div>

            <div className="mock-card">
              <div className="mock-label">This month</div>
              <div className="mock-num disp">182 bookings</div>
              <div className="mock-delta">+38% vs last month</div>
              <div className="mock-bars">
                {[28, 38, 46, 58, 66, 78, 88, 100].map((h) => (
                  <div key={h} style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="mock-stats">
                <div className="mock-stat">
                  <div className="l">Cost / booking</div>
                  <div className="v">₹41</div>
                </div>
                <div className="mock-stat">
                  <div className="l">Repeat rate</div>
                  <div className="v">64%</div>
                </div>
              </div>
              <div className="mock-float">
                <b>WhatsApp automation</b>27 reminders sent today
              </div>
            </div>
          </div>

          <div className="stats-row">
            {[
              ["Salons onboarded", "20+"],
              ["Client success rate", "100%"],
              ["Avg. booking lift", "3.4x"],
              ["Launch turnaround", "48h"],
            ].map(([l, v]) => (
              <div className="stat-card" key={l}>
                <div className="l">{l}</div>
                <div className="v disp">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARKETPLACE PREVIEW */}
      <section className="section">
        <div className="wrap">
          <div className="eyebrow">Marketplace</div>
          <div className="section-head">
            <h2 className="disp">Complete marketing &amp; growth solutions</h2>
            <p>
              Buy exactly what your salon needs, or bundle it into a managed plan. Every service
              ships with a fixed scope, timeline and reporting.
            </p>
          </div>

          <div className="bento">
            {SERVICE_CARDS.map((c) => (
              <ServiceCard key={c.title} card={c} />
            ))}
          </div>
          <div className="bento-row3">
            {SERVICE_CARDS_ROW2.map((c) => (
              <ServiceCard key={c.title} card={c} />
            ))}
          </div>
          <div className="bento-row3">
            {SERVICE_CARDS_ROW3.map((c) => (
              <ServiceCard key={c.title} card={c} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY SALUNNN */}
      <section className="section" style={{ background: "var(--card)" }}>
        <div className="wrap">
          <div className="why-grid">
            <div>
              <div className="eyebrow">Why Salunnn</div>
              <h2
                className="disp"
                style={{
                  fontSize: "clamp(24px,3vw,32px)",
                  fontWeight: 600,
                  lineHeight: 1.2,
                  marginBottom: 14,
                }}
              >
                One partner for the whole growth engine
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--espresso-soft)",
                  lineHeight: 1.7,
                }}
              >
                Most salons juggle a web developer, an ads freelancer and a content person who never
                talk to each other. We run it as one system, measured on bookings.
              </p>
            </div>
            <div>
              <ul className="timeline">
                {[
                  [
                    "Free consultation",
                    "We audit your salon's digital presence, bookings and local search visibility.",
                  ],
                  [
                    "Growth blueprint",
                    "You get a written plan: services, timeline, spend and the numbers we'll move.",
                  ],
                  [
                    "Build & launch",
                    "Site, profile, ads and automation go live in a single coordinated sprint.",
                  ],
                  [
                    "Optimise monthly",
                    "Weekly reporting, creative refreshes and campaign tuning against booking cost.",
                  ],
                ].map(([title, body], i) => (
                  <li key={title}>
                    <div className="tl-num">{i + 1}</div>
                    <div className="tl-body">
                      <h4>{title}</h4>
                      <p>{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="trust-row">
            {[
              "Salon-only specialisation",
              "Fixed scope, no lock-in",
              "You own every account",
              "Reporting tied to bookings",
            ].map((t) => (
              <div className="trust-badge" key={t}>
                {CHECK}
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="section" style={{ background: "var(--cream-deep)" }}>
        <div className="wrap">
          <div className="preview-head">
            <div className="section-head">
              <div className="eyebrow">Featured success stories</div>
              <h2 className="disp">Proof that feels worth opening</h2>
              <p>
                Three previews from salons that turned searches, offers and reminders into booked
                chairs.
              </p>
            </div>
            <Link to="/case-studies" className="section-foot-link">
              View all success stories <span>→</span>
            </Link>
          </div>

          <div className="story-grid mobile-snap">
            <Link to="/case-studies" className="preview-card story-card featured">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=82"
                alt="Premium salon interior with styled client"
                loading="lazy"
              />
              <div className="preview-body">
                <div className="preview-label">Xing Salon / Bengaluru</div>
                <h3 className="disp preview-title">40 to 180 bookings in 3 months</h3>
                <div className="metrics-rack">
                  <div className="metric-pill">
                    <Counter target={350} prefix="+" suffix="%" />
                    <span>More bookings</span>
                  </div>
                  <div className="metric-pill">
                    <strong>40→180</strong>
                    <span>Monthly bookings</span>
                  </div>
                  <div className="metric-pill">
                    <strong>3 mo</strong>
                    <span>Launch to lift</span>
                  </div>
                </div>
                <div className="preview-cta">
                  View story <span>→</span>
                </div>
              </div>
            </Link>

            <Link to="/case-studies" className="preview-card story-card">
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=82"
                alt="Hair stylist working with a client"
                loading="lazy"
              />
              <div className="preview-body">
                <div className="preview-label">Luxe Studio / Pune</div>
                <h3 className="disp preview-title mini-title">
                  Weekday slots stopped sitting empty
                </h3>
                <div className="metrics-rack">
                  <div className="metric-pill">
                    <Counter target={62} prefix="+" suffix="%" />
                    <span>Weekday revenue</span>
                  </div>
                  <div className="metric-pill">
                    <strong>2.1x</strong>
                    <span>Return clients</span>
                  </div>
                </div>
                <div className="preview-cta">
                  View story <span>→</span>
                </div>
              </div>
            </Link>

            <Link to="/case-studies" className="preview-card story-card">
              <img
                src="https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=900&q=82"
                alt="Modern grooming salon chairs"
                loading="lazy"
              />
              <div className="preview-body">
                <div className="preview-label">The Groom Room / Hyderabad</div>
                <h3 className="disp preview-title mini-title">
                  Three outlets climbed the map pack
                </h3>
                <div className="metrics-rack">
                  <div className="metric-pill">
                    <Counter target={2.4} suffix="x" decimals={1} />
                    <span>Search traffic</span>
                  </div>
                  <div className="metric-pill">
                    <strong>#1</strong>
                    <span>Local rank</span>
                  </div>
                </div>
                <div className="preview-cta">
                  View story <span>→</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* APP PREVIEW */}
      <section className="section" style={{ background: "var(--card)" }}>
        <div className="wrap">
          <div className="app-grid">
            <div>
              <div className="eyebrow">Salunnn app</div>
              <h2
                className="disp"
                style={{
                  fontSize: "clamp(24px,3vw,32px)",
                  fontWeight: 600,
                  lineHeight: 1.2,
                  marginBottom: 14,
                }}
              >
                Run the whole salon from one app
              </h2>
              <p style={{ fontSize: 14, color: "var(--espresso-soft)", lineHeight: 1.7 }}>
                The Salunnn app connects your marketing to your calendar, so every campaign is
                measured against real appointments and revenue.
              </p>
              <ul className="app-bullets">
                <li>Bookings, staff and inventory in one dashboard</li>
                <li>AI receptionist answering calls and WhatsApp</li>
                <li>Client history, packages and loyalty tracking</li>
                <li>Daily revenue and retention reporting</li>
              </ul>
              <Link to="/salunnn" className="section-foot-link">
                Explore the app <span>→</span>
              </Link>
            </div>

            <div className="phone-mock">
              <div className="ph-head">📅 Today</div>
              {[
                ["Aditi S.", "Balayage", "10:00"],
                ["Rahul M.", "Beard sculpt", "11:30"],
                ["Neha P.", "Keratin", "13:00"],
                ["Imran K.", "Fade cut", "15:30"],
              ].map(([name, sub, time]) => (
                <div className="appt-row" key={name}>
                  <div>
                    <div className="appt-name">{name}</div>
                    <div className="appt-sub">{sub}</div>
                  </div>
                  <div className="appt-time">{time}</div>
                </div>
              ))}
              <div className="phone-revenue">
                <div className="l">Revenue today</div>
                <div className="v">₹24,800</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="section">
        <div className="wrap">
          <div className="preview-head">
            <div className="section-head">
              <div className="eyebrow">Community</div>
              <h2 className="disp">A room that already feels in motion</h2>
              <p>Live prompts, owner threads, city meetups and people worth following.</p>
            </div>
            <Link to="/community" className="section-foot-link">
              Join the community <span>→</span>
            </Link>
          </div>

          <div className="community-shell">
            <div className="live-panel">
              <div className="live-badge">
                <i /> LIVE / 23 owners online
              </div>
              <h3 className="disp">
                Today's discussion: holiday offers that do not discount the brand.
              </h3>
              <div className="community-stats">
                <div>
                  <Counter target={1000} suffix="+" />
                  <span>Owners</span>
                </div>
                <div>
                  <Counter target={500} suffix="+" />
                  <span>Stylists</span>
                </div>
                <div>
                  <Counter target={120} />
                  <span>Experts</span>
                </div>
              </div>
              <div className="avatar-row" aria-label="Top contributors">
                {["AK", "MS", "RP", "LV", "+8"].map((a) => (
                  <div className="avatar" key={a}>
                    {a}
                  </div>
                ))}
              </div>
            </div>

            <div className="card-deck mobile-snap">
              {[
                [
                  "Upcoming meetup",
                  "Bangalore Growth Circle",
                  "Aug 15 / salon owners only / 38 seats requested.",
                  "RSVP",
                ],
                [
                  "Recent discussion",
                  "How Xing Salon got 300 bookings",
                  "23 replies, two ad screenshots and one WhatsApp script inside.",
                  "Open thread",
                ],
                [
                  "Upcoming webinar",
                  "Local SEO clinic for salons",
                  "Live profile teardown with a map-pack specialist.",
                  "Save seat",
                ],
                [
                  "Recent success",
                  "Delhi owner fills 43 color slots",
                  "The offer angle, landing page and follow-up sequence are shared.",
                  "See notes",
                ],
              ].map(([meta, title, body, action]) => (
                <Link to="/community" className="community-card" key={title}>
                  <div className="meta">{meta}</div>
                  <h4 className="disp">{title}</h4>
                  <p>{body}</p>
                  <span className="card-action">
                    {action} <span>→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LEARNING */}
      <section className="section" style={{ background: "var(--cream-deep)" }}>
        <div className="wrap">
          <div className="preview-head">
            <div className="section-head">
              <div className="eyebrow">Learning</div>
              <h2 className="disp">One course preview, many doors</h2>
              <p>
                Make the academy feel browsable without turning the homepage into a course catalog.
              </p>
            </div>
            <Link to="/learning" className="section-foot-link">
              Browse academy <span>→</span>
            </Link>
          </div>

          <Link to="/learning" className="academy-feature">
            <div className="academy-visual">
              <img
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1300&q=82"
                alt="Salon team learning around a styling station"
                loading="lazy"
              />
              <div className="book-peek" />
              <div className="play-orb" aria-hidden="true" />
            </div>
            <div className="academy-copy">
              <div className="eyebrow">Most popular</div>
              <h3 className="disp">Salon Marketing Foundations</h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--espresso-soft)" }}>
                A preview lesson on offers, local search and WhatsApp follow-up that owners can use
                this week.
              </p>
              <div className="course-meta">
                <span>4.9 star</span>
                <span>500 students</span>
                <span>12 lessons</span>
              </div>
              <div className="home-progress">
                <i />
              </div>
              <span className="section-foot-link" style={{ marginTop: 0 }}>
                Watch preview <span>→</span>
              </span>
            </div>
          </Link>

          <div className="topic-chips">
            {["AI", "Marketing", "Hiring", "Finance", "WhatsApp", "SEO"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="section" style={{ background: "var(--card)" }}>
        <div className="wrap">
          <div className="preview-head">
            <div className="section-head">
              <div className="eyebrow">Latest insights</div>
              <h2 className="disp">SEO fuel with editorial pull</h2>
              <p>
                Fresh previews that make search traffic useful before visitors ever reach the blog.
              </p>
            </div>
            <Link to="/newsroom" className="section-foot-link">
              Read the blog <span>→</span>
            </Link>
          </div>

          <div className="insight-grid mobile-snap">
            <Link to="/newsroom" className="preview-card insight-card featured">
              <img
                src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=82"
                alt="Stylist creating a premium salon look"
                loading="lazy"
              />
              <div className="preview-body">
                <div className="read-meta">
                  Latest <i /> 5 min read
                </div>
                <h3 className="disp preview-title">
                  How salons double bookings without adding more chairs
                </h3>
                <div className="read-button">
                  Read insight <span>→</span>
                </div>
              </div>
            </Link>
            <Link to="/newsroom" className="preview-card insight-card">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=82"
                alt="Marketing dashboard on a laptop"
                loading="lazy"
              />
              <div className="preview-body">
                <div className="read-meta">
                  Google SEO <i /> 2026 guide
                </div>
                <h3 className="disp preview-title mini-title">
                  What changed in local salon search
                </h3>
                <div className="read-button">
                  Read <span>→</span>
                </div>
              </div>
            </Link>
            <Link to="/newsroom" className="preview-card insight-card">
              <img
                src="https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=900&q=82"
                alt="Phone showing message automation"
                loading="lazy"
              />
              <div className="preview-body">
                <div className="read-meta">
                  WhatsApp automation <i /> 4 min read
                </div>
                <h3 className="disp preview-title mini-title">
                  The reminder flow that brings clients back
                </h3>
                <div className="read-button">
                  Read <span>→</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* HIRING */}
      <section className="section">
        <div className="wrap">
          <div className="preview-head">
            <div className="section-head">
              <div className="eyebrow">Featured jobs</div>
              <h2 className="disp">Roles worth tapping into</h2>
              <p>
                Show salary, city, brand and fit at a glance, then let candidates continue into the
                hiring page.
              </p>
            </div>
            <Link to="/hiring" className="section-foot-link">
              See 210 openings <span>→</span>
            </Link>
          </div>

          <div className="job-grid mobile-snap">
            {[
              {
                logo: "X",
                bg: undefined,
                type: "Full-time",
                role: "Senior Hair Stylist",
                salon: "Xing Salon",
                pay: "Rs 45k/mo",
                city: "Bangalore",
                tags: ["Color", "Luxury clients", "4+ yrs"],
              },
              {
                logo: "L",
                bg: "linear-gradient(135deg,#6B5B95,#C08B33)",
                type: "Full-time",
                role: "Salon Manager",
                salon: "Luxe Studio",
                pay: "Rs 55k/mo",
                city: "Delhi",
                tags: ["Team ops", "Sales", "Inventory"],
              },
              {
                logo: "G",
                bg: "linear-gradient(135deg,#B15A3E,#E0A446)",
                type: "Part-time",
                role: "Skin Therapist",
                salon: "The Groom Room",
                pay: "Rs 30k/mo",
                city: "Hyderabad",
                tags: ["Facials", "Retail", "Weekends"],
              },
            ].map((j) => (
              <div className="job-card" key={j.role}>
                <div className="job-top">
                  <div className="company-logo" style={j.bg ? { background: j.bg } : undefined}>
                    {j.logo}
                  </div>
                  <div className="job-type">{j.type}</div>
                </div>
                <h4 className="disp">{j.role}</h4>
                <div className="salon">{j.salon}</div>
                <div className="job-details">
                  <span>{j.pay}</span>
                  <span>{j.city}</span>
                </div>
                <div className="job-tags">
                  {j.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <Link to="/hiring" className="job-apply">
                  Apply <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="cta-band">
        <div className="wrap">
          <div className="eyebrow">Free 30-minute consultation</div>
          <h2 className="disp">Let's map the next 90 days of your salon's growth</h2>
          <p>
            We'll audit your website, Google profile and booking flow, then show you exactly where
            the next 50 appointments come from. No obligation.
          </p>
          <div className="cta-band-btns">
            <Link to="/contact" className="btn-primary">
              Book consultation
            </Link>
            <Link to="/pricing" className="btn-ghost">
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
