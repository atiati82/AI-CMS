import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
    content: [
        "./index.html",
        "./client/src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            // Andara Spacing System (8px grid + Fibonacci macro)
            spacing: {
                'andara-0': '0px',
                'andara-1': '4px',      // Micro: icon-text
                'andara-2': '8px',      // Base unit
                'andara-3': '12px',     // Tight
                'andara-4': '16px',     // Compact
                'andara-5': '20px',     // Comfortable
                'andara-6': '24px',     // Standard
                'andara-7': '32px',     // Spacious
                'andara-8': '40px',     // Macro start
                'andara-9': '48px',     // Macro
                'andara-10': '64px',    // Section gap
                'andara-11': '80px',    // Major section
                'andara-12': '96px',    // Hero padding
                'andara-13': '128px',   // Max section
            },
            fontFamily: {
                sans: ['"Open Sans"', "system-ui", "sans-serif"],
                display: ['"Surrounding"', '"Space Grotesk"', "system-ui", "sans-serif"],
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                surface: "var(--surface)",
                card: "var(--card)",
                border: "var(--border)",
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                accent: "var(--accent)",
                link: "var(--link)",
                ring: "var(--ring)",
                success: "var(--success)",
                warning: "var(--warning)",
                danger: "var(--danger)",
                info: "var(--info)",
                muted: "var(--muted)",
                "muted-foreground": "var(--muted-foreground)",
                popover: "var(--popover)",
                "popover-foreground": "var(--popover-foreground)",
                destructive: "var(--destructive)",
                "destructive-foreground": "var(--destructive-foreground)",
                input: "var(--input)",

                // admin tokens
                adminSidebar: "var(--sidebar)",
                adminSidebarActive: "var(--sidebar-active)",
                adminContent: "var(--content)",
                adminPurple: "var(--purple)",
                adminAccent: "var(--admin-accent)",
            },
        },
    },
    plugins: [
        animate,
        typography,
    ],
};
