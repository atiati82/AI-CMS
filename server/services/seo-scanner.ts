import { storage } from "../storage";
import type { InsertSeoKeyword, Document } from "@shared/schema";

export interface SeoAnalysisResult {
  keyword: string;
  searchIntent: 'informational' | 'commercial' | 'navigational' | 'transactional';
  difficultyScore: number;
  volumeEstimate: number;
  relevanceScore: number;
  competitorNotes?: string;
  suggestedClusterKey?: string;
}

export interface SeoDataProvider {
  analyzeKeyword(keyword: string): Promise<{
    difficultyScore: number;
    volumeEstimate: number;
    competitorNotes?: string;
  }>;
  
  suggestRelatedKeywords(seed: string, limit?: number): Promise<string[]>;
}

const SEARCH_INTENT_INDICATORS = {
  informational: ['what is', 'how to', 'why', 'guide', 'tutorial', 'learn', 'understand', 'explain', 'definition', 'meaning'],
  commercial: ['best', 'top', 'review', 'compare', 'vs', 'alternative', 'cheap', 'affordable'],
  transactional: ['buy', 'purchase', 'order', 'price', 'cost', 'discount', 'deal', 'shop', 'get'],
  navigational: ['login', 'sign in', 'website', 'official', 'contact', 'support']
};

const SITE_RELEVANCE_KEYWORDS = [
  'ionic', 'mineral', 'sulfate', 'water', 'structured', 'hydrogen', 'health', 
  'wellness', 'hydration', 'electrolyte', 'trace', 'primordial', 'crystal',
  'bioelectric', 'dna', 'cell', 'detox', 'alkaline', 'ph', 'energy',
  'frequency', 'vibration', 'healing', 'natural', 'organic', 'pure'
];

export class MockSeoDataProvider implements SeoDataProvider {
  async analyzeKeyword(keyword: string): Promise<{
    difficultyScore: number;
    volumeEstimate: number;
    competitorNotes?: string;
  }> {
    const lowerKeyword = keyword.toLowerCase();
    const wordCount = lowerKeyword.split(/\s+/).length;
    
    let baseDifficulty = 50;
    if (wordCount >= 4) baseDifficulty = 25;
    else if (wordCount === 3) baseDifficulty = 35;
    else if (wordCount === 2) baseDifficulty = 55;
    else baseDifficulty = 70;
    
    const randomOffset = Math.floor(Math.random() * 20) - 10;
    const difficultyScore = Math.max(5, Math.min(95, baseDifficulty + randomOffset));
    
    let baseVolume = 100;
    if (wordCount === 1) baseVolume = 5000;
    else if (wordCount === 2) baseVolume = 1000;
    else if (wordCount === 3) baseVolume = 300;
    else baseVolume = 100;
    
    const volumeMultiplier = 0.5 + Math.random();
    const volumeEstimate = Math.floor(baseVolume * volumeMultiplier);
    
    const competitorNotes = this.generateCompetitorNotes(difficultyScore);
    
    return { difficultyScore, volumeEstimate, competitorNotes };
  }
  
  async suggestRelatedKeywords(seed: string, limit: number = 5): Promise<string[]> {
    const prefixes = ['best', 'how to', 'why', 'what is', 'benefits of'];
    const suffixes = ['for health', 'benefits', 'vs tap water', 'science', 'reviews', 'guide'];
    
    const suggestions: string[] = [];
    
    for (const prefix of prefixes.slice(0, Math.ceil(limit / 2))) {
      suggestions.push(`${prefix} ${seed}`);
    }
    
    for (const suffix of suffixes.slice(0, Math.ceil(limit / 2))) {
      suggestions.push(`${seed} ${suffix}`);
    }
    
    return suggestions.slice(0, limit);
  }
  
  private generateCompetitorNotes(difficulty: number): string {
    if (difficulty >= 70) {
      return "High competition. Major health/wellness sites dominating. Consider long-tail variations.";
    } else if (difficulty >= 50) {
      return "Moderate competition. Mix of established and smaller sites. Opportunity with quality content.";
    } else if (difficulty >= 30) {
      return "Lower competition. Fewer authoritative pages. Good opportunity for targeted content.";
    } else {
      return "Low competition. Limited existing content. High opportunity for early positioning.";
    }
  }
}

export class SeoScannerService {
  private provider: SeoDataProvider;
  
  constructor(provider?: SeoDataProvider) {
    this.provider = provider || new MockSeoDataProvider();
  }
  
  setProvider(provider: SeoDataProvider): void {
    this.provider = provider;
  }
  
  async extractKeywordsFromText(text: string, maxKeywords: number = 20): Promise<string[]> {
    const cleanText = text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    const words = cleanText.split(' ').filter(w => w.length > 3);
    
    const stopWords = new Set([
      'this', 'that', 'with', 'from', 'have', 'been', 'were', 'what', 'when',
      'where', 'which', 'their', 'there', 'they', 'will', 'would', 'could',
      'should', 'about', 'into', 'more', 'some', 'such', 'than', 'them',
      'then', 'these', 'those', 'very', 'just', 'also', 'only', 'other',
      'over', 'your', 'each', 'does', 'doing', 'during', 'before', 'after'
    ]);
    
    const filteredWords = words.filter(w => !stopWords.has(w));
    
    const wordFreq = new Map<string, number>();
    for (const word of filteredWords) {
      wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    }
    
    const phrases: string[] = [];
    
    const sortedWords = Array.from(wordFreq.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30)
      .map(([word]) => word);
    
    phrases.push(...sortedWords.slice(0, maxKeywords / 2));
    
    for (let i = 0; i < filteredWords.length - 1; i++) {
      const bigram = `${filteredWords[i]} ${filteredWords[i + 1]}`;
      if (!phrases.includes(bigram) && bigram.length > 8) {
        phrases.push(bigram);
      }
      if (phrases.length >= maxKeywords) break;
    }
    
    for (let i = 0; i < filteredWords.length - 2; i++) {
      const trigram = `${filteredWords[i]} ${filteredWords[i + 1]} ${filteredWords[i + 2]}`;
      if (!phrases.includes(trigram) && trigram.length > 12) {
        phrases.push(trigram);
      }
      if (phrases.length >= maxKeywords) break;
    }
    
    return Array.from(new Set(phrases)).slice(0, maxKeywords);
  }
  
  detectSearchIntent(keyword: string): 'informational' | 'commercial' | 'navigational' | 'transactional' {
    const lowerKeyword = keyword.toLowerCase();
    
    for (const [intent, indicators] of Object.entries(SEARCH_INTENT_INDICATORS)) {
      if (indicators.some(ind => lowerKeyword.includes(ind))) {
        return intent as 'informational' | 'commercial' | 'navigational' | 'transactional';
      }
    }
    
    return 'informational';
  }
  
  calculateRelevanceScore(keyword: string): number {
    const lowerKeyword = keyword.toLowerCase();
    let score = 30;
    
    for (const relevantWord of SITE_RELEVANCE_KEYWORDS) {
      if (lowerKeyword.includes(relevantWord)) {
        score += 15;
      }
    }
    
    if (lowerKeyword.includes('ionic') || lowerKeyword.includes('mineral')) {
      score += 20;
    }
    if (lowerKeyword.includes('sulfate') || lowerKeyword.includes('structured water')) {
      score += 25;
    }
    
    return Math.min(100, score);
  }
  
  async analyzeKeyword(keyword: string): Promise<SeoAnalysisResult> {
    const providerData = await this.provider.analyzeKeyword(keyword);
    const searchIntent = this.detectSearchIntent(keyword);
    const relevanceScore = this.calculateRelevanceScore(keyword);
    
    const suggestedClusterKey = this.suggestClusterForKeyword(keyword);
    
    return {
      keyword,
      searchIntent,
      difficultyScore: providerData.difficultyScore,
      volumeEstimate: providerData.volumeEstimate,
      relevanceScore,
      competitorNotes: providerData.competitorNotes,
      suggestedClusterKey
    };
  }
  
  suggestClusterForKeyword(keyword: string): string | undefined {
    const lowerKeyword = keyword.toLowerCase();
    
    const clusterMappings: Record<string, string[]> = {
      'water-science': ['water', 'structured', 'hydrogen', 'hydration', 'h2o', 'molecule'],
      'mineral-science': ['mineral', 'trace', 'sulfate', 'ionic', 'electrolyte', 'magnesium', 'calcium'],
      'bioelectric': ['bioelectric', 'frequency', 'vibration', 'energy', 'cell', 'electrical'],
      'dna-information': ['dna', 'genetic', 'information', 'code', 'blueprint'],
      'applications': ['recipe', 'use', 'application', 'how to', 'guide', 'dosage', 'dilution'],
      'crystalline': ['crystal', 'structure', 'matrix', 'geometry', 'sacred']
    };
    
    for (const [clusterKey, keywords] of Object.entries(clusterMappings)) {
      if (keywords.some(kw => lowerKeyword.includes(kw))) {
        return clusterKey;
      }
    }
    
    return undefined;
  }
  
  async analyzeDocument(document: Document): Promise<SeoAnalysisResult[]> {
    const text = document.cleanText || document.rawText;
    const extractedKeywords = await this.extractKeywordsFromText(text, 15);
    
    const results: SeoAnalysisResult[] = [];
    
    for (const keyword of extractedKeywords) {
      const analysis = await this.analyzeKeyword(keyword);
      results.push(analysis);
    }
    
    return results.sort((a, b) => {
      const scoreA = (a.relevanceScore * 2) + (100 - a.difficultyScore) + (a.volumeEstimate / 100);
      const scoreB = (b.relevanceScore * 2) + (100 - b.difficultyScore) + (b.volumeEstimate / 100);
      return scoreB - scoreA;
    });
  }
  
  async findOpportunities(options?: {
    minRelevance?: number;
    maxDifficulty?: number;
    minVolume?: number;
    limit?: number;
  }): Promise<SeoAnalysisResult[]> {
    const minRelevance = options?.minRelevance ?? 50;
    const maxDifficulty = options?.maxDifficulty ?? 60;
    const minVolume = options?.minVolume ?? 50;
    const limit = options?.limit ?? 20;
    
    const keywords = await storage.getAllSeoKeywords();
    
    const opportunities = keywords
      .filter(kw => {
        return (kw.relevanceScore ?? 0) >= minRelevance &&
               (kw.difficultyScore ?? 100) <= maxDifficulty &&
               (kw.volumeEstimate ?? 0) >= minVolume &&
               kw.status !== 'published' &&
               kw.status !== 'rejected';
      })
      .map(kw => ({
        keyword: kw.keyword,
        searchIntent: kw.searchIntent as SeoAnalysisResult['searchIntent'],
        difficultyScore: kw.difficultyScore ?? 50,
        volumeEstimate: kw.volumeEstimate ?? 0,
        relevanceScore: kw.relevanceScore ?? 50,
        competitorNotes: kw.competitorNotes ?? undefined,
        suggestedClusterKey: kw.targetClusterKey ?? undefined
      }))
      .slice(0, limit);
    
    return opportunities;
  }
  
  async scanDocumentAndSaveKeywords(documentId: string): Promise<InsertSeoKeyword[]> {
    const document = await storage.getDocument(documentId);
    if (!document) {
      throw new Error(`Document ${documentId} not found`);
    }
    
    const analyses = await this.analyzeDocument(document);
    
    const keywordsToCreate: InsertSeoKeyword[] = analyses.map(analysis => ({
      keyword: analysis.keyword,
      searchIntent: analysis.searchIntent,
      difficultyScore: analysis.difficultyScore,
      volumeEstimate: analysis.volumeEstimate,
      relevanceScore: analysis.relevanceScore,
      competitorNotes: analysis.competitorNotes,
      targetClusterKey: analysis.suggestedClusterKey,
      relatedDocIds: [documentId],
      status: 'idea',
      lastAnalyzedAt: new Date()
    }));
    
    return keywordsToCreate;
  }
  
  async getSuggestedKeywords(seeds: string[], limit: number = 10): Promise<string[]> {
    const allSuggestions: string[] = [];
    
    for (const seed of seeds) {
      const related = await this.provider.suggestRelatedKeywords(seed, Math.ceil(limit / seeds.length));
      allSuggestions.push(...related);
    }
    
    return Array.from(new Set(allSuggestions)).slice(0, limit);
  }
  
  calculateOpportunityScore(analysis: SeoAnalysisResult): number {
    const relevanceWeight = 0.4;
    const difficultyWeight = 0.35;
    const volumeWeight = 0.25;
    
    const normalizedVolume = Math.min(100, Math.log10(Math.max(1, analysis.volumeEstimate)) * 20);
    const invertedDifficulty = 100 - analysis.difficultyScore;
    
    const score = 
      (analysis.relevanceScore * relevanceWeight) +
      (invertedDifficulty * difficultyWeight) +
      (normalizedVolume * volumeWeight);
    
    return Math.round(score);
  }
}

export const seoScanner = new SeoScannerService();
