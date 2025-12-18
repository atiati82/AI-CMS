import React, { useState, useEffect, useRef, useMemo, lazy, Suspense } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest, getAuthToken, setAuthToken, clearAuthToken, getAuthHeaders } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Lazy load Settings tab (proof of concept for lazy loading optimization)
const LazySettingsTab = lazy(() => import('./admin/tabs/SettingsTab'));
const FunctionsTab = lazy(() => import('@/components/admin/tabs/FunctionsTab'));
const DesignInterpreterTab = lazy(() => import('./admin/tabs/DesignInterpreterTab'));
const WorkflowsTab = lazy(() => import('./admin/tabs/WorkflowsTab'));
const DashboardTab = lazy(() => import('./admin/tabs/DashboardTab'));
const AIAuditTab = lazy(() => import('./admin/tabs/AIAuditTab'));
const AIAgentsTab = lazy(() => import('@/components/admin/tabs/AIAgentsTab'));
const PageEditorModal = lazy(() => import('@/components/admin/modals/PageEditorModal'));
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
import { ErrorBoundary } from "@/components/ErrorBoundary";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { BigMindChatModern } from "@/components/bigmind-chat-modern";
import { parseBigMindResponse, type ParsedBigMindResponse, extractEnhancements, hasEnhancementContent, type ParsedEnhancement, extractBigmindRecommendations, hasBigmindRecommendations, type BigmindRecommendation } from "@/lib/bigmind-parser";
import {
  Edit, Save, Trash, Plus, ChevronRight, ChevronDown, ChevronUp,
  FileText, Package, Beaker, FolderTree, LayoutDashboard,
  LogOut, RefreshCw, Eye, EyeOff, X, ArrowLeft, FileUp,
  Link, Upload, Youtube, ClipboardPaste, Hash, AlertCircle, CheckCircle, CheckCircle2, Clock, Loader2,
  Target, TrendingUp, BarChart2, Search, Zap, ArrowUpRight, Filter, Scan,
  Wand2, Sparkles, ListTree, FileCheck, XCircle, Play, Send, Settings, Key, Database,
  Code2, LayoutTemplate, Paintbrush, Palette, Film, Image, Lightbulb, Heart, Brain, MessageCircle, Copy,
  User, Paperclip, FileType, ImageIcon, VideoIcon, FileTextIcon, History, Layers, Globe, Download, Mic, GitBranch,
  Edit2,
  Activity,
  DollarSign,
  PlayCircle,
  Shield // Imported for Security settings
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
import { MotionLibraryShowcase } from "@/components/admin/MotionLibraryShowcase";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RichTextEditor from "@/components/rich-text-editor";
import { PageContentPreview } from "@/components/page-content-preview";
import { MotionLibraryPreview, SingleMotionPreview, MOTION_ARCHETYPES } from "@/components/motion-library-preview";
import SeoDashboard from "@/components/admin/SeoDashboard";
import SeoCopilotOverlay from "@/components/admin/SeoCopilotOverlay";
import type { MaintenanceReport } from "@shared/schema";
import {
  ContentStats, VisualVibe, VisualConfig, Page, Product, Cluster, Article, Document, DocumentChunk, PageFormData,
  SeoKeyword, MagicPageOutlineSection, MagicPageDraftContent, MagicPageSuggestion, LinkingRule,
  CtaTemplate, HtmlTemplate, CmsSetting, AIAgent,
  SETTINGS_CATEGORIES, AI_MODEL_OPTIONS, DEFAULT_SETTINGS,
  LINKING_RULE_TYPE_CONFIG, CTA_POSITION_CONFIG, TEMPLATE_TYPE_CONFIG
} from "@/types/admin";

// Types and constants moved to @/types/admin
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
    <div className="bg-card border rounded-xl p-5 shadow-sm hover:border-[var(--andara-amber)] hover:shadow-[0_0_15px_-5px_var(--andara-amber)] transition-all duration-300" data-testid={`document-card-${document.id}`}>
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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [formData, setFormData] = useState<DocumentFormData>({
    title: '',
    sourceType: 'paste',
    sourceUrl: null,
    rawText: '',
    tags: [],
  });
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
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2 text-gradient-gold-shine">Knowledge Base</h2>
        <p className="text-sm text-muted-foreground">Add documents to power AI-driven content generation and recommendations</p>
      </div>

      {/* Hidden file input for PDF upload */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.txt,.md"
        className="hidden"
        onChange={(e) => handleFileUpload(e.target.files)}
        data-testid="input-file-upload"
      />

      {/* Source Type Selector - Prominent Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">Source Type</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Paste Text */}
          <button
            type="button"
            onClick={() => {
              setFormData({ title: '', sourceType: 'paste', sourceUrl: null, rawText: '', tags: [] });
              onCreate();
            }}
            className="group relative flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-border bg-card hover:border-purple-500/50 hover:bg-purple-500/5 transition-all"
            data-testid="button-source-paste"
          >
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
              <ClipboardPaste className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium">Paste Text</span>
          </button>

          {/* Web URL */}
          <button
            type="button"
            onClick={() => {
              setFormData({ title: '', sourceType: 'url', sourceUrl: null, rawText: '', tags: [] });
              onCreate();
            }}
            className="group relative flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-border bg-card hover:border-green-500/50 hover:bg-green-500/5 transition-all"
            data-testid="button-source-url"
          >
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
              <Link className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium">Web URL</span>
          </button>

          {/* YouTube */}
          <button
            type="button"
            onClick={() => {
              setFormData({ title: '', sourceType: 'youtube', sourceUrl: null, rawText: '', tags: [] });
              onCreate();
            }}
            className="group relative flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-border bg-card hover:border-red-500/50 hover:bg-red-500/5 transition-all"
            data-testid="button-source-youtube"
          >
            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
              <Youtube className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-sm font-medium">YouTube</span>
          </button>

          {/* File Upload */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="group relative flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-border bg-card hover:border-blue-500/50 hover:bg-blue-500/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="button-source-upload"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
              {isUploading ? (
                <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
              ) : (
                <Upload className="w-6 h-6 text-blue-600" />
              )}
            </div>
            <span className="text-sm font-medium">
              {isUploading ? uploadProgress?.split(' ')[0] || 'Uploading' : 'File Upload'}
            </span>
          </button>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          {isUploading ? uploadProgress : 'or click "Upload PDF" button • Max 300MB per file'}
        </p>
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
            <Button onClick={onCreate} className="bg-gradient-gold text-black border-none hover:opacity-90 transition-opacity" data-testid="button-add-first-document">
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

      {/* Hub-and-Spoke Cluster Visualization */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2 mb-4">
          <GitBranch className="w-4 h-4" />
          Cluster Architecture (Hub & Spoke)
        </h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {/* Central Hub - Home */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 border-4 border-white/10">
              <div className="text-center">
                <div className="text-lg font-bold">Hub</div>
                <div className="text-xs opacity-80">Home</div>
              </div>
            </div>
          </div>

          {/* Spoke Clusters */}
          <div className="flex flex-wrap gap-2 items-center max-w-[600px]">
            {clusters.map((cluster, idx) => {
              const colorMap: Record<string, string> = {
                indigo: 'from-indigo-500 to-indigo-600',
                sky: 'from-sky-400 to-sky-500',
                amber: 'from-amber-400 to-amber-500',
                green: 'from-green-500 to-green-600',
                yellow: 'from-yellow-400 to-yellow-500',
                violet: 'from-violet-500 to-violet-600',
                gold: 'from-amber-500 to-orange-500',
                slate: 'from-slate-500 to-slate-600',
                emerald: 'from-emerald-500 to-emerald-600',
              };
              const gradient = colorMap[cluster.color || ''] || 'from-slate-600 to-slate-700';
              const isParent = !cluster.parentClusterKey;
              const childCount = clusters.filter(c => c.parentClusterKey === cluster.key).length;

              return (
                <div
                  key={cluster.id}
                  className={`relative rounded-lg bg-gradient-to-br ${gradient} p-3 border border-white/20 shadow-md hover:scale-105 transition-transform cursor-pointer`}
                  style={{ minWidth: isParent ? '100px' : '80px' }}
                  onClick={() => handleOpenVibeDialog(cluster)}
                  data-testid={`cluster-viz-${cluster.slug}`}
                >
                  <div className="text-center text-white">
                    <div className="text-xs font-semibold truncate">{cluster.name}</div>
                    {isParent && childCount > 0 && (
                      <div className="text-[10px] opacity-75 mt-1 flex items-center justify-center gap-1">
                        <GitBranch className="w-2.5 h-2.5" /> {childCount} sub
                      </div>
                    )}
                    {cluster.parentClusterKey && (
                      <div className="text-[10px] opacity-60">→ {cluster.parentClusterKey}</div>
                    )}
                  </div>
                  {cluster.visualVibe && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-green-400 shadow" title="Has Visual Vibe" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 mt-4 text-xs text-gray-400 justify-center flex-wrap">
          <span className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600" /> Hub/Pillar
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-500" /> Science Cluster
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-white border border-green-400" /> Has Vibe
          </span>
        </div>
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
  const [designSubTab, setDesignSubTab] = useState<'motion' | 'showcase' | 'themes' | 'assets'>('motion');
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
            variant={designSubTab === 'showcase' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setDesignSubTab('showcase')}
            data-testid="btn-design-showcase"
          >
            <PlayCircle className="w-4 h-4 mr-1" />
            Showcase
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

      {designSubTab === 'showcase' && (
        <MotionLibraryShowcase />
      )}

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

// AIAgentsTab moved to components/admin/tabs/AIAgentsTab


function BigMindTab() {
  return (
    <div className="p-6">
      <BigMindChatModern mode="cms" persistSessions={true} />
    </div>
  );
}

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

          {latestReport.routeMismatches && latestReport.routeMismatches.missingBackend && latestReport.routeMismatches.missingBackend.length > 0 && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <h5 className="font-medium text-amber-800 text-sm mb-2">Missing Backend Routes</h5>
              <ul className="text-xs text-amber-700 space-y-1">
                {latestReport.routeMismatches.missingBackend.slice(0, 5).map((route, i) => (
                  <li key={i}>{route}</li>
                ))}
                {latestReport.routeMismatches!.missingBackend.length > 5 && (
                  <li className="text-muted-foreground">
                    ... and {latestReport.routeMismatches!.missingBackend.length - 5} more
                  </li>
                )}
              </ul>
            </div>
          )}

          {latestReport.suggestions && latestReport.suggestions.length > 0 && (
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
                      * {margin: 0; padding: 0; box-sizing: border-box; }
                      body {
                        font - family: system-ui, -apple-system, sans-serif;
                      font-size: 14px;
                      padding: 16px;
                      background: #fafafa;
                      overflow: auto;
        }
                      img {max - width: 100%; height: auto; }
                      section, div {max - width: 100%; }
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

function AdminPage() {
  const [activeTab, setActiveTab] = useState(() => {
    // Initialize tab from URL to avoid race conditions with effects
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    // Clean any trailing characters like = or /
    const cleanTab = tabParam ? tabParam.replace(/[=/]+$/, '') : null;
    console.log('[Admin] Initializing tab from URL:', cleanTab || 'dashboard');
    return cleanTab || "dashboard";
  });

  // Sync state with URL on back/forward navigation AND initial load check
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      let tab = params.get('tab');
      if (tab) {
        // Clean trailing chars matching the initializer logic
        tab = tab.replace(/[=/]+$/, '');
        setActiveTab(prev => {
          if (prev !== tab) return tab!;
          return prev;
        });
      }
    };

    // Check on mount
    handleUrlChange();

    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

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

  // Force sync tab from URL when auth check finishes (handles race conditions)
  useEffect(() => {
    if (!isCheckingAuth) {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab) {
        const cleanTab = tab.replace(/[=/]+$/, '');
        console.log('[Admin] Auth ready, forcing tab sync:', cleanTab);
        setActiveTab(cleanTab);
      }
    }
  }, [isCheckingAuth]);
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('tab', tab);
    window.history.pushState({}, '', newUrl);
  };

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
    refetchInterval: 5000, // Poll for updates
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

  // Handle URL params for tab switching and page editing
  // Store pending edit ID to persist it until pageTree loads
  const pendingEditId = React.useRef<string | null>(null);

  // Initial parse of URL params for EDIT param (runs once on mount)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const editParam = params.get('edit');

    // Store edit param for when pageTree loads
    if (editParam) {
      pendingEditId.current = editParam;
    }
  }, []);

  // Update URL when tab changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (activeTab !== 'dashboard') {
      params.set('tab', activeTab);
    } else {
      params.delete('tab');
    }
    const newSearch = params.toString();
    const newUrl = window.location.pathname + (newSearch ? '?' + newSearch : '');
    window.history.replaceState({}, '', newUrl);
  }, [activeTab]);

  // Open editor when pageTree is ready and we have a pending edit
  useEffect(() => {
    if (!isAuthenticated || pageTree.length === 0 || !pendingEditId.current) return;

    const editId = pendingEditId.current;
    console.log('[Admin] Looking for page to edit:', editId, 'in tree with', pageTree.length, 'pages');

    const findPageById = (pages: Page[], id: string): Page | null => {
      for (const page of pages) {
        if (page.id === id) return page;
        if (page.children?.length) {
          const found = findPageById(page.children, id);
          if (found) return found;
        }
      }
      return null;
    };

    const pageToEdit = findPageById(pageTree, editId);
    console.log('[Admin] Found page:', pageToEdit?.title || 'NOT FOUND');

    if (pageToEdit) {
      setSelectedPage(pageToEdit);
      setIsCreatingNewPage(false);
      setIsPageEditorOpen(true);
      // Clear pending and URL
      pendingEditId.current = null;
      window.history.replaceState({}, '', '/admin?tab=pages');
    } else {
      // Page not in tree, might be a newly created page - fetch it directly
      console.log('[Admin] Page not in tree, fetching directly...');
      fetch(`/api/pages/${editId}`)
        .then(r => r.ok ? r.json() : null)
        .then(page => {
          if (page) {
            console.log('[Admin] Fetched page directly:', page.title);
            setSelectedPage(page);
            setIsCreatingNewPage(false);
            setIsPageEditorOpen(true);
          }
          pendingEditId.current = null;
          window.history.replaceState({}, '', '/admin?tab=pages');
        })
        .catch((err) => {
          console.error('[Admin] Failed to fetch page for edit:', err);
          toast({
            title: "Error Opening Page",
            description: "Could not load the page editor. The page might not exist.",
            variant: "destructive"
          });
          pendingEditId.current = null;
          window.history.replaceState({}, '', '/admin?tab=pages');
        });
    }
  }, [isAuthenticated, pageTree]);

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
      toast({ title: "Page created", description: "The page has been created successfully." });
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
      toast({ title: "Page saved", description: "Your changes have been saved successfully." });
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
      toast({ title: "Page deleted", description: "The page has been deleted." });
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
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ProductFormData> }) => {
      const res = await apiRequest("PUT", `/api/admin/products/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
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
    },
  });

  const updateClusterMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Cluster> }) => {
      const res = await apiRequest("PUT", `/api/admin/clusters/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/clusters"] });
      toast({ title: "Cluster updated", description: "Visual vibe saved successfully." });
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
    },
  });

  const updateArticleMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ArticleFormData> }) => {
      const res = await apiRequest("PUT", `/api/admin/science-articles/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/science-articles"] });
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
    },
  });

  const createDocumentMutation = useMutation({
    mutationFn: async (data: DocumentFormData) => {
      const res = await apiRequest("POST", "/api/admin/documents", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/documents"] });
    },
  });

  const updateDocumentMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<DocumentFormData> }) => {
      const res = await apiRequest("PUT", `/api/admin/documents/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/documents"] });
    },
  });

  const deleteDocumentMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/admin/documents/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/documents"] });
    },
  });

  const indexDocumentMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("POST", `/api/admin/documents/${id}/index`, {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/documents"] });
    },
  });

  const createSeoKeywordMutation = useMutation({
    mutationFn: async (data: { keyword: string; searchIntent: string; targetClusterKey?: string; notes?: string }) => {
      const res = await apiRequest("POST", "/api/admin/seo-keywords", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-keywords"] });
    },
  });

  const updateSeoKeywordMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<SeoKeyword> }) => {
      const res = await apiRequest("PUT", `/api/admin/seo-keywords/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-keywords"] });
    },
  });

  const deleteSeoKeywordMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/admin/seo-keywords/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-keywords"] });
    },
  });

  const scanDocumentMutation = useMutation({
    mutationFn: async (documentId: string) => {
      const res = await apiRequest("POST", `/api/admin/seo/scan-document/${documentId}`, {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-keywords"] });
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
    },
  });

  const generateOutlineMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("POST", `/api/admin/magic-pages/${id}/outline`, {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/magic-pages"] });
    },
  });

  const generateDraftMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("POST", `/api/admin/magic-pages/${id}/draft`, {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/magic-pages"] });
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
    },
  });

  const rejectMagicPageMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("POST", `/api/admin/magic-pages/${id}/reject`, {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/magic-pages"] });
    },
  });

  const createLinkingRuleMutation = useMutation({
    mutationFn: async (data: Omit<LinkingRule, 'id' | 'createdAt' | 'updatedAt'>) => {
      const res = await apiRequest("POST", "/api/admin/linking-rules", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/linking-rules"] });
    },
  });

  const updateLinkingRuleMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<LinkingRule> }) => {
      const res = await apiRequest("PUT", `/api/admin/linking-rules/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/linking-rules"] });
    },
  });

  const deleteLinkingRuleMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/admin/linking-rules/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/linking-rules"] });
    },
  });

  const autoGenerateRulesMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/admin/linking-rules/auto-generate", {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/linking-rules"] });
    },
  });

  const createCtaTemplateMutation = useMutation({
    mutationFn: async (data: Omit<CtaTemplate, 'id' | 'createdAt' | 'updatedAt'>) => {
      const res = await apiRequest("POST", "/api/admin/cta-templates", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/cta-templates"] });
    },
  });

  const updateCtaTemplateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CtaTemplate> }) => {
      const res = await apiRequest("PUT", `/api/admin/cta-templates/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/cta-templates"] });
    },
  });

  const deleteCtaTemplateMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/admin/cta-templates/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/cta-templates"] });
    },
  });

  const updateSettingMutation = useMutation({
    mutationFn: async ({ key, value, description, category }: { key: string; value: any; description: string; category: string }) => {
      const res = await apiRequest("PUT", `/api/admin/settings/${key}`, { value, description, category });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] });
    },
  });

  const createHtmlTemplateMutation = useMutation({
    mutationFn: async (data: HtmlTemplateFormData) => {
      const res = await apiRequest("POST", "/api/admin/html-templates", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/html-templates"] });
      toast({ title: "Template created", description: "The template has been created successfully." });
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
        onTabChange={handleTabChange}
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
          <Suspense fallback={<div className="flex items-center justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>}>
            <DashboardTab stats={stats || null} onCreatePage={handleCreateNewPage} />
          </Suspense>
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
            />
          </Suspense>
        )}

        {activeTab === "bigmind" && (
          <BigMindTab />
        )}

        {activeTab === "orders" && (
          <OrdersTab />
        )}

        {activeTab === "analytics" && (
          <AnalyticsTab />
        )}

        {activeTab === "design" && (
          <DesignSystemTab pages={pageTree} />
        )}

        {activeTab === "functions" && (
          <Suspense fallback={<div className="flex items-center justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>}>
            <FunctionsTab />
          </Suspense>
        )}

        {activeTab === "design-interpreter" && (
          <Suspense fallback={<div className="flex items-center justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>}>
            <DesignInterpreterTab />
          </Suspense>
        )}

        {activeTab === "ai-agents" && (
          <Suspense fallback={<div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>}>
            <AIAgentsTab />
          </Suspense>
        )}

        {activeTab === "ai-audit" && (
          <ErrorBoundary>
            <Suspense fallback={<div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>}>
              <AIAuditTab />
            </Suspense>
          </ErrorBoundary>
        )}

        {/* Workflows Tab */}
        {activeTab === "workflows" && (
          <ErrorBoundary>
            <Suspense fallback={<div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>}>
              <WorkflowsTab />
            </Suspense>
          </ErrorBoundary>
        )}
      </main>

      <Suspense fallback={null}>
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
      </Suspense>

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

      {/* SEO Copilot Overlay - Floating button + panel */}
      <SeoCopilotOverlay
        pageId={selectedPage?.id}
        isAdminMode={true}
      />
    </div>
  );
}

export default AdminPage;
