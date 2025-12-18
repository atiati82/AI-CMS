import React, { useState } from 'react';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
    Brain, Shield, Radio, Activity, Zap, Lock, Network, Database,
    Bot, Cpu, Globe, Code, FileText, AlertTriangle
} from "lucide-react";

interface UniversalAgentSettingsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UniversalAgentSettingsModal({ open, onOpenChange }: UniversalAgentSettingsModalProps) {
    // Form state - in a real app these would come from useQuery/defaults
    const [settings, setSettings] = useState({
        // Orchestration
        defaultModel: 'gpt-4.1',
        contextWindow: '128k',
        maxParallelAgents: 5,
        delegationDepth: 3,
        reasoningEffort: 'medium',

        // Autonomy
        autoHealing: true,
        autoOptimization: true,
        autoPublishing: false,
        dailyBudgetCap: 5.00,

        // Governance
        humanInTheLoop: true, // For critical actions
        piiRedaction: true,
        contentSafetyFilter: 'strict',
        auditLogging: 'full',

        // Integrations
        webSearchAccess: true,
        codeExecutionAccess: true,
        vectorDbSync: 'realtime',
    });

    const updateSetting = (key: string, value: any) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <Brain className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl">Universal Agent Protocol</DialogTitle>
                            <DialogDescription>Configure global orchestration, safety, and autonomy rules for the AI Agent Network.</DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <Tabs defaultValue="orchestration" className="mt-6 w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="orchestration" className="flex items-center gap-2">
                            <Network className="w-4 h-4" /> Orchestration
                        </TabsTrigger>
                        <TabsTrigger value="autonomy" className="flex items-center gap-2">
                            <Zap className="w-4 h-4" /> Autonomy
                        </TabsTrigger>
                        <TabsTrigger value="governance" className="flex items-center gap-2">
                            <Shield className="w-4 h-4" /> Governance
                        </TabsTrigger>
                        <TabsTrigger value="capabilities" className="flex items-center gap-2">
                            <Cpu className="w-4 h-4" /> Capabilities
                        </TabsTrigger>
                    </TabsList>

                    {/* ORCHESTRATION TAB */}
                    <TabsContent value="orchestration" className="space-y-6 py-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2"><Bot className="w-4 h-4" /> Global Default Model</Label>
                                    <Select value={settings.defaultModel} onValueChange={(v) => updateSetting('defaultModel', v)}>
                                        <SelectTrigger><SelectValue placeholder="Select model" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="gpt-4.1">GPT-4.1 (Reasoning)</SelectItem>
                                            <SelectItem value="gpt-4.1-mini">GPT-4.1 Mini (Fast)</SelectItem>
                                            <SelectItem value="gpt-4o">GPT-4o (Multimodal)</SelectItem>
                                            <SelectItem value="gemini-2.5-pro">Gemini 2.5 Pro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p className="text-xs text-muted-foreground">Fallback model for agents without specific overrides.</p>
                                </div>

                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2"><Radio className="w-4 h-4" /> Context Window Strategy</Label>
                                    <Select value={settings.contextWindow} onValueChange={(v) => updateSetting('contextWindow', v)}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="32k">32k Tokens (Cost Efficient)</SelectItem>
                                            <SelectItem value="128k">128k Tokens (Standard)</SelectItem>
                                            <SelectItem value="2m">2M+ Tokens (Deep Research)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <Label>Reasoning Effort</Label>
                                        <span className="text-xs text-muted-foreground uppercase">{settings.reasoningEffort}</span>
                                    </div>
                                    <div className="pt-2">
                                        <Slider
                                            defaultValue={[50]}
                                            max={100}
                                            step={25}
                                            className="cursor-pointer"
                                            onValueChange={(vals) => {
                                                const v = vals[0];
                                                const effort = v < 30 ? 'low' : v < 70 ? 'medium' : 'high';
                                                updateSetting('reasoningEffort', effort);
                                            }}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">Controls "Thinking" token budget for complex tasks.</p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <Label>Max Parallel Agents</Label>
                                        <span className="font-mono text-xs">{settings.maxParallelAgents}</span>
                                    </div>
                                    <Slider
                                        defaultValue={[settings.maxParallelAgents]}
                                        max={20}
                                        step={1}
                                        onValueChange={(v) => updateSetting('maxParallelAgents', v[0])}
                                    />
                                    <p className="text-xs text-muted-foreground">Limit concurrent agent executions to prevent race conditions.</p>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* AUTONOMY TAB */}
                    <TabsContent value="autonomy" className="space-y-6 py-4">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-muted/10 transition-colors">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Auto-Healing Infrastructure</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Allow DevOps agent to attempt automatic fixes for detected errors.
                                    </p>
                                </div>
                                <Switch checked={settings.autoHealing} onCheckedChange={(c) => updateSetting('autoHealing', c)} />
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-muted/10 transition-colors">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Continuous Optimization</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Allow SEO & Design agents to proactively suggest and draft improvements.
                                    </p>
                                </div>
                                <Switch checked={settings.autoOptimization} onCheckedChange={(c) => updateSetting('autoOptimization', c)} />
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded-lg bg-yellow-500/5 border-yellow-500/20">
                                <div className="space-y-0.5">
                                    <Label className="text-base text-yellow-500">Autonomous Publishing</Label>
                                    <p className="text-sm text-yellow-500/70">
                                        Allow agents to publish low-risk content updates without human review.
                                    </p>
                                </div>
                                <Switch checked={settings.autoPublishing} onCheckedChange={(c) => updateSetting('autoPublishing', c)} />
                            </div>

                            <Separator />

                            <div className="p-4 bg-muted/20 rounded-lg space-y-3">
                                <Label className="flex items-center gap-2"><Activity className="w-4 h-4" /> Daily Budget Cap (USD)</Label>
                                <div className="flex gap-4 items-center">
                                    <Input
                                        type="number"
                                        value={settings.dailyBudgetCap}
                                        onChange={(e) => updateSetting('dailyBudgetCap', parseFloat(e.target.value))}
                                        className="w-32"
                                    />
                                    <span className="text-sm text-muted-foreground">per 24h period</span>
                                </div>
                                <p className="text-xs text-muted-foreground">Agents will pause operations if this limit is reached.</p>
                            </div>
                        </div>
                    </TabsContent>

                    {/* GOVERNANCE TAB */}
                    <TabsContent value="governance" className="space-y-6 py-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="flex items-center gap-2"><Lock className="w-4 h-4" /> Human-in-the-Loop</Label>
                                    <Switch checked={settings.humanInTheLoop} onCheckedChange={(c) => updateSetting('humanInTheLoop', c)} />
                                </div>
                                <p className="text-sm text-muted-foreground border-l-2 pl-3">
                                    Require manual approval for: Database Deletions, Deployment, Config Changes.
                                </p>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <Label>PII Redaction</Label>
                                    <Switch checked={settings.piiRedaction} onCheckedChange={(c) => updateSetting('piiRedaction', c)} />
                                </div>
                                <p className="text-xs text-muted-foreground">Automatically replace email addresses, phones, and names in prompts.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Content Safety Filter</Label>
                                    <Select value={settings.contentSafetyFilter} onValueChange={(v) => updateSetting('contentSafetyFilter', v)}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="strict">Strict (Brand Safe)</SelectItem>
                                            <SelectItem value="moderate">Moderate</SelectItem>
                                            <SelectItem value="loose">Loose (Creative)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Audit Logging Level</Label>
                                    <Select value={settings.auditLogging} onValueChange={(v) => updateSetting('auditLogging', v)}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">None</SelectItem>
                                            <SelectItem value="errors">Errors Only</SelectItem>
                                            <SelectItem value="full">Full Trace (All Prompts/Responses)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* CAPABILITIES TAB */}
                    <TabsContent value="capabilities" className="space-y-6 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 border rounded-lg space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Globe className="w-5 h-5 text-blue-500" />
                                    <h3 className="font-medium">Web Access</h3>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label className="cursor-pointer" onClick={() => updateSetting('webSearchAccess', !settings.webSearchAccess)}>Enable Semantic Search</Label>
                                    <Switch checked={settings.webSearchAccess} onCheckedChange={(c) => updateSetting('webSearchAccess', c)} />
                                </div>
                                <p className="text-xs text-muted-foreground">Allows agents to browse the internet for real-time information verification.</p>
                            </div>

                            <div className="p-4 border rounded-lg space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Code className="w-5 h-5 text-yellow-500" />
                                    <h3 className="font-medium">Code Execution</h3>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label className="cursor-pointer" onClick={() => updateSetting('codeExecutionAccess', !settings.codeExecutionAccess)}>Enable Sandbox</Label>
                                    <Switch checked={settings.codeExecutionAccess} onCheckedChange={(c) => updateSetting('codeExecutionAccess', c)} />
                                </div>
                                <p className="text-xs text-muted-foreground">Allows agents to write and execute Python/JS code for data analysis.</p>
                            </div>

                            <div className="p-4 border rounded-lg space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Database className="w-5 h-5 text-purple-500" />
                                    <h3 className="font-medium">Long-term Memory</h3>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm">Vector DB Sync</span>
                                        <span className="text-xs text-muted-foreground">{settings.vectorDbSync}</span>
                                    </div>
                                    <Select value={settings.vectorDbSync} onValueChange={(v) => updateSetting('vectorDbSync', v)}>
                                        <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="realtime">Real-time (Immediate)</SelectItem>
                                            <SelectItem value="batch">Batch (Hourly)</SelectItem>
                                            <SelectItem value="manual">Manual Only</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

                <DialogFooter className="mt-6 flex justify-between items-center w-full">
                    <p className="text-xs text-muted-foreground text-left mr-auto">
                        <AlertTriangle className="w-3 h-3 inline mr-1 text-yellow-500" />
                        Changes propagate to the entire agent network immediately.
                    </p>
                    <div className="flex gap-2">
                        <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button onClick={() => onOpenChange(false)} className="bg-primary text-primary-foreground">
                            Save Protocol Settings
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
