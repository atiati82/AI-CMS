import React, { useState, useEffect, useRef, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest, getAuthHeaders } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  parseBigMindResponse,
  type ParsedBigMindResponse,
  extractEnhancements,
  hasEnhancementContent,
  type ParsedEnhancement,
  extractBigmindRecommendations,
  hasBigmindRecommendations,
} from "@/lib/bigmind-parser";
import {
  Plus, Trash2, Edit, Loader2, Eye, X, FolderTree, Image, FileText, Database,
  BarChart2, Search, Wand2, Sparkles, Send, Brain, MessageCircle, History,
  LayoutTemplate, Target, Paintbrush, Layers, CheckCircle2, XCircle, Lightbulb, Link, RefreshCw,
  Settings, Trash, ChevronDown, ChevronUp, Play, ImageIcon, FileUp, Paperclip, Film, Zap, Clock, Globe
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Stub for components not imported
const PageContentPreview = ({ content, html, ...props }: { content?: string; html?: string;[key: string]: any }) => (
  <div dangerouslySetInnerHTML={{ __html: content || html || '' }} />
);

// Stub for MOTION_ARCHETYPES
const MOTION_ARCHETYPES = [
  { id: 'subtle', key: 'subtle', name: 'Subtle', description: 'Minimal motion', icon: Sparkles },
  { id: 'dynamic', key: 'dynamic', name: 'Dynamic', description: 'Active motion', icon: Zap },
  { id: 'immersive', key: 'immersive', name: 'Immersive', description: 'Full motion', icon: Film },
];

// Types needed by BigMindTab
type AIModel = 'gpt-4.1-mini' | 'gpt-4.1' | 'gpt-4o' | 'gpt-4o-mini' | 'o1' | 'o1-mini' | 'o1-pro' | 'o3-mini' | 'gemini-2.5-flash' | 'gemini-2.5-pro' | 'gemini-2.0-flash';
const AI_MODELS: { value: AIModel; label: string }[] = [
  // OpenAI GPT Models
  { value: 'gpt-4.1-mini', label: 'GPT-4.1 Mini' },
  { value: 'gpt-4.1', label: 'GPT-4.1' },
  { value: 'gpt-4o', label: 'GPT-4o' },
  { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
  // OpenAI o-series (Reasoning Models)
  { value: 'o1', label: 'o1 (Reasoning)' },
  { value: 'o1-mini', label: 'o1 Mini' },
  { value: 'o1-pro', label: 'o1 Pro' },
  { value: 'o3-mini', label: 'o3 Mini (Latest)' },
  // Google Gemini Models
  { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
  { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro' },
  { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
];

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  functionCalls?: any[];
};

type BigmindChatSession = {
  id: string;
  title: string;
  mode: string;
  messageCount: number;
  lastMessageAt: string;
  createdAt: string;
};

type BigmindChatMessage = {
  id: string;
  sessionId: string;
  role: string;
  content: string;
  functionCalls: any[] | null;
  createdAt: string;
};

type MagicPageSession = {
  id: string;
  name: string;
  title?: string;
  status: string;
  generatedHtml?: string;
  createdAt: string;
};

type SiteOverview = {
  totalPages: number;
  priorityStats: { p1: number; p2: number; p3: number };
  emptyClusterss: string[];
};

type AdminAiSetting = {
  id: string;
  key: string;
  value: any;
  label?: string;
  description?: string;
  isActive?: boolean;
};

function formatAiMessage(content: string): string {
  let html = content;

  // First, handle HTML entity escaped code tags (e.g., &lt;code&gt;text&lt;/code&gt;)
  html = html.replace(/&lt;code[^&]*&gt;([^&]+)&lt;\/code&gt;/g, (_, code) => {
    return `\`${code}\``;
  });

  // Then, handle raw <code> tags from AI responses (with or without class attribute)
  html = html.replace(/<code[^>]*>([^<]+)<\/code>/g, (_, code) => {
    return `\`${code}\``;
  });

  // Hide/collapse technical code blocks (html, visual-config, page-metadata, image-prompts)
  // These are meant for parsing, not display - show a compact summary instead
  const technicalBlocks = ['html', 'visual-config', 'page-metadata', 'image-prompts'];
  html = html.replace(/```([\w-]+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    const langLower = (lang || '').toLowerCase();

    // For technical blocks, show a collapsed summary
    if (technicalBlocks.includes(langLower)) {
      const lineCount = code.split('\n').filter((l: string) => l.trim()).length;
      const blockLabels: Record<string, string> = {
        'html': 'HTML Content',
        'visual-config': 'Visual Config',
        'page-metadata': 'Page Metadata',
        'image-prompts': 'Image Prompts'
      };
      const label = blockLabels[langLower] || lang || 'Code';
      return `<div class="my-2 px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg text-xs text-primary flex items-center gap-2"><span class="font-medium">${label}</span><span class="text-muted-foreground">(${lineCount} lines - use "Review & Apply" below)</span></div>`;
    }

    // For other code blocks, show collapsed with first few lines
    const lines = code.split('\n');
    if (lines.length > 8) {
      const preview = lines.slice(0, 5).join('\n');
      const escaped = preview.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<details class="my-2"><summary class="cursor-pointer text-xs text-muted-foreground hover:text-foreground">${lang || 'Code'} (${lines.length} lines - click to expand)</summary><pre class="mt-2 text-xs max-h-48 overflow-auto"><code class="language-${lang || ''}">${escaped}\n... (${lines.length - 5} more lines)</code></pre></details>`;
    }

    // Short code blocks - show normally
    const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<pre class="my-2 text-xs max-h-32 overflow-auto"><code class="language-${lang || ''}">${escaped}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, (_, code) => {
    const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<code class="bg-muted/50 px-1 py-0.5 rounded text-sm font-mono">${escaped}</code>`;
  });

  // Helper to apply inline formatting (bold, italic, links)
  const applyInlineFormatting = (text: string): string => {
    // Escape HTML entities first
    let result = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    // Then apply formatting
    result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    result = result.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    return result;
  };

  const lines = html.split('\n');
  const result: string[] = [];
  let inList = false;
  let listType = '';
  let listIndent = 0;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Skip pre blocks entirely
    if (line.startsWith('<pre>')) {
      if (inList) { result.push(listType === 'ol' ? '</ol>' : '</ul>'); inList = false; }
      result.push(line);
      continue;
    }

    // Headers
    if (/^#{1,3}\s+(.+)$/.test(line)) {
      if (inList) { result.push(listType === 'ol' ? '</ol>' : '</ul>'); inList = false; }
      const match = line.match(/^(#{1,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = applyInlineFormatting(match[2]);
        result.push(`<h${level}>${text}</h${level}>`);
      }
      continue;
    }

    // Blockquotes
    if (/^>\s*(.*)$/.test(line)) {
      if (inList) { result.push(listType === 'ol' ? '</ol>' : '</ul>'); inList = false; }
      const match = line.match(/^>\s*(.*)$/);
      if (match) {
        result.push(`<blockquote>${applyInlineFormatting(match[1])}</blockquote>`);
      }
      continue;
    }

    // Ordered list (with optional indentation)
    const olMatch = line.match(/^(\s*)\d+\.\s+(.+)$/);
    if (olMatch) {
      const indent = olMatch[1].length;
      const content = olMatch[2];
      if (!inList || listType !== 'ol') {
        if (inList) result.push(listType === 'ol' ? '</ol>' : '</ul>');
        result.push('<ol>');
        inList = true;
        listType = 'ol';
        listIndent = indent;
      }
      result.push(`<li>${applyInlineFormatting(content)}</li>`);
      continue;
    }

    // Unordered list (with optional indentation - support nested lists)
    const ulMatch = line.match(/^(\s*)[-*•]\s+(.+)$/);
    if (ulMatch) {
      const indent = ulMatch[1].length;
      const content = ulMatch[2];
      if (!inList || listType !== 'ul') {
        if (inList) result.push(listType === 'ol' ? '</ol>' : '</ul>');
        result.push('<ul>');
        inList = true;
        listType = 'ul';
        listIndent = indent;
      }
      result.push(`<li>${applyInlineFormatting(content)}</li>`);
      continue;
    }

    // Close list if we hit a non-list line
    if (inList) {
      result.push(listType === 'ol' ? '</ol>' : '</ul>');
      inList = false;
    }

    // Empty lines
    if (line.trim() === '') {
      result.push('');
      continue;
    }

    // Regular paragraph with inline formatting
    const formatted = applyInlineFormatting(line);
    if (!formatted.startsWith('<h') && !formatted.startsWith('<blockquote') && !formatted.startsWith('<pre')) {
      result.push(`<p>${formatted}</p>`);
    } else {
      result.push(formatted);
    }
  }

  if (inList) result.push(listType === 'ol' ? '</ol>' : '</ul>');
  return result.join('\n');
}


function BigMindTab() {
  const [studioTab, setStudioTab] = useState<'chat' | 'studio' | 'settings'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [useCmsMode, setUseCmsMode] = useState(true);
  const [selectedModel, setSelectedModel] = useState<AIModel>('gpt-4.1-mini');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachedFile, setAttachedFile] = useState<{ name: string; content: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Resizable chat height
  const [chatHeight, setChatHeight] = useState(450);
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !resizeRef.current) return;
      const containerRect = resizeRef.current.getBoundingClientRect();
      const newHeight = e.clientY - containerRect.top;
      setChatHeight(Math.max(200, Math.min(800, newHeight)));
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Chat session persistence
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [showSessionList, setShowSessionList] = useState(false);

  // Fetch chat sessions
  const { data: chatSessions, refetch: refetchChatSessions } = useQuery<BigmindChatSession[]>({
    queryKey: ['/api/admin/bigmind/sessions'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/admin/bigmind/sessions');
      return res.json();
    },
  });

  // Load messages when session changes
  useEffect(() => {
    if (currentSessionId) {
      loadSessionMessages(currentSessionId);
    }
  }, [currentSessionId]);

  // Auto-load most recent session when BigMind tab opens
  useEffect(() => {
    if (chatSessions && chatSessions.length > 0 && !currentSessionId) {
      const mostRecent = chatSessions[0];
      if (mostRecent.messageCount > 0) {
        setCurrentSessionId(mostRecent.id);
      }
    }
  }, [chatSessions, currentSessionId]);

  const loadSessionMessages = async (sessionId: string) => {
    try {
      const res = await apiRequest('GET', `/api/admin/bigmind/sessions/${sessionId}/messages`);
      const dbMessages: BigmindChatMessage[] = await res.json();
      const chatMessages: ChatMessage[] = dbMessages.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
        functionCalls: m.functionCalls ?? undefined,
      }));
      setMessages(chatMessages);
    } catch (error) {
      console.error('Failed to load session messages:', error);
    }
  };

  const createNewSession = async () => {
    try {
      const res = await apiRequest('POST', '/api/admin/bigmind/sessions', {
        title: 'New Chat',
        mode: useCmsMode ? 'cms' : 'library',
      });
      const session = await res.json();
      setCurrentSessionId(session.id);
      setMessages([]);
      refetchChatSessions();
      toast({ title: "New Chat", description: "Started a new conversation" });
    } catch (error) {
      console.error('Failed to create session:', error);
    }
  };

  const switchToSession = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    setShowSessionList(false);
  };

  const saveMessageToDb = async (role: string, content: string, functionCalls?: any) => {
    if (!currentSessionId) return;
    try {
      await apiRequest('POST', `/api/admin/bigmind/sessions/${currentSessionId}/messages`, {
        role,
        content,
        functionCalls,
      });
      refetchChatSessions();
    } catch (error) {
      console.error('Failed to save message:', error);
    }
  };

  const updateSessionTitle = async (sessionId: string, firstMessage: string) => {
    const title = firstMessage.substring(0, 50) + (firstMessage.length > 50 ? '...' : '');
    try {
      await apiRequest('PUT', `/api/admin/bigmind/sessions/${sessionId}`, { title });
      refetchChatSessions();
    } catch (error) {
      console.error('Failed to update session title:', error);
    }
  };

  const deleteSession = async (sessionId: string) => {
    try {
      await apiRequest('DELETE', `/api/admin/bigmind/sessions/${sessionId}`);
      if (currentSessionId === sessionId) {
        setCurrentSessionId(null);
        setMessages([]);
      }
      refetchChatSessions();
      toast({ title: "Deleted", description: "Chat session removed" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete session", variant: "destructive" });
    }
  };

  const [studioPrompt, setStudioPrompt] = useState("");
  const [studioTitle, setStudioTitle] = useState("");
  const [studioPath, setStudioPath] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPreview, setGeneratedPreview] = useState<string | null>(null);
  const [activeSession, setActiveSession] = useState<MagicPageSession | null>(null);
  const [applyingMessageIdx, setApplyingMessageIdx] = useState<number | null>(null);
  const [parsedOutput, setParsedOutput] = useState<ParsedBigMindResponse | null>(null);

  // Enhancement selector state
  const [showEnhancementPanel, setShowEnhancementPanel] = useState<number | null>(null);
  const [pendingEnhancements, setPendingEnhancements] = useState<ParsedEnhancement[]>([]);
  const [selectedEnhancements, setSelectedEnhancements] = useState<Set<string>>(new Set());
  const [targetPageId, setTargetPageId] = useState<string>("");
  const [createNewPage, setCreateNewPage] = useState(true);
  const [savingRecommendationsIdx, setSavingRecommendationsIdx] = useState<number | null>(null);
  const [showSuggestionsPanel, setShowSuggestionsPanel] = useState(false);

  // Suggested images state
  const [showSuggestedImages, setShowSuggestedImages] = useState<number | null>(null);
  const [editableImagePrompts, setEditableImagePrompts] = useState<Record<string, string>>({});
  const [generatingImageId, setGeneratingImageId] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});

  // Live preview panel state - shows current page being designed
  const [activePreview, setActivePreview] = useState<{
    content: string;
    title?: string;
    path?: string;
    cluster?: string;
    pageId?: string;
    status?: 'draft' | 'published';
    suggestions?: Array<{
      id: string;
      type: string;
      title: string;
      summary: string;
      applied: boolean;
    }>;
    motionLinks?: {
      hero?: string;
      content?: string;
      cards?: string;
      buttons?: string;
      background?: string;
      images?: string;
    };
  } | null>(null);
  const [showPreviewPanel, setShowPreviewPanel] = useState(true);

  // Motion element types for the link manager
  const MOTION_ELEMENTS = [
    { key: 'hero', label: 'Hero Section', icon: Layers },
    { key: 'content', label: 'Content Sections', icon: FileText },
    { key: 'cards', label: 'Cards/Boxes', icon: LayoutTemplate },
    { key: 'buttons', label: 'Buttons/CTAs', icon: Target },
    { key: 'background', label: 'Background', icon: Paintbrush },
    { key: 'images', label: 'Images', icon: Image },
  ] as const;

  // Fetch saved suggestions
  const { data: savedSuggestions, refetch: refetchSuggestions } = useQuery<any[]>({
    queryKey: ['/api/admin/bigmind/suggestions'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/admin/bigmind/suggestions');
      return res.json();
    },
  });

  // Fetch pages list for enhancement dropdown
  const { data: pagesList } = useQuery<any[]>({
    queryKey: ['/api/pages'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/pages');
      return res.json();
    },
  });

  const pendingSuggestions = savedSuggestions?.filter(s => s.status === 'pending') || [];

  // Memoize enhancement info for all messages to avoid repeated parsing in render
  const messageEnhancementInfo = useMemo(() => {
    const info: Map<number, { hasApplyable: boolean; count: number; parsed: ParsedBigMindResponse; extracted: ReturnType<typeof extractEnhancements> }> = new Map();
    messages.forEach((msg, index) => {
      if (msg.role !== 'assistant') return;
      if (msg.functionCalls?.some(fc => fc.name === 'createPage')) return;
      if (!hasEnhancementContent(msg.content)) return;
      const parsed = parseBigMindResponse(msg.content);
      const extracted = extractEnhancements(msg.content, parsed);
      if (extracted.hasApplyableContent) {
        info.set(index, {
          hasApplyable: true,
          count: extracted.enhancements.length,
          parsed,
          extracted,
        });
      }
    });
    return info;
  }, [messages]);

  const saveRecommendationsFromMessage = async (content: string, messageIdx: number) => {
    setSavingRecommendationsIdx(messageIdx);
    try {
      const recommendations = extractBigmindRecommendations(content);
      if (recommendations.length === 0) {
        toast({ title: "No Recommendations", description: "No actionable recommendations found in this message.", variant: "destructive" });
        return;
      }

      const suggestions = recommendations.map(rec => ({
        type: rec.type,
        title: rec.title,
        summary: rec.summary,
        pageKey: rec.pageKey || null,
        payload: rec.payload,
        status: 'pending',
      }));

      await apiRequest('POST', '/api/admin/bigmind/suggestions/bulk', { suggestions });
      refetchSuggestions();
      toast({ title: "Saved!", description: `${suggestions.length} recommendations saved for review.` });
    } catch (error) {
      console.error('Failed to save recommendations:', error);
      toast({ title: "Error", description: "Failed to save recommendations", variant: "destructive" });
    } finally {
      setSavingRecommendationsIdx(null);
    }
  };

  const applySuggestion = async (id: string) => {
    try {
      await apiRequest('POST', `/api/admin/bigmind/suggestions/${id}/apply`);
      refetchSuggestions();
      toast({ title: "Applied!", description: "Suggestion marked as applied." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to apply suggestion", variant: "destructive" });
    }
  };

  const dismissSuggestion = async (id: string) => {
    try {
      await apiRequest('POST', `/api/admin/bigmind/suggestions/${id}/dismiss`);
      refetchSuggestions();
      toast({ title: "Dismissed", description: "Suggestion removed from pending list." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to dismiss suggestion", variant: "destructive" });
    }
  };

  const showEnhancementSelector = (messageContent: string, messageIdx: number) => {
    // Use memoized data if available, otherwise parse fresh
    const memoizedInfo = messageEnhancementInfo.get(messageIdx);
    const parsed = memoizedInfo?.parsed || parseBigMindResponse(messageContent);
    const extracted = memoizedInfo?.extracted || extractEnhancements(messageContent, parsed);

    if (!extracted.hasApplyableContent) {
      toast({ title: "No Suggestions", description: "No applyable enhancements found in this message.", variant: "destructive" });
      return;
    }

    setPendingEnhancements(extracted.enhancements);
    setSelectedEnhancements(new Set(extracted.enhancements.map(e => e.id)));
    setShowEnhancementPanel(messageIdx);
    setCreateNewPage(true);
    setTargetPageId("");
    setParsedOutput(parsed);
  };

  const applySelectedEnhancements = async () => {
    if (!parsedOutput) return;

    setApplyingMessageIdx(showEnhancementPanel);
    try {
      const selectedList = pendingEnhancements.filter(e => selectedEnhancements.has(e.id));

      if (createNewPage) {
        const pageKey = parsedOutput.pageMetadata.urlSlug?.replace(/\//g, '-').replace(/^-/, '') || `bigmind-${Date.now()}`;
        const pagePath = parsedOutput.pageMetadata.urlSlug || `/bigmind/${Date.now()}`;

        const pageData: Record<string, any> = {
          key: pageKey,
          title: parsedOutput.pageMetadata.h1Title || 'BigMind Generated Page',
          path: pagePath,
          pageType: 'content',
          template: parsedOutput.pageMetadata.template || 'science-small',
          clusterKey: parsedOutput.pageMetadata.cluster || null,
          seoTitle: parsedOutput.pageMetadata.metaTitle || null,
          seoDescription: parsedOutput.pageMetadata.metaDescription || null,
          seoFocus: parsedOutput.pageMetadata.seoKeywords?.[0] || null,
          aiStartupHtml: parsedOutput.htmlContent || null,
          status: 'draft',
        };

        for (const enh of selectedList) {
          if (enh.fieldName && enh.suggestedValue) {
            pageData[enh.fieldName] = enh.suggestedValue;
          }
        }

        const pageRes = await apiRequest('POST', '/api/pages', pageData);
        const newPage = await pageRes.json();

        // Try to create image prompts - don't fail the whole operation if this fails
        const imagePrompts = selectedList.filter(e => e.enhancementType === 'image_prompt');
        let imagePromptsCreated = 0;
        for (const imgPrompt of imagePrompts) {
          try {
            await apiRequest('POST', '/api/admin/page-media', {
              pageKey,
              slotKey: imgPrompt.fieldName || 'generated',
              slotType: 'section',
              prompt: imgPrompt.suggestedValue,
              status: 'pending',
            });
            imagePromptsCreated++;
          } catch (imgError) {
            console.warn('Failed to create image prompt:', imgError);
          }
        }

        queryClient.invalidateQueries({ queryKey: ['/api/pages'] });
        const imageNote = imagePrompts.length > 0
          ? ` (${imagePromptsCreated}/${imagePrompts.length} image prompts saved)`
          : '';
        toast({
          title: "Page Created!",
          description: `Created new page with ${selectedList.length} enhancements applied.${imageNote}`
        });
      } else if (targetPageId) {
        for (const enh of selectedList) {
          await apiRequest('POST', `/api/admin/pages/${targetPageId}/enhancements`, {
            enhancementType: enh.enhancementType,
            fieldName: enh.fieldName,
            suggestedValue: enh.suggestedValue,
            reason: enh.reason,
            confidence: enh.confidence,
            status: 'pending'
          });
        }

        toast({
          title: "Enhancements Saved!",
          description: `${selectedList.length} enhancements saved for review in Page Editor.`
        });
      }

      setShowEnhancementPanel(null);
      setPendingEnhancements([]);
      setSelectedEnhancements(new Set());
    } catch (error) {
      console.error('Apply enhancements error:', error);
      toast({ title: "Error", description: "Failed to apply enhancements.", variant: "destructive" });
    } finally {
      setApplyingMessageIdx(null);
    }
  };

  // State for single enhancement apply
  const [applyingEnhancementId, setApplyingEnhancementId] = useState<string | null>(null);

  // Safe fields that can be updated individually without breaking page structure
  const SAFE_SINGLE_APPLY_FIELDS = [
    'seoTitle', 'seoDescription', 'seoFocus', 'seoKeywords',
    'title', 'summary', 'vibeKeywords', 'emotionalTone',
    'motionPreset', 'entranceMotion', 'hoverMotion', 'ambientMotion',
    'clusterKey', 'template', 'status'
  ];

  // Apply a single enhancement to a page
  const applySingleEnhancement = async (enh: ParsedEnhancement, pageId?: string) => {
    setApplyingEnhancementId(enh.id);
    try {
      // Check if this enhancement type is safe to apply individually
      const isSafeField = enh.fieldName && SAFE_SINGLE_APPLY_FIELDS.includes(enh.fieldName);
      const isHtmlContent = enh.enhancementType === 'hero_content' || enh.enhancementType === 'section_content' || enh.fieldName === 'content' || enh.fieldName === 'aiStartupHtml';
      const isVisualConfig = enh.enhancementType === 'tag' && enh.fieldName?.startsWith('visualConfig');

      if (!pageId) {
        toast({
          title: "Select a Page",
          description: "Please select an existing page to apply this enhancement, or use 'Apply All Selected' to create a new page.",
          variant: "destructive"
        });
        return;
      }

      // For HTML content, we need special handling - save as enhancement for review
      if (isHtmlContent) {
        await apiRequest('POST', `/api/admin/pages/${pageId}/enhancements`, {
          enhancementType: enh.enhancementType || enh.type,
          fieldName: enh.fieldName || 'content',
          suggestedValue: enh.suggestedValue || enh.content || '',
          reason: enh.reason,
          confidence: enh.confidence,
          status: 'pending'
        });

        queryClient.invalidateQueries({ queryKey: ['/api/pages'] });
        toast({
          title: "Enhancement Saved",
          description: "HTML content saved for review in Page Editor."
        });
      } else if (isVisualConfig) {
        // Parse visual config and apply individual fields
        try {
          const lines = (enh.suggestedValue || enh.content || '').split('\n');
          const updateData: Record<string, any> = {};

          for (const line of lines) {
            const [key, ...valueParts] = line.split(':');
            const value = valueParts.join(':').trim();
            if (key && value) {
              const fieldKey = key.trim().toLowerCase().replace(/_/g, '');
              if (fieldKey.includes('vibe')) updateData.vibeKeywords = value;
              else if (fieldKey.includes('emotion')) updateData.emotionalTone = value;
              else if (fieldKey.includes('motion') && fieldKey.includes('preset')) updateData.motionPreset = value;
              else if (fieldKey.includes('entrance')) updateData.entranceMotion = value;
              else if (fieldKey.includes('hover')) updateData.hoverMotion = value;
              else if (fieldKey.includes('ambient')) updateData.ambientMotion = value;
            }
          }

          if (Object.keys(updateData).length > 0) {
            await apiRequest('PUT', `/api/pages/${pageId}`, updateData);
            queryClient.invalidateQueries({ queryKey: ['/api/pages'] });
            toast({
              title: "Applied!",
              description: "Visual config updated on page."
            });
          }
        } catch (e) {
          toast({ title: "Error", description: "Could not parse visual config", variant: "destructive" });
          return;
        }
      } else if (isSafeField && enh.fieldName) {
        // Safe field - apply directly
        const updateData: Record<string, any> = {};
        updateData[enh.fieldName] = enh.suggestedValue || enh.content;

        await apiRequest('PUT', `/api/pages/${pageId}`, updateData);
        queryClient.invalidateQueries({ queryKey: ['/api/pages'] });
        queryClient.invalidateQueries({ queryKey: ['/api/admin/pages'] });

        const label = (enh.enhancementType || enh.type || 'field').replace(/_/g, ' ');
        toast({
          title: "Applied!",
          description: `${label} updated on page.`
        });
      } else {
        // Unsupported field - save as enhancement for review
        await apiRequest('POST', `/api/admin/pages/${pageId}/enhancements`, {
          enhancementType: enh.enhancementType || enh.type,
          fieldName: enh.fieldName,
          suggestedValue: enh.suggestedValue || enh.content || '',
          reason: enh.reason,
          confidence: enh.confidence,
          status: 'pending'
        });

        const label = (enh.enhancementType || enh.type || 'enhancement').replace(/_/g, ' ');
        queryClient.invalidateQueries({ queryKey: ['/api/pages'] });
        toast({
          title: "Saved for Review",
          description: `${label} saved for review in Page Editor.`
        });
      }

      // Remove from pending list
      setPendingEnhancements(prev => prev.filter(e => e.id !== enh.id));
      setSelectedEnhancements(prev => {
        const newSet = new Set(prev);
        newSet.delete(enh.id);
        return newSet;
      });
    } catch (error) {
      console.error('Apply single enhancement error:', error);
      toast({ title: "Error", description: "Failed to apply enhancement.", variant: "destructive" });
    } finally {
      setApplyingEnhancementId(null);
    }
  };

  // Generate image from prompt
  const handleGenerateImage = async (imagePrompt: { id: string; prompt: string; slotKey: string; slotType: string }) => {
    setGeneratingImageId(imagePrompt.id);
    try {
      const promptText = editableImagePrompts[imagePrompt.id] || imagePrompt.prompt;

      const res = await apiRequest('POST', '/api/admin/generate-image', {
        prompt: promptText,
        slotKey: imagePrompt.slotKey,
        slotType: imagePrompt.slotType,
      });

      const result = await res.json();

      if (result.success && (result.publicUrl || result.filePath)) {
        const imageUrl = result.publicUrl || result.filePath;
        setGeneratedImages(prev => ({
          ...prev,
          [imagePrompt.id]: imageUrl
        }));
        toast({
          title: "Image Generated!",
          description: "Image created successfully"
        });
      } else {
        throw new Error(result.error || 'Failed to generate image');
      }
    } catch (error) {
      console.error('Image generation error:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Could not generate image",
        variant: "destructive"
      });
    } finally {
      setGeneratingImageId(null);
    }
  };

  // Initialize editable prompts when showing suggested images
  const showImagePrompts = (messageIdx: number, imagePrompts: Array<{ id: string; prompt: string }>) => {
    const initialPrompts: Record<string, string> = {};
    imagePrompts.forEach(ip => {
      initialPrompts[ip.id] = ip.prompt;
    });
    setEditableImagePrompts(prev => ({ ...prev, ...initialPrompts }));
    setShowSuggestedImages(messageIdx);
  };

  const handleApplyFromBigMind = async (messageContent: string, messageIdx: number) => {
    setApplyingMessageIdx(messageIdx);
    try {
      const parsed = parseBigMindResponse(messageContent);

      if (!parsed.htmlContent && !parsed.pageMetadata.h1Title) {
        toast({ title: "No Page Content", description: "This message doesn't contain page content to apply.", variant: "destructive" });
        return;
      }

      const pageKey = parsed.pageMetadata.urlSlug?.replace(/\//g, '-').replace(/^-/, '') || `bigmind-${Date.now()}`;
      const pagePath = parsed.pageMetadata.urlSlug || `/bigmind/${Date.now()}`;

      const pageRes = await apiRequest('POST', '/api/pages', {
        key: pageKey,
        title: parsed.pageMetadata.h1Title || 'BigMind Generated Page',
        path: pagePath,
        pageType: 'content',
        template: 'science-small',
        status: 'draft',
        content: parsed.htmlContent || '',
        seoTitle: parsed.pageMetadata.metaTitle,
        seoDescription: parsed.pageMetadata.metaDescription,
        vibeKeywords: parsed.visualConfig.vibeKeywords?.join(', '),
        emotionalTone: parsed.visualConfig.emotionalTone?.join(', '),
        layoutsDetected: parsed.visualConfig.layoutsDetected?.join(', '),
        motionPreset: parsed.visualConfig.motionPreset,
        entranceMotion: parsed.visualConfig.entranceMotion,
        hoverMotion: parsed.visualConfig.hoverMotion,
        ambientMotion: parsed.visualConfig.ambientMotion,
      });
      const newPage = await pageRes.json();

      if (parsed.imagePrompts.length > 0) {
        for (const imgPrompt of parsed.imagePrompts) {
          await apiRequest('POST', '/api/admin/page-media', {
            pageKey,
            slotKey: imgPrompt.slotKey,
            slotType: imgPrompt.slotType,
            prompt: imgPrompt.prompt,
            status: 'pending',
            metadata: { sourceMessage: 'bigmind-chat', location: imgPrompt.location }
          });
        }
      }

      setParsedOutput(parsed);
      queryClient.invalidateQueries({ queryKey: ['/api/pages'] });
      toast({
        title: "Page Created!",
        description: `Created "${parsed.pageMetadata.h1Title}" with ${parsed.imagePrompts.length} image slots.`
      });
    } catch (error) {
      console.error('Apply from BigMind error:', error);
      toast({ title: "Error", description: "Failed to create page from BigMind response.", variant: "destructive" });
    } finally {
      setApplyingMessageIdx(null);
    }
  };

  const hasApplyableContent = (content: string): boolean => {
    return content.includes('```html') ||
      content.includes('```visual-config') ||
      content.includes('```page-metadata') ||
      content.includes('```image-prompts') ||
      content.includes('**URL slug:**') ||
      content.includes('TITLE:') ||
      content.includes('SEO_TITLE:') ||
      content.includes('AI LAYOUT PROMPT:');
  };

  const { data: sessions, refetch: refetchSessions } = useQuery<MagicPageSession[]>({
    queryKey: ['/api/admin/magic-sessions'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/admin/magic-sessions');
      return res.json();
    },
  });

  const { data: aiSettings, refetch: refetchAiSettings } = useQuery<AdminAiSetting[]>({
    queryKey: ['/api/admin/ai-settings'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/admin/ai-settings');
      return res.json();
    },
  });

  const { data: overview, isLoading: isLoadingOverview } = useQuery<SiteOverview>({
    queryKey: ['/api/admin-chat/overview'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/admin-chat/overview');
      return res.json();
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userContent = inputValue.trim();
    const userMessage: ChatMessage = { role: "user", content: userContent };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    // Auto-create session if needed
    let sessionId = currentSessionId;
    if (!sessionId) {
      try {
        const sessionRes = await apiRequest('POST', '/api/admin/bigmind/sessions', {
          title: userContent.substring(0, 50) + (userContent.length > 50 ? '...' : ''),
          mode: useCmsMode ? 'cms' : 'library',
        });
        const session = await sessionRes.json();
        sessionId = session.id;
        setCurrentSessionId(session.id);
        refetchChatSessions();
      } catch (error) {
        console.error('Failed to create session:', error);
      }
    }

    // Save user message
    if (sessionId) {
      saveMessageToDb('user', userContent);
      // Update title if this is first message
      if (messages.length === 0) {
        updateSessionTitle(sessionId, userContent);
      }
    }

    try {
      const endpoint = useCmsMode ? '/api/admin/bigmind/chat' : '/api/admin-chat';
      const res = await apiRequest('POST', endpoint, { messages: newMessages, model: selectedModel });
      if (!res.ok) {
        throw new Error('Failed to get response');
      }
      const data = await res.json();

      if (useCmsMode && data.functionCalls?.length > 0) {
        queryClient.invalidateQueries({ queryKey: ['/api/pages'] });
        queryClient.invalidateQueries({ queryKey: ['/api/clusters'] });
        queryClient.invalidateQueries({ queryKey: ['/api/science-articles'] });
        queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      }

      const assistantMessage = {
        role: "assistant" as const,
        content: data.response,
        functionCalls: data.functionCalls
      };
      setMessages([...newMessages, assistantMessage]);

      // Save assistant response
      if (sessionId) {
        saveMessageToDb('assistant', data.response, data.functionCalls);
      }

      // Auto-show suggestions panel if response contains recommendations
      const hasRecommendations = data.response && (
        data.response.includes('RECOMMENDATION') ||
        data.response.includes('**Suggestion') ||
        data.response.includes('I recommend') ||
        data.response.includes('Consider adding') ||
        /\d\.\s*\*\*[^*]+\*\*/.test(data.response)
      );
      if (hasRecommendations) {
        setShowSuggestionsPanel(true);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response from BigMind. Please try again.",
        variant: "destructive",
      });
      setMessages(newMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setAttachedFile(null);
    setCurrentSessionId(null);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 300 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Maximum file size is 300MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      // For PDFs, use the server-side extraction
      if (file.name.endsWith('.pdf') || file.type === 'application/pdf') {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/admin/documents/upload', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          const errorMsg = data.error || 'Failed to extract PDF text';
          const hintMsg = data.hint ? ` ${data.hint}` : '';
          throw new Error(`${errorMsg}${hintMsg}`);
        }

        setAttachedFile({
          name: file.name,
          content: data.document.cleanText || data.document.rawText || ''
        });
        toast({
          title: "PDF transcribed",
          description: `"${file.name}" - ${data.wordCount.toLocaleString()} words extracted and ready`,
        });

        // Invalidate documents query to show new document
        queryClient.invalidateQueries({ queryKey: ['/api/admin/documents'] });
      } else {
        // For text files, read directly
        const text = await file.text();
        setAttachedFile({ name: file.name, content: text });
        toast({
          title: "File attached",
          description: `"${file.name}" ready to send with your message`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error reading file",
        description: error.message || "Could not read the file content",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSendWithFile = async () => {
    if ((!inputValue.trim() && !attachedFile) || isLoading) return;

    let messageContent = inputValue.trim();

    if (attachedFile) {
      const docRes = await apiRequest('POST', '/api/documents', {
        title: attachedFile.name,
        sourceType: 'upload',
        rawText: attachedFile.content,
        tags: ['chat-upload'],
      });
      const doc = await docRes.json();

      messageContent = `[Attached document: "${attachedFile.name}" (saved to library with ID: ${doc.id})]\n\n${messageContent || `Please analyze this document: ${attachedFile.name}`}`;

      queryClient.invalidateQueries({ queryKey: ['/api/documents'] });
    }

    const userMessage: ChatMessage = { role: "user", content: messageContent };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue("");
    setAttachedFile(null);
    setIsLoading(true);

    // Auto-create session if needed
    let sessionId = currentSessionId;
    if (!sessionId) {
      try {
        const sessionRes = await apiRequest('POST', '/api/admin/bigmind/sessions', {
          title: messageContent.substring(0, 50) + (messageContent.length > 50 ? '...' : ''),
          mode: useCmsMode ? 'cms' : 'library',
        });
        const session = await sessionRes.json();
        sessionId = session.id;
        setCurrentSessionId(session.id);
        refetchChatSessions();
      } catch (error) {
        console.error('Failed to create session:', error);
      }
    }

    // Save user message
    if (sessionId) {
      saveMessageToDb('user', messageContent);
      if (messages.length === 0) {
        updateSessionTitle(sessionId, messageContent);
      }
    }

    try {
      const endpoint = useCmsMode ? '/api/admin/bigmind/chat' : '/api/admin-chat';
      const res = await apiRequest('POST', endpoint, { messages: newMessages, model: selectedModel });
      if (!res.ok) {
        throw new Error('Failed to get response');
      }
      const data = await res.json();

      if (useCmsMode && data.functionCalls?.length > 0) {
        queryClient.invalidateQueries({ queryKey: ['/api/pages'] });
        queryClient.invalidateQueries({ queryKey: ['/api/clusters'] });
        queryClient.invalidateQueries({ queryKey: ['/api/science-articles'] });
        queryClient.invalidateQueries({ queryKey: ['/api/products'] });
        queryClient.invalidateQueries({ queryKey: ['/api/documents'] });
      }

      const assistantMessage = {
        role: "assistant" as const,
        content: data.response,
        functionCalls: data.functionCalls
      };
      setMessages([...newMessages, assistantMessage]);

      // Save assistant response
      if (sessionId) {
        saveMessageToDb('assistant', data.response, data.functionCalls);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response from BigMind. Please try again.",
        variant: "destructive",
      });
      setMessages(newMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateMagicPage = async () => {
    if (!studioPrompt.trim() || !studioTitle.trim()) {
      toast({ title: "Missing Information", description: "Please provide a title and prompt", variant: "destructive" });
      return;
    }
    setIsGenerating(true);
    try {
      const res = await apiRequest('POST', '/api/admin/magic-sessions', {
        title: studioTitle,
        sourceType: 'prompt',
        sourceContent: studioPrompt,
      });
      const session = await res.json();

      const genRes = await apiRequest('POST', `/api/admin/magic-sessions/${session.id}/generate`);
      const generated = await genRes.json();

      setActiveSession(generated);
      setGeneratedPreview(generated.generatedHtml);
      refetchSessions();
      toast({ title: "Page Generated", description: "Your magic page is ready for preview" });
    } catch (error) {
      toast({ title: "Generation Failed", description: "Could not generate the page", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyToPage = async () => {
    if (!activeSession) return;
    try {
      const newPageRes = await apiRequest('POST', '/api/pages', {
        key: studioPath.replace(/\//g, '-').replace(/^-/, '') || `magic-${Date.now()}`,
        title: studioTitle,
        path: studioPath || `/magic/${Date.now()}`,
        pageType: 'content',
        template: 'science-small',
        status: 'draft',
        content: activeSession.generatedHtml,
      });
      const newPage = await newPageRes.json();

      await apiRequest('PUT', `/api/admin/magic-sessions/${activeSession.id}`, {
        appliedPageId: newPage.id,
        status: 'applied'
      });

      toast({ title: "Page Created", description: `Created "${studioTitle}" as a draft page` });
      queryClient.invalidateQueries({ queryKey: ['/api/pages'] });
      refetchSessions();
      setActiveSession(null);
      setGeneratedPreview(null);
      setStudioPrompt("");
      setStudioTitle("");
      setStudioPath("");
    } catch (error) {
      toast({ title: "Error", description: "Failed to create page", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            BigMind Studio
          </h2>
          <p className="text-sm text-muted-foreground">
            AI-powered content creation and CMS management
          </p>
        </div>
        <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
          <Button
            variant={studioTab === 'chat' ? "default" : "ghost"}
            size="sm"
            onClick={() => setStudioTab('chat')}
            data-testid="button-tab-chat"
          >
            <MessageCircle className="w-4 h-4 mr-2" /> Chat
          </Button>
          <Button
            variant={studioTab === 'studio' ? "default" : "ghost"}
            size="sm"
            onClick={() => setStudioTab('studio')}
            data-testid="button-tab-studio"
          >
            <Wand2 className="w-4 h-4 mr-2" /> Studio
          </Button>
          <Button
            variant={studioTab === 'settings' ? "default" : "ghost"}
            size="sm"
            onClick={() => setStudioTab('settings')}
            data-testid="button-tab-settings"
          >
            <Settings className="w-4 h-4 mr-2" /> AI Settings
          </Button>
        </div>
      </div>

      {studioTab === 'chat' && (
        <>
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant={useCmsMode ? "default" : "outline"}
              size="sm"
              onClick={() => setUseCmsMode(true)}
              data-testid="button-cms-mode"
            >
              <Database className="w-4 h-4 mr-2" /> CMS Mode
            </Button>
            <Button
              variant={!useCmsMode ? "default" : "outline"}
              size="sm"
              onClick={() => setUseCmsMode(false)}
              data-testid="button-library-mode"
            >
              <MessageCircle className="w-4 h-4 mr-2" /> Library Mode
            </Button>
            <div className="border-l h-6 mx-2" />
            <Select value={selectedModel} onValueChange={(v) => setSelectedModel(v as AIModel)}>
              <SelectTrigger className="w-[150px] h-8 text-xs" data-testid="select-ai-model">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AI_MODELS.map(model => (
                  <SelectItem key={model.value} value={model.value} className="text-xs">
                    {model.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex-1" />
            <Button
              variant="outline"
              size="sm"
              onClick={createNewSession}
              data-testid="button-new-chat"
            >
              <Plus className="w-4 h-4 mr-2" /> New Chat
            </Button>
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSessionList(!showSessionList)}
                data-testid="button-chat-history"
              >
                <History className="w-4 h-4 mr-2" /> History {chatSessions?.length ? `(${chatSessions.length})` : ''}
              </Button>
              {showSessionList && chatSessions && chatSessions.length > 0 && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-card border rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
                  <div className="p-3 border-b">
                    <h4 className="font-semibold text-sm">Chat History</h4>
                  </div>
                  <div className="p-2">
                    {chatSessions.map((session) => (
                      <div
                        key={session.id}
                        className={`p-3 rounded-lg cursor-pointer hover:bg-muted flex items-center justify-between gap-2 ${currentSessionId === session.id ? 'bg-primary/10 border border-primary/30' : ''}`}
                        onClick={() => switchToSession(session.id)}
                        data-testid={`session-item-${session.id}`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{session.title}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-2">
                            <span>{session.messageCount} messages</span>
                            <span>·</span>
                            <span>{session.mode}</span>
                            {session.lastMessageAt && (
                              <>
                                <span>·</span>
                                <span>{new Date(session.lastMessageAt).toLocaleDateString()}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0 h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Delete this chat session?')) {
                              deleteSession(session.id);
                            }
                          }}
                          data-testid={`button-delete-session-${session.id}`}
                        >
                          <Trash className="w-3 h-3 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Button
              variant={showSuggestionsPanel ? "default" : "outline"}
              size="sm"
              onClick={() => setShowSuggestionsPanel(!showSuggestionsPanel)}
              data-testid="button-suggestions-panel"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              Suggestions {pendingSuggestions.length > 0 && `(${pendingSuggestions.length})`}
            </Button>
            {messages.length > 0 && (
              <Button variant="outline" size="sm" onClick={clearChat} data-testid="button-clear-chat">
                <X className="w-4 h-4 mr-2" /> Clear
              </Button>
            )}
          </div>

          {/* Suggestions Panel */}
          {showSuggestionsPanel && (
            <div className="bg-card border rounded-xl p-4 space-y-4" data-testid="suggestions-panel">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  AI Recommendations ({pendingSuggestions.length} pending)
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowSuggestionsPanel(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {pendingSuggestions.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No pending suggestions. Chat with BigMind and click "Save Recommendations" to capture AI ideas.
                </p>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {pendingSuggestions.map((suggestion: any) => (
                    <div
                      key={suggestion.id}
                      className="bg-muted/50 rounded-lg p-3 space-y-2"
                      data-testid={`suggestion-card-${suggestion.id}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={cn(
                              "text-xs font-medium px-2 py-0.5 rounded",
                              suggestion.type === 'content_gap' && "bg-purple-500/20 text-purple-400",
                              suggestion.type === 'visual_config' && "bg-pink-500/20 text-pink-400",
                              suggestion.type === 'motion_config' && "bg-cyan-500/20 text-cyan-400",
                              suggestion.type === 'internal_link' && "bg-blue-500/20 text-blue-400",
                              suggestion.type === 'publish_draft' && "bg-green-500/20 text-green-400",
                              suggestion.type === 'seo_improvement' && "bg-orange-500/20 text-orange-400",
                              suggestion.type === 'document_integration' && "bg-amber-500/20 text-amber-400",
                            )}>
                              {suggestion.type.replace(/_/g, ' ')}
                            </span>
                            {suggestion.pageKey && (
                              <span className="text-xs text-muted-foreground">
                                → {suggestion.pageKey}
                              </span>
                            )}
                          </div>
                          <h4 className="font-medium text-sm mt-1">{suggestion.title}</h4>
                          {suggestion.summary && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {suggestion.summary}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0 text-green-500 hover:text-green-600 hover:bg-green-500/10"
                            onClick={() => applySuggestion(suggestion.id)}
                            title="Mark as Applied"
                            data-testid={`button-apply-suggestion-${suggestion.id}`}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                            onClick={() => dismissSuggestion(suggestion.id)}
                            title="Dismiss"
                            data-testid={`button-dismiss-suggestion-${suggestion.id}`}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      {suggestion.payload && Object.keys(suggestion.payload).length > 0 && (
                        <details className="text-xs">
                          <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                            View details
                          </summary>
                          <pre className="mt-2 p-2 bg-background rounded text-xs overflow-x-auto">
                            {JSON.stringify(suggestion.payload, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {overview && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card border rounded-xl p-4">
                <div className="text-2xl font-bold text-primary">{overview.totalPages}</div>
                <div className="text-sm text-muted-foreground">Total Pages</div>
              </div>
              <div className="bg-card border rounded-xl p-4">
                <div className="text-2xl font-bold text-green-600">{overview.priorityStats.p1}</div>
                <div className="text-sm text-muted-foreground">P1 Core Pages</div>
              </div>
              <div className="bg-card border rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-600">{overview.priorityStats.p2}</div>
                <div className="text-sm text-muted-foreground">P2 Important</div>
              </div>
              <div className="bg-card border rounded-xl p-4">
                <div className="text-2xl font-bold text-amber-600">{overview.emptyClusterss.length}</div>
                <div className="text-sm text-muted-foreground">Empty Clusters</div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {/* Chat Container - Resizable */}
            <div
              ref={resizeRef}
              className="bg-card border rounded-xl overflow-hidden relative"
              style={{ height: `${chatHeight}px` }}
              data-testid="resizable-chat-container"
            >
              <div className="h-full flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4" data-testid="chat-messages">
                  {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8">
                      <Brain className="w-16 h-16 text-muted-foreground/30 mb-4" />
                      <h3 className="font-semibold text-lg mb-2">
                        {useCmsMode ? "BigMind CMS Manager" : "BigMind Library"}
                      </h3>
                      <p className="text-muted-foreground text-sm max-w-md mb-6">
                        {useCmsMode
                          ? "I can create, edit, and manage your entire content database. Ask me to add pages, update articles, or organize clusters."
                          : "I have full knowledge of your site structure. Ask me about gaps, linking opportunities, or ideas."}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-lg">
                        {useCmsMode ? (
                          <>
                            <Button
                              variant="outline"
                              className="text-left justify-start h-auto py-3 px-4"
                              onClick={() => setInputValue("Create a new page about structured water benefits at /science/structured-water-benefits")}
                              data-testid="button-suggested-create"
                            >
                              <Plus className="w-4 h-4 mr-2 shrink-0" />
                              <span className="text-sm">Create a new page</span>
                            </Button>
                            <Button
                              variant="outline"
                              className="text-left justify-start h-auto py-3 px-4"
                              onClick={() => setInputValue("Show me the site stats and which clusters need content")}
                              data-testid="button-suggested-stats"
                            >
                              <BarChart2 className="w-4 h-4 mr-2 shrink-0" />
                              <span className="text-sm">Site stats & gaps</span>
                            </Button>
                            <Button
                              variant="outline"
                              className="text-left justify-start h-auto py-3 px-4"
                              onClick={() => setInputValue("List all pages in the water-science cluster")}
                              data-testid="button-suggested-list"
                            >
                              <FileText className="w-4 h-4 mr-2 shrink-0" />
                              <span className="text-sm">List cluster pages</span>
                            </Button>
                            <Button
                              variant="outline"
                              className="text-left justify-start h-auto py-3 px-4"
                              onClick={() => setInputValue("Create 3 new educational articles about ionic minerals")}
                              data-testid="button-suggested-bulk"
                            >
                              <Wand2 className="w-4 h-4 mr-2 shrink-0" />
                              <span className="text-sm">Bulk create content</span>
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              variant="outline"
                              className="text-left justify-start h-auto py-3 px-4"
                              onClick={() => setInputValue("What pages are missing from the site?")}
                              data-testid="button-suggested-missing"
                            >
                              <Sparkles className="w-4 h-4 mr-2 shrink-0" />
                              <span className="text-sm">What pages are missing?</span>
                            </Button>
                            <Button
                              variant="outline"
                              className="text-left justify-start h-auto py-3 px-4"
                              onClick={() => setInputValue("Which clusters need more content?")}
                              data-testid="button-suggested-clusters"
                            >
                              <FolderTree className="w-4 h-4 mr-2 shrink-0" />
                              <span className="text-sm">Clusters needing content</span>
                            </Button>
                            <Button
                              variant="outline"
                              className="text-left justify-start h-auto py-3 px-4"
                              onClick={() => setInputValue("Suggest internal linking opportunities")}
                              data-testid="button-suggested-linking"
                            >
                              <Link className="w-4 h-4 mr-2 shrink-0" />
                              <span className="text-sm">Linking opportunities</span>
                            </Button>
                            <Button
                              variant="outline"
                              className="text-left justify-start h-auto py-3 px-4"
                              onClick={() => setInputValue("Suggest 3 new Magic Page ideas with titles and slugs")}
                              data-testid="button-suggested-magic"
                            >
                              <Wand2 className="w-4 h-4 mr-2 shrink-0" />
                              <span className="text-sm">New Magic Page ideas</span>
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      {messages.map((msg, index) => (
                        <div
                          key={index}
                          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          data-testid={`chat-message-${index}`}
                        >
                          <div
                            className={`max-w-[85%] rounded-xl px-4 py-3 ${msg.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                              }`}
                          >
                            {msg.role === 'assistant' ? (
                              <div className="space-y-3">
                                {/* Enhancement indicator badge */}
                                {messageEnhancementInfo.has(index) && (
                                  <div className="flex items-center gap-2 pb-2 mb-2 border-b border-border/30">
                                    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20">
                                      <Sparkles className="w-3 h-3" />
                                      {messageEnhancementInfo.get(index)!.count} enhancement{messageEnhancementInfo.get(index)!.count !== 1 ? 's' : ''} ready
                                    </span>
                                  </div>
                                )}
                                {msg.functionCalls && msg.functionCalls.length > 0 && (
                                  <div className="space-y-2 pb-3 mb-3 border-b border-border/50">
                                    <div className="text-xs font-medium text-muted-foreground mb-2">Actions performed:</div>
                                    {msg.functionCalls.map((fc, fcIdx) => {
                                      const pageTitle = fc.result?.page?.title || (fc as any).args?.title || '';
                                      const pagePath = fc.result?.page?.path || (fc as any).args?.path || '';
                                      const isCreatePage = fc.name === 'createPage';
                                      const isUpdatePage = fc.name === 'updatePage';
                                      const isFindGaps = fc.name === 'findContentGaps';

                                      return (
                                        <div key={fcIdx} className={`flex items-start gap-2 p-2 rounded-lg ${fc.result?.success ? 'bg-green-500/10' : fc.result?.error ? 'bg-red-500/10' : 'bg-muted/50'}`}>
                                          {isCreatePage ? (
                                            <Plus className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                          ) : isUpdatePage ? (
                                            <Edit className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                          ) : isFindGaps ? (
                                            <Search className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                                          ) : (
                                            <Database className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                          )}
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                              <span className="font-mono text-xs font-medium">
                                                {fc.name}
                                              </span>
                                              {fc.result?.success && (
                                                <CheckCircle2 className="w-3 h-3 text-green-500" />
                                              )}
                                              {fc.result?.error && (
                                                <XCircle className="w-3 h-3 text-red-500" />
                                              )}
                                            </div>
                                            {(isCreatePage || isUpdatePage) && pageTitle && (
                                              <div className="text-xs text-muted-foreground mt-0.5">
                                                "{pageTitle}" {pagePath && <span className="opacity-70">→ {pagePath}</span>}
                                              </div>
                                            )}
                                            {fc.result?.error && (
                                              <div className="text-xs text-red-500 mt-0.5">{fc.result.error}</div>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                                <div className="prose prose-sm dark:prose-invert max-w-none ai-markdown-content [&_h1]:text-lg [&_h1]:font-bold [&_h1]:mt-3 [&_h1]:mb-2 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:mt-3 [&_h2]:mb-2 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mt-2 [&_h3]:mb-1 [&_p]:my-2 [&_ul]:my-2 [&_ul]:pl-4 [&_ol]:my-2 [&_ol]:pl-4 [&_li]:my-1 [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-cyan-300 [&_pre]:bg-gray-800/50 [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_blockquote]:border-l-2 [&_blockquote]:border-purple-500 [&_blockquote]:pl-3 [&_blockquote]:italic [&_strong]:font-semibold [&_em]:text-muted-foreground">
                                  <div dangerouslySetInnerHTML={{ __html: formatAiMessage(msg.content) }} />
                                </div>
                                {msg.functionCalls?.some(fc =>
                                  (fc.name === 'createPage' || fc.name === 'updatePage' || fc.name === 'generatePageContent') &&
                                  fc.result?.success
                                ) && (() => {
                                  const pageCall = msg.functionCalls?.find(fc =>
                                    (fc.name === 'createPage' || fc.name === 'updatePage' || fc.name === 'generatePageContent') &&
                                    fc.result?.success
                                  );
                                  const pageData = pageCall?.result?.page || pageCall?.result;
                                  const content = pageData?.content || pageData?.aiStartupHtml || pageData?.html;
                                  if (!content) return null;

                                  const isActiveInPreview = activePreview?.pageId === pageData?.id;

                                  return (
                                    <div className="mt-3 pt-3 border-t border-border/30">
                                      <Button
                                        variant={isActiveInPreview ? "default" : "outline"}
                                        size="sm"
                                        className="w-full justify-start gap-2"
                                        onClick={() => {
                                          setActivePreview({
                                            content,
                                            title: pageData?.title,
                                            path: pageData?.path,
                                            cluster: pageData?.clusterKey,
                                            pageId: pageData?.id,
                                            status: pageData?.status,
                                            suggestions: [
                                              { id: 'seo-1', type: 'seo', title: 'Add meta description', summary: 'Improve SEO with a compelling description', applied: false },
                                              { id: 'visual-1', type: 'visual', title: 'Add featured image', summary: 'Generate an AI image for the hero section', applied: false },
                                              { id: 'motion-1', type: 'motion', title: 'Apply motion effects', summary: 'Add Liquid-Crystal Float animation', applied: false },
                                            ]
                                          });
                                          setShowPreviewPanel(true);
                                        }}
                                        data-testid={`button-view-preview-${index}`}
                                      >
                                        <Eye className="w-4 h-4" />
                                        {isActiveInPreview ? 'Viewing in Preview Panel' : 'View in Preview Panel'}
                                        <ChevronDown className="w-4 h-4 ml-auto" />
                                      </Button>
                                    </div>
                                  );
                                })()}
                                {/* Apply from BigMind button for messages with page content */}
                                {messageEnhancementInfo.has(index) && (
                                  <div className="mt-3 pt-3 border-t border-border/50">
                                    {showEnhancementPanel === index ? (
                                      <div className="space-y-3 bg-background/50 rounded-lg p-3 border" data-testid={`enhancement-panel-${index}`}>
                                        <div className="flex items-center justify-between">
                                          <h4 className="font-medium text-sm flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-primary" />
                                            Enhancements Preview
                                          </h4>
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-6 w-6 p-0"
                                            onClick={() => setShowEnhancementPanel(null)}
                                          >
                                            <X className="w-4 h-4" />
                                          </Button>
                                        </div>

                                        {/* Page selector at top */}
                                        <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                                          <label className="flex items-center gap-2 text-xs cursor-pointer">
                                            <input
                                              type="radio"
                                              checked={createNewPage}
                                              onChange={() => setCreateNewPage(true)}
                                              className="w-3 h-3"
                                            />
                                            New page
                                          </label>
                                          <label className="flex items-center gap-2 text-xs cursor-pointer">
                                            <input
                                              type="radio"
                                              checked={!createNewPage}
                                              onChange={() => setCreateNewPage(false)}
                                              className="w-3 h-3"
                                            />
                                            Existing:
                                          </label>
                                          {!createNewPage && (
                                            <Select value={targetPageId} onValueChange={setTargetPageId}>
                                              <SelectTrigger className="h-7 text-xs flex-1 max-w-[200px]">
                                                <SelectValue placeholder="Select page..." />
                                              </SelectTrigger>
                                              <SelectContent>
                                                {pagesList?.map((page: any) => (
                                                  <SelectItem key={page.id} value={page.id}>
                                                    {page.title}
                                                  </SelectItem>
                                                ))}
                                              </SelectContent>
                                            </Select>
                                          )}
                                        </div>

                                        <div className="space-y-3 max-h-[400px] overflow-y-auto">
                                          {pendingEnhancements.map((enh) => (
                                            <div
                                              key={enh.id}
                                              className="p-3 rounded-lg bg-muted/50 border border-border/50"
                                              data-testid={`enhancement-item-${enh.id}`}
                                            >
                                              <div className="flex items-start justify-between gap-2 mb-2">
                                                <div className="flex items-center gap-2">
                                                  <input
                                                    type="checkbox"
                                                    checked={selectedEnhancements.has(enh.id)}
                                                    onChange={(e) => {
                                                      const newSet = new Set(selectedEnhancements);
                                                      if (e.target.checked) {
                                                        newSet.add(enh.id);
                                                      } else {
                                                        newSet.delete(enh.id);
                                                      }
                                                      setSelectedEnhancements(newSet);
                                                    }}
                                                    className="mt-0.5"
                                                  />
                                                  <span className="text-xs font-medium px-2 py-1 rounded bg-primary/15 text-primary border border-primary/20">
                                                    {(enh.enhancementType || enh.type || 'enhancement').replace(/_/g, ' ').toUpperCase()}
                                                  </span>
                                                  {enh.fieldName && (
                                                    <span className="text-xs text-muted-foreground">
                                                      → {enh.fieldName}
                                                    </span>
                                                  )}
                                                </div>
                                                <Button
                                                  size="sm"
                                                  variant="outline"
                                                  className="h-7 text-xs gap-1"
                                                  onClick={() => applySingleEnhancement(enh, targetPageId || undefined)}
                                                  disabled={applyingEnhancementId === enh.id || (!createNewPage && !targetPageId)}
                                                  data-testid={`button-apply-single-${enh.id}`}
                                                >
                                                  {applyingEnhancementId === enh.id ? (
                                                    <Loader2 className="w-3 h-3 animate-spin" />
                                                  ) : (
                                                    <Play className="w-3 h-3" />
                                                  )}
                                                  Apply
                                                </Button>
                                              </div>

                                              {/* Preview content */}
                                              <div className="mt-2 p-2 rounded bg-background/80 border text-xs max-h-32 overflow-y-auto">
                                                {(enh.enhancementType === 'hero_content' || enh.enhancementType === 'section_content') ? (
                                                  <div
                                                    className="prose prose-xs dark:prose-invert max-w-none [&_*]:text-xs"
                                                    dangerouslySetInnerHTML={{
                                                      __html: (enh.suggestedValue || enh.content || '').substring(0, 500) + ((enh.suggestedValue || enh.content || '').length > 500 ? '...' : '')
                                                    }}
                                                  />
                                                ) : (enh.enhancementType === 'tag' && enh.fieldName?.startsWith('visualConfig')) ? (
                                                  <pre className="text-[10px] text-muted-foreground whitespace-pre-wrap">
                                                    {(enh.suggestedValue || '').substring(0, 300)}{(enh.suggestedValue || '').length > 300 ? '...' : ''}
                                                  </pre>
                                                ) : (
                                                  <p className="text-muted-foreground whitespace-pre-wrap">
                                                    {(enh.suggestedValue || enh.content || '').substring(0, 300)}{(enh.suggestedValue || enh.content || '').length > 300 ? '...' : ''}
                                                  </p>
                                                )}
                                              </div>

                                              {enh.reason && (
                                                <p className="text-[10px] text-muted-foreground mt-2 italic">
                                                  {enh.reason}
                                                </p>
                                              )}
                                            </div>
                                          ))}
                                        </div>

                                        <div className="flex gap-2 pt-2 border-t">
                                          <Button
                                            size="sm"
                                            onClick={applySelectedEnhancements}
                                            disabled={selectedEnhancements.size === 0 || (!createNewPage && !targetPageId) || applyingMessageIdx === index}
                                            className="gap-2"
                                            data-testid="button-apply-enhancements"
                                          >
                                            {applyingMessageIdx === index ? (
                                              <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Applying...
                                              </>
                                            ) : (
                                              <>
                                                <CheckCircle2 className="w-4 h-4" />
                                                Apply {selectedEnhancements.size} Selected
                                              </>
                                            )}
                                          </Button>
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => setShowEnhancementPanel(null)}
                                          >
                                            Cancel
                                          </Button>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="flex gap-2 flex-wrap">
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => showEnhancementSelector(msg.content, index)}
                                          disabled={applyingMessageIdx === index}
                                          className="gap-2"
                                          data-testid={`button-apply-bigmind-${index}`}
                                        >
                                          {applyingMessageIdx === index ? (
                                            <>
                                              <Loader2 className="w-4 h-4 animate-spin" />
                                              Applying...
                                            </>
                                          ) : (
                                            <>
                                              <Sparkles className="w-4 h-4" />
                                              Review &amp; Apply to Page
                                            </>
                                          )}
                                        </Button>
                                        {hasBigmindRecommendations(msg.content) && (
                                          <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => saveRecommendationsFromMessage(msg.content, index)}
                                            disabled={savingRecommendationsIdx === index}
                                            className="gap-2"
                                            data-testid={`button-save-recommendations-${index}`}
                                          >
                                            {savingRecommendationsIdx === index ? (
                                              <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Saving...
                                              </>
                                            ) : (
                                              <>
                                                <Database className="w-4 h-4" />
                                                Save Recommendations
                                              </>
                                            )}
                                          </Button>
                                        )}
                                        {/* Suggested Images button */}
                                        {messageEnhancementInfo.get(index)?.parsed.imagePrompts &&
                                          messageEnhancementInfo.get(index)!.parsed.imagePrompts.length > 0 && (
                                            <Button
                                              size="sm"
                                              variant="outline"
                                              onClick={() => showImagePrompts(index, messageEnhancementInfo.get(index)!.parsed.imagePrompts)}
                                              className="gap-2"
                                              data-testid={`button-suggested-images-${index}`}
                                            >
                                              <ImageIcon className="w-4 h-4" />
                                              {messageEnhancementInfo.get(index)!.parsed.imagePrompts.length} Image{messageEnhancementInfo.get(index)!.parsed.imagePrompts.length !== 1 ? 's' : ''}
                                            </Button>
                                          )}
                                      </div>
                                    )}

                                    {/* Suggested Images Panel */}
                                    {showSuggestedImages === index && messageEnhancementInfo.get(index)?.parsed.imagePrompts && (
                                      <div className="mt-3 space-y-3 bg-background/50 rounded-lg p-3 border" data-testid={`suggested-images-panel-${index}`}>
                                        <div className="flex items-center justify-between">
                                          <h4 className="font-medium text-sm flex items-center gap-2">
                                            <ImageIcon className="w-4 h-4 text-primary" />
                                            Suggested Images
                                          </h4>
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-6 w-6 p-0"
                                            onClick={() => setShowSuggestedImages(null)}
                                          >
                                            <X className="w-4 h-4" />
                                          </Button>
                                        </div>

                                        <div className="space-y-4">
                                          {messageEnhancementInfo.get(index)!.parsed.imagePrompts.map((imgPrompt) => (
                                            <div key={imgPrompt.id} className="space-y-2 p-3 rounded-lg bg-muted/50 border">
                                              <div className="flex items-center gap-2 text-xs">
                                                <Badge variant="outline" className="text-[10px]">
                                                  {imgPrompt.slotType}
                                                </Badge>
                                                <span className="text-muted-foreground">{imgPrompt.location}</span>
                                              </div>

                                              <Textarea
                                                value={editableImagePrompts[imgPrompt.id] || imgPrompt.prompt}
                                                onChange={(e) => setEditableImagePrompts(prev => ({
                                                  ...prev,
                                                  [imgPrompt.id]: e.target.value
                                                }))}
                                                className="min-h-[80px] text-xs"
                                                placeholder="Edit image prompt..."
                                                data-testid={`input-image-prompt-${imgPrompt.id}`}
                                              />

                                              <div className="flex items-center gap-2">
                                                <Button
                                                  size="sm"
                                                  onClick={() => handleGenerateImage(imgPrompt)}
                                                  disabled={generatingImageId === imgPrompt.id}
                                                  className="gap-2"
                                                  data-testid={`button-generate-image-${imgPrompt.id}`}
                                                >
                                                  {generatingImageId === imgPrompt.id ? (
                                                    <>
                                                      <Loader2 className="w-3 h-3 animate-spin" />
                                                      Generating...
                                                    </>
                                                  ) : (
                                                    <>
                                                      <Sparkles className="w-3 h-3" />
                                                      Generate Image
                                                    </>
                                                  )}
                                                </Button>

                                                {generatedImages[imgPrompt.id] && (
                                                  <span className="text-xs text-green-500 flex items-center gap-1">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    Generated
                                                  </span>
                                                )}
                                              </div>

                                              {generatedImages[imgPrompt.id] && (
                                                <div className="mt-2 rounded-lg overflow-hidden border">
                                                  <img
                                                    src={generatedImages[imgPrompt.id]}
                                                    alt={imgPrompt.location}
                                                    className="w-full h-32 object-cover"
                                                  />
                                                </div>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <p className="text-sm">{msg.content}</p>
                            )}
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start" data-testid="chat-loading">
                          <div className="bg-muted rounded-xl px-4 py-3 flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm text-muted-foreground">Thinking...</span>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>

                <div className="border-t p-4 bg-muted/30">
                  {attachedFile && (
                    <div className="flex items-center gap-2 mb-2 p-2 bg-primary/10 rounded-lg text-sm">
                      <FileUp className="w-4 h-4 text-primary" />
                      <span className="flex-1 truncate">{attachedFile.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => setAttachedFile(null)}
                        data-testid="button-remove-file"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".txt,.md,.html,.json,.csv,.xml,.pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleFileSelect}
                      data-testid="input-file-upload"
                    />
                    <div className="flex-1 relative">
                      <Textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={useCmsMode
                          ? "Tell BigMind what to create, edit, or manage..."
                          : "Ask BigMind about your site content..."}
                        className="min-h-[60px] resize-none pr-10"
                        disabled={isLoading}
                        data-testid="input-chat-message"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 bottom-1 h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isLoading || isUploading}
                        title="Attach a file"
                        data-testid="button-attach-file"
                      >
                        {isUploading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Paperclip className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <Button
                      onClick={handleSendWithFile}
                      disabled={(!inputValue.trim() && !attachedFile) || isLoading}
                      className="h-auto"
                      data-testid="button-send-chat"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Resize Handle */}
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize transition-colors flex items-center justify-center group",
                  isResizing ? "bg-primary/20" : "hover:bg-primary/10"
                )}
                onMouseDown={() => setIsResizing(true)}
                data-testid="chat-resize-handle"
              >
                <div className={cn(
                  "w-12 h-1 rounded-full transition-colors",
                  isResizing ? "bg-primary" : "bg-muted-foreground/30 group-hover:bg-primary/50"
                )} />
              </div>
            </div>

            {/* Live Preview Panel - Shows page being designed */}
            {activePreview && (
              <div className="bg-card border rounded-xl overflow-hidden" data-testid="preview-panel">
                <div className="flex items-center justify-between p-3 border-b bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-primary" />
                      <span className="font-medium text-sm">Live Preview</span>
                    </div>
                    {activePreview.title && (
                      <span className="text-sm text-muted-foreground">— {activePreview.title}</span>
                    )}
                    {activePreview.status && (
                      <Badge variant={activePreview.status === 'published' ? 'default' : 'secondary'} className="text-xs">
                        {activePreview.status}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7"
                      onClick={() => setShowPreviewPanel(!showPreviewPanel)}
                      data-testid="button-toggle-preview"
                    >
                      {showPreviewPanel ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => setActivePreview(null)}
                      data-testid="button-close-preview"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {showPreviewPanel && (
                  <div className="p-4 space-y-4">
                    {/* Suggestion Cards with Apply Buttons */}
                    {activePreview.suggestions && activePreview.suggestions.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          Enhancement Suggestions
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                          {activePreview.suggestions.map((suggestion) => (
                            <div
                              key={suggestion.id}
                              className={cn(
                                "p-3 rounded-lg border transition-all",
                                suggestion.applied
                                  ? "bg-green-500/10 border-green-500/30"
                                  : "bg-muted/50 hover:bg-muted"
                              )}
                              data-testid={`suggestion-${suggestion.id}`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className={cn(
                                      "text-xs font-medium px-1.5 py-0.5 rounded",
                                      suggestion.type === 'seo' && "bg-orange-500/20 text-orange-500",
                                      suggestion.type === 'visual' && "bg-pink-500/20 text-pink-500",
                                      suggestion.type === 'content' && "bg-blue-500/20 text-blue-500",
                                      suggestion.type === 'motion' && "bg-cyan-500/20 text-cyan-500",
                                    )}>
                                      {suggestion.type}
                                    </span>
                                    {suggestion.applied && (
                                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                                    )}
                                  </div>
                                  <p className="text-sm font-medium mt-1">{suggestion.title}</p>
                                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                                    {suggestion.summary}
                                  </p>
                                </div>
                                {!suggestion.applied && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 text-xs shrink-0"
                                    onClick={() => {
                                      setActivePreview(prev => prev ? {
                                        ...prev,
                                        suggestions: prev.suggestions?.map(s =>
                                          s.id === suggestion.id ? { ...s, applied: true } : s
                                        )
                                      } : null);
                                      toast({
                                        title: "Enhancement Applied",
                                        description: suggestion.title,
                                      });
                                    }}
                                    data-testid={`button-apply-${suggestion.id}`}
                                  >
                                    Apply
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Page Content Preview */}
                    <div className="rounded-lg border overflow-hidden" style={{ maxHeight: '300px' }}>
                      <PageContentPreview
                        content={activePreview.content}
                        title={activePreview.title}
                        path={activePreview.path}
                        cluster={activePreview.cluster}
                        pageId={activePreview.pageId}
                        status={activePreview.status}
                        showActions={true}
                        defaultExpanded={true}
                        maxHeight="300px"
                        onPublish={async () => {
                          if (activePreview.pageId) {
                            try {
                              await apiRequest('PUT', `/api/pages/${activePreview.pageId}`, { status: 'published' });
                              queryClient.invalidateQueries({ queryKey: ['/api/pages'] });
                              setActivePreview(prev => prev ? { ...prev, status: 'published' } : null);
                              toast({ title: "Published!", description: `${activePreview.title} is now live.` });
                            } catch (e) {
                              toast({ title: "Error", description: "Failed to publish", variant: "destructive" });
                            }
                          }
                        }}
                      />
                    </div>

                    {/* Motion Layout Link Manager */}
                    <div className="space-y-3 p-4 bg-muted/30 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                          <Film className="w-4 h-4 text-primary" />
                          Motion Layout Links
                        </h4>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs"
                            onClick={() => {
                              setActivePreview(prev => prev ? {
                                ...prev,
                                motionLinks: {
                                  hero: 'liquid-crystal-float',
                                  content: 'subtle-shimmer',
                                  cards: 'krystal-bloom',
                                  buttons: 'energetic-pulse',
                                  background: 'parallax-depth',
                                  images: 'ripple-emergence',
                                }
                              } : null);
                              toast({ title: "Auto-linked", description: "Default motions applied to all elements" });
                            }}
                            data-testid="button-auto-link-motion"
                          >
                            <Zap className="w-3 h-3 mr-1" />
                            Auto-link
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="h-7 text-xs"
                            onClick={() => {
                              setActivePreview(prev => prev ? { ...prev, motionLinks: {} } : null);
                            }}
                            data-testid="button-clear-motion"
                          >
                            Clear All
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {MOTION_ELEMENTS.map((element) => {
                          const ElementIcon = element.icon;
                          const linkedMotion = activePreview.motionLinks?.[element.key as keyof typeof activePreview.motionLinks];
                          const motionInfo = MOTION_ARCHETYPES.find(m => m.key === linkedMotion);

                          return (
                            <div
                              key={element.key}
                              className={cn(
                                "p-2 rounded-lg border transition-all cursor-pointer",
                                linkedMotion
                                  ? "bg-primary/10 border-primary/30"
                                  : "bg-background hover:bg-muted/50"
                              )}
                              data-testid={`motion-slot-${element.key}`}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <ElementIcon className="w-4 h-4 text-muted-foreground" />
                                <span className="text-xs font-medium">{element.label}</span>
                              </div>
                              <Select
                                value={linkedMotion || "none"}
                                onValueChange={(value) => {
                                  setActivePreview(prev => prev ? {
                                    ...prev,
                                    motionLinks: {
                                      ...prev.motionLinks,
                                      [element.key]: value === "none" ? undefined : value,
                                    }
                                  } : null);
                                  if (value !== "none") {
                                    const motion = MOTION_ARCHETYPES.find(m => m.key === value);
                                    toast({
                                      title: "Motion Applied",
                                      description: `${motion?.name || value} linked to ${element.label}`,
                                    });
                                  }
                                }}
                              >
                                <SelectTrigger className="h-7 text-xs">
                                  <SelectValue placeholder="Select motion" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="none">
                                    <span className="text-muted-foreground">None</span>
                                  </SelectItem>
                                  {MOTION_ARCHETYPES.map((motion) => (
                                    <SelectItem key={motion.key} value={motion.key}>
                                      <div className="flex items-center gap-2">
                                        <motion.icon className="w-3 h-3" />
                                        <span>{motion.name}</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {motionInfo && (
                                <p className="text-[10px] text-muted-foreground mt-1 line-clamp-1">
                                  {motionInfo.description}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Show count of linked motions */}
                      {activePreview.motionLinks && Object.values(activePreview.motionLinks).filter(Boolean).length > 0 && (
                        <div className="text-xs text-muted-foreground flex items-center gap-2 pt-2 border-t">
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                          {Object.values(activePreview.motionLinks).filter(Boolean).length} of {MOTION_ELEMENTS.length} elements linked
                        </div>
                      )}
                    </div>

                    {/* Ready to Publish indicator */}
                    {activePreview.suggestions && activePreview.suggestions.every(s => s.applied) && (
                      <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          <span className="font-medium text-green-700 dark:text-green-400">
                            All enhancements applied - Ready to publish!
                          </span>
                        </div>
                        {activePreview.pageId && activePreview.status !== 'published' && (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={async () => {
                              try {
                                await apiRequest('PUT', `/api/pages/${activePreview.pageId}`, { status: 'published' });
                                queryClient.invalidateQueries({ queryKey: ['/api/pages'] });
                                setActivePreview(prev => prev ? { ...prev, status: 'published' } : null);
                                toast({ title: "Published!", description: `${activePreview.title} is now live.` });
                              } catch (e) {
                                toast({ title: "Error", description: "Failed to publish", variant: "destructive" });
                              }
                            }}
                            data-testid="button-publish-page"
                          >
                            <Globe className="w-4 h-4 mr-2" />
                            Publish Now
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {studioTab === 'studio' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border rounded-xl p-6 space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-primary" />
                Magic Page Creator
              </h3>
              <p className="text-sm text-muted-foreground">
                Describe the page you want to create, and AI will design it for you.
              </p>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="studio-title">Page Title</Label>
                  <Input
                    id="studio-title"
                    value={studioTitle}
                    onChange={(e) => setStudioTitle(e.target.value)}
                    placeholder="e.g., Benefits of Structured Water"
                    data-testid="input-studio-title"
                  />
                </div>
                <div>
                  <Label htmlFor="studio-path">Page Path (optional)</Label>
                  <Input
                    id="studio-path"
                    value={studioPath}
                    onChange={(e) => setStudioPath(e.target.value)}
                    placeholder="e.g., /science/structured-water-benefits"
                    data-testid="input-studio-path"
                  />
                </div>
                <div>
                  <Label htmlFor="studio-prompt">Page Brief</Label>
                  <Textarea
                    id="studio-prompt"
                    value={studioPrompt}
                    onChange={(e) => setStudioPrompt(e.target.value)}
                    placeholder="Describe the page content, style, and key information to include..."
                    className="min-h-[120px]"
                    data-testid="input-studio-prompt"
                  />
                </div>
                <Button
                  onClick={handleCreateMagicPage}
                  disabled={isGenerating || !studioPrompt.trim() || !studioTitle.trim()}
                  className="w-full"
                  data-testid="button-generate-page"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Page
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="bg-card border rounded-xl p-6 space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                Preview
              </h3>
              {generatedPreview ? (
                <div className="space-y-4">
                  <div
                    className="border rounded-lg p-4 bg-muted/30 max-h-[400px] overflow-auto"
                    dangerouslySetInnerHTML={{ __html: generatedPreview }}
                    data-testid="preview-container"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={handleApplyToPage}
                      className="flex-1"
                      data-testid="button-apply-page"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create as Draft Page
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setGeneratedPreview(null);
                        setActiveSession(null);
                      }}
                      data-testid="button-discard-page"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Discard
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="h-[300px] flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg">
                  <Wand2 className="w-12 h-12 text-muted-foreground/30 mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Generated page preview will appear here
                  </p>
                </div>
              )}
            </div>
          </div>

          {sessions && sessions.length > 0 && (
            <div className="bg-card border rounded-xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Recent Sessions
              </h3>
              <div className="space-y-2">
                {sessions.slice(0, 5).map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                    data-testid={`session-${session.id}`}
                  >
                    <div>
                      <div className="font-medium">{session.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(session.createdAt).toLocaleDateString()} - {session.status}
                      </div>
                    </div>
                    <Badge variant={session.status === 'applied' ? 'default' : 'secondary'}>
                      {session.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {studioTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-card border rounded-xl p-6 space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              AI Preferences
            </h3>
            <p className="text-sm text-muted-foreground">
              Configure how BigMind AI generates content for your site.
            </p>

            <div className="space-y-4">
              {aiSettings && aiSettings.length > 0 ? (
                aiSettings.map((setting) => (
                  <div key={setting.key} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>{setting.label}</Label>
                      <Badge variant={setting.isActive ? 'default' : 'secondary'}>
                        {setting.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    {setting.description && (
                      <p className="text-xs text-muted-foreground">{setting.description}</p>
                    )}
                    <Textarea
                      value={setting.value}
                      className="min-h-[80px]"
                      readOnly
                    />
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Settings className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No AI settings configured yet.</p>
                  <p className="text-sm">Settings will appear here once created.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type MaintenanceReport = {
  id: string;
  timestamp: string;
  triggeredBy: string;
  summary: {
    totalChecks: number;
    passed: number;
    warnings: number;
    errors: number;
  };
  results: Array<{
    name: string;
    status: 'ok' | 'warn' | 'error';
    message?: string;
    details?: string;
    count?: number;
  }>;
  routeMismatches: {
    missingBackend: string[];
    unusedBackend: string[];
  };
  suggestions: string[];
  backendRoutesCount: number;
  frontendCallsCount: number;
};


export default BigMindTab;
