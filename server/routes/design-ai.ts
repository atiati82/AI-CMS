import { Router } from 'express';
import { requireAdmin } from './middleware/auth';
import { designAgent } from '../agents/design';
import { visualInterpreterAgent } from '../agents/visual-interpreter';
import { generateImage } from '../services/image-generator';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = Router();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.AI_INTEGRATIONS_GEMINI_API_KEY || '');

/**
 * Design AI API Routes
 * Provides visual design analysis and AI-powered suggestions for in-page editing
 * Uses Gemini for intelligent responses and integrates with image generation
 */

interface SelectionContext {
    selector?: string;
    tagName?: string;
    outerHTML?: string;
    rect?: { x: number; y: number; width: number; height: number };
    computed?: Record<string, string>;
    pageUrl?: string;
    elements?: Array<{
        tagName: string;
        className: string;
        id: string;
        textContent: string;
        outerHTML: string;
        computedStyles: Record<string, string>;
    }>;
}

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

// Andara Design System Context
const ANDARA_DESIGN_SYSTEM = `
You are Andara's Design AI, an expert in the Andara Ionic 1.0 design system.

## Design Philosophy
- Future-Organic: Technology that feels alive and natural
- Liquid-Crystal: Glass morphism with crystalline precision
- High-Vibrational: Subtle energy, refined luxury

## Color Palette (Dark Mode Primary)
- Background: #0a0a0f, #0f172a, #020617
- Gold Accent: --andara-gradient-gold = linear-gradient(135deg, #c0963b, #f2c76c, #fdf8d0)
- Text: #f8fafc (primary), #94a3b8 (secondary)
- Glass borders: rgba(226, 184, 94, 0.15) to rgba(226, 184, 94, 0.3)
- Glow effects: rgba(242, 199, 108, 0.15)

## CSS Utility Classes
- .andara-glass-card - Frosted glass card with gold border
- .andara-glass-header - Premium header with depth
- .andara-gradient-gold - Gold text gradient
- .andara-shadow-gold - Subtle gold glow

## Motion Presets (import from @/lib/motion)
- fadeUp, fadeIn, fadeLeft, fadeRight - Scroll reveal animations
- hover.lift, hover.liftStrong - Hover interactions
- ambient.float, ambient.shimmer - Subtle ambient motion
- stagger.container, stagger.item - List animations

## Typography
- Headlines: 'Surrounding' font, letter-spacing -0.02em
- Body: 'Inter' or system sans-serif
- Accents: Gold gradient text for emphasis

## Image Generation Guidelines
When asked to generate images/backgrounds, use these style keywords:
- "Crystalline water science visualization"
- "Organic fractal patterns in deep blue and gold"
- "Ethereal water droplets with golden light"
- "Primordial mineral formations, scientific visualization"
- "High-end product photography, dark marble background"
- No text overlays, no watermarks, premium aesthetic
`;

// POST /api/design-ai/analyze - Analyze selected elements
router.post('/analyze', requireAdmin, async (req, res) => {
    try {
        const { html, styles, context } = req.body;

        if (!html) {
            return res.status(400).json({ error: 'HTML content is required' });
        }

        // Use the visual interpreter to analyze the design
        const interpretation = await visualInterpreterAgent.execute({
            id: `analyze-${Date.now()}`,
            type: 'describe_component',
            input: {
                html,
                styles,
                context: context || 'Analyze this UI element and describe its design characteristics',
            },
        });

        // Use design agent for specific recommendations
        const styleResult = await designAgent.execute({
            id: `style-${Date.now()}`,
            type: 'suggest_visual_style',
            input: {
                topic: context || 'general',
                mood: 'professional',
            },
        });

        res.json({
            success: true,
            interpretation: interpretation.output,
            styleRecommendations: styleResult.output,
            elements: extractElementInfo(html),
        });
    } catch (error) {
        console.error('[Design AI] Analyze error:', error);
        res.status(500).json({ error: 'Failed to analyze design' });
    }
});

// POST /api/design-ai/suggest - Get design improvement suggestions
router.post('/suggest', requireAdmin, async (req, res) => {
    try {
        const { userPrompt, selectionContext } = req.body;

        if (!userPrompt) {
            return res.status(400).json({ error: 'User prompt is required' });
        }

        // Generate suggestions using fallback response
        const result = await generateFallbackResponse(userPrompt, '');

        res.json({
            success: true,
            suggestions: result.suggestions,
        });
    } catch (error) {
        console.error('[Design AI] Suggest error:', error);
        res.status(500).json({ error: 'Failed to generate suggestions' });
    }
});

// POST /api/design-ai/save-styles - Save visual editor styles to database
router.post('/save-styles', requireAdmin, async (req, res) => {
    try {
        const { pageUrl, styles } = req.body as {
            pageUrl: string;
            styles: Array<{ selector: string; styles: Record<string, string> }>;
        };

        if (!pageUrl || !styles || styles.length === 0) {
            return res.status(400).json({ error: 'pageUrl and styles are required' });
        }

        console.log('[Design AI] Saving styles for:', pageUrl);
        console.log('[Design AI] Styles count:', styles.length);

        // Normalize path - ensure leading slash
        const normalizedPath = pageUrl.startsWith('/') ? pageUrl : `/${pageUrl}`;

        // Use db to update metadata
        const { db } = await import('../db');

        // Get existing page by path
        const page = await db.query.pages.findFirst({
            where: (pages, { eq }) => eq(pages.path, normalizedPath),
        });

        if (!page) {
            // Store in memory/fallback for non-database pages
            console.log('[Design AI] Page not found in DB for path:', normalizedPath);
            return res.json({
                success: true,
                message: 'Styles saved (in-memory for this session)',
                savedCount: styles.length
            });
        }

        // Merge styles into metadata.styleOverrides
        const existingMetadata: Record<string, any> = (page.metadata as any) || {};
        const overrides: Record<string, Record<string, string>> = existingMetadata.styleOverrides || {};

        // Add/update each style
        styles.forEach(({ selector, styles: cssStyles }) => {
            overrides[selector] = { ...overrides[selector], ...cssStyles };
        });

        // Update the page
        const { pages } = await import('@shared/schema');
        const { eq } = await import('drizzle-orm');

        await db.update(pages)
            .set({
                metadata: { ...existingMetadata, styleOverrides: overrides },
                updatedAt: new Date(),
            })
            .where(eq(pages.id, page.id));

        console.log('[Design AI] Saved styles to page:', page.id);

        res.json({
            success: true,
            message: `Saved ${styles.length} style(s) to page "${page.title}"`,
            savedCount: styles.length
        });
    } catch (error: any) {
        console.error('[Design AI] Save styles error:', error);
        res.status(500).json({ error: error.message || 'Failed to save styles' });
    }
});

// GET /api/design-ai/load-styles - Load saved styles for a page
router.get('/load-styles', requireAdmin, async (req, res) => {
    try {
        const { pageUrl } = req.query as { pageUrl?: string };

        if (!pageUrl) {
            return res.status(400).json({ error: 'pageUrl is required' });
        }

        console.log('[Design AI] Loading styles for:', pageUrl);

        // Normalize path
        const normalizedPath = pageUrl.startsWith('/') ? pageUrl : `/${pageUrl}`;

        const { db } = await import('../db');

        const page = await db.query.pages.findFirst({
            where: (pages, { eq }) => eq(pages.path, normalizedPath),
        });

        if (!page) {
            return res.json({ success: true, styles: [] });
        }

        const metadata: Record<string, any> = (page.metadata as any) || {};
        const styleOverrides = metadata.styleOverrides || {};

        // Convert to array format
        const styles = Object.entries(styleOverrides).map(([selector, cssStyles]) => ({
            selector,
            styles: cssStyles as Record<string, string>,
        }));

        console.log('[Design AI] Loaded', styles.length, 'style overrides');

        res.json({
            success: true,
            styles,
            pageTitle: page.title,
        });
    } catch (error: any) {
        console.error('[Design AI] Load styles error:', error);
        res.status(500).json({ error: error.message || 'Failed to load styles' });
    }
});

// POST /api/design-ai/chat - Chat with design AI
router.post('/chat', requireAdmin, async (req, res) => {
    try {
        const { messages, selectionContext, instruction } = req.body as {
            messages: ChatMessage[];
            selectionContext?: SelectionContext;
            instruction?: string;
        };

        if (!messages || messages.length === 0) {
            return res.status(400).json({ error: 'Messages are required' });
        }

        const lastUserMessage = messages.filter(m => m.role === 'user').pop();
        if (!lastUserMessage) {
            return res.status(400).json({ error: 'No user message found' });
        }

        const userRequest = instruction || lastUserMessage.content;

        // Detect if this is a section/component generation request
        const isSectionRequest = detectSectionGenerationRequest(userRequest);

        if (isSectionRequest) {
            // Handle section/component generation with Gemini 2.5 Pro
            const sectionResult = await handleSectionGeneration(userRequest, selectionContext);
            return res.json(sectionResult);
        }

        // Detect if this is a redesign/layout request
        const isRedesignRequest = detectRedesignRequest(userRequest);

        if (isRedesignRequest && selectionContext) {
            // Handle comprehensive redesign
            const redesignResult = await handleRedesign(userRequest, selectionContext);
            return res.json(redesignResult);
        }

        // Detect if this is an image generation request
        const isImageRequest = detectImageGenerationRequest(userRequest);

        if (isImageRequest) {
            // Handle image generation
            const imageResult = await handleImageGeneration(userRequest, selectionContext);
            return res.json(imageResult);
        }

        // Build selection context for AI
        const selectionInfo = buildSelectionInfo(selectionContext);

        // Use Gemini for intelligent design suggestions
        const aiResponse = await generateAIDesignResponse(userRequest, selectionInfo, messages);

        res.json({
            success: true,
            response: aiResponse.message,
            suggestions: aiResponse.suggestions,
        });
    } catch (error) {
        console.error('[Design AI] Chat error:', error);
        res.status(500).json({ error: 'Failed to process chat message' });
    }
});

// Detect section/component generation requests
function detectSectionGenerationRequest(text: string): boolean {
    const lowerText = text.toLowerCase();

    const sectionKeywords = [
        'create section', 'design section', 'make section', 'build section',
        'create cards', 'design cards', 'make cards', 'with cards',
        'generate section', 'new section', 'add section',
        'create a section', 'design a section', 'make a section',
        'create component', 'design component', 'build component'
    ];

    return sectionKeywords.some(kw => lowerText.includes(kw));
}

// Handle section/component generation with Gemini 2.5 Pro
async function handleSectionGeneration(
    userRequest: string,
    selectionContext?: SelectionContext
): Promise<{ success: boolean; response: string; suggestions: any[]; html?: string }> {
    try {
        console.log('[Design AI] Generating section with Gemini 2.5 Pro:', userRequest);

        const model = genAI.getGenerativeModel({ model: 'gemini-3-pro' });

        const prompt = `${ANDARA_DESIGN_SYSTEM}

You are a React/JSX component generator. Generate a modern, premium section component based on this request:

"${userRequest}"

Requirements:
- Use the Andara design system CSS classes: andara-glass-card, glass-card, gradient-gold
- Use inline styles with the Andara color palette: #0a0f1a, #0f172a, #1e293b, #e2b85e (gold)
- Create responsive cards using CSS Grid (grid-cols-3)
- Include hover effects and subtle animations
- Dark theme compatible

Return ONLY the HTML/JSX code, no explanations. Use proper React className syntax.
The HTML should be complete and ready to insert into a React component.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const generatedHtml = response.text();

        // Clean up the response
        const cleanHtml = generatedHtml
            .replace(/```jsx?/g, '')
            .replace(/```html?/g, '')
            .replace(/```/g, '')
            .trim();

        console.log('[Design AI] Generated section HTML:', cleanHtml.slice(0, 200) + '...');

        return {
            success: true,
            response: `🎨 **I've designed a new section for you!**\n\nHere's the component code you can copy:\n\n\`\`\`jsx\n${cleanHtml}\n\`\`\`\n\nCopy this code to your React component, or let me generate an image for the cards!`,
            suggestions: [{
                type: 'section',
                title: '📋 Copy Section Code',
                description: 'Copy the generated React component code',
                code: cleanHtml,
            }, {
                type: 'image',
                title: '🎨 Generate Card Images',
                description: 'Generate background images for the cards',
                cssChanges: {},
            }],
            html: cleanHtml,
        };
    } catch (error: any) {
        console.error('[Design AI] Section generation error:', error);
        return {
            success: false,
            response: `Failed to generate section: ${error.message}`,
            suggestions: [],
        };
    }
}

// Detect redesign/layout requests
function detectRedesignRequest(text: string): boolean {
    const lowerText = text.toLowerCase();

    // Keywords indicating a comprehensive redesign request
    const redesignKeywords = [
        'redesign', 'restyle', 'revamp', 'makeover', 'redo',
        'whole layout', 'entire layout', 'this layout',
        'whole box', 'entire box', 'this box',
        'whole section', 'entire section', 'this section',
        'understand the content', 'understand first'
    ];

    return redesignKeywords.some(kw => lowerText.includes(kw));
}

// Handle comprehensive redesign requests
async function handleRedesign(
    userRequest: string,
    selectionContext: SelectionContext
): Promise<{ success: boolean; response: string; suggestions: any[]; redesign?: any }> {
    // Analyze the selected element
    const tagName = selectionContext.tagName || 'element';
    const rect = selectionContext.rect;
    const computed = selectionContext.computed;
    const classes = computed?._classes || '';

    // Determine element type and current styling
    const isCard = classes.includes('card') || classes.includes('box') || (rect?.width && rect.width < 500);
    const isHero = classes.includes('hero') || classes.includes('header') || (rect?.width && rect.width > 800);
    const isSection = tagName.toLowerCase() === 'section' || classes.includes('section');

    // Get current styles for comparison
    const currentBg = computed?.background || computed?.backgroundColor || 'transparent';
    const currentBorder = computed?.border || 'none';
    const currentRadius = computed?.borderRadius || '0';

    // Generate comprehensive redesign suggestions
    const suggestions: any[] = [];

    // Suggestion 1: Premium Glass Morphism
    suggestions.push({
        type: 'redesign',
        title: '✨ Premium Glass Morphism',
        description: 'Frosted glass effect with gold accent border and subtle glow',
        preview: {
            currentStyles: { background: currentBg, border: currentBorder, borderRadius: currentRadius },
            newStyles: {
                background: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(226, 184, 94, 0.2)',
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
            },
        },
        cssChanges: {
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(226, 184, 94, 0.2)',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
            padding: '24px',
        },
    });

    // Suggestion 2: Deep Ocean Theme
    suggestions.push({
        type: 'redesign',
        title: '🌊 Deep Ocean Theme',
        description: 'Deep blue gradient with cyan accents, perfect for water science content',
        preview: {
            currentStyles: { background: currentBg },
            newStyles: {
                background: 'linear-gradient(135deg, rgba(6, 78, 131, 0.9), rgba(15, 23, 42, 0.95))',
                border: '1px solid rgba(56, 189, 248, 0.3)',
            },
        },
        cssChanges: {
            background: 'linear-gradient(135deg, rgba(6, 78, 131, 0.9), rgba(15, 23, 42, 0.95))',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '16px',
            boxShadow: '0 0 40px rgba(56, 189, 248, 0.15)',
            padding: '24px',
        },
    });

    // Suggestion 3: Gold Luxury
    suggestions.push({
        type: 'redesign',
        title: '🏆 Gold Luxury',
        description: 'Premium dark background with gold gradient border',
        preview: {
            currentStyles: { background: currentBg },
            newStyles: {
                background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95), rgba(10, 15, 26, 0.98))',
                border: '1px solid',
                borderImageSource: 'linear-gradient(135deg, #c0963b, #f2c76c, #c0963b)',
            },
        },
        cssChanges: {
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95), rgba(10, 15, 26, 0.98))',
            border: '1px solid rgba(226, 184, 94, 0.4)',
            borderRadius: '16px',
            boxShadow: '0 0 50px rgba(242, 199, 108, 0.1)',
            padding: '24px',
        },
    });

    const elementDesc = isCard ? 'card' : isHero ? 'hero section' : isSection ? 'section' : tagName;

    return {
        success: true,
        response: `🎨 **Redesign Proposals for your ${elementDesc}**\n\nI've analyzed the current styling and prepared 3 premium redesign options. Each shows the before/after comparison. Click **Apply** to apply any style instantly!`,
        suggestions,
        redesign: {
            elementType: elementDesc,
            currentStyles: { background: currentBg, border: currentBorder, borderRadius: currentRadius },
        },
    };
}

// Detect image generation requests
function detectImageGenerationRequest(text: string): boolean {
    const lowerText = text.toLowerCase();

    // Direct patterns: "generate [any words] image/background"
    const hasGenerateImage = /\b(generat|creat|make|render|draw)\w*\s+.{0,50}(image|background|picture|visual|photo)/i.test(text);

    // "new background" / "new image" patterns
    const hasNewImageRequest = /\b(new|another|one\s+more)\s+.{0,30}(image|background|picture|design)/i.test(text);

    // "design me" / "design a" patterns
    const designPattern = /\bdesign\s+(me\s+)?(a\s+)?(new\s+)?.{0,20}(image|background|header)?/i.test(text);

    // Contains explicit "nano banana" or "gemini" reference for image gen
    const mentionsNanoBanana = lowerText.includes('nano banana') || lowerText.includes('googlee') || lowerText.includes('gemini');

    // Contains both "generate/create" AND "image/background" somewhere in text
    const hasGenerateKeyword = /\b(generat|creat|make|design)\w*\b/i.test(text);
    const hasImageKeyword = /\b(image|background|picture|photo|visual)\b/i.test(text);
    const hasLooseMatch = hasGenerateKeyword && hasImageKeyword;

    return hasGenerateImage || hasNewImageRequest || (designPattern && mentionsNanoBanana) || hasLooseMatch;
}

// Handle image generation requests
async function handleImageGeneration(
    userRequest: string,
    selectionContext?: SelectionContext
): Promise<{ success: boolean; response: string; suggestions: any[]; imageUrl?: string }> {
    try {
        // Build Andara-style image prompt
        const enhancedPrompt = buildImagePrompt(userRequest, selectionContext);

        console.log('[Design AI] Generating image with prompt:', enhancedPrompt);

        const result = await generateImage(enhancedPrompt);

        if (result.success && result.publicUrl) {
            return {
                success: true,
                response: `✨ I've generated a new background image for you!\n\nTo apply it, use this CSS:\n\n\`\`\`css\nbackground-image: url('${result.publicUrl}');\nbackground-size: cover;\nbackground-position: center;\n\`\`\`\n\nOr set it as an inline style on your element.`,
                suggestions: [{
                    type: 'image',
                    title: 'Generated Background',
                    description: 'Apply this generated image as background',
                    cssChanges: {
                        backgroundImage: `url('${result.publicUrl}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    },
                    preview: result.publicUrl,
                }],
                imageUrl: result.publicUrl,
            };
        } else {
            return {
                success: false,
                response: `I couldn't generate the image. ${result.error || 'Please try again with a more specific description.'}`,
                suggestions: [],
            };
        }
    } catch (error: any) {
        console.error('[Design AI] Image generation error:', error);
        return {
            success: false,
            response: `Image generation failed: ${error.message}`,
            suggestions: [],
        };
    }
}

// Build Andara-style image prompt using selection context
function buildImagePrompt(userRequest: string, selectionContext?: SelectionContext): string {
    const lowerRequest = userRequest.toLowerCase();
    let styleModifiers: string[] = [];
    let sizeHint = '';
    let elementContext = '';
    let contentThemes: string[] = [];

    // Use selection context for sizing and element type
    if (selectionContext) {
        const rect = selectionContext.rect;
        const tag = selectionContext.tagName?.toLowerCase();

        // Extract text content from outerHTML for context
        if (selectionContext.outerHTML) {
            // Strip HTML tags to get text
            const textContent = selectionContext.outerHTML
                .replace(/<[^>]*>/g, ' ')
                .replace(/\s+/g, ' ')
                .trim()
                .slice(0, 500); // Limit for prompt size

            console.log('[Design AI] Element text content:', textContent.slice(0, 100));

            // Analyze content for themes
            const lowerContent = textContent.toLowerCase();

            if (lowerContent.includes('water') || lowerContent.includes('hydration') || lowerContent.includes('liquid')) {
                contentThemes.push('water science visualization');
                contentThemes.push('crystalline droplets and flowing water');
            }
            if (lowerContent.includes('mineral') || lowerContent.includes('ionic') || lowerContent.includes('sulfate')) {
                contentThemes.push('primordial mineral formations');
                contentThemes.push('ionic crystal structures');
            }
            if (lowerContent.includes('science') || lowerContent.includes('library') || lowerContent.includes('research')) {
                contentThemes.push('scientific research background');
                contentThemes.push('laboratory aesthetic with soft blue lighting');
            }
            if (lowerContent.includes('ez water') || lowerContent.includes('exclusion zone') || lowerContent.includes('fourth phase')) {
                contentThemes.push('structured water H3O2 visualization');
                contentThemes.push('hexagonal water molecule patterns');
            }
            if (lowerContent.includes('bioelectric') || lowerContent.includes('energy') || lowerContent.includes('potential')) {
                contentThemes.push('bioelectric field visualization');
                contentThemes.push('subtle energy aura effects');
            }

            if (contentThemes.length > 0) {
                elementContext = `Context from element: "${textContent.slice(0, 80)}..."`;
            }
        }

        // Determine element type and appropriate image style
        if (rect) {
            const width = rect.width || 200;
            const height = rect.height || 200;
            const aspectRatio = width / height;

            if (aspectRatio > 2) {
                sizeHint = 'wide banner format, horizontal composition';
            } else if (aspectRatio < 0.5) {
                sizeHint = 'tall vertical format, portrait composition';
            } else if (width < 150 && height < 150) {
                sizeHint = 'small icon or thumbnail, centered simple design';
                elementContext = 'Small element - create a simple, centered icon-like image';
            } else if (width > 800) {
                sizeHint = 'full-width hero image, cinematic composition';
            } else {
                sizeHint = 'card-sized image, balanced square composition';
            }
        }

        // Add element-specific context
        if (tag === 'div' && selectionContext.computed?._classes) {
            const classes = selectionContext.computed._classes.toLowerCase();
            if (classes.includes('card') || classes.includes('box')) {
                styleModifiers.push('Card/box element - create a subtle background that works with overlaid content');
            }
            if (classes.includes('hero') || classes.includes('header')) {
                styleModifiers.push('Hero/header section - create an impactful, atmospheric background');
            }
        }
    }

    // Add content-derived themes first (most specific)
    if (contentThemes.length > 0) {
        styleModifiers = [...contentThemes, ...styleModifiers];
    } else {
        // Fall back to detecting themes from user request
        if (lowerRequest.includes('plant') || lowerRequest.includes('green') || lowerRequest.includes('organic')) {
            styleModifiers.push('organic plant patterns, green gradients');
            styleModifiers.push('bio-luminescent foliage aesthetic');
        } else if (lowerRequest.includes('ocean') || lowerRequest.includes('water') || lowerRequest.includes('liquid')) {
            styleModifiers.push('crystalline water science visualization');
            styleModifiers.push('deep blue and cyan hues with golden light accents');
        } else if (lowerRequest.includes('mineral') || lowerRequest.includes('earth') || lowerRequest.includes('rock')) {
            styleModifiers.push('primordial mineral formations');
            styleModifiers.push('earthy brown and gold tones');
        } else if (lowerRequest.includes('gold') || lowerRequest.includes('luxury')) {
            styleModifiers.push('luxurious dark background with gold accents');
            styleModifiers.push('high-end product photography aesthetic');
        } else {
            styleModifiers.push('premium dark background with subtle depth');
            styleModifiers.push('modern minimal aesthetic');
        }
    }

    // Add sizing and context hints
    if (sizeHint) {
        styleModifiers.push(sizeHint);
    }
    if (elementContext) {
        styleModifiers.push(elementContext);
    }

    // Add Andara aesthetic defaults
    styleModifiers.push('no text overlays, no watermarks');
    styleModifiers.push('dark mode compatible (#0a0f1a to #0f172a)');
    styleModifiers.push('premium scientific or product visualization');

    const finalPrompt = `${userRequest}. Style: ${styleModifiers.join('. ')}`;
    console.log('[Design AI] Final image prompt:', finalPrompt.slice(0, 200));

    return finalPrompt;
}

// Build selection info for context
function buildSelectionInfo(selection?: SelectionContext): string {
    if (!selection) return '';

    const parts: string[] = [];

    if (selection.tagName) {
        parts.push(`Selected element: <${selection.tagName}>`);
    }
    if (selection.selector) {
        parts.push(`Selector: ${selection.selector}`);
    }
    if (selection.computed) {
        const styles = selection.computed;
        if (styles.background || styles.backgroundColor) {
            parts.push(`Current background: ${styles.background || styles.backgroundColor}`);
        }
        if (styles.color) {
            parts.push(`Text color: ${styles.color}`);
        }
        if (styles._classes) {
            parts.push(`Design classes: ${styles._classes}`);
        }
    }

    return parts.join('\n');
}

// Generate AI design response using Gemini
async function generateAIDesignResponse(
    userMessage: string,
    selectionInfo: string,
    messages: ChatMessage[]
): Promise<{ message: string; suggestions: any[] }> {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-3-pro' });

        const systemContext = `${ANDARA_DESIGN_SYSTEM}

USER'S SELECTED ELEMENT:
${selectionInfo || 'No specific element selected'}

Provide specific, actionable design suggestions. Include CSS changes when relevant.
Format suggestions as actionable items with CSS code snippets.`;

        // Build conversation history
        const conversationHistory = messages.slice(-6).map(m =>
            `${m.role.toUpperCase()}: ${m.content}`
        ).join('\n\n');

        const prompt = `${systemContext}

CONVERSATION:
${conversationHistory}

Respond as a helpful design expert. Be concise but specific. Suggest exact CSS values and motion presets from the Andara system.`;

        const result = await model.generateContent(prompt);
        const aiMessage = result.response.text();

        // Extract suggestions from AI response
        const suggestions = extractSuggestionsFromResponse(aiMessage, userMessage);

        return {
            message: aiMessage,
            suggestions,
        };
    } catch (error) {
        console.error('[Design AI] Gemini error:', error);
        // Fallback to rule-based suggestions
        return await generateFallbackResponse(userMessage, selectionInfo);
    }
}

// Extract actionable suggestions from AI response
function extractSuggestionsFromResponse(aiResponse: string, userMessage: string): any[] {
    const suggestions: any[] = [];

    // Look for CSS code blocks
    const cssMatches = aiResponse.match(/```css([\s\S]*?)```/gi);
    if (cssMatches) {
        cssMatches.forEach((match, i) => {
            const css = match.replace(/```css|```/gi, '').trim();
            suggestions.push({
                type: 'css',
                title: `CSS Changes ${i + 1}`,
                description: 'Apply these CSS styles',
                cssCode: css,
            });
        });
    }

    // Look for specific class mentions
    const classMatches = aiResponse.match(/\.andara-[\w-]+|\.glass-[\w-]+/gi);
    if (classMatches) {
        const uniqueClasses = Array.from(new Set(classMatches));
        uniqueClasses.slice(0, 3).forEach(cls => {
            suggestions.push({
                type: 'class',
                title: `Add class: ${cls}`,
                description: 'Add this utility class to your element',
                className: cls.replace('.', ''),
            });
        });
    }

    // Look for motion preset mentions
    const motionMatches = aiResponse.match(/\b(fadeUp|fadeIn|hover\.lift|ambient\.float|stagger\.\w+)\b/gi);
    if (motionMatches) {
        const uniqueMotion = Array.from(new Set(motionMatches));
        uniqueMotion.slice(0, 2).forEach(preset => {
            suggestions.push({
                type: 'motion',
                title: `Motion: ${preset}`,
                description: `Apply ${preset} animation preset`,
                motionPreset: preset,
            });
        });
    }

    return suggestions;
}

// Fallback response when AI fails
async function generateFallbackResponse(
    userMessage: string,
    selectionInfo: string
): Promise<{ message: string; suggestions: any[] }> {
    const suggestions: any[] = [];
    const lowerMessage = userMessage.toLowerCase();

    // Premium/luxury
    if (lowerMessage.includes('premium') || lowerMessage.includes('luxury') || lowerMessage.includes('gold')) {
        return {
            message: "To achieve a premium feel, I recommend applying the Andara gold gradient system. Use `.andara-gradient-gold` for text accents and add subtle gold border glows with `border: 1px solid rgba(226, 184, 94, 0.2)`.",
            suggestions: [{
                type: 'style',
                title: 'Premium Gold Effect',
                description: 'Apply Andara gold gradient styling',
                cssChanges: {
                    background: 'linear-gradient(135deg, #c0963b, #f2c76c, #fdf8d0)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 30px rgba(242, 199, 108, 0.3)',
                },
            }],
        };
    }

    // Motion/animation
    if (lowerMessage.includes('motion') || lowerMessage.includes('animation') || lowerMessage.includes('animate')) {
        return {
            message: "For motion, import presets from `@/lib/motion`. Use `fadeUp` for scroll reveals, `hover.lift` for interactive cards, or `ambient.float` for subtle ambient movement.",
            suggestions: [{
                type: 'motion',
                title: 'Scroll Reveal Animation',
                description: 'Add fadeUp entrance animation',
                motionPreset: 'fadeUp',
                code: `import { motion, fadeUp } from "@/lib/motion";\n<motion.div {...fadeUp}>Content</motion.div>`,
            }],
        };
    }

    // Transparency adjustments - IMPORTANT: understand the semantics
    // "less transparency" = more opaque = HIGHER alpha (0.9, 0.95)
    // "more transparency" = more see-through = LOWER alpha (0.5, 0.4)
    if (lowerMessage.includes('transparency') || lowerMessage.includes('transparent') || lowerMessage.includes('opaque') || lowerMessage.includes('solid')) {
        const wantsLessTransparency = lowerMessage.includes('less transp') ||
            lowerMessage.includes('reduce transp') ||
            lowerMessage.includes('more opaque') ||
            lowerMessage.includes('more solid') ||
            lowerMessage.includes('solid');
        const wantsMoreTransparency = lowerMessage.includes('more transp') ||
            lowerMessage.includes('increase transp') ||
            lowerMessage.includes('see through') ||
            lowerMessage.includes('see-through');

        if (wantsLessTransparency) {
            return {
                message: "Making the background more opaque (less see-through). Using a higher alpha value for less transparency.",
                suggestions: [{
                    type: 'style',
                    title: 'Less Transparency (More Solid)',
                    description: 'More opaque background with alpha 0.95',
                    cssChanges: {
                        background: 'rgba(15, 23, 42, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(226, 184, 94, 0.15)',
                        borderRadius: '16px',
                    },
                }],
            };
        } else if (wantsMoreTransparency) {
            return {
                message: "Making the background more transparent (more see-through). Using a lower alpha value for more transparency.",
                suggestions: [{
                    type: 'style',
                    title: 'More Transparency (See-Through)',
                    description: 'More transparent background with alpha 0.4',
                    cssChanges: {
                        background: 'rgba(15, 23, 42, 0.4)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(226, 184, 94, 0.15)',
                        borderRadius: '16px',
                    },
                }],
            };
        }
    }

    // Glass/morphism
    if (lowerMessage.includes('glass') || lowerMessage.includes('blur') || lowerMessage.includes('frosted')) {
        return {
            message: "For glass morphism, use the `.andara-glass-card` class or apply these styles manually: frosted background with blur, subtle border, and depth shadow.",
            suggestions: [{
                type: 'style',
                title: 'Glass Card Effect',
                description: 'Apply Andara glass morphism',
                cssChanges: {
                    background: 'rgba(15, 23, 42, 0.8)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(226, 184, 94, 0.15)',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                },
            }],
        };
    }

    // Default
    return {
        message: `Based on your request, here are my design recommendations following the Andara design system. You can ask about: premium styling, motion/animation, glass effects, typography, spacing, or colors.`,
        suggestions: [{
            type: 'general',
            title: 'Quick Upgrade',
            description: 'Apply Andara glass styling for immediate improvement',
            cssChanges: {
                background: 'rgba(15, 23, 42, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(226, 184, 94, 0.15)',
                borderRadius: '16px',
            },
        }],
    };
}

// Helper: Extract element information from HTML
function extractElementInfo(html: string): any[] {
    const elements: any[] = [];
    const tagMatch = html.match(/<(\w+)[^>]*>/);

    if (tagMatch) {
        elements.push({
            tag: tagMatch[1],
            hasClasses: html.includes('class='),
            hasId: html.includes('id='),
        });
    }

    return elements;
}

export default router;
