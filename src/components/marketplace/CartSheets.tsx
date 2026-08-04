import { useCart, inr } from "@/lib/cart-store";
import { BAG_ICON, HEART_ICON, CAT_META, ICONS, SERVICES } from "@/lib/marketplace-catalog";

function Svg({ html, className }: { html: string; className?: string | undefined }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function iconChipStyle(cat: string) {
  const meta = CAT_META[cat];
  return { background: meta?.soft ?? "var(--sage)", color: meta?.color ?? "var(--forest-deep)" };
}

/** Global cart + saved-services bottom sheets, opened from the navbar. */
export function CartSheets() {
  const {
    cart,
    wishlist,
    removeItem,
    toggleWish,
    subtotal,
    discount,
    total,
    upsell,
    cartOpen,
    setCartOpen,
    wishOpen,
    setWishOpen,
    toast,
    showToast,
    addItem,
  } = useCart();

  const recs = ["website", "insta-ads", "whatsapp"]
    .map((id) => SERVICES.find((s) => s.id === id))
    .filter((s): s is (typeof SERVICES)[number] => Boolean(s));

  const wishServices = wishlist
    .map((id) => SERVICES.find((s) => s.id === id))
    .filter((s): s is (typeof SERVICES)[number] => Boolean(s));

  return (
    <>
      {/* CART SHEET */}
      <div
        className={`overlay${cartOpen ? " open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setCartOpen(false);
        }}
      >
        <div className="sheet">
          <div className="sheet-handle" />
          <div className="sheet-header">
            <div
              className="sheet-icon"
              style={{ background: "var(--sage)", color: "var(--forest-deep)" }}
            >
              <Svg html={BAG_ICON} />
            </div>
            <div>
              <div className="sheet-title disp">Your cart</div>
              <div className="sheet-sub">
                {cart.length} item{cart.length === 1 ? "" : "s"} selected
              </div>
            </div>
            <button className="close-btn" onClick={() => setCartOpen(false)} aria-label="Close cart">
              ✕
            </button>
          </div>

          {cart.length === 0 ? (
            <>
              <div className="empty-state">
                <div className="ei">
                  <Svg html={BAG_ICON} />
                </div>
                <div>Your cart is empty</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>Popular picks to get started</div>
              </div>
              <div className="rec-row">
                {recs.map((s) => (
                  <div key={s.id} className="rec-card">
                    <div className="rec-icon" style={iconChipStyle(s.cat)}>
                      <Svg html={ICONS[s.id] ?? ""} />
                    </div>
                    <div className="rec-name">{s.name}</div>
                    <div className="rec-price">From {s.tiers[0]!.price}</div>
                    <button
                      className="rec-add"
                      onClick={() => {
                        const t = s.tiers[1] ?? s.tiers[0]!;
                        addItem({
                          serviceId: s.id,
                          name: s.name,
                          tier: t.label,
                          price: Number(t.price.replace(/[₹,]/g, "")),
                          period: t.period,
                        });
                        showToast(`Added ${s.name} — ${t.label} plan`);
                      }}
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {cart.map((item) => {
                const svc = SERVICES.find((s) => s.id === item.serviceId);
                return (
                  <div key={item.serviceId} className="cart-item">
                    <div className="cart-item-icon" style={iconChipStyle(svc?.cat ?? "seo")}>
                      <Svg html={ICONS[item.serviceId] ?? ""} />
                    </div>
                    <div className="cart-item-info">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-tier">
                        {item.tier} · {item.period}
                      </div>
                    </div>
                    <div className="cart-item-price">{inr(item.price)}</div>
                    <button
                      className="remove-btn"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => {
                        removeItem(item.serviceId);
                        showToast(`Removed ${item.name}`);
                      }}
                    >
                      ✕
                    </button>
                  </div>
                );
              })}

              {upsell ? (
                <div className="upsell-banner">
                  <span>
                    Add <b>{upsell.missing}</b> to complete the {upsell.bundleName} and save{" "}
                    {inr(upsell.discount)}.
                  </span>
                </div>
              ) : null}

              {discount > 0 ? (
                <div className="cart-savings-row" style={{ display: "flex" }}>
                  <span>Bundle savings</span>
                  <span>−{inr(discount)}</span>
                </div>
              ) : null}

              <div className="cart-total-row">
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--espresso-soft)" }}>
                  Total
                </span>
                <span
                  className="disp"
                  style={{ fontSize: 20, fontWeight: 600, color: "var(--espresso)" }}
                >
                  {inr(total)}
                </span>
              </div>
              <div
                style={{
                  padding: "0 20px",
                  fontSize: 11,
                  color: "var(--espresso-soft)",
                }}
              >
                Subtotal {inr(subtotal)} · taxes calculated at checkout
              </div>
              <button
                className="checkout-btn"
                onClick={() => showToast("Checkout coming soon — we'll be in touch")}
              >
                Proceed to checkout →
              </button>
            </>
          )}
        </div>
      </div>

      {/* WISHLIST SHEET */}
      <div
        className={`overlay${wishOpen ? " open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setWishOpen(false);
        }}
      >
        <div className="sheet">
          <div className="sheet-handle" />
          <div className="sheet-header">
            <div
              className="sheet-icon"
              style={{ background: "#FBEAE5", color: "var(--rust)" }}
            >
              <Svg html={HEART_ICON} />
            </div>
            <div>
              <div className="sheet-title disp">Saved services</div>
              <div className="sheet-sub">
                {wishlist.length} saved for later
              </div>
            </div>
            <button
              className="close-btn"
              onClick={() => setWishOpen(false)}
              aria-label="Close saved services"
            >
              ✕
            </button>
          </div>

          {wishServices.length === 0 ? (
            <div className="empty-state">
              <div className="ei">
                <Svg html={HEART_ICON} />
              </div>
              <div>Nothing saved yet</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>
                Tap the heart on any service to save it
              </div>
            </div>
          ) : (
            wishServices.map((s) => (
              <div key={s.id} className="cart-item">
                <div className="cart-item-icon" style={iconChipStyle(s.cat)}>
                  <Svg html={ICONS[s.id] ?? ""} />
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{s.name}</div>
                  <div className="cart-item-tier">From {s.tiers[0]!.price}</div>
                </div>
                <button
                  className="wish-remove"
                  aria-label={`Remove ${s.name} from saved`}
                  onClick={() => toggleWish(s.id)}
                >
                  <Svg html={HEART_ICON} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className={`toast${toast ? " show" : ""}`}>{toast}</div>
    </>
  );
}
