import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CalendarCheck2, ShieldCheck, Code2, Lock, Play, Mic, Video, MonitorUp, PhoneOff, UserCheck, Trophy, Repeat, Link2, GitBranch, EyeOff, CalendarPlus, Activity, Check, ArrowRight } from "lucide-react";
import { PublicNav, Footer } from "@/components/inteva/PublicNav";
import { Btn, Counter, Reveal, Orbs, Modal, SectionHead, Chip } from "@/components/inteva/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Inteva — Interviews, Scheduled Without the Chaos" },
      { name: "description", content: "AI-powered campus placement platform: conflict-free scheduling, verified candidates, three-round coding pipeline and live updates." },
      { property: "og:title", content: "Inteva — Interviews, Scheduled Without the Chaos" },
      { property: "og:description", content: "Conflict-free scheduling, verified candidates and a staged coding pipeline for campus hiring." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [demo, setDemo] = useState(false);
  return (
    <div id="top" className="overflow-x-hidden">
      <PublicNav />
      <Hero onDemo={() => setDemo(true)} />
      <Stats />
      <HowItWorks />
      <Features />
      <Candidates />
      <Employers />
      <Pricing />
      <Footer />
      <Modal open={demo} onClose={() => setDemo(false)} title="Inteva in 90 seconds">
        <div className="relative grid aspect-video place-items-center overflow-hidden rounded-xl border bg-background">
          <div className="absolute inset-0 grid-bg" /><div className="absolute size-48 rounded-full bg-violet/30 blur-3xl" />
          <button aria-label="Play demo" className="relative grid size-16 place-items-center rounded-full bg-brand shadow-glow"><Play className="size-6 fill-current text-primary-foreground" /></button>
        </div>
        <p className="mt-3 text-sm">See a cancellation ripple through the schedule and resolve itself in real time.</p>
      </Modal>
    </div>
  );
}

function Hero({ onDemo }: { onDemo: () => void }) {
  const reduce = useReducedMotion();
  return (
    <section className="relative min-h-screen pt-32 pb-20">
      {!reduce && <Orbs />}
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tighter md:text-7xl">
            <span className="text-gradient">Interviews, Scheduled Without the Chaos.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-6 max-w-xl text-lg leading-relaxed">
            Automatic conflict-free scheduling, verified candidates before they reach HR, a three-round coding pipeline, and live updates for every role.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-9 flex flex-wrap gap-3">
            <Link to="/apply"><Btn className="px-6 py-3.5 text-base">Apply as Candidate <ArrowRight className="size-4" /></Btn></Link>
            <Btn variant="glass" className="px-6 py-3.5 text-base" onClick={onDemo}><Play className="size-4" />Watch Demo</Btn>
          </motion.div>
          <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {[[CalendarCheck2, "Smart Scheduling"], [ShieldCheck, "Verified Candidates"], [Code2, "Live Coding Interviews"], [Lock, "Secure Grading Vault"]].map(([I, l]) => { const Ic = I as typeof Lock; return <span key={l as string} className="flex items-center gap-2"><Ic className="size-4 text-azure" />{l as string}</span>; })}
          </div>
        </div>
        <HeroMockup />
      </div>
    </section>
  );
}

function HeroMockup() {
  return (
    <motion.div initial={{ opacity: 0, rotateY: -18, rotateX: 8, y: 30 }} animate={{ opacity: 1, rotateY: -10, rotateX: 5, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} style={{ transformPerspective: 1400 }} className="relative">
      <div className="absolute -inset-6 rounded-[2rem] bg-brand opacity-25 blur-3xl" />
      <div className="glass relative rounded-3xl p-4 shadow-soft">
        <div className="mb-3 flex items-center justify-between text-xs">
          <span className="flex items-center gap-2 text-foreground"><span className="size-2 rounded-full bg-destructive" />Live · Round 2 of 3</span><span className="font-mono">24:18</span>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2 space-y-3">
            {["Ananya R.", "Priya K."].map((n, i) => (
              <div key={n} className="relative aspect-[4/3] overflow-hidden rounded-xl border bg-gradient-to-br from-accent to-card">
                <div className="absolute inset-0 grid place-items-center"><div className={cn("grid size-12 place-items-center rounded-full text-sm font-bold text-primary-foreground", i ? "bg-azure" : "bg-violet")}>{n.slice(0, 2)}</div></div>
                <span className="absolute bottom-1.5 left-2 text-[10px] text-foreground">{n}</span>
              </div>
            ))}
          </div>
          <div className="col-span-3 rounded-xl border bg-background/80 p-3 font-mono text-[11px] leading-5">
            <div className="mb-2 flex gap-1.5"><span className="size-2 rounded-full bg-destructive/70" /><span className="size-2 rounded-full bg-warning/70" /><span className="size-2 rounded-full bg-success/70" /></div>
            {[["def ", "minRooms", "(slots):"], ["  slots.", "sort", "()"], ["  heap = []"], ["  for ", "s, e", " in slots:"], ["    if heap and heap[0] <= s:"], ["      heappop(heap)"], ["    heappush(heap, e)"], ["  return ", "len", "(heap)"]].map((l, i) => (
              <div key={i}><span className="mr-3 text-dim">{i + 1}</span><span className="text-violet">{l[0]}</span><span className="text-azure">{l[1]}</span><span className="text-muted-foreground">{l[2]}</span></div>
            ))}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {[["Problem solving", 88], ["Code quality", 74], ["Communication", 91]].map(([l, v]) => (
            <div key={l} className="rounded-xl border bg-card/60 p-2.5"><div className="text-[10px] text-dim">{l}</div><div className="text-sm font-bold text-foreground">{v}</div><div className="mt-1 h-1 rounded-full bg-secondary"><div className="h-full rounded-full bg-brand" style={{ width: `${v}%` }} /></div></div>
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-2">
          {[Mic, Video, MonitorUp].map((I, i) => <span key={i} className="grid size-9 place-items-center rounded-full bg-secondary text-foreground"><I className="size-4" /></span>)}
          <span className="grid size-9 place-items-center rounded-full bg-destructive text-destructive-foreground"><PhoneOff className="size-4" /></span>
        </div>
      </div>
      <div className="animate-float glass absolute -bottom-6 -left-6 hidden rounded-2xl p-3 text-xs sm:block">
        <div className="flex items-center gap-2 text-foreground"><Repeat className="size-4 text-success" />Conflict resolved</div><div className="text-dim">3 candidates reassigned · 0.4s</div>
      </div>
    </motion.div>
  );
}

function Stats() {
  return (
    <section className="relative border-y bg-card/30">
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {[[48210, "+", "Interviews scheduled"], [12940, "", "Conflicts auto-resolved"], [96500, "+", "Candidates verified"]].map(([n, s, l]) => (
          <div key={l as string} className="py-10 text-center">
            <div className="text-4xl font-extrabold text-brand md:text-5xl"><Counter to={n as number} suffix={s as string} /></div>
            <div className="mt-2 text-sm">{l as string}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const steps = [
    [UserCheck, "Apply & Verify", "Guest application, then Coordinator verification with auto-checks."],
    [Code2, "Online Coding Test", "Timed, in-browser editor, auto-run against hidden test cases."],
    [Video, "Live Coding Interviews", "Two online rounds over video with a shared editor."],
    [Trophy, "Final HR Decision", "Aggregated ranking and a clear, communicated outcome."],
  ] as const;
  return (
    <section id="how" className="mx-auto max-w-7xl px-5 py-28">
      <SectionHead eyebrow="How it works" title="Four stages. Zero spreadsheets." sub="Every candidate moves through the same fair, transparent pipeline." />
      <div ref={ref} className="relative grid gap-6 md:grid-cols-4">
        <div className="absolute left-0 right-0 top-12 hidden h-px bg-border md:block" />
        <motion.div style={{ scaleX }} className="absolute left-0 right-0 top-12 hidden h-px origin-left bg-brand shadow-glow md:block" />
        {steps.map(([I, t, d], i) => (
          <Reveal key={t} delay={i * 0.1}>
            <div className="lift relative rounded-2xl border bg-card p-6">
              <div className="relative mb-5 grid size-12 place-items-center rounded-xl bg-brand shadow-glow"><I className="size-5 text-primary-foreground" /></div>
              <span className="absolute right-5 top-5 font-mono text-3xl font-bold text-secondary">0{i + 1}</span>
              <h3 className="text-lg font-bold">{t}</h3><p className="mt-2 text-sm leading-relaxed">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const f = [
    [CalendarCheck2, "Constraint-based smart scheduling", "Panel availability, room capacity and candidate preferences solved in milliseconds.", "md:col-span-2 md:row-span-2", true],
    [Link2, "Candidate self-booking", "Dynamic links that only show genuinely free slots.", "", false],
    [Repeat, "Automated reschedule engine", "Ripple resolution on last-minute cancellations.", "", false],
    [GitBranch, "Multi-stage pipeline", "Pass/fail routing between rounds.", "", false],
    [EyeOff, "Blinded live rubric", "Panelists score independently — no anchoring.", "", false],
    [Lock, "Secure grading vault", "Password-gated, time-boxed, fully audited.", "md:col-span-2", false],
    [CalendarPlus, "Calendar sync & alerts", ".ics, Google Calendar, email and in-app.", "", false],
    [Activity, "Real-time dashboards", "Every role sees changes the moment they happen.", "md:col-span-2", false],
  ] as const;
  return (
    <section id="features" className="relative mx-auto max-w-7xl px-5 py-28">
      <SectionHead eyebrow="Features" title={<>Built for the <span className="text-brand">placement rush</span></>} />
      <div className="grid auto-rows-[minmax(170px,auto)] gap-4 md:grid-cols-4">
        {f.map(([I, t, d, span, big], i) => (
          <Reveal key={t} delay={(i % 4) * 0.06} className={span}>
            <div className="glass lift relative h-full overflow-hidden rounded-2xl p-6">
              <I className="size-6 text-azure" />
              <h3 className={cn("mt-4 font-bold", big ? "text-2xl" : "text-base")}>{t}</h3>
              <p className="mt-2 text-sm leading-relaxed">{d}</p>
              {big && <ScheduleViz />}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ScheduleViz() {
  const rows = [[0, 2, "Aarav"], [1, 3, "Diya"], [3, 2, "Kabir"], [0, 1, "Meera"], [2, 3, "Ishaan"]] as const;
  return (
    <div className="mt-8 space-y-2.5">
      {rows.map(([s, w, n], i) => (
        <div key={n} className="relative h-8 rounded-lg bg-background/50">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.08 }} className="absolute inset-y-1 flex items-center rounded-md bg-brand px-2 text-[11px] font-semibold text-primary-foreground" style={{ left: `${s * 16}%`, width: `${w * 16}%` }}>{n}</motion.div>
        </div>
      ))}
    </div>
  );
}

function Candidates() {
  return (
    <section id="candidates" className="mx-auto max-w-7xl px-5 py-20">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-3xl p-10 md:p-14">
          <div className="absolute -right-20 -top-20 size-80 rounded-full bg-violet/25 blur-3xl" />
          <div className="relative grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand">For candidates</span>
              <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">No account. No chasing. Just apply.</h2>
              <p className="mt-4 leading-relaxed">Fill one application, pick a slot that's actually free, and get every update the second it happens — with your grades and feedback, and nobody else's.</p>
              <Link to="/apply"><Btn className="mt-7">Start application <ArrowRight className="size-4" /></Btn></Link>
            </div>
            <ul className="space-y-3">
              {["Auto-saved draft — pick up where you left off", "Self-book interview slots in two clicks", "Add rounds to Google Calendar instantly", "Transparent status timeline"].map((t) => (
                <li key={t} className="flex items-center gap-3 rounded-xl border bg-background/40 p-4 text-sm text-foreground"><Check className="size-4 text-success" />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Employers() {
  return (
    <section id="employers" className="mx-auto max-w-7xl px-5 py-28">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand">For employers</span>
          <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">Two roles. One source of truth.</h2>
          <div className="mt-8 space-y-4">
            {[["HR / Interviewer", "Availability calendars, live rubric scoring, aggregated rankings and the grading vault."], ["Coordinator", "Verification queue with auto-checks, pipeline board and automated rescheduling — pass/fail only, never scores."]].map(([t, d]) => (
              <div key={t} className="rounded-2xl border bg-card p-5"><h3 className="font-bold">{t}</h3><p className="mt-1 text-sm">{d}</p></div>
            ))}
          </div>
          <Link to="/staff-login"><Btn variant="glass" className="mt-7">Staff Login <ArrowRight className="size-4" /></Btn></Link>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="glass rounded-3xl p-5 shadow-soft">
            <div className="mb-4 flex gap-2 text-xs"><Chip tone="brand">Coordinator view</Chip><Chip>Verification queue</Chip></div>
            {[["Aarav Sharma", "IIT Bombay", "success", "All checks passed"], ["Kabir Mehta", "BITS Pilani", "danger", "Invalid email"], ["Meera Nair", "VIT Vellore", "warning", "Duplicate profile"]].map(([n, c, t, s]) => (
              <div key={n} className="mb-2 flex items-center gap-3 rounded-xl border bg-background/40 p-3">
                <div className="grid size-9 place-items-center rounded-full bg-accent text-xs font-bold text-foreground">{(n ?? "").split(" ").map((x) => x[0]).join("")}</div>
                <div className="flex-1"><div className="text-sm font-semibold text-foreground">{n}</div><div className="text-xs text-dim">{c}</div></div>
                <Chip tone={t as "success"}>{s}</Chip>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    ["Starter", "₹0", "For a single department pilot", ["Up to 200 candidates", "Smart scheduling", "Email notifications"]],
    ["Campus", "₹24,999", "per placement season", ["Unlimited candidates", "3-round coding pipeline", "Reschedule engine", "Grading vault + audit log", "Calendar sync"]],
    ["Enterprise", "Custom", "For multi-campus recruiters", ["Everything in Campus", "SSO & custom roles", "Dedicated success manager"]],
  ] as const;
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-5 py-28">
      <SectionHead eyebrow="Pricing" title="Simple, season-based pricing" />
      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map(([n, p, s, f], i) => (
          <Reveal key={n} delay={i * 0.08}>
            <div className={cn("glass relative h-full rounded-3xl p-8", i === 1 && "shadow-glow md:-translate-y-4")}>
              {i === 1 && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-xs font-bold text-primary-foreground">Most Popular</span>}
              <h3 className="text-lg font-bold">{n}</h3>
              <div className="mt-4 text-4xl font-extrabold text-foreground">{p}</div><div className="text-sm text-dim">{s}</div>
              <ul className="mt-6 space-y-2.5 text-sm">{f.map((x) => <li key={x} className="flex gap-2"><Check className="size-4 text-success" />{x}</li>)}</ul>
              <Btn variant={i === 1 ? "primary" : "glass"} className="mt-8 w-full">{i === 2 ? "Contact sales" : "Get started"}</Btn>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
