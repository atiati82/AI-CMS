
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Edit, Trash, Database, FileText, Clock } from "lucide-react";
import { Document, SOURCE_TYPE_CONFIG, STATUS_CONFIG } from "@/types/admin";

export function DocumentCard({
    document,
    onEdit,
    onDelete,
    onIndex,
    isIndexing
}: {
    document: Document;
    onEdit: (doc: Document) => void;
    onDelete: (id: string) => void;
    onIndex: (id: string) => void;
    isIndexing: boolean
}) {
    // @ts-ignore
    const sourceConfig = SOURCE_TYPE_CONFIG[document.sourceType as keyof typeof SOURCE_TYPE_CONFIG] || { label: 'Unknown', icon: FileText, color: 'text-gray-600' };
    // @ts-ignore
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-muted-foreground">
                <div>
                    <div className="mb-1">Tags</div>
                    <div className="font-medium text-foreground">
                        {document.tags && document.tags.length > 0 ? document.tags.slice(0, 2).join(', ') + (document.tags.length > 2 ? ` +${document.tags.length - 2}` : '') : 'None'}
                    </div>
                </div>
                <div>
                    <div className="mb-1">Chunks</div>
                    <div className="font-medium text-foreground">{document.chunkCount || 0}</div>
                </div>
                <div>
                    <div className="mb-1">Words</div>
                    <div className="font-medium text-foreground">{document.wordCount?.toLocaleString() || 0}</div>
                </div>
                <div>
                    <div className="mb-1">Last Updated</div>
                    <div className="font-medium text-foreground">
                        {new Date(document.updatedAt).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>
    );
}
