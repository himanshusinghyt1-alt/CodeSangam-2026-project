import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FileCheck2, Users, AlertTriangle } from "lucide-react";
import { DashShell, Stat } from "@/components/inteva/DashShell";
import { Card, Chip, Btn, Modal, inputCls } from "@/components/inteva/ui";
import { api } from "@/lib/services";
import { hd } from "@/lib/head";
import { toast } from "sonner";

export const Route = createFileRoute("/coordinator")({ head: () => hd("coordinator"), component: Coord });
const cols = ["Verification", "Round 1", "Round 2", "Round 3"];
function Coord() {
  const [c, setC] = useState<any[]>([]);
  const [rej, setRej] = useState<any>(null);
  const [loading, setLoading] = useState(true); const [loadError, setLoadError] = useState(false);
  const load = () => { setLoading(true); setLoadError(false); api.getCandidates().then(setC).catch(() => setLoadError(true)).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);
  const drop = (id: string, msg: string) => { setC((x) => x.filter((y) => y.id !== id)); toast(msg); setRej(null); };
  const flagged = c.filter((x) => x.checks.length);
  return (
    <DashShell role="coordinator" title="Verification & pipeline">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="In queue" value={c.length} icon={FileCheck2} />
        <Stat label="Auto-flagged" value={flagged.length} icon={AlertTriangle} />
        <Stat label="Candidates" value={1240} icon={Users} />
      </div>
      <Card id="verification" className="mt-4 scroll-mt-24"><h3 className="mb-3 font-bold">Verification queue</h3>
        {loadError ? <div className="rounded-xl border border-rose-400/20 p-4 text-sm"><p className="mb-3 text-rose-300">Could not load the verification queue.</p><Btn variant="glass" onClick={load}>Retry</Btn></div> : loading ? <div className="space-y-2">{[1,2,3].map((x) => <div key={x} className="h-16 animate-pulse rounded-xl bg-secondary" />)}</div> : c.length === 0 ? <p className="rounded-xl border border-dashed p-5 text-sm text-dim">The verification queue is clear.</p> : <div className="space-y-2">{c.map((x) => <div key={x.id} className="flex flex-col items-stretch gap-3 rounded-xl bg-secondary p-3 text-sm sm:flex-row sm:items-center">
          <div className="min-w-40 flex-1"><b>{x.name}</b><div className="text-xs text-dim">{x.college} · {x.email}</div></div>
          <div className="flex flex-wrap gap-1">{x.checks.length ? x.checks.map((k: string) => <Chip key={k} tone="warning">{k}</Chip>) : <Chip tone="success">All checks passed</Chip>}</div>
          <div className="flex gap-2"><Btn variant="glass" className="flex-1 sm:flex-none" onClick={() => drop(x.id, `${x.name} verified · pipeline scheduled`)}>Approve</Btn>
          <Btn variant="danger" className="flex-1 sm:flex-none" onClick={() => setRej(x)}>Reject</Btn></div></div>)}</div>}</Card>
      <div id="pipeline" className="mt-4 grid scroll-mt-24 gap-3 md:grid-cols-4">{cols.map((k, i) => <Card key={k}><h4 className="mb-2 text-sm font-bold">{k}</h4>
        {c.filter((x) => (i === 0 ? false : x.round === i)).map((x) => <div key={x.id} className="mb-2 rounded-lg bg-secondary p-2 text-xs">{x.name}<br /><Chip tone={x.status === "qualified" ? "success" : x.status === "rejected" ? "danger" : "warning"}>{x.status === "qualified" ? "Passed" : x.status === "rejected" ? "Failed" : "Pending"}</Chip></div>)}</Card>)}</div>
      <p className="mt-2 text-xs text-dim">Coordinators see Passed / Failed only, never scores.</p><Card id="schedule" className="mt-4 scroll-mt-24"><h3 className="font-bold">Schedule</h3><p className="mt-1 text-sm text-muted-foreground">Upcoming campus-placement rounds and interview coordination.</p><div className="mt-3 grid gap-2 sm:grid-cols-3">{[{ day: "27 Oct", time: "12:00", label: "Live coding" }, { day: "28 Oct", time: "15:30", label: "Technical panel" }, { day: "30 Oct", time: "11:00", label: "HR discussion" }].map((v) => <div key={v.day} className="rounded-xl bg-secondary p-3 text-sm"><b>{v.day} · {v.time}</b><p className="text-xs text-dim">{v.label}</p></div>)}</div></Card>
      <Modal open={!!rej} onClose={() => setRej(null)} title={`Reject ${rej?.name ?? ""}`}>
        <textarea className={inputCls} rows={4} placeholder="Written feedback (sent by email and in-app alert)" />
        <Btn variant="danger" className="mt-3" onClick={() => drop(rej.id, "Rejected · candidate notified")}>Reject with feedback</Btn>
      </Modal>
    </DashShell>
  );
}
