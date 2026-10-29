import { Link, useLocation } from "@tanstack/react-router";
import { useState, useRef, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, ChevronsLeft, Search, LayoutDashboard, CalendarClock, FileCheck2, Users, Lock, Code2, Video, Mail, KanbanSquare, User, HelpCircle, Settings, LogOut } from "lucide-react";
import { Logo } from "./ui";
import { notifications } from "@/data/mock";
import { cn } from "@/lib/utils";

export type Role = "candidate" | "coordinator" | "hr";
const menus: Record<Role, { label: string; to: string; icon: typeof Bell; section?: string }[]> = {
  candidate: [
    { label: "Overview", to: "/candidate", icon: LayoutDashboard },
    { label: "Coding Test", to: "/test", icon: Code2 },
    { label: "Interview Room", to: "/interview", icon: Video },
    { label: "Notifications", to: "/notifications", icon: Mail },
  ],
  coordinator: [
    { label: "Overview", to: "/coordinator", icon: LayoutDashboard },
    { label: "Verification", to: "/coordinator", icon: FileCheck2, section: "verification" },
    { label: "Pipeline", to: "/coordinator", icon: KanbanSquare, section: "pipeline" },
    { label: "Schedule", to: "/coordinator", icon: CalendarClock, section: "schedule" },
    { label: "Notifications", to: "/notifications", icon: Mail },
  ],
  hr: [
    { label: "Overview", to: "/hr", icon: LayoutDashboard },
    { label: "Grading Vault", to: "/hr/vault", icon: Lock },
    { label: "Verification", to: "/hr", icon: FileCheck2, section: "verification" },
    { label: "Pipeline", to: "/hr", icon: KanbanSquare, section: "pipeline" },
    { label: "Interview Room", to: "/interview", icon: Video },
    { label: "Schedule", to: "/hr", icon: CalendarClock, section: "schedule" },
    { label: "Candidates", to: "/coordinator", icon: Users },
    { label: "Notifications", to: "/notifications", icon: Mail },
  ],
};
const people: Record<Role, { name: string; title: string }> = {
  candidate: { name: "Aarav Sharma", title: "Candidate · IIT Bombay" },
  coordinator: { name: "Rahul Desai", title: "Placement Coordinator" },
  hr: { name: "Priya Kapoor", title: "HR · Interviewer" },
};

function useOutside(cb: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && cb();
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, [cb]);
  return ref;
}

export function BellMenu() {
  const [open, setOpen] = useState(false);
  const [extraNotifications, setExtraNotifications] = useState<any[]>([]);
  useEffect(() => { const read = () => { try { setExtraNotifications(JSON.parse(localStorage.getItem("inteva-notifications-extra") || "[]")); } catch { setExtraNotifications([]); } }; read(); window.addEventListener("storage", read); window.addEventListener("inteva-notifications-updated", read); return () => { window.removeEventListener("storage", read); window.removeEventListener("inteva-notifications-updated", read); }; }, []);
  const ref = useOutside(() => setOpen(false));
  const allNotifications = [...extraNotifications, ...notifications];
  const unread = allNotifications.filter((n) => n.unread).length;
  return (
    <div ref={ref} className="relative">
      <button aria-label={`Notifications, ${unread} unread`} onClick={() => setOpen(!open)} className="relative grid size-10 place-items-center rounded-xl glass text-foreground">
        <Bell className="size-4" />
        <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-brand text-[10px] font-bold text-primary-foreground">{unread}</span>
      </button>
      <AnimatePresence>{open && (
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass absolute right-0 z-50 mt-2 w-80 rounded-2xl p-2 shadow-soft">
          <div className="flex items-center justify-between px-3 py-2"><span className="text-sm font-bold text-foreground">Alerts</span><span className="flex items-center gap-1.5 text-xs text-success"><span className="relative size-2"><span className="absolute inset-0 rounded-full bg-success animate-pulse-ring" /><span className="absolute inset-0 rounded-full bg-success" /></span>Live</span></div>
          {allNotifications.slice(0, 5).map((n) => (
            <div key={n.id} className="rounded-xl px-3 py-2.5 hover:bg-secondary">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">{n.unread && <span className="size-1.5 rounded-full bg-violet" />}{n.title}</div>
              <p className="text-xs">{n.body}</p><span className="text-[11px] text-dim">{n.time}</span>
            </div>
          ))}
          <Link to="/notifications" className="block rounded-xl px-3 py-2 text-center text-xs font-semibold text-brand">Open notification center</Link>
        </motion.div>
      )}</AnimatePresence>
    </div>
  );
}

export function AvatarMenu({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const ref = useOutside(() => setOpen(false));
  const initials = name.split(" ").map((p) => p[0]).join("");
  return (
    <div ref={ref} className="relative">
      <button aria-label="Account menu" onClick={() => setOpen(!open)} className="grid size-10 place-items-center rounded-full bg-brand text-sm font-bold text-primary-foreground ring-2 ring-background">{initials}</button>
      <AnimatePresence>{open && (
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass absolute right-0 z-50 mt-2 w-52 rounded-2xl p-2 shadow-soft">
          <div className="px-3 py-2 text-sm font-semibold text-foreground">{name}</div>
          {[[User, "Profile"], [HelpCircle, "Help"], [Settings, "Settings"]].map(([I, l]) => { const Ic = I as typeof User; return <button key={l as string} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-secondary hover:text-foreground"><Ic className="size-4" />{l as string}</button>; })}
          <Link to="/" className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-destructive hover:bg-secondary"><LogOut className="size-4" />Logout</Link>
        </motion.div>
      )}</AnimatePresence>
    </div>
  );
}

export function DashShell({ role, title, children }: { role: Role; title: string; children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const loc = useLocation();
  const items = menus[role];
  useEffect(() => { let section = ""; try { section = sessionStorage.getItem("inteva-scroll-section") || ""; if (section) sessionStorage.removeItem("inteva-scroll-section"); } catch {} if (!section) return; const timer = window.setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" }), 120); return () => window.clearTimeout(timer); }, [loc.pathname]);
  return (
    <div className="flex min-h-screen">
      <motion.aside animate={{ width: collapsed ? 76 : 248 }} transition={{ duration: 0.3 }} className="sticky top-0 hidden h-screen shrink-0 flex-col border-r bg-card/50 p-3 md:flex">
        <div className="flex h-12 items-center justify-between px-2">
          {!collapsed && <Link to="/"><Logo /></Link>}
          <button aria-label="Toggle sidebar" onClick={() => setCollapsed(!collapsed)} className="rounded-lg p-1.5 hover:bg-secondary"><ChevronsLeft className={cn("size-4 transition", collapsed && "rotate-180")} /></button>
        </div>
        <nav className="mt-6 flex flex-1 flex-col gap-1">
          {items.map((it, i) => {
            const active = loc.pathname === it.to && i === items.findIndex((x) => x.to === it.to);
            return (
              <Link key={it.label} to={it.to} title={collapsed ? it.label : undefined} onClick={(e) => { if (it.section) { if (loc.pathname === it.to) { e.preventDefault(); document.getElementById(it.section)?.scrollIntoView({ behavior: "smooth", block: "start" }); } else { try { sessionStorage.setItem("inteva-scroll-section", it.section); } catch {} } } }} className={cn("relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium hover:text-foreground", active && "text-foreground")}>
                {active && <motion.span layoutId="side-active" className="absolute inset-0 rounded-xl bg-violet/15 ring-1 ring-violet/30" />}
                <it.icon className="relative size-4 shrink-0" />{!collapsed && <span className="relative">{it.label}</span>}
              </Link>
            );
          })}
        </nav>
        {!collapsed && <RoleSwitch />}
      </motion.aside>
      <div className="flex min-w-0 flex-1 flex-col pb-20 md:pb-0">
        <header className="glass sticky top-0 z-30 flex h-16 items-center gap-3 border-x-0 border-t-0 px-5">
          <h1 className="text-lg font-bold md:text-xl">{title}</h1>
          <div className="ml-auto hidden items-center gap-2 rounded-xl border bg-background/50 px-3 py-2 sm:flex"><Search className="size-4 text-dim" /><input aria-label="Search" placeholder="Search candidates, rounds…" className="w-56 bg-transparent text-sm text-foreground outline-none placeholder:text-dim" /></div>
          <div className="ml-auto flex items-center gap-2 sm:ml-0"><BellMenu /><AvatarMenu name={people[role].name} /></div>
        </header>
        <motion.main key={loc.pathname} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex-1 p-5 md:p-8">{children}</motion.main>
      </div>
      <nav className="glass fixed inset-x-0 bottom-0 z-30 flex justify-around border-x-0 border-b-0 py-2 md:hidden">
        {items.slice(0, 4).map((it) => <Link key={it.label} to={it.to} onClick={(e) => { if (it.section) { if (loc.pathname === it.to) { e.preventDefault(); document.getElementById(it.section)?.scrollIntoView({ behavior: "smooth", block: "start" }); } else { try { sessionStorage.setItem("inteva-scroll-section", it.section); } catch {} } } }} aria-label={it.label} className="flex flex-col items-center gap-1 px-3 text-[10px]"><it.icon className="size-5" />{it.label}</Link>)}
      </nav>
    </div>
  );
}

function RoleSwitch() {
  return (
    <div className="rounded-xl border bg-background/40 p-3">
      <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-dim">Demo · switch role</div>
      <div className="grid grid-cols-3 gap-1 text-[11px] font-semibold">
        <Link to="/candidate" className="rounded-lg py-1.5 text-center hover:bg-secondary" activeProps={{ className: "bg-secondary text-foreground" }}>Cand.</Link>
        <Link to="/coordinator" className="rounded-lg py-1.5 text-center hover:bg-secondary" activeProps={{ className: "bg-secondary text-foreground" }}>Coord.</Link>
        <Link to="/hr" className="rounded-lg py-1.5 text-center hover:bg-secondary" activeProps={{ className: "bg-secondary text-foreground" }}>HR</Link>
      </div>
    </div>
  );
}

export function Stat({ label, value, suffix, delta, icon: I }: { label: string; value: ReactNode; suffix?: string; delta?: string; icon: typeof Bell }) {
  return (
    <div className="lift rounded-2xl border bg-card p-5">
      <div className="flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-wider text-dim">{label}</span><span className="grid size-9 place-items-center rounded-xl bg-violet/15 text-foreground"><I className="size-4" /></span></div>
      <div className="mt-3 text-3xl font-extrabold text-foreground">{value}{suffix}</div>
      {delta && <div className="mt-1 text-xs text-success">{delta}</div>}
    </div>
  );
}

export function Bars({ data }: { data: { d: string; v: number }[] }) {
  const max = Math.max(...data.map((x) => x.v));
  return (
    <div className="flex h-44 items-end gap-3">
      {data.map((x, i) => (
        <div key={x.d} className="flex flex-1 flex-col items-center gap-2">
          <motion.div title={`${x.v}`} className="w-full rounded-t-lg bg-brand" initial={{ height: 0 }} animate={{ height: `${(x.v / max) * 140}px` }} transition={{ duration: 0.6, delay: i * 0.05 }} />
          <span className="text-[11px] text-dim">{x.d}</span>
        </div>
      ))}
    </div>
  );
}
