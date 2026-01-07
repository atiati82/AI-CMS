import React, { useState } from "react";
import { ChevronDown, ChevronRight, FileText, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Page } from "@/types/admin";

export function PageTreeNode({ page, level = 0, onEdit }: { page: Page; level?: number; onEdit: (page: Page) => void }) {
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
