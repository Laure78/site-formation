declare module 'pdfkit' {
  import type { Readable } from 'stream';

  interface PDFDocumentOptions {
    size?: string | [number, number];
    margin?: number;
  }

  class PDFDocument extends Readable {
    constructor(options?: PDFDocumentOptions);
    fillColor(color: string): this;
    font(name: string): this;
    fontSize(size: number): this;
    text(text: string, x?: number, y?: number, options?: Record<string, unknown>): this;
    addPage(): this;
    end(): void;
    readonly y: number;
  }

  export default PDFDocument;
}
