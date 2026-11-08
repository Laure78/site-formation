/**
 * Régénère les PDF programmes Qualiopi à partir de `programmes-ofc-2026-10-17.json`
 * et des sources TS pour NIV-09 / NIV-10.
 *
 * Usage :
 *   npm run programmes:ofc                    # NIV-03, NIV-09, NIV-10 (défaut)
 *   npx tsx scripts/generate-programmes-ofc-catalogue.ts NIV-01 NIV-02 …
 *
 * Sortie : chemin `pdfProgramme` dans `data/formations.ts` (dossier `public/formations/...`).
 */
import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { getFormationByCode } from '@/data/formations';
import { getInfosPratiquesForCatalogue } from '@/lib/infos-pratiques-catalogue';
import { ASSISTANTS_IA_MODULES } from '@/lib/formation-assistants-ia-personnalises-btp-content';
import { getDevWebIaCatalogueProgramModules14h } from '@/lib/dev-web-ia-programme-catalogue';
import { QUALIOPI_LEGAL } from '@/lib/qualiopi-info';
import { SCHEMA_CONTACT, SCHEMA_GEO } from '@/lib/schema-constants';
import {
  bodyText,
  bulletList,
  ensureSpace,
  PDF_MARGIN,
  sectionTitle,
  writeProgrammePdfHeader,
} from './lib/programme-pdf-kit';

const PROGRAMMES_JSON = path.join(process.cwd(), 'programmes-ofc-2026-10-17.json');

type ProgrammeContenuBloc = {
  titre: string;
  points: string[];
};

type ProgrammeModuleJson = {
  label: string;
  titre: string;
  duree: string;
  contenu?: ProgrammeContenuBloc[];
  livrable?: string;
};

type ProgrammeFormationJson = {
  ref: string;
  titre: string;
  sousTitre?: string;
  niveau?: string;
  duree: string;
  effectif: string;
  tarif: string;
  pratique?: string;
  public: string;
  prerequis: string;
  moyens: string;
  objectifs: string[];
  modules: ProgrammeModuleJson[];
};

type ProgrammesFile = {
  version: string;
  formations: ProgrammeFormationJson[];
};

const DEFAULT_REFS = ['NIV-03', 'NIV-09', 'NIV-10'] as const;

function outputPathForRef(ref: string): string {
  const formation = getFormationByCode(ref);
  if (!formation) throw new Error(`Formation inconnue : ${ref}`);
  const rel = formation.pdfProgramme.replace(/^\//, '');
  const outPath = path.join(process.cwd(), 'public', rel);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  return outPath;
}

function writeOrganismeFooter(doc: PDFKit.PDFDocument, y: number): number {
  y = sectionTitle(doc, 'Organisme de formation', y);
  return bodyText(
    doc,
    `${QUALIOPI_LEGAL.raisonSociale}\nSIRET ${SCHEMA_CONTACT.siretFormatted} · NDA ${SCHEMA_CONTACT.nda}\n${SCHEMA_GEO.streetAddress}, ${SCHEMA_GEO.postalCode} ${SCHEMA_GEO.addressLocality}\n${SCHEMA_CONTACT.email} · www.laureolivie.fr\n\nCertification Qualiopi n° ${QUALIOPI_LEGAL.certificatNumero} — validité ${QUALIOPI_LEGAL.certificatValidite}\n${QUALIOPI_LEGAL.ndaExactMention}`,
    y,
  );
}

function writeQualiopiSections(doc: PDFKit.PDFDocument, ref: string, y: number): number {
  const infos = getInfosPratiquesForCatalogue(ref);
  y = sectionTitle(doc, 'Modalités pédagogiques', y);
  y = bodyText(doc, infos.modalitePedagogique, y);
  if (infos.methodes?.length) y = bodyText(doc, infos.methodes.join(' '), y);
  y = sectionTitle(doc, 'Modalités d’évaluation', y);
  y = bulletList(doc, infos.modalitesEvaluation, y);
  y = sectionTitle(doc, 'Modalités d’accès et délai d’accès', y);
  y = bodyText(doc, `${infos.modalitesAcces}\n\nDélai d’accès : ${infos.delaiAcces}`, y);
  y = sectionTitle(doc, 'Accessibilité handicap', y);
  y = bodyText(doc, infos.accessibiliteHandicap, y);
  return y;
}

function renderPdf(ref: string, buildBody: (doc: PDFKit.PDFDocument, y: number) => number): Promise<string> {
  const formation = getFormationByCode(ref)!;
  const infos = getInfosPratiquesForCatalogue(ref);
  const outPath = outputPathForRef(ref);

  const doc = new PDFDocument({ size: 'A4', margin: PDF_MARGIN });
  const stream = fs.createWriteStream(outPath);
  doc.pipe(stream);

  let y = writeProgrammePdfHeader(
    doc,
    infos.formationTitle,
    `Référence ${ref} · ${infos.programmeVersion} · Mise à jour ${infos.dateMaj}`,
  );

  y = sectionTitle(doc, 'Informations générales', y);
  y = bodyText(
    doc,
    `Durée : ${infos.duree}\nEffectif : ${formation.effectifMin} à ${formation.effectifMax} participants\nPublic : ${formation.public}\nTarif : ${infos.tarif}\nModalité : ${infos.modalitePedagogique.split('\n')[0] ?? infos.modalitePedagogique}`,
    y,
  );

  y = sectionTitle(doc, 'Prérequis', y);
  y = bodyText(doc, infos.prerequis, y);

  y = sectionTitle(doc, 'Objectifs pédagogiques', y);
  y = bulletList(doc, infos.objectifs, y);

  y = buildBody(doc, y);
  y = writeQualiopiSections(doc, ref, y);
  writeOrganismeFooter(doc, y);

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on('finish', () => resolve(outPath));
    stream.on('error', reject);
  });
}

function writeJsonModules(doc: PDFKit.PDFDocument, entry: ProgrammeFormationJson, y: number): number {
  y = sectionTitle(doc, `Programme détaillé — ${entry.duree}`, y);
  for (const mod of entry.modules) {
    y = ensureSpace(doc, y, 50);
    const head = mod.label ? `${mod.label} — ${mod.titre}` : mod.titre;
    doc.fillColor('#0F172A').font('Helvetica-Bold').fontSize(10).text(`${head} (${mod.duree})`, PDF_MARGIN, y);
    y = doc.y + 4;
    const points: string[] = [];
    for (const bloc of mod.contenu ?? []) {
      if (bloc.titre) points.push(bloc.titre);
      points.push(...bloc.points);
    }
    if (points.length) y = bulletList(doc, points, y);
    if (mod.livrable) y = bodyText(doc, `Livrable : ${mod.livrable}`, y);
  }
  y = sectionTitle(doc, 'Moyens techniques', y);
  return bodyText(doc, entry.moyens, y);
}

async function generateFromJson(ref: string, formations: ProgrammeFormationJson[]): Promise<string> {
  const entry = formations.find((f) => f.ref === ref);
  if (!entry) throw new Error(`Référence ${ref} absente de ${PROGRAMMES_JSON}`);
  return renderPdf(ref, (doc, y) => writeJsonModules(doc, entry, y));
}

async function generateNiv09(): Promise<string> {
  return renderPdf('NIV-09', (doc, y) => {
    y = sectionTitle(doc, 'Programme détaillé — 4 heures (240 minutes)', y);
    for (const mod of ASSISTANTS_IA_MODULES) {
      y = ensureSpace(doc, y, 50);
      doc.fillColor('#0F172A').font('Helvetica-Bold').fontSize(10).text(`${mod.heading} (${mod.duree})`, PDF_MARGIN, y);
      y = doc.y + 4;
      y = bulletList(doc, mod.points, y);
      if (mod.atelier) y = bodyText(doc, mod.atelier, y);
    }
    const infos = getInfosPratiquesForCatalogue('NIV-09');
    y = sectionTitle(doc, 'Moyens techniques', y);
    return bodyText(doc, infos.prerequis, y);
  });
}

async function generateNiv10(): Promise<string> {
  const modules = getDevWebIaCatalogueProgramModules14h();
  return renderPdf('NIV-10', (doc, y) => {
    y = sectionTitle(doc, 'Programme détaillé — 14 heures (2 journées × 7 h)', y);
    for (const mod of modules) {
      y = ensureSpace(doc, y, 50);
      doc.fillColor('#0F172A').font('Helvetica-Bold').fontSize(10).text(mod.title, PDF_MARGIN, y);
      y = doc.y + 4;
      y = bulletList(doc, mod.points, y);
    }
    const entry = (JSON.parse(fs.readFileSync(PROGRAMMES_JSON, 'utf8')) as ProgrammesFile).formations.find(
      (f) => f.ref === 'NIV-10',
    );
    y = sectionTitle(doc, 'Moyens techniques', y);
    return bodyText(doc, entry?.moyens ?? 'Ordinateur portable, connexion internet, abonnement ChatGPT ou Claude actif.', y);
  });
}

async function generateRef(ref: string, formations: ProgrammeFormationJson[]): Promise<string> {
  if (ref === 'NIV-09') return generateNiv09();
  if (ref === 'NIV-10') return generateNiv10();
  return generateFromJson(ref, formations);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  const refs = (args.length ? args : [...DEFAULT_REFS]) as string[];

  const data = JSON.parse(fs.readFileSync(PROGRAMMES_JSON, 'utf8')) as ProgrammesFile;
  console.log(`Source JSON v${data.version} — ${refs.join(', ')}`);

  for (const ref of refs) {
    const outPath = await generateRef(ref, data.formations);
    console.log(`✓ ${ref} → ${path.relative(process.cwd(), outPath)}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
