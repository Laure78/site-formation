/**
 * Helpers PDFKit — programmes Qualiopi OFC (A4).
 */
import PDFDocument from 'pdfkit';

export const PDF_BLUE = '#377CF3';
export const PDF_MARGIN = 50;
export const PDF_PAGE_BOTTOM = 780;

export function ensureSpace(doc: PDFKit.PDFDocument, y: number, needed = 40): number {
  if (y + needed > PDF_PAGE_BOTTOM) {
    doc.addPage();
    return PDF_MARGIN + 10;
  }
  return y;
}

export function sectionTitle(doc: PDFKit.PDFDocument, title: string, y: number): number {
  y = ensureSpace(doc, y, 36);
  doc.fillColor(PDF_BLUE).font('Helvetica-Bold').fontSize(12).text(title, PDF_MARGIN, y);
  return doc.y + 8;
}

export function bodyText(doc: PDFKit.PDFDocument, text: string, y: number): number {
  y = ensureSpace(doc, y, 24);
  doc.fillColor('#0F172A').font('Helvetica').fontSize(10).text(text, PDF_MARGIN, y, {
    width: 495,
    align: 'justify',
  });
  return doc.y + 6;
}

export function bulletList(doc: PDFKit.PDFDocument, items: readonly string[], y: number): number {
  for (const item of items) {
    y = ensureSpace(doc, y, 20);
    doc.fillColor('#0F172A').font('Helvetica').fontSize(10).text(`• ${item}`, PDF_MARGIN + 8, y, {
      width: 487,
    });
    y = doc.y + 4;
  }
  return y + 4;
}

export function writeProgrammePdfHeader(
  doc: PDFKit.PDFDocument,
  title: string,
  metaLine: string,
): number {
  let y = PDF_MARGIN;
  doc.fillColor(PDF_BLUE).font('Helvetica-Bold').fontSize(16).text('OFC Création d’Entreprise', PDF_MARGIN, y);
  y = doc.y + 4;
  doc
    .font('Helvetica')
    .fontSize(9)
    .fillColor('#64748B')
    .text('Organisme de formation certifié Qualiopi — actions de formation', PDF_MARGIN, y);
  y = doc.y + 16;
  doc.fillColor('#0F172A').font('Helvetica-Bold').fontSize(14).text(title, PDF_MARGIN, y, { width: 495 });
  y = doc.y + 6;
  doc.font('Helvetica').fontSize(10).fillColor('#475569').text(metaLine, PDF_MARGIN, y);
  return doc.y + 14;
}
