import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParseModule = require("pdf-parse");
const PDFParse = pdfParseModule.PDFParse || pdfParseModule.default || pdfParseModule;

export interface PdfParseResult {
  success: true;
  text: string;
  pageCount: number;
}

export interface PdfParseError {
  success: false;
  error: string;
  hint: string;
  details?: string;
}

export type PdfResult = PdfParseResult | PdfParseError;

export async function parsePdfBuffer(buffer: Buffer, filename: string): Promise<PdfResult> {
  console.log(`Parsing PDF: ${filename}, size: ${buffer.length} bytes`);
  
  const pdfHeader = buffer.slice(0, 8).toString('ascii');
  console.log(`PDF header: ${pdfHeader}`);
  
  if (!pdfHeader.startsWith('%PDF')) {
    return {
      success: false,
      error: "This file doesn't appear to be a valid PDF.",
      hint: "The file might have been renamed or corrupted. Try re-exporting it from the original source."
    };
  }
  
  try {
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    const text = result.text || '';
    console.log(`PDF parsed: ${text.length} chars, ${result.total} pages`);
    await parser.destroy();
    
    if (!text.trim()) {
      return {
        success: false,
        error: "This PDF contains no extractable text. It may be a scanned document or image-based PDF.",
        hint: "Try copying the text from your PDF into a .txt file and upload that instead."
      };
    }
    
    return { success: true, text, pageCount: result.total };
  } catch (error: any) {
    console.error('PDF parsing error:', error?.message);
    const errorMsg = error?.message?.toLowerCase() || '';
    
    if (errorMsg.includes('password') || errorMsg.includes('encrypt')) {
      return {
        success: false,
        error: "This PDF is password-protected or encrypted.",
        hint: "Try opening the PDF and printing to a new PDF without password protection."
      };
    }
    if (errorMsg.includes('invalid') || errorMsg.includes('corrupt') || errorMsg.includes('malformed')) {
      return {
        success: false,
        error: "This PDF appears to be corrupted or uses an unsupported format.",
        hint: "Try opening the PDF in Adobe Reader and re-saving it, or copy the text to a .txt file."
      };
    }
    if (errorMsg.includes('stream') || errorMsg.includes('xref') || errorMsg.includes('trailer')) {
      return {
        success: false,
        error: "This PDF has internal structure issues that prevent reading.",
        hint: "Try printing the PDF to a new PDF file, or copy the text into a .txt file."
      };
    }
    
    return {
      success: false,
      error: "Unable to read this PDF. It may use advanced features not yet supported.",
      hint: "Try: 1) Copy/paste text into a .txt file, 2) Print to new PDF, 3) Use different export format.",
      details: error?.message
    };
  }
}
