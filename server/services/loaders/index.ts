import { XlsxLoader } from "./xlsx-loader";
import { PdfLoader } from "./pdf-loader";
import { ILoader } from "./types";

export const loaders = {
    xlsx: new XlsxLoader(),
    pdf: new PdfLoader()
};

export const loaderRegistry = {
    ...loaders,
    getLoaderForFile(mimeType: string, filename: string): ILoader | null {
        const ext = filename.split('.').pop()?.toLowerCase();
        if (ext === 'xlsx' || ext === 'xls') return loaders.xlsx;
        if (ext === 'pdf') return loaders.pdf;
        if (mimeType === 'application/pdf') return loaders.pdf;
        if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) return loaders.xlsx;
        return null;
    }
};

export default loaders;
