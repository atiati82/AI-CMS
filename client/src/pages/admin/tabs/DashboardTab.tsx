import React from "react";
import {
    FileText, Package, Beaker, FolderTree, Eye, EyeOff, Sparkles
} from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from "recharts";
import { cn } from "@/lib/utils";
import { ContentStats } from "./types";

interface DashboardTabProps {
    stats: ContentStats | null;
    onCreatePage: () => void;
}

function StatCard({
    label,
    value,
    icon: Icon,
    gradient = "from-blue-500 to-blue-600",
    trend,
    trendLabel,
    subtitle
}: {
    label: string;
    value: number | string;
    icon: any;
    gradient?: string;
    trend?: number;
    trendLabel?: string;
    subtitle?: string;
}) {
    return (
        <div className="relative overflow-hidden glass-panel p-6 group hover:border-white/20 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon className="w-24 h-24" />
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-start justify-between mb-4">
                    <div className={cn("p-2 rounded-lg bg-gradient-to-br bg-opacity-20 backdrop-blur-sm border border-white/10", gradient)}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                    {trend !== undefined && (
                        <div className={cn(
                            "text-xs font-medium px-2 py-1 rounded-full border backdrop-blur-sm",
                            trend >= 0
                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                        )}>
                            {trend > 0 ? "+" : ""}{trend}% {trendLabel && <span className="text-white/40 ml-1">{trendLabel}</span>}
                        </div>
                    )}
                </div>

                <div>
                    <h3 className="text-3xl font-bold text-white tracking-tight mb-1">{value}</h3>
                    <p className="text-sm font-medium text-white/60">{label}</p>
                    {subtitle && <p className="text-xs text-white/40 mt-1">{subtitle}</p>}
                </div>
            </div>
        </div>
    );
}

export default function DashboardTab({ stats, onCreatePage }: DashboardTabProps) {
    if (!stats) {
        return <div className="text-center py-12 text-muted-foreground animate-pulse">Loading stats...</div>;
    }

    const publishRate = stats.totalPages > 0
        ? Math.round((stats.publishedPages / stats.totalPages) * 100)
        : 0;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-2xl p-8 shadow-2xl border border-white/10 group">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 opacity-90" />
                <div className="absolute inset-0 bg-[url('/hex-grid-bg.png')] opacity-20 bg-repeat bg-[length:100px_100px]" />

                {/* Animated Glows */}
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-500/40 rounded-full blur-[80px] group-hover:blur-[60px] transition-all duration-1000" />
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-500/40 rounded-full blur-[80px] group-hover:blur-[60px] transition-all duration-1000" />

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white tracking-tight">
                            Welcome to <span className="text-gradient-gold-shine font-extrabold">Andara Ionic CMS</span>
                        </h1>
                        <p className="text-white/80 max-w-xl text-lg font-light leading-relaxed">
                            Manage your content, products, and science library from this central control deck.
                        </p>
                    </div>
                    <button
                        onClick={onCreatePage}
                        className="px-6 py-3 bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 border border-white/20 backdrop-blur-md rounded-xl text-white font-medium transition-all duration-300 shadow-lg flex items-center gap-2 group/btn"
                    >
                        <Sparkles className="w-5 h-5 group-hover/btn:text-cyan-300 transition-colors" />
                        <span>New Page</span>
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-white/90 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    Content Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <StatCard
                        label="Total Pages"
                        value={stats.totalPages}
                        icon={FileText}
                        gradient="from-blue-500 to-indigo-600"
                        subtitle="All content pages"
                    />
                    <StatCard
                        label="Published"
                        value={stats.publishedPages}
                        icon={Eye}
                        gradient="from-emerald-500 to-teal-600"
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
                        gradient="from-violet-500 to-purple-600"
                        subtitle="Active listings"
                    />
                    <StatCard
                        label="Science Articles"
                        value={stats.totalArticles}
                        icon={Beaker}
                        gradient="from-cyan-500 to-sky-600"
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
                <div className="glass-panel p-6">
                    <h3 className="font-semibold mb-6 text-white/90 flex items-center gap-2">
                        Content Distribution
                    </h3>
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
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 12, fill: '#ffffff60' }}
                                    axisLine={{ stroke: '#ffffff10' }}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fontSize: 12, fill: '#ffffff60' }}
                                    axisLine={{ stroke: '#ffffff10' }}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#09090b',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '12px',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                                        color: '#fff'
                                    }}
                                    itemStyle={{ color: '#fff' }}
                                    labelStyle={{ color: '#ffffff80', marginBottom: '0.5rem' }}
                                    cursor={{ fill: '#ffffff05' }}
                                />
                                <Bar dataKey="value" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Page Status Breakdown */}
                <div className="glass-panel p-6">
                    <h3 className="font-semibold mb-6 text-white/90">Page Status</h3>
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
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    labelLine={{ stroke: '#ffffff40', strokeWidth: 1 }}
                                    stroke="none"
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
                                        backgroundColor: '#09090b',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '12px',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                                        color: '#fff'
                                    }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    formatter={(value) => <span style={{ color: '#ffffff80' }}>{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
