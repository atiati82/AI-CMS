
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Brain, Search, Trash2, Zap, LayoutTemplate, MessageSquare,
    CheckCircle2, AlertTriangle, Filter, RefreshCw, Activity, Terminal, Clock, ChevronRight, FileText, History
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

type Memory = {
    lesson_id: string;
    title: string;
    root_cause: any;
    fix_steps: any;
    prevention_rule: any;
    do_not_repeat_policy: string;
    tags: string[];
    severity: string;
    context: any;
    confidence: number;
    trigger_count: number;
    created_at: string;
    last_triggered: string;
};

type AgentRun = {
    run_id: string;
    agent_name: string;
    start_time: string;
    end_time: string;
    steps: number;
};

type AgentLog = {
    id: string;
    run_id: string;
    agent_name: string;
    action_type: 'thinking' | 'tool_use' | 'function_call' | 'response' | 'error';
    content: string;
    metadata: any;
    created_at: string;
};

function MemoryBank() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'all' | 'design' | 'code' | 'pref'>('all');

    // Fetch Memories
    const { data, isLoading } = useQuery<{ ok: boolean; memories: Memory[] }>({
        queryKey: ['/api/ai/audit/memory'],
        queryFn: async () => {
            const res = await apiRequest('GET', '/api/ai/audit/memory');
            return res.json();
        }
    });

    // Delete Memory
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            await apiRequest('DELETE', `/api/ai/audit/memory/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/ai/audit/memory'] });
            toast({ title: "Memory Deleted", description: "The AI has forgotten this lesson." });
        }
    });

    const memories = data?.memories || [];

    // Filter logic
    const filteredMemories = memories.filter(m => {
        const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.do_not_repeat_policy.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all'
            ? true
            : filter === 'design' ? (m.tags.includes('design') || m.tags.includes('visual-style'))
                : filter === 'code' ? (m.tags.includes('code') || m.tags.includes('fix'))
                    : (m.tags.includes('preference') || m.tags.includes('user-learning'));

        return matchesSearch && matchesFilter;
    });

    // Stats
    const stats = {
        total: memories.length,
        design: memories.filter(m => m.tags.includes('visual-style')).length,
        patterns: memories.filter(m => m.tags.includes('user-pattern')).length,
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-48 glass-panel animate-pulse opacity-50" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header / Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-6 flex items-center justify-between relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                    <div className="relative z-10">
                        <p className="text-xs font-medium text-primary/80 uppercase tracking-widest mb-1">Total Lessons</p>
                        <h3 className="text-4xl font-display font-bold text-gradient-primary">{stats.total}</h3>
                    </div>
                    <Brain className="w-12 h-12 text-primary/30 relative z-10" />
                </div>

                <div className="glass-panel p-6 flex items-center justify-between relative overflow-hidden group">
                    <div className="absolute inset-0 bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors" />
                    <div className="relative z-10">
                        <p className="text-xs font-medium text-purple-400/80 uppercase tracking-widest mb-1">Design Preferences</p>
                        <h3 className="text-4xl font-display font-bold text-gradient-purple">{stats.design}</h3>
                    </div>
                    <LayoutTemplate className="w-12 h-12 text-purple-500/20 relative z-10" />
                </div>

                <div className="glass-panel p-6 flex items-center justify-between relative overflow-hidden group">
                    <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors" />
                    <div className="relative z-10">
                        <p className="text-xs font-medium text-cyan-400/80 uppercase tracking-widest mb-1">Patterns</p>
                        <h3 className="text-4xl font-display font-bold text-gradient-cyan">{stats.patterns}</h3>
                    </div>
                    <MessageSquare className="w-12 h-12 text-cyan-500/20 relative z-10" />
                </div>
            </div>

            {/* Controls */}
            <div className="glass-panel p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search memory bank..."
                        className="pl-9 bg-black/20 border-white/10 focus:border-cyan-500/50 transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={filter === 'all' ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setFilter('all')}
                        className={filter === 'all' ? "bg-white/10 hover:bg-white/20" : "hover:bg-white/5"}
                    >
                        All
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFilter('design')}
                        className={cn(
                            "transition-all",
                            filter === 'design'
                                ? "bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/20"
                                : "hover:bg-purple-500/10 hover:text-purple-300"
                        )}
                    >
                        Design
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFilter('code')}
                        className={cn(
                            "transition-all",
                            filter === 'code'
                                ? "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border border-blue-500/20"
                                : "hover:bg-blue-500/10 hover:text-blue-300"
                        )}
                    >
                        Code
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFilter('pref')}
                        className={cn(
                            "transition-all",
                            filter === 'pref'
                                ? "bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/20"
                                : "hover:bg-cyan-500/10 hover:text-cyan-300"
                        )}
                    >
                        Preferences
                    </Button>
                </div>
            </div>

            {/* Memory Grid */}
            <ScrollArea className="h-[calc(100vh-400px)] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                    {filteredMemories.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center p-12 text-muted-foreground opacity-50 glass-panel border-dashed">
                            <Brain className="w-16 h-16 mb-4 opacity-50" />
                            <p className="text-lg">No matching memories found.</p>
                        </div>
                    ) : (
                        filteredMemories.map((mem) => {
                            const context = typeof mem.context === 'string' ? JSON.parse(mem.context) : mem.context;
                            const isDesign = mem.tags.includes('visual-style');
                            const isFix = mem.tags.includes('fix');
                            // const isPref = mem.tags.includes('preference'); // Not used in simplified example

                            return (
                                <div
                                    key={mem.lesson_id}
                                    className={cn(
                                        "crystal-card group relative flex flex-col p-5 transition-all hover:scale-[1.01]",
                                        isDesign ? "shadow-[0_0_30px_-15px_rgba(168,85,247,0.2)] border-purple-500/20" :
                                            isFix ? "shadow-[0_0_30px_-15px_rgba(239,68,68,0.2)] border-red-500/20" :
                                                "shadow-[0_0_30px_-15px_rgba(6,182,212,0.2)] border-cyan-500/20"
                                    )}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <Badge
                                            variant="outline"
                                            className={cn(
                                                "capitalize bg-black/40 backdrop-blur-md",
                                                isDesign ? "border-purple-500/50 text-purple-300" :
                                                    isFix ? "border-red-500/50 text-red-300" :
                                                        "border-cyan-500/50 text-cyan-300"
                                            )}
                                        >
                                            {isDesign ? 'Design' : isFix ? 'Fix' : 'Pattern'}
                                        </Badge>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-all text-muted-foreground hover:text-red-400 hover:bg-red-500/10"
                                            onClick={() => deleteMutation.mutate(mem.lesson_id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    <h3 className="font-display font-semibold text-lg leading-tight mb-3 text-white/90 group-hover:text-white transition-colors">
                                        {mem.title.replace('User Preference:', '').replace('User Pattern:', '')}
                                    </h3>

                                    <div className="flex-1 space-y-3">
                                        <div className="bg-black/20 rounded-lg p-3 border border-white/5">
                                            <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-1 tracking-wider opacity-70">Core Rule / Policy</p>
                                            <p className="text-sm text-gray-300 line-clamp-3 leading-relaxed">
                                                {mem.do_not_repeat_policy}
                                            </p>
                                        </div>

                                        {context?.visualVibe && (
                                            <div className="flex gap-2 text-xs items-center">
                                                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                                                <span className="text-purple-300 font-medium">{context.visualVibe}</span>
                                                <span className="text-white/20">/</span>
                                                <span className="text-green-300/80">{context.theme}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Confidence Bar */}
                                    <div className="mt-4 pt-4 border-t border-white/5">
                                        <div className="flex justify-between text-[10px] uppercase tracking-wider mb-1.5 opacity-80">
                                            <span className="text-muted-foreground">Confidence Score</span>
                                            <span className={cn("font-bold", context?.confidence > 0.8 ? "text-green-400" : "text-yellow-400")}>
                                                {Math.round((context?.confidence || 0.95) * 100)}%
                                            </span>
                                        </div>
                                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className={cn("h-full rounded-full glow-sm transition-all duration-1000", isDesign ? "bg-purple-500" : "bg-cyan-500")}
                                                style={{ width: `${(context?.confidence || 0.95) * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Decorative Glow */}
                                    <div className={cn(
                                        "absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-[50px] opacity-20 pointer-events-none transition-opacity group-hover:opacity-30",
                                        isDesign ? "bg-purple-600" : isFix ? "bg-red-600" : "bg-cyan-600"
                                    )} />
                                </div>
                            )
                        })
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}

function AgentActivityPanel() {
    const [selectedRunId, setSelectedRunId] = useState<string | null>(null);

    // Fetch Runs
    const { data: runsData } = useQuery<{ ok: boolean; runs: AgentRun[] }>({
        queryKey: ['/api/ai/audit/agent-logs'],
        queryFn: async () => {
            const res = await apiRequest('GET', '/api/ai/audit/agent-logs');
            return res.json();
        }
    });

    // Fetch Details
    const { data: logsData } = useQuery<{ ok: boolean; logs: AgentLog[] }>({
        queryKey: ['/api/ai/audit/agent-logs', selectedRunId],
        queryFn: async () => {
            if (!selectedRunId) return { ok: true, logs: [] };
            const res = await apiRequest('GET', `/api/ai/audit/agent-logs/${selectedRunId}`);
            return res.json();
        },
        enabled: !!selectedRunId
    });

    const runs = runsData?.runs || [];
    const logs = logsData?.logs || [];

    return (
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
            {/* Left Sidebar: Run History */}
            <div className="col-span-4 glass-panel flex flex-col overflow-hidden">
                <div className="p-4 border-b border-white/5 bg-white/5">
                    <h3 className="font-semibold flex items-center gap-2">
                        <History className="w-4 h-4 text-primary" />
                        Recent Activity
                    </h3>
                </div>
                <ScrollArea className="flex-1">
                    <div className="divide-y divide-white/5">
                        {runs.length === 0 ? (
                            <div className="p-8 text-center text-muted-foreground text-sm">No activity recorded yet</div>
                        ) : runs.map(run => (
                            <div
                                key={run.run_id}
                                onClick={() => setSelectedRunId(run.run_id)}
                                className={cn(
                                    "p-4 cursor-pointer hover:bg-white/5 transition-colors",
                                    selectedRunId === run.run_id ? "bg-primary/10 border-l-2 border-primary" : "border-l-2 border-transparent"
                                )}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className="font-medium text-sm text-white/90">{run.agent_name}</span>
                                    <span className="text-xs text-muted-foreground">{new Date(run.start_time).toLocaleTimeString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="text-[10px] h-5 px-1 bg-black/20 text-white/50 border-white/10">
                                            {run.steps} ops
                                        </Badge>
                                        <span>{new Date(run.start_time).toLocaleDateString()}</span>
                                    </div>
                                    <ChevronRight className="w-3 h-3 opacity-50" />
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* Right Panel: Detail View */}
            <div className="col-span-8 glass-panel flex flex-col overflow-hidden">
                {!selectedRunId ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-50">
                        <Activity className="w-16 h-16 mb-4 stroke-1" />
                        <p>Select a run to view the black box logs</p>
                    </div>
                ) : (
                    <>
                        <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Badge className="bg-primary/20 text-primary border-primary/20">
                                    Run: {selectedRunId.slice(0, 8)}...
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                    {logs.length} operations logged
                                </span>
                            </div>
                        </div>
                        <ScrollArea className="flex-1 p-6">
                            <div className="space-y-8 relative">
                                <div className="absolute left-3.5 top-2 bottom-2 w-px bg-white/10" />
                                {logs.map((log, idx) => (
                                    <div key={idx} className="relative pl-10 group">
                                        <div className={cn(
                                            "absolute left-0 top-1 w-7 h-7 rounded-full border flex items-center justify-center z-10 transition-colors",
                                            log.action_type === 'thinking' ? "bg-black/50 border-purple-500/50 text-purple-400" :
                                                log.action_type === 'tool_use' ? "bg-black/50 border-amber-500/50 text-amber-400" :
                                                    log.action_type === 'response' ? "bg-primary/10 border-primary/50 text-primary" :
                                                        "bg-red-500/10 border-red-500/50 text-red-400"
                                        )}>
                                            {log.action_type === 'thinking' ? <Brain className="w-3 h-3" /> :
                                                log.action_type === 'tool_use' ? <Terminal className="w-3 h-3" /> :
                                                    log.action_type === 'response' ? <CheckCircle2 className="w-3 h-3" /> :
                                                        <AlertTriangle className="w-3 h-3" />}
                                        </div>

                                        <div className="bg-black/20 border border-white/5 rounded-lg p-4 group-hover:border-white/10 transition-colors">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className={cn(
                                                    "text-xs font-bold uppercase tracking-wider",
                                                    log.action_type === 'thinking' ? "text-purple-400" :
                                                        log.action_type === 'tool_use' ? "text-amber-400" :
                                                            "text-primary"
                                                )}>
                                                    {log.action_type.replace('_', ' ')}
                                                </span>
                                                <span className="text-[10px] text-muted-foreground font-mono">
                                                    {new Date(log.created_at).toLocaleTimeString()}
                                                </span>
                                            </div>

                                            <div className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed opacity-90">
                                                {log.content}
                                            </div>

                                            {log.metadata && Object.keys(log.metadata).length > 0 && (
                                                <div className="mt-3 pt-3 border-t border-white/5">
                                                    <details className="text-xs">
                                                        <summary className="cursor-pointer text-muted-foreground hover:text-white transition-colors">Metadata</summary>
                                                        <pre className="mt-2 bg-black/40 p-2 rounded text-[10px] text-gray-500 overflow-auto">
                                                            {JSON.stringify(log.metadata, null, 2)}
                                                        </pre>
                                                    </details>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </>
                )}
            </div>
        </div>
    );
}

export default function AIAuditTab() {
    return (
        <Tabs defaultValue="activity" className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">AI Audit & Memory</h2>
                    <p className="text-muted-foreground">Monitor autonomous agent logs and manage learned lessons.</p>
                </div>
                <TabsList className="bg-black/20 border border-white/5">
                    <TabsTrigger value="activity" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                        <Activity className="w-4 h-4 mr-2" /> Flight Recorder
                    </TabsTrigger>
                    <TabsTrigger value="memory" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300">
                        <Brain className="w-4 h-4 mr-2" /> Memory Bank
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="activity" className="m-0">
                <AgentActivityPanel />
            </TabsContent>

            <TabsContent value="memory" className="m-0">
                <MemoryBank />
            </TabsContent>
        </Tabs>
    );
}
