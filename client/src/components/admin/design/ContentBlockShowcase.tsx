import React from 'react';

/**
 * ContentBlockShowcase - Placeholder component
 * This component showcases different content block types available in the design system
 */
export function ContentBlockShowcase() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-8 rounded-xl border border-border bg-card text-center">
                <div className="text-4xl mb-4">📦</div>
                <h3 className="font-bold text-lg mb-2">Content Blocks Showcase</h3>
                <p className="text-muted-foreground">
                    Browse and preview all available content block components.
                </p>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['Hero', 'Cards', 'FAQ', 'CTA', 'Table', 'Grid'].map((block) => (
                        <div
                            key={block}
                            className="p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                        >
                            <span className="text-sm font-medium">{block}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ContentBlockShowcase;
