import React, { createContext, useContext, useMemo, useState } from "react";

export type SelectedNode = {
    selector: string;
    tagName: string;
    outerHTML: string;
    rect: { x: number; y: number; width: number; height: number };
    computed: Record<string, string>;
};

type VisualEditorState = {
    enabled: boolean;
    setEnabled: (v: boolean) => void;
    selected: SelectedNode | null;
    setSelected: (n: SelectedNode | null) => void;
};

const Ctx = createContext<VisualEditorState | null>(null);

export function useVisualEditor() {
    const v = useContext(Ctx);
    if (!v) throw new Error("useVisualEditor must be used inside VisualEditorProvider");
    return v;
}

export function VisualEditorProvider({ children }: { children: React.ReactNode }) {
    const [enabled, setEnabled] = useState(false);
    const [selected, setSelected] = useState<SelectedNode | null>(null);

    const value = useMemo(() => ({ enabled, setEnabled, selected, setSelected }), [enabled, selected]);

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
