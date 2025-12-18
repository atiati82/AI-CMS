
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Redirect } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Plus, Trash2, Edit2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function RedirectsManager() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [isDataOpen, setIsDialogOpen] = useState(false);
    const [editingRedirect, setEditingRedirect] = useState<Redirect | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        sourcePath: "",
        targetPath: "",
        type: "301",
        isActive: true,
        description: ""
    });

    const { data: redirects, isLoading } = useQuery<Redirect[]>({
        queryKey: ["/api/admin/redirects"],
    });

    const createMutation = useMutation({
        mutationFn: async (newRedirect: any) => {
            const res = await fetch("/api/admin/redirects", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("admin_token")}` },
                body: JSON.stringify(newRedirect),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Failed to create redirect");
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/admin/redirects"] });
            setIsDialogOpen(false);
            resetForm();
            toast({ title: "Redirect Created", description: "New redirect rule has been added." });
        },
        onError: (err: Error) => {
            toast({ title: "Error", description: err.message, variant: "destructive" });
        }
    });

    const updateMutation = useMutation({
        mutationFn: async (redirect: any) => {
            const res = await fetch(`/api/admin/redirects/${redirect.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("admin_token")}` },
                body: JSON.stringify(redirect),
            });
            if (!res.ok) throw new Error("Failed to update redirect");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/admin/redirects"] });
            setIsDialogOpen(false);
            resetForm();
            toast({ title: "Redirect Updated", description: "Redirect rule has been updated." });
        },
        onError: (err: Error) => {
            toast({ title: "Error", description: err.message, variant: "destructive" });
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`/api/admin/redirects/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${localStorage.getItem("admin_token")}` },
            });
            if (!res.ok) throw new Error("Failed to delete redirect");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/admin/redirects"] });
            toast({ title: "Redirect Deleted", description: "Redirect rule has been removed." });
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingRedirect) {
            updateMutation.mutate({ ...formData, id: editingRedirect.id });
        } else {
            createMutation.mutate(formData);
        }
    };

    const handleEdit = (redirect: Redirect) => {
        setEditingRedirect(redirect);
        setFormData({
            sourcePath: redirect.sourcePath,
            targetPath: redirect.targetPath,
            type: redirect.type,
            isActive: redirect.isActive,
            description: redirect.description || ""
        });
        setIsDialogOpen(true);
    };

    const resetForm = () => {
        setEditingRedirect(null);
        setFormData({
            sourcePath: "",
            targetPath: "",
            type: "301",
            isActive: true,
            description: ""
        });
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-medium text-white">Redirect Rules</h3>
                    <p className="text-sm text-gray-400">Manage 301 and 302 redirects for your site.</p>
                </div>
                <Button onClick={() => { resetForm(); setIsDialogOpen(true); }} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                    <Plus className="w-4 h-4" /> Add Redirect
                </Button>
            </div>

            <div className="rounded-md border border-white/10 overflow-hidden bg-gray-900/50">
                <Table>
                    <TableHeader className="bg-gray-800/50">
                        <TableRow className="border-white/10">
                            <TableHead className="text-gray-400">Source Path</TableHead>
                            <TableHead className="text-gray-400">Target Path</TableHead>
                            <TableHead className="text-gray-400 w-[100px]">Type</TableHead>
                            <TableHead className="text-gray-400 w-[100px]">Status</TableHead>
                            <TableHead className="text-gray-400 w-[150px]">Stats</TableHead>
                            <TableHead className="text-gray-400 w-[100px] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-gray-500">Loading redirects...</TableCell>
                            </TableRow>
                        ) : redirects?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-gray-500">No redirects found. Create one to get started.</TableCell>
                            </TableRow>
                        ) : (
                            redirects?.map((redirect) => (
                                <TableRow key={redirect.id} className="border-white/5 hover:bg-white/5">
                                    <TableCell className="font-mono text-sm text-blue-300">{redirect.sourcePath}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-green-300 font-mono text-sm">
                                            <ArrowRight className="w-3 h-3 opacity-50" />
                                            {redirect.targetPath}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${redirect.type === '301' ? 'bg-purple-500/10 text-purple-400' : 'bg-yellow-500/10 text-yellow-400'
                                            }`}>
                                            {redirect.type}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex w-2 h-2 rounded-full mr-2 ${redirect.isActive ? 'bg-green-500' : 'bg-gray-500'}`} />
                                        <span className="text-xs text-gray-400">{redirect.isActive ? 'Active' : 'Inactive'}</span>
                                    </TableCell>
                                    <TableCell className="text-xs text-gray-500">
                                        <div>{redirect.triggerCount} hits</div>
                                        {redirect.lastTriggeredAt && (
                                            <div className="text-[10px]">Last: {new Date(redirect.lastTriggeredAt).toLocaleDateString()}</div>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(redirect)} className="h-8 w-8 hover:bg-white/10 hover:text-blue-400">
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(redirect.id)} className="h-8 w-8 hover:bg-white/10 hover:text-red-400">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDataOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-gray-900 border-white/10 text-white sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{editingRedirect ? 'Edit Redirect' : 'Add New Redirect'}</DialogTitle>
                        <DialogDescription className="text-gray-400">
                            Configure a URL redirect rule. Source paths map to target paths.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="source" className="text-white">Source Path</Label>
                            <Input
                                id="source"
                                placeholder="/old-page"
                                value={formData.sourcePath}
                                onChange={(e) => setFormData({ ...formData, sourcePath: e.target.value })}
                                className="bg-gray-800 border-white/10 text-white"
                                required
                            />
                            <p className="text-xs text-gray-500">The URL path you want to redirect FROM</p>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="target" className="text-white">Target Path</Label>
                            <Input
                                id="target"
                                placeholder="/new-page"
                                value={formData.targetPath}
                                onChange={(e) => setFormData({ ...formData, targetPath: e.target.value })}
                                className="bg-gray-800 border-white/10 text-white"
                                required
                            />
                            <p className="text-xs text-gray-500">The URL path you want to redirect TO</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="type" className="text-white">Redirect Type</Label>
                                <Select
                                    value={formData.type}
                                    onValueChange={(val) => setFormData({ ...formData, type: val })}
                                >
                                    <SelectTrigger className="bg-gray-800 border-white/10 text-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 border-white/10 text-white">
                                        <SelectItem value="301">301 (Permanent)</SelectItem>
                                        <SelectItem value="302">302 (Temporary)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="active" className="text-white">Status</Label>
                                <div className="flex items-center gap-2 h-10 px-3 bg-gray-800 rounded-md border border-white/10">
                                    <Switch
                                        id="active"
                                        checked={formData.isActive}
                                        onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                                    />
                                    <span className="text-sm text-gray-300">{formData.isActive ? 'Active' : 'Inactive'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="desc" className="text-white">Description (Optional)</Label>
                            <Input
                                id="desc"
                                placeholder="e.g. Migration from old site"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="bg-gray-800 border-white/10 text-white"
                            />
                        </div>

                        <DialogFooter className="mt-6">
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="text-gray-400 hover:text-white hover:bg-white/10">
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={createMutation.isPending || updateMutation.isPending}>
                                {createMutation.isPending || updateMutation.isPending ? 'Saving...' : (editingRedirect ? 'Update Redirect' : 'Create Redirect')}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
