import { useMemo, useState } from "react";
import { useCart, inr } from "@/lib/cart-store";
import { CAT_META, ICONS, HEART_ICON, BAG_ICON, SERVICES, type Service } from "@/lib/marketplace-catalog";

function Svg({ html }: { html: string }) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

const CATS = [
  { id: "all", label: "All services" },
  { id: "web", label: "Website" },
  { id: "seo", label: "SEO" },
  { id: "ads", label: "Ads" },
  { id: "social", label: "Social" },
  { id: "whatsapp", label: "Chat" },
];

function chipStyle(cat: string) {
  const meta = CAT_META[cat];
  return { background: meta?.soft ?? "var(--sage)", color: meta?.color ?? "var(--forest-deep)" };
}

const priceNum = (p: string) => Number(p.replace(/[₹,]/g, ""));

/** Full SalonGrow marketplace: hero, filters, search, service grid and plan sheet. */
export function MarketplaceCatalog() {
  const { cart, wishlist, addItem, toggleWish, showToast, setCartOpen, discount, total } = useCart();
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");
  const [openService, setOpenService] = useState<Service | null>(null);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [compare, setCompare] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SERVICES.filter((s) => {
      const inCat = cat === "all" || s.cat === cat;
      const inQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q) ||
        s.tiers.some((t) => t.features.some((f) => f.toLowerCase().includes(q)));
      return inCat && inQuery;
    });
  }, [cat, query]);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SERVICES.filter((s) => s.name.toLowerCase().includes(q)).slice(0, 5);
  }, [query]);

  const count = cart.length;

  function openDetail(s: Service) {
    setOpenService(s);
    setCompare(false);
    const existing = cart.find((c) => c.serviceId === s.id);
    setSelectedTier(existing ? s.tiers.findIndex((t) => t.label === existing.tier) : null);
  }

  function handleAdd() {
    if (!openService || selectedTier === null) return;
    const t = openService.tiers[selectedTier]!;
    addItem({
      serviceId: openService.id,
      name: openService.name,
      tier: t.label,
      price: priceNum(t.price),
      period: t.period,
    });
    showToast(`Added ${openService.name} — ${t.label} plan`);
    setOpenService(null);
  }

  const allFeatures = openService
    ? Array.from(new Set(openService.tiers.flatMap((t) => t.features)))
    : [];

  return (
    <>
      {/* HERO */}
      <div className="hero">
        <div
          className="hero-particle"
          style={{ width: 70, height: 70, top: "8%", left: "8%", animationDuration: "16s" }}
        />
        <div
          className="hero-particle"
          style={{
            width: 40,
            height: 40,
            top: "60%",
            left: "82%",
            animationDuration: "12s",
            animationDelay: "-3s",
          }}
        />
        <div
          className="hero-particle"
          style={{
            width: 90,
            height: 90,
            top: "70%",
            left: "12%",
            animationDuration: "18s",
            animationDelay: "-6s",
          }}
        />
        <div className="hero-inner">
          <div className="hero-badge">✦ Salon Digital Marketing Services</div>
          <h1 className="disp">
            Grow your salon
            <br />
            with <em>proven</em> services
          </h1>
          <p>
            Pick the services you need, choose a plan that fits your budget, and start growing
            today.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="num disp">500+</div>
              <div className="lbl">Salons served</div>
            </div>
            <div className="hero-stat">
              <div className="num disp">₹2Cr+</div>
              <div className="lbl">Revenue generated</div>
            </div>
            <div className="hero-stat">
              <div className="num disp">4.9★</div>
              <div className="lbl">Avg rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="filter-wrap">
        {CATS.map((c) => (
          <div
            key={c.id}
            className={`ftab${cat === c.id ? " active" : ""}`}
            onClick={() => setCat(c.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setCat(c.id);
            }}
          >
            {c.id !== "all" ? <Svg html={ICONS[serviceIconFor(c.id)] ?? ""} /> : null}
            {c.label}
          </div>
        ))}
      </div>

      {/* PROGRESS */}
      <div className="progress-strip">
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${Math.min(100, Math.round((count / SERVICES.length) * 100))}%` }}
          />
        </div>
        <div className="progress-text">
          {count} of {SERVICES.length} services added
        </div>
      </div>

      {/* SEARCH */}
      <div className="search-wrap">
        <div className="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search services"
          />
        </div>
        <div className={`search-suggest${suggestions.length ? " show" : ""}`}>
          {suggestions.map((s) => (
            <div key={s.id} className="suggest-item" onClick={() => openDetail(s)}>
              <Svg html={ICONS[s.id] ?? ""} />
              {s.name}
            </div>
          ))}
        </div>
      </div>

      {/* SERVICE GRID */}
      <div className="services-grid">
        {filtered.length === 0 ? (
          <div className="empty-state" style={{ gridColumn: "1/-1" }}>
            <div className="ei">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
              </svg>
            </div>
            <div>No services found</div>
          </div>
        ) : (
          filtered.map((s) => {
            const inCart = cart.find((c) => c.serviceId === s.id);
            const meta = CAT_META[s.cat];
            return (
              <div
                key={s.id}
                className={`svc-card${inCart ? " has-item" : ""}`}
                style={{ ["--accent" as string]: meta?.color ?? "var(--forest)" }}
                onClick={() => openDetail(s)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") openDetail(s);
                }}
              >
                <button
                  className={`wish-btn${wishlist.includes(s.id) ? " active" : ""}`}
                  aria-label={`Save ${s.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWish(s.id);
                  }}
                >
                  <Svg html={HEART_ICON} />
                </button>
                {inCart ? <div className="added-badge">In cart</div> : null}
                <div className="svc-icon" style={chipStyle(s.cat)}>
                  <Svg html={ICONS[s.id] ?? ""} />
                </div>
                <div className="svc-name disp">{s.name}</div>
                <div className="svc-desc">{s.desc}</div>
                <div className="svc-from">
                  From <b>{s.tiers[0]!.price}</b>
                </div>
                <button className={`svc-btn${inCart ? " added" : ""}`} tabIndex={-1}>
                  {inCart ? "✓ In cart" : "View plans"}
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* DETAIL SHEET */}
      <div
        className={`overlay${openService ? " open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpenService(null);
        }}
      >
        <div className="sheet">
          {openService ? (
            <>
              <div className="sheet-handle" />
              <div className="sheet-header">
                <div className="sheet-icon" style={chipStyle(openService.cat)}>
                  <Svg html={ICONS[openService.id] ?? ""} />
                </div>
                <div>
                  <div className="sheet-title disp">{openService.name}</div>
                  <div className="sheet-sub">{openService.desc}</div>
                </div>
                <button
                  className="close-btn"
                  onClick={() => setOpenService(null)}
                  aria-label="Close plans"
                >
                  ✕
                </button>
              </div>

              <div className="tiers-wrap">
                <div className="tiers-row-head">
                  <div className="tiers-label">Choose your plan</div>
                  <button className="compare-toggle" onClick={() => setCompare((v) => !v)}>
                    ⇄ {compare ? "Plan cards" : "Compare plans"}
                  </button>
                </div>

                {compare ? (
                  <div className="compare-wrap show">
                    <div className="compare-scroll">
                      <table className="compare-table">
                        <thead>
                          <tr>
                            <th>Feature</th>
                            {openService.tiers.map((t) => (
                              <th key={t.label}>
                                {t.label}
                                <div className="cth-price">
                                  {t.price} {t.period}
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {allFeatures.map((f) => (
                            <tr key={f}>
                              <td>{f}</td>
                              {openService.tiers.map((t) => (
                                <td key={t.label}>
                                  {t.features.includes(f) ? (
                                    <span className="chk">✓</span>
                                  ) : (
                                    <span className="dash">—</span>
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="tier-cards">
                    {openService.tiers.map((t, i) => (
                      <div
                        key={t.label}
                        className={`tier-card${selectedTier === i ? " selected" : ""}`}
                        onClick={() => setSelectedTier(i)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") setSelectedTier(i);
                        }}
                      >
                        {i === 1 ? <div className="popular-tag">Most popular</div> : null}
                        <div className="tier-check">✓</div>
                        <div className="tier-dots">
                          {[0, 1, 2].map((d) => (
                            <div key={d} className={`tdot${d <= i ? " on" : ""}`} />
                          ))}
                        </div>
                        <div
                          className="tier-badge"
                          style={{ background: t.badge, color: t.badgeText }}
                        >
                          {t.label}
                        </div>
                        <div className="tier-price disp">{t.price}</div>
                        <div className="tier-period">{t.period}</div>
                        <ul className="tier-features">
                          {t.features.map((f) => (
                            <li key={f}>{f}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ALSO ADD */}
              <div className="also-add" style={{ display: "block" }}>
                <div className="also-label">Frequently added together</div>
                <div className="also-row">
                  {SERVICES.filter(
                    (s) => s.id !== openService.id && !cart.some((c) => c.serviceId === s.id),
                  )
                    .slice(0, 4)
                    .map((s) => (
                      <div key={s.id} className="also-chip" onClick={() => openDetail(s)}>
                        <Svg html={ICONS[s.id] ?? ""} />
                        {s.name}
                        <span className="also-plus">+</span>
                      </div>
                    ))}
                </div>
              </div>

              <button className="add-to-cart-btn" disabled={selectedTier === null} onClick={handleAdd}>
                {selectedTier === null
                  ? "Select a plan to add →"
                  : `Add to cart · ${openService.tiers[selectedTier]!.price}`}
              </button>
            </>
          ) : null}
        </div>
      </div>

      {/* BOTTOM CART BAR */}
      <div className={`cart-bar${count > 0 ? " visible" : ""}`}>
        <div className="cart-bar-left">
          <div className="cart-bar-icon">
            <Svg html={BAG_ICON} />
          </div>
          <div>
            <div className="cart-bar-count">
              {count} item{count > 1 ? "s" : ""}
              {discount > 0 ? ` · saving ${inr(discount)}` : ""}
            </div>
            <div className="cart-bar-total">{inr(total)}</div>
          </div>
        </div>
        <button className="view-cart-btn" onClick={() => setCartOpen(true)}>
          View cart
        </button>
      </div>
    </>
  );
}

function serviceIconFor(cat: string) {
  const map: Record<string, string> = {
    web: "website",
    seo: "local-seo",
    ads: "google-ads",
    social: "insta-ads",
    whatsapp: "whatsapp",
  };
  return map[cat] ?? "website";
}
