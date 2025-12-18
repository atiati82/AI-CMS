import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  Lightbulb,
  Target,
  FileText,
  Check,
  X,
  Clock,
  ArrowRight,
  Loader2,
  RefreshCw,
  AlertCircle,
  Zap,
  Box,
  HelpCircle,
  Link2,
  BookOpen,
  BarChart3,
  Eye,
  Archive,
  ExternalLink,
  Layers,
  AlertTriangle,
  Calendar,
  Settings,
  PlayCircle,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// --- Types ---

interface DashboardMetrics {
  totalPages: number;
  analyzedPages: number;
  orphanPages: number;
  stalePages: number;
  averageScore: number;
  topScoredPages: Array<{
    pageId: string;
    title: string;
    path: string;
    score: number;
  }>;
}

interface Recommendation {
  id: number;
  pageId: string;
  pageTitle: string;
  pagePath: string;
  priority: number;
  whySelected: string[];
  tasks: string[];
  impactEstimate: 'high' | 'medium' | 'low';
  dynamicBoxes: string[];
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  recommendedDate: string;
}

interface ClusterHealth {
  clusterKey: string;
  pageCount: number;
  avgScore: number;
  lastOptimized: string | null;
  optimizationCount7Days: number;
  status: 'healthy' | 'needs_attention' | 'overworked';
}

interface CronJob {
  id: number;
  name: string;
  description: string;
  schedule: string;
  handler: string;
  status: 'active' | 'paused' | 'disabled';
  lastRun: string | null;
  nextRun: string | null;
  runCount: number;
  failureCount: number;
}

// --- Dashboard Component ---

export default function SeoDashboard() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("recommendations");

  // Format date helper
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString(undefined, {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  // --- Queries ---

  const { data: dashboard, isLoading: metricsLoading, refetch: refetchMetrics } = useQuery<DashboardMetrics>({
    queryKey: ['/api/seo/dashboard'],
    staleTime: 60000,
  });

  const { data: recommendations, isLoading: recsLoading, refetch: refetchRecs } = useQuery<Recommendation[]>({
    queryKey: ['/api/seo/recommendations'],
    staleTime: 300000,
  });

  const { data: clusterHealth } = useQuery<ClusterHealth[]>({
    queryKey: ['/api/seo/dashboard/cluster-health'],
    staleTime: 300000,
  });

  const { data: orphans } = useQuery<any[]>({
    queryKey: ['/api/seo/metrics/orphans'],
    enabled: activeTab === 'gaps',
  });

  const { data: stale } = useQuery<any[]>({
    queryKey: ['/api/seo/metrics/stale'],
    enabled: activeTab === 'gaps',
  });

  const { data: cronData, refetch: refetchCron } = useQuery<{ jobs: CronJob[] }>({
    queryKey: ['/api/seo/cron/jobs'],
    enabled: activeTab === 'settings',
  });

  // --- Mutations ---

  const generateRecs = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/seo/recommendations/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: 3 })
      });
      if (!res.ok) throw new Error('Failed to generate recommendations');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/seo/recommendations'] });
      toast.success('Generated new recommendations');
    },
    onError: () => toast.error('Failed to generate recommendations')
  });

  const updateRecStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number, status: string }) => {
      const res = await fetch(`/api/seo/recommendations/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Failed to update status');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/seo/recommendations'] });
      toast.success('Status updated');
    }
  });

  const runScan = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/seo/metrics/scan', { method: 'POST' });
      if (!res.ok) throw new Error('Scan failed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/seo/dashboard'] });
      toast.success('Full site scan started');
    }
  });

  const toggleCron = useMutation({
    mutationFn: async ({ id, status }: { id: number, status: string }) => {
      const res = await fetch(`/api/seo/cron/jobs/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Failed to update cron job');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/seo/cron/jobs'] });
      toast.success('Cron job updated');
    },
    onError: () => toast.error('Failed to update cron job')
  });

  if (metricsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-violet-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="seo-dashboard-v2">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-violet-400" />
            SEO Brain
          </h2>
          <p className="text-slate-400 text-sm">AI-powered optimization engine & daily recommendations</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => { refetchMetrics(); refetchRecs(); refetchCron(); }}
            className="border-white/10"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button
            onClick={() => runScan.mutate()}
            disabled={runScan.isPending}
            variant="outline"
            size="sm"
            className="border-white/10"
          >
            <Target className="w-4 h-4 mr-2" />
            Full Scan
          </Button>
          <Button
            onClick={() => generateRecs.mutate()}
            disabled={generateRecs.isPending}
            className="bg-violet-600 hover:bg-violet-700"
          >
            {generateRecs.isPending ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Zap className="w-4 h-4 mr-2" />
            )}
            Generate Today's Plan
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Analyzed Pages"
          value={`${dashboard?.analyzedPages || 0} / ${dashboard?.totalPages || 0}`}
          icon={<FileText className="w-5 h-5" />}
          trend="neutral"
          subtitle="Coverage"
        />
        <StatCard
          title="Avg Priority Score"
          value={dashboard?.averageScore ? Math.round(dashboard.averageScore * 10) / 10 : 0}
          icon={<BarChart3 className="w-5 h-5" />}
          trend="up"
          subtitle="Site Health"
        />
        <StatCard
          title="Orphan Pages"
          value={dashboard?.orphanPages || 0}
          icon={<Link2 className="w-5 h-5" />}
          trend={dashboard?.orphanPages === 0 ? 'up' : 'down'}
          subtitle="Zero inbound links"
          color="text-amber-400"
        />
        <StatCard
          title="Stale Pages"
          value={dashboard?.stalePages || 0}
          icon={<Clock className="w-5 h-5" />}
          trend={dashboard?.stalePages === 0 ? 'up' : 'down'}
          subtitle="Need refresh"
          color="text-red-400"
        />
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-slate-800/50 border border-white/10">
          <TabsTrigger value="recommendations">
            <Lightbulb className="w-4 h-4 mr-2" />
            Daily Recommendations ({recommendations?.filter(r => r.status === 'pending').length || 0})
          </TabsTrigger>
          <TabsTrigger value="gaps">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Content Gaps
          </TabsTrigger>
          <TabsTrigger value="clusters">
            <Layers className="w-4 h-4 mr-2" />
            Cluster Health
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="w-4 h-4 mr-2" />
            Cron Settings
          </TabsTrigger>
        </TabsList>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations">
          <div className="space-y-4">
            {recsLoading ? (
              <div className="py-10 text-center text-slate-400">Loading recommendations...</div>
            ) : recommendations?.length === 0 ? (
              <EmptyState message="No recommendations for today. Click 'Generate Today's Plan' to start." />
            ) : (
              recommendations?.map((rec) => (
                <RecommendationCard
                  key={rec.id}
                  rec={rec}
                  onStatusUpdate={(status) => updateRecStatus.mutate({ id: rec.id, status })}
                />
              ))
            )}
          </div>
        </TabsContent>

        {/* Gaps Tab */}
        <TabsContent value="gaps">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-slate-900/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Link2 className="w-5 h-5 text-amber-400" />
                  Orphan Pages
                </CardTitle>
                <CardDescription>Pages with no internal inbound links</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  {orphans?.length === 0 ? (
                    <p className="text-sm text-slate-500 italic">No orphan pages found. Good job!</p>
                  ) : (
                    <div className="space-y-2">
                      {orphans?.map(page => (
                        <div key={page.id} className="flex items-center justify-between p-2 rounded bg-slate-800/50 text-sm">
                          <div className="truncate flex-1 pr-4">
                            <div className="text-white truncate">{page.title}</div>
                            <div className="text-xs text-slate-500 truncate">{page.path}</div>
                          </div>
                          <Badge variant="outline" className="text-xs border-amber-500/30 text-amber-400">Orphan</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-red-400" />
                  Stale Pages
                </CardTitle>
                <CardDescription>Pages needing content refresh</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  {stale?.length === 0 ? (
                    <p className="text-sm text-slate-500 italic">No stale content found.</p>
                  ) : (
                    <div className="space-y-2">
                      {stale?.map(page => (
                        <div key={page.id} className="flex items-center justify-between p-2 rounded bg-slate-800/50 text-sm">
                          <div className="truncate flex-1 pr-4">
                            <div className="text-white truncate">{page.title}</div>
                            <div className="text-xs text-slate-500">Updated: {formatDate(page.updatedAt)}</div>
                          </div>
                          <Badge variant="outline" className="text-xs border-red-500/30 text-red-400">Stale</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Cluster Health Tab */}
        <TabsContent value="clusters">
          <Card className="bg-slate-900/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Cluster Health Balance</CardTitle>
              <CardDescription>Monitoring optimization frequency to prevent over-optimization penalties</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead>Cluster Key</TableHead>
                    <TableHead>Pages</TableHead>
                    <TableHead>Avg Score</TableHead>
                    <TableHead>Optimization Freq (7d)</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clusterHealth?.map((cluster) => (
                    <TableRow key={cluster.clusterKey} className="border-white/10 hover:bg-slate-800/50">
                      <TableCell className="font-medium text-white">{cluster.clusterKey}</TableCell>
                      <TableCell>{cluster.pageCount}</TableCell>
                      <TableCell>{Math.round(cluster.avgScore)}</TableCell>
                      <TableCell>{cluster.optimizationCount7Days}</TableCell>
                      <TableCell>
                        {cluster.status === 'healthy' && <Badge className="bg-emerald-500/20 text-emerald-400">Healthy</Badge>}
                        {cluster.status === 'needs_attention' && <Badge className="bg-amber-500/20 text-amber-400">Needs Focus</Badge>}
                        {cluster.status === 'overworked' && <Badge className="bg-red-500/20 text-red-400">Over-Optimized</Badge>}
                      </TableCell>
                    </TableRow>
                  ))}
                  {(!clusterHealth || clusterHealth.length === 0) && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-slate-500 h-24">No cluster data available yet.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings / Cron Tab */}
        <TabsContent value="settings">
          <Card className="bg-slate-900/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-violet-400" />
                Automation & Cron Settings
              </CardTitle>
              <CardDescription>Manage scheduled background tasks and automation rules</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead>Job Name</TableHead>
                    <TableHead>Schedule (Cron)</TableHead>
                    <TableHead>Last Run</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cronData?.jobs.map((job) => (
                    <TableRow key={job.id} className="border-white/10 hover:bg-slate-800/50">
                      <TableCell>
                        <div className="font-medium text-white">{job.name}</div>
                        <div className="text-xs text-slate-500">{job.description}</div>
                      </TableCell>
                      <TableCell><code className="bg-slate-900 px-1 py-0.5 rounded text-xs text-cyan-400">{job.schedule}</code></TableCell>
                      <TableCell>
                        <div className="text-xs">
                          <div>Last: {formatDate(job.lastRun)}</div>
                          <div className="text-slate-500">Next: {formatDate(job.nextRun)}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={job.status === 'active' ? 'default' : 'secondary'}
                          className={job.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700'}>
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Switch
                            checked={job.status === 'active'}
                            onCheckedChange={(checked) => toggleCron.mutate({ id: job.id, status: checked ? 'active' : 'paused' })}
                          />
                          <span className="text-xs text-slate-500">{job.status === 'active' ? 'On' : 'Off'}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="mt-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm text-blue-300 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold mb-1">Did you know?</h4>
              <p>The daily recommendation engine runs automatically based on these schedules. You can adjust the scoring weights in the backend configuration (`server/config/seo-scoring.ts`) to tune how priority scores are calculated.</p>
            </div>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}

// --- Subcomponents ---

function StatCard({ title, value, icon, trend, subtitle, color = "text-white" }: any) {
  const trendIcon = trend === 'up' ? <TrendingUp className="w-4 h-4 text-emerald-400" />
    : trend === 'down' ? <TrendingDown className="w-4 h-4 text-red-400" />
      : <Minus className="w-4 h-4 text-slate-400" />;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="bg-slate-900/50 border-white/10">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">{icon}</div>
            {trendIcon}
          </div>
          <div className="mt-3">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-sm text-slate-400">{title}</p>
            <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function RecommendationCard({ rec, onStatusUpdate }: { rec: Recommendation, onStatusUpdate: (s: string) => void }) {
  const impactColors: Record<string, string> = {
    high: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    low: 'bg-slate-500/10 text-slate-400 border-slate-500/20'
  };

  return (
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="group">
      <Card className="bg-slate-900/50 border-white/10 hover:border-violet-500/30 transition-colors">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                {rec.pageTitle}
                <Badge variant="outline" className={`text-xs capitalize ${impactColors[rec.impactEstimate]}`}>
                  {rec.impactEstimate} Impact
                </Badge>
              </CardTitle>
              <CardDescription className="font-mono text-xs mt-1">{rec.pagePath}</CardDescription>
            </div>
            <div className="flex gap-2">
              {rec.status === 'pending' && <Badge variant="secondary">Pending</Badge>}
              {rec.status === 'in_progress' && <Badge className="bg-blue-500 text-white">In Progress</Badge>}
              {rec.status === 'completed' && <Badge className="bg-emerald-500 text-white">Completed</Badge>}
              {rec.status === 'skipped' && <Badge variant="outline">Skipped</Badge>}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-3 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-slate-300 mb-2 flex items-center gap-2">
                <Target className="w-3 h-3" /> Why Selected
              </h4>
              <ul className="space-y-1">
                {rec.whySelected.map((reason, i) => (
                  <li key={i} className="text-slate-400 text-xs flex items-start gap-2">
                    <span className="mt-1 w-1 h-1 rounded-full bg-violet-400 shrink-0" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-300 mb-2 flex items-center gap-2">
                <Check className="w-3 h-3" /> Action Plan
              </h4>
              <ul className="space-y-1">
                {rec.tasks.map((task, i) => (
                  <li key={i} className="text-slate-400 text-xs flex items-start gap-2">
                    <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {rec.dynamicBoxes.length > 0 && (
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Suggested Boosters:</span>
              {rec.dynamicBoxes.map(box => (
                <Badge key={box} variant="outline" className="text-xs border-violet-500/30 text-violet-300">
                  <Box className="w-3 h-3 mr-1" />
                  {box}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-0 flex justify-end gap-2">
          {rec.status === 'pending' && (
            <>
              <Button variant="ghost" size="sm" onClick={() => onStatusUpdate('skipped')} className="text-slate-500 hover:text-slate-300">
                Skip
              </Button>
              <Button size="sm" className="bg-violet-600 hover:bg-violet-700" onClick={() => toast.info('AI Brief Generation coming in Phase 2')}>
                <Sparkles className="w-3 h-3 mr-2" />
                Generate Upgrade Plan
              </Button>
              <Button size="sm" variant="outline" onClick={() => onStatusUpdate('completed')} className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                <Check className="w-3 h-3 mr-2" />
                Mark Done
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-slate-800 rounded-lg">
      <AlertCircle className="w-12 h-12 text-slate-600 mb-4" />
      <p className="text-slate-400 max-w-sm">{message}</p>
    </div>
  );
}
