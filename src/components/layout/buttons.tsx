import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function GradientButton({
  to,
  children,
  className,
  size = "md",
}: {
  to: string;
  children: React.ReactNode;
  className?: string | undefined;
  size?: "sm" | "md";
}) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-gradient-button font-semibold text-primary-foreground shadow-soft transition-all duration-300 hover:shadow-card hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        size === "md" ? "h-14 px-7 text-base" : "h-11 px-5 text-sm",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function GhostButton({
  to,
  children,
  className,
  size = "md",
}: {
  to: string;
  children: React.ReactNode;
  className?: string | undefined;
  size?: "sm" | "md";
}) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center justify-center rounded-md border border-border bg-card font-semibold text-foreground transition-all duration-300 hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        size === "md" ? "h-14 px-7 text-base" : "h-11 px-5 text-sm",
        className,
      )}
    >
      {children}
    </Link>
  );
}
