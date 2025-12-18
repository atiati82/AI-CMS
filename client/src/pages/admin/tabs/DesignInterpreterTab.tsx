import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Sparkles, Paintbrush, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DesignInterpretation {
    colorWorld: string;
    theme: string;
    emotionalTone: string[];
    visualVibe: string;
    motionPreset: string;
    suggestedComponents: string[];
    designReasoning: string;
    typography: string;
}

export default function DesignInterpreterTab() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState<DesignInterpretation | null>(null);

    const interpretMutation = useMutation({
        mutationFn: async (text: string) => {
            const res = await fetch("/api/admin/design/interpret", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: text }),
            });
            if (!res.ok) throw new Error("Failed to interpret design");
            return res.json();
        },
        onSuccess: (data) => {
            setResult(data.output || data); // Handle potential wrapping
        },
    });

    const createMagicPageMutation = useMutation({
        mutationFn: async (design: DesignInterpretation) => {
            const prompt = `Create a page with title "${input.substring(0, 50)}..." based on this design: ${design.designReasoning}. 
            Visual Style: ${design.visualVibe}. 
            Color World: ${design.colorWorld}. 
            Motion: ${design.motionPreset}.
            Use the tree theme: ${design.theme}.`;

            const res = await fetch("/api/admin/design/magic-pages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: input.substring(0, 50) + " (Draft)",
                    sourceType: "paste",
                    sourceContent: prompt,
                    designContext: design // Pass full design context for learning
                }),
            });
            if (!res.ok) throw new Error("Failed to create magic page");
            return res.json();
        },
    });

    const handleInterpret = () => {
        if (!input.trim()) return;
        interpretMutation.mutate(input);
    };

    const handleCreateDraft = () => {
        if (!result) return;
        createMagicPageMutation.mutate(result);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold tracking-tight">Design Interpreter</h2>
                <p className="text-muted-foreground">
                    Translate raw concepts into the Andara Visual Language.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Source Concept</CardTitle>
                            <CardDescription>
                                Describe the page goal, feeling, or content. The more metaphysical or scientific, the better.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Textarea
                                placeholder="e.g. A page about the fourth phase of water, feeling structured but fluid, like liquid crystal..."
                                className="min-h-[200px] resize-none"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <Button
                                onClick={handleInterpret}
                                disabled={interpretMutation.isPending || !input.trim()}
                                className="w-full"
                            >
                                {interpretMutation.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Interpreting...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        Interpret Design
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-4">
                    {result ? (
                        <Card className="h-full border-primary/20 bg-primary/5">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <Paintbrush className="h-5 w-5 text-primary" />
                                        Visual Specification
                                    </CardTitle>
                                    <Badge variant="outline" className="border-primary/50 text-primary">
                                        {result.theme}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-muted-foreground uppercase">Color World</label>
                                        <div className="font-medium text-sm">{result.colorWorld}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-muted-foreground uppercase">Visual Vibe</label>
                                        <div className="font-medium text-sm">{result.visualVibe}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-muted-foreground uppercase">Motion Preset</label>
                                        <div className="font-medium text-sm font-mono text-primary">{result.motionPreset}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-muted-foreground uppercase">Typography</label>
                                        <div className="font-medium text-sm">{result.typography}</div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-muted-foreground uppercase">Emotional Tone</label>
                                    <div className="flex flex-wrap gap-2">
                                        {result.emotionalTone?.map((tone, i) => (
                                            <Badge key={i} variant="secondary" className="bg-background/50">
                                                {tone}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-muted-foreground uppercase">Reasoning</label>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {result.designReasoning}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-muted-foreground uppercase">Suggested Components</label>
                                    <div className="flex flex-wrap gap-2">
                                        {result.suggestedComponents?.map((comp, i) => (
                                            <Badge key={i} variant="outline">
                                                {comp}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="h-full flex items-center justify-center border-dashed">
                            <div className="text-center text-muted-foreground p-8">
                                <Paintbrush className="mx-auto h-12 w-12 opacity-20 mb-4" />
                                <p>Enter a brief to see the<br />Visual Interpreter in action</p>
                            </div>
                        </Card>
                    )}
                    {result && (
                        <Button
                            onClick={handleCreateDraft}
                            disabled={createMagicPageMutation.isPending}
                            className="w-full"
                            variant="secondary"
                        >
                            {createMagicPageMutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating Draft...
                                </>
                            ) : (
                                <>
                                    <ArrowRight className="mr-2 h-4 w-4" />
                                    Create Magic Page Draft
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
