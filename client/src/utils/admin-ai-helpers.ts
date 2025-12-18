
export type EnhancementTask = {
    id: string;
    label: string;
    description: string;
    field: string;
    detected: boolean;
    value?: string | string[];
    missing?: boolean;
};

export interface ExtractedVisualConfig {
    vibeKeywords: string[];
    emotionalTone: string[];
    colorPalette: string;
    layoutsDetected: string[];
    motionPreset: string;
    entranceMotion: string;
    hoverMotion: string;
    ambientMotion: string;
}

export interface ExtractedAiData {
    featuredImage?: string;
    heroImage?: string;
    images: Array<{ label: string; prompt: string }>;
    visualConfig: Partial<ExtractedVisualConfig>;
}

export function formatAiMessage(content: string): string {
    let html = content;

    // Parse [APPLY:fieldName:pageId]value[/APPLY] or [APPLY:fieldName]value[/APPLY] tags
    html = html.replace(/\[APPLY:(\w+)(?::([^\]]+))?\]([\s\S]*?)\[\/APPLY\]/g, (match, fieldName, pageId, value) => {
        const cleanValue = value.trim();
        const preview = cleanValue.length > 80 ? cleanValue.substring(0, 80) + '...' : cleanValue;
        const escapedValue = cleanValue.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        const fieldLabels: Record<string, string> = {
            seoTitle: 'SEO Title',
            seoDescription: 'Meta Description',
            seoFocus: 'Focus Keywords',
            title: 'Page Title',
            summary: 'Summary',
            content: 'Content',
            featuredImage: 'Featured Image',
            motionPreset: 'Motion Preset',
        };
        const label = fieldLabels[fieldName] || fieldName;
        const pageIdAttr = pageId ? `data-page-id="${pageId}"` : '';
        const eventDetail = pageId
            ? `{ field: '${fieldName}', pageId: '${pageId}', value: \`${escapedValue.replace(/`/g, '\\`')}\` }`
            : `{ field: '${fieldName}', value: \`${escapedValue.replace(/`/g, '\\`')}\` }`;

        return `
      <div class="my-2 p-3 border border-primary/30 bg-primary/5 rounded-lg">
        <div class="flex items-start justify-between gap-2">
          <div class="flex-1">
            <div class="text-xs font-medium text-primary mb-1">${label}</div>
            <div class="text-sm text-foreground/80">${preview}</div>
          </div>
          <button 
            class="apply-suggestion-btn shrink-0 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            data-field="${fieldName}"
            ${pageIdAttr}
            data-value="${escapedValue}"
            onclick="window.dispatchEvent(new CustomEvent('applyAiSuggestion', { detail: ${eventDetail} }))"
          >
            Apply
          </button>
        </div>
      </div>
    `;
    });

    // First, handle raw <code> tags from AI responses - convert to styled code
    html = html.replace(/<code>([^<]+)<\/code>/g, (_, code) => {
        return `\`${code}\``;
    });

    // Hide/collapse technical code blocks (html, visual-config, page-metadata, image-prompts)
    // These are meant for parsing, not display - show a compact summary instead
    const technicalBlocks = ['html', 'visual-config', 'page-metadata', 'image-prompts'];
    html = html.replace(/```([\w-]+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        const langLower = (lang || '').toLowerCase();

        // For technical blocks, show a collapsed summary
        if (technicalBlocks.includes(langLower)) {
            const lineCount = code.split('\n').filter((l: string) => l.trim()).length;
            const blockLabels: Record<string, string> = {
                'html': 'HTML Content',
                'visual-config': 'Visual Config',
                'page-metadata': 'Page Metadata',
                'image-prompts': 'Image Prompts'
            };
            const label = blockLabels[langLower] || lang || 'Code';
            return `<div class="my-2 px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg text-xs text-primary flex items-center gap-2"><span class="font-medium">${label}</span><span class="text-muted-foreground">(${lineCount} lines - use "Review & Apply" below)</span></div>`;
        }

        // For other code blocks, show collapsed with first few lines
        const lines = code.split('\n');
        if (lines.length > 8) {
            const preview = lines.slice(0, 5).join('\n');
            const escaped = preview.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return `<details class="my-2 border border-border/30 rounded-lg overflow-hidden"><summary class="cursor-pointer text-xs font-medium px-3 py-2 bg-muted/30 hover:bg-muted/50 transition-colors flex items-center gap-2"><span class="text-primary">${lang || 'Code'}</span><span class="text-muted-foreground">(${lines.length} lines - click to expand)</span></summary><pre class="mt-0 p-3 text-xs max-h-64 overflow-auto bg-muted/20"><code class="language-${lang || ''}">${escaped}\n... (${lines.length - 5} more lines)</code></pre></details>`;
        }

        // Short code blocks - show normally with better styling
        const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return `<pre class="my-2 p-3 rounded-lg border border-border/30 bg-muted/20 text-xs max-h-48 overflow-auto"><code class="language-${lang || ''}">${escaped}</code></pre>`;
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, (_, code) => {
        const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return `<code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-cyan-400">${escaped}</code>`;
    });

    // Helper to apply inline formatting (bold, italic, links)
    const applyInlineFormatting = (text: string): string => {
        // Escape HTML entities first
        let result = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        // Then apply formatting
        result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        result = result.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
        return result;
    };

    const lines = html.split('\n');
    const result: string[] = [];
    let inList = false;
    let listType = '';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let listIndent = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Skip pre blocks entirely
        if (line.startsWith('<pre>')) {
            if (inList) { result.push(listType === 'ol' ? '</ol>' : '</ul>'); inList = false; }
            result.push(line);
            continue;
        }

        // Headers (h1-h6)
        if (/^#{1,6}\s+(.+)$/.test(line)) {
            if (inList) { result.push(listType === 'ol' ? '</ol>' : '</ul>'); inList = false; }
            const match = line.match(/^(#{1,6})\s+(.+)$/);
            if (match) {
                const level = Math.min(match[1].length, 6); // Cap at h6
                const text = applyInlineFormatting(match[2]);
                result.push(`<h${level} class="font-semibold mt-3 mb-2">${text}</h${level}>`);
            }
            continue;
        }

        // Blockquotes
        if (/^>\s*(.*)$/.test(line)) {
            if (inList) { result.push(listType === 'ol' ? '</ol>' : '</ul>'); inList = false; }
            const match = line.match(/^>\s*(.*)$/);
            if (match) {
                result.push(`<blockquote>${applyInlineFormatting(match[1])}</blockquote>`);
            }
            continue;
        }

        // Ordered list (with optional indentation)
        const olMatch = line.match(/^(\s*)\d+\.\s+(.+)$/);
        if (olMatch) {
            const indent = olMatch[1].length;
            const content = olMatch[2];
            if (!inList || listType !== 'ol') {
                if (inList) result.push(listType === 'ol' ? '</ol>' : '</ul>');
                result.push('<ol>');
                inList = true;
                listType = 'ol';
                listIndent = indent;
            }
            result.push(`<li>${applyInlineFormatting(content)}</li>`);
            continue;
        }

        // Unordered list (with optional indentation - support nested lists)
        const ulMatch = line.match(/^(\s*)[-*•]\s+(.+)$/);
        if (ulMatch) {
            const indent = ulMatch[1].length;
            const content = ulMatch[2];
            if (!inList || listType !== 'ul') {
                if (inList) result.push(listType === 'ol' ? '</ol>' : '</ul>');
                result.push('<ul>');
                inList = true;
                listType = 'ul';
                listIndent = indent;
            }
            result.push(`<li>${applyInlineFormatting(content)}</li>`);
            continue;
        }

        // Close list if we hit a non-list line
        if (inList) {
            result.push(listType === 'ol' ? '</ol>' : '</ul>');
            inList = false;
        }

        // Empty lines
        if (line.trim() === '') {
            result.push('');
            continue;
        }

        // Regular paragraph with inline formatting
        const formatted = applyInlineFormatting(line);
        if (!formatted.startsWith('<h') && !formatted.startsWith('<blockquote') && !formatted.startsWith('<pre')) {
            result.push(`<p>${formatted}</p>`);
        } else {
            result.push(formatted);
        }
    }

    if (inList) result.push(listType === 'ol' ? '</ol>' : '</ul>');
    return result.join('\n');
}

export function extractAllFromAiResponse(response: string): ExtractedAiData {
    const result: ExtractedAiData = {
        images: [],
        visualConfig: {}
    };

    // Extract from visual-config block - support multiple formats
    const visualConfigMatch = response.match(/```visual-config\n([\s\S]*?)```/i) ||
        response.match(/``visual-config\n?([\s\S]*?)``/i) ||
        response.match(/<code>visual-config\n?([\s\S]*?)<\/code>/i) ||
        response.match(/visual-config\n(VIBE KEYWORDS:[\s\S]*?)(?:\n\n\n|\n```|$)/i);

    // Helper to parse values with or without brackets
    const parseListValue = (text: string): string[] => {
        return text.replace(/^\[|\]$/g, '').split(',').map(s => s.trim().replace(/["']/g, '')).filter(Boolean);
    };

    if (visualConfigMatch) {
        const configBlock = visualConfigMatch[1];

        // VIBE KEYWORDS - support both [brackets] and plain format
        const vibeMatch = configBlock.match(/VIBE\s*KEYWORDS?:\s*\[([^\]]+)\]/i) ||
            configBlock.match(/VIBE\s*KEYWORDS?:\s*([^\n]+)/i);
        if (vibeMatch) {
            result.visualConfig.vibeKeywords = parseListValue(vibeMatch[1]);
        }

        // EMOTIONAL TONE - support both formats
        const toneMatch = configBlock.match(/EMOTIONAL\s*TONE:\s*\[([^\]]+)\]/i) ||
            configBlock.match(/EMOTIONAL\s*TONE:\s*([^\n]+)/i);
        if (toneMatch) {
            result.visualConfig.emotionalTone = parseListValue(toneMatch[1]);
        }

        const paletteMatch = configBlock.match(/COLOR\s*PALETTE:\s*([^\n]+)/i);
        if (paletteMatch) {
            result.visualConfig.colorPalette = paletteMatch[1].trim();
        }

        const layoutMatch = configBlock.match(/LAYOUT(?:S?)[\s_]DETECTED:\s*([^\n]+)/i);
        if (layoutMatch) {
            result.visualConfig.layoutsDetected = parseListValue(layoutMatch[1]);
        }

        const motionPresetMatch = configBlock.match(/MOTION\s*PRESET:\s*([^\n]+)/i);
        if (motionPresetMatch) {
            result.visualConfig.motionPreset = motionPresetMatch[1].trim();
        }

        const entranceMatch = configBlock.match(/ENTRANCE:\s*([^\n]+)/i);
        if (entranceMatch) {
            result.visualConfig.entranceMotion = entranceMatch[1].trim();
        }

        const hoverMatch = configBlock.match(/HOVER:\s*([^\n]+)/i);
        if (hoverMatch) {
            result.visualConfig.hoverMotion = hoverMatch[1].trim();
        }

        const ambientMatch = configBlock.match(/AMBIENT:\s*([^\n]+)/i);
        if (ambientMatch) {
            result.visualConfig.ambientMotion = ambientMatch[1].trim();
        }
    }

    // Also try loose format parsing (not in code block)
    if (!result.visualConfig.vibeKeywords) {
        const looseVibeMatch = response.match(/VIBE\s*KEYWORDS?:\s*([^\n]+)/i);
        if (looseVibeMatch) {
            result.visualConfig.vibeKeywords = parseListValue(looseVibeMatch[1]);
        }
    }
    if (!result.visualConfig.emotionalTone) {
        const looseToneMatch = response.match(/EMOTIONAL\s*TONE:\s*([^\n]+)/i);
        if (looseToneMatch) {
            result.visualConfig.emotionalTone = parseListValue(looseToneMatch[1]);
        }
    }
    if (!result.visualConfig.colorPalette) {
        const looseColorMatch = response.match(/COLOR\s*PALETTE:\s*([^\n]+)/i);
        if (looseColorMatch) {
            result.visualConfig.colorPalette = looseColorMatch[1].trim();
        }
    }
    if (!result.visualConfig.motionPreset) {
        const looseMotionMatch = response.match(/MOTION\s*PRESET:\s*([^\n]+)/i);
        if (looseMotionMatch) {
            result.visualConfig.motionPreset = looseMotionMatch[1].trim();
        }
    }

    // Extract from image-prompts block - support multiple formats
    const imagePromptsMatch = response.match(/```image-prompts\n([\s\S]*?)```/i) ||
        response.match(/``image-prompts\n?([\s\S]*?)``/i) ||
        response.match(/<\/code><\/pre>image-prompts\n?([\s\S]*?)(?=\n\n\n|$)/i) ||
        response.match(/image-prompts\n((?:Hero|Section|Featured|Background)[^\n]*:[\s\S]*?)(?:\n\n\n|$)/i);
    if (imagePromptsMatch) {
        const promptsBlock = imagePromptsMatch[1];
        // Handle multi-line prompts
        const entries: { label: string; prompt: string }[] = [];
        let currentLabel = '';
        let currentPrompt = '';

        const lines = promptsBlock.split('\n');
        for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine) continue;

            const colonIdx = trimmedLine.indexOf(':');
            const potentialLabel = colonIdx > 0 ? trimmedLine.substring(0, colonIdx).trim() : '';

            // Check if this looks like a new label
            const isNewEntry = colonIdx > 0 && (
                /^(Hero|Section|Featured|Background|Icon|Gallery)/i.test(potentialLabel) ||
                /^\d+[.)]?\s*-?\s*(Hero|Section|Featured|Background)/i.test(potentialLabel) ||
                /^[A-Z][a-z]+\s+\d+/i.test(potentialLabel) ||
                /^[A-Z][a-z]+\s+Visual/i.test(potentialLabel)
            );

            if (isNewEntry) {
                if (currentLabel && currentPrompt) {
                    entries.push({ label: currentLabel, prompt: currentPrompt.trim() });
                }
                currentLabel = potentialLabel;
                currentPrompt = trimmedLine.substring(colonIdx + 1).trim();
            } else if (currentLabel) {
                currentPrompt += ' ' + trimmedLine;
            }
        }
        if (currentLabel && currentPrompt) {
            entries.push({ label: currentLabel, prompt: currentPrompt.trim() });
        }

        for (const { label, prompt } of entries) {
            if (prompt.length > 10) {
                if (label.toLowerCase().includes('featured')) {
                    result.featuredImage = prompt;
                } else if (label.toLowerCase().includes('hero')) {
                    result.heroImage = prompt;
                }
                result.images.push({ label, prompt });
            }
        }
    }

    // Fallback: extract individual image mentions
    const featuredRegex = /(?:Featured\s*Image|Main\s*Image)(?:\s*(?:Prompt|Description|Suggestion))?[:\s]*["']?([^"'\n]+)/gi;
    let match;
    while ((match = featuredRegex.exec(response)) !== null) {
        const prompt = match[1]?.trim().replace(/["']+$/, '').trim();
        if (prompt && prompt.length > 10) {
            if (!result.featuredImage) {
                result.featuredImage = prompt;
            }
            if (!result.images.find(i => i.prompt === prompt)) {
                result.images.push({ label: 'Featured Image', prompt });
            }
        }
    }

    const heroPatterns = [
        { regex: /(?:Hero\s*(?:Image|Visual|Background))(?:\s*(?:Prompt|Description|Suggestion))?[:\s]*["']?([^"'\n]+)/gi, type: 'hero' },
        { regex: /(?:Hero\s*background|Background\s*image)[:\s]*["']?([^"'\n]+)/gi, type: 'background' },
    ];

    for (const { regex, type } of heroPatterns) {
        let match;
        while ((match = regex.exec(response)) !== null) {
            const prompt = match[1]?.trim().replace(/["']+$/, '').trim();
            if (prompt && prompt.length > 10) {
                if (!result.heroImage) {
                    result.heroImage = prompt;
                }
                const label = type === 'hero' ? 'Hero Image' : 'Background';
                if (!result.images.find(i => i.prompt === prompt)) {
                    result.images.push({ label, prompt });
                }
            }
        }
    }

    // Extract Section images
    const sectionImageRegex = /Section\s*\d+\s*(?:Image|Visual)[:\s]*["']?([^"'\n]+)/gi;
    while ((match = sectionImageRegex.exec(response)) !== null) {
        const prompt = match[1]?.trim().replace(/["']+$/, '').trim();
        if (prompt && prompt.length > 10 && !result.images.find(i => i.prompt === prompt)) {
            result.images.push({ label: match[0].split(':')[0].trim(), prompt });
        }
    }

    // Extract Icon Set
    const iconSetMatch = response.match(/Icon\s*Set[:\s]*["']?([^"'\n]+)/i);
    if (iconSetMatch) {
        const prompt = iconSetMatch[1].trim();
        if (prompt.length > 10 && !result.images.find(i => i.prompt === prompt)) {
            result.images.push({ label: 'Icon Set', prompt });
        }
    }

    // Fallback for visual descriptions in content
    if (!result.featuredImage && !result.heroImage) {
        const dropletMatch = response.match(/(?:droplet|water\s+molecule|crystalline|mineral|ionic)[\s\w,]*(?:glowing|floating|suspended|illuminated|reflecting)[^.!?\n]*/i);
        if (dropletMatch) {
            result.heroImage = dropletMatch[0].trim();
        }
    }

    return result;
}

export function extractImagePromptsFromAiResponse(response: string): { featuredImage?: string; heroImage?: string; images: Array<{ label: string; prompt: string }> } {
    const data = extractAllFromAiResponse(response);
    return {
        featuredImage: data.featuredImage,
        heroImage: data.heroImage,
        images: data.images
    };
}

export function parseVisualConfigFromContent(content: string): { tasks: EnhancementTask[]; config: Record<string, any>; htmlBody: string } {
    const tasks: EnhancementTask[] = [];
    const config: Record<string, any> = {};
    let htmlBody = '';

    // Unescape HTML entities if content is escaped
    const unescapeHtml = (str: string) => str
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&');

    // Check if content appears to be escaped HTML
    const isEscaped = content.includes('&lt;') && content.includes('&gt;');
    const normalizedContent = isEscaped ? unescapeHtml(content) : content;

    const htmlCommentMatch = normalizedContent.match(/<!--[\s\S]*?ANDARA VISUAL CONFIG:[\s\S]*?-->/);
    const fencedMatch = normalizedContent.match(/```[\s\S]*?ANDARA VISUAL CONFIG:[\s\S]*?```/);
    const configBlock = htmlCommentMatch?.[0] || fencedMatch?.[0] || '';
    if (configBlock) {
        const afterConfig = htmlCommentMatch
            ? content.substring(content.indexOf('-->') + 3).trim()
            : fencedMatch
                ? content.substring(content.indexOf('```', content.indexOf('ANDARA VISUAL CONFIG')) + 3).trim()
                : '';
        if (afterConfig && (afterConfig.includes('<main') || afterConfig.includes('<section') || afterConfig.includes('<div'))) {
            htmlBody = afterConfig;
        }
        const pageIdMatch = configBlock.match(/pageId:\s*["']([^"']+)["']/);
        const clusterMatch = configBlock.match(/cluster:\s*["']([^"']+)["']/);
        const priorityMatch = configBlock.match(/priority:\s*["']?(P[123])["']?/);
        const vibeMatch = configBlock.match(/vibeKeywords:\s*\[([\s\S]*?)\]/);
        const emotionalMatch = configBlock.match(/emotionalTone:\s*\[([\s\S]*?)\]/);
        const animationMatch = configBlock.match(/animationIdeas:\s*\[([\s\S]*?)\]/);
        const imagePromptMatch = configBlock.match(/aiImagePromptHero:\s*["']([^"']+)["']/);
        const videoPromptMatch = configBlock.match(/aiVideoPromptHero:\s*["']([^"']+)["']/);
        const designerNotesMatch = configBlock.match(/designerNotes:\s*["']([^"']+)["']/);
        if (pageIdMatch) config.pageId = pageIdMatch[1];
        if (clusterMatch) config.cluster = clusterMatch[1];
        if (priorityMatch) config.priority = priorityMatch[1];
        if (vibeMatch) config.vibeKeywords = vibeMatch[1].split(',').map((s: string) => s.trim().replace(/["'\n]/g, '')).filter(Boolean);
        if (emotionalMatch) config.emotionalTone = emotionalMatch[1].split(',').map((s: string) => s.trim().replace(/["'\n]/g, '')).filter(Boolean);
        if (animationMatch) config.animationIdeas = animationMatch[1].split(',').map((s: string) => s.trim().replace(/["'\n]/g, '')).filter(Boolean);
        if (imagePromptMatch) config.aiImagePrompt = imagePromptMatch[1];
        if (videoPromptMatch) config.aiVideoPrompt = videoPromptMatch[1];
        if (designerNotesMatch) config.designerNotes = designerNotesMatch[1];
        if (config.pageId) tasks.push({ id: 'pageId', label: 'Page ID', description: config.pageId, field: 'key', detected: true, value: config.pageId });
        if (config.cluster) tasks.push({ id: 'cluster', label: 'Cluster', description: config.cluster, field: 'clusterKey', detected: true, value: config.cluster });
        if (config.vibeKeywords?.length) tasks.push({ id: 'vibeKeywords', label: 'Vibe Keywords', description: `${config.vibeKeywords.length} keywords detected`, field: 'vibeKeywords', detected: true, value: config.vibeKeywords });
        if (config.emotionalTone?.length) tasks.push({ id: 'emotionalTone', label: 'Emotional Tone', description: `${config.emotionalTone.length} tones detected`, field: 'emotionalTone', detected: true, value: config.emotionalTone });
        if (config.aiImagePrompt) tasks.push({ id: 'aiImagePrompt', label: 'Hero Image Prompt', description: 'AI image generation prompt detected', field: 'aiImagePrompt', detected: true, value: config.aiImagePrompt });
        if (config.aiVideoPrompt) tasks.push({ id: 'aiVideoPrompt', label: 'Hero Video Prompt', description: 'AI video generation prompt detected', field: 'aiVideoPrompt', detected: true, value: config.aiVideoPrompt });
        if (config.designerNotes) tasks.push({ id: 'designerNotes', label: 'Designer Notes', description: 'Designer notes detected', field: 'designerNotes', detected: true, value: config.designerNotes });
        if (htmlBody) tasks.push({ id: 'htmlContent', label: 'HTML Content', description: `${htmlBody.length} chars of HTML detected`, field: 'content', detected: true, value: htmlBody });
    }
    // --- Enhanced HTML Content Detection for Andara pages ---
    // Use normalizedContent (unescaped) for all pattern matching
    // Use simpler, more reliable regex patterns

    // 1. Page Title from H1 - match first h1
    const h1Match = normalizedContent.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (h1Match && !tasks.find(t => t.id === 'title')) {
        const title = h1Match[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
        if (title) {
            tasks.push({ id: 'title', label: 'Page Title', description: title.substring(0, 80), field: 'title', detected: true, value: title });
        }
    }

    // 2. SEO Description - find first paragraph after h1, or subline class, or lead class
    let seoDesc = '';
    // Try subline first
    if (normalizedContent.includes('subline') || normalizedContent.includes('lead')) {
        const sublineMatch = normalizedContent.match(/class="[^"]*(?:subline|lead)[^"]*"[^>]*>([\s\S]*?)<\/(?:p|div|span)>/i);
        if (sublineMatch) {
            seoDesc = sublineMatch[1].replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
        }
    }
    // Fallback: first <p> after hero headline
    if (!seoDesc) {
        const afterH1 = normalizedContent.split(/<\/h1>/i)[1] || '';
        const firstP = afterH1.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
        if (firstP) {
            seoDesc = firstP[1].replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
        }
    }
    if (seoDesc && seoDesc.length > 20 && !tasks.find(t => t.id === 'seoDescription')) {
        seoDesc = seoDesc.substring(0, 160);
        tasks.push({ id: 'seoDescription', label: 'SEO Description', description: seoDesc.substring(0, 60) + '...', field: 'seoDescription', detected: true, value: seoDesc });
    }

    // 3. Hero image placeholder detection
    const hasMediaPlaceholder = normalizedContent.includes('media-placeholder') || normalizedContent.includes('hero-image') || normalizedContent.includes('placeholder');
    if (hasMediaPlaceholder && !tasks.find(t => t.id === 'heroImage')) {
        tasks.push({ id: 'heroImage', label: 'Hero Image Needed', description: 'Placeholder found', field: 'heroImage', detected: true, missing: true, value: 'Generate hero image' });
    }

    // 4. Section count - count all <section> tags
    const allSections = normalizedContent.match(/<section[^>]*>/gi);
    if (allSections && allSections.length > 0 && !tasks.find(t => t.id === 'sections')) {
        tasks.push({ id: 'sections', label: 'Content Sections', description: `${allSections.length} sections`, field: 'sections', detected: true, value: String(allSections.length) });
    }

    // 5. Internal links - find href starting with /
    const internalLinkMatches = normalizedContent.match(/href="\/[^"]+"/g);
    if (internalLinkMatches && internalLinkMatches.length > 0 && !tasks.find(t => t.id === 'internalLinks')) {
        const uniqueLinks = Array.from(new Set(internalLinkMatches.map(l => l.replace(/href="|"/g, ''))));
        tasks.push({ id: 'internalLinks', label: 'Internal Links', description: `${uniqueLinks.length} links`, field: 'internalLinks', detected: true, value: uniqueLinks });
    }

    // 6. CTA buttons - anchor with cta in class
    if (normalizedContent.includes('cta')) {
        const ctaMatches = normalizedContent.match(/<a[^>]*>[^<]*<\/a>/gi) || [];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const ctaButtons = ctaMatches.filter(m => m.toLowerCase().includes('cta') || normalizedContent.substring(normalizedContent.indexOf(m) - 50, normalizedContent.indexOf(m)).includes('cta'));
        const actualCtas = normalizedContent.match(/<a[^>]+cta[^>]*>([^<]*)<\/a>/gi);
        if (actualCtas && actualCtas.length > 0 && !tasks.find(t => t.id === 'ctaButtons')) {
            const ctaTexts = actualCtas.map(m => m.replace(/<[^>]+>/g, '').trim()).filter(Boolean);
            if (ctaTexts.length > 0) {
                tasks.push({ id: 'ctaButtons', label: 'CTA Buttons', description: ctaTexts.slice(0, 2).join(', '), field: 'ctaButtons', detected: true, value: ctaTexts });
            }
        }
    }

    // 7. Key bullets/points - count li items in first ul
    const firstUl = normalizedContent.match(/<ul[^>]*>([\s\S]*?)<\/ul>/i);
    if (firstUl && !tasks.find(t => t.id === 'keyPoints')) {
        const bulletCount = (firstUl[1].match(/<li/gi) || []).length;
        if (bulletCount > 0) {
            tasks.push({ id: 'keyPoints', label: 'Key Points', description: `${bulletCount} bullet points`, field: 'keyPoints', detected: true, value: String(bulletCount) });
        }
    }

    // 8. Grid/card items - look for card or grid-item classes
    if (normalizedContent.includes('card') || normalizedContent.includes('grid')) {
        const cardMatches = normalizedContent.match(/class="[^"]*(?:card|grid-item|grid__item)[^"]*"/gi);
        if (cardMatches && cardMatches.length > 0 && !tasks.find(t => t.id === 'gridItems')) {
            tasks.push({ id: 'gridItems', label: 'Feature Cards', description: `${cardMatches.length} cards/items`, field: 'gridItems', detected: true, value: String(cardMatches.length) });
        }
    }

    // 9. H2 headings - count major content sections
    const h2Matches = normalizedContent.match(/<h2[^>]*>/gi);
    if (h2Matches && h2Matches.length > 0 && !tasks.find(t => t.id === 'headings')) {
        tasks.push({ id: 'headings', label: 'Section Headings', description: `${h2Matches.length} H2 headings`, field: 'headings', detected: true, value: String(h2Matches.length) });
    }

    // 10. Page ID from main id attribute
    const mainIdMatch = normalizedContent.match(/<main[^>]+id="([^"]+)"/i);
    if (mainIdMatch && !tasks.find(t => t.id === 'pageId')) {
        tasks.push({ id: 'pageId', label: 'Page ID', description: mainIdMatch[1], field: 'key', detected: true, value: mainIdMatch[1] });
    }

    // 11. Aria labels for accessibility
    const ariaLabelMatches = normalizedContent.match(/aria-label="[^"]+"/gi);
    if (ariaLabelMatches && ariaLabelMatches.length > 0 && !tasks.find(t => t.id === 'accessibility')) {
        tasks.push({ id: 'accessibility', label: 'Accessibility', description: `${ariaLabelMatches.length} aria-labels`, field: 'accessibility', detected: true, value: String(ariaLabelMatches.length) });
    }

    // 12. Cluster detection from page class (andara-page--science etc)
    const pageClassMatch = normalizedContent.match(/andara-page--([a-z-]+)/i) ||
        normalizedContent.match(/andara-([a-z]+)-page/i);
    if (pageClassMatch && !tasks.find(t => t.id === 'cluster')) {
        const clusterValue = pageClassMatch[1];
        tasks.push({ id: 'cluster', label: 'Content Cluster', description: clusterValue, field: 'clusterKey', detected: true, value: clusterValue.toLowerCase() });
    }

    // 13. Detect page template type from class
    const templateMatch = normalizedContent.match(/andara-page--([a-z-]+)/i);
    if (templateMatch && !tasks.find(t => t.id === 'template')) {
        tasks.push({ id: 'template', label: 'Page Template', description: templateMatch[1], field: 'template', detected: true, value: templateMatch[1] });
    }

    // 14. Generate Visual Config fields from content analysis
    // Extract key themes from h1, h2 headings for vibe keywords
    const allHeadings = normalizedContent.match(/<h[12][^>]*>([^<]+)</gi) || [];
    const headingTexts = allHeadings.map(h => h.replace(/<[^>]+>/g, '').trim().toLowerCase());
    const commonVibeWords = ['structured', 'flowing', 'crystalline', 'ionic', 'mineral', 'water', 'health', 'science', 'natural', 'pure', 'vital', 'energy', 'balance', 'terrain', 'bioelectric'];
    const detectedVibes = commonVibeWords.filter(w => headingTexts.some(h => h.includes(w)) || normalizedContent.toLowerCase().includes(w));
    if (detectedVibes.length > 0 && !tasks.find(t => t.id === 'vibeKeywords')) {
        tasks.push({ id: 'vibeKeywords', label: 'Vibe Keywords', description: detectedVibes.slice(0, 5).join(', '), field: 'vibeKeywords', detected: true, value: detectedVibes.slice(0, 5) });
    }

    // 15. Emotional tone based on content themes
    const toneMap: Record<string, string[]> = {
        'wonder': ['discover', 'explore', 'reveal', 'unlock', 'secret'],
        'clarity': ['clear', 'understand', 'simple', 'pure', 'clean'],
        'trust': ['science', 'research', 'study', 'proven', 'evidence'],
        'vitality': ['energy', 'life', 'vital', 'health', 'thrive'],
        'harmony': ['balance', 'natural', 'flow', 'connect', 'integrate']
    };
    const detectedTones: string[] = [];
    const lowerContent = normalizedContent.toLowerCase();
    Object.entries(toneMap).forEach(([tone, keywords]) => {
        if (keywords.some(k => lowerContent.includes(k))) detectedTones.push(tone);
    });
    if (detectedTones.length > 0 && !tasks.find(t => t.id === 'emotionalTone')) {
        tasks.push({ id: 'emotionalTone', label: 'Emotional Tone', description: detectedTones.join(', '), field: 'emotionalTone', detected: true, value: detectedTones });
    }

    // 16. Animation ideas based on content type
    const animationMap: Record<string, string[]> = {
        'water': ['water flow', 'ripple effects', 'wave motion'],
        'mineral': ['crystalline shimmer', 'particle float', 'glow pulse'],
        'energy': ['energy pulse', 'radiant glow', 'charge animation'],
        'science': ['diagram reveal', 'data visualization', 'molecular motion'],
        'health': ['gentle pulse', 'breathing rhythm', 'vitality glow']
    };
    const detectedAnimations: string[] = [];
    Object.entries(animationMap).forEach(([theme, anims]) => {
        if (lowerContent.includes(theme)) detectedAnimations.push(...anims.slice(0, 1));
    });
    if (detectedAnimations.length > 0 && !tasks.find(t => t.id === 'animationIdeas')) {
        tasks.push({ id: 'animationIdeas', label: 'Animation Ideas', description: detectedAnimations.slice(0, 3).join(', '), field: 'animationIdeas', detected: true, value: detectedAnimations.slice(0, 3) });
    }

    // 17. Generate AI Image Prompt from title and cluster
    const titleForPrompt = tasks.find(t => t.id === 'title')?.value;
    const clusterForPrompt = tasks.find(t => t.id === 'cluster')?.value;
    if (titleForPrompt && !tasks.find(t => t.id === 'aiImagePrompt')) {
        const imagePrompt = `Ethereal, scientific visualization of ${titleForPrompt}. Dark cosmic background with deep navy and purple gradients. Glowing ionic minerals and structured water crystals. ${clusterForPrompt ? `Theme: ${clusterForPrompt}.` : ''} Andara brand style: elegant, mystical yet scientific. High quality digital art, 16:9 aspect ratio.`;
        tasks.push({ id: 'aiImagePrompt', label: 'AI Image Prompt', description: 'Generated from title', field: 'aiImagePrompt', detected: true, value: imagePrompt });
    }

    return { tasks, config, htmlBody };
}
