import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
    Save, Eye, EyeOff, Settings, Wand2, Key, BarChart2, Search, RefreshCw,
    Loader2, Play, Clock, Database, CheckCircle2, AlertCircle, XCircle, Code, Cpu
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { CmsSetting } from './types';

interface SettingsTabProps {
    settings: CmsSetting[];
    onSave: (key: string, value: any, description: string, category: string) => Promise<void>;
    isSaving: boolean;
    onTabChange?: (tab: string) => void;
}

//Constants
const SETTINGS_CATEGORIES = [
    { key: 'magic_ai', label: 'Magic AI', icon: Wand2, description: 'Magic Page AI system prompt' },
    { key: 'openai', label: 'OpenAI SDK', icon: Cpu, description: 'Direct OpenAI API chat interface' },
    { key: 'api_keys', label: 'API Keys', icon: Key, description: 'External service API keys' },
    { key: 'thresholds', label: 'Thresholds', icon: BarChart2, description: 'Scoring and generation thresholds' },
    { key: 'seo', label: 'SEO Settings', icon: Search, description: 'SEO scanner configuration' },
    { key: 'maintenance', label: 'Maintenance', icon: RefreshCw, description: 'AI-powered codebase maintenance' },
    { key: 'developer', label: 'Developer Tools', icon: Code, description: 'AI agents and function documentation' },
    { key: 'general', label: 'General', icon: Settings, description: 'General CMS settings' },
];

const AI_MODEL_OPTIONS = [
    { value: 'gpt-4.1-mini', label: 'GPT-4.1 Mini (Default)', description: 'Best for page code, components, animations - fast & efficient' },
    { value: 'gpt-4.1', label: 'GPT-4.1', description: 'Premium model for complex reasoning tasks' },
    { value: 'gpt-4o', label: 'GPT-4o', description: 'OpenAI flagship multimodal model' },
    { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash', description: 'Google fast model - good for quick tasks' },
    { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro', description: 'Google premium model for advanced reasoning' },
] as const;

const DEFAULT_SETTINGS: { key: string; category: string; description: string; defaultValue: any; inputType: 'text' | 'number' | 'textarea' | 'password' | 'tags' | 'select'; options?: typeof AI_MODEL_OPTIONS }[] = [
    { key: 'bigmind_ai_model', category: 'magic_ai', description: 'AI model for BigMind chat, page generation, and content enrichment', defaultValue: 'gpt-4.1-mini', inputType: 'select', options: AI_MODEL_OPTIONS },
    { key: 'openai_api_key', category: 'api_keys', description: 'OpenAI API key for AI content generation', defaultValue: '', inputType: 'password' },
    { key: 'seo_min_difficulty', category: 'thresholds', description: 'Minimum keyword difficulty score (0-100)', defaultValue: 20, inputType: 'number' },
    { key: 'seo_max_difficulty', category: 'thresholds', description: 'Maximum keyword difficulty score (0-100)', defaultValue: 60, inputType: 'number' },
    { key: 'magic_page_min_score', category: 'thresholds', description: 'Minimum score for magic page suggestions (0-100)', defaultValue: 50, inputType: 'number' },
    { key: 'magic_page_max_per_run', category: 'thresholds', description: 'Maximum pages to generate per run', defaultValue: 5, inputType: 'number' },
    { key: 'seed_keywords', category: 'seo', description: 'Comma-separated seed keywords for SEO scanning', defaultValue: '', inputType: 'tags' },
    { key: 'excluded_keywords', category: 'seo', description: 'Comma-separated keywords to exclude from scanning', defaultValue: '', inputType: 'tags' },
    { key: 'site_name', category: 'general', description: 'Website name for SEO and branding', defaultValue: 'Andara Ionic', inputType: 'text' },
    { key: 'default_author', category: 'general', description: 'Default author name for generated content', defaultValue: '', inputType: 'text' },
];

type MagicAiSettings = {
    magicPageBasePrompt: string;
};

type MaintenanceReport = {
    id: string;
    timestamp: string;
    summary: {
        passed: number;
        warnings: number;
        errors: number;
        totalChecks: number;
    };
};

// MaintenancePanel Component
function MaintenancePanel() {
    const [isRunning, setIsRunning] = useState(false);
    const [dailyEnabled, setDailyEnabled] = useState(false);
    const [dailyTime, setDailyTime] = useState("03:00");
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const { data: latestReport } = useQuery<MaintenanceReport | null>({
        queryKey: ['/api/admin/maintenance/latest'],
        queryFn: async () => {
            const res = await apiRequest('GET', '/api/admin/maintenance/latest');
            return res.json();
        },
    });

    const { data: settings } = useQuery<Record<string, any>>({
        queryKey: ['/api/admin/maintenance/settings'],
        queryFn: async () => {
            const res = await apiRequest('GET', '/api/admin/maintenance/settings');
            return res.json();
        },
    });

    useEffect(() => {
        if (settings) {
            setDailyEnabled(settings.dailyRunEnabled || false);
            setDailyTime(settings.dailyRunTime || "03:00");
        }
    }, [settings]);

    const handleRunMaintenance = async () => {
        setIsRunning(true);
        try {
            const res = await apiRequest('POST', '/api/admin/maintenance/run');
            const report = await res.json();
            toast({
                title: "Maintenance Check Complete",
                description: `${report.summary.passed}/${report.summary.totalChecks} passed, ${report.summary.warnings} warnings, ${report.summary.errors} errors`,
            });
            queryClient.invalidateQueries({ queryKey: ['/api/admin/maintenance/latest'] });
            queryClient.invalidateQueries({ queryKey: ['/api/admin/maintenance/history'] });
        } catch (error) {
            toast({
                title: "Maintenance Check Failed",
                description: "Failed to run maintenance check",
                variant: "destructive",
            });
        } finally {
            setIsRunning(false);
        }
    };

    const handleToggleDaily = async (enabled: boolean) => {
        setDailyEnabled(enabled);
        try {
            await apiRequest('PUT', '/api/admin/maintenance/settings', {
                key: 'dailyRunEnabled',
                value: enabled,
            });
            toast({
                title: enabled ? "Daily Maintenance Enabled" : "Daily Maintenance Disabled",
                description: enabled ? `Maintenance will run daily at ${dailyTime}` : "Automatic maintenance disabled",
            });
        } catch (error) {
            setDailyEnabled(!enabled);
        }
    };

    const handleTimeChange = async (time: string) => {
        setDailyTime(time);
        try {
            await apiRequest('PUT', '/api/admin/maintenance/settings', {
                key: 'dailyRunTime',
                value: time,
            });
        } catch (error) {
            console.error("Failed to save time:", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-semibold">AI Maintenance Helper</h3>
                    <p className="text-sm text-muted-foreground">
                        Automatically checks code quality, route alignment, and dependencies
                    </p>
                </div>
                <Button
                    onClick={handleRunMaintenance}
                    disabled={isRunning}
                    data-testid="button-run-maintenance"
                >
                    {isRunning ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Running...
                        </>
                    ) : (
                        <>
                            <Play className="w-4 h-4 mr-2" />
                            Run Now
                        </>
                    )}
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-card border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <Label className="text-sm font-medium">Daily Schedule</Label>
                            <p className="text-xs text-muted-foreground">Automatic daily maintenance</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="daily-enabled"
                                checked={dailyEnabled}
                                onCheckedChange={(checked) => handleToggleDaily(checked as boolean)}
                                data-testid="checkbox-daily-enabled"
                            />
                            <Label htmlFor="daily-enabled" className="text-sm">Enable</Label>
                        </div>
                        <Input
                            type="time"
                            value={dailyTime}
                            onChange={(e) => handleTimeChange(e.target.value)}
                            className="w-28"
                            disabled={!dailyEnabled}
                            data-testid="input-daily-time"
                        />
                    </div>
                </div>

                <div className="bg-card border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Database className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <Label className="text-sm font-medium">Codebase Stats</Label>
                            <p className="text-xs text-muted-foreground">Current status</p>
                        </div>
                    </div>
                    {latestReport ? (
                        <div className="flex gap-4 text-sm">
                            <span className="text-green-500">{latestReport.summary.passed} passed</span>
                            <span className="text-amber-500">{latestReport.summary.warnings} warnings</span>
                            <span className="text-red-500">{latestReport.summary.errors} errors</span>
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">No reports yet</p>
                    )}
                </div>
            </div>
        </div>
    );
}

// Main SettingsTab Component
export default function SettingsTab({
    settings,
    onSave,
    isSaving,
    onTabChange,
}: SettingsTabProps) {
    const [activeCategory, setActiveCategory] = useState('magic_ai');
    const [editedValues, setEditedValues] = useState<Record<string, any>>({});
    const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});
    const [magicPrompt, setMagicPrompt] = useState('');
    const [isSavingMagic, setIsSavingMagic] = useState(false);
    const [magicPromptOriginal, setMagicPromptOriginal] = useState('');
    const [enrichmentPrompt, setEnrichmentPrompt] = useState('');
    const [enrichmentPromptOriginal, setEnrichmentPromptOriginal] = useState('');
    const [isSavingEnrichment, setIsSavingEnrichment] = useState(false);
    const queryClient = useQueryClient();

    const { data: magicAiSettings, isLoading: isLoadingMagic } = useQuery<MagicAiSettings>({
        queryKey: ['/api/admin/magic-ai-settings'],
        queryFn: async () => {
            const res = await apiRequest('GET', '/api/admin/magic-ai-settings');
            return res.json();
        },
    });

    const { data: enrichmentSetting, isLoading: isLoadingEnrichment } = useQuery<CmsSetting | null>({
        queryKey: ['/api/admin/settings/ai_enrichment_prompt'],
        queryFn: async () => {
            try {
                const res = await apiRequest('GET', '/api/admin/settings/ai_enrichment_prompt');
                if (!res.ok) return null;
                return res.json();
            } catch {
                return null;
            }
        },
    });

    useEffect(() => {
        if (magicAiSettings) {
            setMagicPrompt(magicAiSettings.magicPageBasePrompt || '');
            setMagicPromptOriginal(magicAiSettings.magicPageBasePrompt || '');
        }
    }, [magicAiSettings]);

    useEffect(() => {
        if (enrichmentSetting) {
            const value = enrichmentSetting.value || '';
            setEnrichmentPrompt(value);
            setEnrichmentPromptOriginal(value);
        }
    }, [enrichmentSetting]);

    const handleSaveMagicPrompt = async () => {
        setIsSavingMagic(true);
        try {
            await apiRequest('PUT', '/api/admin/magic-ai-settings', {
                magicPageBasePrompt: magicPrompt,
            });
            setMagicPromptOriginal(magicPrompt);
            queryClient.invalidateQueries({ queryKey: ['/api/admin/magic-ai-settings'] });
        } catch (error) {
            console.error('Failed to save Magic AI settings:', error);
        } finally {
            setIsSavingMagic(false);
        }
    };

    const handleSaveEnrichmentPrompt = async () => {
        setIsSavingEnrichment(true);
        try {
            await apiRequest('PUT', '/api/admin/settings/ai_enrichment_prompt', {
                value: enrichmentPrompt,
                description: 'AI prompt for enriching page HTML to extract media prompts, SEO, links, and visual config',
                category: 'magic_ai',
            });
            setEnrichmentPromptOriginal(enrichmentPrompt);
            queryClient.invalidateQueries({ queryKey: ['/api/admin/settings/ai_enrichment_prompt'] });
        } catch (error) {
            console.error('Failed to save AI Enrichment prompt:', error);
        } finally {
            setIsSavingEnrichment(false);
        }
    };

    const getSettingValue = (key: string, defaultValue: any) => {
        if (editedValues[key] !== undefined) return editedValues[key];
        const setting = settings.find(s => s.key === key);
        return setting ? setting.value : defaultValue;
    };

    const handleValueChange = (key: string, value: any) => {
        setEditedValues(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async (settingDef: typeof DEFAULT_SETTINGS[0]) => {
        const value = editedValues[settingDef.key] !== undefined
            ? editedValues[settingDef.key]
            : getSettingValue(settingDef.key, settingDef.defaultValue);
        await onSave(settingDef.key, value, settingDef.description, settingDef.category);
        setEditedValues(prev => {
            const next = { ...prev };
            delete next[settingDef.key];
            return next;
        });
    };

    const categorySettings = DEFAULT_SETTINGS.filter(s => s.category === activeCategory);
    const activeCategoryConfig = SETTINGS_CATEGORIES.find(c => c.key === activeCategory);
    const ActiveIcon = activeCategoryConfig?.icon || Settings;

    const renderSettingInput = (settingDef: typeof DEFAULT_SETTINGS[0]) => {
        const value = getSettingValue(settingDef.key, settingDef.defaultValue);
        const hasChanges = editedValues[settingDef.key] !== undefined;

        return (
            <div key={settingDef.key} className="bg-card border rounded-lg p-4" data-testid={`setting-${settingDef.key}`}>
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <Label className="text-sm font-medium">{settingDef.key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</Label>
                        <p className="text-xs text-muted-foreground mt-0.5">{settingDef.description}</p>
                    </div>
                    {hasChanges && (
                        <Button
                            size="sm"
                            onClick={() => handleSave(settingDef)}
                            disabled={isSaving}
                            data-testid={`button-save-setting-${settingDef.key}`}
                        >
                            <Save className="w-3 h-3 mr-1" /> Save
                        </Button>
                    )}
                </div>

                {settingDef.inputType === 'password' ? (
                    <div className="flex gap-2">
                        <Input
                            type={showPassword[settingDef.key] ? 'text' : 'password'}
                            value={value}
                            onChange={(e) => handleValueChange(settingDef.key, e.target.value)}
                            placeholder="Enter API key..."
                            className="font-mono text-sm"
                            data-testid={`input-${settingDef.key}`}
                        />
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setShowPassword(prev => ({ ...prev, [settingDef.key]: !prev[settingDef.key] }))}
                            data-testid={`button-toggle-${settingDef.key}`}
                        >
                            {showPassword[settingDef.key] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                    </div>
                ) : settingDef.inputType === 'number' ? (
                    <Input
                        type="number"
                        value={value}
                        onChange={(e) => handleValueChange(settingDef.key, parseFloat(e.target.value) || 0)}
                        data-testid={`input-${settingDef.key}`}
                    />
                ) : settingDef.inputType === 'tags' ? (
                    <div className="space-y-2">
                        <Textarea
                            value={typeof value === 'string' ? value : (value || []).join(', ')}
                            onChange={(e) => handleValueChange(settingDef.key, e.target.value)}
                            placeholder="Enter comma-separated values..."
                            rows={2}
                            className="text-sm"
                            data-testid={`input-${settingDef.key}`}
                        />
                        {value && (
                            <div className="flex flex-wrap gap-1">
                                {(typeof value === 'string' ? value.split(',') : (value || []))
                                    .map((v: string) => v.trim())
                                    .filter((v: string) => v)
                                    .map((tag: string, i: number) => (
                                        <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                                    ))}
                            </div>
                        )}
                    </div>
                ) : settingDef.inputType === 'textarea' ? (
                    <Textarea
                        value={value}
                        onChange={(e) => handleValueChange(settingDef.key, e.target.value)}
                        rows={3}
                        data-testid={`input-${settingDef.key}`}
                    />
                ) : settingDef.inputType === 'select' && settingDef.options ? (
                    <div className="space-y-2">
                        <Select
                            value={value || settingDef.defaultValue}
                            onValueChange={(v) => handleValueChange(settingDef.key, v)}
                        >
                            <SelectTrigger data-testid={`select-${settingDef.key}`}>
                                <SelectValue placeholder="Select an option..." />
                            </SelectTrigger>
                            <SelectContent>
                                {settingDef.options.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{opt.label}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {settingDef.options.find(o => o.value === (value || settingDef.defaultValue))?.description && (
                            <p className="text-xs text-muted-foreground">
                                {settingDef.options.find(o => o.value === (value || settingDef.defaultValue))?.description}
                            </p>
                        )}
                    </div>
                ) : (
                    <Input
                        type="text"
                        value={value}
                        onChange={(e) => handleValueChange(settingDef.key, e.target.value)}
                        data-testid={`input-${settingDef.key}`}
                    />
                )}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold">Settings</h2>
                <p className="text-sm text-muted-foreground">Configure API keys, thresholds, and CMS options</p>
            </div>

            <div className="flex gap-6">
                <div className="w-48 shrink-0">
                    <nav className="space-y-1">
                        {SETTINGS_CATEGORIES.map(cat => {
                            const Icon = cat.icon;
                            return (
                                <button
                                    key={cat.key}
                                    onClick={() => setActiveCategory(cat.key)}
                                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors text-left ${activeCategory === cat.key
                                        ? 'bg-primary text-primary-foreground'
                                        : 'hover:bg-muted'
                                        }`}
                                    data-testid={`button-category-${cat.key}`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {cat.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <div className="flex-1">
                    <div className="mb-4 flex items-center gap-2">
                        <ActiveIcon className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold">{activeCategoryConfig?.label}</h3>
                        <span className="text-sm text-muted-foreground">— {activeCategoryConfig?.description}</span>
                    </div>

                    <div className="space-y-4">
                        {activeCategory === 'developer' ? (
                            <div className="space-y-4">
                                <div className="bg-card border rounded-lg p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-primary/10 rounded-lg">
                                            <Cpu className="w-8 h-8 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold mb-2">AI Agents</h3>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                View and manage AI agents (SEO, Content, Design, DevOps) with capabilities and task execution.
                                            </p>
                                            <Button
                                                onClick={() => onTabChange?.("ai-agents")}
                                                variant="default"
                                            >
                                                <Cpu className="w-4 h-4 mr-2" />
                                                Open AI Agents
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-card border rounded-lg p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-primary/10 rounded-lg">
                                            <Code className="w-8 h-8 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold mb-2">Function Schematic</h3>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                Complete documentation of all AI functions, services, and API endpoints in the system.
                                            </p>
                                            <div className="flex gap-2">
                                                <Button
                                                    onClick={() => window.open("/function-docs", "_blank")}
                                                    variant="outline"
                                                >
                                                    <Code className="w-4 h-4 mr-2" />
                                                    View Documentation
                                                </Button>
                                                <Button
                                                    onClick={() => onTabChange?.("ai-agents")}
                                                    variant="ghost"
                                                >
                                                    Or view AI Agents →
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : activeCategory === 'maintenance' ? (
                            <MaintenancePanel />
                        ) : activeCategory === 'magic_ai' ? (
                            <div className="space-y-4">
                                <div className="bg-card border rounded-lg p-4" data-testid="setting-magic-ai-prompt">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <Label className="text-sm font-medium">Magic Page System Prompt</Label>
                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                Base instructions for AI when generating Magic Page content. This prompt guides the tone, style, and approach for all AI-generated pages.
                                            </p>
                                        </div>
                                        {magicPrompt !== magicPromptOriginal && (
                                            <Button
                                                size="sm"
                                                onClick={handleSaveMagicPrompt}
                                                disabled={isSavingMagic}
                                                data-testid="button-save-magic-prompt"
                                            >
                                                {isSavingMagic ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Save className="w-3 h-3 mr-1" />}
                                                Save
                                            </Button>
                                        )}
                                    </div>
                                    {isLoadingMagic ? (
                                        <div className="flex items-center justify-center py-8">
                                            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                                        </div>
                                    ) : (
                                        <Textarea
                                            value={magicPrompt}
                                            onChange={(e) => setMagicPrompt(e.target.value)}
                                            placeholder="Enter the system prompt that will guide AI content generation...

Example:
You are an expert content writer for Andara Ionic, a company specializing in primordial ionic sulfate minerals. Write educational, science-backed content that is accessible to general audiences while maintaining scientific accuracy. Use a warm, conversational tone that builds trust..."
                                            rows={12}
                                            className="font-mono text-sm"
                                            data-testid="input-magic-ai-prompt"
                                        />
                                    )}
                                    <p className="text-xs text-muted-foreground mt-2">
                                        {magicPrompt.length} characters
                                    </p>
                                </div>

                                {magicPrompt !== magicPromptOriginal && (
                                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                                        <p className="text-sm text-amber-800">
                                            You have unsaved changes to the Magic Page prompt.
                                        </p>
                                    </div>
                                )}

                                <div className="bg-card border rounded-lg p-4" data-testid="setting-ai-enrichment-prompt">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <Label className="text-sm font-medium">AIEnrichment / Startup Prompt</Label>
                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                Instructions for AI when analyzing page HTML to extract media prompts, SEO suggestions, internal links, and visual configuration.
                                            </p>
                                        </div>
                                        {enrichmentPrompt !== enrichmentPromptOriginal && (
                                            <Button
                                                size="sm"
                                                onClick={handleSaveEnrichmentPrompt}
                                                disabled={isSavingEnrichment}
                                                data-testid="button-save-enrichment-prompt"
                                            >
                                                {isSavingEnrichment ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Save className="w-3 h-3 mr-1" />}
                                                Save
                                            </Button>
                                        )}
                                    </div>
                                    {isLoadingEnrichment ? (
                                        <div className="flex items-center justify-center py-8">
                                            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                                        </div>
                                    ) : (
                                        <Textarea
                                            value={enrichmentPrompt}
                                            onChange={(e) => setEnrichmentPrompt(e.target.value)}
                                            placeholder="Enter the AI enrichment prompt that will guide HTML analysis...

Example:
You are an AI assistant that parses HTML markup. Your task is to analyze the HTML and extract image prompts, video prompts, layout specs, animation specs, SEO suggestions, internal link suggestions, and visual config.

Return a JSON object with: imagePrompts, videoPrompts, layoutSpecs, animationSpecs, suggestedSeo, suggestedLinks, components, visualConfig..."
                                            rows={12}
                                            className="font-mono text-sm"
                                            data-testid="input-ai-enrichment-prompt"
                                        />
                                    )}
                                    <p className="text-xs text-muted-foreground mt-2">
                                        {enrichmentPrompt.length} characters {!enrichmentPrompt && '(using default prompt)'}
                                    </p>
                                </div>

                                {enrichmentPrompt !== enrichmentPromptOriginal && (
                                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                                        <p className="text-sm text-amber-800">
                                            You have unsaved changes to the AI Enrichment prompt.
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : categorySettings.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                No settings in this category
                            </div>
                        ) : (
                            categorySettings.map(renderSettingInput)
                        )}
                    </div>

                    {Object.keys(editedValues).some(k => DEFAULT_SETTINGS.find(s => s.key === k)?.category === activeCategory) && (
                        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                            <p className="text-sm text-amber-800">
                                You have unsaved changes. Click Save on each setting to apply.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
