
export type NavItem = {
    label: string;
    path: string;
    badge?: string;
    isExternal?: boolean;
    icon?: string; // Topic key for AndaraDynamicIcon
};

export type NavCategory = {
    title: string;
    items: NavItem[];
};

export type FeaturedItem = {
    title: string;
    subtitle: string;
    path: string;
    imageGradient: string; // CSS gradient string
    iconName?: string;
    texture?: string; // New texture path
};

export type NavSection = {
    key: string;
    label: string;
    path: string;
    icon?: string; // Topic key for AndaraDynamicIcon
    featured?: FeaturedItem[];
    categories?: NavCategory[];
};

export const navigationConfig: NavSection[] = [
    {
        key: 'shop',
        label: 'Shop',
        path: '/shop',
        icon: 'shop',
        featured: [
            {
                title: 'Andara Ionic 100ml',
                subtitle: 'The Daily rEvolution Ritual',
                path: '/products/andara-ionic-100ml',
                imageGradient: 'from-emerald-500/20 to-teal-900/40',
                texture: '/images/textures/shop_light_texture.webp'
            },
            {
                title: 'Andara Ionic 1L',
                subtitle: 'The Source (Refill)',
                path: '/products/andara-ionic-1l',
                imageGradient: 'from-amber-500/20 to-orange-900/40',
                texture: '/images/textures/source_volcanic_texture.webp'
            }
        ],
        categories: [
            {
                title: 'Collections',
                items: [
                    { label: 'All Products', path: '/shop', icon: 'shop' },
                    { label: 'Bundles & Savings', path: '/shop', icon: 'energy' }
                ]
            },
            {
                title: 'Tools',
                items: [
                    { label: 'Dilution Calculator', path: '/andara-dilution-calculator', icon: 'energy' },
                    { label: 'Ionic Drops Info', path: '/ionic-drops', icon: 'proton' }
                ]
            },
            {
                title: 'Partners',
                items: [
                    { label: 'B2B & Resellers', path: '/b2b-reseller', icon: 'trust' }
                ]
            }
        ]
    },
    {
        key: 'science',
        label: 'Science',
        path: '/science-library',
        icon: 'science',
        featured: [
            {
                title: 'EZ Water & Structure',
                subtitle: 'The Fourth Phase',
                path: '/science/ez-water-overview',
                imageGradient: 'from-cyan-500/20 to-blue-900/40',
                texture: '/images/textures/water_texture.png'
            },
            {
                title: 'Bio-Electricity',
                subtitle: 'The Invisible Voltage',
                path: '/science/bioelectricity-invisible-voltage',
                imageGradient: 'from-violet-500/20 to-purple-900/40',
                texture: '/images/textures/bioelectric_texture.png'
            },
            {
                title: 'Crystalline Matrix',
                subtitle: 'Geometry & Light',
                path: '/science/crystalline-matrix-overview',
                imageGradient: 'from-indigo-500/20 to-blue-900/40',
                texture: '/images/textures/matrix_texture.png'
            }
        ],
        categories: [
            {
                title: 'Water Physics',
                items: [
                    { label: 'Water Phases & Structure', path: '/science/water-phases', icon: 'waterPhases' },
                    { label: 'Vortexing & Flow', path: '/science/vortexing-spirals-flow-coherence', icon: 'vortex' },
                    { label: 'Magnetics & Water', path: '/science/magnetics-water', icon: 'magnetics' }
                ]
            },
            {
                title: 'Mineral Chemistry',
                items: [
                    { label: 'Sulfate Chemistry', path: '/science/sulfate-chemistry', icon: 'sulfate' },
                    { label: 'Ionic vs Colloidal', path: '/science/ionic-vs-colloidal-vs-solid', icon: 'proton' },
                    { label: 'Trace Minerals', path: '/science/trace-minerals-rare-earths', icon: 'minerals' }
                ]
            },
            {
                title: 'Biology & DNA',
                items: [
                    { label: 'Liquid Crystal Biology', path: '/science/liquid-crystal-biology-overview', icon: 'crystalline' },
                    { label: 'DNA & Resonance', path: '/science/dna-mineral-codes', icon: 'dna' }
                ]
            },
            {
                title: 'Consciousness',
                items: [
                    { label: 'Spiritual Electricity', path: '/science/spiritual-electricity-ion-intelligence', icon: 'bioelectric' },
                    { label: 'Geometry & Consciousness', path: '/science/geometry-consciousness', icon: 'consciousness' }
                ]
            }
        ]
    },
    {
        key: 'applications',
        label: 'Applications',
        path: '/how-to-use-andara',
        icon: 'energy',
        featured: [
            {
                title: 'Dosing Guide',
                subtitle: 'Find Your Perfect Ratio',
                path: '/support/how-to-choose-dose',
                imageGradient: 'from-teal-500/20 to-emerald-900/40',
                texture: '/images/textures/shop_light_texture.webp'
            },
            {
                title: 'Detox Protocol',
                subtitle: 'Support Your Pathways',
                path: '/applications/detox-protocol-support',
                imageGradient: 'from-rose-500/20 to-red-900/40',
                texture: '/images/textures/mineral_texture.png'
            }
        ],
        categories: [
            {
                title: 'Everyday Use',
                items: [
                    { label: 'How to Use Overview', path: '/how-to-use-andara', icon: 'energy' },
                    { label: 'Drinking Water (Home)', path: '/how-to-use-andara', icon: 'waterPhases' },
                    { label: 'Bath & Shower', path: '/how-to-use-andara', icon: 'ezWater' },
                    { label: 'Cooking, Tea & Coffee', path: '/how-to-use-andara', icon: 'vortex' }
                ]
            },
            {
                title: 'Specialized',
                items: [
                    { label: 'Travel & Portable', path: '/applications/travel-mobile', icon: 'energy' },
                    { label: 'Plants & Garden', path: '/how-to-use-andara', icon: 'terrain' },
                    { label: 'Cleaning & Surfaces', path: '/applications/cleaning-surfaces', icon: 'crystalline' }
                ]
            }
        ]
    },
    {
        key: 'trust',
        label: 'Trust',
        path: '/trust/mineral-origin',
        icon: 'trust',
        categories: [
            {
                title: 'Transparency',
                items: [
                    { label: 'Sourcing & Sustainability', path: '/trust/mineral-origin', icon: 'terrain' },
                    { label: 'Mineral Sources', path: '/science/mineral-sources', icon: 'minerals' },
                    { label: 'Lab Methods & Analysis', path: '/trust/lab-methods', icon: 'science' }
                ]
            },
            {
                title: 'Support',
                items: [
                    { label: 'FAQ: Safety & Quality', path: '/trust/faq-safety-quality', icon: 'trust' },
                    { label: 'Shipping & Returns', path: '/support/shipping-returns', icon: 'shop' },
                    { label: 'Contact Support', path: '/contact-support', icon: 'about' }
                ]
            }
        ]
    },
    {
        key: 'about',
        label: 'About',
        path: '/what-is-andara-ionic',
        icon: 'about',
        categories: [
            {
                title: 'The Company',
                items: [
                    { label: 'What Is Andara?', path: '/what-is-andara-ionic', icon: 'about' },
                    { label: 'Primordial Origins', path: '/primordial', icon: 'terrain' },
                    { label: 'Vision & Mission', path: '/about/vision-mission', icon: 'consciousness' }
                ]
            },
            {
                title: 'Community',
                items: [
                    { label: 'Events & Gathering', path: '/community/events', icon: 'energy' },
                    { label: 'Timeline', path: '/about/timeline', icon: 'crystalline' }
                ]
            }
        ]
    }
];
