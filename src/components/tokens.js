// Design tokens for the whole site. Change a value here, it changes everywhere.
//
// Type roles
//   Plus Jakarta Sans: headings, body, navigation, buttons
//   JetBrains Mono:    data only (metrics, dates, tags)
// Radius: controls rounded-md, cards rounded-lg, dialogs rounded-xl.
// Color: a single slate scale; no accent colors.

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-150";

const sizes = {
  md: "px-4 py-2.5 text-sm",
  sm: "px-3 py-1.5 text-[13px]",
};

const tones = {
  primary:
    "bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white",
  secondary:
    "border border-slate-300 bg-transparent text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800",
  ghost:
    "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100",
};

export const button = (tone = "primary", size = "md") =>
  `${base} ${sizes[size]} ${tones[tone]}`;

export const card =
  "rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900";

// Text roles
export const muted = "text-slate-500 dark:text-slate-400";
export const body = "text-slate-600 dark:text-slate-300";
export const heading = "text-slate-900 dark:text-slate-50";
export const meta = `font-mono text-xs ${muted}`; // dates, counts
export const subheading = `text-xs font-semibold ${muted}`; // small section labels
