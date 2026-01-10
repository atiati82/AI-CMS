
import { ILoader, LoaderResult } from './types';
import * as XLSX from 'xlsx';

export class XlsxLoader implements ILoader {
    async load(source: string): Promise<LoaderResult> {
        try {
            return {
                success: true,
                data: "XLSX content would be here (Stub for type safety)"
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async parse(buffer: Buffer): Promise<string> {
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        let text = '';
        workbook.SheetNames.forEach((sheetName: string) => {
            const sheet = workbook.Sheets[sheetName];
            text += XLSX.utils.sheet_to_txt(sheet) + '\n';
        });
        return text;
    }
}
