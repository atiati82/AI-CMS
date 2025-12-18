
import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Brain, Loader2, RefreshCw, Lightbulb } from "lucide-react";

export function SeoCopilotButton({ pageId, pageKey }: { pageId: string; pageKey: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const { data: suggestions, isLoading } = useQuery<any[]>({
        queryKey: ['/api/admin/seo-brain/suggestions', pageId],
        queryFn: async () => {
            if (!pageId) return [];
            const res = await apiRequest('GET', `/api/admin/seo-brain/suggestions/${pageId}`);
            return res.json();
        },
        enabled: !!pageId && isOpen,
    });

    const handleAnalyze = async () => {
        if (!pageId) {
            toast({ title: "Save First", description: "Please save the page before analyzing SEO", variant: "destructive" });
            return;
        }

        setIsAnalyzing(true);
        try {
            const res = await apiRequest('POST', `/api/admin/seo-brain/analyze/${pageId}`);
            const data = await res.json();
            queryClient.invalidateQueries({ queryKey: ['/api/admin/seo-brain/suggestions', pageId] });
            toast({ title: "Analysis Complete", description: `Generated ${data.suggestions?.length || 0} suggestions` });
        } catch (err: any) {
            toast({ title: "Error", description: err.message, variant: "destructive" });
        } finally {
            setIsAnalyzing(false);
        }
    };

    if (!pageId && !pageKey) {
        return (
            <span className="text-xs text-gray-500 italic">Save page to enable SEO Copilot</span>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setIsOpen(!isOpen)}
                className="border-violet-500/50 text-violet-400 hover:bg-violet-500/20 h-7 text-xs"
                data-testid="button-seo-copilot"
            >
                <Brain className="w-3 h-3 mr-1" />
                SEO Copilot
                {suggestions && suggestions.length > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 bg-violet-500/30 rounded-full text-[10px]">
                        {suggestions.length}
                    </span>
                )}
            </Button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-slate-800 border border-white/10 rounded-lg shadow-xl z-50 p-3 space-y-3">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-white">SEO Suggestions</h4>
                        <Button
                            type="button"
                            size="sm"
                            onClick={handleAnalyze}
                            disabled={isAnalyzing}
                            className="h-6 text-xs bg-violet-600 hover:bg-violet-700"
                        >
                            {isAnalyzing ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                        </Button>
                    </div>

                    {isLoading ? (
                        <div className="py-4 text-center">
                            <Loader2 className="w-5 h-5 animate-spin mx-auto text-violet-400" />
                        </div>
                    ) : suggestions && suggestions.length > 0 ? (
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                            {suggestions.slice(0, 5).map((s: any) => (
                                <div key={s.id} className="p-2 bg-slate-700/50 rounded text-xs">
                                    <div className="flex items-center gap-1 text-violet-300 font-medium mb-1">
                                        <Lightbulb className="w-3 h-3" />
                                        {s.suggestionType.replace(/_/g, ' ')}
                                    </div>
                                    <p className="text-slate-300 text-[11px] line-clamp-2">{s.reasoning}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-slate-400 text-center py-4">
                            No suggestions yet. Click refresh to analyze.
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="w-full text-xs text-slate-400 hover:text-white py-1"
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
}
