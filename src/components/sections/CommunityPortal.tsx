import { useState } from "react";
import {
  ArrowRight,
  ArrowUp,
  BarChart3,
  Bookmark,
  Bot,
  CalendarDays,
  ChevronDown,
  DollarSign,
  Download,
  Flame,
  Gift,
  Instagram,
  MapPin,
  MessageCircle,
  MoreVertical,
  Plus,
  Scissors,
  Sparkles,
  Star,
  Store,
  Target,
  Trophy,
  UserPlus,
  Users,
  BadgeCheck,
} from "lucide-react";

import winOwner from "@/assets/community/win-owner.jpg";
import postSalon from "@/assets/community/post-salon.jpg";
import avatar1 from "@/assets/community/avatar-1.jpg";
import avatar2 from "@/assets/community/avatar-2.jpg";
import avatar3 from "@/assets/community/avatar-3.jpg";
import avatar4 from "@/assets/community/avatar-4.jpg";
import { cn } from "@/lib/utils";

const topics = [
  { label: "Trending", icon: Flame, tint: "text-rust bg-rust/10" },
  { label: "Get More Customers", icon: Users, tint: "text-forest bg-forest/10" },
  { label: "Increase Revenue", icon: DollarSign, tint: "text-olive bg-olive/10" },
  { label: "Booking Ideas", icon: CalendarDays, tint: "text-teal bg-teal/10" },
  { label: "Instagram Tips", icon: Instagram, tint: "text-plum bg-plum/10" },
  { label: "WhatsApp Marketing", icon: MessageCircle, tint: "text-forest-light bg-forest-light/10" },
  { label: "Google Reviews", icon: Star, tint: "text-gold bg-gold/10" },
  { label: "Salon Setup", icon: Scissors, tint: "text-espresso bg-muted" },
  { label: "Festival Offers", icon: Gift, tint: "text-rust bg-rust/10" },
  { label: "Hiring Staff", icon: UserPlus, tint: "text-teal bg-teal/10" },
  { label: "Supplier Deals", icon: Store, tint: "text-plum bg-plum/10" },
];

const posts = [
  {
    votes: 184,
    author: "Aditi K.",
    salon: "Xing Salon",
    ago: "2h ago",
    avatar: avatar1,
    title: "How we got 317 bookings in July using Instagram Reels",
    body: "Sharing our exact content strategy, offers and results. Screenshots inside.",
    tag: "CASE STUDY",
    replies: 23,
    image: postSalon,
  },
  {
    votes: 126,
    author: "Rohit P.",
    salon: "Studio RP",
    ago: "4h ago",
    avatar: avatar2,
    title: "Best WhatsApp message to bring back old customers?",
    body: "What messages actually work? Share your templates",
    tag: "DISCUSSION",
    replies: 41,
  },
  {
    votes: 98,
    author: "Meera S.",
    salon: "Glow Beauty",
    ago: "6h ago",
    avatar: avatar3,
    title: "Festival offer ideas that worked for you in 2024",
    body: "Share your best offers for Rakhi, Independence Day, Janmashtami, etc.",
    tag: "PLAYBOOK",
    replies: 32,
  },
  {
    votes: 74,
    author: "Lavanya V.",
    salon: "Lavanya's Salon",
    ago: "12h ago",
    avatar: avatar4,
    title: "Google Business Profile — simple tricks to rank higher",
    body: "3 things that helped us rank #1 in our city.",
    tag: "TIPS",
    replies: 18,
  },
];

const rooms = [
  { name: "WhatsApp Marketing", online: 48, icon: MessageCircle, tint: "bg-forest-light/12 text-forest-light" },
  { name: "Festival Offers", online: 19, icon: Gift, tint: "bg-rust/12 text-rust" },
  { name: "Instagram Growth", online: 32, icon: Instagram, tint: "bg-plum/12 text-plum" },
];

const contributors = [
  { rank: 1, name: "Aditi K.", salon: "Xing Salon", points: "+420", avatar: avatar1 },
  { rank: 2, name: "Rohit P.", salon: "Studio RP", points: "+380", avatar: avatar2 },
  { rank: 3, name: "Meera S.", salon: "Glow Beauty", points: "+295", avatar: avatar3 },
  { rank: 4, name: "Lavanya V.", salon: "Lavanya's Salon", points: "+260", avatar: avatar4 },
];

const quickActions = [
  { title: "Post a Question", body: "Get help from owners", icon: MessageCircle },
  { title: "Share a Win", body: "Inspire other salons", icon: Star },
  { title: "Ask AI", body: "Get instant guidance", icon: Bot },
  { title: "Download Templates", body: "Free resources", icon: Download },
];

const tabs = ["Trending", "Latest", "Unanswered"] as const;

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-lg border border-border/70 bg-card shadow-soft", className)}>
      {children}
    </div>
  );
}

export function CommunityPortal() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Trending");
  const [topic, setTopic] = useState("Trending");

  return (
    <div className="px-4 py-8 md:px-8 lg:py-12">
      <div className="mx-auto grid w-full max-w-[1400px] gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0">
          {/* Header */}
          <div className="flex flex-col gap-5 border-b border-border/70 pb-6 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-[30px] font-bold leading-tight text-foreground md:text-[38px]">
                Salunnn Owners Club
              </h1>
              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground md:text-base">
                Ask, learn and share what's working in your salon.
                <br />
                Grow together. Succeed together.
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                <span className="size-2 rounded-full bg-forest-light" />
                312 salon owners online
              </p>
            </div>
            <div className="flex w-full flex-col gap-2 md:w-auto md:min-w-[210px]">
              <button className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                <Plus className="size-4" />
                Ask a Question
              </button>
              <button className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-card px-5 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
                Browse Discussions
              </button>
            </div>
          </div>

          {/* Highlight strip */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="relative overflow-hidden rounded-lg border border-border/70 bg-sage/50 p-4">
              <span className="flex size-9 items-center justify-center rounded-full bg-gold/15">
                <Trophy className="size-5 text-gold" />
              </span>
              <p className="mt-3 text-sm font-semibold text-foreground">This Week's Win</p>
              <p className="text-xs text-muted-foreground">Xing Salon got</p>
              <p className="font-display text-xl font-bold text-forest-deep">+147 Bookings</p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                Read their story <ArrowRight className="size-3" />
              </span>
              <img
                src={winOwner}
                alt="Salon owner from Xing Salon"
                loading="lazy"
                width={640}
                height={640}
                className="pointer-events-none absolute -bottom-1 right-0 h-[112px] w-[96px] rounded-md object-cover object-top"
              />
            </div>

            <div className="rounded-lg border border-border/70 bg-teal/8 p-4">
              <span className="flex size-9 items-center justify-center rounded-full bg-teal/15">
                <BarChart3 className="size-5 text-teal" />
              </span>
              <p className="mt-3 text-sm font-semibold text-foreground">Today's Poll</p>
              <p className="mt-1 text-sm leading-5 text-muted-foreground">
                What's your biggest challenge right now?
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-teal">
                Vote now <ArrowRight className="size-3" />
              </span>
            </div>

            <div className="rounded-lg border border-border/70 bg-rust/8 p-4">
              <span className="flex size-9 items-center justify-center rounded-full bg-rust/15">
                <Target className="size-5 text-rust" />
              </span>
              <p className="mt-3 text-sm font-semibold text-foreground">Weekly Challenge</p>
              <p className="mt-1 text-sm leading-5 text-muted-foreground">
                Get 20 New Google Reviews
              </p>
              <p className="mt-3 text-xs font-medium text-muted-foreground numeric">
                246 owners joined
              </p>
            </div>

            <div className="rounded-lg border border-border/70 bg-forest/8 p-4">
              <span className="flex size-9 items-center justify-center rounded-full bg-forest/12">
                <Bot className="size-5 text-forest" />
              </span>
              <p className="mt-3 text-sm font-semibold text-foreground">AI Expert</p>
              <p className="mt-1 text-sm leading-5 text-muted-foreground">
                Ask AI anything about growing your salon
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-forest">
                Try now <ArrowRight className="size-3" />
              </span>
            </div>
          </div>

          {/* Topics + feed */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
            <aside>
              <p className="text-sm font-semibold text-foreground">Topics</p>
              <ul className="mt-3 space-y-1">
                {topics.map((t) => {
                  const Icon = t.icon;
                  const active = topic === t.label;
                  return (
                    <li key={t.label}>
                      <button
                        onClick={() => setTopic(t.label)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors",
                          active
                            ? "bg-sage/60 text-foreground"
                            : "text-muted-foreground hover:bg-muted",
                        )}
                      >
                        <span
                          className={cn(
                            "flex size-7 shrink-0 items-center justify-center rounded-md",
                            t.tint,
                          )}
                        >
                          <Icon className="size-4" />
                        </span>
                        <span className="truncate">{t.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
                Explore all topics <ArrowRight className="size-4" />
              </button>
            </aside>

            <div className="min-w-0">
              <div className="flex items-center justify-between gap-3 border-b border-border/70">
                <div className="flex gap-5 overflow-x-auto no-scrollbar">
                  {tabs.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={cn(
                        "relative shrink-0 pb-3 text-sm font-semibold transition-colors",
                        tab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {t}
                      {tab === t ? (
                        <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-forest-deep" />
                      ) : null}
                    </button>
                  ))}
                </div>
                <button className="mb-3 hidden items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground sm:inline-flex">
                  Most Upvoted <ChevronDown className="size-3.5" />
                </button>
              </div>

              <ul className="mt-4 space-y-3">
                {posts.map((p) => (
                  <li key={p.title}>
                    <Card className="flex gap-3 p-4 transition-shadow hover:shadow-card">
                      <div className="flex w-10 shrink-0 flex-col items-center gap-1 rounded-md border border-border/70 bg-background py-2">
                        <ArrowUp className="size-4 text-forest" />
                        <span className="text-xs font-bold text-foreground numeric">{p.votes}</span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <img
                            src={p.avatar}
                            alt={p.author}
                            loading="lazy"
                            width={512}
                            height={512}
                            className="size-6 rounded-full object-cover"
                          />
                          <span className="font-semibold text-foreground">{p.author}</span>
                          <span className="truncate">{p.salon}</span>
                          <span>· {p.ago}</span>
                          <BadgeCheck className="size-3.5 text-forest-light" />
                        </div>
                        <h3 className="mt-2 font-display text-lg font-bold leading-snug text-foreground">
                          {p.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">{p.body}</p>
                        <div className="mt-3 flex items-center gap-3">
                          <span className="rounded-sm bg-sage/70 px-2 py-1 text-[10px] font-bold tracking-wide text-forest-deep">
                            {p.tag}
                          </span>
                          <span className="text-xs font-medium text-muted-foreground numeric">
                            {p.replies} replies
                          </span>
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-col items-end justify-between">
                        <MoreVertical className="size-4 text-muted-foreground" />
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.title}
                            loading="lazy"
                            width={768}
                            height={576}
                            className="my-2 hidden h-[86px] w-[120px] rounded-md object-cover sm:block"
                          />
                        ) : null}
                        <Bookmark className="size-4 text-muted-foreground" />
                      </div>
                    </Card>
                  </li>
                ))}
              </ul>

              <button className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-card py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
                View all discussions <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

          {/* Quick actions */}
          <div className="mt-6 grid gap-3 rounded-lg border border-border/70 bg-card p-3 shadow-soft sm:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((a) => {
              const Icon = a.icon;
              return (
                <button
                  key={a.title}
                  className="flex items-center gap-3 rounded-md px-3 py-3 text-left transition-colors hover:bg-muted"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-sage/60">
                    <Icon className="size-4 text-forest-deep" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-foreground">{a.title}</span>
                    <span className="block text-xs text-muted-foreground">{a.body}</span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right rail */}
        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base font-bold text-foreground">Upcoming Meetups</h2>
              <button className="text-xs font-semibold text-primary">View all</button>
            </div>
            <div className="mt-4 rounded-md border border-border/70 bg-background p-4">
              <div className="flex gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-sage/60">
                  <Users className="size-4 text-forest-deep" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Bangalore Growth Circle</p>
                  <p className="mt-1 text-xs text-muted-foreground numeric">
                    15 Aug, 2024 · 6:00 PM
                  </p>
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" /> Koramangala, Bangalore
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[avatar1, avatar2, avatar3, avatar4].map((a, i) => (
                    <img
                      key={i}
                      src={a}
                      alt="Attendee"
                      loading="lazy"
                      width={512}
                      height={512}
                      className="size-7 rounded-full border-2 border-card object-cover"
                    />
                  ))}
                </div>
                <span className="rounded-full bg-muted px-2 py-1 text-[11px] font-semibold text-muted-foreground numeric">
                  +28
                </span>
              </div>
              <button className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                Join Meetup
              </button>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base font-bold text-foreground">Live Chat Rooms</h2>
              <button className="text-xs font-semibold text-primary">View all</button>
            </div>
            <ul className="mt-4 space-y-3">
              {rooms.map((r) => {
                const Icon = r.icon;
                return (
                  <li key={r.name} className="flex items-center gap-3">
                    <span
                      className={cn("flex size-9 shrink-0 items-center justify-center rounded-full", r.tint)}
                    >
                      <Icon className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">{r.name}</p>
                      <p className="inline-flex items-center gap-1 text-xs text-muted-foreground numeric">
                        <span className="size-1.5 rounded-full bg-forest-light" /> {r.online} online
                      </p>
                    </div>
                    <button className="rounded-md border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted">
                      Join
                    </button>
                  </li>
                );
              })}
            </ul>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base font-bold text-foreground">Top Contributors</h2>
              <span className="text-xs font-semibold text-primary">This Month</span>
            </div>
            <ul className="mt-4 space-y-3">
              {contributors.map((c) => (
                <li key={c.name} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "w-4 text-sm font-bold numeric",
                      c.rank <= 3 ? "text-gold" : "text-muted-foreground",
                    )}
                  >
                    {c.rank}
                  </span>
                  <img
                    src={c.avatar}
                    alt={c.name}
                    loading="lazy"
                    width={512}
                    height={512}
                    className="size-8 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">{c.name}</p>
                  </div>
                  <span className="hidden truncate rounded-sm bg-muted px-2 py-1 text-[10px] font-semibold text-muted-foreground sm:inline">
                    {c.salon}
                  </span>
                  <span className="text-sm font-bold text-forest numeric">{c.points}</span>
                </li>
              ))}
            </ul>
            <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-card py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
              View leaderboard <ArrowRight className="size-4" />
            </button>
          </Card>

          <Card className="flex items-center gap-3 p-5">
            <span className="flex size-9 items-center justify-center rounded-md bg-gold/12">
              <Sparkles className="size-4 text-gold" />
            </span>
            <p className="text-sm leading-5 text-muted-foreground">
              Free for every Salunnn client — no membership fee.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
