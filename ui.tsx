import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BtnVariant = "primary" | "glass" | "ghost" | "danger";
export function Btn({ variant = "primary", className, ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant }) {
  const v = {
    primary: "bg-brand text-primary-foreground shadow-[0_8px_30px_-10px_var(--violet)] hover:shadow-glow hover:brightness-110",
    glass: "glass text-foreground hover:bg-secondary",
    ghost: "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
    danger: "bg-destructive/15 text-destructive border border-destructive/30 hover:bg-destructive/25",
  }[variant];
  return <button {...p} className={cn("inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none", v, className)} />;
}

export function Card({ id, className, children, hover }: { id?: string; className?: string; children: ReactNode; hover?: boolean }) {
  return <div id={id} className={cn("rounded-2xl border bg-card p-5 shadow-soft", hover && "lift", className)}>{children}</div>;
}
export function Glass({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("glass rounded-2xl p-5", className)}>{children}</div>;
}

export function Chip({ tone = "neutral", children, className }: { tone?: "neutral" | "success" | "warning" | "danger" | "brand"; children: ReactNode; className?: string }) {
  const t = {
    neutral: "bg-secondary text-muted-foreground border-border",
    success: "bg-success/12 text-success border-success/25",
    warning: "bg-warning/12 text-warning border-warning/25",
    danger: "bg-destructive/12 text-destructive border-destructive/25",
    brand: "bg-violet/15 text-foreground border-violet/30",
  }[tone];
  return <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold", t, className)}>{children}</span>;
}

export function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-dim">{label}</span>
      {children}
      {error && <span className="block text-xs text-destructive">{error}</span>}
    </label>
  );
}
export const inputCls = "w-full rounded-xl border bg-background/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-dim outline-none transition focus:border-violet/60 focus:shadow-[0_0_0_3px_oklch(0.58_0.24_285/0.2)]";

export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-secondary", className)}>
      <motion.div className="h-full rounded-full bg-brand" initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.6, ease: "easeOut" }} />
    </div>
  );
}

export function Ring({ value, size = 84, label }: { value: number; size?: number; label?: string }) {
  const r = size / 2 - 7, c = 2 * Math.PI * r;
  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs><linearGradient id="rg" x1="0" x2="1"><stop offset="0" stopColor="var(--violet)" /><stop offset="1" stopColor="var(--azure)" /></linearGradient></defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--secondary)" strokeWidth="7" fill="none" />
        <motion.circle cx={size / 2} cy={size / 2} r={r} stroke="url(#rg)" strokeWidth="7" fill="none" strokeLinecap="round" strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c * (1 - value / 100) }} transition={{ duration: 1, ease: "easeOut" }} />
      </svg>
      <div className="absolute text-center"><div className="text-lg font-bold text-foreground">{value}%</div>{label && <div className="text-[10px] text-dim">{label}</div>}</div>
    </div>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v.toLocaleString("en-IN")}{suffix}</span>;
}

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, delay, ease: [0.2, 0.8, 0.2, 1] }}>
      {children}
    </motion.div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("relative overflow-hidden rounded-lg bg-secondary before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.4s_infinite] before:bg-gradient-to-r before:from-transparent before:via-foreground/5 before:to-transparent", className)} />;
}

export function Logo() {
  return (
    <span className="flex items-center gap-2 font-extrabold tracking-tight text-foreground">
      <img src="/inteva-logo.jpeg" alt="Inteva logo" className="size-9 rounded-lg object-cover shadow-glow" />
      <span className="text-lg">Inteva</span>
    </span>
  );
}

export function Orbs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="animate-drift absolute -left-32 top-10 size-[480px] rounded-full bg-violet/30 blur-[120px]" />
      <div className="animate-drift absolute -right-20 top-40 size-[420px] rounded-full bg-azure/25 blur-[120px]" style={{ animationDelay: "-6s" }} />
      {Array.from({ length: 18 }).map((_, i) => (
        <span key={i} className="animate-float absolute size-1 rounded-full bg-foreground/50" style={{ left: `${(i * 53) % 100}%`, top: `${(i * 37) % 90}%`, animationDelay: `${-i * 0.7}s`, opacity: 0.2 + (i % 4) * 0.15 }} />
      ))}
    </div>
  );
}

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  if (!open) return null;
  return (
    <div role="dialog" aria-modal aria-label={title} className="fixed inset-0 z-50 grid place-items-center bg-background/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.25 }} className="glass w-full max-w-lg rounded-2xl p-6 shadow-soft" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between"><h3 className="text-lg font-bold">{title}</h3><button aria-label="Close" onClick={onClose} className="rounded-lg p-1 hover:bg-secondary">✕</button></div>
        {children}
      </motion.div>
    </div>
  );
}

export function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub?: string }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand">{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-base leading-relaxed">{sub}</p>}
    </Reveal>
  );
}
