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
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface OpportunityScore {
  pageId: string;
  pageTitle: string;
  pagePath: string;
  opportunityScore: number;
  factors: {
    lowClicksHighImpressions: number;
    positionImprovement: number;
    missingMeta: number;
    contentAge: number;
    internalLinks: number;
  };
  suggestedActions: string[];
}

interface AiSuggestion {
  id: number;
  pageId: string;
  suggestionType: string;
  targetElement: string;
  currentValue: string | null;
  suggestedValue: string;
  reasoning: string;
  priority: string;
  status: string;
  keywords: string[] | null;
}

interface ProposedPage {
  id: number;
  targetKeyword: string;
  proposedTitle: string;
  proposedSlug: string;
  searchVolume: number;
  difficulty: number;
  opportunityScore: number;
  status: string;
  clusterKey: string | null;
}

interface TodaysActions {
  suggestions: AiSuggestion[];
  proposedPages: ProposedPage[];
  topOpportunities: OpportunityScore[];
}

const priorityColors: Record<string, string> = {
  critical: 'bg-red-500/20 text-red-400 border-red-500/30',
  high: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  medium: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  low: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
};

const typeIcons: Record<string, React.ReactNode> = {
  meta_title: <FileText className="w-4 h-4" />,
  meta_description: <FileText className="w-4 h-4" />,
  content_gap: <Target className="w-4 h-4" />,
  internal_link: <ArrowRight className="w-4 h-4" />,
  keyword_optimization: <Sparkles className="w-4 h-4" />,
  featured_snippet: <Zap className="w-4 h-4" />,
};

export default function SeoDashboard() {
  const queryClient = useQueryClient();

  const { data: todaysActions, isLoading, refetch } = useQuery<TodaysActions>({
    queryKey: ['/api/admin/seo-brain/todays-actions'],
    staleTime: 300000,
  });

  const applySuggestion = useMutation({
    mutationFn: async (suggestionId: number) => {
      const res = await fetch(`/api/admin/seo-brain/suggestions/${suggestionId}/apply`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Failed to apply suggestion');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/seo-brain'] });
      toast.success('Suggestion applied successfully');
    },
    onError: () => toast.error('Failed to apply suggestion'),
  });

  const dismissSuggestion = useMutation({
    mutationFn: async (suggestionId: number) => {
      const res = await fetch(`/api/admin/seo-brain/suggestions/${suggestionId}/dismiss`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Failed to dismiss suggestion');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/seo-brain'] });
      toast.success('Suggestion dismissed');
    },
    onError: () => toast.error('Failed to dismiss suggestion'),
  });

  const runOptimization = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/admin/seo-brain/run-optimization', {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Failed to run optimization');
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/seo-brain'] });
      toast.success(`Optimization complete: ${data.pagesAnalyzed} pages analyzed, ${data.suggestionsGenerated} suggestions generated`);
    },
    onError: () => toast.error('Failed to run optimization'),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-violet-400" />
      </div>
    );
  }

  const { suggestions = [], proposedPages = [], topOpportunities = [] } = todaysActions || {};

  return (
    <div className="space-y-6" data-testid="seo-dashboard">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">SEO Brain</h2>
          <p className="text-slate-400 text-sm">AI-powered SEO optimization and content suggestions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="border-white/10"
            data-testid="button-refresh-seo"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button
            onClick={() => runOptimization.mutate()}
            disabled={runOptimization.isPending}
            className="bg-violet-600 hover:bg-violet-700"
            data-testid="button-run-optimization"
          >
            {runOptimization.isPending ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2" />
            )}
            Run Optimization
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Pending Suggestions"
          value={suggestions.length}
          icon={<Lightbulb className="w-5 h-5" />}
          trend={suggestions.filter(s => s.priority === 'high').length > 0 ? 'up' : 'neutral'}
          subtitle={`${suggestions.filter(s => s.priority === 'high').length} high priority`}
        />
        <StatCard
          title="Proposed Pages"
          value={proposedPages.length}
          icon={<FileText className="w-5 h-5" />}
          trend="neutral"
          subtitle="From keyword opportunities"
        />
        <StatCard
          title="Top Opportunities"
          value={topOpportunities.length}
          icon={<Target className="w-5 h-5" />}
          trend={topOpportunities.length > 0 ? 'up' : 'neutral'}
          subtitle="Pages to optimize"
        />
      </div>

      <Tabs defaultValue="suggestions" className="space-y-4">
        <TabsList className="bg-slate-800/50 border border-white/10">
          <TabsTrigger value="suggestions" data-testid="tab-suggestions">
            Suggestions ({suggestions.length})
          </TabsTrigger>
          <TabsTrigger value="opportunities" data-testid="tab-opportunities">
            Opportunities ({topOpportunities.length})
          </TabsTrigger>
          <TabsTrigger value="proposed" data-testid="tab-proposed">
            Proposed Pages ({proposedPages.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions">
          <Card className="bg-slate-900/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">AI Suggestions</CardTitle>
              <CardDescription>Review and apply SEO improvements</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {suggestions.length === 0 ? (
                  <EmptyState message="No pending suggestions. Run optimization to generate new ones." />
                ) : (
                  <div className="space-y-3">
                    {suggestions.map((suggestion) => (
                      <SuggestionCard
                        key={suggestion.id}
                        suggestion={suggestion}
                        onApply={() => applySuggestion.mutate(suggestion.id)}
                        onDismiss={() => dismissSuggestion.mutate(suggestion.id)}
                        isApplying={applySuggestion.isPending}
                      />
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities">
          <Card className="bg-slate-900/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Optimization Opportunities</CardTitle>
              <CardDescription>Pages with high improvement potential</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {topOpportunities.length === 0 ? (
                  <EmptyState message="No opportunities found. Run optimization to analyze pages." />
                ) : (
                  <div className="space-y-3">
                    {topOpportunities.map((opp, index) => (
                      <OpportunityCard key={opp.pageId} opportunity={opp} rank={index + 1} />
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="proposed">
          <Card className="bg-slate-900/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Proposed Pages</CardTitle>
              <CardDescription>AI-suggested new content opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {proposedPages.length === 0 ? (
                  <EmptyState message="No proposed pages yet. Use Magic Page Generator to create new content ideas." />
                ) : (
                  <div className="space-y-3">
                    {proposedPages.map((page) => (
                      <ProposedPageCard key={page.id} page={page} />
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  subtitle 
}: { 
  title: string; 
  value: number; 
  icon: React.ReactNode; 
  trend: 'up' | 'down' | 'neutral';
  subtitle: string;
}) {
  const trendIcon = trend === 'up' ? <TrendingUp className="w-4 h-4 text-emerald-400" /> 
    : trend === 'down' ? <TrendingDown className="w-4 h-4 text-red-400" />
    : <Minus className="w-4 h-4 text-slate-400" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-slate-900/50 border-white/10">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
              {icon}
            </div>
            {trendIcon}
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-sm text-slate-400">{title}</p>
            <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function SuggestionCard({ 
  suggestion, 
  onApply, 
  onDismiss,
  isApplying
}: { 
  suggestion: AiSuggestion; 
  onApply: () => void; 
  onDismiss: () => void;
  isApplying: boolean;
}) {
  const priorityClass = priorityColors[suggestion.priority] || priorityColors.medium;
  const icon = typeIcons[suggestion.suggestionType] || <Lightbulb className="w-4 h-4" />;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-4 rounded-lg bg-slate-800/50 border border-white/10"
      data-testid={`suggestion-${suggestion.id}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded bg-violet-500/10 text-violet-400">
              {icon}
            </div>
            <span className="text-sm font-medium text-white capitalize">
              {suggestion.suggestionType.replace(/_/g, ' ')}
            </span>
            <Badge variant="outline" className={`text-xs ${priorityClass}`}>
              {suggestion.priority}
            </Badge>
          </div>
          
          <p className="text-sm text-slate-300 mb-2">{suggestion.reasoning}</p>
          
          {suggestion.currentValue && (
            <div className="text-xs text-slate-500 mb-1">
              <span className="font-medium">Current:</span> {suggestion.currentValue.substring(0, 60)}...
            </div>
          )}
          
          <div className="text-xs text-emerald-400/80">
            <span className="font-medium">Suggested:</span> {suggestion.suggestedValue.substring(0, 100)}...
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={onDismiss}
            className="text-slate-400 hover:text-red-400"
            data-testid={`button-dismiss-${suggestion.id}`}
          >
            <X className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            onClick={onApply}
            disabled={isApplying}
            className="bg-emerald-600 hover:bg-emerald-700"
            data-testid={`button-apply-${suggestion.id}`}
          >
            {isApplying ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function OpportunityCard({ opportunity, rank }: { opportunity: OpportunityScore; rank: number }) {
  const scoreColor = opportunity.opportunityScore >= 50 
    ? 'text-emerald-400' 
    : opportunity.opportunityScore >= 25 
      ? 'text-amber-400' 
      : 'text-slate-400';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: rank * 0.05 }}
      className="p-4 rounded-lg bg-slate-800/50 border border-white/10"
      data-testid={`opportunity-${opportunity.pageId}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-slate-700 text-sm font-bold ${scoreColor}`}>
            #{rank}
          </div>
          <div>
            <h4 className="font-medium text-white">{opportunity.pageTitle}</h4>
            <p className="text-xs text-slate-500">{opportunity.pagePath}</p>
            
            <div className="flex flex-wrap gap-1 mt-2">
              {opportunity.suggestedActions.slice(0, 3).map((action, i) => (
                <Badge key={i} variant="outline" className="text-xs bg-violet-500/10 text-violet-300 border-violet-500/30">
                  {action}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`text-2xl font-bold ${scoreColor}`}>
            {opportunity.opportunityScore}
          </div>
          <div className="text-xs text-slate-500">score</div>
        </div>
      </div>
    </motion.div>
  );
}

function ProposedPageCard({ page }: { page: ProposedPage }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const queryClient = useQueryClient();
  
  const difficultyColor = page.difficulty <= 30 
    ? 'text-emerald-400' 
    : page.difficulty <= 60 
      ? 'text-amber-400' 
      : 'text-red-400';

  const handleGeneratePage = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch(`/api/admin/proposed-pages/${page.id}/create`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Failed to generate page');
      const data = await res.json();
      queryClient.invalidateQueries({ queryKey: ['/api/admin/seo-brain/todays-actions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/pages'] });
      toast.success(`Page "${data.createdPage?.title || page.proposedTitle}" created as draft`);
    } catch (err) {
      toast.error('Failed to generate page');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-4 rounded-lg bg-slate-800/50 border border-white/10"
      data-testid={`proposed-page-${page.id}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-medium text-white">{page.proposedTitle}</h4>
          <p className="text-xs text-slate-500">/{page.proposedSlug}</p>
          
          <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
            <span>Keyword: <span className="text-cyan-400">{page.targetKeyword}</span></span>
            {page.clusterKey && (
              <Badge variant="outline" className="bg-indigo-500/10 text-indigo-300 border-indigo-500/30">
                {page.clusterKey}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="text-right space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Difficulty</span>
            <span className={`font-medium ${difficultyColor}`}>{page.difficulty}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Volume</span>
            <span className="font-medium text-slate-300">{page.searchVolume}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Score</span>
            <span className="font-medium text-emerald-400">{page.opportunityScore}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-end mt-3 pt-3 border-t border-white/5">
        <Button 
          size="sm" 
          variant="outline" 
          className="border-violet-500/30 text-violet-400 hover:bg-violet-500/10"
          onClick={handleGeneratePage}
          disabled={isGenerating}
          data-testid={`button-generate-page-${page.id}`}
        >
          {isGenerating ? (
            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
          ) : (
            <Sparkles className="w-3 h-3 mr-1" />
          )}
          {isGenerating ? 'Generating...' : 'Generate Page'}
        </Button>
      </div>
    </motion.div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle className="w-12 h-12 text-slate-600 mb-4" />
      <p className="text-slate-400">{message}</p>
    </div>
  );
}
