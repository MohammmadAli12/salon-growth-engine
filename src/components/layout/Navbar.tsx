import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Heart, Menu, ShoppingBag, X } from "lucide-react";
import brandIcon from "@/assets/salon-genie-icon.png.asset.json";
import { moreNav, primaryNav } from "@/lib/site-data";
import { GradientButton } from "./buttons";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-store";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart, wishlist, setCartOpen, setWishOpen } = useCart();


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        scrolled ? "border-border/70 bg-background/85 backdrop-blur-xl" : "border-transparent bg-background",
      )}
    >
      <nav className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between px-5 md:px-10">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)} aria-label="Salon Genie home">
          <img
            src={brandIcon.url}
            alt="Salon Genie"
            width={36}
            height={36}
            className="size-9 rounded-md object-contain"
          />
          <span className="font-display text-lg font-extrabold tracking-tight text-foreground">
            Salon Genie
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-primary bg-accent" }}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors group-hover:bg-accent group-hover:text-foreground"
            >
              More
              <ChevronDown className="size-4" />
            </button>
            <div className="invisible absolute right-0 top-full w-52 translate-y-1 rounded-lg border border-border bg-card p-2 opacity-0 shadow-card transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {moreNav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeProps={{ className: "text-primary" }}
                  className="block rounded-sm px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Saved services"
            onClick={() => {
              setOpen(false);
              setWishOpen(true);
            }}
            className="relative flex size-10 items-center justify-center rounded-md border border-border bg-secondary text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Heart className="size-[17px]" />
            {wishlist.length > 0 ? (
              <span className="absolute -right-1.5 -top-1.5 flex size-[18px] items-center justify-center rounded-full border-[1.5px] border-background bg-rust text-[9.5px] font-bold text-primary-foreground">
                {wishlist.length}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            aria-label="Cart"
            onClick={() => {
              setOpen(false);
              setCartOpen(true);
            }}
            className="relative flex size-10 items-center justify-center rounded-md border border-border bg-secondary text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ShoppingBag className="size-[17px]" />
            {cart.length > 0 ? (
              <span className="absolute -right-1.5 -top-1.5 flex size-[18px] items-center justify-center rounded-full border-[1.5px] border-background bg-rust text-[9.5px] font-bold text-primary-foreground">
                {cart.length}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex size-11 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:text-primary lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

      </nav>

      {open ? (
        <div className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-background px-5 pb-10 pt-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {[...primaryNav, ...moreNav].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: "text-primary" }}
                  className="block rounded-md px-3 py-3 text-lg font-semibold text-foreground transition-colors hover:bg-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <GradientButton to="/contact" className="mt-6 w-full" >
            Book free consultation
          </GradientButton>
        </div>
      ) : null}
    </header>
  );
}
