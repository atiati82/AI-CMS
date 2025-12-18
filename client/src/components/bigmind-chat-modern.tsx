import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { getAuthHeaders } from '@/lib/queryClient';
import { parseBigMindResponse, extractEnhancements, type ParsedEnhancement } from '@/lib/bigmind-parser';
import {
    Send, Loader2, Plus, Trash2, Bot, User, Copy, Check,
    MessageSquare, History, Brain, Sparkles, Wand2, X, FileText, Search
} from 'lucide-react';

// Modern AI chat component
export interface BigMindChatModernProps {
    mode?: 'cms' | 'library';
    persistSessions?: boolean;
    className?: string;
    // Page context for context-aware suggestions
    currentPageId?: string;
    currentPageKey?: string;
    currentPageTitle?: string;
}

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    functionCalls?: any[];
}

interface ChatSession {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    messageCount: number;
}

const AI_MODELS = [
    { id: 'gpt-4.1-mini', name: 'GPT-4.1 Mini', provider: 'openai' },
    { id: 'gpt-4.1', name: 'GPT-4.1', provider: 'openai' },
    { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', provider: 'gemini' },
] as const;

export function BigMindChatModern({
    mode = 'cms',
    persistSessions = true,
    className,
    currentPageId,
    currentPageKey,
    currentPageTitle: initialPageTitle,
}: BigMindChatModernProps) {
    const [, setLocation] = useLocation();
    const [selectedModel, setSelectedModel] = useState<string>('gpt-4.1-mini');
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [enhancements, setEnhancements] = useState<ParsedEnhancement[]>([]);
    const [selectedEnhancements, setSelectedEnhancements] = useState<Set<string>>(new Set());
    const [isEnhancementPanelOpen, setIsEnhancementPanelOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<any>(null);
    const [loadingPage, setLoadingPage] = useState(false);
    const [magicPagePopup, setMagicPagePopup] = useState<{ open: boolean; data: any; loading: boolean }>({ open: false, data: null, loading: false });
    const [pageEditPopup, setPageEditPopup] = useState<{ open: boolean; pageId: string; pageData: any; suggestions: any; loading: boolean }>({ open: false, pageId: '', pageData: null, suggestions: {}, loading: false });
    const [magicTabIndex, setMagicTabIndex] = useState(0); // 0=Core, 1=SEO, 2=Visual, 3=Content
    const [editTabIndex, setEditTabIndex] = useState(0); // 0=Core, 1=SEO, 2=Visual
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    // Context helpers - prioritize detected page context over props
    const currentPagePath = currentPage?.path;
    const currentPageTitle = currentPage?.title || initialPageTitle;
    const effectivePageId = currentPage?.id || currentPageId;

    // Detect page context from URL
    useEffect(() => {
        const detectPageFromURL = async () => {
            // Get current path from URL
            const path = window.location.pathname;

            // Skip if on admin page or home
            if (path === '/' || path.startsWith('/admin')) {
                // Try to get from URL parameters instead
                const params = new URLSearchParams(window.location.search);
                const pageParam = params.get('page');
                if (pageParam) {
                    await loadPageByPath(pageParam);
                }
                return;
            }

            // Load page data by path
            await loadPageByPath(path);
        };

        detectPageFromURL();
    }, []);

    const loadPageByPath = async (path: string) => {
        setLoadingPage(true);
        try {
            const res = await fetch(`/api/pages/by-path${path}`, {
                headers: getAuthHeaders(),
            });
            if (res.ok) {
                const page = await res.json();
                setCurrentPage(page);
                console.log('Detected page context:', page.title, page.path);
            }
        } catch (error) {
            console.error('Failed to load page context:', error);
        } finally {
            setLoadingPage(false);
        }
    };

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Load sessions on mount
    useEffect(() => {
        if (persistSessions) {
            loadSessions();
        }
    }, [persistSessions]);

    // Load messages when session changes
    useEffect(() => {
        if (currentSessionId) {
            loadSessionMessages(currentSessionId);
        }
    }, [currentSessionId]);

    // Listen for Apply button clicks using event delegation (for data-attribute buttons)
    useEffect(() => {
        const handleApplyClick = async (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Handle single Apply button
            if (target.classList.contains('apply-seo-btn')) {
                const field = target.getAttribute('data-field');
                const pageId = target.getAttribute('data-page');
                const encodedValue = target.getAttribute('data-value');

                if (!field || !encodedValue) return;

                // Decode base64 value
                let decodedValue: string;
                try {
                    decodedValue = decodeURIComponent(escape(atob(encodedValue)));
                } catch {
                    decodedValue = encodedValue;
                }

                if (pageId) {
                    try {
                        target.textContent = '⏳...';
                        const res = await fetch(`/api/admin/pages/${pageId}`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ [field]: decodedValue }),
                        });

                        if (res.ok) {
                            target.textContent = '✓ Done';
                            target.style.background = '#059669';
                            toast({ title: "Applied!", description: `Updated ${field} for page` });
                        } else {
                            throw new Error('Failed to update');
                        }
                    } catch (error) {
                        target.textContent = '✗ Error';
                        target.style.background = '#dc2626';
                        toast({ title: "Error", description: `Failed to update ${field}`, variant: "destructive" });
                    }
                }
                return;
            }

            // Handle Apply All button
            if (target.classList.contains('apply-all-seo-btn')) {
                const encodedUpdates = target.getAttribute('data-updates');
                if (!encodedUpdates) return;

                try {
                    const updates: Array<{ pageId: string; field: string; value: string }> = JSON.parse(atob(encodedUpdates));
                    target.textContent = `⏳ Applying 0/${updates.length}...`;

                    let successCount = 0;
                    let errorCount = 0;

                    for (let i = 0; i < updates.length; i++) {
                        const { pageId, field, value } = updates[i];
                        try {
                            const res = await fetch(`/api/admin/pages/${pageId}`, {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ [field]: value }),
                            });
                            if (res.ok) successCount++;
                            else errorCount++;
                        } catch {
                            errorCount++;
                        }
                        target.textContent = `⏳ Applying ${i + 1}/${updates.length}...`;
                    }

                    target.textContent = `✓ Applied ${successCount}/${updates.length}`;
                    target.style.background = successCount === updates.length ? '#059669' : '#d97706';
                    toast({
                        title: "Batch Apply Complete!",
                        description: `Applied ${successCount} updates, ${errorCount} errors`,
                    });
                } catch (error) {
                    target.textContent = '✗ Error';
                    target.style.background = '#dc2626';
                    toast({ title: "Error", description: "Failed to apply updates", variant: "destructive" });
                }
            }

            // Handle Magic Page button
            if (target.classList.contains('magic-page-btn')) {
                const encodedData = target.getAttribute('data-page');
                if (!encodedData) return;

                try {
                    const pageData = JSON.parse(atob(encodedData));
                    setMagicPagePopup({ open: true, data: pageData, loading: false });
                } catch {
                    toast({ title: "Error", description: "Failed to parse page data", variant: "destructive" });
                }
            }

            // Handle Open Page button - open popup with page data
            if (target.classList.contains('open-page-btn')) {
                const pageId = target.getAttribute('data-page-id');
                if (!pageId) return;

                // Show loading state
                setPageEditPopup({ open: true, pageId, pageData: null, suggestions: {}, loading: true });

                try {
                    const res = await fetch(`/api/admin/pages/${pageId}`, { headers: getAuthHeaders() });
                    if (res.ok) {
                        const pageData = await res.json();
                        // Generate context-aware suggestions for ALL missing fields
                        const suggestions: any = {};
                        const title = pageData.title || '';
                        const path = pageData.path || '';
                        const cluster = pageData.clusterKey || '';

                        // Detect topic from title/path for context-aware suggestions
                        const topic = title.toLowerCase();
                        const isScience = topic.includes('science') || topic.includes('water') || topic.includes('mineral') || path.includes('/science');
                        const isProduct = topic.includes('product') || topic.includes('ionic') || path.includes('/shop');
                        const isBioelectric = topic.includes('bioelectric') || topic.includes('charge') || topic.includes('voltage');

                        // Summary / Suggested Content
                        if (!pageData.summary) {
                            if (isBioelectric) {
                                suggestions.summary = `Explore the fascinating science of bioelectric water - how charge separation, ion gradients, and voltage potentials transform ordinary water into a bioactive medium. Learn about the terrain model, cellular hydration, and the role of ionic minerals in supporting the body's electrical systems.`;
                            } else if (isScience) {
                                suggestions.summary = `Discover the scientific principles behind ${title}. This comprehensive guide explores the research, mechanisms, and practical applications that make Andara Ionic's approach unique in the field of mineral water science.`;
                            } else if (isProduct) {
                                suggestions.summary = `${title} - Premium ionic sulfate minerals formulated for optimal water treatment. Experience enhanced hydration with our proprietary crystalline mineral blend.`;
                            } else {
                                suggestions.summary = `${title} - Comprehensive information and insights about this topic within the Andara Ionic ecosystem.`;
                            }
                        }

                        // SEO Fields - Context-aware
                        if (!pageData.seoTitle) {
                            suggestions.seoTitle = `${title} | Andara Ionic${isScience ? ' Science Library' : ''}`.substring(0, 60);
                        }
                        if (!pageData.seoDescription) {
                            if (isBioelectric) {
                                suggestions.seoDescription = `Learn how bioelectric water works - ion transport, cell voltage, and mineral-water interactions that create the bioelectric terrain. Scientific exploration of water's electrical properties.`;
                            } else {
                                suggestions.seoDescription = `Discover ${title}. Learn about the science and benefits of Andara Ionic mineral solutions. ${isScience ? 'Research-backed insights.' : 'Premium quality focused.'}`;
                            }
                        }
                        if (!pageData.seoFocus) {
                            const words = title.toLowerCase().split(/\s+/).filter((w: string) => w.length > 3);
                            const extras = isBioelectric ? ', bioelectric, ion transport' : isScience ? ', water science, mineral' : '';
                            suggestions.seoFocus = words.slice(0, 3).join(', ') + extras || 'andara ionic, mineral water';
                        }

                        // Visual Config - Context-aware suggestions
                        if (!pageData.visualConfig?.vibeKeywords?.length) {
                            suggestions.vibeKeywords = isScience ? ['crystalline', 'scientific', 'ethereal'] : ['premium', 'clean', 'trustworthy'];
                        }
                        if (!pageData.visualConfig?.emotionalTone?.length) {
                            suggestions.emotionalTone = isBioelectric ? ['enlightening', 'precise', 'transformative'] : ['trustworthy', 'educational', 'calm'];
                        }
                        if (!pageData.visualConfig?.animationIdeas?.length) {
                            suggestions.animationIdeas = isBioelectric ? ['ion flow particles', 'voltage pulse', 'cell membrane glow'] : ['water flow', 'crystalline shimmer', 'gentle pulse'];
                        }
                        if (!pageData.visualConfig?.colorPalette) {
                            suggestions.colorPalette = isBioelectric ? 'electric-blue-gradient' : 'deep-teal-gradient';
                        }
                        if (!pageData.visualConfig?.motionPreset) {
                            suggestions.motionPreset = isBioelectric ? 'electric-pulse-flow' : 'liquid-crystal-float';
                        }
                        if (!pageData.visualConfig?.entranceMotion) {
                            suggestions.entranceMotion = 'fadeUp, stagger.container';
                        }
                        if (!pageData.visualConfig?.hoverMotion) {
                            suggestions.hoverMotion = 'hover.lift, hover.glow';
                        }
                        if (!pageData.visualConfig?.ambientMotion) {
                            suggestions.ambientMotion = isBioelectric ? 'ambient.pulse, sparks.electric' : 'ambient.float, ambient.pulse';
                        }
                        if (!pageData.visualConfig?.aiImagePrompt) {
                            if (isBioelectric) {
                                suggestions.aiImagePrompt = `Bioelectric water visualization: glowing ion channels, electric blue gradients, cell membrane cross-section with voltage potential, scientific illustration style, dark background with luminescent elements`;
                            } else {
                                suggestions.aiImagePrompt = `Scientific visualization of ${title}, crystalline structures, ethereal blue lighting, premium photography style`;
                            }
                        }
                        if (!pageData.visualConfig?.aiVideoPrompt) {
                            suggestions.aiVideoPrompt = isBioelectric
                                ? `Slow motion: Electric blue ion particles flowing through water, pulse effects, cell membrane animation, voltage gradient visualization, deep blue tones`
                                : `Slow motion crystalline water droplets forming geometric patterns, ethereal blue and teal lighting, premium nature documentary style`;
                        }

                        setEditTabIndex(0); // Reset to first tab
                        setPageEditPopup({ open: true, pageId, pageData, suggestions, loading: false });
                    } else {
                        throw new Error('Failed to fetch page');
                    }
                } catch {
                    toast({ title: "Error", description: "Failed to load page data", variant: "destructive" });
                    setPageEditPopup({ open: false, pageId: '', pageData: null, suggestions: {}, loading: false });
                }
            }
        };

        document.addEventListener('click', handleApplyClick);
        return () => document.removeEventListener('click', handleApplyClick);
    }, [toast]);

    // Helper to check if message has apply tags or suggest tags
    const hasApplyTags = (content: string): boolean => {
        return /\[APPLY:\w+(?::[^\]]+)?\][\s\S]*?\[\/APPLY\]/g.test(content) ||
            /\[SUGGEST_PAGE:[^\]]+\]/g.test(content) ||
            /\[APPLY_ALL:[^\]]+\]/g.test(content) ||
            /\[OPEN_PAGE:[^\]]+\]/g.test(content);
    };

    // Process apply tags and return HTML with styled buttons
    const formatApplyMessage = (content: string): string => {
        // First process apply tags into styled HTML
        let html = content.replace(/\[APPLY:(\w+)(?::([^\]]+))?\]([\s\S]*?)\[\/APPLY\]/g, (match, fieldName, pageId, value) => {
            const cleanValue = value.trim();
            const preview = cleanValue.length > 50 ? cleanValue.substring(0, 50) + '...' : cleanValue;
            // Base64 encode the value to avoid any HTML/JS escaping issues
            const encodedValue = btoa(unescape(encodeURIComponent(cleanValue)));
            const fieldLabels: Record<string, string> = {
                seoTitle: 'SEO Title',
                seoDescription: 'Meta Description',
                seoFocus: 'Focus Keywords',
            };
            const label = fieldLabels[fieldName] || fieldName;

            // Compact inline card with small Apply button
            return `<div style="margin:4px 0;padding:8px 12px;border:1px solid rgba(99,102,241,0.25);background:rgba(99,102,241,0.08);border-radius:6px;"><div style="display:flex;align-items:center;justify-content:space-between;gap:8px;"><div style="flex:1;min-width:0;"><span style="font-size:10px;font-weight:500;color:#818cf8;margin-right:6px;">${label}:</span><span style="font-size:12px;color:#d4d4d8;">${preview}</span></div><button class="apply-seo-btn" data-field="${fieldName}" data-page="${pageId || ''}" data-value="${encodedValue}" style="flex-shrink:0;padding:4px 10px;font-size:11px;font-weight:500;background:#6366f1;color:white;border:none;border-radius:4px;cursor:pointer;">Apply</button></div></div>`;
        });

        // Process APPLY_ALL tag for batch apply button
        html = html.replace(/\[APPLY_ALL:([^\]]+)\]([^\[]*)\[\/APPLY_ALL\]/g, (match, encodedData, label) => {
            return `<div style="margin:12px 0;padding:10px;border:1px solid rgba(16,185,129,0.4);background:rgba(16,185,129,0.1);border-radius:8px;text-align:center;"><button class="apply-all-seo-btn" data-updates="${encodedData}" style="padding:8px 20px;font-size:12px;font-weight:600;background:linear-gradient(135deg,#10b981,#6366f1);color:white;border:none;border-radius:6px;cursor:pointer;">🚀 ${label.trim()}</button></div>`;
        });

        // Process SUGGEST_PAGE tag for Magic Page cards
        html = html.replace(/\[SUGGEST_PAGE:([^\]]+)\]([^|]+)\|([^|]+)\|([^\[]*)\[\/SUGGEST_PAGE\]/g, (match, encodedData, title, zone, desc) => {
            return `<button class="magic-page-btn" data-page="${encodedData}" style="display:block;width:100%;margin:6px 0;padding:12px;text-align:left;border:1px solid rgba(168,85,247,0.3);background:rgba(168,85,247,0.08);border-radius:8px;cursor:pointer;"><div style="display:flex;align-items:center;justify-content:space-between;gap:8px;"><div style="flex:1;"><div style="font-size:13px;font-weight:600;color:#e4e4e7;margin-bottom:4px;">${title.trim()}</div><div style="font-size:11px;color:#a1a1aa;">${desc.trim()}</div></div><span style="flex-shrink:0;padding:2px 8px;font-size:10px;font-weight:500;background:rgba(168,85,247,0.3);color:#c084fc;border-radius:4px;">${zone.trim()}</span></div></button>`;
        });

        // Process OPEN_PAGE tag for Open Page popup button
        html = html.replace(/\[OPEN_PAGE:([^\]]+)\]([^\[]*)\[\/OPEN_PAGE\]/g, (match, pageId, label) => {
            return `<button class="open-page-btn" data-page-id="${pageId}" style="margin-left:12px;padding:3px 10px;font-size:11px;font-weight:600;background:#3b82f6;color:white;border:none;border-radius:4px;cursor:pointer;">Open →</button>`;
        });

        // Convert markdown-style formatting to HTML
        html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        html = html.replace(/`([^`]+)`/g, '<code style="background:rgba(63,63,70,0.5);padding:1px 4px;border-radius:3px;font-size:11px;">$1</code>');
        html = html.replace(/^### (.+)$/gm, '<h3 style="font-size:13px;font-weight:600;margin:4px 0 2px;color:#e4e4e7;">$1</h3>');
        html = html.replace(/^---$/gm, '<hr style="border:none;border-top:1px solid rgba(63,63,70,0.2);margin:4px 0;" />');

        // Replace newlines with br, but collapse multiple to single
        html = html.replace(/\n+/g, '<br />');

        return html;
    };

    // Legacy processApplyTags for ReactMarkdown (fallback)
    const processApplyTags = (content: string): string => {
        // Just strip the apply tags and show the content for ReactMarkdown render
        return content.replace(/\[APPLY:\w+(?::[^\]]+)?\]([\s\S]*?)\[\/APPLY\]/g, '$1');
    };

    const loadSessions = async () => {
        try {
            const res = await fetch('/api/admin/bigmind/sessions', {
                headers: getAuthHeaders(),
            });
            if (!res.ok) return;
            const data = await res.json();
            setSessions(data);
            // Auto-load most recent session
            if (data.length > 0 && !currentSessionId && data[0].messageCount > 0) {
                setCurrentSessionId(data[0].id);
            }
        } catch (error) {
            console.error('Failed to load sessions:', error);
        }
    };

    const loadSessionMessages = async (sessionId: string) => {
        try {
            const res = await fetch(`/api/admin/bigmind/sessions/${sessionId}/messages`, {
                headers: getAuthHeaders(),
            });
            if (!res.ok) return;
            const data = await res.json();
            setMessages(data.map((msg: any) => ({
                role: msg.role,
                content: msg.content,
                functionCalls: msg.functionCalls,
            })));
        } catch (error) {
            console.error('Failed to load messages:', error);
        }
    };

    const createNewSession = async () => {
        try {
            const res = await fetch('/api/admin/bigmind/sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                body: JSON.stringify({ title: 'New Chat', mode }),
            });
            const session = await res.json();
            setCurrentSessionId(session.id);
            setMessages([]);
            loadSessions();
            toast({ title: "New Chat", description: "Started a new conversation" });
        } catch (error) {
            console.error('Failed to create session:', error);
        }
    };

    const updateModel = (modelId: string) => {
        setSelectedModel(modelId);
    };

    const applyEnhancements = async () => {
        if (!effectivePageId || selectedEnhancements.size === 0) return;

        try {
            const selectedItems = enhancements.filter(e => selectedEnhancements.has(e.id));

            const response = await fetch(`/api/admin/bigmind/pages/${effectivePageId}/apply`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({ enhancements: selectedItems }),
            });

            if (!response.ok) throw new Error('Failed to apply enhancements');

            setEnhancements([]);
            setSelectedEnhancements(new Set());
            setIsEnhancementPanelOpen(false);

            toast({ title: "Success", description: "Enhancements applied successfully." });
            // Optional: Reload page data
            if (currentPage?.path) loadPageByPath(currentPage.path);
        } catch (error) {
            console.error('Failed to apply enhancements:', error);
            toast({ title: "Error", description: "Failed to apply enhancements.", variant: "destructive" });
        }
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const saveMessageToDb = async (sessionId: string, role: 'user' | 'assistant', content: string, functionCalls?: any[]) => {
                await fetch(`/api/admin/bigmind/sessions/${sessionId}/messages`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                    body: JSON.stringify({ role, content, functionCalls }),
                });
            };

            // Save user message
            if (currentSessionId) {
                await saveMessageToDb(currentSessionId, 'user', userMessage.content);
            }

            const res = await fetch('/api/admin/bigmind/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                    model: selectedModel,
                    sessionId: currentSessionId,
                    context: currentPage ? {
                        currentPageId: currentPage.id,
                        currentPageKey: currentPage.key,
                        currentPageTitle: currentPage.title,
                        currentPagePath: currentPage.path,
                        currentPageSeoFocus: currentPage.seoFocus,
                        objective: 'SEO optimization for rank #1',
                    } : undefined
                }),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
                console.error('API error:', errorData);
                throw new Error(errorData.error || `HTTP ${res.status}`);
            }

            const data = await res.json();
            console.log('BigMind response:', data);

            const assistantMessage: ChatMessage = {
                role: 'assistant',
                content: data.response || 'No response received from AI.',
                functionCalls: data.functionCalls,
            };

            setMessages(prev => [...prev, assistantMessage]);

            // Extract enhancements from AI response
            try {
                const parsed = parseBigMindResponse(assistantMessage.content);
                const extracted = extractEnhancements(assistantMessage.content, parsed);
                if (extracted.enhancements.length > 0) {
                    setEnhancements(extracted.enhancements);
                    // Auto-select all enhancements by default
                    setSelectedEnhancements(new Set(extracted.enhancements.map(e => e.id)));
                    setIsEnhancementPanelOpen(true);
                    console.log(`Extracted ${extracted.enhancements.length} enhancements`);
                }
            } catch (error) {
                console.error('Failed to extract enhancements:', error);
            }

            // Save assistant message
            if (currentSessionId) {
                await saveMessageToDb(currentSessionId, 'assistant', assistantMessage.content, assistantMessage.functionCalls);
            }
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `Sorry, I encountered an error: ${errorMessage}`,
            }]);
            toast({
                title: "Error",
                description: `Failed to get response from AI: ${errorMessage}`,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = async (text: string, index: number) => {
        await navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="flex h-full max-h-[calc(100vh-120px)] bg-zinc-950 text-zinc-100 overflow-hidden font-sans relative">
            {/* Main Chat Area */}
            <div className={`flex flex-col flex-1 min-h-0 transition-all duration-300 ${isEnhancementPanelOpen ? 'mr-[400px]' : ''}`}>

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Bot className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-lg tracking-tight">BigMind AI</h2>
                            <div className="flex items-center gap-2 text-xs text-zinc-400">
                                <span className={`w-2 h-2 rounded-full animate-pulse ${loadingPage ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                                <span>{loadingPage ? 'Detecting context...' : currentPagePath ? `Context: ${currentPageTitle || currentPagePath}` : 'Ready'}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsEnhancementPanelOpen(!isEnhancementPanelOpen)}
                            className={`p-2 rounded-md transition-colors relative ${isEnhancementPanelOpen ? 'bg-indigo-500/20 text-indigo-400' : 'hover:bg-zinc-800 text-zinc-400'}`}
                            title="Toggle Enhancement Panel"
                        >
                            <Wand2 className="w-5 h-5" />
                            {enhancements.length > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full" />}
                        </button>
                        <div className="w-px h-6 bg-zinc-800 mx-2" />
                        <select
                            value={selectedModel}
                            onChange={(e) => updateModel(e.target.value)}
                            className="bg-zinc-900 border border-zinc-800 rounded-md text-xs py-1 px-2 focus:ring-1 focus:ring-indigo-500 outline-none text-zinc-300"
                        >
                            <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
                            {AI_MODELS.map(m => (
                                <option key={m.id} value={m.id}>{m.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Quick-Action Buttons */}
                <div className="flex items-center gap-2 px-6 py-3 border-b border-zinc-800/50 bg-zinc-900/30 overflow-x-auto">
                    <span className="text-xs text-zinc-500 mr-2">Quick:</span>
                    <button
                        onClick={() => setInput('Create a Zone 2 Science Library page about: ')}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-zinc-800/50 hover:bg-indigo-500/20 hover:text-indigo-400 text-zinc-400 rounded-lg transition-colors whitespace-nowrap"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        Magic Page
                    </button>
                    <button
                        onClick={() => {
                            setInput('Scan all pages and show me SEO suggestions with Apply buttons');
                            setTimeout(() => handleSubmit(), 100);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-zinc-800/50 hover:bg-emerald-500/20 hover:text-emerald-400 text-zinc-400 rounded-lg transition-colors whitespace-nowrap"
                    >
                        <Brain className="w-3.5 h-3.5" />
                        SEO Pack
                    </button>
                    <button
                        onClick={() => setInput('Find content gaps and suggest 5 new pages based on existing topics')}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-zinc-800/50 hover:bg-amber-500/20 hover:text-amber-400 text-zinc-400 rounded-lg transition-colors whitespace-nowrap"
                    >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Find Gaps
                    </button>
                    <button
                        onClick={() => setInput('Show me available prompt templates for Magic Page, SEO, and content creation')}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-zinc-800/50 hover:bg-purple-500/20 hover:text-purple-400 text-zinc-400 rounded-lg transition-colors whitespace-nowrap"
                    >
                        <History className="w-3.5 h-3.5" />
                        Prompts
                    </button>
                </div>
                {/* Messages */}
                <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full">
                            {/* Logo */}
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20">
                                <Bot className="w-8 h-8 text-white" />
                            </div>

                            {/* Title */}
                            <h2 className="text-2xl font-semibold text-zinc-100 mb-2">How can I help you today?</h2>
                            <p className="text-zinc-500 text-sm mb-8 text-center max-w-md">
                                I'm your SEO and content optimization partner. Ask me anything about pages, performance, or content strategy.
                            </p>

                            {/* Suggestions Label */}
                            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">Suggestions</p>

                            {/* Suggestion Cards Grid */}
                            <div className="grid grid-cols-2 gap-3 w-full max-w-2xl">
                                {/* SEO Audit */}
                                <button
                                    onClick={() => {
                                        setInput('Run a full SEO audit on all pages and show me the top 10 issues with fix suggestions');
                                        setTimeout(() => handleSubmit(), 100);
                                    }}
                                    className="flex items-start gap-3 p-4 bg-zinc-800/50 hover:bg-emerald-500/10 border border-zinc-700/50 hover:border-emerald-500/30 rounded-xl text-left transition-all group"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                        <Brain className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-zinc-200 group-hover:text-emerald-400 transition-colors">SEO Audit</h3>
                                        <p className="text-xs text-zinc-500 mt-0.5">Scan all pages for SEO issues and get fix suggestions...</p>
                                    </div>
                                </button>

                                {/* Performance Check */}
                                <button
                                    onClick={() => {
                                        setInput('Analyze page performance metrics and suggest optimizations for slow-loading pages');
                                        setTimeout(() => handleSubmit(), 100);
                                    }}
                                    className="flex items-start gap-3 p-4 bg-zinc-800/50 hover:bg-blue-500/10 border border-zinc-700/50 hover:border-blue-500/30 rounded-xl text-left transition-all group"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                        <Sparkles className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-zinc-200 group-hover:text-blue-400 transition-colors">Performance Check</h3>
                                        <p className="text-xs text-zinc-500 mt-0.5">Identify slow pages and get optimization tips...</p>
                                    </div>
                                </button>

                                {/* Content Gaps */}
                                <button
                                    onClick={() => {
                                        setInput('Find content gaps in my sitemap and suggest 5 new high-impact pages to create');
                                        setTimeout(() => handleSubmit(), 100);
                                    }}
                                    className="flex items-start gap-3 p-4 bg-zinc-800/50 hover:bg-amber-500/10 border border-zinc-700/50 hover:border-amber-500/30 rounded-xl text-left transition-all group"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                        <MessageSquare className="w-4 h-4 text-amber-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-zinc-200 group-hover:text-amber-400 transition-colors">Content Gaps</h3>
                                        <p className="text-xs text-zinc-500 mt-0.5">Discover missing topics and new page opportunities...</p>
                                    </div>
                                </button>

                                {/* Internal Linking */}
                                <button
                                    onClick={() => {
                                        setInput('Analyze internal linking structure and suggest improvements for better SEO flow');
                                        setTimeout(() => handleSubmit(), 100);
                                    }}
                                    className="flex items-start gap-3 p-4 bg-zinc-800/50 hover:bg-purple-500/10 border border-zinc-700/50 hover:border-purple-500/30 rounded-xl text-left transition-all group"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                        <History className="w-4 h-4 text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-zinc-200 group-hover:text-purple-400 transition-colors">Internal Linking</h3>
                                        <p className="text-xs text-zinc-500 mt-0.5">Improve link structure for better SEO and UX...</p>
                                    </div>
                                </button>

                                {/* Meta Optimization */}
                                <button
                                    onClick={() => {
                                        setInput('Review all page titles and meta descriptions, suggest improvements for click-through rates');
                                        setTimeout(() => handleSubmit(), 100);
                                    }}
                                    className="flex items-start gap-3 p-4 bg-zinc-800/50 hover:bg-cyan-500/10 border border-zinc-700/50 hover:border-cyan-500/30 rounded-xl text-left transition-all group"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                        <FileText className="w-4 h-4 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-zinc-200 group-hover:text-cyan-400 transition-colors">Meta Optimization</h3>
                                        <p className="text-xs text-zinc-500 mt-0.5">Improve titles and descriptions for better CTR...</p>
                                    </div>
                                </button>

                                {/* Keyword Analysis */}
                                <button
                                    onClick={() => {
                                        setInput('Analyze keyword coverage across all pages and identify ranking opportunities');
                                        setTimeout(() => handleSubmit(), 100);
                                    }}
                                    className="flex items-start gap-3 p-4 bg-zinc-800/50 hover:bg-pink-500/10 border border-zinc-700/50 hover:border-pink-500/30 rounded-xl text-left transition-all group"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                                        <Wand2 className="w-4 h-4 text-pink-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-zinc-200 group-hover:text-pink-400 transition-colors">Keyword Analysis</h3>
                                        <p className="text-xs text-zinc-500 mt-0.5">Find keyword gaps and ranking opportunities...</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {msg.role === 'assistant' && (
                                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0 mt-1">
                                    <Bot className="w-4 h-4 text-indigo-400" />
                                </div>
                            )}

                            <div
                                className={`max-w-[85%] rounded-2xl px-5 py-4 text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                    ? 'bg-indigo-600 text-white rounded-tr-sm'
                                    : 'bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-tl-sm'
                                    }`}
                            >
                                {hasApplyTags(msg.content) ? (
                                    <div
                                        className="apply-message-html"
                                        dangerouslySetInnerHTML={{ __html: formatApplyMessage(msg.content) }}
                                    />
                                ) : (
                                    <ReactMarkdown
                                        components={{
                                            // Code blocks with syntax highlighting
                                            code({ node, inline, className, children, ...props }: any) {
                                                const match = /language-(\w+)/.exec(className || '');
                                                return !inline && match ? (
                                                    <div className="rounded-md overflow-hidden my-3 border border-zinc-700/50 bg-zinc-950">
                                                        <div className="px-3 py-1.5 bg-zinc-800/50 border-b border-zinc-700/50 text-[10px] uppercase tracking-wider font-mono text-zinc-400 flex justify-between">
                                                            <span>{match[1]}</span>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-auto w-auto p-1 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100"
                                                                onClick={() => copyToClipboard(String(children), i)}
                                                            >
                                                                {copiedIndex === i ? (
                                                                    <Check className="w-3 h-3 text-emerald-400" />
                                                                ) : (
                                                                    <Copy className="w-3 h-3" />
                                                                )}
                                                            </Button>
                                                        </div>
                                                        <div className="p-3 overflow-x-auto text-xs">
                                                            <code className={className} {...props}>
                                                                {children}
                                                            </code>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <code className="bg-zinc-800/50 px-1.5 py-0.5 rounded text-indigo-300 font-mono text-xs" {...props}>
                                                        {children}
                                                    </code>
                                                );
                                            },
                                            // Headings - properly styled
                                            h1: ({ node, ...props }: any) => <h1 className="text-xl font-bold text-white mt-4 mb-3 pb-2 border-b border-zinc-700/50" {...props} />,
                                            h2: ({ node, ...props }: any) => <h2 className="text-lg font-semibold text-white mt-4 mb-2" {...props} />,
                                            h3: ({ node, ...props }: any) => <h3 className="text-base font-semibold text-zinc-100 mt-3 mb-2" {...props} />,
                                            h4: ({ node, ...props }: any) => <h4 className="text-sm font-semibold text-zinc-200 mt-2 mb-1" {...props} />,
                                            // Paragraphs with proper spacing
                                            p: ({ node, ...props }: any) => <p className="my-2 leading-relaxed" {...props} />,
                                            // Lists - properly indented
                                            ul: ({ node, ...props }: any) => <ul className="list-disc list-outside ml-5 my-2 space-y-1" {...props} />,
                                            ol: ({ node, ...props }: any) => <ol className="list-decimal list-outside ml-5 my-2 space-y-1" {...props} />,
                                            li: ({ node, ...props }: any) => <li className="pl-1" {...props} />,
                                            // Blockquotes for tips/notes
                                            blockquote: ({ node, ...props }: any) => <blockquote className="border-l-4 border-indigo-500/50 pl-4 my-3 italic text-zinc-400 bg-zinc-800/30 py-2 rounded-r" {...props} />,
                                            // Horizontal rules
                                            hr: ({ node, ...props }: any) => <hr className="my-4 border-zinc-700/50" {...props} />,
                                            // Strong/bold text
                                            strong: ({ node, ...props }: any) => <strong className="font-semibold text-white" {...props} />,
                                            // Emphasis/italic
                                            em: ({ node, ...props }: any) => <em className="italic text-zinc-300" {...props} />,
                                            // Links
                                            a: ({ node, ...props }: any) => <a className="text-indigo-400 hover:text-indigo-300 underline" target="_blank" {...props} />,
                                        }}
                                    >
                                        {msg.content}
                                    </ReactMarkdown>
                                )}
                            </div>

                            {msg.role === 'user' && (
                                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0 mt-1">
                                    <User className="w-4 h-4 text-zinc-400" />
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-4 justify-start">
                            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0 mt-1">
                                <Bot className="w-4 h-4 text-indigo-400" />
                            </div>
                            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-sm px-5 py-4">
                                <div className="flex gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-zinc-600 animate-bounce" />
                                    <span className="w-2 h-2 rounded-full bg-zinc-600 animate-bounce delay-100" />
                                    <span className="w-2 h-2 rounded-full bg-zinc-600 animate-bounce delay-200" />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-zinc-900 border-t border-zinc-800">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit(e);
                        }}
                        className="relative max-w-4xl mx-auto"
                    >
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}
                            placeholder={loadingPage ? "Connecting to page context..." : "Ask BigMind to analyze, generate content, or improve SEO..."}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 pr-12 text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none scrollbar-hide min-h-[50px] max-h-[200px]"
                            rows={1}
                            disabled={loadingPage}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim() || loadingPage}
                            className="absolute right-3 bottom-3 p-1.5 rounded-lg bg-indigo-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-500 transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                    <div className="text-center mt-2">
                        <p className="text-[10px] text-zinc-500">
                            BigMind has full read/write access to this page. content generated is production-ready.
                        </p>
                    </div>
                </div>
            </div>

            {/* Enhancement Panel (Right Sidebar) */}
            <div
                className={`fixed top-0 right-0 h-full w-[400px] bg-zinc-900 border-l border-zinc-800 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${isEnhancementPanelOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900">
                    <div className="flex items-center gap-2">
                        <Wand2 className="w-5 h-5 text-amber-500" />
                        <h3 className="font-semibold text-zinc-100">Suggested Enhancements</h3>
                    </div>
                    <button
                        onClick={() => setIsEnhancementPanelOpen(false)}
                        className="text-zinc-500 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {enhancements.length === 0 ? (
                        <div className="text-center py-10 text-zinc-500">
                            <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p>No enhancements detected yet.</p>
                            <p className="text-xs mt-2">Ask BigMind to "improve SEO" or "generate content" to see suggestions here.</p>
                        </div>
                    ) : (
                        enhancements.map((enhancement, idx) => (
                            <div
                                key={enhancement.id}
                                className={`border rounded-lg overflow-hidden transition-all ${selectedEnhancements.has(enhancement.id) ? 'border-amber-500/50 bg-amber-500/5' : 'border-zinc-800 bg-zinc-900'
                                    }`}
                            >
                                <div className="flex items-start gap-3 p-3 cursor-pointer" onClick={() => {
                                    const newSet = new Set(selectedEnhancements);
                                    if (newSet.has(enhancement.id)) newSet.delete(enhancement.id);
                                    else newSet.add(enhancement.id);
                                    setSelectedEnhancements(newSet);
                                }}>
                                    <div className={`mt-1 w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${selectedEnhancements.has(enhancement.id) ? 'bg-amber-500 border-amber-500' : 'border-zinc-600'
                                        }`}>
                                        {selectedEnhancements.has(enhancement.id) && <Check className="w-3 h-3 text-zinc-900" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs font-mono font-medium text-amber-500 uppercase tracking-wider">
                                                {enhancement.type}
                                            </span>
                                        </div>
                                        {/* Content Preview */}
                                        <div className="text-sm text-zinc-300 line-clamp-3 font-mono bg-zinc-950/50 p-2 rounded text-[10px] leading-relaxed">
                                            {enhancement.content}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-4 border-t border-zinc-800 bg-zinc-900">
                    <div className="flex justify-between items-center mb-4 text-xs text-zinc-500">
                        <span>{selectedEnhancements.size} selected</span>
                        <button onClick={() => setSelectedEnhancements(new Set())} className="hover:text-zinc-300">Clear all</button>
                    </div>
                    <button
                        onClick={applyEnhancements}
                        disabled={selectedEnhancements.size === 0}
                        className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                        <Sparkles className="w-4 h-4" />
                        Apply Changes to Page
                    </button>
                </div>
            </div>

            {/* Magic Page Popup Modal - Enhanced with Tabs */}
            {magicPagePopup.open && magicPagePopup.data && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-zinc-900 border border-zinc-700 rounded-xl w-full max-w-2xl shadow-2xl max-h-[85vh] flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-700 flex-shrink-0">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-purple-400" />
                                <h3 className="font-semibold text-zinc-100">Create Magic Page</h3>
                            </div>
                            <button onClick={() => { setMagicPagePopup({ open: false, data: null, loading: false }); setMagicTabIndex(0); }} className="text-zinc-500 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex border-b border-zinc-700 px-5 flex-shrink-0">
                            {['Core', 'SEO', 'Visual', 'Content'].map((tab, i) => (
                                <button
                                    key={tab}
                                    onClick={() => setMagicTabIndex(i)}
                                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${magicTabIndex === i
                                        ? 'border-purple-500 text-purple-400'
                                        : 'border-transparent text-zinc-500 hover:text-zinc-300'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4">
                            {/* Core Tab */}
                            {magicTabIndex === 0 && (
                                <>
                                    <div>
                                        <label className="text-xs font-medium text-zinc-500 mb-1 block">Page Title</label>
                                        <div className="text-lg font-semibold text-zinc-100">{magicPagePopup.data.title}</div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-zinc-500 mb-1 block">Path</label>
                                        <div className="text-sm font-mono text-purple-400 bg-zinc-800 px-3 py-2 rounded">{magicPagePopup.data.path || magicPagePopup.data.slug}</div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="text-xs font-medium text-zinc-500 mb-1 block">Zone</label>
                                            <div className="text-sm text-zinc-300">Zone {magicPagePopup.data.zone}</div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-zinc-500 mb-1 block">Cluster</label>
                                            <div className="text-sm text-zinc-300">{magicPagePopup.data.cluster}</div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-zinc-500 mb-1 block">Template</label>
                                            <div className="text-sm text-zinc-300">{magicPagePopup.data.template || 'article'}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-zinc-500 mb-1 block">Description</label>
                                        <div className="text-sm text-zinc-400">{magicPagePopup.data.description}</div>
                                    </div>
                                </>
                            )}

                            {/* SEO Tab */}
                            {magicTabIndex === 1 && magicPagePopup.data.seo && (
                                <>
                                    <div className="border border-emerald-500/30 rounded-lg p-4 bg-emerald-500/5">
                                        <label className="text-xs font-medium text-emerald-400 mb-2 block">SEO Title</label>
                                        <div className="text-sm text-zinc-200">{magicPagePopup.data.seo.title}</div>
                                        <div className="text-[10px] text-zinc-500 mt-1">{magicPagePopup.data.seo.title?.length || 0}/60 characters</div>
                                    </div>
                                    <div className="border border-emerald-500/30 rounded-lg p-4 bg-emerald-500/5">
                                        <label className="text-xs font-medium text-emerald-400 mb-2 block">Meta Description</label>
                                        <div className="text-sm text-zinc-200">{magicPagePopup.data.seo.description}</div>
                                        <div className="text-[10px] text-zinc-500 mt-1">{magicPagePopup.data.seo.description?.length || 0}/155 characters</div>
                                    </div>
                                    <div className="border border-emerald-500/30 rounded-lg p-4 bg-emerald-500/5">
                                        <label className="text-xs font-medium text-emerald-400 mb-2 block">Focus Keywords</label>
                                        <div className="flex flex-wrap gap-2">
                                            {magicPagePopup.data.seo.focus?.split(',').map((kw: string, i: number) => (
                                                <span key={i} className="px-2 py-1 text-xs bg-emerald-500/20 text-emerald-300 rounded">{kw.trim()}</span>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                            {magicTabIndex === 1 && !magicPagePopup.data.seo && (
                                <div className="text-center py-8 text-zinc-500">
                                    <p>No SEO data available for this page suggestion.</p>
                                </div>
                            )}

                            {/* Visual Tab */}
                            {magicTabIndex === 2 && magicPagePopup.data.visualConfig && (
                                <>
                                    <div className="border border-purple-500/30 rounded-lg p-4 bg-purple-500/5">
                                        <label className="text-xs font-medium text-purple-400 mb-2 block">Vibe Keywords</label>
                                        <div className="flex flex-wrap gap-2">
                                            {magicPagePopup.data.visualConfig.vibeKeywords?.map((kw: string, i: number) => (
                                                <span key={i} className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded">{kw}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="border border-purple-500/30 rounded-lg p-4 bg-purple-500/5">
                                        <label className="text-xs font-medium text-purple-400 mb-2 block">Emotional Tone</label>
                                        <div className="flex flex-wrap gap-2">
                                            {magicPagePopup.data.visualConfig.emotionalTone?.map((tone: string, i: number) => (
                                                <span key={i} className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded">{tone}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="border border-purple-500/30 rounded-lg p-4 bg-purple-500/5">
                                            <label className="text-xs font-medium text-purple-400 mb-2 block">Color Palette</label>
                                            <div className="text-sm text-zinc-200">{magicPagePopup.data.visualConfig.colorPalette}</div>
                                        </div>
                                        <div className="border border-purple-500/30 rounded-lg p-4 bg-purple-500/5">
                                            <label className="text-xs font-medium text-purple-400 mb-2 block">Motion Preset</label>
                                            <div className="text-sm text-zinc-200">{magicPagePopup.data.visualConfig.motionPreset}</div>
                                        </div>
                                    </div>
                                    <div className="border border-blue-500/30 rounded-lg p-4 bg-blue-500/5">
                                        <label className="text-xs font-medium text-blue-400 mb-2 block">🖼️ AI Image Prompt</label>
                                        <div className="text-sm text-zinc-300 italic">{magicPagePopup.data.visualConfig.aiImagePrompt}</div>
                                    </div>
                                </>
                            )}
                            {magicTabIndex === 2 && !magicPagePopup.data.visualConfig && (
                                <div className="text-center py-8 text-zinc-500">
                                    <p>No visual config available for this page suggestion.</p>
                                </div>
                            )}

                            {/* Content Tab */}
                            {magicTabIndex === 3 && (
                                <>
                                    <div className="border border-zinc-700 rounded-lg p-4">
                                        <label className="text-xs font-medium text-zinc-400 mb-3 block">📋 Content Outline</label>
                                        <div className="space-y-2">
                                            {magicPagePopup.data.contentOutline?.map((section: string, i: number) => (
                                                <div key={i} className="flex items-start gap-2">
                                                    <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                                                    <span className="text-sm text-zinc-300">{section}</span>
                                                </div>
                                            ))}
                                            {!magicPagePopup.data.contentOutline && (
                                                <p className="text-sm text-zinc-500">Content outline will be generated during page creation.</p>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Footer with Generate Button */}
                        <div className="px-5 py-4 border-t border-zinc-700 flex gap-3 flex-shrink-0">
                            <button
                                onClick={() => { setMagicPagePopup({ open: false, data: null, loading: false }); setMagicTabIndex(0); }}
                                className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    setMagicPagePopup(p => ({ ...p, loading: true }));
                                    try {
                                        const d = magicPagePopup.data;
                                        const res = await fetch('/api/admin/pages', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                                            body: JSON.stringify({
                                                title: d.title,
                                                path: d.path || d.slug,
                                                clusterKey: d.cluster,
                                                template: d.template || 'article',
                                                status: 'draft',
                                                summary: d.description,
                                                seoTitle: d.seo?.title,
                                                seoDescription: d.seo?.description,
                                                seoFocus: d.seo?.focus,
                                                visualConfig: d.visualConfig,
                                            }),
                                        });
                                        if (res.ok) {
                                            toast({ title: "✨ Page Created!", description: `Draft page "${d.title}" created with all fields populated.` });
                                            setMagicPagePopup({ open: false, data: null, loading: false });
                                            setMagicTabIndex(0);
                                        } else {
                                            throw new Error('Failed');
                                        }
                                    } catch {
                                        toast({ title: "Error", description: "Failed to create page", variant: "destructive" });
                                        setMagicPagePopup(p => ({ ...p, loading: false }));
                                    }
                                }}
                                disabled={magicPagePopup.loading}
                                className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                {magicPagePopup.loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                                {magicPagePopup.loading ? 'Creating...' : 'Generate Full Page'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Page Edit Popup Modal - Enhanced with Tabs */}
            {pageEditPopup.open && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-zinc-900 border border-zinc-700 rounded-xl w-full max-w-2xl shadow-2xl max-h-[85vh] flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-700 flex-shrink-0">
                            <div className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-400" />
                                <h3 className="font-semibold text-zinc-100">Edit Page Draft</h3>
                            </div>
                            <button onClick={() => { setPageEditPopup({ open: false, pageId: '', pageData: null, suggestions: {}, loading: false }); setEditTabIndex(0); }} className="text-zinc-500 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {pageEditPopup.loading ? (
                            <div className="p-8 text-center">
                                <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-400" />
                                <p className="text-zinc-400 mt-2">Loading page data...</p>
                            </div>
                        ) : pageEditPopup.pageData && (
                            <>
                                {/* Tab Navigation */}
                                <div className="flex border-b border-zinc-700 px-5 flex-shrink-0 overflow-x-auto">
                                    {['Core', 'SEO', 'Visual', 'Motion', 'Content', 'Preview'].map((tab, i) => (
                                        <button
                                            key={tab}
                                            onClick={() => setEditTabIndex(i)}
                                            className={`px-3 py-2.5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${editTabIndex === i
                                                ? 'border-blue-500 text-blue-400'
                                                : 'border-transparent text-zinc-500 hover:text-zinc-300'
                                                }`}
                                        >
                                            {tab}
                                            {/* Badge for suggestions count */}
                                            {i === 1 && (pageEditPopup.suggestions.seoTitle || pageEditPopup.suggestions.seoDescription || pageEditPopup.suggestions.seoFocus) && (
                                                <span className="ml-1 w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block" />
                                            )}
                                            {i === 2 && (pageEditPopup.suggestions.vibeKeywords || pageEditPopup.suggestions.emotionalTone || pageEditPopup.suggestions.colorPalette || pageEditPopup.suggestions.aiImagePrompt) && (
                                                <span className="ml-1 w-1.5 h-1.5 bg-purple-500 rounded-full inline-block" />
                                            )}
                                            {i === 3 && (pageEditPopup.suggestions.motionPreset || pageEditPopup.suggestions.entranceMotion || pageEditPopup.suggestions.hoverMotion || pageEditPopup.suggestions.ambientMotion) && (
                                                <span className="ml-1 w-1.5 h-1.5 bg-cyan-500 rounded-full inline-block" />
                                            )}
                                            {i === 4 && (pageEditPopup.pageData?.aiStartupHtml || pageEditPopup.pageData?.content) && (
                                                <span className="ml-1 w-1.5 h-1.5 bg-amber-500 rounded-full inline-block" />
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {/* Tab Content */}
                                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                                    {/* Core Tab */}
                                    {editTabIndex === 0 && (
                                        <>
                                            <div>
                                                <label className="text-xs font-medium text-zinc-500 mb-1 block">Page Title</label>
                                                <div className="text-lg font-semibold text-zinc-100">{pageEditPopup.pageData.title}</div>
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-zinc-500 mb-1 block">Path</label>
                                                <div className="text-sm font-mono text-blue-400 bg-zinc-800 px-3 py-2 rounded">{pageEditPopup.pageData.path}</div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div>
                                                    <label className="text-xs font-medium text-zinc-500 mb-1 block">Template</label>
                                                    <div className="text-sm text-zinc-300">{pageEditPopup.pageData.template || 'article'}</div>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-medium text-zinc-500 mb-1 block">Cluster</label>
                                                    <div className="text-sm text-zinc-300">{pageEditPopup.pageData.clusterKey || 'none'}</div>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-medium text-zinc-500 mb-1 block">Status</label>
                                                    <div className="text-sm text-zinc-300">{pageEditPopup.pageData.status}</div>
                                                </div>
                                            </div>

                                            {/* Suggested Content / Summary */}
                                            <div className="border border-zinc-700 rounded-lg p-4">
                                                <label className="text-xs font-medium text-zinc-400 mb-2 block">Suggested Content / Summary</label>
                                                <div className="flex gap-2">
                                                    <textarea
                                                        value={pageEditPopup.pageData.summary || ''}
                                                        onChange={(e) => setPageEditPopup(p => ({ ...p, pageData: { ...p.pageData, summary: e.target.value } }))}
                                                        placeholder={pageEditPopup.suggestions.summary || 'Describe the page content, main topics, and key points...'}
                                                        rows={4}
                                                        className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none resize-none"
                                                    />
                                                    <button
                                                        onClick={async () => {
                                                            const res = await fetch(`/api/admin/pages/${pageEditPopup.pageId}`, {
                                                                method: 'PATCH',
                                                                headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                                                                body: JSON.stringify({ summary: pageEditPopup.pageData.summary }),
                                                            });
                                                            if (res.ok) toast({ title: "Saved!", description: "Content summary updated" });
                                                        }}
                                                        className="px-3 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white rounded h-fit"
                                                    >Save</button>
                                                </div>
                                                {pageEditPopup.suggestions.summary && !pageEditPopup.pageData.summary && (
                                                    <button
                                                        onClick={() => setPageEditPopup(p => ({ ...p, pageData: { ...p.pageData, summary: p.suggestions.summary } }))}
                                                        className="mt-2 text-xs text-blue-400 hover:text-blue-300"
                                                    >↑ Use suggestion</button>
                                                )}
                                            </div>
                                        </>
                                    )}

                                    {/* SEO Tab */}
                                    {editTabIndex === 1 && (
                                        <>
                                            {/* SEO QA Score Card */}
                                            {(() => {
                                                const pd = pageEditPopup.pageData;
                                                const vc = pd?.visualConfig || {};
                                                let score = 0;
                                                const breakdown: { label: string; pts: number; max: number; status: 'good' | 'warn' | 'bad' }[] = [];

                                                // Title (20pts)
                                                const titleLen = (pd?.seoTitle || '').length;
                                                if (titleLen >= 50 && titleLen <= 60) {
                                                    breakdown.push({ label: 'Title', pts: 20, max: 20, status: 'good' });
                                                    score += 20;
                                                } else if (titleLen > 0) {
                                                    breakdown.push({ label: 'Title', pts: 10, max: 20, status: 'warn' });
                                                    score += 10;
                                                } else {
                                                    breakdown.push({ label: 'Title', pts: 0, max: 20, status: 'bad' });
                                                }

                                                // Description (20pts)
                                                const descLen = (pd?.seoDescription || '').length;
                                                if (descLen >= 150 && descLen <= 160) {
                                                    breakdown.push({ label: 'Meta', pts: 20, max: 20, status: 'good' });
                                                    score += 20;
                                                } else if (descLen > 0) {
                                                    breakdown.push({ label: 'Meta', pts: 10, max: 20, status: 'warn' });
                                                    score += 10;
                                                } else {
                                                    breakdown.push({ label: 'Meta', pts: 0, max: 20, status: 'bad' });
                                                }

                                                // Focus Keyword (15pts)
                                                if (pd?.seoFocus) {
                                                    breakdown.push({ label: 'Keywords', pts: 15, max: 15, status: 'good' });
                                                    score += 15;
                                                } else {
                                                    breakdown.push({ label: 'Keywords', pts: 0, max: 15, status: 'bad' });
                                                }

                                                // Content (25pts)
                                                const content = pd?.content || pd?.aiStartupHtml || '';
                                                const wordCount = content.split(/\s+/).length;
                                                if (wordCount >= 800) {
                                                    breakdown.push({ label: 'Content', pts: 25, max: 25, status: 'good' });
                                                    score += 25;
                                                } else if (wordCount >= 300) {
                                                    breakdown.push({ label: 'Content', pts: 15, max: 25, status: 'warn' });
                                                    score += 15;
                                                } else {
                                                    breakdown.push({ label: 'Content', pts: 5, max: 25, status: 'bad' });
                                                    score += 5;
                                                }

                                                // Internal Links (10pts)
                                                const linkCount = (pd?.internalLinks || []).length;
                                                if (linkCount >= 5) {
                                                    breakdown.push({ label: 'Links', pts: 10, max: 10, status: 'good' });
                                                    score += 10;
                                                } else if (linkCount > 0) {
                                                    breakdown.push({ label: 'Links', pts: 5, max: 10, status: 'warn' });
                                                    score += 5;
                                                } else {
                                                    breakdown.push({ label: 'Links', pts: 0, max: 10, status: 'bad' });
                                                }

                                                // Featured Image (10pts)
                                                if (pd?.featuredImage || vc?.aiImagePrompt) {
                                                    breakdown.push({ label: 'Image', pts: 10, max: 10, status: 'good' });
                                                    score += 10;
                                                } else {
                                                    breakdown.push({ label: 'Image', pts: 0, max: 10, status: 'bad' });
                                                }

                                                const grade = score >= 85 ? 'A' : score >= 70 ? 'B' : score >= 55 ? 'C' : score >= 40 ? 'D' : 'F';
                                                const gradeColor = score >= 85 ? 'text-emerald-400' : score >= 70 ? 'text-blue-400' : score >= 55 ? 'text-amber-400' : 'text-red-400';
                                                const canPublish = score >= 85;

                                                return (
                                                    <div className={`border rounded-lg p-4 mb-4 ${canPublish ? 'border-emerald-500/50 bg-emerald-900/10' : 'border-amber-500/50 bg-amber-900/10'}`}>
                                                        <div className="flex items-center justify-between mb-3">
                                                            <div className="flex items-center gap-3">
                                                                <div className={`text-3xl font-bold ${gradeColor}`}>{grade}</div>
                                                                <div>
                                                                    <div className="text-sm font-medium text-zinc-200">SEO QA Score</div>
                                                                    <div className="text-xs text-zinc-400">{score}/100 • {canPublish ? '✓ Ready to publish' : 'Needs work (85+ to publish)'}</div>
                                                                </div>
                                                            </div>
                                                            <div className="w-16 h-16 relative">
                                                                <svg className="w-16 h-16 -rotate-90">
                                                                    <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="6" className="text-zinc-700" />
                                                                    <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="6"
                                                                        className={gradeColor.replace('text-', 'stroke-')}
                                                                        strokeDasharray={`${(score / 100) * 176} 176`}
                                                                        strokeLinecap="round"
                                                                    />
                                                                </svg>
                                                                <div className={`absolute inset-0 flex items-center justify-center text-lg font-bold ${gradeColor}`}>{score}</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {breakdown.map((b, i) => (
                                                                <div key={i} className={`text-[10px] px-2 py-1 rounded ${b.status === 'good' ? 'bg-emerald-500/20 text-emerald-400' :
                                                                    b.status === 'warn' ? 'bg-amber-500/20 text-amber-400' :
                                                                        'bg-red-500/20 text-red-400'
                                                                    }`}>
                                                                    {b.label} {b.pts}/{b.max}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            })()}

                                            {/* SEO Title */}
                                            <div className="border border-zinc-700 rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="text-xs font-medium text-zinc-400">SEO Title</label>
                                                    <span className="text-[10px] text-zinc-500">{(pageEditPopup.pageData.seoTitle || '').length}/60</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={pageEditPopup.pageData.seoTitle || ''}
                                                        onChange={(e) => setPageEditPopup(p => ({ ...p, pageData: { ...p.pageData, seoTitle: e.target.value } }))}
                                                        placeholder={pageEditPopup.suggestions.seoTitle || 'Enter SEO title...'}
                                                        className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-200 placeholder:text-emerald-400/50 focus:border-emerald-500 focus:outline-none"
                                                    />
                                                    <button
                                                        onClick={async () => {
                                                            const res = await fetch(`/api/admin/pages/${pageEditPopup.pageId}`, {
                                                                method: 'PATCH',
                                                                headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                                                                body: JSON.stringify({ seoTitle: pageEditPopup.pageData.seoTitle }),
                                                            });
                                                            if (res.ok) toast({ title: "Saved!", description: "SEO Title updated" });
                                                        }}
                                                        className="px-3 py-2 text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded"
                                                    >Save</button>
                                                </div>
                                                {pageEditPopup.suggestions.seoTitle && !pageEditPopup.pageData.seoTitle && (
                                                    <button
                                                        onClick={() => setPageEditPopup(p => ({ ...p, pageData: { ...p.pageData, seoTitle: p.suggestions.seoTitle } }))}
                                                        className="mt-2 text-xs text-emerald-400 hover:text-emerald-300"
                                                    >↑ Use suggestion</button>
                                                )}
                                            </div>

                                            {/* Meta Description */}
                                            <div className="border border-zinc-700 rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="text-xs font-medium text-zinc-400">Meta Description</label>
                                                    <span className="text-[10px] text-zinc-500">{(pageEditPopup.pageData.seoDescription || '').length}/155</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <textarea
                                                        value={pageEditPopup.pageData.seoDescription || ''}
                                                        onChange={(e) => setPageEditPopup(p => ({ ...p, pageData: { ...p.pageData, seoDescription: e.target.value } }))}
                                                        placeholder={pageEditPopup.suggestions.seoDescription || 'Enter meta description...'}
                                                        rows={3}
                                                        className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-200 placeholder:text-emerald-400/50 focus:border-emerald-500 focus:outline-none resize-none"
                                                    />
                                                    <button
                                                        onClick={async () => {
                                                            const res = await fetch(`/api/admin/pages/${pageEditPopup.pageId}`, {
                                                                method: 'PATCH',
                                                                headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                                                                body: JSON.stringify({ seoDescription: pageEditPopup.pageData.seoDescription }),
                                                            });
                                                            if (res.ok) toast({ title: "Saved!", description: "Meta Description updated" });
                                                        }}
                                                        className="px-3 py-2 text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded h-fit"
                                                    >Save</button>
                                                </div>
                                                {pageEditPopup.suggestions.seoDescription && !pageEditPopup.pageData.seoDescription && (
                                                    <button
                                                        onClick={() => setPageEditPopup(p => ({ ...p, pageData: { ...p.pageData, seoDescription: p.suggestions.seoDescription } }))}
                                                        className="mt-2 text-xs text-emerald-400 hover:text-emerald-300"
                                                    >↑ Use suggestion</button>
                                                )}
                                            </div>

                                            {/* Focus Keywords */}
                                            <div className="border border-zinc-700 rounded-lg p-4">
                                                <label className="text-xs font-medium text-zinc-400 mb-2 block">Focus Keywords</label>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={pageEditPopup.pageData.seoFocus || ''}
                                                        onChange={(e) => setPageEditPopup(p => ({ ...p, pageData: { ...p.pageData, seoFocus: e.target.value } }))}
                                                        placeholder={pageEditPopup.suggestions.seoFocus || 'keyword1, keyword2, keyword3'}
                                                        className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-200 placeholder:text-emerald-400/50 focus:border-emerald-500 focus:outline-none"
                                                    />
                                                    <button
                                                        onClick={async () => {
                                                            const res = await fetch(`/api/admin/pages/${pageEditPopup.pageId}`, {
                                                                method: 'PATCH',
                                                                headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                                                                body: JSON.stringify({ seoFocus: pageEditPopup.pageData.seoFocus }),
                                                            });
                                                            if (res.ok) toast({ title: "Saved!", description: "Focus Keywords updated" });
                                                        }}
                                                        className="px-3 py-2 text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded"
                                                    >Save</button>
                                                </div>
                                                {pageEditPopup.suggestions.seoFocus && !pageEditPopup.pageData.seoFocus && (
                                                    <button
                                                        onClick={() => setPageEditPopup(p => ({ ...p, pageData: { ...p.pageData, seoFocus: p.suggestions.seoFocus } }))}
                                                        className="mt-2 text-xs text-emerald-400 hover:text-emerald-300"
                                                    >↑ Use suggestion</button>
                                                )}
                                            </div>
                                        </>
                                    )}

                                    {/* Visual Tab */}
                                    {editTabIndex === 2 && (
                                        <>
                                            {/* Vibe Keywords */}
                                            <div className="border border-purple-500/30 rounded-lg p-4 bg-purple-500/5">
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="text-xs font-medium text-purple-400">Vibe Keywords</label>
                                                    {!pageEditPopup.pageData.visualConfig?.vibeKeywords?.length && <span className="text-[10px] text-amber-400">Missing</span>}
                                                </div>
                                                {pageEditPopup.pageData.visualConfig?.vibeKeywords?.length ? (
                                                    <div className="flex flex-wrap gap-2">
                                                        {pageEditPopup.pageData.visualConfig.vibeKeywords.map((kw: string, i: number) => (
                                                            <span key={i} className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded">{kw}</span>
                                                        ))}
                                                    </div>
                                                ) : pageEditPopup.suggestions.vibeKeywords && (
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex-1 flex flex-wrap gap-2">
                                                            {pageEditPopup.suggestions.vibeKeywords.map((kw: string, i: number) => (
                                                                <span key={i} className="px-2 py-1 text-xs bg-purple-500/30 text-purple-300 rounded">{kw}</span>
                                                            ))}
                                                        </div>
                                                        <button
                                                            onClick={async () => {
                                                                const vc = pageEditPopup.pageData.visualConfig || {};
                                                                const res = await fetch(`/api/admin/pages/${pageEditPopup.pageId}`, {
                                                                    method: 'PATCH',
                                                                    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                                                                    body: JSON.stringify({ visualConfig: { ...vc, vibeKeywords: pageEditPopup.suggestions.vibeKeywords } }),
                                                                });
                                                                if (res.ok) {
                                                                    setPageEditPopup(p => ({ ...p, pageData: { ...p.pageData, visualConfig: { ...vc, vibeKeywords: p.suggestions.vibeKeywords } }, suggestions: { ...p.suggestions, vibeKeywords: undefined } }));
                                                                    toast({ title: "Applied!", description: "Vibe Keywords updated" });
                                                                }
                                                            }}
                                                            className="px-3 py-2 text-xs font-medium bg-purple-600 hover:bg-purple-500 text-white rounded"
                                                        >Apply</button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Emotional Tone */}
                                            <div className="border border-purple-500/30 rounded-lg p-4 bg-purple-500/5">
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="text-xs font-medium text-purple-400">Emotional Tone</label>
                                                    {!pageEditPopup.pageData.visualConfig?.emotionalTone?.length && <span className="text-[10px] text-amber-400">Missing</span>}
                                                </div>
                                                {pageEditPopup.pageData.visualConfig?.emotionalTone?.length ? (
                                                    <div className="flex flex-wrap gap-2">
                                                        {pageEditPopup.pageData.visualConfig.emotionalTone.map((tone: string, i: number) => (
                                                            <span key={i} className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded">{tone}</span>
                                                        ))}
                                                    </div>
                                                ) : pageEditPopup.suggestions.emotionalTone && (
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex-1 flex flex-wrap gap-2">
                                                            {pageEditPopup.suggestions.emotionalTone.map((tone: string, i: number) => (
                                                                <span key={i} className="px-2 py-1 text-xs bg-purple-500/30 text-purple-300 rounded">{tone}</span>
                                                            ))}
                                                        </div>
                                                        <button
                                                            onClick={async () => {
                                                                const vc = pageEditPopup.pageData.visualConfig || {};
                                                                const res = await fetch(`/api/admin/pages/${pageEditPopup.pageId}`, {
                                                                    method: 'PATCH',
                                                                    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                                                                    body: JSON.stringify({ visualConfig: { ...vc, emotionalTone: pageEditPopup.suggestions.emotionalTone } }),
                                                                });
                                                                if (res.ok) {
                                                                    setPageEditPopup(p => ({ ...p, pageData: { ...p.pageData, visualConfig: { ...vc, emotionalTone: p.suggestions.emotionalTone } }, suggestions: { ...p.suggestions, emotionalTone: undefined } }));
                                                                    toast({ title: "Applied!", description: "Emotional Tone updated" });
                                                                }
                                                            }}
                                                            className="px-3 py-2 text-xs font-medium bg-purple-600 hover:bg-purple-500 text-white rounded"
                                                        >Apply</button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Animation Ideas */}
                                            <div className="border border-purple-500/30 rounded-lg p-4 bg-purple-500/5">
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="text-xs font-medium text-purple-400">Animation Ideas</label>
                                                    {!pageEditPopup.pageData.visualConfig?.animationIdeas?.length && <span className="text-[10px] text-amber-400">Missing</span>}
                                                </div>
                                                {pageEditPopup.pageData.visualConfig?.animationIdeas?.length ? (
                                                    <div className="flex flex-wrap gap-2">
                                                        {pageEditPopup.pageData.visualConfig.animationIdeas.map((idea: string, i: number) => (
                                                            <span key={i} className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded">{idea}</span>
                                                        ))}
                                                    </div>
                                                ) : pageEditPopup.suggestions.animationIdeas && (
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex-1 flex flex-wrap gap-2">
                                                            {pageEditPopup.suggestions.animationIdeas.map((idea: string, i: number) => (
                                                                <span key={i} className="px-2 py-1 text-xs bg-purple-500/30 text-purple-300 rounded">{idea}</span>
                                                            ))}
                                                        </div>
                                                        <button
                                                            onClick={async () => {
                                                                const vc = pageEditPopup.pageData.visualConfig || {};
                                                                const res = await fetch(`/api/admin/pages/${pageEditPopup.pageId}`, {
                                                                    method: 'PATCH',
                                                                    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                                                                    body: JSON.stringify({ visualConfig: { ...vc, animationIdeas: pageEditPopup.suggestions.animationIdeas } }),
                                                                });
                                                                if (res.ok) {
                                                                    setPageEditPopup(p => ({ ...p, pageData: { ...p.pageData, visualConfig: { ...vc, animationIdeas: p.suggestions.animationIdeas } }, suggestions: { ...p.suggestions, animationIdeas: undefined } }));
                                                                    toast({ title: "Applied!", description: "Animation Ideas updated" });
                                                                }
                                                            }}
                                                            className="px-3 py-2 text-xs font-medium bg-purple-600 hover:bg-purple-500 text-white rounded"
                                                        >Apply</button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Color Palette */}
                                            <div className="border border-purple-500/30 rounded-lg p-4 bg-purple-500/5">
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="text-xs font-medium text-purple-400">Color Palette</label>
                                                    {!pageEditPopup.pageData.visualConfig?.colorPalette && <span className="text-[10px] text-amber-400">Missing</span>}
                                                </div>
                                                {pageEditPopup.pageData.visualConfig?.colorPalette ? (
                                                    <div className="text-sm text-zinc-300">{pageEditPopup.pageData.visualConfig.colorPalette}</div>
                                                ) : pageEditPopup.suggestions.colorPalette && (
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex-1 text-sm text-purple-400 bg-purple-500/20 px-3 py-2 rounded">{pageEditPopup.suggestions.colorPalette}</div>
                                                        <button
                                                            onClick={async () => {
                                                                const vc = pageEditPopup.pageData.visualConfig || {};
                                                                const res = await fetch(`/api/admin/pages/${pageEditPopup.pageId}`, {
                                                                    method: 'PATCH',
                                                                    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                                                                    body: JSON.stringify({ visualConfig: { ...vc, colorPalette: pageEditPopup.suggestions.colorPalette } }),
                                                                });
                                                                if (res.ok) {
                                                                    setPageEditPopup(p => ({ ...p, pageData: { ...p.pageData, visualConfig: { ...vc, colorPalette: p.suggestions.colorPalette } }, suggestions: { ...p.suggestions, colorPalette: undefined } }));
                                                                    toast({ title: "Applied!", description: "Color Palette updated" });
                                                                }
                                                            }}
                                                            className="px-3 py-2 text-xs font-medium bg-purple-600 hover:bg-purple-500 text-white rounded"
                                                        >Apply</button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* AI Image Prompts - Dynamic */}
                                            <div className="border border-blue-500/30 rounded-lg p-4 bg-blue-500/5">
                                                <div className="flex items-center justify-between mb-3">
                                                    <label className="text-xs font-medium text-blue-400">🖼️ AI Image Prompts</label>
                                                    <div className="flex items-center gap-2">
                                                        {/* Detect Images Button */}
                                                        <button
                                                            onClick={() => {
                                                                const html = pageEditPopup.pageData.aiStartupHtml || pageEditPopup.pageData.content || '';
                                                                const title = pageEditPopup.pageData.title || '';
                                                                const vc = pageEditPopup.pageData.visualConfig || {};

                                                                // Detect image opportunities from HTML sections
                                                                const detectedImages: { label: string; prompt: string }[] = [];

                                                                // Always add Hero Image first
                                                                detectedImages.push({
                                                                    label: 'Hero Image',
                                                                    prompt: vc.aiImagePrompt || `Premium hero image for ${title}: dark background with subtle water science visualization, bio-luminescent particles, depth and atmosphere`
                                                                });

                                                                // Detect sections from HTML
                                                                const sectionRegex = /<section[^>]*>[\s\S]*?<\/section>/gi;
                                                                const h2Regex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
                                                                const h3Regex = /<h3[^>]*>([\s\S]*?)<\/h3>/gi;

                                                                // Find all sections
                                                                const sections = html.match(sectionRegex) || [];
                                                                sections.forEach((section: string, idx: number) => {
                                                                    // Extract heading from section
                                                                    const h2Match = /<h2[^>]*>([\s\S]*?)<\/h2>/i.exec(section);
                                                                    const h3Match = /<h3[^>]*>([\s\S]*?)<\/h3>/i.exec(section);
                                                                    const heading = h2Match?.[1] || h3Match?.[1] || '';
                                                                    const cleanHeading = heading.replace(/<[^>]*>/g, '').trim().slice(0, 50);

                                                                    if (cleanHeading && idx > 0) { // Skip hero, already added
                                                                        // Extract text content for context
                                                                        const textContent = section.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 200);

                                                                        detectedImages.push({
                                                                            label: cleanHeading || `Section ${idx + 1}`,
                                                                            prompt: `Image for "${cleanHeading}": ${textContent.slice(0, 100)}... - Premium visualization, dark mode, Andara style`
                                                                        });
                                                                    }
                                                                });

                                                                // Also detect feature cards / grid items
                                                                const cardRegex = /class="[^"]*(?:card|feature|benefit|step)[^"]*"[\s\S]*?<h[34][^>]*>([\s\S]*?)<\/h[34]>/gi;
                                                                let cardMatch;
                                                                let cardIdx = 0;
                                                                while ((cardMatch = cardRegex.exec(html)) !== null && cardIdx < 4) {
                                                                    const heading = cardMatch[1].replace(/<[^>]*>/g, '').trim().slice(0, 40);
                                                                    if (heading && !detectedImages.find(i => i.label === heading)) {
                                                                        detectedImages.push({
                                                                            label: `Card: ${heading}`,
                                                                            prompt: `Icon/illustration for "${heading}": minimalist, premium, Andara dark style with subtle glow`
                                                                        });
                                                                        cardIdx++;
                                                                    }
                                                                }

                                                                // Update state with detected images
                                                                setPageEditPopup(p => ({
                                                                    ...p,
                                                                    pageData: {
                                                                        ...p.pageData,
                                                                        visualConfig: {
                                                                            ...vc,
                                                                            imagePrompts: detectedImages,
                                                                            aiImagePrompt: detectedImages[0]?.prompt || vc.aiImagePrompt
                                                                        }
                                                                    }
                                                                }));

                                                                toast({
                                                                    title: "🔍 Images Detected!",
                                                                    description: `Found ${detectedImages.length} image opportunities from page content.`,
                                                                });
                                                            }}
                                                            className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                                                        >
                                                            <Search className="w-3 h-3" /> Detect Images
                                                        </button>
                                                        {/* Add Image Button */}
                                                        <button
                                                            onClick={() => {
                                                                const vc = pageEditPopup.pageData.visualConfig || {};
                                                                const images = [...(vc.imagePrompts || [{ label: 'Hero Image', prompt: '' }])];
                                                                images.push({ label: `Image ${images.length + 1}`, prompt: '' });
                                                                setPageEditPopup(p => ({ ...p, pageData: { ...p.pageData, visualConfig: { ...vc, imagePrompts: images } } }));
                                                            }}
                                                            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                                        >
                                                            <Plus className="w-3 h-3" /> Add Image
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Dynamic Image List */}
                                                {(pageEditPopup.pageData.visualConfig?.imagePrompts || [{ label: 'Hero Image', prompt: pageEditPopup.pageData.visualConfig?.aiImagePrompt || '' }]).map((img: any, idx: number) => (
                                                    <div key={idx} className="mb-3 relative group">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <input
                                                                type="text"
                                                                value={img.label || `Image ${idx + 1}`}
                                                                onChange={(e) => {
                                                                    const vc = pageEditPopup.pageData.visualConfig || {};
                                                                    const images = [...(vc.imagePrompts || [])];
                                                                    images[idx] = { ...images[idx], label: e.target.value };
                                                                    setPageEditPopup(p => ({ ...p, pageData: { ...p.pageData, visualConfig: { ...vc, imagePrompts: images } } }));
                                                                }}
                                                                className="text-[10px] text-zinc-400 bg-transparent border-none focus:outline-none w-24"
                                                            />
                                                            {idx > 0 && (
                                                                <button
                                                                    onClick={() => {
                                                                        const vc = pageEditPopup.pageData.visualConfig || {};
                                                                        const images = [...(vc.imagePrompts || [])];
                                                                        images.splice(idx, 1);
                                                                        setPageEditPopup(p => ({ ...p, pageData: { ...p.pageData, visualConfig: { ...vc, imagePrompts: images } } }));
                                                                    }}
                                                                    className="text-xs text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                                                                >✕</button>
                                                            )}
                                                        </div>
                                                        <textarea
                                                            value={img.prompt || ''}
                                                            onChange={(e) => {
                                                                const vc = pageEditPopup.pageData.visualConfig || {};
                                                                const images = [...(vc.imagePrompts || [{ label: 'Hero Image', prompt: '' }])];
                                                                images[idx] = { ...images[idx], prompt: e.target.value };
                                                                // Also update aiImagePrompt if it's the first image
                                                                const updates: any = { imagePrompts: images };
                                                                if (idx === 0) updates.aiImagePrompt = e.target.value;
                                                                setPageEditPopup(p => ({ ...p, pageData: { ...p.pageData, visualConfig: { ...vc, ...updates } } }));
                                                            }}
                                                            placeholder={idx === 0 ? (pageEditPopup.suggestions.aiImagePrompt || 'Describe hero image...') : 'Describe this image...'}
                                                            rows={2}
                                                            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-xs text-zinc-200 placeholder:text-blue-400/40 focus:border-blue-500 focus:outline-none resize-none"
                                                        />
                                                    </div>
                                                ))}
                                                <div className="flex gap-2 mt-2">
                                                    <button
                                                        onClick={async () => {
                                                            const vc = pageEditPopup.pageData.visualConfig || {};
                                                            const res = await fetch(`/api/admin/pages/${pageEditPopup.pageId}`, {
                                                                method: 'PATCH',
                                                                headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                                                                body: JSON.stringify({ visualConfig: vc }),
                                                            });
                                                            if (res.ok) toast({ title: "Saved!", description: `${(vc.imagePrompts || []).length || 1} image prompts saved` });
                                                        }}
                                                        className="flex-1 px-3 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white rounded"
                                                    >Save All Prompts</button>
                                                    <button
                                                        onClick={async () => {
                                                            const vc = pageEditPopup.pageData.visualConfig || {};
                                                            const images = vc.imagePrompts || [{ label: 'Hero Image', prompt: vc.aiImagePrompt || '' }];
                                                            const validImages = images.filter((img: any) => img.prompt?.trim());

                                                            if (validImages.length === 0) {
                                                                toast({ title: "No prompts", description: "Add image prompts first", variant: "destructive" });
                                                                return;
                                                            }

                                                            toast({
                                                                title: "🎨 Generating Images...",
                                                                description: `Starting batch generation for ${validImages.length} images. This may take a minute.`
                                                            });

                                                            // Queue all images for generation
                                                            let generated = 0;
                                                            let failed = 0;

                                                            for (const img of validImages) {
                                                                try {
                                                                    const res = await fetch('/api/design-ai/generate-image', {
                                                                        method: 'POST',
                                                                        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                                                                        body: JSON.stringify({
                                                                            prompt: img.prompt,
                                                                            pageId: pageEditPopup.pageId,
                                                                            imageLabel: img.label,
                                                                        }),
                                                                    });

                                                                    if (res.ok) {
                                                                        const result = await res.json();
                                                                        if (result.success) {
                                                                            generated++;
                                                                            toast({
                                                                                title: `✅ Generated: ${img.label}`,
                                                                                description: `${generated}/${validImages.length} complete`
                                                                            });
                                                                        } else {
                                                                            failed++;
                                                                        }
                                                                    } else {
                                                                        failed++;
                                                                    }
                                                                } catch {
                                                                    failed++;
                                                                }
                                                            }

                                                            toast({
                                                                title: generated > 0 ? "🎉 Batch Complete!" : "❌ Generation Failed",
                                                                description: `Generated ${generated} images${failed > 0 ? `, ${failed} failed` : ''}`,
                                                                variant: failed === validImages.length ? "destructive" : "default"
                                                            });
                                                        }}
                                                        className="flex-1 px-3 py-2 text-xs font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded flex items-center justify-center gap-1"
                                                    >
                                                        <Sparkles className="w-3 h-3" />
                                                        Generate All Images
                                                    </button>
                                                </div>
                                            </div>

                                            {/* AI Video Prompt */}
                                            <div className="border border-pink-500/30 rounded-lg p-4 bg-pink-500/5">
                                                <label className="text-xs font-medium text-pink-400 mb-2 block">🎬 AI Video Prompt</label>
                                                <textarea
                                                    value={pageEditPopup.pageData.visualConfig?.aiVideoPrompt || ''}
                                                    onChange={(e) => {
                                                        const vc = pageEditPopup.pageData.visualConfig || {};
                                                        setPageEditPopup(p => ({ ...p, pageData: { ...p.pageData, visualConfig: { ...vc, aiVideoPrompt: e.target.value } } }));
                                                    }}
                                                    placeholder={pageEditPopup.suggestions.aiVideoPrompt || 'Describe the video: Slow motion crystalline water droplets forming geometric patterns...'}
                                                    rows={3}
                                                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-xs text-zinc-200 placeholder:text-pink-400/50 focus:border-pink-500 focus:outline-none resize-none"
                                                />
                                                <div className="flex gap-2 mt-2">
                                                    <button
                                                        onClick={async () => {
                                                            const vc = pageEditPopup.pageData.visualConfig || {};
                                                            const res = await fetch(`/api/admin/pages/${pageEditPopup.pageId}`, {
                                                                method: 'PATCH',
                                                                headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                                                                body: JSON.stringify({ visualConfig: vc }),
                                                            });
                                                            if (res.ok) toast({ title: "Saved!", description: "Video prompt saved" });
                                                        }}
                                                        className="flex-1 px-3 py-2 text-xs font-medium bg-pink-600 hover:bg-pink-500 text-white rounded"
                                                    >Save Prompt</button>
                                                    <button
                                                        onClick={async () => {
                                                            const vc = pageEditPopup.pageData.visualConfig || {};
                                                            if (!vc.aiVideoPrompt) {
                                                                toast({ title: "No prompt", description: "Add a video prompt first" });
                                                                return;
                                                            }
                                                            // Save the prompt first
                                                            await fetch(`/api/admin/pages/${pageEditPopup.pageId}`, {
                                                                method: 'PATCH',
                                                                headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                                                                body: JSON.stringify({ visualConfig: { ...vc, videoGenerationQueued: true, videoGenerationQueuedAt: new Date().toISOString() } }),
                                                            });
                                                            toast({
                                                                title: "🎬 Video Queued!",
                                                                description: "Video generation has been queued. Check back later for the result.",
                                                            });
                                                        }}
                                                        className="flex-1 px-3 py-2 text-xs font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded flex items-center justify-center gap-1"
                                                    >
                                                        <Sparkles className="w-3 h-3" />
                                                        Generate Video AI
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {/* Motion Tab */}
                                    {editTabIndex === 3 && (
                                        <>
                                            {/* Motion Preview Demo */}
                                            <div className="border border-cyan-500/30 rounded-lg p-4 bg-cyan-500/5 mb-4">
                                                <label className="text-xs font-medium text-cyan-400 mb-3 block">🎬 Motion Preview</label>
                                                <div className="grid grid-cols-4 gap-3">
                                                    <div className="text-center">
                                                        <div className="w-10 h-10 mx-auto bg-cyan-500/30 rounded animate-pulse" />
                                                        <span className="text-[9px] text-zinc-500 mt-1 block">fadeIn</span>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="w-10 h-10 mx-auto bg-cyan-500/30 rounded animate-bounce" />
                                                        <span className="text-[9px] text-zinc-500 mt-1 block">fadeUp</span>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="w-10 h-10 mx-auto bg-cyan-500/30 rounded transition-transform hover:scale-110 hover:-translate-y-1 cursor-pointer" />
                                                        <span className="text-[9px] text-zinc-500 mt-1 block">hover.lift</span>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="w-10 h-10 mx-auto bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded animate-spin" style={{ animationDuration: '3s' }} />
                                                        <span className="text-[9px] text-zinc-500 mt-1 block">ambient</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Motion Preset - Editable */}
                                            <div className="border border-cyan-500/30 rounded-lg p-4 bg-cyan-500/5">
                                                <label className="text-xs font-medium text-cyan-400 mb-2 block">Motion Preset</label>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={pageEditPopup.pageData.visualConfig?.motionPreset || ''}
                                                        onChange={(e) => {
                                                            const vc = pageEditPopup.pageData.visualConfig || {};
                                                            setPageEditPopup(p => ({ ...p, pageData: { ...p.pageData, visualConfig: { ...vc, motionPreset: e.target.value } } }));
                                                        }}
                                                        placeholder={pageEditPopup.suggestions.motionPreset || 'liquid-crystal-float'}
                                                        className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-200 placeholder:text-cyan-400/50 focus:border-cyan-500 focus:outline-none"
                                                    />
                                                    <button
                                                        onClick={async () => {
                                                            const vc = pageEditPopup.pageData.visualConfig || {};
                                                            const res = await fetch(`/api/admin/pages/${pageEditPopup.pageId}`, {
                                                                method: 'PATCH',
                                                                headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                                                                body: JSON.stringify({ visualConfig: vc }),
                                                            });
                                                            if (res.ok) toast({ title: "Saved!", description: "Motion Preset updated" });
                                                        }}
                                                        className="px-3 py-2 text-xs font-medium bg-cyan-600 hover:bg-cyan-500 text-white rounded"
                                                    >Save</button>
                                                </div>
                                                {pageEditPopup.suggestions.motionPreset && !pageEditPopup.pageData.visualConfig?.motionPreset && (
                                                    <button
                                                        onClick={() => {
                                                            const vc = pageEditPopup.pageData.visualConfig || {};
                                                            setPageEditPopup(p => ({ ...p, pageData: { ...p.pageData, visualConfig: { ...vc, motionPreset: p.suggestions.motionPreset } } }));
                                                        }}
                                                        className="mt-2 text-xs text-cyan-400 hover:text-cyan-300"
                                                    >↑ Use suggestion</button>
                                                )}
                                            </div>

                                            {/* Entrance Motion - Editable */}
                                            <div className="border border-cyan-500/30 rounded-lg p-4 bg-cyan-500/5">
                                                <label className="text-xs font-medium text-cyan-400 mb-2 block">Entrance Motion</label>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={pageEditPopup.pageData.visualConfig?.entranceMotion || ''}
                                                        onChange={(e) => {
                                                            const vc = pageEditPopup.pageData.visualConfig || {};
                                                            setPageEditPopup(p => ({ ...p, pageData: { ...p.pageData, visualConfig: { ...vc, entranceMotion: e.target.value } } }));
                                                        }}
                                                        placeholder={pageEditPopup.suggestions.entranceMotion || 'fadeUp, stagger.container'}
                                                        className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-200 placeholder:text-cyan-400/50 focus:border-cyan-500 focus:outline-none"
                                                    />
                                                    <button
                                                        onClick={async () => {
                                                            const vc = pageEditPopup.pageData.visualConfig || {};
                                                            const res = await fetch(`/api/admin/pages/${pageEditPopup.pageId}`, {
                                                                method: 'PATCH',
                                                                headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                                                                body: JSON.stringify({ visualConfig: vc }),
                                                            });
                                                            if (res.ok) toast({ title: "Saved!", description: "Entrance Motion updated" });
                                                        }}
                                                        className="px-3 py-2 text-xs font-medium bg-cyan-600 hover:bg-cyan-500 text-white rounded"
                                                    >Save</button>
                                                </div>
                                            </div>

                                            {/* Hover Motion - Editable */}
                                            <div className="border border-cyan-500/30 rounded-lg p-4 bg-cyan-500/5">
                                                <label className="text-xs font-medium text-cyan-400 mb-2 block">Hover Motion</label>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={pageEditPopup.pageData.visualConfig?.hoverMotion || ''}
                                                        onChange={(e) => {
                                                            const vc = pageEditPopup.pageData.visualConfig || {};
                                                            setPageEditPopup(p => ({ ...p, pageData: { ...p.pageData, visualConfig: { ...vc, hoverMotion: e.target.value } } }));
                                                        }}
                                                        placeholder={pageEditPopup.suggestions.hoverMotion || 'hover.lift, hover.glow'}
                                                        className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-200 placeholder:text-cyan-400/50 focus:border-cyan-500 focus:outline-none"
                                                    />
                                                    <button
                                                        onClick={async () => {
                                                            const vc = pageEditPopup.pageData.visualConfig || {};
                                                            const res = await fetch(`/api/admin/pages/${pageEditPopup.pageId}`, {
                                                                method: 'PATCH',
                                                                headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                                                                body: JSON.stringify({ visualConfig: vc }),
                                                            });
                                                            if (res.ok) toast({ title: "Saved!", description: "Hover Motion updated" });
                                                        }}
                                                        className="px-3 py-2 text-xs font-medium bg-cyan-600 hover:bg-cyan-500 text-white rounded"
                                                    >Save</button>
                                                </div>
                                            </div>

                                            {/* Ambient Motion - Editable */}
                                            <div className="border border-cyan-500/30 rounded-lg p-4 bg-cyan-500/5">
                                                <label className="text-xs font-medium text-cyan-400 mb-2 block">Ambient Motion</label>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={pageEditPopup.pageData.visualConfig?.ambientMotion || ''}
                                                        onChange={(e) => {
                                                            const vc = pageEditPopup.pageData.visualConfig || {};
                                                            setPageEditPopup(p => ({ ...p, pageData: { ...p.pageData, visualConfig: { ...vc, ambientMotion: e.target.value } } }));
                                                        }}
                                                        placeholder={pageEditPopup.suggestions.ambientMotion || 'ambient.float, ambient.pulse'}
                                                        className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-200 placeholder:text-cyan-400/50 focus:border-cyan-500 focus:outline-none"
                                                    />
                                                    <button
                                                        onClick={async () => {
                                                            const vc = pageEditPopup.pageData.visualConfig || {};
                                                            const res = await fetch(`/api/admin/pages/${pageEditPopup.pageId}`, {
                                                                method: 'PATCH',
                                                                headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                                                                body: JSON.stringify({ visualConfig: vc }),
                                                            });
                                                            if (res.ok) toast({ title: "Saved!", description: "Ambient Motion updated" });
                                                        }}
                                                        className="px-3 py-2 text-xs font-medium bg-cyan-600 hover:bg-cyan-500 text-white rounded"
                                                    >Save</button>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {/* Content Tab */}
                                    {editTabIndex === 4 && (
                                        <>
                                            {/* aiStartupHtml */}
                                            <div className="border border-amber-500/30 rounded-lg p-4 bg-amber-500/5">
                                                <label className="text-xs font-medium text-amber-400 mb-2 block">AI Startup HTML</label>
                                                {pageEditPopup.pageData.aiStartupHtml ? (
                                                    <div className="text-sm text-zinc-300 bg-zinc-800/50 p-3 rounded max-h-48 overflow-y-auto">
                                                        <pre className="whitespace-pre-wrap font-mono text-xs">{pageEditPopup.pageData.aiStartupHtml.substring(0, 2000)}...</pre>
                                                    </div>
                                                ) : (
                                                    <div className="text-sm text-zinc-500 italic">No AI startup HTML generated</div>
                                                )}
                                            </div>

                                            {/* Content/Summary */}
                                            <div className="border border-amber-500/30 rounded-lg p-4 bg-amber-500/5">
                                                <label className="text-xs font-medium text-amber-400 mb-2 block">Content Summary</label>
                                                {pageEditPopup.pageData.summary ? (
                                                    <div className="text-sm text-zinc-300">{pageEditPopup.pageData.summary}</div>
                                                ) : (
                                                    <div className="text-sm text-zinc-500 italic">No summary available</div>
                                                )}
                                            </div>

                                            {/* Content HTML Preview */}
                                            <div className="border border-amber-500/30 rounded-lg p-4 bg-amber-500/5">
                                                <label className="text-xs font-medium text-amber-400 mb-2 block">Content HTML</label>
                                                {pageEditPopup.pageData.content ? (
                                                    <div className="text-sm text-zinc-300 bg-zinc-800/50 p-3 rounded max-h-48 overflow-y-auto">
                                                        <pre className="whitespace-pre-wrap font-mono text-xs">{pageEditPopup.pageData.content.substring(0, 1500)}...</pre>
                                                    </div>
                                                ) : (
                                                    <div className="text-sm text-zinc-500 italic">No content HTML</div>
                                                )}
                                            </div>
                                        </>
                                    )}

                                    {/* Preview Tab */}
                                    {editTabIndex === 5 && (
                                        <div className="h-full flex flex-col">
                                            <div className="flex items-center justify-between mb-3">
                                                <label className="text-xs font-medium text-zinc-400">Page Preview (Draft)</label>
                                                <div className="flex items-center gap-3">
                                                    {pageEditPopup.pageData.path && (
                                                        <a
                                                            href={pageEditPopup.pageData.path}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                                                        >
                                                            Open Live Page ↗
                                                        </a>
                                                    )}
                                                    <button
                                                        onClick={() => {
                                                            const pageId = pageEditPopup.pageId;
                                                            setPageEditPopup({ open: false, pageId: '', pageData: null, suggestions: {}, loading: false });
                                                            setEditTabIndex(0);
                                                            setLocation(`/admin?tab=pages&edit=${pageId}`);
                                                        }}
                                                        className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                                    >
                                                        <FileText className="w-3 h-3" />
                                                        Open in Editor →
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex-1 border border-zinc-700 rounded-lg overflow-hidden bg-white min-h-[400px]">
                                                {(pageEditPopup.pageData.aiStartupHtml || pageEditPopup.pageData.content) ? (
                                                    <iframe
                                                        srcDoc={`
                                                            <!DOCTYPE html>
                                                            <html>
                                                            <head>
                                                                <meta charset="UTF-8">
                                                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                                                <link href="/andara-ionic-1.0.css" rel="stylesheet">
                                                                <style>
                                                                    body { 
                                                                        font-family: system-ui, -apple-system, sans-serif; 
                                                                        background: #0f0f0f; 
                                                                        color: #e5e5e5;
                                                                        padding: 20px;
                                                                    }
                                                                </style>
                                                            </head>
                                                            <body>
                                                                <h1 style="font-size: 24px; margin-bottom: 16px;">${pageEditPopup.pageData.title}</h1>
                                                                ${pageEditPopup.pageData.aiStartupHtml || pageEditPopup.pageData.content || '<p>No content</p>'}
                                                            </body>
                                                            </html>
                                                        `}
                                                        className="w-full h-full min-h-[400px]"
                                                        title="Page Preview"
                                                    />
                                                ) : pageEditPopup.pageData.path && pageEditPopup.pageData.status === 'published' && (pageEditPopup.pageData.content || pageEditPopup.pageData.aiStartupHtml) ? (
                                                    /* If page is published AND has content, show live page */
                                                    <iframe
                                                        src={pageEditPopup.pageData.path}
                                                        className="w-full h-full min-h-[400px]"
                                                        title="Live Page Preview"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-zinc-500 p-6">
                                                        <div className="text-center max-w-md">
                                                            <div className="text-4xl mb-4">📄</div>
                                                            <p className="text-lg font-medium mb-2 text-zinc-200">{pageEditPopup.pageData.title}</p>
                                                            <p className="text-sm text-zinc-400 mb-4">{pageEditPopup.suggestions.summary || pageEditPopup.pageData.summary || 'No summary yet'}</p>
                                                            {pageEditPopup.pageData.path && (
                                                                <p className="text-xs text-zinc-500 mb-4">Path: {pageEditPopup.pageData.path}</p>
                                                            )}
                                                            <p className="text-xs text-amber-400 mb-4">
                                                                {pageEditPopup.pageData.status === 'draft' ? '⚠️ Draft page - no live preview available' : 'No AI-generated content yet'}
                                                            </p>

                                                            {/* Generate Content Button */}
                                                            <button
                                                                onClick={async () => {
                                                                    const pageData = pageEditPopup.pageData;
                                                                    toast({
                                                                        title: "✨ Generating Content...",
                                                                        description: `Creating page content for "${pageData.title}". This may take a moment.`,
                                                                    });

                                                                    try {
                                                                        const prompt = `Generate a complete, premium HTML page for "${pageData.title}".
Path: ${pageData.path || '/unknown'}
Summary: ${pageEditPopup.suggestions.summary || pageData.summary || 'General page'}

Create engaging, scientific content following Andara Ionic's premium design language. Include:
- A hero section with compelling headline
- 3-4 content sections with detailed information
- Use glass morphism cards, dark theme colors
- Include scientific explanations where relevant
- Add subtle motion hints (data-motion attributes)`;

                                                                        const res = await fetch('/api/bigmind/chat', {
                                                                            method: 'POST',
                                                                            headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                                                                            body: JSON.stringify({
                                                                                message: prompt,
                                                                                format: 'markdown',
                                                                            }),
                                                                        });

                                                                        if (res.ok) {
                                                                            const result = await res.json();
                                                                            // Extract HTML from response
                                                                            const htmlMatch = result.response?.match(/<html[\s\S]*<\/html>|<section[\s\S]*<\/section>|<div class[\s\S]*<\/div>/i);
                                                                            const generatedHtml = htmlMatch?.[0] || result.response?.slice(0, 5000) || '';

                                                                            if (generatedHtml) {
                                                                                // Save generated content to page
                                                                                await fetch(`/api/admin/pages/${pageEditPopup.pageId}`, {
                                                                                    method: 'PATCH',
                                                                                    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                                                                                    body: JSON.stringify({ aiStartupHtml: generatedHtml }),
                                                                                });

                                                                                // Update local state
                                                                                setPageEditPopup(p => ({
                                                                                    ...p,
                                                                                    pageData: { ...p.pageData, aiStartupHtml: generatedHtml }
                                                                                }));

                                                                                toast({
                                                                                    title: "🎉 Content Generated!",
                                                                                    description: "Page content has been created and saved. Check Preview tab.",
                                                                                });
                                                                            }
                                                                        } else {
                                                                            throw new Error('Generation failed');
                                                                        }
                                                                    } catch {
                                                                        toast({
                                                                            title: "Generation Failed",
                                                                            description: "Could not generate content. Try again or use BigMind chat.",
                                                                            variant: "destructive"
                                                                        });
                                                                    }
                                                                }}
                                                                className="mt-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-medium flex items-center gap-2 mx-auto"
                                                            >
                                                                <Sparkles className="w-4 h-4" />
                                                                Generate Content with AI
                                                            </button>
                                                            <p className="text-xs text-zinc-500 mt-3">Or use BigMind chat for more control</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="px-5 py-4 border-t border-zinc-700 flex gap-3 flex-shrink-0">
                                    <button
                                        onClick={() => { setPageEditPopup({ open: false, pageId: '', pageData: null, suggestions: {}, loading: false }); setEditTabIndex(0); }}
                                        className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg font-medium transition-colors"
                                    >
                                        Close
                                    </button>
                                    {Object.keys(pageEditPopup.suggestions).length > 0 && (
                                        <button
                                            onClick={async () => {
                                                const updates: any = {};
                                                const s = pageEditPopup.suggestions;
                                                if (s.seoTitle && !pageEditPopup.pageData.seoTitle) updates.seoTitle = s.seoTitle;
                                                if (s.seoDescription && !pageEditPopup.pageData.seoDescription) updates.seoDescription = s.seoDescription;
                                                if (s.seoFocus && !pageEditPopup.pageData.seoFocus) updates.seoFocus = s.seoFocus;

                                                // Visual config updates
                                                const vc = pageEditPopup.pageData.visualConfig || {};
                                                let hasVcUpdates = false;
                                                if (s.vibeKeywords && !vc.vibeKeywords?.length) { vc.vibeKeywords = s.vibeKeywords; hasVcUpdates = true; }
                                                if (s.emotionalTone && !vc.emotionalTone?.length) { vc.emotionalTone = s.emotionalTone; hasVcUpdates = true; }
                                                if (s.animationIdeas && !vc.animationIdeas?.length) { vc.animationIdeas = s.animationIdeas; hasVcUpdates = true; }
                                                if (s.colorPalette && !vc.colorPalette) { vc.colorPalette = s.colorPalette; hasVcUpdates = true; }
                                                if (s.motionPreset && !vc.motionPreset) { vc.motionPreset = s.motionPreset; hasVcUpdates = true; }
                                                if (s.entranceMotion && !vc.entranceMotion) { vc.entranceMotion = s.entranceMotion; hasVcUpdates = true; }
                                                if (s.hoverMotion && !vc.hoverMotion) { vc.hoverMotion = s.hoverMotion; hasVcUpdates = true; }
                                                if (s.ambientMotion && !vc.ambientMotion) { vc.ambientMotion = s.ambientMotion; hasVcUpdates = true; }
                                                if (s.aiImagePrompt && !vc.aiImagePrompt) { vc.aiImagePrompt = s.aiImagePrompt; hasVcUpdates = true; }
                                                if (hasVcUpdates) updates.visualConfig = vc;

                                                if (Object.keys(updates).length === 0) return;

                                                const res = await fetch(`/api/admin/pages/${pageEditPopup.pageId}`, {
                                                    method: 'PATCH',
                                                    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                                                    body: JSON.stringify(updates),
                                                });
                                                if (res.ok) {
                                                    const pageId = pageEditPopup.pageId;
                                                    setPageEditPopup(p => ({ ...p, pageData: { ...p.pageData, ...updates }, suggestions: {} }));
                                                    toast({
                                                        title: "✨ All Applied!",
                                                        description: "Opening page in editor...",
                                                    });
                                                    // Navigate to admin pages tab with page selected
                                                    setTimeout(() => {
                                                        setPageEditPopup({ open: false, pageId: '', pageData: null, suggestions: {}, loading: false });
                                                        setEditTabIndex(0);
                                                        // Use full page reload to ensure admin reads edit param
                                                        window.location.href = `/admin?tab=pages&edit=${pageId}`;
                                                    }, 500);
                                                }
                                            }}
                                            className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Check className="w-4 h-4" />
                                            Apply All & Open Editor
                                        </button>
                                    )}
                                    {Object.keys(pageEditPopup.suggestions).length === 0 && (
                                        <button
                                            onClick={() => {
                                                const pageId = pageEditPopup.pageId;
                                                setPageEditPopup({ open: false, pageId: '', pageData: null, suggestions: {}, loading: false });
                                                setEditTabIndex(0);
                                                // Use full page reload to ensure admin reads edit param
                                                window.location.href = `/admin?tab=pages&edit=${pageId}`;
                                            }}
                                            className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                        >
                                            <FileText className="w-4 h-4" />
                                            Open in Pages Editor
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
