import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./ui";
import { cn } from "@/lib/utils";

const links = [
  ["Home", "#top"], ["How It Works", "#how"], ["Features", "#features"], ["For Candidates", "#candidates"], ["For Employers", "#employers"], ["Pricing", "#pricing"],
];

export function PublicNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 12);
    f(); window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={cn("fixed inset-x-0 top-0 z-40 transition-all duration-300", scrolled ? "glass border-x-0 border-t-0" : "border-b border-transparent")}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Link to="/"><Logo /></Link>
        <div className="hidden items-center gap-7 lg:flex">
          {links.map(([l, h]) => <a key={l} href={`/${h}`} className="text-sm font-medium hover:text-foreground">{l}</a>)}
        </div>
        <div className="hidden items-center gap-4 lg:flex">
          <Link to="/staff-login" className="text-sm font-medium hover:text-foreground">Staff Login</Link>
          <Link to="/apply" className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-primary-foreground hover:shadow-glow">Apply as Candidate</Link>
        </div>
        <button aria-label="Open menu" className="lg:hidden text-foreground" onClick={() => setOpen(true)}><Menu /></button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.3 }} className="glass fixed inset-y-0 right-0 z-50 flex w-72 flex-col gap-2 p-6">
            <button aria-label="Close menu" className="mb-4 self-end text-foreground" onClick={() => setOpen(false)}><X /></button>
            {links.map(([l, h]) => <a key={l} href={`/${h}`} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-foreground hover:bg-secondary">{l}</a>)}
            <Link to="/staff-login" className="rounded-lg px-3 py-2 text-foreground hover:bg-secondary">Staff Login</Link>
            <Link to="/apply" className="mt-3 rounded-xl bg-brand px-4 py-2.5 text-center font-semibold text-primary-foreground">Apply as Candidate</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2 space-y-3"><Logo /><p className="max-w-sm text-sm">Conflict-free campus hiring. Verified candidates, staged coding rounds and live sync for every role.</p></div>
        <div className="space-y-2 text-sm"><h4 className="font-semibold">Product</h4><a href="/#features" className="block hover:text-foreground">Features</a><a href="/#pricing" className="block hover:text-foreground">Pricing</a><Link to="/notifications" className="block hover:text-foreground">Notifications</Link></div>
        <div className="space-y-2 text-sm"><h4 className="font-semibold">Demo</h4><Link to="/candidate" className="block hover:text-foreground">Candidate</Link><Link to="/coordinator" className="block hover:text-foreground">Coordinator</Link><Link to="/hr" className="block hover:text-foreground">HR / Interviewer</Link></div>
      </div>
      <div className="border-t py-5 text-center text-xs text-dim">Team Re-Renderers · Webster 2026</div>
    </footer>
  );
}
