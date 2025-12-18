
/**
 * Interface definition for Agent Tools
 * Compatible with Gemini Function Calling Schema
 */

export interface ToolParameter {
    type: 'STRING' | 'INTEGER' | 'BOOLEAN' | 'NUMBER' | 'OBJECT' | 'ARRAY';
    description?: string;
    properties?: Record<string, ToolParameter>;
    required?: string[];
    items?: ToolParameter;
}

export interface Tool {
    name: string;
    description: string;
    parameters: {
        type: 'OBJECT';
        properties: Record<string, ToolParameter>;
        required?: string[];
    };
    execute: (args: any) => Promise<any>;
}
