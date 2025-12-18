import React from 'react';
import { motion, Variants } from 'framer-motion';

// --- Andara Tree Theme Palette ---
const themeColors = {
    water: { primary: '#1aa7ff', secondary: '#38ffd1' },
    mineral: { primary: '#63b4ff', secondary: '#b8e3ff' },
    bio: { primary: '#2cff9a', secondary: '#00c2ff' },
    matrix: { primary: '#f6d56a', secondary: '#ffb74a' },
    liquid: { primary: '#dfe7f1', secondary: '#9aa7b6' },
    sulfur: { primary: '#ffcc33', secondary: '#ff6600' },
    dna: { primary: '#9b7bff', secondary: '#ff5fd7' },
    earth: { primary: '#c49a6c', secondary: '#7a5a3a' },
};

// --- Animations ---

const drawVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({
        pathLength: 1,
        opacity: 1,
        transition: {
            pathLength: { delay: i * 0.1, type: "spring", duration: 1.5, bounce: 0 },
            opacity: { delay: i * 0.1, duration: 0.01 }
        }
    })
};

const shimmerVariants: Variants = {
    initial: { x1: "0%", y1: "0%", x2: "100%", y2: "100%" },
    hover: {
        x1: ["0%", "100%"], y1: ["0%", "100%"],
        x2: ["100%", "200%"], y2: ["100%", "200%"],
        transition: { duration: 1, ease: "linear", repeat: Infinity }
    }
};

// --- Complex Andara Gold Gradient ---
const AndaraGoldGradient = ({ animated }: { animated?: boolean }) => {
    return (
        <motion.linearGradient
            id="grad-andara-gold"
            variants={animated ? shimmerVariants : undefined}
            initial="initial"
            whileHover="hover"
            // Default fallback if motion props fail within defs in some versions, 
            // but standard motion.linearGradient handles this.
            x1="0%" y1="0%" x2="100%" y2="100%"
        >
            <stop offset="0%" style={{ stopColor: '#c0963b', stopOpacity: 1 }} />
            <stop offset="23%" style={{ stopColor: '#ce9e26', stopOpacity: 1 }} />
            <stop offset="41%" style={{ stopColor: '#f2c76c', stopOpacity: 1 }} />
            <stop offset="59%" style={{ stopColor: '#e0b655', stopOpacity: 1 }} />
            <stop offset="77%" style={{ stopColor: '#fdf8d0', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#e2b85e', stopOpacity: 1 }} />
        </motion.linearGradient>
    );
};

const IconGradient = ({ id, colors }: { id: string, colors: { primary: string, secondary: string } }) => (
    <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: colors.primary, stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: colors.secondary, stopOpacity: 1 }} />
    </linearGradient>
);

interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
    className?: string;
    useGold?: boolean;
    animated?: boolean;
}

// --- Glass Tile Wrapper ---

export const AndaraIconTile = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={`
        relative flex items-center justify-center p-3 rounded-xl 
        bg-black/40 backdrop-blur-xl border border-white/10 
        shadow-[0_0_15px_-3px_rgba(255,255,255,0.05)]
        hover:border-[#c0963b]/50 hover:shadow-[0_0_20px_-5px_rgba(192,150,59,0.3)] 
        transition-all duration-300 group
        ${className}
    `}>
        {children}
    </div>
);

// --- Icons with Optional Gold Mode & Animation ---

export const DashboardIcon: React.FC<IconProps> = ({ size = 24, className, useGold, animated = true, ...props }) => (
    <motion.svg
        width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={`url(#${useGold ? 'grad-andara-gold' : 'grad-water'})`}
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        className={className}
        initial={animated ? "hidden" : "visible"}
        animate="visible"
        {...props as any}
    >
        <defs>{useGold ? <AndaraGoldGradient animated={animated} /> : <IconGradient id="grad-water" colors={themeColors.water} />}</defs>
        <motion.rect variants={drawVariants} custom={0} x="3" y="3" width="7" height="7" rx="2" />
        <motion.rect variants={drawVariants} custom={1} x="14" y="3" width="7" height="7" rx="2" />
        <motion.rect variants={drawVariants} custom={2} x="14" y="14" width="7" height="7" rx="2" />
        <motion.path variants={drawVariants} custom={3} d="M3 14h7v7H3z" />
    </motion.svg>
);

export const AiIcon: React.FC<IconProps> = ({ size = 24, className, useGold, animated = true, ...props }) => (
    <motion.svg
        width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={`url(#${useGold ? 'grad-andara-gold' : 'grad-bio'})`}
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        className={className}
        initial={animated ? "hidden" : "visible"}
        animate="visible"
        {...props as any}
    >
        <defs>{useGold ? <AndaraGoldGradient animated={animated} /> : <IconGradient id="grad-bio" colors={themeColors.bio} />}</defs>
        <motion.path variants={drawVariants} custom={0} d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
        <motion.path variants={drawVariants} custom={1} d="M12 8v-2" /><motion.path variants={drawVariants} custom={1} d="M12 16v2" />
        <motion.path variants={drawVariants} custom={2} d="M16 12h2" /><motion.path variants={drawVariants} custom={2} d="M8 12H6" />
        <motion.path variants={drawVariants} custom={3} d="M14.8 9.2l1.4-1.4" /><motion.path variants={drawVariants} custom={3} d="M9.2 14.8l-1.4 1.4" />
    </motion.svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ size = 24, className, useGold, animated = true, ...props }) => (
    <motion.svg
        width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={`url(#${useGold ? 'grad-andara-gold' : 'grad-matrix'})`}
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        className={className}
        initial={animated ? "hidden" : "visible"}
        animate="visible"
        {...props as any}
    >
        <defs>{useGold ? <AndaraGoldGradient animated={animated} /> : <IconGradient id="grad-matrix" colors={themeColors.matrix} />}</defs>
        <motion.path variants={drawVariants} custom={0} d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        <motion.path variants={drawVariants} custom={1} d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </motion.svg>
);

export const ContentIcon: React.FC<IconProps> = ({ size = 24, className, useGold, animated = true, ...props }) => (
    <motion.svg
        width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={`url(#${useGold ? 'grad-andara-gold' : 'grad-liquid'})`}
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        className={className}
        initial={animated ? "hidden" : "visible"}
        animate="visible"
        {...props as any}
    >
        <defs>{useGold ? <AndaraGoldGradient animated={animated} /> : <IconGradient id="grad-liquid" colors={themeColors.liquid} />}</defs>
        <motion.path variants={drawVariants} custom={0} d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <motion.polyline variants={drawVariants} custom={1} points="14 2 14 8 20 8" />
        <motion.line variants={drawVariants} custom={2} x1="16" y1="13" x2="8" y2="13" />
        <motion.line variants={drawVariants} custom={3} x1="16" y1="17" x2="8" y2="17" />
    </motion.svg>
);

export const AnalyticsIcon: React.FC<IconProps> = ({ size = 24, className, useGold, animated = true, ...props }) => (
    <motion.svg
        width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={`url(#${useGold ? 'grad-andara-gold' : 'grad-sulfur'})`}
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        className={className}
        initial={animated ? "hidden" : "visible"}
        animate="visible"
        {...props as any}
    >
        <defs>{useGold ? <AndaraGoldGradient animated={animated} /> : <IconGradient id="grad-sulfur" colors={themeColors.sulfur} />}</defs>
        <motion.line variants={drawVariants} custom={0} x1="12" y1="20" x2="12" y2="10" />
        <motion.line variants={drawVariants} custom={1} x1="18" y1="20" x2="18" y2="4" />
        <motion.line variants={drawVariants} custom={2} x1="6" y1="20" x2="6" y2="16" />
    </motion.svg>
);

export const AssetsIcon: React.FC<IconProps> = ({ size = 24, className, useGold, animated = true, ...props }) => (
    <motion.svg
        width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={`url(#${useGold ? 'grad-andara-gold' : 'grad-mineral'})`}
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        className={className}
        initial={animated ? "hidden" : "visible"}
        animate="visible"
        {...props as any}
    >
        <defs>{useGold ? <AndaraGoldGradient animated={animated} /> : <IconGradient id="grad-mineral" colors={themeColors.mineral} />}</defs>
        <motion.polyline variants={drawVariants} custom={0} points="21 15 16 10 5 21" />
        <motion.path variants={drawVariants} custom={1} d="M21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10" />
        <motion.circle variants={drawVariants} custom={2} cx="9" cy="9" r="2" />
    </motion.svg>
);

export const SecurityIcon: React.FC<IconProps> = ({ size = 24, className, useGold, animated = true, ...props }) => (
    <motion.svg
        width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={`url(#${useGold ? 'grad-andara-gold' : 'grad-earth'})`}
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        className={className}
        initial={animated ? "hidden" : "visible"}
        animate="visible"
        {...props as any}
    >
        <defs>{useGold ? <AndaraGoldGradient animated={animated} /> : <IconGradient id="grad-earth" colors={themeColors.earth} />}</defs>
        <motion.path variants={drawVariants} custom={0} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </motion.svg>
);

export const UsersIcon: React.FC<IconProps> = ({ size = 24, className, useGold, animated = true, ...props }) => (
    <motion.svg
        width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={`url(#${useGold ? 'grad-andara-gold' : 'grad-dna'})`}
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        className={className}
        initial={animated ? "hidden" : "visible"}
        animate="visible"
        {...props as any}
    >
        <defs>{useGold ? <AndaraGoldGradient animated={animated} /> : <IconGradient id="grad-dna" colors={themeColors.dna} />}</defs>
        <motion.path variants={drawVariants} custom={0} d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <motion.circle variants={drawVariants} custom={1} cx="9" cy="7" r="4" />
        <motion.path variants={drawVariants} custom={2} d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <motion.path variants={drawVariants} custom={3} d="M16 3.13a4 4 0 0 1 0 7.75" />
    </motion.svg>
);

// --- NEW ICONS (Serif/Contrast Style) ---

export const WorkflowIcon: React.FC<IconProps> = ({ size = 24, className, useGold = true, animated = true, ...props }) => (
    <motion.svg
        width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={`url(#${useGold ? 'grad-andara-gold' : 'grad-matrix'})`}
        strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"
        className={className}
        initial={animated ? "hidden" : "visible"}
        animate="visible"
        {...props as any}
    >
        <defs>{useGold ? <AndaraGoldGradient animated={animated} /> : <IconGradient id="grad-matrix" colors={themeColors.matrix} />}</defs>
        <motion.path variants={drawVariants} custom={0} d="M4 6h16M4 12h10M4 18h14" strokeWidth="2.5" />
        <motion.path variants={drawVariants} custom={1} d="M18 4l2 2-2 2" strokeWidth="1.5" />
        <motion.path variants={drawVariants} custom={2} d="M12 10l2 2-2 2" strokeWidth="1.5" />
    </motion.svg>
);

export const AuditIcon: React.FC<IconProps> = ({ size = 24, className, useGold = true, animated = true, ...props }) => (
    <motion.svg
        width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={`url(#${useGold ? 'grad-andara-gold' : 'grad-earth'})`}
        strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"
        className={className}
        initial={animated ? "hidden" : "visible"}
        animate="visible"
        {...props as any}
    >
        <defs>{useGold ? <AndaraGoldGradient animated={animated} /> : <IconGradient id="grad-earth" colors={themeColors.earth} />}</defs>
        <motion.path variants={drawVariants} custom={0} d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
        <motion.path variants={drawVariants} custom={1} d="M21 21l-4.35-4.35" strokeWidth="3" />
        <motion.path variants={drawVariants} custom={2} d="M11 8v.01" strokeWidth="3" />
    </motion.svg>
);

export const DesignIcon: React.FC<IconProps> = ({ size = 24, className, useGold = true, animated = true, ...props }) => (
    <motion.svg
        width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={`url(#${useGold ? 'grad-andara-gold' : 'grad-bio'})`}
        strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"
        className={className}
        initial={animated ? "hidden" : "visible"}
        animate="visible"
        {...props as any}
    >
        <defs>{useGold ? <AndaraGoldGradient animated={animated} /> : <IconGradient id="grad-bio" colors={themeColors.bio} />}</defs>
        <motion.path variants={drawVariants} custom={0} d="M12 19l7-7 3 3-7 7-3-3z" />
        <motion.path variants={drawVariants} custom={1} d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <motion.path variants={drawVariants} custom={2} d="M2 2l7.586 7.586" />
        <motion.circle variants={drawVariants} custom={3} cx="11" cy="11" r="2" />
    </motion.svg>
);
