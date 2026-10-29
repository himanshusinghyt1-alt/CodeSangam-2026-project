import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Btn, Glass, Field, inputCls, Progress, Orbs, Logo } from "@/components/inteva/ui";
import { hd } from "@/lib/head";

export const Route = createFileRoute("/auth")({ head: () => hd("sign in"), component: Auth });
function Auth() {
  const nav = useNavigate();
  const [tab, setTab] = useState<"in" | "up">("up");
  const [show, setShow] = useState(false);
  const [ph, setPh] = useState<"form" | "busy" | "done">("form");
  const go = (e: React.FormEvent) => { e.preventDefault(); setPh("busy"); setTimeout(() => setPh("done"), 1800); };
  return (
    <div className="relative grid min-h-screen place-items-center p-5"><Orbs />
      <Glass className="relative w-full max-w-md p-8">
        <Link to="/" className="mb-6 block"><Logo /></Link>
        {ph === "form" && <form onSubmit={go} className="space-y-4">
          <div className="grid grid-cols-2 rounded-xl bg-secondary p-1 text-sm font-semibold">
            {(["in", "up"] as const).map((t) => <button type="button" key={t} onClick={() => setTab(t)} className={`rounded-lg py-2 ${tab === t ? "bg-brand text-primary-foreground" : "text-muted-foreground"}`}>{t === "in" ? "Login" : "Sign up"}</button>)}
          </div>
          {tab === "up" && <Field label="Full name"><input required className={inputCls} /></Field>}
          <Field label="Email"><input required type="email" className={inputCls} /></Field>
          <Field label="Password"><div className="relative"><input required type={show ? "text" : "password"} minLength={8} className={inputCls} />
            <button type="button" aria-label="Toggle password" onClick={() => setShow(!show)} className="absolute right-3 top-3 text-dim">{show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></div></Field>
          <p className="text-xs text-dim">Role: Candidate · your saved draft will be restored after sign-in.</p>
          <Btn className="w-full">{tab === "in" ? "Login & submit" : "Create account & submit"}</Btn>
        </form>}
        {ph === "busy" && <div className="space-y-4 py-6 text-center"><p className="font-semibold">Restoring your draft and submitting…</p><Progress value={80} /></div>}
        {ph === "done" && <div className="space-y-4 py-4 text-center"><CheckCircle2 className="mx-auto size-12 text-success" />
          <h2 className="text-xl font-bold">Application submitted</h2><p className="text-sm text-muted-foreground">A Coordinator will verify your details next. You'll get an email and in-app alert.</p>
          <Btn onClick={() => nav({ to: "/candidate" })} className="w-full">Go to dashboard</Btn></div>}
      </Glass>
    </div>
  );
}
