import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Loader2, Palette, Type, Layout, Save, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Badge } from '@/components/ui/badge';

// Mock cluster names if API is slow or empty (fallback)
const KNOWN_CLUSTERS = [
    'water_science',
    'mineral_science',
    'crystalline_matrix',
    'bioelectric_science',
    'products',
    'support'
];

interface DesignTokenSet {
    clusterKey: string;
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        surface: string;
        text: string;
    };
    typography: {
        headingFont: string;
        bodyFont: string;
    };
    borderRadius: string;
}

export default function DesignTokensTab() {
    const queryClient = useQueryClient();
    const [selectedCluster, setSelectedCluster] = useState<string>('water_science');
    const [localTokens, setLocalTokens] = useState<DesignTokenSet | null>(null);

    // Fetch tokens for selected cluster
    const { data: remoteTokens, isLoading, refetch } = useQuery<DesignTokenSet | null>({
        queryKey: [`/api/admin/design-tokens/${selectedCluster}`],
        enabled: !!selectedCluster,
    });

    // Sync remote data to local state for editing
    useEffect(() => {
        if (remoteTokens) {
            setLocalTokens(remoteTokens);
        } else if (!isLoading && !remoteTokens) {
            // Default template if no tokens exist yet
            setLocalTokens({
                clusterKey: selectedCluster,
                colors: {
                    primary: '#3b82f6',
                    secondary: '#1e40af',
                    accent: '#06b6d4',
                    background: '#0f172a',
                    surface: '#1e293b',
                    text: '#f8fafc'
                },
                typography: {
                    headingFont: 'Inter',
                    bodyFont: 'Inter'
                },
                borderRadius: '0.5rem'
            });
        }
    }, [remoteTokens, selectedCluster, isLoading]);

    const saveTokensMutation = useMutation({
        mutationFn: async (tokens: DesignTokenSet) => {
            await apiRequest('PUT', `/api/admin/design-tokens/${tokens.clusterKey}`, tokens);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`/api/admin/design-tokens/${selectedCluster}`] });
            toast({ title: 'Design tokens updated', description: `Visual identity for ${selectedCluster} saved.` });
        },
        onError: (error: Error) => {
            toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
        }
    });

    const handleColorChange = (key: keyof DesignTokenSet['colors'], value: string) => {
        if (!localTokens) return;
        setLocalTokens({
            ...localTokens,
            colors: {
                ...localTokens.colors,
                [key]: value
            }
        });
    };

    if (!localTokens && isLoading) {
        return <div className="flex items-center justify-center p-12"><Loader2 className="animate-spin w-8 h-8 opacity-50" /></div>;
    }

    return (
        <div className="flex h-[calc(100vh-140px)] gap-6">
            {/* Sidebar - Cluster Selection */}
            <div className="w-64 flex-shrink-0 border-r pr-6 space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Clusters</h3>
                    <p className="text-xs text-muted-foreground mb-4">Select a content cluster to customize its visual theme.</p>
                    <ScrollArea className="h-[500px]">
                        <div className="space-y-1">
                            {KNOWN_CLUSTERS.map(cluster => (
                                <Button
                                    key={cluster}
                                    variant={selectedCluster === cluster ? "secondary" : "ghost"}
                                    className="w-full justify-start text-sm"
                                    onClick={() => setSelectedCluster(cluster)}
                                >
                                    <Palette className="w-4 h-4 mr-2 opacity-70" />
                                    {cluster.replace('_', ' ')}
                                </Button>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>

            {/* Main Editor */}
            <div className="flex-1 overflow-y-auto pb-20">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold capitalize">{selectedCluster ? selectedCluster.replace('_', ' ') : 'Select Cluster'} Theme</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="font-mono text-xs">ID: {selectedCluster}</Badge>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => refetch()} title="Reset to saved">
                            <RefreshCw className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => localTokens && saveTokensMutation.mutate(localTokens)} disabled={saveTokensMutation.isPending}>
                            {saveTokensMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                            Save Changes
                        </Button>
                    </div>
                </div>

                {localTokens ? (
                    <div className="grid gap-6">
                        {/* Color Palette */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Palette className="w-5 h-5" /> Color Palette</CardTitle>
                                <CardDescription>Define the core colors for this cluster's pages.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label>Primary Brand</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                type="color"
                                                value={localTokens.colors.primary}
                                                onChange={(e) => handleColorChange('primary', e.target.value)}
                                                className="w-12 p-1 h-9 cursor-pointer"
                                            />
                                            <Input
                                                value={localTokens.colors.primary}
                                                onChange={(e) => handleColorChange('primary', e.target.value)}
                                                className="font-mono"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Secondary / Dark</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                type="color"
                                                value={localTokens.colors.secondary}
                                                onChange={(e) => handleColorChange('secondary', e.target.value)}
                                                className="w-12 p-1 h-9 cursor-pointer"
                                            />
                                            <Input
                                                value={localTokens.colors.secondary}
                                                onChange={(e) => handleColorChange('secondary', e.target.value)}
                                                className="font-mono"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Accent / Highlight</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                type="color"
                                                value={localTokens.colors.accent}
                                                onChange={(e) => handleColorChange('accent', e.target.value)}
                                                className="w-12 p-1 h-9 cursor-pointer"
                                            />
                                            <Input
                                                value={localTokens.colors.accent}
                                                onChange={(e) => handleColorChange('accent', e.target.value)}
                                                className="font-mono"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Preview Card */}
                                <div className="border rounded-lg p-6 flex flex-col items-center justify-center space-y-4 shadow-sm" style={{ backgroundColor: localTokens.colors.background }}>
                                    <div className="text-center space-y-2">
                                        <h3 className="text-2xl font-bold" style={{ color: localTokens.colors.text }}>Preview Title</h3>
                                        <p style={{ color: localTokens.colors.text, opacity: 0.8 }}>This is how your text will look on the background.</p>
                                    </div>
                                    <Button style={{ backgroundColor: localTokens.colors.primary, color: '#fff' }}>Primary Button</Button>
                                    <Button variant="outline" style={{ borderColor: localTokens.colors.accent, color: localTokens.colors.accent }}>Outline Action</Button>
                                    <div className="p-4 rounded-md w-full text-center text-sm" style={{ backgroundColor: localTokens.colors.surface, color: localTokens.colors.text }}>
                                        Surface / Card Area
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Typography & Shape */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Type className="w-5 h-5" /> Typography & Shape</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Heading Font</Label>
                                    <Select
                                        value={localTokens.typography.headingFont}
                                        onValueChange={(v) => setLocalTokens({ ...localTokens, typography: { ...localTokens.typography, headingFont: v } })}
                                    >
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Inter">Inter</SelectItem>
                                            <SelectItem value="Outfit">Outfit</SelectItem>
                                            <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                                            <SelectItem value="Space Grotesk">Space Grotesk</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Border Radius</Label>
                                    <Select
                                        value={localTokens.borderRadius}
                                        onValueChange={(v) => setLocalTokens({ ...localTokens, borderRadius: v })}
                                    >
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0px">None (Square)</SelectItem>
                                            <SelectItem value="0.25rem">Small</SelectItem>
                                            <SelectItem value="0.5rem">Medium</SelectItem>
                                            <SelectItem value="1rem">Large</SelectItem>
                                            <SelectItem value="9999px">Pill</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <div className="text-center py-20 text-muted-foreground">Select a cluster to begin editing</div>
                )}
            </div>
        </div>
    );
}
