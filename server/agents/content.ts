import { Agent, AgentTask, AgentResult, createSuccessResult, createErrorResult } from './base';
import { contentAgentBriefing } from './briefings';
import { getAiClient, getToolConfig } from '../services/andara-chat';
import { cmsTools } from './tools/cms';
import { memoryTools } from './tools/memory';
import {
    classifyIntent,
    getZoneContext,
    validateOutput,
    sanitizeOutput,
    ContentZone
} from '../services/content-firewall';
import { logAgentAction } from '../services/audit';
import crypto from 'crypto';

/**
 * CONTENT AGENT - WITH AI + CONTENT FIREWALL INTEGRATION
 * 
 * Uses official briefing from briefings.ts and integrates with Gemini AI.
 * All content passes through the 3-zone firewall for compliance.
 */
export const contentAgent: Agent = {
    name: contentAgentBriefing.name,
    description: contentAgentBriefing.role,
    capabilities: contentAgentBriefing.capabilities,
    icon: contentAgentBriefing.icon,
    role: contentAgentBriefing.role,
    rules: contentAgentBriefing.rules,

    async execute(task: AgentTask): Promise<AgentResult> {
        try {
            switch (task.type) {
                case 'generate_content':
                    return await generateContent(task.input);
                case 'expand_content':
                    return await expandContent(task.input);
                case 'rewrite_content':
                    return await rewriteContent(task.input);
                case 'summarize':
                    return await summarize(task.input);
                case 'extract_keywords':
                    return await extractKeywords(task.input);
                case 'compliance_check':
                    return await complianceCheck(task.input);
                case 'create_page_workflow':
                    return await createPageWorkflow(task.input);
                default:
                    return createErrorResult(`Unknown task type: ${task.type}`);
            }
        } catch (error: any) {
            return createErrorResult(error.message || 'Content agent failed');
        }
    }
};

// Generate content using AI
async function generateContent(input: any): Promise<AgentResult> {
    const { topic, tone = 'educational', length = 'medium', zone: explicitZone } = input;

    const lengthGuide: Record<string, string> = {
        short: '200-300 words',
        medium: '500-800 words',
        long: '1000-1500 words'
    };

    // Classify zone for compliance
    const zone: ContentZone = explicitZone || classifyIntent(topic);
    const zoneContext = getZoneContext(zone);

    const prompt = `${contentAgentBriefing.systemPrompt}

---

CONTENT ZONE: ${zoneContext.name} (Zone ${zoneContext.zoneNumber})
Zone Guidelines: ${zoneContext.languageRules.toneGuidance}

Generate content about: ${topic}

Requirements:
- Tone: ${tone}
- Length: ${lengthGuide[length] || '500-800 words'}
- Use clear headings and structure
- Include internal linking opportunities
- Follow Andara Ionic Firewall compliance rules
- Avoid these verbs: ${zoneContext.languageRules.forbiddenVerbs.slice(0, 5).join(', ')}

Output the content in structured markdown format.`;

    try {
        const { client, model } = await getAiClient();
        const response = await client.models.generateContent({
            model,
            contents: [{ role: 'user', parts: [{ text: prompt }] }]
        });

        let content = response.text?.trim() || '';

        // Validate and sanitize
        const validation = validateOutput(content, zone);
        if (!validation.isValid) {
            content = sanitizeOutput(content, zone);
        }

        return createSuccessResult(
            {
                content,
                topic,
                tone,
                length,
                zone,
                zoneName: zoneContext.name,
                wasSanitized: !validation.isValid,
                warnings: validation.violations
            },
            { model, inputTokens: response.usageMetadata?.promptTokenCount, outputTokens: response.usageMetadata?.candidatesTokenCount }
        );
    } catch (error: any) {
        return createErrorResult(`AI generation failed: ${error.message}`);
    }
}

// Expand short content into full article
async function expandContent(input: any): Promise<AgentResult> {
    const { shortInput, targetLength = 500 } = input;

    const prompt = `${contentAgentBriefing.systemPrompt}

---

Expand this brief input into a complete, well-structured section:

"${shortInput}"

Requirements:
- Target length: approximately ${targetLength} words
- Maintain the core message
- Add supporting details, context, and explanations
- Use Andara voice: scientific but accessible
- Follow compliance guidelines (no health claims)

Output in structured markdown.`;

    try {
        const { client, model } = await getAiClient();
        const response = await client.models.generateContent({
            model,
            contents: [{ role: 'user', parts: [{ text: prompt }] }]
        });

        const expanded = response.text?.trim() || '';

        return createSuccessResult(
            { expanded, originalLength: shortInput.length, targetLength },
            { model }
        );
    } catch (error: any) {
        return createErrorResult(`Content expansion failed: ${error.message}`);
    }
}

// Rewrite content with specified style
async function rewriteContent(input: any): Promise<AgentResult> {
    const { content, style = 'compliant' } = input;

    const styleGuides: Record<string, string> = {
        compliant: 'Make compliant with Andara Ionic Firewall - remove any health claims, use structure-function language only',
        scientific: 'Make more scientific and precise, add proper terminology',
        accessible: 'Simplify complex terms while maintaining accuracy',
        premium: 'Elevate the language to match premium brand voice'
    };

    const prompt = `${contentAgentBriefing.systemPrompt}

---

Rewrite this content with style: ${style}

Style instruction: ${styleGuides[style] || styleGuides.compliant}

Original content:
"""
${content}
"""

Output the rewritten content, maintaining the same structure but applying the style changes.`;

    try {
        const { client, model } = await getAiClient();
        const response = await client.models.generateContent({
            model,
            contents: [{ role: 'user', parts: [{ text: prompt }] }]
        });

        const rewritten = response.text?.trim() || '';

        return createSuccessResult({ rewritten, style }, { model });
    } catch (error: any) {
        return createErrorResult(`Content rewrite failed: ${error.message}`);
    }
}

// Summarize content
async function summarize(input: any): Promise<AgentResult> {
    const { text, length = 200 } = input;

    const prompt = `${contentAgentBriefing.systemPrompt}

---

Summarize this content in approximately ${length} characters:

"""
${text}
"""

Requirements:
- Capture the key points
- Maintain Andara voice
- Make it suitable for meta descriptions or previews`;

    try {
        const { client, model } = await getAiClient();
        const response = await client.models.generateContent({
            model,
            contents: [{ role: 'user', parts: [{ text: prompt }] }]
        });

        const summary = response.text?.trim() || '';

        return createSuccessResult({ summary, originalLength: text.length }, { model });
    } catch (error: any) {
        // Fallback to simple extraction if AI fails
        const summary = text.substring(0, length) + '...';
        return createSuccessResult({ summary, originalLength: text.length, fallback: true });
    }
}

// Extract keywords using AI
async function extractKeywords(input: any): Promise<AgentResult> {
    const { text } = input;

    const prompt = `Analyze this content and extract SEO-relevant keywords:

"""
${text}
"""

Return a JSON object with:
{
  "primary": "main keyword phrase",
  "secondary": ["related", "keywords"],
  "longTail": ["long tail phrase 1", "long tail phrase 2"],
  "clusters": ["mineral_science", "water_science"]
}`;

    try {
        const { client, model } = await getAiClient();
        const response = await client.models.generateContent({
            model,
            contents: [{ role: 'user', parts: [{ text: prompt }] }]
        });

        const responseText = response.text?.trim() || '{}';
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        const keywords = jsonMatch ? JSON.parse(jsonMatch[0]) : { primary: '', secondary: [], longTail: [], clusters: [] };

        return createSuccessResult({ keywords }, { model });
    } catch (error: any) {
        // Fallback to simple keyword extraction
        const words = text.toLowerCase().match(/\b\w{4,}\b/g) || [];
        const frequency: Record<string, number> = {};
        words.forEach((word: string) => {
            frequency[word] = (frequency[word] || 0) + 1;
        });
        const keywords = Object.entries(frequency)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([word]) => word);

        return createSuccessResult({ keywords: { secondary: keywords }, fallback: true });
    }
}

// Check content for compliance
async function complianceCheck(input: any): Promise<AgentResult> {
    const { content, zone: explicitZone } = input;

    const zone: ContentZone = explicitZone || classifyIntent(content);
    const zoneContext = getZoneContext(zone);

    const prompt = `${contentAgentBriefing.systemPrompt}

---

COMPLIANCE ZONE: ${zoneContext.name} (Zone ${zoneContext.zoneNumber})

Review this content for compliance with Andara Ionic Firewall rules:

"""
${content}
"""

Check for:
1. Unsupported health claims (cure, treat, prevent disease)
2. Exaggerated marketing language
3. Missing context or mechanism explanations
4. Structure-function language violations
5. Forbidden verbs: ${zoneContext.languageRules.forbiddenVerbs.join(', ')}

Return a JSON object:
{
  "compliant": boolean,
  "issues": [
    { "text": "problematic text", "issue": "description", "suggestion": "compliant alternative" }
  ],
  "score": 0-100,
  "summary": "brief compliance summary"
}`;

    try {
        const { client, model } = await getAiClient();
        const response = await client.models.generateContent({
            model,
            contents: [{ role: 'user', parts: [{ text: prompt }] }]
        });

        const responseText = response.text?.trim() || '{}';
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        const result = jsonMatch ? JSON.parse(jsonMatch[0]) : { compliant: true, issues: [], score: 100 };

        return createSuccessResult({ ...result, zone, zoneName: zoneContext.name }, { model });
    } catch (error: any) {
        // Fallback to rule-based validation
        const validation = validateOutput(content, zone);
        return createSuccessResult({
            compliant: validation.isValid,
            issues: validation.violations.map(v => ({ text: v, issue: 'Rule violation', suggestion: 'Review manually' })),
            score: validation.isValid ? 100 : 50,
            zone,
            fallback: true
        });
    }
}

// Autonomous Page Creation Workflow
async function createPageWorkflow(input: any): Promise<AgentResult> {
    const { topic, context = '' } = input;

    // Combine tools: Memory for research, CMS for action
    const tools = [...cmsTools, ...memoryTools];
    const toolConfig = getToolConfig(tools);

    const prompt = `${contentAgentBriefing.systemPrompt}

GOAL: Create a new page about "${topic}".

Context Provided: ${context}

Plan and execute the following steps:
1. RESEARCH: Use search_knowledge_base to find facts, policies, and related content.
2. DRAFT: Write the content in markdown (following strict compliance rules).
3. CREATE: Use create_page tool to save the page to the CMS.

COMPLIANCE REMINDER:
- No health claims (cure, treat, prevent).
- Use "support", "assist", "promote" instead.
- Focus on water structure and mineral properties.

IMPORTANT:
- Determine the best 'cluster_key' (e.g., mineral_science, product_guide).
- Use a clean 'slug' (e.g., /science/topic-name).
- Creating the page is the FINAL step.
    Display your thinking process before calling tools.`;

    const runId = crypto.randomUUID();
    console.log(`[ContentAgent] Starting run ${runId}`);

    try {
        const { client, model } = await getAiClient();

        // Initialize chat tracking
        let chatHistory: any[] = [{ role: 'user', parts: [{ text: prompt }] }];
        let finalResult = '';
        let pageCreated = false;

        // Thinking Loop (Max 10 turns for complex research + writing)
        for (let turn = 0; turn < 10; turn++) {
            console.log(`[ContentAgent] 🧠 Thinking Turn ${turn + 1}...`);

            const response = await client.models.generateContent({
                model,
                contents: chatHistory,
                config: { tools: toolConfig as any }
            });

            const part = response.candidates?.[0]?.content?.parts?.[0];
            if (!part) throw new Error('No content in AI response');

            // Log raw AI response/thought
            if (part.text) {
                await logAgentAction(runId, 'ContentAgent', 'thinking', part.text, { turn });
            }

            // Handle Tool Calls
            if (part.functionCall) {
                const call = part.functionCall;
                console.log(`[ContentAgent] 🛠️ Tool Call: ${call.name} `, call.args);

                await logAgentAction(runId, 'ContentAgent', 'tool_use', `Calling tool: ${call.name} `, {
                    tool: call.name,
                    args: call.args,
                    turn
                });

                const tool = tools.find(t => t.name === call.name);
                let toolResult = "Error: Tool not found";

                if (tool) {
                    try {
                        toolResult = await tool.execute(call.args);
                        if (call.name === 'create_page') {
                            pageCreated = true;
                            finalResult = toolResult;
                        }
                    } catch (err: any) {
                        toolResult = `Tool execution failed: ${err.message} `;
                    }
                }

                chatHistory.push({ role: 'model', parts: [part] });
                chatHistory.push({
                    role: 'function',
                    parts: [{
                        functionResponse: {
                            name: call.name,
                            response: { result: toolResult }
                        }
                    }]
                });
                continue; // Loop again
            }

            // Handle Text Output (Thinking or Final)
            if (part.text) {
                console.log(`[ContentAgent] 🗣️ Thought: ${part.text.substring(0, 100)}...`);
                chatHistory.push({ role: 'model', parts: [part] });
                // If page created and agent says "Done", break? 
                // We rely on create_page tool usage to signal success, but agent might talk after.
                if (pageCreated) break;
            }
        }

        if (pageCreated) {
            return createSuccessResult({
                success: true,
                message: 'Page created successfully via autonomous workflow.',
                details: finalResult,
                topic
            }, { model });
        } else {
            return createSuccessResult({
                success: false,
                message: 'Workflow completed but no page was created.',
                chatHistoryLength: chatHistory.length
            }, { model });
        }

    } catch (error: any) {
        return createErrorResult(`Create page workflow failed: ${error.message} `);
    }
}
