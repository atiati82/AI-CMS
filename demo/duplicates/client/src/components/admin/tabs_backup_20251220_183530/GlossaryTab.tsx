
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Trash, Edit, BookOpen, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Define Term type locally to match schema
interface GlossaryTerm {
    id: string;
    term: string;
    definition: string;
    variations: string[];
    tags: string[];
    referenceUrl?: string;
    category?: string;
    isActive: boolean;
    createdAt: string;
}

export function GlossaryTab() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [newItem, setNewItem] = useState({
        term: '', definition: '', category: 'general', tags: '', variations: ''
    });

    // 1. Fetch Terms
    const { data: terms, isLoading } = useQuery<GlossaryTerm[]>({
        queryKey: ['/api/admin/glossary'],
    });

    // 2. Create Mutation
    const createMutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await apiRequest('POST', '/api/admin/glossary', data);
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/admin/glossary'] });
            setIsCreateOpen(false);
            setNewItem({ term: '', definition: '', category: 'general', tags: '', variations: '' });
            toast({ title: "Term Created", description: "Successfully added to glossary." });
        },
        onError: (err: any) => {
            toast({ title: "Failed to create", description: err.message, variant: "destructive" });
        }
    });

    // 3. Delete Mutation
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            await apiRequest('DELETE', `/api/admin/glossary/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/admin/glossary'] });
            toast({ title: "Term Deleted", description: "Removed from glossary." });
        }
    });

    const handleCreate = () => {
        if (!newItem.term || !newItem.definition) {
            toast({ title: "Error", description: "Term and Definition are required", variant: "destructive" });
            return;
        }

        const payload = {
            term: newItem.term,
            definition: newItem.definition,
            category: newItem.category,
            // Split comma values
            tags: newItem.tags ? newItem.tags.split(',').map(s => s.trim()).filter(Boolean) : [],
            variations: newItem.variations ? newItem.variations.split(',').map(s => s.trim()).filter(Boolean) : []
        };
        createMutation.mutate(payload);
    };

    // Filter
    const filteredTerms = terms?.filter(t =>
        t.term.toLowerCase().includes(search.toLowerCase()) ||
        t.definition.toLowerCase().includes(search.toLowerCase())
    ) || [];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Glossary
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        Define domain-specific terminology for the AI RAG system.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600">
                                <Plus className="mr-2 h-4 w-4" /> Add Term
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Glossary Term</DialogTitle>
                                <DialogDescription>
                                    Create a new definition for the AI to learn.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label>Term</Label>
                                    <Input
                                        value={newItem.term}
                                        onChange={e => setNewItem({ ...newItem, term: e.target.value })}
                                        placeholder="e.g. Ionic Drops"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Definition</Label>
                                    <Textarea
                                        value={newItem.definition}
                                        onChange={e => setNewItem({ ...newItem, definition: e.target.value })}
                                        placeholder="Detailed explanation..."
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label>Variations (comma sep)</Label>
                                        <Input
                                            value={newItem.variations}
                                            onChange={e => setNewItem({ ...newItem, variations: e.target.value })}
                                            placeholder="Ionic Water, Drops"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Tags (comma sep)</Label>
                                        <Input
                                            value={newItem.tags}
                                            onChange={e => setNewItem({ ...newItem, tags: e.target.value })}
                                            placeholder="product, science"
                                        />
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleCreate} disabled={createMutation.isPending}>
                                    {createMutation.isPending ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                                    Save Term
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* List */}
            <div className="border rounded-md bg-card/50 backdrop-blur-sm">
                <div className="p-4 border-b flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search glossary..."
                            className="pl-9"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Term</TableHead>
                            <TableHead>Definition</TableHead>
                            <TableHead>Tags</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    <Loader2 className="animate-spin h-6 w-6 mx-auto text-muted-foreground" />
                                </TableCell>
                            </TableRow>
                        ) : filteredTerms.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                    No terms found. Add one to teach the AI!
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredTerms.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="h-4 w-4 text-primary" />
                                            {item.term}
                                        </div>
                                        {item.variations.length > 0 && (
                                            <div className="text-xs text-muted-foreground mt-1">
                                                aka: {item.variations.join(', ')}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="max-w-md truncate" title={item.definition}>
                                        {item.definition}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {item.tags.map(tag => (
                                                <Badge key={tag} variant="outline" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                            onClick={() => {
                                                if (confirm('Delete this term?')) deleteMutation.mutate(item.id);
                                            }}
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default GlossaryTab;
