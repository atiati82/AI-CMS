import React, { useState } from "react";
import {
    Search,
    Plus,
    FileText,
    Edit2,
    ChevronDown,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { Page } from "@/types/admin";

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
                    <Edit2 className="w-3.5 h-3.5" />
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
                            {page.status === "published" && <div className="w-2 h-2 rounded-full shrink-0 bg-green-500" />}
                            {page.status !== "published" && <div className="w-2 h-2 rounded-full shrink-0 bg-amber-500" />}
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

export default function PagesTab({ pages, onEdit, onCreate }: { pages: Page[]; onEdit: (page: Page) => void; onCreate: () => void }) {
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
                            <SelectValue placeholder="filter by status" />
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
