import { Agent, AgentTask, AgentResult, createSuccessResult, createErrorResult } from './base';
import { executeCmsFunction } from '../services/bigmind-cms';
import { getAiClient } from '../services/andara-chat';

const SYSTEM_PROMPT = `
You are the "Sandbox Agent", a simulated AI administrator for the Andara CMS.
Your goal is to accomplish the user's task by strictly using the available CMS functions.

## Capabilities
- You can access all CMS functions defined in the 'bigmind-cms' service.
- You can plan multi-step operations.

## Protocol
1. ANALYZE the user's request.
2. CHECK if you need to use a tool.
   - If YES: Output a JSON object with { "tool": "functionName", "args": { ... }, "thought": "reasoning" }
   - If NO (task done or need info): Output a JSON object with { "final_answer": "your response", "thought": "reasoning" }
3. OBSERVE the tool output (it will be fed back to you).
4. REPEAT until the task is complete.

## Tool Usage
To call a tool, your ENTIRE response must be a valid JSON object matching this schema:
{
  "tool": "string", // Name of the function to call
  "args": "object", // Arguments for the function
  "thought": "string" // Short reasoning for why you are calling this
}

## Final Answer
When you are done, your response must be:
{
  "final_answer": "string", // The final response to the user
  "thought": "string"
}

Do not include any text outside the JSON.
`;

export class SandboxAgent implements Agent {
    name = "sandbox";
    description = "A safe environment to simulate AI agent behaviors using CMS functions.";
    capabilities = ["cms_functions", "planning", "repl"];
    icon = "🧪";
    role = "system_simulator";
    rules = ["Always format tool calls as strict JSON", "Do not hallucinate function names"];

    async execute(task: AgentTask): Promise<AgentResult> {
        const goal = task.input.goal;
        if (!goal) {
            return createErrorResult("No goal provided in task input");
        }

        const maxSteps = 10;
        let history: any[] = [
            { role: "user", parts: [{ text: `SYSTEM_PROMPT: ${SYSTEM_PROMPT}\n\nGOAL: ${goal}` }] }
        ];

        const executionLog: any[] = []; // Track detailed steps for the UI
        let step = 0;

        try {
            const { client, model } = await getAiClient();

            while (step < maxSteps) {
                step++;

                // 1. Generate Content
                const generateResult = await client.models.generateContent({
                    model: model,
                    contents: history,
                });

                const rawRes = generateResult as any;
                const responseText = typeof rawRes.text === 'function' ? rawRes.text() : rawRes.text;

                if (!responseText) {
                    throw new Error("Empty response from AI model");
                }

                // 2. Parse JSON
                let parsed: any;
                try {
                    // Try to clean markdown code blocks if present
                    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
                    parsed = JSON.parse(cleanJson);
                } catch (e) {
                    // If parsing fails, try to just output the text as final answer if it looks like one, or error
                    console.error("JSON Parse Error in Sandbox Agent:", responseText);
                    // Fail gracefully by asking for retry or returning raw text
                    parsed = { final_answer: responseText, thought: "Failed to parse JSON, returning raw text." };
                }

                // 3. Handle Tool Call or Final Answer
                if (parsed.final_answer) {
                    executionLog.push({ type: 'thought', content: parsed.thought });
                    executionLog.push({ type: 'answer', content: parsed.final_answer });

                    return createSuccessResult(
                        { message: parsed.final_answer, log: executionLog },
                        { model, steps: step }
                    );
                }

                if (parsed.tool) {
                    executionLog.push({ type: 'thought', content: parsed.thought });
                    executionLog.push({ type: 'call', tool: parsed.tool, args: parsed.args });

                    // Execute Tool
                    let toolResult;
                    try {
                        toolResult = await executeCmsFunction(parsed.tool, parsed.args || {});
                    } catch (err: any) {
                        toolResult = { error: err.message || "Tool execution failed" };
                    }

                    executionLog.push({ type: 'result', content: toolResult });

                    // Update History
                    history.push({ role: "model", parts: [{ text: responseText }] });
                    history.push({ role: "user", parts: [{ text: `TOOL_OUTPUT: ${JSON.stringify(toolResult)}` }] });
                } else {
                    // Ambiguous response
                    executionLog.push({ type: 'error', content: "Agent did not return a valid tool or final_answer." });
                    return createSuccessResult(
                        { message: "Agent loop ended ambiguously.", log: executionLog },
                        { model, steps: step }
                    );
                }
            }

            return createErrorResult("Agent exceeded maximum step limit (10).");

        } catch (error: any) {
            console.error("Sandbox Agent Error:", error);
            return createErrorResult(error.message);
        }
    }
}
