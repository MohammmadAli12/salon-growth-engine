import { ArrowRight } from "lucide-react";
import { GhostButton, GradientButton } from "@/components/layout/buttons";

export function CtaBand() {
  return (
    <section className="px-5 pb-section md:px-10 lg:pb-section-lg">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl bg-gradient-hero p-8 shadow-float md:p-14">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/80">
            Free 30-minute consultation
          </p>
          <h2 className="mt-4 font-display text-[30px] font-extrabold leading-[1.12] text-primary-foreground md:text-[44px]">
            Let's map the next 90 days of your salon's growth
          </h2>
          <p className="mt-4 text-base leading-7 text-primary-foreground/85 md:text-lg">
            We'll audit your website, Google profile and booking flow, then show you exactly where
            the next 50 appointments come from. No obligation.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <GradientButton
              to="/contact"
              className="bg-none bg-card text-foreground hover:brightness-100 hover:opacity-90"
            >
              Book consultation
              <ArrowRight className="ml-2 size-4" />
            </GradientButton>
            <GhostButton
              to="/pricing"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:border-primary-foreground hover:text-primary-foreground"
            >
              See pricing
            </GhostButton>
          </div>
        </div>
      </div>
    </section>
  );
}
