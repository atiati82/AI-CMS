import { andaraTheme, AndaraMode } from "@/lib/andaraTheme";

type TokenMap = Record<string, string | number | undefined | null>;

const MODE_CLASSES = ["light", "dark"] as const;

function toCssVarName(key: string) {
    return "--" + key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

function applyTokens(scope: HTMLElement, tokens: TokenMap) {
    for (const [k, v] of Object.entries(tokens)) {
        if (v === undefined || v === null) continue;
        scope.style.setProperty(toCssVarName(k), String(v));
    }
}

export function applyAndaraTheme(mode: Exclude<AndaraMode, "admin">) {
    const root = document.documentElement;

    MODE_CLASSES.forEach((c) => root.classList.remove(c));
    root.classList.add(mode);

    const modeTokens = (andaraTheme as any).modes?.[mode] || (andaraTheme as any).colors || andaraTheme;
    applyTokens(root, modeTokens as any);
}

export function applyAdminTheme() {
    const root = document.documentElement;
    root.classList.add("admin-theme");

    // admin overrides on top of current mode
    const adminTokens = (andaraTheme as any).modes?.admin || (andaraTheme as any).colors || andaraTheme;
    applyTokens(root, adminTokens as any);
}

export function detectInitialMode(): "light" | "dark" {
    const stored = localStorage.getItem("andara_mode");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia?.("(prefers-color-scheme: light)")?.matches ? "light" : "dark";
}

export function setAndaraMode(mode: "light" | "dark") {
    localStorage.setItem("andara_mode", mode);
    applyAndaraTheme(mode);
}
