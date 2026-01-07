export class GeneratePageTool {
    async generate(prompt: string) {
        return {
            success: true,
            path: '/generated/new-page',
            html: '<div>Generated Content</div>'
        };
    }
}

export const generatePageTool = new GeneratePageTool();
