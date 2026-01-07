import React from 'react';
import { motion } from 'framer-motion';

interface FlipCard3DProps {
    front: React.ReactNode;
    back: React.ReactNode;
    className?: string;
}

/**
 * FlipCard3D - 3D flip card animation component
 */
export function FlipCard3D({ front, back, className = '' }: FlipCard3DProps) {
    const [isFlipped, setIsFlipped] = React.useState(false);

    return (
        <div
            className={`relative cursor-pointer perspective-1000 ${className}`}
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
                    className="absolute inset-0 backface-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    {front}
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 backface-hidden"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    {back}
                </div>
            </motion.div>
        </div>
    );
}

export default FlipCard3D;
