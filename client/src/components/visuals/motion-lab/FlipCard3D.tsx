import React from 'react';
import { motion } from 'framer-motion';

interface FlipCard3DProps {
    front?: React.ReactNode;
    back?: React.ReactNode;
    title?: string;
    subtitle?: string;
    backTitle?: string;
    backContent?: string;
    className?: string;
}

/**
 * FlipCard3D - 3D flip card animation component
 */
export function FlipCard3D({
    front,
    back,
    title,
    subtitle,
    backTitle,
    backContent,
    className = ''
}: FlipCard3DProps) {
    const [isFlipped, setIsFlipped] = React.useState(false);

    const frontContent = front || (
        <div className="w-full h-full p-6 bg-slate-900/80 border border-white/10 rounded-xl flex flex-col justify-center text-center backdrop-blur-sm">
            <h3 className="text-white font-bold mb-2">{title}</h3>
            <p className="text-sm text-slate-400">{subtitle}</p>
        </div>
    );

    const backContentFinal = back || (
        <div className="w-full h-full p-6 bg-purple-900/20 border border-purple-500/30 rounded-xl flex flex-col justify-center text-center backdrop-blur-sm">
            <h3 className="text-purple-200 font-bold mb-2">{backTitle}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{backContent}</p>
        </div>
    );

    return (
        <div
            className={`relative cursor-pointer h-48 ${className}`}
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ perspective: '1000px' }}
        >
            <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                {/* Front */}
                <div
                    className="absolute inset-0"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    {frontContent}
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    {backContentFinal}
                </div>
            </motion.div>
        </div>
    );
}

export default FlipCard3D;
