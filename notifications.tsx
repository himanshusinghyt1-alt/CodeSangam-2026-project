import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DashShell } from "@/components/inteva/DashShell";
import { Card, Chip } from "@/components/inteva/ui";
import { api } from "@/lib/services";
import { hd } from "@/lib/head";
import { CalendarPlus } from "lucide-react";
import { Btn } from "@/components/inteva/ui";
import { addInterviewToCalendar } from "@/lib/calendar";
import { toast } from "sonner";

export const Route = createFileRoute("/notifications")({ head: () => hd("notifications"), component: Notes });
const mails = [
  { ok: true, status: "Sent", subj: "You qualified for Live Coding Interview 2", body: "Congratulations! Your Round 2 result is Qualified. Your next round is scheduled for 27 Oct, 12:00. Add it to your calendar from your dashboard." },
  { ok: false, status: "Queued", subj: "Your Round 1 result", body: "Thank you for taking the Online Coding Test. You did not qualify for the next round. Feedback: focus on edge cases and time complexity. You will not advance in this cycle." },
];
function Notes() {
  const [n, setN] = useState<any[]>([]); const [loading, setLoading] = useState(true); const [loadError, setLoadError] = useState(false);
  const load = () => { setLoading(true); setLoadError(false); api.getNotifications().then((items) => { let extra: any[] = []; try { extra = JSON.parse(localStorage.getItem("inteva-notifications-extra") || "[]"); } catch {} setN([...extra, ...items]); }).catch(() => setLoadError(true)).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);
  return (
    <DashShell role="hr" title="Notifications">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card><h3 className="mb-3 font-bold">In-app alerts <Chip tone="success">Live</Chip></h3>
          <div className="space-y-2">{loadError ? <div className="rounded-xl border border-rose-400/20 p-4 text-sm"><p className="mb-3 text-rose-300">Could not load notifications.</p><Btn variant="glass" onClick={load}>Retry</Btn></div> : loading ? [1,2,3].map((x) => <div key={x} className="h-20 animate-pulse rounded-xl bg-secondary" />) : n.length === 0 ? <p className="rounded-xl border border-dashed p-5 text-sm text-dim">You are all caught up.</p> : n.map((x) => <div key={x.id} className="rounded-xl bg-secondary p-3 text-sm"><div className="flex justify-between"><b>{x.title}</b>{x.unread && <Chip tone="brand">New</Chip>}</div><p className="text-muted-foreground">{x.body}</p><span className="text-xs text-dim">{x.time}</span></div>)}</div></Card>
        <div className="space-y-4">{mails.map((m) => <Card key={m.subj}><div className="mb-2 flex items-center justify-between"><Chip tone={m.ok ? "success" : "danger"}>{m.ok ? "Qualified" : "Not qualified"}</Chip><Chip tone={m.status === "Sent" ? "success" : "warning"}>{m.status} · 22 Oct 18:50</Chip></div>
          <h4 className="font-bold">{m.subj}</h4><p className="mt-2 text-sm text-muted-foreground">{m.body}</p>{m.ok && <Btn variant="glass" className="mt-3" onClick={() => { const url = addInterviewToCalendar(); window.open(url, "_blank", "noopener,noreferrer"); toast.success("Calendar file downloaded; Google Calendar opened"); }}><CalendarPlus className="size-4" />Add to Calendar</Btn>}</Card>)}</div>
      </div></DashShell>
  );
}
