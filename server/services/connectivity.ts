import { storage } from "../storage";
import { Page } from "@shared/schema";

export interface ConnectivityStats {
    totalPages: number;
    orphanCount: number;
    deadLinkCount: number;
    orphans: {
        id: string;
        title: string;
        path: string;
        clusterKey?: string;
    }[];
    deadLinks: {
        sourcePageId: string;
        sourcePath: string;
        targetUrl: string;
    }[];
    graphDensity: number; // Average links per page
    nodes: {
        id: string; // path
        label: string;
        group: string;
        status: string;
        orphan: boolean;
    }[];
    edges: {
        source: string;
        target: string;
    }[];
}

export class ConnectivityService {
    async analyzeConnectivity(): Promise<ConnectivityStats> {
        const pages = await storage.getAllPages();
        const pageMap = new Map<string, Page>();
        const pagePathSet = new Set<string>();

        pages.forEach(p => {
            pageMap.set(p.id, p);
            if (p.path) pagePathSet.add(p.path);
        });

        const backlinks = new Map<string, number>(); // path -> count
        const deadLinks: ConnectivityStats['deadLinks'] = [];
        const allEdges: ConnectivityStats['edges'] = [];
        let totalLinks = 0;

        // Initialize backlinks count
        pages.forEach(p => {
            if (p.path) backlinks.set(p.path, 0);
        });

        // Content Regex for Links
        // Matches Markdown [text](/path) and HTML href="/path"
        const linkRegex = /(?:\[.*?\]\(([\w\/\-\.]+)\))|(?:href=["']([\w\/\-\.]+)["'])/g;

        for (const page of pages) {
            if (!page.content) continue;

            const matches = Array.from(page.content.matchAll(linkRegex));

            for (const match of matches) {
                const url = match[1] || match[2];
                if (!url) continue;

                // We only care about internal links
                if (url.startsWith('/') || url.includes('andara')) {
                    // Normalize
                    let cleanPath = url;
                    if (url.startsWith('http')) {
                        try {
                            const u = new URL(url);
                            if (!u.hostname.includes('localhost') && !u.hostname.includes('andara')) continue;
                            cleanPath = u.pathname;
                        } catch (e) { continue; }
                    }

                    // Strip hash/query
                    cleanPath = cleanPath.split('#')[0].split('?')[0];
                    if (cleanPath.endsWith('/')) cleanPath = cleanPath.slice(0, -1);
                    if (cleanPath === '') cleanPath = '/';

                    // Check if exists
                    if (pagePathSet.has(cleanPath)) {
                        backlinks.set(cleanPath, (backlinks.get(cleanPath) || 0) + 1);
                        allEdges.push({ source: page.path, target: cleanPath });
                        totalLinks++;
                    } else {
                        // Dead Link (internal but missing)
                        // Verify it's not a generic asset or ignored path
                        if (!cleanPath.startsWith('/assets') && !cleanPath.startsWith('/images') && !cleanPath.startsWith('/api')) {
                            deadLinks.push({
                                sourcePageId: page.id,
                                sourcePath: page.path,
                                targetUrl: url
                            });
                        }
                    }
                }
            }
        }

        // Identify Orphans
        // Only count published pages as real orphans if they have NO backlinks.
        // Drafts are naturally orphans.
        const orphans = pages
            .filter(p => p.status === 'published')
            .filter(p => (backlinks.get(p.path) || 0) === 0 && p.path !== '/') // Home is never orphan
            .map(p => ({
                id: p.id,
                title: p.title,
                path: p.path,
                clusterKey: p.clusterKey || undefined
            }));

        return {
            totalPages: pages.length,
            orphanCount: orphans.length,
            deadLinkCount: deadLinks.length,
            orphans,
            deadLinks: deadLinks.slice(0, 50), // Cap for safety
            graphDensity: pages.length > 0 ? parseFloat((totalLinks / pages.length).toFixed(2)) : 0,
            nodes: pages.map(p => ({
                id: p.path,
                label: p.title,
                group: p.clusterKey || 'other',
                status: p.status,
                orphan: (backlinks.get(p.path!) || 0) === 0 && p.path !== '/'
            })),
            edges: allEdges
        };
    }
}

export const connectivityService = new ConnectivityService();
