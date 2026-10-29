import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mic, MicOff, Video, VideoOff, MonitorUp, PhoneOff } from "lucide-react";
import { Btn, Chip, Logo, Card } from "@/components/inteva/ui";
import { hd } from "@/lib/head";
import { CodeEditor } from "@/components/inteva/CodeEditor";

export const Route = createFileRoute("/interview")({ head: () => hd("interview room"), component: Room });
const rubric = ["Problem solving", "Code quality", "Communication"];
function Room() {
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);
  const [s, setS] = useState(0);
  const [sc, setSc] = useState([7, 6, 8]);
  const [code, setCode] = useState("def min_rooms(slots):\n    slots.sort()\n    # shared editor — both sides see edits live");
  useEffect(() => { const x = setInterval(() => setS((v) => v + 1), 1000); return () => clearInterval(x); }, []);
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b px-5 py-3"><Link to="/hr"><Logo /></Link>
        <div className="flex gap-2"><Chip tone="brand">Round 2 of 3</Chip><Chip tone="success">Connected</Chip><Chip>{Math.floor(s / 60)}:{String(s % 60).padStart(2, "0")}</Chip></div></header>
      <div className="grid flex-1 gap-4 p-3 pb-28 sm:p-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">{["Diya Iyer", "Priya Kapoor"].map((n, k) => <div key={n} className="relative grid aspect-video place-items-center rounded-2xl border bg-gradient-to-br from-violet/25 to-azure/20">
            {k === 0 && !cam ? <VideoOff className="size-8 text-dim" /> : <span className="grid size-16 place-items-center rounded-full bg-brand text-xl font-bold">{n[0]}</span>}<span className="absolute bottom-2 left-3 text-xs">{n}</span></div>)}</div>
          <CodeEditor shared value={code} onChange={setCode} minHeight="280px" />
          <div className="fixed inset-x-0 bottom-0 z-20 flex justify-center gap-3 border-t border-white/10 bg-[#080D18]/95 p-3 backdrop-blur sm:static sm:border-0 sm:bg-transparent sm:p-0">
            <Btn variant="glass" aria-label="Mic" onClick={() => setMic(!mic)}>{mic ? <Mic className="size-4" /> : <MicOff className="size-4" />}</Btn>
            <Btn variant="glass" aria-label="Camera" onClick={() => setCam(!cam)}>{cam ? <Video className="size-4" /> : <VideoOff className="size-4" />}</Btn>
            <Btn variant="glass" aria-label="Share screen"><MonitorUp className="size-4" /></Btn>
            <Link to="/hr"><Btn variant="danger" aria-label="End call"><PhoneOff className="size-4" /></Btn></Link></div>
        </div>
        <aside className="space-y-4">
          <Card><h3 className="mb-2 font-bold">Blinded rubric</h3>{rubric.map((r, k) => <label key={r} className="mb-3 block text-sm">{r} <b className="float-right">{sc[k]}/10</b>
            <input type="range" min={0} max={10} value={sc[k]} onChange={(e) => setSc(sc.map((v, j) => (j === k ? +e.target.value : v)))} className="w-full accent-[var(--violet)]" /></label>)}
            <div className="text-sm">Total <b>{sc.reduce((a, b) => a + b, 0)}/30</b></div></Card>
          <Card><h3 className="mb-2 font-bold">Private notes</h3><textarea rows={4} className="w-full rounded-xl border bg-background/60 p-2.5 text-sm outline-none" placeholder="Visible only to you…" /><Btn className="mt-2 w-full">Save feedback</Btn></Card>
        </aside>
      </div>
    </div>
  );
}
