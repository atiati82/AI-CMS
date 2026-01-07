import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { ChartBar, Search, FileText, Loader2 } from 'lucide-react';

interface GscSummary {
    totalClicks: number;
    totalImpressions: number;
    avgCtr: number;
    avgPosition: number;
}

export default function AnalyticsTab() {
    const [dateRange, setDateRange] = useState<'7d' | '28d' | '90d'>('28d');

    const { data: gscStatus, isLoading: isLoadingStatus } = useQuery<{ configured: boolean; siteUrl: string | null }>({
        queryKey: ['/api/admin/seo/status'],
        queryFn: async () => {
            const res = await apiRequest('GET', '/api/admin/seo/status');
            return res.json();
        },
    });

    const { data: summary, isLoading: isLoadingSummary } = useQuery<GscSummary>({
        queryKey: ['/api/admin/seo/summary', dateRange],
        queryFn: async () => {
            const res = await apiRequest('GET', `/api/admin/seo/summary?days=${dateRange === '7d' ? 7 : dateRange === '28d' ? 28 : 90}`);
            return res.json();
        },
        enabled: !!gscStatus?.configured,
    });

    const { data: topQueries } = useQuery<Array<{ query: string; clicks: number; impressions: number; ctr: number; position: number }>>({
        queryKey: ['/api/admin/seo/queries', dateRange],
        queryFn: async () => {
            const res = await apiRequest('GET', `/api/admin/seo/queries?days=${dateRange === '7d' ? 7 : dateRange === '28d' ? 28 : 90}&limit=20`);
            return res.json();
        },
        enabled: !!gscStatus?.configured,
    });

    const { data: topPages } = useQuery<Array<{ page: string; clicks: number; impressions: number; ctr: number; position: number }>>({
        queryKey: ['/api/admin/seo/pages', dateRange],
        queryFn: async () => {
            const res = await apiRequest('GET', `/api/admin/seo/pages?days=${dateRange === '7d' ? 7 : dateRange === '28d' ? 28 : 90}&limit=20`);
            return res.json();
        },
        enabled: !!gscStatus?.configured,
    });

    if (isLoadingStatus) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!gscStatus?.configured) {
        return (
            <div className="space-y-6" data-testid="analytics-tab">
                <div>
                    <h2 className="text-2xl font-bold">Google Search Console Analytics</h2>
                    <p className="text-sm text-muted-foreground">Monitor search performance and SEO metrics</p>
                </div>
                <div className="bg-card border rounded-xl p-8 text-center">
                    <ChartBar className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="font-semibold text-lg mb-2">GSC Not Configured</h3>
                    <p className="text-muted-foreground text-sm max-w-md mx-auto mb-4">
                        To view search analytics, please configure Google Search Console credentials in your environment variables:
                    </p>
                    <div className="bg-muted rounded-lg p-4 text-left max-w-sm mx-auto">
                        <code className="text-xs block">GSC_CLIENT_EMAIL</code>
                        <code className="text-xs block">GSC_PRIVATE_KEY</code>
                        <code className="text-xs block">GSC_SITE_URL</code>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6" data-testid="analytics-tab">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Google Search Console Analytics</h2>
                    <p className="text-sm text-muted-foreground">{gscStatus.siteUrl}</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={dateRange === '7d' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setDateRange('7d')}
                        data-testid="button-date-7d"
                    >
                        7 Days
                    </Button>
                    <Button
                        variant={dateRange === '28d' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setDateRange('28d')}
                        data-testid="button-date-28d"
                    >
                        28 Days
                    </Button>
                    <Button
                        variant={dateRange === '90d' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setDateRange('90d')}
                        data-testid="button-date-90d"
                    >
                        90 Days
                    </Button>
                </div>
            </div>

            {isLoadingSummary ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
            ) : summary && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-card border rounded-xl p-4">
                            <div className="text-2xl font-bold text-primary">{summary.totalClicks.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">Total Clicks</div>
                        </div>
                        <div className="bg-card border rounded-xl p-4">
                            <div className="text-2xl font-bold text-blue-600">{summary.totalImpressions.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">Impressions</div>
                        </div>
                        <div className="bg-card border rounded-xl p-4">
                            <div className="text-2xl font-bold text-green-600">{(summary.avgCtr * 100).toFixed(2)}%</div>
                            <div className="text-sm text-muted-foreground">Avg CTR</div>
                        </div>
                        <div className="bg-card border rounded-xl p-4">
                            <div className="text-2xl font-bold text-amber-600">{summary.avgPosition.toFixed(1)}</div>
                            <div className="text-sm text-muted-foreground">Avg Position</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-card border rounded-xl p-4">
                            <h3 className="font-semibold mb-4 flex items-center gap-2">
                                <Search className="w-4 h-4" /> Top Search Queries
                            </h3>
                            {topQueries && topQueries.length > 0 ? (
                                <div className="space-y-2 max-h-80 overflow-y-auto">
                                    {topQueries.map((q, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-2 bg-muted/50 rounded" data-testid={`query-row-${idx}`}>
                                            <span className="text-sm truncate flex-1">{q.query}</span>
                                            <div className="flex gap-4 text-xs text-muted-foreground">
                                                <span>{q.clicks} clicks</span>
                                                <span>{(q.ctr * 100).toFixed(1)}%</span>
                                                <span>#{q.position.toFixed(0)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">No query data available</p>
                            )}
                        </div>

                        <div className="bg-card border rounded-xl p-4">
                            <h3 className="font-semibold mb-4 flex items-center gap-2">
                                <FileText className="w-4 h-4" /> Top Pages
                            </h3>
                            {topPages && topPages.length > 0 ? (
                                <div className="space-y-2 max-h-80 overflow-y-auto">
                                    {topPages.map((p, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-2 bg-muted/50 rounded" data-testid={`page-row-${idx}`}>
                                            <span className="text-sm truncate flex-1">{new URL(p.page).pathname}</span>
                                            <div className="flex gap-4 text-xs text-muted-foreground">
                                                <span>{p.clicks} clicks</span>
                                                <span>{(p.ctr * 100).toFixed(1)}%</span>
                                                <span>#{p.position.toFixed(0)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">No page data available</p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
