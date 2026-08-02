import { Section, SectionHeading, accentSoftBg, accentText } from "@/components/layout/primitives";
import { GhostButton } from "@/components/layout/buttons";
import type { PackageTable } from "@/lib/marketplace-data";
import type { AccentName } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";

/**
 * Three-column package comparison. Renders strictly from the supplied table —
 * no prices or tiers are generated here.
 */
export function PackageComparison({
  id,
  serviceTitle,
  accent,
  table,
}: {
  id?: string | undefined;
  serviceTitle: string;
  accent: AccentName;
  table?: PackageTable | undefined;
}) {
  const ready = !!table && table.columns.length === 3 && table.rows.length > 0;

  return (
    <Section id={id} className="bg-card">
      <SectionHeading
        eyebrow="Packages"
        title={`Compare ${serviceTitle} packages`}
        description="Three packages, side by side, so you can see exactly what changes as you scale up."
      />

      {ready ? (
        <>
          {/* Desktop table */}
          <div className="mt-10 hidden overflow-hidden rounded-lg border border-border/70 bg-background md:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border/70">
                  <th className="w-[28%] px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    What's included
                  </th>
                  {table!.columns.map((col) => (
                    <th key={col} className="px-5 py-4">
                      <span
                        className={cn(
                          "inline-flex rounded-sm px-2.5 py-1 text-[11px] font-semibold",
                          accentSoftBg[accent],
                          accentText[accent],
                        )}
                      >
                        {col}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table!.prices ? (
                  <tr className="border-b border-border/70 bg-card/60">
                    <th className="px-5 py-4 text-sm font-semibold text-foreground">Price</th>
                    {table!.prices.map((price, i) => (
                      <td
                        key={`${price}-${i}`}
                        className="px-5 py-4 font-display text-lg font-extrabold text-foreground numeric"
                      >
                        {price}
                      </td>
                    ))}
                  </tr>
                ) : null}
                {table!.rows.map((row) => (
                  <tr key={row.label} className="border-b border-border/70 last:border-0">
                    <th className="px-5 py-4 text-sm font-medium text-foreground">{row.label}</th>
                    {row.cells.map((cell, i) => (
                      <td key={`${row.label}-${i}`} className="px-5 py-4 text-sm text-muted-foreground">
                        <Cell value={cell} accent={accent} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile stacked comparison */}
          <div className="mt-8 grid gap-4 md:hidden">
            {table!.columns.map((col, colIndex) => (
              <article key={col} className="rounded-lg border border-border/70 bg-background p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg font-bold text-foreground">{col}</h3>
                  {table!.prices?.[colIndex] ? (
                    <span className="font-display text-base font-extrabold text-foreground numeric">
                      {table!.prices[colIndex]}
                    </span>
                  ) : null}
                </div>
                <ul className="mt-4 space-y-2.5">
                  {table!.rows.map((row) => (
                    <li key={row.label} className="flex items-start gap-2 text-sm leading-6">
                      <Check className={cn("mt-1 size-3.5 shrink-0", accentText[accent])} />
                      <span className="text-muted-foreground">
                        <span className="font-medium text-foreground">{row.label}: </span>
                        {row.cells[colIndex]}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-10 rounded-lg border border-dashed border-border bg-background p-8 text-center">
          <p className="font-display text-lg font-bold text-foreground">
            Package details shared on your consultation
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            {serviceTitle} is scoped to your salon's size and service list. We'll walk you through
            the package options and confirm scope before anything starts.
          </p>
          <div className="mt-6 flex justify-center">
            <GhostButton to="/contact" size="sm">
              Talk to us
            </GhostButton>
          </div>
        </div>
      )}
    </Section>
  );
}

function Cell({ value, accent }: { value: string; accent: AccentName }) {
  if (value === "yes") return <Check className={cn("size-4", accentText[accent])} />;
  if (value === "no" || value === "-") return <Minus className="size-4 text-muted-foreground/60" />;
  return <>{value}</>;
}
