
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import {
    Play, Pause, RotateCcw, CheckCircle2, XCircle, Clock,
    AlertCircle, Activity, ArrowRight, Layers, FileText, Search,
    Loader2, MoreVertical, Terminal, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ActiveWorkflowView } from './workflow/ActiveWorkflowView';
import type { WorkflowExecution, WorkflowTemplate, WorkflowStepStatus } from './types';

export default function WorkflowsTab() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [selectedWorkflowId, setSelectedWorkflowId] = useState<string | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<string>('');
    const [contextInput, setContextInput] = useState<string>('{}');

    // Fetch Workflows
    const { data: workflowsData, isLoading } = useQuery<{ ok: boolean; workflows: WorkflowExecution[] }>({
        queryKey: ['/api/ai/workflows'],
        queryFn: async () => {
            const res = await apiRequest('GET', '/api/ai/workflows');
            return res.json();
        },
        refetchInterval: 3000 // Poll every 3s for live updates
    });

    // Fetch Templates
    const { data: templatesData } = useQuery<{ ok: boolean; templates: WorkflowTemplate[] }>({
        queryKey: ['/api/ai/workflows/templates'],
        queryFn: async () => {
            const res = await apiRequest('GET', '/api/ai/workflows/templates');
            return res.json();
        },
    });

    // Mutations
    const createMutation = useMutation({
        mutationFn: async (data: { template: string; context: any }) => {
            const res = await apiRequest('POST', '/api/ai/workflows/create', data);
            return res.json();
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['/api/ai/workflows'] });
            setIsCreateModalOpen(false);
            setSelectedTemplate('');
            setContextInput('{}');

            // Auto-run the created workflow
            runMutation.mutate(data.workflowId);
            toast({ title: "Workflow Created", description: "Starting execution..." });
        }
    });

    const runMutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await apiRequest('POST', `/api/ai/workflows/${id}/run`);
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/ai/workflows'] });
        }
    });

    const pauseMutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await apiRequest('POST', `/api/ai/workflows/${id}/pause`);
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/ai/workflows'] });
            toast({ title: "Workflow Paused" });
        }
    });

    const workflows = workflowsData?.workflows || [];
    const selectedWorkflow = workflows.find(w => w.id === selectedWorkflowId) || workflows[0];

    // Stats
    const stats = {
        running: workflows.filter(w => w.status === 'running').length,
        completed: workflows.filter(w => w.status === 'completed').length,
        failed: workflows.filter(w => w.status === 'failed').length,
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'running': return <Activity className="w-4 h-4 text-blue-500 animate-pulse" />;
            case 'completed': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
            case 'failed': return <XCircle className="w-4 h-4 text-red-500" />;
            case 'paused': return <Pause className="w-4 h-4 text-yellow-500" />;
            default: return <Clock className="w-4 h-4 text-muted-foreground" />;
        }
    };

    const getStepStatusColor = (status: WorkflowStepStatus) => {
        switch (status) {
            case 'completed': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'running': return 'bg-blue-500/10 text-blue-500 border-blue-500/20 animate-pulse';
            case 'failed': return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'skipped': return 'bg-muted text-muted-foreground';
            default: return 'bg-muted/30 text-muted-foreground';
        }
    };

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col gap-4">
            {/* Header Stats */}
            <div className="grid grid-cols-4 gap-4">
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase">Active Workflows</p>
                            <h3 className="text-2xl font-bold text-primary">{stats.running}</h3>
                        </div>
                        <Activity className="w-8 h-8 text-primary/50" />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase">Completed</p>
                            <h3 className="text-2xl font-bold text-green-500">{stats.completed}</h3>
                        </div>
                        <CheckCircle2 className="w-8 h-8 text-green-500/20" />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase">Failed</p>
                            <h3 className="text-2xl font-bold text-red-500">{stats.failed}</h3>
                        </div>
                        <AlertCircle className="w-8 h-8 text-red-500/20" />
                    </CardContent>
                </Card>
                <div className="flex items-center justify-end">
                    <Button onClick={() => setIsCreateModalOpen(true)} className="w-full h-full text-lg shadow-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                        <Play className="w-5 h-5 mr-2" /> Run New Workflow
                    </Button>
                </div>
            </div>

            <div className="flex gap-6 h-full min-h-0">
                {/* Left Panel: List */}
                <div className="w-1/3 flex flex-col gap-4">
                    <div className="flex-1 glass-panel flex flex-col min-h-0">
                        <div className="py-3 px-4 border-b border-white/10 bg-white/5">
                            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">History</h3>
                        </div>
                        <ScrollArea className="flex-1 bg-transparent">
                            <div className="p-2 space-y-2">
                                {workflows.map(wf => (
                                    <div
                                        key={wf.id}
                                        onClick={() => setSelectedWorkflowId(wf.id)}
                                        className={cn(
                                            "group flex flex-col gap-2 p-3 rounded-lg border transition-all cursor-pointer hover:bg-muted/50",
                                            selectedWorkflow?.id === wf.id
                                                ? "bg-primary/5 border-primary/30 shadow-[0_0_10px_-5px_var(--primary)]"
                                                : "bg-card border-border/40"
                                        )}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {getStatusIcon(wf.status)}
                                                <span className="font-semibold text-sm">{wf.name || 'Untitled Workflow'}</span>
                                            </div>
                                            <Badge variant="outline" className="text-[10px] h-5">{wf.status}</Badge>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex justify-between text-xs text-muted-foreground">
                                                <span>Step {wf.currentStep + 1} of {wf.steps?.length || '?'}</span>
                                                <span>{new Date(wf.createdAt).toLocaleTimeString()}</span>
                                            </div>
                                            <Progress value={((wf.currentStep) / (wf.steps?.length || 1)) * 100} className="h-1" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>

                {/* Right Panel: Detail */}
                <div className="w-2/3 flex flex-col gap-4">
                    {selectedWorkflow ? (
                        <ActiveWorkflowView
                            workflow={selectedWorkflow}
                            onPause={(id) => pauseMutation.mutate(id)}
                            onResume={(id) => runMutation.mutate(id)}
                        />
                    ) : (
                        <div className="flex-1 glass-panel flex flex-col items-center justify-center text-muted-foreground p-12">
                            <Layers className="w-16 h-16 mb-4 opacity-20 text-cyan-500" />
                            <h3 className="text-xl font-display font-medium text-gradient-cyan mb-2">No Workflow Selected</h3>
                            <p className="text-sm opacity-60 max-w-xs text-center">Select a workflow from the history list or start a new sequence to view its real-time execution.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Create Modal */}
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Start New Workflow</DialogTitle>
                        <DialogDescription>
                            Select a template to spawn a specific agentic workflow.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Template</label>
                            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select template..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {templatesData?.templates.map(t => (
                                        <SelectItem key={t.id} value={t.id}>
                                            <div className="flex flex-col items-start">
                                                <span className="font-medium">{t.name}</span>
                                                <span className="text-xs text-muted-foreground">{t.description}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Context (JSON)</label>
                            <textarea
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
                                value={contextInput}
                                onChange={(e) => setContextInput(e.target.value)}
                                placeholder='{ "topic": "ionic water" }'
                            />
                            <p className="text-[10px] text-muted-foreground">
                                Required params: {templatesData?.templates.find(t => t.id === selectedTemplate)?.requiredParams.join(', ') || 'None'}
                            </p>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
                        <Button
                            onClick={() => {
                                try {
                                    const context = JSON.parse(contextInput);
                                    createMutation.mutate({ template: selectedTemplate, context });
                                } catch (e) {
                                    toast({ title: "Invalid JSON", variant: "destructive" });
                                }
                            }}
                            disabled={!selectedTemplate || createMutation.isPending}
                        >
                            {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                            Start Workflow
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
