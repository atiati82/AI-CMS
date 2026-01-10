import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, RefreshCw, Wand2, Plus, Film, CheckCircle2, AlertCircle, Scan } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VideoAnalysis {
    description: string;
    tags: string[];
    mood: string;
    colorPalette: string[];
}

export default function VideoIngestionTab() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [analyzingFile, setAnalyzingFile] = useState<string | null>(null);
    const [analysisData, setAnalysisData] = useState<Record<string, VideoAnalysis>>({});
    const [semanticNames, setSemanticNames] = useState<Record<string, string>>({});

    const { data: files = [], isLoading, refetch } = useQuery<string[]>({
        queryKey: ["/api/admin/video-ingestion/scan"],
    });

    const analyzeMutation = useMutation({
        mutationFn: async (filename: string) => {
            const res = await apiRequest("POST", "/api/admin/video-ingestion/analyze", { filename });
            return await res.json() as VideoAnalysis;
        },
        onSuccess: (data, filename) => {
            setAnalysisData(prev => ({ ...prev, [filename]: data }));
            // Suggest a semantic name based on the first two tags
            const suggestedName = data.tags.slice(0, 2).join('-').toLowerCase() + '-' + Math.random().toString(36).substring(2, 5);
            setSemanticNames(prev => ({ ...prev, [filename]: suggestedName }));
            toast({ title: "Analysis Complete", description: `Generated tags for ${filename}` });
        },
        onSettled: () => setAnalyzingFile(null)
    });

    const registerMutation = useMutation({
        mutationFn: async ({ filename, semanticName, metadata }: { filename: string, semanticName: string, metadata: VideoAnalysis }) => {
            const res = await apiRequest("POST", "/api/admin/video-ingestion/register", { filename, semanticName, metadata });
            return await res.json();
        },
        onSuccess: (_, { filename }) => {
            toast({ title: "Registered", description: "Video moved to backgrounds and registered." });
            queryClient.invalidateQueries({ queryKey: ["/api/admin/video-ingestion/scan"] });
        }
    });

    const handleAnalyze = (filename: string) => {
        setAnalyzingFile(filename);
        analyzeMutation.mutate(filename);
    };

    const handleRegister = (filename: string) => {
        const semanticName = semanticNames[filename];
        const metadata = analysisData[filename];
        if (!semanticName || !metadata) return;

        registerMutation.mutate({ filename, semanticName, metadata });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gradient-gold-shine">Video Ingestion Pipeline</h2>
                    <p className="text-muted-foreground">Scan uploads, analyze with Gemini Vision, and register to Smart Media System.</p>
                </div>
                <Button onClick={() => refetch()} variant="outline" className="gap-2">
                    <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                    Rescan Uploads
                </Button>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center p-20">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : files.length === 0 ? (
                <Card className="p-20 text-center bg-white/5 border-dashed">
                    <Film className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-medium">No new videos found</h3>
                    <p className="text-muted-foreground">Upload .mp4 files to /uploads/Videos to begin.</p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {files.map(file => (
                        <Card key={file} className="bg-slate-900/50 border-slate-800 overflow-hidden">
                            <div className="aspect-video bg-black flex items-center justify-center relative">
                                <Film className="w-8 h-8 text-slate-700" />
                                {analyzingFile === file && (
                                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 text-center">
                                        <Loader2 className="w-6 h-6 animate-spin text-amber-500 mb-2" />
                                        <p className="text-xs text-amber-500 font-medium">Gemini is analyzing frames...</p>
                                    </div>
                                )}
                            </div>
                            <CardContent className="p-4 space-y-4">
                                <div>
                                    <p className="text-sm font-medium truncate mb-1">{file}</p>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Unregistered Upload</p>
                                </div>

                                {analysisData[file] ? (
                                    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                                        <div className="flex flex-wrap gap-1">
                                            {analysisData[file].tags.map(tag => (
                                                <Badge key={tag} variant="secondary" className="text-[10px] py-0">{tag}</Badge>
                                            ))}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase font-bold text-slate-500">Semantic Name</label>
                                            <Input
                                                value={semanticNames[file] || ""}
                                                onChange={e => setSemanticNames(prev => ({ ...prev, [file]: e.target.value }))}
                                                className="h-8 text-xs bg-slate-950 border-slate-800"
                                            />
                                        </div>
                                        <Button
                                            size="sm"
                                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white gap-2"
                                            onClick={() => handleRegister(file)}
                                            disabled={registerMutation.isPending}
                                        >
                                            {registerMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                            Register Video
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full gap-2 border-slate-700 hover:border-amber-500/50 hover:bg-amber-500/5"
                                        onClick={() => handleAnalyze(file)}
                                        disabled={analyzingFile !== null}
                                    >
                                        <Wand2 className="w-4 h-4 text-amber-500" />
                                        AI Analyze Frames
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
