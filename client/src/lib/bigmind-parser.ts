export interface ParsedBigMindResponse {
  pageMetadata: {
    urlSlug?: string;
    h1Title?: string;
    title?: string;
    metaTitle?: string;
    metaDescription?: string;
    seoFocus?: string;
    seoKeywords?: string[];
    outline?: string[];
    internalLinks?: Array<{ slug: string; anchorText: string }>;
    cluster?: string;
    zone?: number;
    template?: string;
    path?: string;
    priority?: string;
    summary?: string;
  };
  visualConfig: {
    vibeKeywords?: string[];
    emotionalTone?: string[];
    colorPalette?: string;
    layoutsDetected?: string[];
    motionPreset?: string;
    entranceMotion?: string;
    hoverMotion?: string;
    ambientMotion?: string;
  };
  motionLayoutJson?: Record<string, unknown>;
  htmlContent?: string;
  imagePrompts: Array<{
    id: string;
    slotKey: string;
    slotType: 'hero' | 'featured' | 'section' | 'icon' | 'gallery' | 'background' | 'custom';
    prompt: string;
    location: string;
  }>;
  atmosphere?: string;
}

/**
 * Decode HTML entities that AI sometimes outputs
 */
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/');
}

/**
 * Clean AI response - remove markdown code block wrappers and decode entities
 * This ensures regex patterns work correctly regardless of AI output formatting
 */
function cleanAIResponse(content: string): string {
  let cleaned = content;

  // Decode HTML entities first
  cleaned = decodeHtmlEntities(cleaned);

  // Remove wrapping ```html ... ``` if present at start/end of entire content
  cleaned = cleaned.replace(/^```(?:html|tsx|jsx)?\n?/i, '').replace(/\n?```$/i, '');

  // Fix hybrid format: ``<code class="...">blockname becomes ```blockname
  // Pattern: ``<code class="bg-muted/50 px-1 py-0.5 rounded text-sm font-mono">visual-config
  // Allow optional whitespace/newlines between tags and block name
  cleaned = cleaned.replace(/``<code[^>]*>\s*([a-z-]+)/gi, '```$1');

  // IMPORTANT: Order matters - process full <pre><code></code></pre> patterns FIRST
  // before partial patterns like </code></pre>

  // Full wrapper: <pre><code class="language-"></code></pre>blockname → ```blockname
  cleaned = cleaned.replace(/<pre>\s*<code[^>]*>\s*<\/code>\s*<\/pre>\s*([a-z-]+)/gi, '```$1');

  // Remove orphaned empty wrappers: <pre><code class="language-"></code></pre> → nothing
  cleaned = cleaned.replace(/<pre>\s*<code[^>]*>\s*<\/code>\s*<\/pre>\s*/gi, '');

  // Partial pattern (runs after full pattern): </code></pre>blockname → ```blockname
  cleaned = cleaned.replace(/<\/code>\s*<\/pre>\s*([a-z-]+)/gi, '```$1');

  // Clean orphaned opening tags that might remain
  cleaned = cleaned.replace(/<pre>\s*<code[^>]*>\s*/gi, '');

  // Fix double backtick code fences (``code`` instead of ```code```)
  cleaned = cleaned.replace(/``\s*([a-z-]+)\s*\n/gi, '```$1\n');
  cleaned = cleaned.replace(/\n``(\s*$)/gi, '\n```$1');

  // Clean up escaped entities in code blocks
  cleaned = cleaned.replace(/&amp;lt;/g, '<').replace(/&amp;gt;/g, '>');

  // Remove inline <code> tags that wrap block names (allow whitespace)
  cleaned = cleaned.replace(/<code[^>]*>\s*([a-z-]+)\s*<\/code>/gi, '$1');

  return cleaned;
}

export function parseBigMindResponse(rawContent: string): ParsedBigMindResponse {
  // Pre-process content to fix common AI output issues - use this for ALL regex operations
  const content = cleanAIResponse(rawContent);

  const result: ParsedBigMindResponse = {
    pageMetadata: {},
    visualConfig: {},
    imagePrompts: [],
  };

  // 0. Extract page-metadata block (new structured format)
  const pageMetadataMatch = content.match(/```page-metadata\n([\s\S]*?)```/);
  if (pageMetadataMatch) {
    const metaText = pageMetadataMatch[1];

    // TITLE (display title)
    const titleMatch = metaText.match(/^TITLE:\s*(.+)/im);
    if (titleMatch) {
      result.pageMetadata.title = titleMatch[1].trim();
    }

    // H1_TITLE (main headline)
    const h1Match = metaText.match(/H1_TITLE:\s*(.+)/i);
    if (h1Match) {
      result.pageMetadata.h1Title = h1Match[1].trim();
    } else if (result.pageMetadata.title) {
      result.pageMetadata.h1Title = result.pageMetadata.title;
    }

    // PATH (URL path)
    const pathMatch = metaText.match(/PATH:\s*(.+)/i);
    if (pathMatch) {
      result.pageMetadata.path = pathMatch[1].trim();
      result.pageMetadata.urlSlug = pathMatch[1].trim().replace(/^\//, '');
    }

    // SLUG (fallback)
    const slugMatchNew = metaText.match(/SLUG:\s*(.+)/i);
    if (slugMatchNew && !result.pageMetadata.urlSlug) {
      result.pageMetadata.urlSlug = slugMatchNew[1].trim();
    }

    // CLUSTER
    const clusterMatch = metaText.match(/CLUSTER:\s*(.+)/i);
    if (clusterMatch) {
      result.pageMetadata.cluster = clusterMatch[1].trim();
    }

    // SEO_TITLE
    const seoTitleMatch = metaText.match(/SEO_TITLE:\s*(.+)/i);
    if (seoTitleMatch) {
      result.pageMetadata.metaTitle = seoTitleMatch[1].trim();
    }

    // SEO_DESCRIPTION
    const seoDescMatch = metaText.match(/SEO_DESCRIPTION:\s*(.+)/i);
    if (seoDescMatch) {
      result.pageMetadata.metaDescription = seoDescMatch[1].trim();
    }

    // SEO_FOCUS (primary keyword)
    const seoFocusMatch = metaText.match(/SEO_FOCUS:\s*(.+)/i);
    if (seoFocusMatch) {
      result.pageMetadata.seoFocus = seoFocusMatch[1].trim();
    }

    // SEO_KEYWORDS
    const seoKeywordsMatch = metaText.match(/SEO_KEYWORDS:\s*(.+)/i);
    if (seoKeywordsMatch) {
      result.pageMetadata.seoKeywords = seoKeywordsMatch[1].split(',').map(k => k.trim()).filter(Boolean);
    }

    // TEMPLATE
    const templateMatch = metaText.match(/TEMPLATE:\s*(.+)/i);
    if (templateMatch) {
      result.pageMetadata.template = templateMatch[1].trim();
    }

    // PRIORITY
    const priorityMatch = metaText.match(/PRIORITY:\s*(.+)/i);
    if (priorityMatch) {
      result.pageMetadata.priority = priorityMatch[1].trim();
    }

    // SUMMARY
    const summaryMatch = metaText.match(/SUMMARY:\s*(.+)/i);
    if (summaryMatch) {
      result.pageMetadata.summary = summaryMatch[1].trim();
    }

    // ZONE (legacy)
    const zoneMatch = metaText.match(/ZONE:\s*(\d+)/i);
    if (zoneMatch) {
      result.pageMetadata.zone = parseInt(zoneMatch[1]);
    }
  }

  // 1. Extract URL slug (fallback to old format)
  if (!result.pageMetadata.urlSlug) {
    const slugMatch = content.match(/\*\*URL slug:\*\*\s*`?([^`\n]+)`?/i) ||
      content.match(/URL slug:\s*`?([^`\n]+)`?/i);
    if (slugMatch) {
      result.pageMetadata.urlSlug = slugMatch[1].trim();
    }
  }

  // 2. Extract H1 title (fallback to old format)
  if (!result.pageMetadata.h1Title) {
    const h1Match = content.match(/\*\*H1 title:\*\*\s*(.+)/i) ||
      content.match(/H1 title:\s*(.+)/i) ||
      content.match(/\*\*Page Title:\*\*\s*(.+)/i);
    if (h1Match) {
      result.pageMetadata.h1Title = h1Match[1].trim();
    }
  }

  // 3. Extract Meta title (fallback to old format)
  if (!result.pageMetadata.metaTitle) {
    const metaTitleMatch = content.match(/\*\*Meta title:\*\*\s*(.+)/i) ||
      content.match(/Meta title:\s*(.+)/i);
    if (metaTitleMatch) {
      result.pageMetadata.metaTitle = metaTitleMatch[1].trim();
    }
  }

  // 4. Extract Meta description (fallback to old format)
  if (!result.pageMetadata.metaDescription) {
    const metaDescMatch = content.match(/\*\*Meta description:\*\*\s*(.+)/i) ||
      content.match(/Meta description:\s*(.+)/i);
    if (metaDescMatch) {
      result.pageMetadata.metaDescription = metaDescMatch[1].trim();
    }
  }

  // 5. Extract SEO keywords (fallback to old format)
  if (!result.pageMetadata.seoKeywords) {
    const keywordsMatch = content.match(/\*\*(?:\d+[-–]?\d*\s*)?SEO keywords:\*\*\s*(.+)/i) ||
      content.match(/SEO keywords:\s*(.+)/i);
    if (keywordsMatch) {
      result.pageMetadata.seoKeywords = keywordsMatch[1]
        .split(/,\s*/)
        .map(k => k.trim())
        .filter(Boolean);
    }
  }

  // 6. Extract visual-config block - support multiple formats
  // Try standard markdown code fence first, then fallback to inline detection
  const visualConfigMatch = content.match(/```visual-config\n([\s\S]*?)```/) ||
    content.match(/``visual-config\n?([\s\S]*?)``/) ||
    content.match(/<code>visual-config\n?([\s\S]*?)<\/code>/) ||
    content.match(/visual-config\n(VIBE KEYWORDS:[\s\S]*?)(?:\n\n|\n```|$)/i);

  if (visualConfigMatch) {
    const configText = visualConfigMatch[1];

    // Parse VIBE KEYWORDS - support both [brackets] and plain comma-separated
    const vibeMatch = configText.match(/VIBE KEYWORDS:\s*\[([^\]]+)\]/i) ||
      configText.match(/VIBE KEYWORDS:\s*([^\n]+)/i);
    if (vibeMatch) {
      result.visualConfig.vibeKeywords = vibeMatch[1].split(',').map(s => s.trim()).filter(Boolean);
    }

    // Parse EMOTIONAL TONE - support both [brackets] and plain comma-separated
    const toneMatch = configText.match(/EMOTIONAL TONE:\s*\[([^\]]+)\]/i) ||
      configText.match(/EMOTIONAL TONE:\s*([^\n]+)/i);
    if (toneMatch) {
      result.visualConfig.emotionalTone = toneMatch[1].split(',').map(s => s.trim()).filter(Boolean);
    }

    const colorMatch = configText.match(/COLOR PALETTE:\s*([^\n]+)/i);
    if (colorMatch) {
      result.visualConfig.colorPalette = colorMatch[1].trim();
    }

    const layoutMatch = configText.match(/LAYOUT(?:S?)[\s_]DETECTED:\s*([^\n]+)/i);
    if (layoutMatch) {
      result.visualConfig.layoutsDetected = layoutMatch[1].split(',').map(s => s.trim()).filter(Boolean);
    }

    const motionMatch = configText.match(/MOTION PRESET:\s*([^\n]+)/i);
    if (motionMatch) {
      result.visualConfig.motionPreset = motionMatch[1].trim();
    }

    const entranceMatch = configText.match(/ENTRANCE:\s*([^\n]+)/i);
    if (entranceMatch) {
      result.visualConfig.entranceMotion = entranceMatch[1].trim();
    }

    const hoverMatch = configText.match(/HOVER:\s*([^\n]+)/i);
    if (hoverMatch) {
      result.visualConfig.hoverMotion = hoverMatch[1].trim();
    }

    const ambientMatch = configText.match(/AMBIENT:\s*([^\n]+)/i);
    if (ambientMatch) {
      result.visualConfig.ambientMotion = ambientMatch[1].trim();
    }
  }

  // Also try to extract visual config from loose format (not in code block)
  if (!result.visualConfig.vibeKeywords) {
    const looseVibeMatch = content.match(/VIBE KEYWORDS:\s*([^\n]+)/i);
    if (looseVibeMatch) {
      result.visualConfig.vibeKeywords = looseVibeMatch[1].replace(/^\[|\]$/g, '').split(',').map(s => s.trim()).filter(Boolean);
    }
  }
  if (!result.visualConfig.emotionalTone) {
    const looseToneMatch = content.match(/EMOTIONAL TONE:\s*([^\n]+)/i);
    if (looseToneMatch) {
      result.visualConfig.emotionalTone = looseToneMatch[1].replace(/^\[|\]$/g, '').split(',').map(s => s.trim()).filter(Boolean);
    }
  }
  if (!result.visualConfig.colorPalette) {
    const looseColorMatch = content.match(/COLOR PALETTE:\s*([^\n]+)/i);
    if (looseColorMatch) {
      result.visualConfig.colorPalette = looseColorMatch[1].trim();
    }
  }
  if (!result.visualConfig.layoutsDetected) {
    const looseLayoutMatch = content.match(/LAYOUT(?:S?)[\s_]DETECTED:\s*([^\n]+)/i);
    if (looseLayoutMatch) {
      result.visualConfig.layoutsDetected = looseLayoutMatch[1].split(',').map(s => s.trim()).filter(Boolean);
    }
  }
  if (!result.visualConfig.motionPreset) {
    const looseMotionMatch = content.match(/MOTION PRESET:\s*([^\n]+)/i);
    if (looseMotionMatch) {
      result.visualConfig.motionPreset = looseMotionMatch[1].trim();
    }
  }
  if (!result.visualConfig.entranceMotion) {
    const looseEntranceMatch = content.match(/ENTRANCE:\s*([^\n]+)/i);
    if (looseEntranceMatch) {
      result.visualConfig.entranceMotion = looseEntranceMatch[1].trim();
    }
  }

  // 6b. Extract from Roman numeral sections (III. MOTION LAYOUT STRUCTURE, IV. MOTION LAYOUT MAP)
  const romanMotionSection = content.match(/(?:III|IV|V)\.?\s*MOTION\s*LAYOUT[^\n]*\n([\s\S]*?)(?=\n(?:I{1,3}V?|V)\.?\s+[A-Z]|\n\n\n|$)/i);
  if (romanMotionSection) {
    const sectionContent = romanMotionSection[1];

    // Try to extract motion preset from section
    if (!result.visualConfig.motionPreset) {
      const presetInSection = sectionContent.match(/(?:MOTION|PRESET|ARCHETYPE):\s*([^\n,]+)/i) ||
        sectionContent.match(/(?:liquid-crystal|energetic-pulse|magnetic-drift|krystal-bloom|scalar-slide|vortex-reveal|parallax-depth|ripple-emergence|subtle-shimmer|layered-parallax)/i);
      if (presetInSection) {
        result.visualConfig.motionPreset = presetInSection[1]?.trim() || presetInSection[0].trim();
      }
    }

    // Try to extract layouts from section
    if (!result.visualConfig.layoutsDetected) {
      const layoutsInSection = sectionContent.match(/(?:LAYOUTS?|SECTIONS?):\s*([^\n]+)/i);
      if (layoutsInSection) {
        result.visualConfig.layoutsDetected = layoutsInSection[1].split(',').map(s => s.trim()).filter(Boolean);
      }
    }
  }

  // 7. Extract motion layout JSON block
  const motionJsonMatch = content.match(/```json\n([\s\S]*?"hero"[\s\S]*?)```/);
  if (motionJsonMatch) {
    try {
      result.motionLayoutJson = JSON.parse(motionJsonMatch[1]);
    } catch {
      // JSON parse failed, skip
    }
  }

  // 8. Extract HTML content - support various formats and decode entities
  const htmlMatch = content.match(/```html\n([\s\S]*?)```/) ||
    content.match(/```tsx\n([\s\S]*?)```/) ||
    content.match(/```jsx\n([\s\S]*?)```/);
  if (htmlMatch) {
    // Decode any HTML entities in the extracted content
    result.htmlContent = decodeHtmlEntities(htmlMatch[1].trim());
  } else {
    // Check if the entire content looks like HTML (starts with < after cleanup)
    const trimmed = content.trim();
    if (trimmed.startsWith('<') && (trimmed.includes('class=') || trimmed.includes('className='))) {
      result.htmlContent = trimmed;
    }
  }

  // 9. Extract image prompts from HTML comments
  if (result.htmlContent) {
    const aiPromptRegex = /<!--\s*AI LAYOUT PROMPT:\s*([^>]+)-->/gi;
    let match;
    let idx = 0;
    while ((match = aiPromptRegex.exec(result.htmlContent)) !== null) {
      idx++;
      const prompt = match[1].trim();
      const slotType = detectSlotType(prompt, idx);
      result.imagePrompts.push({
        id: `img-${idx}-${Date.now()}`,
        slotKey: `${slotType}-${idx}`,
        slotType,
        prompt,
        location: `Section ${idx}`,
      });
    }
  }

  // 10. Also extract from image-prompts code block - support multiple formats
  const imagePromptsMatch = content.match(/```image-prompts\n([\s\S]*?)```/) ||
    content.match(/``image-prompts\n?([\s\S]*?)``/) ||
    content.match(/<\/code><\/pre>image-prompts\n?([\s\S]*?)(?=\n\n\n|$)/i) ||
    content.match(/image-prompts\n((?:Hero|Section|Featured|Background|Icon)[^\n]*:[\s\S]*?)(?:\n\n\n|$)/i);
  if (imagePromptsMatch) {
    const promptsText = imagePromptsMatch[1];
    // Handle multi-line prompts where lines without : are continuations
    const entries: { label: string; prompt: string }[] = [];
    let currentLabel = '';
    let currentPrompt = '';

    const lines = promptsText.split('\n');
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) continue;

      // Check if this is a new entry (has a label with colon)
      const colonIdx = trimmedLine.indexOf(':');
      const potentialLabel = colonIdx > 0 ? trimmedLine.substring(0, colonIdx).trim() : '';

      // Detect if this looks like a new label (starts with known patterns or numbered sections)
      const isNewEntry = colonIdx > 0 && (
        /^(Hero|Section|Featured|Background|Icon|Gallery)/i.test(potentialLabel) ||
        /^\d+[.)]?\s*-?\s*(Hero|Section|Featured|Background|Icon|Gallery)/i.test(potentialLabel) ||
        /^[A-Z][a-z]+\s+\d+/i.test(potentialLabel) || // e.g., "Section 2.1"
        /^[A-Z][a-z]+\s+Visual/i.test(potentialLabel) // e.g., "Hero Visual"
      );

      if (isNewEntry) {
        // Save previous entry if exists
        if (currentLabel && currentPrompt) {
          entries.push({ label: currentLabel, prompt: currentPrompt.trim() });
        }
        currentLabel = potentialLabel;
        currentPrompt = trimmedLine.substring(colonIdx + 1).trim();
      } else if (currentLabel) {
        // This is a continuation of the previous prompt
        currentPrompt += ' ' + trimmedLine;
      }
    }
    // Save last entry
    if (currentLabel && currentPrompt) {
      entries.push({ label: currentLabel, prompt: currentPrompt.trim() });
    }

    for (const { label, prompt } of entries) {
      const slotType = detectSlotTypeFromLabel(label);
      const id = `imgblock-${result.imagePrompts.length + 1}-${Date.now()}`;

      result.imagePrompts.push({
        id,
        slotKey: label.toLowerCase().replace(/\s+/g, '-'),
        slotType,
        prompt,
        location: label,
      });
    }
  }

  // 11. Extract atmosphere description
  const atmosphereMatch = content.match(/\*\*V\.\s*SIGNATURE ANDARA ATMOSPHERE\*\*\n([\s\S]*?)(?=\n---|\n\*\*|\n```|$)/i) ||
    content.match(/SIGNATURE ANDARA ATMOSPHERE\*?\*?\n([\s\S]*?)(?=\n---|\n\*\*|\n```|$)/i);
  if (atmosphereMatch) {
    result.atmosphere = atmosphereMatch[1].trim().substring(0, 500);
  }

  return result;
}

function detectSlotType(prompt: string, index: number): ParsedBigMindResponse['imagePrompts'][0]['slotType'] {
  const lower = prompt.toLowerCase();
  if (lower.includes('hero') || index === 1) return 'hero';
  if (lower.includes('featured') || lower.includes('main image')) return 'featured';
  if (lower.includes('icon') || lower.includes('symbol')) return 'icon';
  if (lower.includes('gallery')) return 'gallery';
  if (lower.includes('background') || lower.includes('backdrop')) return 'background';
  return 'section';
}

function detectSlotTypeFromLabel(label: string): ParsedBigMindResponse['imagePrompts'][0]['slotType'] {
  const lower = label.toLowerCase();
  if (lower.includes('hero')) return 'hero';
  if (lower.includes('featured')) return 'featured';
  if (lower.includes('icon')) return 'icon';
  if (lower.includes('gallery')) return 'gallery';
  if (lower.includes('background')) return 'background';
  return 'section';
}

export function generateSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 60);
}

// --- ENHANCEMENT EXTRACTION ---
export type EnhancementType = 'title' | 'summary' | 'seo_title' | 'seo_description' | 'hero_content' | 'section_content' | 'faq' | 'cta' | 'image_prompt' | 'internal_link' | 'tag' | 'keyword' | 'cluster' | 'template' | 'path' | 'motion_preset' | 'layout' | 'entrance_motion' | 'hover_motion' | 'ambient_motion' | 'page-metadata' | 'visual-config';

export interface ParsedEnhancement {
  id: string;
  type: EnhancementType;
  fieldName?: string;
  content: string; // The suggested value
  reason?: string;
  confidence: number;
  data?: any; // For complex objects
}

export interface ExtractedEnhancements {
  enhancements: ParsedEnhancement[];
  hasApplyableContent: boolean;
}

export function extractEnhancements(rawContent: string, parsed: ParsedBigMindResponse): ExtractedEnhancements {
  // Clean the content to remove Markdown artifacts and decode HTML entities
  const content = cleanAIResponse(rawContent);
  const enhancements: ParsedEnhancement[] = [];
  let idx = 0;

  const generateId = () => `enh-${++idx}-${Date.now()}`;

  // Extract from parsed metadata
  if (parsed.pageMetadata.h1Title) {
    enhancements.push({
      id: generateId(),
      type: 'title',
      fieldName: 'title',
      content: parsed.pageMetadata.h1Title,
      reason: 'Extracted from AI-generated page title',
      confidence: 90
    });
  }

  if (parsed.pageMetadata.metaTitle) {
    enhancements.push({
      id: generateId(),
      type: 'seo_title',
      fieldName: 'seoTitle',
      content: parsed.pageMetadata.metaTitle,
      reason: 'Optimized SEO meta title',
      confidence: 85
    });
  }

  if (parsed.pageMetadata.metaDescription) {
    enhancements.push({
      id: generateId(),
      type: 'seo_description',
      fieldName: 'seoDescription',
      content: parsed.pageMetadata.metaDescription,
      reason: 'Optimized SEO meta description',
      confidence: 85
    });
  }

  if (parsed.pageMetadata.seoKeywords && parsed.pageMetadata.seoKeywords.length > 0) {
    enhancements.push({
      id: generateId(),
      type: 'keyword',
      fieldName: 'seoFocus',
      content: parsed.pageMetadata.seoKeywords[0],
      reason: 'Primary SEO focus keyword',
      confidence: 80
    });
  }

  // Extract cluster
  if (parsed.pageMetadata.cluster) {
    enhancements.push({
      id: generateId(),
      type: 'cluster',
      fieldName: 'clusterKey',
      content: parsed.pageMetadata.cluster,
      reason: 'Content cluster assignment',
      confidence: 90
    });
  }

  // Extract template
  if (parsed.pageMetadata.template) {
    enhancements.push({
      id: generateId(),
      type: 'template',
      fieldName: 'template',
      content: parsed.pageMetadata.template,
      reason: 'Page template type',
      confidence: 85
    });
  }

  // Extract path/slug
  if (parsed.pageMetadata.urlSlug) {
    enhancements.push({
      id: generateId(),
      type: 'path',
      fieldName: 'path',
      content: parsed.pageMetadata.urlSlug,
      reason: 'URL path for the page',
      confidence: 90
    });
  }

  // Extract HTML content as hero or section content
  if (parsed.htmlContent) {
    enhancements.push({
      id: generateId(),
      type: 'hero_content',
      fieldName: 'aiStartupHtml',
      content: parsed.htmlContent,
      reason: 'Full page HTML content generated by AI',
      confidence: 90
    });
  }

  // Extract visual config as enhancements
  if (parsed.visualConfig.vibeKeywords && parsed.visualConfig.vibeKeywords.length > 0) {
    enhancements.push({
      id: generateId(),
      type: 'tag' as EnhancementType,
      fieldName: 'visualConfig.vibeKeywords',
      content: JSON.stringify(parsed.visualConfig.vibeKeywords),
      reason: 'Visual vibe keywords for page design',
      confidence: 85
    });
  }

  if (parsed.visualConfig.emotionalTone && parsed.visualConfig.emotionalTone.length > 0) {
    enhancements.push({
      id: generateId(),
      type: 'tag' as EnhancementType,
      fieldName: 'visualConfig.emotionalTone',
      content: JSON.stringify(parsed.visualConfig.emotionalTone),
      reason: 'Emotional tone for page atmosphere',
      confidence: 85
    });
  }

  if (parsed.visualConfig.colorPalette) {
    enhancements.push({
      id: generateId(),
      type: 'tag' as EnhancementType,
      fieldName: 'visualConfig.colorPalette',
      content: parsed.visualConfig.colorPalette,
      reason: 'Suggested color palette',
      confidence: 85
    });
  }

  if (parsed.visualConfig.motionPreset) {
    enhancements.push({
      id: generateId(),
      type: 'motion_preset',
      fieldName: 'visualConfig.motionPreset',
      content: parsed.visualConfig.motionPreset,
      reason: 'Animation motion preset for page elements',
      confidence: 90
    });
  }

  if (parsed.visualConfig.entranceMotion) {
    enhancements.push({
      id: generateId(),
      type: 'entrance_motion',
      fieldName: 'visualConfig.entranceMotion',
      content: parsed.visualConfig.entranceMotion,
      reason: 'Entrance animation for elements',
      confidence: 85
    });
  }

  if (parsed.visualConfig.hoverMotion) {
    enhancements.push({
      id: generateId(),
      type: 'hover_motion',
      fieldName: 'visualConfig.hoverMotion',
      content: parsed.visualConfig.hoverMotion,
      reason: 'Hover animation for interactive elements',
      confidence: 85
    });
  }

  if (parsed.visualConfig.ambientMotion) {
    enhancements.push({
      id: generateId(),
      type: 'ambient_motion',
      fieldName: 'visualConfig.ambientMotion',
      content: parsed.visualConfig.ambientMotion,
      reason: 'Ambient background animation',
      confidence: 85
    });
  }

  if (parsed.visualConfig.layoutsDetected && parsed.visualConfig.layoutsDetected.length > 0) {
    enhancements.push({
      id: generateId(),
      type: 'layout',
      fieldName: 'visualConfig.layoutsDetected',
      content: JSON.stringify(parsed.visualConfig.layoutsDetected),
      reason: 'Detected layout patterns for page structure',
      confidence: 85
    });
  }

  // Extract image prompts as enhancements
  for (const imgPrompt of parsed.imagePrompts) {
    enhancements.push({
      id: generateId(),
      type: 'image_prompt',
      fieldName: imgPrompt.slotKey,
      content: imgPrompt.prompt,
      reason: `Image prompt for ${imgPrompt.location}`,
      confidence: 85
    });
  }

  // Extract internal link suggestions
  if (parsed.pageMetadata.internalLinks) {
    for (const link of parsed.pageMetadata.internalLinks) {
      enhancements.push({
        id: generateId(),
        type: 'internal_link',
        fieldName: link.slug,
        content: JSON.stringify(link),
        reason: `Internal link suggestion: "${link.anchorText}" -> ${link.slug}`,
        confidence: 75
      });
    }
  }

  // Try to extract enhancement suggestions from content patterns
  const suggestionPatterns = [
    { pattern: /\*\*Suggested Title:\*\*\s*(.+)/gi, type: 'title' as EnhancementType, field: 'title' },
    { pattern: /\*\*Suggested Summary:\*\*\s*(.+)/gi, type: 'summary' as EnhancementType, field: 'summary' },
    { pattern: /\*\*Suggested SEO Title:\*\*\s*(.+)/gi, type: 'seo_title' as EnhancementType, field: 'seoTitle' },
    { pattern: /\*\*Suggested Meta Description:\*\*\s*(.+)/gi, type: 'seo_description' as EnhancementType, field: 'seoDescription' },
    { pattern: /\*\*Recommended:\*\*\s*(.+)/gi, type: 'summary' as EnhancementType, field: 'summary' },
  ];

  for (const { pattern, type, field } of suggestionPatterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const value = match[1].trim();
      if (value && !enhancements.some(e => e.content === value)) {
        enhancements.push({
          id: generateId(),
          type: type,
          fieldName: field,
          content: value,
          reason: 'Extracted from AI suggestions',
          confidence: 70
        });
      }
    }
  }

  return {
    enhancements,
    hasApplyableContent: enhancements.length > 0
  };
}

export function hasEnhancementContent(rawContent: string): boolean {
  // Clean content first to properly detect patterns
  const content = cleanAIResponse(rawContent);
  const indicators = [
    /\*\*URL slug:\*\*/i,
    /\*\*H1 title:\*\*/i,
    /\*\*Meta title:\*\*/i,
    /\*\*Meta description:\*\*/i,
    /```html\n/,
    /```visual-config\n/,
    /``visual-config\n/,
    /<code>visual-config/,
    /visual-config\nVIBE KEYWORDS:/i,
    /VIBE KEYWORDS:/i,
    /MOTION PRESET:/i,
    /LAYOUT(?:S?)[\s_]DETECTED:/i,
    /ENTRANCE:/i,
    /HOVER:/i,
    /AMBIENT:/i,
    /\*\*Suggested/i,
    /\*\*Recommended/i,
    // Zone-based content recommendations
    /\*\*Zone\s*\d+/i,
    // Page recommendations with paths
    /\*\*[""]?[^""\*]+[""]?\*\*\s*\(`\/[^)]+`\)/,
    // Content gap recommendations
    /recommended\s*content\s*gaps?/i,
    /content\s*gaps?\s*to\s*fill/i,
    // Roman numeral sections (new format)
    /^I{1,3}V?\.\s+/m,
    /MOTION LAYOUT/i,
    /image-prompts\n/i,
    /```page-metadata\n/,
  ];
  return indicators.some(pattern => pattern.test(content));
}

// --- BIGMIND RECOMMENDATION EXTRACTION ---
export type BigmindSuggestionType =
  | 'content_gap'
  | 'visual_config'
  | 'motion_config'
  | 'internal_link'
  | 'publish_draft'
  | 'seo_improvement'
  | 'document_integration';

export interface BigmindRecommendation {
  type: BigmindSuggestionType;
  title: string;
  summary: string;
  pageKey?: string;
  payload: Record<string, any>;
}

export function extractBigmindRecommendations(rawContent: string): BigmindRecommendation[] {
  // Clean content first
  const content = cleanAIResponse(rawContent);
  const recommendations: BigmindRecommendation[] = [];

  // Extract content gap recommendations - multiple patterns
  // Pattern 1: Standard content gaps format
  const contentGapPattern = /(?:Content\s*Gaps?|Missing\s*Pages?|Pages?\s*to\s*Create|recommended\s*content\s*gaps?).*?(?:\n\s*[-*]\s*(.+?)(?:\n|$))+/gi;
  let match = contentGapPattern.exec(content);
  if (match) {
    const gapSection = match[0];
    const bulletPoints = gapSection.match(/[-*]\s*(.+)/g) || [];
    for (const bullet of bulletPoints) {
      const text = bullet.replace(/^[-*]\s*/, '').trim();
      if (text.length > 5) {
        recommendations.push({
          type: 'content_gap',
          title: `Create: ${text.substring(0, 60)}${text.length > 60 ? '...' : ''}`,
          summary: text,
          payload: { suggestedTitle: text }
        });
      }
    }
  }

  // Pattern 2: Zone-based recommendations (Zone 1, Zone 2, Zone 3)
  const zonePattern = /\*\*Zone\s*\d+[^*]*\*\*:?[\s\S]*?(?=\*\*Zone|\n\n\n|These are|Let me know|$)/gi;
  let zoneMatch;
  while ((zoneMatch = zonePattern.exec(content)) !== null) {
    const zoneSection = zoneMatch[0];
    // Extract page recommendations with paths like (`/science/ez-water`)
    const pagePattern = /\*\*[""]?([^""\*]+)[""]?\*\*\s*\(`([^)]+)`\)/g;
    let pageMatch;
    while ((pageMatch = pagePattern.exec(zoneSection)) !== null) {
      const title = pageMatch[1].trim();
      const path = pageMatch[2].trim();
      recommendations.push({
        type: 'content_gap',
        title: `Create: ${title}`,
        summary: `Page "${title}" at ${path}`,
        pageKey: path,
        payload: { suggestedTitle: title, suggestedPath: path }
      });
    }
  }

  // Pattern 3: Bullet lists with page titles and paths
  const bulletPagePattern = /[-*]\s*\*\*[""]?([^""\*]+)[""]?\*\*\s*\(`([^)]+)`\)/g;
  while ((match = bulletPagePattern.exec(content)) !== null) {
    const title = match[1].trim();
    const path = match[2].trim();
    // Avoid duplicates
    if (!recommendations.some(r => r.pageKey === path)) {
      recommendations.push({
        type: 'content_gap',
        title: `Create: ${title}`,
        summary: `Page "${title}" at ${path}`,
        pageKey: path,
        payload: { suggestedTitle: title, suggestedPath: path }
      });
    }
  }

  // Extract visual config recommendations (JSON blocks)
  const visualConfigPattern = /```json\n([\s\S]*?(?:hero|entrance|motion|animation)[\s\S]*?)```/gi;
  while ((match = visualConfigPattern.exec(content)) !== null) {
    try {
      const jsonContent = match[1];
      const config = JSON.parse(jsonContent);
      const sectionName = Object.keys(config)[0] || 'visual';
      recommendations.push({
        type: 'visual_config',
        title: `Visual Config: ${sectionName}`,
        summary: `Motion/visual configuration for ${sectionName}`,
        payload: config
      });
    } catch {
      // Not valid JSON, skip
    }
  }

  // Extract internal link suggestions
  const linkPattern = /\*\*(?:Internal\s*)?Link(?:ing|s)?\s*Suggestion[s]?:\*\*[\s\S]*?(?:\n\s*[-*]\s*(.+?)(?:\n|$))+/gi;
  match = linkPattern.exec(content);
  if (match) {
    const linkSection = match[0];
    const bulletPoints = linkSection.match(/[-*]\s*(.+)/g) || [];
    for (const bullet of bulletPoints) {
      const text = bullet.replace(/^[-*]\s*/, '').trim();
      const pathMatch = text.match(/["'`]?\/([^"'`\s]+)["'`]?/);
      if (pathMatch) {
        recommendations.push({
          type: 'internal_link',
          title: `Link to: /${pathMatch[1]}`,
          summary: text,
          payload: { targetPath: `/${pathMatch[1]}`, context: text }
        });
      }
    }
  }

  // Extract "Recommendation" bullet points
  const recPattern = /\*\*(?:Recommendation|Action|Suggested\s*Enhancement)s?:\*\*[\s\S]*?(?:\n\s*[-*\d.]+\s*(.+?)(?:\n|$))+/gi;
  while ((match = recPattern.exec(content)) !== null) {
    const recSection = match[0];
    const bullets = recSection.match(/(?:[-*]|\d+[.)]+)\s+(.+)/g) || [];
    for (const bullet of bullets) {
      const text = bullet.replace(/^(?:[-*]|\d+[.)]+)\s+/, '').trim();
      if (text.length > 10 && !recommendations.some(r => r.summary === text)) {
        const type = detectRecommendationType(text);
        recommendations.push({
          type,
          title: text.substring(0, 60) + (text.length > 60 ? '...' : ''),
          summary: text,
          payload: { rawText: text }
        });
      }
    }
  }

  // Extract draft publishing recommendations
  const draftPattern = /(?:draft|unpublished|pending)\s*(?:pages?|content).*?(?:publish|review)/gi;
  if (draftPattern.test(content)) {
    const draftMatch = content.match(/["'`]([^"'`]+)["'`]\s*(?:is|are)?\s*(?:draft|unpublished)/gi);
    if (draftMatch) {
      for (const d of draftMatch) {
        const nameMatch = d.match(/["'`]([^"'`]+)["'`]/);
        if (nameMatch) {
          recommendations.push({
            type: 'publish_draft',
            title: `Publish: ${nameMatch[1]}`,
            summary: `Consider publishing the draft page "${nameMatch[1]}"`,
            payload: { pageTitle: nameMatch[1] }
          });
        }
      }
    }
  }

  return recommendations;
}

function detectRecommendationType(text: string): BigmindSuggestionType {
  const lower = text.toLowerCase();
  if (lower.includes('content gap') || lower.includes('missing page') || lower.includes('create page')) {
    return 'content_gap';
  }
  if (lower.includes('visual') || lower.includes('motion') || lower.includes('animation')) {
    return 'motion_config';
  }
  if (lower.includes('internal link') || lower.includes('linking')) {
    return 'internal_link';
  }
  if (lower.includes('seo') || lower.includes('meta') || lower.includes('keyword')) {
    return 'seo_improvement';
  }
  if (lower.includes('document') || lower.includes('library')) {
    return 'document_integration';
  }
  if (lower.includes('publish') || lower.includes('draft')) {
    return 'publish_draft';
  }
  return 'seo_improvement'; // default
}

export function hasBigmindRecommendations(content: string): boolean {
  const indicators = [
    /\*\*(?:Recommendation|Action|Suggested Enhancement)s?:\*\*/i,
    /Content\s*Gaps?|Missing\s*Pages?/i,
    /Internal\s*Link(?:ing)?\s*Suggestion/i,
    /Visual\s*(?:&|and)?\s*Motion\s*Enhancement/i,
    /```json\n[\s\S]*?(?:hero|motion|animation)/i,
    /draft\s*pages?\s*(?:to\s*)?publish/i,
    // Zone-based content recommendations
    /\*\*Zone\s*\d+/i,
    // Page recommendations with paths
    /\*\*[""]?[^""\*]+[""]?\*\*\s*\(`\/[^)]+`\)/,
    // Content gap recommendations
    /recommended\s*content\s*gaps?/i,
    /findContentGaps/i,
    // Critical pages / fill recommendations
    /critical\s*pages?\s*(?:that\s*are\s*)?missing/i,
    /pages?\s*to\s*fill/i,
  ];
  return indicators.some(pattern => pattern.test(content));
}
