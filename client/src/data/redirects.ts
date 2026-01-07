export interface RedirectConfig {
    from: string;
    to: string;
}

export const redirects: RedirectConfig[] = [
    // 1. Data.ts Legacy Mappings (Systemic Fix)
    // These deal with slugs defined in lib/data.ts that drift from actual file paths
    {
        from: '/science/sulfate-neglected-mineral',
        to: '/science/sulfate-chemistry'
    },
    {
        from: '/science/flocculation-purification',
        to: '/science/turbidity-clarity-flocculation'
    },
    {
        from: '/science/bioelectricity-cellular-voltage',
        to: '/science/bioelectricity-invisible-voltage'
    },
    {
        from: '/science/fourth-phase-water',
        to: '/science/ez-water-overview'
    },
    {
        from: '/science/geometric-language-water',
        to: '/science/crystalline-matrix-overview'
    },
    {
        from: '/three-six-nine-harmonics',
        to: '/science/triangular-harmonics'
    },
    {
        from: '/light-and-water',
        to: '/science/light-sound-water'
    },

    // 2. Evolution Mappings (Historic URL changes)
    // From /science/experiments/... -> specific pages
    {
        from: '/science/experiments/clarity',
        to: '/science/turbidity-clarity-flocculation'
    },
    {
        from: '/science/turbidity-clarity',
        to: '/science/turbidity-clarity-flocculation'
    },

    // 3. Hub Redirections (Prevent 404s on parent routes)
    {
        from: '/science',
        to: '/science-library'
    },
    {
        from: '/trust',
        to: '/trust/overview'
    },
    {
        from: '/applications',
        to: '/how-to-use-andara'
    },
    {
        from: '/minerals',
        to: '/science/mineral-sources'
    },

    // 4. Specific User Reports
    {
        from: '/science/minerals/fulvic-humic',
        to: '/science/mineral-sources'
    },
    {
        from: '/science/water/magnetics',
        to: '/science/magnetics-water'
    },
    {
        from: '/mineral-sources-comparison',
        to: '/trust/comparison-other-mineral-products'
    },
    {
        from: '/science/minerals/comparison',
        to: '/trust/comparison-other-mineral-products'
    },
    // 5. Bundle & Shop Redirections
    {
        from: '/shop/andara-ionic-1l-bundles',
        to: '/products/andara-ionic-1l-bundles'
    },
    {
        from: '/andara-ionic-1l-bundles',
        to: '/products/andara-ionic-1l-bundles'
    },
    {
        from: '/shop/bundles',
        to: '/products/andara-ionic-1l-bundles'
    },
    {
        from: '/shop/bundles-1l',
        to: '/products/andara-ionic-1l-bundles'
    },
    // 6. Demo to Live Migrations
    {
        from: '/demo/mineral-intelligence',
        to: '/mineral-intelligence'
    }
];
