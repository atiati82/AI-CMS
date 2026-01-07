import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { getImageByKeywords, ImageAsset } from '@/data/image-registry';
import { useDesignSettings } from '@/lib/design-settings';

interface SmartImageCardProps {
    /** Keywords to auto-match an image from the registry */
    keywords: string[];
    /** Card title */
    title: string;
    /** Card description */
    description?: string;
    /** Link destination */
    href?: string;
    /** Optional icon component */
    icon?: React.ReactNode;
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Custom class name */
    className?: string;
}

/**
 * SmartImageCard - A glass card that auto-selects a background image based on keywords
 */
export function SmartImageCard({
    keywords,
    title,
    description,
    href,
    icon,
    size = 'md',
    className = ''
}: SmartImageCardProps) {
    const { isLiteMode } = useDesignSettings();
    const matchedAsset = getImageByKeywords(keywords);

    const sizeClasses = {
        sm: 'h-32',
        md: 'h-48',
        lg: 'h-64'
    };

    const CardContent = (
        <motion.div
            className={`
                andara-glass-card relative overflow-hidden group cursor-pointer
                ${sizeClasses[size]} ${className}
            `}
            whileHover={isLiteMode ? undefined : { y: -4, scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            {/* Background Image */}
            {matchedAsset && (
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                        backgroundImage: `url(${matchedAsset.url})`,
                        opacity: 0.3
                    }}
                />
            )}

            {/* Gradient Overlay */}
            <div
                className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"
            />

            {/* Color Accent */}
            {matchedAsset?.domColors?.[0] && (
                <div
                    className="absolute inset-0 mix-blend-overlay opacity-20"
                    style={{ backgroundColor: matchedAsset.domColors[0] }}
                />
            )}

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-4 md:p-6">
                {icon && (
                    <div className="mb-2 text-white/60 group-hover:text-white transition-colors">
                        {icon}
                    </div>
                )}

                <h3 className="font-display text-lg md:text-xl font-medium text-white group-hover:text-emerald-300 transition-colors">
                    {title}
                </h3>

                {description && (
                    <p className="mt-1 text-sm text-slate-400 line-clamp-2 group-hover:text-slate-300 transition-colors">
                        {description}
                    </p>
                )}

                {href && (
                    <div className="mt-3 flex items-center gap-1 text-xs text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Explore</span>
                        <ArrowRight className="w-3 h-3" />
                    </div>
                )}
            </div>

            {/* Matched Tags (Dev only) */}
            {matchedAsset && process.env.NODE_ENV === 'development' && (
                <div className="absolute top-2 right-2 text-[10px] text-white/30 bg-black/20 px-1 rounded">
                    {matchedAsset.id}
                </div>
            )}
        </motion.div>
    );

    if (href) {
        return <Link href={href}>{CardContent}</Link>;
    }

    return CardContent;
}

export default SmartImageCard;
