import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { BUNDLES, SERVICES } from "@/lib/marketplace-catalog";

export type CartItem = {
  serviceId: string;
  name: string;
  tier: string;
  price: number;
  period: string;
};

type CartContextValue = {
  cart: CartItem[];
  wishlist: string[];
  addItem: (item: CartItem) => void;
  removeItem: (serviceId: string) => void;
  clearCart: () => void;
  toggleWish: (serviceId: string) => void;
  subtotal: number;
  discount: number;
  total: number;
  upsell: { bundleName: string; missing: string; discount: number } | null;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  wishOpen: boolean;
  setWishOpen: (open: boolean) => void;
  toast: string | null;
  showToast: (message: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const CART_KEY = "salongrow_cart";
const WISH_KEY = "salongrow_wishlist";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const c = window.localStorage.getItem(CART_KEY);
      const w = window.localStorage.getItem(WISH_KEY);
      if (c) setCart(JSON.parse(c) as CartItem[]);
      if (w) setWishlist(JSON.parse(w) as string[]);
    } catch {
      /* ignore malformed storage */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
      window.localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
    } catch {
      /* ignore quota errors */
    }
  }, [cart, wishlist]);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
  }, []);

  const addItem = useCallback((item: CartItem) => {
    setCart((prev) => {
      const idx = prev.findIndex((c) => c.serviceId === item.serviceId);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = item;
        return next;
      }
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((serviceId: string) => {
    setCart((prev) => prev.filter((c) => c.serviceId !== serviceId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWish = useCallback((serviceId: string) => {
    setWishlist((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    );
  }, []);

  const { subtotal, discount, upsell } = useMemo(() => {
    const ids = cart.map((c) => c.serviceId);
    const sum = cart.reduce((s, i) => s + i.price, 0);
    let saved = 0;
    let miss: CartContextValue["upsell"] = null;
    for (const b of BUNDLES) {
      const have = b.services.filter((s) => ids.includes(s));
      if (have.length === b.services.length) {
        saved += b.discount;
      } else if (have.length === b.services.length - 1 && !miss) {
        const missingId = b.services.find((s) => !ids.includes(s))!;
        const svc = SERVICES.find((s) => s.id === missingId);
        miss = {
          bundleName: b.name,
          missing: svc ? svc.name : missingId,
          discount: b.discount,
        };
      }
    }
    return { subtotal: sum, discount: saved, upsell: miss };
  }, [cart]);

  const value: CartContextValue = {
    cart,
    wishlist,
    addItem,
    removeItem,
    clearCart,
    toggleWish,
    subtotal,
    discount,
    total: Math.max(0, subtotal - discount),
    upsell,
    cartOpen,
    setCartOpen,
    wishOpen,
    setWishOpen,
    toast,
    showToast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
