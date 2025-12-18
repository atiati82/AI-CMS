import React, { lazy, Suspense } from 'react';

/**
 * Component Resolver for AndaraPageRenderer
 * 
 * Parses HTML for component placeholders and replaces them with actual React components.
 * Placeholder format: <!-- COMPONENT: ComponentName prop1={value} prop2={value} -->
 */

// Lazy load diagram components
const TriangleMapSVG = lazy(() => import('./diagrams/TriangleMapSVG').then(m => ({ default: m.TriangleMapSVG })));
const SO4TetrahedronDiagram = lazy(() => import('./diagrams/SO4TetrahedronDiagram').then(m => ({ default: m.SO4TetrahedronDiagram })));
const PatternStackCard = lazy(() => import('./diagrams/PatternStackCard').then(m => ({ default: m.PatternStackCard })));
const HarmonicsNavigator = lazy(() => import('./diagrams/HarmonicsNavigator').then(m => ({ default: m.HarmonicsNavigator })));
const HubNavigationBar = lazy(() => import('./diagrams/HubNavigationBar').then(m => ({ default: m.HubNavigationBar })));
const MagnetPlacementDiagram = lazy(() => import('./diagrams/MagnetPlacementDiagram').then(m => ({ default: m.MagnetPlacementDiagram })));
const HexagonalGridDiagram = lazy(() => import('./diagrams/HexagonalGridDiagram').then(m => ({ default: m.HexagonalGridDiagram })));

// Component registry
const COMPONENT_REGISTRY: Record<string, React.LazyExoticComponent<any>> = {
    'TriangleMapSVG': TriangleMapSVG,
    'SO4TetrahedronDiagram': SO4TetrahedronDiagram,
    'PatternStackCard': PatternStackCard,
    'HarmonicsNavigator': HarmonicsNavigator,
    'HubNavigationBar': HubNavigationBar,
    'MagnetPlacementDiagram': MagnetPlacementDiagram,
    'HexagonalGridDiagram': HexagonalGridDiagram,
};

// Parse props from component placeholder string
function parseComponentProps(propsString: string): Record<string, any> {
    const props: Record<string, any> = {};

    // Match prop={value} or prop="value" patterns
    const propPattern = /(\w+)=\{([^}]+)\}|(\w+)="([^"]+)"/g;
    let match;

    while ((match = propPattern.exec(propsString)) !== null) {
        const name = match[1] || match[3];
        const value = match[2] || match[4];

        // Parse value
        if (value === 'true') props[name] = true;
        else if (value === 'false') props[name] = false;
        else if (!isNaN(Number(value))) props[name] = Number(value);
        else props[name] = value;
    }

    return props;
}

// Component placeholder type
interface ComponentPlaceholder {
    fullMatch: string;
    componentName: string;
    props: Record<string, any>;
}

// Find all component placeholders in HTML
export function findComponentPlaceholders(html: string): ComponentPlaceholder[] {
    const placeholders: ComponentPlaceholder[] = [];

    // Match <!-- COMPONENT: ComponentName prop={value} -->
    const pattern = /<!--\s*COMPONENT:\s*(\w+)([^>]*)\s*-->/g;
    let match;

    while ((match = pattern.exec(html)) !== null) {
        placeholders.push({
            fullMatch: match[0],
            componentName: match[1],
            props: parseComponentProps(match[2] || '')
        });
    }

    return placeholders;
}

// Loading fallback component
function ComponentLoadingFallback() {
    return (
        <div className="component-loading" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px',
            background: 'linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%)',
            borderRadius: '12px',
            color: '#64748b'
        }}>
            <span>Loading component...</span>
        </div>
    );
}

// Render a single component from placeholder
export function renderComponent(placeholder: ComponentPlaceholder): React.ReactNode {
    const Component = COMPONENT_REGISTRY[placeholder.componentName];

    if (!Component) {
        console.warn(`Unknown component: ${placeholder.componentName}`);
        return (
            <div className="component-not-found" style={{
                padding: '16px',
                background: '#fef3c7',
                border: '1px solid #f59e0b',
                borderRadius: '8px',
                color: '#92400e'
            }}>
                Component not found: {placeholder.componentName}
            </div>
        );
    }

    return (
        <Suspense fallback={<ComponentLoadingFallback />}>
            <Component {...placeholder.props} />
        </Suspense>
    );
}

// Split HTML by component placeholders
export function splitHtmlByComponents(html: string): Array<{ type: 'html' | 'component'; content: string | ComponentPlaceholder }> {
    const parts: Array<{ type: 'html' | 'component'; content: string | ComponentPlaceholder }> = [];
    const placeholders = findComponentPlaceholders(html);

    if (placeholders.length === 0) {
        return [{ type: 'html', content: html }];
    }

    let lastIndex = 0;

    for (const placeholder of placeholders) {
        const index = html.indexOf(placeholder.fullMatch, lastIndex);

        // Add HTML before this component
        if (index > lastIndex) {
            parts.push({ type: 'html', content: html.slice(lastIndex, index) });
        }

        // Add component
        parts.push({ type: 'component', content: placeholder });

        lastIndex = index + placeholder.fullMatch.length;
    }

    // Add remaining HTML
    if (lastIndex < html.length) {
        parts.push({ type: 'html', content: html.slice(lastIndex) });
    }

    return parts;
}

// Render mixed HTML and components
export function RenderMixedContent({ html, className = '' }: { html: string; className?: string }) {
    const parts = splitHtmlByComponents(html);

    return (
        <div className={`mixed-content ${className}`}>
            {parts.map((part, index) => {
                if (part.type === 'html') {
                    return (
                        <div
                            key={index}
                            dangerouslySetInnerHTML={{ __html: part.content as string }}
                        />
                    );
                } else {
                    return (
                        <div key={index} className="embedded-component">
                            {renderComponent(part.content as ComponentPlaceholder)}
                        </div>
                    );
                }
            })}
        </div>
    );
}

export default {
    findComponentPlaceholders,
    renderComponent,
    splitHtmlByComponents,
    RenderMixedContent
};
