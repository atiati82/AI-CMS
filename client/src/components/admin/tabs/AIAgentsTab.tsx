import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Brain, Cpu, Activity, Play, Settings, AlertCircle, CheckCircle2, TrendingUp, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { AIAgent } from "@/types/admin";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Helper functions moved from admin.tsx
const getTestTask = (agentName: string) => {
    switch (agentName.toLowerCase()) {
        case 'content':
            return { type: 'extract_keywords', input: { text: 'Ionic minerals are essential for cellular hydration and health. Sulfate minerals help detoxify the body and support enzyme function.' } };
        case 'seo':
            return { type: 'suggest_keywords', input: { topic: 'ionic minerals' } };
        case 'design':
            return { type: 'generate_palette', input: { baseColor: '#8B5CF6' } };
        case 'devops':
            return { type: 'check_health', input: {} };
        case 'orchestrator':
            return { type: 'analyze_request', input: { request: 'Create a new page about water science' } };
        case 'research':
            return { type: 'get_evidence_level', input: { claim: 'EZ water' } };
        case 'visual-interpreter':
            return { type: 'extract_vibe', input: { content: 'Crystalline structures and deep indigo light' } };
        default:
            return { type: 'status', input: {} };
    }
};

const getAgentPrompts = (agentName: string) => {
    switch (agentName.toLowerCase()) {
        case 'content':
            return {
                purpose: "Generate, rewrite, and analyze content for the CMS",
                systemPrompt: "You are a content generation specialist. Your role is to create high-quality, engaging content that aligns with the Andara Ionic brand voice - mystical yet scientific, elegant and educational.",
                examples: [
                    { type: 'generate_content', input: { topic: 'water science', tone: 'professional', length: 'medium' } },
                    { type: 'rewrite_content', input: { content: 'Sample text', style: 'scientific' } },
                    { type: 'summarize', input: { text: 'Long article...', length: 200 } },
                    { type: 'extract_keywords', input: { text: 'Article content...' } }
                ]
            };
        case 'seo':
            return {
                purpose: "Analyze and optimize SEO for pages and content",
                systemPrompt: "You are an SEO optimization specialist. Analyze content for search engine optimization, suggest improvements, and calculate SEO scores based on best practices.",
                examples: [
                    { type: 'suggest_keywords', input: { topic: 'ionic minerals' } },
                    { type: 'calculate_seo_score', input: { pageId: 'page-uuid' } },
                    { type: 'find_seo_issues', input: { pageId: 'page-uuid' } },
                    { type: 'optimize_page', input: { pageId: 'page-uuid' } }
                ]
            };
        case 'design':
            return {
                purpose: "Generate visual design suggestions and styling",
                systemPrompt: "You are a visual design specialist. Create color palettes, suggest layouts, and provide motion design recommendations that align with modern, premium aesthetics.",
                examples: [
                    { type: 'generate_palette', input: { baseColor: '#8B5CF6' } },
                    { type: 'suggest_visual_style', input: { topic: 'water', mood: 'calm' } },
                    { type: 'recommend_layout', input: { pageType: 'product' } },
                    { type: 'apply_motion', input: { preset: 'smooth' } }
                ]
            };
        case 'devops':
            return {
                purpose: "Monitor system health and performance",
                systemPrompt: "You are a DevOps specialist. Monitor system health, check performance metrics, generate alerts, and perform auto-healing operations when issues are detected.",
                examples: [
                    { type: 'check_health', input: {} },
                    { type: 'check_system_health', input: {} },
                    { type: 'get_performance_metrics', input: { component: 'all' } },
                    { type: 'generate_alerts', input: {} },
                    { type: 'auto_heal', input: { issueType: 'memory' } }
                ]
            };
        case 'orchestrator':
            return {
                purpose: "Coordinate and delegate tasks to other agents",
                systemPrompt: "You are the orchestrator. Analyze complex requests, break them down into subtasks, and delegate to the appropriate specialized agents (content, SEO, design, devops).",
                examples: [
                    { type: 'chat', input: { message: 'Help me optimize my page for SEO' } },
                    { type: 'delegate', input: { agentName: 'content', taskType: 'generate_content', taskInput: {} } },
                    { type: 'complex_task', input: { steps: [{ agent: 'content', type: 'generate_content', input: {} }] } }
                ]
            };
        default:
            return {
                purpose: "AI Agent",
                systemPrompt: "General purpose AI agent",
                examples: []
            };
    }
};

export default function AIAgentsTab() {
    const { toast } = useToast();
    const [testingAgent, setTestingAgent] = useState<string | null>(null);
    const [testResult, setTestResult] = useState<any>(null);
    const [isTestModalOpen, setIsTestModalOpen] = useState(false);
    const [isExecuting, setIsExecuting] = useState(false);

    // Agent detail modal state
    const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [customTaskType, setCustomTaskType] = useState('');
    const [customTaskInput, setCustomTaskInput] = useState('{}');
    const [isEditingConfig, setIsEditingConfig] = useState(false);
    const [configForm, setConfigForm] = useState<{ systemPrompt: string; rules: string[] }>({ systemPrompt: '', rules: [] });
    const [isSavingConfig, setIsSavingConfig] = useState(false);

    const { data: agentsData, isLoading, refetch } = useQuery<{ ok: boolean; agents: AIAgent[]; count: number }>({
        queryKey: ['/api/ai/agents'],
        queryFn: async () => {
            const res = await apiRequest('GET', '/api/ai/agents');
            return res.json();
        },
    });

    // Agent metrics query
    type DashboardMetrics = {
        totalExecutions: number;
        successRate: number;
        avgLatencyMs: number;
        totalCostUsd: number;
        byAgent: Array<{
            agentName: string;
            executions: number;
            successRate: number;
            avgLatencyMs: number;
            totalCostUsd: number;
        }>;
        recentErrors: Array<{
            agentName: string;
            taskType: string;
            errorMessage: string;
            createdAt: string;
        }>;
    };

    const { data: metricsData } = useQuery<{ ok: boolean; metrics: DashboardMetrics }>({
        queryKey: ['/api/ai/agent-metrics/dashboard'],
        queryFn: async () => {
            const res = await apiRequest('GET', '/api/ai/agent-metrics/dashboard?hours=24');
            return res.json();
        },
        refetchInterval: 60000,
    });

    const metrics = metricsData?.metrics;
    const agents = agentsData?.agents || [];

    const handleOpenAgentDetail = (agent: AIAgent) => {
        setSelectedAgent(agent);
        setIsDetailModalOpen(true);
        setCustomTaskType(agent.capabilities[0] || '');
        setCustomTaskInput('{}');
        setIsEditingConfig(false);
    };

    const handleEditConfig = () => {
        if (!selectedAgent) return;
        const systemPrompt = selectedAgent.systemPrompt || getAgentPrompts(selectedAgent.name).systemPrompt;
        const rules = selectedAgent.rules || [];
        setConfigForm({ systemPrompt, rules });
        setIsEditingConfig(true);
    };

    const handleSaveConfig = async () => {
        if (!selectedAgent) return;
        setIsSavingConfig(true);
        try {
            const res = await apiRequest('PATCH', `/api/ai/agents/${selectedAgent.name}/config`, {
                systemPrompt: configForm.systemPrompt,
                rules: configForm.rules
            });
            const data = await res.json();
            if (data.ok) {
                toast({ title: "Configuration Updated", description: "Agent settings saved successfully" });
                setIsEditingConfig(false);
                refetch(); // Refresh agent list to get new config
                // Update selected agent locally to reflect changes immediately
                setSelectedAgent(prev => prev ? { ...prev, systemPrompt: configForm.systemPrompt, rules: configForm.rules } : null);
            } else {
                toast({ title: "Update Failed", description: data.error, variant: "destructive" });
            }
        } catch (error: any) {
            toast({ title: "Update Error", description: error.message, variant: "destructive" });
        } finally {
            setIsSavingConfig(false);
        }
    };

    const handleTestAgent = async (agentName: string) => {
        setTestingAgent(agentName);
        setTestResult(null);
        setIsTestModalOpen(true);
        setIsExecuting(true);

        try {
            const task = getTestTask(agentName);
            const res = await apiRequest('POST', '/api/ai/agents/execute', {
                agentName,
                task: { id: `test-${Date.now()}`, ...task }
            });
            const data = await res.json();
            setTestResult(data);

            if (data.ok && data.result?.success) {
                toast({
                    title: "Agent Test Successful",
                    description: `${agentName} agent responded successfully`,
                });
            } else {
                toast({
                    title: "Agent Test Failed",
                    description: data.error || (data.result?.error || "Unknown error"),
                    variant: "destructive",
                });
            }
        } catch (error: any) {
            setTestResult({ ok: false, error: error.message });
            toast({
                title: "Execution Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setIsExecuting(false);
        }
    };

    const handleExecuteCustomTask = async () => {
        if (!selectedAgent) return;
        setIsExecuting(true);
        setTestResult(null);

        try {
            let input = {};
            try {
                input = JSON.parse(customTaskInput);
            } catch (e) {
                toast({ title: "Invalid JSON", description: "Please check your input JSON format", variant: "destructive" });
                setIsExecuting(false);
                return;
            }

            const res = await apiRequest('POST', '/api/ai/agents/execute', {
                agentName: selectedAgent.name,
                task: {
                    id: `custom-${Date.now()}`,
                    type: customTaskType,
                    input
                }
            });
            const data = await res.json();
            setTestResult(data);
        } catch (error: any) {
            setTestResult({ ok: false, error: error.message });
        } finally {
            setIsExecuting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Brain className="w-6 h-6 text-purple-500" />
                        AI Agents Network
                    </h2>
                    <p className="text-muted-foreground text-sm">Monitor and configure autonomous AI agents</p>
                </div>
                <div className="flex bg-muted/30 rounded-lg p-1">
                    <Button variant="ghost" size="sm" className="text-xs h-7">System V2.5</Button>
                    <Button variant="ghost" size="sm" className="text-xs h-7 bg-white/10 shadow-sm">Online</Button>
                </div>
            </div>

            {/* Metrics Dashboard */}
            {metrics && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="bg-card/50 border-purple-500/20">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground font-medium uppercase">Total Executions (24h)</p>
                                <div className="text-2xl font-bold mt-1 text-purple-400">{metrics.totalExecutions}</div>
                            </div>
                            <Activity className="w-8 h-8 text-purple-500/20" />
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50 border-emerald-500/20">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground font-medium uppercase">Success Rate</p>
                                <div className="text-2xl font-bold mt-1 text-emerald-400">{metrics.successRate}%</div>
                            </div>
                            <CheckCircle2 className="w-8 h-8 text-emerald-500/20" />
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50 border-blue-500/20">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground font-medium uppercase">Avg Latency</p>
                                <div className="text-2xl font-bold mt-1 text-blue-400">{Math.round(metrics.avgLatencyMs)}ms</div>
                            </div>
                            <TrendingUp className="w-8 h-8 text-blue-500/20" />
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50 border-amber-500/20">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground font-medium uppercase">Est. Cost (24h)</p>
                                <div className="text-2xl font-bold mt-1 text-amber-400">${metrics.totalCostUsd.toFixed(4)}</div>
                            </div>
                            <DollarSign className="w-8 h-8 text-amber-500/20" />
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Recent Errors Panel (if any) */}
            {metrics?.recentErrors && metrics.recentErrors.length > 0 && (
                <Card className="border-red-500/30 bg-red-500/5">
                    <CardHeader className="py-3 px-4">
                        <CardTitle className="text-sm font-medium flex items-center gap-2 text-red-400">
                            <AlertCircle className="w-4 h-4" /> Recent Errors
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="py-2 px-4 max-h-40 overflow-y-auto space-y-2">
                        {metrics.recentErrors.map((err, idx) => (
                            <div key={idx} className="text-xs flex items-start gap-2 pb-2 border-b border-red-500/10 last:border-0">
                                <Badge variant="outline" className="text-[10px] border-red-500/30 text-red-400 shrink-0">{err.agentName}</Badge>
                                <div className="flex-1">
                                    <div className="font-medium text-red-300">{err.taskType}</div>
                                    <div className="text-red-400/80 mt-0.5">{err.errorMessage}</div>
                                    <div className="text-[10px] text-red-500/50 mt-1">{new Date(err.createdAt).toLocaleTimeString()}</div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <div>Loading agents...</div>
                ) : (
                    agents.map((agent: any, idx: number) => (
                        <div
                            key={idx}
                            className="group relative bg-card border border-border/50 rounded-xl p-5 hover:border-purple-500/50 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
                            onClick={() => handleOpenAgentDetail(agent)}
                        >
                            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-purple-400">
                                    <Settings className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-linear-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20 group-hover:bg-purple-500/20 group-hover:scale-105 transition-all">
                                    <Cpu className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg flex items-center gap-2">
                                        {agent.displayName || agent.name}
                                        {agent.role === 'core' && <Badge variant="outline" className="text-[10px] bg-purple-500/10 text-purple-400 border-purple-500/30">Core</Badge>}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1 min-h-[40px]">{agent.description}</p>
                                </div>
                            </div>

                            {/* Performance Mini-Stats */}
                            {metrics?.byAgent?.find(m => m.agentName === agent.name) && (
                                <div className="mt-4 pt-4 border-t border-border/50 grid grid-cols-3 gap-2">
                                    <div className="text-center">
                                        <div className="text-[10px] text-muted-foreground">Calls</div>
                                        <div className="text-xs font-bold">{metrics.byAgent.find(m => m.agentName === agent.name)?.executions || 0}</div>
                                    </div>
                                    <div className="text-center border-l border-border/50">
                                        <div className="text-[10px] text-muted-foreground">Success</div>
                                        <div className="text-xs font-bold text-emerald-400">{metrics.byAgent.find(m => m.agentName === agent.name)?.successRate || 0}%</div>
                                    </div>
                                    <div className="text-center border-l border-border/50">
                                        <div className="text-[10px] text-muted-foreground">Cost</div>
                                        <div className="text-xs font-bold text-amber-400">${(metrics.byAgent.find(m => m.agentName === agent.name)?.totalCostUsd || 0).toFixed(4)}</div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-4 flex flex-wrap gap-2">
                                {(agent.capabilities || []).slice(0, 3).map((cap: string, i: number) => (
                                    <Badge key={i} variant="secondary" className="text-xs bg-secondary/50">
                                        {cap.split('_').join(' ')}
                                    </Badge>
                                ))}
                                {(agent.capabilities?.length || 0) > 3 && (
                                    <Badge variant="outline" className="text-xs">+{agent.capabilities.length - 3}</Badge>
                                )}
                            </div>

                            <div className="mt-4 flex gap-2">
                                <Button
                                    className="w-full bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-600/30"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleTestAgent(agent.name);
                                    }}
                                >
                                    <Play className="w-3 h-3 mr-2" /> Test
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Agent Detail Modal */}
            <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
                <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                    {selectedAgent && (
                        <>
                            <DialogHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-500/10 rounded-lg">
                                        <Cpu className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <DialogTitle className="text-xl">{selectedAgent.displayName || selectedAgent.name} Agent</DialogTitle>
                                        <DialogDescription>{selectedAgent.description}</DialogDescription>
                                    </div>
                                </div>
                            </DialogHeader>

                            <Tabs defaultValue="overview" className="w-full mt-6">
                                <TabsList>
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="config">Configuration</TabsTrigger>
                                    <TabsTrigger value="test">Interactive Test</TabsTrigger>
                                    <TabsTrigger value="history">History</TabsTrigger>
                                </TabsList>

                                <TabsContent value="overview" className="mt-4 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <Card>
                                            <CardHeader className="py-3"><CardTitle className="text-sm">Capabilities</CardTitle></CardHeader>
                                            <CardContent className="py-2">
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedAgent.capabilities?.map(c => (
                                                        <Badge key={c} variant="outline">{c}</Badge>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader className="py-3"><CardTitle className="text-sm">System Role</CardTitle></CardHeader>
                                            <CardContent className="py-2">
                                                <p className="text-sm text-muted-foreground">{selectedAgent.role || 'Standard Agent'}</p>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium mb-2">Instructions & Rules</h3>
                                        <div className="bg-muted p-4 rounded-lg text-sm space-y-2 max-h-60 overflow-y-auto">
                                            {(selectedAgent.rules || []).map((rule, i) => (
                                                <div key={i} className="flex gap-2">
                                                    <span className="text-purple-400">•</span>
                                                    <span>{rule}</span>
                                                </div>
                                            ))}
                                            {!selectedAgent.rules?.length && <div className="text-muted-foreground italic">No specific rules defined. Using default system prompt.</div>}
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="config" className="mt-4 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-medium">Agent Configuration</h3>
                                        {!isEditingConfig ? (
                                            <Button size="sm" onClick={handleEditConfig} variant="outline">
                                                <Settings className="w-4 h-4 mr-2" /> Edit Config
                                            </Button>
                                        ) : (
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="ghost" onClick={() => setIsEditingConfig(false)}>Cancel</Button>
                                                <Button size="sm" onClick={handleSaveConfig} disabled={isSavingConfig}>
                                                    {isSavingConfig && <Activity className="w-3 h-3 mr-2 animate-spin" />} Save Changes
                                                </Button>
                                            </div>
                                        )}
                                    </div>

                                    {isEditingConfig ? (
                                        <div className="space-y-4 border rounded-lg p-4 bg-muted/10">
                                            <div className="space-y-2">
                                                <Label>System Prompt (Persona)</Label>
                                                <Textarea
                                                    value={configForm.systemPrompt}
                                                    onChange={(e) => setConfigForm(prev => ({ ...prev, systemPrompt: e.target.value }))}
                                                    className="min-h-[150px] font-mono text-sm"
                                                    placeholder="You are..."
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Operational Rules (One per line)</Label>
                                                <Textarea
                                                    value={configForm.rules.join('\n')}
                                                    onChange={(e) => setConfigForm(prev => ({ ...prev, rules: e.target.value.split('\n').filter(l => l.trim()) }))}
                                                    className="min-h-[150px] font-mono text-sm"
                                                    placeholder="- Always be polite"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-card border rounded-lg p-4">
                                            <div className="text-xs font-mono mb-2 text-muted-foreground">SYSTEM PROMPT:</div>
                                            <div className="p-3 bg-muted rounded text-sm mb-4">
                                                {selectedAgent.systemPrompt || getAgentPrompts(selectedAgent.name).systemPrompt}
                                            </div>
                                            <div className="text-xs font-mono mb-2 text-muted-foreground">ACTIVE RULES:</div>
                                            <ul className="list-disc list-inside text-sm space-y-1">
                                                {(selectedAgent.rules?.length ? selectedAgent.rules : (configForm.rules.length ? configForm.rules : [])).map((r, i) => (
                                                    <li key={i}>{r}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </TabsContent>

                                <TabsContent value="test" className="mt-4 space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>Task Type</Label>
                                                <select
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                                    value={customTaskType}
                                                    onChange={(e) => setCustomTaskType(e.target.value)}
                                                >
                                                    {selectedAgent.capabilities?.map(c => (
                                                        <option key={c} value={c}>{c}</option>
                                                    ))}
                                                    <option value="chat">chat</option>
                                                    <option value="custom">custom (raw)</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Input JSON</Label>
                                                <Textarea
                                                    value={customTaskInput}
                                                    onChange={(e) => setCustomTaskInput(e.target.value)}
                                                    className="font-mono text-xs min-h-[200px]"
                                                />
                                            </div>
                                            <Button onClick={handleExecuteCustomTask} disabled={isExecuting} className="w-full">
                                                {isExecuting ? <Activity className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
                                                Execute Task
                                            </Button>
                                        </div>

                                        <div className="border rounded-lg p-4 bg-muted/20 flex flex-col h-full min-h-[300px]">
                                            <h4 className="text-sm font-medium mb-2">Execution Result</h4>
                                            {testResult ? (
                                                <div className="flex-1 overflow-auto text-xs font-mono bg-black/50 p-2 rounded">
                                                    <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ background: 'transparent', margin: 0 }}>
                                                        {JSON.stringify(testResult, null, 2)}
                                                    </SyntaxHighlighter>
                                                </div>
                                            ) : (
                                                <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
                                                    Run a task to see results
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="history">
                                    <div className="text-center py-8 text-muted-foreground">
                                        Agent execution history coming soon...
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* Quick Test Modal (from list view) */}
            <Dialog open={isTestModalOpen} onOpenChange={setIsTestModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Testing {testingAgent}</DialogTitle>
                        <DialogDescription>Running a standard health check task</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        {isExecuting ? (
                            <div className="flex items-center justify-center gap-3 py-8">
                                <Activity className="w-8 h-8 animate-spin text-purple-500" />
                                <span className="text-muted-foreground">Executing task...</span>
                            </div>
                        ) : testResult ? (
                            <div className="bg-muted p-4 rounded-lg overflow-hidden">
                                <pre className="text-xs font-mono whitespace-pre-wrap max-h-60 overflow-auto">
                                    {JSON.stringify(testResult, null, 2)}
                                </pre>
                            </div>
                        ) : null}
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setIsTestModalOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
