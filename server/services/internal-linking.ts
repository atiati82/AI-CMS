import { storage } from "../storage";
import type { 
  Page,
  LinkingRule,
  CtaTemplate,
  Product
} from "@shared/schema";

export interface LinkSuggestion {
  anchorText: string;
  targetPath: string;
  targetTitle?: string;
  ruleId?: string;
  confidence: number;
}

export interface CtaSuggestion {
  templateId: string;
  templateName: string;
  headline: string;
  description?: string;
  buttonText: string;
  buttonLink?: string;
  productSlug?: string;
  position: string;
  matchReason: string;
}

export interface ContentAnalysis {
  suggestedLinks: LinkSuggestion[];
  suggestedCtas: CtaSuggestion[];
  keywordMatches: string[];
  clusterMatches: string[];
}

export class InternalLinkingService {
  async analyzeContent(content: string, options?: {
    pageClusterKey?: string;
    pageType?: string;
    excludePaths?: string[];
  }): Promise<ContentAnalysis> {
    const { pageClusterKey, pageType, excludePaths = [] } = options || {};
    
    const [linkingRules, ctaTemplates, allPages] = await Promise.all([
      storage.getActiveLinkingRules(),
      storage.getActiveCtaTemplates(),
      storage.getAllPages()
    ]);
    
    const suggestedLinks = this.findLinkOpportunities(
      content, 
      linkingRules, 
      allPages, 
      excludePaths
    );
    
    const contentKeywords = this.extractKeywords(content);
    
    const suggestedCtas = this.findMatchingCtas(
      ctaTemplates,
      pageClusterKey,
      contentKeywords
    );
    
    const keywordMatches = linkingRules
      .filter(rule => this.contentMatchesPattern(content, rule.triggerPattern))
      .map(rule => rule.triggerPattern);
    
    const clusterMatches = pageClusterKey ? [pageClusterKey] : [];
    
    return {
      suggestedLinks,
      suggestedCtas,
      keywordMatches,
      clusterMatches
    };
  }

  private findLinkOpportunities(
    content: string,
    rules: LinkingRule[],
    allPages: Page[],
    excludePaths: string[]
  ): LinkSuggestion[] {
    const suggestions: LinkSuggestion[] = [];
    const usedTargets = new Set<string>();
    
    for (const rule of rules) {
      if (excludePaths.includes(rule.targetPagePath)) continue;
      if (usedTargets.has(rule.targetPagePath)) continue;
      
      const matches = this.findPatternMatches(content, rule.triggerPattern);
      
      if (matches.length > 0) {
        const targetPage = allPages.find(p => p.path === rule.targetPagePath);
        
        for (let i = 0; i < Math.min(matches.length, rule.maxOccurrences); i++) {
          suggestions.push({
            anchorText: rule.anchorText || matches[i],
            targetPath: rule.targetPagePath,
            targetTitle: targetPage?.title,
            ruleId: rule.id,
            confidence: this.calculateConfidence(rule, matches[i])
          });
        }
        
        usedTargets.add(rule.targetPagePath);
      }
    }
    
    suggestions.sort((a, b) => b.confidence - a.confidence);
    
    return suggestions.slice(0, 10);
  }

  private findPatternMatches(content: string, pattern: string): string[] {
    const matches: string[] = [];
    
    try {
      const regex = new RegExp(`\\b(${this.escapeRegex(pattern)})\\b`, 'gi');
      let match;
      
      while ((match = regex.exec(content)) !== null) {
        matches.push(match[1]);
      }
    } catch (e) {
      const lowerContent = content.toLowerCase();
      const lowerPattern = pattern.toLowerCase();
      let pos = 0;
      
      while ((pos = lowerContent.indexOf(lowerPattern, pos)) !== -1) {
        matches.push(content.slice(pos, pos + pattern.length));
        pos += pattern.length;
      }
    }
    
    return matches;
  }

  private contentMatchesPattern(content: string, pattern: string): boolean {
    try {
      const regex = new RegExp(`\\b${this.escapeRegex(pattern)}\\b`, 'gi');
      return regex.test(content);
    } catch (e) {
      return content.toLowerCase().includes(pattern.toLowerCase());
    }
  }

  private escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private calculateConfidence(rule: LinkingRule, matchedText: string): number {
    let confidence = 0.5;
    
    if (rule.priority <= 3) confidence += 0.2;
    else if (rule.priority <= 5) confidence += 0.1;
    
    if (rule.anchorText && matchedText.toLowerCase() === rule.anchorText.toLowerCase()) {
      confidence += 0.2;
    }
    
    if (rule.ruleType === 'manual') confidence += 0.1;
    
    return Math.min(confidence, 1.0);
  }

  private findMatchingCtas(
    templates: CtaTemplate[],
    clusterKey?: string,
    keywords: string[] = []
  ): CtaSuggestion[] {
    const suggestions: CtaSuggestion[] = [];
    
    for (const template of templates) {
      let matchReason = '';
      
      if (clusterKey && template.triggerClusters.includes(clusterKey)) {
        matchReason = `Matches cluster: ${clusterKey}`;
      }
      
      const matchedKeyword = template.triggerKeywords.find(tk => 
        keywords.some(k => k.toLowerCase().includes(tk.toLowerCase()))
      );
      
      if (matchedKeyword) {
        matchReason = matchReason 
          ? `${matchReason}; Matches keyword: ${matchedKeyword}`
          : `Matches keyword: ${matchedKeyword}`;
      }
      
      if (template.triggerClusters.length === 0 && template.triggerKeywords.length === 0) {
        matchReason = 'Default CTA (no specific triggers)';
      }
      
      if (matchReason) {
        suggestions.push({
          templateId: template.id,
          templateName: template.name,
          headline: template.headline,
          description: template.description || undefined,
          buttonText: template.buttonText,
          buttonLink: template.buttonLink || undefined,
          productSlug: template.productSlug || undefined,
          position: template.position,
          matchReason
        });
      }
    }
    
    suggestions.sort((a, b) => {
      if (a.matchReason.includes('cluster') && !b.matchReason.includes('cluster')) return -1;
      if (b.matchReason.includes('cluster') && !a.matchReason.includes('cluster')) return 1;
      if (a.matchReason.includes('keyword') && !b.matchReason.includes('keyword')) return -1;
      if (b.matchReason.includes('keyword') && !a.matchReason.includes('keyword')) return 1;
      return 0;
    });
    
    return suggestions.slice(0, 5);
  }

  private extractKeywords(content: string): string[] {
    const words = content.toLowerCase()
      .replace(/[^\w\s-]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 3);
    
    const wordFreq = new Map<string, number>();
    for (const word of words) {
      wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    }
    
    const stopWords = new Set([
      'this', 'that', 'with', 'from', 'they', 'have', 'been', 'were', 'will',
      'their', 'would', 'could', 'should', 'about', 'which', 'when', 'where',
      'what', 'there', 'these', 'those', 'then', 'than', 'your', 'more', 'some'
    ]);
    
    return Array.from(wordFreq.entries())
      .filter(([word]) => !stopWords.has(word))
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([word]) => word);
  }

  async applyInternalLinks(
    content: string,
    options?: {
      pageClusterKey?: string;
      excludePaths?: string[];
      maxLinks?: number;
    }
  ): Promise<string> {
    const { excludePaths = [], maxLinks = 5 } = options || {};
    
    const analysis = await this.analyzeContent(content, {
      pageClusterKey: options?.pageClusterKey,
      excludePaths
    });
    
    let modifiedContent = content;
    let linksApplied = 0;
    
    for (const suggestion of analysis.suggestedLinks) {
      if (linksApplied >= maxLinks) break;
      
      const linkRegex = new RegExp(
        `(?<!\\[)\\b(${this.escapeRegex(suggestion.anchorText)})\\b(?!\\])(?![^\\[]*\\])`,
        'i'
      );
      
      if (linkRegex.test(modifiedContent)) {
        modifiedContent = modifiedContent.replace(
          linkRegex,
          `[$1](${suggestion.targetPath})`
        );
        linksApplied++;
      }
    }
    
    return modifiedContent;
  }

  async generateCtaBlock(template: CtaTemplate): Promise<string> {
    let buttonLink = template.buttonLink || '';
    
    if (template.productSlug) {
      const product = await storage.getProductBySlug(template.productSlug);
      if (product) {
        buttonLink = `/product/${template.productSlug}`;
      }
    }
    
    const ctaBlock = `
<div class="cta-block cta-${template.position}" data-cta-id="${template.id}">
  <h3>${template.headline}</h3>
  ${template.description ? `<p>${template.description}</p>` : ''}
  <a href="${buttonLink}" class="cta-button">${template.buttonText}</a>
</div>
`;
    
    return ctaBlock.trim();
  }

  async injectCtaIntoContent(
    content: string,
    options?: {
      pageClusterKey?: string;
      position?: string;
    }
  ): Promise<string> {
    const { pageClusterKey, position = 'mid_content' } = options || {};
    
    const analysis = await this.analyzeContent(content, { pageClusterKey });
    
    const matchingCta = analysis.suggestedCtas.find(
      cta => cta.position === position
    );
    
    if (!matchingCta) return content;
    
    const template = await storage.getCtaTemplate(matchingCta.templateId);
    if (!template) return content;
    
    const ctaBlock = await this.generateCtaBlock(template);
    
    if (position === 'mid_content') {
      const paragraphs = content.split(/\n\n+/);
      const midPoint = Math.floor(paragraphs.length / 2);
      paragraphs.splice(midPoint, 0, ctaBlock);
      return paragraphs.join('\n\n');
    } else if (position === 'after_intro') {
      const firstParagraphEnd = content.indexOf('\n\n');
      if (firstParagraphEnd !== -1) {
        return content.slice(0, firstParagraphEnd + 2) + ctaBlock + '\n\n' + content.slice(firstParagraphEnd + 2);
      }
    } else if (position === 'before_faq' || position === 'footer') {
      return content + '\n\n' + ctaBlock;
    }
    
    return content;
  }

  async autoGenerateLinkingRulesFromPages(): Promise<LinkingRule[]> {
    const pages = await storage.getAllPages();
    const existingRules = await storage.getAllLinkingRules();
    const existingPatterns = new Set(existingRules.map(r => r.triggerPattern.toLowerCase()));
    
    const newRules: LinkingRule[] = [];
    
    for (const page of pages) {
      if (page.status !== 'published') continue;
      if (!page.seoFocus) continue;
      
      const pattern = page.seoFocus.toLowerCase().trim();
      if (existingPatterns.has(pattern)) continue;
      
      const rule = await storage.createLinkingRule({
        name: `Auto: ${page.title}`,
        ruleType: 'keyword_match',
        triggerPattern: page.seoFocus,
        targetPagePath: page.path,
        anchorText: page.seoFocus,
        priority: 5,
        maxOccurrences: 1,
        isActive: true,
        metadata: { autoGenerated: true, sourcePageId: page.id } as Record<string, any>
      });
      
      newRules.push(rule);
      existingPatterns.add(pattern);
    }
    
    return newRules;
  }

  async getContentWithEnhancements(
    pageId: string
  ): Promise<{
    originalContent: string;
    enhancedContent: string;
    linksAdded: number;
    ctaAdded: boolean;
  }> {
    const page = await storage.getPage(pageId);
    if (!page || !page.content) {
      return {
        originalContent: '',
        enhancedContent: '',
        linksAdded: 0,
        ctaAdded: false
      };
    }
    
    const originalContent = page.content;
    
    let enhancedContent = await this.applyInternalLinks(originalContent, {
      pageClusterKey: page.clusterKey || undefined,
      excludePaths: [page.path]
    });
    
    const originalLinkCount = (originalContent.match(/\[.*?\]\(.*?\)/g) || []).length;
    const newLinkCount = (enhancedContent.match(/\[.*?\]\(.*?\)/g) || []).length;
    
    const contentWithCta = await this.injectCtaIntoContent(enhancedContent, {
      pageClusterKey: page.clusterKey || undefined,
      position: 'mid_content'
    });
    
    const ctaAdded = contentWithCta.length > enhancedContent.length;
    
    return {
      originalContent,
      enhancedContent: contentWithCta,
      linksAdded: newLinkCount - originalLinkCount,
      ctaAdded
    };
  }
}

export const internalLinkingService = new InternalLinkingService();
