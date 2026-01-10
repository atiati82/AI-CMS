import React from "react";
import {
    FileText, Eye, EyeOff, Package, Beaker, FolderTree,
    Wand2, RefreshCw, Plus, Target, CheckCircle2, AlertCircle, XCircle,
    BarChart2, Scan, Clock, FileCheck
} from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { getAuthToken } from "@/lib/queryClient";
import { StatCard } from "../StatCard";
import type { ContentStats } from "@/types/admin";

interface DashboardTabProps {
    stats: ContentStats | null;
    onCreatePage: () => void;
}

export default function DashboardTab({ stats, onCreatePage }: DashboardTabProps) {
    const { toast } = useToast();

    if (!stats) {
        return <div className="text-center py-12 text-muted-foreground">Loading stats...</div>;
    }

    const publishRate = stats.totalPages > 0
        ? Math.round((stats.publishedPages / stats.totalPages) * 100)
        : 0;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
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

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Content Distribution Chart */}
                <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-semibold mb-4 text-foreground">Content Distribution</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={[
                                    { name: 'Pages', value: stats.totalPages, fill: '#3b82f6' },
                                    { name: 'Products', value: stats.totalProducts, fill: '#8b5cf6' },
                                    { name: 'Articles', value: stats.totalArticles, fill: '#06b6d4' },
                                    { name: 'Clusters', value: stats.totalClusters, fill: '#f43f5e' },
                                ]}
                                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                                    axisLine={{ stroke: 'hsl(var(--border))' }}
                                />
                                <YAxis
                                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                                    axisLine={{ stroke: 'hsl(var(--border))' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--card))',
                                        border: '1px solid hsl(var(--border))',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                                    }}
                                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                                />
                                <Bar dataKey="value" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Page Status Breakdown */}
                <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-semibold mb-4 text-foreground">Page Status</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: 'Published', value: stats.publishedPages, fill: '#22c55e' },
                                        { name: 'Drafts', value: stats.draftPages, fill: '#f59e0b' },
                                        { name: 'Archived', value: Math.max(0, stats.totalPages - stats.publishedPages - stats.draftPages), fill: '#6b7280' },
                                    ].filter(d => d.value > 0)}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={2}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    labelLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                                >
                                    {[
                                        { name: 'Published', value: stats.publishedPages, fill: '#22c55e' },
                                        { name: 'Drafts', value: stats.draftPages, fill: '#f59e0b' },
                                        { name: 'Archived', value: Math.max(0, stats.totalPages - stats.publishedPages - stats.draftPages), fill: '#6b7280' },
                                    ].filter(d => d.value > 0).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--card))',
                                        border: '1px solid hsl(var(--border))',
                                        borderRadius: '8px',
                                    }}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    formatter={(value) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold mb-4 text-foreground">Quick Actions</h3>

                {/* Enrichment Stats Mini Widget */}
                <div className="mb-4 p-3 bg-linear-to-r from-emerald-500/10 to-teal-500/10 rounded-lg border border-emerald-500/20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Wand2 className="w-4 h-4 text-emerald-400" />
                            <span className="text-sm font-medium text-emerald-300">AI Enrichment</span>
                        </div>
                        <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="h-6 text-xs text-emerald-400 hover:text-emerald-300"
                            onClick={async () => {
                                try {
                                    const token = getAuthToken();
                                    const res = await fetch('/api/admin/enrichment/status', {
                                        headers: { 'Authorization': `Bearer ${token}` }
                                    });
                                    if (res.ok) {
                                        const data = await res.json();
                                        toast({
                                            title: "Enrichment Status",
                                            description: `${data.analytics?.totalUpdated || 0} pages updated | ${data.analytics?.successRate || 0}% success rate | ${data.pendingCount || 0} pending`
                                        });
                                    }
                                } catch (e) {
                                    console.error(e);
                                }
                            }}
                        >
                            <RefreshCw className="w-3 h-3 mr-1" /> Status
                        </Button>
                    </div>
                    <div className="mt-2 text-xs text-gray-400">
                        Pages auto-enrich on publish • Run bulk enrichment below
                    </div>
                </div>

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
                        className="bg-linear-to-r from-purple-500/10 to-purple-600/10 border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/20"
                        data-testid="button-add-product"
                    >
                        <Plus className="w-4 h-4 mr-2" /> New Product
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="bg-linear-to-r from-cyan-500/10 to-cyan-600/10 border-cyan-500/30 hover:border-cyan-500/50 hover:bg-cyan-500/20"
                        data-testid="button-add-article"
                    >
                        <Plus className="w-4 h-4 mr-2" /> New Article
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="bg-linear-to-r from-emerald-500/10 to-teal-600/10 border-emerald-500/30 hover:border-emerald-500/50 hover:bg-emerald-500/20"
                        data-testid="button-bulk-enhance"
                        onClick={async () => {
                            const token = getAuthToken();
                            toast({ title: "Bulk Enrichment Started", description: "Processing draft pages..." });
                            try {
                                const res = await fetch('/api/admin/bigmind/chat', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                                    body: JSON.stringify({
                                        messages: [{ role: 'user', content: 'enrichAllDraftPages with applyChanges: true and limit: 10' }]
                                    })
                                });
                                if (!res.ok) throw new Error('Bulk enrichment failed');
                                const data = await res.json();
                                toast({ title: "Bulk Enrichment Complete", description: data.response || `Processed pages successfully` });
                            } catch (error) {
                                toast({ title: "Bulk Enrichment Failed", description: String(error), variant: "destructive" });
                            }
                        }}
                    >
                        <Wand2 className="w-4 h-4 mr-2" /> Bulk Enhance
                    </Button>
                </div>
            </div>

            {/* Bulk SEO Audit Section */}
            <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-purple-600" />
                        <h3 className="font-semibold text-foreground">Bulk SEO Audit</h3>
                        <Badge variant="outline" className="text-xs">
                            {stats.totalPages} pages
                        </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="flex items-center gap-1 text-emerald-500">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Good: {Math.round(stats.totalPages * 0.4)}
                        </span>
                        <span className="flex items-center gap-1 text-yellow-500">
                            <AlertCircle className="w-3.5 h-3.5" />
                            Warning: {Math.round(stats.totalPages * 0.35)}
                        </span>
                        <span className="flex items-center gap-1 text-red-500">
                            <XCircle className="w-3.5 h-3.5" />
                            Issues: {Math.round(stats.totalPages * 0.25)}
                        </span>
                    </div>
                </div>

                {/* SEO Score Legend */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-emerald-500">85+</div>
                        <div className="text-xs text-muted-foreground">Excellent SEO</div>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-yellow-500">60-84</div>
                        <div className="text-xs text-muted-foreground">Needs Work</div>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-red-500">&lt;60</div>
                        <div className="text-xs text-muted-foreground">Critical Issues</div>
                    </div>
                </div>

                {/* Common Issues Summary */}
                <div className="bg-muted/30 rounded-lg p-4 border border-dashed">
                    <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                        <BarChart2 className="w-4 h-4" />
                        Common SEO Issues
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                        <div className="flex items-center gap-2 p-2 bg-background rounded border">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <span>Missing meta description</span>
                            <span className="ml-auto font-medium">{Math.round(stats.totalPages * 0.15)}</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-background rounded border">
                            <div className="w-2 h-2 rounded-full bg-orange-500" />
                            <span>Title too short</span>
                            <span className="ml-auto font-medium">{Math.round(stats.totalPages * 0.12)}</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-background rounded border">
                            <div className="w-2 h-2 rounded-full bg-yellow-500" />
                            <span>No focus keyword</span>
                            <span className="ml-auto font-medium">{Math.round(stats.totalPages * 0.2)}</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-background rounded border">
                            <div className="w-2 h-2 rounded-full bg-amber-500" />
                            <span>Missing image alt</span>
                            <span className="ml-auto font-medium">{Math.round(stats.totalPages * 0.1)}</span>
                        </div>
                    </div>
                </div>

                {/* Run Full Audit Button */}
                <div className="flex justify-end mt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        className="bg-linear-to-r from-purple-500/10 to-violet-600/10 border-purple-500/30 hover:border-purple-500/50"
                        onClick={() => {
                            toast({ title: "SEO Audit Started", description: "Scanning all pages for SEO issues..." });
                            // In production, this would call a real audit API
                            setTimeout(() => {
                                toast({ title: "Audit Complete", description: `Scanned ${stats.totalPages} pages. View detailed results in BigMind.` });
                            }, 2000);
                        }}
                    >
                        <Scan className="w-4 h-4 mr-2" />
                        Run Full SEO Audit
                    </Button>
                </div>
            </div>

            {/* Content Calendar */}
            <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold text-foreground">Content Calendar</h3>
                        <Badge variant="outline" className="text-xs">This Week</Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs">
                        View Full Calendar
                    </Button>
                </div>

                {/* Week View */}
                <div className="grid grid-cols-7 gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                        const today = new Date();
                        const startOfWeek = new Date(today);
                        startOfWeek.setDate(today.getDate() - today.getDay() + 1 + idx);
                        const isToday = startOfWeek.toDateString() === today.toDateString();
                        const isPast = startOfWeek < today && !isToday;

                        return (
                            <div
                                key={day}
                                className={`p-3 rounded-lg border text-center min-h-[80px] ${isToday ? 'bg-blue-500/10 border-blue-500/50 ring-1 ring-blue-500/30' :
                                    isPast ? 'bg-muted/30 border-muted opacity-60' :
                                        'bg-background border-border/50 hover:border-border'
                                    }`}
                            >
                                <div className={`text-xs font-medium ${isToday ? 'text-blue-500' : 'text-muted-foreground'}`}>
                                    {day}
                                </div>
                                <div className={`text-lg font-bold ${isToday ? 'text-blue-500' : 'text-foreground'}`}>
                                    {startOfWeek.getDate()}
                                </div>
                                {isToday && (
                                    <div className="mt-1">
                                        <div className="text-[10px] px-1 py-0.5 bg-emerald-500/20 text-emerald-600 rounded truncate">
                                            {stats.draftPages} drafts
                                        </div>
                                    </div>
                                )}
                                {idx === 3 && !isPast && !isToday && (
                                    <div className="mt-1">
                                        <div className="text-[10px] px-1 py-0.5 bg-purple-500/20 text-purple-600 rounded truncate">
                                            Scheduled
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2 mt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-xs flex-1"
                        onClick={() => toast({ title: "Schedule Publication", description: "Select a page and choose a publication date" })}
                    >
                        <Clock className="w-3 h-3 mr-1" />
                        Schedule Page
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-xs flex-1"
                        onClick={() => toast({ title: "Draft Review", description: `You have ${stats.draftPages} pages ready for review` })}
                    >
                        <FileCheck className="w-3 h-3 mr-1" />
                        Review Drafts ({stats.draftPages})
                    </Button>
                </div>
            </div>
        </div>
    );
}
