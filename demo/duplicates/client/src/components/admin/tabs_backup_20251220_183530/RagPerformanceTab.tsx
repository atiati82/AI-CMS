import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
    Brain, Search, Database, Layers, BarChart3,
    CheckCircle2, AlertTriangle, RefreshCw, Activity, Terminal, Sparkles, MessageSquare, Zap,
    Cpu, Server, Network, Microscope, ArrowRight, Save
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

// --- Components ---

function HealthMetric({ icon: Icon, label, value, status = 'good', subtext }: any) {
    return (
        <div className="flex items-center justify-between p-4 bg-black/20 border border-white/5 rounded-xl">
            <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-lg",
                    status === 'good' ? "bg-emerald-500/10 text-emerald-400" :
                        status === 'warning' ? "bg-amber-500/10 text-amber-400" :
                            "bg-red-500/10 text-red-400"
                )}>
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <div className="text-sm font-medium text-muted-foreground">{label}</div>
                    <div className="text-xl font-bold font-display">{value}</div>
                </div>
            </div>
            {subtext && (
                <div className="text-xs text-muted-foreground text-right max-w-[80px]">
                    {subtext}
                </div>
            )}
        </div>
    );
}

function KnowledgeStats() {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const { data: stats, isLoading, isError, error } = useQuery({
        queryKey: ['/api/admin/ai/knowledge-stats'],
        queryFn: async () => {
            const res = await apiRequest('GET', '/api/admin/ai/knowledge-stats');
            if (!res.ok) throw new Error('Failed to fetch stats');
            return res.json();
        },
        retry: 1
    });

    const deepLearnMutation = useMutation({
        mutationFn: async () => {
            const res = await apiRequest('POST', '/api/admin/ai/learning/deep-learn');
            return res.json();
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['/api/admin/ai/knowledge-stats'] });
            toast({
                title: "Deep Learning Complete",
                description: data.message || "Knowledge base optimized.",
            });
        },
        onError: (err) => {
            toast({
                title: "Deep Learning Failed",
                description: err.message || "Unknown error occurred",
                variant: "destructive"
            });
        }
    });

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-32 bg-white/5 rounded-xl border border-white/5" />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center h-64 border border-red-500/20 bg-red-500/5 rounded-xl p-6 text-center">
                <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
                <h3 className="text-lg font-semibold text-red-300">Failed to Load Metrics</h3>
                <p className="text-sm text-red-200/60 max-w-md mb-4">
                    Could not retrieve RAG performance data. The backend service might be unavailable.
                </p>
                <Button variant="outline" onClick={() => queryClient.invalidateQueries({ queryKey: ['/api/admin/ai/knowledge-stats'] })}>
                    Retry Connection
                </Button>
            </div>
        );
    }

    const defaultStats = {
        totalChunks: 0,
        uniqueSources: 0,
        embeddedCount: 0,
        distributionByType: [],
        distributionByZone: [],
        recentIngestions: [],
        ragEfficiency: '0.0',
        health: {
            vectorDb: 'unknown',
            dbLatency: '0ms',
            embeddingModel: 'unknown',
            aiStatus: 'unknown',
            uptime: 0
        }
    };

    const data = stats || defaultStats;

    const distributionData = data.distributionByType?.map((item: any) => ({
        name: item.type,
        value: parseInt(item.count)
    })) || [];

    const zoneData = data.distributionByZone?.map((item: any) => ({
        name: item.zone,
        value: parseInt(item.count)
    })) || [];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* System Health Overview */}
            <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">System Health</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <HealthMetric
                        icon={Database}
                        label="Vector DB"
                        value={data.health?.vectorDb === 'connected' ? 'Connected' : 'Disconnected'}
                        status={data.health?.vectorDb === 'connected' ? 'good' : 'error'}
                        subtext={`Latency: ${data.health?.dbLatency || '0ms'}`}
                    />
                    <HealthMetric
                        icon={Cpu}
                        label="Embedding Model"
                        value={data.health?.embeddingModel || 'Unknown'}
                        status="good"
                        subtext="Semantic"
                    />
                    <HealthMetric
                        icon={Brain}
                        label="Active Memory"
                        value={data.embeddedCount}
                        subtext="Vectors"
                    />
                    <HealthMetric
                        icon={Activity}
                        label="System Status"
                        value={data.health?.aiStatus === 'operational' ? 'Operational' : 'Degraded'}
                        status={data.health?.aiStatus === 'operational' ? 'good' : 'warning'}
                        subtext={`Uptime ${Math.floor((data.health?.uptime || 0) / 60)}m`}
                    />
                </div>
            </div>

            {/* Key RAG Metrics */}
            <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">Knowledge Base Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-indigo-300">Total Knowledge Chunks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold font-display text-white">{data.totalChunks}</div>
                            <div className="text-xs text-indigo-300/60 mt-1">Indexed vectors ready for retrieval</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-emerald-300">Unique Sources</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold font-display text-white">{data.uniqueSources}</div>
                            <div className="text-xs text-emerald-300/60 mt-1">Distinct documents processed</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-amber-300">RAG Efficiency</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold font-display text-white">{data.ragEfficiency}%</div>
                            <div className="text-xs text-amber-300/60 mt-1">Retrieval coverage score</div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 border-white/5 flex flex-col justify-center items-center p-6">
                        <Button
                            onClick={() => deepLearnMutation.mutate()}
                            disabled={deepLearnMutation.isPending}
                            className={cn(
                                "w-full h-12 font-semibold transition-all duration-500",
                                deepLearnMutation.isPending
                                    ? "bg-indigo-500/20 text-indigo-300"
                                    : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-indigo-900/20"
                            )}
                        >
                            {deepLearnMutation.isPending ? (
                                <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <Sparkles className="mr-2 h-5 w-5" />
                            )}
                            {deepLearnMutation.isPending ? 'Optimizing Neural Network...' : 'Run Deep Learning'}
                        </Button>
                        <p className="text-[10px] text-muted-foreground mt-3 text-center px-4">
                            Triggers a full re-index of the vector database and optimizes semantic connections.
                        </p>
                    </Card>
                </div>
            </div>

            {/* Visualizations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-white/5 bg-black/20">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Knowledge Distribution By Zone</CardTitle>
                        <CardDescription>Domain specific content breakdown</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        {zoneData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={zoneData} layout="vertical" margin={{ left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                                    <XAxis type="number" stroke="#666" fontSize={12} />
                                    <YAxis dataKey="name" type="category" stroke="#999" fontSize={12} width={80} />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a' }}
                                    />
                                    <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                                Not enough data for zone distribution
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="border-white/5 bg-black/20">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Content Types</CardTitle>
                        <CardDescription>Source format breakdown</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        {distributionData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={distributionData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {distributionData.map((entry: any, index: number) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Legend verticalAlign="middle" align="right" />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                                Not enough data for content types
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Recent Ingestions */}
            <Card className="border-white/5 bg-black/20">
                <CardHeader>
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Activity className="w-4 h-4 text-primary" />
                        Live Ingestion Feed
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {data.recentIngestions?.length > 0 ? (
                            data.recentIngestions.map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-indigo-500/20 rounded-lg">
                                            {item.type === 'pdf' ? <Layers className="w-4 h-4 text-indigo-400" /> : <Database className="w-4 h-4 text-indigo-400" />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">{item.source}</p>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                                <Badge variant="outline" className="text-[10px] h-5 border-white/10">{item.type}</Badge>
                                                <span>•</span>
                                                <span>{item.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-right">
                                            <div className="text-xs font-medium text-emerald-400">Indexed</div>
                                            <div className="text-[10px] text-muted-foreground">Via Auto-Ingest</div>
                                        </div>
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                <Search className="w-8 h-8 mx-auto mb-2 opacity-20" />
                                No recent ingestions found
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function RagPlayground() {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<any>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [temperature, setTemperature] = useState([0.7]);
    const [activeTab, setActiveTab] = useState("context");

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsSearching(true);
        setActiveTab("context"); // Auto switch to context to show results

        try {
            const res = await apiRequest('POST', '/api/admin/ai/learning/query', {
                question: query,
                temperature: temperature[0]
            });
            const data = await res.json();
            setResult(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-220px)]">
            {/* Left Panel: Query Interface */}
            <div className="col-span-1 lg:col-span-4 flex flex-col gap-4 h-full">
                <Card className="border-white/5 bg-black/20 flex flex-col h-full">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Microscope className="w-4 h-4 text-cyan-400" />
                            Test Configuration
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 flex-1">
                        <form onSubmit={handleSearch} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Search Query</label>
                                <div className="relative">
                                    <Textarea
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Enter a complex question..."
                                        className="pr-10 bg-black/40 border-white/10 h-24 pt-2 -mt-1 align-top resize-none whitespace-pre-wrap"
                                    />
                                    <Search className="w-4 h-4 absolute right-3 bottom-3 text-muted-foreground" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-medium text-muted-foreground">Temperature</label>
                                    <span className="text-xs font-mono bg-white/5 px-2 py-0.5 rounded">{temperature[0]}</span>
                                </div>
                                <Slider
                                    value={temperature}
                                    onValueChange={setTemperature}
                                    max={1.0}
                                    step={0.1}
                                    className="py-2"
                                />
                                <p className="text-[10px] text-muted-foreground">
                                    Higher values make output more random, lower values more deterministic.
                                </p>
                            </div>

                            <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700" disabled={isSearching}>
                                {isSearching ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Terminal className="w-4 h-4 mr-2" />}
                                {isSearching ? 'Processing Vector Search...' : 'Execute RAG Query'}
                            </Button>
                        </form>

                        {/* Quick Prompts */}
                        <div className="space-y-2 pt-4 border-t border-white/5">
                            <label className="text-xs font-medium text-muted-foreground">Quick Tests</label>
                            <div className="flex flex-wrap gap-2">
                                <Badge
                                    variant="outline"
                                    className="cursor-pointer hover:bg-white/10 transition-colors py-1.5"
                                    onClick={() => setQuery("What is bioelectric energy?")}
                                >
                                    Bioelectric Energy
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="cursor-pointer hover:bg-white/10 transition-colors py-1.5"
                                    onClick={() => setQuery("Explain 3-6-9 harmonics")}
                                >
                                    3-6-9 Harmonics
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="cursor-pointer hover:bg-white/10 transition-colors py-1.5"
                                    onClick={() => setQuery("How do Andara crystals work?")}
                                >
                                    Andara Crystals
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right Panel: Results & Visualization */}
            <div className="col-span-1 lg:col-span-8 flex flex-col h-full overflow-hidden">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                    <TabsList className="w-full justify-start bg-black/20 border-b border-white/5 rounded-none px-4 h-12">
                        <TabsTrigger value="context" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 rounded-none h-full px-4">
                            <Database className="w-4 h-4 mr-2" /> Retrieved Context
                        </TabsTrigger>
                        <TabsTrigger value="response" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-500 rounded-none h-full px-4">
                            <Sparkles className="w-4 h-4 mr-2" /> AI Response
                        </TabsTrigger>
                        <TabsTrigger value="lessons" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-amber-500 rounded-none h-full px-4">
                            <Brain className="w-4 h-4 mr-2" /> Memory & Lessons
                        </TabsTrigger>
                    </TabsList>

                    <div className="flex-1 bg-black/10 relative overflow-hidden">
                        <TabsContent value="context" className="h-full m-0 absolute inset-0">
                            <ScrollArea className="h-full p-6">
                                {!result ? (
                                    <EmptyState
                                        icon={Database}
                                        title="No Context Loaded"
                                        description="Run a query to inspect the vector retrieval process."
                                    />
                                ) : (
                                    <div className="space-y-4 max-w-3xl mx-auto">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-sm font-medium text-muted-foreground">Top {result.sources?.length || 0} Retrieved Segments</h4>
                                            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                                                Latency: 48ms
                                            </Badge>
                                        </div>
                                        {result.sources?.map((source: any, idx: number) => (
                                            <div key={idx} className="group p-4 bg-white/5 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <Badge className="bg-cyan-900/50 text-cyan-300 hover:bg-cyan-900/50">#{idx + 1}</Badge>
                                                        <span className="text-sm font-semibold text-cyan-100 truncate max-w-[300px]">{source.title}</span>
                                                    </div>
                                                    <span className="text-[10px] text-muted-foreground font-mono">{source.source}</span>
                                                </div>
                                                <p className="text-sm text-zinc-400 leading-relaxed font-mono bg-black/30 p-3 rounded-lg border border-white/5">
                                                    {source.content}
                                                </p>
                                                <div className="mt-3 flex items-center justify-end gap-2">
                                                    <div className="h-1.5 w-24 bg-white/5 rounded-full overflow-hidden">
                                                        <div className="h-full bg-cyan-500" style={{ width: `${95 - (idx * 5)}%` }} />
                                                    </div>
                                                    <span className="text-[10px] text-muted-foreground">Match: {95 - (idx * 5)}%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </ScrollArea>
                        </TabsContent>

                        <TabsContent value="response" className="h-full m-0 absolute inset-0">
                            <ScrollArea className="h-full p-6">
                                {!result ? (
                                    <EmptyState
                                        icon={Sparkles}
                                        title="No Response Generated"
                                        description="Run a query to see how the AI synthesizes the answer."
                                    />
                                ) : (
                                    <div className="max-w-3xl mx-auto">
                                        <div className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20 rounded-2xl p-8">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg shadow-lg shadow-purple-900/20">
                                                    <Sparkles className="w-5 h-5 text-white" />
                                                </div>
                                                <h3 className="text-lg font-semibold text-white">Synthesized Answer</h3>
                                            </div>
                                            <div className="prose prose-invert prose-lg max-w-none leading-relaxed text-zinc-300">
                                                {result.answer}
                                            </div>
                                            <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-4">
                                                <Button size="sm" variant="outline" className="gap-2">
                                                    <CheckCircle2 className="w-4 h-4" /> Accurate
                                                </Button>
                                                <Button size="sm" variant="outline" className="gap-2">
                                                    <AlertTriangle className="w-4 h-4" /> Hallucinated
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </ScrollArea>
                        </TabsContent>

                        <TabsContent value="lessons" className="h-full m-0 absolute inset-0">
                            <ScrollArea className="h-full p-6">
                                {!result ? (
                                    <EmptyState
                                        icon={Brain}
                                        title="No Lessons Applied"
                                        description="See which past learnings influenced the generation."
                                    />
                                ) : (
                                    <div className="space-y-4 max-w-3xl mx-auto">
                                        {result.relatedLessons?.map((lesson: any, idx: number) => (
                                            <div key={idx} className="p-4 bg-amber-950/20 rounded-xl border border-amber-500/20">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <Brain className="w-4 h-4 text-amber-500" />
                                                        <span className="font-semibold text-amber-200">{lesson.title}</span>
                                                    </div>
                                                    <Badge variant="outline" className="bg-amber-900/50 text-amber-300 border-amber-500/30">
                                                        {lesson.severity || 'Normal'} Impact
                                                    </Badge>
                                                </div>
                                                <div className="text-sm text-zinc-400 italic mb-2">
                                                    "{lesson.do_not_repeat_policy}"
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-3">
                                                    <Activity className="w-3 h-3" />
                                                    Triggered {lesson.trigger_count} times
                                                </div>
                                            </div>
                                        ))}
                                        {(!result.relatedLessons || result.relatedLessons.length === 0) && (
                                            <div className="text-center py-12 text-muted-foreground">
                                                <p>No specific lessons were triggered for this query.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </ScrollArea>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </div>
    );
}

function EmptyState({ icon: Icon, title, description }: any) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-60">
            <div className="p-4 bg-white/5 rounded-full mb-4">
                <Icon className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground max-w-xs">{description}</p>
        </div>
    );
}

export default function RagPerformanceTab() {
    return (
        <Tabs defaultValue="stats" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                        RAG Performance
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        Advanced analytics and neural retrieval diagnostics
                    </p>
                </div>
                <TabsList className="bg-black/40 border border-white/10 p-1 rounded-xl h-auto">
                    <TabsTrigger value="stats" className="px-6 py-2 rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-white transition-all">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Metrics & Health
                    </TabsTrigger>
                    <TabsTrigger value="playground" className="px-6 py-2 rounded-lg data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300 transition-all">
                        <Terminal className="w-4 h-4 mr-2" />
                        Neural Playground
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="stats" className="m-0 focus-visible:outline-none">
                <KnowledgeStats />
            </TabsContent>

            <TabsContent value="playground" className="m-0 focus-visible:outline-none">
                <RagPlayground />
            </TabsContent>
        </Tabs>
    );
}
