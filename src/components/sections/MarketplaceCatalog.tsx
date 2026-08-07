import { useEffect, useMemo, useRef, useState } from "react";
import {
  Globe,
  Megaphone,
  MessageCircle,
  MapPin,
  CalendarCheck,
  Instagram,
  Palette,
  Users,
  TrendingUp,
  Star,
  Search,
  Check,
  ShoppingBag,
  Heart,
  ArrowRight,
  ArrowLeft,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  HeadphonesIcon,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { SIMPLE_SERVICES, type SimpleService, type SimpleTier } from "@/lib/marketplace-simple";
import imgWebsite from "@/assets/mp-website.jpg";
import imgAds from "@/assets/mp-ads.jpg";
import imgChat from "@/assets/mp-chat.jpg";
import imgSalon from "@/assets/mp-salon.jpg";

/** Banner photo shown at the top of each service panel. */
const HERO_IMAGE: Record<string, string> = {
  website: imgWebsite,
  calls: imgAds,
  "more-customers": imgAds,
  instagram: imgAds,
  whatsapp: imgChat,
  bookings: imgChat,
  records: imgChat,
  google: imgSalon,
  branding: imgSalon,
  reviews: imgSalon,
};

/** Sidebar presentation: plain-language label + one-line description per service. */
type NavMeta = { label: string; desc: string; icon: LucideIcon; tint: string };

const NAV_META: Record<string, NavMeta> = {
  website: {
    label: "Get a Website",
    desc: "Your own booking website",
    icon: Globe,
    tint: "text-teal",
  },
  calls: {
    label: "Get More Customers",
    desc: "Get more calls from nearby people",
    icon: Megaphone,
    tint: "text-gold",
  },
  whatsapp: {
    label: "WhatsApp Marketing",
    desc: "Messages sent automatically",
    icon: MessageCircle,
    tint: "text-forest-light",
  },
  google: {
    label: "Show My Salon on Google",
    desc: "Show your salon on Google Maps",
    icon: MapPin,
    tint: "text-teal",
  },
  bookings: {
    label: "Online Bookings",
    desc: "Customers book without calling",
    icon: CalendarCheck,
    tint: "text-olive",
  },
  instagram: {
    label: "Instagram Promotion",
    desc: "Posts and reels made for you",
    icon: Instagram,
    tint: "text-plum",
  },
  branding: {
    label: "Salon Branding",
    desc: "Logo, board and print design",
    icon: Palette,
    tint: "text-gold-deep",
  },
  records: {
    label: "Customer Management",
    desc: "Keep every customer detail safe",
    icon: Users,
    tint: "text-forest",
  },
  "more-customers": {
    label: "Get More Customers",
    desc: "We manage everything for you",
    icon: TrendingUp,
    tint: "text-forest",
  },
  reviews: {
    label: "Get More Reviews",
    desc: "More 5-star reviews on Google",
    icon: Star,
    tint: "text-gold",
  },
};

/** Order shown in the sidebar. */
const NAV_ORDER = [
  "website",
  "calls",
  "whatsapp",
  "google",
  "bookings",
  "instagram",
  "reviews",
  "branding",
];

function metaFor(id: string): NavMeta {
  return NAV_META[id] ?? { label: id, desc: "", icon: Sparkles, tint: "text-primary" };
}

const byId = (id: string) => SIMPLE_SERVICES.find((s) => s.id === id);

export function MarketplaceCatalog() {
  const [activeId, setActiveId] = useState<string>("website");
  const [query, setQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { cart, wishlist, addItem, toggleWish, showToast, setCartOpen } = useCart();

  const ordered = useMemo(() => {
    const inOrder = NAV_ORDER.map(byId).filter((s): s is SimpleService => Boolean(s));
    const rest = SIMPLE_SERVICES.filter((s) => !NAV_ORDER.includes(s.id));
    return [...inOrder, ...rest];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ordered.slice(0, NAV_ORDER.length);
    return ordered.filter((s) => {
      const m = metaFor(s.id);
      return (
        m.label.toLowerCase().includes(q) ||
        m.desc.toLowerCase().includes(q) ||
        s.heroTitle.toLowerCase().includes(q) ||
        s.benefits.some((b) => b.toLowerCase().includes(q))
      );
    });
  }, [query, ordered]);

  const active = byId(activeId) ?? ordered[0]!;

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const pickItem = (id: string) => {
    setActiveId(id);
    setDrawerOpen(false);
  };

  const handleAdd = (service: SimpleService, tier: SimpleTier) => {
    addItem({
      serviceId: `${service.id}:${tier.id}`,
      name: metaFor(service.id).label,
      tier: tier.label,
      price: tier.price,
      period: tier.period,
    });
    showToast(`Added ${metaFor(service.id).label} — ${tier.label}`);
    setCartOpen(true);
  };

  const navList = (
    <div className="space-y-1.5" role="list">
      {results.map((s) => (
        <SideItem
          key={s.id}
          meta={metaFor(s.id)}
          active={activeId === s.id}
          onClick={() => pickItem(s.id)}
        />
      ))}
      {results.length === 0 && (
        <p className="px-3 py-4 text-xs text-primary-foreground/70">
          Nothing matched. Try “website” or “Google”.
        </p>
      )}
    </div>
  );

  const helpCard = (
    <div className="mt-3 rounded-md border border-primary-foreground/15 bg-primary-foreground/10 p-3.5 backdrop-blur">
      <p className="flex items-center gap-1.5 text-xs font-semibold text-primary-foreground/85">
        <Sparkles className="h-3.5 w-3.5 text-gold" strokeWidth={2} /> Not sure what to pick?
      </p>
      <p className="mt-1 text-[11px] leading-snug text-primary-foreground/60">
        We will guide you in 10 minutes — in simple words.
      </p>
      <a
        href="/contact"
        className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-sm bg-card/90 text-xs font-semibold text-primary backdrop-blur transition hover:-translate-y-0.5 hover:shadow-card"
      >
        <HeadphonesIcon className="h-4 w-4 text-teal" strokeWidth={1.8} />
        Talk to an expert
      </a>
    </div>
  );

  return (
    <>
    {/* Mobile: goal-based marketplace */}
    <div className="lg:hidden">
      <MobileGoalMarketplace />
    </div>

    <div className="hidden min-h-screen bg-background lg:block">

      {/* Pinned header: title + search + floating cart */}
      <div className="sticky top-16 z-40 border-b border-border/70 bg-card/75 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Browse services"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-card text-foreground shadow-soft transition active:scale-95 lg:hidden"
          >
            <Menu className="h-5 w-5" strokeWidth={1.8} />
          </button>

          <span className="hidden shrink-0 text-lg font-semibold text-foreground lg:block">
            Marketplace
          </span>

          <div className="relative min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              strokeWidth={1.8}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services..."
              aria-label="Search services"
              className="h-11 w-full rounded-md border border-border bg-background pr-4 pl-11 text-[15px] text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
            />
          </div>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Open cart, ${cart.length} items`}
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-gradient-button text-primary-foreground shadow-card transition hover:-translate-y-0.5 hover:shadow-float active:scale-95"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.8} />
            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-forest-light px-1 text-[10px] font-bold text-primary-foreground shadow-soft">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Auto-scrolling service ribbon (right → left, pauses on hover) */}
      <div className="border-b border-border/70 bg-card/50">
        <div
          className="relative overflow-hidden py-3"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <div className="service-marquee flex w-max gap-2.5">
            {[...ordered, ...ordered].map((s, i) => {
              const m = metaFor(s.id);
              const RIcon = m.icon;
              return (
                <button
                  key={`${s.id}-${i}`}
                  type="button"
                  onClick={() => pickItem(s.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-medium whitespace-nowrap transition ${
                    activeId === s.id
                      ? "border-primary/40 bg-accent text-primary shadow-soft"
                      : "border-border bg-card text-foreground/85 hover:border-primary/30 hover:shadow-soft"
                  }`}
                >
                  <RIcon className={`h-4 w-4 ${m.tint}`} strokeWidth={1.8} />
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>


      <div className="mx-auto w-full max-w-7xl px-4 pt-6 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-36 rounded-lg border border-primary-foreground/15 bg-primary/90 p-3 shadow-float backdrop-blur-xl backdrop-saturate-150">
              <p className="px-3 pt-1 pb-2 text-[10px] font-semibold tracking-[0.16em] text-primary-foreground/55 uppercase">
                Choose a service
              </p>
              {navList}
              <div className="mt-3 h-px bg-primary-foreground/15" />
              {helpCard}
            </div>
          </aside>

          {/* Content */}
          <section
            key={active.id}
            className="min-w-0 animate-[panel-in_280ms_cubic-bezier(0.22,1,0.36,1)_both]"
          >
            <ServicePanel
              service={active}
              onAdd={handleAdd}
              wishlist={wishlist}
              toggleWish={toggleWish}
            />
          </section>
        </div>
      </div>

      {/* Mobile bottom sheet picker */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${drawerOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!drawerOpen}
      >
        <div
          onClick={() => setDrawerOpen(false)}
          className={`absolute inset-0 bg-foreground/60 backdrop-blur-[3px] transition-opacity duration-[250ms] ${
            drawerOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Choose a service"
          className={`absolute inset-x-0 bottom-0 flex max-h-[58vh] flex-col rounded-t-[24px] border-t border-primary-foreground/15 bg-primary/97 shadow-float backdrop-blur-xl transition-transform duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            drawerOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            className="flex justify-center pt-2.5 pb-1"
          >
            <span className="h-1.5 w-11 rounded-full bg-primary-foreground/35" />
          </button>
          <div className="flex items-center gap-2 px-3 pt-0.5 pb-2">
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="flex h-9 items-center gap-1.5 rounded-full bg-primary-foreground/10 pr-3 pl-2 text-[12px] font-semibold text-primary-foreground transition active:scale-95"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2} />
              Back
            </button>
            <p className="min-w-0 flex-1 truncate text-center text-[13px] font-semibold text-primary-foreground">
              Choose a service
            </p>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground transition active:scale-95"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-[max(0.9rem,env(safe-area-inset-bottom))]">
            {navList}
          </div>
        </div>
      </div>

    </div>
  );
}

function SideItem({
  meta,
  active,
  onClick,
}: {
  meta: NavMeta;
  active: boolean;
  onClick: () => void;
}) {
  const Icon = meta.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-all duration-[250ms] ${
        active
          ? "bg-card text-primary shadow-soft"
          : "text-primary-foreground/85 hover:bg-primary-foreground/12 hover:text-primary-foreground"
      }`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-sm transition-colors ${
          active ? "bg-accent" : "bg-primary-foreground/10"
        }`}
      >
        <Icon
          className={`h-5 w-5 ${active ? meta.tint : "text-primary-foreground/90"}`}
          strokeWidth={1.7}
        />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[14px] font-semibold">{meta.label}</span>
        <span
          className={`mt-0.5 block truncate text-[11px] leading-snug ${
            active ? "text-muted-foreground" : "text-primary-foreground/55"
          }`}
        >
          {meta.desc}
        </span>
      </span>
    </button>
  );
}

function ServicePanel({
  service,
  onAdd,
  wishlist,
  toggleWish,
}: {
  service: SimpleService;
  onAdd: (s: SimpleService, t: SimpleTier) => void;
  wishlist: string[];
  toggleWish: (id: string) => void;
}) {
  const meta = metaFor(service.id);
  const Icon = meta.icon;
  const { cart } = useCart();
  const inCart = cart.map((c) => c.serviceId);
  const trackRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setSlide(0);
    trackRef.current?.scrollTo({ left: 0 });
  }, [service.id]);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : el.clientWidth;
    setSlide(Math.round(el.scrollLeft / step));
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  // Gentle auto-slide through the plans; pauses on hover or touch.
  useEffect(() => {
    if (paused || service.tiers.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const next = (slide + 1) % service.tiers.length;
      const card = el.children[next] as HTMLElement | undefined;
      if (card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
    }, 4200);
    return () => window.clearInterval(id);
  }, [paused, slide, service.tiers.length]);


  return (
    <div>
      {/* Hero */}
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
        <div className="relative h-44 overflow-hidden sm:h-64 lg:h-72">
          <img
            src={HERO_IMAGE[service.id] ?? imgSalon}
            alt={service.heroTitle}
            width={1200}
            height={800}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-forest-deep/15 to-transparent" />
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-card/85 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-primary uppercase backdrop-blur-md sm:left-6">
            <Icon className={`h-3.5 w-3.5 ${meta.tint}`} strokeWidth={2} /> {meta.label}
          </span>
        </div>

        <div className="grid items-center gap-6 bg-gradient-hero-soft p-6 sm:p-9 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold tracking-wide text-accent-foreground uppercase">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} /> {meta.label}
            </span>
            <h1 className="mt-4 text-[28px] leading-tight sm:text-4xl">{service.heroTitle}</h1>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              {service.heroText}
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-center gap-2 text-[15px] text-foreground">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3 w-3" strokeWidth={2.6} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Simple illustration panel */}
          <div className="relative hidden aspect-4/3 overflow-hidden rounded-lg border border-border bg-card/70 shadow-soft backdrop-blur-md lg:block">
            <div className="absolute inset-0 bg-gradient-hero-soft opacity-80" />
            <div className="absolute -top-10 -right-8 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />
            <div className="absolute -bottom-12 -left-10 h-44 w-44 rounded-full bg-teal/10 blur-2xl" />
            <div className="relative flex h-full flex-col items-center justify-center gap-4">
              <span className="flex h-20 w-20 items-center justify-center rounded-lg border border-border bg-card shadow-card">
                <Icon className={`h-9 w-9 ${meta.tint}`} strokeWidth={1.5} />
              </span>
              <p className="max-w-[70%] text-center text-xs leading-snug text-muted-foreground">
                {meta.desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing carousel */}
      <div className="mt-9 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl">Choose what suits you</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Swipe to compare. Prices are final — no hidden charges.
          </p>
        </div>
        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <button
            type="button"
            aria-label="Previous plan"
            onClick={() => goTo(Math.max(0, slide - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-soft transition hover:-translate-y-0.5 hover:shadow-card disabled:opacity-40"
            disabled={slide === 0}
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Next plan"
            onClick={() => goTo(Math.min(service.tiers.length - 1, slide + 1))}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-soft transition hover:-translate-y-0.5 hover:shadow-card disabled:opacity-40"
            disabled={slide >= service.tiers.length - 1}
          >
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onFocusCapture={() => setPaused(true)}
        className="no-scrollbar -mx-4 mt-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-5 pb-4 sm:mx-0 sm:px-0">
        {service.tiers.map((t, i) => {
          const key = `${service.id}:${t.id}`;
          const saved = wishlist.includes(key);
          return (
            <article
              key={t.id}
              style={{ animationDelay: `${i * 70}ms` }}
              className={`relative flex w-[86%] shrink-0 animate-[panel-in_320ms_cubic-bezier(0.22,1,0.36,1)_both] snap-start flex-col rounded-lg border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-float sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)] ${
                t.popular ? "border-primary/40 shadow-card" : "border-border shadow-soft"
              }`}
            >
              {t.popular && (
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[10px] font-bold tracking-wide text-primary-foreground uppercase">
                  ⭐ Most popular
                </span>
              )}
              <button
                type="button"
                aria-label={saved ? "Remove from saved" : "Save for later"}
                onClick={() => toggleWish(key)}
                className={`absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-border transition ${
                  saved ? "bg-accent text-primary" : "bg-background text-muted-foreground"
                }`}
              >
                <Heart className="h-4 w-4" strokeWidth={1.8} fill={saved ? "currentColor" : "none"} />
              </button>

              <p className="mt-2 text-sm font-semibold text-foreground">{t.label}</p>
              <p className="mt-3 flex items-end gap-1">
                <span className="numeric text-[34px] leading-none font-semibold text-foreground">
                  {t.priceNote}
                </span>
                <span className="text-xs text-muted-foreground">{t.period}</span>
              </p>
              <ul className="mt-6 space-y-2.5 border-t border-border pt-5">
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
                className={`mt-7 inline-flex h-13 w-full items-center justify-center gap-2 rounded-md py-3.5 text-[15px] font-semibold transition-all duration-200 hover:scale-[1.02] ${
                  inCart.includes(key)
                    ? "bg-accent text-primary"
                    : t.popular
                      ? "bg-gradient-button text-primary-foreground shadow-card hover:shadow-float"
                      : "border border-border bg-background text-foreground hover:border-primary/40 hover:shadow-card"
                }`}
              >
                {inCart.includes(key) ? (
                  <>
                    <Check className="h-4 w-4" strokeWidth={2.4} /> Added to cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" strokeWidth={1.8} /> Add to Cart
                  </>
                )}
              </button>
            </article>
          );
        })}
      </div>

      {/* Pagination dots */}
      {service.tiers.length > 1 && (
        <div className="mt-1 flex justify-center gap-2 lg:hidden">
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

      {/* Trust badges */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          { icon: ShieldCheck, text: "100% Secure" },
          { icon: HeadphonesIcon, text: "Expert Support" },
          { icon: Truck, text: "Fast Delivery" },
        ].map(({ icon: BadgeIcon, text }) => (
          <div
            key={text}
            className="flex items-center gap-2.5 rounded-md border border-border bg-card px-4 py-3 shadow-soft"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-accent text-primary">
              <BadgeIcon className="h-4 w-4" strokeWidth={1.8} />
            </span>
            <span className="text-sm font-medium text-foreground">{text}</span>
          </div>
        ))}
      </div>

      {/* Bottom help */}
      <div className="mt-8 rounded-lg border border-border bg-gradient-hero-soft p-7 text-center shadow-soft sm:p-10">
        <h2 className="text-2xl sm:text-3xl">Need help deciding?</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Tell us about your salon. We will suggest only what you actually need — nothing extra.
        </p>
        <a
          href="/contact"
          className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-gradient-button px-6 text-sm font-semibold text-primary-foreground shadow-card transition hover:-translate-y-0.5 hover:shadow-float"
        >
          Talk to an expert <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}

