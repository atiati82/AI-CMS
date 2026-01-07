import React, { useState } from "react";
import {
    Wand2,
    Search,
    Sparkles,
    ListTree,
    Loader2,
    FileCheck,
    Edit,
    CheckCircle,
    XCircle,
    Clock,
    Zap,
    Target,
    TrendingUp,
    X,
    Plus,
    ChevronRight,
    Trash,
    Layout,
    Eye,
    FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { MagicPageSuggestion, SeoKeyword } from "@/types/admin";

const MAGIC_PAGE_STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
    suggested: { label: 'Suggested', color: 'bg-slate-100 text-slate-800', icon: Sparkles },
    outline_ready: { label: 'Outline Ready', color: 'bg-blue-100 text-blue-800', icon: ListTree },
    generating: { label: 'Generating', color: 'bg-amber-100 text-amber-800', icon: Loader2 },
    draft_ready: { label: 'Draft Ready', color: 'bg-purple-100 text-purple-800', icon: FileCheck },
    editing: { label: 'Editing', color: 'bg-cyan-100 text-cyan-800', icon: Edit },
    published: { label: 'Published', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800', icon: XCircle },
};

interface MagicPageCardProps {
    suggestion: MagicPageSuggestion;
    onGenerateOutline: (id: string) => void;
    onGenerateDraft: (id: string, outline: any) => void;
    onPublish: (id: string) => void;
    onReject: (id: string) => void;
    onViewDetails: (suggestion: MagicPageSuggestion) => void;
    isProcessing: string | null;
}

function MagicPageCard({
    suggestion,
    onGenerateOutline,
    onGenerateDraft,
    onPublish,
    onReject,
    onViewDetails,
    isProcessing
}: MagicPageCardProps) {
    const status = MAGIC_PAGE_STATUS_CONFIG[suggestion.status] || MAGIC_PAGE_STATUS_CONFIG.suggested;
    const StatusIcon = status.icon;
    const processing = isProcessing === suggestion.id;

    return (
        <div className="bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <Badge className={cn("flex items-center gap-1", status.color)}>
                        <StatusIcon className={cn("w-3 h-3", processing && "animate-spin")} />
                        {status.label}
                    </Badge>
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => onViewDetails(suggestion)} className="h-8 w-8">
                            <Eye className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{suggestion.workingTitle}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{suggestion.targetKeyword}</p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                    <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Priority</span>
                        <span className="text-sm font-bold text-amber-600">High</span>
                    </div>

                    <div className="flex gap-2">
                        {suggestion.status === 'suggested' && (
                            <Button size="sm" onClick={() => onGenerateOutline(suggestion.id)} disabled={!!isProcessing}>
                                Generate Outline
                            </Button>
                        )}
                        {suggestion.status === 'outline_ready' && (
                            <Button size="sm" onClick={() => onGenerateDraft(suggestion.id, suggestion.outline)} disabled={!!isProcessing}>
                                Generate Draft
                            </Button>
                        )}
                        {suggestion.status === 'draft_ready' && (
                            <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700" onClick={() => onPublish(suggestion.id)}>
                                Publish
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface MagicPagesTabProps {
    suggestions: MagicPageSuggestion[];
    seoKeywords: SeoKeyword[];
    onGenerateSuggestions: () => void;
    onGenerateOutline: (id: string) => void;
    onGenerateDraft: (id: string, outline: any) => void;
    onPublish: (id: string) => void;
    onReject: (id: string) => void;
    isGenerating: boolean;
    processingId: string | null;
}

export default function MagicPagesTab({
    suggestions,
    seoKeywords,
    onGenerateSuggestions,
    onGenerateOutline,
    onGenerateDraft,
    onPublish,
    onReject,
    isGenerating,
    processingId
}: MagicPagesTabProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [viewingDetails, setViewingDetails] = useState<MagicPageSuggestion | null>(null);

    const filteredSuggestions = suggestions.filter(s =>
        s.workingTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.targetKeyword.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Wand2 className="w-6 h-6 text-purple-500" />
                        Magic Pages
                    </h2>
                    <p className="text-sm text-muted-foreground">AI-powered page generation from top SEO opportunities</p>
                </div>
                <Button
                    onClick={onGenerateSuggestions}
                    disabled={isGenerating}
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-xl hover:shadow-purple-500/20"
                >
                    {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                    Scan for Opportunities
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search suggestions..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {filteredSuggestions.length === 0 ? (
                <div className="text-center py-20 bg-muted/20 border border-dashed rounded-xl">
                    <Wand2 className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                    <h3 className="font-medium text-lg">No suggestions yet</h3>
                    <p className="text-sm text-muted-foreground">Run a scan to find high-performing SEO keywords</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

            {/* Details Modal */}
            <Dialog open={!!viewingDetails} onOpenChange={(open) => !open && setViewingDetails(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{viewingDetails?.workingTitle}</DialogTitle>
                        <DialogDescription>
                            Technical SEO optimization for "{viewingDetails?.targetKeyword}"
                        </DialogDescription>
                    </DialogHeader>

                    {viewingDetails && (
                        <div className="space-y-6 pt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-muted/50 rounded-lg">
                                    <span className="text-xs text-muted-foreground uppercase block mb-1">Target Slug</span>
                                    <code className="text-sm">/{viewingDetails.suggestedSlug}</code>
                                </div>
                                <div className="p-3 bg-muted/50 rounded-lg">
                                    <span className="text-xs text-muted-foreground uppercase block mb-1">Status</span>
                                    <Badge variant="outline">{viewingDetails.status}</Badge>
                                </div>
                            </div>

                            {viewingDetails.outline && (
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-sm flex items-center gap-2">
                                        <ListTree className="w-4 h-4" />
                                        Proposed Outline
                                    </h4>
                                    <div className="border rounded-lg p-4 bg-muted/20 space-y-2">
                                        {viewingDetails.outline.sections.map((section: any, i: number) => (
                                            <div key={i} className="flex gap-2">
                                                <span className="text-muted-foreground text-xs pt-1">{i + 1}.</span>
                                                <div className="flex-1">
                                                    <span className="font-medium text-sm">{section.heading}</span>
                                                    {section.description && <p className="text-xs text-muted-foreground mt-0.5">{section.description}</p>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setViewingDetails(null)}>Close</Button>
                        {viewingDetails?.status === 'suggested' && (
                            <Button onClick={() => onGenerateOutline(viewingDetails.id)}>Generate Outline</Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
