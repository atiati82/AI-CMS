
import React, { ReactNode } from "react";
import Layout from "@/components/layout";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { HeroGlass } from "@/components/visuals/HeroGlass";
import { ScrollProgress } from "@/components/plugins/ScrollProgress";
import { motion } from "framer-motion";
import { ArrowRight, Link as LinkIcon, Download, BookOpen } from "lucide-react";
import { Link, useLocation } from "wouter";
import { getImageForRoute } from "@/data/image-registry";
import SeoCopilotOverlay from "@/components/admin/SeoCopilotOverlay";
import { useDesignSettings } from "@/lib/design-settings";
import { useClusterVibe } from "@/hooks/useClusterVibe";

// ============================================================================
// TYPES
// ============================================================================

export type PageSection = {
    id: string;
    title?: string;
    content: ReactNode;
    variant?: "glass" | "transparent" | "dark";
};

export type ResourceLink = {
    title: string;
    url: string;
    type: "internal" | "external" | "download";
};

export type StandardPageProps = {
    title: ReactNode;
    subtitle?: ReactNode;
    heroImage?: string; // Optional abstract background
    registryId?: string; // Smart Registry ID (Preferred)
    heroVariant?: string; // Color theme for hero
    heroIcon?: React.ElementType; // Icon COMPONENT to display in hero (passed to BadgeIcon)
    badges?: Array<{ text: string; icon?: React.ElementType }>; // e.g. [{ text: "Science", icon: Component }]
    backgroundElement?: React.ReactNode; // Custom background component for Hero

    // SEO
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[]; // Optional manual override

    // New SEO integration (replacing manualProps)
    seo?: {
        title?: string;
        description?: string;
        keywords?: string[];
    };

    // Content
    intro?: ReactNode; // The "lead" paragraph
    sections?: PageSection[];

    // Sidebar / Extras
    relatedLinks?: ResourceLink[];

    heroContent?: ReactNode; // Content to render INSIDE the HeroGlass (e.g. CTA buttons, product images)
    vibeKeywords?: string[];
    clusterKey?: string; // Cluster key for dynamic theming
    children?: ReactNode; // For custom layouts inside the wrapper
    extraHead?: ReactNode; // For JSON-LD or custom meta tags
};

// ============================================================================
// COMPONENTS
// ============================================================================

// A standard section wrapper with consistent padding and max-width
// SPACING: py-10 (40px) mobile, py-16 (64px) desktop - section rhythm
const SectionWrapper = ({
    children,
    variant = "transparent",
    className = ""
}: {
    children: ReactNode;
    variant?: PageSection["variant"];
    className?: string;
}) => {
    const bgClasses = {
        glass: "bg-[#0b1020]/40 backdrop-blur-md border border-white/5",
        transparent: "",
        dark: "bg-[#020617] border-y border-white/5",
    };

    return (
        <section className={`py-10 md:py-16 relative ${bgClasses[variant]} ${className}`}>
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
                {children}
            </div>
        </section>
    );
};

// A standard typography block for reading ease
const ProseBlock = ({ children }: { children: ReactNode }) => (
    <div className="prose prose-invert prose-lg max-w-none text-slate-300/90 leading-relaxed font-light">
        {children}
    </div>
);

// Standard Card for related links/resources
const ResourceCard = ({ link }: { link: ResourceLink }) => {
    const Icon = link.type === "download" ? Download : link.type === "external" ? LinkIcon : BookOpen;
    const { isLiteMode } = useDesignSettings();

    const content = (
        <motion.div
            className="andara-glass-card p-5 group cursor-pointer h-full flex items-start gap-4"
            whileHover={isLiteMode ? undefined : { y: -4, transition: { duration: 0.2 } }}
        >
            <div className="p-2 rounded-lg bg-white/5 text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <h4 className="font-display font-medium text-white group-hover:text-emerald-300 transition-colors mb-1">
                    {link.title}
                </h4>
                <div className="flex items-center gap-1 text-xs text-slate-500 uppercase tracking-wider font-semibold group-hover:text-slate-400">
                    {link.type} <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </div>
            </div>
        </motion.div>
    );

    return link.type === "external" ? (
        <a href={link.url} target="_blank" rel="noopener noreferrer">{content}</a>
    ) : (
        <Link href={link.url}>{content}</Link>
    );
};

// ============================================================================
// MAIN TEMPLATE
// ============================================================================

export default function StandardPageLayout({
    title,
    subtitle,
    heroImage,
    registryId,
    heroVariant = "cyan",
    heroIcon,
    badges = [],
    backgroundElement,
    heroContent,
    seoTitle,
    seoDescription,
    seoKeywords,
    seo, // Destructure new prop
    intro,
    sections = [],
    relatedLinks = [],
    extraHead,
    clusterKey,
    children
}: StandardPageProps) {
    const [location] = useLocation();
    const { isLiteMode } = useDesignSettings();

    // Fetch cluster vibe for dynamic theming
    const { color: clusterColor, vibeKeywords: clusterVibeKeywords } = useClusterVibe(clusterKey);

    // Auto-resolve image if not provided
    const resolvedImage = !registryId && !heroImage ? getImageForRoute(location) : undefined;
    const finalRegistryId = registryId || resolvedImage?.id;

    // Auto-generate keywords from Registry + Badges + Props
    // 1. Tags from Registry (if available)
    const registryTags = resolvedImage?.tags || [];
    // 2. Badges text
    const badgeTags = badges.map(b => b.text.toLowerCase());
    // 3. Manual override
    const manualTags = seoKeywords || seo?.keywords || [];

    // Combine and dedupe
    const docKeywords = Array.from(new Set([
        ...registryTags,
        ...badgeTags,
        ...manualTags,
        "andara", "structured water", "ionic minerals" // Global baselines
    ])).join(", ");

    const resolvedSeoTitle = seoTitle || seo?.title || (typeof title === 'string' ? title : 'Andara Page');
    const resolvedSeoDescription = seoDescription || seo?.description || (typeof subtitle === 'string' ? subtitle : 'Andara content');


    // SEO Side Effects
    React.useEffect(() => {
        document.title = resolvedSeoTitle;

        // Description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute("content", resolvedSeoDescription);
        } else {
            const el = document.createElement('meta');
            el.name = "description";
            el.content = resolvedSeoDescription;
            document.head.appendChild(el);
        }

        // Keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute("content", docKeywords);
        } else {
            const el = document.createElement('meta');
            el.name = "keywords";
            el.content = docKeywords;
            document.head.appendChild(el);
        }
    }, [resolvedSeoTitle, resolvedSeoDescription, docKeywords]);

    // ============================================================================
    // SEO AUTOMATION (Schema)
    // ============================================================================

    // 1. Breadcrumb Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://andara.io"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": typeof title === 'string' ? title : resolvedSeoTitle,
                "item": `https://andara.io${location}`
            }
        ]
    };

    // 2. Article Schema
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": resolvedSeoTitle,
        "description": resolvedSeoDescription,
        "keywords": docKeywords,
        "image": heroImage ? `https://andara.io${heroImage}` : undefined,
        "author": {
            "@type": "Organization",
            "name": "Andara Ionic"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Andara Ionic",
            "logo": {
                "@type": "ImageObject",
                "url": "https://andara.io/andara-logo-full.svg"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://andara.io${location}`
        }
    };

    // Parse Badges for Hero
    const primaryBadge = badges[0] || {};
    const badgeText = primaryBadge.text || "Andara Science";
    const BadgeIcon = heroIcon || primaryBadge.icon;

    return (
        <Layout>
            {/* Cluster Theme Class - applied via wrapper div */}
            <div className={`andara-cluster--${clusterKey?.toLowerCase().replace(/_/g, '-')}`}>
                {/* Auto-Injected Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
                />
                {extraHead}
                {/* 1. HERO SECTION */}
                <ScrollProgress />
                <motion.div
                    key={finalRegistryId}
                    initial={isLiteMode ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={isLiteMode ? { duration: 0 } : { duration: 0.5 }}
                >
                    <HeroGlass
                        title={title}
                        subtitle={subtitle}
                        backgroundImage={heroImage}
                        registryId={finalRegistryId}
                        variant={heroVariant}
                        badgeText={badgeText}
                        BadgeIcon={BadgeIcon as any}
                        backgroundElement={backgroundElement}
                        liteMode={isLiteMode}
                    >
                        {heroContent}
                    </HeroGlass>
                </motion.div>

                {/* 2. INTRO / LEAD */}
                {/* SPACING: -mt-6 overlap, mt-10 divider */}
                {intro && (
                    <SectionWrapper className="pt-0 -mt-6 relative z-10">
                        <FadeIn>
                            <div className="max-w-3xl mx-auto text-center">
                                <div className="text-xl md:text-2xl text-slate-200 font-light leading-relaxed">
                                    {intro}
                                </div>
                                <div className="h-px w-24 bg-gradient-to-r from-transparent to-transparent mx-auto mt-10" style={{ backgroundImage: `linear-gradient(to right, transparent, ${clusterColor}80, transparent)` }} />
                            </div>
                        </FadeIn>
                    </SectionWrapper>
                )}

                {/* 3. MAIN SECTIONS */}
                {/* SPACING: mb-8/10, gap-10 */}
                {sections.map((section) => (
                    <SectionWrapper key={section.id} variant={section.variant}>
                        <StaggerContainer>
                            {section.title && (
                                <div className="mb-8 md:mb-10">
                                    <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-4">
                                        {section.title}
                                    </h2>
                                    <div className="h-0.5 w-12" style={{ backgroundColor: `${clusterColor}4d` }} />
                                </div>
                            )}

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                <div className="lg:col-span-8">
                                    <ProseBlock>{section.content}</ProseBlock>
                                </div>

                                {/* Optional Sidebar Space per section if needed */}
                            </div>
                        </StaggerContainer>
                    </SectionWrapper>
                ))}

                {/* 4. CUSTOM CHILDREN (for flexibility) */}
                {children}

                {/* 5. RELATED RESOURCES */}
                {/* SPACING: mb-6 title, gap-6 cards */}
                {relatedLinks.length > 0 && (
                    <SectionWrapper variant="dark" className="border-t border-white/5">
                        <FadeIn>
                            <h3 className="text-xl font-display text-white mb-6 text-center">Related Resources</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                                {relatedLinks.map(link => (
                                    <ResourceCard key={link.url} link={link} />
                                ))}
                            </div>
                        </FadeIn>
                    </SectionWrapper>
                )}

                <SeoCopilotOverlay pageId={registryId} isAdminMode={true} />
            </div>
        </Layout>
    );
}
