/**
 * SEO Copilot Overlay
 * 
 * A floating panel that appears only in admin/edit mode, providing
 * real-time SEO suggestions and coaching to editors.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
    Sparkles,
    X,
    TrendingUp,
    FileText,
    Target,
    Lightbulb,
    Link2,
    HelpCircle,
    ChevronRight,
    Loader2,
    CheckCircle2,
    AlertTriangle,
    Eye,
    BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';

interface PageSeoMetrics {
    pageId: string;
    priorityScore: number;
    wordCount: number;
    h2Count: number;
    internalLinksOut: number;
    internalLinksIn: number;
    hasFaqBlock: boolean;
    hasProofBlock: boolean;
    hasSchema: boolean;
    kwInTitle: boolean;
    kwInH1: boolean;
    kwInMeta: boolean;
    kwInFirst100: boolean;
    calculatedAt: string;
    // Potentially calculated fields or joined data
    seoFocus?: string;
    seoTitle?: string;
}

interface SectionSuggestion {
    type: 'word_count' | 'keyword' | 'internal_link' | 'faq';
    message: string;
    priority: 'high' | 'medium' | 'low';
}

interface QuickWin {
    pageId: string;
    priorityScore: number;
    page: {
        title: string;
        slug: string;
    };
}

interface SeoCopilotOverlayProps {
    pageId?: string;
    isAdminMode?: boolean;
}

export default function SeoCopilotOverlay({ pageId, isAdminMode = true }: SeoCopilotOverlayProps) {
    const [isOpen, setIsOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [activeSection, setActiveSection] = useState<string | null>(null);

    // Only render in admin mode
    if (!isAdminMode) return null;

    // Fetch page SEO metrics
    const { data: metricsData, isLoading: metricsLoading } = useQuery<{ metrics: PageSeoMetrics } | null>({
        queryKey: ['/api/seo/metrics', pageId],
        enabled: isOpen && !!pageId,
        staleTime: 60000,
    });

    // Fetch quick wins
    const { data: quickWinsData } = useQuery<{ quickWins: QuickWin[] }>({
        queryKey: ['/api/seo/dashboard/quick-wins'],
        enabled: isOpen,
        staleTime: 300000,
    });

    const pageMetrics = metricsData?.metrics;
    const opportunities = quickWinsData?.quickWins || [];

    // Mutations
    const generateFaqMutation = useMutation({
        mutationFn: async (topic: string) => {
            const res = await fetch('/api/seo/generate/faq', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pageId, topic })
            });
            if (!res.ok) throw new Error('Failed to generate FAQ');
            return res.json();
        },
        onSuccess: (data) => {
            console.log('Generated FAQ:', data);
            navigator.clipboard.writeText(data.output.html);
            alert('FAQ Block generated and copied to clipboard!');
        }
    });

    const generateProofMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch('/api/seo/generate/proof', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    claim: pageMetrics?.seoTitle || 'Page Topic',
                    evidenceType: 'scientific'
                })
            });
            if (!res.ok) throw new Error('Failed to generate proof');
            return res.json();
        },
        onSuccess: (data) => {
            navigator.clipboard.writeText(data.output.html);
            alert('Proof Block generated and copied to clipboard!');
        }
    });

    // Calculate SEO score color
    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-emerald-400';
        if (score >= 60) return 'text-amber-400';
        return 'text-red-400';
    };

    // Get section suggestions based on active section
    const getSectionSuggestions = (): (SectionSuggestion & { action?: { label: string, handler: () => void, isLoading: boolean } })[] => {
        if (!pageMetrics) return [];

        const suggestions: (SectionSuggestion & { action?: { label: string, handler: () => void, isLoading: boolean } })[] = [];

        if (pageMetrics.wordCount < 800) {
            suggestions.push({
                type: 'word_count',
                message: `Content is thin. Add ${800 - pageMetrics.wordCount} more words to reach minimum targets.`,
                priority: 'high'
            });
        }

        if (!pageMetrics.hasFaqBlock) {
            suggestions.push({
                type: 'faq',
                message: 'Consider adding an FAQ section to capture featured snippets.',
                priority: 'medium',
                action: {
                    label: 'Generate FAQ',
                    handler: () => generateFaqMutation.mutate(pageMetrics.seoFocus || 'General Topic'),
                    isLoading: generateFaqMutation.isPending
                }
            });
        }

        if (pageMetrics.internalLinksOut < 3) {
            suggestions.push({
                type: 'internal_link',
                message: `Add ${3 - pageMetrics.internalLinksOut} more internal links to related pages.`,
                priority: 'medium'
            });
        }

        if (!pageMetrics.kwInH1) {
            suggestions.push({
                type: 'keyword',
                message: `Ensure your primary keyword appears in the H1 title.`,
                priority: 'high'
            });
        }

        if (!pageMetrics.hasProofBlock) {
            suggestions.push({
                type: 'word_count', // Using word_count icon for proof generally, could be new icon
                message: 'Add a scientific proof block to increase credibility.',
                priority: 'medium',
                action: {
                    label: 'Generate Proof',
                    handler: () => generateProofMutation.mutate(),
                    isLoading: generateProofMutation.isPending
                }
            });
        }

        return suggestions;
    };

    const priorityColors = {
        high: 'bg-red-500/20 text-red-400 border-red-500/30',
        medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        low: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    };

    return (
        <>
            {/* Floating Trigger Button */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full 
          bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30 
          hover:shadow-violet-500/50 hover:scale-105 transition-all ${isOpen ? 'hidden' : ''}`}
                data-testid="seo-copilot-trigger"
            >
                <Sparkles className="w-5 h-5" />
                <span className="font-medium">SEO AI</span>
                {pageMetrics && (
                    <Badge className={`ml-1 ${getScoreColor(pageMetrics.priorityScore)} bg-white/10`}>
                        {Math.round(pageMetrics.priorityScore)}
                    </Badge>
                )}
            </motion.button>

            {/* Overlay Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: 400, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 400, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25 }}
                        className="fixed top-4 right-4 bottom-4 w-96 z-50 bg-slate-900/95 backdrop-blur-xl 
              border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
                        data-testid="seo-copilot-panel"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-slate-800/50">
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-lg bg-linear-to-br from-violet-500/20 to-indigo-500/20">
                                    <Sparkles className="w-5 h-5 text-violet-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">SEO Copilot</h3>
                                    <p className="text-xs text-slate-400">Real-time coaching</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsOpen(false)}
                                className="text-slate-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Content */}
                        <Tabs defaultValue="overview" className="h-[calc(100%-60px)]">
                            <TabsList className="w-full justify-start px-2 py-1 bg-transparent border-b border-white/5">
                                <TabsTrigger value="overview" className="text-xs">
                                    <Eye className="w-3 h-3 mr-1" />
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger value="section" className="text-xs">
                                    <Lightbulb className="w-3 h-3 mr-1" />
                                    Insights
                                </TabsTrigger>
                                <TabsTrigger value="opportunities" className="text-xs">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    Wins
                                </TabsTrigger>
                            </TabsList>

                            <ScrollArea className="h-[calc(100%-44px)]">
                                {/* Overview Tab */}
                                <TabsContent value="overview" className="p-4 space-y-4">
                                    {metricsLoading ? (
                                        <div className="flex items-center justify-center py-8">
                                            <Loader2 className="w-6 h-6 animate-spin text-violet-400" />
                                        </div>
                                    ) : pageMetrics ? (
                                        <>
                                            {/* SEO Score */}
                                            <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm text-slate-400">SEO Score</span>
                                                    <span className={`text-2xl font-bold ${getScoreColor(pageMetrics.priorityScore)}`}>
                                                        {Math.round(pageMetrics.priorityScore)}/100
                                                    </span>
                                                </div>
                                                <Progress value={pageMetrics.priorityScore} className="h-2" />
                                            </div>

                                            {/* Quick Stats */}
                                            <div className="grid grid-cols-2 gap-3">
                                                <StatBox
                                                    icon={<FileText className="w-4 h-4" />}
                                                    label="Words"
                                                    value={pageMetrics.wordCount}
                                                    status={pageMetrics.wordCount >= 800 ? 'good' : 'warning'}
                                                />
                                                <StatBox
                                                    icon={<Link2 className="w-4 h-4" />}
                                                    label="Int. Links"
                                                    value={pageMetrics.internalLinksOut}
                                                    status={pageMetrics.internalLinksOut >= 3 ? 'good' : 'warning'}
                                                />
                                                <StatBox
                                                    icon={<HelpCircle className="w-4 h-4" />}
                                                    label="FAQ"
                                                    value={pageMetrics.hasFaqBlock ? 'Yes' : 'No'}
                                                    status={pageMetrics.hasFaqBlock ? 'good' : 'warning'}
                                                />
                                                <StatBox
                                                    icon={<BarChart3 className="w-4 h-4" />}
                                                    label="H2s"
                                                    value={pageMetrics.h2Count}
                                                    status={pageMetrics.h2Count >= 2 ? 'good' : 'warning'}
                                                />
                                            </div>

                                            {/* Missing Criticals */}
                                            {(!pageMetrics.kwInTitle || !pageMetrics.kwInH1 || !pageMetrics.kwInMeta) && (
                                                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <AlertTriangle className="w-4 h-4 text-red-400" />
                                                        <span className="text-sm font-medium text-red-400">Critical Issues</span>
                                                    </div>
                                                    <ul className="space-y-1">
                                                        {!pageMetrics.kwInTitle && <li className="text-xs text-slate-400 flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Keyword not in Title</li>}
                                                        {!pageMetrics.kwInH1 && <li className="text-xs text-slate-400 flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Keyword not in H1</li>}
                                                        {!pageMetrics.kwInMeta && <li className="text-xs text-slate-400 flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Keyword not in Meta Desc</li>}
                                                    </ul>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="text-center py-8 text-slate-400">
                                            <p className="text-sm">No page selected.</p>
                                            <p className="text-xs mt-1">Open a page to see SEO insights.</p>
                                        </div>
                                    )}
                                </TabsContent>

                                {/* Insights Tab */}
                                <TabsContent value="section" className="p-4 space-y-3">
                                    <p className="text-xs text-slate-500 mb-3">
                                        Optimization suggestions:
                                    </p>
                                    {getSectionSuggestions().length > 0 ? (
                                        getSectionSuggestions().map((suggestion, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="p-3 rounded-lg bg-slate-800/50 border border-white/5"
                                            >
                                                <div className="flex items-start gap-2">
                                                    {suggestion.type === 'word_count' && <FileText className="w-4 h-4 text-violet-400 mt-0.5" />}
                                                    {suggestion.type === 'keyword' && <Target className="w-4 h-4 text-cyan-400 mt-0.5" />}
                                                    {suggestion.type === 'internal_link' && <Link2 className="w-4 h-4 text-emerald-400 mt-0.5" />}
                                                    {suggestion.type === 'faq' && <HelpCircle className="w-4 h-4 text-amber-400 mt-0.5" />}
                                                    <div className="flex-1">
                                                        <p className="text-sm text-slate-300">{suggestion.message}</p>
                                                        <Badge variant="outline" className={`mt-2 text-xs ${priorityColors[suggestion.priority]}`}>
                                                            {suggestion.priority}
                                                        </Badge>

                                                        {suggestion.action && (
                                                            <Button
                                                                size="sm"
                                                                variant="default"
                                                                className="mt-3 w-full bg-violet-600 hover:bg-violet-700 h-7 text-xs"
                                                                onClick={suggestion.action.handler}
                                                                disabled={suggestion.action.isLoading}
                                                            >
                                                                {suggestion.action.isLoading ? (
                                                                    <>
                                                                        <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                                                                        Generating...
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Sparkles className="w-3 h-3 mr-2" />
                                                                        {suggestion.action.label}
                                                                    </>
                                                                )}
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="text-center py-6 text-slate-400">
                                            <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
                                            <p className="text-sm">Looking good!</p>
                                            <p className="text-xs mt-1">No major issues found.</p>
                                        </div>
                                    )}
                                </TabsContent>

                                {/* Opportunities Tab */}
                                <TabsContent value="opportunities" className="p-4 space-y-3">
                                    <p className="text-xs text-slate-500 mb-3">
                                        Quick wins elsewhere on the site:
                                    </p>
                                    {opportunities.length > 0 ? (
                                        opportunities.slice(0, 5).map((opp, i) => (
                                            <motion.div
                                                key={opp.pageId}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="p-3 rounded-lg bg-slate-800/50 border border-white/5"
                                            >
                                                <div className="flex items-center justify-between mb-1">
                                                    <div className="truncate pr-2">
                                                        <span className="text-sm font-medium text-white truncate block">
                                                            {opp.page.title}
                                                        </span>
                                                    </div>
                                                    <Badge className="bg-violet-500/20 text-violet-400">{Math.round(opp.priorityScore)}</Badge>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                                    <span className="truncate">/{opp.page.slug}</span>
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="text-center py-6 text-slate-400">
                                            <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                                            <p className="text-sm">No quick wins found.</p>
                                            <p className="text-xs mt-1">Run SEO optimization to find gaps.</p>
                                        </div>
                                    )}
                                </TabsContent>
                            </ScrollArea>
                        </Tabs>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function StatBox({
    icon,
    label,
    value,
    status
}: {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    status: 'good' | 'warning'
}) {
    return (
        <div className="p-3 rounded-lg bg-slate-800/50 border border-white/5">
            <div className="flex items-center gap-2 mb-1">
                <span className={status === 'good' ? 'text-emerald-400' : 'text-amber-400'}>{icon}</span>
                <span className="text-xs text-slate-500">{label}</span>
            </div>
            <span className={`text-lg font-semibold ${status === 'good' ? 'text-white' : 'text-amber-400'}`}>
                {value}
            </span>
        </div>
    );
}
