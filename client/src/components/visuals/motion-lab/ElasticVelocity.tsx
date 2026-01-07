import React from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';

interface ElasticVelocityProps {
    children: React.ReactNode;
    className?: string;
}

/**
 * ElasticVelocity - Wrapper that adds elastic response to scroll velocity
 */
export function ElasticVelocity({ children, className = '' }: ElasticVelocityProps) {
    const y = useMotionValue(0);
    const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

    React.useEffect(() => {
        const handleScroll = () => {
            y.set(window.scrollY * 0.1);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [y]);

    return (
        <motion.div
            className={className}
            style={{ y: smoothY }}
        >
            {children}
        </motion.div>
    );
}

export default ElasticVelocity;
