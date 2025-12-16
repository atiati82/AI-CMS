import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Sparkles, Lightbulb, HelpCircle, Link2, BarChart3, Loader2 } from "lucide-react";

type BlockType = 'faq' | 'insight' | 'related_links' | 'stat_highlight' | 'callout' | 'tip';
type HookPosition = 'after_h2' | 'after_h3' | 'sidebar' | 'inline' | 'footer';

interface AiContentBlock {
  id: number;
  pageId: string;
  blockType: string;
  hook: string;
  content: string;
  active: boolean;
  displayOrder: number;
}

interface DynamicSEOBlockProps {
  pageId: string;
  hook: HookPosition;
  sectionId?: string;
  className?: string;
  showPlaceholder?: boolean;
}

const blockIcons: Record<BlockType, React.ReactNode> = {
  faq: <HelpCircle className="w-4 h-4" />,
  insight: <Lightbulb className="w-4 h-4" />,
  related_links: <Link2 className="w-4 h-4" />,
  stat_highlight: <BarChart3 className="w-4 h-4" />,
  callout: <Sparkles className="w-4 h-4" />,
  tip: <Lightbulb className="w-4 h-4" />,
};

const blockLabels: Record<BlockType, string> = {
  faq: 'Frequently Asked',
  insight: 'Quick Insight',
  related_links: 'Related Reading',
  stat_highlight: 'Key Stats',
  callout: 'Did You Know?',
  tip: 'Pro Tip',
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.23, 0.82, 0.35, 1] as const }
};

export function DynamicSEOBlock({ 
  pageId, 
  hook, 
  sectionId,
  className = "",
  showPlaceholder = false
}: DynamicSEOBlockProps) {
  const fullHook = sectionId ? `${hook}:${sectionId}` : hook;
  
  const { data: blocks, isLoading } = useQuery<AiContentBlock[]>({
    queryKey: ['/api/admin/seo-brain/content-blocks', pageId, fullHook],
    queryFn: async () => {
      const res = await fetch(`/api/admin/seo-brain/content-blocks/${pageId}?hook=${encodeURIComponent(fullHook)}`);
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!pageId,
    staleTime: 60000,
  });

  if (isLoading) {
    if (!showPlaceholder) return null;
    return (
      <div className={`flex items-center justify-center py-4 ${className}`}>
        <Loader2 className="w-5 h-5 animate-spin text-violet-400/50" />
      </div>
    );
  }

  if (!blocks || blocks.length === 0) {
    return null;
  }

  const activeBlocks = blocks.filter(b => b.active).sort((a, b) => a.displayOrder - b.displayOrder);

  if (activeBlocks.length === 0) {
    return null;
  }

  return (
    <div className={`dynamic-seo-blocks space-y-4 ${className}`} data-testid={`seo-blocks-${hook}`}>
      {activeBlocks.map((block, index) => (
        <DynamicBlockContent 
          key={block.id} 
          block={block} 
          index={index}
        />
      ))}
    </div>
  );
}

function DynamicBlockContent({ 
  block, 
  index 
}: { 
  block: AiContentBlock; 
  index: number;
}) {
  const blockType = block.blockType as BlockType;
  const icon = blockIcons[blockType] || <Sparkles className="w-4 h-4" />;
  const label = blockLabels[blockType] || 'Content Block';

  return (
    <motion.div
      {...fadeInUp}
      transition={{ ...fadeInUp.transition, delay: index * 0.1 }}
      className="seo-content-block"
      data-block-type={blockType}
      data-testid={`seo-block-${block.id}`}
    >
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5" />
        
        <div className="relative p-5">
          <div className="flex items-center gap-2 mb-3 text-sm font-medium text-violet-300/80">
            {icon}
            <span>{label}</span>
          </div>
          
          <div 
            className="seo-block-content prose prose-invert prose-sm max-w-none
              prose-headings:text-white prose-headings:font-semibold
              prose-p:text-slate-300 prose-p:leading-relaxed
              prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-medium
              prose-ul:text-slate-300 prose-ol:text-slate-300
              prose-li:marker:text-violet-400"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      </div>
    </motion.div>
  );
}

export function SEOBlocksForSection({ 
  pageId, 
  sectionId,
  position = 'after'
}: { 
  pageId: string; 
  sectionId: string;
  position?: 'before' | 'after';
}) {
  const hook = position === 'after' ? 'after_h2' : 'inline';
  
  return (
    <DynamicSEOBlock 
      pageId={pageId} 
      hook={hook as HookPosition}
      sectionId={sectionId}
      className="my-6"
    />
  );
}

export function SidebarSEOBlocks({ pageId }: { pageId: string }) {
  return (
    <DynamicSEOBlock 
      pageId={pageId} 
      hook="sidebar"
      className="space-y-4"
    />
  );
}

export function FooterSEOBlocks({ pageId }: { pageId: string }) {
  return (
    <DynamicSEOBlock 
      pageId={pageId} 
      hook="footer"
      className="mt-8 pt-8 border-t border-white/10"
    />
  );
}
