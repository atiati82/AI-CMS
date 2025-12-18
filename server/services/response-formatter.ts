/**
 * State-of-the-art RAG Response Formatter (2024 Best Practices)
 * 
 * Based on research showing:
 * - Markdown improves AI accuracy by 81.2%
 * - Semantic chunking prevents information fragmentation
 * - Structured output ensures consistency and readability
 */

// Define interface locally to avoid import issues
export interface KnowledgeSearchResult {
    id: string;
    title: string;
    content: string;
    source: string;
    relevance?: number;
}

export interface FormattedResponse {
    response: string;
    metadata: {
        sourceCount: number;
        relevanceScore: number;
        timestamp: string;
        queryType: 'technical' | 'general' | 'how-to' | 'reference';
    };
}

export interface Section {
    type: 'heading' | 'paragraph' | 'list' | 'code' | 'table' | 'quote';
    content: string;
    level?: number;
}

export class ResponseFormatter {
    /**
     * Format search results into a well-structured, readable response
     */
    formatResponse(query: string, results: KnowledgeSearchResult[]): FormattedResponse {
        if (results.length === 0) {
            return this.formatEmptyResponse(query);
        }

        const queryType = this.detectQueryType(query);
        const relevanceScore = this.calculateAverageRelevance(results);

        // Build clean, modern response
        let response = '';

        // 1. Clean Header
        response += `## 📚 Knowledge Base Results\n\n`;
        response += `**Query:** "${query}"\n\n`;
        response += `---\n\n`;

        // 2. Main Content (from top result, cleaned and truncated)
        const mainContent = this.extractCleanContent(results[0].content, 800);
        response += `### ${results[0].title}\n\n`;
        response += mainContent + '\n\n';

        // 3. Related sources (compact list, max 3)
        if (results.length > 1) {
            response += `---\n\n`;
            response += `**📎 Related Sources** (${Math.min(results.length, 5)} found)\n\n`;
            const shown = results.slice(0, 5);
            shown.forEach((r, i) => {
                const snippet = this.extractCleanContent(r.content, 100).replace(/\n/g, ' ');
                response += `${i + 1}. **${r.title}**\n`;
                response += `   ${snippet.substring(0, 120)}${snippet.length > 120 ? '...' : ''}\n\n`;
            });
        }

        // 4. Simple footer
        response += `---\n\n`;
        response += `> 💡 *This response is from the local knowledge base. For AI-generated responses, ensure your API keys are configured.*`;

        return {
            response,
            metadata: {
                sourceCount: results.length,
                relevanceScore,
                timestamp: new Date().toISOString(),
                queryType,
            },
        };
    }

    /**
     * Extract clean, readable content without noise
     */
    private extractCleanContent(content: string, maxLength: number): string {
        let cleaned = content || '';

        // Strip HTML tags
        cleaned = cleaned.replace(/<[^>]*>/g, '');

        // Decode HTML entities
        cleaned = cleaned.replace(/&amp;/g, '&');
        cleaned = cleaned.replace(/&lt;/g, '<');
        cleaned = cleaned.replace(/&gt;/g, '>');
        cleaned = cleaned.replace(/&quot;/g, '"');
        cleaned = cleaned.replace(/&#39;/g, "'");
        cleaned = cleaned.replace(/&nbsp;/g, ' ');

        // Remove excessive whitespace
        cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
        cleaned = cleaned.replace(/\s{3,}/g, ' ');

        // Truncate intelligently (at sentence boundary if possible)
        if (cleaned.length > maxLength) {
            const truncated = cleaned.substring(0, maxLength);
            const lastPeriod = truncated.lastIndexOf('.');
            const lastNewline = truncated.lastIndexOf('\n');
            const cutPoint = Math.max(lastPeriod, lastNewline);

            if (cutPoint > maxLength * 0.5) {
                cleaned = truncated.substring(0, cutPoint + 1);
            } else {
                cleaned = truncated + '...';
            }
        }

        return cleaned.trim();
    }

    /**
     * Format summary section with query context
     */
    private formatSummary(query: string, results: KnowledgeSearchResult[]): string {
        const topResult = results[0];
        const summary = this.extractSummaryFromContent(topResult.content);

        return `## ${this.capitalizeFirst(query)}\n\n${summary}`;
    }

    /**
     * Extract and format key points for quick scanning
     */
    private formatKeyPoints(points: string[]): string {
        let section = '### Key Points\n\n';
        points.forEach(point => {
            const cleaned = this.cleanContent(point);
            section += `- ${cleaned}\n`;
        });
        return section;
    }

    /**
     * Format main detailed content with semantic structure
     */
    private formatDetailedContent(result: KnowledgeSearchResult): string {
        // Clean content first to remove HTML
        const cleanedContent = this.cleanContent(result.content);
        const sections = this.detectSections(cleanedContent);
        let formatted = '### Detailed Information\n\n';

        sections.forEach(section => {
            formatted += this.formatSection(section);
            formatted += '\n';
        });

        return formatted.trim();
    }

    /**
     * Format related information snippets
     */
    private formatRelatedInfo(results: KnowledgeSearchResult[]): string {
        let section = '### Related Information\n\n';

        results.forEach((result, index) => {
            const snippet = this.extractRelevantSnippet(result.content, 250);
            const cleaned = this.cleanContent(snippet);
            section += `${index + 1}. ${cleaned}...\n\n`;
        });

        return section.trim();
    }

    /**
     * Format sources with proper attribution and deduplication
     */
    private formatSources(results: KnowledgeSearchResult[]): string {
        let section = '### Sources\n\n';

        // Deduplicate sources
        const uniqueSources = new Map<string, { title: string; source: string; relevance: number }>();

        results.forEach((result) => {
            const key = `${result.title}-${result.source}`;
            if (!uniqueSources.has(key)) {
                uniqueSources.set(key, {
                    title: result.title,
                    source: result.source,
                    relevance: result.relevance || 0,
                });
            }
        });

        // Format sources with relevance indicators
        let index = 1;
        uniqueSources.forEach(({ title, source, relevance }) => {
            const stars = this.getRelevanceStars(relevance);
            section += `${index}. **${title}**\n`;
            section += `   - Source: \`${source}\`\n`;
            if (relevance > 0) {
                section += `   - Relevance: ${stars}\n`;
            }
            section += '\n';
            index++;
        });

        return section.trim();
    }

    /**
     * Format footer with metadata
     */
    private formatFooter(sourceCount: number): string {
        const timestamp = new Date().toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

        return `---\n*Generated from knowledge base • ${sourceCount} source${sourceCount !== 1 ? 's' : ''} • ${timestamp}*\n\n> **Note:** This response was generated using the local knowledge base. External AI is currently unavailable.`;
    }

    /**
     * Format empty response when no results found
     */
    private formatEmptyResponse(query: string): FormattedResponse {
        const response = `## No Results Found\n\nI couldn't find any relevant information in the knowledge base about **"${query}"**.\n\n### Suggestions\n\n1. **Rephrase your question** - Try using different keywords\n2. **Check spelling** - Ensure terms are spelled correctly\n3. **Broaden your search** - Use more general terms\n4. **Ingest documents** - Add relevant documents to the knowledge base\n5. **Try again later** - The external AI system may be back online\n\n---\n*The external AI system is currently unavailable. Only local knowledge base search is active.*`;

        return {
            response,
            metadata: {
                sourceCount: 0,
                relevanceScore: 0,
                timestamp: new Date().toISOString(),
                queryType: 'general',
            },
        };
    }

    // ==================== UTILITY METHODS ====================

    /**
     * Clean and normalize content for display
     */
    private cleanContent(content: string): string {
        if (!content) return '';

        let cleaned = content;

        // Strip HTML tags completely
        cleaned = cleaned.replace(/<[^>]*>/g, '');

        // Decode common HTML entities
        cleaned = cleaned.replace(/&amp;/g, '&');
        cleaned = cleaned.replace(/&lt;/g, '<');
        cleaned = cleaned.replace(/&gt;/g, '>');
        cleaned = cleaned.replace(/&quot;/g, '"');
        cleaned = cleaned.replace(/&#39;/g, "'");
        cleaned = cleaned.replace(/&nbsp;/g, ' ');

        // Remove excessive newlines (more than 2 consecutive)
        cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

        // Ensure proper spacing after headers
        cleaned = cleaned.replace(/(#{1,6}\s+[^\n]+)\n([^\n])/g, '$1\n\n$2');

        // Remove leading/trailing whitespace
        cleaned = cleaned.trim();

        // Fix broken markdown lists
        cleaned = cleaned.replace(/\n-\s+/g, '\n- ');
        cleaned = cleaned.replace(/\n\*\s+/g, '\n* ');

        // Ensure code blocks have proper spacing
        cleaned = cleaned.replace(/```(\w+)?\n/g, '\n```$1\n');
        cleaned = cleaned.replace(/\n```/g, '\n```\n');

        return cleaned;
    }

    /**
     * Detect sections in content (headers, paragraphs, lists, code)
     */
    private detectSections(content: string): Section[] {
        const sections: Section[] = [];
        const lines = content.split('\n');
        let currentSection: Section | null = null;

        for (const line of lines) {
            // Detect headers
            const headerMatch = line.match(/^(#{1,6})\s+(.+)$/);
            if (headerMatch) {
                if (currentSection) sections.push(currentSection);
                currentSection = {
                    type: 'heading',
                    content: headerMatch[2],
                    level: headerMatch[1].length,
                };
                continue;
            }

            // Detect code blocks
            if (line.startsWith('```')) {
                if (currentSection?.type === 'code') {
                    currentSection.content += '\n' + line;
                    sections.push(currentSection);
                    currentSection = null;
                } else {
                    if (currentSection) sections.push(currentSection);
                    currentSection = { type: 'code', content: line };
                }
                continue;
            }

            // Detect lists
            if (line.match(/^[\s]*[-*+]\s+/) || line.match(/^[\s]*\d+\.\s+/)) {
                if (currentSection?.type === 'list') {
                    currentSection.content += '\n' + line;
                } else {
                    if (currentSection) sections.push(currentSection);
                    currentSection = { type: 'list', content: line };
                }
                continue;
            }

            // Regular paragraphs
            if (line.trim()) {
                if (currentSection?.type === 'paragraph') {
                    currentSection.content += ' ' + line.trim();
                } else if (currentSection?.type === 'code') {
                    currentSection.content += '\n' + line;
                } else {
                    if (currentSection) sections.push(currentSection);
                    currentSection = { type: 'paragraph', content: line.trim() };
                }
            } else if (currentSection && currentSection.type !== 'code') {
                sections.push(currentSection);
                currentSection = null;
            }
        }

        if (currentSection) sections.push(currentSection);
        return sections;
    }

    /**
     * Format a single section based on its type
     */
    private formatSection(section: Section): string {
        switch (section.type) {
            case 'heading':
                const level = Math.min(section.level || 1, 6);
                return `${'#'.repeat(level + 2)} ${section.content}\n`;
            case 'code':
                return `${section.content}\n`;
            case 'list':
                return `${section.content}\n`;
            case 'paragraph':
                return `${section.content}\n`;
            default:
                return `${section.content}\n`;
        }
    }

    /**
     * Extract key points from results
     */
    private extractKeyPoints(results: KnowledgeSearchResult[]): string[] {
        const points: string[] = [];

        results.slice(0, 3).forEach(result => {
            // Clean content first to remove HTML
            const cleanedContent = this.cleanContent(result.content);
            const sections = this.detectSections(cleanedContent);
            sections.forEach(section => {
                if (section.type === 'list') {
                    const listItems = section.content.split('\n').filter(line => line.trim());
                    listItems.slice(0, 2).forEach(item => {
                        const cleaned = item.replace(/^[\s]*[-*+]\s+/, '').replace(/^\d+\.\s+/, '');
                        if (cleaned.length > 10 && cleaned.length < 150) {
                            points.push(cleaned);
                        }
                    });
                }
            });
        });

        return points.slice(0, 5); // Limit to 5 key points
    }

    /**
     * Extract summary from content (first meaningful paragraph)
     */
    private extractSummaryFromContent(content: string): string {
        // Clean content first to remove HTML
        const cleanedContent = this.cleanContent(content);
        const sections = this.detectSections(cleanedContent);

        for (const section of sections) {
            if (section.type === 'paragraph' && section.content.length > 50) {
                return section.content.substring(0, 300) + (section.content.length > 300 ? '...' : '');
            }
        }

        return cleanedContent.substring(0, 200) + '...';
    }

    /**
     * Extract relevant snippet from content
     */
    private extractRelevantSnippet(content: string, maxLength: number): string {
        const cleaned = this.cleanContent(content);
        const sections = this.detectSections(cleaned);

        // Prefer paragraphs for snippets
        for (const section of sections) {
            if (section.type === 'paragraph' && section.content.length > 30) {
                return section.content.substring(0, maxLength);
            }
        }

        return cleaned.substring(0, maxLength);
    }

    /**
     * Detect query type for better formatting
     */
    private detectQueryType(query: string): 'technical' | 'general' | 'how-to' | 'reference' {
        const lower = query.toLowerCase();

        if (lower.includes('how to') || lower.includes('how do') || lower.includes('how can')) {
            return 'how-to';
        }
        if (lower.includes('api') || lower.includes('function') || lower.includes('code') || lower.includes('error')) {
            return 'technical';
        }
        if (lower.includes('what is') || lower.includes('define') || lower.includes('explain')) {
            return 'reference';
        }

        return 'general';
    }

    /**
     * Calculate average relevance score
     */
    private calculateAverageRelevance(results: KnowledgeSearchResult[]): number {
        if (results.length === 0) return 0;
        const sum = results.reduce((acc, r) => acc + (r.relevance || 0), 0);
        return sum / results.length;
    }

    /**
     * Get star rating for relevance score
     */
    private getRelevanceStars(score: number): string {
        const stars = Math.round(score * 5);
        return '⭐'.repeat(Math.max(1, Math.min(5, stars)));
    }

    /**
     * Capitalize first letter of string
     */
    private capitalizeFirst(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Export singleton instance
export const responseFormatter = new ResponseFormatter();
