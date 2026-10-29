import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Play, Send } from "lucide-react";
import { Btn, Chip, Progress, Modal, Logo } from "@/components/inteva/ui";
import { api } from "@/lib/services";
import { hd } from "@/lib/head";
import { CodeEditor } from "@/components/inteva/CodeEditor";

export const Route = createFileRoute("/test")({ head: () => hd("coding test"), component: Test });
function Test() {
  const [qs, setQs] = useState<any[]>([]);
  const [i, setI] = useState(0);
  const [t, setT] = useState(3600);
  const [run, setRun] = useState<"idle" | "queued" | "done">("idle");
  const [ok, setOk] = useState(false);
  const [code, setCode] = useState("def solve(slots):\n    # your code here\n    return 0\n");
  useEffect(() => { api.getQuestions().then(setQs); const x = setInterval(() => setT((v) => v - 1), 1000); return () => clearInterval(x); }, []);
  const q = qs[i];
  const tone = t < 300 ? "danger" : t < 900 ? "warning" : "brand";
  const go = () => { setRun("queued"); setTimeout(() => setRun("done"), 1500); };
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-2 border-b bg-background/95 px-3 py-3 backdrop-blur sm:px-5"><Link to="/candidate"><Logo /></Link>
        <Chip tone={tone as any}>{Math.floor(t / 60)}:{String(t % 60).padStart(2, "0")}</Chip>
        <div className="flex items-center gap-2"><Chip tone="success">Autosaved</Chip><Btn onClick={() => setOk(true)}><Send className="size-4" />Submit</Btn></div></header>
      <Progress value={((i + 1) / Math.max(qs.length, 1)) * 100} />
      <main className="flex-1 p-3 pb-24 sm:p-4">
        <section aria-label="Coding test rounds" className="mb-4 rounded-2xl border bg-card p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div><p className="text-sm font-bold">Coding test dashboard</p><p className="mt-1 text-xs text-muted-foreground">Track your progress across all three rounds</p></div>
            <Chip tone="brand">Round 1 of 3</Chip>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            <div className="rounded-xl border border-violet/40 bg-violet/10 p-3"><div className="flex items-center justify-between gap-2"><span className="text-sm font-semibold">Round 1</span><Chip tone="brand">In progress</Chip></div><p className="mt-1 text-xs text-muted-foreground">Fundamentals & problem solving</p></div>
            <div className="rounded-xl border bg-background/50 p-3"><div className="flex items-center justify-between gap-2"><span className="text-sm font-semibold">Round 2</span><Chip>Upcoming</Chip></div><p className="mt-1 text-xs text-muted-foreground">Live coding</p></div>
            <div className="rounded-xl border bg-background/50 p-3"><div className="flex items-center justify-between gap-2"><span className="text-sm font-semibold">Round 3</span><Chip>Upcoming</Chip></div><p className="mt-1 text-xs text-muted-foreground">Advanced challenge</p></div>
          </div>
        </section>
      {q && <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border bg-card p-5"><div className="mb-3 flex gap-2">{qs.map((x, k) => <button key={x.id} onClick={() => setI(k)} className={`size-8 rounded-lg text-sm ${k === i ? "bg-brand text-primary-foreground" : "bg-secondary"}`}>{k + 1}</button>)}</div>
          <h2 className="text-xl font-bold">{q.title} <Chip>{q.difficulty}</Chip></h2><p className="mt-3 text-sm text-muted-foreground">{q.body}</p>
          <pre className="mt-4 rounded-xl bg-background p-3 font-mono text-xs">{q.example}</pre></section>
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-end"><Btn variant="glass" onClick={go}><Play className="size-4" />Run</Btn></div>
          <CodeEditor value={code} onChange={setCode} minHeight="min(52vh, 520px)" />
          <div className="rounded-2xl border bg-card p-4 text-sm"><b>Test cases</b>
            <div className="mt-2 flex flex-wrap gap-2">{run === "queued" ? <Chip tone="warning">Queued…</Chip> : run === "done" ? <><Chip tone="success">Case 1 passed</Chip><Chip tone="success">Case 2 passed</Chip><Chip tone="danger">Case 3 failed</Chip></> : <span className="text-dim">Run your code to see results</span>}</div></div>
        </section></div>}
      </main>
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-white/10 bg-[#080D18]/95 p-3 backdrop-blur lg:hidden"><Btn variant="glass" onClick={go}><Play className="size-4" />Run code</Btn><Btn onClick={() => setOk(true)}><Send className="size-4" />Submit test</Btn></div>
      <Modal open={ok} onClose={() => setOk(false)} title="Submit test?"><p className="text-sm text-muted-foreground">You can't edit answers after submitting. HR grades it next.</p><Btn className="mt-4" onClick={() => setOk(false)}>Confirm submit</Btn></Modal>
    </div>
  );
}
