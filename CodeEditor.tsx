import { lazy, Suspense, useState } from "react";
import type { editor as MonacoEditor } from "monaco-editor";
import { Skeleton } from "@/components/inteva/ui";

const Editor = lazy(() => import("@monaco-editor/react"));
export type EditorLanguage = "python" | "cpp" | "java";
const options: { label: string; value: EditorLanguage }[] = [
  { label: "Python", value: "python" },
  { label: "C++", value: "cpp" },
  { label: "Java", value: "java" },
];

export function CodeEditor({ value, onChange, shared = false, minHeight = "320px" }: {
  value: string; onChange: (value: string) => void; shared?: boolean; minHeight?: string;
}) {
  const [language, setLanguage] = useState<EditorLanguage>("python");
  const editorOptions: MonacoEditor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: false }, fontSize: 13, lineNumbers: "on", roundedSelection: true,
    scrollBeyondLastLine: false, automaticLayout: true, padding: { top: 14, bottom: 14 },
    tabSize: 4, wordWrap: "on", glyphMargin: false, renderLineHighlight: "gutter",
  };
  return <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#080D18]">
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#111827] px-3 py-2">
      <div className="flex items-center gap-2"><span className="size-2 rounded-full bg-rose-400"/><span className="size-2 rounded-full bg-amber-300"/><span className="size-2 rounded-full bg-emerald-400"/><span className="ml-2 text-xs text-slate-400">solution.{language === "python" ? "py" : language === "cpp" ? "cpp" : "java"}</span></div>
      <div className="flex items-center gap-2">{shared && <span className="text-xs text-violet-300">Priya is typing…</span>}<select aria-label="Programming language" value={language} onChange={(e) => setLanguage(e.target.value as EditorLanguage)} className="rounded-lg border border-white/10 bg-[#080D18] px-2 py-1.5 text-xs text-slate-200">{options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
    </div>
    <div style={{ minHeight }}><Suspense fallback={<Skeleton className="h-80" />}><Editor height={minHeight} language={language} value={value} onChange={(v) => onChange(v ?? "")} theme="vs-dark" options={editorOptions} beforeMount={(monaco) => { monaco.editor.defineTheme("inteva-dark", { base: "vs-dark", inherit: true, rules: [], colors: { "editor.background": "#080D18", "editor.foreground": "#DCE5F5", "editorLineNumber.foreground": "#64748B", "editorLineNumber.activeForeground": "#A78BFA", "editorCursor.foreground": "#8B5CF6", "editor.selectionBackground": "#7957FF44", "editor.lineHighlightBackground": "#111827" } }); }} onMount={(_, monaco) => monaco.editor.setTheme("inteva-dark")} /></Suspense></div>
  </section>;
}
