import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Check,
  ShoppingBag,
  ShieldCheck,
  HeadphonesIcon,
  Truck,
  X,
  ArrowRight,
} from "lucide-react";
import { useCart, inr } from "@/lib/cart-store";
import imgWebsite from "@/assets/goals/website.jpg";
import imgBookings from "@/assets/goals/bookings.jpg";
import imgCalls from "@/assets/goals/calls.jpg";
import imgWhatsapp from "@/assets/goals/whatsapp.jpg";
import imgGoogle from "@/assets/goals/google.jpg";
import imgInstagram from "@/assets/goals/instagram.jpg";
import imgCustomers from "@/assets/goals/customers.jpg";
import imgReviews from "@/assets/goals/reviews.jpg";
import { SIMPLE_SERVICES, type SimpleService, type SimpleTier } from "@/lib/marketplace-simple";

/** Goal-first mobile marketplace: users choose an outcome, not a technology. */
type Goal = {
  serviceId: string;
  emoji: string;
  title: string;
  desc: string;
  sheetTitle: string;
  keywords: string[];
};

const GOALS: Goal[] = [
  {
    serviceId: "more-customers",
    emoji: "🎯",
    title: "I Want More Customers",
    desc: "We bring new people into your salon every month.",
    sheetTitle: "Get More Customers",
    keywords: ["customers", "growth", "marketing", "sales"],
  },
  {
    serviceId: "website",
    emoji: "🌐",
    title: "I Need a Website",
    desc: "Take online bookings and show your salon online.",
    sheetTitle: "Get a Website",
    keywords: ["website", "site", "online", "web"],
  },
  {
    serviceId: "bookings",
    emoji: "📅",
    title: "I Want Online Bookings",
    desc: "Customers pick a time without calling you.",
    sheetTitle: "Take Online Bookings",
    keywords: ["bookings", "booking", "appointments", "calendar"],
  },
  {
    serviceId: "calls",
    emoji: "📞",
    title: "I Need More Calls",
    desc: "Nearby people find you and call your salon.",
    sheetTitle: "Get More Calls",
    keywords: ["calls", "phone", "leads", "ads"],
  },
  {
    serviceId: "whatsapp",
    emoji: "💬",
    title: "I Want WhatsApp Messages",
    desc: "Reminders and offers sent automatically.",
    sheetTitle: "WhatsApp Messages",
    keywords: ["whatsapp", "messages", "reminders", "chat"],
  },
  {
    serviceId: "google",
    emoji: "📍",
    title: "I Want My Salon on Google",
    desc: "Show up on Google Maps and search.",
    sheetTitle: "Show My Salon on Google",
    keywords: ["google", "maps", "location", "search"],
  },
  {
    serviceId: "instagram",
    emoji: "📸",
    title: "I Want More Instagram Customers",
    desc: "Posts and reels that bring bookings.",
    sheetTitle: "Instagram Promotion",
    keywords: ["instagram", "social", "reels", "posts"],
  },
  {
    serviceId: "reviews",
    emoji: "⭐",
    title: "I Want More Reviews",
    desc: "Collect more 5-star reviews from happy customers.",
    sheetTitle: "Get More Reviews",
    keywords: ["reviews", "rating", "stars", "feedback"],
  },
];

/** Per-goal art, category accent (palette tokens only) and audience chips. */
const META: Record<
  string,
  { img: string; accent: string; audience: string[]; pills?: string[] }
> = {
  website: {
    img: imgWebsite,
    accent: "--forest",
    audience: ["New Salon", "Home Salon", "Beauty Studio"],
    pills: ["Online Booking", "Google Maps", "WhatsApp Button"],
  },
  bookings: {
    img: imgBookings,
    accent: "--teal",
    audience: ["Busy Salon", "Spa", "Multi-staff"],
    pills: ["24/7 Bookings", "Fewer No-shows", "Saves Time"],
  },
  calls: { img: imgCalls, accent: "--rust", audience: ["Local Salon", "New Area"] },
  whatsapp: { img: imgWhatsapp, accent: "--forest-light", audience: ["Repeat Clients"] },
  google: { img: imgGoogle, accent: "--gold", audience: ["Walk-in Salon"] },
  instagram: { img: imgInstagram, accent: "--plum", audience: ["Studio", "Makeup Artist"] },
  reviews: { img: imgReviews, accent: "--gold-deep", audience: ["Every Salon"] },
  "more-customers": { img: imgCustomers, accent: "--olive", audience: ["Growing Salon"] },
};

const STEPS = ["Goal", "Plan", "Checkout"] as const;

function StepBar({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2 rounded-[20px] border border-border bg-card px-4 py-3">
      {STEPS.map((label, i) => (
        <div key={label} className="flex min-w-0 flex-1 items-center gap-2">
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${
              i <= step
                ? "bg-gradient-button text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {i < step ? <Check className="h-3.5 w-3.5" strokeWidth={2.6} /> : i + 1}
          </span>
          <span
            className={`truncate text-[13px] font-semibold ${
              i <= step ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {label}
          </span>
          {i < STEPS.length - 1 && (
            <span className="h-px min-w-3 flex-1 bg-border" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
}

const svc = (id: string) => SIMPLE_SERVICES.find((s) => s.id === id);

export function MobileGoalMarketplace() {
  const [query, setQuery] = useState("");
  const [openGoal, setOpenGoal] = useState<Goal | null>(null);
  const { cart, addItem, showToast, setCartOpen, total } = useCart();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return GOALS;
    return GOALS.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.desc.toLowerCase().includes(q) ||
        g.keywords.some((k) => k.includes(q)),
    );
  }, [query]);

  const FEATURED_IDS = ["website", "bookings"];
  const featured = results.filter((g) => FEATURED_IDS.includes(g.serviceId));
  const rest = results.filter((g) => !FEATURED_IDS.includes(g.serviceId));



  useEffect(() => {
    document.body.style.overflow = openGoal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openGoal]);

  const service = openGoal ? svc(openGoal.serviceId) : undefined;

  const handleAdd = (s: SimpleService, t: SimpleTier) => {
    addItem({
      serviceId: `${s.id}:${t.id}`,
      name: openGoal?.sheetTitle ?? s.heroTitle,
      tier: t.label,
      price: t.price,
      period: t.period,
    });
    showToast(`Added ${t.label}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Pinned search */}
      <div className="sticky top-16 z-40 border-b border-border/70 bg-card/80 px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <div className="relative min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              strokeWidth={1.8}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search anything..."
              aria-label="Search goals"
              className="h-12 w-full rounded-full border border-border bg-background pr-4 pl-11 text-[16px] text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
            />
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Open cart, ${cart.length} items`}
            className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-button text-primary-foreground shadow-card transition duration-200 active:scale-95"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.8} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-forest-light px-1 text-[10px] font-bold text-primary-foreground">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Auto-scrolling service ribbon */}
      <div className="border-b border-border/70 bg-card/50">
        <div
          className="relative overflow-hidden py-2.5"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
          }}
        >
          <div className="service-marquee flex w-max gap-2">
            {[...GOALS, ...GOALS].map((g, i) => {
              const m = META[g.serviceId];
              return (
                <button
                  key={`${g.serviceId}-${i}`}
                  type="button"
                  onClick={() => setOpenGoal(g)}
                  className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-[12.5px] font-medium whitespace-nowrap text-foreground/85 shadow-soft active:scale-95"
                  style={{ borderColor: `color-mix(in oklab, var(${m?.accent ?? "--forest"}) 30%, transparent)` }}
                >
                  <span aria-hidden>{g.emoji}</span>
                  {g.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-4 pt-5 pb-40">
        <StepBar step={0} />

        <h1 className="mt-5 text-[26px] leading-tight">👋 Welcome! What do you want today?</h1>
        <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
          Pick a goal. We will show you simple plans — no technical words.
        </p>

        {featured.length > 0 && (
          <>
            <h2 className="mt-7 flex items-center gap-2 text-[15px] font-semibold tracking-wide text-foreground uppercase">
              ⭐ Recommended for you
            </h2>
            <div className="mt-3 space-y-4">
              {featured.map((g, i) => {
                const m = META[g.serviceId];
                const s = svc(g.serviceId);
                const pills = m?.pills ?? s?.benefits.slice(0, 3) ?? [];
                return (
                  <button
                    key={g.serviceId}
                    type="button"
                    onClick={() => setOpenGoal(g)}
                    style={{ borderLeftColor: `var(${m?.accent ?? "--forest"})` }}
                    className="block w-full overflow-hidden rounded-[26px] border border-l-[5px] border-border bg-gradient-to-b from-accent/70 via-card to-card p-0 text-left shadow-card transition-all duration-200 active:scale-[0.985]"
                  >
                    <span className="relative block aspect-[16/9] w-full overflow-hidden">
                      <img
                        src={m?.img}
                        alt={g.title}
                        loading={i === 0 ? "eager" : "lazy"}
                        className="h-full w-full object-cover"
                      />
                      <span style={{ position: "absolute", top: 12, left: 12 }} className="rounded-full bg-gradient-button px-3 py-1 text-[11px] font-bold tracking-wide text-primary-foreground uppercase">
                        {i === 0 ? "Most Popular" : "Salon Favourite"}
                      </span>
                      <span style={{ position: "absolute", bottom: 12, left: 12 }} className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-card text-[22px] shadow-card">
                        {g.emoji}
                      </span>
                    </span>
                    <span className="block px-5 pt-4 pb-5">
                      <span className="block text-[21px] leading-snug font-semibold text-foreground">
                        {g.title}
                      </span>
                      <span className="mt-1.5 block text-[15px] leading-snug text-muted-foreground">
                        {g.desc}
                      </span>
                      <span className="mt-3 flex flex-wrap gap-2">
                        {pills.map((p) => (
                          <span
                            key={p}
                            className="flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-[12px] font-medium text-foreground"
                          >
                            <Check
                              className="h-3 w-3"
                              strokeWidth={2.6}
                              style={{ color: `var(${m?.accent ?? "--forest"})` }}
                            />
                            {p}
                          </span>
                        ))}
                      </span>
                      {m?.audience?.length ? (
                        <span className="mt-3 block text-[12.5px] text-muted-foreground">
                          Perfect for: {m.audience.join(" · ")}
                        </span>
                      ) : null}
                      <span className="mt-4 flex items-center justify-center gap-1.5 rounded-[16px] bg-gradient-button px-4 py-3 text-[15px] font-semibold text-primary-foreground">
                        View Plans <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {rest.length > 0 && (
          <>
            <h2 className="mt-8 text-[15px] font-semibold tracking-wide text-foreground uppercase">
              More services
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {rest.map((g) => {
                const m = META[g.serviceId];
                return (
                  <button
                    key={g.serviceId}
                    type="button"
                    onClick={() => setOpenGoal(g)}
                    style={{ borderLeftColor: `var(${m?.accent ?? "--forest"})` }}
                    className="flex flex-col overflow-hidden rounded-[20px] border border-l-[4px] border-border bg-card text-left shadow-soft transition-all duration-200 active:scale-[0.97]"
                  >
                    <span className="relative block aspect-[16/10] w-full overflow-hidden">
                      <img
                        src={m?.img}
                        alt={g.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                      <span style={{ position: "absolute", bottom: 8, left: 8 }} className="flex h-8 w-8 items-center justify-center rounded-[12px] bg-card text-[16px] shadow-soft">
                        {g.emoji}
                      </span>
                    </span>
                    <span className="flex flex-1 flex-col px-3.5 pt-2.5 pb-3.5">
                      <span className="block text-[15px] leading-snug font-semibold text-foreground">
                        {g.title}
                      </span>
                      <span className="mt-1 block text-[13px] leading-snug text-muted-foreground">
                        {g.desc}
                      </span>
                      <span className="mt-2.5 flex items-center gap-1 text-[13px] font-semibold text-primary">
                        View Plans <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {results.length === 0 && (
          <p className="mt-6 rounded-[20px] border border-border bg-card p-6 text-center text-[15px] text-muted-foreground">
            Nothing matched. Try “website”, “bookings” or “Instagram”.
          </p>
        )}
      </div>

      {/* Floating cart */}
      {cart.length > 0 && !openGoal && (
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="fixed right-4 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 flex items-center gap-3 rounded-full bg-gradient-button pr-5 pl-3 py-2.5 text-primary-foreground shadow-float transition duration-200 active:scale-95"
        >
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-card/20">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.9} />
            <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-card px-1 text-[10px] font-bold text-primary">
              {cart.length}
            </span>
          </span>
          <span className="text-left">
            <span className="block text-[13px] font-semibold">
              {cart.length} Service{cart.length === 1 ? "" : "s"}
            </span>
            <span className="numeric block text-[13px] opacity-85">{inr(total)}</span>
          </span>
        </button>
      )}


      {/* Goal bottom sheet */}
      <div
        className={`fixed inset-0 z-50 ${openGoal ? "" : "pointer-events-none"}`}
        aria-hidden={!openGoal}
      >
        <div
          onClick={() => setOpenGoal(null)}
          className={`absolute inset-0 bg-foreground/55 backdrop-blur-[3px] transition-opacity duration-[250ms] ${
            openGoal ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={openGoal?.sheetTitle ?? "Plans"}
          className={`absolute inset-x-0 bottom-0 flex h-[85vh] flex-col rounded-t-[28px] border-t border-border bg-background shadow-float transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            openGoal ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <button
            type="button"
            onClick={() => setOpenGoal(null)}
            aria-label="Close"
            className="flex justify-center pt-3 pb-1"
          >
            <span className="h-1.5 w-12 rounded-full bg-border" />
          </button>

          {openGoal && service ? (
            <>
              <div className="flex items-start gap-3 px-5 pt-1 pb-4">
                <span className="text-[24px] leading-none">{openGoal.emoji}</span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-[20px] leading-snug">{openGoal.sheetTitle}</h2>
                  <p className="mt-1.5 text-[15px] leading-snug text-muted-foreground">
                    {service.heroText}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenGoal(null)}
                  aria-label="Close"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition active:scale-95"
                >
                  <X className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-[max(1rem,env(safe-area-inset-bottom))]">
                <PriceSlider service={service} onAdd={handleAdd} />

                <div className="mt-5 grid grid-cols-3 gap-2 px-5">
                  {[
                    { icon: ShieldCheck, text: "Secure Payment" },
                    { icon: HeadphonesIcon, text: "Expert Support" },
                    { icon: Truck, text: "Fast Delivery" },
                  ].map(({ icon: BadgeIcon, text }) => (
                    <div
                      key={text}
                      className="flex flex-col items-center gap-1.5 rounded-[16px] border border-border bg-card px-2 py-3 text-center"
                    >
                      <BadgeIcon className="h-4 w-4 text-primary" strokeWidth={1.8} />
                      <span className="text-[11px] leading-tight font-medium text-muted-foreground">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {cart.length > 0 && (
                <div className="border-t border-border bg-card px-4 pt-3 pb-[max(0.85rem,env(safe-area-inset-bottom))]">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenGoal(null);
                      setCartOpen(true);
                    }}
                    className="flex w-full items-center gap-3 rounded-[18px] bg-gradient-button px-4 py-3.5 text-primary-foreground transition duration-200 active:scale-[0.98]"
                  >
                    <ShoppingBag className="h-5 w-5" strokeWidth={1.8} />
                    <span className="min-w-0 flex-1 text-left text-[15px] font-semibold">
                      {cart.length} Service{cart.length === 1 ? "" : "s"} · {inr(total)}
                    </span>
                    <span className="flex items-center gap-1 text-[15px] font-semibold">
                      Checkout <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                  </button>
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function PriceSlider({
  service,
  onAdd,
}: {
  service: SimpleService;
  onAdd: (s: SimpleService, t: SimpleTier) => void;
}) {
  const { cart } = useCart();
  const inCart = cart.map((c) => c.serviceId);
  const trackRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance the plan cards every 5s; pauses while the user is touching.
  useEffect(() => {
    if (paused || service.tiers.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const next = (slide + 1) % service.tiers.length;
      const card = el.children[next] as HTMLElement | undefined;
      if (card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
    }, 5000);
    return () => window.clearInterval(id);
  }, [paused, slide, service.tiers.length]);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth : el.clientWidth;
    setSlide(Math.round(el.scrollLeft / step));
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={onScroll}
        onPointerDown={() => setPaused(true)}
        onPointerUp={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto pt-2 pb-3"
      >
        {service.tiers.map((t) => {
          const key = `${service.id}:${t.id}`;
          const added = inCart.includes(key);
          return (
            <div key={t.id} className="w-full shrink-0 snap-start px-5">
            <article
              className={`flex h-full flex-col rounded-[24px] border bg-card p-5 ${
                t.popular ? "border-primary shadow-card" : "border-border shadow-soft"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-[17px] font-semibold text-foreground">{t.label}</p>
                {t.popular && (
                  <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-primary">
                    ⭐ Most Popular
                  </span>
                )}
              </div>
              <p className="mt-2 flex items-end gap-1">
                <span className="numeric text-[32px] leading-none font-semibold text-foreground">
                  {t.priceNote}
                </span>
                <span className="text-[13px] text-muted-foreground">{t.period}</span>
              </p>
              <ul className="mt-4 space-y-2.5 border-t border-border pt-4">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[15px] text-foreground/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.2} />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => onAdd(service, t)}
                className={`mt-5 inline-flex h-13 w-full items-center justify-center gap-2 rounded-[18px] py-3.5 text-[16px] font-semibold transition duration-200 active:scale-95 ${
                  added
                    ? "bg-accent text-primary"
                    : t.popular
                      ? "bg-gradient-button text-primary-foreground shadow-card"
                      : "border border-border bg-background text-foreground"
                }`}
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" strokeWidth={2.4} /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" strokeWidth={1.8} /> Add to Cart
                  </>
                )}
              </button>
            </article>
            </div>
          );
        })}
      </div>

      {service.tiers.length > 1 && (
        <div className="flex justify-center gap-2">
          {service.tiers.map((t, i) => (
            <button
              key={t.id}
              type="button"
              aria-label={`Show plan ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-200 ${
                i === slide ? "w-6 bg-primary" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
