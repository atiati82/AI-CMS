import React, { useMemo } from "react";
import { Link } from "wouter";

interface LinkRule {
  pattern: string;
  targetPath: string;
  anchorText?: string;
  maxOccurrences: number;
}

interface AutoLinkedContentProps {
  content: string;
  linkRules?: LinkRule[];
  excludePaths?: string[];
  maxLinks?: number;
  className?: string;
  as?: "div" | "span" | "p";
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function AutoLinkedContent({
  content,
  linkRules = [],
  excludePaths = [],
  maxLinks = 5,
  className = "",
  as: Component = "span"
}: AutoLinkedContentProps) {
  const linkedContent = useMemo(() => {
    if (!content || linkRules.length === 0) {
      return content;
    }

    let modifiedContent = content;
    let linksApplied = 0;
    const usedTargets = new Set<string>();

    for (const rule of linkRules) {
      if (linksApplied >= maxLinks) break;
      if (excludePaths.includes(rule.targetPath)) continue;
      if (usedTargets.has(rule.targetPath)) continue;

      try {
        const pattern = escapeRegex(rule.pattern);
        const regex = new RegExp(`(?<!<[^>]*)\\b(${pattern})\\b(?![^<]*>)`, 'gi');
        
        let occurrences = 0;
        modifiedContent = modifiedContent.replace(regex, (match) => {
          if (occurrences >= rule.maxOccurrences || linksApplied >= maxLinks) {
            return match;
          }
          occurrences++;
          linksApplied++;
          usedTargets.add(rule.targetPath);
          return `<a href="${rule.targetPath}" class="text-accent hover:text-accent/80 underline underline-offset-2 transition-colors" data-internal-link="true">${rule.anchorText || match}</a>`;
        });
      } catch (e) {
        console.error('Error applying link rule:', e);
      }
    }

    return modifiedContent;
  }, [content, linkRules, excludePaths, maxLinks]);

  return (
    <Component 
      className={className}
      dangerouslySetInnerHTML={{ __html: linkedContent }}
      data-testid="auto-linked-content"
    />
  );
}

interface RelatedPage {
  id: string;
  title: string;
  path: string;
  summary?: string;
  clusterKey?: string;
}

interface RelatedPagesProps {
  pages: RelatedPage[];
  title?: string;
  className?: string;
}

export function RelatedPages({
  pages,
  title = "Related Articles",
  className = ""
}: RelatedPagesProps) {
  if (!pages || pages.length === 0) {
    return null;
  }

  return (
    <section 
      className={`py-12 border-t border-slate-800 ${className}`}
      data-testid="related-pages-section"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 
          className="text-2xl font-display font-medium text-primary mb-8"
          data-testid="related-pages-title"
        >
          {title}
        </h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <Link key={page.id} href={page.path}>
              <article 
                className="group p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-accent/50 hover:bg-slate-900/80 transition-all cursor-pointer"
                data-testid={`related-page-card-${page.id}`}
              >
                {page.clusterKey && (
                  <span className="text-xs uppercase tracking-widest text-accent/70 mb-2 block">
                    {page.clusterKey.replace(/_/g, ' ')}
                  </span>
                )}
                <h3 
                  className="font-medium text-primary group-hover:text-accent transition-colors line-clamp-2"
                  data-testid={`related-page-title-${page.id}`}
                >
                  {page.title}
                </h3>
                {page.summary && (
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {page.summary}
                  </p>
                )}
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

interface DeepLinkWrapperProps {
  content: string;
  pageClusterKey?: string;
  currentPath?: string;
  relatedPages?: RelatedPage[];
  className?: string;
}

export function DeepLinkWrapper({
  content,
  pageClusterKey,
  currentPath,
  relatedPages = [],
  className = ""
}: DeepLinkWrapperProps) {
  return (
    <div className={className} data-testid="deep-link-wrapper">
      <div 
        className="prose prose-lg max-w-none prose-headings:text-primary prose-p:text-foreground prose-a:text-accent"
        dangerouslySetInnerHTML={{ __html: content }}
        data-testid="deep-link-content"
      />
      
      {relatedPages.length > 0 && (
        <RelatedPages 
          pages={relatedPages}
          title={pageClusterKey ? `More from ${pageClusterKey.replace(/_/g, ' ')}` : "Related Articles"}
        />
      )}
    </div>
  );
}

export default AutoLinkedContent;
