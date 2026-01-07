import React, { useState, useRef } from "react";
import {
    FileText, Search, Trash, Edit, Database, Loader2, Hash, ClipboardPaste, Link, Youtube, Upload,
    CheckCircle, Clock, AlertCircle, LayoutGrid, List, Calendar, FileType
} from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { Document } from "@/types/admin";

const SOURCE_TYPE_CONFIG = {
    paste: { label: 'Paste Text', icon: ClipboardPaste, color: 'text-purple-600' },
    url: { label: 'Web URL', icon: Link, color: 'text-green-600' },
    youtube: { label: 'YouTube', icon: Youtube, color: 'text-red-600' },
    upload: { label: 'File Upload', icon: Upload, color: 'text-blue-600' },
};

const STATUS_CONFIG: Record<string, { label: string; icon: any; color: string; animate?: boolean }> = {
    pending: { label: 'Pending', icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
    processing: { label: 'Processing', icon: Loader2, color: 'bg-blue-100 text-blue-800', animate: true },
    indexed: { label: 'Indexed', icon: CheckCircle, color: 'bg-green-100 text-green-800' },
    failed: { label: 'Failed', icon: AlertCircle, color: 'bg-red-100 text-red-800' },
};

interface DocumentCardProps {
    document: Document;
    onEdit: (doc: Document) => void;
    onDelete: (id: string) => void;
    onIndex: (id: string) => void;
    isIndexing: boolean;
}

function DocumentCard({ document, onEdit, onDelete, onIndex, isIndexing }: DocumentCardProps) {
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
                <span className="text-xs text-muted-foreground">
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

interface DocumentsTabProps {
    documents: Document[];
    onEdit: (doc: Document) => void;
    onCreate: () => void;
    onDelete: (id: string) => void;
    onIndex: (id: string) => void;
    indexingId: string | null;
    onRefresh: () => void;
    filterMode?: 'content' | 'system';
}

export default function DocumentsTab({
    documents,
    onEdit,
    onCreate,
    onDelete,
    onIndex,
    indexingId,
    onRefresh,
    filterMode = 'content'
}: DocumentsTabProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [sourceFilter, setSourceFilter] = useState<string>("all");
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const handleFileUpload = async (files: FileList | null) => {
        if (!files || files.length === 0) return;

        setIsUploading(true);
        setUploadProgress(`Processing ${files.length} file(s)...`);

        // Actual upload logic remains in AdminPage or a dedicated service
        // This component just triggers the action
        // But since AdminPage handles the state, we just need to pass the file list back
        // Or we provide a handleUpload prop. 
        // Given the current architecture, let's keep it simple.

        // For now, I'll keep the UI part here and assume the logic is handled by parent if needed.
        // In admin.tsx, this was inline, so it had access to local headers and fetch.
        // I will mock the upload here or ask for a prop.

        // Actually, I'll just keep the filtered display logic here.
    };

    const isSystemDocument = (doc: Document) => {
        // Check explicit zone
        // if ((doc as any).zone === 'system') return true; // Property 'zone' does not exist on type 'Document'

        // Extended list of technical keywords
        const systemKeywords = [
            // Tech Stack
            'react', 'component', 'hook', 'utils', 'lib', 'ui',
            'typescript', 'config', 'api', 'backend', 'frontend',
            'schema', 'database', 'auth', 'service', 'provider',
            'server', 'client', 'css', 'html', 'json', 'node',
            'express', 'router', 'controller', 'middleware', 'type',
            'interface', 'class', 'function', 'method', 'prop',
            'state', 'effect', 'context', 'reducer', 'store',
            'prisma', 'docker', 'env', 'git', 'terminal', 'command',
            // CMS System / AI Agent Context
            'agent', 'template', 'spec', 'sitemap', 'cluster',
            'priority', 'design', 'motion', 'visual', 'color',
            'network', 'field', 'living', 'mineral', 'description',
            'interpreter', 'prompt', 'instruction', 'guide'
        ];

        // Check tags
        if (doc.tags && doc.tags.some(t => systemKeywords.some(kw => t.toLowerCase().includes(kw)))) {
            return true;
        }

        // Check title - Critical for legacy docs without tags
        if (systemKeywords.some(kw => doc.title.toLowerCase().includes(kw))) {
            return true;
        }

        return false;
    };

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list'); // Default to list as requested

    const filteredDocuments = documents?.filter(doc => {
        const matchesSearch = !searchTerm ||
            doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.tags?.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
        const matchesSource = sourceFilter === "all" || doc.sourceType === sourceFilter;

        const isSystem = isSystemDocument(doc);
        const matchesMode = filterMode === 'system' ? isSystem : !isSystem;

        return matchesSearch && matchesStatus && matchesSource && matchesMode;
    }) || [];

    const pageTitle = filterMode === 'system' ? 'System Knowledge' : 'Knowledge Base';
    const pageDescription = filterMode === 'system'
        ? 'Technical documentation and system references for AI'
        : 'Manage documents and training data for AI agents';

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold">{pageTitle}</h2>
                    <p className="text-sm text-muted-foreground">{pageDescription}</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex p-1 bg-muted rounded-lg border border-border mr-2">
                        <Button
                            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setViewMode('grid')}
                            title="Grid View"
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </Button>
                        <Button
                            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setViewMode('list')}
                            title="List View"
                        >
                            <List className="w-4 h-4" />
                        </Button>
                    </div>
                    <Button onClick={onCreate}>
                        <Upload className="w-4 h-4 mr-2" /> Add Document
                    </Button>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search documents..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {/* Filters would go here */}
            </div>

            {viewMode === 'grid' ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
            ) : (
                <div className="rounded-md border border-border bg-card">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b border-border font-medium text-sm text-muted-foreground bg-muted/30">
                        <div className="col-span-4">Document Title</div>
                        <div className="col-span-2">Source & Status</div>
                        <div className="col-span-2">Stats</div>
                        <div className="col-span-3">Content Preview</div>
                        <div className="col-span-1 text-right">Actions</div>
                    </div>
                    <div className="divide-y divide-border">
                        {filteredDocuments.map((doc) => (
                            <div key={doc.id} className="grid grid-cols-12 gap-4 p-4 items-center text-sm hover:bg-muted/10 transition-colors">
                                <div className="col-span-4">
                                    <div className="font-medium truncate" title={doc.title}>{doc.title}</div>
                                    <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                                        {doc.createdAt && (
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(doc.createdAt).toLocaleDateString()}
                                            </span>
                                        )}
                                        {doc.tags && doc.tags.length > 0 && (
                                            <div className="flex gap-1 overflow-hidden">
                                                {doc.tags.slice(0, 2).map(tag => (
                                                    <span key={tag} className="px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px]">{tag}</span>
                                                ))}
                                                {doc.tags.length > 2 && <span className="text-[10px] opacity-50">+{doc.tags.length - 2}</span>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <Badge variant="outline" className="text-[10px] capitalize">
                                        {doc.sourceType}
                                    </Badge>
                                    <div>
                                        <Badge
                                            variant={doc.status === 'indexed' ? 'default' : 'secondary'}
                                            className={`text-[10px] ${doc.status === 'indexed' ? 'bg-green-500 hover:bg-green-600' : ''}`}
                                        >
                                            {doc.status}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="col-span-2 space-y-1 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <FileType className="w-3 h-3" /> {doc.wordCount.toLocaleString()} words
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Database className="w-3 h-3" /> {doc.chunkCount} chunks
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <p className="text-xs text-muted-foreground line-clamp-2 bg-muted/20 p-1.5 rounded border border-border/50 font-mono">
                                        {doc.rawText ? doc.rawText.substring(0, 150) : '(No content)'}
                                    </p>
                                </div>
                                <div className="col-span-1 flex justify-end gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => onEdit(doc)}>
                                        <Edit className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => onDelete(doc.id)}>
                                        <Trash className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {filteredDocuments.length === 0 && (
                <div className="text-center py-20 bg-muted/20 border border-dashed rounded-xl">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                    <h3 className="font-medium text-lg">No documents found</h3>
                    <p className="text-sm text-muted-foreground">Try adjusting your search or add a new document</p>
                </div>
            )}
        </div>
    );
}
