import React, { useEffect, useState } from 'react';
import { GoldLogoLoader } from "@/components/ui/GoldLogoLoader";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface GlobalLoaderProps {
    className?: string;
}

export function GlobalLoader({ className }: GlobalLoaderProps) {
    // We can keep the simpler structure without the fake progress bar for a cleaner look
    // or keep it if the user likes the "initializing" feel. 
    // Given the user said "instead of loading....", they likely want the icon to be the focus.

    return (
        <div className={cn("flex flex-col h-screen w-screen items-center justify-center bg-[#020617] text-white p-4 space-y-8", className)}>
            <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-[#bf953f] blur-[100px] opacity-20 rounded-full" />

                <GoldLogoLoader size={120} />
            </div>

            <div className="flex flex-col items-center space-y-4 w-full max-w-[240px]">
                <span className="text-[#bf953f] font-mono text-xs tracking-widest animate-pulse h-4 uppercase">
                    INITIALIZING SYSTEM...
                </span>
            </div>
        </div>
    );
}
