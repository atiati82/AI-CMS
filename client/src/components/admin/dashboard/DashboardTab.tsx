import React from "react";
import { GoldLogoLoader } from "@/components/ui/GoldLogoLoader";
import { FileText, Eye, EyeOff, Package, Beaker, FolderTree, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentStats } from "@/types/admin";
import { StatCard } from "@/components/admin/dashboard/StatCard";
import RecentPages from "@/components/admin/RecentPages";

export interface DashboardTabProps {
    stats: ContentStats | null;
    onCreatePage: () => void;
}

export default function DashboardTab({ stats, onCreatePage }: DashboardTabProps) {
    if (!stats) {
        return (
            <div className="flex justify-center py-20">
                <GoldLogoLoader size={64} />
            </div>
        );
    }

    const publishRate = stats.totalPages > 0
        ? Math.round((stats.publishedPages / stats.totalPages) * 100)
        : 0;

    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden bg-linear-to-r from-purple-600 via-violet-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
                <div className="absolute inset-0 bg-grid-white/10" />
                <div className="relative z-10">
                    <h1 className="text-2xl font-bold mb-2">Welcome to Andara Ionic CMS</h1>
                    <p className="text-white/80 max-w-xl">Manage your content, products, and science library from this central dashboard.</p>
                </div>
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute -top-8 -right-16 w-32 h-32 bg-white/10 rounded-full blur-xl" />
            </div>

            {/* Stats Grid */}
            <div>
                <h2 className="text-lg font-semibold mb-4 text-foreground">Content Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <StatCard
                        label="Total Pages"
                        value={stats.totalPages}
                        icon={FileText}
                        gradient="from-blue-500 to-blue-600"
                        subtitle="All content pages"
                    />
                    <StatCard
                        label="Published"
                        value={stats.publishedPages}
                        icon={Eye}
                        gradient="from-green-500 to-emerald-600"
                        trend={publishRate}
                        trendLabel="publish rate"
                    />
                    <StatCard
                        label="Drafts"
                        value={stats.draftPages}
                        icon={EyeOff}
                        gradient="from-amber-500 to-orange-600"
                        subtitle="Awaiting review"
                    />
                    <StatCard
                        label="Products"
                        value={stats.totalProducts}
                        icon={Package}
                        gradient="from-purple-500 to-violet-600"
                        subtitle="Active listings"
                    />
                    <StatCard
                        label="Science Articles"
                        value={stats.totalArticles}
                        icon={Beaker}
                        gradient="from-cyan-500 to-teal-600"
                        subtitle="Knowledge base"
                    />
                    <StatCard
                        label="Clusters"
                        value={stats.totalClusters}
                        icon={FolderTree}
                        gradient="from-rose-500 to-pink-600"
                        subtitle="Content groups"
                    />
                </div>
            </div>

            {/* Quick Actions & Recent Pages */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col gap-6">
                    <RecentPages />
                </div>

                <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm h-fit">
                    <h3 className="font-semibold mb-4 text-foreground">Quick Actions</h3>
                    <div className="flex flex-wrap gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onCreatePage}
                            className="bg-linear-to-r from-blue-500/10 to-blue-600/10 border-blue-500/30 hover:border-blue-500/50 hover:bg-blue-500/20"
                            data-testid="button-add-page"
                        >
                            <Plus className="w-4 h-4 mr-2" /> New Page
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-linear-to-r from-cyan-500/10 to-cyan-600/10 border-cyan-500/30 hover:border-cyan-500/50 hover:bg-cyan-500/20"
                            data-testid="button-add-article"
                        >
                            <Plus className="w-4 h-4 mr-2" /> New Article
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
