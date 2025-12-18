
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest, getAuthToken, getAuthHeaders } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

// Icons
import {
    Edit, Save, Trash, Plus, ChevronRight, ChevronDown, FileText, RefreshCw, Eye, X,
    Link, Upload, Youtube, ClipboardPaste, CheckCircle, Clock, Loader2,
    Target, TrendingUp, Zap, ArrowUpRight, Wand2, Sparkles, FileCheck, XCircle, Play, Send,
    Code2, Palette, Film, Image as ImageIcon, VideoIcon, FileTextIcon, History, Globe, Download, Mic,
    User, Paperclip, FileType, Search, Brain, Lightbulb
} from "lucide-react";

// Components
import RichTextEditor from "@/components/rich-text-editor";
import { PageContentPreview } from "@/components/page-content-preview";
import { SingleMotionPreview, MOTION_ARCHETYPES } from "@/components/motion-library-preview";
import { SeoCopilotButton } from "@/components/admin/SeoCopilotButton";

// Types
import {
    Page, Cluster, PageFormData, VisualConfig, AI_MODEL_OPTIONS
} from "@/types/admin";

// Constants
import { PAGE_TYPES, PAGE_TEMPLATES, PAGE_STATUSES } from "@/constants/admin";

// Helpers
import {
    formatAiMessage, extractAllFromAiResponse, extractImagePromptsFromAiResponse, parseVisualConfigFromContent,
    EnhancementTask, ExtractedVisualConfig, ExtractedAiData
} from "@/utils/admin-ai-helpers";

// Local helper functions
const generateKeyFromTitle = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
};

const generatePathFromTitle = (title: string) => {
    return '/' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
};

export default function PageEditorModal({
    page,
    pages,
    clusters,
    isOpen,
    onClose,
    onSave,
    onDelete,
    isNew = false
}: {
    page: Page | null;
    pages: Page[];
    clusters: Cluster[];
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: PageFormData, isNew: boolean) => void;
    onDelete?: (id: string) => void;
    isNew?: boolean;
}) {
    const { toast } = useToast();
    const defaultVisualConfig: VisualConfig = {
        pageId: '',
        cluster: '',
        priority: 'P2',
        vibeKeywords: [],
        emotionalTone: [],
        animationIdeas: [],
        aiImagePrompt: '',
        aiVideoPrompt: '',
        designerNotes: '',
    };

    const [formData, setFormData] = useState<PageFormData>({
        key: '',
        title: '',
        path: '',
        pageType: 'page',
        template: 'article',
        clusterKey: null,
        parentKey: null,
        priority: 5,
        status: 'draft',
        summary: null,
        content: null,
        seoFocus: null,
        seoTitle: null,
        seoDescription: null,
        featuredImage: null,
        icon: null,
        visualConfig: null,
        aiStartupHtml: null,
        aiEnrichment: null,
    });

    const [isSaving, setIsSaving] = useState(false);
    const [isEnriching, setIsEnriching] = useState(false);
    const [isIntegrating, setIsIntegrating] = useState(false);
    const [enrichmentSteps, setEnrichmentSteps] = useState({
        imagePrompts: true,
        videoPrompts: true,
        layoutSpecs: true,
        motionSpecs: true,
        animationSpecs: true,
        suggestedSeo: true,
        suggestedLinks: true,
        components: true,
        visualConfig: true,
    });
    const [isSavingHtml, setIsSavingHtml] = useState(false);
    const [htmlSaveLogOpen, setHtmlSaveLogOpen] = useState(false);
    const [htmlSaveLog, setHtmlSaveLog] = useState<Array<{ task: string; status: 'pending' | 'success' | 'error'; timestamp: Date }>>([]);
    const [rawHtmlMode, setRawHtmlMode] = useState(false);
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);
    const [generatedImagePreview, setGeneratedImagePreview] = useState<{ url: string; filePath: string } | null>(null);
    const [isGeneratingFeaturedImage, setIsGeneratingFeaturedImage] = useState(false);
    const [featuredImagePrompt, setFeaturedImagePrompt] = useState('');
    const [featuredImagePreview, setFeaturedImagePreview] = useState<{ url: string; filePath: string } | null>(null);
    const [mediaGalleryOpen, setMediaGalleryOpen] = useState(false);
    const [generatingAssetId, setGeneratingAssetId] = useState<string | null>(null);
    const [isGeneratingContent, setIsGeneratingContent] = useState(false);
    const queryClient = useQueryClient();

    type PageMediaAsset = {
        id: string;
        pageKey: string;
        slotKey: string;
        slotType: string;
        prompt: string;
        status: string;
        generatedUrl: string | null;
        generatorModel: string | null;
        metadata: Record<string, unknown> | null;
        generatedAt: string | null;
        createdAt: string;
        updatedAt: string;
    };

    const { data: mediaAssets, refetch: refetchMediaAssets } = useQuery<PageMediaAsset[]>({
        queryKey: ['/api/admin/page-media', formData.key],
        queryFn: async () => {
            if (!formData.key) return [];
            const res = await apiRequest('GET', `/api/admin/page-media/${formData.key}`);
            return res.json();
        },
        enabled: !!formData.key && mediaGalleryOpen,
    });

    const handleGenerateMediaAsset = async (asset: PageMediaAsset) => {
        setGeneratingAssetId(asset.id);
        try {
            await apiRequest('PUT', `/api/admin/page-media/${asset.id}`, { status: 'generating' });

            const res = await fetch('/api/admin/generate-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                body: JSON.stringify({ prompt: asset.prompt }),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Generation failed');

            await apiRequest('PUT', `/api/admin/page-media/${asset.id}`, {
                status: 'generated',
                generatedUrl: data.publicUrl,
                generatorModel: 'imagen-3.0-generate-002'
            });

            if (formData.aiStartupHtml && data.publicUrl) {
                const slotPatterns = [
                    new RegExp(`<div[^>]*data-ai-slot="${asset.slotKey}"[^>]*>[\\s\\S]*?<\\/div>`, 'gi'),
                    new RegExp(`<div[^>]*class="[^"]*ai-image-placeholder[^"]*"[^>]*data-slot="${asset.slotKey}"[^>]*>[\\s\\S]*?<\\/div>`, 'gi'),
                    new RegExp(`<!-- AI LAYOUT PROMPT.*?${asset.slotKey}.*?-->\\s*<div[^>]*class="[^"]*placeholder[^"]*"[^>]*>[\\s\\S]*?<\\/div>`, 'gi'),
                ];

                let updatedHtml = formData.aiStartupHtml;
                const imgTag = `<img src="${data.publicUrl}" alt="${asset.slotKey}" class="w-full h-auto rounded-lg object-cover" data-generated-slot="${asset.slotKey}" />`;

                for (const pattern of slotPatterns) {
                    if (pattern.test(updatedHtml)) {
                        updatedHtml = updatedHtml.replace(pattern, imgTag);
                        break;
                    }
                }

                if (updatedHtml !== formData.aiStartupHtml) {
                    setFormData(prev => ({ ...prev, aiStartupHtml: updatedHtml }));
                }
            }

            refetchMediaAssets();
            toast({ title: "Generated!", description: `Image for "${asset.slotKey}" is ready` });
        } catch (err: any) {
            await apiRequest('PUT', `/api/admin/page-media/${asset.id}`, { status: 'failed' });
            toast({ title: "Error", description: err.message, variant: "destructive" });
            refetchMediaAssets();
        } finally {
            setGeneratingAssetId(null);
        }
    };

    const handleGenerateFeaturedImage = async () => {
        if (!featuredImagePrompt.trim()) {
            toast({ title: "Error", description: "Please enter an image prompt first", variant: "destructive" });
            return;
        }

        setIsGeneratingFeaturedImage(true);
        try {
            const res = await fetch('/api/admin/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeaders()
                },
                body: JSON.stringify({ prompt: featuredImagePrompt.trim() }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to generate image');
            }

            setFeaturedImagePreview({ url: data.publicUrl, filePath: data.filePath });
            toast({ title: "Success", description: "Featured image generated! Click 'Use This' to set it." });
        } catch (err: any) {
            toast({ title: "Error", description: err.message, variant: "destructive" });
        } finally {
            setIsGeneratingFeaturedImage(false);
        }
    };

    const handleGenerateImage = async () => {
        const prompt = formData.visualConfig?.aiImagePrompt;
        if (!prompt?.trim()) {
            toast({ title: "Error", description: "Please enter an image prompt first", variant: "destructive" });
            return;
        }

        setIsGeneratingImage(true);
        try {
            const res = await fetch('/api/admin/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeaders()
                },
                body: JSON.stringify({ prompt: prompt.trim() }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to generate image');
            }

            setGeneratedImagePreview({ url: data.publicUrl, filePath: data.filePath });
            toast({ title: "Success", description: "Image generated! Click 'Insert' to add it to the page." });
        } catch (err: any) {
            toast({ title: "Error", description: err.message, variant: "destructive" });
        } finally {
            setIsGeneratingImage(false);
        }
    };

    const handleInsertGeneratedImage = () => {
        if (!generatedImagePreview) return;

        const altText = formData.visualConfig?.aiImagePrompt?.slice(0, 100) || 'Generated image';
        const imgTag = `<img src="${generatedImagePreview.url}" alt="${altText}" class="andara-hero__image" style="width: 100%; height: auto; border-radius: 12px;" />`;

        if (rawHtmlMode && formData.content) {
            const placeholderRegex = /\[(?:Hero visual|Visual|Image|Diagram|Figure)[^\]]*\]/gi;
            const updatedContent = formData.content.replace(placeholderRegex, imgTag);
            if (updatedContent !== formData.content) {
                setFormData(prev => ({ ...prev, content: updatedContent }));
            } else {
                setFormData(prev => ({ ...prev, content: (prev.content || '') + '\n' + imgTag }));
            }
        } else {
            setFormData(prev => ({ ...prev, featuredImage: generatedImagePreview.url }));
        }
        toast({ title: "Inserted", description: "Image added to page content" });
    };

    // Generate page HTML content using BigMind AI
    const handleGeneratePageHTML = async () => {
        if (!formData.title.trim()) {
            toast({
                title: "Title Required",
                description: "Please enter a page title before generating content",
                variant: "destructive"
            });
            return;
        }

        setIsGeneratingContent(true);
        try {
            // Determine zone based on cluster or page type
            let zone = 2; // Default to Science/Education zone
            if (formData.clusterKey === 'shop' || formData.pageType === 'product') {
                zone = 1; // Product/Shop zone
            } else if (formData.clusterKey === 'about' || formData.clusterKey === 'trust_lab' || formData.pageType === 'blog_post') {
                zone = 3; // Brand/Story zone
            }

            // Build the generation prompt
            const generatePrompt = `Generate complete, SEO-optimized HTML content for a page.

                                      Page Details:
                                      - Title: "${formData.title}"
                                      - Path: "${formData.path || '/placeholder'}"
                                      - Cluster: "${formData.clusterKey || 'general'}"
                                      - Zone: ${zone}
                                      - Template: "${formData.template || 'article'}"
                                      - SEO Focus Keyword: "${formData.seoFocus || formData.title}"
                                      ${formData.summary ? `- Summary/Brief: "${formData.summary}"` : ''}

                                      Requirements:
                                      1. Generate complete HTML with Andara CSS classes
                                      2. Include visual-config block with VIBE KEYWORDS, EMOTIONAL TONE, MOTION PRESET
                                      3. Follow the SEO QA Scoring Rubric (85+ score target)
                                      4. Include H1, key takeaways, proper heading hierarchy
                                      5. Add appropriate section structure for the template type
                                      6. Include AI image prompts as comments for visual placeholders

                                      Output only the HTML content wrapped in a code block.`;

            const response = await fetch('/api/admin/bigmind/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeaders()
                },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: generatePrompt }],
                    context: {
                        currentPageTitle: formData.title,
                        currentPagePath: formData.path,
                        currentPageSeoFocus: formData.seoFocus || formData.title,
                        objective: 'generate page content'
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to generate content');
            }

            const data = await response.json();

            // Extract HTML from response - handle code blocks
            let generatedHtml = data.response || '';

            // Check for code block markers and extract HTML
            const htmlMatch = generatedHtml.match(/```(?:html)?\s*([\s\S]*?)```/);
            if (htmlMatch) {
                generatedHtml = htmlMatch[1].trim();
            }

            if (generatedHtml) {
                setFormData(prev => ({ ...prev, content: generatedHtml }));
                setRawHtmlMode(true); // Switch to raw HTML mode to show the generated content
                toast({
                    title: "Content Generated!",
                    description: "AI-generated HTML has been added to the content field. Click 'Interpret Content' to auto-fill form fields."
                });
            } else {
                toast({
                    title: "Generation Issue",
                    description: "No content was generated. Try adjusting the page title or summary.",
                    variant: "destructive"
                });
            }
        } catch (err: any) {
            console.error('Generate content error:', err);
            toast({
                title: "Generation Failed",
                description: err.message || 'Failed to generate page content',
                variant: "destructive"
            });
        } finally {
            setIsGeneratingContent(false);
        }
    };

    useEffect(() => {
        if (page && !isNew) {
            const pageContent = page.content || (page as any).aiStartupHtml || null;
            const chatHistory = (page as any).aiChatHistory;
            setFormData({
                key: page.key,
                title: page.title,
                path: page.path,
                pageType: page.pageType,
                template: page.template,
                clusterKey: page.clusterKey,
                parentKey: page.parentKey,
                priority: page.priority,
                status: page.status,
                summary: page.summary,
                content: pageContent,
                seoFocus: page.seoFocus,
                seoTitle: (page as any).seoTitle || null,
                seoDescription: (page as any).seoDescription || null,
                featuredImage: (page as any).featuredImage || null,
                icon: (page as any).icon || null,
                visualConfig: page.visualConfig || null,
                aiStartupHtml: (page as any).aiStartupHtml || null,
                aiEnrichment: (page as any).aiEnrichment || null,
                // Load chat history from page
                aiChatMessages: chatHistory?.messages || [],
                selectedAiModel: chatHistory?.lastModel || 'gemini-2.0-flash',
            } as any);
        } else if (isNew) {
            setFormData({
                key: '',
                title: '',
                path: '',
                pageType: 'page',
                template: 'article',
                clusterKey: null,
                parentKey: null,
                priority: 5,
                status: 'draft',
                summary: null,
                content: null,
                seoFocus: null,
                seoTitle: null,
                seoDescription: null,
                featuredImage: null,
                icon: null,
                visualConfig: null,
                aiStartupHtml: null,
                aiEnrichment: null,
                // Empty chat history for new pages
                aiChatMessages: [],
                selectedAiModel: 'gemini-2.0-flash',
            } as any);
        }
    }, [page, isNew, isOpen]);

    // Listen for Apply buttons clicked in AI chat
    useEffect(() => {
        const handleApplySuggestion = (event: CustomEvent<{ field: string; value: string }>) => {
            const { field, value } = event.detail;

            // Decode HTML entities
            const decodedValue = value
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&');

            // Update the appropriate field
            setFormData(prev => ({
                ...prev,
                [field]: decodedValue,
            }));

            const fieldLabels: Record<string, string> = {
                seoTitle: 'SEO Title',
                seoDescription: 'Meta Description',
                seoFocus: 'Focus Keyword',
                title: 'Page Title',
                summary: 'Summary',
                content: 'Content',
                featuredImage: 'Featured Image',
                motionPreset: 'Motion Preset',
            };

            toast({
                title: "Applied!",
                description: `${fieldLabels[field] || field} has been updated.`,
            });
        };

        window.addEventListener('applyAiSuggestion', handleApplySuggestion as EventListener);
        return () => window.removeEventListener('applyAiSuggestion', handleApplySuggestion as EventListener);
    }, [toast]);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const savedPage = await onSave(formData, isNew);
            toast({
                title: isNew ? "Page created" : "Changes saved",
                description: isNew ? "Your new page has been created successfully." : "Your changes have been saved.",
            });
            onClose();
        } catch (error) {
            console.error('Failed to save page:', error);
            toast({
                title: "Error saving",
                description: error instanceof Error ? error.message : "Failed to save page. Check console for details.",
                variant: "destructive",
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!page || !onDelete) return;
        if (confirm('Are you sure you want to delete this page? This cannot be undone.')) {
            try {
                await onDelete(page.id);
                onClose();
            } catch (error) {
                console.error('Failed to delete page:', error);
            }
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-white/10">
                <DialogHeader className="flex flex-row items-center justify-between border-b border-white/10 pb-4">
                    <DialogTitle className="flex items-center gap-2 text-white">
                        <FileText className="w-5 h-5" />
                        {isNew ? 'Create New Page' : `Edit: ${page?.title}`}
                    </DialogTitle>
                    {!isNew && formData.path && (
                        <a
                            href={formData.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                            data-testid="link-view-page"
                        >
                            <ArrowUpRight className="w-4 h-4" />
                            View Page
                        </a>
                    )}
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title" variant="dark">Title *</Label>
                            <Input
                                id="title"
                                variant="dark"
                                value={formData.title}
                                onChange={(e) => {
                                    const title = e.target.value;
                                    setFormData(prev => ({
                                        ...prev,
                                        title,
                                        key: isNew && !prev.key ? generateKeyFromTitle(title) : prev.key,
                                        path: isNew && prev.path === '' ? generatePathFromTitle(title) : prev.path,
                                    }));
                                }}
                                placeholder="Page Title"
                                required
                                data-testid="input-page-title"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="key" variant="dark">Key *</Label>
                            <Input
                                id="key"
                                variant="dark"
                                value={formData.key}
                                onChange={(e) => setFormData(prev => ({ ...prev, key: e.target.value }))}
                                placeholder="unique_page_key"
                                required
                                data-testid="input-page-key"
                            />
                            <p className="text-xs text-gray-400">Unique identifier for this page</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="path" variant="dark">URL Path *</Label>
                        <Input
                            id="path"
                            variant="dark"
                            value={formData.path}
                            onChange={(e) => setFormData(prev => ({ ...prev, path: e.target.value }))}
                            placeholder="/page-url"
                            required
                            data-testid="input-page-path"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label variant="dark">Page Type</Label>
                            <Select
                                value={formData.pageType}
                                onValueChange={(value) => setFormData(prev => ({ ...prev, pageType: value }))}
                            >
                                <SelectTrigger variant="dark" data-testid="select-page-type">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent variant="dark">
                                    {PAGE_TYPES.map(type => (
                                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label variant="dark">Template</Label>
                            <Select
                                value={formData.template}
                                onValueChange={(value) => setFormData(prev => ({ ...prev, template: value }))}
                            >
                                <SelectTrigger variant="dark" data-testid="select-template">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent variant="dark">
                                    {PAGE_TEMPLATES.map(template => (
                                        <SelectItem key={template.value} value={template.value}>{template.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label variant="dark">Status</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                            >
                                <SelectTrigger variant="dark" data-testid="select-status">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent variant="dark">
                                    {PAGE_STATUSES.map(status => (
                                        <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label variant="dark">Parent Page</Label>
                            <Select
                                value={formData.parentKey || "__none__"}
                                onValueChange={(value) => setFormData(prev => ({ ...prev, parentKey: value === "__none__" ? null : value }))}
                            >
                                <SelectTrigger variant="dark" data-testid="select-parent">
                                    <SelectValue placeholder="No parent (top level)" />
                                </SelectTrigger>
                                <SelectContent variant="dark">
                                    <SelectItem value="__none__">No parent (top level)</SelectItem>
                                    {flatPages.filter(fp => fp.page.key !== formData.key).map(({ page: p, level }) => (
                                        <SelectItem key={p.key} value={p.key}>
                                            {'  '.repeat(level)}{p.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label variant="dark">Content Cluster</Label>
                            <Select
                                value={formData.clusterKey || "__none__"}
                                onValueChange={(value) => setFormData(prev => ({ ...prev, clusterKey: value === "__none__" ? null : value }))}
                            >
                                <SelectTrigger variant="dark" data-testid="select-cluster">
                                    <SelectValue placeholder="No cluster" />
                                </SelectTrigger>
                                <SelectContent variant="dark">
                                    <SelectItem value="__none__">No cluster</SelectItem>
                                    {clusters.map(cluster => (
                                        <SelectItem key={cluster.key} value={cluster.key}>{cluster.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="priority" variant="dark">Priority (1-10)</Label>
                            <Input
                                id="priority"
                                variant="dark"
                                type="number"
                                min={1}
                                max={10}
                                value={formData.priority}
                                onChange={(e) => setFormData(prev => ({ ...prev, priority: parseInt(e.target.value) || 5 }))}
                                data-testid="input-priority"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="summary" variant="dark">Summary</Label>
                        <Textarea
                            id="summary"
                            variant="dark"
                            value={formData.summary || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value || null }))}
                            placeholder="Brief summary of the page content..."
                            rows={2}
                            data-testid="textarea-summary"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="content" variant="dark">Content</Label>
                            <div className="flex items-center gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="h-7 text-xs border-violet-500/50 text-violet-400 hover:bg-violet-500/20"
                                    onClick={handleGeneratePageHTML}
                                    disabled={isGeneratingContent || !formData.title}
                                    data-testid="button-generate-page-html"
                                >
                                    {isGeneratingContent ? (
                                        <>
                                            <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-3.5 h-3.5 mr-1" />
                                            Generate Page HTML
                                        </>
                                    )}
                                </Button>
                                {rawHtmlMode && formData.content && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="h-7 text-xs border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20"
                                        onClick={() => {
                                            const { tasks } = parseVisualConfigFromContent(formData.content || '');
                                            const updates: Partial<typeof formData> = {};
                                            let fieldsUpdated = 0;

                                            tasks.forEach((task: EnhancementTask) => {
                                                if (task.detected && task.value) {
                                                    if (task.id === 'title' && !formData.title) {
                                                        updates.title = String(task.value);
                                                        fieldsUpdated++;
                                                    }
                                                    if (task.id === 'seoDescription' && !formData.seoDescription) {
                                                        updates.seoDescription = String(task.value);
                                                        fieldsUpdated++;
                                                    }
                                                    if (task.id === 'pageId' && !formData.key) {
                                                        updates.key = String(task.value).replace(/^andara-/, '');
                                                        fieldsUpdated++;
                                                    }
                                                    if (task.id === 'cluster' && !formData.clusterKey) {
                                                        updates.clusterKey = String(task.value);
                                                        fieldsUpdated++;
                                                    }
                                                    // Use seoKeywords to populate seoFocus if not set
                                                    if (task.id === 'seoKeywords' && !formData.seoFocus) {
                                                        updates.seoFocus = String(task.value).split(',')[0]?.trim() || String(task.value);
                                                        fieldsUpdated++;
                                                    }
                                                    if (task.id === 'template' && !formData.template) {
                                                        updates.template = String(task.value);
                                                        fieldsUpdated++;
                                                    }
                                                }
                                            });

                                            // Extract SEO focus keyword from title
                                            const titleTask = tasks.find((t: EnhancementTask) => t.id === 'title');
                                            if (titleTask?.value && !formData.seoFocus) {
                                                const titleWords = String(titleTask.value).toLowerCase().split(/\s+/).filter(w => w.length > 4);
                                                if (titleWords.length > 0) {
                                                    updates.seoFocus = titleWords.slice(0, 3).join(' ');
                                                    fieldsUpdated++;
                                                }
                                            }

                                            // Auto-generate path from title if not set
                                            if (titleTask?.value && !formData.path) {
                                                const slug = String(titleTask.value).toLowerCase()
                                                    .replace(/[^a-z0-9\s-]/g, '')
                                                    .replace(/\s+/g, '-')
                                                    .substring(0, 50);
                                                updates.path = `/${slug}`;
                                                fieldsUpdated++;
                                            }

                                            // Build Visual Config from detected values
                                            const vibeTask = tasks.find((t: EnhancementTask) => t.id === 'vibeKeywords');
                                            const toneTask = tasks.find((t: EnhancementTask) => t.id === 'emotionalTone');
                                            const animTask = tasks.find((t: EnhancementTask) => t.id === 'animationIdeas');
                                            const imagePromptTask = tasks.find((t: EnhancementTask) => t.id === 'aiImagePrompt');
                                            const clusterTask = tasks.find((t: EnhancementTask) => t.id === 'cluster');
                                            const pageIdTask = tasks.find((t: EnhancementTask) => t.id === 'pageId');

                                            const hasVisualConfigUpdates = vibeTask || toneTask || animTask || imagePromptTask;
                                            if (hasVisualConfigUpdates) {
                                                const currentVC = formData.visualConfig;
                                                const toArray = (val: string | string[] | undefined, fallback: string[]): string[] => {
                                                    if (!val) return fallback;
                                                    if (Array.isArray(val)) return val;
                                                    return val.split(',').map(s => s.trim()).filter(Boolean);
                                                };
                                                const newVisualConfig: VisualConfig = {
                                                    pageId: pageIdTask?.value ? String(pageIdTask.value) : (currentVC?.pageId || ''),
                                                    cluster: clusterTask?.value ? String(clusterTask.value) : (currentVC?.cluster || ''),
                                                    priority: currentVC?.priority || 'P2',
                                                    vibeKeywords: vibeTask?.value ? toArray(vibeTask.value as string | string[], []) : (currentVC?.vibeKeywords || []),
                                                    emotionalTone: toneTask?.value ? toArray(toneTask.value as string | string[], []) : (currentVC?.emotionalTone || []),
                                                    animationIdeas: animTask?.value ? toArray(animTask.value as string | string[], []) : (currentVC?.animationIdeas || []),
                                                    aiImagePrompt: imagePromptTask?.value ? String(imagePromptTask.value) : (currentVC?.aiImagePrompt || ''),
                                                    aiVideoPrompt: currentVC?.aiVideoPrompt || '',
                                                    designerNotes: currentVC?.designerNotes || '',
                                                };
                                                updates.visualConfig = newVisualConfig;
                                                updates.extractedVisualConfig = newVisualConfig; // Also set extraction
                                                fieldsUpdated++;
                                            }

                                            if (fieldsUpdated > 0) {
                                                setFormData(prev => ({ ...prev, ...updates }));
                                                toast({
                                                    title: "Interpret Complete",
                                                    description: `Applied ${fieldsUpdated} updates from content analysis.`,
                                                });
                                            } else {
                                                toast({
                                                    title: "No Updates",
                                                    description: "Content analyzed but no new information found to apply.",
                                                });
                                            }
                                        }}
                                    >
                                        <Wand2 className="w-3.5 h-3.5 mr-1" />
                                        Interpret Content (Auto-Fill)
                                    </Button>
                                )}
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className={`h-7 text-xs ${rawHtmlMode ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400'}`}
                                    onClick={() => setRawHtmlMode(!rawHtmlMode)}
                                >
                                    <Code2 className="w-3.5 h-3.5 mr-1" />
                                    {rawHtmlMode ? 'Visual Editor' : 'HTML Code'}
                                </Button>
                            </div>
                        </div>

                        {rawHtmlMode ? (
                            <Textarea
                                id="content"
                                variant="dark"
                                value={formData.content || ''}
                                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value || null }))}
                                placeholder="<h1>Page Title</h1><p>Content goes here...</p>"
                                className="font-mono text-xs min-h-[400px]"
                                data-testid="textarea-content-html"
                            />
                        ) : (
                            <RichTextEditor
                                value={formData.content || ''}
                                onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                                className="min-h-[400px]"
                            />
                        )}
                    </div>

                    <Tabs defaultValue="seo" className="w-full">
                        <TabsList className="bg-gray-800 border border-white/5">
                            <TabsTrigger value="seo">SEO Settings</TabsTrigger>
                            <TabsTrigger value="media">Media & Assets</TabsTrigger>
                            <TabsTrigger value="visuals">Visual Config</TabsTrigger>
                            <TabsTrigger value="ai-enhancer">AI Enhancer</TabsTrigger>
                        </TabsList>

                        <TabsContent value="seo" className="space-y-4 pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="seoFocus" variant="dark">Focus Keyword</Label>
                                        <SeoCopilotButton pageId={formData.key} pageKey={formData.key} />
                                    </div>
                                    <Input
                                        id="seoFocus"
                                        variant="dark"
                                        value={formData.seoFocus || ''}
                                        onChange={(e) => setFormData(prev => ({ ...prev, seoFocus: e.target.value || null }))}
                                        placeholder="Focus keyword for SEO..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="seoTitle" variant="dark">SEO Title</Label>
                                    <Input
                                        id="seoTitle"
                                        variant="dark"
                                        value={formData.seoTitle || ''}
                                        onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value || null }))}
                                        placeholder="Title tag..."
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="seoDescription" variant="dark">Meta Description</Label>
                                <Textarea
                                    id="seoDescription"
                                    variant="dark"
                                    value={formData.seoDescription || ''}
                                    onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value || null }))}
                                    placeholder="Meta description for search engines..."
                                    rows={3}
                                />
                            </div>
                        </TabsContent>

                        <TabsContent value="media" className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="featuredImage" variant="dark">Featured Image URL</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="featuredImage"
                                        variant="dark"
                                        value={formData.featuredImage || ''}
                                        onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value || null }))}
                                        placeholder="https://..."
                                    />
                                    {formData.featuredImage && (
                                        <div className="w-10 h-10 rounded overflow-hidden bg-gray-800 shrink-0">
                                            <img src={formData.featuredImage} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Media Gallery / Asset Generation UI */}
                            <div className="mt-6 border border-white/10 rounded-lg p-4 bg-gray-800/50">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-medium text-white flex items-center gap-2">
                                        <ImageIcon className="w-4 h-4 text-pink-400" />
                                        Extracted Media Assets
                                    </h3>
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        className="h-7 text-xs"
                                        onClick={() => setMediaGalleryOpen(!mediaGalleryOpen)}
                                    >
                                        {mediaGalleryOpen ? 'Refresh Assets' : 'Load Asset Gallery'}
                                    </Button>
                                </div>

                                {mediaGalleryOpen && (
                                    <div className="space-y-4">
                                        {mediaAssets && mediaAssets.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {mediaAssets.map((asset) => (
                                                    <div key={asset.id} className="border border-white/5 rounded-lg p-3 bg-gray-800/80">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <Badge variant="outline" className="text-[10px] uppercase">{asset.slotType}</Badge>
                                                            <code className="text-[10px] text-gray-500">{asset.slotKey}</code>
                                                        </div>
                                                        <div className="aspect-video bg-gray-950 rounded mb-2 overflow-hidden relative group">
                                                            {asset.generatedUrl ? (
                                                                <img src={asset.generatedUrl} alt={asset.prompt} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-gray-700">
                                                                    {asset.status === 'generating' ? (
                                                                        <Loader2 className="w-6 h-6 animate-spin text-pink-500" />
                                                                    ) : (
                                                                        <ImageIcon className="w-6 h-6" />
                                                                    )}
                                                                </div>
                                                            )}
                                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                                <Button
                                                                    type="button"
                                                                    size="icon"
                                                                    variant="ghost"
                                                                    className="h-8 w-8 text-white hover:bg-white/20"
                                                                    disabled={generatingAssetId === asset.id}
                                                                    onClick={() => handleGenerateMediaAsset(asset)}
                                                                >
                                                                    {generatingAssetId === asset.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        <p className="text-[10px] text-gray-400 line-clamp-2 h-8 mb-2" title={asset.prompt}>{asset.prompt}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8 text-gray-500 text-sm">
                                                No media assets extracted yet. Generate HTML first or use "Enrich Page".
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        {/* Visual Config Tab */}
                        <TabsContent value="visuals" className="space-y-4 pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs uppercase text-slate-500 font-semibold tracking-wider">Design Identity</Label>
                                        <div className="grid gap-3">
                                            <div>
                                                <Label htmlFor="vibeKeywords" className="text-xs mb-1.5 block">Vibe Keywords (comma separated)</Label>
                                                <Input
                                                    id="vibeKeywords"
                                                    value={formData.visualConfig?.vibeKeywords?.join(', ') || ''}
                                                    onChange={(e) => {
                                                        const val = e.target.value.split(',').map(s => s.trim());
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            visualConfig: { ...(prev.visualConfig || defaultVisualConfig), vibeKeywords: val }
                                                        }));
                                                    }}
                                                    placeholder="e.g. ethereal, scientific, crystalline"
                                                    className="bg-slate-900/50 border-slate-700 h-8 text-xs"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="emotionalTone" className="text-xs mb-1.5 block">Emotional Tone</Label>
                                                <Input
                                                    id="emotionalTone"
                                                    value={formData.visualConfig?.emotionalTone?.join(', ') || ''}
                                                    onChange={(e) => {
                                                        const val = e.target.value.split(',').map(s => s.trim());
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            visualConfig: { ...(prev.visualConfig || defaultVisualConfig), emotionalTone: val }
                                                        }));
                                                    }}
                                                    placeholder="e.g. inspiring, trustworthy, calm"
                                                    className="bg-slate-900/50 border-slate-700 h-8 text-xs"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs uppercase text-slate-500 font-semibold tracking-wider">Motion Designer</Label>
                                        <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 space-y-3">
                                            <div>
                                                <Label className="text-xs mb-1.5 block flex items-center justify-between">
                                                    Motion Archetype
                                                    <span className="text-[10px] text-slate-400 font-normal">Base physics & timing</span>
                                                </Label>
                                                <div className="flex flex-wrap gap-2">
                                                    {['fluid', 'mechanical', 'glass', 'ethereal'].map((type) => (
                                                        <button
                                                            key={type}
                                                            type="button"
                                                            onClick={() => {
                                                                // Set motion preset based on archetype
                                                                // This is a simplification - normally we'd set specific easing/duration
                                                                setFormData(prev => ({
                                                                    ...prev,
                                                                    visualConfig: { ...(prev.visualConfig || defaultVisualConfig), motionPreset: type }
                                                                }));
                                                            }}
                                                            className={cn(
                                                                "text-[10px] px-2 py-1 rounded border transition-all",
                                                                formData.visualConfig?.motionPreset === type
                                                                    ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300"
                                                                    : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
                                                            )}
                                                        >
                                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                {/* Preview of the selected motion archetype */}
                                                <div className="col-span-2 mt-2">
                                                    <Label className="text-[10px] text-slate-500 mb-1 block">Live Preview</Label>
                                                    <div className="h-24 bg-slate-950 rounded border border-slate-800 flex items-center justify-center overflow-hidden">
                                                        {formData.visualConfig?.motionPreset && MOTION_ARCHETYPES[formData.visualConfig.motionPreset as keyof typeof MOTION_ARCHETYPES] ? (
                                                            <SingleMotionPreview
                                                                archetype={formData.visualConfig.motionPreset as keyof typeof MOTION_ARCHETYPES}
                                                                className="w-full h-full"
                                                            />
                                                        ) : (
                                                            <span className="text-xs text-slate-600">Select an archetype</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs uppercase text-slate-500 font-semibold tracking-wider">Creative Generation</Label>
                                        <div className="space-y-3">
                                            <div>
                                                <Label htmlFor="aiImagePrompt" className="text-xs mb-1.5 block">Hero Image Prompt</Label>
                                                <Textarea
                                                    id="aiImagePrompt"
                                                    value={formData.visualConfig?.aiImagePrompt || ''}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        visualConfig: { ...(prev.visualConfig || defaultVisualConfig), aiImagePrompt: e.target.value }
                                                    }))}
                                                    placeholder="Describe the hero image..."
                                                    className="bg-slate-900/50 border-slate-700 min-h-[80px] text-xs"
                                                />
                                                <div className="flex justify-end mt-2">
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-6 text-[10px]"
                                                        onClick={handleGenerateImage}
                                                        disabled={!formData.visualConfig?.aiImagePrompt || isGeneratingImage}
                                                    >
                                                        {isGeneratingImage ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Sparkles className="w-3 h-3 mr-1" />}
                                                        Generate & Preview
                                                    </Button>
                                                </div>
                                            </div>

                                            {generatedImagePreview && (
                                                <div className="mt-2 border border-slate-700 rounded-lg overflow-hidden bg-slate-950">
                                                    <div className="aspect-video relative">
                                                        <img src={generatedImagePreview.url} alt="Generated Preview" className="w-full h-full object-cover" />
                                                        <div className="absolute bottom-2 right-2 flex gap-2">
                                                            <Button
                                                                type="button"
                                                                size="sm"
                                                                variant="secondary"
                                                                className="h-7 text-xs bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm"
                                                                onClick={handleInsertGeneratedImage}
                                                            >
                                                                <Plus className="w-3 h-3 mr-1" />
                                                                Insert
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="ai-enhancer" className="space-y-4 pt-4">
                            {/* This section would contain the AI enhancement tasks and automation */}
                            <div className="rounded-lg border border-dashed border-white/10 p-8 text-center bg-white/5">
                                <Wand2 className="w-8 h-8 mx-auto text-violet-400 mb-2" />
                                <h3 className="text-lg font-medium text-white mb-1">AI Enhancements</h3>
                                <p className="text-sm text-gray-400 mb-4 max-w-md mx-auto">
                                    Analyze your page content to auto-generate metadata, visual configuration, and media assets.
                                </p>
                                {/* Placeholder for now - logic moved to "Interpret Content" button above */}
                            </div>
                        </TabsContent>
                    </Tabs>

                    <div className="flex justify-between pt-4 border-t border-white/10">
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isNew}
                        >
                            Delete Page
                        </Button>

                        <div className="flex gap-4">
                            <Button type="button" variant="ghost" onClick={onClose} className="text-white hover:text-white/80 hover:bg-white/10">Cancel</Button>
                            <Button type="submit" variant="default" className="bg-white text-black hover:bg-gray-200" disabled={isSaving}>
                                {isSaving ? 'Saving...' : (isNew ? 'Create Page' : 'Save Changes')}
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
