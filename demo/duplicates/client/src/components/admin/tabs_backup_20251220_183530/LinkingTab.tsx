import React, { useState } from "react";
import {
    Link,
    Plus,
    Trash,
    Edit,
    ExternalLink,
    ChevronRight,
    RefreshCw,
    Loader2,
    Settings,
    GitBranch,
    Zap,
    CheckCircle,
    AlertCircle,
    Hash,
    ArrowUpRight,
    Eye,
    EyeOff,
    Target,
    Save,
    Wand2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { AuditHighlight } from '@/components/admin/audit-highlight';
import type { LinkingRule, CtaTemplate, Cluster, Page } from "@/types/admin";
import { LINKING_RULE_TYPE_CONFIG, CTA_POSITION_CONFIG } from "@/types/admin";

interface LinkingTabProps {
    linkingRules: LinkingRule[];
    ctaTemplates: CtaTemplate[];
    clusters: Cluster[];
    pages: Page[];
    // Handlers that take data directly
    onSaveRule: (data: Omit<LinkingRule, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    onUpdateRule: (id: string, data: Partial<LinkingRule>) => Promise<void>;
    onDeleteRule: (id: string) => Promise<void>;
    onToggleRuleActive: (id: string, active: boolean) => Promise<void>;

    onSaveCta: (data: Omit<CtaTemplate, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    onUpdateCta: (id: string, data: Partial<CtaTemplate>) => Promise<void>;
    onDeleteCta: (id: string) => Promise<void>;
    onToggleCtaActive: (id: string, active: boolean) => Promise<void>;

    onAutoGenerate: () => Promise<void>;
    isAutoGenerating: boolean;
}

export default function LinkingTab({
    linkingRules,
    ctaTemplates,
    clusters,
    pages,
    onSaveRule,
    onUpdateRule,
    onDeleteRule,
    onToggleRuleActive,
    onSaveCta,
    onUpdateCta,
    onDeleteCta,
    onToggleCtaActive,
    onAutoGenerate,
    isAutoGenerating,
}: LinkingTabProps) {
    const [activeSubTab, setActiveSubTab] = useState<'rules' | 'ctas'>('rules');

    // Modal State
    const [isRuleEditorOpen, setIsRuleEditorOpen] = useState(false);
    const [isCtaEditorOpen, setIsCtaEditorOpen] = useState(false);
    const [editingRule, setEditingRule] = useState<LinkingRule | null>(null);
    const [editingCta, setEditingCta] = useState<CtaTemplate | null>(null);

    // Forms
    const [ruleForm, setRuleForm] = useState({
        name: '',
        ruleType: 'keyword_match' as LinkingRule['ruleType'],
        triggerPattern: '',
        targetPagePath: '',
        anchorText: '',
        priority: 5,
        maxOccurrences: 1,
        isActive: true,
    });

    const [ctaForm, setCtaForm] = useState({
        name: '',
        slug: '',
        headline: '',
        description: '',
        buttonText: 'Learn More',
        buttonLink: '',
        productSlug: '',
        position: 'mid_content' as CtaTemplate['position'],
        triggerClustersText: '',
        triggerKeywordsText: '',
        priority: 5,
        isActive: true,
    });

    // Helper: Flatten page tree for dropdown
    const flattenPages = (pageList: Page[], level = 0): { page: Page; level: number }[] => {
        const result: { page: Page; level: number }[] = [];
        for (const p of pageList) {
            result.push({ page: p, level });
            if (p.children && p.children.length > 0) {
                result.push(...flattenPages(p.children, level + 1));
            }
        }
        return result;
    };
    const flatPages = flattenPages(pages);

    // Handlers
    const handleOpenRuleEditor = (rule?: LinkingRule) => {
        if (rule) {
            setEditingRule(rule);
            setRuleForm({
                name: rule.name,
                ruleType: rule.ruleType,
                triggerPattern: rule.triggerPattern,
                targetPagePath: rule.targetPagePath,
                anchorText: rule.anchorText || '',
                priority: rule.priority,
                maxOccurrences: rule.maxOccurrences,
                isActive: rule.isActive,
            });
        } else {
            setEditingRule(null);
            setRuleForm({
                name: '',
                ruleType: 'keyword_match',
                triggerPattern: '',
                targetPagePath: '',
                anchorText: '',
                priority: 5,
                maxOccurrences: 1,
                isActive: true,
            });
        }
        setIsRuleEditorOpen(true);
    };

    const handleOpenCtaEditor = (cta?: CtaTemplate) => {
        if (cta) {
            setEditingCta(cta);
            setCtaForm({
                name: cta.name,
                slug: cta.slug,
                headline: cta.headline,
                description: cta.description || '',
                buttonText: cta.buttonText,
                buttonLink: cta.buttonLink || '',
                productSlug: cta.productSlug || '',
                position: cta.position,
                triggerClustersText: cta.triggerClusters.join(', '),
                triggerKeywordsText: cta.triggerKeywords.join(', '),
                priority: cta.priority,
                isActive: cta.isActive,
            });
        } else {
            setEditingCta(null);
            setCtaForm({
                name: '',
                slug: '',
                headline: '',
                description: '',
                buttonText: 'Learn More',
                buttonLink: '',
                productSlug: '',
                position: 'mid_content',
                triggerClustersText: '',
                triggerKeywordsText: '',
                priority: 5,
                isActive: true,
            });
        }
        setIsCtaEditorOpen(true);
    };

    const handleSubmitRule = async () => {
        const data = {
            ...ruleForm,
            anchorText: ruleForm.anchorText || null,
            metadata: {},
        };
        if (editingRule) {
            await onUpdateRule(editingRule.id, data);
        } else {
            await onSaveRule(data);
        }
        setIsRuleEditorOpen(false);
    };

    const handleSubmitCta = async () => {
        const data = {
            name: ctaForm.name,
            slug: ctaForm.slug,
            headline: ctaForm.headline,
            description: ctaForm.description || null,
            buttonText: ctaForm.buttonText,
            buttonLink: ctaForm.buttonLink || null,
            productSlug: ctaForm.productSlug || null,
            position: ctaForm.position,
            triggerClusters: ctaForm.triggerClustersText.split(',').map(s => s.trim()).filter(Boolean),
            triggerKeywords: ctaForm.triggerKeywordsText.split(',').map(s => s.trim()).filter(Boolean),
            priority: ctaForm.priority,
            isActive: ctaForm.isActive,
            styling: {},
        };
        if (editingCta) {
            await onUpdateCta(editingCta.id, data);
        } else {
            await onSaveCta(data);
        }
        setIsCtaEditorOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">Internal Linking & CTAs</h2>
                    <p className="text-sm text-muted-foreground">Manage automated links and call-to-actions across your site</p>
                </div>
                <div className="flex gap-2">
                    <AuditHighlight reason="AI generation may create incorrect links. Review usage." confidence="medium">
                        <Button variant="outline" onClick={onAutoGenerate} disabled={isAutoGenerating}>
                            {isAutoGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
                            Auto-Generate Rules
                        </Button>
                    </AuditHighlight>
                </div>
            </div>

            <div className="flex gap-2 border-b pb-2">
                <Button
                    variant={activeSubTab === 'rules' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveSubTab('rules')}
                >
                    <Link className="w-4 h-4 mr-2" />
                    Linking Rules ({linkingRules.length})
                </Button>
                <Button
                    variant={activeSubTab === 'ctas' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveSubTab('ctas')}
                >
                    <Target className="w-4 h-4 mr-2" />
                    CTA Templates ({ctaTemplates.length})
                </Button>
            </div>

            {activeSubTab === 'rules' ? (
                <div className="space-y-4">
                    <div className="flex justify-end">
                        <Button size="sm" onClick={() => handleOpenRuleEditor()}>
                            <Plus className="w-4 h-4 mr-2" /> Add Rule
                        </Button>
                    </div>

                    {linkingRules.length === 0 ? (
                        <div className="text-center py-12 border border-dashed rounded-xl bg-muted/10">
                            <Link className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                            <p className="text-muted-foreground">No linking rules defined yet.</p>
                            <Button onClick={() => handleOpenRuleEditor()} variant="outline" className="mt-4">
                                <Plus className="w-4 h-4 mr-2" /> Add First Rule
                            </Button>
                        </div>
                    ) : (
                        <div className="grid gap-3">
                            {linkingRules.map(rule => {
                                const typeConfig = LINKING_RULE_TYPE_CONFIG[rule.ruleType] || { label: rule.ruleType, color: 'bg-slate-100 text-slate-700' };
                                return (
                                    <div key={rule.id} className={`bg-card border rounded-lg p-4 ${!rule.isActive ? 'opacity-60' : ''}`}>
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h4 className="font-semibold">{rule.name}</h4>
                                                    <Badge className={cn("text-xs", typeConfig.color)}>{typeConfig.label}</Badge>
                                                    {!rule.isActive && <Badge variant="secondary" className="text-xs">Inactive</Badge>}
                                                </div>
                                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                                                    <div><span className="text-muted-foreground">Trigger:</span> <code className="bg-muted px-1 rounded">{rule.triggerPattern}</code></div>
                                                    <div><span className="text-muted-foreground">Target:</span> <code className="bg-muted px-1 rounded">{rule.targetPagePath}</code></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => onToggleRuleActive(rule.id, !rule.isActive)}
                                                    title={rule.isActive ? 'Deactivate' : 'Activate'}
                                                >
                                                    {rule.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleOpenRuleEditor(rule)}>
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => {
                                                        if (confirm('Delete this linking rule?')) onDeleteRule(rule.id);
                                                    }}
                                                >
                                                    <Trash className="w-4 h-4 text-destructive" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex justify-end">
                        <Button size="sm" onClick={() => handleOpenCtaEditor()}>
                            <Plus className="w-4 h-4 mr-2" /> Add CTA Template
                        </Button>
                    </div>

                    {ctaTemplates.length === 0 ? (
                        <div className="text-center py-12 border border-dashed rounded-xl bg-muted/10">
                            <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                            <p className="text-muted-foreground">No CTA templates defined yet.</p>
                            <Button onClick={() => handleOpenCtaEditor()} variant="outline" className="mt-4">
                                <Plus className="w-4 h-4 mr-2" /> Add First CTA
                            </Button>
                        </div>
                    ) : (
                        <div className="grid gap-3">
                            {ctaTemplates.map(cta => {
                                const posConfig = CTA_POSITION_CONFIG[cta.position] || { label: cta.position };
                                return (
                                    <div key={cta.id} className={`bg-card border rounded-lg p-4 ${!cta.isActive ? 'opacity-60' : ''}`}>
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h4 className="font-semibold">{cta.name}</h4>
                                                    <Badge variant="outline" className="text-xs">{posConfig.label}</Badge>
                                                    {!cta.isActive && <Badge variant="secondary" className="text-xs">Inactive</Badge>}
                                                </div>
                                                <p className="text-sm font-medium">{cta.headline}</p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => onToggleCtaActive(cta.id, !cta.isActive)}
                                                >
                                                    {cta.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleOpenCtaEditor(cta)}>
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => {
                                                        if (confirm('Delete this CTA?')) onDeleteCta(cta.id);
                                                    }}
                                                >
                                                    <Trash className="w-4 h-4 text-destructive" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* Rule Editor Modal */}
            <Dialog open={isRuleEditorOpen} onOpenChange={setIsRuleEditorOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{editingRule ? 'Edit Linking Rule' : 'Create Linking Rule'}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Rule Name *</Label>
                            <Input
                                value={ruleForm.name}
                                onChange={(e) => setRuleForm(p => ({ ...p, name: e.target.value }))}
                                placeholder="e.g., Link to Water Science Overview"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Rule Type</Label>
                                <Select value={ruleForm.ruleType} onValueChange={(v) => setRuleForm(p => ({ ...p, ruleType: v as LinkingRule['ruleType'] }))}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="keyword_match">Keyword Match</SelectItem>
                                        <SelectItem value="cluster_based">Cluster Based</SelectItem>
                                        <SelectItem value="page_type">Page Type</SelectItem>
                                        <SelectItem value="manual">Manual</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Priority (1-10)</Label>
                                <Input
                                    type="number"
                                    min={1}
                                    max={10}
                                    value={ruleForm.priority}
                                    onChange={(e) => setRuleForm(p => ({ ...p, priority: parseInt(e.target.value) || 5 }))}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Trigger Pattern *</Label>
                            <Input
                                value={ruleForm.triggerPattern}
                                onChange={(e) => setRuleForm(p => ({ ...p, triggerPattern: e.target.value }))}
                                placeholder="e.g., structured water"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Target Page Path *</Label>
                            <Select value={ruleForm.targetPagePath} onValueChange={(v) => setRuleForm(p => ({ ...p, targetPagePath: v }))}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select target page" />
                                </SelectTrigger>
                                <SelectContent>
                                    {flatPages.map(({ page, level }) => (
                                        <SelectItem key={page.path} value={page.path}>
                                            {'  '.repeat(level)}{page.title} ({page.path})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Anchor Text (optional)</Label>
                                <Input
                                    value={ruleForm.anchorText}
                                    onChange={(e) => setRuleForm(p => ({ ...p, anchorText: e.target.value }))}
                                    placeholder="Override matched text"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Max Occurrences</Label>
                                <Input
                                    type="number"
                                    min={1}
                                    max={10}
                                    value={ruleForm.maxOccurrences}
                                    onChange={(e) => setRuleForm(p => ({ ...p, maxOccurrences: parseInt(e.target.value) || 1 }))}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-4 border-t">
                            <Button variant="outline" onClick={() => setIsRuleEditorOpen(false)}>Cancel</Button>
                            <Button onClick={handleSubmitRule}>
                                <Save className="w-4 h-4 mr-2" /> {editingRule ? 'Update' : 'Create'} Rule
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* CTA Editor Modal */}
            <Dialog open={isCtaEditorOpen} onOpenChange={setIsCtaEditorOpen}>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingCta ? 'Edit CTA Template' : 'Create CTA Template'}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Template Name *</Label>
                                <Input
                                    value={ctaForm.name}
                                    onChange={(e) => setCtaForm(p => ({ ...p, name: e.target.value }))}
                                    placeholder="e.g., Product Promo"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Slug *</Label>
                                <Input
                                    value={ctaForm.slug}
                                    onChange={(e) => setCtaForm(p => ({ ...p, slug: e.target.value }))}
                                    placeholder="product-promo"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Headline *</Label>
                            <Input
                                value={ctaForm.headline}
                                onChange={(e) => setCtaForm(p => ({ ...p, headline: e.target.value }))}
                                placeholder="Ready to experience the difference?"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Button Text</Label>
                            <Input
                                value={ctaForm.buttonText}
                                onChange={(e) => setCtaForm(p => ({ ...p, buttonText: e.target.value }))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Button Link</Label>
                            <Input
                                value={ctaForm.buttonLink}
                                onChange={(e) => setCtaForm(p => ({ ...p, buttonLink: e.target.value }))}
                            />
                        </div>
                        <div className="flex justify-end gap-2 pt-4 border-t">
                            <Button variant="outline" onClick={() => setIsCtaEditorOpen(false)}>Cancel</Button>
                            <Button onClick={handleSubmitCta}>
                                <Save className="w-4 h-4 mr-2" /> {editingCta ? 'Update' : 'Create'} CTA
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
