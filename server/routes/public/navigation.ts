import { Router } from 'express';
import { storage } from '../../storage';

const router = Router();

// GET /api/navigation
router.get('/', async (req, res) => {
    try {
        const allPages = await storage.getAllPages();
        const publishedPages = allPages.filter(p => p.status === 'published');

        const mainSections = [
            {
                key: 'shop',
                label: 'Shop',
                path: '/shop',
                children: publishedPages
                    .filter(p => p.parentKey === 'shop_overview' || p.key === 'shop_overview')
                    .map(p => ({ key: p.key, label: p.title, path: p.path }))
            },
            {
                key: 'science',
                label: 'Science',
                path: '/science',
                children: [
                    { key: 'ion_hub', label: 'ION Hub — Ionic Intelligence', path: '/ion' },
                    ...publishedPages
                        .filter(p => p.parentKey === 'science_library_overview')
                        .map(p => ({ key: p.key, label: p.title, path: p.path }))
                ]
            },
            {
                key: 'ion',
                label: 'ION',
                path: '/ion',
                children: [
                    { key: 'ion_fundamentals', label: 'Ion Fundamentals', path: '/ion' },
                    { key: 'ion_water', label: 'Ions in Water', path: '/ion/water' },
                    { key: 'ion_conductivity', label: 'Conductivity (EC/TDS)', path: '/ion/conductivity-ec-tds' },
                    { key: 'ion_exchange', label: 'Ion Exchange', path: '/ion/ion-exchange' },
                    { key: 'ion_orp_redox', label: 'ORP & Redox', path: '/ion/orp-redox' },
                    { key: 'ion_volcanic', label: 'Volcanic Minerals', path: '/ion/volcanic-minerals' },
                    { key: 'ion_bioelectric', label: 'Bioelectricity', path: '/ion/bioelectric' },
                    { key: 'ion_sulfates', label: 'Ionic Sulfates', path: '/ion/ionic-sulfates' },
                    { key: 'ionic_minerals_experience', label: '✨ Ionic Minerals Experience', path: '/demos/ionic-minerals' },
                ]
            },
            {
                key: 'experience',
                label: 'Experience',
                path: '/demos/ionic-minerals',
                children: [
                    { key: 'ionic_superpage', label: 'Ionic Minerals Journey', path: '/demos/ionic-minerals' },
                    { key: 'video_gallery', label: 'Video Gallery', path: '/demos/video-gallery' },
                ]
            },
            {
                key: 'about',
                label: 'About',
                path: '/about',
                children: publishedPages
                    .filter(p => p.parentKey === 'about_andara' || p.key === 'about_andara')
                    .map(p => ({ key: p.key, label: p.title, path: p.path }))
            },
            {
                key: 'trust',
                label: 'Trust',
                path: '/trust',
                children: publishedPages
                    .filter(p => p.parentKey === 'trust_quality_overview')
                    .map(p => ({ key: p.key, label: p.title, path: p.path }))
            },
            {
                key: 'blog',
                label: 'Blog',
                path: '/blog',
                children: []
            }
        ];

        res.json({
            sections: mainSections,
            legal: publishedPages
                .filter(p => p.template === 'legal')
                .map(p => ({ key: p.key, label: p.title, path: p.path }))
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch navigation' });
    }
});

export default router;
