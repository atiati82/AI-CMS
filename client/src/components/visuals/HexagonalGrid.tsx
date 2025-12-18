import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface HexagonalGridProps {
    className?: string;
    color?: 'cyan' | 'purple' | 'amber' | 'blue';
    density?: 'low' | 'medium' | 'high';
}

export function HexagonalGrid({ className, color = 'cyan', density = 'medium' }: HexagonalGridProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const { clientX, clientY } = e;
            const { left, top, width, height } = containerRef.current.getBoundingClientRect();
            const x = (clientX - left) / width - 0.5;
            const y = (clientY - top) / height - 0.5;

            containerRef.current.style.setProperty('--mouse-x', x.toString());
            containerRef.current.style.setProperty('--mouse-y', y.toString());
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const colorClasses = {
        cyan: 'from-cyan-500/20 to-blue-500/20 stroke-cyan-500/30',
        purple: 'from-purple-500/20 to-pink-500/20 stroke-purple-500/30',
        amber: 'from-amber-500/20 to-orange-500/20 stroke-amber-500/30',
        blue: 'from-blue-500/20 to-indigo-500/20 stroke-blue-500/30',
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative w-full h-96 overflow-hidden perspective-1000",
                className
            )}
            style={{
                '--mouse-x': '0',
                '--mouse-y': '0',
            } as React.CSSProperties}
        >
            <div
                className="absolute inset-0 transition-transform duration-200 ease-out transform-gpu"
                style={{
                    transform: 'rotateX(calc(var(--mouse-y) * 10deg)) rotateY(calc(var(--mouse-x) * 10deg))',
                }}
            >
                <svg className="w-full h-full opacity-60" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                            <path d="M25 0 L50 14.4 L50 43.3 L25 57.7 L0 43.3 L0 14.4 Z" fill="none" stroke="currentColor" strokeWidth="1" className={cn("transition-colors duration-500", colorClasses[color].split(' ')[2])} />
                        </pattern>
                        <radialGradient id="fade-mask" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="white" stopOpacity="1" />
                            <stop offset="100%" stopColor="white" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hexagons)" mask="url(#fade-mask)" />
                </svg>

                {/* Glowing Orbs */}
                <div className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-30 bg-gradient-to-tr mix-blend-screen animate-pulse-slow",
                    colorClasses[color].split(' ')[0], colorClasses[color].split(' ')[1]
                )} />
            </div>
        </div>
    );
}
