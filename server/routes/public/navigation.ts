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
                children: publishedPages
                    .filter(p => p.parentKey === 'science_library_overview')
                    .map(p => ({ key: p.key, label: p.title, path: p.path }))
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
