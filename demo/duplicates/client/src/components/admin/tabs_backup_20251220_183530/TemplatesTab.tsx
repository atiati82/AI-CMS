import React, { useState, useEffect } from "react";
import {
    Plus,
    Search,
    LayoutTemplate,
    ListTree,
    Code2,
    Eye,
    Edit,
    Trash,
    Save,
    Loader2,
    X,
    Copy,
    Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { TEMPLATE_TYPE_CONFIG } from "@/types/admin";
import type { HtmlTemplate, HtmlTemplateFormData } from "@/types/admin";

interface TemplatesTabProps {
    templates: HtmlTemplate[];
    onCreate: () => void;
    onEdit: (template: HtmlTemplate) => void;
    onDelete: (id: string) => void;
}

export default function TemplatesTab({
    templates,
    onCreate,
    onEdit,
    onDelete,
}: TemplatesTabProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const filteredTemplates = templates.filter(template => {
        const matchesSearch = !searchTerm || template.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === "all" || template.templateType === typeFilter;
        return matchesSearch && matchesType;
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">HTML Templates</h2>
                    <p className="text-sm text-muted-foreground">Manage reusable components for your site</p>
                </div>
                <Button onClick={onCreate} className="gap-2">
                    <Plus className="w-4 h-4" /> Add Template
                </Button>
            </div>

            <div className="flex items-center gap-4 justify-between">
                <div className="flex items-center gap-2 flex-1">
                    <div className="relative max-w-xs flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search templates..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            {Object.entries(TEMPLATE_TYPE_CONFIG).map(([key, config]) => (
                                <SelectItem key={key} value={key}>{config.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex border rounded-lg overflow-hidden">
                    <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="sm" onClick={() => setViewMode('grid')}>
                        <LayoutTemplate className="w-4 h-4" />
                    </Button>
                    <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="sm" onClick={() => setViewMode('list')}>
                        <ListTree className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className={viewMode === 'grid' ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" : "space-y-3"}>
                {filteredTemplates.map(template => (
                    <div key={template.id} className="bg-card border rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-bold text-sm">{template.name}</h3>
                                <code className="text-[10px] text-muted-foreground">{template.slug}</code>
                            </div>
                            <Badge variant="outline" className="text-[10px]">{template.templateType}</Badge>
                        </div>
                        {template.description && <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{template.description}</p>}
                        <div className="flex items-center justify-between pt-4 border-t">
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                <Code2 className="w-3 h-3" /> {template.htmlContent.length} chars
                            </span>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" onClick={() => onEdit(template)} className="h-8 w-8">
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => onDelete(template.id)} className="h-8 w-8 text-destructive">
                                    <Trash className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
