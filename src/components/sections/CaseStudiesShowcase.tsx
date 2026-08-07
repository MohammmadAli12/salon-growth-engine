import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bookmark,
  Globe,
  MapPin,
  Sparkles,
  TrendingUp,
  ArrowUp,
} from "lucide-react";

/** Count-up number that animates once it scrolls into view. */
function Counter({
  target,
  suffix = "",
  decimals = 0,
}: {
  target: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const duration = 1500;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setValue(target * p);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="numeric">
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const heroStats = [
  { icon: TrendingUp, target: 250, suffix: "+", label: "Success stories" },
  { icon: ArrowUp, target: 45, suffix: "%", label: "Avg. booking increase" },
  { icon: Sparkles, target: 2.5, suffix: "x", decimals: 1, label: "Revenue growth" },
  { icon: Globe, target: 18, suffix: "+", label: "Cities covered" },
];

interface StudyCard {
  salon: string;
  location: string;
  image: string;
  headline: string;
  metrics: { value: string; label: string }[];
  quote: string;
  author: string;
  avatar: string;
}

const studies: StudyCard[] = [
  {
    salon: "The Shade Studio",
    location: "Bangalore, Karnataka",
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80",
    headline: "40 to 180 bookings in 3 months",
    metrics: [
      { value: "+350%", label: "More bookings" },
      { value: "40 → 180", label: "Monthly bookings" },
      { value: "3 mo", label: "Launch to lift" },
    ],
    quote: "\u201CSalon Genie helped us streamline\u2026\u201D",
    author: "— Priya Sharma, Owner",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
  },
  {
    salon: "Aura Beauty Lounge",
    location: "Pune, Maharashtra",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    headline: "Weekday slots stopped sitting empty",
    metrics: [
      { value: "+62%", label: "Weekday revenue" },
      { value: "2.1x", label: "Return clients" },
      { value: "18%", label: "No-shows reduced" },
    ],
    quote: "\u201CTheir reminders brought\u2026\u201D",
    author: "— Neha, Owner",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80",
  },
  {
    salon: "Urban Gents",
    location: "Delhi, India",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    headline: "Three outlets climbed the map pack",
    metrics: [
      { value: "2.4x", label: "Search traffic" },
      { value: "#1", label: "Local rank" },
      { value: "+28%", label: "Walk-ins" },
    ],
    quote: "\u201COur visibility went up\u2026\u201D",
    author: "— Sameer, Owner",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
  },
];

export function CaseStudiesShowcase() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-8">
      {/* Hero */}
      <div className="mb-6 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <div className="space-y-2 lg:col-span-6">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-secondary-foreground/80">
            <span>Case studies</span>
            <span className="text-accent">✦</span>
          </div>
          <h1 className="font-display text-4xl leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Proof that feels
            <br />
            worth{" "}
            <span className="italic text-primary underline decoration-primary/30 underline-offset-8">
              opening
            </span>{" "}
            <span className="font-display text-3xl text-accent">✦</span>
          </h1>
          <p className="max-w-md pt-1 text-sm text-muted-foreground sm:text-base">
            Three previews from salons that turned searches, offers and reminders into booked
            chairs.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border/60 bg-card/40 p-3 shadow-soft backdrop-blur-md sm:grid-cols-4 lg:col-span-6">
          {heroStats.map((s) => (
            <div
              key={s.label}
              className="group flex flex-col items-center justify-center rounded-xl border border-border/40 bg-card/80 p-4 text-center backdrop-blur-sm transition-all hover:bg-card hover:shadow-card"
            >
              <div className="mb-2 flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <s.icon className="size-4" />
              </div>
              <div className="font-display text-2xl font-bold text-foreground">
                <Counter target={s.target} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </div>
              <div className="text-[11px] font-medium leading-tight text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 flex justify-end">
        <Link
          to="/marketplace"
          className="group flex items-center gap-1 text-xs font-semibold text-foreground transition-colors hover:text-primary"
        >
          View all success stories
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Cards: horizontal snap slider on mobile, 3-col grid on desktop */}
      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-6 md:mx-0 md:grid md:grid-cols-3 md:px-0">
        {studies.map((study) => (
          <article
            key={study.salon}
            className="group relative flex h-[540px] w-[88vw] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-[28px] p-6 text-white shadow-card transition-all duration-500 hover:-translate-y-2 active:-translate-y-2 sm:w-[380px] md:w-auto"
          >
            <img
              src={study.image}
              alt={`${study.salon} in ${study.location}`}
              loading="lazy"
              className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-active:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/95 via-forest-deep/45 to-forest-deep/20 transition-all duration-500 group-hover:via-forest-deep/35" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="space-y-1">
                <span className="inline-block rounded-full border border-white/10 bg-primary/90 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider shadow-soft backdrop-blur-md">
                  {study.salon}
                </span>
                <div className="flex items-center gap-1 pl-1 text-[11px] font-medium text-white/80">
                  <MapPin className="size-3.5" />
                  {study.location}
                </div>
              </div>
              <button
                type="button"
                aria-label={`Save ${study.salon} case study`}
                className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/30 backdrop-blur-md transition-all hover:scale-110 hover:bg-white hover:text-foreground"
              >
                <Bookmark className="size-4" />
              </button>
            </div>

            <div className="relative z-10 space-y-4">
              <h2 className="font-display text-3xl leading-tight transition-transform duration-300 group-hover:translate-x-1">
                {study.headline}
              </h2>

              <div className="grid grid-cols-3 gap-2 py-1">
                {study.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-white/10 bg-white/10 p-2.5 backdrop-blur-md transition-all duration-300 group-hover:bg-white/20"
                  >
                    <div className="text-lg font-bold numeric">{m.value}</div>
                    <div className="text-[9px] text-white/70">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-white/15 pt-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <img
                    src={study.avatar}
                    alt={study.author.replace("— ", "")}
                    loading="lazy"
                    className="size-9 shrink-0 rounded-full object-cover ring-2 ring-white/30"
                  />
                  <div className="truncate text-[11px] leading-tight">
                    <p className="truncate text-white/85">{study.quote}</p>
                    <p className="font-medium text-white/60">{study.author}</p>
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-primary px-3.5 py-2 text-xs font-semibold shadow-soft backdrop-blur-md transition-all hover:scale-105 active:scale-95"
                >
                  View story
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom callout */}
      <div className="mt-4 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border/60 bg-secondary p-6 shadow-soft transition-shadow hover:shadow-card md:flex-row">
        <div className="flex items-center gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-accent shadow-soft">
            <Sparkles className="size-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">
              Your salon could be the next success story.
            </h2>
            <p className="text-xs text-muted-foreground">
              Join hundreds of salon owners growing with Salon Genie.
            </p>
          </div>
        </div>
        <Link
          to="/contact"
          className="shrink-0 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-soft transition-all hover:shadow-card active:scale-95"
        >
          Share your story →
        </Link>
      </div>
    </main>
  );
}
