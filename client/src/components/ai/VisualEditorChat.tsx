import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Send, Sparkles, Palette, Zap, Layout, Type, Check, Eye, RotateCcw, History, ChevronDown, ChevronUp, Save, Download, Info } from "lucide-react";
import { SelectedNode } from "./VisualEditorProvider";
import { getAuthHeaders } from "@/lib/queryClient";

type ChatMsg = { role: "user" | "assistant"; content: string; suggestions?: DesignSuggestion[] };

interface DesignSuggestion {
    type: string;
    title: string;
    description: string;
    cssChanges?: Record<string, string>;
    preview?: string; // Image URL for preview
    patchId?: string;
    className?: string;
    motionPreset?: string;
    cssCode?: string;
}

interface VisualEditorChatProps {
    selected: SelectedNode | null;
}

// Live CSS Preview component - renders element HTML with CSS applied
function LiveCssPreview({
    cssChanges,
    elementHtml,
    onClick
}: {
    cssChanges: Record<string, string>;
    elementHtml?: string;
    onClick?: () => void;
}) {
    // Build inline style string from cssChanges
    const styleString = Object.entries(cssChanges)
        .map(([prop, val]) => {
            const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
            return `${cssProp}: ${val}`;
        })
        .join('; ');

    return (
        <div
            onClick={onClick}
            style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))',
                borderRadius: 8,
                padding: 12,
                marginBottom: 10,
                border: '1px solid rgba(226, 184, 94, 0.2)',
                cursor: onClick ? 'pointer' : 'default',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>
                Preview
            </div>
            {/* Render a preview box with the CSS applied */}
            <div
                style={{
                    ...cssChanges,
                    minHeight: 80,
                    borderRadius: 6,
                    padding: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    color: '#e2e8f0',
                }}
            >
                <div style={{ textAlign: 'center', opacity: 0.7 }}>
                    {cssChanges.backgroundImage ? '🖼️ Background applied' : '✨ Style applied'}
                </div>
            </div>
            {onClick && (
                <div style={{ textAlign: 'center', fontSize: 9, color: '#64748b', marginTop: 6 }}>
                    Click for full preview
                </div>
            )}
        </div>
    );
}

// Andara design system context
const DESIGN_SYSTEM = {
    css_files: [
        "/client/src/styles/andara-global.css",
        "/client/src/styles/andara-components.css",
        "/client/src/styles/andara-ionic-v1.css",
    ],
    allowed_classes: [
        "andara-glass-card",
        "andara-glass-header",
        "andara-glass-footer",
        "andara-glass-menu",
        "andara-gradient-gold",
        "andara-shadow-gold",
        "andara-hero",
        "panel",
        "facet",
        "field",
    ],
    motion_presets: [
        "hover.lift",
        "hover.liftStrong",
        "hover.scale",
        "fadeUp",
        "fadeIn",
        "fadeLeft",
        "fadeRight",
        "scaleUp",
        "ambient.float",
        "ambient.shimmer",
        "ambient.pulse",
        "stagger.container",
        "stagger.item",
    ],
    color_tokens: [
        "--andara-gradient-gold",
        "--andara-gradient-gold-soft",
        "--accent-1",
        "--accent-2",
        "--text-1",
        "--text-2",
    ],
};

// Simple markdown formatter for chat messages
function formatMessage(text: string): React.ReactNode[] {
    const parts: React.ReactNode[] = [];

    // Split by code blocks ```...```
    const codeBlockRegex = /```(\w*)\n?([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;
    let key = 0;

    while ((match = codeBlockRegex.exec(text)) !== null) {
        // Add text before code block
        if (match.index > lastIndex) {
            const textBefore = text.slice(lastIndex, match.index);
            parts.push(<span key={key++}>{textBefore}</span>);
        }

        // Add styled code block
        const language = match[1] || 'code';
        const code = match[2].trim();
        parts.push(
            <pre
                key={key++}
                style={{
                    background: 'rgba(0,0,0,0.4)',
                    padding: '8px 10px',
                    borderRadius: 6,
                    fontSize: 11,
                    fontFamily: 'monospace',
                    color: language === 'css' ? '#86efac' : '#f0abfc',
                    margin: '8px 0',
                    overflow: 'auto',
                    whiteSpace: 'pre-wrap',
                    border: '1px solid rgba(255,255,255,0.1)',
                }}
            >
                {code}
            </pre>
        );

        lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
        parts.push(<span key={key++}>{text.slice(lastIndex)}</span>);
    }

    return parts.length > 0 ? parts : [<span key={0}>{text}</span>];
}


export function VisualEditorChat({ selected }: VisualEditorChatProps) {
    const [messages, setMessages] = useState<ChatMsg[]>([
        {
            role: "assistant",
            content:
                "Select an element, then tell me what to change. I can propose text edits, CSS preset upgrades (glass/gradient/shadow), and motion presets (hover lift, fade-in), and queue safe patches following the Andara design system.",
        },
    ]);
    const [input, setInput] = useState("");
    const [busy, setBusy] = useState(false);

    // Track original styles for revert functionality
    const [styleHistory, setStyleHistory] = useState<Array<{
        selector: string;
        originalStyles: Record<string, string>;
        appliedStyles: Record<string, string>;
    }>>([]);

    // Undo/redo tracking
    const [undoIndex, setUndoIndex] = useState(-1); // -1 means at latest state

    // Image preview modal state
    const [previewModal, setPreviewModal] = useState<{
        open: boolean;
        imageUrl: string;
        cssChanges: Record<string, string>;
        showBefore?: boolean; // Toggle for before/after comparison
        originalStyles?: Record<string, string>; // Original element styles
    } | null>(null);

    // Load saved styles on mount
    useEffect(() => {
        async function loadSavedStyles() {
            try {
                const res = await fetch(`/api/design-ai/load-styles?pageUrl=${encodeURIComponent(window.location.pathname)}`, {
                    headers: getAuthHeaders(),
                });

                if (!res.ok) return;

                const data = await res.json();
                if (data.styles && data.styles.length > 0) {
                    console.log('[Visual Editor] Loading', data.styles.length, 'saved styles');

                    // Apply saved styles to DOM
                    data.styles.forEach((item: { selector: string; styles: Record<string, string> }) => {
                        try {
                            const el = document.querySelector(item.selector) as HTMLElement;
                            if (el) {
                                Object.entries(item.styles).forEach(([prop, val]) => {
                                    (el.style as any)[prop] = val;
                                });
                            }
                        } catch (e) {
                            console.warn('[Visual Editor] Could not apply style to:', item.selector);
                        }
                    });

                    setMessages(m => [...m, {
                        role: "assistant",
                        content: `🔄 Restored ${data.styles.length} saved style(s) from your previous session.`
                    }]);
                }
            } catch (e) {
                console.error('[Visual Editor] Failed to load saved styles:', e);
            }
        }

        loadSavedStyles();
    }, []);

    // Undo/Redo keyboard shortcuts
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            // Ctrl+Z or Cmd+Z for Undo
            if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
                e.preventDefault();
                if (styleHistory.length > 0) {
                    // Undo last change
                    const lastChange = styleHistory[styleHistory.length - 1];
                    try {
                        const el = document.querySelector(lastChange.selector) as HTMLElement;
                        if (el) {
                            Object.entries(lastChange.originalStyles).forEach(([prop, val]) => {
                                (el.style as any)[prop] = val;
                            });
                        }
                        setStyleHistory(h => h.slice(0, -1));
                        setMessages(m => [...m, { role: "assistant", content: `↩️ Undo: reverted last change.` }]);
                    } catch (err) {
                        console.error('[Visual Editor] Undo error:', err);
                    }
                }
            }

            // Ctrl+Shift+Z or Cmd+Shift+Z for Redo (not implemented - would need redo stack)
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [styleHistory]);

    // Apply CSS styles to the selected element
    function applyStyles(cssChanges?: Record<string, string>, selector?: string) {
        if (!cssChanges || !selector) {
            setMessages(m => [...m, {
                role: "assistant",
                content: "❌ Please select an element first."
            }]);
            return;
        }

        console.log('[Visual Editor] Applying styles to:', selector);
        console.log('[Visual Editor] CSS changes:', cssChanges);

        try {
            const element = document.querySelector(selector) as HTMLElement;
            if (!element) {
                setMessages(m => [...m, {
                    role: "assistant",
                    content: `❌ Could not find element: ${selector}`
                }]);
                return;
            }

            // Save original styles before applying
            const originalStyles: Record<string, string> = {};
            Object.keys(cssChanges).forEach(property => {
                // Handle camelCase to kebab-case conversion
                const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
                originalStyles[property] = element.style.getPropertyValue(cssProperty) || '';
            });

            // Apply each CSS property
            Object.entries(cssChanges).forEach(([property, value]) => {
                // Convert camelCase to kebab-case for CSS property names
                const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();

                console.log(`[Visual Editor] Setting ${cssProperty} = ${value}`);

                // Use direct property assignment for better compatibility
                if (property === 'backgroundImage') {
                    element.style.backgroundImage = value;
                } else if (property === 'backgroundColor') {
                    element.style.backgroundColor = value;
                } else if (property === 'backgroundSize') {
                    element.style.backgroundSize = value;
                } else if (property === 'backgroundPosition') {
                    element.style.backgroundPosition = value;
                } else {
                    element.style.setProperty(cssProperty, value);
                }
            });

            // Add to history for revert
            setStyleHistory(prev => [...prev, {
                selector,
                originalStyles,
                appliedStyles: cssChanges,
            }]);

            setMessages(m => [...m, {
                role: "assistant",
                content: `✅ Applied ${Object.keys(cssChanges).length} style changes to ${selected?.tagName || 'element'}!`
            }]);
        } catch (error: any) {
            console.error('[Visual Editor] Apply error:', error);
            setMessages(m => [...m, {
                role: "assistant",
                content: `❌ Failed to apply styles: ${error.message}`
            }]);
        }
    }

    // Revert the last applied styles
    function revertLastChange() {
        if (styleHistory.length === 0) {
            setMessages(m => [...m, {
                role: "assistant",
                content: "❌ No changes to revert."
            }]);
            return;
        }

        const lastChange = styleHistory[styleHistory.length - 1];

        try {
            const element = document.querySelector(lastChange.selector) as HTMLElement;
            if (!element) {
                setMessages(m => [...m, {
                    role: "assistant",
                    content: `❌ Could not find element to revert: ${lastChange.selector}`
                }]);
                return;
            }

            // Restore original styles
            Object.entries(lastChange.originalStyles).forEach(([property, value]) => {
                const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
                if (value) {
                    element.style.setProperty(cssProperty, value);
                } else {
                    element.style.removeProperty(cssProperty);
                }
            });

            // Remove from history
            setStyleHistory(prev => prev.slice(0, -1));

            setMessages(m => [...m, {
                role: "assistant",
                content: `↩️ Reverted ${Object.keys(lastChange.appliedStyles).length} style changes.`
            }]);
        } catch (error: any) {
            setMessages(m => [...m, {
                role: "assistant",
                content: `❌ Failed to revert: ${error.message}`
            }]);
        }
    }

    // Revert a specific change by index (and all changes after it)
    function revertToChange(indexToRevertTo: number) {
        // Revert all changes from the end back to the target index
        const changesToRevert = styleHistory.slice(indexToRevertTo);

        changesToRevert.reverse().forEach((change, i) => {
            try {
                const element = document.querySelector(change.selector) as HTMLElement;
                if (element) {
                    Object.entries(change.originalStyles).forEach(([property, value]) => {
                        const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
                        if (value) {
                            element.style.setProperty(cssProperty, value);
                        } else {
                            element.style.removeProperty(cssProperty);
                        }
                    });
                }
            } catch (e) {
                console.error('Failed to revert change:', e);
            }
        });

        // Update history
        setStyleHistory(prev => prev.slice(0, indexToRevertTo));

        setMessages(m => [...m, {
            role: "assistant",
            content: `↩️ Reverted ${changesToRevert.length} change(s).`
        }]);
    }

    // State for showing history panel
    const [showHistory, setShowHistory] = useState(false);

    // State for showing style inspector
    const [showInspector, setShowInspector] = useState(false);

    // Save changes to database
    async function saveChanges() {
        if (styleHistory.length === 0) {
            setMessages(m => [...m, { role: "assistant", content: "No changes to save." }]);
            return;
        }

        setBusy(true);
        try {
            const res = await fetch("/api/design-ai/save-styles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...getAuthHeaders(),
                },
                body: JSON.stringify({
                    pageUrl: window.location.pathname,
                    styles: styleHistory.map(h => ({
                        selector: h.selector,
                        styles: h.appliedStyles,
                    })),
                }),
            });

            if (res.ok) {
                setMessages(m => [...m, {
                    role: "assistant",
                    content: `💾 Saved ${styleHistory.length} style change(s) to database. They will persist on page refresh.`
                }]);
            } else {
                const data = await res.json();
                setMessages(m => [...m, { role: "assistant", content: `❌ Failed to save: ${data.error}` }]);
            }
        } catch (e: any) {
            setMessages(m => [...m, { role: "assistant", content: `❌ Save error: ${e.message}` }]);
        } finally {
            setBusy(false);
        }
    }

    // Export CSS to clipboard/download
    function exportCSS() {
        if (styleHistory.length === 0) {
            setMessages(m => [...m, { role: "assistant", content: "No changes to export." }]);
            return;
        }

        // Generate CSS from history
        const cssRules = styleHistory.map(h => {
            const props = Object.entries(h.appliedStyles)
                .map(([prop, val]) => {
                    const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                    return `    ${cssProp}: ${val};`;
                })
                .join('\n');
            return `${h.selector} {\n${props}\n}`;
        }).join('\n\n');

        const cssContent = `/* Visual Editor Export - ${new Date().toISOString()} */\n\n${cssRules}`;

        // Try to copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(cssContent).then(() => {
                setMessages(m => [...m, {
                    role: "assistant",
                    content: `📋 CSS copied to clipboard! ${styleHistory.length} rule(s).`
                }]);
            });
        } else {
            // Fallback: download as file
            const blob = new Blob([cssContent], { type: 'text/css' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'visual-editor-export.css';
            a.click();
            URL.revokeObjectURL(url);

            setMessages(m => [...m, {
                role: "assistant",
                content: `📥 Downloaded visual-editor-export.css (${styleHistory.length} rule(s)).`
            }]);
        }
    }

    const selectionContext = useMemo(() => {
        if (!selected) return null;
        return {
            selector: selected.selector,
            tagName: selected.tagName,
            rect: selected.rect,
            computed: selected.computed,
            outerHTML: selected.outerHTML,
            pageUrl: window.location.href,
        };
    }, [selected]);

    async function send() {
        if (!input.trim()) return;
        const userText = input.trim();
        setInput("");
        setMessages((m) => [...m, { role: "user", content: userText }]);
        setBusy(true);

        try {
            // Build messages array including the new user message
            const updatedMessages = [
                ...messages.map(m => ({ role: m.role, content: m.content })),
                { role: "user" as const, content: userText }
            ];

            // Call our design-ai API (or patch API when available)
            const res = await fetch("/api/design-ai/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...getAuthHeaders(),
                },
                body: JSON.stringify({
                    messages: updatedMessages,
                    selectionContext,
                    design_system: DESIGN_SYSTEM,
                    instruction: userText,
                }),
            });

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                setMessages((m) => [
                    ...m,
                    {
                        role: "assistant",
                        content: `Request failed: ${data?.error ?? "Unknown error"}`,
                    },
                ]);
                return;
            }

            // Add response with suggestions
            setMessages((m) => [
                ...m,
                {
                    role: "assistant",
                    content: data?.response || data?.message || "Here are my design recommendations:",
                    suggestions: data?.suggestions,
                },
            ]);
        } catch (e: any) {
            // Provide more helpful error messages
            let errorMessage = e?.message ?? String(e);

            if (errorMessage === 'Load failed' || errorMessage === 'Failed to fetch') {
                errorMessage = 'Network error. The server may be restarting or the request timed out. Please try again.';
            }

            setMessages((m) => [...m, {
                role: "assistant",
                content: `❌ ${errorMessage}`
            }]);
        } finally {
            setBusy(false);
        }
    }

    function quickSuggest(type: "text" | "animation" | "design" | "premium" | "redesign") {
        if (!selected) {
            setMessages((m) => [...m, { role: "assistant", content: "Select an element first." }]);
            return;
        }

        const prompts: Record<string, string> = {
            text: "Rewrite the text in this element to be clearer, more premium, and more conversion-oriented. Keep the Andara brand tone - sophisticated and scientific.",
            animation:
                "Suggest a Motion preset for this element (hover.lift, fadeUp, ambient.float) and explain how to implement it using our motion system.",
            design:
                "Suggest design improvements using existing Andara CSS utilities (andara-glass-card, gradient-gold, soft shadow, proper spacing). Explain briefly.",
            premium:
                "Make this element feel more premium and luxurious. Apply gold gradients, glass effects, subtle glow, and enhanced typography following the Andara aesthetic.",
            redesign:
                "Please redesign this whole layout. Understand the content first and propose a comprehensive visual makeover with premium styling options.",
        };

        setInput(prompts[type]);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, overflow: "hidden" }}>
            {/* Quick action buttons */}
            <div
                style={{
                    padding: "10px 12px",
                    display: "flex",
                    gap: 6,
                    flexWrap: "wrap",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
            >
                <QuickButton icon={<Sparkles size={12} />} label="Premium" onClick={() => quickSuggest("premium")} disabled={busy} />
                <QuickButton icon={<Palette size={12} />} label="Design" onClick={() => quickSuggest("design")} disabled={busy} />
                <QuickButton icon={<Zap size={12} />} label="Motion" onClick={() => quickSuggest("animation")} disabled={busy} />
                <QuickButton icon={<Type size={12} />} label="Text" onClick={() => quickSuggest("text")} disabled={busy} />
                <QuickButton icon={<Layout size={12} />} label="Redesign" onClick={() => quickSuggest("redesign")} disabled={busy} />
                <QuickButton
                    icon={<Info size={12} />}
                    label="Inspect"
                    onClick={() => setShowInspector(!showInspector)}
                    disabled={!selected}
                />
            </div>

            {/* Style Inspector Panel */}
            {showInspector && selected && selected.computed && (
                <div style={{
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    background: 'rgba(99, 102, 241, 0.05)',
                }}>
                    <div style={{
                        padding: '8px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                    }}>
                        <span style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: '#818cf8',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                        }}>
                            <Info size={12} />
                            Computed Styles
                        </span>
                        <button
                            onClick={() => setShowInspector(false)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#64748b',
                                fontSize: 12,
                                cursor: 'pointer',
                            }}
                        >
                            ×
                        </button>
                    </div>
                    <div style={{
                        padding: '8px 12px',
                        maxHeight: 120,
                        overflow: 'auto',
                        fontFamily: 'monospace',
                        fontSize: 10,
                    }}>
                        {Object.entries(selected.computed)
                            .filter(([key]) => !key.startsWith('_'))
                            .slice(0, 15)
                            .map(([key, val]) => (
                                <div
                                    key={key}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '2px 0',
                                        color: '#94a3b8',
                                    }}
                                >
                                    <span style={{ color: '#818cf8' }}>{key}</span>
                                    <span style={{
                                        maxWidth: 150,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        {String(val).slice(0, 40)}
                                    </span>
                                </div>
                            ))}
                    </div>
                </div>
            )}

            {/* Change History Panel */}
            {styleHistory.length > 0 && (
                <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <button
                        onClick={() => setShowHistory(!showHistory)}
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            background: 'rgba(251, 146, 60, 0.1)',
                            border: 'none',
                            color: '#fb923c',
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: 'pointer',
                        }}
                    >
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <History size={14} />
                            Change History ({styleHistory.length})
                        </span>
                        {showHistory ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    {/* Save / Export buttons */}
                    <div style={{ display: 'flex', gap: 4, padding: '4px 12px' }}>
                        <button
                            onClick={saveChanges}
                            disabled={busy}
                            style={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 4,
                                padding: '6px 10px',
                                borderRadius: 6,
                                border: '1px solid rgba(34, 197, 94, 0.3)',
                                background: 'rgba(34, 197, 94, 0.15)',
                                color: '#22c55e',
                                fontSize: 11,
                                fontWeight: 600,
                                cursor: busy ? 'wait' : 'pointer',
                            }}
                        >
                            <Save size={12} />
                            Save
                        </button>
                        <button
                            onClick={exportCSS}
                            style={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 4,
                                padding: '6px 10px',
                                borderRadius: 6,
                                border: '1px solid rgba(99, 102, 241, 0.3)',
                                background: 'rgba(99, 102, 241, 0.15)',
                                color: '#818cf8',
                                fontSize: 11,
                                fontWeight: 600,
                                cursor: 'pointer',
                            }}
                        >
                            <Download size={12} />
                            Export
                        </button>
                    </div>

                    {showHistory && (
                        <div style={{ padding: '8px 12px', maxHeight: 150, overflow: 'auto' }}>
                            {styleHistory.map((change, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '6px 8px',
                                        marginBottom: 4,
                                        background: 'rgba(255,255,255,0.03)',
                                        borderRadius: 6,
                                        fontSize: 11,
                                    }}
                                >
                                    <span style={{ color: '#94a3b8' }}>
                                        #{index + 1} {Object.keys(change.appliedStyles).length} props → {change.selector.slice(0, 25)}...
                                    </span>
                                    <button
                                        onClick={() => revertToChange(index)}
                                        style={{
                                            padding: '3px 8px',
                                            borderRadius: 4,
                                            border: '1px solid rgba(251, 146, 60, 0.3)',
                                            background: 'rgba(251, 146, 60, 0.1)',
                                            color: '#fb923c',
                                            fontSize: 10,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        ↩️ Revert
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Messages */}
            <div
                style={{
                    flex: 1,
                    overflow: "auto",
                    padding: 12,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                }}
            >
                {messages.map((m, i) => (
                    <div
                        key={i}
                        style={{
                            padding: "10px 12px",
                            borderRadius: 10,
                            fontSize: 13,
                            lineHeight: 1.5,
                            background: m.role === "user" ? "rgba(99, 102, 241, 0.2)" : "rgba(255,255,255,0.05)",
                            border: m.role === "user" ? "1px solid rgba(99, 102, 241, 0.3)" : "1px solid rgba(255,255,255,0.08)",
                            color: "#e2e8f0",
                            alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                            maxWidth: "90%",
                        }}
                    >
                        <div>{formatMessage(m.content)}</div>

                        {/* Render suggestions if present */}
                        {m.suggestions && m.suggestions.length > 0 && (
                            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
                                {m.suggestions.map((s, j) => (
                                    <div
                                        key={j}
                                        style={{
                                            padding: "10px 12px",
                                            borderRadius: 10,
                                            background: "rgba(16, 185, 129, 0.1)",
                                            border: "1px solid rgba(16, 185, 129, 0.2)",
                                        }}
                                    >
                                        <div style={{ fontWeight: 600, fontSize: 12, color: "#34d399", marginBottom: 6 }}>
                                            {s.title}
                                        </div>
                                        <div style={{ fontSize: 12, color: "#a7f3d0", marginBottom: 8 }}>{s.description}</div>

                                        {/* Live CSS Preview for redesign suggestions */}
                                        {s.cssChanges && !s.preview && (
                                            <LiveCssPreview
                                                cssChanges={s.cssChanges}
                                                onClick={() => setPreviewModal({
                                                    open: true,
                                                    imageUrl: '', // No image URL for CSS previews
                                                    cssChanges: s.cssChanges || {},
                                                })}
                                            />
                                        )}

                                        {/* Image Preview for generated images */}
                                        {s.preview && (
                                            <div style={{ marginBottom: 10 }}>
                                                <img
                                                    src={s.preview}
                                                    alt="Preview"
                                                    onClick={() => setPreviewModal({
                                                        open: true,
                                                        imageUrl: s.preview!,
                                                        cssChanges: s.cssChanges || {},
                                                    })}
                                                    style={{
                                                        width: '100%',
                                                        maxHeight: 150,
                                                        objectFit: 'cover',
                                                        borderRadius: 8,
                                                        border: '1px solid rgba(226, 184, 94, 0.3)',
                                                        cursor: 'pointer',
                                                    }}
                                                />
                                                <div style={{ textAlign: 'center', fontSize: 10, color: '#94a3b8', marginTop: 4 }}>
                                                    Click to enlarge
                                                </div>
                                            </div>
                                        )}

                                        {/* CSS Changes Display */}
                                        {s.cssChanges && (
                                            <div
                                                style={{
                                                    marginBottom: 10,
                                                    padding: 8,
                                                    background: "rgba(0,0,0,0.3)",
                                                    borderRadius: 6,
                                                    fontFamily: "monospace",
                                                    fontSize: 10,
                                                    color: "#86efac",
                                                    maxHeight: 80,
                                                    overflow: "auto",
                                                }}
                                            >
                                                {Object.entries(s.cssChanges).slice(0, 5).map(([k, v]) => (
                                                    <div key={k}>{k}: {v}</div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Action Buttons */}
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button
                                                onClick={() => applyStyles(s.cssChanges, selected?.selector)}
                                                disabled={!selected || !s.cssChanges}
                                                style={{
                                                    flex: 1,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: 6,
                                                    padding: '8px 12px',
                                                    borderRadius: 8,
                                                    border: 'none',
                                                    background: selected && s.cssChanges
                                                        ? 'linear-gradient(135deg, #10b981, #059669)'
                                                        : 'rgba(255,255,255,0.1)',
                                                    color: selected && s.cssChanges ? '#fff' : '#64748b',
                                                    fontSize: 12,
                                                    fontWeight: 600,
                                                    cursor: selected && s.cssChanges ? 'pointer' : 'not-allowed',
                                                    transition: 'all 0.2s',
                                                }}
                                            >
                                                <Check size={14} />
                                                Apply
                                            </button>
                                            {styleHistory.length > 0 && (
                                                <button
                                                    onClick={revertLastChange}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: 5,
                                                        padding: '8px 12px',
                                                        borderRadius: 8,
                                                        border: '1px solid rgba(251, 146, 60, 0.4)',
                                                        background: 'rgba(251, 146, 60, 0.15)',
                                                        color: '#fb923c',
                                                        fontSize: 12,
                                                        fontWeight: 600,
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s',
                                                    }}
                                                >
                                                    <RotateCcw size={14} />
                                                    Revert
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {busy && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#a78bfa", fontSize: 13 }}>
                        <div
                            style={{
                                width: 14,
                                height: 14,
                                border: "2px solid rgba(167, 139, 250, 0.3)",
                                borderTopColor: "#a78bfa",
                                borderRadius: "50%",
                                animation: "spin 0.8s linear infinite",
                            }}
                        />
                        <span>Analyzing design...</span>
                    </div>
                )}
            </div>

            {/* Input */}
            <div
                style={{
                    padding: 12,
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    gap: 8,
                    background: "rgba(0,0,0,0.2)",
                }}
            >
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={selected ? "Describe what you want to change…" : "Select an element first…"}
                    style={{
                        flex: 1,
                        padding: "10px 14px",
                        borderRadius: 10,
                        border: "1px solid rgba(255,255,255,0.1)",
                        background: "rgba(255,255,255,0.05)",
                        color: "#f8fafc",
                        fontSize: 13,
                        outline: "none",
                    }}
                    disabled={busy}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            send();
                        }
                    }}
                    onFocus={(e) => {
                        e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.5)";
                    }}
                    onBlur={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    }}
                />
                <button
                    onClick={send}
                    disabled={busy || !input.trim()}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        border: "none",
                        background: busy || !input.trim() ? "rgba(99, 102, 241, 0.3)" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        color: "white",
                        cursor: busy || !input.trim() ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s",
                    }}
                >
                    <Send size={16} />
                </button>
            </div>

            {/* Image Preview Modal */}
            {previewModal?.open && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.85)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10000,
                    }}
                    onClick={() => setPreviewModal(null)}
                >
                    <div
                        style={{
                            background: 'linear-gradient(135deg, #0f172a, #1e293b)',
                            borderRadius: 16,
                            padding: 24,
                            maxWidth: '80vw',
                            maxHeight: '80vh',
                            border: '1px solid rgba(226, 184, 94, 0.3)',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ fontSize: 18, fontWeight: 700, color: '#e2b85e', marginBottom: 16, textAlign: 'center' }}>
                            {previewModal.imageUrl ? '🖼️ Generated Image Preview' : '✨ Style Preview'}
                        </div>

                        {/* Show image if available */}
                        {previewModal.imageUrl ? (
                            <img
                                src={previewModal.imageUrl}
                                alt="Generated preview"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '50vh',
                                    borderRadius: 12,
                                    border: '1px solid rgba(255,255,255,0.1)',
                                }}
                            />
                        ) : (
                            /* Show large CSS preview */
                            <div
                                style={{
                                    ...previewModal.cssChanges,
                                    width: '60vw',
                                    height: '40vh',
                                    maxWidth: 600,
                                    borderRadius: 12,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    position: 'relative',
                                }}
                            >
                                <div style={{
                                    textAlign: 'center',
                                    color: 'rgba(255,255,255,0.7)',
                                    padding: 20,
                                }}>
                                    <div style={{ fontSize: 24, marginBottom: 12 }}>
                                        {previewModal.cssChanges.backgroundImage ? '🖼️' : '✨'}
                                    </div>
                                    <div style={{ fontSize: 14, marginBottom: 16 }}>
                                        {previewModal.showBefore ? 'Original element styles' : 'Your element will look like this'}
                                    </div>
                                    <div style={{ fontSize: 11, fontFamily: 'monospace', color: previewModal.showBefore ? '#f0abfc' : '#86efac' }}>
                                        {Object.entries(previewModal.showBefore ? (previewModal.originalStyles || {}) : previewModal.cssChanges).slice(0, 4).map(([k, v]) => (
                                            <div key={k}>{k}: {String(v).slice(0, 40)}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Before/After Toggle */}
                        {!previewModal.imageUrl && (
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
                                <button
                                    onClick={() => setPreviewModal(p => p ? { ...p, showBefore: !p.showBefore } : null)}
                                    style={{
                                        padding: '8px 20px',
                                        borderRadius: 20,
                                        border: '1px solid rgba(226, 184, 94, 0.4)',
                                        background: previewModal.showBefore ? 'rgba(240, 171, 252, 0.2)' : 'rgba(134, 239, 172, 0.2)',
                                        color: previewModal.showBefore ? '#f0abfc' : '#86efac',
                                        fontSize: 12,
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                    }}
                                >
                                    {previewModal.showBefore ? '◀ Show After' : 'Show Before ▶'}
                                </button>
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: 12, marginTop: 20, justifyContent: 'center' }}>
                            <button
                                onClick={() => {
                                    applyStyles(previewModal.cssChanges, selected?.selector);
                                    setPreviewModal(null);
                                }}
                                disabled={!selected}
                                style={{
                                    padding: '12px 32px',
                                    borderRadius: 10,
                                    border: 'none',
                                    background: 'linear-gradient(135deg, #10b981, #059669)',
                                    color: '#fff',
                                    fontSize: 14,
                                    fontWeight: 700,
                                    cursor: selected ? 'pointer' : 'not-allowed',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                }}
                            >
                                <Check size={18} />
                                Apply Style
                            </button>
                            <button
                                onClick={() => {
                                    setPreviewModal(null);
                                    setInput('generate new background');
                                }}
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: 10,
                                    border: '1px solid rgba(226, 184, 94, 0.4)',
                                    background: 'rgba(226, 184, 94, 0.1)',
                                    color: '#e2b85e',
                                    fontSize: 14,
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                }}
                            >
                                🔄 Regenerate
                            </button>
                            <button
                                onClick={() => setPreviewModal(null)}
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: 10,
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    background: 'rgba(255,255,255,0.05)',
                                    color: '#94a3b8',
                                    fontSize: 14,
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Spin animation */}
            <style>
                {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
            </style>
        </div>
    );
}

function QuickButton({
    icon,
    label,
    onClick,
    disabled,
}: {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    disabled?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "5px 10px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "#94a3b8",
                fontSize: 11,
                cursor: disabled ? "not-allowed" : "pointer",
                transition: "all 0.15s",
                opacity: disabled ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
                if (!disabled) {
                    e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.4)";
                    e.currentTarget.style.background = "rgba(99, 102, 241, 0.1)";
                    e.currentTarget.style.color = "#c4b5fd";
                }
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.color = "#94a3b8";
            }}
        >
            {icon}
            {label}
        </button>
    );
}
