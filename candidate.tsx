import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CalendarPlus, Check, Activity, FileCheck2, Trophy } from "lucide-react";
import { DashShell, Stat } from "@/components/inteva/DashShell";
import { Card, Chip, Btn, Skeleton } from "@/components/inteva/ui";
import { api } from "@/lib/services";
import { hd } from "@/lib/head";
import { toast } from "sonner";
import { addInterviewToCalendar } from "@/lib/calendar";

export const Route = createFileRoute("/candidate")({ head: () => hd("candidate"), component: Cand });
const stages = ["Submitted", "Verified", "Round 1", "Round 2", "Round 3", "Final"];
function Cand() {
  const [slots, setSlots] = useState<any[] | null>(null);
  const [pick, setPick] = useState("");
  const [loadError, setLoadError] = useState(false);
  const load = () => { setLoadError(false); setSlots(null); api.getSlots().then(setSlots).catch(() => setLoadError(true)); };
  useEffect(() => { load(); }, []);
  const cur = 3;
  return (
    <DashShell role="candidate" title="My application">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Stage" value="Round 3" icon={Activity} />
        <Stat label="Round 1 score" value={88} suffix="/100" icon={Trophy} delta="Qualified" />
        <Stat label="Verification" value="Verified" icon={FileCheck2} />
      </div>
      <Card className="mt-4"><h3 className="mb-4 font-bold">Application timeline</h3>
        <ol className="grid gap-3 sm:grid-cols-6">{stages.map((s, i) => <li key={s} className="text-center">
          <div className={`mx-auto grid size-9 place-items-center rounded-full border ${i < cur ? "bg-brand text-primary-foreground" : i === cur ? "border-violet shadow-[0_0_16px_var(--violet)]" : "text-dim"}`}>{i < cur ? <Check className="size-4" /> : i + 1}</div>
          <span className="mt-1 block text-xs text-muted-foreground">{s}</span></li>)}</ol></Card>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card><h3 className="mb-3 font-bold">Book your Round 3 slot</h3>
          {loadError ? <div className="rounded-xl border border-rose-400/20 p-4 text-sm"><p className="mb-3 text-rose-300">Could not load interview slots.</p><Btn variant="glass" onClick={load}>Retry</Btn></div> : !slots ? <Skeleton className="h-40" /> : slots.length === 0 ? <p className="rounded-xl border border-dashed p-5 text-sm text-dim">No interview slots available right now.</p> : <div className="grid gap-2 sm:grid-cols-2">{slots.map((s) => <button key={s.id} disabled={s.taken} onClick={() => setPick(s.id)} className={`rounded-xl border p-3 text-left text-sm ${s.taken ? "opacity-40" : pick === s.id ? "border-violet bg-violet/15" : "hover:border-violet/50"}`}>
            <b>{s.day}</b><br />{s.time}{s.taken && <Chip tone="danger" className="ml-2">Slot taken, choose another</Chip>}</button>)}</div>}
          <Btn className="mt-3" disabled={!pick} onClick={() => toast.success("Slot booked")}>Confirm slot</Btn></Card>
        <Card><h3 className="mb-3 font-bold">Upcoming & results</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-xl bg-secondary p-3"><span>Round 3 · Today 15:00</span><Btn variant="glass" onClick={() => { const url = addInterviewToCalendar(); window.open(url, "_blank", "noopener,noreferrer"); toast.success("Calendar file downloaded; Google Calendar opened"); }}><CalendarPlus className="size-4" />Add to Calendar</Btn></div>
            <div className="flex items-center justify-between rounded-xl bg-secondary p-3"><span>Round 2 · Live Coding</span><Chip tone="success">Qualified</Chip></div>
            <p className="text-xs text-dim">Only your own grades and feedback are visible here.</p></div></Card>
      </div>
    </DashShell>
  );
}
