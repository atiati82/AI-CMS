
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
    CheckCircle2, AlertTriangle, Filter, RefreshCw
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

export default function AIAuditTab() {
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
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-48 glass-panel animate-pulse opacity-50" />
                    ))}
                </div>
            ) : (
                <ScrollArea className="h-[calc(100vh-300px)] pr-4">
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
                                const isPref = mem.tags.includes('preference');

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
            )}
        </div>
    );
}
