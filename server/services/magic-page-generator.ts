import { storage } from "../storage";
import type { 
  SeoKeyword, 
  Document, 
  Page,
  InsertMagicPageSuggestion, 
  MagicPageSuggestion,
  InsertPage 
} from "@shared/schema";
import { seoScanner } from "./seo-scanner";

export interface OutlineSection {
  heading: string;
  level: number;
  description?: string;
}

export interface DraftContent {
  hero?: { title: string; subtitle?: string };
  tldr?: string;
  sections?: Array<{ heading: string; content: string }>;
  faq?: Array<{ question: string; answer: string }>;
  cta?: { text: string; buttonText: string; productSlug?: string };
}

export interface LLMProvider {
  generateOutline(params: {
    keyword: string;
    intent: string;
    relatedContent: string[];
    persona?: string;
  }): Promise<OutlineSection[]>;
  
  generateDraft(params: {
    keyword: string;
    outline: OutlineSection[];
    relatedContent: string[];
    persona?: string;
  }): Promise<DraftContent>;
  
  suggestTitle(keyword: string, intent: string): Promise<string>;
}

const PERSONA_TEMPLATES: Record<string, string> = {
  health_seeker: "Health-conscious individual looking for natural wellness solutions",
  science_curious: "Person interested in understanding the science behind health claims",
  water_enthusiast: "Someone passionate about water quality and hydration",
  wellness_professional: "Health practitioner or wellness coach seeking products for clients",
  eco_conscious: "Environmentally aware consumer seeking sustainable health options"
};

const TITLE_PATTERNS: Record<string, string[]> = {
  informational: [
    "The Complete Guide to {keyword}",
    "What Is {keyword}? Everything You Need to Know",
    "Understanding {keyword}: A Deep Dive",
    "{keyword} Explained: Science-Backed Facts",
    "The Science Behind {keyword}"
  ],
  commercial: [
    "Best {keyword}: Expert Reviews & Comparisons",
    "Top {keyword} Products for 2024",
    "{keyword} Buying Guide: What to Look For",
    "How to Choose the Right {keyword}"
  ],
  transactional: [
    "Where to Buy {keyword}: Quality Matters",
    "Premium {keyword} – Fast Shipping Available",
    "Shop {keyword}: Trusted Quality"
  ],
  navigational: [
    "{keyword} – Official Resource",
    "Learn About {keyword}"
  ]
};

export class MockLLMProvider implements LLMProvider {
  async generateOutline(params: {
    keyword: string;
    intent: string;
    relatedContent: string[];
    persona?: string;
  }): Promise<OutlineSection[]> {
    const { keyword, intent } = params;
    
    const baseOutline: OutlineSection[] = [
      { heading: `What Is ${this.capitalizeKeyword(keyword)}?`, level: 2, description: "Introduction and definition" },
      { heading: "Key Benefits", level: 2, description: "Main advantages and positive effects" },
      { heading: "How It Works", level: 2, description: "Scientific explanation of mechanisms" },
    ];
    
    if (intent === 'informational') {
      baseOutline.push(
        { heading: "The Science Explained", level: 2, description: "Deep dive into research" },
        { heading: "Common Misconceptions", level: 2, description: "Myths vs facts" },
        { heading: "Frequently Asked Questions", level: 2, description: "FAQ section" }
      );
    } else if (intent === 'commercial') {
      baseOutline.push(
        { heading: "What to Look For", level: 2, description: "Buying criteria" },
        { heading: "Quality Indicators", level: 2, description: "Signs of premium products" },
        { heading: "Comparison With Alternatives", level: 2, description: "vs other options" }
      );
    } else if (intent === 'transactional') {
      baseOutline.push(
        { heading: "Product Overview", level: 2, description: "Feature highlights" },
        { heading: "How to Use", level: 2, description: "Usage instructions" },
        { heading: "Customer Results", level: 2, description: "Testimonials" }
      );
    }
    
    baseOutline.push({ heading: "Conclusion", level: 2, description: "Summary and next steps" });
    
    return baseOutline;
  }
  
  async generateDraft(params: {
    keyword: string;
    outline: OutlineSection[];
    relatedContent: string[];
    persona?: string;
  }): Promise<DraftContent> {
    const { keyword, outline, relatedContent } = params;
    const capitalizedKeyword = this.capitalizeKeyword(keyword);
    
    const contentSnippets = relatedContent.slice(0, 3).map(c => {
      const words = c.split(/\s+/).slice(0, 50);
      return words.join(' ');
    });
    
    const draft: DraftContent = {
      hero: {
        title: `Discover the Power of ${capitalizedKeyword}`,
        subtitle: `Your comprehensive guide to understanding and harnessing ${keyword} for optimal wellness.`
      },
      tldr: `${capitalizedKeyword} offers unique benefits for health and wellness. This guide covers everything from the science behind it to practical applications in your daily life.`,
      sections: outline.map(section => ({
        heading: section.heading,
        content: this.generateSectionContent(section.heading, keyword, contentSnippets)
      })),
      faq: [
        {
          question: `What makes ${keyword} different from regular options?`,
          answer: `${capitalizedKeyword} stands out due to its unique properties and benefits. Unlike conventional alternatives, it offers enhanced bioavailability and effectiveness.`
        },
        {
          question: `How do I use ${keyword} effectively?`,
          answer: `For best results, follow the recommended usage guidelines. Start with a small amount and gradually increase as your body adjusts.`
        },
        {
          question: `Is ${keyword} safe for daily use?`,
          answer: `Yes, when used as directed, ${keyword} is safe for regular consumption. However, consult with a healthcare provider if you have specific concerns.`
        }
      ],
      cta: {
        text: `Ready to experience the benefits of ${keyword}? Try our premium ionic mineral solution today.`,
        buttonText: "Shop Now",
        productSlug: "andara-ionic-100ml"
      }
    };
    
    return draft;
  }
  
  async suggestTitle(keyword: string, intent: string): Promise<string> {
    const patterns = TITLE_PATTERNS[intent] || TITLE_PATTERNS.informational;
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    return pattern.replace('{keyword}', this.capitalizeKeyword(keyword));
  }
  
  private capitalizeKeyword(keyword: string): string {
    return keyword.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  
  private generateSectionContent(heading: string, keyword: string, snippets: string[]): string {
    const capitalizedKeyword = this.capitalizeKeyword(keyword);
    
    if (heading.toLowerCase().includes('what is')) {
      return `${capitalizedKeyword} represents a breakthrough in natural wellness solutions. Drawing from ancient wisdom and modern science, this approach harnesses the power of ionic minerals to support your body's natural processes. Understanding the fundamentals of ${keyword} is the first step toward incorporating it into your wellness routine.`;
    }
    
    if (heading.toLowerCase().includes('benefit')) {
      return `The benefits of ${keyword} extend across multiple aspects of health and wellness:\n\n• **Enhanced hydration** – Improved cellular water absorption\n• **Mineral balance** – Essential trace elements in bioavailable form\n• **Energy support** – Natural vitality without stimulants\n• **Detoxification** – Supports the body's natural cleansing processes\n\nThese benefits work synergistically to promote overall well-being.`;
    }
    
    if (heading.toLowerCase().includes('how it works') || heading.toLowerCase().includes('science')) {
      return `The mechanism behind ${keyword} involves the unique properties of ionic minerals. When minerals exist in an ionic state, they carry an electrical charge that allows for superior absorption at the cellular level. This bioelectric compatibility means your body can utilize these nutrients more efficiently than conventional supplements. The structured water matrix further enhances delivery, creating an optimal environment for nutrient transport.`;
    }
    
    if (heading.toLowerCase().includes('conclusion')) {
      return `${capitalizedKeyword} offers a natural, science-backed approach to enhanced wellness. By understanding its mechanisms and benefits, you can make informed decisions about incorporating it into your health routine. Whether you're seeking better hydration, improved mineral balance, or overall vitality, ${keyword} provides a foundation for optimal health.`;
    }
    
    return `This section explores important aspects of ${keyword} that contribute to its effectiveness. Research and practical experience both support the value of understanding these concepts for anyone interested in natural health solutions.`;
  }
}

export class MagicPageGeneratorService {
  private llmProvider: LLMProvider;
  
  constructor(provider?: LLMProvider) {
    this.llmProvider = provider || new MockLLMProvider();
  }
  
  setProvider(provider: LLMProvider): void {
    this.llmProvider = provider;
  }
  
  async suggestPagesFromKeywords(options?: {
    minScore?: number;
    limit?: number;
    excludeStatus?: string[];
  }): Promise<InsertMagicPageSuggestion[]> {
    const { minScore = 50, limit = 10, excludeStatus = ['published', 'rejected'] } = options || {};
    
    const keywords = await storage.getAllSeoKeywords();
    
    const eligibleKeywords = keywords.filter(kw => {
      if (excludeStatus.includes(kw.status)) return false;
      
      const opportunityScore = seoScanner.calculateOpportunityScore({
        keyword: kw.keyword,
        searchIntent: kw.searchIntent as any,
        difficultyScore: kw.difficultyScore ?? 50,
        volumeEstimate: kw.volumeEstimate ?? 0,
        relevanceScore: kw.relevanceScore ?? 50
      });
      
      return opportunityScore >= minScore;
    });
    
    const suggestions: InsertMagicPageSuggestion[] = [];
    
    for (const keyword of eligibleKeywords.slice(0, limit)) {
      const existingSuggestion = await storage.getMagicPageSuggestionByKeyword(keyword.id);
      if (existingSuggestion) continue;
      
      const title = await this.llmProvider.suggestTitle(keyword.keyword, keyword.searchIntent);
      const slug = this.generateSlug(keyword.keyword);
      
      const opportunityScore = seoScanner.calculateOpportunityScore({
        keyword: keyword.keyword,
        searchIntent: keyword.searchIntent as any,
        difficultyScore: keyword.difficultyScore ?? 50,
        volumeEstimate: keyword.volumeEstimate ?? 0,
        relevanceScore: keyword.relevanceScore ?? 50
      });
      
      const suggestion: InsertMagicPageSuggestion = {
        keywordId: keyword.id,
        targetKeyword: keyword.keyword,
        workingTitle: title,
        suggestedSlug: slug,
        targetPersona: this.suggestPersona(keyword.searchIntent),
        sourceDocIds: keyword.relatedDocIds || [],
        score: opportunityScore,
        status: 'suggested'
      };
      
      suggestions.push(suggestion);
    }
    
    return suggestions;
  }
  
  async generateOutline(suggestionId: string): Promise<MagicPageSuggestion> {
    const suggestion = await storage.getMagicPageSuggestion(suggestionId);
    if (!suggestion) {
      throw new Error(`Suggestion ${suggestionId} not found`);
    }
    
    const relatedContent = await this.gatherRelatedContent(suggestion.sourceDocIds);
    
    const keyword = await storage.getSeoKeyword(suggestion.keywordId || '');
    const intent = keyword?.searchIntent || 'informational';
    
    const outline = await this.llmProvider.generateOutline({
      keyword: suggestion.targetKeyword,
      intent,
      relatedContent,
      persona: suggestion.targetPersona || undefined
    });
    
    const updated = await storage.updateMagicPageSuggestion(suggestionId, {
      outline: { sections: outline },
      status: 'outline_ready'
    });
    
    return updated;
  }
  
  async generateDraft(suggestionId: string): Promise<MagicPageSuggestion> {
    const suggestion = await storage.getMagicPageSuggestion(suggestionId);
    if (!suggestion) {
      throw new Error(`Suggestion ${suggestionId} not found`);
    }
    
    await storage.updateMagicPageSuggestion(suggestionId, { status: 'generating' });
    
    try {
      const relatedContent = await this.gatherRelatedContent(suggestion.sourceDocIds);
      const outline = suggestion.outline?.sections || [];
      
      const draft = await this.llmProvider.generateDraft({
        keyword: suggestion.targetKeyword,
        outline,
        relatedContent,
        persona: suggestion.targetPersona || undefined
      });
      
      const products = await storage.getAllProducts();
      const productLinks = products.slice(0, 2).map(p => p.slug);
      
      const pages = await storage.getAllPages();
      const relevantPages = pages
        .filter(p => p.status === 'published')
        .slice(0, 3)
        .map(p => p.path);
      
      const updated = await storage.updateMagicPageSuggestion(suggestionId, {
        draftContent: draft,
        suggestedProductLinks: productLinks,
        suggestedPageLinks: relevantPages,
        status: 'draft_ready',
        generatedAt: new Date(),
        generationModel: 'mock-llm-v1'
      });
      
      return updated;
    } catch (error) {
      await storage.updateMagicPageSuggestion(suggestionId, { status: 'outline_ready' });
      throw error;
    }
  }
  
  async publishSuggestionAsPage(suggestionId: string): Promise<Page> {
    const suggestion = await storage.getMagicPageSuggestion(suggestionId);
    if (!suggestion) {
      throw new Error(`Suggestion ${suggestionId} not found`);
    }
    
    if (!suggestion.draftContent) {
      throw new Error('Suggestion does not have draft content. Generate a draft first.');
    }
    
    const draft = suggestion.draftContent;
    
    let contentMarkdown = '';
    
    if (draft.hero) {
      contentMarkdown += `# ${draft.hero.title}\n\n`;
      if (draft.hero.subtitle) {
        contentMarkdown += `*${draft.hero.subtitle}*\n\n`;
      }
    }
    
    if (draft.tldr) {
      contentMarkdown += `## TL;DR\n\n${draft.tldr}\n\n`;
    }
    
    if (draft.sections) {
      for (const section of draft.sections) {
        contentMarkdown += `## ${section.heading}\n\n${section.content}\n\n`;
      }
    }
    
    if (draft.faq && draft.faq.length > 0) {
      contentMarkdown += `## Frequently Asked Questions\n\n`;
      for (const item of draft.faq) {
        contentMarkdown += `### ${item.question}\n\n${item.answer}\n\n`;
      }
    }
    
    const pageKey = `magic-${suggestion.suggestedSlug}`;
    const pagePath = `/science/${suggestion.suggestedSlug}`;
    
    const pageData: InsertPage = {
      key: pageKey,
      title: suggestion.workingTitle,
      path: pagePath,
      pageType: 'article',
      template: 'article',
      summary: draft.tldr || suggestion.workingTitle,
      content: contentMarkdown,
      seoFocus: suggestion.targetKeyword,
      seoTitle: suggestion.workingTitle,
      seoDescription: draft.tldr?.slice(0, 160) || suggestion.workingTitle,
      status: 'draft',
      priority: 5,
      metadata: {
        magicPageSuggestionId: suggestionId,
        targetKeyword: suggestion.targetKeyword,
        generatedAt: suggestion.generatedAt?.toISOString() || null,
        suggestedProductLinks: [...suggestion.suggestedProductLinks],
        suggestedPageLinks: [...suggestion.suggestedPageLinks]
      } as Record<string, any>
    };
    
    const page = await storage.createPage(pageData);
    
    await storage.updateMagicPageSuggestion(suggestionId, {
      generatedPageId: page.id,
      status: 'published'
    });
    
    if (suggestion.keywordId) {
      await storage.updateSeoKeyword(suggestion.keywordId, {
        status: 'in_progress',
        suggestedPageId: page.id
      });
    }
    
    return page;
  }
  
  async rejectSuggestion(suggestionId: string, reason?: string): Promise<MagicPageSuggestion> {
    const updated = await storage.updateMagicPageSuggestion(suggestionId, {
      status: 'rejected'
    });
    return updated;
  }
  
  async getSuggestionWithKeyword(suggestionId: string): Promise<{
    suggestion: MagicPageSuggestion;
    keyword?: SeoKeyword;
    documents: Document[];
  }> {
    const suggestion = await storage.getMagicPageSuggestion(suggestionId);
    if (!suggestion) {
      throw new Error(`Suggestion ${suggestionId} not found`);
    }
    
    let keyword: SeoKeyword | undefined;
    if (suggestion.keywordId) {
      keyword = await storage.getSeoKeyword(suggestion.keywordId);
    }
    
    const documents: Document[] = [];
    for (const docId of suggestion.sourceDocIds) {
      const doc = await storage.getDocument(docId);
      if (doc) documents.push(doc);
    }
    
    return { suggestion, keyword, documents };
  }
  
  private async gatherRelatedContent(docIds: string[]): Promise<string[]> {
    const content: string[] = [];
    
    for (const docId of docIds.slice(0, 5)) {
      const doc = await storage.getDocument(docId);
      if (doc) {
        const text = doc.cleanText || doc.rawText;
        const excerpt = text.slice(0, 2000);
        content.push(excerpt);
      }
    }
    
    return content;
  }
  
  private generateSlug(keyword: string): string {
    return keyword
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 60);
  }
  
  private suggestPersona(intent: string): string {
    const personaMap: Record<string, string> = {
      informational: 'science_curious',
      commercial: 'health_seeker',
      transactional: 'wellness_professional',
      navigational: 'water_enthusiast'
    };
    
    const key = personaMap[intent] || 'health_seeker';
    return PERSONA_TEMPLATES[key];
  }
}

export const magicPageGenerator = new MagicPageGeneratorService();
