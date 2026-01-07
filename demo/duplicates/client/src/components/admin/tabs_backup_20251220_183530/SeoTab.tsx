import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RefreshCw, Plus, LayoutDashboard, Target, SplitSquareHorizontal, Activity, Book } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { SeoKeyword, Document } from "@/types/admin";
import { SeoOverview } from "@/components/admin/seo/SeoOverview";
import { KeywordManager } from "@/components/admin/seo/KeywordManager";
import { SiteAudit } from "@/components/admin/seo/SiteAudit";
import { GapAnalysis } from "@/components/admin/seo/GapAnalysis";
import { SeoDocumentation } from "@/components/admin/seo/SeoDocumentation";

export default function SeoTab() {
    const [activeTab, setActiveTab] = useState("overview");
    const queryClient = useQueryClient();
    const [isScanning, setIsScanning] = useState(false);

    // Queries
    const { data: keywords = [] } = useQuery<SeoKeyword[]>({
        queryKey: ["/api/admin/seo-keywords"],
    });

    const { data: documents = [] } = useQuery<Document[]>({
        queryKey: ["/api/admin/documents"],
    });

    // Mutations
    const createSeoKeywordMutation = useMutation({
        mutationFn: async (data: { keyword: string; searchIntent: string; targetClusterKey?: string; notes?: string }) => {
            const res = await apiRequest("POST", "/api/admin/seo-keywords", data);
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-keywords"] });
        },
    });

    const updateSeoKeywordMutation = useMutation({
        mutationFn: async ({ id, data }: { id: string; data: Partial<SeoKeyword> }) => {
            const res = await apiRequest("PUT", `/api/admin/seo-keywords/${id}`, data);
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-keywords"] });
        },
    });

    const deleteSeoKeywordMutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await apiRequest("DELETE", `/api/admin/seo-keywords/${id}`);
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-keywords"] });
        },
    });

    const scanDocumentMutation = useMutation({
        mutationFn: async (documentId: string) => {
            const res = await apiRequest("POST", `/api/admin/seo/scan-document/${documentId}`, {});
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-keywords"] });
        },
    });

    // Handlers
    const handleAddKeyword = async (keyword: string) => {
        await createSeoKeywordMutation.mutateAsync({ keyword, searchIntent: 'informational' });
    };

    const handleSeoStatusChange = async (keywordId: string, newStatus: SeoKeyword['status']) => {
        await updateSeoKeywordMutation.mutateAsync({ id: keywordId, data: { status: newStatus } });
    };

    const handleDeleteKeyword = async (keywordId: string) => {
        await deleteSeoKeywordMutation.mutateAsync(keywordId);
    };

    const handleScanDocument = async (documentId: string) => {
        setIsScanning(true);
        try {
            await scanDocumentMutation.mutateAsync(documentId);
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-2">SEO & Content Brain</h2>
                    <p className="text-slate-400">
                        Manage keywords, analyze content gaps, and audit zone compliance.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Run Site Audit
                    </Button>
                    <Button onClick={() => setActiveTab("keywords")}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Keyword
                    </Button>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="bg-slate-900/50 border border-slate-800 p-1">
                    <TabsTrigger value="overview" className="gap-2">
                        <LayoutDashboard className="w-4 h-4" />
                        Overview
                    </TabsTrigger>
                    <TabsTrigger value="keywords" className="gap-2">
                        <Target className="w-4 h-4" />
                        Keyword Manager
                    </TabsTrigger>
                    <TabsTrigger value="gaps" className="gap-2">
                        <SplitSquareHorizontal className="w-4 h-4" />
                        Gap Analysis
                    </TabsTrigger>
                    <TabsTrigger value="audit" className="gap-2">
                        <Activity className="w-4 h-4" />
                        Site Audit
                    </TabsTrigger>
                    <TabsTrigger value="docs" className="gap-2">
                        <Book className="w-4 h-4" />
                        System Guide
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <SeoOverview />
                </TabsContent>

                <TabsContent value="keywords" className="space-y-4">
                    <KeywordManager
                        keywords={keywords}
                        documents={documents}
                        onStatusChange={handleSeoStatusChange}
                        onDelete={handleDeleteKeyword}
                        onScanDocument={handleScanDocument}
                        onAddKeyword={handleAddKeyword}
                        isScanning={isScanning}
                    />
                </TabsContent>

                <TabsContent value="gaps" className="space-y-4">
                    <GapAnalysis />
                </TabsContent>

                <TabsContent value="audit" className="space-y-4">
                    <SiteAudit />
                </TabsContent>

                <TabsContent value="docs" className="space-y-4">
                    <SeoDocumentation />
                </TabsContent>

            </Tabs>
        </div>
    );
}
