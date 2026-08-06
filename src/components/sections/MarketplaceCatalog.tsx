import { useMemo, useState } from "react";
import {
  Home,
  TrendingUp,
  Globe,
  CalendarCheck,
  PhoneCall,
  MessageCircle,
  MapPin,
  Instagram,
  Palette,
  Star,
  Users,
  Search,
  ChevronDown,
  Check,
  ShoppingBag,
  Heart,
  ArrowRight,
  Sparkles,
  HeadphonesIcon,
  type LucideIcon,
} from "lucide-react";
import { useCart, inr } from "@/lib/cart-store";
import { SIMPLE_SERVICES, type SimpleService, type SimpleTier } from "@/lib/marketplace-simple";

const ICON_MAP: Record<string, LucideIcon> = {
  TrendingUp,
  Globe,
  CalendarCheck,
  PhoneCall,
  MessageCircle,
  MapPin,
  Instagram,
  Palette,
  Star,
  Users,
};

function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICON_MAP[name] ?? Sparkles;
  return <Icon className={className} strokeWidth={1.7} />;
}

export function MarketplaceCatalog() {
  const [activeId, setActiveId] = useState<string>("home");
  const [query, setQuery] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const { cart, wishlist, addItem, toggleWish, showToast, setCartOpen, total } = useCart();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SIMPLE_SERVICES;
    return SIMPLE_SERVICES.filter(
      (s) =>
        s.navLabel.toLowerCase().includes(q) ||
        s.heroTitle.toLowerCase().includes(q) ||
        s.benefits.some((b) => b.toLowerCase().includes(q)),
    );
  }, [query]);

  const active = SIMPLE_SERVICES.find((s) => s.id === activeId) ?? null;

  const pickItem = (id: string) => {
    setActiveId(id);
    setNavOpen(false);
  };

  const handleAdd = (service: SimpleService, tier: SimpleTier) => {
    addItem({
      serviceId: `${service.id}:${tier.id}`,
      name: service.navLabel,
      tier: tier.label,
      price: tier.price,
      period: tier.period,
    });
    showToast(`Added ${service.navLabel} — ${tier.label}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 pt-24 pb-28 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="mb-6">
          <h1 className="mb-2 text-3xl leading-tight sm:text-4xl">
            What do you want for your salon?
          </h1>
          <p className="mb-5 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Pick one thing on the left. We explain it in simple words and show you the price.
          </p>
          <div className="relative max-w-xl">
            <Search
              className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              strokeWidth={1.8}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search — website, bookings, Google, WhatsApp…"
              aria-label="Search services"
              className="h-12 w-full rounded-md border border-border bg-card pr-4 pl-11 text-sm text-foreground shadow-soft outline-none transition placeholder:text-muted-foreground focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          {/* Sidebar */}
          <aside className="sticky top-20 z-30 lg:top-24 lg:self-start">
            <nav className="rounded-lg bg-primary p-3 shadow-float">
              {/* Mobile toggle — shows current choice, expands the menu */}
              <button
                type="button"
                onClick={() => setNavOpen((o) => !o)}
                aria-expanded={navOpen}
                aria-controls="marketplace-nav-list"
                className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left lg:hidden"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-card text-primary">
                  {active ? (
                    <ServiceIcon name={active.icon} className="h-4 w-4" />
                  ) : (
                    <Home className="h-4 w-4" strokeWidth={1.8} />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] tracking-wide text-primary-foreground/60 uppercase">
                    Browse services
                  </span>
                  <span className="block truncate text-[13px] font-semibold text-primary-foreground">
                    {active ? active.navLabel : "Marketplace"}
                  </span>
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-primary-foreground/70 transition-transform duration-200 ${navOpen ? "rotate-180" : ""}`}
                  strokeWidth={1.8}
                />
              </button>

              <div
                id="marketplace-nav-list"
                className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-200 ease-out lg:!grid-rows-[1fr] lg:opacity-100 ${
                  navOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 lg:opacity-100"
                }`}
              >
                <div className="min-h-0">
                  <div className="mt-2 h-px bg-primary-foreground/15 lg:mt-0" />
                  <div className="max-h-[55vh] overflow-y-auto py-2 lg:max-h-none lg:overflow-visible">
                    <SideItem
                      icon={Home}
                      label="Marketplace"
                      active={activeId === "home"}
                      onClick={() => pickItem("home")}
                    />
                    <div className="my-2 h-px bg-primary-foreground/15" />
                    <div className="space-y-1" role="list">
                      {results.map((s) => (
                        <SideItem
                          key={s.id}
                          iconName={s.icon}
                          label={s.navLabel}
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
                  </div>
                  <div className="mb-1 h-px bg-primary-foreground/15" />
                  <div className="mt-2 rounded-md bg-primary-foreground/10 p-3">
                    <p className="text-xs font-medium text-primary-foreground/80">Need Help?</p>
                    <p className="mt-1 text-[11px] leading-snug text-primary-foreground/60">
                      Not sure what to pick? We will guide you in 10 minutes.
                    </p>
                    <a
                      href="/contact"
                      className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-sm bg-card text-xs font-semibold text-primary transition hover:-translate-y-0.5 hover:shadow-card"
                    >
                      <HeadphonesIcon className="h-4 w-4" strokeWidth={1.8} />
                      Talk to Expert
                    </a>
                  </div>
                </div>
              </div>
            </nav>
          </aside>


          {/* Right panel */}
          <section
            key={activeId}
            className="min-w-0 animate-[panel-in_260ms_cubic-bezier(0.22,1,0.36,1)_both]"
          >
            {active ? (
              <ServicePanel
                service={active}
                onAdd={handleAdd}
                wishlist={wishlist}
                toggleWish={toggleWish}
              />
            ) : (
              <OverviewPanel onPick={pickItem} />
            )}

            {/* Bottom CTA */}
            <div className="mt-8 rounded-lg border border-border bg-gradient-hero-soft p-7 text-center shadow-soft sm:p-10">
              <h2 className="text-2xl sm:text-3xl">Need help deciding?</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                Tell us about your salon. We will suggest only what you actually need — nothing extra.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-gradient-button px-6 text-sm font-semibold text-primary-foreground shadow-card transition hover:-translate-y-0.5 hover:shadow-float"
                >
                  Talk to an Expert <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </a>
                <a
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-card px-6 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:shadow-card"
                >
                  Book Free Consultation
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Cart bar */}
      {cart.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <div className="min-w-0">
              <p className="truncate text-xs text-muted-foreground">
                {cart.length} {cart.length === 1 ? "item" : "items"} selected
              </p>
              <p className="text-lg font-semibold text-foreground numeric">{inr(total)}</p>
            </div>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="inline-flex h-11 items-center gap-2 rounded-md bg-gradient-button px-5 text-sm font-semibold text-primary-foreground shadow-card transition hover:-translate-y-0.5 hover:shadow-float"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.8} /> View cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SideItem({
  icon: Icon,
  iconName,
  label,
  active,
  onClick,
}: {
  icon?: LucideIcon;
  iconName?: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className={`flex w-full shrink-0 items-center gap-3 rounded-md px-3 py-2.5 text-left text-[13px] font-medium whitespace-nowrap transition-all duration-200 lg:whitespace-normal ${
        active
          ? "bg-card text-primary shadow-soft"
          : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
      }`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-sm transition-colors ${
          active ? "bg-accent text-primary" : "bg-primary-foreground/10"
        }`}
      >
        {Icon ? (
          <Icon className="h-4 w-4" strokeWidth={1.8} />
        ) : (
          <ServiceIcon name={iconName ?? ""} className="h-4 w-4" />
        )}
      </span>
      {label}
    </button>
  );
}

function OverviewPanel({ onPick }: { onPick: (id: string) => void }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-card sm:p-8">
      <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold tracking-wide text-accent-foreground uppercase">
        <Sparkles className="h-3.5 w-3.5" strokeWidth={2} /> Salon marketplace
      </span>
      <h2 className="mt-4 text-2xl sm:text-3xl">Everything your salon needs to grow</h2>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        No technical words. Choose what you want, see the price, add it to your cart. We do the rest.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {SIMPLE_SERVICES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onPick(s.id)}
            className="group flex items-start gap-3 rounded-md border border-border bg-background p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-accent text-primary">
              <ServiceIcon name={s.icon} className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-foreground">{s.navLabel}</span>
              <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                {s.benefits[0]}
              </span>
            </span>
            <ArrowRight
              className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
              strokeWidth={1.8}
            />
          </button>
        ))}
      </div>
    </div>
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
  return (
    <div>
      {/* Hero */}
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
        <div className="bg-gradient-hero-soft p-6 sm:p-9">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-soft">
              <ServiceIcon name={service.icon} className="h-7 w-7" />
            </span>
            <div className="min-w-0">
              <h2 className="text-2xl leading-tight sm:text-4xl">{service.heroTitle}</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {service.heroText}
              </p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3 w-3" strokeWidth={2.6} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <h3 className="mt-8 mb-4 text-lg">Choose what suits you</h3>
      <div
        className={`grid gap-4 ${service.tiers.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}
      >
        {service.tiers.map((t, i) => {
          const key = `${service.id}:${t.id}`;
          const saved = wishlist.includes(key);
          return (
            <article
              key={t.id}
              style={{ animationDelay: `${i * 60}ms` }}
              className={`relative flex animate-[panel-in_320ms_cubic-bezier(0.22,1,0.36,1)_both] flex-col rounded-lg border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-float ${
                t.popular ? "border-primary/40 shadow-card" : "border-border shadow-soft"
              }`}
            >
              {t.popular && (
                <span className="absolute -top-3 left-5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold tracking-wide text-primary-foreground uppercase">
                  ⭐ Most popular
                </span>
              )}
              <button
                type="button"
                aria-label={saved ? "Remove from saved" : "Save for later"}
                onClick={() => toggleWish(key)}
                className={`absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-border transition ${
                  saved ? "bg-accent text-primary" : "bg-background text-muted-foreground"
                }`}
              >
                <Heart className="h-4 w-4" strokeWidth={1.8} fill={saved ? "currentColor" : "none"} />
              </button>

              <p className="mt-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {t.label}
              </p>
              <p className="mt-2 flex items-end gap-1">
                <span className="text-3xl font-semibold text-foreground numeric">{t.priceNote}</span>
                <span className="pb-1 text-xs text-muted-foreground">{t.period}</span>
              </p>
              <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.2} />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => onAdd(service, t)}
                className={`mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
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
    </div>
  );
}
