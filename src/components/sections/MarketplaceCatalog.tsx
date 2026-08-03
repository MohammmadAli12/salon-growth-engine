import { useState } from "react";
import { Check, ChevronDown, Minus, ShoppingCart, X } from "lucide-react";
import { Section, accentSoftBg, accentText } from "@/components/layout/primitives";
import { ServiceIcon } from "@/components/sections/ServicesGrid";
import { services, type AccentName, type ServiceItem } from "@/lib/site-data";
import {
  serviceCategories,
  serviceDetails,
  type PackageCard,
  type PackageTable,
} from "@/lib/marketplace-data";
import { cn } from "@/lib/utils";

type CartItem = { id: string; service: string; pkg: string; price: string };

const categoryMeta: Record<string, { icon: string; accent: AccentName }> = {
  web: { icon: "Globe", accent: "indigo" },
  search: { icon: "Search", accent: "teal" },
  ads: { icon: "Target", accent: "magenta" },
  automation: { icon: "Sparkles", accent: "lime" },
  brand: { icon: "Palette", accent: "amber" },
};

/** Falls back to the comparison table when no owner pricing cards exist. */
function cardsFor(detail: { cards?: PackageCard[] | undefined; packages?: PackageTable | undefined }): PackageCard[] {
  if (detail.cards?.length) return detail.cards;
  const table = detail.packages;
  if (!table || table.columns.length !== 3) return [];
  return table.columns.map((name, i) => ({
    name,
    price: table.prices?.[i] ?? "Price on consultation",
    popular: i === 1,
    features: table.rows
      .map((row) => {
        const cell = row.cells[i] ?? "";
        if (cell === "no" || cell === "-" || cell === "") return null;
        if (cell === "yes") return row.label;
        return `${row.label}: ${cell}`;
      })
      .filter((v): v is string => v !== null),
  }));
}

export function MarketplaceCatalog() {
  const [openCategory, setOpenCategory] = useState<string>(serviceCategories[0]!.id);
  const [openService, setOpenService] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const selectCategory = (id: string) => {
    if (id === openCategory) return;
    setOpenCategory(id);
    setOpenService(null);
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => (prev.some((i) => i.id === item.id) ? prev : [...prev, item]));
  };

  const activeCategory = serviceCategories.find((c) => c.id === openCategory);
  const activeServices = services.filter((s) => serviceDetails[s.slug]?.category === openCategory);

  return (
    <>
      <Section className="pb-28">
        {/* Category switcher */}
        <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
          {serviceCategories.map((category) => {
            const meta = categoryMeta[category.id] ?? { icon: "Sparkles", accent: "indigo" as AccentName };
            const count = services.filter((s) => serviceDetails[s.slug]?.category === category.id).length;
            const active = openCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => selectCategory(category.id)}
                aria-pressed={active}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-lg border bg-card px-1.5 py-2.5 text-center transition-all duration-300 sm:flex-row sm:items-center sm:gap-3 sm:px-4 sm:py-3 sm:text-left",
                  active
                    ? "border-primary/40 shadow-card"
                    : "border-border/70 shadow-soft hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-card",
                )}
              >
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-md sm:size-9",
                    accentSoftBg[meta.accent],
                  )}
                >
                  <ServiceIcon name={meta.icon} className={cn("size-3.5 sm:size-4", accentText[meta.accent])} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-semibold leading-tight text-foreground sm:truncate sm:text-sm">
                    {category.label}
                  </span>
                  <span className="mt-0.5 block text-[9px] text-muted-foreground sm:mt-0 sm:text-xs">
                    {count} service{count === 1 ? "" : "s"}
                  </span>
                </span>
                <ChevronDown
                  className={cn(
                    "hidden size-4 shrink-0 text-muted-foreground transition-transform duration-300 sm:block",
                    active && "rotate-180 text-primary",
                  )}
                />
              </button>
            );
          })}
        </div>


        {/* Single shared content area */}
        <div className="mt-4 overflow-hidden rounded-lg border border-primary/25 bg-card shadow-card sm:mt-5">
          <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-5 sm:py-5 md:px-7">
            <span className="flex min-w-0 items-center gap-3">
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-md sm:size-10",
                  accentSoftBg[categoryMeta[openCategory]?.accent ?? "indigo"],
                )}
              >
                <ServiceIcon
                  name={categoryMeta[openCategory]?.icon ?? "Sparkles"}
                  className={cn("size-4 sm:size-5", accentText[categoryMeta[openCategory]?.accent ?? "indigo"])}
                />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-base font-bold text-foreground sm:text-lg md:text-xl">
                  {activeCategory?.label}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground sm:text-sm">
                  {activeCategory?.description}
                </span>
              </span>
            </span>
            <ChevronDown className="size-4 shrink-0 rotate-180 text-primary" />
          </div>

          <div
            key={openCategory}
            className="animate-fade-in space-y-3 border-t border-border/70 bg-background px-3 py-4 sm:space-y-4 sm:px-5 sm:py-6 md:px-7"
          >

            {activeServices.map((service) => (
              <ServiceRow
                key={service.slug}
                service={service}
                open={openService === service.slug}
                onToggle={() =>
                  setOpenService((prev) => (prev === service.slug ? null : service.slug))
                }
                cart={cart}
                onAdd={addToCart}
              />
            ))}
          </div>
        </div>
      </Section>

      {cart.length > 0 ? (
        <CartBar cart={cart} onRemove={(id) => setCart((p) => p.filter((i) => i.id !== id))} />
      ) : null}
    </>
  );
}

function ServiceRow({
  service,
  open,
  onToggle,
  cart,
  onAdd,
}: {
  service: ServiceItem;
  open: boolean;
  onToggle: () => void;
  cart: CartItem[];
  onAdd: (item: CartItem) => void;
}) {
  const detail = serviceDetails[service.slug];
  const cards = detail ? cardsFor(detail) : [];

  return (
    <article
      className={cn(
        "overflow-hidden rounded-lg border bg-card transition-all duration-300",
        open ? "border-primary/25 shadow-card" : "border-border/70 shadow-soft",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full p-4 text-left sm:p-5"
      >
        <span className="flex items-start gap-3 sm:gap-4">
          <span
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-md sm:size-11",
              accentSoftBg[service.accent],
            )}
          >
            <ServiceIcon name={service.icon} className={cn("size-4 sm:size-5", accentText[service.accent])} />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block font-display text-base font-bold text-foreground sm:text-lg">
              {service.title}
            </span>
            <span className="mt-1 block text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
              {service.blurb}
            </span>
          </span>

          <span
            className={cn(
              "inline-flex h-8 shrink-0 items-center gap-1 rounded-md border border-border bg-background px-2 text-[11px] font-semibold transition-colors sm:h-10 sm:gap-1.5 sm:px-3 sm:text-sm",
              open ? "border-primary/40 text-primary" : "text-foreground",
            )}
          >
            {open ? "Hide packages" : "Choose package"}
            <ChevronDown className={cn("size-3.5 transition-transform duration-300 sm:size-4", open && "rotate-180")} />
          </span>
        </span>

        <span className="mt-3 flex flex-wrap gap-2 sm:gap-x-4 sm:gap-y-1.5">
          {service.deliverables.slice(0, 3).map((d) => (
            <span
              key={d}
              className="inline-flex items-center gap-1.5 rounded-md border border-border/70 px-2 py-1 text-[11px] font-medium text-muted-foreground sm:border-0 sm:px-0 sm:py-0 sm:text-xs"
            >
              <Check className={cn("size-3.5", accentText[service.accent])} />
              {d}
            </span>
          ))}
        </span>
      </button>


      <div
        className={cn(
          "grid transition-all duration-[350ms] ease-in-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border/70 bg-background px-3 py-4 sm:px-5 sm:py-6">
            {cards.length === 3 ? (
              <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
                {cards.map((card, i) => {
                  const id = `${service.slug}:${card.name}`;
                  const inCart = cart.some((item) => item.id === id);
                  const priceLabel = `${card.price}${card.period ?? ""}`;
                  return (
                    <div
                      key={card.name}
                      style={open ? { animationDelay: `${i * 70}ms` } : undefined}
                      className={cn(
                        "flex flex-col rounded-lg border bg-card p-4 shadow-soft transition-all duration-300 sm:p-5 sm:hover:-translate-y-1 sm:hover:shadow-card",
                        card.popular ? "border-primary/30" : "border-border/70",
                        open && "animate-fade-in",
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4
                          className={cn(
                            "font-display text-sm font-bold sm:text-base",
                            accentText[service.accent],
                          )}
                        >
                          {card.name}
                        </h4>
                        {card.popular ? (
                          <span
                            className={cn(
                              "rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                              accentSoftBg[service.accent],
                              accentText[service.accent],
                            )}
                          >
                            Popular
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 font-display text-xl font-extrabold text-foreground numeric sm:mt-3 sm:text-2xl">
                        {card.price}
                        {card.period ? (
                          <span className="text-xs font-semibold text-muted-foreground sm:text-sm">
                            {card.period}
                          </span>
                        ) : null}
                      </p>
                      <ul className="mt-3 flex-1 space-y-1.5 sm:mt-4 sm:space-y-2">
                        {card.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6"
                          >
                            <Check className={cn("mt-0.5 size-3.5 shrink-0 sm:mt-1", accentText[service.accent])} />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        onClick={() => onAdd({ id, service: service.title, pkg: card.name, price: priceLabel })}
                        className={cn(
                          "mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md text-xs font-semibold transition-all duration-300 sm:mt-5 sm:h-11 sm:text-sm",
                          inCart
                            ? "border border-border bg-background text-muted-foreground"
                            : card.popular
                              ? "bg-gradient-button text-primary-foreground shadow-soft hover:brightness-110"
                              : cn("border border-border bg-background hover:bg-accent/40", accentText[service.accent]),
                        )}
                      >
                        {inCart ? (
                          <>
                            <Check className="size-4" /> In cart
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="size-4" /> Add to cart
                          </>
                        )}
                      </button>
                    </div>
                  );

                })}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-border p-6">
                <p className="font-display text-base font-bold text-foreground">
                  Scoped on consultation
                </p>
                <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                  {service.title} is priced against your salon's size and service list. We'll confirm
                  scope before anything starts.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function CartBar({ cart, onRemove }: { cart: CartItem[]; onRemove: (id: string) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky bottom-0 z-40 border-t border-border/70 bg-card/95 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-10">
        <div
          className={cn(
            "grid transition-all duration-300",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden">
            <ul className="space-y-2 pt-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 rounded-md border border-border/70 bg-background px-4 py-3 text-sm"
                >
                  <span className="min-w-0">
                    <span className="font-semibold text-foreground">{item.service}</span>
                    <span className="text-muted-foreground"> — {item.pkg}</span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="font-semibold text-foreground numeric">{item.price}</span>
                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      aria-label={`Remove ${item.service} ${item.pkg}`}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <X className="size-4" />
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 py-4">
          <button
            type="button"
            onClick={() => setOpen((p) => !p)}
            className="flex items-center gap-2 text-sm font-semibold text-foreground"
          >
            <ShoppingCart className="size-4 text-primary" />
            {cart.length} package{cart.length > 1 ? "s" : ""} in cart
            {open ? <Minus className="size-4 text-muted-foreground" /> : <ChevronDown className="size-4 text-muted-foreground" />}
          </button>
          <a
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-md bg-gradient-button px-5 text-sm font-semibold text-primary-foreground shadow-soft transition-all duration-300 hover:brightness-110"
          >
            Book consultation
          </a>
        </div>
      </div>
    </div>
  );
}
