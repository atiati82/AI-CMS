import React, { useState } from 'react';
import { Search, Code, Cpu, Database, Zap, Settings, Book, ChevronRight, Play, Loader2, X, Terminal, CheckCircle2, AlertCircle, Brain } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { AuditHighlight } from '@/components/admin/audit-highlight';

interface FunctionInfo {
    name: string;
    service: string;
    description: string;
    params: string;
    returns: string;
    defaultArgs?: string; // JSON string of default args
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
    const [selectedFunction, setSelectedFunction] = useState<FunctionInfo | null>(null);
    const [isExecutorOpen, setIsExecutorOpen] = useState(false);
    const [executionArgs, setExecutionArgs] = useState('{}');
    const [executionResult, setExecutionResult] = useState<string | null>(null);
    const [isExecuting, setIsExecuting] = useState(false);

    // Agent Sandbox State
    const [mode, setMode] = useState<'functions' | 'agent'>('functions');
    const [agentGoal, setAgentGoal] = useState('');
    const [isExecutingAgent, setIsExecutingAgent] = useState(false);
    const [agentLog, setAgentLog] = useState<any[]>([]);

    const { toast } = useToast();

    // Augmented definitions with default args where useful
    const sections: Section[] = [
        {
            id: 'bigmind-cms',
            title: 'BigMind CMS Functions',
            icon: Cpu,
            color: 'from-purple-500 to-purple-700',
            functions: [
                { name: 'listPages', service: 'bigmind-cms.ts', description: 'Get summary of all pages with optional filtering.', params: 'cluster?, status?, limit?', returns: 'Promise<PageSummary[]>', defaultArgs: '{\n  "limit": 5\n}' },
                { name: 'searchPages', service: 'bigmind-cms.ts', description: 'Search pages by query text.', params: 'query, cluster?, limit?', returns: 'Promise<SearchResult[]>', defaultArgs: '{\n  "query": "water"\n}' },
                { name: 'getPage', service: 'bigmind-cms.ts', description: 'Get full page details by ID or path.', params: 'pageId | path', returns: 'Promise<Page>' },
                { name: 'createPage', service: 'bigmind-cms.ts', description: 'Create new page.', params: 'title, path, clusterKey, ...', returns: 'Promise<CreateResult>' },
                { name: 'updatePage', service: 'bigmind-cms.ts', description: 'Update existing page.', params: 'pageId, updates', returns: 'Promise<UpdateResult>' },
                { name: 'deletePage', service: 'bigmind-cms.ts', description: 'Permanently delete a page.', params: 'pageId', returns: 'Promise<DeleteResult>' },
                { name: 'listClusters', service: 'bigmind-cms.ts', description: 'Get all content clusters.', params: 'none', returns: 'Promise<ClusterStats[]>', defaultArgs: '{}' },
                { name: 'getSiteStats', service: 'bigmind-cms.ts', description: 'Get site-wide statistics.', params: 'none', returns: 'Promise<SiteStats>', defaultArgs: '{}' },
                { name: 'searchDocuments', service: 'bigmind-cms.ts', description: 'Search document library.', params: 'query, sourceType?, limit?', returns: 'Promise<Document[]>', defaultArgs: '{\n  "query": "minerals"\n}' },
                { name: 'searchKnowledge', service: 'bigmind-cms.ts', description: 'Search RAG knowledge base.', params: 'query, limit?', returns: 'Promise<KnowledgeResult[]>', defaultArgs: '{\n  "query": "what is ionic water?"\n}' },
            ]
        },
        {
            id: 'visual-motion',
            title: 'Visual & Motion Functions',
            icon: Zap,
            color: 'from-green-500 to-green-700',
            functions: [
                { name: 'listMotionArchetypes', service: 'bigmind-cms.ts', description: 'List all motion archetypes.', params: 'none', returns: 'MotionArchetype[]', defaultArgs: '{}' },
                { name: 'applyMotionPreset', service: 'bigmind-cms.ts', description: 'Apply motion archetype to page elements.', params: 'pageId, motionArchetype, targetElements[]', returns: 'Promise<ApplyResult>' },
                { name: 'updateVisualConfig', service: 'bigmind-cms.ts', description: 'Update page visual configuration.', params: 'pageId, vibeKeywords?, ...', returns: 'Promise<UpdateResult>' },
                { name: 'applyStyleToPages', service: 'bigmind-cms.ts', description: 'Apply visual style to multiple pages.', params: 'pageIds[] | clusterKey, ...', returns: 'Promise<BulkResult>' },
                { name: 'getPageVisualConfig', service: 'bigmind-cms.ts', description: 'Get current visual configuration.', params: 'pageId', returns: 'Promise<VisualConfig>' },
            ]
        },
        {
            id: 'advanced-cms',
            title: 'Advanced CMS Functions',
            icon: Settings,
            color: 'from-orange-500 to-orange-700',
            functions: [
                { name: 'duplicatePage', service: 'bigmind-cms.ts', description: 'Create a copy of an existing page.', params: 'pageId, newTitle, newPath', returns: 'Promise<Page>' },
                { name: 'archivePage', service: 'bigmind-cms.ts', description: 'Archive a page.', params: 'pageId, reason?', returns: 'Promise<ArchiveResult>' },
                { name: 'restorePage', service: 'bigmind-cms.ts', description: 'Restore an archived page.', params: 'pageId', returns: 'Promise<RestoreResult>' },
                { name: 'bulkUpdatePages', service: 'bigmind-cms.ts', description: 'Update multiple pages at once.', params: 'pageIds[], updates', returns: 'Promise<BulkResult>' },
                { name: 'schedulePublish', service: 'bigmind-cms.ts', description: 'Schedule a page publish.', params: 'pageId, publishAt', returns: 'Promise<ScheduleResult>' },
            ]
        },
        {
            id: 'seo-functions',
            title: 'SEO & Analysis Functions',
            icon: Book,
            color: 'from-blue-500 to-blue-700',
            functions: [
                { name: 'analyzeReadability', service: 'bigmind-cms.ts', description: 'Analyze content readability.', params: 'pageId', returns: 'Promise<ReadabilityResult>' },
                { name: 'generateMetaDescription', service: 'bigmind-cms.ts', description: 'AI-generate meta description.', params: 'pageId, focusKeyword?', returns: 'Promise<MetaResult>' },
                { name: 'suggestInternalLinks', service: 'bigmind-cms.ts', description: 'Get linking suggestions.', params: 'pageId', returns: 'Promise<LinkSuggestions>' },
                { name: 'findContentGaps', service: 'bigmind-cms.ts', description: 'Identify missing pages.', params: 'cluster?', returns: 'Promise<ContentGaps>' },
                { name: 'getSeoRecommendations', service: 'bigmind-cms.ts', description: 'Get daily SEO recommendations.', params: 'limit?', returns: 'Promise<Recommendation[]>', defaultArgs: '{\n  "limit": 5\n}' },
            ]
        },
        {
            id: 'ab-testing',
            title: 'A/B Testing Functions',
            icon: Code,
            color: 'from-pink-500 to-pink-700',
            functions: [
                { name: 'createVariant', service: 'bigmind-cms.ts', description: 'Create an A/B test variant.', params: 'pageId, variantName', returns: 'Promise<Variant>' },
                { name: 'listVariants', service: 'bigmind-cms.ts', description: 'List variants for a page.', params: 'pageId', returns: 'Promise<Variant[]>' },
                { name: 'getVariantPerformance', service: 'bigmind-cms.ts', description: 'Get variant performance metrics.', params: 'pageId', returns: 'Promise<PerformanceData>' },
                { name: 'promoteWinningVariant', service: 'bigmind-cms.ts', description: 'Promote winning variant.', params: 'pageId, winningVariantId', returns: 'Promise<PromoteResult>' },
                { name: 'endABTest', service: 'bigmind-cms.ts', description: 'End an A/B test.', params: 'pageId, keepVariants?', returns: 'Promise<EndResult>' },
            ]
        },
        {
            id: 'image-functions',
            title: 'Image & Vision Functions',
            icon: Database,
            color: 'from-indigo-500 to-indigo-700',
            functions: [
                { name: 'analyzeImage', service: 'bigmind-cms.ts', description: 'Analyze image using AI vision.', params: 'imageUrl, purpose?', returns: 'Promise<ImageAnalysis>' },
                { name: 'generateAltText', service: 'bigmind-cms.ts', description: 'Generate alt text.', params: 'imageUrl, pageContext?', returns: 'Promise<string>' },
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

    const handleOpenExecutor = (func: FunctionInfo) => {
        setSelectedFunction(func);
        setExecutionArgs(func.defaultArgs || '{\n\n}');
        setExecutionResult(null);
        setIsExecutorOpen(true);
    };

    const handleExecute = async () => {
        if (!selectedFunction) return;

        setIsExecuting(true);
        setExecutionResult(null);

        try {
            let args = {};
            try {
                // Allow simple JSON without strict quoting for convenience, but fallback to strict
                const cleanJson = executionArgs.trim() || '{}';
                args = JSON.parse(cleanJson);
            } catch (jsonError) {
                toast({
                    title: "Invalid JSON Arguments",
                    description: "Please check your JSON syntax.",
                    variant: "destructive"
                });
                setIsExecuting(false);
                return;
            }

            const res = await apiRequest('POST', '/api/admin/functions/execute', {
                name: selectedFunction.name,
                args: args
            });

            const data = await res.json();

            if (data.success) {
                setExecutionResult(JSON.stringify(data.result, null, 2));
                toast({ title: "Function Executed Successfully" });
            } else {
                setExecutionResult(JSON.stringify(data, null, 2));
                toast({
                    title: "Execution Failed",
                    description: data.error || "Unknown error",
                    variant: "destructive"
                });
            }
        } catch (error: any) {
            setExecutionResult(JSON.stringify({ error: error.message, details: error }, null, 2));
            toast({
                title: "System Error",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setIsExecuting(false);
        }
    };

    const handleRunAgent = async () => {
        if (!agentGoal.trim()) return;

        setIsExecutingAgent(true);
        setAgentLog([]); // Clear previous log

        try {
            const res = await apiRequest('POST', '/api/ai/agents/execute', {
                agentName: 'sandbox',
                task: {
                    type: 'chat', // Using 'chat' type which Orchestrator delegates, or direct execution
                    input: { goal: agentGoal }
                }
            });

            const data = await res.json();

            if (data.ok && data.result) {
                // If the backend returns a full log in output, we use it
                // Based on SandboxAgent impl, result.output.log is the execution log
                if (data.result.output && data.result.output.log) {
                    setAgentLog(data.result.output.log);
                } else if (data.result.error) {
                    setAgentLog([{ type: 'error', content: data.result.error }]);
                } else {
                    setAgentLog([{ type: 'done', content: 'Agent finished execution.' }]);
                }

                toast({ title: "Agent Simulation Complete" });
            } else {
                setAgentLog([{ type: 'error', content: data.error || "Unknown error" }]);
                toast({
                    title: "Agent Execution Failed",
                    description: data.error,
                    variant: "destructive"
                });
            }
        } catch (error: any) {
            setAgentLog([{ type: 'error', content: error.message }]);
            toast({
                title: "System Error",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setIsExecutingAgent(false);
        }
    };

    return (
        <div className="space-y-6" data-testid="functions-tab">
            {/* Mode Toggle */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold">System Functions</h2>
                    <p className="text-muted-foreground">Interactive catalog of BigMind CMS backend capabilities</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex p-1 bg-muted rounded-lg border border-border">
                        <Button
                            variant={mode === 'functions' ? 'secondary' : 'ghost'}
                            size="sm"
                            onClick={() => setMode('functions')}
                            className="text-xs"
                        >
                            <Code className="w-4 h-4 mr-2" />
                            Function Tester
                        </Button>
                        <Button
                            variant={mode === 'agent' ? 'secondary' : 'ghost'}
                            size="sm"
                            onClick={() => setMode('agent')}
                            className="text-xs"
                        >
                            <Brain className="w-4 h-4 mr-2" />
                            Agent Sandbox
                        </Button>
                    </div>
                </div>
            </div>

            {mode === 'agent' ? (
                <AuditHighlight reason="Agent Sandbox is experimental. Verification recommended." confidence="low">
                    <div className="flex flex-col h-[calc(100vh-250px)] gap-4">
                        <div className="flex-1 bg-slate-950 rounded-lg border border-border overflow-hidden flex flex-col">
                            <div className="p-3 border-b border-border bg-slate-900/50 flex justify-between items-center">
                                <span className="text-xs font-mono text-muted-foreground">Sandbox Agent Logs</span>
                                {isExecutingAgent && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
                            </div>
                            <ScrollArea className="flex-1 p-4">
                                <div className="space-y-4 font-mono text-xs">
                                    {agentLog.length === 0 && (
                                        <div className="text-center text-muted-foreground py-12">
                                            <Brain className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                            <p>Enter a goal below to start the agent simulation.</p>
                                            <p className="opacity-50 mt-1">Example: "Find all empty clusters and tell me their names"</p>
                                        </div>
                                    )}
                                    {agentLog.map((entry, idx) => (
                                        <div key={idx} className={`border-l-2 pl-3 py-1 ${entry.type === 'thought' ? 'border-blue-500/30 text-blue-400' :
                                            entry.type === 'call' ? 'border-yellow-500/30 text-yellow-400' :
                                                entry.type === 'result' ? 'border-green-500/30 text-green-400' :
                                                    entry.type === 'answer' ? 'border-purple-500 bg-purple-500/5 p-2 rounded-r-lg text-purple-100' :
                                                        'border-red-500 text-red-400'
                                            }`}>
                                            <div className="opacity-50 text-[10px] uppercase mb-1">{entry.type}</div>
                                            <div className="whitespace-pre-wrap">
                                                {typeof entry.content === 'object' || entry.args
                                                    ? JSON.stringify(entry.content || { tool: entry.tool, args: entry.args }, null, 2)
                                                    : entry.content
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>

                        <div className="flex gap-2">
                            <Textarea
                                value={agentGoal}
                                onChange={(e) => setAgentGoal(e.target.value)}
                                placeholder="Enter a goal for the agent (e.g., 'Audit all pages in water_science cluster')"
                                className="bg-card font-mono text-sm"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleRunAgent();
                                    }
                                }}
                            />
                            <Button
                                className="h-auto w-32"
                                onClick={handleRunAgent}
                                disabled={isExecutingAgent || !agentGoal.trim()}
                            >
                                {isExecutingAgent ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
                                Execute
                            </Button>
                        </div>
                    </div>
                </AuditHighlight>
            ) : (
                <>
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            <Badge variant="outline" className="text-primary border-primary">
                                {totalFunctions} Functions
                            </Badge>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search functions..."
                            className="pl-9"
                            data-testid="input-search-functions"
                        />
                    </div>

                    {/* Function List */}

                    <ScrollArea className="h-[calc(100vh-250px)]">
                        <div className="space-y-8 pr-4 pb-20">
                            {filteredSections.map((section) => {
                                const Icon = section.icon;
                                return (
                                    <div key={section.id} className="space-y-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className={`p-1.5 rounded-md bg-gradient-to-br ${section.color}`}>
                                                <Icon className="w-4 h-4 text-white" />
                                            </div>
                                            <h3 className="font-semibold text-sm">{section.title}</h3>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {section.functions.map((fn, idx) => (
                                                <div
                                                    key={idx}
                                                    className="group flex flex-col justify-between bg-card border border-border rounded-lg p-3 hover:border-primary/40 transition-all hover:shadow-sm"
                                                >
                                                    <div>
                                                        <div className="flex items-center justify-between mb-1">
                                                            <code className="text-sm font-bold text-primary">
                                                                {fn.name}
                                                            </code>
                                                        </div>
                                                        <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2.5em] mb-3">
                                                            {fn.description}
                                                        </p>

                                                        <div className="space-y-1 mb-4">
                                                            <div className="flex gap-2 text-[10px]">
                                                                <span className="text-muted-foreground font-mono">Params:</span>
                                                                <span className="font-mono text-blue-600 truncate">{fn.params}</span>
                                                            </div>
                                                            <div className="flex gap-2 text-[10px]">
                                                                <span className="text-muted-foreground font-mono">Return:</span>
                                                                <span className="font-mono text-green-600 truncate">{fn.returns}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="w-full h-8 bg-muted/30 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
                                                        onClick={() => handleOpenExecutor(fn)}
                                                    >
                                                        <Play className="w-3 h-3 mr-2" />
                                                        Test Function
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollArea>
                </>
            )}

            {/* Execution Modal */}
            <Dialog open={isExecutorOpen} onOpenChange={setIsExecutorOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Terminal className="w-5 h-5 text-primary" />
                            Execute: {selectedFunction?.name}
                        </DialogTitle>
                        <DialogDescription>
                            {selectedFunction?.description}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto py-2 space-y-4">
                        <div className="space-y-2">
                            <Label>Arguments (JSON)</Label>
                            <Textarea
                                value={executionArgs}
                                onChange={(e) => setExecutionArgs(e.target.value)}
                                className="font-mono text-xs h-[150px]"
                                placeholder="{}"
                            />
                            <p className="text-[10px] text-muted-foreground">
                                Enter parameters as a valid JSON object.
                            </p>
                        </div>

                        {executionResult && (
                            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <Label className="flex items-center gap-2">
                                    Result
                                    <Badge variant="outline" className="text-[10px] font-normal">JSON</Badge>
                                </Label>
                                <div className="bg-slate-950 text-slate-50 p-3 rounded-md overflow-x-auto border border-slate-800">
                                    <pre className="text-xs font-mono">{executionResult}</pre>
                                </div>
                            </div>
                        )}
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="ghost" onClick={() => setIsExecutorOpen(false)}>
                            Close
                        </Button>
                        <Button onClick={handleExecute} disabled={isExecuting}>
                            {isExecuting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Running...
                                </>
                            ) : (
                                <>
                                    <Play className="w-4 h-4 mr-2" />
                                    Run Function
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
