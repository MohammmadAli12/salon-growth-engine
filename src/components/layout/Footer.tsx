import { Link } from "@tanstack/react-router";
import brandWordmark from "@/assets/salon-genie-wordmark.png.asset.json";
import { Sparkles } from "lucide-react";
import { moreNav, primaryNav } from "@/lib/site-data";

const legal = [
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <img
              src={brandWordmark.url}
              alt="Salon Genie"
              width={220}
              height={92}
              className="h-12 w-auto object-contain"
              loading="lazy"
            />
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              The AI-powered growth platform for salons — websites, local search, ads, automation,
              learning, community and hiring in one place.
            </p>
            <p className="mt-6 text-sm text-muted-foreground">
              hello@salongenie.com · Bengaluru, India
            </p>
          </div>

          <nav aria-label="Platform">
            <h2 className="text-sm font-semibold text-foreground">Platform</h2>
            <ul className="mt-4 space-y-2.5">
              {primaryNav.slice(1).map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="text-sm font-semibold text-foreground">Company</h2>
            <ul className="mt-4 space-y-2.5">
              {moreNav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Salon Genie. All rights reserved.
          </p>
          <ul className="flex gap-5">
            {legal.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-xs text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
