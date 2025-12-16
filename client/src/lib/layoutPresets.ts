export const layoutPresets = {
  "two-column-hero-left-text": {
    container: "relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20 lg:flex-row lg:items-center lg:py-28",
    textColumn: "flex-1 space-y-8 text-center lg:text-left",
    imageColumn: "flex-1 flex justify-center lg:justify-end",
  },

  "two-column-hero-right-text": {
    container: "relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20 lg:flex-row-reverse lg:items-center lg:py-28",
    textColumn: "flex-1 space-y-8 text-center lg:text-left",
    imageColumn: "flex-1 flex justify-center lg:justify-start",
  },

  "two-column-content": {
    container: "mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:items-start",
    leftColumn: "flex-1",
    rightColumn: "flex-1",
  },

  "grid-02-cards": {
    container: "mx-auto max-w-6xl space-y-10 px-6",
    grid: "grid grid-cols-1 md:grid-cols-2 gap-6",
  },

  "grid-03-cards": {
    container: "mx-auto max-w-6xl space-y-10 px-6",
    grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
  },

  "grid-04-pillars": {
    container: "mx-auto max-w-6xl space-y-10 px-6",
    grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
  },

  "timeline-horizontal-steps": {
    container: "mx-auto max-w-6xl px-6",
    timeline: "relative",
    line: "absolute left-4 right-4 top-10 hidden h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent md:block",
    steps: "grid gap-6 md:grid-cols-4",
  },

  "timeline-vertical-steps": {
    container: "mx-auto max-w-3xl px-6",
    timeline: "relative border-l-2 border-slate-700 pl-8 space-y-12",
  },

  "full-width-band-cta": {
    container: "w-full bg-gradient-to-r from-indigo-900/30 via-slate-900 to-emerald-900/30 py-16",
    inner: "mx-auto max-w-4xl px-6 text-center space-y-6",
  },

  "centered-content": {
    container: "mx-auto max-w-4xl px-6 text-center space-y-8",
  },

  "narrow-content": {
    container: "mx-auto max-w-2xl px-6 space-y-6",
  },

  "wide-content": {
    container: "mx-auto max-w-7xl px-6 space-y-10",
  },

  "feature-comparison": {
    container: "mx-auto max-w-5xl px-6",
    grid: "grid w-full grid-cols-2 gap-4 text-center",
  },

  "testimonials-carousel": {
    container: "mx-auto max-w-6xl px-6 overflow-hidden",
    track: "flex gap-6",
  },

  "hero-fullscreen": {
    container: "relative min-h-screen flex items-center justify-center",
    overlay: "pointer-events-none absolute inset-0",
    content: "relative z-10 mx-auto max-w-4xl px-6 text-center space-y-8",
  },

  "split-screen": {
    container: "grid grid-cols-1 lg:grid-cols-2 min-h-screen",
    left: "flex items-center justify-center p-8 lg:p-16",
    right: "flex items-center justify-center p-8 lg:p-16 bg-slate-900/50",
  },
} as const;

export const sectionPresets = {
  standard: "border-b border-slate-800 bg-slate-950/90 py-20",
  alternate: "border-b border-slate-800 bg-slate-950/95 py-20",
  dark: "border-b border-white/5 bg-slate-950 py-20",
  hero: "relative overflow-hidden border-b border-white/5 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950",
  gradient: "border-b border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900 py-20",
  subtle: "border-b border-slate-800/50 bg-slate-950/80 py-16",
} as const;

export const cardPresets = {
  standard: "rounded-2xl border border-slate-800 bg-slate-900/70 p-6",
  hover: "group rounded-2xl border border-slate-700/70 bg-slate-900/60 p-5 shadow-sm shadow-black/40 transition hover:border-emerald-300/60",
  glass: "relative flex flex-col gap-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl shadow-black/60 backdrop-blur-xl",
  compact: "flex flex-col justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-5",
  feature: "rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition hover:border-indigo-300/60",
  testimonial: "flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-6",
} as const;

export const buttonPresets = {
  primary: "rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300",
  secondary: "rounded-full border border-slate-600 bg-slate-800/50 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 hover:border-slate-500",
  ghost: "text-sm font-medium text-slate-200 underline-offset-4 hover:text-emerald-200 hover:underline",
  link: "text-sm font-medium text-slate-200 underline-offset-4 hover:text-emerald-200 hover:underline flex items-center gap-2",
} as const;

export const badgePresets = {
  indigo: "inline rounded-full border border-indigo-400/40 bg-indigo-900/20 px-3 py-1 text-xs uppercase tracking-[0.25em] text-indigo-200",
  emerald: "inline rounded-full border border-emerald-400/40 bg-emerald-900/20 px-3 py-1 text-xs uppercase tracking-[0.25em] text-emerald-200",
  status: "mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-slate-900/60 px-4 py-2 text-xs text-emerald-100",
} as const;

export const iconContainerPresets = {
  circle: "mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-800",
  circleSmall: "inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-800",
  circleLarge: "inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-800",
  stepNumber: "flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-emerald-300",
} as const;

export type LayoutPresets = typeof layoutPresets;
export type SectionPresets = typeof sectionPresets;
export type CardPresets = typeof cardPresets;
export type ButtonPresets = typeof buttonPresets;
export type BadgePresets = typeof badgePresets;
