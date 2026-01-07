import {
    FileText, Database, Settings, Shield,
    Layers, Package, BookOpen, Heart,
    Compass, Zap, Wand2, Activity,
    Layout, Search, RefreshCw, BarChart2,
    Key
} from "lucide-react";

export interface AdminFeature {
    featureKey: string;
    icon: any;
    navigation: {
        label: string;
        group: string;
        slot: number;
        badge?: string;
        hidden?: boolean;
    };
    route: {
        tabId?: string;
        path: string;
    };
}

export const NAV_GROUPS = {
    content: { label: 'Content Management', order: 1 },
    science: { label: 'Scientific Knowledge', order: 2 },
    commerce: { label: 'E-commerce Ops', order: 3 },
    ai_systems: { label: 'AI & Automations', order: 4 },
    admin: { label: 'System Admin', order: 5 },
};

export const ADMIN_FEATURES: Record<string, AdminFeature> = {
    dashboard: {
        featureKey: 'dashboard',
        icon: Layout,
        navigation: { label: 'Dashboard', group: 'admin', slot: 1 },
        route: { tabId: 'dashboard', path: '/admin' }
    },
    pages: {
        featureKey: 'pages',
        icon: FileText,
        navigation: { label: 'Pages', group: 'content', slot: 1 },
        route: { tabId: 'pages', path: '/admin/content/pages' }
    },
    products: {
        featureKey: 'products',
        icon: Package,
        navigation: { label: 'Products', group: 'commerce', slot: 1 },
        route: { tabId: 'products', path: '/admin/commerce/products' }
    },
    articles: {
        featureKey: 'articles',
        icon: BookOpen,
        navigation: { label: 'Science Articles', group: 'science', slot: 1 },
        route: { tabId: 'articles', path: '/admin/science/articles' }
    },
    magic_pages: {
        featureKey: 'magic_pages',
        icon: Wand2,
        navigation: { label: 'Magic Pages', group: 'ai_systems', slot: 1, badge: 'AI' },
        route: { tabId: 'magic_pages', path: '/admin/ai/magic-pages' }
    },
    documents: {
        featureKey: 'documents',
        icon: Database,
        navigation: { label: 'Documents & RAG', group: 'ai_systems', slot: 2 },
        route: { tabId: 'documents', path: '/admin/ai/documents' }
    },
    seo: {
        featureKey: 'seo',
        icon: Search,
        navigation: { label: 'SEO Scanner', group: 'admin', slot: 2 },
        route: { tabId: 'seo', path: '/admin/seo' }
    },
    settings: {
        featureKey: 'settings',
        icon: Settings,
        navigation: { label: 'Settings', group: 'admin', slot: 3 },
        route: { tabId: 'settings', path: '/admin/settings' }
    }
};
