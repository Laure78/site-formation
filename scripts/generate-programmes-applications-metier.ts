/**
 * Génère les PDF programmes Qualiopi — parcours applications métier BTP (NIV-06 à NIV-08).
 * Usage : npx tsx scripts/generate-programmes-applications-metier.ts
 */
import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { getFormationByCode } from '@/data/formations';
import { getInfosPratiquesForCatalogue } from '@/lib/infos-pratiques-catalogue';
import {
  getApplicationMetierNiveauByRef,
} from '@/lib/parcours-applications-metier-btp-content';
import { QUALIOPI_LEGAL } from '@/lib/qualiopi-info';
import { SCHEMA_CONTACT, SCHEMA_GEO } from '@/lib/schema-constants';

const BLUE = '#377CF3';
const MARGIN = 50;
const PAGE_BOTTOM = 780;

type Ref = 'NIV-06' | 'NIV-07' | 'NIV-08';

function ensureSpace(doc: PDFKit.PDFDocument, y: number, needed = 40): number {
  if (y + needed > PAGE_BOTTOM) {
    doc.addPage();
    return MARGIN + 10;
  }
  return y;
}

function sectionTitle(doc: PDFKit.PDFDocument, title: string, y: number): number {
  y = ensureSpace(doc, y, 36);
  doc.fillColor(BLUE).font('Helvetica-Bold').fontSize(12).text(title, MARGIN, y);
  return doc.y + 8;
}

function bodyText(doc: PDFKit.PDFDocument, text: string, y: number): number {
  y = ensureSpace(doc, y, 24);
  doc.fillColor('#0F172A').font('Helvetica').fontSize(10).text(text, MARGIN, y, {
    width: 495,
    align: 'justify',
  });
  return doc.y + 6;
}

function bulletList(doc: PDFKit.PDFDocument, items: readonly string[], y: number): number {
  for (const item of items) {
    y = ensureSpace(doc, y, 20);
    doc.fillColor('#0F172A').font('Helvetica').fontSize(10).text(`• ${item}`, MARGIN + 8, y, {
      width: 487,
    });
    y = doc.y + 4;
  }
  return y + 4;
}

function generateProgrammePdf(ref: Ref): Promise<string> {
  const formation = getFormationByCode(ref)!;
  const infos = getInfosPratiquesForCatalogue(ref);
  const niveau = getApplicationMetierNiveauByRef(ref);

  const outDir = path.join(process.cwd(), 'public', 'formations', formation.slug);
  fs.mkdirSync(outDir, { recursive: true });
  const filename = path.basename(formation.pdfProgramme);
  const outPath = path.join(outDir, filename);

  const doc = new PDFDocument({ size: 'A4', margin: MARGIN });
  const stream = fs.createWriteStream(outPath);
  doc.pipe(stream);

  let y = MARGIN;

  doc.fillColor(BLUE).font('Helvetica-Bold').fontSize(16).text('OFC Création d’Entreprise', MARGIN, y);
  y = doc.y + 4;
  doc.font('Helvetica').fontSize(9).fillColor('#64748B').text('Organisme de formation certifié Qualiopi — actions de formation', MARGIN, y);
  y = doc.y + 16;

  doc.fillColor('#0F172A').font('Helvetica-Bold').fontSize(14).text(infos.formationTitle, MARGIN, y, { width: 495 });
  y = doc.y + 6;
  doc.font('Helvetica').fontSize(10).fillColor('#475569').text(`Référence ${ref} · ${infos.programmeVersion} · Mise à jour ${infos.dateMaj}`, MARGIN, y);
  y = doc.y + 14;

  y = sectionTitle(doc, 'Informations générales', y);
  y = bodyText(
    doc,
    `Durée : ${infos.duree}\nPublic : ${formation.public}\nTarif : ${infos.tarif}\nModalité : ${infos.modalitePedagogique}`,
    y,
  );

  y = sectionTitle(doc, 'Prérequis', y);
  y = bodyText(doc, infos.prerequis, y);

  y = sectionTitle(doc, 'Objectifs pédagogiques', y);
  y = bulletList(doc, infos.objectifs, y);

  y = sectionTitle(doc, 'Programme détaillé — 7 heures', y);
  for (const mod of niveau.modules) {
    y = ensureSpace(doc, y, 50);
    doc.fillColor('#0F172A').font('Helvetica-Bold').fontSize(10).text(`${mod.title} (${mod.duree})`, MARGIN, y);
    y = doc.y + 4;
    y = bulletList(doc, mod.items, y);
  }

  y = sectionTitle(doc, 'Modalités pédagogiques', y);
  y = bodyText(doc, infos.modalitePedagogique, y);
  y = bodyText(doc, infos.methodes.join(' '), y);

  y = sectionTitle(doc, 'Modalités d’évaluation', y);
  y = bulletList(doc, infos.modalitesEvaluation, y);

  y = sectionTitle(doc, 'Modalités d’accès et délai d’accès', y);
  y = bodyText(doc, `${infos.modalitesAcces}\n\nDélai d’accès : ${infos.delaiAcces}`, y);

  y = sectionTitle(doc, 'Accessibilité handicap', y);
  y = bodyText(doc, infos.accessibiliteHandicap, y);

  y = sectionTitle(doc, 'Organisme de formation', y);
  y = bodyText(
    doc,
    `${QUALIOPI_LEGAL.raisonSociale}\nSIRET ${SCHEMA_CONTACT.siretFormatted} · NDA ${SCHEMA_CONTACT.nda}\n${SCHEMA_GEO.streetAddress}, ${SCHEMA_GEO.postalCode} ${SCHEMA_GEO.addressLocality}\n${SCHEMA_CONTACT.email} · www.laureolivie.fr\n\nCertification Qualiopi n° ${QUALIOPI_LEGAL.certificatNumero} — validité ${QUALIOPI_LEGAL.certificatValidite}\n${QUALIOPI_LEGAL.ndaExactMention}`,
    y,
  );

  doc.end();

  return new Promise<string>((resolve, reject) => {
    stream.on('finish', () => resolve(outPath));
    stream.on('error', reject);
  });
}

async function main(): Promise<void> {
  const refs: Ref[] = ['NIV-06', 'NIV-07', 'NIV-08'];
  for (const ref of refs) {
    const outPath = await generateProgrammePdf(ref);
    console.log(`✓ ${ref} → ${outPath}`);
  }
  console.log(`\n${refs.length} programmes PDF générés.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
