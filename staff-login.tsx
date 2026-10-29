import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Btn, Glass, Field, inputCls, Orbs, Logo } from "@/components/inteva/ui";
import { hd } from "@/lib/head";

export const Route = createFileRoute("/staff-login")({ head: () => hd("staff login"), component: Staff });
function Staff() {
  const nav = useNavigate();
  const [role, setRole] = useState<"hr" | "coordinator">("hr");
  return (
    <div className="relative grid min-h-screen place-items-center p-5"><Orbs />
      <Glass className="relative w-full max-w-md space-y-4 p-8">
        <Link to="/"><Logo /></Link><h1 className="text-2xl font-extrabold">Staff login</h1>
        <div className="grid grid-cols-2 gap-2">{(["hr", "coordinator"] as const).map((r) => <button key={r} onClick={() => setRole(r)} className={`rounded-xl border py-2.5 text-sm font-semibold ${role === r ? "border-violet bg-violet/15" : "text-muted-foreground"}`}>{r === "hr" ? "HR / Interviewer" : "Coordinator"}</button>)}</div>
        <Field label="Work email"><input className={inputCls} type="email" /></Field>
        <Field label="Password"><input className={inputCls} type="password" /></Field>
        <Btn className="w-full" onClick={() => nav({ to: role === "hr" ? "/hr" : "/coordinator" })}>Sign in</Btn>
      </Glass>
    </div>
  );
}
