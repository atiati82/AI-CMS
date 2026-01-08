export const andaraTheme = {
  colors: {
    background: {
      dark: "#020617",
      darker: "#050816",
      hero: "radial-gradient(circle at 0% 0%, #4b0082 0, #020617 50%), radial-gradient(circle at 100% 100%, #22c55e 0, transparent 45%), radial-gradient(circle at 50% 120%, #38bdf8 0, transparent 55%)",
      surface: "#0f172a",
      card: "rgba(15, 23, 42, 0.6)",
      cardHover: "rgba(15, 23, 42, 0.7)",
    },
    border: {
      subtle: "rgba(255, 255, 255, 0.05)",
      light: "rgba(255, 255, 255, 0.1)",
      slate: "#1e293b",
      slateLight: "rgba(51, 65, 85, 0.7)",
    },
    text: {
      primary: "#f8fafc",
      secondary: "#e2e8f0",
      muted: "#cbd5e1",
      subtle: "#94a3b8",
    },
    accent: {
      indigo: {
        light: "#a5b4fc",
        base: "#818cf8",
        dark: "#4338ca",
        bg: "rgba(79, 70, 229, 0.2)",
        border: "rgba(129, 140, 248, 0.4)",
      },
      emerald: {
        light: "#6ee7b7",
        base: "#34d399",
        dark: "#059669",
        glow: "rgba(52, 211, 153, 0.3)",
      },
      cyan: {
        light: "#67e8f9",
        base: "#22d3ee",
        dark: "#06b6d4",
      },
      amber: {
        base: "#fbbf24",
        soft: "#f3cc7a",
      },
    },
    gradient: {
      cosmic: "linear-gradient(to bottom right, #020617, #0f172a, #020617)",
      indigo: "linear-gradient(to bottom, #4b0082, #020617)",
      emerald: "linear-gradient(to top, #022c22, transparent)",
    },
  },

  typography: {
    fontFamily: {
      base: '"Open Sans", system-ui, -apple-system, sans-serif',
      display: '"Surrounding", "Space Grotesk", system-ui, sans-serif',
    },
    fontSize: {
      hero: "clamp(2.25rem, 5vw, 3.75rem)",
      h1: "clamp(2rem, 4vw, 3rem)",
      h2: "clamp(1.5rem, 3vw, 1.875rem)",
      h3: "0.875rem",
      body: "1rem",
      bodyLg: "1.125rem",
      small: "0.875rem",
      xs: "0.75rem",
      micro: "0.6875rem",
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    letterSpacing: {
      tight: "-0.025em",
      normal: "0",
      wide: "0.25em",
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.625,
    },
  },

  spacing: {
    sectionY: "clamp(4rem, 7vw, 5rem)",
    sectionYLg: "clamp(5rem, 8vw, 7rem)",
    gutterX: "clamp(1.5rem, 4vw, 4rem)",
    containerMax: "72rem",
    gap: {
      xs: "0.5rem",
      sm: "0.75rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "3rem",
    },
  },

  radii: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    full: "9999px",
    card: "1.125rem",
    pill: "9999px",
  },

  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    deep: "0 18px 60px rgba(0, 0, 0, 0.55)",
    card: "0 1px 3px rgba(0, 0, 0, 0.4)",
    glow: {
      indigo: "0 0 40px rgba(129, 140, 248, 0.6)",
      emerald: "0 0 20px rgba(74, 222, 128, 0.9)",
      cyan: "0 0 25px rgba(45, 212, 191, 0.7)",
      soft: "0 0 40px rgba(70, 230, 195, 0.18)",
    },
  },

  effects: {
    blur: {
      sm: "4px",
      md: "8px",
      lg: "16px",
      xl: "24px",
      "2xl": "40px",
      "3xl": "64px",
    },
    backdrop: "blur(16px)",
  },

  animation: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
      slower: "700ms",
    },
    easing: {
      default: "cubic-bezier(0.23, 0.82, 0.35, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    },
  },
} as const;

export type AndaraTheme = typeof andaraTheme;

// Mode type for theme toggles
export type AndaraMode = 'dark' | 'light' | 'system';
