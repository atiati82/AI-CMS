
import { DocumentLoader } from './types';
import * as XLSX from 'xlsx';

export class XlsxLoader implements DocumentLoader {
    supportedMimeTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    supportedExtensions = ['.xlsx'];

    async parse(buffer: Buffer): Promise<string> {
        try {
            const workbook = XLSX.read(buffer, { type: 'buffer' });
            let text = '';
            workbook.SheetNames.forEach((sheetName: string) => {
                const sheet = workbook.Sheets[sheetName];
                text += `\n\n### Sheet: ${sheetName}\n\n`;

                const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];
                if (jsonData.length > 0) {
                    const headers = jsonData[0] || [];
                    text += '| ' + headers.map((h: any) => String(h || '')).join(' | ') + ' |\n';
                    text += '| ' + headers.map(() => '---').join(' | ') + ' |\n';
                    for (let i = 1; i < jsonData.length; i++) {
                        const row = jsonData[i];
                        const rowStr = headers.map((_, index) => String(row[index] || '')).join(' | ');
                        text += '| ' + rowStr + ' |\n';
                    }
                } else {
                    text += '(Empty Sheet)\n';
                }
            });
            return text;
        } catch (error: any) {
            throw new Error(`Failed to parse XLSX: ${error.message}`);
        }
    }
}
