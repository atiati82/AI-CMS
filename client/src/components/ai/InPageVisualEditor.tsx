import React, { useEffect, useMemo, useRef, useState } from "react";
import { useVisualEditor } from "./VisualEditorProvider";
import { computedSnapshot, getCssPath, rectOf, extractClasses } from "./domSelect";
import { VisualEditorChat } from "./VisualEditorChat";
import { Pencil, X, Crosshair } from "lucide-react";

function clamp(n: number) {
    return Math.max(0, Math.floor(n));
}

export function InPageVisualEditor() {
    const { enabled, setEnabled, selected, setSelected } = useVisualEditor();

    const [hoverRect, setHoverRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
    const [hoverTag, setHoverTag] = useState<string>("");
    const lastHoverEl = useRef<Element | null>(null);

    // Store the selected element reference for scroll updates
    const selectedElRef = useRef<Element | null>(null);
    const [selectedRect, setSelectedRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

    // Update selected rect when element or scroll changes
    const updateSelectedRect = () => {
        if (selectedElRef.current) {
            const rect = rectOf(selectedElRef.current);
            setSelectedRect(rect);
        }
    };

    // Keep selection rect updated on scroll/resize
    useEffect(() => {
        if (!enabled || !selected) return;

        const onScroll = () => updateSelectedRect();
        const onResize = () => updateSelectedRect();

        window.addEventListener('scroll', onScroll, true);
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('scroll', onScroll, true);
            window.removeEventListener('resize', onResize);
        };
    }, [enabled, selected]);

    useEffect(() => {
        if (!enabled) {
            setHoverRect(null);
            setHoverTag("");
            lastHoverEl.current = null;
            selectedElRef.current = null;
            setSelectedRect(null);
            return;
        }

        const onMove = (e: MouseEvent) => {
            const el = document.elementFromPoint(e.clientX, e.clientY);
            if (!el || el === lastHoverEl.current) return;

            // Ignore overlay itself
            if ((el as HTMLElement).closest("[data-ag-editor-root]")) return;

            lastHoverEl.current = el;
            setHoverRect(rectOf(el));
            setHoverTag(el.tagName.toLowerCase());
        };

        const onClick = (e: MouseEvent) => {
            if (!enabled) return;
            const el = document.elementFromPoint(e.clientX, e.clientY);
            if (!el) return;

            if ((el as HTMLElement).closest("[data-ag-editor-root]")) return;

            e.preventDefault();
            e.stopPropagation();

            // Store element reference for scroll updates
            selectedElRef.current = el;

            const selector = getCssPath(el);
            const rect = rectOf(el);
            const outerHTML = (el as HTMLElement).outerHTML.slice(0, 6000); // keep bounded
            const classes = extractClasses(el);

            setSelectedRect(rect);
            setSelected({
                selector,
                tagName: el.tagName.toLowerCase(),
                rect,
                outerHTML,
                computed: {
                    ...computedSnapshot(el),
                    _classes: classes.join(', '),
                },
            });
        };

        // Keyboard shortcuts
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (selected) {
                    setSelected(null);
                    selectedElRef.current = null;
                    setSelectedRect(null);
                } else {
                    setEnabled(false);
                }
            }
        };

        window.addEventListener("mousemove", onMove, true);
        window.addEventListener("click", onClick, true);
        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("mousemove", onMove, true);
            window.removeEventListener("click", onClick, true);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [enabled, selected, setSelected, setEnabled]);

    const panelTitle = useMemo(() => {
        if (!selected) return "No selection";
        const shortSelector = selected.selector.length > 40
            ? '...' + selected.selector.slice(-37)
            : selected.selector;
        return `${selected.tagName} · ${shortSelector}`;
    }, [selected]);

    // Toggle button when not enabled
    if (!enabled) {
        return (
            <button
                onClick={() => setEnabled(true)}
                data-testid="visual-editor-toggle"
                style={{
                    position: "fixed",
                    right: 20,
                    bottom: 20,
                    zIndex: 999999,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "12px 20px",
                    borderRadius: 999,
                    border: "1px solid rgba(226, 184, 94, 0.3)",
                    background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))",
                    backdropFilter: "blur(20px)",
                    color: "#f8fafc",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4), 0 0 20px rgba(226, 184, 94, 0.1)",
                    transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.5), 0 0 30px rgba(226, 184, 94, 0.2)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.4), 0 0 20px rgba(226, 184, 94, 0.1)";
                }}
            >
                <Pencil size={16} />
                <span>AI Design Edit</span>
            </button>
        );
    }

    return (
        <div data-ag-editor-root style={{ position: "fixed", inset: 0, zIndex: 999999, pointerEvents: "none" }}>
            {/* Hover highlight with golden glow */}
            {hoverRect && !selected && (
                <div
                    style={{
                        position: "fixed",
                        left: clamp(hoverRect.x) - 2,
                        top: clamp(hoverRect.y) - 2,
                        width: clamp(hoverRect.width) + 4,
                        height: clamp(hoverRect.height) + 4,
                        border: "2px solid rgba(226, 184, 94, 0.8)",
                        boxShadow: "0 0 0 9999px rgba(0,0,0,0.15), 0 0 20px rgba(226, 184, 94, 0.4)",
                        borderRadius: 8,
                        pointerEvents: "none",
                    }}
                >
                    {/* Tag label */}
                    <div
                        style={{
                            position: "absolute",
                            top: -24,
                            left: 0,
                            background: "rgba(226, 184, 94, 0.9)",
                            color: "#0f172a",
                            padding: "2px 8px",
                            borderRadius: 4,
                            fontSize: 11,
                            fontWeight: 600,
                            fontFamily: "monospace",
                        }}
                    >
                        {hoverTag}
                    </div>
                </div>
            )}

            {/* Selected element highlight with indigo glow */}
            {selected && selectedRect && (
                <div
                    style={{
                        position: "fixed",
                        left: clamp(selectedRect.x) - 3,
                        top: clamp(selectedRect.y) - 3,
                        width: clamp(selectedRect.width) + 6,
                        height: clamp(selectedRect.height) + 6,
                        border: "2px solid rgba(99, 102, 241, 0.9)",
                        boxShadow: "0 0 0 9999px rgba(0,0,0,0.25), 0 0 30px rgba(99, 102, 241, 0.5)",
                        borderRadius: 10,
                        pointerEvents: "none",
                        animation: "selectedPulse 2s ease-in-out infinite",
                    }}
                >
                    {/* Tag label */}
                    <div
                        style={{
                            position: "absolute",
                            top: -26,
                            left: 0,
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            color: "#fff",
                            padding: "3px 10px",
                            borderRadius: 4,
                            fontSize: 11,
                            fontWeight: 600,
                            fontFamily: "monospace",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                        }}
                    >
                        <Crosshair size={12} />
                        {selected.tagName}
                    </div>
                </div>
            )}

            {/* Control panel */}
            <div
                data-testid="visual-editor-panel"
                style={{
                    position: "fixed",
                    right: 16,
                    top: 80,
                    width: 400,
                    maxHeight: "calc(100vh - 100px)",
                    overflow: "hidden",
                    pointerEvents: "auto",
                    borderRadius: 16,
                    border: "1px solid rgba(226, 184, 94, 0.2)",
                    background: "linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.98))",
                    backdropFilter: "blur(24px)",
                    boxShadow: "0 8px 40px rgba(0, 0, 0, 0.5), 0 0 40px rgba(99, 102, 241, 0.1)",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "14px 16px",
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(99, 102, 241, 0.1)",
                    }}
                >
                    <Crosshair size={18} style={{ color: "#a78bfa" }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                            style={{
                                fontWeight: 700,
                                fontSize: 13,
                                color: "#f8fafc",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {panelTitle}
                        </div>
                        <div style={{ opacity: 0.6, fontSize: 11, color: "#94a3b8" }}>
                            {selected ? "Chat to suggest changes" : "Click any element to select"}
                        </div>
                    </div>
                    <button
                        onClick={() => setSelected(null)}
                        disabled={!selected}
                        style={{
                            padding: "6px 12px",
                            borderRadius: 6,
                            border: "1px solid rgba(255,255,255,0.1)",
                            background: "rgba(255,255,255,0.05)",
                            color: selected ? "#e2e8f0" : "#475569",
                            fontSize: 12,
                            cursor: selected ? "pointer" : "default",
                            transition: "all 0.15s",
                        }}
                    >
                        Clear
                    </button>
                    <button
                        onClick={() => {
                            setSelected(null);
                            setEnabled(false);
                        }}
                        style={{
                            padding: "6px 12px",
                            borderRadius: 6,
                            border: "1px solid rgba(239, 68, 68, 0.3)",
                            background: "rgba(239, 68, 68, 0.1)",
                            color: "#f87171",
                            fontSize: 12,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            transition: "all 0.15s",
                        }}
                    >
                        <X size={14} />
                        Exit
                    </button>
                </div>

                {/* Chat component */}
                <VisualEditorChat selected={selected} />
            </div>

            {/* Add pulse animation */}
            <style>
                {`
          @keyframes selectedPulse {
            0%, 100% {
              border-color: rgba(99, 102, 241, 0.9);
              box-shadow: 0 0 0 9999px rgba(0,0,0,0.25), 0 0 30px rgba(99, 102, 241, 0.5);
            }
            50% {
              border-color: rgba(139, 92, 246, 0.95);
              box-shadow: 0 0 0 9999px rgba(0,0,0,0.25), 0 0 40px rgba(139, 92, 246, 0.6);
            }
          }
        `}
            </style>
        </div>
    );
}
