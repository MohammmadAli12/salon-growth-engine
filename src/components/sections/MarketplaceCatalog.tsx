import { useState } from "react";
import { Check, ChevronDown, Minus, Plus, ShoppingCart, X } from "lucide-react";
import { Section, accentSoftBg, accentText } from "@/components/layout/primitives";
import { ServiceIcon } from "@/components/sections/ServicesGrid";
import { services, type ServiceItem } from "@/lib/site-data";
import { serviceCategories, serviceDetails, type PackageTable } from "@/lib/marketplace-data";
import { cn } from "@/lib/utils";

type CartItem = { id: string; service: string; pkg: string; price: string };

/** Turns a comparison table column into card deliverables. */
function deliverablesFor(table: PackageTable, index: number): string[] {
  return table.rows
    .map((row) => {
      const cell = row.cells[index] ?? "";
      if (cell === "no" || cell === "-" || cell === "") return null;
      if (cell === "yes") return row.label;
      return `${row.label}: ${cell}`;
    })
    .filter((v): v is string => v !== null);
}

export function MarketplaceCatalog() {
  const [openCategory, setOpenCategory] = useState<string>(serviceCategories[0]!.id);
  const [openService, setOpenService] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const toggleCategory = (id: string) => {
    setOpenCategory((prev) => (prev === id ? "" : id));
    setOpenService(null);
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => (prev.some((i) => i.id === item.id) ? prev : [...prev, item]));
  };

  return (
    <>
      <Section className="pb-28">
        <div className="space-y-4">
          {serviceCategories.map((category) => {
            const items = services.filter((s) => serviceDetails[s.slug]?.category === category.id);
            if (items.length === 0) return null;
            const expanded = openCategory === category.id;

            return (
              <div
                key={category.id}
                className={cn(
                  "overflow-hidden rounded-lg border bg-card transition-all duration-300",
                  expanded ? "border-primary/25 shadow-card" : "border-border/70 shadow-soft",
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  aria-expanded={expanded}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-7"
                >
                  <span className="min-w-0">
                    <span className="block font-display text-lg font-bold text-foreground md:text-xl">
                      {category.label}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">
                      {category.description}
                    </span>
                  </span>
                  <span className="flex items-center gap-3 shrink-0">
                    <span className="hidden text-xs font-semibold text-muted-foreground sm:inline">
                      {items.length} service{items.length > 1 ? "s" : ""}
                    </span>
                    <ChevronDown
                      className={cn(
                        "size-5 text-muted-foreground transition-transform duration-300",
                        expanded && "rotate-180 text-primary",
                      )}
                    />
                  </span>
                </button>

                <div
                  className={cn(
                    "grid transition-all duration-500 ease-out",
                    expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-4 border-t border-border/70 bg-background px-5 py-6 md:px-7">
                      {items.map((service) => (
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
                </div>
              </div>
            );
          })}
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
  const table = detail?.packages;

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
        className="flex w-full items-start gap-4 p-5 text-left"
      >
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-md",
            accentSoftBg[service.accent],
          )}
        >
          <ServiceIcon name={service.icon} className={cn("size-5", accentText[service.accent])} />
        </span>

        <span className="min-w-0 flex-1">
          <span className="font-display text-lg font-bold text-foreground">{service.title}</span>
          <span className="mt-1 block text-sm leading-6 text-muted-foreground">
            {service.blurb}
          </span>
          <span className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
            {service.deliverables.slice(0, 4).map((d) => (
              <span
                key={d}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
              >
                <Check className={cn("size-3.5", accentText[service.accent])} />
                {d}
              </span>
            ))}
          </span>
        </span>

        <span
          className={cn(
            "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-sm font-semibold transition-colors",
            open ? "border-primary/40 text-primary" : "text-foreground",
          )}
        >
          {open ? "Hide" : "View packages"}
          <ChevronDown className={cn("size-4 transition-transform duration-300", open && "rotate-180")} />
        </span>
      </button>

      <div
        className={cn(
          "grid transition-all duration-500 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border/70 bg-background px-5 py-6">
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
              {detail?.intro ?? service.blurb}
            </p>

            {table && table.columns.length === 3 ? (
              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {table.columns.map((col, i) => {
                  const price = table.prices?.[i] ?? "Price on consultation";
                  const id = `${service.slug}:${col}`;
                  const inCart = cart.some((item) => item.id === id);
                  return (
                    <div
                      key={col}
                      className={cn(
                        "flex flex-col rounded-lg border bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card",
                        i === 1 ? "border-primary/30" : "border-border/70",
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-display text-base font-bold text-foreground">{col}</h4>
                        {i === 1 ? (
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
                      <p className="mt-3 font-display text-2xl font-extrabold text-foreground numeric">
                        {price}
                      </p>
                      <ul className="mt-4 flex-1 space-y-2">
                        {deliverablesFor(table, i).map((d) => (
                          <li
                            key={d}
                            className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"
                          >
                            <Check className={cn("mt-1 size-3.5 shrink-0", accentText[service.accent])} />
                            {d}
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        onClick={() =>
                          onAdd({ id, service: service.title, pkg: col, price })
                        }
                        className={cn(
                          "mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-md text-sm font-semibold transition-all duration-300",
                          inCart
                            ? "border border-border bg-background text-muted-foreground"
                            : "bg-gradient-button text-primary-foreground shadow-soft hover:brightness-110",
                        )}
                      >
                        {inCart ? (
                          <>
                            <Check className="size-4" /> In cart
                          </>
                        ) : (
                          <>
                            <Plus className="size-4" /> Add to cart
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="mt-6 rounded-lg border border-dashed border-border p-6">
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
