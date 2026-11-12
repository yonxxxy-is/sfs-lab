// Badges hold data-like labels (tags, skills), so they use the mono face.
export default function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
      {children}
    </span>
  );
}
