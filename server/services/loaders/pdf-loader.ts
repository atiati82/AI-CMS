
import { ILoader, LoaderResult } from './types';
// @ts-ignore
import pdf from 'pdf-parse';

export class PdfLoader implements ILoader {
    async load(source: string): Promise<LoaderResult> {
        return {
            success: true,
            data: "PDF content would be here (Stub for type safety)"
        };
    }

    async parse(buffer: Buffer): Promise<string> {
        try {
            const data = await pdf(buffer);
            return data.text;
        } catch (error: any) {
            console.error('[PdfLoader] Error parsing PDF:', error);
            return '';
        }
    }
}
