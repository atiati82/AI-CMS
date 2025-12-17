import React, { useState } from 'react';
import { Search, Code, Cpu, Database, Zap, Settings, Book, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function FunctionDocumentationPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const sections = [
        {
            id: 'ai-services',
            title: 'AI Services',
            icon: Cpu,
            color: 'from-purple-500 to-purple-700',
            functions: [
                { name: 'chat()', service: 'andara-chat.ts', description: 'Main AI chat function with optional site context', params: 'messages, includeContext?', returns: 'Promise<string>' },
                { name: 'chatWithFunctions()', service: 'bigmind-cms.ts', description: 'AI chat with CMS database operations', params: 'messages, mode, modelOverride?', returns: 'Promise<BigMindResponse>' },
                { name: 'generatePageFromBrief()', service: 'ai-startup.ts', description: 'Generates complete React page from text brief', params: 'brief, pageSlug?', returns: 'Promise<AIStartupResult>' },
                { name: 'enrichPageHtml()', service: 'ai-enricher.ts', description: 'AI analyzes HTML and returns prompts, specs, suggestions', params: 'html, steps?', returns: 'Promise<AiEnrichment>' },
            ]
        },
        {
            id: 'seo-services',
            title: 'SEO Services',
            icon: Zap,
            color: 'from-green-500 to-green-700',
            functions: [
                { name: 'calculateOpportunityScore()', service: 'seo-brain.ts', description: 'Calculates SEO improvement opportunity score', params: 'pageId', returns: 'Promise<PageOpportunityScore>' },
                { name: 'generateAiSuggestions()', service: 'seo-brain.ts', description: 'AI-generated SEO improvement suggestions', params: 'pageId, analysisContext?', returns: 'Promise<SeoSuggestion[]>' },
                { name: 'runDailyOptimization()', service: 'seo-brain.ts', description: 'Runs daily SEO analysis across all pages', params: 'none', returns: 'Promise<DailySeoReport>' },
                { name: 'extractKeywordsFromText()', service: 'seo-scanner.ts', description: 'Extracts keywords from text content', params: 'text, maxKeywords?', returns: 'Promise<string[]>' },
            ]
        },
        {
            id: 'content-services',
            title: 'Content Services',
            icon: Book,
            color: 'from-blue-500 to-blue-700',
            functions: [
                { name: 'analyzeContent()', service: 'internal-linking.ts', description: 'Analyzes content for link opportunities and CTA suggestions', params: 'content, options?', returns: 'Promise<ContentAnalysis>' },
                { name: 'applyInternalLinks()', service: 'internal-linking.ts', description: 'Applies suggested internal links to content', params: 'content, options?', returns: 'Promise<string>' },
                { name: 'integrateTsxPage()', service: 'page-integrator.ts', description: 'Integrates TSX page into project, updates App.tsx', params: 'inputCode', returns: 'Promise<IntegrationResult>' },
                { name: 'generateMagicPage()', service: 'magic-page-generator.ts', description: 'Generates full page from proposed page entry', params: 'proposedPageId', returns: 'Promise<GeneratedPage>' },
            ]
        },
        {
            id: 'image-services',
            title: 'Image Services',
            icon: Code,
            color: 'from-pink-500 to-pink-700',
            functions: [
                { name: 'generateImage()', service: 'image-generator.ts', description: 'Generates image using Gemini AI', params: 'prompt', returns: 'Promise<GeneratedImage>' },
                { name: 'synthesizePrompts()', service: 'prompt-synthesizer.ts', description: 'Creates detailed image prompts from page context', params: 'page, slots', returns: 'Promise<SynthesizedPrompt[]>' },
                { name: 'detectImageSlots()', service: 'image-slot-detector.ts', description: 'Detects placeholder image slots in HTML', params: 'html', returns: 'DetectedSlot[]' },
            ]
        },
        {
            id: 'system-services',
            title: 'System Services',
            icon: Settings,
            color: 'from-orange-500 to-orange-700',
            functions: [
                { name: 'runMaintenanceCheck()', service: 'maintenanceService.ts', description: 'Runs full system health check', params: 'triggeredBy?', returns: 'Promise<MaintenanceReportData>' },
                { name: 'createCheckoutSession()', service: 'stripeService.ts', description: 'Creates Stripe checkout session', params: 'options', returns: 'Promise<Session>' },
                { name: 'processWebhook()', service: 'webhookHandlers.ts', description: 'Processes incoming Stripe webhooks', params: 'payload, signature, uuid', returns: 'Promise<void>' },
            ]
        }
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">Function Documentation</h1>
                            <p className="text-slate-400">Complete reference for all AI functions, services, and API endpoints</p>
                        </div>
                        <Badge variant="outline" className="text-green-400 border-green-400">
                            {sections.reduce((acc, s) => acc + s.functions.length, 0)} Functions
                        </Badge>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search functions, services, or descriptions..."
                            className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="space-y-8">
                    {filteredSections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <div key={section.id} className="space-y-4">
                                {/* Section Header */}
                                <div className="flex items-center gap-3">
                                    <div className={`p-3 rounded-lg bg-gradient-to-br ${section.color}`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                                        <p className="text-sm text-slate-400">{section.functions.length} functions</p>
                                    </div>
                                </div>

                                {/* Function Cards */}
                                <div className="grid grid-cols-1 gap-4">
                                    {section.functions.map((fn, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 hover:border-slate-600 transition-all group"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <code className="text-lg font-mono font-semibold text-purple-400">
                                                            {fn.name}
                                                        </code>
                                                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
                                                    </div>
                                                    <p className="text-slate-300 mb-3">{fn.description}</p>
                                                </div>
                                                <Badge variant="secondary" className="ml-4 shrink-0">
                                                    {fn.service}
                                                </Badge>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <span className="text-slate-500 font-medium">Parameters:</span>
                                                    <code className="ml-2 text-blue-400">{fn.params}</code>
                                                </div>
                                                <div>
                                                    <span className="text-slate-500 font-medium">Returns:</span>
                                                    <code className="ml-2 text-green-400">{fn.returns}</code>
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
                            <Database className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                            <p className="text-slate-400 text-lg">No functions found matching "{searchQuery}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
