import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading, accentSoftBg, accentText } from "@/components/layout/primitives";
import { ServiceIcon } from "@/components/sections/ServicesGrid";
import { communityHighlights, courses } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function CommunityPreview() {
  return (
    <Section className="bg-card">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Community"
            title="A network of salon owners who share what works"
            description="Join owner circles, swap playbooks and get group pricing from vendors — free for every Salon Genie client."
          />
          <Link
            to="/community"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
          >
            Join the community
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <ul className="grid gap-3">
          {communityHighlights.map((item) => (
            <li
              key={item.title}
              className="flex gap-4 rounded-lg border border-border/70 bg-background p-5"
            >
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-md",
                  accentSoftBg[item.accent],
                )}
              >
                <ServiceIcon name={item.icon} className={cn("size-5", accentText[item.accent])} />
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export function LearningPreview({ heading = true }: { heading?: boolean | undefined }) {
  return (
    <Section>
      {heading ? (
        <SectionHeading
          eyebrow="Learning"
          title="Courses for owners, managers and stylists"
          description="Short, practical lessons you can apply the same week — taught from campaigns we've actually run."
        />
      ) : null}

      <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", heading && "mt-10")}>
        {courses.map((course) => (
          <article
            key={course.title}
            className="flex flex-col rounded-lg border border-border/70 bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
          >
            <span
              className={cn(
                "inline-flex w-fit rounded-sm px-2.5 py-1 text-[11px] font-semibold",
                accentSoftBg[course.accent],
                accentText[course.accent],
              )}
            >
              {course.level}
            </span>
            <h3 className="mt-4 font-display text-base font-bold leading-snug text-foreground">
              {course.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{course.body}</p>
            <p className="mt-4 text-xs font-medium text-muted-foreground numeric">
              {course.lessons} lessons
            </p>
          </article>
        ))}
      </div>

      {heading ? (
        <Link
          to="/learning"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
        >
          Browse all courses
          <ArrowRight className="size-4" />
        </Link>
      ) : null}
    </Section>
  );
}
