import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUp,
  ArrowDown,
  CalendarDays,
  Flame,
  Heart,
  Instagram,
  MapPin,
  MessageCircle,
  MessagesSquare,
  MoreVertical,
  Trophy,
  Users,
} from "lucide-react";

import avatar1 from "@/assets/community/avatar-1.jpg";
import avatar2 from "@/assets/community/avatar-2.jpg";
import avatar3 from "@/assets/community/avatar-3.jpg";
import postSalon from "@/assets/community/post-salon.jpg";
import thumbWhatsapp from "@/assets/community/thumb-whatsapp.jpg";
import thumbGoogle from "@/assets/community/thumb-google.jpg";
import { cn } from "@/lib/utils";

const tabs = ["Trending", "Latest", "Unanswered", "Discussions", "Wins"] as const;

const threads = [
  {
    votes: 142,
    author: "Aditi K.",
    badge: "Verified Salon",
    badgeTone: "bg-sage/70 text-forest-deep",
    ago: "2h ago",
    avatar: avatar1,
    title: "How I got 317 bookings in July using Instagram Reels",
    body: "Sharing our exact strategy, ad spend, offers and results. Screenshots inside.",
    chips: ["Case Study", "Instagram Growth"],
    replies: 82,
    likes: 245,
    image: postSalon,
  },
  {
    votes: 98,
    author: "Rohit P.",
    badge: "Studio RP",
    badgeTone: "bg-muted text-muted-foreground",
    ago: "5h ago",
    avatar: avatar2,
    title: "Best WhatsApp message to bring back old customers?",
    body: "What messages actually work? Share your templates",
    chips: ["Discussion", "WhatsApp Marketing"],
    replies: 41,
    likes: 138,
    image: thumbWhatsapp,
  },
  {
    votes: 76,
    author: "Meera S.",
    badge: "Glow Beauty",
    badgeTone: "bg-muted text-muted-foreground",
    ago: "1d ago",
    avatar: avatar3,
    title: "Google profile tips that increased walk-ins by 2x",
    body: "Simple changes that made a big difference for our salon.",
    chips: ["Tips", "Google My Business"],
    replies: 57,
    likes: 221,
    image: thumbGoogle,
  },
];

const popularTopics = [
  { label: "Get More Customers", icon: Users, tint: "text-forest bg-forest/10" },
  { label: "Online Bookings", icon: CalendarDays, tint: "text-teal bg-teal/10" },
  { label: "WhatsApp Marketing", icon: MessageCircle, tint: "text-forest-light bg-forest-light/10" },
  { label: "Instagram Growth", icon: Instagram, tint: "text-plum bg-plum/10" },
  { label: "Google Visibility", icon: MapPin, tint: "text-rust bg-rust/10" },
];

export function HomeCommunity() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Trending");

  return (
    <section className="section">
      <div className="wrap">
        <div className="rounded-xl border border-border/70 bg-background p-4 shadow-soft md:p-6">
          {/* header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex gap-4">
              <span className="hidden size-14 shrink-0 items-center justify-center rounded-full bg-sage/60 sm:flex">
                <MessagesSquare className="size-6 text-forest-deep" />
              </span>
              <div>
                <p className="text-[11px] font-bold tracking-[0.14em] text-forest-deep">COMMUNITY</p>
                <h2 className="mt-1 font-display text-[28px] font-bold leading-tight text-foreground md:text-[34px]">
                  Salon owners are talking
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Ask, share and learn from real salon owners.
                </p>
                <p className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <span className="size-2 rounded-full bg-forest-light" />
                    312 owners online
                  </span>
                  <span>·</span>
                  <span className="numeric">1.2K members</span>
                </p>
              </div>
            </div>
            <Link
              to="/community"
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Go to Community <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* body */}
          <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="min-w-0 rounded-lg border border-border/70 bg-card">
              <div className="flex gap-5 overflow-x-auto border-b border-border/70 px-4 no-scrollbar">
                {tabs.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={cn(
                      "relative flex shrink-0 items-center gap-1.5 py-4 text-sm font-semibold transition-colors",
                      tab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {t === "Trending" ? <Flame className="size-4 text-rust" /> : null}
                    {t}
                    {tab === t ? (
                      <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-forest-deep" />
                    ) : null}
                  </button>
                ))}
              </div>

              <ul className="divide-y divide-border/70">
                {threads.map((p) => (
                  <li key={p.title}>
                    <Link to="/community" className="flex gap-3 p-4 transition-colors hover:bg-muted/40">
                      <span className="flex h-16 w-9 shrink-0 flex-col items-center justify-center gap-1 rounded-md border border-border/70 bg-background">
                        <ArrowUp className="size-3.5 text-forest" />
                        <span className="text-xs font-bold text-foreground numeric">{p.votes}</span>
                        <ArrowDown className="size-3.5 text-muted-foreground" />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <img
                            src={p.avatar}
                            alt={p.author}
                            loading="lazy"
                            width={512}
                            height={512}
                            className="size-6 rounded-full object-cover"
                          />
                          <span className="font-semibold text-foreground">{p.author}</span>
                          <span className={cn("rounded-sm px-2 py-0.5 text-[10px] font-semibold", p.badgeTone)}>
                            {p.badge}
                          </span>
                          <span>· {p.ago}</span>
                        </span>
                        <span className="mt-2 block font-display text-lg font-bold leading-snug text-foreground">
                          {p.title}
                        </span>
                        <span className="mt-1 block text-sm leading-6 text-muted-foreground">{p.body}</span>
                        <span className="mt-3 flex flex-wrap items-center gap-3">
                          {p.chips.map((c) => (
                            <span
                              key={c}
                              className="rounded-sm bg-muted px-2 py-1 text-[10px] font-semibold text-muted-foreground"
                            >
                              {c}
                            </span>
                          ))}
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground numeric">
                            <MessageCircle className="size-3.5" /> {p.replies} replies
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground numeric">
                            <Heart className="size-3.5" /> {p.likes}
                          </span>
                        </span>
                      </span>

                      <span className="hidden shrink-0 flex-col items-end gap-2 sm:flex">
                        <MoreVertical className="size-4 text-muted-foreground" />
                        <img
                          src={p.image}
                          alt={p.title}
                          loading="lazy"
                          width={768}
                          height={576}
                          className="h-[86px] w-[124px] rounded-md object-cover"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                to="/community"
                className="flex items-center justify-center gap-2 border-t border-border/70 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted/50"
              >
                View all discussions <ArrowRight className="size-4" />
              </Link>
            </div>

            {/* rail */}
            <div className="space-y-4">
              <div className="rounded-lg border border-border/70 bg-card p-5">
                <div className="flex gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sage/60">
                    <Users className="size-5 text-forest-deep" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Join the conversation</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Share your experience, get advice and grow together with salon owners.
                    </p>
                  </div>
                </div>
                <Link
                  to="/community"
                  className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-md border border-forest-deep/30 bg-card text-sm font-semibold text-forest-deep transition-colors hover:bg-muted"
                >
                  Join the Community
                </Link>
              </div>

              <div className="rounded-lg border border-border/70 bg-card p-5">
                <p className="text-sm font-semibold text-foreground">Popular Topics</p>
                <ul className="mt-4 space-y-1">
                  {popularTopics.map((t) => {
                    const Icon = t.icon;
                    return (
                      <li key={t.label}>
                        <Link
                          to="/community"
                          className="flex items-center gap-3 rounded-md px-1 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                        >
                          <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-md", t.tint)}>
                            <Icon className="size-4" />
                          </span>
                          <span className="min-w-0 flex-1 truncate">{t.label}</span>
                          <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <Link
                  to="/community"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest-deep"
                >
                  Explore all topics <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* share your win */}
        <div className="mt-4 flex flex-col gap-4 rounded-xl border border-border/70 bg-background p-5 shadow-soft md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold/12">
              <Trophy className="size-5 text-gold" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Share your win, inspire others</p>
              <p className="text-sm text-muted-foreground">
                Your success story can help thousands of salon owners.
              </p>
            </div>
          </div>
          <Link
            to="/community"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-card px-5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Share Your Story <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
