import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play, Pause, RotateCcw, CheckCircle2, XCircle, Clock,
    Terminal, Loader2, Activity, Cpu, Box, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { WorkflowExecution, WorkflowStepStatus } from '@shared/schema';

interface ActiveWorkflowViewProps {
    workflow: WorkflowExecution;
    onPause: (id: string) => void;
    onResume: (id: string) => void;
}

export function ActiveWorkflowView({ workflow, onPause, onResume }: ActiveWorkflowViewProps) {
    // Calculate stats
    const steps = workflow.steps || [];
    const currentStepIdx = workflow.currentStep;
    const progress = steps.length > 0 ? (Math.max(0, currentStepIdx) / steps.length) * 100 : 0;

    const getStepStatusColor = (status: WorkflowStepStatus) => {
        switch (status) {
            case 'completed': return 'text-green-400 border-green-500/30 bg-green-500/10';
            case 'running': return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]';
            case 'failed': return 'text-red-400 border-red-500/30 bg-red-500/10';
            default: return 'text-muted-foreground border-white/5 bg-transparent';
        }
    };

    return (
        <div className="h-full flex flex-col gap-4">
            {/* Header Card */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-display font-medium text-gradient-cyan tracking-tight">
                            {workflow.name}
                        </h2>
                        <Badge variant="outline" className={cn(
                            "uppercase tracking-wider text-[10px] font-bold border-white/10",
                            workflow.status === 'running' ? "bg-cyan-500/20 text-cyan-300 animate-pulse border-cyan-500/30" :
                                workflow.status === 'completed' ? "bg-green-500/20 text-green-300 border-green-500/30" :
                                    "bg-white/5 text-muted-foreground"
                        )}>
                            {workflow.status}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                        <span className="flex items-center gap-1.5">
                            <Cpu className="w-3 h-3" />
                            ID: {workflow.id.substring(0, 8)}...
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            Started: {new Date(workflow.createdAt).toLocaleTimeString()}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {workflow.status === 'running' && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPause(workflow.id)}
                            className="border-amber-500/50 text-amber-500 hover:bg-amber-500/10 hover:text-amber-400"
                        >
                            <Pause className="w-4 h-4 mr-2" /> Pause Execution
                        </Button>
                    )}
                    {(workflow.status === 'paused' || workflow.status === 'failed') && (
                        <Button
                            size="sm"
                            onClick={() => onResume(workflow.id)}
                            className="bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)] border-0"
                        >
                            <Play className="w-4 h-4 mr-2" /> Resume
                        </Button>
                    )}
                </div>
            </motion.div>

            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Left Column: Visual Steps */}
                <div className="glass-panel flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-white/5 bg-black/20 flex items-center justify-between">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                            <Activity className="w-4 h-4" /> Workflow Steps
                        </h3>
                        <span className="text-xs font-mono text-cyan-400">{Math.round(progress)}% Complete</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1 bg-white/5 w-full">
                        <motion.div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ type: "spring", stiffness: 50, damping: 20 }}
                        />
                    </div>

                    <ScrollArea className="flex-1 p-6">
                        <div className="relative space-y-6 pl-4">
                            {/* Vertical connector line */}
                            <div className="absolute left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent -z-10" />

                            <AnimatePresence mode='popLayout'>
                                {steps.map((step, idx) => (
                                    <motion.div
                                        key={step.id || idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="relative flex gap-4 group"
                                    >
                                        {/* Status Dot */}
                                        <div className={cn(
                                            "relative z-10 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-500 bg-background",
                                            step.status === 'completed' ? "border-green-500 bg-green-500/10 text-green-500" :
                                                step.status === 'running' ? "border-cyan-500 bg-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.6)]" :
                                                    "border-white/10 text-muted-foreground bg-black/40"
                                        )}>
                                            {step.status === 'completed' ? <CheckCircle2 className="w-3 h-3" /> :
                                                step.status === 'running' ? <Loader2 className="w-3 h-3 animate-spin" /> :
                                                    <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                                        </div>

                                        {/* Step Card */}
                                        <div className={cn(
                                            "flex-1 p-4 rounded-lg border backdrop-blur-sm transition-all duration-300",
                                            getStepStatusColor(step.status)
                                        )}>
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="font-semibold text-sm tracking-tight">{step.name}</span>
                                                {step.agent && (
                                                    <Badge variant="secondary" className="text-[10px] h-5 bg-white/5 hover:bg-white/10 text-muted-foreground border-white/5">
                                                        {step.agent}
                                                    </Badge>
                                                )}
                                            </div>

                                            {step.status === 'running' && (
                                                <p className="text-xs text-cyan-300/80 animate-pulse mb-2">Processing...</p>
                                            )}

                                            {/* Result/Error Preview */}
                                            {(step.result || step.error) && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    className="mt-3 pt-3 border-t border-white/5 font-mono text-xs overflow-hidden"
                                                >
                                                    {step.error ? (
                                                        <span className="text-red-400">{step.error}</span>
                                                    ) : (
                                                        <div className="text-muted-foreground/70 truncate">
                                                            {/* If result is object, stringify roughly */}
                                                            <span className="opacity-50 mr-2 text-[10px] uppercase">Output:</span>
                                                            {typeof step.result === 'object' ? JSON.stringify(step.result).substring(0, 60) + '...' : String(step.result)}
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        {/* Future/Pending placeholder */}
                        {steps.length === 0 && (
                            <div className="text-center text-muted-foreground py-10 opacity-50">
                                <Box className="w-12 h-12 mx-auto mb-2 opacity-20" />
                                <p>Initializing sequence...</p>
                            </div>
                        )}
                    </ScrollArea>
                </div>

                {/* Right Column: Terminal Logs */}
                <div className="glass-panel flex flex-col min-h-[300px]">
                    <div className="p-3 border-b border-white/5 bg-black/40 flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs font-mono font-medium text-muted-foreground">SYSTEM LOGS</span>
                    </div>
                    <ScrollArea className="flex-1 bg-black/60 p-4 font-mono text-xs">
                        <div className="space-y-2">
                            <div className="text-gray-500">
                                <span className="text-gray-700 select-none mr-2">
                                    {new Date(workflow.createdAt).toLocaleTimeString()}
                                </span>
                                Sequence initialized.
                            </div>

                            {steps.filter(s => s.status !== 'pending').map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <div className="flex gap-2 text-gray-400">
                                        <span className="text-gray-700 select-none shrink-0">
                                            {step.startedAt ? new Date(step.startedAt).toLocaleTimeString() : '--:--:--'}
                                        </span>
                                        <span>Executing <span className="text-cyan-400">{step.name}</span>...</span>
                                    </div>

                                    {step.status === 'completed' && (
                                        <div className="flex gap-2 text-green-400/80 mt-1 pl-20 border-l border-green-500/20 ml-3">
                                            <span className="text-green-500">✓</span>
                                            <span>Completed successfully.</span>
                                        </div>
                                    )}

                                    {step.status === 'failed' && (
                                        <div className="flex gap-2 text-red-400 mt-1 pl-20 border-l border-red-500/20 ml-3">
                                            <span>✗ Error: {step.error}</span>
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            {workflow.status === 'completed' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="mt-6 p-3 border border-green-500/20 bg-green-500/5 rounded text-green-400 flex items-center gap-2"
                                >
                                    <CheckCircle2 className="w-4 h-4" />
                                    WORKFLOW COMPLETED SUCCESSFULLY
                                </motion.div>
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}
