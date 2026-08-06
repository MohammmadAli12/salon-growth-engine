import { useEffect, useMemo, useState } from "react";
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
import { useCart, inr } from "@/lib/cart-store";
import { SIMPLE_SERVICES, type SimpleService, type SimpleTier } from "@/lib/marketplace-simple";

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
    label: "Advertisement",
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
    label: "Google Visibility",
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
    label: "Instagram Growth",
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
    label: "Customer Reviews",
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
  "branding",
  "records",
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
    <div className="min-h-screen bg-background">
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
              <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-success px-1 text-[10px] font-bold text-primary-foreground shadow-soft">
                {cart.length}
              </span>
            )}
          </button>
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

      {/* Mobile slide drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${drawerOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!drawerOpen}
      >
        <div
          onClick={() => setDrawerOpen(false)}
          className={`absolute inset-0 bg-foreground/40 backdrop-blur-sm transition-opacity duration-250 ${
            drawerOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-y-0 left-0 flex w-[86%] max-w-[320px] flex-col bg-primary shadow-float transition-transform duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-4 pt-5 pb-3">
            <p className="text-sm font-semibold text-primary-foreground">Choose a service</p>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-sm bg-primary-foreground/10 text-primary-foreground"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-3">{navList}</div>
          <div className="border-t border-primary-foreground/15 px-3 pt-1 pb-4">{helpCard}</div>
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
      className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-all duration-250 ${
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

  return (
    <div>
      {/* Hero */}
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
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
        <p className="hidden shrink-0 items-center gap-1 text-xs text-muted-foreground sm:flex">
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} /> swipe
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
        </p>
      </div>

      <div className="no-scrollbar -mx-4 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0">
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
                  t.popular
                    ? "bg-gradient-button text-primary-foreground shadow-card hover:shadow-float"
                    : "border border-border bg-background text-foreground hover:border-primary/40 hover:shadow-card"
                }`}
              >
                <ShoppingBag className="h-4 w-4" strokeWidth={1.8} /> Add to Cart
              </button>
            </article>
          );
        })}
      </div>

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

export { inr };
