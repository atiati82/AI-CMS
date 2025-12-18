import React, { useState } from 'react';
import { Search, Code, Cpu, Database, Zap, Settings, Book, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FunctionInfo {
    name: string;
    service: string;
    description: string;
    params: string;
    returns: string;
}

interface Section {
    id: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    functions: FunctionInfo[];
}

export default function FunctionsTab() {
    const [searchQuery, setSearchQuery] = useState('');

    const sections: Section[] = [
        {
            id: 'bigmind-cms',
            title: 'BigMind CMS Functions',
            icon: Cpu,
            color: 'from-purple-500 to-purple-700',
            functions: [
                { name: 'listPages()', service: 'bigmind-cms.ts', description: 'Get summary of all pages with optional filtering by cluster, status, or limit.', params: 'cluster?, status?, limit?', returns: 'Promise<PageSummary[]>' },
                { name: 'searchPages()', service: 'bigmind-cms.ts', description: 'Search pages by query text across title, path, content, and SEO fields.', params: 'query, cluster?, limit?', returns: 'Promise<SearchResult[]>' },
                { name: 'getPage()', service: 'bigmind-cms.ts', description: 'Get full page details by ID or path.', params: 'pageId | path', returns: 'Promise<Page>' },
                { name: 'createPage()', service: 'bigmind-cms.ts', description: 'Create new page with auto-generated featured image.', params: 'title, path, clusterKey, ...', returns: 'Promise<CreateResult>' },
                { name: 'updatePage()', service: 'bigmind-cms.ts', description: 'Update existing page content, SEO, or settings.', params: 'pageId, updates', returns: 'Promise<UpdateResult>' },
                { name: 'deletePage()', service: 'bigmind-cms.ts', description: 'Permanently delete a page.', params: 'pageId', returns: 'Promise<DeleteResult>' },
                { name: 'listClusters()', service: 'bigmind-cms.ts', description: 'Get all content clusters with page counts.', params: 'none', returns: 'Promise<ClusterStats[]>' },
                { name: 'getSiteStats()', service: 'bigmind-cms.ts', description: 'Get site-wide statistics including page counts and empty clusters.', params: 'none', returns: 'Promise<SiteStats>' },
                { name: 'searchDocuments()', service: 'bigmind-cms.ts', description: 'Search the document library for uploaded content.', params: 'query, sourceType?, limit?', returns: 'Promise<Document[]>' },
                { name: 'searchKnowledge()', service: 'bigmind-cms.ts', description: 'Search the RAG knowledge base for relevant information.', params: 'query, limit?', returns: 'Promise<KnowledgeResult[]>' },
            ]
        },
        {
            id: 'visual-motion',
            title: 'Visual & Motion Functions',
            icon: Zap,
            color: 'from-green-500 to-green-700',
            functions: [
                { name: 'listMotionArchetypes()', service: 'bigmind-cms.ts', description: 'List all 10 available Andara Motion Archetypes with descriptions.', params: 'none', returns: 'MotionArchetype[]' },
                { name: 'applyMotionPreset()', service: 'bigmind-cms.ts', description: 'Apply motion archetype to page elements (hero, cards, buttons, etc.).', params: 'pageId, motionArchetype, targetElements[]', returns: 'Promise<ApplyResult>' },
                { name: 'updateVisualConfig()', service: 'bigmind-cms.ts', description: 'Update page visual configuration including colors, motion, atmosphere.', params: 'pageId, vibeKeywords?, colorPalette?, ...', returns: 'Promise<UpdateResult>' },
                { name: 'applyStyleToPages()', service: 'bigmind-cms.ts', description: 'Apply visual style or template to multiple pages at once.', params: 'pageIds[] | clusterKey, template?, motionPreset?', returns: 'Promise<BulkResult>' },
                { name: 'getPageVisualConfig()', service: 'bigmind-cms.ts', description: 'Get current visual configuration and motion settings of a page.', params: 'pageId', returns: 'Promise<VisualConfig>' },
            ]
        },
        {
            id: 'advanced-cms',
            title: 'Advanced CMS Functions',
            icon: Settings,
            color: 'from-orange-500 to-orange-700',
            functions: [
                { name: 'duplicatePage()', service: 'bigmind-cms.ts', description: 'Create a copy of an existing page with new title and path.', params: 'pageId, newTitle, newPath', returns: 'Promise<Page>' },
                { name: 'archivePage()', service: 'bigmind-cms.ts', description: 'Archive a page (soft delete). Can be restored later.', params: 'pageId, reason?', returns: 'Promise<ArchiveResult>' },
                { name: 'restorePage()', service: 'bigmind-cms.ts', description: 'Restore an archived page back to draft status.', params: 'pageId', returns: 'Promise<RestoreResult>' },
                { name: 'bulkUpdatePages()', service: 'bigmind-cms.ts', description: 'Update multiple pages at once with the same changes.', params: 'pageIds[], updates', returns: 'Promise<BulkResult>' },
                { name: 'schedulePublish()', service: 'bigmind-cms.ts', description: 'Schedule a page to be published at a specific date/time.', params: 'pageId, publishAt', returns: 'Promise<ScheduleResult>' },
            ]
        },
        {
            id: 'seo-functions',
            title: 'SEO & Analysis Functions',
            icon: Book,
            color: 'from-blue-500 to-blue-700',
            functions: [
                { name: 'analyzeReadability()', service: 'bigmind-cms.ts', description: 'Analyze content readability and get improvement suggestions.', params: 'pageId', returns: 'Promise<ReadabilityResult>' },
                { name: 'generateMetaDescription()', service: 'bigmind-cms.ts', description: 'AI-generate optimized SEO meta description for a page.', params: 'pageId, focusKeyword?', returns: 'Promise<MetaResult>' },
                { name: 'suggestInternalLinks()', service: 'bigmind-cms.ts', description: 'Get internal linking suggestions based on page content.', params: 'pageId', returns: 'Promise<LinkSuggestions>' },
                { name: 'findContentGaps()', service: 'bigmind-cms.ts', description: 'Identify missing pages based on cluster coverage.', params: 'cluster?', returns: 'Promise<ContentGaps>' },
            ]
        },
        {
            id: 'ab-testing',
            title: 'A/B Testing Functions',
            icon: Code,
            color: 'from-pink-500 to-pink-700',
            functions: [
                { name: 'createVariant()', service: 'bigmind-cms.ts', description: 'Create an A/B test variant of an existing page.', params: 'pageId, variantName, changes?, trafficAllocation?', returns: 'Promise<Variant>' },
                { name: 'listVariants()', service: 'bigmind-cms.ts', description: 'List all A/B test variants for a page.', params: 'pageId', returns: 'Promise<Variant[]>' },
                { name: 'getVariantPerformance()', service: 'bigmind-cms.ts', description: 'Get performance metrics comparing all variants.', params: 'pageId, metric?', returns: 'Promise<PerformanceData>' },
                { name: 'promoteWinningVariant()', service: 'bigmind-cms.ts', description: 'Promote the winning variant to become the main page.', params: 'pageId, winningVariantId', returns: 'Promise<PromoteResult>' },
                { name: 'endABTest()', service: 'bigmind-cms.ts', description: 'End an A/B test and clean up variants.', params: 'pageId, keepVariants?', returns: 'Promise<EndResult>' },
            ]
        },
        {
            id: 'image-functions',
            title: 'Image & Vision Functions',
            icon: Database,
            color: 'from-indigo-500 to-indigo-700',
            functions: [
                { name: 'analyzeImage()', service: 'bigmind-cms.ts', description: 'Analyze an image using AI vision to describe content and generate alt text.', params: 'imageUrl, purpose?', returns: 'Promise<ImageAnalysis>' },
                { name: 'generateAltText()', service: 'bigmind-cms.ts', description: 'Generate SEO-optimized alt text for an image.', params: 'imageUrl, pageContext?', returns: 'Promise<string>' },
            ]
        },
    ];

    const filteredSections = sections.map(section => ({
        ...section,
        functions: section.functions.filter(fn =>
            searchQuery === '' ||
            fn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            fn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            fn.service.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(section => section.functions.length > 0);

    const totalFunctions = sections.reduce((acc, s) => acc + s.functions.length, 0);

    return (
        <div className="space-y-6" data-testid="functions-tab">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">BigMind Function Reference</h2>
                    <p className="text-muted-foreground">All available CMS functions for AI chat commands</p>
                </div>
                <Badge variant="outline" className="text-primary border-primary">
                    {totalFunctions} Functions
                </Badge>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search functions, services, or descriptions..."
                    className="pl-10"
                    data-testid="input-search-functions"
                />
            </div>

            <ScrollArea className="h-[calc(100vh-280px)]">
                <div className="space-y-8 pr-4">
                    {filteredSections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <div key={section.id} className="space-y-4">
                                {/* Section Header */}
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg bg-gradient-to-br ${section.color}`}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">{section.title}</h3>
                                        <p className="text-sm text-muted-foreground">{section.functions.length} functions</p>
                                    </div>
                                </div>

                                {/* Function Cards */}
                                <div className="grid grid-cols-1 gap-3">
                                    {section.functions.map((fn, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all group"
                                            data-testid={`function-card-${fn.name.replace(/[()]/g, '')}`}
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <code className="text-base font-mono font-semibold text-primary">
                                                            {fn.name}
                                                        </code>
                                                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mt-1">{fn.description}</p>
                                                </div>
                                                <Badge variant="secondary" className="ml-4 shrink-0 text-xs">
                                                    {fn.service}
                                                </Badge>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 text-xs mt-3 pt-3 border-t border-border/50">
                                                <div>
                                                    <span className="text-muted-foreground font-medium">Parameters:</span>
                                                    <code className="ml-2 text-blue-500">{fn.params}</code>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground font-medium">Returns:</span>
                                                    <code className="ml-2 text-green-500">{fn.returns}</code>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    {filteredSections.length === 0 && (
                        <div className="text-center py-16">
                            <Database className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground text-lg">No functions found matching "{searchQuery}"</p>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}
