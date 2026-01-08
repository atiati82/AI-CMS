import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'frosted' | 'dark' | 'gold' | 'light';
    glow?: 'none' | 'subtle' | 'strong';
}

/**
 * GlassCard - Glassmorphism card component following Andara design system.
 * Provides frosted glass effect with configurable glow.
 */
export function GlassCard({
    children,
    className,
    variant = 'default',
    glow = 'subtle'
}: GlassCardProps) {
    const variants: Record<string, string> = {
        default: 'bg-white/5 border-white/10',
        frosted: 'bg-white/10 border-white/20 backdrop-blur-xl',
        dark: 'bg-black/30 border-white/5',
        gold: 'bg-amber-500/10 border-amber-500/30',
        light: 'bg-white/20 border-white/30 backdrop-blur-xl'
    };

    const glows = {
        none: '',
        subtle: 'shadow-lg shadow-black/20',
        strong: 'shadow-2xl shadow-black/30'
    };

    return (
        <div
            className={cn(
                'rounded-2xl border backdrop-blur-sm',
                variants[variant],
                glows[glow],
                className
            )}
        >
            {children}
        </div>
    );
}

export default GlassCard;
