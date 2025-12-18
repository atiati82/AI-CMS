/**
 * DOM Selection Utilities for Visual Editor
 * Generates stable CSS selectors and captures computed styles
 */

/**
 * Generate a CSS selector path for an element
 * Prefers stable IDs and data attributes, falls back to path-based selector
 */
export function getCssPath(el: Element): string {
    // Prefer stable IDs if available
    const id = (el as HTMLElement).id;
    if (id) return `#${CSS.escape(id)}`;

    // Check for data-ag-id (stable targeting attribute)
    const dataAgId = (el as HTMLElement).getAttribute("data-ag-id");
    if (dataAgId) return `[data-ag-id="${CSS.escape(dataAgId)}"]`;

    // Check for data-testid (often stable)
    const testId = (el as HTMLElement).getAttribute("data-testid");
    if (testId) return `[data-testid="${CSS.escape(testId)}"]`;

    // Build path-based selector
    const parts: string[] = [];
    let node: Element | null = el;

    while (node && node.nodeType === 1 && node !== document.body) {
        const tag = node.tagName.toLowerCase();
        const parentEl: Element | null = node.parentElement;
        if (!parentEl) break;

        // Get class-based identifier - filter out problematic classes
        const classes = Array.from(node.classList)
            .filter(c =>
                !c.startsWith('sm:') &&
                !c.startsWith('md:') &&
                !c.startsWith('lg:') &&
                !c.startsWith('xl:') &&
                !c.includes('[') &&  // Filter out arbitrary value classes like bg-[#xxx]
                !c.includes(']') &&
                !c.includes('/') &&  // Filter out opacity modifiers like bg-black/50
                !c.includes('#') &&
                !c.includes('(') &&
                !c.includes(')')
            )
            .slice(0, 2)
            .map(c => CSS.escape(c))  // Escape remaining special chars
            .join('.');

        const siblings = Array.from(parentEl.children).filter((c: Element) => c.tagName.toLowerCase() === tag);
        const index = siblings.indexOf(node) + 1;

        let part: string;
        if (classes && classes.length > 0) {
            part = `${tag}.${classes}`;
        } else if (siblings.length > 1) {
            part = `${tag}:nth-of-type(${index})`;
        } else {
            part = tag;
        }

        parts.unshift(part);
        node = parentEl;

        // Limit depth for readability
        if (parts.length >= 5) break;
    }

    return parts.length ? parts.join(" > ") : el.tagName.toLowerCase();
}

/**
 * Capture a snapshot of computed styles for design intelligence
 */
export function computedSnapshot(el: Element): Record<string, string> {
    const cs = window.getComputedStyle(el as HTMLElement);

    // Key properties for design analysis
    const keys = [
        // Layout
        "display",
        "position",
        "flexDirection",
        "alignItems",
        "justifyContent",
        "gap",
        // Spacing
        "padding",
        "paddingTop",
        "paddingRight",
        "paddingBottom",
        "paddingLeft",
        "margin",
        // Sizing
        "width",
        "height",
        "maxWidth",
        "minHeight",
        // Visual
        "background",
        "backgroundColor",
        "backgroundImage",
        "borderRadius",
        "border",
        "boxShadow",
        "backdropFilter",
        // Typography
        "color",
        "fontSize",
        "fontWeight",
        "fontFamily",
        "lineHeight",
        "letterSpacing",
        "textAlign",
        // Effects
        "opacity",
        "transform",
        "transition",
        "filter",
    ] as const;

    const snap: Record<string, string> = {};
    keys.forEach((k) => {
        const value = (cs as any)[k];
        if (value && value !== 'none' && value !== 'normal' && value !== 'auto') {
            snap[k] = value;
        }
    });

    return snap;
}

/**
 * Get bounding rect of an element
 */
export function rectOf(el: Element) {
    const r = (el as HTMLElement).getBoundingClientRect();
    return { x: r.left, y: r.top, width: r.width, height: r.height };
}

/**
 * Extract key classes from an element (for design intelligence)
 */
export function extractClasses(el: Element): string[] {
    const classList = Array.from((el as HTMLElement).classList || []);

    // Filter for meaningful design classes
    const designPatterns = [
        /^andara-/,
        /^glass-/,
        /^gradient-/,
        /^shadow-/,
        /^card/,
        /^hero/,
        /^section/,
        /^grid/,
        /^flex/,
        /^btn/,
        /^panel/,
    ];

    return classList.filter(c =>
        designPatterns.some(pattern => pattern.test(c))
    );
}
