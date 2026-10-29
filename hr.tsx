import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X, BellRing } from "lucide-react";
import { Video, Users, Lock, Clock } from "lucide-react";
import { DashShell, Stat, Bars } from "@/components/inteva/DashShell";
import { Card, Chip, Btn, Ring } from "@/components/inteva/ui";
import { api } from "@/lib/services";
import { hd } from "@/lib/head";
import { toast } from "sonner";

export const Route = createFileRoute("/hr")({ head: () => hd("HR"), component: HR });
function HR() {
  const [iv, setIv] = useState<any[]>([]);
  const [c, setC] = useState<any[]>([]);
  const [w, setW] = useState<any[]>([]);
  const [time, setTime] = useState("15:00");
  const [loading, setLoading] = useState(true); const [loadError, setLoadError] = useState(false);
  const load = () => { setLoading(true); setLoadError(false); Promise.all([api.getInterviews(), api.getCandidates(), api.getAnalytics()]).then(([ivs, cs, a]) => { setIv(ivs); setC(cs); setW(a.weekly); }).catch(() => setLoadError(true)).finally(() => setLoading(false)); };
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const affected = [{ name: "Diya Iyer", old: "14:00", next: "17:15" }, { name: "Kabir Mehta", old: "14:00", next: "17:30" }, { name: "Ishaan Rao", old: "14:00", next: "18:00" }];
  const untouched = ["Aarav Sharma", "Meera Nair", "Rohan Patel"];
  useEffect(() => { load(); }, []);
  const clash = time === "16:30";
  return (
    <DashShell role="hr" title="HR dashboard">
      {loadError && <div className="mb-4 flex items-center justify-between rounded-xl border border-rose-400/20 p-4 text-sm"><span className="text-rose-300">Some HR dashboard data failed to load.</span><Btn variant="glass" onClick={load}>Retry</Btn></div>}
      {loading ? <div className="grid gap-4 sm:grid-cols-3">{[1,2,3,4].map((x) => <div key={x} className="h-28 animate-pulse rounded-2xl border bg-card" />)}</div> : <>
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Interviews today" value={6} icon={Video} />
        <Stat label="Panel load" value="4/6" icon={Users} />
        <Link to="/hr/vault"><Stat label="Grading vault" value="Locked" icon={Lock} /></Link>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card id="pipeline" className="lg:col-span-2 scroll-mt-24"><h3 className="mb-3 font-bold">Weekly interviews</h3><Bars data={w} /></Card>
        <Card className="grid place-items-center gap-2"><Ring value={72} size={110} label="72%" /><span className="text-sm text-muted-foreground">Panel capacity used</span></Card>
        <Card id="verification" className="scroll-mt-24"><h3 className="mb-3 font-bold">Upcoming interviews</h3><div className="space-y-2 text-sm">{iv.length ? iv.map((i) => <div key={i.id} className="rounded-xl bg-secondary p-3"><b>{i.candidate}</b><div className="text-xs text-dim">{i.round} · {i.when}</div></div>) : <p className="rounded-xl border border-dashed p-4 text-xs text-dim">No upcoming interviews scheduled.</p>}</div></Card>
        <Card id="schedule" className="scroll-mt-24"><h3 className="mb-3 font-bold">Edit round timing</h3>
          <select value={time} onChange={(e) => setTime(e.target.value)} className="w-full rounded-xl border bg-background/60 p-2.5 text-sm">{["15:00", "16:30", "17:15"].map((t) => <option key={t}>{t}</option>)}</select>
          <div className="mt-3">{clash ? <Chip tone="warning"><Clock className="mr-1 size-3" />Conflict with Diya Iyer · try 17:15</Chip> : <Chip tone="success">No conflicts</Chip>}</div>
          <Btn variant="danger" className="mt-4 w-full" onClick={() => setRescheduleOpen(true)}>Cancel 14:00 slot</Btn></Card>
        <Card><h3 className="mb-3 font-bold">Ranking matrix (HR only)</h3><ol className="space-y-1.5 text-sm">{[...c].sort((a, b) => b.score - a.score).slice(0, 5).map((x, i) => <li key={x.id} className="flex justify-between"><span>{i + 1}. {x.name}</span><b>{x.score}</b></li>)}</ol>{c.length === 0 && <p className="text-xs text-dim">Candidate rankings will appear here when results are available.</p>}</Card>
      </div>
      </>}
      {rescheduleOpen && <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm" onMouseDown={(e) => { if (e.target === e.currentTarget) setRescheduleOpen(false); }}><aside className="h-full w-full max-w-lg overflow-y-auto border-l border-white/10 bg-[#0B1120] p-5 shadow-2xl sm:p-7"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-violet-300">Ripple reschedule</p><h2 className="mt-1 text-2xl font-bold">Cancel 14:00 slot?</h2><p className="mt-2 text-sm text-muted-foreground">Review affected candidates and proposed replacement slots before notifying them.</p></div><button aria-label="Close drawer" onClick={() => setRescheduleOpen(false)} className="rounded-lg p-2 hover:bg-secondary"><X className="size-5" /></button></div><h3 className="mt-7 mb-3 font-semibold">Affected candidates · 3</h3><div className="space-y-3">{affected.map((a) => <div key={a.name} className="rounded-xl border bg-card p-4"><b>{a.name}</b><div className="mt-2 grid grid-cols-2 gap-3 text-sm"><div><span className="block text-xs text-dim">Old slot</span>{a.old}</div><div><span className="block text-xs text-dim">New slot</span><span className="text-emerald-300">{a.next}</span></div></div></div>)}</div><h3 className="mt-6 mb-3 font-semibold">Left untouched · {untouched.length}</h3><div className="flex flex-wrap gap-2">{untouched.map((name) => <Chip key={name}>{name}</Chip>)}</div><Btn className="mt-7 w-full" onClick={() => { const items = affected.map((a, i) => ({ id: `reschedule-${Date.now()}-${i}`, title: "Interview rescheduled", body: `${a.name}: your 14:00 interview has moved to ${a.next}.`, time: "Just now", unread: true })); try { const old = JSON.parse(localStorage.getItem("inteva-notifications-extra") || "[]"); localStorage.setItem("inteva-notifications-extra", JSON.stringify([...items, ...old])); window.dispatchEvent(new Event("inteva-notifications-updated")); } catch {} toast.success("Candidates notified · in-app notifications added"); setRescheduleOpen(false); }}><BellRing className="size-4" />Notify candidates</Btn><p className="mt-3 text-center text-xs text-dim">Demo mode: notifications are stored locally on this device.</p></aside></div>}
    </DashShell>
  );
}
