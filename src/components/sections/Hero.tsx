import { ArrowRight, Star } from "lucide-react";
import { GhostButton, GradientButton } from "@/components/layout/buttons";
import { Eyebrow } from "@/components/layout/primitives";
import { stats } from "@/lib/site-data";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-12 md:px-10 md:pb-24 md:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-32 size-[420px] rounded-full bg-gradient-hero opacity-[0.10] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-64 size-[320px] rounded-full bg-gradient-marketplace opacity-[0.08] blur-3xl"
      />
      <div className="relative mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-soft">
              <span className="size-1.5 rounded-full bg-gradient-button" />
              AI-powered salon growth platform
            </span>

            <h1 className="mt-6 text-[38px] font-extrabold leading-[1.06] tracking-tight text-foreground md:text-[64px]">
              Grow your salon with{" "}
              <span className="text-gradient-hero">AI &amp; marketing</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              More clients, higher revenue, a stronger brand and a business that runs itself.
              Websites, local search, ads, WhatsApp and automation — built and managed for salon
              owners.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <GradientButton to="/contact">
                Book free consultation
                <ArrowRight className="ml-2 size-4" />
              </GradientButton>
              <GhostButton to="/marketplace">Explore marketplace</GhostButton>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-amber text-amber" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Rated 4.9 by the salon owners we work with
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-float">
              <Eyebrow>This month</Eyebrow>
              <p className="mt-3 font-display text-3xl font-extrabold text-foreground numeric">
                182 bookings
              </p>
              <p className="mt-1 text-sm text-muted-foreground">+38% vs. last month</p>

              <div className="mt-6 flex h-32 items-end gap-2">
                {[38, 52, 44, 67, 58, 81, 72, 96].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className="flex-1 rounded-sm bg-gradient-button opacity-90"
                  />
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-md bg-muted p-3">
                  <p className="text-xs text-muted-foreground">Cost / booking</p>
                  <p className="mt-1 font-semibold text-foreground numeric">₹41</p>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <p className="text-xs text-muted-foreground">Repeat rate</p>
                  <p className="mt-1 font-semibold text-foreground numeric">64%</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-10 -left-4 hidden rounded-xl border border-border/70 bg-card p-4 shadow-card lg:block">
              <p className="text-xs font-semibold text-teal">WhatsApp automation</p>
              <p className="mt-1 text-sm text-foreground">27 reminders sent today</p>
            </div>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-border/70 bg-card p-5 shadow-soft"
            >
              <dt className="text-sm text-muted-foreground">{s.label}</dt>
              <dd className="mt-2 font-display text-3xl font-extrabold text-foreground numeric md:text-4xl">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
