
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUp, Save, Upload, Loader2, ClipboardPaste, Link, Youtube, Hash, Edit, Trash, Database, FileText, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Document, DocumentChunk, DocumentFormData, SOURCE_TYPE_CONFIG } from "@/types/admin";

const ICON_MAP: Record<string, any> = {
    FileUp,
    Save,
    Upload,
    Loader2,
    ClipboardPaste,
    Link,
    Youtube,
    Hash,
    Edit,
    Trash,
    Database,
    FileText,
    Clock,
    AlertCircle,
    Clipboard: ClipboardPaste,
};

export function DocumentEditorModal({
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
                metadata: document.metadata || {},
            });
            setTagsText((document.tags || []).join(', '));
        } else {
            setFormData({
                title: '',
                sourceType: 'paste',
                sourceUrl: null,
                rawText: '',
                tags: [],
                metadata: {},
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
                            {Object.entries(SOURCE_TYPE_CONFIG).map(([key, config]) => {
                                const Icon = ICON_MAP[config.icon] || FileUp;
                                // @ts-ignore
                                const isComingSoon = config.comingSoon;
                                return (
                                    <button
                                        key={key}
                                        type="button"
                                        // @ts-ignore
                                        onClick={() => !isComingSoon && setFormData(prev => ({ ...prev, sourceType: key as any, sourceUrl: null }))}
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

export function DocumentChunksModal({
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
