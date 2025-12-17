import React, { useState, useEffect, useRef, useMemo, lazy, Suspense } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest, getAuthToken, setAuthToken, clearAuthToken, getAuthHeaders } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Lazy load tabs for performance optimization
const LazySettingsTab = lazy(() => import('./admin/tabs/SettingsTab'));
const LazyAnalyticsTab = lazy(() => import('./admin/tabs/AnalyticsTab'));
const LazyBigMindTab = lazy(() => import('./admin/tabs/BigMindTab'));
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSection, FormRow, FormField } from "@/components/admin/AdminSection";
import { cn } from "@/lib/utils";
import { parseBigMindResponse, type ParsedBigMindResponse, extractEnhancements, hasEnhancementContent, type ParsedEnhancement, extractBigmindRecommendations, hasBigmindRecommendations, type BigmindRecommendation } from "@/lib/bigmind-parser";
import {
  Edit, Save, Trash, Plus, ChevronRight, ChevronDown, ChevronUp,
  FileText, Package, Beaker, FolderTree, LayoutDashboard,
  LogOut, RefreshCw, Eye, EyeOff, X, ArrowLeft, FileUp,
  Link, Upload, Youtube, ClipboardPaste, Hash, AlertCircle, CheckCircle, CheckCircle2, Clock, Loader2,
  Target, TrendingUp, BarChart2, Search, Zap, ArrowUpRight, Filter, Scan,
  Wand2, Sparkles, ListTree, FileCheck, XCircle, Play, Send, Settings, Key, Database,
  Code2, LayoutTemplate, Paintbrush, Palette, Film, Image, Lightbulb, Heart, Brain, MessageCircle, Copy,
  User, Paperclip, FileType, ImageIcon, VideoIcon, FileTextIcon, History, Layers, Globe, Cpu
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, AreaChart, Area
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RichTextEditor from "@/components/rich-text-editor";
import { PageContentPreview } from "@/components/page-content-preview";
import { MotionLibraryPreview, SingleMotionPreview, MOTION_ARCHETYPES } from "@/components/motion-library-preview";
import SeoDashboard from "@/components/admin/SeoDashboard";

type ContentStats = {
  totalPages: number;
  publishedPages: number;
  draftPages: number;
  totalProducts: number;
  totalArticles: number;
  totalClusters: number;
};

type VisualVibe = {
  vibeKeywords: string[];
  emotionalTone: string[];
  animationIdeas: string[];
  aiImagePromptPattern?: string;
  aiVideoPromptPattern?: string;
  designerNotes?: string;
};

type VisualConfig = {
  pageId: string;
  cluster: string;
  priority: 'P1' | 'P2' | 'P3';
  vibeKeywords: string[];
  emotionalTone: string[];
  animationIdeas: string[];
  aiImagePrompt: string;
  aiVideoPrompt: string;
  designerNotes: string;
};

type Page = {
  id: string;
  key: string;
  title: string;
  path: string;
  pageType: string;
  template: string;
  clusterKey: string | null;
  parentKey: string | null;
  priority: number;
  status: string;
  summary: string | null;
  content: string | null;
  seoFocus: string | null;
  visualConfig?: VisualConfig | null;
  children?: Page[];
  createdAt?: string | null;
  updatedAt?: string | null;
  publishedAt?: string | null;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  sizeMl: number;
  descriptionShort: string;
  descriptionLong: string;
  price: number;
  pricePerLiter: number;
  pageKey: string | null;
  templateId: string | null;
  highlights: string[];
  tags: string[];
};

type Cluster = {
  id: string;
  key: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  parentClusterKey?: string | null;
  priority?: number;
  color?: string | null;
  visualVibe?: VisualVibe | null;
};

type Article = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  clusterId: string;
  tags: string[];
  priority: number;
  pageKey: string | null;
  publishedAt: string;
};

type Document = {
  id: string;
  title: string;
  sourceType: 'upload' | 'youtube' | 'url' | 'paste';
  sourceUrl: string | null;
  rawText: string;
  cleanText: string | null;
  tags: string[];
  entities: string[];
  wordCount: number;
  chunkCount: number;
  status: 'pending' | 'processing' | 'indexed' | 'failed';
  embeddingModel: string | null;
  errorMessage: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};

type DocumentChunk = {
  id: string;
  documentId: string;
  chunkIndex: number;
  content: string;
  tokenCount: number;
  createdAt: string;
};

type SeoKeyword = {
  id: string;
  keyword: string;
  searchIntent: 'informational' | 'commercial' | 'navigational' | 'transactional';
  difficultyScore: number | null;
  volumeEstimate: number | null;
  relevanceScore: number | null;
  competitorNotes: string | null;
  status: 'idea' | 'analyzing' | 'planned' | 'in_progress' | 'published' | 'rejected';
  suggestedPageId: string | null;
  targetClusterKey: string | null;
  relatedDocIds: string[] | null;
  notes: string | null;
  lastAnalyzedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type MagicPageOutlineSection = {
  heading: string;
  level: number;
  description?: string;
};

type MagicPageDraftContent = {
  hero?: { title: string; subtitle?: string };
  tldr?: string;
  sections?: Array<{ heading: string; content: string }>;
  faq?: Array<{ question: string; answer: string }>;
  cta?: { text: string; buttonText: string; productSlug?: string };
};

type MagicPageSuggestion = {
  id: string;
  keywordId: string | null;
  targetKeyword: string;
  workingTitle: string;
  suggestedSlug: string;
  targetPersona: string | null;
  outline: { sections: MagicPageOutlineSection[] } | null;
  sourceDocIds: string[];
  suggestedProductLinks: string[];
  suggestedPageLinks: string[];
  draftContent: MagicPageDraftContent | null;
  generatedPageId: string | null;
  status: 'suggested' | 'outline_ready' | 'generating' | 'draft_ready' | 'editing' | 'published' | 'rejected';
  score: number | null;
  generationModel: string | null;
  generatedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type LinkingRule = {
  id: string;
  name: string;
  ruleType: 'keyword_match' | 'cluster_based' | 'page_type' | 'manual';
  triggerPattern: string;
  targetPagePath: string;
  anchorText: string | null;
  priority: number;
  maxOccurrences: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};

type CtaTemplate = {
  id: string;
  name: string;
  slug: string;
  headline: string;
  description: string | null;
  buttonText: string;
  buttonLink: string | null;
  productSlug: string | null;
  position: 'after_intro' | 'mid_content' | 'before_faq' | 'footer' | 'sidebar';
  triggerClusters: string[];
  triggerKeywords: string[];
  priority: number;
  isActive: boolean;
  styling: {
    backgroundColor?: string;
    textColor?: string;
    buttonColor?: string;
    borderStyle?: string;
  };
  createdAt: string;
  updatedAt: string;
};

type HtmlTemplate = {
  id: string;
  name: string;
  slug: string;
  templateType: 'hero' | 'section' | 'grid' | 'calculator' | 'faq' | 'table' | 'cta' | 'callout' | 'full_page';
  componentClass: string | null;
  description: string | null;
  htmlContent: string;
  previewImage: string | null;
  tags: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};

type CmsSetting = {
  id: string;
  key: string;
  value: any;
  description: string | null;
  category: string;
  updatedAt: string;
};

const SETTINGS_CATEGORIES = [
  { key: 'magic_ai', label: 'Magic AI', icon: Wand2, description: 'Magic Page AI system prompt' },
  { key: 'api_keys', label: 'API Keys', icon: Key, description: 'External service API keys' },
  { key: 'thresholds', label: 'Thresholds', icon: BarChart2, description: 'Scoring and generation thresholds' },
  { key: 'seo', label: 'SEO Settings', icon: Search, description: 'SEO scanner configuration' },
  { key: 'maintenance', label: 'Maintenance', icon: RefreshCw, description: 'AI-powered codebase maintenance' },
  { key: 'general', label: 'General', icon: Settings, description: 'General CMS settings' },
];

// Available AI models for BigMind
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

const LINKING_RULE_TYPE_CONFIG: Record<string, { label: string; color: string }> = {
  keyword_match: { label: 'Keyword', color: 'bg-blue-100 text-blue-700' },
  cluster_based: { label: 'Cluster', color: 'bg-purple-100 text-purple-700' },
  page_type: { label: 'Page Type', color: 'bg-green-100 text-green-700' },
  manual: { label: 'Manual', color: 'bg-orange-100 text-orange-700' },
};

const CTA_POSITION_CONFIG: Record<string, { label: string; description: string }> = {
  after_intro: { label: 'After Intro', description: 'After the first paragraph' },
  mid_content: { label: 'Mid Content', description: 'In the middle of the article' },
  before_faq: { label: 'Before FAQ', description: 'Before the FAQ section' },
  footer: { label: 'Footer', description: 'At the end of the content' },
  sidebar: { label: 'Sidebar', description: 'In the sidebar area' },
};

const TEMPLATE_TYPE_CONFIG: Record<string, { label: string; color: string }> = {
  hero: { label: 'Hero', color: 'bg-blue-100 text-blue-700' },
  section: { label: 'Section', color: 'bg-green-100 text-green-700' },
  grid: { label: 'Grid', color: 'bg-purple-100 text-purple-700' },
  calculator: { label: 'Calculator', color: 'bg-amber-100 text-amber-700' },
  faq: { label: 'FAQ', color: 'bg-cyan-100 text-cyan-700' },
  table: { label: 'Table', color: 'bg-orange-100 text-orange-700' },
  cta: { label: 'CTA', color: 'bg-rose-100 text-rose-700' },
  callout: { label: 'Callout', color: 'bg-indigo-100 text-indigo-700' },
  full_page: { label: 'Full Page', color: 'bg-slate-100 text-slate-700' },
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

type EnhancementTask = {
  id: string;
  label: string;
  description: string;
  field: string;
  detected: boolean;
  value?: string | string[];
  missing?: boolean;
};

interface ExtractedVisualConfig {
  vibeKeywords: string[];
  emotionalTone: string[];
  colorPalette: string;
  layoutsDetected: string[];
  motionPreset: string;
  entranceMotion: string;
  hoverMotion: string;
  ambientMotion: string;
}

interface ExtractedAiData {
  featuredImage?: string;
  heroImage?: string;
  images: Array<{ label: string; prompt: string }>;
  visualConfig: Partial<ExtractedVisualConfig>;
}

function extractAllFromAiResponse(response: string): ExtractedAiData {
  const result: ExtractedAiData = {
    images: [],
    visualConfig: {}
  };

  // Extract from visual-config block - support multiple formats
  const visualConfigMatch = response.match(/```visual-config\n([\s\S]*?)```/i) ||
    response.match(/``visual-config\n?([\s\S]*?)``/i) ||
    response.match(/<code>visual-config\n?([\s\S]*?)<\/code>/i) ||
    response.match(/visual-config\n(VIBE KEYWORDS:[\s\S]*?)(?:\n\n\n|\n```|$)/i);

  // Helper to parse values with or without brackets
  const parseListValue = (text: string): string[] => {
    return text.replace(/^\[|\]$/g, '').split(',').map(s => s.trim().replace(/["']/g, '')).filter(Boolean);
  };

  if (visualConfigMatch) {
    const configBlock = visualConfigMatch[1];

    // VIBE KEYWORDS - support both [brackets] and plain format
    const vibeMatch = configBlock.match(/VIBE\s*KEYWORDS?:\s*\[([^\]]+)\]/i) ||
      configBlock.match(/VIBE\s*KEYWORDS?:\s*([^\n]+)/i);
    if (vibeMatch) {
      result.visualConfig.vibeKeywords = parseListValue(vibeMatch[1]);
    }

    // EMOTIONAL TONE - support both formats
    const toneMatch = configBlock.match(/EMOTIONAL\s*TONE:\s*\[([^\]]+)\]/i) ||
      configBlock.match(/EMOTIONAL\s*TONE:\s*([^\n]+)/i);
    if (toneMatch) {
      result.visualConfig.emotionalTone = parseListValue(toneMatch[1]);
    }

    const paletteMatch = configBlock.match(/COLOR\s*PALETTE:\s*([^\n]+)/i);
    if (paletteMatch) {
      result.visualConfig.colorPalette = paletteMatch[1].trim();
    }

    const layoutMatch = configBlock.match(/LAYOUT(?:S?)[\s_]DETECTED:\s*([^\n]+)/i);
    if (layoutMatch) {
      result.visualConfig.layoutsDetected = parseListValue(layoutMatch[1]);
    }

    const motionPresetMatch = configBlock.match(/MOTION\s*PRESET:\s*([^\n]+)/i);
    if (motionPresetMatch) {
      result.visualConfig.motionPreset = motionPresetMatch[1].trim();
    }

    const entranceMatch = configBlock.match(/ENTRANCE:\s*([^\n]+)/i);
    if (entranceMatch) {
      result.visualConfig.entranceMotion = entranceMatch[1].trim();
    }

    const hoverMatch = configBlock.match(/HOVER:\s*([^\n]+)/i);
    if (hoverMatch) {
      result.visualConfig.hoverMotion = hoverMatch[1].trim();
    }

    const ambientMatch = configBlock.match(/AMBIENT:\s*([^\n]+)/i);
    if (ambientMatch) {
      result.visualConfig.ambientMotion = ambientMatch[1].trim();
    }
  }

  // Also try loose format parsing (not in code block)
  if (!result.visualConfig.vibeKeywords) {
    const looseVibeMatch = response.match(/VIBE\s*KEYWORDS?:\s*([^\n]+)/i);
    if (looseVibeMatch) {
      result.visualConfig.vibeKeywords = parseListValue(looseVibeMatch[1]);
    }
  }
  if (!result.visualConfig.emotionalTone) {
    const looseToneMatch = response.match(/EMOTIONAL\s*TONE:\s*([^\n]+)/i);
    if (looseToneMatch) {
      result.visualConfig.emotionalTone = parseListValue(looseToneMatch[1]);
    }
  }
  if (!result.visualConfig.colorPalette) {
    const looseColorMatch = response.match(/COLOR\s*PALETTE:\s*([^\n]+)/i);
    if (looseColorMatch) {
      result.visualConfig.colorPalette = looseColorMatch[1].trim();
    }
  }
  if (!result.visualConfig.motionPreset) {
    const looseMotionMatch = response.match(/MOTION\s*PRESET:\s*([^\n]+)/i);
    if (looseMotionMatch) {
      result.visualConfig.motionPreset = looseMotionMatch[1].trim();
    }
  }

  // Extract from image-prompts block - support multiple formats
  const imagePromptsMatch = response.match(/```image-prompts\n([\s\S]*?)```/i) ||
    response.match(/``image-prompts\n?([\s\S]*?)``/i) ||
    response.match(/<\/code><\/pre>image-prompts\n?([\s\S]*?)(?=\n\n\n|$)/i) ||
    response.match(/image-prompts\n((?:Hero|Section|Featured|Background)[^\n]*:[\s\S]*?)(?:\n\n\n|$)/i);
  if (imagePromptsMatch) {
    const promptsBlock = imagePromptsMatch[1];
    // Handle multi-line prompts
    const entries: { label: string; prompt: string }[] = [];
    let currentLabel = '';
    let currentPrompt = '';

    const lines = promptsBlock.split('\n');
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) continue;

      const colonIdx = trimmedLine.indexOf(':');
      const potentialLabel = colonIdx > 0 ? trimmedLine.substring(0, colonIdx).trim() : '';

      // Check if this looks like a new label
      const isNewEntry = colonIdx > 0 && (
        /^(Hero|Section|Featured|Background|Icon|Gallery)/i.test(potentialLabel) ||
        /^\d+[.)]?\s*-?\s*(Hero|Section|Featured|Background)/i.test(potentialLabel) ||
        /^[A-Z][a-z]+\s+\d+/i.test(potentialLabel) ||
        /^[A-Z][a-z]+\s+Visual/i.test(potentialLabel)
      );

      if (isNewEntry) {
        if (currentLabel && currentPrompt) {
          entries.push({ label: currentLabel, prompt: currentPrompt.trim() });
        }
        currentLabel = potentialLabel;
        currentPrompt = trimmedLine.substring(colonIdx + 1).trim();
      } else if (currentLabel) {
        currentPrompt += ' ' + trimmedLine;
      }
    }
    if (currentLabel && currentPrompt) {
      entries.push({ label: currentLabel, prompt: currentPrompt.trim() });
    }

    for (const { label, prompt } of entries) {
      if (prompt.length > 10) {
        if (label.toLowerCase().includes('featured')) {
          result.featuredImage = prompt;
        } else if (label.toLowerCase().includes('hero')) {
          result.heroImage = prompt;
        }
        result.images.push({ label, prompt });
      }
    }
  }

  // Fallback: extract individual image mentions
  const featuredRegex = /(?:Featured\s*Image|Main\s*Image)(?:\s*(?:Prompt|Description|Suggestion))?[:\s]*["']?([^"'\n]+)/gi;
  let match;
  while ((match = featuredRegex.exec(response)) !== null) {
    const prompt = match[1]?.trim().replace(/["']+$/, '').trim();
    if (prompt && prompt.length > 10) {
      if (!result.featuredImage) {
        result.featuredImage = prompt;
      }
      if (!result.images.find(i => i.prompt === prompt)) {
        result.images.push({ label: 'Featured Image', prompt });
      }
    }
  }

  const heroPatterns = [
    { regex: /(?:Hero\s*(?:Image|Visual|Background))(?:\s*(?:Prompt|Description|Suggestion))?[:\s]*["']?([^"'\n]+)/gi, type: 'hero' },
    { regex: /(?:Hero\s*background|Background\s*image)[:\s]*["']?([^"'\n]+)/gi, type: 'background' },
  ];

  for (const { regex, type } of heroPatterns) {
    let match;
    while ((match = regex.exec(response)) !== null) {
      const prompt = match[1]?.trim().replace(/["']+$/, '').trim();
      if (prompt && prompt.length > 10) {
        if (!result.heroImage) {
          result.heroImage = prompt;
        }
        const label = type === 'hero' ? 'Hero Image' : 'Background';
        if (!result.images.find(i => i.prompt === prompt)) {
          result.images.push({ label, prompt });
        }
      }
    }
  }

  // Extract Section images
  const sectionImageRegex = /Section\s*\d+\s*(?:Image|Visual)[:\s]*["']?([^"'\n]+)/gi;
  while ((match = sectionImageRegex.exec(response)) !== null) {
    const prompt = match[1]?.trim().replace(/["']+$/, '').trim();
    if (prompt && prompt.length > 10 && !result.images.find(i => i.prompt === prompt)) {
      result.images.push({ label: match[0].split(':')[0].trim(), prompt });
    }
  }

  // Extract Icon Set
  const iconSetMatch = response.match(/Icon\s*Set[:\s]*["']?([^"'\n]+)/i);
  if (iconSetMatch) {
    const prompt = iconSetMatch[1].trim();
    if (prompt.length > 10 && !result.images.find(i => i.prompt === prompt)) {
      result.images.push({ label: 'Icon Set', prompt });
    }
  }

  // Fallback for visual descriptions in content
  if (!result.featuredImage && !result.heroImage) {
    const dropletMatch = response.match(/(?:droplet|water\s+molecule|crystalline|mineral|ionic)[\s\w,]*(?:glowing|floating|suspended|illuminated|reflecting)[^.!?\n]*/i);
    if (dropletMatch) {
      result.heroImage = dropletMatch[0].trim();
    }
  }

  return result;
}

function extractImagePromptsFromAiResponse(response: string): { featuredImage?: string; heroImage?: string; images: Array<{ label: string; prompt: string }> } {
  const data = extractAllFromAiResponse(response);
  return {
    featuredImage: data.featuredImage,
    heroImage: data.heroImage,
    images: data.images
  };
}

function parseVisualConfigFromContent(content: string): { tasks: EnhancementTask[]; config: Record<string, any>; htmlBody: string } {
  const tasks: EnhancementTask[] = [];
  const config: Record<string, any> = {};
  let htmlBody = '';

  // Unescape HTML entities if content is escaped
  const unescapeHtml = (str: string) => str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');

  // Check if content appears to be escaped HTML
  const isEscaped = content.includes('&lt;') && content.includes('&gt;');
  const normalizedContent = isEscaped ? unescapeHtml(content) : content;

  const htmlCommentMatch = normalizedContent.match(/<!--[\s\S]*?ANDARA VISUAL CONFIG:[\s\S]*?-->/);
  const fencedMatch = normalizedContent.match(/```[\s\S]*?ANDARA VISUAL CONFIG:[\s\S]*?```/);
  const configBlock = htmlCommentMatch?.[0] || fencedMatch?.[0] || '';
  if (configBlock) {
    const afterConfig = htmlCommentMatch
      ? content.substring(content.indexOf('-->') + 3).trim()
      : fencedMatch
        ? content.substring(content.indexOf('```', content.indexOf('ANDARA VISUAL CONFIG')) + 3).trim()
        : '';
    if (afterConfig && (afterConfig.includes('<main') || afterConfig.includes('<section') || afterConfig.includes('<div'))) {
      htmlBody = afterConfig;
    }
    const pageIdMatch = configBlock.match(/pageId:\s*["']([^"']+)["']/);
    const clusterMatch = configBlock.match(/cluster:\s*["']([^"']+)["']/);
    const priorityMatch = configBlock.match(/priority:\s*["']?(P[123])["']?/);
    const vibeMatch = configBlock.match(/vibeKeywords:\s*\[([\s\S]*?)\]/);
    const emotionalMatch = configBlock.match(/emotionalTone:\s*\[([\s\S]*?)\]/);
    const animationMatch = configBlock.match(/animationIdeas:\s*\[([\s\S]*?)\]/);
    const imagePromptMatch = configBlock.match(/aiImagePromptHero:\s*["']([^"']+)["']/);
    const videoPromptMatch = configBlock.match(/aiVideoPromptHero:\s*["']([^"']+)["']/);
    const designerNotesMatch = configBlock.match(/designerNotes:\s*["']([^"']+)["']/);
    if (pageIdMatch) config.pageId = pageIdMatch[1];
    if (clusterMatch) config.cluster = clusterMatch[1];
    if (priorityMatch) config.priority = priorityMatch[1];
    if (vibeMatch) config.vibeKeywords = vibeMatch[1].split(',').map((s: string) => s.trim().replace(/["'\n]/g, '')).filter(Boolean);
    if (emotionalMatch) config.emotionalTone = emotionalMatch[1].split(',').map((s: string) => s.trim().replace(/["'\n]/g, '')).filter(Boolean);
    if (animationMatch) config.animationIdeas = animationMatch[1].split(',').map((s: string) => s.trim().replace(/["'\n]/g, '')).filter(Boolean);
    if (imagePromptMatch) config.aiImagePrompt = imagePromptMatch[1];
    if (videoPromptMatch) config.aiVideoPrompt = videoPromptMatch[1];
    if (designerNotesMatch) config.designerNotes = designerNotesMatch[1];
    if (config.pageId) tasks.push({ id: 'pageId', label: 'Page ID', description: config.pageId, field: 'key', detected: true, value: config.pageId });
    if (config.cluster) tasks.push({ id: 'cluster', label: 'Cluster', description: config.cluster, field: 'clusterKey', detected: true, value: config.cluster });
    if (config.vibeKeywords?.length) tasks.push({ id: 'vibeKeywords', label: 'Vibe Keywords', description: `${config.vibeKeywords.length} keywords detected`, field: 'vibeKeywords', detected: true, value: config.vibeKeywords });
    if (config.emotionalTone?.length) tasks.push({ id: 'emotionalTone', label: 'Emotional Tone', description: `${config.emotionalTone.length} tones detected`, field: 'emotionalTone', detected: true, value: config.emotionalTone });
    if (config.aiImagePrompt) tasks.push({ id: 'aiImagePrompt', label: 'Hero Image Prompt', description: 'AI image generation prompt detected', field: 'aiImagePrompt', detected: true, value: config.aiImagePrompt });
    if (config.aiVideoPrompt) tasks.push({ id: 'aiVideoPrompt', label: 'Hero Video Prompt', description: 'AI video generation prompt detected', field: 'aiVideoPrompt', detected: true, value: config.aiVideoPrompt });
    if (config.designerNotes) tasks.push({ id: 'designerNotes', label: 'Designer Notes', description: 'Designer notes detected', field: 'designerNotes', detected: true, value: config.designerNotes });
    if (htmlBody) tasks.push({ id: 'htmlContent', label: 'HTML Content', description: `${htmlBody.length} chars of HTML detected`, field: 'content', detected: true, value: htmlBody });
  }
  // --- Enhanced HTML Content Detection for Andara pages ---
  // Use normalizedContent (unescaped) for all pattern matching
  // Use simpler, more reliable regex patterns

  // 1. Page Title from H1 - match first h1
  const h1Match = normalizedContent.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match && !tasks.find(t => t.id === 'title')) {
    const title = h1Match[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
    if (title) {
      tasks.push({ id: 'title', label: 'Page Title', description: title.substring(0, 80), field: 'title', detected: true, value: title });
    }
  }

  // 2. SEO Description - find first paragraph after h1, or subline class, or lead class
  let seoDesc = '';
  // Try subline first
  if (normalizedContent.includes('subline') || normalizedContent.includes('lead')) {
    const sublineMatch = normalizedContent.match(/class="[^"]*(?:subline|lead)[^"]*"[^>]*>([\s\S]*?)<\/(?:p|div|span)>/i);
    if (sublineMatch) {
      seoDesc = sublineMatch[1].replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
    }
  }
  // Fallback: first <p> after hero headline
  if (!seoDesc) {
    const afterH1 = normalizedContent.split(/<\/h1>/i)[1] || '';
    const firstP = afterH1.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    if (firstP) {
      seoDesc = firstP[1].replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
    }
  }
  if (seoDesc && seoDesc.length > 20 && !tasks.find(t => t.id === 'seoDescription')) {
    seoDesc = seoDesc.substring(0, 160);
    tasks.push({ id: 'seoDescription', label: 'SEO Description', description: seoDesc.substring(0, 60) + '...', field: 'seoDescription', detected: true, value: seoDesc });
  }

  // 3. Hero image placeholder detection
  const hasMediaPlaceholder = normalizedContent.includes('media-placeholder') || normalizedContent.includes('hero-image') || normalizedContent.includes('placeholder');
  if (hasMediaPlaceholder && !tasks.find(t => t.id === 'heroImage')) {
    tasks.push({ id: 'heroImage', label: 'Hero Image Needed', description: 'Placeholder found', field: 'heroImage', detected: true, missing: true, value: 'Generate hero image' });
  }

  // 4. Section count - count all <section> tags
  const allSections = normalizedContent.match(/<section[^>]*>/gi);
  if (allSections && allSections.length > 0 && !tasks.find(t => t.id === 'sections')) {
    tasks.push({ id: 'sections', label: 'Content Sections', description: `${allSections.length} sections`, field: 'sections', detected: true, value: String(allSections.length) });
  }

  // 5. Internal links - find href starting with /
  const internalLinkMatches = normalizedContent.match(/href="\/[^"]+"/g);
  if (internalLinkMatches && internalLinkMatches.length > 0 && !tasks.find(t => t.id === 'internalLinks')) {
    const uniqueLinks = Array.from(new Set(internalLinkMatches.map(l => l.replace(/href="|"/g, ''))));
    tasks.push({ id: 'internalLinks', label: 'Internal Links', description: `${uniqueLinks.length} links`, field: 'internalLinks', detected: true, value: uniqueLinks });
  }

  // 6. CTA buttons - anchor with cta in class
  if (normalizedContent.includes('cta')) {
    const ctaMatches = normalizedContent.match(/<a[^>]*>[^<]*<\/a>/gi) || [];
    const ctaButtons = ctaMatches.filter(m => m.toLowerCase().includes('cta') || normalizedContent.substring(normalizedContent.indexOf(m) - 50, normalizedContent.indexOf(m)).includes('cta'));
    const actualCtas = normalizedContent.match(/<a[^>]+cta[^>]*>([^<]*)<\/a>/gi);
    if (actualCtas && actualCtas.length > 0 && !tasks.find(t => t.id === 'ctaButtons')) {
      const ctaTexts = actualCtas.map(m => m.replace(/<[^>]+>/g, '').trim()).filter(Boolean);
      if (ctaTexts.length > 0) {
        tasks.push({ id: 'ctaButtons', label: 'CTA Buttons', description: ctaTexts.slice(0, 2).join(', '), field: 'ctaButtons', detected: true, value: ctaTexts });
      }
    }
  }

  // 7. Key bullets/points - count li items in first ul
  const firstUl = normalizedContent.match(/<ul[^>]*>([\s\S]*?)<\/ul>/i);
  if (firstUl && !tasks.find(t => t.id === 'keyPoints')) {
    const bulletCount = (firstUl[1].match(/<li/gi) || []).length;
    if (bulletCount > 0) {
      tasks.push({ id: 'keyPoints', label: 'Key Points', description: `${bulletCount} bullet points`, field: 'keyPoints', detected: true, value: String(bulletCount) });
    }
  }

  // 8. Grid/card items - look for card or grid-item classes
  if (normalizedContent.includes('card') || normalizedContent.includes('grid')) {
    const cardMatches = normalizedContent.match(/class="[^"]*(?:card|grid-item|grid__item)[^"]*"/gi);
    if (cardMatches && cardMatches.length > 0 && !tasks.find(t => t.id === 'gridItems')) {
      tasks.push({ id: 'gridItems', label: 'Feature Cards', description: `${cardMatches.length} cards/items`, field: 'gridItems', detected: true, value: String(cardMatches.length) });
    }
  }

  // 9. H2 headings - count major content sections
  const h2Matches = normalizedContent.match(/<h2[^>]*>/gi);
  if (h2Matches && h2Matches.length > 0 && !tasks.find(t => t.id === 'headings')) {
    tasks.push({ id: 'headings', label: 'Section Headings', description: `${h2Matches.length} H2 headings`, field: 'headings', detected: true, value: String(h2Matches.length) });
  }

  // 10. Page ID from main id attribute
  const mainIdMatch = normalizedContent.match(/<main[^>]+id="([^"]+)"/i);
  if (mainIdMatch && !tasks.find(t => t.id === 'pageId')) {
    tasks.push({ id: 'pageId', label: 'Page ID', description: mainIdMatch[1], field: 'key', detected: true, value: mainIdMatch[1] });
  }

  // 11. Aria labels for accessibility
  const ariaLabelMatches = normalizedContent.match(/aria-label="[^"]+"/gi);
  if (ariaLabelMatches && ariaLabelMatches.length > 0 && !tasks.find(t => t.id === 'accessibility')) {
    tasks.push({ id: 'accessibility', label: 'Accessibility', description: `${ariaLabelMatches.length} aria-labels`, field: 'accessibility', detected: true, value: String(ariaLabelMatches.length) });
  }

  // 12. Cluster detection from page class (andara-page--science etc)
  const pageClassMatch = normalizedContent.match(/andara-page--([a-z-]+)/i) ||
    normalizedContent.match(/andara-([a-z]+)-page/i);
  if (pageClassMatch && !tasks.find(t => t.id === 'cluster')) {
    const clusterValue = pageClassMatch[1];
    tasks.push({ id: 'cluster', label: 'Content Cluster', description: clusterValue, field: 'clusterKey', detected: true, value: clusterValue.toLowerCase() });
  }

  // 13. Detect page template type from class
  const templateMatch = normalizedContent.match(/andara-page--([a-z-]+)/i);
  if (templateMatch && !tasks.find(t => t.id === 'template')) {
    tasks.push({ id: 'template', label: 'Page Template', description: templateMatch[1], field: 'template', detected: true, value: templateMatch[1] });
  }

  // 14. Generate Visual Config fields from content analysis
  // Extract key themes from h1, h2 headings for vibe keywords
  const allHeadings = normalizedContent.match(/<h[12][^>]*>([^<]+)</gi) || [];
  const headingTexts = allHeadings.map(h => h.replace(/<[^>]+>/g, '').trim().toLowerCase());
  const commonVibeWords = ['structured', 'flowing', 'crystalline', 'ionic', 'mineral', 'water', 'health', 'science', 'natural', 'pure', 'vital', 'energy', 'balance', 'terrain', 'bioelectric'];
  const detectedVibes = commonVibeWords.filter(w => headingTexts.some(h => h.includes(w)) || normalizedContent.toLowerCase().includes(w));
  if (detectedVibes.length > 0 && !tasks.find(t => t.id === 'vibeKeywords')) {
    tasks.push({ id: 'vibeKeywords', label: 'Vibe Keywords', description: detectedVibes.slice(0, 5).join(', '), field: 'vibeKeywords', detected: true, value: detectedVibes.slice(0, 5) });
  }

  // 15. Emotional tone based on content themes
  const toneMap: Record<string, string[]> = {
    'wonder': ['discover', 'explore', 'reveal', 'unlock', 'secret'],
    'clarity': ['clear', 'understand', 'simple', 'pure', 'clean'],
    'trust': ['science', 'research', 'study', 'proven', 'evidence'],
    'vitality': ['energy', 'life', 'vital', 'health', 'thrive'],
    'harmony': ['balance', 'natural', 'flow', 'connect', 'integrate']
  };
  const detectedTones: string[] = [];
  const lowerContent = normalizedContent.toLowerCase();
  Object.entries(toneMap).forEach(([tone, keywords]) => {
    if (keywords.some(k => lowerContent.includes(k))) detectedTones.push(tone);
  });
  if (detectedTones.length > 0 && !tasks.find(t => t.id === 'emotionalTone')) {
    tasks.push({ id: 'emotionalTone', label: 'Emotional Tone', description: detectedTones.join(', '), field: 'emotionalTone', detected: true, value: detectedTones });
  }

  // 16. Animation ideas based on content type
  const animationMap: Record<string, string[]> = {
    'water': ['water flow', 'ripple effects', 'wave motion'],
    'mineral': ['crystalline shimmer', 'particle float', 'glow pulse'],
    'energy': ['energy pulse', 'radiant glow', 'charge animation'],
    'science': ['diagram reveal', 'data visualization', 'molecular motion'],
    'health': ['gentle pulse', 'breathing rhythm', 'vitality glow']
  };
  const detectedAnimations: string[] = [];
  Object.entries(animationMap).forEach(([theme, anims]) => {
    if (lowerContent.includes(theme)) detectedAnimations.push(...anims.slice(0, 1));
  });
  if (detectedAnimations.length > 0 && !tasks.find(t => t.id === 'animationIdeas')) {
    tasks.push({ id: 'animationIdeas', label: 'Animation Ideas', description: detectedAnimations.slice(0, 3).join(', '), field: 'animationIdeas', detected: true, value: detectedAnimations.slice(0, 3) });
  }

  // 17. Generate AI Image Prompt from title and cluster
  const titleForPrompt = tasks.find(t => t.id === 'title')?.value;
  const clusterForPrompt = tasks.find(t => t.id === 'cluster')?.value;
  if (titleForPrompt && !tasks.find(t => t.id === 'aiImagePrompt')) {
    const imagePrompt = `Ethereal, scientific visualization of ${titleForPrompt}. Dark cosmic background with deep navy and purple gradients. Glowing ionic minerals and structured water crystals. ${clusterForPrompt ? `Theme: ${clusterForPrompt}.` : ''} Andara brand style: elegant, mystical yet scientific. High quality digital art, 16:9 aspect ratio.`;
    tasks.push({ id: 'aiImagePrompt', label: 'AI Image Prompt', description: 'Generated from title', field: 'aiImagePrompt', detected: true, value: imagePrompt });
  }

  return { tasks, config, htmlBody };
}

const MAGIC_PAGE_STATUS_CONFIG: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  suggested: { label: 'Suggested', color: 'bg-slate-100 text-slate-800', icon: Sparkles },
  outline_ready: { label: 'Outline Ready', color: 'bg-blue-100 text-blue-800', icon: ListTree },
  generating: { label: 'Generating', color: 'bg-amber-100 text-amber-800', icon: Loader2 },
  draft_ready: { label: 'Draft Ready', color: 'bg-purple-100 text-purple-800', icon: FileCheck },
  editing: { label: 'Editing', color: 'bg-cyan-100 text-cyan-800', icon: Edit },
  published: { label: 'Published', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800', icon: XCircle },
};

const SEO_STATUS_CONFIG: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  idea: { label: 'Idea', color: 'bg-slate-100 text-slate-800', icon: Zap },
  analyzing: { label: 'Analyzing', color: 'bg-blue-100 text-blue-800', icon: Loader2 },
  planned: { label: 'Planned', color: 'bg-purple-100 text-purple-800', icon: Target },
  in_progress: { label: 'In Progress', color: 'bg-amber-100 text-amber-800', icon: TrendingUp },
  published: { label: 'Published', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800', icon: X },
};

const INTENT_CONFIG: Record<string, { label: string; color: string }> = {
  informational: { label: 'Info', color: 'bg-sky-100 text-sky-700' },
  commercial: { label: 'Commercial', color: 'bg-emerald-100 text-emerald-700' },
  navigational: { label: 'Navigate', color: 'bg-orange-100 text-orange-700' },
  transactional: { label: 'Buy', color: 'bg-rose-100 text-rose-700' },
};

const SOURCE_TYPE_CONFIG = {
  paste: { label: 'Paste Text', icon: ClipboardPaste, color: 'text-purple-600' },
  url: { label: 'Web URL', icon: Link, color: 'text-green-600' },
  youtube: { label: 'YouTube', icon: Youtube, color: 'text-red-600' },
  upload: { label: 'File Upload', icon: Upload, color: 'text-blue-600' },
};

const STATUS_CONFIG: Record<string, { label: string; icon: typeof Clock; color: string; animate?: boolean }> = {
  pending: { label: 'Pending', icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
  processing: { label: 'Processing', icon: Loader2, color: 'bg-blue-100 text-blue-800', animate: true },
  indexed: { label: 'Indexed', icon: CheckCircle, color: 'bg-green-100 text-green-800' },
  failed: { label: 'Failed', icon: AlertCircle, color: 'bg-red-100 text-red-800' },
};

function DocumentCard({ document, onEdit, onDelete, onIndex, isIndexing }: { document: Document; onEdit: (doc: Document) => void; onDelete: (id: string) => void; onIndex: (id: string) => void; isIndexing: boolean }) {
  const sourceConfig = SOURCE_TYPE_CONFIG[document.sourceType as keyof typeof SOURCE_TYPE_CONFIG] || { label: 'Unknown', icon: FileText, color: 'text-gray-600' };
  const statusConfig = STATUS_CONFIG[document.status] || { label: 'Unknown', icon: Clock, color: 'bg-gray-100 text-gray-800' };
  const SourceIcon = sourceConfig.icon;
  const StatusIcon = statusConfig.icon;
  const canIndex = document.status === 'pending' || document.status === 'failed';

  return (
    <div className="bg-card border rounded-xl p-5 shadow-sm hover:border-primary/30 transition-colors" data-testid={`document-card-${document.id}`}>
      <div className="flex justify-between items-start gap-4 mb-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={`p-2 rounded-lg bg-muted ${sourceConfig.color}`}>
            <SourceIcon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base truncate" data-testid={`document-title-${document.id}`}>{document.title}</h3>
            {document.sourceUrl && (
              <p className="text-xs text-muted-foreground truncate mt-0.5">{document.sourceUrl}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Badge className={`${statusConfig.color} text-xs flex items-center gap-1`} data-testid={`document-status-${document.id}`}>
            <StatusIcon className={`w-3 h-3 ${statusConfig.animate ? 'animate-spin' : ''}`} />
            {statusConfig.label}
          </Badge>
          {canIndex && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onIndex(document.id)}
              disabled={isIndexing}
              data-testid={`button-index-document-${document.id}`}
            >
              {isIndexing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4 mr-1" />}
              {isIndexing ? 'Indexing...' : 'Index'}
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={() => onEdit(document)} data-testid={`button-edit-document-${document.id}`}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => {
            if (confirm('Are you sure you want to delete this document?')) {
              onDelete(document.id);
            }
          }} data-testid={`button-delete-document-${document.id}`}>
            <Trash className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
        <span className="flex items-center gap-1">
          <FileText className="w-3.5 h-3.5" />
          {document.wordCount?.toLocaleString() || 0} words
        </span>
        <span className="flex items-center gap-1">
          <Hash className="w-3.5 h-3.5" />
          {document.chunkCount || 0} chunks
        </span>
        <span className="text-xs">
          {new Date(document.createdAt).toLocaleDateString()}
        </span>
      </div>

      {document.tags && document.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {document.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
          ))}
        </div>
      )}

      {document.status === 'failed' && document.errorMessage && (
        <div className="mt-3 p-2 bg-red-50 text-red-700 text-xs rounded-lg">
          {document.errorMessage}
        </div>
      )}
    </div>
  );
}

function DocumentsTab({
  documents,
  onEdit,
  onCreate,
  onDelete,
  onIndex,
  indexingId,
  onRefresh
}: {
  documents: Document[];
  onEdit: (doc: Document) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
  onIndex: (id: string) => void;
  indexingId: string | null;
  onRefresh: () => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(`Processing ${files.length} file(s)...`);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setUploadProgress(`Uploading ${file.name} (${i + 1}/${files.length})...`);

      try {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/admin/documents/upload', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          const errorMsg = data.error || 'Upload failed';
          const hintMsg = data.hint ? `\n${data.hint}` : '';
          throw new Error(`${errorMsg}${hintMsg}`);
        }

        toast({
          title: "Uploaded",
          description: `${file.name}: ${data.wordCount.toLocaleString()} words extracted`
        });
      } catch (err: any) {
        toast({
          title: "Upload Failed",
          description: `${file.name}: ${err.message}`,
          variant: "destructive",
          duration: 8000
        });
      }
    }

    setIsUploading(false);
    setUploadProgress(null);
    onRefresh();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = !searchTerm ||
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags?.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
    const matchesSource = sourceFilter === "all" || doc.sourceType === sourceFilter;
    return matchesSearch && matchesStatus && matchesSource;
  });

  const statusCounts = {
    all: documents.length,
    pending: documents.filter(d => d.status === 'pending').length,
    processing: documents.filter(d => d.status === 'processing').length,
    indexed: documents.filter(d => d.status === 'indexed').length,
    failed: documents.filter(d => d.status === 'failed').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold">Documents & Sources</h2>
          <p className="text-sm text-muted-foreground">Knowledge base for AI-powered content generation</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            data-testid="button-upload-file"
          >
            <Upload className="w-4 h-4 mr-2" /> Upload PDF
          </Button>
          <Button onClick={onCreate} data-testid="button-add-document">
            <Plus className="w-4 h-4 mr-2" /> Add Document
          </Button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.txt,.md"
        className="hidden"
        onChange={(e) => handleFileUpload(e.target.files)}
        data-testid="input-file-upload"
      />

      {/* Drop zone */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${isDragging
          ? 'border-cyan-400 bg-cyan-400/10'
          : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
          } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        data-testid="dropzone-upload"
      >
        <div className="flex flex-col items-center text-center">
          {isUploading ? (
            <>
              <Loader2 className="w-8 h-8 text-cyan-500 animate-spin mb-2" />
              <p className="text-sm font-medium">{uploadProgress}</p>
            </>
          ) : (
            <>
              <FileUp className={`w-8 h-8 mb-2 ${isDragging ? 'text-cyan-500' : 'text-muted-foreground'}`} />
              <p className="text-sm font-medium">
                {isDragging ? 'Drop files here' : 'Drag & drop PDF, TXT, or MD files'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                or click "Upload PDF" button • Max 300MB per file
              </p>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <Input
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
          data-testid="input-search-documents"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]" data-testid="select-status-filter">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status ({statusCounts.all})</SelectItem>
            <SelectItem value="pending">Pending ({statusCounts.pending})</SelectItem>
            <SelectItem value="processing">Processing ({statusCounts.processing})</SelectItem>
            <SelectItem value="indexed">Indexed ({statusCounts.indexed})</SelectItem>
            <SelectItem value="failed">Failed ({statusCounts.failed})</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-[150px]" data-testid="select-source-filter">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="paste">Paste Text</SelectItem>
            <SelectItem value="url">Web URL</SelectItem>
            <SelectItem value="youtube">YouTube</SelectItem>
            <SelectItem value="upload">File Upload</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredDocuments.length === 0 ? (
        <div className="text-center py-12">
          <FileUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium mb-2">No documents found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {documents.length === 0
              ? "Add your first document to build the knowledge base"
              : "Try adjusting your filters"
            }
          </p>
          {documents.length === 0 && (
            <Button onClick={onCreate} variant="outline" data-testid="button-add-first-document">
              <Plus className="w-4 h-4 mr-2" /> Add Document
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredDocuments.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onEdit={onEdit}
              onDelete={onDelete}
              onIndex={onIndex}
              isIndexing={indexingId === doc.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

type DocumentFormData = {
  title: string;
  sourceType: 'upload' | 'youtube' | 'url' | 'paste';
  sourceUrl: string | null;
  rawText: string;
  tags: string[];
};

function DocumentEditorModal({
  document,
  isOpen,
  onClose,
  onSave,
  onViewChunks,
}: {
  document: Document | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: DocumentFormData, documentId: string | null) => Promise<void>;
  onViewChunks?: (documentId: string) => void;
}) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<DocumentFormData>({
    title: '',
    sourceType: 'paste',
    sourceUrl: null,
    rawText: '',
    tags: [],
  });
  const [tagsText, setTagsText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (document) {
      setFormData({
        title: document.title,
        sourceType: document.sourceType,
        sourceUrl: document.sourceUrl,
        rawText: document.rawText,
        tags: document.tags || [],
      });
      setTagsText((document.tags || []).join(', '));
    } else {
      setFormData({
        title: '',
        sourceType: 'paste',
        sourceUrl: null,
        rawText: '',
        tags: [],
      });
      setTagsText('');
    }
  }, [document, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const dataToSave = {
        ...formData,
        tags: tagsText.split(',').map(t => t.trim()).filter(t => t),
      };
      await onSave(dataToSave, document?.id || null);
      toast({
        title: document?.id ? "Document saved" : "Document created",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      console.error('Failed to save document:', error);
      toast({
        title: "Error saving",
        description: error instanceof Error ? error.message : "Failed to save document",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const showUrlInput = formData.sourceType === 'url' || formData.sourceType === 'youtube';
  const showTextInput = formData.sourceType === 'paste' || formData.sourceType === 'upload';

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileUp className="w-5 h-5" />
            {document ? `Edit: ${document.title}` : 'Add New Document'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="doc-title">Title *</Label>
            <Input
              id="doc-title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Document title"
              required
              data-testid="input-document-title"
            />
          </div>

          <div className="space-y-2">
            <Label>Source Type</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {(Object.entries(SOURCE_TYPE_CONFIG) as [keyof typeof SOURCE_TYPE_CONFIG, { label: string; icon: typeof Upload; color: string; comingSoon?: boolean }][]).map(([key, config]) => {
                const Icon = config.icon;
                const isComingSoon = config.comingSoon;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => !isComingSoon && setFormData(prev => ({ ...prev, sourceType: key, sourceUrl: null }))}
                    disabled={isComingSoon}
                    className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-colors relative ${isComingSoon
                      ? 'border-border opacity-50 cursor-not-allowed'
                      : formData.sourceType === key
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                      }`}
                    data-testid={`button-source-type-${key}`}
                  >
                    <Icon className={`w-5 h-5 ${config.color}`} />
                    <span className="text-xs font-medium">{config.label}</span>
                    {isComingSoon && (
                      <span className="absolute -top-1 -right-1 text-[9px] bg-muted px-1 rounded">Soon</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {showUrlInput && (
            <div className="space-y-2">
              <Label htmlFor="doc-url">
                {formData.sourceType === 'youtube' ? 'YouTube URL *' : 'Web URL *'}
              </Label>
              <Input
                id="doc-url"
                value={formData.sourceUrl || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, sourceUrl: e.target.value || null }))}
                placeholder={formData.sourceType === 'youtube' ? 'https://youtube.com/watch?v=...' : 'https://example.com/article'}
                required={showUrlInput}
                data-testid="input-document-url"
              />
              <p className="text-xs text-muted-foreground">
                {formData.sourceType === 'youtube'
                  ? 'Transcript will be fetched automatically'
                  : 'Content will be extracted from the page'}
              </p>
            </div>
          )}

          {formData.sourceType === 'upload' && (
            <div className="space-y-2">
              <Label htmlFor="doc-file">Select File *</Label>
              <Input
                id="doc-file"
                type="file"
                accept=".txt,.md,.html,.htm,.json,.csv,.xml"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const text = event.target?.result as string;
                      setFormData(prev => ({
                        ...prev,
                        rawText: text,
                        title: prev.title || file.name.replace(/\.[^/.]+$/, ''),
                        sourceUrl: file.name,
                      }));
                    };
                    reader.readAsText(file);
                  }
                }}
                data-testid="input-file-upload"
              />
              <p className="text-xs text-muted-foreground">
                Supported: .txt, .md, .html, .json, .csv, .xml
              </p>
            </div>
          )}

          {showTextInput && (
            <div className="space-y-2">
              <Label htmlFor="doc-content">
                {formData.sourceType === 'upload' ? 'File Content Preview' : 'Content *'}
              </Label>
              <Textarea
                id="doc-content"
                value={formData.rawText}
                onChange={(e) => setFormData(prev => ({ ...prev, rawText: e.target.value }))}
                placeholder={formData.sourceType === 'upload' ? 'Select a file above to see its content...' : 'Paste or type the document content here...'}
                rows={12}
                required={formData.sourceType === 'paste'}
                className="font-mono text-sm"
                data-testid="textarea-document-content"
              />
              <p className="text-xs text-muted-foreground">
                {formData.rawText.split(/\s+/).filter(w => w).length.toLocaleString()} words
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="doc-tags">Tags (comma-separated)</Label>
            <Input
              id="doc-tags"
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              placeholder="water science, minerals, health"
              data-testid="input-document-tags"
            />
            <p className="text-xs text-muted-foreground">Tags help organize and filter documents</p>
          </div>

          {document && document.status === 'indexed' && document.chunkCount > 0 && onViewChunks && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Document Chunks</p>
                  <p className="text-sm text-muted-foreground">{document.chunkCount} chunks indexed</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onViewChunks(document.id)}
                  data-testid="button-view-chunks"
                >
                  View Chunks
                </Button>
              </div>
            </div>
          )}

          <div className="flex justify-end items-center gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose} data-testid="button-cancel-document">
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving} data-testid="button-save-document">
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : (document ? 'Save Changes' : 'Create Document')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DocumentChunksModal({
  documentId,
  documentTitle,
  isOpen,
  onClose,
}: {
  documentId: string | null;
  documentTitle: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { data: chunks = [], isLoading } = useQuery<DocumentChunk[]>({
    queryKey: [`/api/admin/documents/${documentId}/chunks`],
    enabled: isOpen && !!documentId,
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Hash className="w-5 h-5" />
            Chunks: {documentTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : chunks.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No chunks found for this document
            </div>
          ) : (
            <div className="space-y-3">
              {chunks.map((chunk, index) => (
                <div key={chunk.id} className="bg-muted/50 rounded-lg p-4" data-testid={`chunk-${chunk.id}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">Chunk {index + 1}</Badge>
                    <span className="text-xs text-muted-foreground">{chunk.tokenCount} tokens</span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap font-mono leading-relaxed">
                    {chunk.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={onClose} data-testid="button-close-chunks">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getDifficultyColor(score: number | null): string {
  if (score === null) return 'text-muted-foreground';
  if (score <= 30) return 'text-green-600';
  if (score <= 50) return 'text-amber-600';
  if (score <= 70) return 'text-orange-600';
  return 'text-red-600';
}

function getRelevanceColor(score: number | null): string {
  if (score === null) return 'text-muted-foreground';
  if (score >= 70) return 'text-green-600';
  if (score >= 50) return 'text-amber-600';
  return 'text-muted-foreground';
}

function calculateOpportunityScore(kw: SeoKeyword): number {
  const relevance = kw.relevanceScore ?? 50;
  const difficulty = kw.difficultyScore ?? 50;
  const volume = kw.volumeEstimate ?? 100;
  const normalizedVolume = Math.min(100, Math.log10(Math.max(1, volume)) * 20);
  const invertedDifficulty = 100 - difficulty;
  return Math.round((relevance * 0.4) + (invertedDifficulty * 0.35) + (normalizedVolume * 0.25));
}

function SeoKeywordCard({
  keyword,
  onStatusChange,
  onDelete
}: {
  keyword: SeoKeyword;
  onStatusChange: (id: string, status: SeoKeyword["status"]) => void;
  onDelete: (id: string) => void;
}) {
  const statusConfig = SEO_STATUS_CONFIG[keyword.status];
  const intentConfig = INTENT_CONFIG[keyword.searchIntent];
  const StatusIcon = statusConfig.icon;
  const opportunityScore = calculateOpportunityScore(keyword);

  return (
    <div className="bg-card border rounded-xl p-5 shadow-sm hover:border-primary/30 transition-colors" data-testid={`seo-keyword-card-${keyword.id}`}>
      <div className="flex justify-between items-start gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base" data-testid={`keyword-text-${keyword.id}`}>
            {keyword.keyword}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge className={`${intentConfig.color} text-xs`}>{intentConfig.label}</Badge>
            {keyword.targetClusterKey && (
              <Badge variant="outline" className="text-xs">
                <FolderTree className="w-3 h-3 mr-1" />
                {keyword.targetClusterKey}
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="text-right">
            <div className="text-lg font-bold text-primary" data-testid={`opportunity-score-${keyword.id}`}>
              {opportunityScore}
            </div>
            <div className="text-[10px] text-muted-foreground uppercase">Score</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-muted/50 rounded-lg p-2 text-center">
          <div className={`text-sm font-semibold ${getDifficultyColor(keyword.difficultyScore)}`}>
            {keyword.difficultyScore ?? '—'}
          </div>
          <div className="text-[10px] text-muted-foreground">Difficulty</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-2 text-center">
          <div className="text-sm font-semibold text-foreground">
            {keyword.volumeEstimate?.toLocaleString() ?? '—'}
          </div>
          <div className="text-[10px] text-muted-foreground">Volume</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-2 text-center">
          <div className={`text-sm font-semibold ${getRelevanceColor(keyword.relevanceScore)}`}>
            {keyword.relevanceScore ?? '—'}%
          </div>
          <div className="text-[10px] text-muted-foreground">Relevance</div>
        </div>
      </div>

      {keyword.competitorNotes && (
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {keyword.competitorNotes}
        </p>
      )}

      <div className="flex items-center justify-between pt-3 border-t">
        <Badge className={`${statusConfig.color} text-xs flex items-center gap-1`}>
          <StatusIcon className={`w-3 h-3 ${keyword.status === 'analyzing' ? 'animate-spin' : ''}`} />
          {statusConfig.label}
        </Badge>
        <div className="flex items-center gap-1">
          <Select value={keyword.status} onValueChange={(value: "idea" | "analyzing" | "planned" | "in_progress" | "published" | "rejected") => onStatusChange(keyword.id, value)}>
            <SelectTrigger className="h-7 text-xs w-[100px]" data-testid={`select-status-${keyword.id}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="idea">Idea</SelectItem>
              <SelectItem value="analyzing">Analyzing</SelectItem>
              <SelectItem value="planned">Planned</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => {
              if (confirm('Delete this keyword?')) onDelete(keyword.id);
            }}
            data-testid={`button-delete-keyword-${keyword.id}`}
          >
            <Trash className="w-3 h-3 text-destructive" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function SeoKeywordsTab({
  keywords,
  documents,
  onStatusChange,
  onDelete,
  onScanDocument,
  onAddKeyword,
  isScanning,
}: {
  keywords: SeoKeyword[];
  documents: Document[];
  onStatusChange: (id: string, status: SeoKeyword["status"]) => void;
  onDelete: (id: string) => void;
  onScanDocument: (docId: string) => void;
  onAddKeyword: (keyword: string) => void;
  isScanning: boolean;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [intentFilter, setIntentFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("opportunity");
  const [newKeyword, setNewKeyword] = useState("");
  const [selectedDocId, setSelectedDocId] = useState<string>("");

  const filteredKeywords = keywords
    .filter(kw => {
      const matchesSearch = !searchTerm || kw.keyword.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || kw.status === statusFilter;
      const matchesIntent = intentFilter === "all" || kw.searchIntent === intentFilter;
      return matchesSearch && matchesStatus && matchesIntent;
    })
    .sort((a, b) => {
      if (sortBy === "opportunity") {
        return calculateOpportunityScore(b) - calculateOpportunityScore(a);
      } else if (sortBy === "difficulty") {
        return (a.difficultyScore ?? 100) - (b.difficultyScore ?? 100);
      } else if (sortBy === "volume") {
        return (b.volumeEstimate ?? 0) - (a.volumeEstimate ?? 0);
      } else if (sortBy === "relevance") {
        return (b.relevanceScore ?? 0) - (a.relevanceScore ?? 0);
      }
      return 0;
    });

  const statusCounts = {
    all: keywords.length,
    idea: keywords.filter(k => k.status === 'idea').length,
    planned: keywords.filter(k => k.status === 'planned').length,
    in_progress: keywords.filter(k => k.status === 'in_progress').length,
    published: keywords.filter(k => k.status === 'published').length,
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      onAddKeyword(newKeyword.trim());
      setNewKeyword("");
    }
  };

  const indexedDocs = documents.filter(d => d.status === 'indexed');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h2 className="text-xl font-bold">SEO Keywords & Opportunities</h2>
          <p className="text-sm text-muted-foreground">
            Discover high-opportunity keywords from your knowledge base
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            <Target className="w-3 h-3 mr-1" />
            {keywords.length} keywords
          </Badge>
        </div>
      </div>

      <div className="bg-muted/30 border rounded-xl p-4">
        <h3 className="font-medium mb-3 flex items-center gap-2">
          <Scan className="w-4 h-4" /> Discover Keywords
        </h3>
        <div className="flex flex-wrap gap-3">
          <div className="flex gap-2 flex-1 min-w-[250px]">
            <Input
              placeholder="Add keyword manually..."
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
              className="flex-1"
              data-testid="input-add-keyword"
            />
            <Button onClick={handleAddKeyword} disabled={!newKeyword.trim()} data-testid="button-add-keyword">
              <Plus className="w-4 h-4 mr-1" /> Add
            </Button>
          </div>
          <div className="flex gap-2 items-center">
            <Select value={selectedDocId} onValueChange={setSelectedDocId}>
              <SelectTrigger className="w-[200px]" data-testid="select-scan-document">
                <SelectValue placeholder="Select document..." />
              </SelectTrigger>
              <SelectContent>
                {indexedDocs.length === 0 ? (
                  <SelectItem value="__none__" disabled>No indexed documents</SelectItem>
                ) : (
                  indexedDocs.map(doc => (
                    <SelectItem key={doc.id} value={doc.id}>{doc.title}</SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <Button
              variant="secondary"
              onClick={() => selectedDocId && onScanDocument(selectedDocId)}
              disabled={!selectedDocId || isScanning}
              data-testid="button-scan-document"
            >
              {isScanning ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <Search className="w-4 h-4 mr-1" />
              )}
              Scan for Keywords
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <Input
          placeholder="Search keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
          data-testid="input-search-keywords"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]" data-testid="select-filter-status">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All ({statusCounts.all})</SelectItem>
            <SelectItem value="idea">Ideas ({statusCounts.idea})</SelectItem>
            <SelectItem value="planned">Planned ({statusCounts.planned})</SelectItem>
            <SelectItem value="in_progress">In Progress ({statusCounts.in_progress})</SelectItem>
            <SelectItem value="published">Published ({statusCounts.published})</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select value={intentFilter} onValueChange={setIntentFilter}>
          <SelectTrigger className="w-[140px]" data-testid="select-filter-intent">
            <SelectValue placeholder="Intent" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Intents</SelectItem>
            <SelectItem value="informational">Informational</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
            <SelectItem value="transactional">Transactional</SelectItem>
            <SelectItem value="navigational">Navigational</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[150px]" data-testid="select-sort-by">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="opportunity">Opportunity Score</SelectItem>
            <SelectItem value="difficulty">Difficulty (Low first)</SelectItem>
            <SelectItem value="volume">Volume (High first)</SelectItem>
            <SelectItem value="relevance">Relevance (High first)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredKeywords.length === 0 ? (
        <div className="text-center py-12">
          <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium mb-2">No keywords found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {keywords.length === 0
              ? "Add keywords manually or scan your documents to discover opportunities"
              : "Try adjusting your filters"
            }
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredKeywords.map((kw) => (
            <SeoKeywordCard
              key={kw.id}
              keyword={kw}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function MagicPageCard({
  suggestion,
  onGenerateOutline,
  onGenerateDraft,
  onPublish,
  onReject,
  onViewDetails,
  isProcessing,
}: {
  suggestion: MagicPageSuggestion;
  onGenerateOutline: (id: string) => void;
  onGenerateDraft: (id: string) => void;
  onPublish: (id: string) => void;
  onReject: (id: string) => void;
  onViewDetails: (suggestion: MagicPageSuggestion) => void;
  isProcessing: string | null;
}) {
  const statusConfig = MAGIC_PAGE_STATUS_CONFIG[suggestion.status];
  const StatusIcon = statusConfig.icon;
  const isThisProcessing = isProcessing === suggestion.id;

  return (
    <div className="bg-card border rounded-xl p-5 shadow-sm hover:border-primary/30 transition-colors" data-testid={`magic-page-card-${suggestion.id}`}>
      <div className="flex justify-between items-start gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base truncate" data-testid={`magic-page-title-${suggestion.id}`}>
            {suggestion.workingTitle}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            /{suggestion.suggestedSlug}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {suggestion.score !== null && suggestion.score > 0 && (
            <div className="text-right">
              <div className="text-lg font-bold text-primary">{suggestion.score}</div>
              <div className="text-[10px] text-muted-foreground uppercase">Score</div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Badge variant="outline" className="text-xs">
          <Target className="w-3 h-3 mr-1" />
          {suggestion.targetKeyword}
        </Badge>
        <Badge className={`${statusConfig.color} text-xs flex items-center gap-1`}>
          <StatusIcon className={`w-3 h-3 ${suggestion.status === 'generating' ? 'animate-spin' : ''}`} />
          {statusConfig.label}
        </Badge>
      </div>

      {suggestion.outline && suggestion.outline.sections.length > 0 && (
        <div className="mb-3 p-2 bg-muted/50 rounded-lg">
          <p className="text-xs font-medium mb-1">Outline ({suggestion.outline.sections.length} sections)</p>
          <ul className="text-xs text-muted-foreground space-y-0.5">
            {suggestion.outline.sections.slice(0, 3).map((section, idx) => (
              <li key={idx} className="truncate" style={{ paddingLeft: `${(section.level - 1) * 8}px` }}>
                {section.heading}
              </li>
            ))}
            {suggestion.outline.sections.length > 3 && (
              <li className="text-muted-foreground/60">+{suggestion.outline.sections.length - 3} more...</li>
            )}
          </ul>
        </div>
      )}

      {suggestion.targetPersona && (
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          Target: {suggestion.targetPersona}
        </p>
      )}

      <div className="flex items-center justify-between pt-3 border-t gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(suggestion)}
          data-testid={`button-view-details-${suggestion.id}`}
        >
          <Eye className="w-3 h-3 mr-1" /> Details
        </Button>
        <div className="flex items-center gap-1 flex-wrap">
          {suggestion.status === 'suggested' && (
            <Button
              size="sm"
              onClick={() => onGenerateOutline(suggestion.id)}
              disabled={isThisProcessing}
              data-testid={`button-generate-outline-${suggestion.id}`}
            >
              {isThisProcessing ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <ListTree className="w-3 h-3 mr-1" />}
              Outline
            </Button>
          )}
          {suggestion.status === 'outline_ready' && (
            <Button
              size="sm"
              onClick={() => onGenerateDraft(suggestion.id)}
              disabled={isThisProcessing}
              data-testid={`button-generate-draft-${suggestion.id}`}
            >
              {isThisProcessing ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <FileCheck className="w-3 h-3 mr-1" />}
              Draft
            </Button>
          )}
          {(suggestion.status === 'draft_ready' || suggestion.status === 'editing') && (
            <Button
              size="sm"
              variant="default"
              onClick={() => onPublish(suggestion.id)}
              disabled={isThisProcessing}
              data-testid={`button-publish-${suggestion.id}`}
            >
              {isThisProcessing ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Send className="w-3 h-3 mr-1" />}
              Publish
            </Button>
          )}
          {suggestion.status !== 'published' && suggestion.status !== 'rejected' && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => {
                if (confirm('Reject this suggestion?')) onReject(suggestion.id);
              }}
              disabled={isThisProcessing}
              data-testid={`button-reject-${suggestion.id}`}
            >
              <XCircle className="w-3 h-3 text-destructive" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function MagicPageDetailsModal({
  suggestion,
  isOpen,
  onClose,
}: {
  suggestion: MagicPageSuggestion | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!suggestion) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5" />
            {suggestion.workingTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Target Keyword</Label>
              <p className="font-medium">{suggestion.targetKeyword}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Suggested Slug</Label>
              <p className="font-mono text-sm">/{suggestion.suggestedSlug}</p>
            </div>
          </div>

          {suggestion.targetPersona && (
            <div>
              <Label className="text-xs text-muted-foreground">Target Persona</Label>
              <p className="text-sm">{suggestion.targetPersona}</p>
            </div>
          )}

          {suggestion.outline && suggestion.outline.sections.length > 0 && (
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Outline</Label>
              <div className="bg-muted/50 rounded-lg p-4 space-y-1">
                {suggestion.outline.sections.map((section, idx) => (
                  <div
                    key={idx}
                    style={{ paddingLeft: `${(section.level - 1) * 16}px` }}
                    className="text-sm"
                  >
                    <span className="font-medium">{section.heading}</span>
                    {section.description && (
                      <span className="text-muted-foreground ml-2 text-xs">— {section.description}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {suggestion.draftContent && (
            <div className="space-y-4">
              <Label className="text-xs text-muted-foreground">Draft Content Preview</Label>

              {suggestion.draftContent.hero && (
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4">
                  <h2 className="text-xl font-bold">{suggestion.draftContent.hero.title}</h2>
                  {suggestion.draftContent.hero.subtitle && (
                    <p className="text-muted-foreground mt-1">{suggestion.draftContent.hero.subtitle}</p>
                  )}
                </div>
              )}

              {suggestion.draftContent.tldr && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <p className="text-sm font-medium mb-1">TL;DR</p>
                  <p className="text-sm">{suggestion.draftContent.tldr}</p>
                </div>
              )}

              {suggestion.draftContent.sections && suggestion.draftContent.sections.length > 0 && (
                <div className="space-y-3">
                  {suggestion.draftContent.sections.map((section, idx) => (
                    <div key={idx} className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">{section.heading}</h3>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">{section.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {suggestion.draftContent.faq && suggestion.draftContent.faq.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">FAQ</p>
                  <div className="space-y-2">
                    {suggestion.draftContent.faq.map((item, idx) => (
                      <div key={idx} className="bg-muted/50 rounded-lg p-3">
                        <p className="font-medium text-sm">{item.question}</p>
                        <p className="text-sm text-muted-foreground mt-1">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
            <div>Created: {new Date(suggestion.createdAt).toLocaleString()}</div>
            <div>Updated: {new Date(suggestion.updatedAt).toLocaleString()}</div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={onClose} data-testid="button-close-magic-details">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function MagicPagesTab({
  suggestions,
  seoKeywords,
  onGenerateSuggestions,
  onGenerateOutline,
  onGenerateDraft,
  onPublish,
  onReject,
  isGenerating,
  processingId,
}: {
  suggestions: MagicPageSuggestion[];
  seoKeywords: SeoKeyword[];
  onGenerateSuggestions: () => void;
  onGenerateOutline: (id: string) => void;
  onGenerateDraft: (id: string) => void;
  onPublish: (id: string) => void;
  onReject: (id: string) => void;
  isGenerating: boolean;
  processingId: string | null;
}) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewingDetails, setViewingDetails] = useState<MagicPageSuggestion | null>(null);

  const filteredSuggestions = suggestions.filter(s =>
    statusFilter === "all" || s.status === statusFilter
  );

  const statusCounts = {
    all: suggestions.length,
    suggested: suggestions.filter(s => s.status === 'suggested').length,
    outline_ready: suggestions.filter(s => s.status === 'outline_ready').length,
    draft_ready: suggestions.filter(s => s.status === 'draft_ready').length,
    published: suggestions.filter(s => s.status === 'published').length,
    rejected: suggestions.filter(s => s.status === 'rejected').length,
  };

  const plannedKeywords = seoKeywords.filter(k => k.status === 'planned' || k.status === 'idea');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h2 className="text-xl font-bold">Magic Page Creator</h2>
          <p className="text-sm text-muted-foreground">
            AI-powered page generation from your SEO keywords
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            <Wand2 className="w-3 h-3 mr-1" />
            {suggestions.length} suggestions
          </Badge>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" /> Generate New Suggestions
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {plannedKeywords.length > 0
                ? `Found ${plannedKeywords.length} keywords ready for page creation`
                : "Add keywords in the SEO tab to generate page suggestions"
              }
            </p>
          </div>
          <Button
            onClick={onGenerateSuggestions}
            disabled={isGenerating || plannedKeywords.length === 0}
            size="lg"
            data-testid="button-generate-suggestions"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" /> Generate Suggestions
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]" data-testid="select-magic-status-filter">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All ({statusCounts.all})</SelectItem>
            <SelectItem value="suggested">Suggested ({statusCounts.suggested})</SelectItem>
            <SelectItem value="outline_ready">Outline Ready ({statusCounts.outline_ready})</SelectItem>
            <SelectItem value="draft_ready">Draft Ready ({statusCounts.draft_ready})</SelectItem>
            <SelectItem value="published">Published ({statusCounts.published})</SelectItem>
            <SelectItem value="rejected">Rejected ({statusCounts.rejected})</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredSuggestions.length === 0 ? (
        <div className="text-center py-12">
          <Wand2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium mb-2">No magic pages found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {suggestions.length === 0
              ? "Generate suggestions from your SEO keywords to get started"
              : "Try adjusting your filters"
            }
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredSuggestions.map((suggestion) => (
            <MagicPageCard
              key={suggestion.id}
              suggestion={suggestion}
              onGenerateOutline={onGenerateOutline}
              onGenerateDraft={onGenerateDraft}
              onPublish={onPublish}
              onReject={onReject}
              onViewDetails={setViewingDetails}
              isProcessing={processingId}
            />
          ))}
        </div>
      )}

      <MagicPageDetailsModal
        suggestion={viewingDetails}
        isOpen={!!viewingDetails}
        onClose={() => setViewingDetails(null)}
      />
    </div>
  );
}

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        setAuthToken(data.token);
        onLogin();
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="bg-card p-8 rounded-xl border shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-display font-bold mb-2 text-center" data-testid="text-login-title">
          Andara Ionic CMS
        </h1>
        <p className="text-muted-foreground text-center mb-6">Sign in to manage content</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Username</Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              data-testid="input-username"
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              data-testid="input-password"
            />
          </div>
          {error && <p className="text-destructive text-sm" data-testid="text-login-error">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading} data-testid="button-login">
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  gradient = "from-blue-500 to-blue-600",
  trend,
  trendLabel,
  subtitle
}: {
  label: string;
  value: number | string;
  icon: any;
  gradient?: string;
  trend?: number;
  trendLabel?: string;
  subtitle?: string;
}) {
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;

  return (
    <div className="relative overflow-hidden bg-card border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity" style={{ background: `linear-gradient(135deg, var(--admin-accent), var(--admin-accent-hover))` }} />

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
          <p className="text-3xl font-bold tracking-tight" data-testid={`stat-${label.toLowerCase().replace(/\s/g, '-')}`}>
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
          {trend !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              <span className={`text-xs font-medium flex items-center gap-0.5 ${isPositive ? 'text-green-500' : isNegative ? 'text-red-500' : 'text-muted-foreground'}`}>
                {isPositive && <TrendingUp className="w-3 h-3" />}
                {isNegative && <TrendingUp className="w-3 h-3 rotate-180" />}
                {isPositive ? '+' : ''}{trend}%
              </span>
              {trendLabel && <span className="text-xs text-muted-foreground">{trendLabel}</span>}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}

function PageTreeNode({ page, level = 0, onEdit }: { page: Page; level?: number; onEdit: (page: Page) => void }) {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const hasChildren = page.children && page.children.length > 0;

  return (
    <div>
      {/* Desktop tree view */}
      <div
        className="hidden md:flex items-center gap-2 py-2 px-3 hover:bg-muted/50 rounded-lg cursor-pointer group"
        style={{ paddingLeft: `${level * 20 + 12}px` }}
        data-testid={`page-tree-item-${page.key}`}
      >
        {hasChildren ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-0.5 hover:bg-muted rounded"
            data-testid={`button-expand-${page.key}`}
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        ) : (
          <span className="w-5" />
        )}

        <FileText className="w-4 h-4 text-muted-foreground" />

        <span className="flex-1 text-sm font-medium truncate" onClick={() => onEdit(page)}>
          {page.title}
        </span>

        <Badge
          variant={page.status === "published" ? "default" : "secondary"}
          className="text-xs"
        >
          {page.status}
        </Badge>

        <span className="text-xs text-muted-foreground hidden group-hover:inline">
          {page.template}
        </span>

        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 h-7 w-7"
          onClick={() => onEdit(page)}
          data-testid={`button-edit-page-${page.key}`}
        >
          <Edit className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Mobile card view */}
      <div
        className="md:hidden"
        style={{ marginLeft: `${Math.min(level * 16, 48)}px` }}
        data-testid={`page-card-${page.key}`}
      >
        <button
          onClick={() => onEdit(page)}
          className="w-full p-4 bg-card border rounded-xl text-left active:bg-muted/30 min-h-[56px] flex items-center gap-3"
        >
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="w-10 h-10 flex items-center justify-center hover:bg-muted rounded-lg shrink-0 -ml-1"
              aria-label={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          ) : (
            <div className="w-10 h-10 flex items-center justify-center shrink-0 -ml-1">
              <FileText className="w-5 h-5 text-muted-foreground" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium text-[15px] leading-tight truncate">{page.title}</span>
              <div
                className={cn(
                  "w-2 h-2 rounded-full shrink-0",
                  page.status === "published" ? "bg-green-500" : "bg-amber-500"
                )}
              />
            </div>
            <p className="text-[13px] text-muted-foreground truncate mt-0.5">{page.path}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
        </button>
      </div>

      {isExpanded && hasChildren && (
        <div className="mt-2 space-y-2">
          {page.children!.map(child => (
            <PageTreeNode key={child.id} page={child} level={level + 1} onEdit={onEdit} />
          ))}
        </div>
      )}
    </div>
  );
}

function DashboardTab({ stats, onCreatePage }: { stats: ContentStats | null; onCreatePage: () => void }) {
  if (!stats) {
    return <div className="text-center py-12 text-muted-foreground">Loading stats...</div>;
  }

  const publishRate = stats.totalPages > 0
    ? Math.round((stats.publishedPages / stats.totalPages) * 100)
    : 0;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-2">Welcome to Andara Ionic CMS</h1>
          <p className="text-white/80 max-w-xl">Manage your content, products, and science library from this central dashboard.</p>
        </div>
        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -top-8 -right-16 w-32 h-32 bg-white/10 rounded-full blur-xl" />
      </div>

      {/* Stats Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-foreground">Content Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <StatCard
            label="Total Pages"
            value={stats.totalPages}
            icon={FileText}
            gradient="from-blue-500 to-blue-600"
            subtitle="All content pages"
          />
          <StatCard
            label="Published"
            value={stats.publishedPages}
            icon={Eye}
            gradient="from-green-500 to-emerald-600"
            trend={publishRate}
            trendLabel="publish rate"
          />
          <StatCard
            label="Drafts"
            value={stats.draftPages}
            icon={EyeOff}
            gradient="from-amber-500 to-orange-600"
            subtitle="Awaiting review"
          />
          <StatCard
            label="Products"
            value={stats.totalProducts}
            icon={Package}
            gradient="from-purple-500 to-violet-600"
            subtitle="Active listings"
          />
          <StatCard
            label="Science Articles"
            value={stats.totalArticles}
            icon={Beaker}
            gradient="from-cyan-500 to-teal-600"
            subtitle="Knowledge base"
          />
          <StatCard
            label="Clusters"
            value={stats.totalClusters}
            icon={FolderTree}
            gradient="from-rose-500 to-pink-600"
            subtitle="Content groups"
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Distribution Chart */}
        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4 text-foreground">Content Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'Pages', value: stats.totalPages, fill: '#3b82f6' },
                  { name: 'Products', value: stats.totalProducts, fill: '#8b5cf6' },
                  { name: 'Articles', value: stats.totalArticles, fill: '#06b6d4' },
                  { name: 'Clusters', value: stats.totalClusters, fill: '#f43f5e' },
                ]}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Page Status Breakdown */}
        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4 text-foreground">Page Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Published', value: stats.publishedPages, fill: '#22c55e' },
                    { name: 'Drafts', value: stats.draftPages, fill: '#f59e0b' },
                    { name: 'Archived', value: Math.max(0, stats.totalPages - stats.publishedPages - stats.draftPages), fill: '#6b7280' },
                  ].filter(d => d.value > 0)}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                >
                  {[
                    { name: 'Published', value: stats.publishedPages, fill: '#22c55e' },
                    { name: 'Drafts', value: stats.draftPages, fill: '#f59e0b' },
                    { name: 'Archived', value: Math.max(0, stats.totalPages - stats.publishedPages - stats.draftPages), fill: '#6b7280' },
                  ].filter(d => d.value > 0).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold mb-4 text-foreground">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onCreatePage}
            className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/30 hover:border-blue-500/50 hover:bg-blue-500/20"
            data-testid="button-add-page"
          >
            <Plus className="w-4 h-4 mr-2" /> New Page
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/20"
            data-testid="button-add-product"
          >
            <Plus className="w-4 h-4 mr-2" /> New Product
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 border-cyan-500/30 hover:border-cyan-500/50 hover:bg-cyan-500/20"
            data-testid="button-add-article"
          >
            <Plus className="w-4 h-4 mr-2" /> New Article
          </Button>
        </div>
      </div>
    </div>
  );
}

function PagesTab({ pages, onEdit, onCreate }: { pages: Page[]; onEdit: (page: Page) => void; onCreate: () => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filterPages = (pageList: Page[]): Page[] => {
    return pageList
      .map(page => {
        const filteredChildren = page.children ? filterPages(page.children) : [];

        const matchesSearch = !searchTerm ||
          page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          page.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
          page.key.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" || page.status === statusFilter;

        const hasMatchingChildren = filteredChildren.length > 0;

        if ((matchesSearch && matchesStatus) || hasMatchingChildren) {
          return {
            ...page,
            children: filteredChildren
          } as Page;
        }
        return null;
      })
      .filter((page): page is Page => page !== null);
  };

  const filteredPages = filterPages(pages);

  const countPages = (pageList: Page[]): number => {
    return pageList.reduce((acc, page) => {
      return acc + 1 + (page.children ? countPages(page.children) : 0);
    }, 0);
  };

  const totalCount = countPages(pages);
  const filteredCount = countPages(filteredPages);

  return (
    <div className="space-y-4">
      {/* Mobile: Search bar */}
      <div className="md:hidden">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-11"
              data-testid="input-search-pages-mobile"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-24 h-11" data-testid="select-status-filter-mobile">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Desktop header */}
      <div className="hidden md:flex justify-between items-center gap-4">
        <div className="flex-1 flex gap-3">
          <Input
            placeholder="Search pages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
            data-testid="input-search-pages"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40" data-testid="select-status-filter">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button size="sm" onClick={onCreate} data-testid="button-add-new-page">
          <Plus className="w-4 h-4 mr-2" /> New Page
        </Button>
      </div>

      {/* Mobile: Page count */}
      <div className="md:hidden flex items-center justify-between text-sm text-muted-foreground">
        <span>{filteredCount} pages</span>
      </div>

      {/* Mobile: Page list */}
      <div className="md:hidden space-y-2 pb-20">
        {filteredPages.map(page => (
          <PageTreeNode key={page.id} page={page} onEdit={onEdit} />
        ))}
        {filteredPages.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <FileText className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p>No pages found</p>
          </div>
        )}
      </div>

      {/* Desktop: Page tree */}
      <div className="hidden md:block bg-card border rounded-xl overflow-hidden">
        <div className="p-4 border-b bg-muted/30">
          <h3 className="font-medium">
            Page Tree ({filteredCount === totalCount ? totalCount : `${filteredCount} of ${totalCount}`} pages)
          </h3>
        </div>
        <div className="max-h-[600px] overflow-y-auto p-2">
          {filteredPages.map(page => (
            <PageTreeNode key={page.id} page={page} onEdit={onEdit} />
          ))}
          {filteredPages.length === 0 && (
            <p className="text-center py-8 text-muted-foreground">No pages found</p>
          )}
        </div>
      </div>

      {/* Mobile FAB */}
      <Button
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-xl z-40 bg-primary"
        onClick={onCreate}
        data-testid="button-add-new-page-fab"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
}

function ProductsTab({ products, onEdit, onCreate }: { products: Product[]; onEdit: (product: Product) => void; onCreate: () => void }) {
  return (
    <div className="space-y-4">
      {/* Mobile: Count */}
      <div className="md:hidden flex items-center justify-between text-sm text-muted-foreground">
        <span>{products.length} products</span>
      </div>

      {/* Desktop header */}
      <div className="hidden md:flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Products</h2>
          <p className="text-sm text-muted-foreground">{products.length} product{products.length !== 1 ? 's' : ''} in catalog</p>
        </div>
        <Button
          size="sm"
          onClick={onCreate}
          className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white shadow-lg"
          data-testid="button-add-product-main"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden space-y-2 pb-20">
        {products.map(product => (
          <button
            key={product.id}
            onClick={() => onEdit(product)}
            className="w-full p-4 bg-card border rounded-xl text-left active:bg-muted/30 min-h-[56px] flex items-center gap-3"
            data-testid={`product-card-mobile-${product.slug}`}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-[15px] truncate">{product.name}</span>
                <span className="text-[15px] font-semibold text-green-500 shrink-0">${(product.price / 100).toFixed(2)}</span>
              </div>
              <p className="text-[13px] text-muted-foreground truncate mt-0.5">{product.sizeMl}ml • {product.descriptionShort}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
          </button>
        ))}
      </div>

      {/* Desktop card grid */}
      <div className="hidden md:grid gap-5">
        {products.map(product => (
          <div
            key={product.id}
            className="group relative bg-card border border-border/50 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-purple-500/30 transition-all duration-300"
            data-testid={`product-card-${product.slug}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <span className="text-sm text-muted-foreground">{product.slug}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400">
                    {product.sizeMl}ml
                  </Badge>
                  {product.pageKey && (
                    <Badge variant="secondary" className="text-xs bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400">
                      <FileText className="w-3 h-3 mr-1" /> Linked
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-60 group-hover:opacity-100 hover:bg-purple-500/10"
                    onClick={() => onEdit(product)}
                    data-testid={`button-edit-product-${product.slug}`}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border/50">
                <div>
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">Price</Label>
                  <p className="font-bold text-xl text-green-600 dark:text-green-400">${(product.price / 100).toFixed(2)}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">Description</Label>
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.descriptionShort}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 md:py-16 bg-card border border-border/50 rounded-xl md:rounded-2xl">
          <Package className="w-10 h-10 md:w-12 md:h-12 text-muted-foreground mx-auto mb-3 md:mb-4" />
          <h3 className="font-semibold mb-2 text-sm md:text-base">No products yet</h3>
          <p className="text-xs md:text-sm text-muted-foreground mb-4">Add your first product to get started</p>
          <Button onClick={onCreate} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </Button>
        </div>
      )}

      {/* Mobile FAB */}
      <Button
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-40 bg-gradient-to-r from-purple-500 to-violet-600"
        onClick={onCreate}
        data-testid="button-add-product-fab"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
}

function ArticlesTab({ articles, clusters, onEdit, onCreate }: { articles: Article[]; clusters: Cluster[]; onEdit: (article: Article) => void; onCreate: () => void }) {
  const getClusterName = (clusterId: string) => {
    return clusters.find(c => c.id === clusterId)?.name || clusterId;
  };

  return (
    <div className="space-y-4">
      {/* Mobile: Count */}
      <div className="md:hidden flex items-center justify-between text-sm text-muted-foreground">
        <span>{articles.length} articles</span>
      </div>

      {/* Desktop header */}
      <div className="hidden md:flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Science Articles</h2>
          <p className="text-sm text-muted-foreground">{articles.length} article{articles.length !== 1 ? 's' : ''} in library</p>
        </div>
        <Button
          size="sm"
          onClick={onCreate}
          className="bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white shadow-lg"
          data-testid="button-add-article-main"
        >
          <Plus className="w-4 h-4 mr-2" /> New Article
        </Button>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden space-y-2 pb-20">
        {articles.map(article => (
          <button
            key={article.id}
            onClick={() => onEdit(article)}
            className="w-full p-4 bg-card border rounded-xl text-left active:bg-muted/30 min-h-[56px] flex items-center gap-3"
            data-testid={`article-card-mobile-${article.slug}`}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shrink-0">
              <Beaker className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-medium text-[15px] truncate block">{article.title}</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[13px] text-cyan-500 truncate">{getClusterName(article.clusterId)}</span>
                {article.tags.length > 0 && (
                  <span className="text-[11px] text-muted-foreground">• {article.tags.length} tags</span>
                )}
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
          </button>
        ))}
      </div>

      {/* Desktop card grid */}
      <div className="hidden md:grid gap-5">
        {articles.map(article => (
          <div
            key={article.id}
            className="group relative bg-card border border-border/50 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-cyan-500/30 transition-all duration-300"
            data-testid={`article-card-${article.slug}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 shadow-lg">
                    <Beaker className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{article.title}</h3>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <Badge className="bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400">{getClusterName(article.clusterId)}</Badge>
                      {article.tags.slice(0, 2).map(t => (
                        <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                      ))}
                      {article.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">+{article.tags.length - 2}</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {article.pageKey && (
                    <Badge variant="secondary" className="text-xs bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400">
                      <FileText className="w-3 h-3 mr-1" /> Linked
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-60 group-hover:opacity-100 hover:bg-cyan-500/10"
                    onClick={() => onEdit(article)}
                    data-testid={`button-edit-article-${article.slug}`}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2 pl-16">{article.summary}</p>
              <div className="flex justify-between items-center text-xs text-muted-foreground border-t border-border/50 pt-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  Priority: <span className="font-medium">{article.priority}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-12 bg-card border border-border/50 rounded-xl">
          <Beaker className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-semibold mb-2 text-sm">No articles yet</h3>
          <p className="text-[13px] text-muted-foreground mb-4">Start building your science library</p>
          <Button onClick={onCreate} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" /> New Article
          </Button>
        </div>
      )}

      {/* Mobile FAB */}
      <Button
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-xl z-40 bg-gradient-to-r from-cyan-500 to-teal-600"
        onClick={onCreate}
        data-testid="button-add-article-fab"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
}

function VisualVibeDisplay({ vibe, compact = false }: { vibe: VisualVibe | null | undefined; compact?: boolean }) {
  if (!vibe) {
    return (
      <div className="text-sm text-muted-foreground italic flex items-center gap-2">
        <Palette className="w-4 h-4" />
        <span>No visual vibe configured</span>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex flex-wrap gap-1.5 mt-2">
        {vibe.vibeKeywords?.slice(0, 3).map((keyword, i) => (
          <Badge key={i} variant="secondary" className="text-xs bg-purple-50 text-purple-700">
            {keyword}
          </Badge>
        ))}
        {vibe.vibeKeywords && vibe.vibeKeywords.length > 3 && (
          <Badge variant="outline" className="text-xs">+{vibe.vibeKeywords.length - 3} more</Badge>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {vibe.vibeKeywords && vibe.vibeKeywords.length > 0 && (
        <div>
          <div className="flex items-center gap-2 text-sm font-medium mb-2">
            <Paintbrush className="w-4 h-4 text-purple-600" />
            <span>Vibe Keywords</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {vibe.vibeKeywords.map((keyword, i) => (
              <Badge key={i} variant="secondary" className="text-xs bg-purple-50 text-purple-700">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {vibe.emotionalTone && vibe.emotionalTone.length > 0 && (
        <div>
          <div className="flex items-center gap-2 text-sm font-medium mb-2">
            <Heart className="w-4 h-4 text-rose-500" />
            <span>Emotional Tone</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {vibe.emotionalTone.map((tone, i) => (
              <Badge key={i} variant="secondary" className="text-xs bg-rose-50 text-rose-700">
                {tone}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {vibe.animationIdeas && vibe.animationIdeas.length > 0 && (
        <div>
          <div className="flex items-center gap-2 text-sm font-medium mb-2">
            <Film className="w-4 h-4 text-blue-500" />
            <span>Animation Ideas</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {vibe.animationIdeas.map((idea, i) => (
              <Badge key={i} variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                {idea}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {vibe.aiImagePromptPattern && (
        <div>
          <div className="flex items-center gap-2 text-sm font-medium mb-2">
            <Image className="w-4 h-4 text-green-600" />
            <span>AI Image Prompt Pattern</span>
          </div>
          <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg font-mono text-xs">
            {vibe.aiImagePromptPattern}
          </p>
        </div>
      )}

      {vibe.aiVideoPromptPattern && (
        <div>
          <div className="flex items-center gap-2 text-sm font-medium mb-2">
            <Film className="w-4 h-4 text-orange-600" />
            <span>AI Video Prompt Pattern</span>
          </div>
          <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg font-mono text-xs">
            {vibe.aiVideoPromptPattern}
          </p>
        </div>
      )}

      {vibe.designerNotes && (
        <div>
          <div className="flex items-center gap-2 text-sm font-medium mb-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Designer Notes</span>
          </div>
          <p className="text-sm text-muted-foreground bg-amber-50 p-3 rounded-lg border border-amber-100">
            {vibe.designerNotes}
          </p>
        </div>
      )}
    </div>
  );
}

function ClustersTab({ clusters, onUpdateCluster }: { clusters: Cluster[]; onUpdateCluster?: (id: string, data: Partial<Cluster>) => Promise<void> }) {
  const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
  const [isVibeDialogOpen, setIsVibeDialogOpen] = useState(false);
  const [vibeForm, setVibeForm] = useState({
    color: '',
    vibeKeywordsText: '',
    emotionalToneText: '',
    animationIdeasText: '',
    aiImagePromptPattern: '',
    aiVideoPromptPattern: '',
    designerNotes: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  const clustersWithVibes = clusters.filter(c => c.visualVibe);
  const clustersWithoutVibes = clusters.filter(c => !c.visualVibe);

  const handleOpenVibeDialog = (cluster: Cluster) => {
    setSelectedCluster(cluster);
    const vibe = cluster.visualVibe;
    setVibeForm({
      color: cluster.color || '',
      vibeKeywordsText: vibe?.vibeKeywords?.join(', ') || '',
      emotionalToneText: vibe?.emotionalTone?.join(', ') || '',
      animationIdeasText: vibe?.animationIdeas?.join(', ') || '',
      aiImagePromptPattern: vibe?.aiImagePromptPattern || '',
      aiVideoPromptPattern: vibe?.aiVideoPromptPattern || '',
      designerNotes: vibe?.designerNotes || '',
    });
    setIsVibeDialogOpen(true);
  };

  const handleSaveVibe = async () => {
    if (!selectedCluster || !onUpdateCluster) return;
    setIsSaving(true);
    try {
      const visualVibe: VisualVibe = {
        vibeKeywords: vibeForm.vibeKeywordsText.split(',').map(s => s.trim()).filter(Boolean),
        emotionalTone: vibeForm.emotionalToneText.split(',').map(s => s.trim()).filter(Boolean),
        animationIdeas: vibeForm.animationIdeasText.split(',').map(s => s.trim()).filter(Boolean),
        aiImagePromptPattern: vibeForm.aiImagePromptPattern || undefined,
        aiVideoPromptPattern: vibeForm.aiVideoPromptPattern || undefined,
        designerNotes: vibeForm.designerNotes || undefined,
      };
      await onUpdateCluster(selectedCluster.id, {
        visualVibe,
        color: vibeForm.color || null
      });
      setIsVibeDialogOpen(false);
    } catch (error) {
      console.error('Failed to save visual vibe:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Content Clusters ({clusters.length})</h2>
          <p className="text-sm text-muted-foreground">
            {clustersWithVibes.length} with visual vibes, {clustersWithoutVibes.length} without
          </p>
        </div>
        <Button size="sm" data-testid="button-add-cluster">
          <Plus className="w-4 h-4 mr-2" /> New Cluster
        </Button>
      </div>

      {clustersWithVibes.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Clusters with Visual Vibes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clustersWithVibes.map(cluster => (
              <div key={cluster.id} className="bg-card border p-6 rounded-xl shadow-sm hover:border-purple-200 transition-colors" data-testid={`cluster-card-${cluster.slug}`}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg">
                      <Palette className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold">{cluster.name}</h3>
                      <span className="text-xs text-muted-foreground">{cluster.slug}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleOpenVibeDialog(cluster)}
                    data-testid={`button-edit-cluster-${cluster.slug}`}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{cluster.description}</p>
                <VisualVibeDisplay vibe={cluster.visualVibe} compact />
              </div>
            ))}
          </div>
        </div>
      )}

      {clustersWithoutVibes.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <FolderTree className="w-4 h-4" />
            Clusters without Visual Vibes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clustersWithoutVibes.map(cluster => (
              <div key={cluster.id} className="bg-card border p-6 rounded-xl shadow-sm border-dashed" data-testid={`cluster-card-${cluster.slug}`}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-muted rounded-lg">
                      <FolderTree className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold">{cluster.name}</h3>
                      <span className="text-xs text-muted-foreground">{cluster.slug}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenVibeDialog(cluster)}
                    data-testid={`button-add-vibe-${cluster.slug}`}
                  >
                    <Paintbrush className="w-4 h-4 mr-1" />
                    Add Vibe
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{cluster.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Motion Library Panel */}
      <div className="space-y-4 border-t pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold">Motion Library</h3>
          </div>
          <Badge variant="outline">{MOTION_ARCHETYPES.length} Archetypes</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Browse and preview the 10 Andara motion archetypes. These animations are applied to page elements through the BigMind AI or Visual Config system.
        </p>
        <MotionLibraryPreview compact />

        {/* Pages with Motion Configs */}
        <div className="mt-6 space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Pages with Motion Configurations
          </h4>
          <div className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg border border-dashed">
            <p className="mb-2">Motion presets are assigned to pages via:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li><strong>BigMind AI:</strong> Use <code className="bg-muted px-1 rounded">applyMotionPreset(pageId, archetypeKey)</code> in chat</li>
              <li><strong>Visual Config:</strong> Set <code className="bg-muted px-1 rounded">motionPreset</code> field in page's visualConfig</li>
              <li><strong>Cluster Vibes:</strong> Animation ideas defined in cluster vibes cascade to pages</li>
            </ul>
          </div>
        </div>
      </div>

      <Dialog open={isVibeDialogOpen} onOpenChange={setIsVibeDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-purple-600" />
              Visual Vibe: {selectedCluster?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-indigo-600" />
                Cluster Color
              </Label>
              <div className="flex gap-3 items-center">
                <Input
                  type="color"
                  value={vibeForm.color || '#6366f1'}
                  onChange={(e) => setVibeForm(f => ({ ...f, color: e.target.value }))}
                  className="w-16 h-10 p-1 cursor-pointer"
                  data-testid="input-cluster-color"
                />
                <Input
                  value={vibeForm.color || ''}
                  onChange={(e) => setVibeForm(f => ({ ...f, color: e.target.value }))}
                  placeholder="#6366f1"
                  className="flex-1"
                  data-testid="input-cluster-color-hex"
                />
                {vibeForm.color && (
                  <div
                    className="w-10 h-10 rounded-lg border shadow-sm"
                    style={{ backgroundColor: vibeForm.color }}
                    data-testid="preview-cluster-color"
                  />
                )}
              </div>
              <p className="text-xs text-muted-foreground">Theme color for this cluster (hex value)</p>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Paintbrush className="w-4 h-4 text-purple-600" />
                Vibe Keywords (comma-separated)
              </Label>
              <Input
                value={vibeForm.vibeKeywordsText}
                onChange={(e) => setVibeForm(f => ({ ...f, vibeKeywordsText: e.target.value }))}
                placeholder="e.g., crystalline, luminous, flowing, ethereal"
                data-testid="input-vibe-keywords"
              />
              <p className="text-xs text-muted-foreground">Visual style keywords for image and video generation</p>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                Emotional Tone (comma-separated)
              </Label>
              <Input
                value={vibeForm.emotionalToneText}
                onChange={(e) => setVibeForm(f => ({ ...f, emotionalToneText: e.target.value }))}
                placeholder="e.g., calming, trustworthy, premium, scientific"
                data-testid="input-emotional-tone"
              />
              <p className="text-xs text-muted-foreground">Emotional qualities to evoke in the visuals</p>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Film className="w-4 h-4 text-blue-500" />
                Animation Ideas (comma-separated)
              </Label>
              <Input
                value={vibeForm.animationIdeasText}
                onChange={(e) => setVibeForm(f => ({ ...f, animationIdeasText: e.target.value }))}
                placeholder="e.g., gentle particle flow, light rays, water ripples"
                data-testid="input-animation-ideas"
              />
              <p className="text-xs text-muted-foreground">Motion concepts for video and animated elements</p>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Image className="w-4 h-4 text-green-600" />
                AI Image Prompt Pattern
              </Label>
              <Textarea
                value={vibeForm.aiImagePromptPattern}
                onChange={(e) => setVibeForm(f => ({ ...f, aiImagePromptPattern: e.target.value }))}
                placeholder="Base prompt pattern for image generation..."
                rows={3}
                data-testid="input-image-prompt"
              />
              <p className="text-xs text-muted-foreground">Template prompt for generating images in this cluster's style</p>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Film className="w-4 h-4 text-orange-600" />
                AI Video Prompt Pattern
              </Label>
              <Textarea
                value={vibeForm.aiVideoPromptPattern}
                onChange={(e) => setVibeForm(f => ({ ...f, aiVideoPromptPattern: e.target.value }))}
                placeholder="Base prompt pattern for video generation..."
                rows={3}
                data-testid="input-video-prompt"
              />
              <p className="text-xs text-muted-foreground">Template prompt for generating videos in this cluster's style</p>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Designer Notes
              </Label>
              <Textarea
                value={vibeForm.designerNotes}
                onChange={(e) => setVibeForm(f => ({ ...f, designerNotes: e.target.value }))}
                placeholder="Notes for designers and content creators..."
                rows={3}
                data-testid="input-designer-notes"
              />
              <p className="text-xs text-muted-foreground">Additional guidance for visual content creation</p>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsVibeDialogOpen(false)} data-testid="button-cancel-vibe">
                Cancel
              </Button>
              <Button onClick={handleSaveVibe} disabled={isSaving || !onUpdateCluster} data-testid="button-save-vibe">
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Visual Vibe
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function LinkingTab({
  linkingRules,
  ctaTemplates,
  clusters,
  pages,
  onCreateRule,
  onUpdateRule,
  onDeleteRule,
  onToggleRuleActive,
  onCreateCta,
  onUpdateCta,
  onDeleteCta,
  onToggleCtaActive,
  onAutoGenerate,
  isAutoGenerating,
}: {
  linkingRules: LinkingRule[];
  ctaTemplates: CtaTemplate[];
  clusters: Cluster[];
  pages: Page[];
  onCreateRule: (data: Omit<LinkingRule, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onUpdateRule: (id: string, data: Partial<LinkingRule>) => Promise<void>;
  onDeleteRule: (id: string) => Promise<void>;
  onToggleRuleActive: (id: string, isActive: boolean) => Promise<void>;
  onCreateCta: (data: Omit<CtaTemplate, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onUpdateCta: (id: string, data: Partial<CtaTemplate>) => Promise<void>;
  onDeleteCta: (id: string) => Promise<void>;
  onToggleCtaActive: (id: string, isActive: boolean) => Promise<void>;
  onAutoGenerate: () => Promise<void>;
  isAutoGenerating: boolean;
}) {
  const [activeSection, setActiveSection] = useState<'rules' | 'ctas'>('rules');
  const [isRuleEditorOpen, setIsRuleEditorOpen] = useState(false);
  const [isCtaEditorOpen, setIsCtaEditorOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<LinkingRule | null>(null);
  const [editingCta, setEditingCta] = useState<CtaTemplate | null>(null);

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

  const handleSaveRule = async () => {
    const data = {
      ...ruleForm,
      anchorText: ruleForm.anchorText || null,
      metadata: {},
    };
    if (editingRule) {
      await onUpdateRule(editingRule.id, data);
    } else {
      await onCreateRule(data);
    }
    setIsRuleEditorOpen(false);
  };

  const handleSaveCta = async () => {
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
      await onCreateCta(data);
    }
    setIsCtaEditorOpen(false);
  };

  const flattenPages = (pageList: Page[], level = 0): { page: Page; level: number }[] => {
    const result: { page: Page; level: number }[] = [];
    for (const p of pageList) {
      result.push({ page: p, level });
      if ((p as any).children?.length > 0) {
        result.push(...flattenPages((p as any).children, level + 1));
      }
    }
    return result;
  };

  const flatPages = flattenPages(pages);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Internal Linking & CTAs</h2>
          <p className="text-sm text-muted-foreground">Manage automatic internal links and call-to-action blocks</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onAutoGenerate} disabled={isAutoGenerating} data-testid="button-auto-generate-rules">
            {isAutoGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
            Auto-Generate Rules
          </Button>
        </div>
      </div>

      <div className="flex gap-2 border-b pb-2">
        <Button
          variant={activeSection === 'rules' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveSection('rules')}
          data-testid="button-section-rules"
        >
          <Link className="w-4 h-4 mr-2" />
          Linking Rules ({linkingRules.length})
        </Button>
        <Button
          variant={activeSection === 'ctas' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveSection('ctas')}
          data-testid="button-section-ctas"
        >
          <Target className="w-4 h-4 mr-2" />
          CTA Templates ({ctaTemplates.length})
        </Button>
      </div>

      {activeSection === 'rules' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm" onClick={() => handleOpenRuleEditor()} data-testid="button-add-rule">
              <Plus className="w-4 h-4 mr-2" /> Add Rule
            </Button>
          </div>

          {linkingRules.length === 0 ? (
            <div className="text-center py-12 bg-card border rounded-xl">
              <Link className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No linking rules yet</h3>
              <p className="text-sm text-muted-foreground mb-4">Create rules to automatically add internal links to your content</p>
              <Button onClick={() => handleOpenRuleEditor()} variant="outline" data-testid="button-add-first-rule">
                <Plus className="w-4 h-4 mr-2" /> Add First Rule
              </Button>
            </div>
          ) : (
            <div className="grid gap-3">
              {linkingRules.map(rule => {
                const typeConfig = LINKING_RULE_TYPE_CONFIG[rule.ruleType];
                return (
                  <div
                    key={rule.id}
                    className={`bg-card border rounded-lg p-4 ${!rule.isActive ? 'opacity-60' : ''}`}
                    data-testid={`rule-card-${rule.id}`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{rule.name}</h4>
                          <Badge className={`text-xs ${typeConfig.color}`}>{typeConfig.label}</Badge>
                          {!rule.isActive && <Badge variant="secondary" className="text-xs">Inactive</Badge>}
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                          <div><span className="text-muted-foreground">Trigger:</span> <code className="bg-muted px-1 rounded">{rule.triggerPattern}</code></div>
                          <div><span className="text-muted-foreground">Target:</span> <code className="bg-muted px-1 rounded">{rule.targetPagePath}</code></div>
                          {rule.anchorText && <div><span className="text-muted-foreground">Anchor:</span> {rule.anchorText}</div>}
                          <div><span className="text-muted-foreground">Max:</span> {rule.maxOccurrences}x</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onToggleRuleActive(rule.id, !rule.isActive)}
                          title={rule.isActive ? 'Deactivate' : 'Activate'}
                          data-testid={`button-toggle-rule-${rule.id}`}
                        >
                          {rule.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleOpenRuleEditor(rule)} data-testid={`button-edit-rule-${rule.id}`}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (confirm('Delete this linking rule?')) onDeleteRule(rule.id);
                          }}
                          data-testid={`button-delete-rule-${rule.id}`}
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

      {activeSection === 'ctas' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm" onClick={() => handleOpenCtaEditor()} data-testid="button-add-cta">
              <Plus className="w-4 h-4 mr-2" /> Add CTA Template
            </Button>
          </div>

          {ctaTemplates.length === 0 ? (
            <div className="text-center py-12 bg-card border rounded-xl">
              <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No CTA templates yet</h3>
              <p className="text-sm text-muted-foreground mb-4">Create CTA templates to inject call-to-action blocks into content</p>
              <Button onClick={() => handleOpenCtaEditor()} variant="outline" data-testid="button-add-first-cta">
                <Plus className="w-4 h-4 mr-2" /> Add First CTA Template
              </Button>
            </div>
          ) : (
            <div className="grid gap-3">
              {ctaTemplates.map(cta => {
                const posConfig = CTA_POSITION_CONFIG[cta.position];
                return (
                  <div
                    key={cta.id}
                    className={`bg-card border rounded-lg p-4 ${!cta.isActive ? 'opacity-60' : ''}`}
                    data-testid={`cta-card-${cta.id}`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{cta.name}</h4>
                          <Badge variant="outline" className="text-xs">{posConfig?.label || cta.position}</Badge>
                          {!cta.isActive && <Badge variant="secondary" className="text-xs">Inactive</Badge>}
                        </div>
                        <p className="text-base font-medium mb-1">{cta.headline}</p>
                        {cta.description && <p className="text-sm text-muted-foreground mb-2">{cta.description}</p>}
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">{cta.buttonText}</span>
                          {cta.triggerClusters.length > 0 && (
                            <span className="text-muted-foreground">Clusters: {cta.triggerClusters.join(', ')}</span>
                          )}
                          {cta.triggerKeywords.length > 0 && (
                            <span className="text-muted-foreground">Keywords: {cta.triggerKeywords.slice(0, 3).join(', ')}{cta.triggerKeywords.length > 3 ? '...' : ''}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onToggleCtaActive(cta.id, !cta.isActive)}
                          title={cta.isActive ? 'Deactivate' : 'Activate'}
                          data-testid={`button-toggle-cta-${cta.id}`}
                        >
                          {cta.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleOpenCtaEditor(cta)} data-testid={`button-edit-cta-${cta.id}`}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (confirm('Delete this CTA template?')) onDeleteCta(cta.id);
                          }}
                          data-testid={`button-delete-cta-${cta.id}`}
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
                data-testid="input-rule-name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Rule Type</Label>
                <Select value={ruleForm.ruleType} onValueChange={(v) => setRuleForm(p => ({ ...p, ruleType: v as LinkingRule['ruleType'] }))}>
                  <SelectTrigger data-testid="select-rule-type">
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
                  data-testid="input-rule-priority"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Trigger Pattern *</Label>
              <Input
                value={ruleForm.triggerPattern}
                onChange={(e) => setRuleForm(p => ({ ...p, triggerPattern: e.target.value }))}
                placeholder="e.g., structured water"
                data-testid="input-rule-pattern"
              />
              <p className="text-xs text-muted-foreground">The keyword or phrase to match in content</p>
            </div>
            <div className="space-y-2">
              <Label>Target Page Path *</Label>
              <Select value={ruleForm.targetPagePath} onValueChange={(v) => setRuleForm(p => ({ ...p, targetPagePath: v }))}>
                <SelectTrigger data-testid="select-rule-target">
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
                  data-testid="input-rule-anchor"
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
                  data-testid="input-rule-max"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsRuleEditorOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveRule} data-testid="button-save-rule">
                <Save className="w-4 h-4 mr-2" /> {editingRule ? 'Update' : 'Create'} Rule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
                  data-testid="input-cta-name"
                />
              </div>
              <div className="space-y-2">
                <Label>Slug *</Label>
                <Input
                  value={ctaForm.slug}
                  onChange={(e) => setCtaForm(p => ({ ...p, slug: e.target.value }))}
                  placeholder="product-promo"
                  data-testid="input-cta-slug"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Headline *</Label>
              <Input
                value={ctaForm.headline}
                onChange={(e) => setCtaForm(p => ({ ...p, headline: e.target.value }))}
                placeholder="Ready to experience the difference?"
                data-testid="input-cta-headline"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={ctaForm.description}
                onChange={(e) => setCtaForm(p => ({ ...p, description: e.target.value }))}
                placeholder="Optional supporting text..."
                rows={2}
                data-testid="input-cta-description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Button Text *</Label>
                <Input
                  value={ctaForm.buttonText}
                  onChange={(e) => setCtaForm(p => ({ ...p, buttonText: e.target.value }))}
                  placeholder="Shop Now"
                  data-testid="input-cta-button"
                />
              </div>
              <div className="space-y-2">
                <Label>Position</Label>
                <Select value={ctaForm.position} onValueChange={(v) => setCtaForm(p => ({ ...p, position: v as CtaTemplate['position'] }))}>
                  <SelectTrigger data-testid="select-cta-position">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(CTA_POSITION_CONFIG).map(([key, config]) => (
                      <SelectItem key={key} value={key}>{config.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Button Link</Label>
                <Input
                  value={ctaForm.buttonLink}
                  onChange={(e) => setCtaForm(p => ({ ...p, buttonLink: e.target.value }))}
                  placeholder="/shop"
                  data-testid="input-cta-link"
                />
              </div>
              <div className="space-y-2">
                <Label>Product Slug</Label>
                <Input
                  value={ctaForm.productSlug}
                  onChange={(e) => setCtaForm(p => ({ ...p, productSlug: e.target.value }))}
                  placeholder="andara-ionic-100ml"
                  data-testid="input-cta-product"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Trigger Clusters (comma-separated)</Label>
              <Input
                value={ctaForm.triggerClustersText}
                onChange={(e) => setCtaForm(p => ({ ...p, triggerClustersText: e.target.value }))}
                placeholder="water-science, minerals"
                data-testid="input-cta-clusters"
              />
            </div>
            <div className="space-y-2">
              <Label>Trigger Keywords (comma-separated)</Label>
              <Input
                value={ctaForm.triggerKeywordsText}
                onChange={(e) => setCtaForm(p => ({ ...p, triggerKeywordsText: e.target.value }))}
                placeholder="structured water, ionic minerals"
                data-testid="input-cta-keywords"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsCtaEditorOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveCta} data-testid="button-save-cta">
                <Save className="w-4 h-4 mr-2" /> {editingCta ? 'Update' : 'Create'} CTA
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

type MagicAiSettings = {
  id: number;
  magicPageBasePrompt: string;
  updatedAt: string;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  functionCalls?: Array<{ name: string; result: any }>;
};

type SiteOverview = {
  totalPages: number;
  clusterStats: Record<string, number>;
  priorityStats: { p1: number; p2: number; p3: number };
  emptyClusterss: string[];
};

type AdminAiSetting = {
  id: string;
  key: string;
  category: string;
  label: string;
  value: string;
  description: string | null;
  isActive: boolean;
  sortOrder: number;
  metadata: any;
  createdAt: string;
  updatedAt: string;
};

type MagicPageSession = {
  id: string;
  title: string;
  sourceType: string;
  sourceContent: string;
  documentId: string | null;
  analysis: any;
  generatedHtml: string | null;
  generatedPath: string | null;
  status: string;
  appliedPageId: string | null;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
};

type BigmindChatSession = {
  id: string;
  title: string;
  mode: string;
  messageCount: number;
  lastMessageAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type BigmindChatMessage = {
  id: string;
  sessionId: string;
  role: string;
  content: string;
  functionCalls: any;
  attachments: any;
  createdAt: string;
};

type Order = {
  id: string;
  stripeSessionId: string;
  stripeCustomerId: string | null;
  customerEmail: string;
  customerName: string | null;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  shippingAddress: any;
  trackingNumber: string | null;
  items: any;
  createdAt: string;
  updatedAt: string;
};

type GscSummary = {
  totalClicks: number;
  totalImpressions: number;
  avgCtr: number;
  avgPosition: number;
  topQuery: { query: string; clicks: number } | null;
  topPage: { page: string; clicks: number } | null;
};

function OrdersTab() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: ['/api/admin/orders'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/admin/orders');
      return res.json();
    },
  });

  const { data: stats } = useQuery<{ totalOrders: number; pendingOrders: number; totalRevenue: number }>({
    queryKey: ['/api/admin/orders/stats'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/admin/orders/stats');
      return res.json();
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status, trackingNumber }: { id: string; status: string; trackingNumber?: string }) => {
      const res = await apiRequest('PUT', `/api/admin/orders/${id}/status`, { status, trackingNumber });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/orders'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/orders/stats'] });
      toast({ title: "Order Updated", description: "Order status has been updated" });
    },
  });

  const filteredOrders = orders?.filter(order => {
    if (statusFilter !== "all" && order.status !== statusFilter) return false;
    if (searchTerm && !order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !order.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  }) || [];

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    paid: 'bg-green-100 text-green-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-red-100 text-red-700',
    refunded: 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="space-y-6" data-testid="orders-tab">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Orders</h2>
          <p className="text-sm text-muted-foreground">Manage customer orders and shipments</p>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border rounded-xl p-4">
            <div className="text-2xl font-bold text-primary">{stats.totalOrders}</div>
            <div className="text-sm text-muted-foreground">Total Orders</div>
          </div>
          <div className="bg-card border rounded-xl p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </div>
          <div className="bg-card border rounded-xl p-4">
            <div className="text-2xl font-bold text-green-600">${(stats.totalRevenue / 100).toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Total Revenue</div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 items-center">
        <Input
          placeholder="Search by email or order ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
          data-testid="input-search-orders"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]" data-testid="select-order-status">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No orders found</p>
        </div>
      ) : (
        <div className="bg-card border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} data-testid={`order-row-${order.id}`}>
                  <TableCell className="font-mono text-xs">{order.id.substring(0, 8)}...</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customerName || 'N/A'}</div>
                      <div className="text-xs text-muted-foreground">{order.customerEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">${(order.amount / 100).toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={cn("px-2 py-1 rounded-full text-xs font-medium", statusColors[order.status])}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(status) => updateStatusMutation.mutate({ id: order.id, status })}
                    >
                      <SelectTrigger className="w-[130px] h-8" data-testid={`select-status-${order.id}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="refunded">Refunded</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

const MOTION_PROFILES = [
  { value: 'float_slow', label: 'Float Slow', description: 'Gentle floating animation' },
  { value: 'fade_up', label: 'Fade Up', description: 'Fade in while rising' },
  { value: 'pulse_subtle', label: 'Pulse Subtle', description: 'Gentle pulsing effect' },
  { value: 'slide_in', label: 'Slide In', description: 'Smooth slide entrance' },
  { value: 'scale_up', label: 'Scale Up', description: 'Scale from small to normal' },
  { value: 'liquid_crystal', label: 'Liquid Crystal', description: 'Flowing liquid effect' },
  { value: 'energetic_pulse', label: 'Energetic Pulse', description: 'Dynamic pulsing' },
  { value: 'magnetic_drift', label: 'Magnetic Drift', description: 'Subtle magnetic pull' },
  { value: 'krystal_bloom', label: 'Krystal Bloom', description: 'Crystal growth effect' },
  { value: 'scalar_slide', label: 'Scalar Slide', description: 'Smooth scaling slide' },
  { value: 'vortex_reveal', label: 'Vortex Reveal', description: 'Spiraling reveal' },
  { value: 'parallax_depth', label: 'Parallax Depth', description: 'Multi-layer parallax' },
  { value: 'ripple_emergence', label: 'Ripple Emergence', description: 'Ripple outward effect' },
];

type DesignToken = {
  id: string;
  clusterKey: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgGradient: string;
  cardRadius: string;
  shadowStyle: string;
  motionProfile: string;
  typographyScale: { headlineSize: string; bodySize: string; spacing: string };
  customProperties: Record<string, string>;
};

function DesignTokensEditor() {
  const [selectedCluster, setSelectedCluster] = useState<string>('');
  const [editingToken, setEditingToken] = useState<DesignToken | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: clusters = [] } = useQuery<Cluster[]>({
    queryKey: ['/api/clusters'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/clusters');
      return res.json();
    },
  });

  const { data: tokens = [], isLoading } = useQuery<DesignToken[]>({
    queryKey: ['/api/admin/design-tokens'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/admin/design-tokens');
      return res.json();
    },
  });

  const { data: currentToken, refetch: refetchToken } = useQuery<DesignToken | null>({
    queryKey: ['/api/admin/design-tokens', selectedCluster],
    queryFn: async () => {
      if (!selectedCluster) return null;
      try {
        const res = await apiRequest('GET', `/api/admin/design-tokens/${selectedCluster}`);
        if (!res.ok) return null;
        return res.json();
      } catch {
        return null;
      }
    },
    enabled: !!selectedCluster,
  });

  const saveMutation = useMutation({
    mutationFn: async (token: Partial<DesignToken> & { clusterKey: string }) => {
      const res = await apiRequest('PUT', `/api/admin/design-tokens/${token.clusterKey}`, token);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/design-tokens'] });
      refetchToken();
      toast({ title: 'Saved', description: 'Design tokens updated successfully' });
    },
    onError: () => toast({ title: 'Error', description: 'Failed to save tokens', variant: 'destructive' }),
  });

  useEffect(() => {
    if (currentToken) {
      setEditingToken(currentToken);
    } else if (selectedCluster) {
      const cluster = clusters.find(c => c.key === selectedCluster);
      setEditingToken({
        id: '',
        clusterKey: selectedCluster,
        primaryColor: cluster?.color || '#6366f1',
        secondaryColor: '#8b5cf6',
        accentColor: '#22d3ee',
        bgGradient: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
        cardRadius: '1rem',
        shadowStyle: '0 4px 20px rgba(99, 102, 241, 0.15)',
        motionProfile: 'fade_up',
        typographyScale: { headlineSize: '2.5rem', bodySize: '1rem', spacing: '1.5' },
        customProperties: {},
      });
    }
  }, [currentToken, selectedCluster, clusters]);

  const handleSave = () => {
    if (!editingToken || !selectedCluster) return;
    saveMutation.mutate({ ...editingToken, clusterKey: selectedCluster });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Design Tokens by Cluster
          </h3>
          <p className="text-sm text-muted-foreground">Customize visual styling per content cluster</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-card border rounded-xl p-4">
            <Label className="text-sm font-medium mb-2 block">Select Cluster</Label>
            <Select value={selectedCluster} onValueChange={setSelectedCluster}>
              <SelectTrigger data-testid="select-cluster-tokens">
                <SelectValue placeholder="Choose a cluster..." />
              </SelectTrigger>
              <SelectContent>
                {clusters.map(c => (
                  <SelectItem key={c.key} value={c.key}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: c.color || '#6366f1' }}
                      />
                      {c.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="mt-4 space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Configured Clusters
              </h4>
              {tokens.length === 0 ? (
                <p className="text-xs text-muted-foreground">No design tokens configured yet</p>
              ) : (
                <div className="space-y-1">
                  {tokens.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedCluster(t.clusterKey)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${selectedCluster === t.clusterKey
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'hover:bg-muted'
                        }`}
                      data-testid={`token-${t.clusterKey}`}
                    >
                      <div
                        className="w-4 h-4 rounded border border-white/20"
                        style={{ background: `linear-gradient(135deg, ${t.primaryColor}, ${t.secondaryColor})` }}
                      />
                      <span className="truncate">{t.clusterKey}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {!selectedCluster ? (
            <div className="bg-card border rounded-xl p-8 text-center">
              <Palette className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">Select a cluster to customize design tokens</p>
            </div>
          ) : editingToken ? (
            <div className="bg-card border rounded-xl p-5 space-y-5">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Tokens for: {selectedCluster}</h4>
                <Button
                  onClick={handleSave}
                  disabled={saveMutation.isPending}
                  className="bg-primary hover:bg-primary/90"
                  data-testid="button-save-tokens"
                >
                  {saveMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Save className="w-4 h-4 mr-1" />}
                  Save Tokens
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs">Primary Color</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={editingToken.primaryColor}
                      onChange={(e) => setEditingToken({ ...editingToken, primaryColor: e.target.value })}
                      className="w-10 h-10 rounded cursor-pointer"
                    />
                    <Input
                      value={editingToken.primaryColor}
                      onChange={(e) => setEditingToken({ ...editingToken, primaryColor: e.target.value })}
                      className="flex-1 h-10"
                      data-testid="input-primary-color"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Secondary Color</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={editingToken.secondaryColor}
                      onChange={(e) => setEditingToken({ ...editingToken, secondaryColor: e.target.value })}
                      className="w-10 h-10 rounded cursor-pointer"
                    />
                    <Input
                      value={editingToken.secondaryColor}
                      onChange={(e) => setEditingToken({ ...editingToken, secondaryColor: e.target.value })}
                      className="flex-1 h-10"
                      data-testid="input-secondary-color"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Accent Color</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={editingToken.accentColor}
                      onChange={(e) => setEditingToken({ ...editingToken, accentColor: e.target.value })}
                      className="w-10 h-10 rounded cursor-pointer"
                    />
                    <Input
                      value={editingToken.accentColor}
                      onChange={(e) => setEditingToken({ ...editingToken, accentColor: e.target.value })}
                      className="flex-1 h-10"
                      data-testid="input-accent-color"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Background Gradient</Label>
                <Input
                  value={editingToken.bgGradient}
                  onChange={(e) => setEditingToken({ ...editingToken, bgGradient: e.target.value })}
                  placeholder="linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)"
                  data-testid="input-bg-gradient"
                />
                <div
                  className="h-12 rounded-lg border"
                  style={{ background: editingToken.bgGradient }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs">Card Border Radius</Label>
                  <Input
                    value={editingToken.cardRadius}
                    onChange={(e) => setEditingToken({ ...editingToken, cardRadius: e.target.value })}
                    placeholder="1rem"
                    data-testid="input-card-radius"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Motion Profile</Label>
                  <Select
                    value={editingToken.motionProfile}
                    onValueChange={(v) => setEditingToken({ ...editingToken, motionProfile: v })}
                  >
                    <SelectTrigger data-testid="select-motion-profile">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MOTION_PROFILES.map(m => (
                        <SelectItem key={m.value} value={m.value}>
                          {m.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Shadow Style</Label>
                <Input
                  value={editingToken.shadowStyle}
                  onChange={(e) => setEditingToken({ ...editingToken, shadowStyle: e.target.value })}
                  placeholder="0 4px 20px rgba(99, 102, 241, 0.15)"
                  data-testid="input-shadow-style"
                />
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <h5 className="font-medium text-sm mb-3">Preview</h5>
                <div
                  className="p-4 border"
                  style={{
                    background: editingToken.bgGradient,
                    borderRadius: editingToken.cardRadius,
                    boxShadow: editingToken.shadowStyle,
                  }}
                >
                  <div
                    className="text-xl font-bold mb-2"
                    style={{ color: editingToken.primaryColor }}
                  >
                    Sample Heading
                  </div>
                  <p className="text-sm" style={{ color: editingToken.accentColor }}>
                    This is preview text showing your design tokens.
                  </p>
                  <button
                    className="mt-3 px-4 py-2 rounded text-white text-sm font-medium"
                    style={{
                      background: `linear-gradient(135deg, ${editingToken.primaryColor}, ${editingToken.secondaryColor})`,
                      borderRadius: `calc(${editingToken.cardRadius} / 2)`,
                    }}
                  >
                    Sample Button
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card border rounded-xl p-8 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface DesignSystemTabProps {
  pages: any[];
}

function DesignSystemTab({ pages }: DesignSystemTabProps) {
  const [designSubTab, setDesignSubTab] = useState<'motion' | 'themes' | 'assets'>('motion');
  const [selectedMotion, setSelectedMotion] = useState<string | null>(null);
  const [selectedPageForMotion, setSelectedPageForMotion] = useState<string>("");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Auto-select first page if none selected
  useEffect(() => {
    if (!selectedPageForMotion && pages.length > 0) {
      setSelectedPageForMotion(pages[0].id?.toString() || "");
    }
  }, [pages, selectedPageForMotion]);

  const ELEMENT_SLOTS = [
    { key: 'hero', label: 'Hero Section', description: 'Main hero area at top of page' },
    { key: 'content', label: 'Content Sections', description: 'Body content blocks' },
    { key: 'cards', label: 'Cards/Boxes', description: 'Feature cards and info boxes' },
    { key: 'ctas', label: 'Buttons/CTAs', description: 'Call-to-action buttons' },
    { key: 'background', label: 'Background', description: 'Background layers and effects' },
    { key: 'images', label: 'Images', description: 'Image elements and galleries' },
  ];

  // Always get fresh page data from the query
  const selectedPage = pages.find(p => p.id?.toString() === selectedPageForMotion);
  const pageMotions = selectedPage?.visualConfig?.elementMotions || {};

  const handleAssignMotion = async (elementKey: string) => {
    if (!selectedPageForMotion || !selectedMotion) {
      toast({ title: "Select a page and motion first", variant: "destructive" });
      return;
    }

    try {
      const currentConfig = selectedPage?.visualConfig || {};
      const newElementMotions = {
        ...(currentConfig.elementMotions || {}),
        [elementKey]: selectedMotion,
      };

      await apiRequest('PUT', `/api/pages/${selectedPageForMotion}`, {
        visualConfig: {
          ...currentConfig,
          elementMotions: newElementMotions,
        },
      });

      queryClient.invalidateQueries({ queryKey: ['/api/pages'] });
      toast({ title: "Motion Assigned", description: `${selectedMotion} applied to ${elementKey}` });
    } catch (error) {
      toast({ title: "Error", description: "Failed to assign motion", variant: "destructive" });
    }
  };

  const handleRemoveMotion = async (elementKey: string) => {
    if (!selectedPageForMotion) return;

    try {
      const currentConfig = selectedPage?.visualConfig || {};
      const newElementMotions = { ...(currentConfig.elementMotions || {}) };
      delete newElementMotions[elementKey];

      await apiRequest('PUT', `/api/pages/${selectedPageForMotion}`, {
        visualConfig: {
          ...currentConfig,
          elementMotions: newElementMotions,
        },
      });

      queryClient.invalidateQueries({ queryKey: ['/api/pages'] });
      toast({ title: "Motion Removed", description: `Motion removed from ${elementKey}` });
    } catch (error) {
      toast({ title: "Error", description: "Failed to remove motion", variant: "destructive" });
    }
  };

  const handleAutoAssign = async () => {
    if (!selectedPageForMotion) {
      toast({ title: "Select a page first", variant: "destructive" });
      return;
    }

    const defaultMotions: Record<string, string> = {
      hero: 'liquid-crystal-float',
      content: 'scalar-slide',
      cards: 'krystal-bloom',
      ctas: 'energetic-pulse',
      background: 'parallax-depth',
      images: 'vortex-reveal',
    };

    try {
      const currentConfig = selectedPage?.visualConfig || {};
      const existingMotions = currentConfig.elementMotions || {};

      // Merge: only apply defaults to unassigned slots
      const mergedMotions = { ...defaultMotions };
      for (const key of Object.keys(existingMotions)) {
        if (existingMotions[key]) {
          mergedMotions[key] = existingMotions[key]; // Preserve existing
        }
      }

      await apiRequest('PUT', `/api/pages/${selectedPageForMotion}`, {
        visualConfig: {
          ...currentConfig,
          elementMotions: mergedMotions,
        },
      });

      queryClient.invalidateQueries({ queryKey: ['/api/pages'] });
      const newCount = Object.keys(mergedMotions).length - Object.keys(existingMotions).length;
      toast({ title: "Auto-Assigned", description: `${newCount > 0 ? newCount + ' new motions applied' : 'All slots already assigned'}` });
    } catch (error) {
      toast({ title: "Error", description: "Failed to auto-assign", variant: "destructive" });
    }
  };

  const handleClearAll = async () => {
    if (!selectedPageForMotion) return;

    try {
      const currentConfig = selectedPage?.visualConfig || {};
      await apiRequest('PUT', `/api/pages/${selectedPageForMotion}`, {
        visualConfig: {
          ...currentConfig,
          elementMotions: {},
        },
      });

      queryClient.invalidateQueries({ queryKey: ['/api/pages'] });
      toast({ title: "Cleared", description: "All motion assignments removed" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to clear motions", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6" data-testid="design-system-tab">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Design System</h2>
          <p className="text-sm text-muted-foreground">Motion library, themes, and visual assets</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={designSubTab === 'motion' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setDesignSubTab('motion')}
            data-testid="btn-design-motion"
          >
            <Sparkles className="w-4 h-4 mr-1" />
            Motion
          </Button>
          <Button
            variant={designSubTab === 'themes' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setDesignSubTab('themes')}
            data-testid="btn-design-themes"
          >
            <Palette className="w-4 h-4 mr-1" />
            Themes
          </Button>
          <Button
            variant={designSubTab === 'assets' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setDesignSubTab('assets')}
            data-testid="btn-design-assets"
          >
            <ImageIcon className="w-4 h-4 mr-1" />
            Assets
          </Button>
        </div>
      </div>

      {designSubTab === 'motion' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border rounded-xl p-6">
              <MotionLibraryPreview
                onSelectArchetype={setSelectedMotion}
                selectedArchetype={selectedMotion || undefined}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-card border rounded-xl p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Element Motion Linker
              </h3>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="pageSelect" className="text-sm">Select Page</Label>
                  <Select value={selectedPageForMotion} onValueChange={setSelectedPageForMotion}>
                    <SelectTrigger className="mt-1" data-testid="select-page-for-motion">
                      <SelectValue placeholder="Choose a page..." />
                    </SelectTrigger>
                    <SelectContent>
                      {pages.map(p => (
                        <SelectItem key={p.id} value={p.id?.toString() || ''}>
                          {p.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedPageForMotion && (
                  <>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleAutoAssign}
                        className="flex-1"
                        data-testid="btn-auto-assign"
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        Auto-Link
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleClearAll}
                        className="flex-1"
                        data-testid="btn-clear-all"
                      >
                        <X className="w-3 h-3 mr-1" />
                        Clear All
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {ELEMENT_SLOTS.map(slot => {
                        const assignedMotion = pageMotions[slot.key];
                        return (
                          <div
                            key={slot.key}
                            className={`p-2 rounded-lg border cursor-pointer transition-all group ${assignedMotion
                              ? 'border-primary/50 bg-primary/10'
                              : 'border-border hover:border-primary/30'
                              }`}
                            onClick={() => {
                              if (selectedMotion) {
                                handleAssignMotion(slot.key);
                              } else if (assignedMotion) {
                                handleRemoveMotion(slot.key);
                              } else {
                                toast({ title: "Select a motion first", description: "Choose a motion archetype from the library" });
                              }
                            }}
                            data-testid={`element-slot-${slot.key}`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="text-xs font-medium">{slot.label}</div>
                              {assignedMotion && (
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleRemoveMotion(slot.key); }}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                  data-testid={`remove-motion-${slot.key}`}
                                >
                                  <X className="w-3 h-3 text-muted-foreground hover:text-destructive" />
                                </button>
                              )}
                            </div>
                            {assignedMotion ? (
                              <div className="text-[10px] text-primary mt-0.5 flex items-center gap-1">
                                <CheckCircle2 className="w-2.5 h-2.5" />
                                {assignedMotion}
                              </div>
                            ) : (
                              <div className="text-[10px] text-muted-foreground mt-0.5">
                                {selectedMotion ? 'Click to assign' : 'Select motion first'}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {selectedMotion && (
                      <div className="text-xs text-center text-muted-foreground p-2 bg-muted/50 rounded">
                        Selected: <span className="font-medium text-primary">{selectedMotion}</span>
                        <br />Click an element slot to assign
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {selectedPage && (
              <div className="bg-card border rounded-xl p-4">
                <h4 className="font-medium text-sm mb-2">Page Motion Config</h4>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Preset:</span>
                    <span>{selectedPage.visualConfig?.motionPreset || 'None'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Entrance:</span>
                    <span>{selectedPage.visualConfig?.entranceMotion || 'Default'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hover:</span>
                    <span>{selectedPage.visualConfig?.hoverMotion || 'Default'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Elements linked:</span>
                    <span className="font-medium text-primary">
                      {Object.keys(pageMotions).length} / {ELEMENT_SLOTS.length}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {designSubTab === 'themes' && (
        <DesignTokensEditor />
      )}

      {designSubTab === 'assets' && (
        <div className="bg-card border rounded-xl p-8 text-center">
          <ImageIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="font-semibold text-lg mb-2">Asset Library</h3>
          <p className="text-sm text-muted-foreground">Coming soon - manage images, icons, and media assets</p>
        </div>
      )}
    </div>
  );
}

function AIAgentsTab() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState('');
  const [taskInput, setTaskInput] = useState('');
  const [taskResult, setTaskResult] = useState<any>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const { data: agentsData, isLoading } = useQuery<{ agents: Array<{ name: string; description: string; capabilities: string[] }> }>({
    queryKey: ['/api/ai/agents'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/ai/agents');
      return res.json();
    },
  });

  const agents = agentsData?.agents || [];

  const executeTask = async () => {
    if (!selectedAgent || !selectedTask) return;

    setIsExecuting(true);
    setTaskResult(null);

    try {
      const input = taskInput ? JSON.parse(taskInput) : {};
      const res = await apiRequest('POST', '/api/ai/agents/execute', {
        agentName: selectedAgent,
        task: {
          type: selectedTask,
          input
        }
      });

      const data = await res.json();
      setTaskResult(data.result || data);
    } catch (error: any) {
      setTaskResult({ success: false, error: error.message });
    } finally {
      setIsExecuting(false);
    }
  };

  const currentAgent = agents.find(a => a.name === selectedAgent);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">AI Agents</h2>
          <p className="text-muted-foreground mt-1">
            Manage and execute tasks using AI agents
          </p>
        </div>
        <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
          <span className="text-sm font-medium text-green-600">{agents.length} Active Agents</span>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-primary mb-4" />
          <p className="text-muted-foreground">Loading agents...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Agent Cards */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Available Agents</h3>
            {agents.map((agent) => (
              <div
                key={agent.name}
                className={cn(
                  "p-6 rounded-lg border-2 cursor-pointer transition-all",
                  selectedAgent === agent.name
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/50"
                )}
                onClick={() => setSelectedAgent(agent.name)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Cpu className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold capitalize">{agent.name} Agent</h4>
                    <p className="text-sm text-muted-foreground mt-1">{agent.description}</p>
                    <div className="mt-3">
                      <p className="text-xs font-medium text-muted-foreground mb-2">CAPABILITIES:</p>
                      <div className="flex flex-wrap gap-2">
                        {agent.capabilities.map((cap) => (
                          <span
                            key={cap}
                            className="px-2 py-1 text-xs rounded-md bg-muted text-foreground"
                          >
                            {cap.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Task Execution Panel */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Execute Task</h3>
            <div className="p-6 rounded-lg border bg-card space-y-4">
              {!selectedAgent ? (
                <div className="text-center py-8">
                  <Cpu className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">Select an agent to execute tasks</p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-sm font-medium block mb-2">Agent</label>
                    <div className="px-3 py-2 rounded-md bg-muted text-sm font-medium capitalize">
                      {selectedAgent} Agent
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-2">Task Type</label>
                    <select
                      value={selectedTask}
                      onChange={(e) => setSelectedTask(e.target.value)}
                      className="w-full px-3 py-2 rounded-md border bg-background"
                    >
                      <option value="">Select a task...</option>
                      {currentAgent?.capabilities.map((cap) => (
                        <option key={cap} value={cap}>
                          {cap.replace(/_/g, ' ')}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-2">
                      Input (JSON)
                      <span className="text-muted-foreground font-normal ml-2">Optional</span>
                    </label>
                    <textarea
                      value={taskInput}
                      onChange={(e) => setTaskInput(e.target.value)}
                      placeholder='{"pageId": "123"}'
                      className="w-full px-3 py-2 rounded-md border bg-background font-mono text-sm min-h-[100px]"
                    />
                  </div>

                  <Button
                    onClick={executeTask}
                    disabled={!selectedTask || isExecuting}
                    className="w-full"
                  >
                    {isExecuting ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Executing...
                      </>
                    ) : (
                      'Execute Task'
                    )}
                  </Button>

                  {taskResult && (
                    <div className="mt-4">
                      <label className="text-sm font-medium block mb-2">Result</label>
                      <div className={cn(
                        "p-4 rounded-md border",
                        taskResult.success ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"
                      )}>
                        <pre className="text-xs overflow-auto">
                          {JSON.stringify(taskResult, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AnalyticsTab() {
  const [dateRange, setDateRange] = useState<'7d' | '28d' | '90d'>('28d');

  const { data: gscStatus, isLoading: isLoadingStatus } = useQuery<{ configured: boolean; siteUrl: string | null }>({
    queryKey: ['/api/admin/seo/status'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/admin/seo/status');
      return res.json();
    },
  });

  const { data: summary, isLoading: isLoadingSummary } = useQuery<GscSummary>({
    queryKey: ['/api/admin/seo/summary', dateRange],
    queryFn: async () => {
      const res = await apiRequest('GET', `/api/admin/seo/summary?days=${dateRange === '7d' ? 7 : dateRange === '28d' ? 28 : 90}`);
      return res.json();
    },
    enabled: !!gscStatus?.configured,
  });

  const { data: topQueries } = useQuery<Array<{ query: string; clicks: number; impressions: number; ctr: number; position: number }>>({
    queryKey: ['/api/admin/seo/queries', dateRange],
    queryFn: async () => {
      const res = await apiRequest('GET', `/api/admin/seo/queries?days=${dateRange === '7d' ? 7 : dateRange === '28d' ? 28 : 90}&limit=20`);
      return res.json();
    },
    enabled: !!gscStatus?.configured,
  });

  const { data: topPages } = useQuery<Array<{ page: string; clicks: number; impressions: number; ctr: number; position: number }>>({
    queryKey: ['/api/admin/seo/pages', dateRange],
    queryFn: async () => {
      const res = await apiRequest('GET', `/api/admin/seo/pages?days=${dateRange === '7d' ? 7 : dateRange === '28d' ? 28 : 90}&limit=20`);
      return res.json();
    },
    enabled: !!gscStatus?.configured,
  });

  if (isLoadingStatus) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!gscStatus?.configured) {
    return (
      <div className="space-y-6" data-testid="analytics-tab">
        <div>
          <h2 className="text-2xl font-bold">Google Search Console Analytics</h2>
          <p className="text-sm text-muted-foreground">Monitor search performance and SEO metrics</p>
        </div>
        <div className="bg-card border rounded-xl p-8 text-center">
          <BarChart2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="font-semibold text-lg mb-2">GSC Not Configured</h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto mb-4">
            To view search analytics, please configure Google Search Console credentials in your environment variables:
          </p>
          <div className="bg-muted rounded-lg p-4 text-left max-w-sm mx-auto">
            <code className="text-xs block">GSC_CLIENT_EMAIL</code>
            <code className="text-xs block">GSC_PRIVATE_KEY</code>
            <code className="text-xs block">GSC_SITE_URL</code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="analytics-tab">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Google Search Console Analytics</h2>
          <p className="text-sm text-muted-foreground">{gscStatus.siteUrl}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={dateRange === '7d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateRange('7d')}
            data-testid="button-date-7d"
          >
            7 Days
          </Button>
          <Button
            variant={dateRange === '28d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateRange('28d')}
            data-testid="button-date-28d"
          >
            28 Days
          </Button>
          <Button
            variant={dateRange === '90d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateRange('90d')}
            data-testid="button-date-90d"
          >
            90 Days
          </Button>
        </div>
      </div>

      {isLoadingSummary ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : summary && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card border rounded-xl p-4">
              <div className="text-2xl font-bold text-primary">{summary.totalClicks.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Clicks</div>
            </div>
            <div className="bg-card border rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-600">{summary.totalImpressions.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Impressions</div>
            </div>
            <div className="bg-card border rounded-xl p-4">
              <div className="text-2xl font-bold text-green-600">{(summary.avgCtr * 100).toFixed(2)}%</div>
              <div className="text-sm text-muted-foreground">Avg CTR</div>
            </div>
            <div className="bg-card border rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-600">{summary.avgPosition.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">Avg Position</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border rounded-xl p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Search className="w-4 h-4" /> Top Search Queries
              </h3>
              {topQueries && topQueries.length > 0 ? (
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {topQueries.map((q, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-muted/50 rounded" data-testid={`query-row-${idx}`}>
                      <span className="text-sm truncate flex-1">{q.query}</span>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>{q.clicks} clicks</span>
                        <span>{(q.ctr * 100).toFixed(1)}%</span>
                        <span>#{q.position.toFixed(0)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No query data available</p>
              )}
            </div>

            <div className="bg-card border rounded-xl p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Top Pages
              </h3>
              {topPages && topPages.length > 0 ? (
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {topPages.map((p, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-muted/50 rounded" data-testid={`page-row-${idx}`}>
                      <span className="text-sm truncate flex-1">{new URL(p.page).pathname}</span>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>{p.clicks} clicks</span>
                        <span>{(p.ctr * 100).toFixed(1)}%</span>
                        <span>#{p.position.toFixed(0)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No page data available</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

type AIModel = 'gpt-4.1-mini' | 'gpt-4.1' | 'gemini-2.5-flash' | 'gemini-2.5-pro';
const AI_MODELS: { value: AIModel; label: string }[] = [
  { value: 'gpt-4.1-mini', label: 'GPT-4.1 Mini' },
  { value: 'gpt-4.1', label: 'GPT-4.1' },
  { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
  { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro' },
];

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
        functionCalls: m.functionCalls,
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
          enhancementType: enh.enhancementType,
          fieldName: enh.fieldName || 'content',
          suggestedValue: enh.suggestedValue,
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
          const lines = enh.suggestedValue.split('\n');
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
        updateData[enh.fieldName] = enh.suggestedValue;

        await apiRequest('PUT', `/api/pages/${pageId}`, updateData);
        queryClient.invalidateQueries({ queryKey: ['/api/pages'] });
        queryClient.invalidateQueries({ queryKey: ['/api/admin/pages'] });

        toast({
          title: "Applied!",
          description: `${enh.enhancementType.replace(/_/g, ' ')} updated on page.`
        });
      } else {
        // Unsupported field - save as enhancement for review
        await apiRequest('POST', `/api/admin/pages/${pageId}/enhancements`, {
          enhancementType: enh.enhancementType,
          fieldName: enh.fieldName,
          suggestedValue: enh.suggestedValue,
          reason: enh.reason,
          confidence: enh.confidence,
          status: 'pending'
        });

        queryClient.invalidateQueries({ queryKey: ['/api/pages'] });
        toast({
          title: "Saved for Review",
          description: `${enh.enhancementType.replace(/_/g, ' ')} saved for review in Page Editor.`
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
                                                    {enh.enhancementType.replace(/_/g, ' ').toUpperCase()}
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
                                                      __html: enh.suggestedValue.substring(0, 500) + (enh.suggestedValue.length > 500 ? '...' : '')
                                                    }}
                                                  />
                                                ) : (enh.enhancementType === 'tag' && enh.fieldName?.startsWith('visualConfig')) ? (
                                                  <pre className="text-[10px] text-muted-foreground whitespace-pre-wrap">
                                                    {enh.suggestedValue.substring(0, 300)}{enh.suggestedValue.length > 300 ? '...' : ''}
                                                  </pre>
                                                ) : (
                                                  <p className="text-muted-foreground whitespace-pre-wrap">
                                                    {enh.suggestedValue.substring(0, 300)}{enh.suggestedValue.length > 300 ? '...' : ''}
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

function MaintenancePanel() {
  const [isRunning, setIsRunning] = useState(false);
  const [dailyEnabled, setDailyEnabled] = useState(false);
  const [dailyTime, setDailyTime] = useState("03:00");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: latestReport, isLoading: isLoadingReport } = useQuery<MaintenanceReport | null>({
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

  const { data: history = [] } = useQuery<MaintenanceReport[]>({
    queryKey: ['/api/admin/maintenance/history'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/admin/maintenance/history?limit=5');
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ok': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'warn': return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return null;
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

      {isLoadingReport ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : latestReport ? (
        <div className="bg-card border rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Latest Report</h4>
              <p className="text-xs text-muted-foreground">
                {new Date(latestReport.timestamp).toLocaleString()} • {latestReport.triggeredBy}
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {latestReport.backendRoutesCount} routes
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {latestReport.frontendCallsCount} API calls
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            {latestReport.results.map((result, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                data-testid={`result-${result.name}`}
              >
                {getStatusIcon(result.status)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{result.name}</span>
                    {result.count !== undefined && (
                      <Badge variant="secondary" className="text-xs">
                        {result.count}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{result.message}</p>
                  {result.details && result.status !== 'ok' && (
                    <details className="mt-2">
                      <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                        View details
                      </summary>
                      <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-x-auto max-h-32">
                        {result.details.slice(0, 500)}
                        {result.details.length > 500 && '...'}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            ))}
          </div>

          {latestReport.routeMismatches.missingBackend.length > 0 && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <h5 className="font-medium text-amber-800 text-sm mb-2">Missing Backend Routes</h5>
              <ul className="text-xs text-amber-700 space-y-1">
                {latestReport.routeMismatches.missingBackend.slice(0, 5).map((route, i) => (
                  <li key={i}>{route}</li>
                ))}
                {latestReport.routeMismatches.missingBackend.length > 5 && (
                  <li className="text-muted-foreground">
                    ... and {latestReport.routeMismatches.missingBackend.length - 5} more
                  </li>
                )}
              </ul>
            </div>
          )}

          {latestReport.suggestions.length > 0 && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <h5 className="font-medium text-blue-800 text-sm mb-2">Suggestions</h5>
              <ul className="text-xs text-blue-700 space-y-1">
                {latestReport.suggestions.map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <RefreshCw className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No maintenance reports yet.</p>
          <p className="text-sm">Click "Run Now" to generate your first report.</p>
        </div>
      )}

      {history.length > 1 && (
        <div className="bg-card border rounded-lg p-4">
          <h4 className="font-medium mb-3">Recent History</h4>
          <div className="space-y-2">
            {history.slice(1).map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-2 hover:bg-muted/50 rounded"
              >
                <div className="flex items-center gap-3">
                  {report.summary.errors > 0 ? (
                    <XCircle className="w-4 h-4 text-red-500" />
                  ) : report.summary.warnings > 0 ? (
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  )}
                  <span className="text-sm">
                    {new Date(report.timestamp).toLocaleDateString()} {new Date(report.timestamp).toLocaleTimeString()}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {report.triggeredBy}
                  </Badge>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="text-green-500">{report.summary.passed}</span>
                  <span className="text-amber-500">{report.summary.warnings}</span>
                  <span className="text-red-500">{report.summary.errors}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SettingsTab({
  settings,
  onSave,
  isSaving,
}: {
  settings: CmsSetting[];
  onSave: (key: string, value: any, description: string, category: string) => Promise<void>;
  isSaving: boolean;
}) {
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
            {activeCategory === 'maintenance' ? (
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
                      <Label className="text-sm font-medium">AI Enrichment / Startup Prompt</Label>
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

type HtmlTemplateFormData = {
  name: string;
  slug: string;
  templateType: string;
  componentClass: string | null;
  description: string | null;
  htmlContent: string;
  previewImage: string | null;
  tags: string[];
};

function TemplatePreviewFrame({ htmlContent, className }: { htmlContent: string; className?: string }) {
  const sanitizedHtml = htmlContent
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/\s(onclick|onload|onerror|onmouseover|onmouseout|onfocus|onblur|onsubmit|onchange|onkeydown|onkeyup|onkeypress)\s*=/gi, ' data-sanitized=');

  const srcdoc = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 14px;
          padding: 16px;
          background: #fafafa;
          overflow: auto;
        }
        img { max-width: 100%; height: auto; }
        section, div { max-width: 100%; }
      </style>
    </head>
    <body>${sanitizedHtml}</body>
    </html>
  `;

  return (
    <iframe
      srcDoc={srcdoc}
      className={className}
      sandbox=""
      title="Template Preview"
    />
  );
}

function TemplatePreviewModal({
  template,
  isOpen,
  onClose,
  onEdit,
}: {
  template: HtmlTemplate | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (template: HtmlTemplate) => void;
}) {
  if (!template) return null;

  const typeConfig = TEMPLATE_TYPE_CONFIG[template.templateType] || { label: template.templateType, color: 'bg-gray-100 text-gray-700' };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Eye className="w-5 h-5" />
            <span>Preview: {template.name}</span>
            <Badge className={`${typeConfig.color} text-xs ml-2`}>{typeConfig.label}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-4 flex-1 min-h-0 overflow-hidden">
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">Live Preview</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(template)} data-testid="button-edit-from-preview">
                  <Edit className="w-4 h-4 mr-1" /> Edit Template
                </Button>
              </div>
            </div>
            <div className="flex-1 border rounded-lg bg-white overflow-hidden min-h-[400px]">
              <TemplatePreviewFrame
                htmlContent={template.htmlContent}
                className="w-full h-full border-0"
              />
            </div>
          </div>

          <div className="w-80 shrink-0 flex flex-col gap-4 overflow-y-auto">
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-sm">Template Details</h4>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Slug</span>
                  <span className="font-mono text-xs">{template.slug}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <Badge className={`${typeConfig.color} text-xs`}>{typeConfig.label}</Badge>
                </div>
                {template.componentClass && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Class</span>
                    <span className="font-mono text-xs">.{template.componentClass}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size</span>
                  <span>{template.htmlContent.length.toLocaleString()} chars</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Updated</span>
                  <span>{new Date(template.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {template.description && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>
            )}

            {template.tags && template.tags.length > 0 && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2">Tags</h4>
                <div className="flex flex-wrap gap-1.5">
                  {template.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-semibold text-sm mb-2">HTML Code</h4>
              <pre className="text-xs bg-background rounded p-2 overflow-x-auto max-h-48 overflow-y-auto">
                <code>{template.htmlContent.substring(0, 500)}{template.htmlContent.length > 500 ? '...' : ''}</code>
              </pre>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function TemplatesTab({
  templates,
  onCreate,
  onEdit,
  onDelete,
}: {
  templates: HtmlTemplate[];
  onCreate: () => void;
  onEdit: (template: HtmlTemplate) => void;
  onDelete: (id: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedTemplate, setSelectedTemplate] = useState<HtmlTemplate | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = !searchTerm ||
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags?.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === "all" || template.templateType === typeFilter;
    return matchesSearch && matchesType;
  });

  const typeCounts: Record<string, number> = {
    all: templates.length,
    ...Object.keys(TEMPLATE_TYPE_CONFIG).reduce((acc, type) => ({
      ...acc,
      [type]: templates.filter(t => t.templateType === type).length
    }), {} as Record<string, number>)
  };

  const handlePreview = (template: HtmlTemplate) => {
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleEditFromPreview = (template: HtmlTemplate) => {
    setIsPreviewOpen(false);
    onEdit(template);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold">HTML Templates</h2>
          <p className="text-sm text-muted-foreground">Reusable HTML components for product pages and content</p>
        </div>
        <Button onClick={onCreate} data-testid="button-add-template">
          <Plus className="w-4 h-4 mr-2" /> Add Template
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
            data-testid="input-search-templates"
          />
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]" data-testid="select-type-filter">
              <SelectValue placeholder="Template Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types ({typeCounts.all})</SelectItem>
              {Object.entries(TEMPLATE_TYPE_CONFIG).map(([key, config]) => (
                <SelectItem key={key} value={key}>{config.label} ({typeCounts[key] || 0})</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex border rounded-lg overflow-hidden">
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="rounded-none"
            data-testid="button-view-grid"
          >
            <LayoutTemplate className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="rounded-none"
            data-testid="button-view-list"
          >
            <ListTree className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {filteredTemplates.length === 0 ? (
        <div className="text-center py-12">
          <Code2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium mb-2">No templates found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {templates.length === 0
              ? "Create your first HTML template"
              : "Try adjusting your filters"
            }
          </p>
          {templates.length === 0 && (
            <Button onClick={onCreate} variant="outline" data-testid="button-add-first-template">
              <Plus className="w-4 h-4 mr-2" /> Add Template
            </Button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => {
            const typeConfig = TEMPLATE_TYPE_CONFIG[template.templateType] || { label: template.templateType, color: 'bg-gray-100 text-gray-700' };
            return (
              <div
                key={template.id}
                className="bg-card border rounded-xl overflow-hidden shadow-sm hover:border-primary/30 hover:shadow-md transition-all group"
                data-testid={`template-card-${template.id}`}
              >
                <div
                  className="h-36 bg-muted/50 relative cursor-pointer overflow-hidden"
                  onClick={() => handlePreview(template)}
                >
                  <TemplatePreviewFrame
                    htmlContent={template.htmlContent}
                    className="w-full h-full border-0 pointer-events-none scale-75 origin-top-left"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-white/90 rounded-full p-2 shadow-lg">
                      <Eye className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate" data-testid={`template-name-${template.id}`}>{template.name}</h3>
                      <p className="text-xs text-muted-foreground font-mono truncate">{template.slug}</p>
                    </div>
                    <Badge className={`${typeConfig.color} text-xs shrink-0`}>{typeConfig.label}</Badge>
                  </div>

                  {template.description && (
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{template.description}</p>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                    <span className="flex items-center gap-1">
                      <Code2 className="w-3 h-3" />
                      {template.htmlContent.length.toLocaleString()}
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handlePreview(template)}
                        data-testid={`button-preview-template-${template.id}`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => onEdit(template)}
                        data-testid={`button-edit-template-${template.id}`}
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this template?')) {
                            onDelete(template.id);
                          }
                        }}
                        data-testid={`button-delete-template-${template.id}`}
                      >
                        <Trash className="w-3.5 h-3.5 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid gap-3">
          {filteredTemplates.map((template) => {
            const typeConfig = TEMPLATE_TYPE_CONFIG[template.templateType] || { label: template.templateType, color: 'bg-gray-100 text-gray-700' };
            return (
              <div
                key={template.id}
                className="bg-card border rounded-xl p-4 shadow-sm hover:border-primary/30 transition-colors flex gap-4"
                data-testid={`template-card-${template.id}`}
              >
                <div
                  className="w-32 h-20 bg-muted/50 rounded-lg overflow-hidden shrink-0 cursor-pointer relative group"
                  onClick={() => handlePreview(template)}
                >
                  <TemplatePreviewFrame
                    htmlContent={template.htmlContent}
                    className="w-full h-full border-0 pointer-events-none scale-50 origin-top-left"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <h3 className="font-semibold text-sm truncate" data-testid={`template-name-${template.id}`}>{template.name}</h3>
                      <Badge className={`${typeConfig.color} text-xs shrink-0`}>{typeConfig.label}</Badge>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handlePreview(template)}
                        data-testid={`button-preview-template-${template.id}`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => onEdit(template)}
                        data-testid={`button-edit-template-${template.id}`}
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this template?')) {
                            onDelete(template.id);
                          }
                        }}
                        data-testid={`button-delete-template-${template.id}`}
                      >
                        <Trash className="w-3.5 h-3.5 text-destructive" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground font-mono mb-1">{template.slug}</p>

                  {template.description && (
                    <p className="text-xs text-muted-foreground line-clamp-1">{template.description}</p>
                  )}

                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                    {template.componentClass && (
                      <span className="font-mono">.{template.componentClass}</span>
                    )}
                    <span className="flex items-center gap-1">
                      <Code2 className="w-3 h-3" />
                      {template.htmlContent.length.toLocaleString()} chars
                    </span>
                    <span>{new Date(template.updatedAt).toLocaleDateString()}</span>
                    {template.tags && template.tags.length > 0 && (
                      <div className="flex gap-1">
                        {template.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0">{tag}</Badge>
                        ))}
                        {template.tags.length > 3 && (
                          <span className="text-muted-foreground">+{template.tags.length - 3}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <TemplatePreviewModal
        template={selectedTemplate}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onEdit={handleEditFromPreview}
      />
    </div>
  );
}

function TemplateEditorModal({
  template,
  isOpen,
  onClose,
  onSave,
}: {
  template: HtmlTemplate | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: HtmlTemplateFormData, templateId: string | null) => Promise<void>;
}) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<HtmlTemplateFormData>({
    name: '',
    slug: '',
    templateType: 'section',
    componentClass: null,
    description: null,
    htmlContent: '',
    previewImage: null,
    tags: [],
  });
  const [tagsText, setTagsText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (template) {
      setFormData({
        name: template.name,
        slug: template.slug,
        templateType: template.templateType,
        componentClass: template.componentClass,
        description: template.description,
        htmlContent: template.htmlContent,
        previewImage: template.previewImage,
        tags: template.tags || [],
      });
      setTagsText((template.tags || []).join(', '));
    } else {
      setFormData({
        name: '',
        slug: '',
        templateType: 'section',
        componentClass: null,
        description: null,
        htmlContent: '',
        previewImage: null,
        tags: [],
      });
      setTagsText('');
    }
  }, [template, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const dataToSave = {
        ...formData,
        tags: tagsText.split(',').map(t => t.trim()).filter(t => t),
      };
      await onSave(dataToSave, template?.id || null);
      toast({
        title: template?.id ? "Template saved" : "Template created",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      console.error('Failed to save template:', error);
      toast({
        title: "Error saving",
        description: error instanceof Error ? error.message : "Failed to save template",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const generateSlugFromName = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            {template ? `Edit: ${template.name}` : 'Create New Template'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="template-name">Name *</Label>
              <Input
                id="template-name"
                value={formData.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    name,
                    slug: !template && !prev.slug ? generateSlugFromName(name) : prev.slug,
                  }));
                }}
                placeholder="Template Name"
                required
                data-testid="input-template-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-slug">Slug *</Label>
              <Input
                id="template-slug"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="template-slug"
                required
                data-testid="input-template-slug"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="template-type">Template Type *</Label>
              <Select
                value={formData.templateType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, templateType: value }))}
              >
                <SelectTrigger id="template-type" data-testid="select-template-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(TEMPLATE_TYPE_CONFIG).map(([key, config]) => (
                    <SelectItem key={key} value={key}>{config.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-component-class">Component Class</Label>
              <Input
                id="template-component-class"
                value={formData.componentClass || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, componentClass: e.target.value || null }))}
                placeholder="e.g., andara-hero-primary"
                data-testid="input-template-component-class"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="template-description">Description</Label>
            <Textarea
              id="template-description"
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value || null }))}
              placeholder="Brief description of when and how to use this template"
              rows={2}
              data-testid="input-template-description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="template-tags">Tags (comma-separated)</Label>
            <Input
              id="template-tags"
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              placeholder="product, hero, landing"
              data-testid="input-template-tags"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="template-html">HTML Content *</Label>
              <span className="text-xs text-muted-foreground">{formData.htmlContent.length.toLocaleString()} characters</span>
            </div>
            <Textarea
              id="template-html"
              value={formData.htmlContent}
              onChange={(e) => setFormData(prev => ({ ...prev, htmlContent: e.target.value }))}
              placeholder="<!-- Full HTML template with comments -->
<section class='your-component'>
  <div class='container'>
    <!-- Your HTML content here -->
  </div>
</section>"
              rows={20}
              className="font-mono text-sm"
              required
              data-testid="textarea-template-html"
            />
            <p className="text-xs text-muted-foreground">
              Paste your full HTML template including all comments. The content will be stored exactly as entered.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose} data-testid="button-cancel-template">
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving} data-testid="button-save-template">
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : (template ? 'Save Changes' : 'Create Template')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

type ProductFormData = {
  name: string;
  slug: string;
  sizeMl: number;
  descriptionShort: string;
  descriptionLong: string;
  price: number;
  pricePerLiter: number;
  pageKey: string | null;
  templateId: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  highlights: string[];
  tags: string[];
};

function ProductEditorModal({
  product,
  pages,
  templates,
  isOpen,
  onClose,
  onSave,
  onDelete,
}: {
  product: Product | null;
  pages: Page[];
  templates: HtmlTemplate[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProductFormData, productId: string | null) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
}) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    slug: '',
    sizeMl: 500,
    descriptionShort: '',
    descriptionLong: '',
    price: 0,
    pricePerLiter: 0,
    pageKey: null,
    templateId: null,
    seoTitle: null,
    seoDescription: null,
    highlights: [],
    tags: [],
  });
  const [highlightsText, setHighlightsText] = useState('');
  const [tagsText, setTagsText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        slug: product.slug,
        sizeMl: product.sizeMl,
        descriptionShort: product.descriptionShort,
        descriptionLong: product.descriptionLong || '',
        price: product.price,
        pricePerLiter: product.pricePerLiter || 0,
        pageKey: product.pageKey,
        templateId: product.templateId,
        seoTitle: (product as any).seoTitle || null,
        seoDescription: (product as any).seoDescription || null,
        highlights: product.highlights || [],
        tags: product.tags || [],
      });
      setHighlightsText((product.highlights || []).join('\n'));
      setTagsText((product.tags || []).join(', '));
    } else {
      setFormData({
        name: '',
        slug: '',
        sizeMl: 500,
        descriptionShort: '',
        descriptionLong: '',
        price: 0,
        pricePerLiter: 0,
        pageKey: null,
        templateId: null,
        seoTitle: null,
        seoDescription: null,
        highlights: [],
        tags: [],
      });
      setHighlightsText('');
      setTagsText('');
    }
  }, [product, isOpen]);

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
      const dataToSave = {
        ...formData,
        highlights: highlightsText.split('\n').filter(h => h.trim()),
        tags: tagsText.split(',').map(t => t.trim()).filter(t => t),
      };
      await onSave(dataToSave, product?.id || null);
      toast({
        title: product?.id ? "Product saved" : "Product created",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      console.error('Failed to save product:', error);
      toast({
        title: "Error saving",
        description: error instanceof Error ? error.message : "Failed to save product",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!product || !onDelete) return;
    if (confirm('Are you sure you want to delete this product? This cannot be undone.')) {
      try {
        await onDelete(product.id);
        onClose();
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  const generateSlugFromName = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            {product ? `Edit: ${product.name}` : 'Create New Product'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="product-name">Name *</Label>
              <Input
                id="product-name"
                value={formData.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    name,
                    slug: !product && !prev.slug ? generateSlugFromName(name) : prev.slug,
                  }));
                }}
                placeholder="Product Name"
                required
                data-testid="input-product-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-slug">Slug *</Label>
              <Input
                id="product-slug"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="product-slug"
                required
                data-testid="input-product-slug"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="product-size">Size (ml) *</Label>
              <Input
                id="product-size"
                type="number"
                value={formData.sizeMl}
                onChange={(e) => setFormData(prev => ({ ...prev, sizeMl: parseInt(e.target.value) || 0 }))}
                required
                data-testid="input-product-size"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-price">Price (cents) *</Label>
              <Input
                id="product-price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                required
                data-testid="input-product-price"
              />
              <p className="text-xs text-muted-foreground">${(formData.price / 100).toFixed(2)}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-price-liter">Price/Liter (cents)</Label>
              <Input
                id="product-price-liter"
                type="number"
                value={formData.pricePerLiter}
                onChange={(e) => setFormData(prev => ({ ...prev, pricePerLiter: parseInt(e.target.value) || 0 }))}
                data-testid="input-product-price-liter"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-desc-short">Short Description *</Label>
            <Textarea
              id="product-desc-short"
              value={formData.descriptionShort}
              onChange={(e) => setFormData(prev => ({ ...prev, descriptionShort: e.target.value }))}
              placeholder="Brief product description"
              rows={2}
              required
              data-testid="input-product-desc-short"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-desc-long">Long Description</Label>
            <Textarea
              id="product-desc-long"
              value={formData.descriptionLong}
              onChange={(e) => setFormData(prev => ({ ...prev, descriptionLong: e.target.value }))}
              placeholder="Detailed product description"
              rows={4}
              data-testid="input-product-desc-long"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-highlights">Highlights (one per line)</Label>
            <Textarea
              id="product-highlights"
              value={highlightsText}
              onChange={(e) => setHighlightsText(e.target.value)}
              placeholder="Pure ionic sulfate minerals&#10;Lab-tested for quality&#10;Glass bottle packaging"
              rows={3}
              data-testid="input-product-highlights"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-tags">Tags (comma-separated)</Label>
            <Input
              id="product-tags"
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              placeholder="minerals, sulfate, ionic"
              data-testid="input-product-tags"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-page">Linked CMS Page</Label>
            <Select
              value={formData.pageKey || "__none__"}
              onValueChange={(value) => setFormData(prev => ({ ...prev, pageKey: value === "__none__" ? null : value }))}
            >
              <SelectTrigger data-testid="select-product-page">
                <SelectValue placeholder="Select a page (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__none__">No linked page</SelectItem>
                {flatPages
                  .filter(({ page }) => page.pageType === 'product' || page.template === 'product')
                  .map(({ page, level }) => (
                    <SelectItem key={page.key} value={page.key}>
                      {'  '.repeat(level)}{page.title}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Link this product to a CMS page for additional content</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-template">Layout Template</Label>
            <Select
              value={formData.templateId || "__none__"}
              onValueChange={(value) => setFormData(prev => ({ ...prev, templateId: value === "__none__" ? null : value }))}
            >
              <SelectTrigger data-testid="select-product-template">
                <SelectValue placeholder="Select a template (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__none__">No template</SelectItem>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    <div className="flex items-center gap-2">
                      <LayoutTemplate className="w-4 h-4 text-muted-foreground" />
                      <span>{template.name}</span>
                      <Badge variant="outline" className="text-xs ml-1">
                        {TEMPLATE_TYPE_CONFIG[template.templateType]?.label || template.templateType}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Apply an HTML template for custom product page layout</p>
          </div>

          <div className="border-t pt-4 space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">SEO Settings</h4>
            <div className="space-y-2">
              <Label htmlFor="product-seo-title">SEO Title</Label>
              <Input
                id="product-seo-title"
                value={formData.seoTitle || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value || null }))}
                placeholder="Custom title for search engines"
                data-testid="input-product-seo-title"
              />
              <p className="text-xs text-muted-foreground">Leave empty to use product name</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-seo-description">SEO Description</Label>
              <Textarea
                id="product-seo-description"
                value={formData.seoDescription || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value || null }))}
                placeholder="Meta description for search engines..."
                rows={2}
                data-testid="textarea-product-seo-description"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div>
              {product && onDelete && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  data-testid="button-delete-product"
                >
                  <Trash className="w-4 h-4 mr-2" /> Delete Product
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose} data-testid="button-cancel-product">
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving} data-testid="button-save-product">
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : (product ? 'Save Changes' : 'Create Product')}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

type ArticleFormData = {
  title: string;
  slug: string;
  summary: string;
  content: string;
  clusterId: string;
  tags: string[];
  priority: number;
  pageKey: string | null;
  publishedAt: string;
};

function ArticleEditorModal({
  article,
  pages,
  clusters,
  isOpen,
  onClose,
  onSave,
  onDelete,
}: {
  article: Article | null;
  pages: Page[];
  clusters: Cluster[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ArticleFormData, articleId: string | null) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
}) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    slug: '',
    summary: '',
    content: '',
    clusterId: '',
    tags: [],
    priority: 5,
    pageKey: null,
    publishedAt: new Date().toISOString(),
  });
  const [tagsText, setTagsText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        slug: article.slug,
        summary: article.summary,
        content: article.content || '',
        clusterId: article.clusterId,
        tags: article.tags || [],
        priority: article.priority,
        pageKey: article.pageKey,
        publishedAt: article.publishedAt,
      });
      setTagsText((article.tags || []).join(', '));
    } else {
      setFormData({
        title: '',
        slug: '',
        summary: '',
        content: '',
        clusterId: clusters[0]?.id || '',
        tags: [],
        priority: 5,
        pageKey: null,
        publishedAt: new Date().toISOString(),
      });
      setTagsText('');
    }
  }, [article, clusters, isOpen]);

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
      const dataToSave = {
        ...formData,
        tags: tagsText.split(',').map(t => t.trim()).filter(t => t),
      };
      await onSave(dataToSave, article?.id || null);
      toast({
        title: article?.id ? "Article saved" : "Article created",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      console.error('Failed to save article:', error);
      toast({
        title: "Error saving",
        description: error instanceof Error ? error.message : "Failed to save article",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!article || !onDelete) return;
    if (confirm('Are you sure you want to delete this article? This cannot be undone.')) {
      try {
        await onDelete(article.id);
        onClose();
      } catch (error) {
        console.error('Failed to delete article:', error);
      }
    }
  };

  const generateSlugFromTitle = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Beaker className="w-5 h-5" />
            {article ? `Edit: ${article.title}` : 'Create New Article'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="article-title">Title *</Label>
              <Input
                id="article-title"
                value={formData.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    title,
                    slug: !article && !prev.slug ? generateSlugFromTitle(title) : prev.slug,
                  }));
                }}
                placeholder="Article Title"
                required
                data-testid="input-article-title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="article-slug">Slug *</Label>
              <Input
                id="article-slug"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="article-slug"
                required
                data-testid="input-article-slug"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="article-cluster">Cluster *</Label>
              <Select
                value={formData.clusterId}
                onValueChange={(value) => setFormData(prev => ({ ...prev, clusterId: value }))}
              >
                <SelectTrigger data-testid="select-article-cluster">
                  <SelectValue placeholder="Select cluster" />
                </SelectTrigger>
                <SelectContent>
                  {clusters.map(cluster => (
                    <SelectItem key={cluster.id} value={cluster.id}>
                      {cluster.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="article-priority">Priority</Label>
              <Input
                id="article-priority"
                type="number"
                min={1}
                max={10}
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: parseInt(e.target.value) || 5 }))}
                data-testid="input-article-priority"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="article-summary">Summary *</Label>
            <Textarea
              id="article-summary"
              value={formData.summary}
              onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
              placeholder="Brief summary of the article"
              rows={2}
              required
              data-testid="input-article-summary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="article-content">Content *</Label>
            <RichTextEditor
              id="article-content"
              value={formData.content}
              onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
              placeholder="Full article content..."
              required
              data-testid="editor-article-content"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="article-tags">Tags (comma-separated)</Label>
            <Input
              id="article-tags"
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              placeholder="sulfate, minerals, health"
              data-testid="input-article-tags"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="article-page">Linked CMS Page</Label>
            <Select
              value={formData.pageKey || "__none__"}
              onValueChange={(value) => setFormData(prev => ({ ...prev, pageKey: value === "__none__" ? null : value }))}
            >
              <SelectTrigger data-testid="select-article-page">
                <SelectValue placeholder="Select a page (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__none__">No linked page</SelectItem>
                {flatPages
                  .filter(({ page }) => page.pageType === 'article' || page.template === 'article')
                  .map(({ page, level }) => (
                    <SelectItem key={page.key} value={page.key}>
                      {'  '.repeat(level)}{page.title}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Link this article to a CMS page for additional content</p>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div>
              {article && onDelete && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  data-testid="button-delete-article"
                >
                  <Trash className="w-4 h-4 mr-2" /> Delete Article
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose} data-testid="button-cancel-article">
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving} data-testid="button-save-article">
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : (article ? 'Save Changes' : 'Create Article')}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const PAGE_TEMPLATES = [
  { value: 'landing_home', label: 'Landing - Home' },
  { value: 'shop_overview', label: 'Shop Overview' },
  { value: 'product', label: 'Product Page' },
  { value: 'product_bundles', label: 'Product Bundles' },
  { value: 'tool_calculator', label: 'Tool - Calculator' },
  { value: 'guide', label: 'Guide' },
  { value: 'b2b', label: 'B2B Page' },
  { value: 'pillar_overview', label: 'Pillar Overview' },
  { value: 'cluster_overview', label: 'Cluster Overview' },
  { value: 'article', label: 'Article' },
  { value: 'longform_comparison', label: 'Longform Comparison' },
  { value: 'explain_like_school', label: 'Explain Like School' },
  { value: 'about', label: 'About Page' },
  { value: 'team', label: 'Team Page' },
  { value: 'legal', label: 'Legal Page' },
  { value: 'blog_overview', label: 'Blog Overview' },
  { value: 'blog_post', label: 'Blog Post' },
  { value: 'faq', label: 'FAQ Page' },
  { value: 'lab_data', label: 'Lab Data' },
];

const PAGE_TYPES = [
  { value: 'page', label: 'Standard Page' },
  { value: 'product', label: 'Product Page' },
  { value: 'tool', label: 'Tool/Calculator' },
  { value: 'article', label: 'Article' },
  { value: 'blog_post', label: 'Blog Post' },
];

const PAGE_STATUSES = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
];

type AiEnrichment = {
  extractedAt: string;
  imagePrompts: Array<{ id: string; prompt: string; location: string; generated?: boolean; generatedUrl?: string }>;
  videoPrompts: Array<{ id: string; prompt: string; location: string }>;
  layoutSpecs: Array<{ section: string; spec: string }>;
  animationSpecs: Array<{ element: string; spec: string }>;
  suggestedSeo: { title?: string; description?: string; focusKeyword?: string };
  suggestedLinks: Array<{ anchor: string; targetPath: string; reason: string }>;
  components: string[];
};

type PageFormData = {
  key: string;
  title: string;
  path: string;
  pageType: string;
  template: string;
  clusterKey: string | null;
  parentKey: string | null;
  priority: number;
  status: string;
  summary: string | null;
  content: string | null;
  seoFocus: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  featuredImage: string | null;
  icon: string | null;
  visualConfig: VisualConfig | null;
  aiStartupHtml: string | null;
  aiEnrichment: AiEnrichment | null;
};

function SeoCopilotButton({ pageId, pageKey }: { pageId: string; pageKey: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: suggestions, isLoading } = useQuery<any[]>({
    queryKey: ['/api/admin/seo-brain/suggestions', pageId],
    queryFn: async () => {
      if (!pageId) return [];
      const res = await apiRequest('GET', `/api/admin/seo-brain/suggestions/${pageId}`);
      return res.json();
    },
    enabled: !!pageId && isOpen,
  });

  const handleAnalyze = async () => {
    if (!pageId) {
      toast({ title: "Save First", description: "Please save the page before analyzing SEO", variant: "destructive" });
      return;
    }

    setIsAnalyzing(true);
    try {
      const res = await apiRequest('POST', `/api/admin/seo-brain/analyze/${pageId}`);
      const data = await res.json();
      queryClient.invalidateQueries({ queryKey: ['/api/admin/seo-brain/suggestions', pageId] });
      toast({ title: "Analysis Complete", description: `Generated ${data.suggestions?.length || 0} suggestions` });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!pageId && !pageKey) {
    return (
      <span className="text-xs text-gray-500 italic">Save page to enable SEO Copilot</span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="border-violet-500/50 text-violet-400 hover:bg-violet-500/20 h-7 text-xs"
        data-testid="button-seo-copilot"
      >
        <Brain className="w-3 h-3 mr-1" />
        SEO Copilot
        {suggestions && suggestions.length > 0 && (
          <span className="ml-1 px-1.5 py-0.5 bg-violet-500/30 rounded-full text-[10px]">
            {suggestions.length}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-slate-800 border border-white/10 rounded-lg shadow-xl z-50 p-3 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-white">SEO Suggestions</h4>
            <Button
              type="button"
              size="sm"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="h-6 text-xs bg-violet-600 hover:bg-violet-700"
            >
              {isAnalyzing ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
            </Button>
          </div>

          {isLoading ? (
            <div className="py-4 text-center">
              <Loader2 className="w-5 h-5 animate-spin mx-auto text-violet-400" />
            </div>
          ) : suggestions && suggestions.length > 0 ? (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {suggestions.slice(0, 5).map((s: any) => (
                <div key={s.id} className="p-2 bg-slate-700/50 rounded text-xs">
                  <div className="flex items-center gap-1 text-violet-300 font-medium mb-1">
                    <Lightbulb className="w-3 h-3" />
                    {s.suggestionType.replace(/_/g, ' ')}
                  </div>
                  <p className="text-slate-300 text-[11px] line-clamp-2">{s.reasoning}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 text-center py-4">
              No suggestions yet. Click refresh to analyze.
            </p>
          )}

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-full text-xs text-slate-400 hover:text-white py-1"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

function PageEditorModal({
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

  useEffect(() => {
    if (page && !isNew) {
      const pageContent = page.content || (page as any).aiStartupHtml || null;
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
      });
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
      });
    }
  }, [page, isNew, isOpen]);

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

  const generateKeyFromTitle = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
  };

  const generatePathFromTitle = (title: string) => {
    return '/' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
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
                        fieldsUpdated += 5;
                      }

                      if (Object.keys(updates).length > 0) {
                        setFormData(prev => ({ ...prev, ...updates }));
                        toast({
                          title: "Content Interpreted",
                          description: `Auto-filled ${fieldsUpdated} fields from HTML content (${tasks.length} elements detected)`,
                        });
                      } else {
                        toast({
                          title: "No New Fields",
                          description: `Detected ${tasks.length} elements but all form fields already have values`,
                        });
                      }
                    }}
                    data-testid="button-interpret-content"
                  >
                    <Wand2 className="w-3.5 h-3.5 mr-1" />
                    Interpret Content ({parseVisualConfigFromContent(formData.content || '').tasks.length} found)
                  </Button>
                )}
                <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rawHtmlMode}
                    onChange={(e) => setRawHtmlMode(e.target.checked)}
                    className="rounded border-white/20 bg-white/5"
                    data-testid="checkbox-raw-html-mode"
                  />
                  <Code2 className="w-3.5 h-3.5" />
                  Raw HTML Mode
                </label>
              </div>
            </div>
            {rawHtmlMode ? (
              <Textarea
                id="content"
                variant="dark"
                value={formData.content || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value || null }))}
                placeholder="Paste raw HTML with Andara classes here..."
                className="min-h-[30vh] max-h-[60vh] font-mono text-xs"
                data-testid="textarea-raw-html-content"
              />
            ) : (
              <RichTextEditor
                id="content"
                value={formData.content || ''}
                onChange={(value) => setFormData(prev => ({ ...prev, content: value || null }))}
                placeholder="Main page content..."
                className="min-h-[18vh] max-h-[50vh] overflow-y-auto resize-y"
                data-testid="editor-page-content"
              />
            )}
            {rawHtmlMode && (
              <p className="text-xs text-gray-400">
                Raw HTML mode preserves all CSS classes and styling. Use this for AI-generated Andara pages. Click "Interpret Content" to auto-fill form fields.
              </p>
            )}

            {formData.content && (
              <div className="mt-4">
                <PageContentPreview
                  content={formData.content}
                  title={formData.title || undefined}
                  path={formData.path || undefined}
                  cluster={formData.clusterKey || undefined}
                  status={(formData.status as "draft" | "published") || undefined}
                  showActions={false}
                  showDetails={false}
                  defaultExpanded={false}
                  maxHeight="400px"
                />
              </div>
            )}
          </div>

          <div className="border-t border-white/10 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center gap-2 text-white">
                <Eye className="w-4 h-4" /> SEO Settings
              </h3>
              <SeoCopilotButton pageId={page?.id || ''} pageKey={formData.key} />
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="seoFocus" variant="dark">SEO Focus Keyword</Label>
                  <Input
                    id="seoFocus"
                    variant="dark"
                    value={formData.seoFocus || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, seoFocus: e.target.value || null }))}
                    placeholder="Primary keyword for this page"
                    data-testid="input-seo-focus"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seoTitle" variant="dark">SEO Title</Label>
                  <Input
                    id="seoTitle"
                    variant="dark"
                    value={formData.seoTitle || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value || null }))}
                    placeholder="Custom title for search engines"
                    data-testid="input-seo-title"
                  />
                  <p className="text-xs text-gray-400">Leave empty to use page title</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seoDescription" variant="dark">SEO Description</Label>
                <Textarea
                  id="seoDescription"
                  variant="dark"
                  value={formData.seoDescription || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value || null }))}
                  placeholder="Meta description for search engines..."
                  rows={2}
                  data-testid="textarea-seo-description"
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="featuredImage" variant="dark">Featured Image URL</Label>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleGenerateFeaturedImage}
                        disabled={isGeneratingFeaturedImage || !featuredImagePrompt.trim()}
                        className="bg-emerald-600 hover:bg-emerald-700 h-7 text-xs"
                        data-testid="button-generate-featured-image"
                      >
                        {isGeneratingFeaturedImage ? (
                          <>
                            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3 h-3 mr-1" />
                            Generate
                          </>
                        )}
                      </Button>
                      {featuredImagePreview && (
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, featuredImage: featuredImagePreview.url }));
                            toast({ title: "Applied", description: "Featured image set successfully" });
                          }}
                          className="bg-cyan-600 hover:bg-cyan-700 h-7 text-xs"
                          data-testid="button-use-featured-image"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Use This
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      id="featuredImage"
                      variant="dark"
                      value={formData.featuredImage || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value || null }))}
                      placeholder="https://example.com/image.jpg"
                      data-testid="input-featured-image"
                      className="flex-1"
                    />
                  </div>
                  <Textarea
                    variant="dark"
                    value={featuredImagePrompt}
                    onChange={(e) => setFeaturedImagePrompt(e.target.value)}
                    placeholder="Describe the featured image you want to generate... (e.g., 'Abstract crystalline minerals with deep blue and emerald tones, cosmic background')"
                    rows={2}
                    className="text-sm"
                    data-testid="textarea-featured-image-prompt"
                  />
                  {featuredImagePreview && (
                    <div className="mt-2 p-3 bg-white/5 rounded-lg border border-white/10">
                      <p className="text-xs text-gray-400 mb-2">Generated Preview:</p>
                      <img
                        src={featuredImagePreview.url}
                        alt="Generated preview"
                        className="w-full max-w-xs rounded-lg border border-white/20"
                      />
                    </div>
                  )}
                  <p className="text-xs text-gray-400">Image shown in social shares and listings</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="icon" variant="dark">Page Icon</Label>
                    <Input
                      id="icon"
                      variant="dark"
                      value={formData.icon || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value || null }))}
                      placeholder="e.g., Beaker, Flask, Droplet"
                      data-testid="input-page-icon"
                    />
                    <p className="text-xs text-gray-400">Lucide icon name for navigation</p>
                  </div>
                </div>
              </div>

              {/* Media Gallery Section */}
              {formData.key && (
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setMediaGalleryOpen(!mediaGalleryOpen)}
                    className="flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300"
                    data-testid="button-toggle-media-gallery"
                  >
                    {mediaGalleryOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    <Image className="w-4 h-4" />
                    Media Gallery
                    {mediaAssets && mediaAssets.length > 0 && (
                      <span className="bg-cyan-600/20 text-cyan-400 px-2 py-0.5 rounded-full text-xs">
                        {mediaAssets.length} slots
                      </span>
                    )}
                  </button>

                  {mediaGalleryOpen && (
                    <div className="space-y-3 pl-6">
                      {!mediaAssets || mediaAssets.length === 0 ? (
                        <p className="text-sm text-gray-400">No media assets yet. Use BigMind to generate page content with image prompts.</p>
                      ) : (
                        <div className="grid gap-3">
                          {mediaAssets.map((asset) => (
                            <div
                              key={asset.id}
                              className="bg-white/5 rounded-lg p-3 border border-white/10"
                              data-testid={`media-asset-${asset.id}`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-medium bg-indigo-600/30 text-indigo-300 px-2 py-0.5 rounded">
                                      {asset.slotType}
                                    </span>
                                    <span className="text-sm font-medium text-white truncate">{asset.slotKey}</span>
                                  </div>
                                  <p className="text-xs text-gray-400 line-clamp-2">{asset.prompt}</p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  {asset.status === 'generated' && asset.generatedUrl ? (
                                    <img
                                      src={asset.generatedUrl}
                                      alt={asset.slotKey}
                                      className="w-16 h-16 rounded object-cover border border-white/20"
                                    />
                                  ) : asset.status === 'generating' || generatingAssetId === asset.id ? (
                                    <div className="w-16 h-16 rounded bg-white/10 flex items-center justify-center">
                                      <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
                                    </div>
                                  ) : (
                                    <Button
                                      type="button"
                                      size="sm"
                                      onClick={() => handleGenerateMediaAsset(asset)}
                                      disabled={generatingAssetId !== null}
                                      className="bg-emerald-600 hover:bg-emerald-700 text-xs"
                                      data-testid={`button-generate-asset-${asset.id}`}
                                    >
                                      <Sparkles className="w-3 h-3 mr-1" />
                                      Generate
                                    </Button>
                                  )}
                                </div>
                              </div>
                              {asset.status === 'generated' && asset.generatedUrl && (
                                <div className="mt-2 flex gap-2 flex-wrap">
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setFormData(prev => ({ ...prev, featuredImage: asset.generatedUrl }));
                                      toast({ title: "Applied", description: "Image set as featured image" });
                                    }}
                                    className="text-xs h-7 bg-cyan-600/20 border-cyan-500/30 text-cyan-300 hover:bg-cyan-600/30"
                                    data-testid={`button-use-as-featured-${asset.id}`}
                                  >
                                    <Plus className="w-3 h-3 mr-1" />
                                    Use as Featured
                                  </Button>
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      navigator.clipboard.writeText(asset.generatedUrl || '');
                                      toast({ title: "Copied", description: "Image URL copied to clipboard" });
                                    }}
                                    className="text-xs h-7"
                                    data-testid={`button-copy-url-${asset.id}`}
                                  >
                                    Copy URL
                                  </Button>
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleGenerateMediaAsset(asset)}
                                    disabled={generatingAssetId !== null}
                                    className="text-xs h-7"
                                    data-testid={`button-regenerate-${asset.id}`}
                                  >
                                    <RefreshCw className="w-3 h-3 mr-1" />
                                    Regenerate
                                  </Button>
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    onClick={async () => {
                                      if (confirm('Delete this media asset?')) {
                                        try {
                                          await apiRequest('DELETE', `/api/admin/page-media/${asset.id}`);
                                          refetchMediaAssets();
                                          toast({ title: "Deleted", description: "Media asset removed" });
                                        } catch {
                                          toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
                                        }
                                      }
                                    }}
                                    className="text-xs h-7 text-red-400 hover:text-red-300 hover:bg-red-600/10"
                                    data-testid={`button-delete-asset-${asset.id}`}
                                  >
                                    <Trash className="w-3 h-3" />
                                  </Button>
                                </div>
                              )}
                              {asset.status === 'failed' && (
                                <p className="mt-1 text-xs text-red-400">Generation failed. Try again.</p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Date Information (read-only) */}
          {page && !isNew && (page.createdAt || page.updatedAt || page.publishedAt) && (() => {
            const formatDate = (dateStr: string | null | undefined, fallback: string = '—') => {
              if (!dateStr) return fallback;
              const date = new Date(dateStr);
              if (isNaN(date.getTime())) return fallback;
              return date.toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
              });
            };
            return (
              <div className="border-t border-white/10 pt-6">
                <h3 className="font-medium mb-4 flex items-center gap-2 text-white">
                  <Clock className="w-4 h-4" /> Date Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                  <div>
                    <Label className="text-xs text-gray-400 uppercase tracking-wider">Created</Label>
                    <p className="text-sm font-medium text-white" data-testid="text-page-created-at">
                      {formatDate(page.createdAt)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-400 uppercase tracking-wider">Last Updated</Label>
                    <p className="text-sm font-medium text-white" data-testid="text-page-updated-at">
                      {formatDate(page.updatedAt)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-400 uppercase tracking-wider">Published</Label>
                    <p className="text-sm font-medium text-white" data-testid="text-page-published-at">
                      {formatDate(page.publishedAt, 'Not published')}
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}

          <div className="border-t border-white/10 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center gap-2 text-white">
                <Sparkles className="w-4 h-4" /> Visual Config
              </h3>
              {!formData.visualConfig && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    visualConfig: {
                      ...defaultVisualConfig,
                      pageId: prev.key,
                      cluster: prev.clusterKey || ''
                    }
                  }))}
                  data-testid="button-add-visual-config"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Visual Config
                </Button>
              )}
              {formData.visualConfig && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-white/10"
                  onClick={() => setFormData(prev => ({ ...prev, visualConfig: null }))}
                  data-testid="button-remove-visual-config"
                >
                  <X className="w-4 h-4 mr-1" /> Remove
                </Button>
              )}
            </div>

            {formData.visualConfig && (
              <div className="space-y-4 p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="visualPriority" variant="dark">Visual Priority</Label>
                    <Select
                      value={formData.visualConfig.priority}
                      onValueChange={(value: 'P1' | 'P2' | 'P3') => setFormData(prev => ({
                        ...prev,
                        visualConfig: prev.visualConfig ? { ...prev.visualConfig, priority: value } : null
                      }))}
                    >
                      <SelectTrigger variant="dark" data-testid="select-visual-priority">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent variant="dark">
                        <SelectItem value="P1">P1 - Hero/Primary</SelectItem>
                        <SelectItem value="P2">P2 - Secondary</SelectItem>
                        <SelectItem value="P3">P3 - Supporting</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-400">Asset creation priority level</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vibeCluster" variant="dark">Content Cluster</Label>
                    <Input
                      id="vibeCluster"
                      variant="dark"
                      value={formData.visualConfig.cluster}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        visualConfig: prev.visualConfig ? { ...prev.visualConfig, cluster: e.target.value } : null
                      }))}
                      placeholder="e.g., water-science"
                      data-testid="input-vibe-cluster"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vibeKeywords" variant="dark">Vibe Keywords</Label>
                    <Input
                      id="vibeKeywords"
                      variant="dark"
                      value={(formData.visualConfig.vibeKeywords || []).join(', ')}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        visualConfig: prev.visualConfig ? {
                          ...prev.visualConfig,
                          vibeKeywords: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        } : null
                      }))}
                      placeholder="flowing, structured..."
                      data-testid="input-vibe-keywords"
                    />
                    <p className="text-xs text-gray-400">Comma-separated</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emotionalTone" variant="dark">Emotional Tone</Label>
                    <Input
                      id="emotionalTone"
                      variant="dark"
                      value={(formData.visualConfig.emotionalTone || []).join(', ')}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        visualConfig: prev.visualConfig ? {
                          ...prev.visualConfig,
                          emotionalTone: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        } : null
                      }))}
                      placeholder="wonder, clarity..."
                      data-testid="input-emotional-tone"
                    />
                    <p className="text-xs text-gray-400">Comma-separated</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="animationIdeas" variant="dark">Animation Ideas</Label>
                    <Input
                      id="animationIdeas"
                      variant="dark"
                      value={(formData.visualConfig.animationIdeas || []).join(', ')}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        visualConfig: prev.visualConfig ? {
                          ...prev.visualConfig,
                          animationIdeas: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        } : null
                      }))}
                      placeholder="water flow, pulse..."
                      data-testid="input-animation-ideas"
                    />
                    <p className="text-xs text-gray-400">Comma-separated</p>
                  </div>
                </div>

                {/* Motion Designer Section */}
                <div className="border-t border-white/10 pt-4 mt-4">
                  <h4 className="text-sm font-medium text-white flex items-center gap-2 mb-3">
                    <Film className="w-4 h-4 text-purple-400" />
                    Motion Designer
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="motionPreset" variant="dark">Motion Preset</Label>
                      <Select
                        value={(formData.visualConfig as any)?.motionPreset || 'none'}
                        onValueChange={(value: string) => setFormData(prev => ({
                          ...prev,
                          visualConfig: prev.visualConfig ? { ...prev.visualConfig, motionPreset: value === 'none' ? '' : value } as any : null
                        }))}
                      >
                        <SelectTrigger variant="dark" data-testid="select-motion-preset">
                          <SelectValue placeholder="Select motion archetype..." />
                        </SelectTrigger>
                        <SelectContent variant="dark">
                          <SelectItem value="none">None</SelectItem>
                          {MOTION_ARCHETYPES.map(arch => (
                            <SelectItem key={arch.key} value={arch.key}>
                              {arch.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-400">Primary animation style for page elements</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="entranceMotion" variant="dark">Entrance Motion</Label>
                      <Input
                        id="entranceMotion"
                        variant="dark"
                        value={(formData.visualConfig as any)?.entranceMotion || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          visualConfig: prev.visualConfig ? { ...prev.visualConfig, entranceMotion: e.target.value } as any : null
                        }))}
                        placeholder="fadeUp, stagger.container..."
                        data-testid="input-entrance-motion"
                      />
                      <p className="text-xs text-gray-400">e.g., fadeUp, scaleIn, slideFromLeft</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hoverMotion" variant="dark">Hover Motion</Label>
                      <Input
                        id="hoverMotion"
                        variant="dark"
                        value={(formData.visualConfig as any)?.hoverMotion || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          visualConfig: prev.visualConfig ? { ...prev.visualConfig, hoverMotion: e.target.value } as any : null
                        }))}
                        placeholder="hover.lift, hover.glow..."
                        data-testid="input-hover-motion"
                      />
                      <p className="text-xs text-gray-400">e.g., hover.lift, hover.glow, hover.scale</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ambientMotion" variant="dark">Ambient Motion</Label>
                      <Input
                        id="ambientMotion"
                        variant="dark"
                        value={(formData.visualConfig as any)?.ambientMotion || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          visualConfig: prev.visualConfig ? { ...prev.visualConfig, ambientMotion: e.target.value } as any : null
                        }))}
                        placeholder="ambient.float, ambient.pulse..."
                        data-testid="input-ambient-motion"
                      />
                      <p className="text-xs text-gray-400">e.g., ambient.float, ambient.shimmer</p>
                    </div>
                  </div>

                  {/* Animated Motion Preview */}
                  {(formData.visualConfig as any)?.motionPreset && (() => {
                    const selectedArchetype = MOTION_ARCHETYPES.find(a => a.key === (formData.visualConfig as any)?.motionPreset);
                    if (!selectedArchetype) return null;

                    return (
                      <div className="mt-3 p-4 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-xl border border-purple-500/30" data-testid="motion-preview-animated">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 text-xs text-purple-300">
                            <Play className="w-3 h-3" />
                            <span className="font-medium">{selectedArchetype.name}</span>
                          </div>
                          <span className="text-xs text-gray-400">{selectedArchetype.description}</span>
                        </div>

                        {/* Live Animated Preview Box */}
                        <div className="flex items-center justify-center p-6 bg-black/30 rounded-lg min-h-[120px]">
                          <SingleMotionPreview
                            archetypeKey={(formData.visualConfig as any)?.motionPreset}
                            size="lg"
                          />
                        </div>

                        <p className="text-[10px] text-gray-500 mt-2 text-center">
                          Live preview of the "{selectedArchetype.name}" motion archetype
                        </p>
                      </div>
                    );
                  })()}

                  {/* Motion Layout Link Manager */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-xs font-medium text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        <Link className="w-3 h-3" />
                        Element Motion Links
                      </h5>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className="h-6 text-xs text-gray-400 hover:text-white"
                          onClick={() => {
                            const preset = (formData.visualConfig as any)?.motionPreset || 'liquid-crystal-float';
                            setFormData(prev => ({
                              ...prev,
                              visualConfig: prev.visualConfig ? {
                                ...prev.visualConfig,
                                motionPreset: (prev.visualConfig as any)?.motionPreset || 'liquid-crystal-float',
                                elementMotions: {
                                  hero: { entrance: 'fadeUp', preset },
                                  sections: { entrance: 'stagger.children', preset },
                                  cards: { hover: 'hover.lift', preset },
                                  buttons: { hover: 'hover.glow', preset },
                                  background: { ambient: 'ambient.float', preset },
                                  images: { entrance: 'scaleIn', preset }
                                }
                              } as any : null
                            }));
                            toast({
                              title: "Motion Links Applied!",
                              description: "All page elements now have motion animations linked. Preview the effects in the animated preview above.",
                            });
                          }}
                          data-testid="button-auto-link-motions"
                        >
                          <Zap className="w-3 h-3 mr-1" /> Auto-link All
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className="h-6 text-xs text-red-400 hover:text-red-300"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              visualConfig: prev.visualConfig ? {
                                ...prev.visualConfig,
                                elementMotions: {}
                              } as any : null
                            }));
                            toast({
                              title: "Motion Links Cleared",
                              description: "All element motion links have been removed.",
                            });
                          }}
                          data-testid="button-clear-motion-links"
                        >
                          <X className="w-3 h-3 mr-1" /> Clear
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {[
                        { key: 'hero', label: 'Hero Section', defaultMotion: 'fadeUp' },
                        { key: 'sections', label: 'Content Sections', defaultMotion: 'stagger.children' },
                        { key: 'cards', label: 'Cards/Boxes', defaultMotion: 'hover.lift' },
                        { key: 'buttons', label: 'Buttons/CTAs', defaultMotion: 'hover.glow' },
                        { key: 'background', label: 'Background', defaultMotion: 'ambient.float' },
                        { key: 'images', label: 'Images', defaultMotion: 'scaleIn' }
                      ].map(slot => {
                        const elementMotions = (formData.visualConfig as any)?.elementMotions || {};
                        const currentMotion = elementMotions[slot.key];
                        const isLinked = !!currentMotion;

                        return (
                          <div
                            key={slot.key}
                            className={cn(
                              "p-2 rounded-lg border text-xs cursor-pointer transition-all",
                              isLinked
                                ? "bg-purple-500/10 border-purple-500/30 text-purple-300"
                                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                            )}
                            onClick={() => {
                              const preset = (formData.visualConfig as any)?.motionPreset || 'liquid-crystal-float';
                              setFormData(prev => ({
                                ...prev,
                                visualConfig: prev.visualConfig ? {
                                  ...prev.visualConfig,
                                  elementMotions: {
                                    ...(prev.visualConfig as any)?.elementMotions,
                                    [slot.key]: isLinked ? undefined : {
                                      entrance: slot.defaultMotion,
                                      preset
                                    }
                                  }
                                } as any : null
                              }));
                            }}
                            data-testid={`motion-slot-${slot.key}`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{slot.label}</span>
                              {isLinked ? (
                                <CheckCircle className="w-3 h-3 text-purple-400" />
                              ) : (
                                <Link className="w-3 h-3 text-gray-500" />
                              )}
                            </div>
                            {isLinked && currentMotion && (
                              <div className="mt-1 text-[10px] text-purple-400/80 truncate">
                                {currentMotion.entrance || currentMotion.hover || currentMotion.ambient || 'linked'}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {Object.keys((formData.visualConfig as any)?.elementMotions || {}).filter(k => (formData.visualConfig as any)?.elementMotions[k]).length > 0 && (
                      <div className="mt-2 flex justify-end">
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className="h-6 text-xs text-red-400 hover:text-red-300"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              visualConfig: prev.visualConfig ? {
                                ...prev.visualConfig,
                                elementMotions: {}
                              } as any : null
                            }));
                          }}
                          data-testid="button-clear-all-motions"
                        >
                          <X className="w-3 h-3 mr-1" /> Clear All
                        </Button>
                      </div>
                    )}

                    {/* AI Enhancer Suggestions Panel */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <h5 className="text-xs font-medium text-gray-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                        <Sparkles className="w-3 h-3" />
                        AI Enhancer Suggestions
                      </h5>
                      <div className="space-y-2">
                        {/* Motion-based suggestions */}
                        {!(formData.visualConfig as any)?.motionPreset && (
                          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-start justify-between gap-3" data-testid="suggestion-add-motion">
                            <div>
                              <div className="text-xs font-medium text-amber-300">Add Motion Effects</div>
                              <p className="text-[10px] text-amber-200/70 mt-0.5">Enhance page engagement with animated motion effects</p>
                            </div>
                            <Button
                              type="button"
                              size="sm"
                              className="h-6 text-xs bg-amber-600 hover:bg-amber-700 shrink-0"
                              data-testid="button-apply-motion"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  visualConfig: prev.visualConfig ? {
                                    ...prev.visualConfig,
                                    motionPreset: 'liquid-crystal-float',
                                    elementMotions: {
                                      hero: { entrance: 'fadeUp', preset: 'liquid-crystal-float' },
                                      sections: { entrance: 'stagger.children', preset: 'liquid-crystal-float' },
                                      cards: { hover: 'hover.lift', preset: 'liquid-crystal-float' },
                                      buttons: { hover: 'hover.glow', preset: 'liquid-crystal-float' },
                                      background: { ambient: 'ambient.float', preset: 'liquid-crystal-float' },
                                      images: { entrance: 'scaleIn', preset: 'liquid-crystal-float' }
                                    }
                                  } as any : null
                                }));
                                toast({ title: "Motion Applied!", description: "Liquid Crystal Float motion preset applied to all elements." });
                              }}
                            >
                              Apply
                            </Button>
                          </div>
                        )}

                        {/* Visual config suggestions */}
                        {!(formData.visualConfig as any)?.vibeKeywords?.length && (
                          <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-start justify-between gap-3" data-testid="suggestion-add-vibe">
                            <div>
                              <div className="text-xs font-medium text-purple-300">Add Vibe Keywords</div>
                              <p className="text-[10px] text-purple-200/70 mt-0.5">Define visual mood with crystalline, cosmic, energetic keywords</p>
                            </div>
                            <Button
                              type="button"
                              size="sm"
                              className="h-6 text-xs bg-purple-600 hover:bg-purple-700 shrink-0"
                              data-testid="button-apply-vibe"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  visualConfig: prev.visualConfig ? {
                                    ...prev.visualConfig,
                                    vibeKeywords: ['crystalline', 'ionic', 'transformative', 'healing']
                                  } as any : null
                                }));
                                toast({ title: "Vibe Keywords Added!", description: "Added crystalline, ionic, transformative, healing vibes." });
                              }}
                            >
                              Apply
                            </Button>
                          </div>
                        )}

                        {/* SEO suggestions */}
                        {!formData.seoTitle && formData.title && (
                          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 flex items-start justify-between gap-3" data-testid="suggestion-add-seo-title">
                            <div>
                              <div className="text-xs font-medium text-green-300">Add SEO Title</div>
                              <p className="text-[10px] text-green-200/70 mt-0.5">Improve search visibility with an optimized meta title</p>
                            </div>
                            <Button
                              type="button"
                              size="sm"
                              className="h-6 text-xs bg-green-600 hover:bg-green-700 shrink-0"
                              data-testid="button-apply-seo-title"
                              onClick={() => {
                                const seoTitle = `${formData.title} | Andara Ionic`;
                                setFormData(prev => ({ ...prev, seoTitle }));
                                toast({ title: "SEO Title Added!", description: `Set to: "${seoTitle}"` });
                              }}
                            >
                              Apply
                            </Button>
                          </div>
                        )}

                        {/* Emotional tone suggestion */}
                        {!(formData.visualConfig as any)?.emotionalTone?.length && (
                          <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-start justify-between gap-3" data-testid="suggestion-add-emotional-tone">
                            <div>
                              <div className="text-xs font-medium text-cyan-300">Add Emotional Tone</div>
                              <p className="text-[10px] text-cyan-200/70 mt-0.5">Guide content feel with wonder, clarity, empowerment tones</p>
                            </div>
                            <Button
                              type="button"
                              size="sm"
                              className="h-6 text-xs bg-cyan-600 hover:bg-cyan-700 shrink-0"
                              data-testid="button-apply-emotional-tone"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  visualConfig: prev.visualConfig ? {
                                    ...prev.visualConfig,
                                    emotionalTone: ['wonder', 'clarity', 'empowerment']
                                  } as any : null
                                }));
                                toast({ title: "Emotional Tone Set!", description: "Added wonder, clarity, empowerment tones." });
                              }}
                            >
                              Apply
                            </Button>
                          </div>
                        )}

                        {/* All suggestions applied message */}
                        {(formData.visualConfig as any)?.motionPreset &&
                          (formData.visualConfig as any)?.vibeKeywords?.length > 0 &&
                          formData.seoTitle &&
                          (formData.visualConfig as any)?.emotionalTone?.length > 0 && (
                            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-center" data-testid="all-suggestions-applied">
                              <div className="flex items-center justify-center gap-2 text-xs text-green-300">
                                <CheckCircle className="w-4 h-4" />
                                All enhancement suggestions applied!
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="aiImagePrompt" variant="dark">AI Image Prompt</Label>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleGenerateImage}
                        disabled={isGeneratingImage || !formData.visualConfig?.aiImagePrompt?.trim()}
                        className="bg-emerald-600 hover:bg-emerald-700 h-7 text-xs"
                        data-testid="button-generate-image"
                      >
                        {isGeneratingImage ? (
                          <>
                            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3 h-3 mr-1" />
                            Generate
                          </>
                        )}
                      </Button>
                      {generatedImagePreview && (
                        <>
                          <Button
                            type="button"
                            size="sm"
                            onClick={handleGenerateImage}
                            disabled={isGeneratingImage}
                            variant="outline"
                            className="border-white/20 h-7 text-xs"
                            data-testid="button-regenerate-image"
                          >
                            <RefreshCw className="w-3 h-3 mr-1" />
                            Regenerate
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            onClick={handleInsertGeneratedImage}
                            className="bg-cyan-600 hover:bg-cyan-700 h-7 text-xs"
                            data-testid="button-insert-image"
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Insert
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <Textarea
                    id="aiImagePrompt"
                    variant="dark"
                    value={formData.visualConfig.aiImagePrompt}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      visualConfig: prev.visualConfig ? { ...prev.visualConfig, aiImagePrompt: e.target.value } : null
                    }))}
                    placeholder="Detailed prompt for generating hero images..."
                    rows={3}
                    data-testid="textarea-ai-image-prompt"
                  />
                  {generatedImagePreview && (
                    <div className="mt-2 rounded-lg overflow-hidden border border-emerald-500/30 bg-black/20">
                      <img
                        src={generatedImagePreview.url}
                        alt="Generated preview"
                        className="w-full max-h-[200px] object-contain"
                        data-testid="img-generated-preview"
                      />
                      <p className="text-xs text-gray-400 p-2 border-t border-white/10">
                        {generatedImagePreview.url}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aiVideoPrompt" variant="dark">AI Video Prompt</Label>
                  <Textarea
                    id="aiVideoPrompt"
                    variant="dark"
                    value={formData.visualConfig.aiVideoPrompt}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      visualConfig: prev.visualConfig ? { ...prev.visualConfig, aiVideoPrompt: e.target.value } : null
                    }))}
                    placeholder="Detailed prompt for generating background videos..."
                    rows={3}
                    data-testid="textarea-ai-video-prompt"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="designerNotes" variant="dark">Designer Notes</Label>
                  <Textarea
                    id="designerNotes"
                    variant="dark"
                    value={formData.visualConfig.designerNotes}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      visualConfig: prev.visualConfig ? { ...prev.visualConfig, designerNotes: e.target.value } : null
                    }))}
                    placeholder="Additional notes for designers or developers..."
                    rows={2}
                    data-testid="textarea-designer-notes"
                  />
                </div>
              </div>
            )}
          </div>

          {/* AI PAGE BUILDER - Unified Chat + Prompts */}
          <div className="border-t border-white/10 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center gap-2 text-white">
                <Sparkles className="w-4 h-4" /> AI Page Builder
              </h3>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs border-white/20 bg-white/5"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      aiChatMessages: [],
                      aiChatInput: '',
                      extractedImagePrompts: []
                    } as any));
                    setFeaturedImagePrompt('');
                  }}
                  data-testid="button-new-chat"
                >
                  <Plus className="w-3 h-3 mr-1" /> New Chat
                </Button>
                {((formData as any).aiChatMessages || []).length > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs border-white/20 bg-white/5"
                    onClick={() => {
                      const messages = (formData as any).aiChatMessages || [];
                      if (messages.length === 0) return;
                      const summary = messages[0]?.content?.slice(0, 50) || 'Chat session';
                      toast({
                        title: "Chat saved",
                        description: `"${summary}..." - ${messages.length} messages`
                      });
                    }}
                    data-testid="button-save-chat"
                  >
                    <Save className="w-3 h-3 mr-1" /> Save
                  </Button>
                )}
              </div>
            </div>

            {/* Chat Messages - Gemini-style formatted */}
            <div className="space-y-4 p-4 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-lg border border-purple-500/30">
              <div className="max-h-[300px] overflow-y-auto space-y-4 mb-4" data-testid="ai-chat-messages">
                {((formData as any).aiChatMessages || []).map((msg: { role: string; content: string }, idx: number) => (
                  <div
                    key={idx}
                    className={cn(
                      "rounded-xl text-sm",
                      msg.role === 'user'
                        ? 'bg-indigo-500/20 ml-12 p-3 text-white'
                        : 'bg-white/5 mr-4 p-4 text-gray-200 border border-white/10'
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {msg.role === 'user' ? (
                        <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                          <User className="w-3.5 h-3.5 text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                          <Sparkles className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                      <span className="text-xs font-medium text-gray-400">{msg.role === 'user' ? 'You' : 'AI Assistant'}</span>
                    </div>
                    <div className="ai-markdown-content prose prose-invert prose-sm max-w-none [&_h1]:text-lg [&_h1]:font-bold [&_h1]:mt-3 [&_h1]:mb-2 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:mt-3 [&_h2]:mb-2 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mt-2 [&_h3]:mb-1 [&_p]:my-2 [&_ul]:my-2 [&_ul]:pl-4 [&_ol]:my-2 [&_ol]:pl-4 [&_li]:my-1 [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-cyan-300 [&_pre]:bg-gray-800/50 [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_blockquote]:border-l-2 [&_blockquote]:border-purple-500 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-gray-400 [&_strong]:text-white [&_strong]:font-semibold [&_em]:text-gray-300 [&_a]:text-cyan-400 [&_a]:underline">
                      <div dangerouslySetInnerHTML={{ __html: formatAiMessage(msg.content) }} />
                    </div>
                  </div>
                ))}
                {(formData as any).isGenerating && (
                  <div className="bg-white/5 mr-4 p-4 rounded-xl text-sm text-gray-200 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center animate-pulse">
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-xs font-medium text-gray-400">AI Assistant</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Thinking...</span>
                      <span className="inline-flex gap-1">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <Textarea
                  variant="dark"
                  placeholder="Paste your ANDARA VISUAL CONFIG + HTML here, or ask AI to help build this page..."
                  rows={6}
                  value={(formData as any).aiChatInput || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, aiChatInput: e.target.value } as any))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && (formData as any).aiChatInput?.trim()) {
                      e.preventDefault();
                      (document.getElementById('ai-send-btn') as HTMLButtonElement)?.click();
                    }
                  }}
                  className="flex-1 text-sm min-h-[120px] md:min-h-[100px]"
                  data-testid="input-ai-chat"
                />
                <Button
                  id="ai-send-btn"
                  type="button"
                  size="sm"
                  disabled={(formData as any).isGenerating || !(formData as any).aiChatInput?.trim()}
                  onClick={async () => {
                    const userMessage = (formData as any).aiChatInput?.trim();
                    if (!userMessage) return;

                    const messages = [...((formData as any).aiChatMessages || []), { role: 'user', content: userMessage }];
                    setFormData(prev => ({ ...prev, aiChatMessages: messages, aiChatInput: '', isGenerating: true } as any));

                    try {
                      const token = getAuthToken();
                      const res = await fetch('/api/admin-chat', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                        body: JSON.stringify({
                          messages: messages.map(m => ({ role: m.role, content: m.content })),
                          pageContext: { title: formData.title, path: formData.path, cluster: formData.clusterKey }
                        }),
                      });
                      if (!res.ok) throw new Error('Failed to get AI response');
                      const data = await res.json();

                      const extractedData = extractAllFromAiResponse(data.response);
                      if (extractedData.featuredImage && !featuredImagePrompt) {
                        setFeaturedImagePrompt(extractedData.featuredImage);
                      }

                      setFormData(prev => ({
                        ...prev,
                        aiChatMessages: [...messages, { role: 'assistant', content: data.response }],
                        extractedImagePrompts: extractedData.images,
                        extractedVisualConfig: extractedData.visualConfig,
                        isGenerating: false
                      } as any));
                    } catch (error) {
                      console.error('AI chat error:', error);
                      setFormData(prev => ({
                        ...prev,
                        aiChatMessages: [...messages, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }],
                        isGenerating: false
                      } as any));
                    }
                  }}
                  data-testid="button-ai-send"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Suggested Prompts Box */}
              <div className="border-t border-white/10 pt-4 mt-4">
                <Label className="text-xs text-gray-400 mb-2 block">Suggested Prompts</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Generate SEO', prompt: `Generate SEO title and description for a page about "${formData.title || 'this topic'}"` },
                    { label: 'Write Hero', prompt: `Write a compelling hero section for "${formData.title || 'this page'}" that captures attention` },
                    { label: 'Create Benefits', prompt: `Create 3-4 key benefits or features for "${formData.title || 'this product/topic'}"` },
                    { label: 'Write FAQ', prompt: `Write 4-5 FAQ questions and answers about "${formData.title || 'this topic'}"` },
                    { label: 'Image Prompts', prompt: `Suggest 3 AI image generation prompts for "${formData.title || 'this page'}"` },
                  ].map((item, idx) => (
                    <Button
                      key={idx}
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-xs h-8 border-white/20 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                      disabled={(formData as any).isGenerating}
                      onClick={() => setFormData(prev => ({ ...prev, aiChatInput: item.prompt } as any))}
                      data-testid={`button-prompt-${idx}`}
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* AI Enhancement Tasks - Auto-detected from content */}
              {(() => {
                const content = formData.content || (formData as any).aiChatInput || '';
                const { tasks } = parseVisualConfigFromContent(content);
                const selectedTasks = (formData as any).selectedEnhancementTasks || tasks.map(t => t.id);
                const missingFields: EnhancementTask[] = [];
                const detectedSeoTitle = tasks.find(t => t.id === 'title')?.value;
                const detectedSeoDesc = tasks.find(t => t.id === 'seoDescription')?.value;
                if (!formData.seoTitle && !detectedSeoTitle) missingFields.push({ id: 'seoTitle', label: 'SEO Title', description: 'Required for search optimization', field: 'seoTitle', detected: false, missing: true });
                if (!formData.seoDescription && !detectedSeoDesc) missingFields.push({ id: 'seoDescription_missing', label: 'SEO Description', description: 'Required for search optimization', field: 'seoDescription', detected: false, missing: true });
                if (!formData.seoFocus) missingFields.push({ id: 'seoFocus', label: 'Focus Keyword', description: 'Primary keyword for SEO', field: 'seoFocus', detected: false, missing: true });
                const allTasks = [...tasks, ...missingFields];
                if (allTasks.length === 0) return null;
                return (
                  <div className="border-t border-white/10 pt-4 mt-4">
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-xs text-gray-400 flex items-center gap-2">
                        <Wand2 className="w-3.5 h-3.5" /> AI Enhancement Tasks
                      </Label>
                      {tasks.length > 0 && (
                        <Badge className="bg-green-500/20 text-green-400 text-xs">
                          {tasks.length} detected
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                      {allTasks.map(task => (
                        <label
                          key={task.id}
                          className={cn(
                            "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all",
                            task.missing ? "bg-amber-500/10 border border-amber-500/30" : "bg-white/5 border border-white/10 hover:bg-white/10",
                            selectedTasks.includes(task.id) && "ring-1 ring-purple-500/50"
                          )}
                        >
                          <Checkbox
                            checked={selectedTasks.includes(task.id)}
                            onCheckedChange={(checked) => {
                              setFormData(prev => ({
                                ...prev,
                                selectedEnhancementTasks: checked
                                  ? [...selectedTasks, task.id]
                                  : selectedTasks.filter((id: string) => id !== task.id)
                              } as any));
                            }}
                            className="mt-0.5"
                            data-testid={`checkbox-task-${task.id}`}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-white">{task.label}</span>
                              {task.missing && (
                                <Badge className="bg-amber-500/20 text-amber-400 text-[10px]">Missing</Badge>
                              )}
                              {task.detected && (
                                <Badge className="bg-green-500/20 text-green-400 text-[10px]">Detected</Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-400 truncate">{task.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                    {selectedTasks.length > 0 && (
                      <Button
                        type="button"
                        size="sm"
                        className="mt-3 w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
                        onClick={() => {
                          const { tasks: detectedTasks, config, htmlBody } = parseVisualConfigFromContent(content);
                          const updates: any = {};
                          const visualConfigUpdates: any = {};
                          const visualConfigFields = ['vibeKeywords', 'emotionalTone', 'aiImagePrompt', 'aiVideoPrompt', 'designerNotes', 'pageId'];
                          selectedTasks.forEach((taskId: string) => {
                            const task = detectedTasks.find(t => t.id === taskId);
                            if (task?.value) {
                              if (visualConfigFields.includes(task.field)) {
                                visualConfigUpdates[task.field] = task.value;
                              } else {
                                updates[task.field] = task.value;
                              }
                            }
                          });
                          if (htmlBody && selectedTasks.includes('htmlContent')) {
                            updates.content = htmlBody;
                            setRawHtmlMode(true);
                          }
                          if (Object.keys(visualConfigUpdates).length > 0) {
                            updates.visualConfig = {
                              ...(formData.visualConfig || { pageId: '', cluster: '', priority: 'P2', vibeKeywords: [], emotionalTone: [], animationIdeas: [], aiImagePrompt: '', aiVideoPrompt: '', designerNotes: '' }),
                              ...visualConfigUpdates
                            };
                          }
                          const updateCount = Object.keys(updates).length + Object.keys(visualConfigUpdates).length;
                          if (updateCount > 0) {
                            setFormData(prev => ({ ...prev, ...updates }));
                            const hasHtml = updates.content ? ' (including HTML content)' : '';
                            toast({ title: 'Applied enhancements', description: `Updated ${updateCount} fields${hasHtml}` });
                          }
                        }}
                        data-testid="button-apply-enhancements"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Apply {selectedTasks.length} Enhancement{selectedTasks.length !== 1 ? 's' : ''}
                      </Button>
                    )}
                  </div>
                );
              })()}

              {/* Extracted Visual Config from AI Response */}
              {(formData as any).extractedVisualConfig && Object.keys((formData as any).extractedVisualConfig).length > 0 && (
                <div className="border-t border-white/10 pt-4 mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-xs text-gray-400 flex items-center gap-2">
                      <Palette className="w-3.5 h-3.5" /> AI Visual Config Detected
                    </Label>
                    <Button
                      type="button"
                      size="sm"
                      className="h-7 text-xs bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                      onClick={() => {
                        const extracted = (formData as any).extractedVisualConfig || {};
                        const currentConfig = formData.visualConfig || { pageId: '', cluster: '', priority: 'P2', vibeKeywords: [], emotionalTone: [], animationIdeas: [], aiImagePrompt: '', aiVideoPrompt: '', designerNotes: '' };

                        const updates: any = { ...currentConfig };
                        if (extracted.vibeKeywords?.length) updates.vibeKeywords = extracted.vibeKeywords;
                        if (extracted.emotionalTone?.length) updates.emotionalTone = extracted.emotionalTone;
                        if (extracted.motionPreset) updates.designerNotes = `Motion: ${extracted.motionPreset}\n${extracted.entranceMotion ? `Entrance: ${extracted.entranceMotion}\n` : ''}${extracted.hoverMotion ? `Hover: ${extracted.hoverMotion}\n` : ''}${extracted.ambientMotion ? `Ambient: ${extracted.ambientMotion}` : ''}`.trim();
                        if (extracted.layoutsDetected?.length) updates.animationIdeas = extracted.layoutsDetected;

                        const heroPrompt = (formData as any).extractedImagePrompts?.find((i: any) => i.label.toLowerCase().includes('hero'))?.prompt;
                        if (heroPrompt) updates.aiImagePrompt = heroPrompt;

                        setFormData(prev => ({ ...prev, visualConfig: updates }));
                        toast({ title: 'Visual Config Applied', description: `Updated vibe keywords, emotional tone, motion presets and layouts` });
                      }}
                      data-testid="button-apply-visual-config"
                    >
                      <Wand2 className="w-3 h-3 mr-1" /> Apply All
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 p-3 bg-white/5 rounded-lg border border-white/10">
                    {(formData as any).extractedVisualConfig.vibeKeywords?.length > 0 && (
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase mb-1">Vibe Keywords</div>
                        <div className="flex flex-wrap gap-1">
                          {(formData as any).extractedVisualConfig.vibeKeywords.slice(0, 5).map((kw: string, i: number) => (
                            <span key={i} className="px-1.5 py-0.5 bg-purple-500/20 text-purple-300 text-[10px] rounded">{kw}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {(formData as any).extractedVisualConfig.emotionalTone?.length > 0 && (
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase mb-1">Emotional Tone</div>
                        <div className="flex flex-wrap gap-1">
                          {(formData as any).extractedVisualConfig.emotionalTone.slice(0, 4).map((t: string, i: number) => (
                            <span key={i} className="px-1.5 py-0.5 bg-cyan-500/20 text-cyan-300 text-[10px] rounded">{t}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {(formData as any).extractedVisualConfig.layoutsDetected?.length > 0 && (
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase mb-1">Layouts</div>
                        <div className="text-xs text-gray-300">{(formData as any).extractedVisualConfig.layoutsDetected.join(', ')}</div>
                      </div>
                    )}
                    {(formData as any).extractedVisualConfig.motionPreset && (
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase mb-1">Motion</div>
                        <div className="text-xs text-gray-300">{(formData as any).extractedVisualConfig.motionPreset}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Extracted Image Prompts from AI Response */}
              {((formData as any).extractedImagePrompts || []).length > 0 && (
                <div className="border-t border-white/10 pt-4 mt-4">
                  <Label className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                    <ImageIcon className="w-3.5 h-3.5" /> Suggested Images from AI
                  </Label>
                  <div className="space-y-2">
                    {((formData as any).extractedImagePrompts || []).map((img: { label: string; prompt: string }, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-purple-300">{img.label}</div>
                          <div className="text-xs text-gray-400 line-clamp-2">{img.prompt}</div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs border-white/20 bg-white/5"
                            onClick={() => setFeaturedImagePrompt(img.prompt)}
                            data-testid={`button-use-prompt-featured-${idx}`}
                          >
                            <ImageIcon className="w-3 h-3 mr-1" /> Featured
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs border-white/20 bg-white/5"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                visualConfig: {
                                  ...(prev.visualConfig || { pageId: '', cluster: '', priority: 'P2', vibeKeywords: [], emotionalTone: [], animationIdeas: [], aiImagePrompt: '', aiVideoPrompt: '', designerNotes: '' }),
                                  aiImagePrompt: img.prompt
                                }
                              }));
                              toast({ title: "Applied", description: "Set as Hero Image prompt" });
                            }}
                            data-testid={`button-use-prompt-hero-${idx}`}
                          >
                            <Sparkles className="w-3 h-3 mr-1" /> Hero
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* File Upload Section */}
              <div className="border-t border-white/10 pt-4 mt-4">
                <Label className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                  <Paperclip className="w-3.5 h-3.5" /> Attach Files
                </Label>
                <div
                  className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center hover:border-purple-500/50 transition-colors cursor-pointer"
                  onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); e.currentTarget.classList.add('border-purple-500', 'bg-purple-500/10'); }}
                  onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); e.currentTarget.classList.remove('border-purple-500', 'bg-purple-500/10'); }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.currentTarget.classList.remove('border-purple-500', 'bg-purple-500/10');
                    const files = Array.from(e.dataTransfer.files);
                    if (files.length > 0) {
                      const currentFiles = (formData as any).attachedFiles || [];
                      setFormData(prev => ({ ...prev, attachedFiles: [...currentFiles, ...files] } as any));
                    }
                  }}
                  onClick={() => document.getElementById('ai-file-input')?.click()}
                  data-testid="dropzone-files"
                >
                  <input
                    type="file"
                    id="ai-file-input"
                    className="hidden"
                    multiple
                    accept=".txt,.md,.html,.css,.json,.pdf,.doc,.docx"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      if (files.length > 0) {
                        const currentFiles = (formData as any).attachedFiles || [];
                        setFormData(prev => ({ ...prev, attachedFiles: [...currentFiles, ...files] } as any));
                      }
                    }}
                  />
                  <Upload className="w-6 h-6 mx-auto mb-2 text-gray-500" />
                  <p className="text-xs text-gray-400">Drop files here or click to upload</p>
                  <p className="text-[10px] text-gray-500 mt-1">TXT, MD, HTML, CSS, JSON, PDF, DOC</p>
                </div>
                {((formData as any).attachedFiles || []).length > 0 && (
                  <div className="mt-3 space-y-2">
                    {((formData as any).attachedFiles || []).map((file: File, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
                        <FileTextIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-300 flex-1 truncate">{file.name}</span>
                        <span className="text-[10px] text-gray-500">{(file.size / 1024).toFixed(1)} KB</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-gray-400 hover:text-red-400"
                          onClick={() => {
                            const files = (formData as any).attachedFiles.filter((_: File, i: number) => i !== idx);
                            setFormData(prev => ({ ...prev, attachedFiles: files } as any));
                          }}
                          data-testid={`button-remove-file-${idx}`}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-white/10">
            <div>
              {!isNew && page && onDelete && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  data-testid="button-delete-page"
                >
                  <Trash className="w-4 h-4 mr-2" /> Delete Page
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose} className="border-white/20 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white" data-testid="button-cancel">
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving} className="bg-indigo-600 hover:bg-indigo-700 text-white" data-testid="button-save-page">
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : (isNew ? 'Create Page' : 'Save Changes')}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [isPageEditorOpen, setIsPageEditorOpen] = useState(false);
  const [isCreatingNewPage, setIsCreatingNewPage] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductEditorOpen, setIsProductEditorOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isArticleEditorOpen, setIsArticleEditorOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isDocumentEditorOpen, setIsDocumentEditorOpen] = useState(false);
  const [viewingChunksDocId, setViewingChunksDocId] = useState<string | null>(null);
  const [viewingChunksDocTitle, setViewingChunksDocTitle] = useState<string>("");
  const [isScanning, setIsScanning] = useState(false);
  const [isGeneratingMagic, setIsGeneratingMagic] = useState(false);
  const [magicProcessingId, setMagicProcessingId] = useState<string | null>(null);
  const [indexingDocId, setIndexingDocId] = useState<string | null>(null);
  const [isAutoGeneratingRules, setIsAutoGeneratingRules] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [saveLogOpen, setSaveLogOpen] = useState(false);
  const [saveLogTasks, setSaveLogTasks] = useState<Array<{ task: string; status: 'pending' | 'success' | 'error'; timestamp: Date }>>([]);
  const [selectedHtmlTemplate, setSelectedHtmlTemplate] = useState<HtmlTemplate | null>(null);
  const [isTemplateEditorOpen, setIsTemplateEditorOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setIsCheckingAuth(false);
      return;
    }
    fetch("/api/admin/me", {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          clearAuthToken();
        }
      })
      .finally(() => setIsCheckingAuth(false));
  }, []);

  const { data: stats } = useQuery<ContentStats>({
    queryKey: ["/api/admin/stats"],
    enabled: isAuthenticated,
  });

  const { data: pageTree = [] } = useQuery<Page[]>({
    queryKey: ["/api/pages?tree=true"],
    enabled: isAuthenticated,
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    enabled: isAuthenticated,
  });

  const { data: articles = [] } = useQuery<Article[]>({
    queryKey: ["/api/science-articles"],
    enabled: isAuthenticated,
  });

  const { data: clusters = [] } = useQuery<Cluster[]>({
    queryKey: ["/api/clusters"],
    enabled: isAuthenticated,
  });

  const { data: documents = [] } = useQuery<Document[]>({
    queryKey: ["/api/admin/documents"],
    enabled: isAuthenticated,
  });

  const { data: seoKeywords = [] } = useQuery<SeoKeyword[]>({
    queryKey: ["/api/admin/seo-keywords"],
    enabled: isAuthenticated,
  });

  const { data: magicPages = [] } = useQuery<MagicPageSuggestion[]>({
    queryKey: ["/api/admin/magic-pages"],
    enabled: isAuthenticated,
  });

  const { data: linkingRules = [] } = useQuery<LinkingRule[]>({
    queryKey: ["/api/admin/linking-rules"],
    enabled: isAuthenticated,
  });

  const { data: ctaTemplates = [] } = useQuery<CtaTemplate[]>({
    queryKey: ["/api/admin/cta-templates"],
    enabled: isAuthenticated,
  });

  const { data: cmsSettings = [] } = useQuery<CmsSetting[]>({
    queryKey: ["/api/admin/settings"],
    enabled: isAuthenticated,
  });

  const { data: htmlTemplates = [] } = useQuery<HtmlTemplate[]>({
    queryKey: ["/api/admin/html-templates"],
    enabled: isAuthenticated,
  });

  const createPageMutation = useMutation({
    mutationFn: async (data: PageFormData) => {
      const res = await apiRequest("POST", "/api/admin/pages", data);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to create page');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pages?tree=true"], refetchType: 'all' });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"], refetchType: 'all' });
      queryClient.invalidateQueries({
        predicate: (query) =>
          typeof query.queryKey[0] === 'string' && query.queryKey[0].startsWith('/api/pages/by-path'),
        refetchType: 'all'
      });
      queryClient.invalidateQueries({
        predicate: (query) =>
          typeof query.queryKey[0] === 'string' && query.queryKey[0].startsWith('/api/pages/by-key'),
        refetchType: 'all'
      });
      toast({ title: "✅ Page Created", description: "Your new page is ready for editing." });
    },
    onError: (error: Error) => {
      if (error.message.includes('Authentication')) {
        setIsAuthenticated(false);
        toast({ title: "Session expired", description: "Please log in again.", variant: "destructive" });
      } else {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      }
    },
  });

  const updatePageMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<PageFormData> }) => {
      const res = await apiRequest("PUT", `/api/admin/pages/${id}`, data);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to update page');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pages?tree=true"], refetchType: 'all' });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"], refetchType: 'all' });
      queryClient.invalidateQueries({
        predicate: (query) =>
          typeof query.queryKey[0] === 'string' && query.queryKey[0].startsWith('/api/pages/by-path'),
        refetchType: 'all'
      });
      queryClient.invalidateQueries({
        predicate: (query) =>
          typeof query.queryKey[0] === 'string' && query.queryKey[0].startsWith('/api/pages/by-key'),
        refetchType: 'all'
      });
      toast({ title: "💾 Changes Saved", description: "Your page updates have been saved." });
    },
    onError: (error: Error) => {
      if (error.message.includes('Authentication')) {
        setIsAuthenticated(false);
        toast({ title: "Session expired", description: "Please log in again.", variant: "destructive" });
      } else {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      }
    },
  });

  const deletePageMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/admin/pages/${id}`);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to delete page');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pages?tree=true"], refetchType: 'all' });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"], refetchType: 'all' });
      queryClient.invalidateQueries({
        predicate: (query) =>
          typeof query.queryKey[0] === 'string' && query.queryKey[0].startsWith('/api/pages/by-path'),
        refetchType: 'all'
      });
      queryClient.invalidateQueries({
        predicate: (query) =>
          typeof query.queryKey[0] === 'string' && query.queryKey[0].startsWith('/api/pages/by-key'),
        refetchType: 'all'
      });
      toast({ title: "🗑️ Page Deleted", description: "The page has been permanently removed." });
    },
    onError: (error: Error) => {
      if (error.message.includes('Authentication')) {
        setIsAuthenticated(false);
        toast({ title: "Session expired", description: "Please log in again.", variant: "destructive" });
      } else {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      }
    },
  });

  const createProductMutation = useMutation({
    mutationFn: async (data: ProductFormData) => {
      const res = await apiRequest("POST", "/api/admin/products", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({ title: "🛍️ Product Created", description: "New product added to your shop." });
    },
    onError: (error: Error) => {
      toast({ title: "❌ Error", description: error.message || "Failed to create product", variant: "destructive" });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ProductFormData> }) => {
      const res = await apiRequest("PUT", `/api/admin/products/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "💾 Product Saved", description: "Product details updated." });
    },
    onError: (error: Error) => {
      toast({ title: "❌ Error", description: error.message || "Failed to update product", variant: "destructive" });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/admin/products/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({ title: "🗑️ Product Deleted", description: "Product removed from shop." });
    },
    onError: (error: Error) => {
      toast({ title: "❌ Error", description: error.message || "Failed to delete product", variant: "destructive" });
    },
  });

  const updateClusterMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Cluster> }) => {
      const res = await apiRequest("PUT", `/api/admin/clusters/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/clusters"] });
      toast({ title: "✨ Cluster Updated", description: "Visual vibe saved successfully." });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message || "Failed to update cluster", variant: "destructive" });
    },
  });

  const handleUpdateCluster = async (id: string, data: Partial<Cluster>) => {
    await updateClusterMutation.mutateAsync({ id, data });
  };

  const createArticleMutation = useMutation({
    mutationFn: async (data: ArticleFormData) => {
      const res = await apiRequest("POST", "/api/admin/science-articles", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/science-articles"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({ title: "📚 Article Created", description: "New science article published." });
    },
    onError: (error: Error) => {
      toast({ title: "❌ Error", description: error.message || "Failed to create article", variant: "destructive" });
    },
  });

  const updateArticleMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ArticleFormData> }) => {
      const res = await apiRequest("PUT", `/api/admin/science-articles/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/science-articles"] });
      toast({ title: "💾 Article Saved", description: "Article content updated." });
    },
    onError: (error: Error) => {
      toast({ title: "❌ Error", description: error.message || "Failed to update article", variant: "destructive" });
    },
  });

  const deleteArticleMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/admin/science-articles/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/science-articles"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({ title: "🗑️ Article Deleted", description: "Article permanently removed." });
    },
    onError: (error: Error) => {
      toast({ title: "❌ Error", description: error.message || "Failed to delete article", variant: "destructive" });
    },
  });

  const createDocumentMutation = useMutation({
    mutationFn: async (data: DocumentFormData) => {
      const res = await apiRequest("POST", "/api/admin/documents", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/documents"] });
      toast({ title: "📄 Document Created", description: "New document added to knowledge base." });
    },
    onError: (error: Error) => {
      toast({ title: "❌ Error", description: error.message || "Failed to create document", variant: "destructive" });
    },
  });

  const updateDocumentMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<DocumentFormData> }) => {
      const res = await apiRequest("PUT", `/api/admin/documents/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/documents"] });
      toast({ title: "💾 Document Saved", description: "Document content updated." });
    },
    onError: (error: Error) => {
      toast({ title: "❌ Error", description: error.message || "Failed to update document", variant: "destructive" });
    },
  });

  const deleteDocumentMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/admin/documents/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/documents"] });
      toast({ title: "🗑️ Document Deleted", description: "Document removed from knowledge base." });
    },
    onError: (error: Error) => {
      toast({ title: "❌ Error", description: error.message || "Failed to delete document", variant: "destructive" });
    },
  });

  const indexDocumentMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("POST", `/api/admin/documents/${id}/index`, {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/documents"] });
      toast({ title: "📥 Document Indexed", description: "Document ingested into RAG knowledge base." });
    },
    onError: (error: Error) => {
      toast({ title: "❌ Indexing Failed", description: error.message || "Failed to index document", variant: "destructive" });
    },
  });

  const createSeoKeywordMutation = useMutation({
    mutationFn: async (data: { keyword: string; searchIntent: string; targetClusterKey?: string; notes?: string }) => {
      const res = await apiRequest("POST", "/api/admin/seo-keywords", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-keywords"] });
      toast({ title: "🔍 Keyword Added", description: "SEO keyword saved for tracking." });
    },
    onError: (error: Error) => {
      toast({ title: "❌ Error", description: error.message || "Failed to add keyword", variant: "destructive" });
    },
  });

  const updateSeoKeywordMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<SeoKeyword> }) => {
      const res = await apiRequest("PUT", `/api/admin/seo-keywords/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-keywords"] });
      toast({ title: "💾 Keyword Updated", description: "SEO keyword details saved." });
    },
    onError: (error: Error) => {
      toast({ title: "❌ Error", description: error.message || "Failed to update keyword", variant: "destructive" });
    },
  });

  const deleteSeoKeywordMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/admin/seo-keywords/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-keywords"] });
      toast({ title: "🗑️ Keyword Deleted", description: "SEO keyword removed." });
    },
    onError: (error: Error) => {
      toast({ title: "❌ Error", description: error.message || "Failed to delete keyword", variant: "destructive" });
    },
  });

  const scanDocumentMutation = useMutation({
    mutationFn: async (documentId: string) => {
      const res = await apiRequest("POST", `/api/admin/seo/scan-document/${documentId}`, {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-keywords"] });
      toast({ title: "🔍 Document Scanned", description: "Keywords extracted from document." });
    },
    onError: (error: Error) => {
      toast({ title: "❌ Scan Failed", description: error.message || "Failed to scan document", variant: "destructive" });
    },
  });

  const generateSuggestionsMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/admin/magic-pages/suggest", {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/magic-pages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-keywords"] });
      toast({ title: "🪄 Suggestions Generated", description: "AI found new page opportunities." });
    },
    onError: (error: Error) => {
      toast({ title: "❌ Generation Failed", description: error.message || "Failed to generate suggestions", variant: "destructive" });
    },
  });

  const generateOutlineMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("POST", `/api/admin/magic-pages/${id}/outline`, {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/magic-pages"] });
      toast({ title: "📝 Outline Generated", description: "Page structure created." });
    },
    onError: (error: Error) => {
      toast({ title: "❌ Error", description: error.message || "Failed to generate outline", variant: "destructive" });
    },
  });

  const generateDraftMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("POST", `/api/admin/magic-pages/${id}/draft`, {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/magic-pages"] });
      toast({ title: "✍️ Draft Generated", description: "Page content ready for review." });
    },
    onError: (error: Error) => {
      toast({ title: "❌ Error", description: error.message || "Failed to generate draft", variant: "destructive" });
    },
  });

  const publishMagicPageMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("POST", `/api/admin/magic-pages/${id}/publish`, {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/magic-pages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/pages?tree=true"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({ title: "🚀 Page Published!", description: "Magic page is now live on your site." });
    },
    onError: (error: Error) => {
      toast({ title: "❌ Publish Failed", description: error.message || "Failed to publish page", variant: "destructive" });
    },
  });

  const rejectMagicPageMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("POST", `/api/admin/magic-pages/${id}/reject`, {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/magic-pages"] });
      toast({ title: "❎ Page Rejected", description: "Magic page suggestion dismissed." });
    },
    onError: (error: Error) => {
      toast({ title: "❌ Error", description: error.message || "Failed to reject page", variant: "destructive" });
    },
  });

  const createLinkingRuleMutation = useMutation({
    mutationFn: async (data: Omit<LinkingRule, 'id' | 'createdAt' | 'updatedAt'>) => {
      const res = await apiRequest("POST", "/api/admin/linking-rules", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/linking-rules"] });
      toast({ title: "🔗 Rule Created", description: "Internal linking rule added." });
    },
    onError: (error: Error) => {
      toast({ title: "❌ Error", description: error.message || "Failed to create rule", variant: "destructive" });
    },
  });

  const updateLinkingRuleMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<LinkingRule> }) => {
      const res = await apiRequest("PUT", `/api/admin/linking-rules/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/linking-rules"] });
      toast({ title: "💾 Rule Updated", description: "Linking rule saved." });
    },
    onError: (error: Error) => {
      toast({ title: "❌ Error", description: error.message || "Failed to update rule", variant: "destructive" });
    },
  });

  const deleteLinkingRuleMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/admin/linking-rules/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/linking-rules"] });
      toast({ title: "🗑️ Rule Deleted", description: "Linking rule removed." });
    },
    onError: (error: Error) => {
      toast({ title: "❌ Error", description: error.message || "Failed to delete rule", variant: "destructive" });
    },
  });

  const autoGenerateRulesMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/admin/linking-rules/auto-generate", {});
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/linking-rules"] });
      toast({ title: "✨ Rules Auto-Generated", description: `${data?.rulesCreated || 'New'} linking rules created by AI.` });
    },
    onError: (error: Error) => {
      toast({ title: "❌ Error", description: error.message || "Failed to generate rules", variant: "destructive" });
    },
  });

  const createCtaTemplateMutation = useMutation({
    mutationFn: async (data: Omit<CtaTemplate, 'id' | 'createdAt' | 'updatedAt'>) => {
      const res = await apiRequest("POST", "/api/admin/cta-templates", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/cta-templates"] });
      toast({ title: "📣 CTA Created", description: "New call-to-action template added." });
    },
    onError: (error: Error) => {
      toast({ title: "❌ Error", description: error.message || "Failed to create CTA", variant: "destructive" });
    },
  });

  const updateCtaTemplateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CtaTemplate> }) => {
      const res = await apiRequest("PUT", `/api/admin/cta-templates/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/cta-templates"] });
      toast({ title: "💾 CTA Updated", description: "Template saved." });
    },
    onError: (error: Error) => {
      toast({ title: "❌ Error", description: error.message || "Failed to update CTA", variant: "destructive" });
    },
  });

  const deleteCtaTemplateMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/admin/cta-templates/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/cta-templates"] });
      toast({ title: "🗑️ CTA Deleted", description: "Template removed." });
    },
    onError: (error: Error) => {
      toast({ title: "❌ Error", description: error.message || "Failed to delete CTA", variant: "destructive" });
    },
  });

  const updateSettingMutation = useMutation({
    mutationFn: async ({ key, value, description, category }: { key: string; value: any; description: string; category: string }) => {
      const res = await apiRequest("PUT", `/api/admin/settings/${key}`, { value, description, category });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] });
      toast({ title: "⚙️ Setting Saved", description: "Your configuration has been updated." });
    },
    onError: (error: Error) => {
      toast({ title: "❌ Error", description: error.message || "Failed to save setting", variant: "destructive" });
    },
  });

  const createHtmlTemplateMutation = useMutation({
    mutationFn: async (data: HtmlTemplateFormData) => {
      const res = await apiRequest("POST", "/api/admin/html-templates", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/html-templates"] });
      toast({ title: "📃 Template Created", description: "New HTML template added." });
    },
  });

  const updateHtmlTemplateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<HtmlTemplateFormData> }) => {
      const res = await apiRequest("PUT", `/api/admin/html-templates/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/html-templates"] });
      toast({ title: "Template saved", description: "Your changes have been saved successfully." });
    },
  });

  const deleteHtmlTemplateMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/admin/html-templates/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/html-templates"] });
      toast({ title: "Template deleted", description: "The template has been deleted." });
    },
  });

  const handleLogout = async () => {
    clearAuthToken();
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
    queryClient.clear();
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries();
  };

  const handleEditPage = (page: Page) => {
    setSelectedPage(page);
    setIsCreatingNewPage(false);
    setIsPageEditorOpen(true);
  };

  const handleCreateNewPage = () => {
    setSelectedPage(null);
    setIsCreatingNewPage(true);
    setIsPageEditorOpen(true);
  };

  const handleSavePage = async (data: PageFormData, isNew: boolean) => {
    const tasks: Array<{ task: string; status: 'pending' | 'success' | 'error'; timestamp: Date }> = [];

    const addTask = (task: string, status: 'pending' | 'success' | 'error' = 'pending') => {
      tasks.push({ task, status, timestamp: new Date() });
      setSaveLogTasks([...tasks]);
    };

    const updateTaskStatus = (taskIndex: number, status: 'success' | 'error') => {
      tasks[taskIndex].status = status;
      setSaveLogTasks([...tasks]);
    };

    setSaveLogOpen(true);
    setSaveLogTasks([]);

    addTask('Validating form data');
    const sanitizedData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      if (value === '') {
        sanitizedData[key] = null;
      } else {
        sanitizedData[key] = value;
      }
    }
    updateTaskStatus(0, 'success');

    addTask('Preparing content for save');
    await new Promise(resolve => setTimeout(resolve, 100));
    updateTaskStatus(1, 'success');

    try {
      if (isNew) {
        addTask('Creating new page in database');
        await createPageMutation.mutateAsync(sanitizedData as PageFormData);
        updateTaskStatus(2, 'success');
      } else if (selectedPage) {
        addTask('Updating existing page in database');
        await updatePageMutation.mutateAsync({ id: selectedPage.id, data: sanitizedData as Partial<PageFormData> });
        updateTaskStatus(2, 'success');
      }

      addTask('Refreshing page tree');
      await new Promise(resolve => setTimeout(resolve, 200));
      updateTaskStatus(3, 'success');

      addTask('Save completed successfully');
      updateTaskStatus(4, 'success');
    } catch (error) {
      const lastTaskIndex = tasks.length - 1;
      updateTaskStatus(lastTaskIndex, 'error');
      addTask(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      updateTaskStatus(tasks.length - 1, 'error');
    }
  };

  const handleDeletePage = async (id: string) => {
    await deletePageMutation.mutateAsync(id);
  };

  const handleClosePageEditor = () => {
    setIsPageEditorOpen(false);
    setSelectedPage(null);
    setIsCreatingNewPage(false);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductEditorOpen(true);
  };

  const handleCreateNewProduct = () => {
    setSelectedProduct(null);
    setIsProductEditorOpen(true);
  };

  const handleSaveProduct = async (data: ProductFormData, productId: string | null) => {
    if (productId) {
      await updateProductMutation.mutateAsync({ id: productId, data });
    } else {
      await createProductMutation.mutateAsync(data);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProductMutation.mutateAsync(id);
  };

  const handleCloseProductEditor = () => {
    setIsProductEditorOpen(false);
    setSelectedProduct(null);
  };

  const handleEditArticle = (article: Article) => {
    setSelectedArticle(article);
    setIsArticleEditorOpen(true);
  };

  const handleCreateNewArticle = () => {
    setSelectedArticle(null);
    setIsArticleEditorOpen(true);
  };

  const handleSaveArticle = async (data: ArticleFormData, articleId: string | null) => {
    if (articleId) {
      await updateArticleMutation.mutateAsync({ id: articleId, data });
    } else {
      await createArticleMutation.mutateAsync(data);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    await deleteArticleMutation.mutateAsync(id);
  };

  const handleCloseArticleEditor = () => {
    setIsArticleEditorOpen(false);
    setSelectedArticle(null);
  };

  const handleEditDocument = (doc: Document) => {
    setSelectedDocument(doc);
    setIsDocumentEditorOpen(true);
  };

  const handleCreateNewDocument = () => {
    setSelectedDocument(null);
    setIsDocumentEditorOpen(true);
  };

  const handleSaveDocument = async (data: DocumentFormData, documentId: string | null) => {
    if (documentId) {
      await updateDocumentMutation.mutateAsync({ id: documentId, data });
    } else {
      await createDocumentMutation.mutateAsync(data);
    }
  };

  const handleDeleteDocument = async (id: string) => {
    await deleteDocumentMutation.mutateAsync(id);
  };

  const handleIndexDocument = async (id: string) => {
    setIndexingDocId(id);
    try {
      await indexDocumentMutation.mutateAsync(id);
    } finally {
      setIndexingDocId(null);
    }
  };

  const handleCloseDocumentEditor = () => {
    setIsDocumentEditorOpen(false);
    setSelectedDocument(null);
  };

  const handleViewChunks = (documentId: string) => {
    const doc = documents.find(d => d.id === documentId);
    setViewingChunksDocId(documentId);
    setViewingChunksDocTitle(doc?.title || 'Document');
  };

  const handleCloseChunks = () => {
    setViewingChunksDocId(null);
    setViewingChunksDocTitle("");
  };

  const handleSeoStatusChange = async (keywordId: string, newStatus: SeoKeyword['status']) => {
    await updateSeoKeywordMutation.mutateAsync({ id: keywordId, data: { status: newStatus } });
  };

  const handleDeleteKeyword = async (keywordId: string) => {
    await deleteSeoKeywordMutation.mutateAsync(keywordId);
  };

  const handleScanDocument = async (documentId: string) => {
    setIsScanning(true);
    try {
      await scanDocumentMutation.mutateAsync(documentId);
    } finally {
      setIsScanning(false);
    }
  };

  const handleAddKeyword = async (keyword: string) => {
    await createSeoKeywordMutation.mutateAsync({ keyword, searchIntent: 'informational' });
  };

  const handleGenerateSuggestions = async () => {
    setIsGeneratingMagic(true);
    try {
      await generateSuggestionsMutation.mutateAsync();
    } finally {
      setIsGeneratingMagic(false);
    }
  };

  const handleGenerateOutline = async (id: string) => {
    setMagicProcessingId(id);
    try {
      await generateOutlineMutation.mutateAsync(id);
    } finally {
      setMagicProcessingId(null);
    }
  };

  const handleGenerateDraft = async (id: string) => {
    setMagicProcessingId(id);
    try {
      await generateDraftMutation.mutateAsync(id);
    } finally {
      setMagicProcessingId(null);
    }
  };

  const handlePublishMagicPage = async (id: string) => {
    setMagicProcessingId(id);
    try {
      await publishMagicPageMutation.mutateAsync(id);
    } finally {
      setMagicProcessingId(null);
    }
  };

  const handleRejectMagicPage = async (id: string) => {
    await rejectMagicPageMutation.mutateAsync(id);
  };

  const handleCreateLinkingRule = async (data: Omit<LinkingRule, 'id' | 'createdAt' | 'updatedAt'>) => {
    await createLinkingRuleMutation.mutateAsync(data);
  };

  const handleUpdateLinkingRule = async (id: string, data: Partial<LinkingRule>) => {
    await updateLinkingRuleMutation.mutateAsync({ id, data });
  };

  const handleDeleteLinkingRule = async (id: string) => {
    await deleteLinkingRuleMutation.mutateAsync(id);
  };

  const handleToggleLinkingRuleActive = async (id: string, isActive: boolean) => {
    await updateLinkingRuleMutation.mutateAsync({ id, data: { isActive } });
  };

  const handleCreateCtaTemplate = async (data: Omit<CtaTemplate, 'id' | 'createdAt' | 'updatedAt'>) => {
    await createCtaTemplateMutation.mutateAsync(data);
  };

  const handleUpdateCtaTemplate = async (id: string, data: Partial<CtaTemplate>) => {
    await updateCtaTemplateMutation.mutateAsync({ id, data });
  };

  const handleDeleteCtaTemplate = async (id: string) => {
    await deleteCtaTemplateMutation.mutateAsync(id);
  };

  const handleToggleCtaTemplateActive = async (id: string, isActive: boolean) => {
    await updateCtaTemplateMutation.mutateAsync({ id, data: { isActive } });
  };

  const handleAutoGenerateLinkingRules = async () => {
    setIsAutoGeneratingRules(true);
    try {
      await autoGenerateRulesMutation.mutateAsync();
    } finally {
      setIsAutoGeneratingRules(false);
    }
  };

  const handleSaveSetting = async (key: string, value: any, description: string, category: string) => {
    setIsSavingSettings(true);
    try {
      await updateSettingMutation.mutateAsync({ key, value, description, category });
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleCreateTemplate = () => {
    setSelectedHtmlTemplate(null);
    setIsTemplateEditorOpen(true);
  };

  const handleEditTemplate = (template: HtmlTemplate) => {
    setSelectedHtmlTemplate(template);
    setIsTemplateEditorOpen(true);
  };

  const handleCloseTemplateEditor = () => {
    setIsTemplateEditorOpen(false);
    setSelectedHtmlTemplate(null);
  };

  const handleSaveTemplate = async (data: HtmlTemplateFormData, templateId: string | null) => {
    if (templateId) {
      await updateHtmlTemplateMutation.mutateAsync({ id: templateId, data });
    } else {
      await createHtmlTemplateMutation.mutateAsync(data);
    }
  };

  const handleDeleteTemplate = async (id: string) => {
    await deleteHtmlTemplateMutation.mutateAsync(id);
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className={cn("min-h-screen admin-theme", isDarkMode ? "dark bg-[hsl(258,35%,8%)] text-white" : "bg-slate-50")}>
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <AdminHeader
        onLogout={handleLogout}
        onRefresh={handleRefresh}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        isSidebarCollapsed={isSidebarCollapsed}
      />

      <main
        className={cn(
          "pt-20 pb-8 px-4 md:px-6 transition-all duration-300 min-h-screen",
          "ml-0 md:ml-[70px]",
          !isSidebarCollapsed && "md:ml-[260px]",
          isDarkMode && "text-slate-100"
        )}
      >
        {activeTab === "dashboard" && (
          <DashboardTab stats={stats || null} onCreatePage={handleCreateNewPage} />
        )}

        {activeTab === "pages" && (
          <PagesTab pages={pageTree} onEdit={handleEditPage} onCreate={handleCreateNewPage} />
        )}

        {activeTab === "products" && (
          <ProductsTab products={products} onEdit={handleEditProduct} onCreate={handleCreateNewProduct} />
        )}

        {activeTab === "articles" && (
          <ArticlesTab articles={articles} clusters={clusters} onEdit={handleEditArticle} onCreate={handleCreateNewArticle} />
        )}

        {activeTab === "clusters" && (
          <ClustersTab clusters={clusters} onUpdateCluster={handleUpdateCluster} />
        )}

        {activeTab === "documents" && (
          <DocumentsTab
            documents={documents}
            onEdit={handleEditDocument}
            onCreate={handleCreateNewDocument}
            onDelete={handleDeleteDocument}
            onIndex={handleIndexDocument}
            indexingId={indexingDocId}
            onRefresh={() => queryClient.invalidateQueries({ queryKey: ['/api/admin/documents'] })}
          />
        )}

        {activeTab === "seo-brain" && (
          <SeoDashboard />
        )}

        {activeTab === "seo" && (
          <SeoKeywordsTab
            keywords={seoKeywords}
            documents={documents}
            onStatusChange={handleSeoStatusChange}
            onDelete={handleDeleteKeyword}
            onScanDocument={handleScanDocument}
            onAddKeyword={handleAddKeyword}
            isScanning={isScanning}
          />
        )}

        {activeTab === "magic" && (
          <MagicPagesTab
            suggestions={magicPages}
            seoKeywords={seoKeywords}
            onGenerateSuggestions={handleGenerateSuggestions}
            onGenerateOutline={handleGenerateOutline}
            onGenerateDraft={handleGenerateDraft}
            onPublish={handlePublishMagicPage}
            onReject={handleRejectMagicPage}
            isGenerating={isGeneratingMagic}
            processingId={magicProcessingId}
          />
        )}

        {activeTab === "linking" && (
          <LinkingTab
            linkingRules={linkingRules}
            ctaTemplates={ctaTemplates}
            clusters={clusters}
            pages={pageTree}
            onCreateRule={handleCreateLinkingRule}
            onUpdateRule={handleUpdateLinkingRule}
            onDeleteRule={handleDeleteLinkingRule}
            onToggleRuleActive={handleToggleLinkingRuleActive}
            onCreateCta={handleCreateCtaTemplate}
            onUpdateCta={handleUpdateCtaTemplate}
            onDeleteCta={handleDeleteCtaTemplate}
            onToggleCtaActive={handleToggleCtaTemplateActive}
            onAutoGenerate={handleAutoGenerateLinkingRules}
            isAutoGenerating={isAutoGeneratingRules}
          />
        )}

        {activeTab === "templates" && (
          <TemplatesTab
            templates={htmlTemplates}
            onCreate={handleCreateTemplate}
            onEdit={handleEditTemplate}
            onDelete={handleDeleteTemplate}
          />
        )}

        {activeTab === "settings" && (
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">Loading Settings...</p>
              </div>
            </div>
          }>
            <LazySettingsTab
              settings={cmsSettings}
              onSave={handleSaveSetting}
              isSaving={isSavingSettings}
              onTabChange={setActiveTab}
            />
          </Suspense>
        )}

        {activeTab === "bigmind" && (
          <Suspense fallback={<div className="flex items-center justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div></div>}>
            <LazyBigMindTab />
          </Suspense>
        )}

        {activeTab === "orders" && (
          <OrdersTab />
        )}

        {activeTab === "analytics" && (
          <Suspense fallback={<div className="flex items-center justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div></div>}>
            <LazyAnalyticsTab />
          </Suspense>
        )}

        {activeTab === "ai-agents" && (
          <AIAgentsTab />
        )}

        {activeTab === "design" && (
          <DesignSystemTab pages={pageTree} />
        )}
      </main>

      <PageEditorModal
        page={selectedPage}
        pages={pageTree}
        clusters={clusters}
        isOpen={isPageEditorOpen}
        onClose={handleClosePageEditor}
        onSave={handleSavePage}
        onDelete={handleDeletePage}
        isNew={isCreatingNewPage}
      />

      <ProductEditorModal
        product={selectedProduct}
        pages={pageTree}
        templates={htmlTemplates}
        isOpen={isProductEditorOpen}
        onClose={handleCloseProductEditor}
        onSave={handleSaveProduct}
        onDelete={handleDeleteProduct}
      />

      <ArticleEditorModal
        article={selectedArticle}
        pages={pageTree}
        clusters={clusters}
        isOpen={isArticleEditorOpen}
        onClose={handleCloseArticleEditor}
        onSave={handleSaveArticle}
        onDelete={handleDeleteArticle}
      />

      <DocumentEditorModal
        document={selectedDocument}
        isOpen={isDocumentEditorOpen}
        onClose={handleCloseDocumentEditor}
        onSave={handleSaveDocument}
        onViewChunks={handleViewChunks}
      />

      <DocumentChunksModal
        documentId={viewingChunksDocId}
        documentTitle={viewingChunksDocTitle}
        isOpen={!!viewingChunksDocId}
        onClose={handleCloseChunks}
      />

      <TemplateEditorModal
        template={selectedHtmlTemplate}
        isOpen={isTemplateEditorOpen}
        onClose={handleCloseTemplateEditor}
        onSave={handleSaveTemplate}
      />

      <Dialog open={saveLogOpen} onOpenChange={setSaveLogOpen}>
        <DialogContent className="max-w-md" data-testid="dialog-save-log">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-primary" />
              Save Progress Log
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {saveLogTasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 rounded-lg bg-muted/50"
                data-testid={`log-task-${index}`}
              >
                {task.status === 'pending' && (
                  <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
                )}
                {task.status === 'success' && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
                {task.status === 'error' && (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                <div className="flex-1">
                  <span className={`text-sm ${task.status === 'error' ? 'text-red-500' : ''}`}>
                    {task.task}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {task.timestamp.toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <Button
              onClick={() => setSaveLogOpen(false)}
              data-testid="button-close-save-log"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
