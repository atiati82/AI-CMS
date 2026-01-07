import React, { useState } from "react";
import {
    Palette,
    Paintbrush,
    Heart,
    Film,
    Image,
    Lightbulb,
    ChevronRight,
    Box,
    Edit3,
    Save,
    Loader2,
    X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Cluster, VisualVibe } from "@/types/admin";

export function VisualVibeDisplay({ vibe, compact = false }: { vibe: VisualVibe | null | undefined; compact?: boolean }) {
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

interface ClustersTabProps {
    clusters: Cluster[];
    onUpdateCluster?: (id: string, data: Partial<Cluster>) => Promise<void>;
}

export default function ClustersTab({ clusters, onUpdateCluster }: ClustersTabProps) {
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
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {clusters.map((cluster) => (
                    <div key={cluster.id} className="bg-card border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-4 flex items-start gap-4">
                            <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 border"
                                style={{ backgroundColor: cluster.color || 'transparent' }}
                            >
                                <Box className="w-6 h-6 opacity-30" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold truncate">{cluster.name}</h3>
                                <p className="text-xs text-muted-foreground truncate">{cluster.slug}</p>
                                <VisualVibeDisplay vibe={cluster.visualVibe} compact />
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => handleOpenVibeDialog(cluster)}>
                                <Edit3 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <Dialog open={isVibeDialogOpen} onOpenChange={setIsVibeDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Update Visual Vibe: {selectedCluster?.name}</DialogTitle>
                        <DialogDescription>
                            Configure the visual and emotional direction for this content cluster.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-4">
                        <div className="grid gap-2">
                            <Label>Cluster Color</Label>
                            <div className="flex gap-2 items-center">
                                <Input
                                    type="color"
                                    value={vibeForm.color}
                                    onChange={(e) => setVibeForm({ ...vibeForm, color: e.target.value })}
                                    className="w-12 h-10 p-1"
                                />
                                <Input
                                    placeholder="#000000"
                                    value={vibeForm.color}
                                    onChange={(e) => setVibeForm({ ...vibeForm, color: e.target.value })}
                                    className="font-mono flex-1"
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label>Vibe Keywords (comma separated)</Label>
                            <Input
                                value={vibeForm.vibeKeywordsText}
                                onChange={(e) => setVibeForm({ ...vibeForm, vibeKeywordsText: e.target.value })}
                                placeholder="ethereal, crystalline, geometric..."
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Emotional Tone (comma separated)</Label>
                            <Input
                                value={vibeForm.emotionalToneText}
                                onChange={(e) => setVibeForm({ ...vibeForm, emotionalToneText: e.target.value })}
                                placeholder="calm, empowering, scientific..."
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>AI Image Prompt Pattern</Label>
                            <Textarea
                                value={vibeForm.aiImagePromptPattern}
                                onChange={(e) => setVibeForm({ ...vibeForm, aiImagePromptPattern: e.target.value })}
                                placeholder="High-resolution crystalline structures with a soft golden glow..."
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Designer Notes</Label>
                            <Textarea
                                value={vibeForm.designerNotes}
                                onChange={(e) => setVibeForm({ ...vibeForm, designerNotes: e.target.value })}
                                placeholder="Keep whitespace generous, use thin geometric lines..."
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsVibeDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSaveVibe} disabled={isSaving}>
                            {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                            Save Visual Vibe
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
